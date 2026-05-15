import Link from 'next/link';
import { LessonFlowPanel, Surface } from '../../components/PrototypeBlocks';
import { lessonNodes } from '../../components/prototype-data';

const authoringCards = [
  {
    title: '从 KnowledgeGraph 选点',
    detail: 'Lesson 不凭空创建，而是从已确认的 KnowledgePoint 子集中编排。',
  },
  {
    title: 'LessonNode 为中心',
    detail: '教师主要操作顺序、BranchDraft、QuizDraft 与返回主线逻辑，而不是纯资产堆叠。',
  },
  {
    title: '准备学生式预览',
    detail: '编排完成后直接进入 preview，验证分支体验是否像真实学习流。',
  },
];

export default function TeacherLessonBuilderPage() {
  return (
    <div className="space-y-6">
      <Surface
        eyebrow="Teacher Lesson Builder"
        accent="#4F46E5"
        title="Lesson authoring 从 Course 结构走向学生体验"
        description="这正是 #21 的核心：教师把图谱中的 KnowledgePoint 编排成 LessonNode，明确主线、分支和补救逻辑，为后续 preview 与 analytics 建立闭环。"
      >
        <LessonFlowPanel nodes={lessonNodes} mode="teacher-preview" accent="#4F46E5" />
      </Surface>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_320px]">
        <Surface
          eyebrow="Authoring Principles"
          accent="#4F46E5"
          title="教师在这里做的是编排，不是重新定义领域语义"
          description="LessonNode 仍然引用共享的 KnowledgePoint。这样 student playback 与 teacher preview 才能保持同一个 Lesson 语义，只改变动作权限。"
        >
          <div className="grid gap-4 md:grid-cols-3">
            {authoringCards.map((card) => (
              <article key={card.title} className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                <p className="text-lg font-semibold text-slate-950">{card.title}</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{card.detail}</p>
              </article>
            ))}
          </div>
        </Surface>

        <aside className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Publish Boundary</p>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            教师在 preview 通过前仍停留在 draft 态。只有教师确认发布后，学生流才会看到这个 Lesson。
          </p>
          <Link
            href="/prototype/teacher/lesson-preview"
            className="mt-5 inline-flex rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            学生式预览
          </Link>
        </aside>
      </section>
    </div>
  );
}
