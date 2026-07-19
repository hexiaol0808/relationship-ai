// 15 题问卷数据模型。题干/选项文字逐字来自 docs/QUESTIONNAIRE_OPTIONS.md（2026-07-08 冻结版），
// 前端渲染和后端 prompt 拼装（见 lib/report-prompt.ts）共用这份数据，避免文案在两处漂移。

export type QuestionType =
  | "ranked_two" // 选二排序，无 F（CP1、CP2）
  | "ranked_two_f" // 选二排序，含 F（G7）
  | "single_f" // 单选 + F
  | "single_no_f" // 单选，无 F（G8、S1）
  | "best_worst_two_step"; // CP3 专属：两步呈现

export interface QuestionOption {
  letter: string; // "A".."E"
  title?: string; // 用户可见短标题，仅当原文档单独给出时才有
  body: string; // 完整选项文字
}

export interface Question {
  id: number; // 1-15
  code: string; // 构念代码
  title: string; // 题目标题
  prompt: string; // 题干/引导语正文
  type: QuestionType;
  options: QuestionOption[];
  hasF: boolean;
  fPrompt?: string; // F 选项本身的说明文字
  firstLabel?: string; // ranked_two(_f) 第一步标签
  secondLabel?: string; // ranked_two(_f) 第二步标签
  step1Label?: string; // best_worst_two_step 第一步标签
  step2Label?: string; // best_worst_two_step 第二步标签
  step2Hint?: string; // best_worst_two_step 第二步小字说明
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    code: "CP1",
    title: "哪两种方式最能让你感受到爱？",
    prompt: "如果只能选择两种，你最希望伴侣长期保持哪两种？\n请选择第一优先，再选择第二优先。",
    type: "ranked_two",
    hasF: false,
    firstLabel: "第一优先",
    secondLabel: "第二优先",
    options: [
      { letter: "A", title: "高质量陪伴", body: "TA会主动留出一段专注、不被手机或工作打断的时间，认真和你聊天，或者陪你一起做一件事。" },
      { letter: "B", title: "肯定的话语", body: "TA会主动把欣赏、感谢、在乎或者想念说出来，让你明确知道自己的重要性。" },
      { letter: "C", title: "服务的行动", body: "看到你有压力或者遇到麻烦时，TA会主动帮你分担一件具体的事情，而不只是口头安慰。" },
      { letter: "D", title: "礼物与纪念", body: "TA会记得你的偏好和你随口提过的小事，在普通或者重要的时刻，用一件有意义的东西表达：“我记得你，也想到了你。”" },
      { letter: "E", title: "身体接触", body: "TA会主动拥抱、牵手、亲吻或者靠近你，通过身体上的亲近表达连接。" },
    ],
  },
  {
    id: 2,
    code: "CP2",
    title: "你通常怎样表达自己的爱？",
    prompt:
      "当你真心在乎一个人时，下面哪些行为是你最自然做的？\n请根据真实行为选择，而不是选择你认为“应该做”的。\n请先选择最常出现的一项，再选择第二常出现的一项。",
    type: "ranked_two",
    hasF: false,
    firstLabel: "最自然的表达方式",
    secondLabel: "第二自然的表达方式",
    options: [
      { letter: "A", title: "服务的行动", body: "看到TA遇到麻烦、压力或者现实困难时，我会自然地想帮忙处理、解决或者分担。" },
      { letter: "B", title: "身体接触", body: "见面时，我会自然地想拥抱、牵手、亲吻或者靠近TA。" },
      { letter: "C", title: "肯定的话语", body: "我会自然地表达欣赏、感谢、想念或者爱，让TA明确知道我的感情。" },
      { letter: "D", title: "高质量陪伴", body: "我会主动留时间陪TA，认真听TA说话，或者一起做一些有共同体验的事情。" },
      { letter: "E", title: "礼物与纪念", body: "我会记住TA的喜好、随口说过的小事，想送一些东西、准备惊喜或者留下纪念。" },
    ],
  },
  {
    id: 3,
    code: "S6",
    title: "当爱没有对上频道",
    prompt: "你知道TA是真心的，也在为关系付出。但TA表达爱的方式，不是你最需要的方式。面对这种长期错位，你通常怎么做？",
    type: "single_f",
    hasF: true,
    fPrompt: "其他，请自行输入",
    options: [
      { letter: "A", title: "我会调整自己的期待", body: "我会提醒自己去看见TA已经在做的事情，也慢慢接受彼此表达爱的方式不同。" },
      { letter: "B", title: "我会从生活其他方面补足", body: "我不会要求伴侣满足自己的全部需求，而会从朋友、兴趣、工作和自己的生活中获得其他支持。" },
      { letter: "C", title: "我会直接告诉TA我的需求", body: "我会直接告诉TA，也愿意给时间调整；如果需要长期反复提醒，我也可能感到疲惫。" },
      { letter: "D", title: "我会先观察TA能不能自己意识到", body: "我不太想主动告诉TA应该怎么做，而是期待对方慢慢理解我的需要。" },
      { letter: "E", title: "我会重新考虑我们是否适合", body: "如果相处很久以后，我依然长期感受不到自己真正需要的连接，我会开始评估这段关系是否值得继续。" },
    ],
  },
  {
    id: 4,
    code: "CP3",
    title: "关系中，什么会越来越消耗你？",
    prompt:
      "假设一段关系总体是有爱的，没有背叛、伤害或明显的恶意，但哪一个长期存在的部分，容易让你产生这种感觉：\n“我知道 TA 也许是爱我的，但如果继续这样下去，我会越来越不快乐。”",
    type: "best_worst_two_step",
    hasF: true,
    fPrompt: "其他选项，请输入",
    step1Label: "请选择最符合的一项：",
    step2Label: "在剩下的选项里，哪一项是你相对更能适应的？",
    step2Hint: "不是说你不需要它，只是相比之下，它的缺失对你的影响相对较小。",
    options: [
      { letter: "A", body: "TA始终很难真正理解我的情绪、想法，以及为什么某些事情对我如此重要。" },
      { letter: "B", body: "TA很少真正看见和欣赏我的能力、努力、判断或者成长。" },
      { letter: "C", body: "在TA重要决定、时间分配和未来规划里，我总觉得自己没有真正的位置。" },
      { letter: "D", body: "当我脆弱、生病或者遇到现实困难时，常常觉得只能自己扛。" },
      { letter: "E", body: "TA常常觉得是“为我好”，久而久之，我会感觉自己的选择、节奏和生活方式越来越需要按照TA认为更好的方向调整。" },
    ],
  },
  {
    id: 5,
    code: "S5",
    title: "以下哪一种行为最容易立刻引发你的情绪？",
    prompt: "在关系中，下面哪一种事件的发生，最容易让你当下迅速生气、委屈、失望，甚至立刻产生争执？",
    type: "single_f",
    hasF: true,
    fPrompt: "其他，请自行输入",
    options: [
      { letter: "A", body: "我认真表达感受时，TA立刻否定、淡化，或者说我“想太多”“太敏感”。" },
      { letter: "B", body: "TA答应过我的事情却临时改变，没有提前说明，也没有认真解释。" },
      { letter: "C", body: "发生矛盾时，TA突然冷下来、不回应、离开，或者让我一个人面对冲突。" },
      { letter: "D", body: "TA在生气时语气尖锐、讽刺、翻旧账，或者说一些明显带攻击性的话。" },
      { letter: "E", body: "TA没有和我商量，就替我做决定、越过我的边界，或者要求我接受已经决定好的安排。" },
    ],
  },
  {
    id: 6,
    code: "G7",
    title: "现实发生巨大变化时，你相对最能接受关系失去哪一部分？",
    prompt:
      "假设未来一年，你们经历异地、换工作、搬家或长期忙碌。关系不可能完全保持原来的状态。\n以下哪两种变化，是你相对更能接受的？\n请选择最能接受的一项，再选择第二能接受的一项。",
    type: "ranked_two_f",
    hasF: true,
    fPrompt: "以上都不符合，请描述你相对更能接受的变化",
    firstLabel: "第一能接受",
    secondLabel: "第二能接受",
    options: [
      { letter: "A", title: "日常互动减少", body: "联系和生活分享明显减少，但彼此仍保持基本连接，不会无故失联。" },
      { letter: "B", title: "未来路径暂时不确定", body: "暂时无法确定什么时候结束异地、未来在哪里生活，但双方仍明确选择彼此、认真经营现在的关系。" },
      { letter: "C", title: "现实陪伴减少", body: "见面次数和现实相处明显减少，但约定仍然可靠，真正需要彼此时能够找到对方。" },
      { letter: "D", title: "生活融合程度下降", body: "彼此不再深入参与对方的大部分日常安排，但重要变化和重大决定仍会主动同步、共同商量。" },
      { letter: "E", title: "相处节奏变得不固定", body: "过去熟悉的相处模式改变，联系和见面频率可能经常变化，无法维持固定安排，但双方继续投入关系，提前沟通变化。" },
    ],
  },
  {
    id: 7,
    code: "G8",
    title: "回想一段你曾经真正建立信任的关系，当你开始越来越信任TA后，你最明显的变化是什么？",
    prompt: "回想一段你曾经真正建立信任的关系。当你开始越来越信任TA后，你最明显的变化是什么？",
    type: "single_no_f",
    hasF: false,
    options: [
      { letter: "A", title: "表达真实情绪", body: "不再过度隐藏自己，更愿意直接表达真实情绪和想法。" },
      { letter: "B", title: "依赖和寻求帮助", body: "遇到困难时，更愿意向TA寻求帮助，而不是什么都自己扛。" },
      { letter: "C", title: "让TA参与重大决定", body: "面对重要决定，我会自然而然把TA纳入考虑和讨论范围。" },
      { letter: "D", title: "减少猜测和确认", body: "降低对关系的监测，不再频繁担心TA是否爱我。" },
      { letter: "E", title: "更接受彼此拥有独立空间", body: "对自主空间的容忍度提高，即使暂时联系减少，也不会立刻怀疑感情出了问题。" },
    ],
  },
  {
    id: 8,
    code: "S1",
    title: "关系稳定时，你最舒服的相处状态是什么？",
    prompt:
      "假设关系稳定，没有矛盾，也没有人故意疏远。你们都有自己的工作、朋友和生活。\n哪一种状态最接近你觉得自然、舒服、可以长期维持的关系？",
    type: "single_no_f",
    hasF: false,
    options: [
      { letter: "A", title: "高度融合", body: "我喜欢彼此自然参与大部分日常，经常分享小事、讨论安排，也比较清楚对方每天在经历什么。" },
      { letter: "B", title: "稳定陪伴", body: "我希望每天保持稳定交流和共同节奏，同时也保留明确的个人时间和独立活动。" },
      { letter: "C", title: "平行生活＋固定连接", body: "平时各自专注自己的生活，不需要持续分享，但需要固定保留约会、通话或高质量相处时间。" },
      { letter: "D", title: "高度独立＋关键参与", body: "大部分生活各自安排，不需要频繁了解彼此日常，但重要决定和真正需要对方时会深度参与。" },
      { letter: "E", title: "自由流动", body: "不依赖固定联系频率或共同安排，可以长时间各自沉浸生活，需要时自然靠近，重要事情保持同步。" },
    ],
  },
  {
    id: 9,
    code: "S9",
    title: "双方都很忙时，以下哪种状态最接近你的真实需求？",
    prompt:
      "假设你们没有矛盾，也没有人故意冷落对方。双方都知道彼此最近真的很忙，因此联系自然减少。\n以下哪一种最低连接状态，最接近你能够长期适应的真实需求？",
    type: "single_f",
    hasF: true,
    fPrompt: "其他，请描述双方忙碌时，最接近你真实需求的连接方式",
    options: [
      { letter: "A", title: "高频连接", body: "我仍然需要每天多次互动和生活分享。如果明显低于这个程度，我会开始感觉关系正在变远。" },
      { letter: "B", title: "每日连接", body: "我希望每天都能自然联系，但不需要持续聊天或深入交流。只要每天能碰到彼此，我通常不会感到不安。" },
      { letter: "C", title: "低频连接", body: "我不需要每天联系，但每隔两三天需要一次真正有内容的交流，了解彼此最近的状态和想法。" },
      { letter: "D", title: "集中连接", body: "平时联系很少也可以，只要每周有一次专注、完整的深度交流或现实相处时间，我通常能够适应。" },
      { letter: "E", title: "弹性连接", body: "我不需要固定的沟通频率。只要重要事情彼此同步，忙碌时有基本说明，之后能够自然重新靠近，我就可以接受。" },
    ],
  },
  {
    id: 10,
    code: "S2",
    title: "当关系突然有点不对劲时，你最先会怎么做？",
    prompt:
      "假设最近几天，TA明显比平时冷淡了一些：联系变少、回复变短，互动也不像以前自然。你们没有发生明确争吵，你暂时也不知道原因。\n你的第一反应最接近哪一种？请选择最可能首先发生的真实反应，而不是你认为最好的做法。",
    type: "single_f",
    hasF: true,
    fPrompt: "其他，请自行输入",
    options: [
      { letter: "A", title: "立即确认", body: "我会找机会直接问TA最近怎么了，希望尽快弄清发生了什么。" },
      { letter: "B", title: "主动靠近", body: "我会比平时更主动靠近一些，比如分享生活、主动聊天，看看互动能不能自然恢复。" },
      { letter: "C", title: "保持观察", body: "我不会马上询问，但会开始留意TA的回复、联系频率和互动变化，先判断这是暂时状态还是持续变化。" },
      { letter: "D", title: "减少投入", body: "如果TA明显后退，我也会立刻减少投入，先保护自己，再观察TA之后是否会重新靠近。" },
      { letter: "E", title: "暂缓处理", body: "在没有更多信息前，我会先维持自己的生活节奏，不急着猜测或处理；如果这种变化持续一段时间，再决定怎么回应。" },
    ],
  },
  {
    id: 11,
    code: "S7",
    title: "还没正式吵起来，但你已经感到不舒服了，你通常怎么处理？",
    prompt: "有时候，一件事已经让你感到不舒服，但还没有发展成争吵。在真正发生冲突之前，你通常最接近哪一种？",
    type: "single_f",
    hasF: true,
    fPrompt: "其他，请描述你通常会怎样处理这种“还没有吵起来，但已经不舒服”的时刻",
    options: [
      { letter: "A", title: "先压下去", body: "我通常先不说，告诉自己“算了”。如果类似的事情反复发生，可能会在某一次一起说出来。" },
      { letter: "B", title: "及时表达", body: "我通常不会憋太久，会立刻告诉TA刚才发生的事情让我不舒服。" },
      { letter: "C", title: "间接表达", body: "我不会直接说，但语气、互动方式可能会发生变化，或者通过试探让TA自己察觉。" },
      { letter: "D", title: "分析和说理", body: "我会先整理事情的原因、逻辑和具体例子，再向TA解释为什么我认为这里存在问题。" },
      { letter: "E", title: "识别需求再沟通", body: "我通常不会马上说，而是先弄清自己为什么不舒服、真正需要什么，冷静后再提出一个具体需求。" },
    ],
  },
  {
    id: 12,
    code: "S3",
    title: "冲突刚发生时，你最先想处理什么？",
    prompt: "想象你们刚刚发生争执，气氛已经明显紧张。冲突开始后的头几分钟，你最真实的第一反应是什么？",
    type: "single_f",
    hasF: true,
    fPrompt: "其他，请描述冲突刚发生时，你最真实的第一反应",
    options: [
      { letter: "A", title: "尽快把事情讲清楚", body: "我想马上继续沟通，不喜欢问题悬在那里，希望尽快知道我们到底怎么回事。" },
      { letter: "B", title: "先让自己冷静下来", body: "我想暂时离开冲突现场，避免在情绪里继续说下去，等自己稳定一些再回来谈。" },
      { letter: "C", title: "先澄清自己的立场", body: "我会立刻解释自己为什么这样做，希望TA先明白我的真实动机，不要误解我。" },
      { letter: "D", title: "先恢复关系连接", body: "我会先安慰、示好、道歉或缓和气氛，希望确认我们不是在彼此推开，再继续处理问题。" },
      { letter: "E", title: "先拆解问题本身", body: "我会试着把事实、双方感受和真正的分歧分开，先弄清我们到底卡在哪里，再讨论怎么解决。" },
    ],
  },
  {
    id: 13,
    code: "G6",
    title: "一次冲突之后，哪一种修复最能让你恢复对关系的信任和连接？",
    prompt:
      "假设一场争执已经结束，TA也愿意修复关系。但现实中的修复往往不会一次完成所有事情。\n下面五种情况下，哪一种最容易让你首先放下防御，开始重新靠近TA？",
    type: "single_f",
    hasF: true,
    fPrompt: "其他，请描述冲突之后，什么最能帮助你开始真正恢复",
    options: [
      {
        letter: "A",
        title: "先获得真正的理解",
        body: "TA认真听懂了我为什么难过，也能准确理解这件事对我的意义。即使我们暂时还没有找到完整的解决办法，我也会开始感觉好多了。",
      },
      {
        letter: "B",
        title: "先得到明确的道歉和责任承担",
        body: "TA清楚承认自己哪里做得不合适，并认真道歉。即使我们没有继续进行很长的情绪讨论，我也能开始往前走。",
      },
      {
        letter: "C",
        title: "先看到实际行动发生改变",
        body: "TA可能不擅长深入表达或长时间讨论，但之后真的调整了行为。看到变化本身，会让我重新建立信任。",
      },
      {
        letter: "D",
        title: "先恢复彼此的亲密感",
        body: "问题暂时还没有彻底讨论清楚，但通过拥抱、陪伴、聊天或一起做熟悉的事情，我重新感受到：“我们还是站在一起的。”",
      },
      {
        letter: "E",
        title: "先形成具体的解决办法",
        body: "我们可能仍然保留不同感受和观点，但已经一起说清楚：以后类似情况发生时具体怎么处理。有了明确方案，我会更容易真正放下这件事。",
      },
    ],
  },
  {
    id: 14,
    code: "G2",
    title: "当TA迎来重要的发展机会时，以下哪一件事是你最优先希望发生的？",
    prompt:
      "假设TA获得了一个对自己非常重要的发展机会，例如升职、创业、深造或承担重大项目。你真心希望TA发展得更好，也支持TA认真考虑这个机会。但这个变化可能让TA变得更忙、减少陪伴，甚至带来一段异地。在这样的情况下，你最希望接下来发生什么？",
    type: "single_f",
    hasF: true,
    fPrompt: "其他，请描述伴侣迎来重要发展机会时，你最希望彼此怎样面对这个变化",
    options: [
      { letter: "A", title: "一起分享和庆祝这份喜悦", body: "我希望先和TA一起高兴、庆祝和感受这个重要时刻。现实问题可以之后再慢慢讨论。" },
      { letter: "B", title: "一起讨论关系接下来怎么安排", body: "我希望尽快讨论这个变化会怎样影响我们的生活和关系，并共同做出新的安排。" },
      { letter: "C", title: "一起评估现实影响", body: "我希望和TA一起了解机会带来的收益、风险和现实成本，认真讨论它对个人生活和关系可能产生的影响。" },
      { letter: "D", title: "确认我仍然在TA的未来里", body: "我最需要知道，这个变化发生之后，TA依然把我们的关系和共同未来放在认真考虑的位置。" },
      { letter: "E", title: "给TA充分的自主决定空间", body: "我会表达支持和自己的感受，但不会要求自己必须深度参与这个决定，相信TA有权为自己的人生负责。" },
    ],
  },
  {
    id: 15,
    code: "G1",
    title: "如果只能提升一种关系能力，你最想练习什么？",
    prompt:
      "经历过一段或几段关系后，我们往往会慢慢发现：爱一个人是一回事，学会经营关系又是另一回事。哪一项是你目前最想提升的经营关系的能力？",
    type: "single_f",
    hasF: true,
    fPrompt: "其他，请写下你最希望自己在亲密关系中提升的能力",
    options: [
      { letter: "A", body: "表达能力——能够更直接、清楚地表达自己的感受和需要，不指责、不试探、不积累不满。" },
      { letter: "B", body: "情绪稳定能力——面对关系变化和暂时不确定性，能够及时自我调节情绪，保持自己生活节奏，不轻易陷入反复猜测。" },
      { letter: "C", body: "保持自我边界能力——亲近一个人的同时，仍然保留自己的判断、生活方向和独立空间，不让亲密关系成为人生的全部中心。" },
      { letter: "D", body: "处理冲突能力——出现矛盾时，减少攻击、逃避、防御，寻求更有效的沟通方式、修复关系。" },
      { letter: "E", body: "共情理解能力——能够站在TA的角度理解对方的感受和行为，看见彼此的差异，同时接纳对方的不完美。" },
    ],
  },
];

