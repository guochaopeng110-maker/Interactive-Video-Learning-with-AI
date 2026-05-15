# High-Fidelity Prototype Realignment Spec

## Status

Approved design direction for high-fidelity UI/UX prototype realignment. This spec is intended to directly support later `to-prd` and `to-issues` work.

## Goal

Redefine the current prototype target under `src/app` from an information-architecture-first placeholder prototype into an implementation-ready high-fidelity UI/UX contract.

This work is explicitly a `high-fidelity UI/UX prototype realignment`, not a continuation of the earlier role-based placeholder prototype strategy.

## What This Spec Is

This spec defines:

- what implementation-ready UI/UX means for this product
- the minimum complete design contract shared across the product
- the teacher master slice that sets the implementation standard
- the equivalent contract expectations for shared entry, student, and admin screens
- the final UI handoff package required for frontend implementation

This spec does not implement screens, revise backend architecture, or decompose work into GitHub issues.

## Legacy Positioning

`src/app` and its current prototype routes are treated as `legacy reference`, not as the default implementation base and not as authoritative future screen boundaries.

They may be used for:

- auditing current assumptions
- reusing useful content fragments or terminology
- comparing old and new information architecture choices

They must not be used to assume:

- the existing route split is correct
- the existing screen boundaries should be preserved
- the current components represent the future implementation model

Where the current prototype conflicts with this spec, this spec wins.

## Why This Reset Is Necessary

The current prototype already provides value as a role-based information architecture exploration. It establishes shared entry points, role workspaces, and rough domain coverage. But it is still closer to a structured placeholder than to a design-grade or implementation-ready product prototype.

The gap shows up in several ways:

- screen boundaries are inherited too directly from early route scaffolding
- visual language is not yet a product-level contract
- state coverage is incomplete or implicit
- frontend implementation would still require guesswork
- screen composition still reflects placeholder sequencing more than production user jobs

The next prototype baseline must function as a UI/UX contract that both design review and frontend implementation can rely on.

## Implementation-Ready UI/UX Definition

In this project, `implementation-ready UI/UX` means a screen or flow is defined strongly enough that:

- design review can approve its purpose, information hierarchy, core interactions, and edge-state behavior without relying on verbal patch-ups
- frontend engineers can implement it without inventing key interactions, state rules, responsive behavior, or accessibility semantics on their own

A screen is not implementation-ready if any of the following are still left to guesswork:

- its true purpose
- its primary user job
- its permission boundary
- its relationship to domain objects
- its loading, empty, error, or success behavior
- its key control states such as hover, focus, and disabled
- its responsive behavior
- its accessibility baseline
- its upstream and downstream handoff

## Design Direction

The approved direction is:

- contract-first
- teacher master slice sets the standard
- shared entry, student, and admin expand under the same contract
- absorb the necessary parts of a lightweight design system contract
- do not use the existing route-by-route prototype as the primary strategy

This means the team first defines the contract of the experience, then evaluates how current routes or components should map to it.

## Product And Domain Constraints

The following constraints remain stable and are inherited from `CONTEXT.md`:

- `Course` is the core teaching boundary shared across authoring, learning, and governance
- `Material`, `KnowledgeGraph`, and `Lesson` remain course-scoped domain objects
- `KnowledgePointCandidate` is not a formal member of `KnowledgeGraph`
- `Teacher` authors and publishes lesson content
- `Student` only sees confirmed and published learning objects
- `Admin` governs structure, ownership, visibility, and exceptions, but does not directly author lesson content
- `GroundedAssistant` is a single course-scoped object shared by teacher and student usage contexts

This spec must preserve those domain boundaries while upgrading fidelity and implementation readiness.

## Design Review And Delivery Standards

The prototype baseline after this realignment must satisfy both:

- `design review quality`
- `frontend handoff quality`

The first requires visual and interaction clarity. The second requires operational clarity. Neither is sufficient alone.

## Minimum Complete Design Contract

This spec requires a minimum but complete design contract shared across all screens and roles.

### 1. Visual Tokens

