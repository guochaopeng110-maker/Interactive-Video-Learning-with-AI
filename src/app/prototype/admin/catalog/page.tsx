import { StageRail, Surface, TableBlock } from '../../components/PrototypeBlocks';
import { adminCatalogRows, courseStages } from '../../components/prototype-data';

export default function AdminCatalogPage() {
  return (
    <div className="space-y-6">
      <Surface
        eyebrow="Admin Catalog"
        accent="#9A3412"
        title="Catalog 管理的是 Major / Course 结构，不是 Lesson 内容"
        description="这里建立 #23 的第一段治理流。管理员在共享 Course 模型上工作，但动作集中在目录归属、可见性和开课状态，而不是进入教师作者界面。"
      >
        <TableBlock
          columns={['Major', 'Course', 'Owner', 'Visibility', 'Governance']}
          rows={adminCatalogRows.map((row) => [row.major, row.course, row.owner, row.visibility, row.governance])}
        />
      </Surface>

      <Surface
        eyebrow="Shared Model"
        accent="#9A3412"
        title="管理员看到的 Course stages 与其他角色一致，但关注点不同"
        description="为了实现 #24 的跨角色一致性，这里沿用同一套 Course 阶段视觉语言，但强调的是可见性和治理状态，而不是编辑与学习动作。"
      >
        <StageRail items={courseStages} mode="admin" />
      </Surface>
    </div>
  );
}
