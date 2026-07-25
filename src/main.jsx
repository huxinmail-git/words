import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowLeft, ArrowRight, BookOpen, Check, ChevronRight, CircleAlert,
  Clock3, RotateCcw, Sparkles, Target, Trash2, Trophy
} from 'lucide-react';
import { wordBank } from './data';
import './styles.css';

const STORAGE_KEY = 'jinci-progress-v1';
const GRADE_KEY = 'jinci-grade-filter-v1';
const gradeOptions = [
  { value: 'all', label: '全部' },
  { value: '七年级', label: '七年级' },
  { value: '八年级', label: '八年级' },
  { value: '九年级', label: '九年级' },
  { value: '中考', label: '中考' }
];

function loadProgress() {
  const defaults = { mastered: [], mistakes: {}, correctTotal: 0, attemptedTotal: 0 };
  try {
    return { ...defaults, ...(JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}) };
  } catch {
    return defaults;
  }
}

const shuffled = (items) => [...items].sort(() => Math.random() - 0.5);
const loadGradeFilter = () => localStorage.getItem(GRADE_KEY) || 'all';
const wordsForGrade = (grade) => grade === 'all'
  ? wordBank
  : wordBank.filter(item => grade === '中考' ? item.grade.startsWith('中考') : item.grade === grade);

function RewardBurst({ streak, medal }) {
  const pieces = Array.from({ length: 18 });
  return (
    <div className="reward-layer" aria-hidden="true">
      {pieces.map((_, index) => (
        <i
          key={index}
          style={{
            '--x': `${(index % 9 - 4) * 28}px`,
            '--y': `${-70 - (index % 5) * 18}px`,
            '--delay': `${(index % 4) * 35}ms`,
            '--color': ['#e9b949', '#db6b52', '#1f8b70', '#6c82c4'][index % 4]
          }}
        />
      ))}
      <div className={`reward-pop ${medal ? 'medal-pop' : ''}`}>
        {medal ? <Trophy size={22} /> : <Sparkles size={19} />}
        <strong>{medal ? `解锁第 ${medal} 枚勋章！` : '太棒了！'}</strong>
        <span>{medal ? '每 10 道正确答案的纪念' : `连对 ${streak} 题`}</span>
      </div>
    </div>
  );
}

function Skyline() {
  return (
    <svg className="skyline" viewBox="0 0 420 170" role="img" aria-label="天津之眼与城市剪影">
      <g fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="250" cy="77" r="55" /><circle cx="250" cy="77" r="4" />
        {[0, 30, 60, 90, 120, 150].map((angle) => {
          const rad = angle * Math.PI / 180;
          return <line key={angle} x1="250" y1="77" x2={250 + Math.cos(rad) * 55} y2={77 + Math.sin(rad) * 55} />;
        })}
        <path d="M226 132l-18 28M274 132l18 28M0 151h420M13 151v-37h34v37M55 151V96h30v55M94 151v-25h42v25M337 151v-43h38v43M384 151v-68h23v68" />
        <path d="M0 160c58-9 111-8 162 0s103 8 148 0 82-8 110 0" />
      </g>
    </svg>
  );
}