Visual tokens must be defined as product semantics, not merely inherited from the current `globals.css`.

Target tone:

- calm
- clinical
- trustworthy
- academically structured

The design language should move away from a generic purple SaaS default and toward a more grounded learning and authoring product expression.

The minimum token set must include:

- `color tokens`
  - `bg/base`
  - `bg/subtle`
  - `surface/default`
  - `surface/elevated`
  - `surface-accent`
  - `text/primary`
  - `text/secondary`
  - `text/muted`
  - `text/inverse`
  - `border/default`
  - `border/strong`
  - `border/error`
  - `border/success`
  - `action/primary`
  - `action/primary-hover`
  - `action/secondary`
  - `action-danger`
  - `status/info`
  - `status/warning`
  - `status/error`
  - `status/success`
  - `role/teacher`
  - `role/student`
  - `role/admin`
- `type tokens`
  - display
  - page-title
  - section-title
  - card-title
  - body
  - meta
  - caption
- `spacing tokens`
  - 4
  - 8
  - 12
  - 16
  - 24
  - 32
  - 48
- `radius tokens`
  - small
  - medium
  - large
  - panel
- `shadow tokens`
  - none
  - subtle
  - raised
  - overlay
- `layout tokens`
  - content width
  - panel gap
  - sticky offset
  - sidebar width
  - canvas minimum height

### 2. Core Primitives

Screens must be composed from shared primitives rather than each screen inventing its own base structure.

Minimum shared primitives:

- `App Shell`
- `Page Header`
- `Context Rail / Summary Panel`
- `Section Container`
- `Action Bar`
- `Entity Card`
- `Data Table / Review List`
- `State Block`
- `Status Badge`
- `Graph Canvas Shell`
- `Node / Branch Card`
- `Assistant Panel`
- `Preview Frame`
- `Feedback / Validation Panel`

Each primitive can have role-specific variants, but its semantic purpose should remain stable.

### 3. Interaction States

Interaction states are a contract, not a polish layer.

Minimum shared state set:

- `default`
- `hover`
- `focus-visible`
- `pressed`
- `disabled`
- `loading`
- `empty`
- `error`
- `success`

Rules:

- all clickable controls must define `hover`, `focus-visible`, and `disabled`
- all key async actions must define `loading`, `success`, and `error`
- all data-bearing regions must define `loading`, `empty`, `error`, and `populated`
- all major completion moments must define the scope and persistence of success feedback
- if a state is not applicable, the screen contract must say so explicitly

Priority rules:

- `disabled` overrides hover affordance
- `loading` on a primary action must prevent duplicate submission when the action is not safely repeatable
- `error` must be communicated through placement and text, not only color

### 4. Responsive Rules

Responsive design in this spec is not simple shrinking. It is a controlled re-prioritization of information and actions across breakpoints.

Minimum form factors:

- mobile
- tablet
- desktop

Global responsive expectations:

- navigation may collapse, but context must remain understandable
- secondary context may fold or move, but the primary user job must stay intact
- graph- and builder-heavy screens may change interaction mode on smaller screens instead of attempting full desktop parity
- data review tables may transform into stacked review cards on narrow screens

### 5. Accessibility Baseline

Accessibility is a baseline contract for implementation, not a later enhancement.

Minimum baseline:

- all primary actions and essential navigation are keyboard reachable
- `focus-visible` is clear and unobstructed
- heading structure remains semantically meaningful
- status is not conveyed by color alone
- errors are clearly associated with the relevant input or region
- graph and branch objects have textual equivalents for key meaning and state
- preview interactions provide text feedback, not only motion or color
- contrast remains readable, especially for muted text and status surfaces
- mobile touch targets and expandable areas meet basic reachability expectations

## Screen Contract Strength Model

This spec uses two levels of contract strength.

### Teacher Master Slice

For the teacher master slice, every core screen must explicitly define:

- purpose
- primary user job
- permission boundary
- upstream and downstream handoff
- key regions
- loading
- empty
- error
- success
- hover
- focus
- disabled
- responsive behavior
- accessibility notes

