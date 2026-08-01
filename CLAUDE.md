# CLAUDE

## Project Development Rules
This project follows a phase-based roadmap. Every implementation must match the current phase request exactly and stop before future phases.

## Workflow
1. Review the requested phase and confirm scope.
2. Inspect existing components and reuse them where possible.
3. Implement only the requested feature or section.
4. Run the build after every change.
5. Fix build issues before closing the task.
6. Do not introduce breaking changes.

## Roadmap Usage
- The roadmap is the source of truth for project phases.
- Each phase should be built sequentially.
- Do not begin future roadmap phases until the current one is complete.
- Do not add functionality outside the current phase.

## Design System Usage
- Follow the existing design system consistently.
- Use Tailwind theme values when possible.
- Use shared components for cards, buttons, containers, headings, and layout.
- Maintain the corporate brand style, spacing, and typography.

## Reusable Components
- Prefer reusable React components over one-off markup.
- Keep UI primitives generic and composable.
- Use `src/components/ui` for low-level reusable pieces.
- Use higher-level components for layout and navigation.

## TypeScript Standards
- Use explicit typing for props and arrays.
- Keep component props strongly typed.
- Avoid `any` and implicit `any`.
- Use `as` only when necessary and safe.
- Keep code compatible with TypeScript strictness and React type patterns.

## Tailwind Standards
- Follow mobile-first responsive patterns.
- Use semantic class compositions and avoid overly broad overrides.
- Keep utility classes readable and maintainable.
- Prefer theme color names and spacing scales.
- Use `rounded-full`, `rounded-[2rem]`, and brand-aware borders for consistency.
- Keep layout values within the established design system.

## Build Requirements
- Run `pnpm run build` after each implementation.
- Fix all compile errors and warnings before marking work complete.
- The build must pass consistently after each phase.

## Changelog Updates
- Maintain a changelog for major project changes.
- Record phase completions, bug fixes, and structural updates.
- Keep entries concise and informative.

## Roadmap Updates
- Update the roadmap only when a phase is completed or a new phase is approved.
- Do not change the roadmap mid-phase unless required by user direction.
- Ensure the roadmap reflects current progress accurately.

## Commit Policy
- Use clear, descriptive commit messages.
- Prefer phase-specific commit descriptions like `Phase 3.2: add statistics section`.
- Keep commits small and focused.
- Do not combine unrelated changes in a single commit.

## Code Quality Rules
- Keep code clean, readable, and reusable.
- Remove dead code and unnecessary duplication.
- Use consistent naming conventions.
- Keep component structure modular and maintainable.
- Prioritize accessibility and responsive behavior.
