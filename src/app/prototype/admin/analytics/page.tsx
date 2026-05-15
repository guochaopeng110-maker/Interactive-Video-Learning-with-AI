import { MetricCards, Surface } from '../../components/PrototypeBlocks';
import { organizationMetrics } from '../../components/prototype-data';

const analyticsNotes = [
  {
    title: '组织视角',
    detail: '这里看的是跨 Course、跨角色的汇总结果，而不是复制教师单课分析。',
  },
  {
    title: '治理用途',
    detail: '指标主要用于发现权限配置、发布延迟、课程可见性和组织资源问题。',
  },
  {
    title: '边界清晰',
    detail: '管理员能看到趋势和异常，但不会在 analytics 里获得 Lesson 编辑动作。',
  },
];

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <Surface
        eyebrow="Admin Analytics"
        accent="#9A3412"
        title="组织分析不重复教师报表，而是服务治理判断"
        description="这一步完成 #23 的闭环，让 admin path 可以从首页进入 catalog、users、governance，再回到 organization analytics 做资源与策略判断。"
      >
        <MetricCards accent="#9A3412" items={organizationMetrics} />
      </Surface>

      <Surface
        eyebrow="Analytics Framing"
        accent="#9A3412"
        title="同一个产品模型，在 admin 侧呈现为跨角色运营视角"
        description="这也承接了 #24：共享 Course / KnowledgeGraph / Lesson 语义不变，但 analytics 层级和动作边界随着角色变化。"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {analyticsNotes.map((item) => (
            <article key={item.title} className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
              <p className="text-lg font-semibold text-slate-950">{item.title}</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.detail}</p>
            </article>
          ))}
        </div>
      </Surface>
    </div>
  );
}
