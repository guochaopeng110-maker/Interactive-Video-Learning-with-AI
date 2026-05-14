export default function LoginPrototypePage() {
  return (
    <div className="min-h-screen flex">
      <div
        className="hidden lg:flex lg:w-5/12 flex-col justify-center px-16"
        style={{ background: 'linear-gradient(135deg, #312E81 0%, #4F46E5 40%, #818CF8 100%)', color: 'white' }}
      >
        <div className="max-w-sm">
          <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" aria-hidden="true">
              <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5Z" />
              <path d="M6 12v5c0 1.1 2.7 2 6 2s6-.9 6-2v-5" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Inter, Noto Sans SC, sans-serif' }}>
            AI 驱动的护理教学
          </h1>
          <p className="text-base leading-relaxed opacity-80">
            教材上传 → AI 提取知识点 → 编排交互微课 → 学生学习分析
          </p>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center bg-white px-6">
        <div className="w-full max-w-sm">
          <p className="mb-2 text-sm font-medium" style={{ color: '#818CF8' }}>
            教师入口
          </p>
          <h2 className="mb-8 text-2xl font-bold" style={{ color: '#312E81', fontFamily: 'Inter, Noto Sans SC, sans-serif' }}>
            登录
          </h2>

          <form className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium" style={{ color: '#312E81' }}>
                邮箱地址
              </label>
              <input
                type="email"
                placeholder="teacher@school.edu.cn"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm transition-colors focus:border-indigo-300 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium" style={{ color: '#312E81' }}>
                密码
              </label>
              <input
                type="password"
                placeholder="请输入密码"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm transition-colors focus:border-indigo-300 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full cursor-pointer rounded-lg py-3 text-sm font-semibold text-white transition-all duration-200 hover:opacity-90"
              style={{ background: '#4F46E5' }}
            >
              登 录
            </button>
          </form>

          <div className="mt-6 flex items-center gap-2 text-xs" style={{ color: '#818CF8' }}>
            <span>还没有账号？</span>
            <a href="#" className="font-medium" style={{ color: '#4F46E5' }}>
              注册
            </a>
            <span className="mx-1">·</span>
            <a href="#" className="font-medium" style={{ color: '#4F46E5' }}>
              忘记密码
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