This is the strongest contract level in the system.

### Shared Entry, Student, And Admin

These screens must still be defined at near-equal screen-contract depth, but they may inherit some lower-level control-state semantics from the shared design contract instead of repeating every micro-state locally.

This is not a shallow-principles-only layer. It is still a full screen inventory with explicit contracts.

## Teacher Master Slice

The first master slice is:

`Course Workspace -> Material -> KnowledgeGraph -> Lesson Builder -> Preview`

This slice was chosen because it defines the core authoring loop from stable course context to publishable lesson validation, and because it establishes the shared object meanings that later student and admin experiences depend on.

This slice is not defined by the existing route directories. It is defined by user-job boundaries and state-transition boundaries.

## Teacher Master Slice Screen Contracts

### 1. Course Workspace

Purpose:

- establish stable `Course` context
- summarize the current state of `Material`, `KnowledgeGraph`, and `Lesson`
- expose priority actions and blockages
- serve as the stable anchor for the rest of the teacher flow

Primary user job:

- determine what this course needs next
- see whether the course is blocked, ready for lesson iteration, or ready for preview/publish

Permission boundary:

- teacher-only authoring entry point within assigned course scope

Key regions:

- `Course Header`
- `Progress Overview`
- `Attention Queue`
- `Recent Lessons / Recent Edits`
- `Primary Actions`

Required states:

- `loading`
  - course summary skeleton
  - attention queue skeleton
- `empty`
  - course has no `Material`
  - primary CTA becomes start material ingestion
- `error`
  - course context failed to load
  - retry and return path required
- `success`
  - reflect meaningful course-level progress such as material ingested, candidate confirmation completed, or preview passed
- `hover`
  - stage action cards
  - recent objects
  - key entry links
- `focus-visible`
  - all entry actions and stage actions
- `disabled`
  - later-stage actions may be disabled if prerequisites are unmet
  - disabled reason must be visible

Responsive behavior:

- desktop shows course summary, attention queue, and stage overview together
- tablet deprioritizes recent edits in favor of action queue
- mobile becomes a vertical task flow

Accessibility notes:

- stage state cannot be color-only
- disabled progression actions need text explanation
- attention priority must be explicitly labeled

### 2. Material

Purpose:

- visualize `Material-Constrained Generation`
- expose material ingestion, source completeness, and AI extraction output
- enable teacher review of candidate content before it can enter formal course semantics

Primary user job:

- decide which extracted content is trustworthy enough to confirm
- identify low-confidence or source-incomplete candidates

Permission boundary:

- teacher review and confirmation space only
- not visible to student
- not a governance authoring area for admin

Key regions:

- `Material Intake Summary`
- `Review Queue`
- `Candidate Details Panel`
- `Source Evidence Panel`
- `Review Actions`

Required states:

- `loading`
  - queue and detail load independently
- `empty`
  - no material uploaded
  - material exists but no candidate output yet
- `error`
  - parsing failure
  - source mapping failure
  - candidate loading failure
- `success`
  - candidate confirmation must persist visibly as ready-for-graph input
- `hover`
  - queue rows
  - confirm / reject / inspect actions
- `focus-visible`
  - queue traversal
  - candidate actions
  - source evidence interactions
- `disabled`
  - no candidate selected
  - source evidence missing or insufficient under stricter review rules

Responsive behavior:

- desktop supports queue, detail, and evidence as simultaneous regions
- tablet can reduce to dual-column with evidence folded into tabs or drawer
- mobile becomes a serial review flow

Accessibility notes:

- evidence and citations must be textually understandable
- state change after candidate action must be screen-reader friendly
- reject and confirm actions must be clearly distinguishable

### 3. KnowledgeGraph

Purpose:

- maintain the formal course-level `KnowledgeGraph`
- confirm structure, relationships, and readiness for lesson use
- convert reviewed knowledge inputs into a shared semantic model

Primary user job:

- stabilize knowledge structure at course scope
- determine which points are ready for `Lesson` authoring
- resolve relation conflicts or source ambiguity

