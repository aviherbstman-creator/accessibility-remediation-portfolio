# Accessibility Remediation Portfolio Lab

Two self-contained practice projects with **intentionally inaccessible** and **remediated** versions. These are educational examples, not evidence of full WCAG conformance.

## Projects
1. `react-customer-portal/` — React + Vite customer portal
2. `aspnet-invoice-portal/` — ASP.NET Core Razor Pages invoice portal

Each has a `?mode=broken` and `?mode=fixed` view so you can compare behavior. **Never deploy broken mode for actual customers.**

## Learning workflow
1. Run each app and inspect broken mode using keyboard-only navigation, axe DevTools, and NVDA.
2. Write down each defect, reproduction steps, expected behavior, and relevant WCAG success criteria.
3. Switch to fixed mode, inspect the source, and verify the behavior manually.
4. Make your own pull request containing a defect log, screenshots, and before/after notes.
5. Repeat with your own implementation without looking at the fixed example.

## Suggested portfolio evidence
- Issue ID; affected component; steps to reproduce
- WCAG 2.2 success criterion (verify applicability against the normative text)
- Before/after code diff
- Automated findings plus manual keyboard/NVDA test notes
- Residual risks and scope limitations

## Test checklist
- Tab and Shift+Tab through all controls
- Enter/Space to activate controls
- Escape to close dialogs and restore focus
- Check focus visibility and logical order
- Submit invalid forms and confirm error announcements
- Confirm labels, table headers, and status announcements in NVDA
- Test 200% zoom and narrow viewport
- Run axe on both modes and compare results

## References
- https://www.w3.org/TR/WCAG22/
- https://www.w3.org/WAI/test-evaluate/
- https://www.deque.com/axe/devtools/
- https://www.nvaccess.org/download/

## Environment
React: Node 20+ and npm.
ASP.NET: .NET 8 SDK (not included; install locally).
No accounts or external services are required at runtime.
