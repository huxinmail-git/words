const people = [
  ['Li Ming', '李明'], ['Wang Mei', '王梅'], ['Chen Jie', '陈杰'], ['Zhang Lin', '张琳'],
  ['Liu Yang', '刘洋'], ['Sun Yue', '孙悦'], ['Zhao Xin', '赵欣'], ['Wu Tong', '吴桐'],
  ['Ma Jun', '马军'], ['He Jing', '何静']
];

const verbs = [
  ['organize', '组织', 'the class activity', '班级活动', '八年级'],
  ['protect', '保护', 'the natural environment', '自然环境', '八年级'],
  ['improve', '提高', 'our English skills', '我们的英语能力', '八年级'],
  ['prepare', '准备', 'the materials', '材料', '七年级'],
  ['complete', '完成', 'the science project', '科学项目', '八年级'],
  ['discuss', '讨论', 'the reading plan', '阅读计划', '七年级'],
  ['solve', '解决', 'the difficult problem', '这个难题', '八年级'],
  ['develop', '培养', 'good learning habits', '良好的学习习惯', '八年级'],
  ['support', '支持', 'the school team', '校队', '八年级'],
  ['respect', '尊重', 'different opinions', '不同的观点', '八年级'],
  ['encourage', '鼓励', 'younger students', '低年级学生', '九年级'],
  ['compare', '比较', 'the two methods', '这两种方法', '八年级'],
  ['describe', '描述', 'the beautiful scene', '这幅美丽的景象', '七年级'],
  ['explain', '解释', 'the grammar rule', '这条语法规则', '八年级'],
  ['discover', '发现', 'the truth', '真相', '八年级'],
  ['reduce', '减少', 'plastic waste', '塑料垃圾', '九年级'],
  ['collect', '收集', 'useful information', '有用的信息', '七年级'],
  ['record', '记录', 'the experiment results', '实验结果', '八年级'],
  ['share', '分享', 'our ideas', '我们的想法', '七年级'],
  ['accept', '接受', 'the new challenge', '新的挑战', '八年级'],
  ['create', '创作', 'a short English play', '一部英语短剧', '八年级'],
  ['review', '复习', 'the key vocabulary', '重点词汇', '七年级'],
  ['practice', '练习', 'the dialogue', '这段对话', '七年级'],
  ['choose', '选择', 'the best route', '最佳路线', '七年级'],
  ['manage', '管理', 'our study time', '我们的学习时间', '九年级'],
  ['continue', '继续', 'the community project', '社区项目', '八年级'],
  ['consider', '考虑', 'the possible results', '可能的结果', '九年级'],
  ['suggest', '建议', 'a better solution', '更好的解决办法', '九年级'],
  ['introduce', '介绍', 'Tianjin culture', '天津文化', '八年级'],
  ['celebrate', '庆祝', 'the team success', '团队的成功', '七年级'],
  ['communicate', '沟通', 'with our partners', '与我们的伙伴', '九年级'],
  ['connect', '连接', 'the two devices', '这两台设备', '八年级'],
  ['control', '控制', 'the water temperature', '水温', '九年级'],
  ['produce', '制作', 'a class newspaper', '一份班级报纸', '八年级'],
  ['prevent', '防止', 'the same mistake', '同样的错误', '九年级'],
  ['provide', '提供', 'help for visitors', '给游客的帮助', '九年级'],
  ['repair', '修理', 'the old bicycle', '这辆旧自行车', '八年级'],
  ['search', '搜索', 'for reliable facts', '可靠的事实', '八年级'],
  ['translate', '翻译', 'the short article', '这篇短文', '九年级'],
  ['volunteer', '志愿服务', 'at the community centre', '在社区中心', '八年级']
];

const verbFrames = [
  (w, o) => `We should ${w} ${o} at school.`,
  (w, o) => `You can ${w} ${o} with your classmates.`,
  (w, o) => `Students must ${w} ${o} before Friday.`,
  (w, o) => `Our team will ${w} ${o} this afternoon.`,
  (w, o) => `Please ${w} ${o} carefully.`,
  (w, o) => `Teachers often ask us to ${w} ${o}.`,
  (w, o) => `It is a good time to ${w} ${o}.`,
  (w, o) => `They decided to ${w} ${o} together.`,
  (w, o) => `I hope to ${w} ${o} this term.`,
  (w, o) => `We need to ${w} ${o} for the future.`
];

const verbTranslations = [
  (m, o) => `我们在学校应该${m}${o}。`,
  (m, o) => `你可以和同学一起${m}${o}。`,
  (m, o) => `学生必须在星期五前${m}${o}。`,
  (m, o) => `我们团队今天下午将${m}${o}。`,
  (m, o) => `请认真${m}${o}。`,
  (m, o) => `老师经常要求我们${m}${o}。`,
  (m, o) => `现在是${m}${o}的好时机。`,
  (m, o) => `他们决定一起${m}${o}。`,
  (m, o) => `我希望这学期${m}${o}。`,
  (m, o) => `为了未来，我们需要${m}${o}。`
];

