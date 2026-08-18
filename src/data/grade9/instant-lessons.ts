import type { InstantLesson } from "./types";

const same = (text: string) => ({ zh: text, en: text, ja: text });

/** 83 个知识点各自独立的一眼看懂内容；键与公开 topic id 一一对应。 */
export const instantLessons: Record<string, InstantLesson> = {
  "chinese.argument.argument-structure": {
    plainMeaning: same("论点是作者主张，论据是支撑主张的材料，论证是用材料说服读者的过程"),
    concreteExample: same("“坚持阅读能拓宽眼界，因为书能带我们接触不同人生。”；论点：阅读拓宽眼界；论据：书呈现不同人生"),
  },
  "chinese.argument.argument-methods": {
    plainMeaning: same("论证方法是作者证明论点的具体办法，常见有举例、道理、对比和比喻论证"),
    concreteExample: same("“司马迁受辱仍写成《史记》，可见坚持能成就事业。”；这是举例论证，使主张具体可信"),
  },
  "chinese.fiction.character": {
    plainMeaning: same("人物形象是人物在言行、心理和他人评价中表现出的性格与品质"),
    concreteExample: same("他把唯一的伞塞给同学，自己冒雨跑回家；表现他体贴、乐于助人"),
  },
  "chinese.fiction.plot-environment": {
    plainMeaning: same("情节是事件的发展过程；环境是人物活动的时间、地点和社会背景"),
    concreteExample: same("暴雨封住山路，送药的人仍摸黑前行；环境推动情节，并突出人物负责"),
  },
  "chinese.classics.poetry": {
    plainMeaning: same("意象是诗中带有情感意味的景物；多个意象共同营造意境并传达感情"),
    concreteExample: same("“枯藤老树昏鸦，小桥流水人家”；表达游子的孤独与思乡"),
  },
  "chinese.classics.classical-chinese": {
    plainMeaning: same("文言实词要结合语境确定意思，翻译还要落实特殊句式并补出省略成分"),
    concreteExample: same("“一狼洞其中”；译为“一只狼在柴草堆中打洞”"),
  },
  "chinese.literacy.masterpieces": {
    plainMeaning: same("名著阅读是依据作品中的人物、情节和主题回答问题，而不是只背作者与书名"),
    concreteExample: same("问“孙悟空为何三打白骨精”；体现他善于识妖、坚定尽责"),
  },
  "chinese.literacy.language-use": {
    plainMeaning: same("语段概括是保留主要人物或事物、核心事件和结果，删去修饰与次要细节"),
    concreteExample: same("某校三月启动读书节，举办讲座和换书活动，千余学生参加；可概括为“某校举办读书节，多项活动吸引千余学生”"),
  },
  "chinese.writing.structure": {
    plainMeaning: same("审题是弄清写作范围和限制，立意是确定文章要表达的中心，结构是安排材料顺序"),
    concreteExample: same("题目“那一次，我选择了坚持”；中心可定为“坚持让我突破畏难”"),
  },
  "chinese.writing.evidence": {
    plainMeaning: same("选材是挑选能表现中心的事件，细节是把关键瞬间写具体，修改是删换补调使表达更准确"),
    concreteExample: same("写“奶奶关心我”，选她雨夜送伞；细节让“关心”可见，删减使中心集中"),
  },
  "mathematics.quadratic-equations.roots": {
    plainMeaning: same("一元二次方程是只含一个未知数且最高次数为2的整式方程，一般式为ax²+bx+c=0（a≠0）"),
    concreteExample: same("x²-5x+6=0；x₁=2，x₂=3"),
    essentialFormula: "x=(-b±√(b²-4ac))/(2a)",
    formulaExplanation: same("a、b、c是方程的系数，a不能为0；满足b²-4ac≥0时可求实数根。"),
  },
  "mathematics.quadratic-equations.discriminant": {
    plainMeaning: same("判别式Δ=b²-4ac能判断ax²+bx+c=0（a≠0）的实数根个数"),
    concreteExample: same("x²-4x+4=0；方程有两个相等实根"),
    essentialFormula: "Δ=b²-4ac",
    formulaExplanation: same("a、b、c是方程的系数，a不能为0；Δ大于、等于、小于0分别对应两个、一个、没有实数根。"),
  },
  "mathematics.quadratic-equations.vieta": {
    plainMeaning: same("对于ax²+bx+c=0（a≠0），两根之和为-b/a，积为c/a"),
    concreteExample: same("2x²-5x+3=0；x₁+x₂=5/2，x₁x₂=3/2"),
    essentialFormula: "x₁+x₂=-b/a；x₁x₂=c/a",
    formulaExplanation: same("a、b、c是方程的系数，a不能为0；x₁、x₂表示方程的两个根。"),
  },
  "mathematics.quadratic-functions.graph": {
    plainMeaning: same("二次函数y=ax²+bx+c（a≠0）的图像是抛物线，对称轴为x=-b/2a"),
    concreteExample: same("y=x²-4x+3；顶点(2,-1)，对称轴x=2，开口向上"),
    essentialFormula: "x=-b/(2a)",
    formulaExplanation: same("a、b是二次函数的系数，a不能为0；这个式子给出抛物线对称轴的位置。"),
  },
  "mathematics.quadratic-functions.transform": {
    plainMeaning: same("抛物线y=a(x-h)²+k由y=ax²平移得到，顶点是(h,k)"),
    concreteExample: same("y=2(x-3)²+1；顶点(3,1)，最小值为1"),
  },
  "mathematics.rotation.rotation-properties": {
    plainMeaning: same("旋转是图形绕定点转过一定角度；对应点到旋转中心距离相等，转过角相等"),
    concreteExample: same("点A(1,0)绕原点逆时针旋转90°；A的对应点是A′(0,1)"),
  },
  "mathematics.rotation.central-symmetry": {
    plainMeaning: same("两个图形绕某点旋转180°后重合，就关于该点中心对称"),
    concreteExample: same("A(2,1)关于原点对称；A′(-2,-1)"),
  },
  "mathematics.circle.circle-basics": {
    plainMeaning: same("圆是到定点距离等于定长的所有点组成的图形；定点是圆心，定长是半径"),
    concreteExample: same("半径5，圆心到弦AB距离3；半弦=√(5²-3²)=4，所以AB=8"),
  },
  "mathematics.circle.angles": {
    plainMeaning: same("同弧所对的圆周角相等，并且等于该弧所对圆心角的一半"),
    concreteExample: same("弧AB所对圆心角∠AOB=100°；∠ACB=50°"),
  },
  "mathematics.circle.tangent": {
    plainMeaning: same("直线与圆只有一个公共点时是切线；经过半径外端且垂直于半径的直线是切线"),
    concreteExample: same("OA是半径，直线l过A，且OA⊥l；l是圆O的切线"),
  },
  "mathematics.probability.random-event": {
    plainMeaning: same("随机事件在一次试验中可能发生也可能不发生；概率表示发生可能性的大小，范围是0到1"),
    concreteExample: same("掷一枚均匀骰子，求点数大于4的概率；P=2/6=1/3"),
  },
  "mathematics.probability.tree-diagram": {
    plainMeaning: same("列表或树状图能按步骤列出多次随机试验的所有等可能结果，避免重复和遗漏"),
    concreteExample: same("连续抛两次硬币，求一正一反；有利2种，共4种，概率1/2"),
  },
  "english.grammar.passive-voice": {
    plainMeaning: same("被动语态表示主语是动作的承受者，基本结构是be + 过去分词"),
    concreteExample: same("People grow tea here. / Tea is grown here.；主动：人们种茶；被动：茶在这里被种植"),
  },
  "english.grammar.relative-clauses": {
    plainMeaning: same("定语从句放在名词后修饰它，关系词who、which、that等连接从句并在从句中充当成分"),
    concreteExample: same("The girl who is singing is my sister.；正在唱歌的女孩是我妹妹"),
  },
  "english.grammar.reported-speech": {
    plainMeaning: same("宾语从句在动词后充当宾语；间接引语用宾语从句转述别人说的话"),
    concreteExample: same("He asks, “Are you ready?”；He asks if I am ready."),
  },
  "english.vocabulary.word-formation": {
    plainMeaning: same("构词法用前缀、后缀和词根判断词义与词性，语境则帮助确认具体意思"),
    concreteExample: same("“This bag is reusable, so we needn’t throw it away.”；reusable意为“可重复使用的”"),
  },
  "english.vocabulary.topic-vocabulary": {
    plainMeaning: same("主题词汇是围绕人与社会、科技、文化等话题共同出现并准确搭配的词语"),
    concreteExample: same("“Technology makes communication faster.”；科技让交流更快捷"),
  },
  "english.listening-speaking.listening": {
    plainMeaning: same("听力预测是听前根据题干猜测信息类型，抓关键词是在听中锁定人物、时间、地点、转折和数字"),
    concreteExample: same("题干问“How will Tom go?”；答案是by bike"),
  },
  "english.listening-speaking.speaking": {
    plainMeaning: same("交际表达要根据场景清楚回应，并用追问确认信息或延续对话"),
    concreteExample: same("A: I joined a science club. B: Really? What do you do there?"),
  },
  "english.reading.main-idea": {
    plainMeaning: same("主旨是全文最核心的信息，篇章结构是作者展开这一信息的顺序"),
    concreteExample: same("三段分别写塑料危害、减塑办法、个人行动；主旨是“我们为什么以及怎样减少塑料使用”"),
  },
  "english.reading.inference": {
    plainMeaning: same("细节定位是回原文找对应信息；推断是在明示信息基础上得出未直接写出的意思"),
    concreteExample: same("“Leo took an umbrella although the sun was shining.”；可推断Leo认为可能下雨"),
  },
  "english.writing.paragraph": {
    plainMeaning: same("英语段落通常用主题句提出中心，支撑句给理由或例子，结尾句收束；连接词表明句间关系"),
    concreteExample: same("“Exercise matters. It keeps us healthy and reduces stress.”；三句围绕同一中心"),
  },
  "english.writing.revision": {
    plainMeaning: same("应用文要符合对象、目的和格式；检查修改要逐项核对内容、时态、主谓一致、拼写和标点"),
    concreteExample: same("邀请邮件漏写活动时间；补上“at 3 p.m. this Friday”，邮件信息完整"),
  },
  "physics.internal-energy.internal-energy": {
    plainMeaning: same("内能是物体内所有分子动能和势能的总和；改变内能可用热传递或做功"),
    concreteExample: same("搓手后手掌发热；手掌内能增加、温度升高"),
  },
  "physics.internal-energy.heat-engine": {
    plainMeaning: same("热机把燃料燃烧释放的内能转化为机械能，汽油机循环含吸气、压缩、做功、排气四冲程"),
    concreteExample: same("汽油机获得2×10⁶ J机械能，燃料放热5×10⁶ J；热机效率为40%"),
  },
  "physics.current-circuit.circuit": {
    plainMeaning: same("电路由电源、用电器、开关和导线组成；通路有电流，断路无电流，短路会产生过大电流"),
    concreteExample: same("灯泡不亮，开关闭合但一根导线断开；这是断路，电路中无电流"),
  },
  "physics.current-circuit.series-parallel": {
    plainMeaning: same("串联电路只有一条电流路径；并联电路有两条或更多支路"),
    concreteExample: same("并联两灯电流分别0.2 A、0.3 A；干路电流为0.5 A"),
  },
  "physics.voltage-resistance.voltage": {
    plainMeaning: same("电压是形成电流的原因，单位是伏特（V）；电压表测元件两端电压"),
    concreteExample: same("测小灯泡电压，估计约2.5 V；读数若为2.4，则灯泡两端电压2.4 V"),
    essentialFormula: "U（伏特，V）",
    formulaExplanation: same("U表示电压，单位伏特，简称伏，符号是V。"),
  },
  "physics.voltage-resistance.resistance": {
    plainMeaning: same("电阻表示导体对电流阻碍作用的大小，单位是欧姆（Ω）；滑动变阻器靠改变接入电路的电阻丝长度调阻"),
    concreteExample: same("变阻器接A上、D下，滑片远离D；接入电阻变大，电流变小"),
  },
  "physics.ohms-law.ohm": {
    plainMeaning: same("导体中的电流与其两端电压成正比，与电阻成反比，公式I=U/R"),
    concreteExample: same("6 Ω电阻两端电压12 V；电流I=2 A"),
    essentialFormula: "I=U/R",
    formulaExplanation: same("I是电流，U是电压，R是电阻；只适用于同一段导体在状态不变时。"),
  },
  "physics.ohms-law.measure-resistance": {
    plainMeaning: same("伏安法用电压表测电阻两端电压、用电流表测通过电阻的电流，再由R=U/I计算"),
    concreteExample: same("电压表2.4 V，电流表0.3 A；电阻为8 Ω"),
  },
  "physics.electric-power.electric-work": {
    plainMeaning: same("电功是电流做的功，表示消耗或转化的电能，W=UIt，单位焦耳（J）"),
    concreteExample: same("用电器在220 V下通过0.5 A电流工作10 s；电功为1100 J"),
  },
  "physics.electric-power.electric-power": {
    plainMeaning: same("电功率表示电流做功的快慢，P=W/t=UI，单位是瓦特（W）"),
    concreteExample: same("小灯泡两端6 V，通过0.5 A；电功率为3 W"),
    essentialFormula: "P=UI；W=Pt",
    formulaExplanation: same("P是电功率，U是电压，I是电流；W是电功，t是用电时间。"),
  },
  "physics.safe-electricity.home-circuit": {
    plainMeaning: same("家庭电路中各用电器并联，火线与零线间电压约220 V；开关和保险装置应接在火线上"),
    concreteExample: same("关闭客厅灯后冰箱仍运行；一个支路断开不影响另一个"),
  },
  "physics.safe-electricity.safety": {
    plainMeaning: same("安全用电要避免人体同时接触火线和大地，不用湿手触碰电器，发现触电先切断电源"),
    concreteExample: same("有人触电倒地；切断电流后再施救并求助"),
  },
  "chemistry.lab.changes": {
    plainMeaning: same("物理变化没有生成新物质；化学变化生成了新物质，常伴随变色、放气、沉淀或放热发光"),
    concreteExample: same("蜡烛熔化后继续燃烧；熔化是物理变化，燃烧是化学变化"),
  },
  "chemistry.lab.operations": {
    plainMeaning: same("基本实验操作要求取用、加热、连接和洗涤都安全准确，避免污染试剂或造成伤害"),
    concreteExample: same("加热试管中的少量液体；操作安全且受热均匀"),
  },
  "chemistry.air.air-composition": {
    plainMeaning: same("空气是混合物，按体积约含78%氮气、21%氧气，另有稀有气体、二氧化碳等"),
    concreteExample: same("红磷在密闭空气中充分燃烧；说明氧气约占空气体积的1/5"),
  },
  "chemistry.air.oxygen": {
    plainMeaning: same("氧气能支持燃烧并具有氧化性；实验室可用过氧化氢在二氧化锰催化下制取"),
    concreteExample: same("把带火星木条伸入一瓶无色气体；该气体可判断为氧气"),
  },
  "chemistry.particles.particles": {
    plainMeaning: same("分子、原子和离子都是构成物质的微粒；原子得失电子形成带电离子"),
    concreteExample: same("水电解生成氢气和氧气；分子种类改变，原子种类和数目不变"),
  },
  "chemistry.particles.elements": {
    plainMeaning: same("元素是质子数相同的一类原子的总称；化合价表示元素原子间化合时的数目关系"),
    concreteExample: same("求Fe₂O₃中铁的化合价；铁元素为+3价"),
  },
  "chemistry.water.purification": {
    plainMeaning: same("净水可经沉淀、过滤、吸附和蒸馏；过滤除不溶物，蒸馏能除去多数可溶杂质"),
    concreteExample: same("浑浊水含泥沙和可溶性盐；滤液仍可能含盐，蒸馏水较纯"),
  },
  "chemistry.water.chemical-formula": {
    plainMeaning: same("化学式用元素符号和右下角数字表示物质组成；相对分子质量等于各原子相对原子质量总和"),
    concreteExample: same("计算H₂O的相对分子质量；H₂O的相对分子质量为18"),
  },
  "chemistry.equations.balancing": {
    plainMeaning: same("质量守恒定律指出化学反应前后各元素的原子种类和数目不变；配平使方程式两边原子数相等"),
    concreteExample: same("配平H₂ + O₂ → H₂O；2H₂ + O₂ = 2H₂O"),
  },
  "chemistry.equations.stoichiometry": {
    plainMeaning: same("化学方程式中化学计量数之比表示微粒个数比，也可转化为物质质量比进行计算"),
    concreteExample: same("2H₂+O₂=2H₂O，4 g H₂完全反应；生成36 g水"),
  },
  "chemistry.carbon.carbon": {
    plainMeaning: same("金刚石、石墨等碳单质性质不同源于原子排列不同；碳在高温下能夺取某些氧化物中的氧，具有还原性"),
    concreteExample: same("2CuO+C 高温→2Cu+CO₂↑；碳表现还原性"),
  },
  "chemistry.carbon.carbon-oxides": {
    plainMeaning: same("二氧化碳是无色气体，不燃烧也不支持燃烧；能使澄清石灰水变浑浊"),
    concreteExample: same("把气体通入澄清石灰水；可检验气体中有二氧化碳"),
  },
  "chemistry.fuels.combustion": {
    plainMeaning: same("燃烧通常需要可燃物、与氧气接触并达到着火点；灭火只需破坏其中一个条件"),
    concreteExample: same("炒菜油锅起火，用锅盖盖住；火焰熄灭"),
  },
  "chemistry.fuels.energy-environment": {
    plainMeaning: same("燃料燃烧释放能量，也可能产生二氧化碳、二氧化硫和颗粒物；选择能源要兼顾效率、储量与环境"),
    concreteExample: same("用天然气替代散煤取暖；可减轻局地空气污染，但仍排放CO₂"),
  },
  "morality-law.prosperity-innovation.reform": {
    plainMeaning: same("改革开放是当代中国最鲜明的特色；共同富裕是全体人民共享发展成果，不是同时同等富裕"),
    concreteExample: same("家乡建产业园并培训居民就业；这体现改革促进发展并朝共同富裕迈进"),
  },
  "morality-law.prosperity-innovation.innovation": {
    plainMeaning: same("创新是产生新知识、新技术或新方法并创造价值；创新驱动发展强调把创新作为发展动力"),
    concreteExample: same("学生把分类垃圾桶改成满载提醒装置；这是生活创新，也体现技术改善生活"),
  },
  "morality-law.democracy-law.democracy": {
    plainMeaning: same("社会主义民主强调人民当家作主，公民通过选举、协商、监督等方式参与公共生活"),
    concreteExample: same("社区改造前召开居民议事会；这体现协商民主和民主决策"),
  },
  "morality-law.democracy-law.rule-of-law": {
    plainMeaning: same("法治要求国家和社会依照良法治理，所有组织和个人都在法律范围内活动"),
    concreteExample: same("交警依法处罚闯红灯的公务人员；体现法律面前人人平等和严格执法"),
  },
  "morality-law.civilization-home.culture": {
    plainMeaning: same("中华文化是各族人民长期创造的精神成果；文化自信是对自身文化价值和生命力的坚定信念"),
    concreteExample: same("博物馆用数字动画展示古画；这是优秀传统文化的创新传播"),
  },
  "morality-law.civilization-home.ecology": {
    plainMeaning: same("绿色发展是在保护生态环境的前提下发展经济，实现人与自然和谐共生"),
    concreteExample: same("工厂升级设备并循环使用工业用水；体现节约资源、绿色生产"),
  },
  "morality-law.harmony-dream.unity": {
    plainMeaning: same("民族团结是各民族平等、团结、互助、和谐；祖国统一是中华民族根本利益所在"),
    concreteExample: same("学校食堂尊重不同民族饮食习惯；这是维护民族团结的具体行动"),
  },
  "morality-law.harmony-dream.china-dream": {
    plainMeaning: same("中国梦是实现中华民族伟大复兴，基本内涵是国家富强、民族振兴、人民幸福"),
    concreteExample: same("学生参加乡村科技志愿服务；这是青年担当的具体表现"),
  },
  "morality-law.material-questions.material-analysis": {
    plainMeaning: same("材料题审题与定位是从设问限定词和材料关键词中找到对应教材知识"),
    concreteExample: same("设问“从法治角度评价商家行为”；答案应判断行为并结合法律理由"),
  },
  "morality-law.material-questions.answer-structure": {
    plainMeaning: same("“观点—材料—行动”答题法是先明确判断，再结合材料分析，最后给出可行做法"),
    concreteExample: same("材料写学生发现河道垃圾并向平台举报；答案既有道理，也紧扣材料和实际行动"),
  },
  "history.ancient-civilizations.early-civilizations": {
    plainMeaning: same("古埃及、两河流域、古印度等早期文明多在大河流域形成，创造文字、制度和大型建筑"),
    concreteExample: same("尼罗河定期泛滥后留下肥沃淤泥；大河环境促进古埃及文明发展"),
  },
  "history.ancient-civilizations.greek-roman": {
    plainMeaning: same("古希腊城邦发展出雅典民主等制度，古罗马从共和国扩张为帝国并形成影响深远的法律"),
    concreteExample: same("雅典公民大会讨论城邦事务；民主范围有限，却是古代重要政治实践"),
  },
  "history.feudal-era.europe-feudal": {
    plainMeaning: same("中世纪西欧以封君封臣关系和庄园经济为重要特征，城市复兴后工商业逐渐发展"),
    concreteExample: same("封臣受封土地并向封君宣誓效忠；构成西欧封建等级制度的重要纽带"),
  },
  "history.feudal-era.asia-feudal": {
    plainMeaning: same("中古亚洲形成各具特点的封建国家，如日本大化改新建立中央集权制度，阿拉伯帝国促进文化交流"),
    concreteExample: same("日本646年开始大化改新；日本发展为中央集权的封建国家"),
  },
  "history.early-modern.renaissance": {
    plainMeaning: same("文艺复兴以人文主义反对神权束缚；新航路把分散地区日益连成整体"),
    concreteExample: same("达·芬奇作品关注真实的人体和情感；体现文艺复兴的人文主义"),
  },
  "history.early-modern.colonization": {
    plainMeaning: same("早期殖民扩张是欧洲国家以武力、贸易垄断和奴隶贸易掠夺海外财富的过程"),
    concreteExample: same("三角贸易把非洲人贩往美洲；加速欧洲资本积累，也造成深重灾难"),
  },
  "history.capitalism.english-revolution": {
    plainMeaning: same("英国资产阶级革命推翻封建专制，1689年《权利法案》限制王权，逐步确立君主立宪制"),
    concreteExample: same("《权利法案》规定国王不得擅自征税；英国逐步形成君主立宪制"),
  },
  "history.capitalism.american-french": {
    plainMeaning: same("美国独立战争摆脱英国殖民统治并建立共和国；法国大革命推翻封建专制并传播自由平等思想"),
    concreteExample: same("《独立宣言》宣布人人生而平等；《人权宣言》主张法律面前平等；两场革命推动资本主义制度和民主思想发展"),
  },
  "history.industrial-revolution.steam-age": {
    plainMeaning: same("第一次工业革命以机器生产取代手工劳动，蒸汽机改良使工厂摆脱水力和地点限制"),
    concreteExample: same("瓦特改良蒸汽机后，工厂可建在城市；人类进入“蒸汽时代”，工厂制度发展"),
  },
  "history.industrial-revolution.industrial-impact": {
    plainMeaning: same("工业化大幅提高生产力并推动城市化，也造成贫富分化、劳动困境和环境污染"),
    concreteExample: same("城市工厂增加，就业人口涌入但住房拥挤、烟尘严重；工业化既促进发展，也带来社会环境问题"),
  },
  "history.workers-movement.marxism": {
    plainMeaning: same("马克思主义揭示资本主义社会矛盾，提出无产阶级通过斗争实现自身解放；1848年《共产党宣言》发表标志其诞生"),
    concreteExample: same("1848年《共产党宣言》公开发表；马克思主义从此公开问世"),
  },
  "history.workers-movement.paris-commune": {
    plainMeaning: same("巴黎公社是1871年巴黎工人建立政权的尝试，是无产阶级夺取政权的第一次伟大实践"),
    concreteExample: same("公社废除旧军队并由人民选举公职人员；体现工人政权的新探索"),
  },
  "history.history-methods.timeline": {
    plainMeaning: same("时间线按先后排列事件，因果链说明前一变化怎样促成后一变化；先后关系不自动等于因果关系"),
    concreteExample: same("新航路开辟后，欧洲殖民扩张加速；前者是后者的重要条件，不只是时间在前"),
  },
  "history.history-methods.source-analysis": {
    plainMeaning: same("史料分析要先辨来源、作者、时代和目的，再提取信息，与其他材料互证后得出有限结论"),
    concreteExample: same("一名工厂主日记称“工人生活良好”；只能证明该工厂主如此表述，不能直接代表所有工人"),
  },
};
