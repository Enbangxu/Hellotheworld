import type { Chapter, LocalizedText, Subject, Topic } from "./types";

const text = (zh: string, en = zh, ja = zh): LocalizedText => ({ zh, en, ja });
type ChapterSeed = [slug: string, title: string, topics: Array<[slug: string, title: string, summary?: string, formula?: string]>];

function makeTopic(subject: string, chapter: string, seed: ChapterSeed[2][number]): Topic {
  const [slug, title, suppliedSummary, formula] = seed;
  const id = `${subject}.${chapter}.${slug}`;
  const summary = suppliedSummary ?? `${title}的核心是先识别条件，再选择规则，最后用结果检查条件是否全部满足。`;
  return { id, slug, chapterId: `${subject}.${chapter}`, title: text(title), learningObjective: text(`能解释${title}，并在中考常见情境中正确应用。`, `Explain and apply ${title} in a typical Grade 9 problem.`, `${title}を説明し、典型問題に応用できる。`), tenSecondSummary: text(summary), analogy: text(`把${title}想成导航：条件是起点，规则是路线，结论是终点。`), keyPoints: [text("先读清对象、条件与问题"), text("用定义、规律或证据建立联系"), text("回到题目检验结论")], methodSteps: [text("圈出关键词和已知条件"), text("匹配对应概念或公式"), text("写出结论并检查")], commonMistakes: [text("只记结论，不检查适用条件")], formula, workedExample: text(`例：遇到${title}题，先列已知条件，写出依据，再完成推导并验算。`), quickCheck: { question: text(`学习${title}时，第一步最合理的是？`), options: [text("识别条件和问题"), text("直接猜答案"), text("忽略单位或语境")], answer: text("识别条件和问题"), explanation: text("条件决定概念、公式或阅读证据能否使用。") }, relatedTopicIds: [], keywords: [title, subject] };
}

function makeSubject(slug: string, name: string, icon: string, color: string, chapters: ChapterSeed[]): Subject {
  const built: Chapter[] = chapters.map(([chapterSlug, title, topics], index) => ({ id: `${slug}.${chapterSlug}`, slug: chapterSlug, title: text(title), description: text(`掌握${title}的核心概念、方法、易错点与中考应用。`), order: index + 1, topics: topics.map((topic) => makeTopic(slug, chapterSlug, topic)) }));
  const all = built.flatMap((chapter) => chapter.topics);
  all.forEach((topic, index) => { topic.relatedTopicIds = [all[(index + 1) % all.length].id]; });
  return { id: slug, slug, name: text(name), shortDescription: text(`${name}九年级上册通用能力与核心知识。`, `Grade 9 first-semester ${name} core curriculum.`, `9年生前期の${name}共通カリキュラム。`), icon, color, curriculum: "中国大陆通用中考课程框架", edition: "通用版", grade: 9, semester: "first", chapters: built };
}

