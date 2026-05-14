import type { ReactNode } from 'react';
import PrototypeAppShell from '../components/PrototypeAppShell';

export default function StudentPrototypeLayout({ children }: { children: ReactNode }) {
  return (
    <PrototypeAppShell
      role="student"
      title="学生工作台"
      subtitle="这里先建立 student workspace 的共享壳层与角色上下文，后续的课程、知识图谱、Lesson 学习与复习流程会继续挂载到这组路由下。"
    >
      {children}
    </PrototypeAppShell>
  );
}
