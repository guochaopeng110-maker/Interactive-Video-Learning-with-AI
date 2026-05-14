type StepStatus = 'completed' | 'current' | 'upcoming';
type Tone = 'high' | 'medium' | 'low';

type Step = {
  id: string;
  label: string;
  note: string;
  status: StepStatus;
};

type Metric = {
  label: string;
  value: string;
  accent: string;
};

type TimelineItem = {
  time: string;
  title: string;
  detail: string;
  accent: string;
};

type ReviewItem = {
  title: string;
  confidence: string;
  summary: string;
  evidence: string;
  tone: Tone;
};

const steps: Step[] = [
  { id: 'upload', label: '上传教材', note: '文件与课程归属已确认', status: 'completed' },
  { id: 'analysis', label: 'AI 解析', note: '正在拆分段落并提取知识点', status: 'current' },
  { id: 'review', label: '审核确认', note: '默认批量通过，低置信度需复核', status: 'upcoming' },
];

const metrics: Metric[] = [
  { label: '已切分片段', value: '18', accent: '#4F46E5' },
  { label: '提取知识点', value: '26', accent: '#22C55E' },
  { label: '待确认项', value: '4', accent: '#F59E0B' },
  { label: '节省人工整理', value: '42 分钟', accent: '#312E81' },
];

const timeline: TimelineItem[] = [
  {
    time: '14:02',
    title: '教材上传完成',
    detail: '《基础护理学-静脉输液》共 46 页，已自动关联到课程“基础护理学”。',
    accent: '#4F46E5',
  },
  {
    time: '14:03',
    title: '文本分块完成',
    detail: 'AI 已生成 18 个教学片段，并识别 3 个章节主题。',
    accent: '#818CF8',
  },
  {
    time: '14:04',
    title: '知识点提取中',
    detail: '已抽取 26 个候选知识点，正在标注 4 个低置信度项。',
    accent: '#22C55E',
  },
];

const reviewItems: ReviewItem[] = [
  {
    title: '静脉输液核对流程',
    confidence: '96%',
    summary: '教学重点覆盖“三查七对”与输液前双人核验。',
    evidence: '来源于第 8-11 页操作流程图与旁注说明。',
    tone: 'high',
  },
  {
    title: '输液并发症识别',
    confidence: '94%',
    summary: 'AI 识别出渗出、静脉炎、空气栓塞三个重点并发症。',
    evidence: '来源于第 22 页病例和第 24 页表格总结。',
    tone: 'high',
  },
  {
    title: '滴速调节公式',
    confidence: '71%',
    summary: '疑似包含儿童输液公式与成人公式混用，建议老师确认。',
    evidence: '来源于第 18 页手写批注区域，OCR 噪声较高。',
    tone: 'medium',
  },
  {
    title: '风险预警话术',
    confidence: '62%',
    summary: 'AI 将“患者主诉胸闷”归为静脉炎预警，可能需要改为输液反应预警。',
    evidence: '来源于第 31 页案例讨论，语义歧义较强。',
    tone: 'low',
  },
];

function toneStyles(tone: Tone) {
  if (tone === 'high') {
    return {
      badgeBg: '#DCFCE7',
      badgeColor: '#166534',
      border: '#BBF7D0',
      panel: '#F0FDF4',
    };
  }

  if (tone === 'medium') {
    return {
      badgeBg: '#FEF3C7',
      badgeColor: '#92400E',
      border: '#FCD34D',
      panel: '#FFF7ED',
    };
  }

  return {
    badgeBg: '#FEE2E2',
    badgeColor: '#B91C1C',
    border: '#FCA5A5',
    panel: '#FEF2F2',
  };
}