function App() {
  const [progress, setProgress] = useState(loadProgress);
  const [view, setView] = useState('practice');
  const [mode, setMode] = useState('daily');
  const [gradeFilter, setGradeFilter] = useState(loadGradeFilter);
  const [queue, setQueue] = useState(() => shuffled(wordsForGrade(loadGradeFilter())));
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState(null);
  const [hintOpen, setHintOpen] = useState(false);
  const [medalEarned, setMedalEarned] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)), [progress]);
  useEffect(() => localStorage.setItem(GRADE_KEY, gradeFilter), [gradeFilter]);
  useEffect(() => {
    if (window.innerWidth > 760) inputRef.current?.focus();
  }, []);

  const current = queue[index];
  const masteredCount = progress.mastered.length;
  const wrongWords = useMemo(() => wordBank.filter(item => progress.mistakes[item.word]), [progress]);
  const streak = Number(sessionStorage.getItem('jinci-streak') || 0);
  const medalCount = Math.floor(progress.correctTotal / 10);
  const medalProgress = progress.correctTotal % 10;
  const selectedWords = useMemo(() => wordsForGrade(gradeFilter), [gradeFilter]);

  function displaySentence(item) {
    if (item.displaySentence) return item.displaySentence;
    const pattern = new RegExp(`\\b${item.word}\\b`, 'i');
    return item.sentence.replace(pattern, `${item.word[0]}${'_'.repeat(Math.max(item.word.length - 1, 4))}`);
  }

  function submit(e) {
    e?.preventDefault();
    if (!current || !answer.trim() || result) return;
    const completedAnswer = answer.trim();
    const correct = completedAnswer.toLowerCase() === current.word.toLowerCase();
    if (correct) {
      const nextStreak = streak + 1;
      const nextCorrectTotal = progress.correctTotal + 1;
      sessionStorage.setItem('jinci-streak', nextStreak);
      setMedalEarned(nextCorrectTotal % 10 === 0 ? nextCorrectTotal / 10 : null);
      setProgress(prev => ({
        mastered: prev.mastered.includes(current.word) ? prev.mastered : [...prev.mastered, current.word],
        mistakes: Object.fromEntries(Object.entries(prev.mistakes).filter(([word]) => word !== current.word)),
        correctTotal: prev.correctTotal + 1,
        attemptedTotal: prev.attemptedTotal + 1
      }));
    } else {
      sessionStorage.setItem('jinci-streak', 0);
      setMedalEarned(null);
      setProgress(prev => ({
        ...prev,
        attemptedTotal: prev.attemptedTotal + 1,
        mistakes: {
          ...prev.mistakes,
          [current.word]: { count: (prev.mistakes[current.word]?.count || 0) + 1, lastAnswer: completedAnswer, updatedAt: Date.now() }
        }
      }));
    }
    setResult(correct ? 'correct' : 'wrong');
  }

  function nextQuestion() {
    setAnswer('');
    setResult(null);
    setHintOpen(false);
    setMedalEarned(null);
    if (index < queue.length - 1) setIndex(index + 1);
    else {
      if (mode === 'review' && !wrongWords.length) setMode('daily');
      setQueue(mode === 'review' && wrongWords.length ? shuffled(wrongWords) : shuffled(selectedWords));
      setIndex(0);
    }
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  function startReview() {
    if (!wrongWords.length) return;
    setQueue(shuffled(wrongWords));
    setIndex(0);
    setAnswer('');
    setResult(null);
    setHintOpen(false);
    setMode('review');
    setView('practice');
  }

  function resetDaily() {
    setQueue(shuffled(selectedWords));
    setIndex(0);
    setAnswer('');
    setResult(null);
    setHintOpen(false);
    setMode('daily');
  }

  function selectGrade(grade) {
    setGradeFilter(grade);
    setQueue(shuffled(wordsForGrade(grade)));
    setIndex(0);
    setAnswer('');
    setResult(null);
    setHintOpen(false);
    setMedalEarned(null);
    setMode('daily');
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  return (
    <div className="app-shell">
      <header>
        <button className="brand" onClick={() => { setView('practice'); resetDaily(); }} aria-label="返回今日练习">
          <span className="brand-mark">津</span>
          <span><strong>津词</strong><small>初中英语填空</small></span>
        </button>
        <nav aria-label="主导航">
          <button className={view === 'practice' ? 'active' : ''} onClick={() => setView('practice')}><BookOpen size={18} />今日练习</button>
          <button className={view === 'mistakes' ? 'active' : ''} onClick={() => setView('mistakes')}><CircleAlert size={18} />错词本{wrongWords.length > 0 && <b>{wrongWords.length}</b>}</button>
        </nav>
        <div className="header-stat"><Trophy size={17} /><span>勋章 <strong>{medalCount}</strong></span></div>
      </header>

      <main>
        {view === 'practice' ? (
          <>
            <section className="welcome">
              <div>
                <p className="eyebrow">{mode === 'review' ? '错词强化' : '今日任务'}</p>
                <h1>{mode === 'review' ? '再遇见一次，就真正记住。' : '不限题数，一直向前。'}</h1>
                <p>{mode === 'review' ? `正在复习 ${queue.length} 个错词` : '每答对 10 题解锁一枚勋章，首字母已在句中保留。'}</p>
              </div>
              <Skyline />
            </section>

            <section className="grade-selector" aria-label="选择练习年级">
              <span>练习范围</span>
              <div role="group" aria-label="年级">
                {gradeOptions.map(option => (
                  <button
                    key={option.value}
                    className={gradeFilter === option.value ? 'selected' : ''}
                    aria-pressed={gradeFilter === option.value}
                    onClick={() => selectGrade(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              <small>共 {selectedWords.length} 题</small>
            </section>

            <section className="study-layout">
              <div className={`question-panel ${result || ''}`}>
                {result === 'correct' && <RewardBurst streak={streak} medal={medalEarned} />}
                <div className="question-top">
                  <div className="question-tags"><span className="grade-tag">{current?.grade}</span>{current?.type === 'tense' && <span className="grammar-tag">词形变化</span>}{current?.examYear && <span className="exam-tag">{current.examYear} 天津中考真题</span>}</div>
                  <span className="question-count">已完成 {progress.attemptedTotal} 题</span>
                </div>
                <div className="progress-track medal-track" title={`距离下一枚勋章还差 ${10 - medalProgress} 题`}><span style={{ width: `${medalProgress * 10}%` }} /></div>

                <div className="prompt-area">
                  <p className="sentence">{current && displaySentence(current)}</p>
                  {!result && <button className="hint-button" type="button" onClick={() => setHintOpen(value => !value)}>{hintOpen ? '收起提示' : '查看提示'}</button>}
                  {!result && hintOpen && <p className="hint-content">{current?.hint || (current?.type === 'tense' ? `留意句中的时间信号，判断${current.grammar}。` : `词义提示：${current?.meaning}，共 ${current?.word.length} 个字母。`)}</p>}
                  {result && <p className="translation reveal">{current?.translation}</p>}
                </div>

                <form onSubmit={submit}>
                  <label htmlFor="answer">{current?.type === 'tense' ? `用 ${current.baseWord} 的正确形式填空` : '填写完整单词'}</label>
                  <div className="answer-row">
                    <div className="answer-wrap"><input ref={inputRef} id="answer" value={answer} onChange={e => setAnswer(e.target.value.replace(/[^a-zA-Z]/g, ''))} disabled={!!result} autoComplete="off" placeholder={`输入完整单词 · ${current?.word.length || 0} 个字母`} aria-describedby="answer-tip" /></div>
                    {!result && <button className="primary-btn" disabled={!answer.trim()} type="submit">提交答案<ChevronRight size={20} /></button>}
                  </div>
                </form>

                {result && (
                  <div className="feedback" id="answer-tip" aria-live="polite">
                    <div className="feedback-icon">{result === 'correct' ? <Check /> : <CircleAlert />}</div>
                    <div>
                      <strong>{result === 'correct' ? '答对了，已标记为掌握' : '差一点，已加入错词本'}</strong>
                      <p>{result === 'correct' ? `${current.word} · ${current.meaning}` : `正确答案是 ${current.word}，意思是“${current.meaning}”。`}</p>
                      {current.explanation && <p className="grammar-note"><b>{current.grammar}</b>：{current.explanation}</p>}
                    </div>
                    <button onClick={nextQuestion}>下一题<ArrowRight size={18} /></button>
                  </div>
                )}
              </div>

              <aside className="side-panel">
                <h2>学习进度</h2>
                <div className="metric"><span className="metric-icon green"><Target /></span><div><strong>{masteredCount}</strong><small>已掌握单词</small></div></div>
                <div className="metric"><span className="metric-icon coral"><CircleAlert /></span><div><strong>{wrongWords.length}</strong><small>待复习错词</small></div></div>
                <div className="metric"><span className="metric-icon yellow"><Trophy /></span><div><strong>{streak}</strong><small>本次连续答对</small></div></div>
                <div className="medal-shelf">
                  <div><Trophy size={18} /><strong>{medalCount} 枚勋章</strong></div>
                  <p>下一枚还差 <b>{10 - medalProgress}</b> 道正确答案</p>
                  <span><i style={{ width: `${medalProgress * 10}%` }} /></span>
                </div>
                <div className="divider" />
                <div className="tip"><Clock3 size={18} /><p><strong>记忆小提示</strong><span>想一想这个词在句子里承担什么作用，再动笔。</span></p></div>
              </aside>
            </section>
          </>
        ) : (
          <section className="mistake-page">
            <div className="page-heading">
              <div><button className="back" onClick={() => setView('practice')}><ArrowLeft size={17} />返回练习</button><p className="eyebrow">专属复习清单</p><h1>错词本</h1><p>错一次没关系，记住它就好。</p></div>
              {wrongWords.length > 0 && <button className="primary-btn" onClick={startReview}><RotateCcw size={18} />开始复习 {wrongWords.length} 词</button>}
            </div>
            {wrongWords.length ? (
              <div className="word-list">
                {wrongWords.map(item => (
                  <article className="word-item" key={item.word}>
                    <div className="word-letter">{item.word[0].toUpperCase()}</div>
                    <div className="word-main"><div><h2>{item.word}</h2><span>{item.grade}</span></div><p>{item.meaning}</p><blockquote>{item.displaySentence || item.sentence}</blockquote>{item.explanation && <small className="word-grammar">{item.grammar} · {item.explanation}</small>}</div>
                    <div className="error-count">错过 <strong>{progress.mistakes[item.word].count}</strong> 次</div>
                    <button className="icon-btn" title="从错词本移除" aria-label={`移除 ${item.word}`} onClick={() => setProgress(prev => ({ ...prev, mistakes: Object.fromEntries(Object.entries(prev.mistakes).filter(([word]) => word !== item.word)) }))}><Trash2 size={18} /></button>
                  </article>
                ))}
              </div>
            ) : (
              <div className="empty-state"><div><Check size={30} /></div><h2>错词本还是空的</h2><p>去完成今日练习，答错的单词会自动收在这里。</p><button className="primary-btn" onClick={() => setView('practice')}>开始练习<ArrowRight size={18} /></button></div>
            )}
          </section>
        )}
      </main>
      <footer>津词 · 为天津初中英语学习设计</footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
