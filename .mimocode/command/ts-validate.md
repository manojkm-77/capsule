---
description: "Run TypeScript typecheck + build validation for the current project. Use when the user says 'validate', 'typecheck', 'check types', 'build check', 'ts check', 'verify build', or before committing TypeScript changes. Runs npx tsc --noEmit then npm run build, reports errors, and suggests fixes."
agent: main
---

# TypeScript Validation

Run a full TypeScript validation cycle for the current project.

## Steps

1. **Detect project type** — check for `next.config.ts`, `vite.config.ts`, or `tsconfig.json` in the working directory to determine the build tool.

2. **Typecheck** — run `npx tsc --noEmit` from the project root.
   - If it passes (exit 0): report "Typecheck: PASS" and proceed to step 3.
   - If it fails: report each error with file path, line number, and message. Then **stop** — do not proceed to build until types are clean.

3. **Build** — run `npm run build` from the project root.
   - If it passes: report "Build: PASS" with output size summary.
   - If it fails: report each error with context.

4. **Report** — summarize results:
   - Typecheck: PASS/FAIL (N errors)
   - Build: PASS/FAIL (N errors)
   - If both pass: "All clear — safe to commit."
   - If either fails: list the top 3 errors with file:line and a suggested fix approach.

## Notes

- On Windows (PowerShell), use `npx tsc --noEmit 2>&1` to capture stderr.
- For Next.js projects, `npm run build` also runs typecheck internally, but running `tsc --noEmit` first gives faster, cleaner error output.
- For monorepos (apps/*), detect the nearest `package.json` and run from there. If `$ARGUMENTS` specifies a subdirectory (e.g., `apps/rider`), use that as the working directory.
