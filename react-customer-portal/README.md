# React Customer Portal

Run:
```bash
npm install
npm run dev
```
Open the URL shown in your terminal, then add `?mode=broken` or `?mode=fixed`.

## Defect map
| Area | Broken behavior | Fixed behavior | WCAG 2.2 criteria to study |
|---|---|---|---|
| Email field | Visible text not associated with input | `<label for>` association | 1.3.1, 3.3.2 |
| Invalid email | Error lacks alert semantics | Error linked via `aria-describedby` and announced | 3.3.1, 4.1.3 |
| Account tool | Clickable `div` not keyboard operable | Native `button` | 2.1.1, 4.1.2 |
| Dialog | No dialog semantics/focus management | Dialog role, initial focus, focus containment, Escape, focus restoration | 2.1.1, 2.4.3, 4.1.2 |
| Invoice table | Headers implemented as data cells | `<th scope="col">` | 1.3.1 |
| Save status | Silent dynamic status | `role=status` | 4.1.3 |

Note: The email example uses a deliberately simplified validation rule for teaching; production validation needs a robust specification.
