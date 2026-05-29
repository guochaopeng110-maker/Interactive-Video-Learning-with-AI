import Link from 'next/link';
import { CourseHero, MetricCards, Surface } from '../../components/PrototypeBlocks';
import { courseSummary, teacherAnalytics } from '../../components/prototype-data';

const teacherTasks = [
  {
    title: '继续教材审核',
    detail: '回到低置信度 Material 建议，先确认可进入图谱的 KnowledgePoint。',
    href: '/prototype/teacher/materials',
  },
  {
    title: '进入 Lesson 编排',
    detail: '从已确认的 Course 结构中选点，开始搭建 LessonNode 与分支流。',
    href: '/prototype/teacher/lesson-builder',
  },
  {
    title: '查看教学分析',
    detail: '把已发布 Lesson 的掉点、弱点与补救效果回收为下轮迭代输入。',
    href: '/prototype/teacher/analytics',
  },
];

export default function TeacherHomePrototypePage() {
  return (
    <div className="space-y-6">
      <CourseHero
        roleLabel="Teacher Home"
        accent="#4F46E5"
        actionLabel="进入当前 Course"
        actionHref="/prototype/teacher/course"
        detail="教师工作台现在是独立 workspace，而不是旧原型顺序中的第二屏。当前切片继续沿着 #19 的 shell，向 Lesson authoring、preview 和 analytics 延展。"
      />

      <MetricCards
        accent="#4F46E5"
        items={[
          { label: '当前 Course', value: courseSummary.name, note: `${courseSummary.major} · ${courseSummary.term}` },
          { label: '待发布 Lesson', value: '2', note: '都已完成 KnowledgeGraph 引用检查，等待预览与发布。' },
          { label: '活跃学生', value: `${courseSummary.activeStudents}`, note: '发布后的 LearningEvent 会回流到 teacher analytics。' },
        ]}
      />

      <Surface
        eyebrow="Teacher Attention"
        accent="#4F46E5"
        title="教师现在关心的是待处理任务，而不是泛化仪表盘"
        description="首页优先承接作者流中的高价值动作，确保教师可以从 Course 进入 Materials、Lesson Builder 与 Analytics，而不是回退到旧的线性 prototype。"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {teacherTasks.map((task) => (
            <Link key={task.title} href={task.href} className="rounded-[24px] border border-slate-200 bg-slate-50 p-5 transition-colors hover:border-indigo-200 hover:bg-indigo-50/50">
              <p className="text-lg font-semibold text-slate-950">{task.title}</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">{task.detail}</p>
            </Link>
          ))}
        </div>
      </Surface>

      <Surface
        eyebrow="Iteration Signals"
        accent="#4F46E5"
        title="首页也提前暴露 Lesson 发布后的教学反馈"
        description="这让 #21 的 handoff 更自然: Lesson 并不是发布即结束，而是通过 LearningEvent 和 KnowledgePoint 弱项信号继续反哺教师。"
      >
        <MetricCards accent="#4F46E5" items={teacherAnalytics} />
      </Surface>
    </div>
  );
}