function Stepper() {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {steps.map((step, index) => {
        const completed = step.status === 'completed';
        const current = step.status === 'current';

        return (
          <div
            key={step.id}
            className="min-h-[110px] rounded-2xl border p-4"
            style={{
              background: current ? '#EEF2FF' : '#FFFFFF',
              borderColor: current ? '#818CF8' : '#E5E7EB',
              boxShadow: current ? '0 10px 30px rgba(79, 70, 229, 0.12)' : 'none',
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold"
                style={{
                  background: completed ? '#22C55E' : current ? '#4F46E5' : '#E5E7EB',
                  color: completed || current ? '#FFFFFF' : '#6B7280',
                }}
              >
                {completed ? '✓' : index + 1}
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: '#312E81' }}>
                  {step.label}
                </p>
                <p className="text-xs" style={{ color: '#818CF8' }}>
                  {step.note}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function SummaryRail() {
  return (
    <aside className="rounded-[28px] border border-[#E5E7EB] bg-white p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em]" style={{ color: '#818CF8' }}>
            本次教材
          </p>
          <h2 className="mt-2 text-xl font-semibold" style={{ color: '#312E81' }}>
            基础护理学-静脉输液.pdf
          </h2>
          <p className="mt-1 text-sm" style={{ color: '#6366F1' }}>
            46 页 · 12.8 MB · 上传于 14:02
          </p>
        </div>
        <span
          className="rounded-full px-3 py-1 text-xs font-medium"
          style={{ background: '#DCFCE7', color: '#166534' }}
        >
          处理中
        </span>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-2xl border border-[#E5E7EB] bg-[#F8FAFC] p-4">
            <p className="text-xs" style={{ color: '#818CF8' }}>
              {metric.label}
            </p>
            <p className="mt-2 text-2xl font-semibold" style={{ color: metric.accent }}>
              {metric.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-[#BBF7D0] bg-[#F0FDF4] p-4">
        <p className="text-xs" style={{ color: '#166534' }}>
          推荐下一步
        </p>
        <p className="mt-2 text-sm leading-6" style={{ color: '#166534' }}>
          完成审核后可直接进入知识图谱构建，系统会预填 26 个知识点候选节点。
        </p>
      </div>
    </aside>
  );
}

function ReviewList() {
  return (
    <div className="space-y-4">
      {reviewItems.map((item) => {
        const tone = toneStyles(item.tone);

        return (
          <article
            key={item.title}
            className="rounded-2xl border p-4 transition-colors duration-200"
            style={{ background: tone.panel, borderColor: tone.border }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold" style={{ color: '#312E81' }}>
                    {item.title}
                  </h3>
                  <span
                    className="rounded-full px-2.5 py-1 text-[11px] font-semibold"
                    style={{ background: tone.badgeBg, color: tone.badgeColor }}
                  >
                    置信度 {item.confidence}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6" style={{ color: '#475569' }}>
                  {item.summary}
                </p>
                <p className="mt-2 text-xs leading-5" style={{ color: '#818CF8' }}>
                  依据：{item.evidence}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  className="cursor-pointer rounded-full bg-white px-3 py-1.5 text-xs font-medium transition-opacity duration-200 hover:opacity-85"
                  style={{ color: '#312E81' }}
                >
                  修改
                </button>
                <button
                  className="cursor-pointer rounded-full px-3 py-1.5 text-xs font-medium text-white transition-opacity duration-200 hover:opacity-90"
                  style={{ background: item.tone === 'low' ? '#EF4444' : '#4F46E5' }}
                >
                  {item.tone === 'low' ? '重点复核' : '通过'}
                </button>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default function MaterialsPrototypePage() {
  return (
    <div className="min-h-screen" style={{ background: '#EEF2FF' }}>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="rounded-[32px] bg-white px-6 py-6 shadow-sm">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <p className="text-sm font-medium" style={{ color: '#818CF8' }}>
                第 3 屏 · 教材上传 + AI 审核
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight" style={{ color: '#312E81' }}>
                10 秒开始上传，AI 帮你完成拆分、提取与首轮审核
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-6" style={{ color: '#475569' }}>
                用清晰的分步向导降低操作负担，同时让老师始终看见 AI 处理进度与可直接进入下一步的结果积累。
              </p>
            </div>
            <button
              className="cursor-pointer rounded-full px-5 py-3 text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-90"
              style={{ background: '#22C55E' }}
            >
              继续上次审核
            </button>
          </div>
          <div className="mt-6">
            <Stepper />
          </div>
        </header>

        <main className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_360px]">
          <section className="space-y-6">
            <div className="rounded-[28px] bg-white p-6 shadow-sm">
              <div className="grid gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
                <div
                  className="rounded-[24px] border border-dashed p-5"
                  style={{ borderColor: '#A5B4FC', background: 'linear-gradient(180deg, #F8FAFF 0%, #EEF2FF 100%)' }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold" style={{ color: '#312E81' }}>
                        Step 1 · 上传教材
                      </p>
                      <p className="mt-1 text-sm" style={{ color: '#6366F1' }}>
                        支持 PDF / DOCX / PPT，自动关联到课程与章节。
                      </p>
                    </div>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-medium" style={{ color: '#4F46E5' }}>
                      已完成
                    </span>
                  </div>
                  <div className="mt-6 rounded-2xl bg-white p-4 shadow-sm">
                    <div className="flex items-center justify-between text-sm">
                      <span style={{ color: '#312E81' }}>基础护理学-静脉输液.pdf</span>
                      <span style={{ color: '#818CF8' }}>12.8 MB</span>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2 text-xs">
                      {['基础护理学', '静脉输液', '教师手册'].map((tag) => (
                        <span key={tag} className="rounded-full px-3 py-1" style={{ background: '#EEF2FF', color: '#4F46E5' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="rounded-[24px] bg-[#F8FAFC] p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold" style={{ color: '#312E81' }}>
                        Step 2 · AI 解析中
                      </p>
                      <p className="mt-1 text-sm" style={{ color: '#6366F1' }}>
                        正在切分章节、抽取知识点并标注风险项。
                      </p>
                    </div>
                    <span className="rounded-full bg-[#4F46E5] px-3 py-1 text-xs font-medium text-white">73%</span>
                  </div>
                  <div className="mt-5 h-2 rounded-full bg-[#E0E7FF]">
                    <div
                      className="h-2 rounded-full"
                      style={{ width: '73%', background: 'linear-gradient(90deg, #4F46E5 0%, #22C55E 100%)' }}
                    />
                  </div>
                  <div className="mt-5 space-y-3">
                    {timeline.map((item) => (
                      <div key={item.title} className="flex gap-3">
                        <div className="mt-1 h-2.5 w-2.5 rounded-full" style={{ background: item.accent }} />
                        <div>
                          <p className="text-xs" style={{ color: '#818CF8' }}>
                            {item.time}
                          </p>
                          <p className="text-sm font-medium" style={{ color: '#312E81' }}>
                            {item.title}
                          </p>
                          <p className="text-sm leading-6" style={{ color: '#475569' }}>
                            {item.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#312E81' }}>
                    Step 3 · 审核确认
                  </p>
                  <p className="mt-1 text-sm leading-6" style={{ color: '#475569' }}>
                    高置信度内容默认建议通过，仅把低置信度与歧义内容单独抬高，让老师快速批量放行。
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full px-3 py-1" style={{ background: '#DCFCE7', color: '#166534' }}>
                    可直接通过 22 项
                  </span>
                  <span className="rounded-full px-3 py-1" style={{ background: '#FEF3C7', color: '#92400E' }}>
                    待确认 4 项
                  </span>
                </div>
              </div>
              <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                <div className="rounded-[24px] bg-[#F8FAFC] p-5">
                  <p className="text-xs uppercase tracking-[0.18em]" style={{ color: '#818CF8' }}>
                    AI 总结
                  </p>
                  <ul className="mt-4 space-y-3 text-sm leading-6" style={{ color: '#312E81' }}>
                    <li>已识别 3 个章节主题，可直接生成知识图谱一级节点。</li>
                    <li>大部分知识点来自规范操作与病例讨论，适合进入后续节点编排。</li>
                    <li>4 项低置信度内容主要来自 OCR 噪声与案例语义歧义。</li>
                  </ul>
                  <button
                    className="mt-6 cursor-pointer rounded-full bg-[#4F46E5] px-4 py-2 text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-90"
                  >
                    一键通过高置信度项
                  </button>
                </div>
                <ReviewList />
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  className="cursor-pointer rounded-full border border-[#D1D5DB] px-4 py-2.5 text-sm font-medium transition-colors duration-200 hover:bg-slate-50"
                  style={{ color: '#312E81' }}
                >
                  重新运行 AI 解析
                </button>
                <button
                  className="cursor-pointer rounded-full bg-[#22C55E] px-5 py-2.5 text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-90"
                >
                  进入知识图谱构建
                </button>
              </div>
            </div>
          </section>

          <SummaryRail />
        </main>
      </div>
    </div>
  );
}
