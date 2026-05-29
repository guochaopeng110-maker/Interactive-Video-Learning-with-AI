# Teacher Master Slice A Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the first implementation-ready high-fidelity teacher flow for `Course Workspace -> Material Confirmation`, replacing the legacy placeholder screens with a new contract-driven teacher authoring slice.

**Architecture:** Implement a new teacher-only route group outside the legacy `/prototype/*` namespace and introduce a thin shared contract layer for tokens, teacher shell, and screen primitives that the teacher slice can depend on. Preserve selected legacy prototype files as reference-only inputs for route intent, screen inventory, and flow mapping, but do not refine or extend those static pages in place.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS 4, ESLint

---

## Scope and legacy disposition

This plan covers only the first teacher master slice defined by the approved high-fidelity realignment work:

- `Course Workspace`
- `Material`
- the handoff from confirmed `KnowledgePointCandidate` state toward graph-ready input

This plan does **not** implement:

- `KnowledgeGraph`
- `Lesson Builder`
- `Preview`
- shared entry rollout
- student or admin rollout
- root route switching away from `/prototype/login`

Legacy prototype handling for this plan:

- **Keep as reference only:**
  - `src/app/prototype/teacher/course/page.tsx`
  - `src/app/prototype/teacher/materials/page.tsx`
  - `src/app/prototype/components/PrototypeAppShell.tsx`
  - `src/app/prototype/components/PrototypeBlocks.tsx`
  - `src/app/prototype/components/prototype-nav.ts`
  - `src/app/prototype/components/prototype-data.ts`
- **Do not extend in place:**
  - `src/app/prototype/teacher/course/page.tsx`
  - `src/app/prototype/teacher/materials/page.tsx`
- **Add new implementation instead:**
  - new teacher shell, tokens, primitives, fixtures, and routes under a new non-legacy namespace
- **Leave untouched for now:**
  - `src/app/page.tsx`
  - `src/app/prototype/*` redirects and non-teacher legacy screens

Recommended new route targets for this slice:

- `src/app/teacher/course/page.tsx`
- `src/app/teacher/materials/page.tsx`

These route paths are an implementation assumption for this plan so the first teacher slice can ship outside `/prototype/*`. If a later shared entry or route-contract decision changes the final public URL shape, the screen contract and module boundaries in this plan still stand.

## File structure

### New files to create

- `src/app/teacher/layout.tsx`
  - Teacher-only high-fidelity shell wrapper for the new slice.
- `src/app/teacher/course/page.tsx`
  - New implementation-ready `Course Workspace` screen.
- `src/app/teacher/materials/page.tsx`
  - New implementation-ready `Material Confirmation` screen.
- `src/components/teacher-shell/TeacherAppShell.tsx`
  - Teacher shell with page header, course context, nav, and stable teacher boundary framing.
- `src/components/teacher-shell/teacher-nav.ts`
  - Navigation metadata for the new teacher slice.
- `src/components/teacher-course/CourseWorkspaceScreen.tsx`
  - Screen-level composition for the teacher course workspace.
- `src/components/teacher-course/AttentionQueue.tsx`
  - Actionable course attention list.
- `src/components/teacher-course/StageOverview.tsx`
  - Stage summary cards with disabled reasons.
- `src/components/teacher-materials/MaterialReviewScreen.tsx`
  - Screen-level composition for teacher material confirmation.
- `src/components/teacher-materials/ReviewQueue.tsx`
  - Candidate review queue with confidence and status.
- `src/components/teacher-materials/CandidateDetailPanel.tsx`
  - Candidate details and confirmation actions.
- `src/components/teacher-materials/SourceEvidencePanel.tsx`
  - Source evidence and citation region.
- `src/components/ui-contract/AppSurface.tsx`
  - Shared section/surface primitive for the new contract layer.
- `src/components/ui-contract/StatusBadge.tsx`
  - Semantic status badge primitive.
- `src/components/ui-contract/StateBlock.tsx`
  - Shared loading/empty/error/success block.
- `src/components/ui-contract/ActionCard.tsx`
  - Shared action card primitive.
- `src/lib/teacher-fixtures/course-workspace.ts`
  - Mock data for the teacher course workspace.
- `src/lib/teacher-fixtures/material-review.ts`
  - Mock data for the teacher material review flow.
- `src/lib/teacher-view-models/course-workspace.ts`
  - Mapping helpers from fixture shape to UI-friendly display state.
