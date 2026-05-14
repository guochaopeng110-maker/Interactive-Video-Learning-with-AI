const adminCards = [
  { title: 'Catalog', detail: 'Major 与 Course 的目录结构、开课与可见性管理。', accent: '#9A3412' },
  { title: 'Users', detail: '教师、学生、管理员的角色与课程归属。', accent: '#0F766E' },
  { title: 'Governance', detail: '发布治理、审计入口、组织级分析承接。', accent: '#4F46E5' },
];

export default function AdminHomePrototypePage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[28px] bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-700">Admin Home</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">管理员工作台不再隐含在教师原型之后。</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
          这个 workspace 先确立 role-aware shell，明确管理员负责的是 catalog、users、governance 和 analytics，而不是进入教师 authoring flow
          直接编辑 Lesson。
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {adminCards.map((card) => (
          <article key={card.title} className="rounded-[28px] bg-white p-6 shadow-sm">
            <div className="inline-flex rounded-full px-3 py-1 text-xs font-semibold text-white" style={{ background: card.accent }}>
              {card.title}
            </div>
            <p className="mt-5 text-sm leading-7 text-slate-600">{card.detail}</p>
          </article>
        ))}
      </section>

      <section className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
        <p className="text-sm font-semibold text-slate-900">为什么这一票就要先有 admin home</p>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          因为 `#19` 的 acceptance criteria 要求 teacher、student、admin 原型路由已经按一致的信息架构分组。哪怕这里只是壳页，也要先把第三种角色的入口和边界建立起来。
        </p>
      </section>
    </div>
  );
}