Permission boundary:

- editable only for teacher within assigned course authoring scope
- student sees only published read-only perspective elsewhere

Key regions:

- `Graph Canvas / List Fallback`
- `Selected KnowledgePoint Detail Panel`
- `Relationship Inspector`
- `Source Trace / Evidence`
- `Readiness Markers`

Required states:

- `loading`
  - graph region and detail panel may load separately
- `empty`
  - no confirmed knowledge points yet
  - route back toward `Material`
- `error`
  - graph load failure
  - relation save failure
  - detail fetch failure
- `success`
  - relation confirmation
  - readiness change
  - knowledge point successfully moved into formal graph state
- `hover`
  - node highlight
  - relation highlight
  - panel actions
- `focus-visible`
  - node selection
  - structural actions
  - readiness actions
- `disabled`
  - not lesson-ready due to unresolved source or relation conflicts
  - disabled reason must be explicit

Responsive behavior:

- desktop is graph-primary with persistent detail panel
- tablet supports graph plus toggled detail
- mobile defaults to list or hierarchy mode, with graph visualization as secondary aid

Accessibility notes:

- nodes and relations need textual equivalents
- conflict or readiness states cannot depend on line color alone
- selected, conflicted, and ready states need explicit labels

### 4. Lesson Builder

Purpose:

- compose `Lesson` from confirmed `KnowledgePoint`
- define `LessonNode` sequence, branches, remediation, and return-to-mainline behavior
- bind reviewed teaching artifacts into a coherent learning flow

Primary user job:

- produce a complete interactive lesson flow that can be previewed as a student-like experience
- repair node structure, branch logic, and pacing problems

Permission boundary:

- teacher authoring space only
- not visible as editable to student or admin

Key regions:

- `Lesson Outline / Node Sequence`
- `Branch Flow Canvas or Structured Flow View`
- `Selected LessonNode Editor`
- `Attached Content Panel`
- `Validation Panel`

Required states:

- `loading`
  - lesson structure
  - selected node detail
  - validation results
- `empty`
  - no selected knowledge points yet
  - lesson exists but has no nodes yet
- `error`
  - lesson save failure
  - validation computation failure
  - node binding failure
- `success`
  - node save
  - branch loop validated
  - lesson reaches previewable state
- `hover`
  - node selection
  - branch actions
  - structure controls
- `focus-visible`
  - all non-mouse structure editing actions
  - branch configuration
  - node editing controls
- `disabled`
  - preview blocked due to unresolved structure or unreviewed content
  - reason must point to the failing contract

Responsive behavior:

- desktop supports structure plus editor plus validation as parallel work regions
- tablet reduces validation to collapsible region
- mobile becomes stepwise authoring rather than full canvas parity

Accessibility notes:

- branch logic must not exist only as spatial graph
- a structured textual view is required
- validation issues must link clearly back to affected nodes

### 5. Preview

Purpose:

- run the same `Lesson` in teacher preview mode
- validate student-like interaction flow before publish
- expose publish blockers and repair paths

Primary user job:

- trial-run the lesson
- find structural or instructional problems
- decide whether to return for edits or proceed toward publish

Permission boundary:

- teacher-only preview state
- not equivalent to student published state

Key regions:

- `Student-like Playback Stage`
- `Current Node Context`
- `Preview Mode Banner`
- `Issue / Publish Checklist Panel`
- `Back-to-Edit Shortcuts`
- `Publish Action Zone`

Required states:

- `loading`
  - preview initialization
  - node transition
  - assistant context warm-up
- `empty`
  - no previewable lesson available
  - route back to builder
- `error`
  - node runtime failure
  - broken branch loop
  - missing assistant context
- `success`
  - preview run completed
  - validation passed
  - publish succeeded
  - these are different success levels and must not be collapsed into one generic state
- `hover`
  - playback actions
  - edit shortcuts
  - publish controls
- `focus-visible`
  - all preview interactions
  - return-to-edit actions
  - publish actions
