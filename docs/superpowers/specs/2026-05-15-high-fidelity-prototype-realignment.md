# High-Fidelity Prototype Realignment Spec

## Goal

Reset the current prototype process from IA-first placeholders to a high-fidelity, implementation-ready UI workflow.

The next prototype baseline must satisfy both:

- design review quality (what a UI designer can sign off)
- direct implementation usability (what frontend engineers can build from without guessing)

## Why We Are Resetting

The previous role-based prototype pass established route structure and permission boundaries, but visual and interaction fidelity is still below the level needed for direct product implementation.

This causes a mismatch:

- stakeholders expect design-grade prototype screens
- current pages still behave like structured placeholders
- frontend implementation still lacks a strict UI contract

## Product Constraints (Must Keep)

- Keep the role-based IA: `shared entry / teacher / student / admin`.
- Keep domain language from `CONTEXT.md`: `Course`, `Material`, `KnowledgeGraph`, `Lesson`, `LessonNode`, `GroundedAssistant`, `Material-Constrained Generation`.
- Keep permission boundaries:
  - teacher owns authoring and publish
  - student consumes published learning only
  - admin governs structure/ownership/visibility, not lesson authoring

## Realignment Outcomes

### 1. Requirements Realignment

Prototype requirements are split into two tracks:

- **Flow requirement**: page-to-page role workflow correctness
- **Fidelity requirement**: visual system, interaction state, and component completeness

Every target screen must pass both tracks before being considered complete.

### 2. Architecture Realignment

Adopt a UI architecture with clear separation:

- **Role Shell Layer**: global navigation, role context, permission signifiers
- **Domain View Model Layer**: shared presentation model for `Course`, `KnowledgeGraph`, `Lesson`
- **Design System Layer**: tokens + component primitives + interaction states
- **Screen Composition Layer**: role-specific screens built from primitives and shared view models

### 3. UI Design Realignment

Introduce a high-fidelity baseline specification:

- typography scale and hierarchy
- color semantics and contrast rules
- spacing/radius/shadow tokens
- interaction states (`default/hover/focus/disabled/loading/error/success`)
- empty, error, and long-content states
- responsive behavior on `375 / 768 / 1024 / 1440`

No page is complete if only happy-path static content exists.

### 4. Implementation Realignment

Implementation proceeds in two phases:

1. **Master Slice (teacher)**:
   - select one full teacher workflow slice
   - finish to high fidelity and implementation-ready quality
   - use as reference standard
2. **Scale Out (student/admin/shared)**:
   - apply the same design tokens, primitives, and state patterns
   - enforce cross-role visual consistency with role-specific action boundaries

## Screen Acceptance Contract (High Fidelity)

Each screen must explicitly define:

- purpose and primary action
- role permission boundary on this screen
- data states: loading / empty / populated / error
- interactive states for all controls
- responsive behavior and overflow behavior
- domain semantics mapping (`Course`, `KnowledgeGraph`, `Lesson`, etc.)

If any of the above is missing, the screen is not implementation-ready.

## Delivery Plan

### Step A: Baseline Design Contract

Create a project-level high-fidelity contract document with:

- visual tokens
- core components
- state matrix
- accessibility and responsiveness checklist

### Step B: Teacher Master Slice

Rebuild one teacher vertical slice to high fidelity:

- `teacher/course`
- `teacher/materials`
- `teacher/knowledge-graph`
- `teacher/lesson-builder`
- `teacher/lesson-preview`

### Step C: Cross-Role Expansion

Apply baseline to:

- student learning flow
- admin governance flow
- shared entry pages

### Step D: Implementation Hand-off Readiness

For each screen, produce:

- UI implementation contract
- role boundary notes
- edge-state behavior notes

## Testing and Review Gates

- Build gate: `npm run build` passes
- Lint gate: `npm run lint` with no new warnings introduced by this realignment work
- UX gate: high-fidelity checklist completed per screen
- Consistency gate: shared `Course/KnowledgeGraph/Lesson` semantics preserved across roles
- Boundary gate: no student exposure to draft authoring states; no admin lesson-authoring actions

## Out of Scope

- backend API redesign
- persistence schema redesign
- algorithm changes for generation/retrieval
- replacing domain glossary or role-based IA model

## Immediate Next Action

Open a new parent PRD issue for this realignment and break it into new tracer-bullet issues focused on:

- high-fidelity baseline
- teacher master slice
- student/admin scale-out
- implementation hand-off contract
