import { Surface, TableBlock } from '../../components/PrototypeBlocks';
import { remediationItems } from '../../components/prototype-data';

export default function StudentReviewPage() {
  return (
    <div className="space-y-6">
      <Surface
        eyebrow="Student Review"
        accent="#0F766E"
        title="补救与复习拥有独立目的地"
        description="这页完成 #22 的第二个关键点：学生的错题恢复不再隐含在 lesson 内，而是通过可见的 Review 入口聚合弱 KnowledgePoint、重试建议与下一步动作。"
      >
        <TableBlock
          columns={['KnowledgePoint', '触发原因', '建议动作']}
          rows={remediationItems.map((item) => [item.knowledgePoint, item.reason, item.action])}
        />
      </Surface>

      <Surface
        eyebrow="Boundary Reminder"
        accent="#0F766E"
        title="Review 仍只处理学生可见的发布内容"
        description="补救页不会暴露教师的原始 QuizDraft、BranchDraft 或课程治理信息。学生能看到的只有已经发布到学习流中的节点、教材依据和重试建议。"
      />
    </div>
  );
}