const adjectives = [
  ['important', '重要的', 'This lesson', '这节课', '七年级'],
  ['useful', '有用的', 'The new method', '这个新方法', '七年级'],
  ['possible', '可能的', 'The plan', '这个计划', '八年级'],
  ['necessary', '必要的', 'The change', '这个改变', '九年级'],
  ['valuable', '宝贵的', 'This experience', '这段经历', '九年级'],
  ['successful', '成功的', 'The school event', '这次校园活动', '八年级'],
  ['popular', '受欢迎的', 'The reading club', '这个读书会', '七年级'],
  ['convenient', '方便的', 'The underground', '地铁', '九年级'],
  ['comfortable', '舒适的', 'The study room', '这间自习室', '八年级'],
  ['traditional', '传统的', 'The local festival', '这个当地节日', '八年级'],
  ['creative', '有创意的', 'Her idea', '她的想法', '八年级'],
  ['responsible', '负责任的', 'The team leader', '这位队长', '九年级'],
  ['independent', '独立的', 'The young learner', '这位年轻的学习者', '九年级'],
  ['confident', '自信的', 'My classmate', '我的同学', '八年级'],
  ['patient', '有耐心的', 'Our English teacher', '我们的英语老师', '八年级'],
  ['honest', '诚实的', 'The boy', '这个男孩', '七年级'],
  ['brave', '勇敢的', 'The young volunteer', '这位年轻志愿者', '七年级'],
  ['polite', '有礼貌的', 'The new student', '这位新同学', '七年级'],
  ['active', '积极的', 'The club member', '这位社团成员', '七年级'],
  ['careful', '仔细的', 'The lab assistant', '这位实验助手', '七年级'],
  ['friendly', '友好的', 'Our new neighbour', '我们的新邻居', '七年级'],
  ['helpful', '乐于助人的', 'The guide', '这位向导', '七年级'],
  ['curious', '好奇的', 'The little girl', '这个小女孩', '八年级'],
  ['serious', '认真的', 'The group captain', '这位小组长', '八年级'],
  ['quiet', '安静的', 'The library', '图书馆', '七年级'],
  ['safe', '安全的', 'The new bridge', '这座新桥', '七年级'],
  ['natural', '自然的', 'The lake area', '这片湖区', '八年级'],
  ['modern', '现代的', 'The science centre', '这座科学中心', '八年级'],
  ['excellent', '出色的', 'Her performance', '她的表现', '八年级'],
  ['memorable', '难忘的', 'The class trip', '这次班级旅行', '九年级']
];

const adjectiveFrames = [
  (s, w) => `${s} is very ${w}.`,
  (s, w) => `${s} seems ${w} to everyone.`,
  (s, w) => `We think ${s.toLowerCase()} is ${w}.`,
  (s, w) => `Everyone agrees that ${s.toLowerCase()} is ${w}.`,
  (s, w) => `It is clear that ${s.toLowerCase()} is ${w}.`,
  (s, w) => `${s} can be ${w} in daily life.`,
  (s, w) => `${s} became more ${w} this year.`,
  (s, w) => `${s} remains ${w} today.`,
  (s, w) => `I found ${s.toLowerCase()} quite ${w}.`,
  (s, w) => `The teacher described ${s.toLowerCase()} as ${w}.`
];

const adjectiveTranslations = [
  (s, m) => `${s}${m}。`, (s, m) => `每个人都觉得${s}${m}。`,
  (s, m) => `我们认为${s}${m}。`, (s, m) => `大家都认为${s}${m}。`,
  (s, m) => `很明显，${s}${m}。`, (s, m) => `在日常生活中，${s}可能很${m}。`,
  (s, m) => `今年${s}变得更${m}了。`, (s, m) => `今天${s}依然很${m}。`,
  (s, m) => `我发现${s}相当${m}。`, (s, m) => `老师形容${s}是${m}。`
];

const nouns = [
  ['knowledge', '知识', '七年级'], ['education', '教育', '八年级'],
  ['culture', '文化', '八年级'], ['communication', '沟通', '九年级'],
  ['environment', '环境', '八年级'], ['technology', '科技', '八年级'],
  ['health', '健康', '七年级'], ['safety', '安全', '七年级'],
  ['friendship', '友谊', '七年级'], ['teamwork', '团队合作', '八年级'],
  ['confidence', '自信', '八年级'], ['responsibility', '责任', '九年级'],
  ['experience', '经验', '八年级'], ['progress', '进步', '七年级'],
  ['success', '成功', '八年级'], ['energy', '能源', '八年级'],
  ['information', '信息', '七年级'], ['advice', '建议', '八年级'],
  ['creativity', '创造力', '九年级'], ['independence', '独立', '九年级']
];

