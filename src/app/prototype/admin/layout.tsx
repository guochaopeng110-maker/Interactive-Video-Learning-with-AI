import type { ReactNode } from 'react';
import PrototypeAppShell from '../components/PrototypeAppShell';

export default function AdminPrototypeLayout({ children }: { children: ReactNode }) {
  return (
    <PrototypeAppShell
      role="admin"
      title="管理工作台"
      subtitle="管理流延续 role-based shell，但职责聚焦 Major / Course 目录、用户权限、治理审计与组织分析，不推翻也不侵入教师 Lesson 编排。"
    >
      {children}
    </PrototypeAppShell>
  );
}
