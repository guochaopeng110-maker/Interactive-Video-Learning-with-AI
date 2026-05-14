# Project Context

This file contains the core domain knowledge for the Interactive Video Learning with AI project.

一个面向护理教育的 AI 交互式视频学习平台。教师上传教材后，AI 辅助提取知识点、生成教学内容，教师在节点图编排器中构建分支交互式微课，学生在知识图谱引导下学习，课内 AI 助手基于教材语料库回答问题。

- **需求文档**: [PRD V2](.tmp_prd_v2.md)

## Language

### 学术组织

**Major**: 专业（如护理专业）。一个专业下包含多个课程。
_Avoid_: 学科、系别

**Course**: 课程（如基础护理课程）。一门课程有对应的教材和知识图谱。
_Avoid_: 科目、班级

### 内容资源

**Material**: 教师上传的教材、讲义、课程标准文档。经过分块处理后作为 AI 生成的约束源和 RAG 检索语料。
_Avoid_: 文档、文件、资源

**KnowledgePoint**: 知识点，构成课程知识图谱的最小单元。教师上传 Material 后由 AI 半自动提取（AI 建议 → 教师确认/增删）。归属 Course，可被多个 Lesson 引用。
_Avoid_: 概念点、学习单元

**KnowledgeGraph**: 课程级知识图谱，展示该课程下所有 KnowledgePoint 及其关联关系。学生入口和教师备课的基础视图。
_Avoid_: 知识地图、概念图

### 教学交付

**Lesson**: 微课/课堂。教师从课程知识图谱中选取知识点子集，编排成带分支逻辑的互动学习单元。
_Avoid_: 视频课、课件、单元

**LessonNode**: 课堂节点。Lesson 中引用 KnowledgePoint 的具体编排实例，包含顺序、题目、分支配置。
_Avoid_: 步骤、环节

**QuizDraft**: AI 生成的单选题目初稿，关联到某个 KnowledgePoint，需教师审核后才可发布。
_Avoid_: 测试题、考题

**BranchDraft**: AI 生成的分支情境初稿（A/B 选择），用于课堂中创建决策点。
_Avoid_: 场景、岔路

**ScriptDraft**: AI 生成的知识点讲解脚本初稿，作为视频素材的文字基础。
_Avoid_: 讲稿、文案

**VideoDraft**: AI 生成的视频素材初稿，对应一个 KnowledgePoint 的讲解内容。
_Avoid_: 视频片段、剪辑

### 学习交互

**BranchConfig**: 分支配置。定义学生在某个 LessonNode 回答后的走向：正确答案推进、错误答案进入补救分支后回主线。
_Avoid_: 跳转规则、路径

**RemediationBranch**: 补救分支。学生答错后进入的针对性讲解路径，结束后返回主线。
_Avoid_: 补救路径、纠正分支

**GroundedAssistant**: 课内 AI 助手。基于教材语料库的 RAG 问答，优先使用当前课程 Material 回答，超出范围时显式标注为扩展参考。
_Avoid_: 聊天机器人、客服

**Material-Constrained Generation**: 教材约束生成策略。所有 AI 内容生成必须以已上传 Material 为约束，不得凭空生成可发布内容。
_Avoid_: 限制生成、教材绑定

**LearningEvent**: 学生学习行为事件（进入节点、答题、完成等），由前端采集、后端聚合为分析指标。
_Avoid_: 埋点、日志

### 引擎模块

**Content Grounding Engine**: 统一管理 Material 摄入、分块、检索、引用映射的模块。
**Branch Progression Engine**: 管理分支状态转移、补救路由、恢复逻辑的确定性状态机。
**Learning Telemetry Engine**: 标准化学习事件采集和指标聚合。
**Authoring Orchestration Engine**: 协调生成-审核-编排-发布流程及其策略检查。

## Relationships

- 一个 **Major** 包含多个 **Course**
- 一个 **Course** 拥有多份 **Material**、多个 **KnowledgePoint**、多个 **Lesson**
- 一份 **Material** 分块后可提取多个 **KnowledgePoint**
- 一个 **Lesson** 包含多个 **LessonNode**，每个 **LessonNode** 引用一个 **KnowledgePoint**
- 一个 **LessonNode** 可配置多个 **BranchConfig**（正确/错误路由）
- **ScriptDraft**、**QuizDraft**、**VideoDraft**、**BranchDraft** 均关联到 **KnowledgePoint**，需教师审核
- **LearningEvent** 由 **LearningTelemetryEngine** 采集并聚合

## Example dialogue

> **Dev**: "教师上传了一本《基础护理》教材，系统会自动做什么？"
> **Domain expert**: "Content Grounding Engine 会分块存储。然后 AI 半自动提取候选 KnowledgePoint，在知识图谱里展示给教师。教师确认、修改后，就可以在 Lesson 编排器中选取知识点来备课了。"
> **Dev**: "学生答错题目后会怎样？"
> **Domain expert**: "Branch Progression Engine 检查对应的 BranchConfig，路由到 RemediationBranch。学生看完补救讲解后自动回到主线的下一个 LessonNode。"
> **Dev**: "课内 AI 助手和学生随便用的 ChatGPT 有什么区别？"
> **Domain expert**: "GroundedAssistant 是 Material-Constrained 的——它优先检索当前课程教材，回答必须带来源引用。超出教材范围的内容会明确标注为'扩展参考'，不会让学生误以为这是老师要求的答案。"

## Flagged ambiguities

- "课程" 在中文中可能同时指 Course（教学大纲级别）和 Lesson（单次课堂）—— 已区分：Course = 课程大纲，Lesson = 微课/课堂
