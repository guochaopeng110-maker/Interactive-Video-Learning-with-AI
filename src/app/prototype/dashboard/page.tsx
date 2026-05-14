"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PrototypeSwitcher from "../components/PrototypeSwitcher";

function Sidebar() {
  const items = [
    { label: "课程", active: true },
    { label: "教材" },
    { label: "知识图谱" },
    { label: "设置" },
  ];
  return (
    <aside className="w-60 min-h-screen flex flex-col" style={{ background: "#312E81" }}>
      <div className="px-6 py-7">
        <h1 className="text-white text-lg font-bold" style={{ fontFamily: "Inter, Noto Sans SC, sans-serif" }}>NurseEd</h1>
      </div>
      <nav className="flex-1 px-3 space-y-1">
        {items.map((item) => (
          <a key={item.label} href="#" className="block px-3 py-2.5 rounded-lg text-sm transition-colors duration-200" style={{
            color: item.active ? "white" : "#A5B4FC",
            background: item.active ? "rgba(255,255,255,0.12)" : "transparent",
          }}>{item.label}</a>
        ))}
      </nav>
      <div className="px-6 py-4 border-t border-white/10 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold" style={{ background: "#818CF8", color: "white" }}>李</div>
        <span className="text-sm" style={{ color: "#C7D2FE" }}>李老师</span>
      </div>
    </aside>
  );
}

function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <p className="text-xs mb-1" style={{ color: "#818CF8" }}>{label}</p>
      <p className="text-2xl font-bold" style={{ color }}>{value}</p>
    </div>
  );
}

function CourseCard({ name, points, students, color }: { name: string; points: number; students: number; color: string }) {
  return (
    <a href="#" className="block bg-white rounded-xl p-5 shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
      <h3 className="font-semibold mb-2" style={{ color: "#312E81" }}>{name}</h3>
      <div className="flex items-center gap-4 text-xs" style={{ color: "#818CF8" }}>
        <span>{points} 知识点</span>
        <span>{students} 学生</span>
      </div>
      <div className="mt-3 h-1 rounded-full" style={{ background: "#E0E7FF" }}>
        <div className="h-1 rounded-full" style={{ width: `${Math.min(100, (students / 50) * 100)}%`, background: color }} />
      </div>
    </a>
  );
}

function VariantA() {
  return (
    <div className="min-h-screen flex" style={{ background: "#EEF2FF" }}>
      <Sidebar />
      <main className="flex-1 p-8">
        <h2 className="text-xl font-bold mb-1" style={{ color: "#312E81" }}>控制台</h2>
        <p className="text-sm mb-8" style={{ color: "#818CF8" }}>欢迎回来，李老师</p>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <StatCard label="管理课程" value="3" color="#4F46E5" />
          <StatCard label="在读学生" value="87" color="#22C55E" />
          <StatCard label="本月活跃" value="42" color="#818CF8" />
        </div>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-semibold" style={{ color: "#312E81" }}>我的课程</h3>
          <a href="#" className="text-sm font-medium transition-colors duration-200 hover:opacity-80" style={{ color: "#4F46E5" }}>+ 创建新课程</a>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <CourseCard name="基础护理学" points={12} students={45} color="#4F46E5" />
          <CourseCard name="内科护理学" points={8} students={32} color="#22C55E" />
          <CourseCard name="外科护理学" points={5} students={10} color="#818CF8" />
        </div>
      </main>
    </div>
  );
}

