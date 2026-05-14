# UI Prototype Design Spec

## Goal

Produce a complete role-based UI prototype for the nursing education AI interactive video learning platform so the team can validate the product structure before implementation work is broken into PRD, issues, and prototype routes.

This spec replaces the earlier "9 screens in one linear sequence" framing. The new prototype is organized by role workflows built on shared domain objects.

## Why The Structure Changed

The earlier prototype order was effectively a teacher-only authoring journey:

1. Login
2. Teacher dashboard
3. Material upload and AI review
4. Teacher knowledge graph
5. Lesson builder
6. Lesson preview
7. Student course selection
8. Student knowledge graph
9. Student lesson player

That sequence was useful for exploring early screens, but it is not a stable information architecture for the full product because:

- teacher, student, and admin workflows have different goals, frequencies, and permissions
- shared domain objects such as `Course`, `Material`, `KnowledgeGraph`, and `Lesson` need to remain consistent across roles
- the admin role is not a small extension of the teacher flow and needs its own governance workspace

The new prototype therefore shifts from "one ordered set of screens" to "multiple role workspaces sharing one product model."

## Design Constraints

- Visual direction remains Modern Minimal with strong information hierarchy and calm educational tone.
- The prototype continues to use Next.js and Tailwind CSS as the delivery vehicle.
- Existing prototype pages can be reused as seeds, but they no longer define the global order.
- Domain language must match `CONTEXT.md`, especially `Course`, `Material`, `KnowledgePoint`, `KnowledgeGraph`, `Lesson`, `LessonNode`, `GroundedAssistant`, and `Material-Constrained Generation`.

## Product Model

The prototype is organized around one shared domain backbone:

- `Major` groups multiple `Course`
- `Course` owns `Material`, `KnowledgePoint`, `KnowledgeGraph`, and `Lesson`
- `Material` feeds AI extraction and review workflows
- `KnowledgeGraph` is the shared course map used for teacher authoring and student navigation
- `Lesson` packages selected `KnowledgePoint` into a learning experience
- `LessonNode` defines the ordered and branched structure of a `Lesson`

Each role interacts with this backbone differently:

- teachers produce and refine course content
- students consume published lessons and generate learning progress
- admins govern structure, access, and publication state

## Role Model

### Teacher Workflow

Teachers move through a preparation and iteration loop:

1. enter teacher workspace
2. select or create a `Course`
3. upload `Material`
4. review AI-suggested `KnowledgePoint`
5. maintain the `KnowledgeGraph`
6. compose a `Lesson` from selected knowledge points
7. preview and publish
8. inspect analytics and improve the next version

### Student Workflow

Students move through a guided learning loop:

1. enter student workspace
2. open assigned or enrolled `Course`
3. understand the course map through the `KnowledgeGraph`
4. enter a published `Lesson`
5. answer questions and follow branch outcomes
6. use `GroundedAssistant` during learning
7. review mistakes and track progress

### Admin Workflow

Admins move through a governance loop:

1. enter admin workspace
2. manage `Major` and `Course` structure
3. manage users, roles, and course ownership
4. monitor publication and exception states
5. inspect organization-level analytics

## Shared Pages, Role-Specific Pages, And Permission Boundaries

### Shared Pages

These pages belong to the shared product shell and are not teaching-flow specific:

- login
- role entry and role switching
- profile and notification settings
- help and terminology guidance
- course switcher

### Teacher-Specific Pages

- teacher home
- course workspace
- material upload and AI review
- editable teacher knowledge graph
- lesson builder
- lesson preview and publish
- course analytics

### Student-Specific Pages

- student home
- my courses
- student knowledge graph
- lesson player
- review and remediation
- progress

### Admin-Specific Pages

- admin home
- catalog management
- user and role management
- governance and audit
- organization analytics

### Permission Boundaries

- Teachers can manage `Material`, confirm `KnowledgePoint`, edit `KnowledgeGraph`, compose `Lesson`, and publish within courses they own or are assigned to.
- Students can only access published course content and their own learning progress. They never see draft assets, review states, or authoring controls.
- Admins can manage organization structure, role assignments, ownership, and publication governance, but they do not directly author teaching content inside lessons.
- Final approval of publishable AI-generated teaching content belongs to teachers, not students or admins.

## Information Architecture

The complete prototype is grouped into four layers.

### 1. Shared Entry Layer

- `/prototype/login`
- `/prototype/role-entry`
- `/prototype/profile`

Purpose:

- authenticate users
- expose role identity clearly
- provide global account and help surfaces

### 2. Teacher Workspace