- `src/lib/teacher-view-models/material-review.ts`
  - Mapping helpers for candidate queue, detail, evidence, and action states.
- `src/lib/ui-contract/tokens.ts`
  - Typed semantic token constants used by the new slice.

### Existing files to modify

- `src/app/globals.css`
  - Add the first semantic token layer for the new high-fidelity contract without deleting legacy styling.
- `src/app/layout.tsx`
  - Update metadata only if needed to better reflect the non-prototype teacher slice entry during implementation.

### Existing files to reference only

- `src/app/prototype/teacher/course/page.tsx`
- `src/app/prototype/teacher/materials/page.tsx`
- `src/app/prototype/components/PrototypeAppShell.tsx`
- `src/app/prototype/components/PrototypeBlocks.tsx`
- `src/app/prototype/components/prototype-data.ts`
- `docs/superpowers/specs/2026-05-15-high-fidelity-prototype-realignment.md`
- `CONTEXT.md`

### Validation commands for this repository

- `npm run lint`
- `npm run build`

Because the repository currently has no established test runner beyond lint/build, this plan uses route-level implementation checks and introduces no new test framework.

---

### Task 1: Establish the teacher slice route boundary

**Files:**
- Create: `src/app/teacher/layout.tsx`
- Create: `src/app/teacher/course/page.tsx`
- Create: `src/app/teacher/materials/page.tsx`
- Create: `src/components/teacher-shell/TeacherAppShell.tsx`
- Create: `src/components/teacher-shell/teacher-nav.ts`
- Reference: `src/app/prototype/teacher/layout.tsx`
- Reference: `src/app/prototype/components/PrototypeAppShell.tsx`

- [ ] **Step 1: Create the new teacher nav metadata**

Add the new teacher route inventory outside `/prototype/*`.

```ts
export const teacherNav = [
  { label: 'Course Workspace', href: '/teacher/course' },
  { label: 'Material', href: '/teacher/materials' },
  { label: 'KnowledgeGraph', href: '/teacher/knowledge-graph', disabled: true, reason: 'Planned for Teacher Master Slice B' },
  { label: 'Lesson Builder', href: '/teacher/lesson-builder', disabled: true, reason: 'Planned for Teacher Master Slice C' },
  { label: 'Preview', href: '/teacher/preview', disabled: true, reason: 'Planned for Teacher Master Slice D' },
] as const;
```

- [ ] **Step 2: Build the new teacher shell component**

Create a shell that carries teacher identity, stable `Course` context framing, and teacher-only boundary messaging without reusing the legacy prototype shell directly.

```tsx
import type { ReactNode } from 'react';
import Link from 'next/link';
import { teacherNav } from './teacher-nav';

export default function TeacherAppShell({
  title,
  subtitle,
  courseName,
  children,
}: {
  title: string;
  subtitle: string;
  courseName: string;
  children: ReactNode;
}) {
  return <div>{children}</div>;
}
```

- [ ] **Step 3: Add the new route-group layout**

Wrap new teacher routes with the new shell instead of any legacy prototype layout.

```tsx
import type { ReactNode } from 'react';

export default function TeacherLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
```

- [ ] **Step 4: Add placeholder route entry files**

Create thin route files that render dedicated screen components rather than embedding full page markup inline.

```tsx
import CourseWorkspaceScreen from '@/components/teacher-course/CourseWorkspaceScreen';

export default function TeacherCoursePage() {
  return <CourseWorkspaceScreen />;
}
```

- [ ] **Step 5: Verify the new route structure builds conceptually**

Run: `npm run lint`

Expected: lint runs and reports only real code issues, with no missing-import or unresolved-path errors for the new route boundary.

- [ ] **Step 6: Commit**

```bash
git add src/app/teacher/layout.tsx src/app/teacher/course/page.tsx src/app/teacher/materials/page.tsx src/components/teacher-shell/TeacherAppShell.tsx src/components/teacher-shell/teacher-nav.ts
git commit -m "feat: scaffold teacher master slice route boundary"
```

### Task 2: Introduce the minimum contract-layer tokens and primitives

**Files:**
- Create: `src/components/ui-contract/AppSurface.tsx`
- Create: `src/components/ui-contract/StatusBadge.tsx`
- Create: `src/components/ui-contract/StateBlock.tsx`
- Create: `src/components/ui-contract/ActionCard.tsx`
- Create: `src/lib/ui-contract/tokens.ts`
- Modify: `src/app/globals.css`
- Reference: `src/app/prototype/components/PrototypeBlocks.tsx`
- Reference: `docs/superpowers/specs/2026-05-15-high-fidelity-prototype-realignment.md`

