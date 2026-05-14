export default function StudentProgressPlaceholderPage() {
  return (
    <section className="rounded-[28px] border border-dashed border-slate-300 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold text-slate-900">Student progress placeholder</p>
      <p className="mt-3 text-sm leading-7 text-slate-600">
        这个页面先证明 student workspace 的导航入口已经可复用。真正的掌握度、复习建议与进度聚合会在后续 student slice 中实现。
      </p>
    </section>
  );
}
