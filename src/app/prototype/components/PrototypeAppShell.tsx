import Link from 'next/link';
import type { ReactNode } from 'react';
import type { RoleKey } from './prototype-nav';
import { getRoleMeta, roleMetaList, sharedEntryNav, workspaceNav } from './prototype-nav';

type PrototypeAppShellProps = {
  role: RoleKey;
  title: string;
  subtitle: string;
  children: ReactNode;
};

export default function PrototypeAppShell({ role, title, subtitle, children }: PrototypeAppShellProps) {
  const meta = getRoleMeta(role);
  const navItems = workspaceNav[role];

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#F8FAFC_0%,#F1F5F9_100%)]">
      <header className="border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-4xl">
              <Link href="/prototype/login" className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">
                NurseEd Prototype
              </Link>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">{title}</h1>
                <span
                  className="rounded-full px-3 py-1 text-xs font-semibold text-white"
                  style={{ background: meta.accent }}
                >
                  {meta.name}
                </span>
              </div>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{subtitle}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:w-[430px] lg:grid-cols-1">
              <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">当前角色</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">{meta.name}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{meta.boundary}</p>
                <Link
                  href="/prototype/role-entry"
                  className="mt-3 inline-flex text-sm font-medium transition-opacity hover:opacity-80"
                  style={{ color: meta.accent }}
                >
                  切换工作台
                </Link>
              </div>

              <div className="rounded-[24px] border border-slate-200 bg-white p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Shared Entry</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {sharedEntryNav.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>

      <footer className="border-t border-slate-200/80 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 text-sm text-slate-500 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>role-based prototype shell 已承接 shared entry，并让 teacher、student、admin 三条流在同一产品模型下继续扩展。</p>
          <div className="flex flex-wrap gap-2">
            {roleMetaList.map((item) => (
              <Link
                key={item.key}
                href={item.homeHref}
                className="rounded-full px-3 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-85"
                style={{ background: item.accent }}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
