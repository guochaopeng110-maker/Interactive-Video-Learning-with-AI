const teacherCourses = [
  { name: '基础护理学', stage: '待继续：教材审核', progress: '3 份 Material 待确认', accent: '#4F46E5' },
  { name: '内科护理学', stage: '待继续：KnowledgeGraph', progress: '8 个 KnowledgePoint 已确认', accent: '#0F766E' },
  { name: '外科护理学', stage: '待继续：Lesson 编排', progress: '2 个 Lesson 草稿', accent: '#9A3412' },
];

const teacherTasks = [
  '继续一门 Course 的 Material 审核',
  '从已确认 KnowledgePoint 进入 KnowledgeGraph',
  '回到 Lesson 预览前的 authoring flow',
];

export default function TeacherHomePrototypePage() {
  return (
    <div className="space-y-6">
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.3fr)_340px]">
        <article className="rounded-[28px] bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-400">Teacher Home</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">教师原型入口现在属于 role-based workspace。</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
            这一步不再把教师控制台当作全局第二屏，而是把它挂到 `/prototype/teacher/home` 下，成为教师工作台的 home。后续 `#20` 和 `#21`
            会继续把 Course、Material、KnowledgeGraph、Lesson 按这个结构接进来。
          </p>
        </article>

        <aside className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">当前票的交付重点</p>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
            <li>统一登录后可进入教师工作台</li>
            <li>教师路由纳入 role-based grouping</li>
            <li>共享 shell 对后续页面可复用</li>
          </ul>
        </aside>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {teacherCourses.map((course) => (
          <article key={course.name} className="rounded-[28px] bg-white p-6 shadow-sm">
            <div className="h-24 rounded-2xl" style={{ background: `linear-gradient(145deg, ${course.accent}22, ${course.accent}55)` }} />
            <h3 className="mt-5 text-lg font-semibold text-slate-900">{course.name}</h3>
            <p className="mt-2 text-sm font-medium" style={{ color: course.accent }}>
              {course.stage}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{course.progress}</p>
          </article>
        ))}
      </section>

      <section className="rounded-[28px] bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold text-slate-900">下一步会从这里展开的教师主链路</p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {teacherTasks.map((task, index) => (
            <div key={task} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Step {index + 1}</p>
              <p className="mt-3 text-sm leading-6 text-slate-700">{task}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
