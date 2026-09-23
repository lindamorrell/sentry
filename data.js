window.SKILLFORGE_DATA = {
 "generated": "2026-09-23",
 "totals": {
  "repos": 21,
  "tools_verified": 14,
  "blocked": 7,
  "skills_total": 532,
  "skills_from_repos": 473,
  "categories": 20,
  "status_counts": {
   "installed": 14,
   "skipped": 5,
   "present": 1,
   "failed": 1
  }
 },
 "categories": [
  {
   "name": "ecc",
   "count": 287
  },
  {
   "name": "video",
   "count": 111
  },
  {
   "name": "productivity",
   "count": 16
  },
  {
   "name": "media",
   "count": 15
  },
  {
   "name": "software-development",
   "count": 15
  },
  {
   "name": "social-media",
   "count": 14
  },
  {
   "name": "autonomous-ai-agents",
   "count": 12
  },
  {
   "name": "octop",
   "count": 12
  },
  {
   "name": "creative",
   "count": 11
  },
  {
   "name": "seo",
   "count": 11
  },
  {
   "name": "browser-agents",
   "count": 9
  },
  {
   "name": "apple",
   "count": 4
  },
  {
   "name": "research",
   "count": 4
  },
  {
   "name": "frontend",
   "count": 3
  },
  {
   "name": "email",
   "count": 2
  },
  {
   "name": "web",
   "count": 2
  },
  {
   "name": "devops",
   "count": 1
  },
  {
   "name": "note-taking",
   "count": 1
  },
  {
   "name": "mobile",
   "count": 1
  },
  {
   "name": "agent-ops",
   "count": 1
  }
 ],
 "repos": [
  {
   "repo": "ecc",
   "url": "https://github.com/affaan-m/ECC",
   "status": "installed",
   "skill_count": 291,
   "blurb": "A 287-skill harness operating system: rules, hooks, commands and patterns for coding agents.",
   "blocker": ""
  },
  {
   "repo": "openmontage",
   "url": "https://github.com/calesthio/OpenMontage",
   "status": "installed",
   "skill_count": 89,
   "blurb": "Programmatic video montage: 24 providers, pipelines and a large agent skill set for media work.",
   "blocker": ""
  },
  {
   "repo": "hyperframes",
   "url": "https://github.com/heygen-com/hyperframes",
   "status": "installed",
   "skill_count": 21,
   "blurb": "Write HTML, CSS and seekable animation, get a deterministic MP4. The engine behind the film on this page.",
   "blocker": ""
  },
  {
   "repo": "linkedin-skills",
   "url": "https://github.com/sergebulaev/linkedin-skills",
   "status": "installed",
   "skill_count": 13,
   "blurb": "A LinkedIn marketing suite: post writing, hooks, repurposing, engagement and profile work, with a tested Python library.",
   "blocker": ""
  },
  {
   "repo": "octop",
   "url": "https://github.com/TencentCloud/Octop",
   "status": "installed",
   "skill_count": 12,
   "blurb": "A self-hosted AI assistant platform with an expert-agent library and a plugin surface.",
   "blocker": ""
  },
  {
   "repo": "youtube-skills",
   "url": "https://github.com/ZeroPointRepo/youtube-skills",
   "status": "skipped",
   "skill_count": 12,
   "blurb": "Twelve skills for pull-based YouTube work — transcripts, search, channels, playlists.",
   "blocker": "No installable tool exists: repo has no package.json/pyproject/console script, and neither 'youtube-skills' nor 'transcriptapi' is published on npm (E404) or PyPI ('transcriptapi' 404). The runtime dependency is a hosted"
  },
  {
   "repo": "open-seo",
   "url": "https://github.com/every-app/open-seo",
   "status": "skipped",
   "skill_count": 11,
   "blurb": "An SEO workspace: keyword research, clustering, audits and reporting skills for an agent.",
   "blocker": "No installable CLI: package.json private:true with bin:null, name 'open-seo' absent from the npm registry (E404), and the runtime targets are pnpm + wrangler/Cloudflare Workers (pnpm and wrangler unavailable in this sand"
  },
  {
   "repo": "orca",
   "url": "https://github.com/stablyai/orca",
   "status": "skipped",
   "skill_count": 7,
   "blurb": "A multi-agent orchestration workbench with emulators, tickets and per-workspace environments.",
   "blocker": "pnpm/electron unavailable — pnpm is not installed (not installable per sandbox contract), so the pnpm workspace/Electron build that produces out/cli/index.js cannot run; and there is no npm-published CLI for this repo (n"
  },
  {
   "repo": "browser-use",
   "url": "https://github.com/browser-use/browser-use",
   "status": "installed",
   "skill_count": 6,
   "blurb": "The open-source AI browser agent — Python and TypeScript, drives a real browser end to end.",
   "blocker": ""
  },
  {
   "repo": "browser-harness",
   "url": "https://github.com/browser-use/browser-harness",
   "status": "installed",
   "skill_count": 1,
   "blurb": "One editable CDP websocket into your real browser; the agent writes missing helpers as it works.",
   "blocker": ""
  },
  {
   "repo": "browserskill",
   "url": "https://github.com/Tencent/BrowserSkill",
   "status": "installed",
   "skill_count": 1,
   "blurb": "Borrows the tab you are already logged into, in a separate agent window, and hands it back.",
   "blocker": ""
  },
  {
   "repo": "defuddle",
   "url": "https://github.com/kepano/defuddle",
   "status": "installed",
   "skill_count": 1,
   "blurb": "Strips a web page down to its actual article content — clean HTML or a tight file of markdown.",
   "blocker": ""
  },
  {
   "repo": "freellmapi",
   "url": "https://github.com/tashfeenahmed/freellmapi",
   "status": "installed",
   "skill_count": 1,
   "blurb": "Aggregates dozens of free provider tiers behind one OpenAI-compatible endpoint with failover.",
   "blocker": "No inference without provider keys: POST /v1/chat/completions returned HTTP 503 {\"type\":\"service_unavailable\",\"code\":\"no_providers_configured\",\"message\":\"No candidate model has a configured, usable provider key... 312 mo"
  },
  {
   "repo": "i-have-adhd",
   "url": "https://github.com/ayghri/i-have-adhd",
   "status": "installed",
   "skill_count": 1,
   "blurb": "An output-style skill that forces the answer to the top, numbered and unburies the next action.",
   "blocker": ""
  },
  {
   "repo": "humanizer",
   "url": "https://github.com/blader/humanizer",
   "status": "present",
   "skill_count": 1,
   "blurb": "Rewrites machine-sounding prose into something a person would actually say.",
   "blocker": "Not a missing install: the library already shipped a prose humaniser, so a second copy was deliberately skipped rather than duplicated."
  },
  {
   "repo": "make-interfaces-feel-better",
   "url": "https://github.com/jakubkrehel/make-interfaces-feel-better",
   "status": "skipped",
   "skill_count": 1,
   "blurb": "Micro-interaction craft: the small motion and surface rules that make interfaces feel responsive.",
   "blocker": "skill-only repo"
  },
  {
   "repo": "minions",
   "url": "https://github.com/agent37-platform/minions",
   "status": "installed",
   "skill_count": 1,
   "blurb": "Mission control for Hermes Agent — a kanban board, review queue and scheduler for agent work.",
   "blocker": ""
  },
  {
   "repo": "skillclaw",
   "url": "https://github.com/AMAP-ML/SkillClaw",
   "status": "installed",
   "skill_count": 1,
   "blurb": "Collective skill evolution: it indexes a skill library, dedupes it and evolves skills from real sessions.",
   "blocker": ""
  },
  {
   "repo": "video-use",
   "url": "https://github.com/browser-use/video-use",
   "status": "installed",
   "skill_count": 1,
   "blurb": "Transcribe, pack, render and grade — a small ffmpeg-native toolkit for working with footage.",
   "blocker": ""
  },
  {
   "repo": "vphone-cli",
   "url": "https://github.com/Lakr233/vphone-cli",
   "status": "skipped",
   "skill_count": 1,
   "blurb": "A virtual-iPhone research toolkit in Swift, aimed at kernel analysis of Apple firmware.",
   "blocker": "vphone-cli itself is macOS-only: Package.swift targets macOS 15+ on Apple Silicon and links Apple Virtualization.framework with private PV=3 entitlements; the README install path is 'brew install zqxwce/tap/vphone-cli' a"
  },
  {
   "repo": "windows-harness",
   "url": "https://github.com/browser-use/windows-harness",
   "status": "failed",
   "skill_count": 1,
   "blurb": "Same harness idea for Windows desktop automation (win32-bound, so Linux can only read it).",
   "blocker": "Windows-only runtime: pywin32 has no wheel for any Linux platform tag, and windows_harness.capture imports Windows ctypes (WinDLL) at package import time, so neither `uv tool install windows-harness` nor a --no-deps edit"
  }
 ]
};
