export default function TeacherCoursePlaceholderPage() {
  return (
    <section className="rounded-[28px] border border-dashed border-slate-300 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold text-slate-900">Course workspace placeholder</p>
      <p className="mt-3 text-sm leading-7 text-slate-600">
        这个占位页存在的目的，是让教师工作台从 `home` 开始就具备稳定的 role-based route grouping。具体的 Course 总览内容会在 `#20`
        继续实现。
      </p>
    </section>
  );
}