- [ ] **Step 1: Define semantic token constants in TypeScript**

Create a small typed token map that mirrors the approved teacher-slice needs.

```ts
export const uiTokens = {
  color: {
    bgBase: 'var(--bg-base)',
    surfaceDefault: 'var(--surface-default)',
    surfaceElevated: 'var(--surface-elevated)',
    textPrimary: 'var(--text-primary)',
    textSecondary: 'var(--text-secondary)',
    borderDefault: 'var(--border-default)',
    statusSuccess: 'var(--status-success)',
    statusWarning: 'var(--status-warning)',
    statusError: 'var(--status-error)',
    roleTeacher: 'var(--role-teacher)',
  },
} as const;
```

- [ ] **Step 2: Add semantic CSS variables for the new slice**

Extend `src/app/globals.css` with non-breaking variables for the new contract layer.

```css
:root {
  --bg-base: #f3f5f7;
  --bg-subtle: #eef2f4;
  --surface-default: #ffffff;
  --surface-elevated: #fbfdff;
  --text-primary: #102033;
  --text-secondary: #425466;
  --text-muted: #6b7a8c;
  --border-default: #d7dee7;
  --border-strong: #9fb0c3;
  --status-success: #1f7a4d;
  --status-warning: #a86718;
  --status-error: #b53a36;
  --role-teacher: #275ea3;
}
```

- [ ] **Step 3: Create the shared section surface primitive**

Build a reusable layout surface instead of reusing the legacy `Surface` component directly.

```tsx
import type { ReactNode } from 'react';

export default function AppSurface({ title, description, children }: {
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return <section>{children}</section>;
}
```

- [ ] **Step 4: Create semantic badge, state, and action primitives**

Implement primitives for status, state feedback, and action cards.

```tsx
export function StatusBadge({ label, tone }: { label: string; tone: 'info' | 'warning' | 'success' | 'error' }) {
  return <span>{label}</span>;
}
```

- [ ] **Step 5: Verify primitives compile cleanly**

Run: `npm run lint`

Expected: new contract primitives are importable with no lint errors caused by unused exports or malformed props.

- [ ] **Step 6: Commit**

```bash
git add src/components/ui-contract/AppSurface.tsx src/components/ui-contract/StatusBadge.tsx src/components/ui-contract/StateBlock.tsx src/components/ui-contract/ActionCard.tsx src/lib/ui-contract/tokens.ts src/app/globals.css
git commit -m "feat: add teacher slice contract primitives"
```

### Task 3: Add course workspace fixtures and view-model mapping

**Files:**
- Create: `src/lib/teacher-fixtures/course-workspace.ts`
- Create: `src/lib/teacher-view-models/course-workspace.ts`
- Reference: `src/app/prototype/components/prototype-data.ts`
- Reference: `CONTEXT.md`

- [ ] **Step 1: Create raw course workspace fixture data**

Model fixture data around `Course`, `Material`, `KnowledgePointCandidate`, and `Lesson` readiness instead of legacy summary cards.

```ts
export const teacherCourseWorkspaceFixture = {
  course: {
    id: 'course-basic-nursing',
    name: 'Basic Nursing',
    majorName: 'Nursing',
    termLabel: '2026 Spring',
  },
  materialSummary: {
    uploadedCount: 12,
    pendingReviewCount: 10,
    blockedCandidateCount: 3,
  },
} as const;
```

- [ ] **Step 2: Create view-model helpers for stage cards and attention items**

Map fixture data to a format that screen components can render consistently.

```ts
export function buildCourseStageCards(fixture: typeof teacherCourseWorkspaceFixture) {
  return [];
}

export function buildAttentionQueueItems(fixture: typeof teacherCourseWorkspaceFixture) {
  return [];
}
```

- [ ] **Step 3: Ensure disabled reasons are first-class**

Represent blocked downstream actions explicitly in the view model.

```ts
{
  label: 'Lesson Builder',
  enabled: false,
  disabledReason: 'Confirm more KnowledgePointCandidate items before lesson authoring can begin.',
}
```

- [ ] **Step 4: Keep legacy data reference-only**

