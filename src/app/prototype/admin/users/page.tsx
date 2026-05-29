import { Surface, TableBlock } from '../../components/PrototypeBlocks';
import { adminUserRows } from '../../components/prototype-data';

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <Surface
        eyebrow="Admin Users"
        accent="#9A3412"
        title="角色与课程归属要在同一个治理入口里看清楚"
        description="管理员需要同时看到用户角色、负责 Course 和权限边界，因为这些直接决定谁能进入 teacher authoring、student learning 或 admin governance 流。"
      >
        <TableBlock
          columns={['用户', '角色', '作用范围', '权限边界']}
          rows={adminUserRows.map((row) => [row.name, row.role, row.scope, row.boundary])}
        />
      </Surface>
    </div>
  );
}
