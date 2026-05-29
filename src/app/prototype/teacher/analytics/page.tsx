import { MetricCards, Surface } from '../../components/PrototypeBlocks';
import { teacherAnalytics } from '../../components/prototype-data';

const iterationActions = [
  {
    title: '回到 KnowledgeGraph',
    detail: '若某个 KnowledgePoint 长期低掌握，先回图谱确认是否缺前置节点或关系。',
  },
  {
    title: '回到 Lesson Builder',
    detail: '若掉点集中在某个 LessonNode，重排主线或补救分支的节奏。',
  },
  {
    title: '回到 Preview',
    detail: '新增教材出处、提示语或错误示例后，再走一次学生式预览。',
  },
];

export default function TeacherAnalyticsPage() {
  return (
    <div className="space-y-6">
      <Surface
        eyebrow="Teacher Analytics"
        accent="#4F46E5"
        title="发布不是终点，LearningEvent 要回流成教师可行动信号"
        description="这一步完成 #21 的 handoff：从 Lesson preview 与 publish，自然回到 analytics，让教师知道下次该修改哪个 KnowledgePoint、LessonNode 或补救分支。"
      >
        <MetricCards accent="#4F46E5" items={teacherAnalytics} />
      </Surface>

      <Surface
        eyebrow="Iteration Loop"
        accent="#4F46E5"
        title="分析页明确把教师送回哪一段作者流"
        description="教学分析不是独立报表，而是 authoring loop 的回程站。这样 teacher flow 从 Materials 到 Analytics 才真正闭环。"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {iterationActions.map((item) => (
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