Do not import `prototype-data.ts` into the new implementation. Re-express only the needed business story in the new fixture file.

```text
Allowed: copy semantic intent.
Not allowed: direct runtime reuse of prototype-data exports in new routes.
```

- [ ] **Step 5: Verify fixture and view-model files are lint-clean**

Run: `npm run lint`

Expected: fixture and mapping files compile cleanly and are free from unused imports or implicit any issues.

- [ ] **Step 6: Commit**

```bash
git add src/lib/teacher-fixtures/course-workspace.ts src/lib/teacher-view-models/course-workspace.ts
git commit -m "feat: model teacher course workspace fixture state"
```

### Task 4: Implement the high-fidelity course workspace screen

**Files:**
- Create: `src/components/teacher-course/CourseWorkspaceScreen.tsx`
- Create: `src/components/teacher-course/AttentionQueue.tsx`
- Create: `src/components/teacher-course/StageOverview.tsx`
- Modify: `src/app/teacher/course/page.tsx`
- Reference: `src/app/prototype/teacher/course/page.tsx`
- Reference: `docs/superpowers/specs/2026-05-15-high-fidelity-prototype-realignment.md`
- Reference: `gh issue #28`

- [ ] **Step 1: Build the screen shell around explicit contract regions**

Implement the required regions for `Course Workspace`.

```tsx
export default function CourseWorkspaceScreen() {
  return (
    <div className="space-y-6">
      <section>{/* Course Header */}</section>
      <section>{/* Progress Overview */}</section>
      <section>{/* Attention Queue */}</section>
      <section>{/* Primary Actions */}</section>
    </div>
  );
}
```

- [ ] **Step 2: Render stage overview with visible disabled reasons**

Add action cards for `Material`, `KnowledgeGraph`, `Lesson Builder`, and `Preview` where blocked states are explicit.

```tsx
<StageOverview
  items={[
    { label: 'Material', enabled: true },
    { label: 'KnowledgeGraph', enabled: false, disabledReason: 'Planned after Slice A completion.' },
  ]}
/>
```

- [ ] **Step 3: Render a prioritized attention queue**

Surface what the teacher should do next before any generic dashboard metric.

```tsx
<AttentionQueue
  items={[
    { title: 'Review low-confidence sterile-procedure candidates', priority: 'high', href: '/teacher/materials' },
  ]}
/>
```

- [ ] **Step 4: Include explicit screen states in the component contract**

Wire visible `loading`, `empty`, `error`, and `success` variants through the new `StateBlock` primitive.

```tsx
<StateBlock kind="empty" title="No material uploaded yet" description="Upload the first course material to begin candidate extraction." />
```

- [ ] **Step 5: Keep recent objects secondary**

If rendering recent lessons or edits, place them below the attention and stage regions so the screen stays aligned with the approved user job.

```tsx
<section aria-labelledby="recent-work-heading">...</section>
```

- [ ] **Step 6: Verify course workspace route**

Run: `npm run build`

Expected: production build succeeds with the new `/teacher/course` route included.

- [ ] **Step 7: Commit**

```bash
git add src/components/teacher-course/CourseWorkspaceScreen.tsx src/components/teacher-course/AttentionQueue.tsx src/components/teacher-course/StageOverview.tsx src/app/teacher/course/page.tsx
git commit -m "feat: implement teacher course workspace screen"
```

### Task 5: Add material review fixtures and view-model mapping

**Files:**
- Create: `src/lib/teacher-fixtures/material-review.ts`
- Create: `src/lib/teacher-view-models/material-review.ts`
- Reference: `src/app/prototype/teacher/materials/page.tsx`
- Reference: `CONTEXT.md`

- [ ] **Step 1: Create raw material review fixture data**

Represent `Material`, extraction readiness, `KnowledgePointCandidate`, and source evidence explicitly.

```ts
export const teacherMaterialReviewFixture = {
  material: {
    id: 'material-chapter-3',
    title: 'Basic Nursing Chapter 3',
    ingestionState: 'processed',
  },
  candidates: [
    {
      id: 'candidate-sterile-technique',
      label: 'Sterile technique sequence',
      confidence: 'low',
      evidenceState: 'mapped',
      reviewState: 'pending',
    },
  ],
} as const;
```

- [ ] **Step 2: Add queue and detail mapping helpers**

Create mapping helpers for the queue list, selected candidate detail, and evidence panel.

