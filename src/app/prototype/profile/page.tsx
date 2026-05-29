import { Surface } from '../components/PrototypeBlocks';

const settings = [
  { title: '通知偏好', detail: '控制 Lesson 发布提醒、待复核提示与学生学习提醒。' },
  { title: '术语帮助', detail: '统一解释 Course、KnowledgeGraph、Lesson、GroundedAssistant 等领域名词。' },
  { title: '角色历史', detail: '记录最近进入过的 teacher / student / admin workspace，便于快速切换。' },
];

export default function ProfilePrototypePage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <Surface
        eyebrow="Shared Profile"
        accent="#4F46E5"
        title="共享资料与帮助入口"
        description="这个页面承接 shared entry 层的通用设置，避免把通知、术语帮助和角色偏好分散进各个 role workspace。"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {settings.map((item) => (
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
