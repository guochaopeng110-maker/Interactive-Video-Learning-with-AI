import Link from 'next/link';
import { CourseHero, MetricCards, Surface } from '../../components/PrototypeBlocks';
import { organizationMetrics } from '../../components/prototype-data';

const adminActions = [
  { title: '目录治理', detail: '管理 Major 与 Course 的归属、可见性和开课结构。', href: '/prototype/admin/catalog' },
  { title: '用户与角色', detail: '校正 teacher / student / admin 的角色配置与课程所有权。', href: '/prototype/admin/users' },
  { title: '发布治理', detail: '检查异常发布、角色越权和 preview-only Lesson。', href: '/prototype/admin/governance' },
];

export default function AdminHomePrototypePage() {
  return (
    <div className="space-y-6">
      <CourseHero
        roleLabel="Admin Home"
        accent="#9A3412"
        actionLabel="进入目录治理"
        actionHref="/prototype/admin/catalog"
        detail="管理员工作台延续 #19 的 shell，但目标与 teacher / student 完全不同。这里聚焦组织结构、权限和治理，而不是走入 Lesson authoring。"
      />

      <MetricCards accent="#9A3412" items={organizationMetrics} />

      <Surface
        eyebrow="Admin Workflow"
        accent="#9A3412"
        title="管理流要作为独立治理 workspace 成立"
        description="管理员通过 catalog、users、governance、analytics 触达同一个 Course 模型，但处理的是结构、可见性和审计，而不是内容创作。"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {adminActions.map((item) => (
            <Link key={item.title} href={item.href} className="rounded-[24px] border border-slate-200 bg-slate-50 p-5 transition-colors hover:border-orange-200 hover:bg-orange-50/50">
              <p className="text-lg font-semibold text-slate-950">{item.title}</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.detail}</p>
            </Link>
          ))}
        </div>
      </Surface>
    </div>
  );
}