export function getQuestion(id: number): Question {
  const q = QUESTIONS.find((item) => item.id === id);
  if (!q) throw new Error(`Unknown question id ${id}`);
  return q;
}

export type QuestionAnswer = { value: string } | { first: string; second: string };
export type Answers = Record<string, QuestionAnswer>;
export type FTextInputs = Record<string, string>;

function letterSet(q: Question, { includeF }: { includeF: boolean }): Set<string> {
  const letters = q.options.map((o) => o.letter);
  if (includeF && q.hasF) letters.push("F");
  return new Set(letters);
}

/**
 * 按题型校验 answers 的结构是否完整合法。返回错误信息数组，空数组表示通过。
 * f_text_inputs 不参与校验：某题选了 F 但文本留空是允许的状态，system prompt 会按"信息不足"处理。
 */
export function validateAnswers(answers: Answers): string[] {
  const errors: string[] = [];

  for (const q of QUESTIONS) {
    const key = `q${q.id}`;
    const ans = answers[key];
    if (!ans) {
      errors.push(`${key} 缺少答案`);
      continue;
    }

    if (q.type === "single_f" || q.type === "single_no_f") {
      if (!("value" in ans) || typeof ans.value !== "string") {
        errors.push(`${key} 应为单选格式 {value}`);
        continue;
      }
      const valid = letterSet(q, { includeF: true });
      if (!valid.has(ans.value)) errors.push(`${key} 选项 "${ans.value}" 不合法`);
      continue;
    }

    // ranked_two / ranked_two_f / best_worst_two_step 都是 {first, second} 形状
    if (!("first" in ans) || !("second" in ans) || typeof ans.first !== "string" || typeof ans.second !== "string") {
      errors.push(`${key} 应为两步/排序格式 {first, second}`);
      continue;
    }

    if (q.type === "best_worst_two_step") {
      const firstValid = letterSet(q, { includeF: true });
      const secondValid = letterSet(q, { includeF: false }); // 第二步永远不提供 F
      if (!firstValid.has(ans.first)) errors.push(`${key} 第一步选项 "${ans.first}" 不合法`);
      if (!secondValid.has(ans.second)) errors.push(`${key} 第二步选项 "${ans.second}" 不合法`);
      if (ans.first === ans.second) errors.push(`${key} 第一步与第二步不能相同`);
    } else {
      // ranked_two / ranked_two_f
      const valid = letterSet(q, { includeF: true });
      if (!valid.has(ans.first)) errors.push(`${key} 第一优先 "${ans.first}" 不合法`);
      if (!valid.has(ans.second)) errors.push(`${key} 第二优先 "${ans.second}" 不合法`);
      if (ans.first === ans.second) errors.push(`${key} 第一优先与第二优先不能相同`);
    }
  }

  return errors;
}
