import type { ReactNode } from 'react';
import PrototypeAppShell from '../components/PrototypeAppShell';

export default function TeacherPrototypeLayout({ children }: { children: ReactNode }) {
  return (
    <PrototypeAppShell
      role="teacher"
      title="教师工作台"
      subtitle="在 #19 已建立的 shell 上继续延展教师作者流：从 Course 与 Material 评审，进入 KnowledgeGraph、Lesson 编排、学生式预览，再回到教学分析做迭代。"
    >
      {children}
    </PrototypeAppShell>
  );
}
