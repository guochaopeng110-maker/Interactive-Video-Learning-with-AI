import { Surface } from '../../components/PrototypeBlocks';
import { governanceAlerts } from '../../components/prototype-data';

export default function AdminGovernancePage() {
  return (
    <div className="space-y-6">
      <Surface
        eyebrow="Admin Governance"
        accent="#9A3412"
        title="治理流负责异常、可见性与边界纠偏"
        description="这里明确管理员不会替代教师去编 Lesson，而是处理发布异常、权限错误和跨角色可见性问题，让产品模型在组织层面保持安全。"
      >
        <div className="space-y-4">
          {governanceAlerts.map((alert) => (
            <article key={alert.title} className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-lg font-semibold text-slate-950">{alert.title}</p>
                <span
                  className="rounded-full px-2.5 py-1 text-[11px] font-semibold text-white"
                  style={{ background: alert.severity === 'high' ? '#B91C1C' : '#9A3412' }}
                >
                  {alert.severity}
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">{alert.detail}</p>
            </article>
          ))}
        </div>
      </Surface>
    </div>
  );
}
