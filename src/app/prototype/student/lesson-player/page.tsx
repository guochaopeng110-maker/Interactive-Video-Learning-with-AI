import Link from 'next/link';
import { LessonFlowPanel, Surface } from '../../components/PrototypeBlocks';
import { lessonNodes } from '../../components/prototype-data';

const lessonSupports = [
  {
    title: '视频与提问同场',
    detail: 'LessonPlayer 把视频、Quiz 和 branch feedback 放在一个连续学习舞台里。',
  },
  {
    title: 'GroundedAssistant',
    detail: '学生提问时优先引用当前 Course 的 Material，并标记教材外内容为“扩展参考”。',
  },
  {
    title: '错误即补救',
    detail: '答错后不把补救隐藏起来，而是显式进入 RemediationBranch，再返回主线。',
  },
];

export default function StudentLessonPlayerPage() {
  return (
    <div className="space-y-6">
      <Surface
        eyebrow="Student Lesson Player"
        accent="#0F766E"
        title="Lesson 在学生侧是沉浸式学习舞台"
        description="这里复用与 teacher preview 相同的 Lesson 语义，但学生只能看到已发布版本。互动视频、答题、分支与 GroundedAssistant 都在一个连续流里发生。"
      >
        <LessonFlowPanel nodes={lessonNodes} mode="student-player" accent="#0F766E" />
      </Surface>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_320px]">
        <Surface
          eyebrow="Learning Support"
          accent="#0F766E"
          title="学生侧强调继续学习与可信辅助"
          description="GroundedAssistant 与分支反馈都要围绕教材约束和可信解释工作，而不是变成脱离课程语境的聊天窗口。"
        >
          <div className="grid gap-4 md:grid-cols-3">
            {lessonSupports.map((item) => (
              <article key={item.title} className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                <p className="text-lg font-semibold text-slate-950">{item.title}</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.detail}</p>
              </article>
            ))}
          </div>
        </Surface>

        <aside className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">If Wrong Answer</p>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            学生答错后会被显式送入 Review / Remediation 流，而不是停留在不透明的 inline 错误状态中。
          </p>
          <Link
            href="/prototype/student/review"
            className="mt-5 inline-flex rounded-full bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            查看补救路径
          </Link>
        </aside>
      </section>
    </div>
  );
}
