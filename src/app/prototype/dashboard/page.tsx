function Sidebar() {
  const items = [
    { label: '课程', active: true },
    { label: '教材' },
    { label: '知识图谱' },
    { label: '设置' },
  ];

  return (
    <aside className="flex min-h-screen w-60 flex-col" style={{ background: '#312E81' }}>
      <div className="px-6 py-7">
        <h1 className="text-lg font-bold text-white" style={{ fontFamily: 'Inter, Noto Sans SC, sans-serif' }}>
          NurseEd
        </h1>
      </div>
      <nav className="flex-1 space-y-1 px-3">
        {items.map((item) => (
          <a
            key={item.label}
            href="#"
            className="block rounded-lg px-3 py-2.5 text-sm transition-colors duration-200"
            style={{
              color: item.active ? 'white' : '#A5B4FC',
              background: item.active ? 'rgba(255,255,255,0.12)' : 'transparent',
            }}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-3 border-t border-white/10 px-6 py-4">
        <div
          className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold"
          style={{ background: '#818CF8', color: 'white' }}
        >
          李
        </div>
        <span className="text-sm" style={{ color: '#C7D2FE' }}>
          李老师
        </span>
      </div>
    </aside>
  );
}

function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <p className="mb-1 text-xs" style={{ color: '#818CF8' }}>
        {label}
      </p>
      <p className="text-2xl font-bold" style={{ color }}>
        {value}
      </p>
    </div>
  );
}

function CourseCard({ name, points, students, color }: { name: string; points: number; students: number; color: string }) {
  return (
    <a
      href="#"
      className="block w-72 flex-shrink-0 cursor-pointer rounded-2xl border border-gray-50 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="mb-4 h-24 rounded-xl" style={{ background: `linear-gradient(135deg, ${color}20, ${color}40)` }} />
      <h3 className="mb-2 font-semibold" style={{ color: '#312E81' }}>
        {name}
      </h3>
      <div className="flex items-center justify-between text-xs" style={{ color: '#818CF8' }}>
        <span>{points} 知识点</span>
        <span>{students} 学生</span>
      </div>
      <div className="mt-3 h-1.5 rounded-full" style={{ background: '#E0E7FF' }}>
        <div className="h-1.5 rounded-full" style={{ width: `${Math.min(100, (students / 50) * 100)}%`, background: color }} />
      </div>
    </a>
  );
}

export default function DashboardPrototypePage() {
  const courses = [
    { name: '基础护理学', points: 12, students: 45, color: '#4F46E5' },
    { name: '内科护理学', points: 8, students: 32, color: '#22C55E' },
    { name: '外科护理学', points: 5, students: 10, color: '#818CF8' },
  ];

  return (
    <div className="min-h-screen flex" style={{ background: '#EEF2FF' }}>
      <Sidebar />
      <main className="flex-1 p-8">
        <h2 className="mb-1 text-xl font-bold" style={{ color: '#312E81' }}>
          控制台
        </h2>
        <p className="mb-8 text-sm" style={{ color: '#818CF8' }}>
          欢迎回来，李老师
        </p>

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <StatCard label="管理课程" value="3" color="#4F46E5" />
          <StatCard label="在读学生" value="87" color="#22C55E" />
          <StatCard label="本月活跃" value="42" color="#818CF8" />
        </div>

        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-base font-semibold" style={{ color: '#312E81' }}>
            我的课程
          </h3>
          <a
            href="#"
            className="text-sm font-medium transition-colors duration-200 hover:opacity-80"
            style={{ color: '#4F46E5' }}
          >
            + 创建新课程
          </a>
        </div>

        <div className="flex gap-5 overflow-x-auto pb-2">
          {courses.map((course) => (
            <CourseCard key={course.name} {...course} />
          ))}
        </div>
      </main>
    </div>
  );
}
