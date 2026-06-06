# Security Policy

## Supported Versions

| Version | Supported |
| --- | --- |
| 5.x (latest) | Yes |
| < 5.0 | No |

Only the latest release on the `main` branch receives security updates.

---

## Reporting a Vulnerability

**Do not** open a public issue for security vulnerabilities.

To report a vulnerability privately:

1. Use [GitHub Security Advisories](https://github.com/NatsumeAoii/Aetheris-CharGen/security/advisories/new) to create a private report.
2. Alternatively, contact the maintainer through their [GitHub profile](https://github.com/NatsumeAoii).

Include in your report:
- Description of the vulnerability.
- Steps to reproduce.
- Affected versions (or "latest main" if unsure).
- Potential impact.
- Suggested fix, if you have one.

---

## What to Expect

- **Acknowledgment** within 7 days of receiving the report.
- **Assessment** of severity and impact within 14 days.
- **Fix or mitigation** for confirmed vulnerabilities, released as a patch version.
- **Credit** in the changelog and release notes if you wish (opt-in).

If a report is declined (not a vulnerability, out of scope), you will receive an explanation.

---

## Scope

This project is a **client-side static site** with no backend, database, API keys, user accounts, or stored user data. The primary security surfaces are:

- **Client-side code execution** — XSS via seed/name URL parameters or localStorage injection.
- **Dependency supply chain** — Compromised npm packages.
- **Deployment integrity** — GitHub Pages/CI pipeline compromise.

Out of scope:
- Vulnerabilities in third-party hosted services (GitHub, CDN providers).
- Social engineering attacks against contributors.
- Denial of service against GitHub Pages (report to GitHub directly).

---

## Security Considerations for Deployers

If you fork and host this project:

- The app reads `seed` and `name` from URL parameters. These are sanitized before use, but review `src/lib/characterInput.ts` if you modify input handling.
- localStorage data (`aetheris-preferences`, `aetheris-history`) is never sent to any server.
- No cookies, sessions, or authentication exist in the base project.
- External resources loaded: Google Fonts (Cinzel, Inter). If CSP is required, allowlist `fonts.googleapis.com` and `fonts.gstatic.com`.
- The app does not make any API calls or outbound network requests beyond font loading.

---

## Disclosure Policy

- Confirmed vulnerabilities are fixed before public disclosure.
- A minimum 90-day disclosure window is provided to the maintainer before public disclosure by the reporter.
- Coordinated disclosure is preferred. If you wish to publish a write-up, please coordinate timing.