- `/prototype/teacher/home`
- `/prototype/teacher/course`
- `/prototype/teacher/materials`
- `/prototype/teacher/knowledge-graph`
- `/prototype/teacher/lesson-builder`
- `/prototype/teacher/lesson-preview`
- `/prototype/teacher/analytics`

Purpose:

- support the full authoring lifecycle from `Material` ingestion to `Lesson` publication and iteration

### 3. Student Workspace

- `/prototype/student/home`
- `/prototype/student/course`
- `/prototype/student/knowledge-graph`
- `/prototype/student/lesson-player`
- `/prototype/student/review`
- `/prototype/student/progress`

Purpose:

- support the full learning lifecycle from course entry to completion, remediation, and progress reflection

### 4. Admin Workspace

- `/prototype/admin/home`
- `/prototype/admin/catalog`
- `/prototype/admin/users`
- `/prototype/admin/governance`
- `/prototype/admin/analytics`

Purpose:

- support the organization lifecycle of provisioning, governance, and reporting

## Screen Matrix

### Shared Entry Layer

#### `/prototype/login`

- Goal: authenticate and establish product identity
- Core decision: one unified login page, not separate login pages per role
- Inputs: account credentials
- Outputs: authenticated identity
- Next step: `role-entry` or direct return to last-used workspace

#### `/prototype/role-entry`

- Goal: route a user to the right workspace after authentication
- Core decision: make role switching explicit in the product model
- Inputs: available roles, recent workspace history
- Outputs: selected workspace
- Next step: `teacher/home`, `student/home`, or `admin/home`

#### `/prototype/profile`

- Goal: host shared settings and help content
- Core decision: keep notifications, terminology help, and preferences out of role workspaces
- Inputs: profile, preferences, notifications
- Outputs: updated user preferences
- Next step: return to current workspace context

### Teacher Workspace

#### `/prototype/teacher/home`

- Goal: show what needs teacher attention now
- Core decision: prioritize tasks, recent editing, and shortcuts over generic dashboard vanity metrics
- Inputs: course summary, pending review items, recent lessons
- Outputs: entry into `course`, `materials`, or `lesson-builder`

#### `/prototype/teacher/course`

- Goal: act as the anchor workspace for one `Course`
- Core decision: gather `Material`, `KnowledgeGraph`, and `Lesson` under one course context
- Inputs: course metadata, material count, lesson count, publish state
- Outputs: navigation into `materials`, `knowledge-graph`, or `lesson-builder`

#### `/prototype/teacher/materials`

- Goal: move from uploaded `Material` to reviewed AI suggestions
- Core decision: emphasize exception handling by surfacing low-confidence items instead of forcing equal review effort everywhere
- Inputs: uploaded files, AI extraction output, confidence state
- Outputs: confirmed `KnowledgePoint`
- Next step: `teacher/knowledge-graph`

#### `/prototype/teacher/knowledge-graph`

- Goal: maintain the course-level `KnowledgeGraph`
- Core decision: teacher graph must support editing relationships, confirming candidate knowledge points, and tracing source material
- Inputs: knowledge point candidates, relationship suggestions, source excerpts
- Outputs: validated `KnowledgeGraph`
- Next step: `teacher/lesson-builder`

#### `/prototype/teacher/lesson-builder`

- Goal: compose a publishable `Lesson`
- Core decision: make `LessonNode` sequencing and branch logic the central interaction, not asset management
- Inputs: selected `KnowledgePoint`, `QuizDraft`, `BranchDraft`
- Outputs: previewable lesson structure
- Next step: `teacher/lesson-preview`

#### `/prototype/teacher/lesson-preview`

- Goal: validate the learning experience before publish
- Core decision: preview must feel like a student flow with branch simulation, not a static page review
- Inputs: draft lesson, branch flow, publish checklist
- Outputs: publish action or return-to-edit action
- Next step: `teacher/analytics` after publish, or back to `lesson-builder`

#### `/prototype/teacher/analytics`

- Goal: help teachers improve learning design
- Core decision: show actionable teaching signals such as weak `KnowledgePoint`, drop-off nodes, and branch outcomes
- Inputs: aggregated `LearningEvent`
- Outputs: optimization targets for `knowledge-graph` or `lesson-builder`

### Student Workspace

#### `/prototype/student/home`

- Goal: reduce friction to resume learning
- Core decision: focus on continue-learning, due items, and review tasks rather than exploration-heavy dashboards
- Inputs: current progress, assigned lessons, teacher reminders
- Outputs: entry into `course`, `lesson-player`, or `review`

#### `/prototype/student/course`

- Goal: present the student's course list and entry points
- Core decision: this is a course access page, not a management interface
- Inputs: enrolled courses, progress state, next recommended lesson
- Outputs: entry into `knowledge-graph` or `lesson-player`

#### `/prototype/student/knowledge-graph`

