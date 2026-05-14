export default function AdminCatalogPlaceholderPage() {
  return (
    <section className="rounded-[28px] border border-dashed border-slate-300 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold text-slate-900">Admin catalog placeholder</p>
      <p className="mt-3 text-sm leading-7 text-slate-600">
        这个占位页把 `Major` 和 `Course` catalog 的路由位置固定下来，方便 `#23` 在不改变壳层结构的情况下继续填充治理细节。
      </p>
    </section>
  );
}
