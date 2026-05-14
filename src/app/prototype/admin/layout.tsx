import type { ReactNode } from 'react';
import PrototypeAppShell from '../components/PrototypeAppShell';

export default function AdminPrototypeLayout({ children }: { children: ReactNode }) {
  return (
    <PrototypeAppShell
      role="admin"
      title="管理工作台"
      subtitle="这里先建立 admin workspace 的共享壳层，明确它与教师创作流、学生学习流分离，后续 catalog、users、governance 和 analytics 会接在这里。"
    >
      {children}
    </PrototypeAppShell>
  );
}
