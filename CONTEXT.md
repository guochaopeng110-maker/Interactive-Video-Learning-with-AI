# Project Context

This file contains the core domain knowledge for the Interactive Video Learning with AI project.

一个面向教育场景的 AI 交互式视频学习平台。教师上传教材后，AI 辅助提取知识点、生成教学内容，教师在节点图编排器中构建分支交互式微课；学生围绕 Course 进入学习流，KnowledgeGraph 是理解课程结构与导航的重要入口之一，课程边界 AI 助手基于教材语料库提供带引用的约束问答。当前文档以护理专业作为示例，但产品边界不限定于护理教育。

- **需求文档**: [PRD V2](.tmp_prd_v2.md)

## Language

### 学术组织

**Major**: 专业（如护理专业），是学校教育场景中用于组织 Course 归属与治理范围的目录层级。
_Avoid_: 学科、系别、教学交互对象

**Course**: 课程（如基础护理课程），是承载 Material、KnowledgeGraph、Lesson 与角色动作边界的课程语义边界，不默认绑定具体开课周期。
_Avoid_: 科目、班级、目录项、单次开课实例

### 参与角色

**Teacher**: 在被分配的 Course 中负责确认 KnowledgePointCandidate、生成与审核教学产物、编排、预览与发布的教学角色。
_Avoid_: 管理员、内容运营

**Student**: 在已选或被分配的 Course 中学习已确认、已发布的课程内容并产生 LearningEvent 的学习角色。
_Avoid_: 访客、作者、候选内容查看者

**Admin**: 负责 Major / Course 结构、角色分配、可见性与发布治理，查看治理状态与异常信号，但不直接确认内容候选项、审核教学产物、编排或发布 Lesson 的治理角色。
_Avoid_: 超级教师、内容作者、内容审核者

### 内容资源

**Material**: 归属于单个 Course 的教材、讲义、课程标准文档，经过分块处理后作为 AI 生成的约束源和 RAG 检索语料。
_Avoid_: 跨课共享资源、文档、文件、资源

**KnowledgePointCandidate**: AI 基于 Material 提取、等待教师确认的候选知识点，尚未进入正式课程语义模型。
_Avoid_: 临时 KnowledgePoint、草稿知识点

**KnowledgePoint**: 经教师确认后进入课程知识图谱的正式知识点，是 Lesson 可引用的最小语义单元。
_Avoid_: 概念点、学习单元

**KnowledgeGraph**: 课程级知识图谱，是一个共享的 Course 领域对象，只承载该课程下已确认 KnowledgePoint 及其关联关系，并按角色呈现不同视图。
_Avoid_: 教师图谱、学生图谱、知识地图、概念图

### 教学交付

**Lesson**: 微课/课堂，是一个可从草稿、预览演进到已发布状态的互动学习单元。
_Avoid_: 发布副本、预览副本、视频课、课件、单元

**LessonNode**: 课堂节点，是 Lesson 中对单个 KnowledgePoint 的具体编排实例，包含顺序、题目与分支配置。
_Avoid_: 多知识点混合节点、步骤、环节

**QuizDraft**: AI 生成的题目初稿，是围绕 KnowledgePoint 的候选教学产物之一，需教师审核后方可用于 Lesson。
_Avoid_: 必备题库、测试题、考题

**BranchDraft**: AI 生成、等待教师审核的分支情境建议，是围绕 KnowledgePoint 的候选教学产物之一，也是形成课堂决策点的候选输入。
_Avoid_: BranchConfig、必备分支、运行规则、场景、岔路

**ScriptDraft**: AI 生成的知识点讲解脚本初稿，是围绕 KnowledgePoint 的候选教学产物之一。
_Avoid_: 讲稿、文案

**VideoDraft**: AI 生成的视频素材初稿，是围绕 KnowledgePoint 的可选教学产物，而非 Lesson 的必备前提。
_Avoid_: 必备视频片段、固定剪辑

### 学习交互

