export type RoleKey = 'teacher' | 'student' | 'admin';

export type RoleMeta = {
  key: RoleKey;
  name: string;
  description: string;
  accent: string;
  homeHref: string;
};

export type WorkspaceNavItem = {
  label: string;
  href: string;
};

export const roleMetaList: RoleMeta[] = [
  {
    key: 'teacher',
    name: '教师工作台',
    description: '围绕 Course、Material、KnowledgeGraph 和 Lesson 的备课与迭代空间。',
    accent: '#4F46E5',
    homeHref: '/prototype/teacher/home',
  },
  {
    key: 'student',
    name: '学生工作台',
    description: '围绕课程导览、知识图谱、Lesson 学习、补救与进度的学习空间。',
    accent: '#0F766E',
    homeHref: '/prototype/student/home',
  },
  {
    key: 'admin',
    name: '管理工作台',
    description: '围绕 Major、Course、用户权限、治理与组织分析的管理空间。',
    accent: '#9A3412',
    homeHref: '/prototype/admin/home',
  },
];

export const workspaceNav: Record<RoleKey, WorkspaceNavItem[]> = {
  teacher: [
    { label: '首页', href: '/prototype/teacher/home' },
    { label: '课程', href: '/prototype/teacher/course' },
    { label: '教材', href: '/prototype/teacher/materials' },
  ],
  student: [
    { label: '首页', href: '/prototype/student/home' },
    { label: '我的课程', href: '/prototype/student/course' },
    { label: '学习进度', href: '/prototype/student/progress' },
  ],
  admin: [
    { label: '首页', href: '/prototype/admin/home' },
    { label: '课程目录', href: '/prototype/admin/catalog' },
    { label: '用户权限', href: '/prototype/admin/users' },
  ],
};

export function getRoleMeta(role: string): RoleMeta {
  return roleMetaList.find((item) => item.key === role) ?? roleMetaList[0];
}