function VariantB() {
  return (
    <div className="min-h-screen" style={{ background: "#FAFAFA" }}>
      <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <h1 className="text-lg font-bold" style={{ color: "#312E81", fontFamily: "Inter, Noto Sans SC, sans-serif" }}>NurseEd</h1>
          <nav className="flex gap-6">
            {["课程", "教材", "知识图谱", "设置"].map((item, i) => (
              <a key={item} href="#" className="text-sm transition-colors duration-200" style={{ color: i === 0 ? "#4F46E5" : "#818CF8" }}>{item}</a>
            ))}
          </nav>
        </div>
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold" style={{ background: "#EEF2FF", color: "#4F46E5" }}>李</div>
      </header>
      <main className="max-w-5xl mx-auto px-8 py-10">
        <h2 className="text-3xl font-light mb-8" style={{ color: "#312E81", letterSpacing: "-0.02em" }}>控制台</h2>
        <div className="grid grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-xs mb-2" style={{ color: "#999" }}>管理课程</p>
            <p className="text-4xl font-light" style={{ color: "#4F46E5" }}>3</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-xs mb-2" style={{ color: "#999" }}>在读学生</p>
            <p className="text-4xl font-light" style={{ color: "#22C55E" }}>87</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-xs mb-2" style={{ color: "#999" }}>本月活跃</p>
            <p className="text-4xl font-light" style={{ color: "#818CF8" }}>42</p>
          </div>
        </div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold" style={{ color: "#312E81" }}>我的课程</h3>
          <a href="#" className="text-sm font-medium transition-colors duration-200" style={{ color: "#4F46E5" }}>+ 新建</a>
        </div>
        <div className="flex gap-5 overflow-x-auto pb-2">
          {[
            { name: "基础护理学", points: 12, students: 45, color: "#4F46E5" },
            { name: "内科护理学", points: 8, students: 32, color: "#22C55E" },
            { name: "外科护理学", points: 5, students: 10, color: "#818CF8" },
          ].map((c) => (
            <a key={c.name} href="#" className="flex-shrink-0 w-72 bg-white rounded-2xl p-6 shadow-sm border border-gray-50 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
              <div className="h-24 rounded-xl mb-4" style={{ background: `linear-gradient(135deg, ${c.color}20, ${c.color}40)` }} />
              <h4 className="font-semibold mb-2" style={{ color: "#312E81" }}>{c.name}</h4>
              <div className="flex items-center justify-between text-xs" style={{ color: "#818CF8" }}>
                <span>{c.points} 知识点</span>
                <span>{c.students} 学生</span>
              </div>
              <div className="mt-3 h-1.5 rounded-full" style={{ background: "#E0E7FF" }}>
                <div className="h-1.5 rounded-full" style={{ width: `${(c.students / 50) * 100}%`, background: c.color }} />
              </div>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}

function VariantC() {
  return (
    <div className="min-h-screen bg-white">
      <header className="px-8 py-5 flex items-center justify-between border-b border-gray-50">
        <h1 className="text-base font-semibold" style={{ color: "#312E81", fontFamily: "Inter, Noto Sans SC, sans-serif" }}>NurseEd</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm" style={{ color: "#999" }}>李老师</span>
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold" style={{ background: "#EEF2FF", color: "#4F46E5" }}>李</div>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-8 py-12">
        <h2 className="text-3xl font-light mb-1" style={{ color: "#312E81", letterSpacing: "-0.02em" }}>早上好，李老师</h2>
        <div className="flex items-center gap-4 mt-3 mb-10">
          <span className="text-sm" style={{ color: "#818CF8" }}>管理课程 <b style={{color:"#312E81"}}>3</b></span>
          <span className="text-sm" style={{ color: "#818CF8" }}>在读学生 <b style={{color:"#22C55E"}}>87</b></span>
          <span className="text-sm" style={{ color: "#818CF8" }}>本月活跃 <b style={{color:"#818CF8"}}>42</b></span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold" style={{ color: "#312E81" }}>课程列表</h3>
          <a href="#" className="text-sm font-medium transition-colors duration-200" style={{ color: "#4F46E5" }}>+ 创建新课程</a>
        </div>
        <div className="border border-gray-100 rounded-xl overflow-hidden">
          {[
            { name: "基础护理学", points: 12, students: 45, status: "已发布" },
            { name: "内科护理学", points: 8, students: 32, status: "编辑中" },
            { name: "外科护理学", points: 5, students: 10, status: "草稿" },
          ].map((c, i) => (
            <a key={c.name} href="#" className={`flex items-center px-6 py-4 transition-colors duration-200 hover:bg-gray-50 ${i !== 0 ? "border-t border-gray-50" : ""}`}>
              <span className="flex-1 text-sm font-medium" style={{ color: "#312E81" }}>{c.name}</span>
              <span className="w-24 text-xs text-right" style={{ color: "#818CF8" }}>{c.points} 知识点</span>
              <span className="w-20 text-xs text-right" style={{ color: "#818CF8" }}>{c.students} 学生</span>
              <span className="w-20 text-xs text-right">
                <span className="inline-block px-2 py-0.5 rounded-full text-xs" style={{
                  background: c.status === "已发布" ? "#DCFCE7" : c.status === "编辑中" ? "#EEF2FF" : "#F5F5F5",
                  color: c.status === "已发布" ? "#166534" : c.status === "编辑中" ? "#4F46E5" : "#999"
                }}>{c.status}</span>
              </span>
              <span className="w-16 text-xs text-right" style={{ color: "#ccc" }}>→</span>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}

function DashboardContent() {
  const searchParams = useSearchParams();
  const variant = searchParams.get("variant") ?? "A";
  return (
    <>
      {variant === "A" && <VariantA />}
      {variant === "B" && <VariantB />}
      {variant === "C" && <VariantC />}
      <PrototypeSwitcher />
    </>
  );
}

export default function DashboardPrototype() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-400">Loading...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
