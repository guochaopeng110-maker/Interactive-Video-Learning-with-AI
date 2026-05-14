const studentHighlights = [
  { title: '今日待学', detail: '2 个 Lesson 待继续，1 个补救复习待完成。', accent: '#0F766E' },
  { title: '课程入口', detail: '从我的 Course 或 KnowledgeGraph 进入学习流。', accent: '#4F46E5' },
  { title: '权限边界', detail: '学生只看到已发布内容，不看到教师草稿与审核状态。', accent: '#9A3412' },
];

export default function StudentHomePrototypePage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[28px] bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-600">Student Home</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">学生工作台已经从教师流中独立出来。</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
          在旧的原型顺序里，学生入口出现在很靠后的位置。现在它变成独立的 workspace home，为后续 Course 到 KnowledgeGraph、Lesson、Review、
          Progress 的学习闭环提供稳定路由起点。
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {studentHighlights.map((item) => (
          <article key={item.title} className="rounded-[28px] bg-white p-6 shadow-sm">
            <div className="h-2 w-20 rounded-full" style={{ background: item.accent }} />
            <h3 className="mt-5 text-lg font-semibold text-slate-900">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">{item.detail}</p>
          </article>
        ))}
      </section>

      <section className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
        <p className="text-sm font-semibold text-slate-900">这个阶段先交付什么</p>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          当前票先完成 student route grouping 和共享 shell，不在这里实现课程列表、知识图谱可视化、播放器和进度细节。那些内容会在 #22
          作为独立 student slice 继续落地。
        </p>
      </section>
    </div>
  );
}
