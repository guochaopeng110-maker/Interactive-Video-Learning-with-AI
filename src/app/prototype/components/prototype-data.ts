export const courseSummary = {
  major: '护理学专业',
  name: '基础护理学',
  term: '2026 春',
  owner: '周老师',
  publishedLessonCount: 6,
  totalLessonCount: 8,
  materialCount: 12,
  knowledgePointCount: 46,
  activeStudents: 124,
};

export const courseStages = [
  { label: 'Material', detail: '12 份教材已入库，2 份待复核', status: 'teacher-editable' },
  { label: 'KnowledgeGraph', detail: '46 个 KnowledgePoint，4 个候选关系待确认', status: 'teacher-editable' },
  { label: 'Lesson', detail: '6 个已发布，2 个草稿待预览', status: 'shared-published' },
  { label: 'LearningEvent', detail: '124 名学生正在产生学习反馈', status: 'role-dependent' },
] as const;

export const graphNodes = [
  { id: 'kp-01', label: '无菌技术原则', type: 'core', progress: 0.92, state: 'published' },
  { id: 'kp-02', label: '手卫生流程', type: 'core', progress: 0.81, state: 'published' },
  { id: 'kp-03', label: '静脉输液评估', type: 'branch', progress: 0.64, state: 'published' },
  { id: 'kp-04', label: '压力性损伤预防', type: 'support', progress: 0.51, state: 'draft' },
  { id: 'kp-05', label: '跌倒风险观察', type: 'support', progress: 0.73, state: 'published' },
  { id: 'kp-06', label: '隔离级别判断', type: 'branch', progress: 0.44, state: 'draft' },
] as const;

export const lessonNodes = [
  {
    title: 'LessonNode 1 · 情境导入',
    knowledgePoint: '无菌技术原则',
    mode: '主线',
    detail: '视频片段 + 课堂提问，建立病房交接场景。',
  },
  {
    title: 'LessonNode 2 · 操作判断',
    knowledgePoint: '手卫生流程',
    mode: '分支',
    detail: '单选题触发正确推进或 RemediationBranch。',
  },
  {
    title: 'LessonNode 3 · 补救讲解',
    knowledgePoint: '静脉输液评估',
    mode: '补救',
    detail: '错误后进入针对性解释，再回主线。',
  },
  {
    title: 'LessonNode 4 · 临床收束',
    knowledgePoint: '跌倒风险观察',
    mode: '主线',
    detail: 'GroundedAssistant 引导学生回看教材依据。',
  },
] as const;

export const teacherAnalytics = [
  { label: '高掉点节点', value: 'LessonNode 2', note: '38% 学生在操作判断处进入补救分支' },
  { label: '弱知识点', value: '静脉输液评估', note: '最近三次发布后仍保持低掌握度' },
  { label: '可行动建议', value: '补充源依据', note: '在预览页插入教材出处与错误示例对照' },
] as const;

export const studentCourseCards = [
  { title: '基础护理学', progress: '已完成 68%', next: '继续 Lesson: 无菌操作中的风险识别', status: 'published' },
  { title: '内科护理学', progress: '已完成 34%', next: '复习 Pressure Injury 相关节点', status: 'published' },
] as const;

export const remediationItems = [
  { knowledgePoint: '静脉输液评估', reason: '最近两次都在并发症识别题答错', action: '重做补救 LessonNode + 查看教材出处' },
  { knowledgePoint: '隔离级别判断', reason: '知识图谱上仍处于低掌握区', action: '先复习图谱摘要，再回 Lesson 流' },
] as const;

export const adminCatalogRows = [
  { major: '护理学专业', course: '基础护理学', owner: '周老师', visibility: '已发布给 2026 春 1-3 班', governance: '正常' },
  { major: '护理学专业', course: '内科护理学', owner: '李老师', visibility: '仅教师可见', governance: '待发布复核' },
  { major: '护理学专业', course: '外科护理学', owner: '王老师', visibility: '暂停学生访问', governance: '需要治理确认' },
] as const;

export const adminUserRows = [
  { name: '周老师', role: 'Teacher', scope: '基础护理学', boundary: '可发布 Lesson，不可调整组织角色' },
  { name: '张同学', role: 'Student', scope: '基础护理学 / 内科护理学', boundary: '只访问已发布 Lesson 与个人进度' },
  { name: '陈主任', role: 'Admin', scope: '护理学专业', boundary: '可调整目录与权限，不可直接编辑 Lesson' },
] as const;

export const governanceAlerts = [
  { title: '发布前复核', detail: '2 个 Lesson 仍引用 draft KnowledgePoint，教师需先确认后才可发布。', severity: 'high' },
  { title: '角色边界提醒', detail: '有 1 名助教被错误赋予 admin 权限，需要在 Users 页修正。', severity: 'medium' },
  { title: '学生可见性', detail: '3 个 Course 已发布，但其中 1 个 Lesson 仍处于 preview-only。', severity: 'medium' },
] as const;

export const organizationMetrics = [
  { label: '活跃课程', value: '18', note: '其中 12 门正在产生 LearningEvent' },
  { label: '待治理事项', value: '5', note: '覆盖发布复核、可见性修正与角色纠偏' },
  { label: '组织掌握度', value: '74%', note: '按已发布 Lesson 的 Course 级聚合估算' },
] as const;
