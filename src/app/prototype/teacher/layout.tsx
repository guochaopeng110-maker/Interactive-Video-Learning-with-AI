import type { ReactNode } from 'react';
import PrototypeAppShell from '../components/PrototypeAppShell';

export default function TeacherPrototypeLayout({ children }: { children: ReactNode }) {
  return (
    <PrototypeAppShell
      role="teacher"
      title="教师工作台"
      subtitle="从共享登录进入教师作者空间，后续的 Course、Material、KnowledgeGraph 和 Lesson 流都会在这个壳层下继续展开。"
    >
      {children}
    </PrototypeAppShell>
  );
}
