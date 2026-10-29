# React Customer Portal — Accessibility Test Results

**Project:** Accessibility Remediation Portfolio / React Customer Portal  
**Assessment type:** Source-code review and proposed manual test plan  
**Date prepared:** 2026-10-29  
**Target:** WCAG 2.2 Level AA (selected criteria only)  
**Overall status:** **Preliminary — manual verification pending**

> **Important:** This report is based on inspection of the practice application's supplied source code. No browser automation, axe DevTools scan, NVDA session, or keyboard-only test has been executed as part of this report. The statuses below are not claims of verified conformance. The application intentionally exposes a broken mode for educational comparison.

## Executive summary

Five representative accessibility issues were identified in the intentionally broken React sample through source-code inspection. The fixed-mode source contains corresponding remediation patterns. Their effectiveness must be validated in a running browser, including assistive-technology checks.

**Source-review findings:** 5  
**Implemented remediation patterns:** 5  
**Manual verification completed:** 0  
**Confirmed WCAG conformance:** Not determined

## Findings matrix

| ID | Area | Preliminary severity | Relevant WCAG 2.2 SC | Broken-mode source observation | Fixed-mode source observation | Status |
|---|---|---|---|---|---|---|
| A11Y-001 | Form labels | High | 1.3.1, 3.3.2 | Visible `<span>` is not associated with input | `<label htmlFor="email">` and matching `id` | Fix present in source; test pending |
| A11Y-002 | Keyboard operation | High | 2.1.1, 4.1.2 | Clickable `<div>` lacks native keyboard interaction | Native `<button>` used | Fix present in source; test pending |
| A11Y-003 | Dialog focus management | High | 2.1.1, 2.4.3, 4.1.2 | Popup lacks dialog semantics and focus handling | Dialog role, label, focus trapping, Escape and focus restoration logic | Fix present in source; test pending |
| A11Y-004 | Error identification | Medium | 3.3.1, 3.3.2; consider 4.1.3 | Error text not programmatically linked or announced | `aria-invalid`, `aria-describedby`, `role="alert"` | Fix present in source; test pending |
| A11Y-005 | Status messages | Medium | 4.1.3 | Dynamic success message lacks status semantics | `role="status"` with live region | Fix present in source; test pending |

**Severity** is an illustrative triage judgment, not a formal risk rating or an assessment of a production system. WCAG references should be confirmed against the normative criteria during testing.

## Detailed test procedures and result placeholders

### A11Y-001 — Email field label
**Expected:** A screen reader announces “Email address” when the input receives focus.

1. Open `?demo=1&mode=broken`; Tab to the email field and record its accessible name.
2. Repeat with `?demo=1&mode=fixed`.
3. In NVDA, record the announced name, role, and state.

**Source review:** Remediation pattern present.  
**Keyboard result:** Not tested.  
**NVDA result:** Not tested.  
**axe result:** Not tested.  
**Evidence to add:** Screenshot or copied accessibility-tree output and dated NVDA observation.

### A11Y-002 — Account details control
**Expected:** The fixed-mode button is reachable with Tab and activates using Enter and Space.

1. Use keyboard only in both modes.
2. Record whether focus reaches the control and whether activation opens the dialog.
3. Check the role and accessible name in the accessibility tree.

**Source review:** Remediation pattern present.  
**Keyboard result:** Not tested.  
**NVDA result:** Not tested.  
**axe result:** Not tested.

### A11Y-003 — Modal dialog
**Expected:** Focus enters the dialog, stays inside while open, Escape closes it, and focus returns to the original trigger.

1. Open the fixed-mode dialog with the keyboard.
2. Record the initially focused element.
3. Press Tab and Shift+Tab repeatedly.
4. Press Escape and verify focus restoration.
5. Check dialog name and modal semantics using NVDA.

**Source review:** Focus-management logic present.  
**Keyboard result:** Not tested.  
**NVDA result:** Not tested.  
**axe result:** Not tested.  
**Caution:** The demonstration uses a simplified focus trap; a production dialog should also consider background inertness and broader focusable-element cases.

### A11Y-004 — Validation feedback
**Expected:** Invalid email submission identifies the field error, associates it with the input, and announces it.

1. Leave the email empty or enter a malformed value.
2. Submit in both modes.
3. Record the visible message, `aria-invalid` state, described-by association, and announcement.
4. Repeat submission and note whether the announcement is repeated.

**Source review:** Error association and alert semantics present.  
**Keyboard result:** Not tested.  
**NVDA result:** Not tested.  
**axe result:** Not tested.

### A11Y-005 — Save status message
**Expected:** After successful submission, a screen reader announces the updated status without unexpected focus movement.

1. Enter a valid email address in fixed mode.
2. Submit using the keyboard.
3. Record whether NVDA announces the status message.
4. Confirm focus remains in a logical location.

**Source review:** Status region present.  
**Keyboard result:** Not tested.  
**NVDA result:** Not tested.  
**axe result:** Not tested.

## Manual test execution log

Fill in this table only after executing the test.

| Date | Test ID | Mode | Browser / version | OS | Assistive technology / version | Actual result | Pass / Fail / Blocked | Evidence link |
|---|---|---|---|---|---|---|---|---|
| — | A11Y-001 | Fixed | — | — | — | Not yet executed | Not tested | — |
| — | A11Y-002 | Fixed | — | — | — | Not yet executed | Not tested | — |
| — | A11Y-003 | Fixed | — | — | — | Not yet executed | Not tested | — |
| — | A11Y-004 | Fixed | — | — | — | Not yet executed | Not tested | — |
| — | A11Y-005 | Fixed | — | — | — | Not yet executed | Not tested | — |

## Recommended tools

- [axe DevTools](https://www.deque.com/axe/devtools/) — automated rule checks
- [NVDA](https://www.nvaccess.org/download/) — Windows screen reader
- Keyboard-only navigation — Tab, Shift+Tab, Enter, Space, Escape
- Browser developer tools — accessibility tree and computed names

**Note:** NVDA is a Windows screen reader. On macOS, VoiceOver can be used as an additional test environment, but VoiceOver observations should not be labeled as NVDA results.

## Acceptance and limitations

This exercise samples five issue categories; it is not a full WCAG audit. Automated tools do not establish conformance on their own. Results must be tested in context, with documented browser and assistive technology versions. A finding should be marked **Verified fixed** only after the specified checks pass and evidence is recorded.

**Next steps:** Execute each test, populate the log, attach evidence, and update the case study with confirmed outcomes.