**BranchConfig**: 挂载在 LessonNode 上的正式分支运行规则，定义学生回答后的路由与主线恢复方式。
_Avoid_: BranchDraft、跳转规则、路径

**RemediationBranch**: 某个 Lesson 内由 BranchConfig 触发的补救路径，服务于学生纠错后返回主线。
_Avoid_: 独立资产、跨课复用分支、补救路径、纠正分支

**GroundedAssistant**: 以 Course 为知识边界、为 Teacher 与 Student 提供教材约束问答的共享 AI 助手，回答默认带来源引用，超出课程语料时必须显式标注为扩展参考，并在 Lesson 内优先结合当前学习上下文。
_Avoid_: 全局聊天机器人、仅学生助手、仅教师助手、Lesson 私有助手、客服

**Material-Constrained Generation**: 教材约束生成策略。所有 AI 内容生成必须以已上传 Material 为约束，不得凭空生成可发布内容。
_Avoid_: 限制生成、教材绑定

**LearningEvent**: 只记录学生学习行为的事件（进入节点、答题、完成、求助助手等），由前端采集、后端聚合为分析指标。
_Avoid_: 教师操作事件、治理事件、埋点、日志

### 引擎模块

**Content Grounding Engine**: 统一管理 Material 摄入、分块、检索、引用映射的模块。
**Branch Progression Engine**: 管理分支状态转移、补救路由、恢复逻辑的确定性状态机。
**Learning Telemetry Engine**: 标准化学习事件采集和指标聚合。
**Authoring Orchestration Engine**: 协调生成-审核-编排-发布流程及其策略检查。

## Relationships

- 一个 **Major** 包含多个 **Course**
- 一个 **Course** 拥有多份 **Material**、多个 **KnowledgePoint**、多个 **Lesson**
- 一个 **Course** 拥有且只拥有一个共享的 **KnowledgeGraph**
- 一个 **Course** 是 **Teacher** 作者流、**Student** 学习流与 **Admin** 治理流共享的核心边界
- 一个 **Teacher** 可被分配到多个 **Course**，并只在这些 **Course** 内执行作者动作
- 一个 **Student** 可参与多个 **Course**，但只访问已发布的 **Lesson** 与个人学习进度
- 一个 **Student** 不访问 **KnowledgePointCandidate**、未发布 **Lesson** 或未发布的 **KnowledgeGraph** 变化
- 一个 **Admin** 可治理多个 **Major** 与 **Course**，但不直接确认 **KnowledgePointCandidate**、审核 **Draft**、编辑或发布 **Lesson** 内容
- 一份 **Material** 归属于且只归属于一个 **Course**
- 一份 **Material** 分块后可提取多个 **KnowledgePointCandidate**
- 一个 **KnowledgePointCandidate** 经教师确认后可转化为一个 **KnowledgePoint**
- 一个 **KnowledgePoint** 确认后才可进入 **KnowledgeGraph**
- **KnowledgePointCandidate** 不属于 **KnowledgeGraph** 的正式组成部分
- **Teacher** 可编辑 **KnowledgeGraph**；**Student** 只读取已发布视图；**Admin** 只读取治理视图
- 一个 **Teacher** 可创建并编排多个 **Lesson**，发布是 **Lesson** 的生命周期状态变化，而不是新对象
- 一个 **Lesson** 包含多个 **LessonNode**，每个 **LessonNode** 引用一个 **KnowledgePoint**
- 一个 **Student** 只可访问已发布状态的 **Lesson**
- 一个 **LessonNode** 只引用一个 **KnowledgePoint**
- 一个 **LessonNode** 可配置多个 **BranchConfig**（正确/错误路由）
- 一个 **BranchDraft** 经教师审核后可转化为一个或多个 **BranchConfig**
- 一个 **RemediationBranch** 从属于一个 **Lesson**，并由某个 **BranchConfig** 触发
- 一个 **GroundedAssistant** 服务于一个 **Course**，可被 **Teacher** 用于作者流、被 **Student** 用于学习流，并在 Lesson 内优先参考当前学习上下文
- **Teacher** 与 **Student** 使用的是同一个 **GroundedAssistant** 领域对象，而不是两套不同助手
- **ScriptDraft**、**QuizDraft**、**VideoDraft**、**BranchDraft** 均关联到 **KnowledgePoint**，需教师审核
- 并非每个 **KnowledgePoint** 都必须同时拥有 **ScriptDraft**、**QuizDraft**、**VideoDraft** 与 **BranchDraft**
- **VideoDraft** 可用于支撑某些 **LessonNode** 的表达形式，但 **LessonNode** 的核心引用对象仍是 **KnowledgePoint**
- **LearningEvent** 由 **LearningTelemetryEngine** 采集并聚合

