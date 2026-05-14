'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import PrototypeSwitcher from '../components/PrototypeSwitcher';

function VariantA() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#EEF2FF' }}>
      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-1" style={{ color: '#312E81', fontFamily: 'Inter, Noto Sans SC, sans-serif' }}>
          护理教学平台
        </h1>
        <p className="text-sm mb-8" style={{ color: '#818CF8' }}>
          教师登录
        </p>
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: '#312E81' }}>邮箱地址</label>
            <input
              type="email"
              placeholder="teacher@school.edu.cn"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none transition-colors"
              style={{ '--tw-ring-color': '#4F46E520' } as React.CSSProperties}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: '#312E81' }}>密码</label>
            <input
              type="password"
              placeholder="········"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none transition-colors"
            />
          </div>
          <button
            className="w-full py-3 rounded-lg text-white font-semibold text-sm transition-all duration-200 hover:opacity-90 hover:-translate-y-px"
            style={{ background: '#22C55E' }}
          >
            登 录
          </button>
        </div>
        <p className="text-center text-xs mt-6" style={{ color: '#818CF8' }}>
          还没有账号？<a href="#" className="font-medium" style={{ color: '#4F46E5' }}>注册教师账号</a>
        </p>
      </div>
    </div>
  );
}

function VariantB() {
  return (
    <div className="min-h-screen flex">
      <div
        className="hidden lg:flex lg:w-5/12 flex-col justify-center px-16"
        style={{ background: 'linear-gradient(135deg, #312E81 0%, #4F46E5 40%, #818CF8 100%)', color: 'white' }}
      >
        <div className="max-w-sm">
          <div className="w-12 h-12 bg-white/20 rounded-xl mb-8 flex items-center justify-center text-2xl">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10-5-10 5z"/><path d="M6 12v5c0 1.1 2.7 2 6 2s6-.9 6-2v-5"/></svg>
          </div>
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Inter, Noto Sans SC, sans-serif' }}>
            AI 驱动的护理教学
          </h2>
          <p className="text-base leading-relaxed opacity-80">
            教材上传 → AI 提取知识点 → 编排交互微课 → 学生学习分析
          </p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center px-6 bg-white">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold mb-8" style={{ color: '#312E81', fontFamily: 'Inter, Noto Sans SC, sans-serif' }}>
            登录
          </h1>
          <div className="space-y-5">
            <input
              type="email"
              placeholder="邮箱地址"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-300 transition-colors"
            />
            <input
              type="password"
              placeholder="密码"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-300 transition-colors"
            />
            <button
              className="w-full py-3 rounded-lg text-white font-semibold text-sm transition-all duration-200 hover:opacity-90"
              style={{ background: '#4F46E5' }}
            >
              登 录
            </button>
          </div>
          <div className="flex items-center gap-2 mt-6 text-xs" style={{ color: '#818CF8' }}>
            <span>还没有账号？</span>
            <a href="#" className="font-medium" style={{ color: '#4F46E5' }}>注册</a>
            <span className="mx-1">·</span>
            <a href="#" className="font-medium" style={{ color: '#4F46E5' }}>忘记密码</a>
          </div>
        </div>
      </div>
    </div>
  );
}

function VariantC() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-white">
      <div className="w-full max-w-sm">
        <h1
          className="text-4xl font-light tracking-tight mb-2"
          style={{ color: '#111', fontFamily: 'Inter, Noto Sans SC, sans-serif', letterSpacing: '-0.03em' }}
        >
          登录
        </h1>
        <p className="text-sm mb-12" style={{ color: '#999' }}>
          护理教学平台 · 教师端
        </p>
        <div className="space-y-8">
          <input
            type="email"
            placeholder="邮箱地址"
            className="w-full py-3 border-0 border-b border-gray-200 text-base focus:outline-none focus:border-black transition-colors bg-transparent"
            style={{ fontFamily: 'Inter, Noto Sans SC, sans-serif' }}
          />
          <input
            type="password"
            placeholder="密码"
            className="w-full py-3 border-0 border-b border-gray-200 text-base focus:outline-none focus:border-black transition-colors bg-transparent"
          />
          <button
            className="w-full py-3.5 mt-4 text-white font-medium text-sm tracking-widest uppercase transition-all duration-200 hover:opacity-80"
            style={{ background: '#111' }}
          >
            Sign In
          </button>
        </div>
        <p className="text-center text-xs mt-10" style={{ color: '#bbb' }}>
          <a href="#" className="hover:text-black transition-colors">创建账号</a>
          <span className="mx-3">·</span>
          <a href="#" className="hover:text-black transition-colors">忘记密码</a>
        </p>
      </div>
    </div>
  );
}

function LoginContent() {
  const searchParams = useSearchParams();
  const variant = searchParams.get('variant') ?? 'A';

  return (
    <>
      {variant === 'A' && <VariantA />}
      {variant === 'B' && <VariantB />}
      {variant === 'C' && <VariantC />}
      <PrototypeSwitcher />
    </>
  );
}

export default function LoginPrototype() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-400">Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