- `disabled`
  - publish blocked until unresolved issues are cleared
  - reason must be explicit

Responsive behavior:

- desktop keeps learning stage primary while allowing parallel checklist visibility
- tablet prioritizes stage and toggles checklist
- mobile gives the stage full width and moves checklist into sheet or step panel

Accessibility notes:

- preview state must be unmistakably labeled as preview
- publish blockers must be readable as a list
- interaction feedback needs text output, not only motion or color

## Master Slice Cross-Screen Rules

These screens are not just a set of pages. They form a continuous contract.

Required cross-screen rules:

- `course persistence`
  - current `Course` context remains stable across all five screens
- `state inheritance`
  - confirmed state from one screen must enter the next screen explicitly
- `repair loop`
  - preview issues must deep-link back to builder or graph where appropriate
- `publish boundary`
  - student never sees draft, preview, or unreviewed authoring state

## Shared Entry Contracts

Shared entry is a product-layer contract, not a small collection of pre-app pages.

Recommended shared entry screen inventory:

- `Authentication Entry`
- `Role & Workspace Entry`
- `Global Profile & Preferences`
- `Course Switch / Global Context`

### Authentication Entry

Purpose:

- establish identity
- communicate product and school context
- move user into authorized workspace

Minimum contract:

- loading
- input error
- auth failure
- disabled submit
- success redirect
- responsive behavior
- accessible form labeling and error association

### Role & Workspace Entry

Purpose:

- allow explicit workspace entry for multi-role users
- make role boundary visible before entering role-specific screens

Minimum contract:

- single-role auto-pass
- multi-role selection
- revoked access state
- no assigned workspace state
- keyboard-reachable role selection

### Global Profile & Preferences

Purpose:

- handle shared user settings, terminology help, notifications, and preferences
- remain separate from course business actions

### Course Switch / Global Context

Purpose:

- support multi-course users
- establish stable course context without leaking role-specific business logic into the switcher itself

## Student Contracts

Student screens inherit shared domain semantics but only expose published learning objects.

Recommended student screen inventory:

- `Student Home`
- `Student Course Workspace`
- `Student KnowledgeGraph`
- `Lesson Player`
- `Review / Remediation`
- `Progress`

### Student Home

Purpose:

- reduce friction to resume learning

Contract emphasis:

- continue-learning path
- pending review items
- recent progress
- teacher reminders if applicable

### Student Course Workspace

Purpose:

- act as the student entry point into a single course

Contract emphasis:

- published lessons
- course-level progress
- recommended next action
- knowledge graph entry

### Student KnowledgeGraph

Purpose:

- translate shared course knowledge structure into learner navigation

Contract emphasis:

- read-only graph
- node mastery and progress
- prerequisite hints
- lesson entry points

### Lesson Player

Purpose:

- serve as the immersive learning stage

Contract emphasis:

- current node
- branch question flow
- remediation path
- grounded assistant
- progress continuity

This is a student core page and should be specified at near teacher-core depth.

### Review / Remediation

Purpose:

- turn weak points and errors into structured recovery tasks

Contract emphasis:

- wrong-answer recovery
- remediation routes
- retry actions
- return to progress or lesson

This is also a student core page and should be specified at near teacher-core depth.

### Progress

Purpose:

- show course-level completion and knowledge-point mastery

Contract emphasis:

- mastery summary
- remaining work
- recommended return paths

### Student-Wide Rules

- student screens only expose published learning state
- no candidate, draft, preview-only, or unreviewed authoring state may leak into student view
- all screens require at least `loading`, `empty`, `error`, `populated`, and responsive behavior
- all core learning actions require `hover`, `focus-visible`, and `disabled` states where applicable

## Admin Contracts

Admin screens are governance spaces, not extensions of the teacher authoring flow.

Recommended admin screen inventory:

- `Admin Home`
- `Catalog Management`
- `Users & Roles`
- `Governance & Exceptions`
- `Organization Analytics`

### Admin Home

Purpose:

- surface organization-level signals that need governance attention

### Catalog Management