- Goal: translate the course structure into a learner-friendly study map
- Core decision: student graph is read-only and progress-oriented, unlike the editable teacher graph
- Inputs: published `KnowledgeGraph`, personal node progress
- Outputs: recommended node or lesson entry
- Next step: `student/lesson-player`

#### `/prototype/student/lesson-player`

- Goal: host the core learning experience
- Core decision: this page is the immersive stage for video, branch questions, answer feedback, and `GroundedAssistant`
- Inputs: published lesson, current node, branch state
- Outputs: completion progress, question outcomes, assistant usage
- Next step: another node, remediation, or `student/review`

#### `/prototype/student/review`

- Goal: centralize remediation and weak-point recovery
- Core decision: remediation needs its own clear destination, not only inline branch handling
- Inputs: wrong answers, weak `KnowledgePoint`, suggested remediation
- Outputs: retry results and recovery progress
- Next step: return to `lesson-player` or move to `student/progress`

#### `/prototype/student/progress`

- Goal: show the student's learning state over time
- Core decision: highlight mastery, remaining work, and recovery opportunities instead of platform metrics
- Inputs: personal learning summaries
- Outputs: jump back into `review` or continue learning from the next recommendation

### Admin Workspace

#### `/prototype/admin/home`

- Goal: surface the state of the organization
- Core decision: prioritize anomalies, active courses, and governance tasks
- Inputs: organization-wide summaries
- Outputs: entry into `catalog`, `users`, or `governance`

#### `/prototype/admin/catalog`

- Goal: manage `Major` and `Course` structure
- Core decision: this page owns relationships and visibility, not content authoring
- Inputs: majors, courses, ownership, active state
- Outputs: updated catalog structure and course availability

#### `/prototype/admin/users`

- Goal: manage users and role assignment
- Core decision: role and course assignment should be managed in one place because they directly affect workspace access
- Inputs: user list, role state, course ownership
- Outputs: updated access and ownership assignments

#### `/prototype/admin/governance`

- Goal: manage publication exceptions and audit concerns
- Core decision: admins govern workflow state and policy compliance without replacing teacher authoring
- Inputs: pending publication states, exceptions, audit trails
- Outputs: approval, rejection, escalation, or ownership correction

#### `/prototype/admin/analytics`

- Goal: provide organization-level learning and operations visibility
- Core decision: show cross-course and cross-role outcomes instead of duplicating teacher analytics
- Inputs: organization-level aggregates
- Outputs: governance and resourcing signals

## Navigation Model

### Teacher Primary Flow

`teacher/home -> teacher/course -> teacher/materials -> teacher/knowledge-graph -> teacher/lesson-builder -> teacher/lesson-preview -> teacher/analytics`

### Student Primary Flow

`student/home -> student/course -> student/knowledge-graph -> student/lesson-player -> student/review -> student/progress`

### Admin Primary Flow

`admin/home -> admin/catalog -> admin/users -> admin/governance -> admin/analytics`

### Cross-Role Connections

- `login -> role-entry -> role home`
- teacher-published `Lesson` becomes visible in student workspaces
- admin governance changes affect visibility, ownership, and access, but not lesson authorship

## Shared Components And Variant Boundaries

### Shared Global Components

- top app shell
- notification entry
- course switcher
- user menu
- status badges
- stat cards
- empty states
- stepper patterns
- filter bars
- AI status and source citation patterns

### Shared Teacher And Student Components

- `Course` header
- `KnowledgePoint` status chips
- lesson summary cards
- source citation cards for `GroundedAssistant`

### Shared Teacher And Admin Components

- tabular management views
- review workflow cards
- detail drawers
- analytics summary cards

### Variant Boundaries

- the same `Course` can be shown across roles, but the action set changes by permission
- the same `KnowledgeGraph` visual language can be preserved while changing teacher behavior to editable and student behavior to read-only
- the same `Lesson` content source can be reused while changing teacher behavior to preview mode and student behavior to learning mode

## Prototype Delivery Strategy

The prototype should be presented in a role-structured narrative, not the legacy 9-screen sequence.

Recommended review order:

1. `login`
2. `role-entry`
3. teacher workspace screens
4. student workspace screens
5. admin workspace screens

Within implementation, the preferred build order is:

1. shared entry shell
2. teacher authoring flow
3. student learning flow
4. admin governance flow

This order keeps the product model coherent because student and admin views depend on the structure created in the teacher flow.

## Explicit Out Of Scope For This Spec

- final visual polish decisions for every screen
- production implementation details
- issue breakdown
- API design
- persistence schema design
- prototype variants for each individual screen

Those belong to the later `to-prd`, `to-issues`, and prototype execution stages.