```ts
export function buildMaterialReviewQueue(fixture: typeof teacherMaterialReviewFixture) {
  return [];
}

export function buildCandidateDetail(fixture: typeof teacherMaterialReviewFixture, candidateId: string) {
  return null;
}
```

- [ ] **Step 3: Model confirmation outcomes explicitly**

Represent confirm, reject, and blocked actions separately.

```ts
{
  actionLabel: 'Confirm as KnowledgePoint',
  enabled: true,
  successMessage: 'Candidate is now ready for KnowledgeGraph intake.',
}
```

- [ ] **Step 4: Model missing-evidence and no-selection states**

Include states the approved contract requires.

```ts
{
  evidenceState: 'missing',
  disabledReason: 'Source evidence must be available before confirmation under strict review mode.',
}
```

- [ ] **Step 5: Verify material fixture files**

Run: `npm run lint`

Expected: fixture and mapping files for material review pass lint with no unresolved typing issues.

- [ ] **Step 6: Commit**

```bash
git add src/lib/teacher-fixtures/material-review.ts src/lib/teacher-view-models/material-review.ts
git commit -m "feat: model teacher material review state"
```

### Task 6: Implement the high-fidelity material confirmation screen

**Files:**
- Create: `src/components/teacher-materials/MaterialReviewScreen.tsx`
- Create: `src/components/teacher-materials/ReviewQueue.tsx`
- Create: `src/components/teacher-materials/CandidateDetailPanel.tsx`
- Create: `src/components/teacher-materials/SourceEvidencePanel.tsx`
- Modify: `src/app/teacher/materials/page.tsx`
- Reference: `src/app/prototype/teacher/materials/page.tsx`
- Reference: `docs/superpowers/specs/2026-05-15-high-fidelity-prototype-realignment.md`
- Reference: `gh issue #28`

- [ ] **Step 1: Build the material screen around required contract regions**

Implement the approved `Material` regions explicitly.

```tsx
export default function MaterialReviewScreen() {
  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(320px,420px)_minmax(280px,360px)]">
      <section>{/* Review Queue */}</section>
      <section>{/* Candidate Details */}</section>
      <aside>{/* Source Evidence */}</aside>
    </div>
  );
}
```

- [ ] **Step 2: Render the review queue with confidence and review state**

Make low-confidence and blocked items visually obvious without relying on color alone.

```tsx
<ReviewQueue
  items={[
    { id: 'candidate-sterile-technique', label: 'Sterile technique sequence', confidenceLabel: 'Low confidence', reviewStateLabel: 'Pending review' },
  ]}
/>
```

- [ ] **Step 3: Render candidate detail with explicit actions**

Show confirm/reject/inspect actions and disabled reasons in the detail panel.

```tsx
<CandidateDetailPanel
  candidate={candidate}
  actions={{
    confirmEnabled: true,
    rejectEnabled: true,
    disabledReason: null,
  }}
/>
```

- [ ] **Step 4: Render evidence separately from the candidate summary**

Show citations, evidence completeness, and missing-evidence messaging in a dedicated side panel.

```tsx
<SourceEvidencePanel
  evidence={[
    { sourceLabel: 'Chapter 3, page 18', excerpt: 'Maintain sterile boundary throughout the procedure.' },
  ]}
/>
```

- [ ] **Step 5: Add required state variants**

Provide visible states for `no material`, `no candidate selected`, `candidate load failure`, `missing evidence`, and `confirmation success`.

```tsx
<StateBlock kind="success" title="Candidate confirmed" description="This candidate is now ready to enter the course KnowledgeGraph intake flow." />
```

- [ ] **Step 6: Add the explicit handoff back to the broader slice**

The screen should end at `graph-ready input`, not at graph editing.

```tsx
<p>Confirmed candidates are ready for KnowledgeGraph intake in Teacher Master Slice B.</p>
```

- [ ] **Step 7: Verify the material route**

Run: `npm run build`

Expected: production build succeeds with the new `/teacher/materials` route included and no dependency on legacy `/prototype/teacher/materials` runtime code.

- [ ] **Step 8: Commit**

```bash
git add src/components/teacher-materials/MaterialReviewScreen.tsx src/components/teacher-materials/ReviewQueue.tsx src/components/teacher-materials/CandidateDetailPanel.tsx src/components/teacher-materials/SourceEvidencePanel.tsx src/app/teacher/materials/page.tsx
git commit -m "feat: implement teacher material confirmation screen"
```

