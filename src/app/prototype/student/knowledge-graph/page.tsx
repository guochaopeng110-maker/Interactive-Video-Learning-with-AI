import Link from 'next/link';
import { KnowledgeGraphPanel, Surface } from '../../components/PrototypeBlocks';
import { graphNodes } from '../../components/prototype-data';

export default function StudentKnowledgeGraphPage() {
  return (
    <div className="space-y-6">
      <Surface
        eyebrow="Student KnowledgeGraph"
        accent="#0F766E"
        title="学生看到的是读图学习路径，而不是图谱编辑器"
        description="这里和教师侧保持相同的 KnowledgeGraph 视觉语言，但交互完全不同: 学生只能理解课程结构、掌握度与推荐入口，不能编辑任何关系或候选点。"
      >
        <KnowledgeGraphPanel nodes={graphNodes.filter((node) => node.state === 'published')} mode="student" />
      </Surface>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_320px]">
        <Surface
          eyebrow="Learning Intent"
          accent="#0F766E"
          title="图谱负责定向，把学生送进合适的 Lesson"
          description="KnowledgeGraph 在学生侧主要承担导航与信心建立作用，让学生知道自己学到哪里、哪里薄弱，以及下一步应该进入哪段 Lesson。"
        >
          <div className="grid gap-4 md:grid-cols-3">
            <article className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
              <p className="text-lg font-semibold text-slate-950">可见节点</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">只显示已发布 KnowledgePoint，不显示教师未确认的候选点。</p>
            </article>
            <article className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
              <p className="text-lg font-semibold text-slate-950">学习建议</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">图谱会把低掌握度节点转成推荐 Lesson 或 Review 入口。</p>
            </article>
            <article className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
              <p className="text-lg font-semibold text-slate-950">边界提示</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">学生不会在这里看到编辑按钮、发布状态修正或治理入口。</p>
            </article>
          </div>
        </Surface>

        <aside className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Next Step</p>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            图谱上的推荐节点会把学生送进 Lesson Player，进入真正的互动视频、分支和补救体验。
          </p>
          <Link
            href="/prototype/student/lesson-player"
            className="mt-5 inline-flex rounded-full bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            进入 Lesson Player
          </Link>
        </aside>
      </section>
    </div>
  );
}
