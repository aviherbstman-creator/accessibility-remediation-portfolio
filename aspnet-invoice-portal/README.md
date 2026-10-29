# ASP.NET Core Invoice Accessibility Lab

Requires .NET 8 SDK.

```bash
dotnet restore
dotnet run
```

Open the localhost URL printed by `dotnet run`, then use `?mode=broken` and `?mode=fixed`.

## Defect map
| Area | Broken | Fixed | WCAG criteria to investigate |
|---|---|---|---|
| Email input | No associated label | Razor label tag helper | 1.3.1, 3.3.2 |
| Validation | Error not reliably announced or linked | Validation span + `aria-describedby` | 3.3.1, 4.1.3 |
| Invoice table | Data cells used for headers | Column header cells | 1.3.1 |
| Generate action | Mouse-only div | Native button | 2.1.1, 4.1.2 |
| Status update | Unannounced dynamic update | Live status region | 4.1.3 |

## Notes
- No database, emails, or payments are actually processed.
- The ASP.NET Core runtime is not installed in the build environment used to package this sample; run and verify locally.
- The intentionally broken version is a training fixture only.
