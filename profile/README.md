# mintwork

**Developer tools in mint condition.** Small, focused tools that each do one job well: open source, local-first, and honest about what they measure.

| Tool | What it does | Try it |
|---|---|---|
| [**honest-tests**](https://github.com/mintwork/honest-tests) | Finds tests that can't fail, then proves it by mutating your code. An agent skill plus a CLI for JS/TS. | `npx @mintwork/honest-tests audit .` |
| [**wcag-audit-skill**](https://github.com/mintwork/wcag-audit-skill) | WCAG 2.2 accessibility audits: static source scan, real-browser scan, verified findings, SARIF for code scanning. | `npx @mintwork/wcag-audit-skill scan src/` |
| [**agent-ready**](https://github.com/mintwork/agent-ready) | Scores how well coding agents can work in your repo (0–100) and fixes the gaps. | `npx @mintwork/agent-ready` |
| [**tokenscope**](https://github.com/mintwork/tokenscope) | Shows where your AI coding agent wasted tokens and money, with a fix for each finding. | `npx @mintwork/tokenscope` |

Every package is published from GitHub Actions with [npm provenance](https://docs.npmjs.com/generating-provenance-statements).
Issues and pull requests are welcome on each repo.
