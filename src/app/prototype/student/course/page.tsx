import Link from 'next/link';
import { StageRail, Surface } from '../../components/PrototypeBlocks';
import { courseStages, studentCourseCards } from '../../components/prototype-data';

export default function StudentCoursePage() {
  return (
    <div className="space-y-6">
      <Surface
        eyebrow="Student Course"
        accent="#0F766E"
        title="Course 是学习入口，不是管理后台"
        description="学生看到的是已发布 Course 的学习上下文、完成进度和下一步建议。这里不出现教师侧的候选 KnowledgePoint、预览状态或治理动作。"
      >
        <div className="grid gap-4 md:grid-cols-2">
          {studentCourseCards.map((course) => (
            <article key={course.title} className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
              <p className="text-lg font-semibold text-slate-950">{course.title}</p>
              <p className="mt-2 text-sm font-medium text-teal-700">{course.progress}</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">{course.next}</p>
            </article>
          ))}
        </div>
      </Surface>

      <Surface
        eyebrow="Published Learning Flow"
        accent="#0F766E"
        title="同一个 Course，在学生侧只暴露已发布学习链路"
        description="为强调 #24 的一致性，这里沿用共享的 Course stages 视觉语言，但把可见状态改成 student-friendly 的 published / next-step 语义。"
      >
        <StageRail items={courseStages} mode="student" />
      </Surface>

      <div className="grid gap-4 md:grid-cols-2">
        <Link href="/prototype/student/knowledge-graph" className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm transition-colors hover:border-teal-200 hover:bg-teal-50/60">
          <p className="text-lg font-semibold text-slate-950">进入 KnowledgeGraph</p>
          <p className="mt-3 text-sm leading-6 text-slate-600">从课程级学习地图理解当前掌握度与建议路径。</p>
        </Link>
        <Link href="/prototype/student/lesson-player" className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm transition-colors hover:border-teal-200 hover:bg-teal-50/60">
          <p className="text-lg font-semibold text-slate-950">进入 Lesson 学习</p>
          <p className="mt-3 text-sm leading-6 text-slate-600">直接开始已发布 Lesson，不会看到 preview 或 draft 版本。</p>
        </Link>
      </div>
    </div>
  );
}
