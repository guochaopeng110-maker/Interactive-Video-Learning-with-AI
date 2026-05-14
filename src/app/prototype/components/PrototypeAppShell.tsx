import Link from 'next/link';
import type { ReactNode } from 'react';
import type { RoleKey } from './prototype-nav';
import { getRoleMeta, roleMetaList, workspaceNav } from './prototype-nav';

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
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <Link href="/prototype/login" className="text-sm font-semibold tracking-[0.18em] text-slate-400 uppercase">
                NurseEd Prototype
              </Link>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
                <span
                  className="rounded-full px-3 py-1 text-xs font-semibold text-white"
                  style={{ background: meta.accent }}
                >
                  {meta.name}
                </span>
              </div>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{subtitle}</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">当前角色</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">{meta.name}</p>
              <Link
                href="/prototype/role-entry"
                className="mt-2 inline-flex text-sm font-medium transition-opacity hover:opacity-80"
                style={{ color: meta.accent }}
              >
                切换工作台
              </Link>
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

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 text-sm text-slate-500 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>共享原型壳层已建立，后续 role-based slices 可在此基础上继续扩展。</p>
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