const nounFrames = [
  w => `The lesson taught us the importance of ${w}.`,
  w => `${w[0].toUpperCase()}${w.slice(1)} can change the way we think.`,
  w => `Our teacher started a discussion about ${w}.`,
  w => `The book gives useful information about ${w}.`,
  w => `We need a better understanding of ${w}.`,
  w => `The project helped us understand ${w} better.`,
  w => `Learning more about ${w} is important for young people.`,
  w => `They shared their ideas about ${w}.`,
  w => `The speech focused on ${w}.`,
  w => `Students wrote a report on ${w}.`
];

const nounTranslations = [
  m => `这节课教会我们${m}的重要性。`, m => `${m}能够改变我们的思维方式。`,
  m => `老师组织了一场关于${m}的讨论。`, m => `这本书提供了关于${m}的有用信息。`,
  m => `我们需要更好地理解${m}。`, m => `这个项目帮助我们更好地理解${m}。`,
  m => `年轻人多了解${m}很重要。`, m => `他们分享了对${m}的看法。`,
  m => `这次演讲重点讨论了${m}。`, m => `学生们写了一份关于${m}的报告。`
];

const adverbs = [
  ['carefully', '仔细地', 'checked the answers', '检查了答案', '七年级'],
  ['clearly', '清楚地', 'explained the rule', '解释了规则', '八年级'],
  ['politely', '礼貌地', 'spoke to the visitor', '与游客交谈', '七年级'],
  ['patiently', '耐心地', 'waited for the bus', '等公交车', '八年级'],
  ['confidently', '自信地', 'answered the question', '回答了问题', '八年级'],
  ['quickly', '迅速地', 'finished the race', '完成了比赛', '七年级'],
  ['quietly', '安静地', 'entered the library', '走进图书馆', '七年级'],
  ['successfully', '成功地', 'completed the project', '完成了项目', '八年级'],
  ['honestly', '诚实地', 'shared the truth', '说出了真相', '八年级'],
  ['slowly', '缓慢地', 'read the difficult passage', '读了这篇难懂的文章', '七年级']
];

const timePhrases = [
  ['yesterday', '昨天'], ['after class', '下课后'], ['this morning', '今天早上'],
  ['during practice', '练习时'], ['before the lesson', '上课前'], ['after a short break', '短暂休息后'],
  ['on Monday', '星期一'], ['last week', '上周'], ['before lunch', '午饭前'],
  ['at the right moment', '在合适的时候']
];

const makeQuestion = (id, word, meaning, grade, sentence, translation, extra = {}) => ({
  id,
  word,
  meaning,
  grade,
  sentence,
  translation,
  simulation: true,
  hint: `中考仿真词汇题：词义为“${meaning}”，注意句中搭配。`,
  ...extra
});

const verbQuestions = verbs.flatMap(([word, meaning, object, objectCn, grade], entryIndex) =>
  verbFrames.map((frame, variant) => makeQuestion(
    `sim-v-${entryIndex}-${variant}`,
    word,
    meaning,
    grade,
    frame(word, object),
    verbTranslations[variant](meaning, objectCn)
  ))
);

const adjectiveQuestions = adjectives.flatMap(([word, meaning, subject, subjectCn, grade], entryIndex) =>
  adjectiveFrames.map((frame, variant) => makeQuestion(
    `sim-a-${entryIndex}-${variant}`,
    word,
    meaning,
    grade,
    frame(subject, word),
    adjectiveTranslations[variant](subjectCn, meaning)
  ))
);

const nounQuestions = nouns.flatMap(([word, meaning, grade], entryIndex) =>
  nounFrames.map((frame, variant) => makeQuestion(
    `sim-n-${entryIndex}-${variant}`,
    word,
    meaning,
    grade,
    frame(word),
    nounTranslations[variant](meaning)
  ))
);

const adverbQuestions = adverbs.flatMap(([word, meaning, clause, clauseCn, grade], entryIndex) =>
  timePhrases.map(([time, timeCn], variant) => {
    const [person, personCn] = people[variant];
    return makeQuestion(
      `sim-d-${entryIndex}-${variant}`,
      word,
      meaning,
      grade,
      `${person} ${clause} ${word} ${time}.`,
      `${personCn}${timeCn}${meaning}${clauseCn}。`
    );
  })
);

export const simulatedBank = [
  ...verbQuestions,
  ...adjectiveQuestions,
  ...nounQuestions,
  ...adverbQuestions
];
