import type { LocalizedText, MicroLesson, Topic } from "./types";

const t = (zh: string, en = zh, ja = zh): LocalizedText => ({ zh, en, ja });

type Seed = { slug: string; title: string; objective: string; sentence: string; explanation: string; setup: string; thinking: string; result: string; memory: string };

const genericSeeds = (topic: Topic): Seed[] => [
  { slug: "object", title: "认识对象", objective: "说出这个知识点研究什么", sentence: topic.quickLesson.meaning.zh.slice(0, 30), explanation: topic.quickLesson.plainExplanation.zh.slice(0, 45), setup: topic.quickLesson.microExample.setup.zh.slice(0, 25), thinking: "只找本步要认识的对象", result: topic.title.zh.slice(0, 25), memory: "先认清具体对象" },
  { slug: "rule", title: "最小规则", objective: "理解一个最基本的规则", sentence: topic.quickLesson.memoryLine.zh.slice(0, 30), explanation: topic.quickLesson.meaning.zh.slice(0, 45), setup: topic.quickLesson.microExample.setup.zh.slice(0, 25), thinking: topic.quickLesson.microExample.thinking.zh.slice(0, 25), result: topic.quickLesson.microExample.result.zh.slice(0, 25), memory: topic.quickLesson.memoryLine.zh.slice(0, 20) },
  { slug: "example", title: "看懂例子", objective: "用最简单例子认出规则", sentence: "例子只演示刚学到的一个规则", explanation: topic.quickLesson.plainExplanation.zh.slice(0, 45), setup: topic.quickLesson.microExample.setup.zh.slice(0, 25), thinking: topic.quickLesson.microExample.thinking.zh.slice(0, 25), result: topic.quickLesson.microExample.result.zh.slice(0, 25), memory: "例子和规则要对应" },
  { slug: "apply", title: "单步应用", objective: "独立完成一次单步应用", sentence: topic.quickLesson.useWhen.zh.slice(0, 30), explanation: "本步只做一次判断或运算，不加入新规则。", setup: topic.quickCheck.question.zh.slice(0, 25), thinking: "使用刚学到的规则", result: topic.quickCheck.answer.zh.slice(0, 25), memory: "一次只完成一步" },
  { slug: "mistake", title: "避开易错点", objective: "辨认本知识点的常见错误", sentence: "错误常来自混淆对象或漏掉适用条件", explanation: (topic.commonMistakes[0]?.correction.zh ?? topic.quickLesson.plainExplanation.zh).slice(0, 45), setup: topic.quickCheck.question.zh.slice(0, 25), thinking: "核对对象和适用条件", result: topic.quickCheck.answer.zh.slice(0, 25), memory: "核对对象与条件" },
];

const vieta: Seed[] = [
  {slug:"root-meaning",title:"根是什么",objective:"知道根是使方程成立的数",sentence:"代入方程后等式成立的数叫根",explanation:"把一个数放进x的位置，左右相等，它就是根。",setup:"x²-3x+2=0",thinking:"把x=1代入，结果为0",result:"1是方程的一个根",memory:"代入成立就是根"},
  {slug:"coefficients",title:"认识系数",objective:"认出a、b、c对应的位置",sentence:"ax²+bx+c=0中数字a、b、c叫系数",explanation:"a在x²前，b在x前，c是不带x的数，且a≠0。",setup:"2x²-3x+1=0",thinking:"按x²、x、常数找",result:"a=2，b=-3，c=1",memory:"按次数找系数"},
  {slug:"root-sum",title:"两根之和",objective:"会使用两根之和公式",sentence:"两个根的和等于-b/a",explanation:"若两根是x₁、x₂，则x₁+x₂=-b/a。",setup:"2x²-3x+1=0",thinking:"-b/a=-(-3)/2",result:"x₁+x₂=3/2",memory:"根的和是-b/a"},
  {slug:"root-product",title:"两根之积",objective:"会使用两根之积公式",sentence:"两个根的积等于c/a",explanation:"若两根是x₁、x₂，则x₁x₂=c/a。",setup:"2x²-3x+1=0",thinking:"c/a=1/2",result:"x₁x₂=1/2",memory:"根的积是c/a"},
  {slug:"basic-use",title:"直接代入",objective:"把系数代入两个公式",sentence:"先找a、b、c，再分别代入和与积",explanation:"不必先解出两个根，也能求出它们的和与积。",setup:"x²+5x+6=0",thinking:"-b/a=-5，c/a=6",result:"根之和-5，根之积6",memory:"找系数再代入"},
  {slug:"sign-mistake",title:"正负号易错",objective:"避免根之和漏掉负号",sentence:"根之和用-b，不是直接用b",explanation:"b本身可以是负数，代入-b时要保留括号。",setup:"x²-4x+3=0",thinking:"-b=-(-4)=4",result:"x₁+x₂=4",memory:"求和先写-b"},
];

export function buildMicroLessons(topic: Topic): MicroLesson[] {
  const seeds = topic.id === "mathematics.quadratic-equations.vieta" ? vieta : genericSeeds(topic);
  return seeds.map((seed, index) => {
    const id = `${topic.id}.${seed.slug}`;
    const answer = index % 2 ? "正确" : "是";
    return { id, slug: seed.slug, order: index + 1, title: t(seed.title), objective: t(seed.objective), oneSentence: t(seed.sentence), plainExplanation: t(seed.explanation), microExample: { setup: t(seed.setup), thinking: t(seed.thinking), result: t(seed.result) }, memoryLine: t(seed.memory), quickCheck: { question: t(`本步结论“${seed.memory}”是否正确？`), options: [t(answer), t(answer === "是" ? "否" : "错误")], answer: t(answer), explanation: t(`正确位置是：${seed.memory}`) }, prerequisiteMicroLessonIds: index ? [`${topic.id}.${seeds[index - 1].slug}`] : [], keywords: [...topic.keywords, seed.title] };
  });
}
