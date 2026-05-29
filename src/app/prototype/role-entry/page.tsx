import Link from 'next/link';
import { roleMetaList } from '../components/prototype-nav';

export default function RoleEntryPrototypePage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="rounded-[32px] bg-white px-8 py-10 shadow-sm ring-1 ring-slate-200/70">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Role Entry</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">选择这次要进入的工作台</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
            同一个账号可能同时拥有多个角色。这里把 role-based prototype 的信息架构显式化，让共享登录与后续 workspace 之间有一个清晰的分流节点。
          </p>
        </header>

        <section className="mt-6 grid gap-6 lg:grid-cols-3">
          {roleMetaList.map((role) => (
            <article key={role.key} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{role.name}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{role.description}</p>
                </div>
                <span
                  className="inline-flex h-10 w-10 items-center justify-center rounded-2xl text-sm font-semibold text-white"
                  style={{ background: role.accent }}
                >
                  {role.name.slice(0, 1)}
                </span>
              </div>

              <div className="mt-6 rounded-2xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">角色边界</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{role.boundary}</p>
              </div>

              <Link
                href={role.homeHref}
                className="mt-6 inline-flex w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: role.accent }}
              >
                进入{role.name}
              </Link>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