## Example dialogue

> **Dev**: "教师上传了一本《基础护理》教材，系统会自动做什么？"
> **Domain expert**: "Content Grounding Engine 会分块存储。然后 AI 半自动提取候选 KnowledgePointCandidate 交给教师确认；只有确认后的 KnowledgePoint 才会进入 KnowledgeGraph，并可被 Lesson 引用。"
> **Dev**: "Major 会直接参与 Lesson 编排或学生学习吗？"
> **Domain expert**: "不会。Major 只定义课程归属和治理范围；真正承载教学内容与学习流的是 Course。"
> **Dev**: "既然产品不只限于护理教育，为什么还保留 Major？"
> **Domain expert**: "因为当前产品仍然面向学校教育场景。在这个场景里，专业下面有课程，Major 是稳定存在的组织层级，不是护理案例专属词。"
> **Dev**: "既然产品面向教育场景，为什么角色不改成更通用的 Author / Learner？"
> **Domain expert**: "因为当前产品模型仍然落在学校教育。Teacher、Student、Admin 比抽象角色名更准确，也更能守住作者流、学习流和治理流的边界。"
> **Dev**: "Course 是不是默认就等于某个学期的一次开课？"
> **Domain expert**: "当前不这么定义。Course 先表示课程语义本身；如果以后需要表达具体开课周期，应当是另一个单独对象。"
> **Dev**: "Course 只是管理员目录里的一个条目吗？"
> **Domain expert**: "不是。Course 是教师编排、学生学习和管理员治理共同围绕的核心教学边界，不只是目录项。"
> **Dev**: "同一份 Material 能不能直接给多个 Course 共用？"
> **Domain expert**: "当前不这么定义。Material 归属于单个 Course，这样 KnowledgePoint、KnowledgeGraph 和 GroundedAssistant 的边界才保持一致。"
> **Dev**: "Teacher 说的'审核'主要是在审什么？"
> **Domain expert**: "最先要审核的是 KnowledgePointCandidate；教师确认后，它才会成为正式 KnowledgePoint。其他 Draft 产物也在这个作者职责里被审核。"
> **Dev**: "学生答错题目后会怎样？"
> **Domain expert**: "Branch Progression Engine 检查对应的 BranchConfig，路由到 RemediationBranch。学生看完补救讲解后自动回到主线的下一个 LessonNode。"
> **Dev**: "课内 AI 助手和学生随便用的 ChatGPT 有什么区别？"
> **Domain expert**: "GroundedAssistant 是 Material-Constrained 的——它优先检索当前课程教材，回答必须带来源引用。超出教材范围的内容会明确标注为'扩展参考'，不会让学生误以为这是老师要求的答案。"
> **Dev**: "管理员能不能为了修复问题，直接进去改 LessonNode？"
> **Domain expert**: "不能。Admin 负责课程结构、权限和发布治理；Lesson 的内容编排仍然属于 Teacher 的职责边界。"
> **Dev**: "Admin 能不能直接审核候选知识点或题目草稿？"
> **Domain expert**: "当前不这么定义。Admin 只看治理状态与异常信号；KnowledgePointCandidate 和各类 Draft 的内容确认仍属于 Teacher。"
> **Dev**: "Student 能看到候选知识点或还没发布的 Lesson 变化吗？"
> **Domain expert**: "不能。Student 只接触已确认、已发布的课程语义对象，不进入教师作者流中的候选态和未发布态。"
> **Dev**: "教师知识图谱和学生知识图谱是不是两套数据？"
> **Domain expert**: "不是。KnowledgeGraph 只有一个；差别在于 Teacher 看到的是可编辑视图，Student 看到的是已发布的只读视图。"
> **Dev**: "AI 刚提出来、还没审核的点，能直接拿去编 Lesson 吗？"
> **Domain expert**: "不能。那时它还只是 KnowledgePointCandidate；只有教师确认后成为 KnowledgePoint，才能进入 KnowledgeGraph 并被 Lesson 引用。"
> **Dev**: "候选知识点算不算已经在 KnowledgeGraph 里了？"
> **Domain expert**: "不算。KnowledgeGraph 只承载已确认的 KnowledgePoint；候选点只是教师确认流程中的待处理输入。"
> **Dev**: "预览中的 Lesson 和学生看到的已发布 Lesson 是两个对象吗？"
> **Domain expert**: "不是。它们是同一个 Lesson 的不同生命周期状态；Student 只能访问已发布状态。"
> **Dev**: "那 Published Lesson 需要单独作为一个术语吗？"
> **Domain expert**: "不需要。'已发布'只是 Lesson 的生命周期状态，不是新的领域对象。"
> **Dev**: "BranchDraft 和 BranchConfig 只是不同叫法吗？"
> **Domain expert**: "不是。BranchDraft 是 AI 给教师的分支建议；BranchConfig 是教师确认后真正驱动 LessonNode 路由的运行规则。"
> **Dev**: "RemediationBranch 能不能抽出来给多个 Lesson 复用？"
> **Domain expert**: "当前不这么定义。RemediationBranch 属于单个 Lesson 的补救路径，围绕该 Lesson 的主线与分支节奏设计。"
> **Dev**: "GroundedAssistant 是跟着 Lesson 走，还是跟着 Course 走？"
> **Domain expert**: "它的知识边界跟着 Course 走，但学生在 Lesson 中提问时，回答会优先结合当前 Lesson 的节点和教材上下文。"
> **Dev**: "GroundedAssistant 只有学生能用吗？"
> **Domain expert**: "不是。Teacher 在备课、确认知识点和编排 Lesson 时也需要同一套教材约束助手；Student 则在学习过程中使用它。"
> **Dev**: "那教师助手和学生助手是两个不同对象吗？"
> **Domain expert**: "不是。它们是同一个 GroundedAssistant 在不同角色场景中的使用方式，知识边界和引用规则保持一致。"
> **Dev**: "Lesson 的发布到底算教师动作还是管理员动作？"
> **Domain expert**: "发布是 Teacher 对教学内容做出的作者决策；Admin 只负责治理规则、可见性控制和异常干预，不替代教师发布 Lesson。"
> **Dev**: "每个 KnowledgePoint 都必须先生成 VideoDraft，才能进入 Lesson 吗？"
> **Domain expert**: "不是。VideoDraft 只是可选教学产物；LessonNode 的核心是引用 KnowledgePoint，而不是强制绑定视频。"
> **Dev**: "教师确认知识点、发布 Lesson，也算 LearningEvent 吗？"
> **Domain expert**: "不算。LearningEvent 只描述 Student 的学习行为；教师作者动作和管理员治理动作不属于这个概念。"
> **Dev**: "一个 KnowledgePoint 是不是默认就要出脚本、题目、分支和视频四件套？"
> **Domain expert**: "不是。这些 Draft 都是可选候选产物；是否生成、生成哪些，取决于具体 Lesson 的教学设计。"
> **Dev**: "一个 LessonNode 能不能同时讲两个 KnowledgePoint？"
> **Domain expert**: "当前不这么定义。一个 LessonNode 只承载一个 KnowledgePoint，这样学习反馈、补救路径和分析归因才清晰。"

