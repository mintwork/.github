<p>
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/mintwork/.github/main/brand/lockup/mintwork-lockup-dark.png">
    <img alt="mintwork" src="https://raw.githubusercontent.com/mintwork/.github/main/brand/lockup/mintwork-lockup-light.png" height="56">
  </picture>
</p>

**Developer tools in mint condition.** Small, focused, open-source tools that each do one job well — local-first, and honest about what they measure.

```bash
npx @mintwork/honest-tests audit .     # find tests that can't fail
npx @mintwork/wcag-audit-skill scan .  # audit your UI against WCAG 2.2
npx @mintwork/agent-ready              # score your repo for coding agents
npx @mintwork/tokenscope               # find the tokens your AI agent wasted
```

| Tool | What it does |
|:--|:--|
| [**honest&#8209;tests**](https://github.com/mintwork/honest-tests) | Finds tests that can't fail, and proves it by mutating your code. Agent skill + CLI for JS/TS. |
| [**wcag&#8209;audit&#8209;skill**](https://github.com/mintwork/wcag-audit-skill) | Accessibility audits in phases: source scan, real-browser scan, verified findings, SARIF. |
| [**agent&#8209;ready**](https://github.com/mintwork/agent-ready) | Scores how well coding agents can work in your repo (0–100), and fixes the gaps. |
| [**tokenscope**](https://github.com/mintwork/tokenscope) | Shows where your AI coding agent wasted tokens and money, with a fix for each finding. |

<sub>Every package is published from GitHub Actions with <a href="https://docs.npmjs.com/generating-provenance-statements">npm provenance</a>. Issues and pull requests welcome.</sub>
