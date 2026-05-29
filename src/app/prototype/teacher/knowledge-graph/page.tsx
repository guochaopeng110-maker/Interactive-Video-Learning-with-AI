import Link from 'next/link';
import { KnowledgeGraphPanel, Surface } from '../../components/PrototypeBlocks';
import { graphNodes } from '../../components/prototype-data';

export default function TeacherKnowledgeGraphPage() {
  return (
    <div className="space-y-6">
      <Surface
        eyebrow="Teacher KnowledgeGraph"
        accent="#4F46E5"
        title="已确认的 KnowledgePoint 在这里变成 Course 级结构"
        description="KnowledgeGraph 是连接 Material 审核与 Lesson authoring 的中枢。教师会在这里确认关系、补齐缺口，并决定哪些节点适合进入本轮 Lesson。"
      >
        <KnowledgeGraphPanel nodes={graphNodes} mode="teacher" />
      </Surface>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_320px]">
        <Surface
          eyebrow="Lesson Feed"
          accent="#4F46E5"
          title="图谱产出要能自然喂给 Lesson Builder"
          description="这一步承接 #20 的终点，并且直接为 #21 提供 LessonNode 的候选知识点、分支素材和教材出处。"
        >
          <div className="grid gap-4 md:grid-cols-3">
            <article className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
              <p className="text-lg font-semibold text-slate-950">主线候选点</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">无菌技术原则、手卫生流程已适合进入主线 LessonNode。</p>
            </article>
            <article className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
              <p className="text-lg font-semibold text-slate-950">补救分支点</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">静脉输液评估适合作为错误后的 RemediationBranch 讲解点。</p>
            </article>
            <article className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
              <p className="text-lg font-semibold text-slate-950">暂缓节点</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">仍属 draft 的图谱节点不会直接出现在学生侧或进入发布 Lesson。</p>
            </article>
          </div>
        </Surface>

        <aside className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Next Step</p>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            Lesson Builder 会把这些图谱节点转成具体 LessonNode 顺序、分支和预览路径，继续教师作者流的后半段。
          </p>
          <Link
            href="/prototype/teacher/lesson-builder"
            className="mt-5 inline-flex rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            进入 Lesson Builder
          </Link>
        </aside>
      </section>
    </div>
  );
}