export const subjects: Subject[] = [
  makeSubject("chinese", "语文", "文", "#fb7185", [
    ["argument", "议论文阅读", [["argument-structure", "论点、论据与论证"], ["argument-methods", "论证方法与作用"]]],
    ["fiction", "小说阅读", [["character", "人物形象分析"], ["plot-environment", "情节与环境作用"]]],
    ["classics", "古诗文理解", [["poetry", "古诗词意象与情感"], ["classical-chinese", "文言实词、句式与翻译"]]],
    ["literacy", "名著与语言运用", [["masterpieces", "名著阅读方法"], ["language-use", "语段概括与综合运用"]]],
    ["writing", "写作", [["structure", "审题立意与结构"], ["evidence", "选材、细节与修改"]]],
  ]),
  makeSubject("mathematics", "数学", "数", "#38bdf8", [
    ["quadratic-equations", "一元二次方程", [["roots", "解一元二次方程", "配方、公式或因式分解都在寻找使等式成立的未知数。", "x=(-b±√(b²-4ac))/(2a)"], ["discriminant", "根的判别式", "Δ=b²-4ac：正数有两个不等实根，零有两个相等实根，负数无实根。", "Δ=b²-4ac"], ["vieta", "根与系数关系", "两根之和是-b/a，两根之积是c/a。", "x₁+x₂=-b/a；x₁x₂=c/a"]]],
    ["quadratic-functions", "二次函数", [["graph", "二次函数图像", "y=ax²+bx+c 的图像是抛物线，a决定开口，顶点决定最值。", "x=-b/(2a)"], ["transform", "抛物线平移与最值"]]],
    ["rotation", "旋转", [["rotation-properties", "旋转的性质"], ["central-symmetry", "中心对称"]]],
    ["circle", "圆", [["circle-basics", "圆的基本性质"], ["angles", "圆周角定理"], ["tangent", "切线的判定与性质"]]],
    ["probability", "概率初步", [["random-event", "随机事件与概率"], ["tree-diagram", "列表法与树状图"]]],
  ]),
  makeSubject("english", "英语", "En", "#a78bfa", [
    ["grammar", "核心语法", [["passive-voice", "被动语态"], ["relative-clauses", "定语从句"], ["reported-speech", "宾语从句与间接引语"]]],
    ["vocabulary", "词汇与主题", [["word-formation", "构词法与语境猜词"], ["topic-vocabulary", "人与社会、科技与文化词汇"]]],
    ["listening-speaking", "听说策略", [["listening", "听力预测与抓关键词"], ["speaking", "交际表达与追问"]]],
    ["reading", "阅读策略", [["main-idea", "主旨与篇章结构"], ["inference", "细节定位与推断"]]],
    ["writing", "写作能力", [["paragraph", "段落组织与衔接"], ["revision", "应用文与检查修改"]]],
  ]),
  makeSubject("physics", "物理", "⚡", "#fbbf24", [
    ["internal-energy", "内能及其利用", [["internal-energy", "内能与热传递"], ["heat-engine", "热机与能量转化"]]],
    ["current-circuit", "电流和电路", [["circuit", "电路组成与状态"], ["series-parallel", "串并联电路分析"]]],
    ["voltage-resistance", "电压与电阻", [["voltage", "电压及其测量", "电压推动电荷定向移动，电压表必须并联。", "U（伏特，V）"], ["resistance", "电阻与变阻器"]]],
    ["ohms-law", "欧姆定律", [["ohm", "欧姆定律", "同一导体中电流等于电压除以电阻，计算时单位统一。", "I=U/R"], ["measure-resistance", "伏安法测电阻"]]],
    ["electric-power", "电功与电功率", [["electric-work", "电功"], ["electric-power", "电功率", "电功率表示用电器做电功的快慢。", "P=UI；W=Pt"]]],
    ["safe-electricity", "生活用电", [["home-circuit", "家庭电路"], ["safety", "安全用电原则"]]],
  ]),
  makeSubject("chemistry", "化学", "化", "#34d399", [
    ["lab", "走进化学世界", [["changes", "物理变化与化学变化"], ["operations", "基本实验操作"]]],
    ["air", "空气", [["air-composition", "空气的组成"], ["oxygen", "氧气的性质与制取"]]],
    ["particles", "物质构成的奥秘", [["particles", "分子、原子与离子"], ["elements", "元素与化合价"]]],
    ["water", "自然界的水", [["purification", "水的净化"], ["chemical-formula", "化学式与相对分子质量"]]],
    ["equations", "化学方程式", [["balancing", "质量守恒与配平"], ["stoichiometry", "根据方程式计算"]]],
    ["carbon", "碳和碳的氧化物", [["carbon", "碳单质与还原性"], ["carbon-oxides", "二氧化碳的性质与检验"]]],
    ["fuels", "燃料及其利用", [["combustion", "燃烧条件与灭火"], ["energy-environment", "燃料、能源与环境"]]],
  ]),
  makeSubject("morality-law", "道德与法治", "法", "#f97316", [
    ["prosperity-innovation", "富强与创新", [["reform", "改革开放与共同富裕"], ["innovation", "创新驱动发展"]]],
    ["democracy-law", "民主与法治", [["democracy", "追求民主价值"], ["rule-of-law", "建设法治中国"]]],
    ["civilization-home", "文明与家园", [["culture", "中华文化与文化自信"], ["ecology", "绿色发展与生态文明"]]],
    ["harmony-dream", "和谐与梦想", [["unity", "民族团结与祖国统一"], ["china-dream", "中国梦与青年担当"]]],
    ["material-questions", "材料题方法", [["material-analysis", "材料题审题与定位"], ["answer-structure", "观点—材料—行动答题法"]]],
  ]),
  makeSubject("history", "历史", "史", "#e879f9", [
    ["ancient-civilizations", "古代文明", [["early-civilizations", "亚非古代文明"], ["greek-roman", "希腊罗马古典文明"]]],
    ["feudal-era", "封建时代", [["europe-feudal", "西欧封建社会"], ["asia-feudal", "亚洲封建国家"]]],
    ["early-modern", "近代早期变化", [["renaissance", "文艺复兴与新航路"], ["colonization", "早期殖民扩张"]]],
    ["capitalism", "资本主义制度建立", [["english-revolution", "英国资产阶级革命"], ["american-french", "美国独立与法国大革命"]]],
    ["industrial-revolution", "工业革命", [["steam-age", "第一次工业革命"], ["industrial-impact", "工业化的影响"]]],
    ["workers-movement", "国际工人运动", [["marxism", "马克思主义诞生"], ["paris-commune", "工人运动与巴黎公社"]]],
    ["history-methods", "历史学习方法", [["timeline", "时间线与因果链"], ["source-analysis", "史料题证据分析"]]],
  ]),
];
