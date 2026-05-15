import type { ReactNode } from 'react';
import PrototypeAppShell from '../components/PrototypeAppShell';

export default function StudentPrototypeLayout({ children }: { children: ReactNode }) {
  return (
    <PrototypeAppShell
      role="student"
      title="学生工作台"
      subtitle="学生流沿用同一个 Course / KnowledgeGraph / Lesson 语义，但只暴露已发布内容、补救复习和个人进度，不泄露教师草稿与治理动作。"
    >
      {children}
    </PrototypeAppShell>
  );
}
