import Link from 'next/link';
import { CourseHero, StageRail, Surface } from '../../components/PrototypeBlocks';
import { courseStages, courseSummary } from '../../components/prototype-data';

const teacherLinks = [
  {
    label: 'Material 评审',
    detail: '从教师侧确认低置信度 AI 建议，过滤掉不能进入可发布内容的候选点。',
    href: '/prototype/teacher/materials',
  },
  {
    label: 'KnowledgeGraph',
    detail: '把确认后的 KnowledgePoint 放回课程图谱，建立 Lesson 可复用的结构基础。',
    href: '/prototype/teacher/knowledge-graph',
  },
  {
    label: 'Lesson 编排',
    detail: '在 Course 上下文中选点并组合 LessonNode、QuizDraft 与 BranchDraft。',
    href: '/prototype/teacher/lesson-builder',
  },
];

export default function TeacherCoursePage() {
  return (
    <div className="space-y-6">
      <CourseHero
        roleLabel="Teacher Course Workspace"
        accent="#4F46E5"
        actionLabel="继续教材审核"
        actionHref="/prototype/teacher/materials"
        detail="这个页面是教师在单一 Course 上下文中的锚点。Material、KnowledgeGraph 与 Lesson 不再分散在旧原型序列，而是统一挂在一个课程工作区下。"
      />

      <Surface
        eyebrow="Course Context"
        accent="#4F46E5"
        title={`${courseSummary.name} · 单课程作者工作区`}
        description="Course 是 teacher、student、admin 共享的核心语义对象，但在教师侧它承担的是 authoring context：可以处理 Material、确认 KnowledgePoint、编排 Lesson，并决定何时发布。"
      >
        <StageRail items={courseStages} mode="teacher" />
      </Surface>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_340px]">
        <Surface
          eyebrow="Next Moves"
          accent="#4F46E5"
          title="从同一门 Course 进入不同教师动作"
          description="教师在这里看到的是可编辑资产和待确认状态，这些动作不会出现在 student 或 admin workspace 中。"
        >
          <div className="grid gap-4 md:grid-cols-3">
            {teacherLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-[24px] border border-slate-200 bg-slate-50 p-5 transition-colors hover:border-indigo-200 hover:bg-indigo-50/50"
              >
                <p className="text-lg font-semibold text-slate-950">{item.label}</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.detail}</p>
              </Link>
            ))}
          </div>
        </Surface>

        <aside className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Permission Boundary</p>
          <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
            <p>教师可以管理 `{courseSummary.name}` 的 Material、KnowledgeGraph 和 Lesson 草稿。</p>
            <p>学生只能在发布后看到对应 Lesson 与图谱节点，不会看到待确认候选点。</p>
            <p>管理员可以治理课程可见性和所有权，但不会在这里直接改 LessonNode。</p>
          </div>
        </aside>
      </section>
    </div>
  );
}
