import Link from 'next/link';
import { Surface, TableBlock } from '../../components/PrototypeBlocks';

const materialRows = [
  ['基础护理教材（第 3 章）', '教材已入库', '高置信度 18 / 低置信度 4', '进入 KnowledgeGraph'],
  ['临床操作讲义', '待教师复核', '高置信度 7 / 低置信度 6', '优先处理低置信度'],
  ['课堂标准流程单', 'AI 引用不完整', '需补教材出处', '暂不可发布'],
];

const reviewCards = [
  {
    title: '低置信度优先',
    detail: '先处理 AI 不确定的 KnowledgePoint，避免把错误结构带进 Course 图谱。',
  },
  {
    title: '教材约束生成',
    detail: '只有带来源映射的候选点才能进入后续 Lesson 编排，保持 Material-Constrained Generation。',
  },
  {
    title: '通向图谱',
    detail: '审核产出不是页面终点，而是进入 teacher KnowledgeGraph 的已确认节点集合。',
  },
];

export default function TeacherMaterialsPage() {
  return (
    <div className="space-y-6">
      <Surface
        eyebrow="Teacher Materials"
        accent="#4F46E5"
        title="教材审核继续作为教师 authoring 流的前半段"
        description="这里延续 #20 的前置结果，并为 #21 的 Lesson authoring 做输入准备。页面重点不是文件列表本身，而是让老师清楚哪些候选点已经足够可靠，可以安全进入 Course 级 KnowledgeGraph。"
      >
        <TableBlock columns={['Material', '状态', 'AI 提取结果', '下一步']} rows={materialRows} />
      </Surface>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_320px]">
        <Surface
          eyebrow="Review Rules"
          accent="#4F46E5"
          title="审核逻辑围绕可发布性和图谱可复用性"
          description="教师侧仍保留 draft、低置信度和来源异常，这些状态是 student flow 永远看不到的。"
        >
          <div className="grid gap-4 md:grid-cols-3">
            {reviewCards.map((card) => (
              <article key={card.title} className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                <p className="text-lg font-semibold text-slate-950">{card.title}</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{card.detail}</p>
              </article>
            ))}
          </div>
        </Surface>

        <aside className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Flow Handoff</p>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            审核完成后，教师会带着已确认的 KnowledgePoint 进入图谱，再从图谱中挑选 Lesson 要用的节点。这条链路现在已经和 #21 对齐。
          </p>
          <Link
            href="/prototype/teacher/knowledge-graph"
            className="mt-5 inline-flex rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            进入 KnowledgeGraph
          </Link>
        </aside>
      </section>
    </div>
  );
}
