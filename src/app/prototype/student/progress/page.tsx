import { MetricCards, Surface } from '../../components/PrototypeBlocks';

const progressMetrics = [
  { label: 'Course Mastery', value: '74%', note: '聚合已发布 KnowledgePoint 的当前掌握度。' },
  { label: '待完成补救', value: '2', note: '完成后会把结果重新回写到图谱与 Lesson 推荐。' },
  { label: '下一个建议', value: '无菌技术 Lesson', note: '根据最近 LearningEvent 自动推荐。' },
];

export default function StudentProgressPage() {
  return (
    <div className="space-y-6">
      <Surface
        eyebrow="Student Progress"
        accent="#0F766E"
        title="Progress 关注 mastery 和下一步，而不是平台 vanity metrics"
        description="这里承接 Course、KnowledgeGraph、Lesson 和 Review 的结果，帮助学生知道自己已经掌握了什么、还差什么，以及现在应该做什么。"
      >
        <MetricCards accent="#0F766E" items={progressMetrics} />
      </Surface>

      <Surface
        eyebrow="Continuity"
        accent="#0F766E"
        title="Progress 页面把学生送回正确的学习入口"
        description="当 Progress 发现低掌握度节点时，会把学生送回 Review 或某个 Lesson，而不是暴露教师编排或管理员治理入口。"
      />
    </div>
  );
}
