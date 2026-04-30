# Cathedral Brass Frontend Redesign Design

## Summary

This redesign keeps the current product layout recognizable while substantially upgrading the frontend system behind it. The landing page remains a centered forge experience, and the generated character page keeps its fixed top command bar, left identity rail, and right content well. The work is intentionally broader than surface polish: if the current component boundaries, shell composition, motion handling, or theme/token structure block a premium interactive result, they should be re-architected as part of this effort.

The chosen visual direction is **Cathedral Brass**:

- restrained and premium rather than loud
- dark ceremonial surfaces with brass/gold lighting accents
- tactile motion used for affordance and liveliness, not spectacle
- stronger hierarchy, cleaner panel depth, and more intentional state transitions

## Goals

- Make both the landing page and character page feel materially more premium.
- Preserve the current overall layout shape and route flow that the user already likes.
- Introduce motion that makes the UI feel interactive without becoming flashy or noisy.
- Improve component ownership so shell visuals, state transitions, and page composition are easier to maintain.
- Make dark and light themes feel intentionally designed rather than simple inversion.
- Normalize loading, empty, and error states so the application feels like one coherent system.

## Non-Goals

- No backend or data-model redesign unless a frontend contract issue requires a targeted adjustment.
- No route-flow rewrite away from URL-seeded character generation unless a concrete UI correctness problem forces it.
- No unrelated refactor of generation logic or data content outside the needs of the redesign.
- No visual direction change away from dark fantasy premium UI into sci-fi, minimal SaaS, or bright editorial-first design.

## User Experience Direction

### Core Feel

The application should feel like a premium interactive codex forged from obsidian, brass, smoke, and controlled torchlight. It should read as expensive and authored, not busy. Brass accents should define focus, action, and rank, while darker fields carry most of the page so content remains legible.

### Motion Philosophy

Motion should be noticeable but disciplined:

- slow atmospheric drift in page backgrounds or light blooms
- polished hover/focus lift on actionable surfaces
- smooth tab and panel transitions that reduce UI snap
- subtle shimmer or sweep on primary calls to action
- richer skeleton and loading reveals

Motion should never compete with content comprehension. Every new animation must degrade cleanly under `prefers-reduced-motion`.

## Information Architecture Constraint

The following structure must remain recognizable:

- landing page centered hero + form composition
- character page with fixed top command/tab rail
- left identity/profile rail on desktop
- right main content well for tab panels

This is a redesign of presentation, hierarchy, interaction, and frontend architecture under a stable page frame, not a layout replacement.

## Scope

### In Scope

- substantial theme/token system expansion
- shell and layout component restructuring where needed
- landing page redesign
- character page shell redesign
- top command/tab rail redesign
- shared panel, field, and action styles
- motion primitives and state transitions
- improved loading, error, and empty-state presentation
- responsive and accessibility verification for the changed routes

### Conditionally In Scope

These changes are allowed if they materially improve the redesign:

- breaking large UI files into smaller owned pieces
- moving shell concerns out of route files into dedicated layout/presentation components
- extracting shared visual primitives or section wrappers
- adjusting route/component composition to reduce visual jumpiness or stale render behavior
- tightening store/route interaction if current behavior causes duplicate renders, stale state, or awkward transitions

## Proposed Architecture

### 1. Theme and Visual System

The current theme system is the primary foundation and should be expanded heavily. The redesign should move from a mostly flat token set to a more expressive layered system with clear visual primitives:

- page atmosphere tokens
- panel material tokens
- border/trim tokens
- spotlight/glow tokens
- interaction elevation tokens
- motion duration/easing tokens
- command-bar-specific tokens
- field/button/surface variants

`src/styles/theme.css` remains the source of truth, but it should be treated as a full visual system rather than a loose token file. If it becomes too large or hard to reason about, it may be split into focused CSS files imported from the same entry point.

### 2. Route and Shell Composition

The route structure should remain the same, but page composition should become clearer:

- landing route owns route-level form flow and page composition only
- character route owns route params, generation trigger, and tab/content switching orchestration
- shell components own persistent page frame and shared chrome
- panel components focus on their content, not shell ornament

This keeps route logic thin and gives visual redesign work a predictable home.

### 3. Layout Ownership

`ProfileLayout` should become the authoritative owner of:

- top shell spacing offsets
- desktop/mobile identity rail behavior
- right content well framing
- ambient shell decor shared across tabs
- page-level responsive layout decisions

If needed, `ProfileLayout` can be decomposed into smaller shell pieces, for example:

- profile header rail
- identity card stack
- content frame
- shell atmosphere/decor layer

`TopTabs` should own only the command strip behavior and presentation:

- tab semantics
- keyboard navigation
- active-state visuals
- back control
- theme toggle presentation

If the file remains too mixed, command-strip controls can be split into smaller components without changing the user-facing structure.

### 4. Landing Page Composition

The landing page should evolve from a good single card into a more premium staged hero:

- stronger title treatment and subtitle framing
- more deliberate visual separation between title, form, and footer
- better material quality on the form shell
- richer CTA emphasis
- controlled micro-motion on actions and focus

The route file can still own the page, but if it becomes too visually dense it should be split into landing-specific subcomponents such as:

- hero heading block
- forge form shell
- random-name action
- footer/meta strip

### 5. Shared Surface Primitives

The redesign will likely benefit from a small set of reusable UI surfaces instead of ad hoc repeated Tailwind strings everywhere. This is permitted if it reduces repeated complexity. Likely candidates:

- panel/frame wrapper
- section heading wrapper
- command button variant styles
- field shell/input grouping
- loading skeleton blocks

These should stay lightweight and visual. Avoid abstracting content semantics away from the route/panel components.

## Page-Level Design

### Landing Page

Target changes:

- Preserve the centered forge layout and current content order.
- Increase the sense of ceremony with layered borders, spotlight falloff, and more deliberate spacing.
- Make the title block feel like a premium brand lockup rather than plain heading text.
- Make inputs feel inset and tactile, with stronger focus treatment and cleaner placeholder hierarchy.
- Upgrade the CTA into the strongest focal element on the page, with restrained movement on hover and submission.
- Keep validation and optional-field messaging readable and elegantly integrated.

Motion ideas:

- slow ambient light pulse behind the hero panel
- hover sheen or directional highlight on the CTA
- slightly springier reveal for the random-name control
- soft fade/slide on validation feedback

### Character Page

Target changes:

- Preserve the fixed command strip + sidebar + content frame layout.
- Make the command strip feel like a premium navigation rail rather than a plain toolbar.
- Make the identity rail feel more like a ceremonial dossier card stack.
- Give the content well clearer framing so every tab feels contained within one designed environment.
- Improve the transition from loading state to generated character so the page feels intentional rather than abrupt.

Motion ideas:

- controlled tab indicator shift and content fade/slide
- hover elevation on actionable controls
- subtle halo or rotation refinement around the sigil area
- smoother skeleton-to-content reveal

## State and Data Flow

### Current Contract to Preserve

- landing page submits optional `name` and `seed`
- route navigates to `/character/$id`
- character route regenerates from URL params/search
- tab selection stays local to the character-page store flow

### Allowed Re-Architecture

The implementation may change internal state ownership if needed, but should preserve the above contract unless a concrete frontend issue is found. The primary decision rule:

- keep global state only when multiple parts of the route truly need it
- keep presentation or transient animation state local
- avoid adding new global UI state for purely visual concerns

Specific risks to evaluate during implementation:

- duplicated generation or redundant renders when route params change
- loading-state flicker before character content becomes available
- shell-level layout jump when switching lazy-loaded tabs
- stale tab/panel visuals after rerolling or returning to the forge

If these issues are present, targeted restructuring is in scope.

## Error, Empty, and Loading States

These states should be redesigned as first-class UI, not leftovers:

- loading skeletons should match the premium shell and hint at final structure
- tab-level loading should feel embedded in the content frame, not generic
- generation error should keep the same theme language as the rest of the product
- empty/placeholder moments inside tab content should use the same visual system and spacing rules

## Accessibility

The redesign must preserve or improve:

- visible keyboard focus on all interactive controls
- tab semantics and arrow-key support
- sufficient contrast in both dark and light themes
- reduced motion behavior for all new animation
- readable text hierarchy at mobile sizes
- clear disabled and loading affordances

Motion cannot become the only signal for active, hovered, loading, or selected states.

## Responsive Behavior

Desktop should remain the showcase experience, but the redesign must remain coherent on smaller screens:

- landing page hero shell should compress gracefully without losing hierarchy
- top command bar should remain horizontally scrollable without feeling cramped
- mobile identity header should inherit the same premium language as desktop
- content padding and panel framing should scale down cleanly on narrower screens

## File and Ownership Strategy

Expected core files to evaluate or modify during implementation:

- `src/styles/theme.css`
- `src/routes/index.tsx`
- `src/routes/character.$id.tsx`
- `src/routes/__root.tsx`
- `src/components/Layout/ProfileLayout.tsx`
- `src/components/Layout/TopTabs.tsx`

Potential new frontend files if needed:

- landing-specific visual subcomponents
- shell/identity/content frame helpers
- shared surface/section wrappers
- motion/state utility styles

Files should be added only when they create clearer ownership. Do not fragment the codebase with decorative one-off wrappers.

## Testing Strategy

### Functional Verification

- landing page still submits correctly with blank and filled optional inputs
- seeded character route still renders the correct destination flow
- back action still returns to the forge correctly
- share and export actions remain reachable and visible
- tab changes still work with click and keyboard interaction

### UI/Interaction Verification

- loading-to-content transition does not visibly break the shell
- lazy-loaded panel transitions do not create obvious jank
- focus-visible remains clear on buttons, tabs, and inputs
- mobile layout remains usable on landing and character pages
- light and dark themes both retain coherent premium styling

### Build Verification

- `npm run build`
- `npm run lint`

## Risks

- Existing large UI files may hide mixed concerns, making the first restructuring pass larger than a normal polish task.
- There are already unrelated local modifications in the repo, so implementation must avoid clobbering active in-progress work.
- A more ambitious token/motion system can become over-engineered if shared primitives are extracted too early.
- If lazy panel loading currently has timing issues, premium transitions may expose them more clearly and require targeted state cleanup.

## Success Criteria

This redesign is successful if:

- the product still feels like the same app structurally
- the UI looks materially more premium and cohesive
- motion makes the experience feel interactive without becoming theatrical
- shell and component ownership are clearer than before
- loading, error, and tab transitions feel deliberate
- the redesign survives lint/build and basic manual route verification

## Implementation Note

Implementation should be allowed to be broad, including meaningful frontend re-architecture, but every architectural change must clearly serve one of these outcomes:

- stronger premium presentation
- cleaner state/render behavior
- clearer ownership and maintainability
- lower visual inconsistency across routes and states

If a change does not serve one of those outcomes, it should be left out.