Purpose:

- manage `Major` and `Course` structure, visibility, and ownership context

### Users & Roles

Purpose:

- manage role assignments, scope, and access boundaries

### Governance & Exceptions

Purpose:

- manage publication visibility issues, role misconfiguration, and policy exceptions

### Organization Analytics

Purpose:

- show organization-level operational and learning health signals

### Admin-Wide Rules

- admin may inspect governance state but does not directly author lesson content
- screens presenting `Course` or `Lesson` must do so from governance perspective, not authoring perspective
- success and error feedback in admin space should describe governance outcomes, not content creation outcomes

## Cross-Role Contract Rules

The spec must preserve five cross-role rules.

### 1. Object Consistency

`Course`, `KnowledgeGraph`, `Lesson`, and `GroundedAssistant` must keep one stable domain meaning across roles.

### 2. Action Divergence

Role differences are primarily differences in visible actions and visible states, not differences in domain object identity.

### 3. State Visibility

- teacher sees candidate, draft, and review state
- student sees published learning state only
- admin sees governance state, not authoring edit state

### 4. Navigation Continuity

Shared entry to role workspace transitions must preserve stable identity and context.

### 5. Design Consistency

Visual tokens, primitives, interaction rules, responsive rules, and accessibility baseline must be inherited consistently across roles.

## Screen Acceptance Standard

A screen is accepted as implementation-ready only if it has:

- explicit purpose
- clear primary user job
- explicit permission boundary
- domain object mapping
- upstream and downstream handoff
- defined state behavior
- responsive behavior
- accessibility baseline

If any of those are missing, the screen remains prototype-grade but not implementation-ready.

## Legacy Audit Model

Existing `src/app` prototype screens should be audited under one of three labels:

- `reusable reference`
- `needs reframing`
- `placeholder-only`

This audit exists to prevent the team from unconsciously treating old route structure as future implementation truth.

## Frontend Handoff Package

For frontend development to start without UI/UX guesswork, the final handoff package must include:

- `Screen Inventory`
  - final screen list
  - role
  - purpose
  - upstream/downstream relationship
  - core or secondary classification
- `Screen Contract`
  - purpose
  - key regions
  - primary user job
  - permission boundary
  - state requirements
  - responsive behavior
  - accessibility notes
- `Object Mapping`
  - which domain objects appear on which screens
  - no semantic drift in object naming
- `State Matrix`
  - screen-level or component-level mapping for loading, empty, error, success, hover, focus, disabled, and responsive treatment
- `Primitive Dependency Map`
  - which screens depend on which shared primitives
  - which primitives allow role-specific variation
- `Navigation And Handoff Map`
  - entry conditions
  - return paths
  - repair loops
  - publish boundary rules
- `Responsive Behavior Notes`
  - which regions collapse, stack, fold, or switch mode by breakpoint
- `Accessibility Baseline Checklist`
  - implementation and review baseline
- `Legacy Audit Notes`
  - which current prototype artifacts are referenceable
  - which need reframing
  - which should not drive future screen boundaries

## How This Spec Supports `to-prd`

This spec can feed `to-prd` by supplying:

- the reset objective
- product scope of the prototype realignment
- master slice definition
- cross-role boundary rules
- screen inventory and contract expectations
- minimum design contract
- frontend handoff expectations

## How This Spec Supports `to-issues`

This spec can feed `to-issues` by enabling issue decomposition around vertical slices or contract layers such as:

- shared design contract
- teacher course workspace contract
- material review contract
- knowledge graph contract
- lesson builder contract
- preview contract
- student workspace contract
- admin governance contract
- legacy prototype audit and migration notes

## Explicit Non-Goals

This spec does not:

- delete or replace `src/app`
- implement screen code
- change GitHub issues in this session
- redesign backend APIs or persistence
- replace `CONTEXT.md` domain language

## Immediate Next Step After This Spec

The next step after this approved spec is to use it as the foundation for:

- `to-prd`
- `to-issues`

Implementation planning should only begin after those decomposition steps are completed against this contract.
