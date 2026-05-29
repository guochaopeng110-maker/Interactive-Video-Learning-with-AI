import Link from 'next/link';
import type { ReactNode } from 'react';

type SurfaceProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  accent?: string;
};

export function Surface({ eyebrow, title, description, children, accent = '#4F46E5' }: SurfaceProps) {
  return (
    <section className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200/70">
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: accent }}>
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">{title}</h2>
      {description ? <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-600">{description}</p> : null}
      {children ? <div className="mt-6">{children}</div> : null}
    </section>
  );
}

export function MetricCards({
  items,
  accent,
}: {
  items: readonly { label: string; value: string; note: string }[];
  accent: string;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((item) => (
        <article key={item.label} className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{item.label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight" style={{ color: accent }}>
            {item.value}
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-600">{item.note}</p>
        </article>
      ))}
    </div>
  );
}

export function CourseHero({
  roleLabel,
  accent,
  actionLabel,
  actionHref,
  detail,
}: {
  roleLabel: string;
  accent: string;
  actionLabel: string;
  actionHref: string;
  detail: string;
}) {
  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_360px]">
      <article
        className="rounded-[28px] px-6 py-6 text-white shadow-lg"
        style={{ background: `linear-gradient(145deg, ${accent} 0%, #312E81 100%)` }}
      >
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">{roleLabel}</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">共享 Course 语义，不同角色动作边界</h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-white/80">{detail}</p>
      </article>

      <aside className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">当前 Course</p>
        <p className="mt-3 text-xl font-semibold text-slate-950">基础护理学</p>
        <p className="mt-2 text-sm leading-6 text-slate-600">护理学专业 · 2026 春 · Shared Course View Model</p>
        <Link
          href={actionHref}
          className="mt-5 inline-flex rounded-full px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ background: accent }}
        >
          {actionLabel}
        </Link>
      </aside>
    </div>
  );
}

export function StageRail({
  items,
  mode,
}: {
  items: readonly { label: string; detail: string; status: string }[];
  mode: 'teacher' | 'student' | 'admin';
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item, index) => {
        const statusColor =
          item.status === 'teacher-editable'
            ? '#4F46E5'
            : item.status === 'shared-published'
              ? '#0F766E'
              : '#9A3412';

        return (
          <article key={item.label} className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Stage {index + 1}</p>
              <span className="rounded-full px-2.5 py-1 text-[11px] font-semibold text-white" style={{ background: statusColor }}>
                {mode === 'teacher' && item.status === 'teacher-editable' ? '可编辑' : null}
                {mode === 'student' && item.status === 'shared-published' ? '已发布' : null}
                {mode === 'admin' && item.status === 'role-dependent' ? '治理观察' : null}
                {mode !== 'teacher' && item.status === 'teacher-editable' ? '教师侧管理' : null}
                {mode !== 'student' && item.status === 'shared-published' ? '跨角色共享' : null}
                {mode !== 'admin' && item.status === 'role-dependent' ? '按权限可见' : null}
              </span>
            </div>
            <p className="mt-4 text-lg font-semibold text-slate-950">{item.label}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{item.detail}</p>
          </article>
        );
      })}
    </div>
  );
}

export function KnowledgeGraphPanel({
  nodes,
  mode,
}: {
  nodes: readonly { id: string; label: string; type: string; progress: number; state: string }[];
  mode: 'teacher' | 'student' | 'admin';
}) {
  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_320px]">
      <article className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-slate-950">KnowledgeGraph</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {mode === 'teacher' && '教师可以确认候选 KnowledgePoint、调整关系与 Lesson 引用。'}
              {mode === 'student' && '学生看到的是只读学习地图，突出掌握度与推荐路径。'}
              {mode === 'admin' && '管理侧不编辑图谱内容，只查看发布状态与异常依赖。'}
            </p>
          </div>
          <div className="rounded-full bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-500">
            {mode === 'teacher' ? 'editable graph' : mode === 'student' ? 'read-only graph' : 'governance view'}
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {nodes.map((node) => {
            const progressWidth = `${Math.round(node.progress * 100)}%`;
            const stateColor = node.state === 'published' ? '#0F766E' : '#9A3412';

            return (
              <article key={node.id} className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-slate-950">{node.label}</p>
                  <span className="rounded-full px-2 py-1 text-[11px] font-semibold text-white" style={{ background: stateColor }}>
                    {node.state}
                  </span>
                </div>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-400">{node.type}</p>
                <div className="mt-4 h-2 rounded-full bg-slate-200">
                  <div className="h-full rounded-full bg-indigo-500" style={{ width: progressWidth }} />
                </div>
                <p className="mt-3 text-sm text-slate-600">
                  掌握 / 完成度 {Math.round(node.progress * 100)}%
                  {mode === 'teacher' ? '，可继续影响 LessonNode 编排。' : null}
                  {mode === 'student' ? '，用于决定推荐学习顺序。' : null}
                  {mode === 'admin' ? '，仅作治理观察，不可直接编辑。' : null}
                </p>
              </article>
            );
          })}
        </div>
      </article>

      <aside className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Permission Boundary</p>
        <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
          <p>{mode === 'teacher' && '候选节点和 draft 关系只在教师流可编辑，发布后才进入学生视角。'}</p>
          <p>{mode === 'student' && '图谱上只显示已发布节点，任何 draft 或审核状态都被隐藏。'}</p>
          <p>{mode === 'admin' && '管理员只能看发布与异常，不会拿到 Lesson 编排入口。'}</p>
        </div>
      </aside>
    </div>
  );
}

export function LessonFlowPanel({
  nodes,
  mode,
  accent,
}: {
  nodes: readonly { title: string; knowledgePoint: string; mode: string; detail: string }[];
  mode: 'teacher-preview' | 'student-player';
  accent: string;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {nodes.map((node, index) => (
        <article key={node.title} className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Node {index + 1}</p>
            <span className="rounded-full px-2.5 py-1 text-[11px] font-semibold text-white" style={{ background: accent }}>
              {node.mode}
            </span>
          </div>
          <p className="mt-4 text-lg font-semibold text-slate-950">{node.title}</p>
          <p className="mt-2 text-sm font-medium text-slate-700">{node.knowledgePoint}</p>
          <p className="mt-3 text-sm leading-6 text-slate-600">{node.detail}</p>
          <p className="mt-4 text-xs leading-5 text-slate-500">
            {mode === 'teacher-preview' ? '以学生视角预演路径，确认主线与 RemediationBranch 是否顺畅。' : '学生只看到发布后的互动流与教材约束的 GroundedAssistant。'}
          </p>
        </article>
      ))}
    </div>
  );
}

export function TableBlock({
  columns,
  rows,
}: {
  columns: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">
      <div className="grid border-b border-slate-200 bg-slate-50" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}>
        {columns.map((column) => (
          <div key={column} className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            {column}
          </div>
        ))}
      </div>
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="grid border-b border-slate-100 last:border-b-0"
          style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}
        >
          {row.map((cell, cellIndex) => (
            <div key={`${rowIndex}-${cellIndex}`} className="px-4 py-4 text-sm leading-6 text-slate-600">
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