## Flagged ambiguities

- "课程" 在中文中可能同时指 Course（教学大纲级别）和 Lesson（单次课堂）—— 已区分：Course = 课程大纲，Lesson = 微课/课堂
- "护理教育" 不是产品边界本身—— 已区分：产品面向更广义的教育场景，护理专业只是当前示例领域
- 护理相关表述是示例语境，不是 glossary 的范围约束—— 已区分：术语定义保持教育场景通用，护理仅用于示例说明
- "Major" 不是教学交互核心对象—— 已区分：**Major** 是学校教育场景中的组织归属与治理分组，**Course** 承载实际教学与学习边界
- "Teacher / Student / Admin" 不需要立即抽象成通用平台角色—— 已区分：当前产品模型仍以学校教育为主，保留学校语境角色名更准确
- "Course" 不是纯目录节点—— 已区分：它是承载内容、学习与治理动作的核心教学边界
- "Course" 不默认等于单次开课周期—— 已区分：**Course** 表示课程语义边界，具体学期或开课实例应另行建模
- "Material" 不默认跨课共享—— 已区分：**Material** 先归属于单个 **Course**，与图谱和助手边界保持一致
- "知识图谱引导学习" 不等于“知识图谱是唯一入口”—— 已区分：**KnowledgeGraph** 是重要入口之一，但不是学生学习流的唯一入口
- "课内 AI 助手" 说法过窄—— 已区分：**GroundedAssistant** 是 **Course** 边界内的共享助手，不只存在于学生 Lesson 内
- "管理员" 不是“权限更大的教师”—— 已区分：**Admin** 负责治理，**Teacher** 负责教学内容编排
- "Admin" 不是内容审核者—— 已区分：**Admin** 只看治理状态与异常信号，内容候选项与教学产物审核属于 **Teacher**
- "Student" 不进入半成品状态—— 已区分：**Student** 只接触已确认、已发布的课程语义对象
- "知识图谱" 不是按角色拆成两个对象—— 已区分：**KnowledgeGraph** 是共享对象，只在视图和权限上区分 Teacher / Student / Admin
- "知识点" 不能同时指候选态和正式态—— 已区分：待确认对象为 **KnowledgePointCandidate**，正式对象为 **KnowledgePoint**
- "候选知识点" 不是图谱正式成员—— 已区分：**KnowledgeGraph** 只包含已确认的 **KnowledgePoint**
- "Lesson 草稿 / 预览 / 发布" 不是三个对象—— 已区分：它们是同一个 **Lesson** 的不同生命周期状态
- "Published Lesson" 不是新术语对象—— 已区分：它只是 **Lesson** 的已发布状态
- "分支草稿" 不能和运行时分支规则混用—— 已区分：**BranchDraft** 是审核前建议，**BranchConfig** 是审核后正式规则
- "补救分支" 不是独立内容资产—— 已区分：**RemediationBranch** 从属于单个 **Lesson**，不按共享资产建模
- "课内助手" 不是全局聊天、单课私有对象或按角色拆成两个助手—— 已区分：**GroundedAssistant** 是同一 **Course** 下 **Teacher** 与 **Student** 共享的对象，默认带来源引用，并在超出语料时标注扩展参考
- "发布治理" 不等于“代替教师发布”—— 已区分：**Teacher** 负责发布 **Lesson**，**Admin** 负责治理与异常干预
- "互动微课" 不是“每个知识点都必须先出视频”—— 已区分：**VideoDraft** 是可选产物，**LessonNode** 核心引用 **KnowledgePoint**
- "学习事件" 不能混入作者或治理操作—— 已区分：**LearningEvent** 只记录 **Student** 的学习行为
- "Draft 集合" 不是默认四件套—— 已区分：**QuizDraft**、**ScriptDraft**、**BranchDraft**、**VideoDraft** 都是围绕 **KnowledgePoint** 的可选候选产物
- "LessonNode" 不是多知识点容器—— 已区分：一个 **LessonNode** 只引用一个 **KnowledgePoint**
