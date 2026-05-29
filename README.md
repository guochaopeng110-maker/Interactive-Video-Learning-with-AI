# Interactive Video Learning with AI

一个面向教育场景的 AI 交互式视频学习平台原型项目，当前以「护理专业」作为示例语境，产品边界不限定于护理教育。

## 项目目标

- 教师上传课程 Material 后，AI 提取候选知识点并支持审核
- 教师在课程边界内完成知识图谱与 Lesson 编排
- 学生按 Course 进入学习流，完成学习、复习与进度追踪
- Course 边界内提供带引用的教材约束问答（Grounded Assistant）

## 当前完成情况（截至 2026-05-29）

### 1) 已完成

- 基础工程已搭建：Next.js 16 + React 19 + TypeScript + ESLint
- 角色化原型路由已打通：
  - 登录与角色入口
  - Teacher workspace（home/course/materials/knowledge-graph/lesson-builder/lesson-preview/analytics）
  - Student workspace（home/course/knowledge-graph/lesson-player/review/progress）
  - Admin workspace（home/catalog/users/governance/analytics）
- 领域上下文文档已形成（`CONTEXT.md` + ADR）
- 多轮 UI/UX 规格与计划文档已沉淀（`docs/superpowers/specs`、`docs/superpowers/plans`）

### 2) 进行中

- 原型向“可实现 UI 契约”持续收敛（teacher master slice 已推进，更多页面仍在细化）
- 角色流之间的一致性与 handoff 仍在迭代（teacher -> student -> admin）

### 3) 未完成 / 待实现

- 后端服务、数据库与 API 尚未落地
- 真实 AI 管线（检索、候选点提取、审核编排、引用映射）尚未接入
- 权限体系、鉴权与会话管理尚未实现
- 学习事件采集与分析聚合尚未实现
- 自动化测试体系（单测/集成/E2E）尚未建立
- 生产部署流程与可观测性尚未配置

### 4) 质量现状

- `npm run lint` 可通过（0 error）
- 当前存在 1 条 Next.js 字体使用 warning（非阻断）

## 技术栈

- Next.js 16.2.6
- React 19.2.4
- TypeScript 5
- Tailwind CSS 4
- ESLint 9

## 本地运行

```bash
npm install
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000)。

## 常用命令

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## 目录结构（核心）

```text
src/app/
  page.tsx                       # 默认重定向到 /prototype/login
  prototype/
    login/                       # 登录原型
    role-entry/                  # 角色入口
    teacher/                     # 教师流原型
    student/                     # 学生流原型
    admin/                       # 管理流原型
    components/                  # 原型通用组件与数据

docs/
  adr/                           # 架构决策记录
  agents/                        # Agent 协作约定
  superpowers/specs/             # 设计规格
  superpowers/plans/             # 实施计划
```

## 相关文档

- 领域上下文：`CONTEXT.md`
- 架构决策：`docs/adr/`
- Agent 协作说明：`AGENTS.md`

## 建议下一步

- 以 `Course -> Material -> KnowledgeGraph -> Lesson` 建立最小后端垂直切片
- 把 Grounded Assistant 先做成课程边界内的可检索问答 MVP
- 为 teacher/student 各补 1 条端到端主路径测试，冻结关键交互契约
