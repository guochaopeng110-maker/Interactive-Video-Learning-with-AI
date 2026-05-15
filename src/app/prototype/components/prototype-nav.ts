export type RoleKey = 'teacher' | 'student' | 'admin';

export type RoleMeta = {
  key: RoleKey;
  name: string;
  description: string;
  accent: string;
  mutedAccent: string;
  homeHref: string;
  boundary: string;
};

export type WorkspaceNavItem = {
  label: string;
  href: string;
};

export const roleMetaList: RoleMeta[] = [
  {
    key: 'teacher',
    name: '教师工作台',
    description: '围绕 Course、Material、KnowledgeGraph 与 Lesson 的作者流，负责生成、审核、编排、预览与发布。',
    accent: '#4F46E5',
    mutedAccent: '#EEF2FF',
    homeHref: '/prototype/teacher/home',
    boundary: '可编辑课程内容并决定发布，但不能越权管理组织用户。',
  },
  {
    key: 'student',
    name: '学生工作台',
    description: '围绕 Course 学习、KnowledgeGraph 导航、Lesson 学习、Review 与 Progress 的学习流。',
    accent: '#0F766E',
    mutedAccent: '#CCFBF1',
    homeHref: '/prototype/student/home',
    boundary: '只消费已发布内容和个人进度，不接触草稿、审核或治理动作。',
  },
  {
    key: 'admin',
    name: '管理工作台',
    description: '围绕 Major、Course、用户角色、治理审计与组织分析的治理流，不进入教学内容编排。',
    accent: '#9A3412',
    mutedAccent: '#FFEDD5',
    homeHref: '/prototype/admin/home',
    boundary: '可管理结构、所有权和可见性，但不直接编辑 Lesson 内容。',
  },
];

export const workspaceNav: Record<RoleKey, WorkspaceNavItem[]> = {
  teacher: [
    { label: '首页', href: '/prototype/teacher/home' },
    { label: '课程', href: '/prototype/teacher/course' },
    { label: '教材审核', href: '/prototype/teacher/materials' },
    { label: '知识图谱', href: '/prototype/teacher/knowledge-graph' },
    { label: 'Lesson 编排', href: '/prototype/teacher/lesson-builder' },
    { label: '学生式预览', href: '/prototype/teacher/lesson-preview' },
    { label: '教学分析', href: '/prototype/teacher/analytics' },
  ],
  student: [
    { label: '首页', href: '/prototype/student/home' },
    { label: '我的课程', href: '/prototype/student/course' },
    { label: '知识图谱', href: '/prototype/student/knowledge-graph' },
    { label: 'Lesson 学习', href: '/prototype/student/lesson-player' },
    { label: '复习补救', href: '/prototype/student/review' },
    { label: '学习进度', href: '/prototype/student/progress' },
  ],
  admin: [
    { label: '首页', href: '/prototype/admin/home' },
    { label: '目录治理', href: '/prototype/admin/catalog' },
    { label: '用户与角色', href: '/prototype/admin/users' },
    { label: '发布治理', href: '/prototype/admin/governance' },
    { label: '组织分析', href: '/prototype/admin/analytics' },
  ],
};

export const sharedEntryNav: WorkspaceNavItem[] = [
  { label: '登录', href: '/prototype/login' },
  { label: '角色入口', href: '/prototype/role-entry' },
  { label: '共享资料', href: '/prototype/profile' },
];

export function getRoleMeta(role: string): RoleMeta {
  return roleMetaList.find((item) => item.key === role) ?? roleMetaList[0];
}