### Task 7: Align shell copy, responsive behavior, and accessibility baseline

**Files:**
- Modify: `src/components/teacher-shell/TeacherAppShell.tsx`
- Modify: `src/components/teacher-course/CourseWorkspaceScreen.tsx`
- Modify: `src/components/teacher-materials/MaterialReviewScreen.tsx`
- Modify: `src/components/ui-contract/StateBlock.tsx`
- Reference: `docs/superpowers/specs/2026-05-15-high-fidelity-prototype-realignment.md`
- Reference: `CONTEXT.md`

- [ ] **Step 1: Ensure terminology matches `CONTEXT.md` exactly**

Audit screen copy so it uses `Course`, `Material`, `KnowledgePointCandidate`, `KnowledgePoint`, and `KnowledgeGraph` consistently.

```text
Use: KnowledgePointCandidate
Avoid: 临时知识点 / draft point / candidate node
```

- [ ] **Step 2: Ensure mobile and tablet reprioritization is explicit**

Stack or fold secondary panels instead of shrinking all regions equally.

```tsx
<div className="grid gap-6 xl:grid-cols-[...]">
  <div className="order-1" />
  <aside className="order-3 xl:order-2" />
</div>
```

- [ ] **Step 3: Ensure state communication is not color-only**

Every warning, error, blocked state, and success state must have text labels.

```tsx
<StatusBadge tone="warning" label="Low confidence" />
```

- [ ] **Step 4: Ensure keyboard reachability for primary actions**

Review link/button ordering and avoid non-semantic clickable wrappers.

```tsx
<button type="button">Confirm as KnowledgePoint</button>
```

- [ ] **Step 5: Verify lint and build for the whole slice**

Run: `npm run lint`

Expected: PASS

Run: `npm run build`

Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/components/teacher-shell/TeacherAppShell.tsx src/components/teacher-course/CourseWorkspaceScreen.tsx src/components/teacher-materials/MaterialReviewScreen.tsx src/components/ui-contract/StateBlock.tsx
git commit -m "feat: finalize teacher slice accessibility and responsive contract"
```

### Task 8: Document the implementation boundary and legacy hold line

**Files:**
- Modify: `docs/superpowers/plans/2026-05-18-teacher-master-slice-a.md`
- Reference: `gh issue #36`
- Reference: disposition proposal for `src/app`

- [ ] **Step 1: Confirm the plan preserves the legacy disposition decision**

Keep the boundary explicit in this plan.

```text
Retain route intent and screen inventory from legacy prototype files.
Do not promise to preserve /prototype/* URLs.
Do not continue layering detail onto legacy static pages.
```

- [ ] **Step 2: Confirm root route is out of scope**

Do not switch `/` away from `/prototype/login` in this slice plan.

```text
Root route switching depends on shared entry implementation, confirmed #36 disposition, and stable first replacement routes.
```

- [ ] **Step 3: Self-review the plan for placeholders and scope drift**

Check this plan against:

```text
- #25 parent PRD
- #28 tracer-bullet issue
- teacher master slice contract in the approved spec
- the current disposition proposal
```

- [ ] **Step 4: Final working tree check**

Run: `git status --short`

Expected: only the new plan file is modified in this planning session.

---

## Self-review

### Spec coverage

This plan covers:

- teacher-only `Course Workspace` contract
- teacher-only `Material` contract
- stable `Course` context across both screens
- visible state handling for `loading`, `empty`, `error`, `success`, `hover`, `focus-visible`, and `disabled`
- responsive reprioritization for desktop, tablet, and mobile
- accessibility baseline for the first teacher flow
- legacy hold-line and replacement-first implementation boundary

This plan intentionally does not cover:

- `KnowledgeGraph` implementation
- `Lesson Builder` implementation
- `Preview` implementation
- shared entry implementation
- root route switching

### Placeholder scan

This plan avoids:

- `TBD`
- `TODO`
- unspecified file paths
- unspecified commands
- vague “write tests later” instructions

### Type consistency

The plan uses consistent names for:

- `TeacherAppShell`
- `CourseWorkspaceScreen`
- `MaterialReviewScreen`
- `KnowledgePointCandidate`
- `KnowledgeGraph`
- `teacherCourseWorkspaceFixture`
- `teacherMaterialReviewFixture`

## Execution handoff

Plan complete and saved to `docs/superpowers/plans/2026-05-18-teacher-master-slice-a.md`. Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?
