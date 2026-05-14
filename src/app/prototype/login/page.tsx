import Link from 'next/link';
import { roleMetaList } from '../components/prototype-nav';

export default function LoginPrototypePage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(160deg,#EEF2FF_0%,#FFFFFF_50%,#F8FAFC_100%)]">
      <div className="mx-auto grid min-h-screen max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1.05fr)_460px] lg:px-8 lg:py-12">
        <section
          className="flex flex-col justify-between rounded-[32px] px-8 py-10 text-white shadow-xl lg:px-12 lg:py-12"
          style={{ background: 'linear-gradient(145deg, #312E81 0%, #4F46E5 42%, #818CF8 100%)' }}
        >
          <div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" aria-hidden="true">
                <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5Z" />
                <path d="M6 12v5c0 1.1 2.7 2 6 2s6-.9 6-2v-5" />
              </svg>
            </div>

            <p className="mt-10 text-sm font-semibold uppercase tracking-[0.22em] text-white/75">Shared Entry Layer</p>
            <h1 className="mt-4 max-w-xl text-4xl font-semibold tracking-tight lg:text-5xl">
              一个入口，进入三种角色工作台。
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/78">
              这次原型不再沿用旧的线性 9 屏顺序，而是从统一登录进入角色分流，再进入教师、学生、管理三条独立但共享 Course 语义的工作流。
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {roleMetaList.map((role) => (
              <div key={role.key} className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-sm font-semibold">{role.name}</p>
                <p className="mt-2 text-sm leading-6 text-white/75">{role.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex items-center justify-center">
          <div className="w-full rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm lg:p-10">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-400">Prototype Login</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900">统一登录入口</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                这里不再预设教师入口。登录后进入角色识别页，再跳转到对应工作台。
              </p>
            </div>

            <form className="space-y-5">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-800">邮箱地址</label>
                <input
                  type="email"
                  placeholder="name@school.edu.cn"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-indigo-300"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-800">密码</label>
                <input
                  type="password"
                  placeholder="请输入密码"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-indigo-300"
                />
              </div>

              <Link
                href="/prototype/role-entry"
                className="inline-flex w-full items-center justify-center rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                登录并进入角色分流
              </Link>
            </form>

            <div className="mt-6 rounded-2xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Prototype Note</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                本票先打通 shared entry 和 role grouping，不在这里处理注册、找回密码、真实认证态。
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
