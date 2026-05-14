# Materials Prototype Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the third prototype screen at `src/app/prototype/materials/page.tsx` with three radically different UI variants for the teacher materials upload and AI review flow.

**Architecture:** Keep the existing prototype pattern used by the login and dashboard routes: a client page with `Suspense`, a `?variant=` switch, and the shared floating switcher. Because this is a throwaway UI prototype under the `prototype` skill, we intentionally skip TDD and focus on clearly different layouts, visible state, and a buildable route.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS 4

---

### Task 1: Create the materials prototype route

**Files:**
- Create: `src/app/prototype/materials/page.tsx`
- Reference: `src/app/prototype/login/page.tsx`
- Reference: `src/app/prototype/dashboard/page.tsx`

- [ ] **Step 1: Mirror the existing prototype route shell**

Use a client component with `Suspense`, `useSearchParams`, `PrototypeSwitcher`, and a `variant` fallback to `"A"`.

```tsx
'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import PrototypeSwitcher from '../components/PrototypeSwitcher';
```

- [ ] **Step 2: Define shared demo data in the route file**

Add fixed in-memory data for the uploaded file summary, stepper labels, AI extraction metrics, timeline entries, and mixed-confidence review items so each variant can render the same story with different structure.

```tsx
const steps = [
  { id: 'upload', label: '上传教材', status: 'completed' },
  { id: 'analysis', label: 'AI 解析', status: 'current' },
  { id: 'review', label: '审核确认', status: 'upcoming' },
];
```

- [ ] **Step 3: Build three structurally different variants**

Implement `VariantA`, `VariantB`, and `VariantC` as separate components:

```tsx
function VariantA() {
  return <div>...</div>;
}

function VariantB() {
  return <div>...</div>;
}

function VariantC() {
  return <div>...</div>;
}
```

- [ ] **Step 4: Wire the variants into one route**

Render one variant based on `?variant=` and keep the switcher visible in development.

```tsx
function MaterialsContent() {
  const searchParams = useSearchParams();
  const variant = searchParams.get('variant') ?? 'A';

  return (
    <>
      {variant === 'A' && <VariantA />}
      {variant === 'B' && <VariantB />}
      {variant === 'C' && <VariantC />}
      <PrototypeSwitcher />
    </>
  );
}
```

- [ ] **Step 5: Export the route with a loading fallback**

Use the same `Suspense` pattern already established by the other prototype screens.

```tsx
export default function MaterialsPrototype() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-400">Loading...</div>}>
      <MaterialsContent />
    </Suspense>
  );
}
```

### Task 2: Make the variants visibly different while preserving the same flow

**Files:**
- Modify: `src/app/prototype/materials/page.tsx`
- Reference: `design-system/interactive-video-learning/MASTER.md`
- Reference: `docs/superpowers/specs/2026-05-14-ui-prototype-design.md`

- [ ] **Step 1: Implement Variant A as a clean stepper workspace**

Make Variant A the recommended direction: top stepper, central two-column workspace, persistent right summary rail, and an audit list focused on low-confidence items.

```tsx
<div className="min-h-screen" style={{ background: '#EEF2FF' }}>
  <header>...</header>
  <main className="grid gap-6 xl:grid-cols-[1.5fr_0.9fr]">...</main>
</div>
```

- [ ] **Step 2: Implement Variant B as an AI mission-control view**

Make Variant B feel more alive with a darker indigo surface, processing telemetry, streaming extraction cards, and a fixed review console without reusing Variant A's layout.

```tsx
<div className="min-h-screen" style={{ background: 'radial-gradient(...)' }}>
  <section className="grid gap-6 xl:grid-cols-[0.95fr_1.35fr]">...</section>
</div>
```

- [ ] **Step 3: Implement Variant C as a results-first review board**

Make Variant C prioritize the final review action: lighter shell, left-side progress rail, large approval metrics, and a stacked review board that foregrounds batch approval.

```tsx
<div className="min-h-screen bg-white">
  <main className="grid gap-8 xl:grid-cols-[260px_minmax(0,1fr)]">...</main>
</div>
```

- [ ] **Step 4: Preserve the agreed interaction story in every variant**

Ensure all variants clearly show:

```text
上传教材 -> AI 解析 -> 审核确认
默认批量通过 -> 低置信度项展开处理 -> 进入知识图谱构建
```

### Task 3: Verify the route builds cleanly

**Files:**
- Verify: `src/app/prototype/materials/page.tsx`
- Verify: `package.json`

- [ ] **Step 1: Run the Next.js build**

Run: `npm run build`

Expected: Next.js production build completes with exit code `0`.

- [ ] **Step 2: Review the working tree**

Run: `git status --short`

Expected: only the new plan doc and prototype route changes are present for this task.

- [ ] **Step 3: Hand off the prototype URLs**

Report the route and variant keys for review:

```text
/prototype/materials?variant=A
/prototype/materials?variant=B
/prototype/materials?variant=C
```
