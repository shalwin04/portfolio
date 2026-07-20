# Shalwin Sanju — Portfolio Site Brief
*Handoff doc for build. Written after a design-ideation pass — theme, structure, and content are locked; implementation details are open for the builder's judgment unless marked "fixed."*

---

## 1. Concept in one line

A cyberpunk / stylized-anime WebGL portfolio where a persistent 3D character companion reacts as you scroll, and each project spawns its own small "agent" — because the person building it builds actual multi-agent AI systems for a living. The site should *demonstrate* agentic thinking, not just describe it.

## 2. Reference & inspiration

- **Structural/tone reference:** [bepatrickdavid.com](https://bepatrickdavid.com/) — steal the confidence, not the layout. One clear identity line, no hedging copy ("Designer/developer" energy — ours should be "AI Engineer. I build agents that ship."). Full-bleed project case studies instead of card grids. A stats strip up top. Playful micro-copy in small doses.
- **Visual/theme reference:** cyberpunk game + anime aesthetic — dark void backgrounds, neon grid lines, glowing UI elements, HUD-style overlays.

## 3. Visual theme — FIXED

| Element | Spec |
|---|---|
| Background | Near-black void (`#0a0a0f` or similar) |
| Grid | Thin glowing lines, perspective floor grid in hero, subtle throughout scroll |
| Primary accent | Cyan / electric blue (`#00e5ff`–`#2dd4ff` range) |
| Secondary accents | One distinct color per project (see §6) for that project's orb/section glow |
| Typography | Bold, confident, monospace or techno-grotesk for headings; clean sans for body. Avoid anything that reads as generic "SaaS" |
| Motion language | Light traveling along connection lines, pulse/glow on hover, camera drift, not gratuous — motion should always tie back to "data/signal moving through a system" |

## 4. The 3D character — HUD companion

- **Style:** stylized anime-cyberpunk (NOT gritty-realistic — cheaper to render well at low-poly, more personality, avoids "asset flip" look).
- **Behavior:** persistent, not hero-only. Lives as a fixed HUD-style companion (e.g. corner-docked or center-hero that relocates/shrinks on scroll). Idle-animates (breathing/blink loop from rig). Glances or turns toward the section currently in view.
- **Sourcing constraint (important):** Do NOT use characters tied to specific franchises (no Cyberpunk 2077's V, no "Lucy" from Cyberpunk Edgerunners, no Ghost in the Shell characters, etc.) — these are copyrighted IP and using their likeness is an infringement risk even if a re-uploaded 3D file claims a permissive license. Only use models that are original character designs.
- **Actual candidate assets found (Sketchfab, CC Attribution — usable with credit):**
  - ["Low Poly Cyberpunk Character"](https://sketchfab.com/3d-models/low-poly-cyberpunk-character-bc90cc075af44f4aa2d6d32086214ab4) — 7.9k tris, original D&D-inspired cyberpunk design, light enough for web.
  - ["LowPoly Anime Character CyberStyle"](https://sketchfab.com/3d-models/lowpoly-anime-character-cyberstyle-9c284506f1e247348acd0de4151974d6) — rigged, game-ready, anime-cyberpunk look, original character (not tied to a franchise despite genshin/zzz tags being used loosely by uploader — verify tags don't imply it's a copy of a specific character before using).
  - Browse more at [Sketchfab's cyberpunk tag](https://sketchfab.com/tags/cyberpunk), filter by CC license.
- **License requirement:** CC Attribution models require a visible credit — small "3D model by [creator], CC-BY" line in the site footer/credits section (same pattern bepatrickdavid.com used for their Sketchfab head model).
- **Fallback option:** if licensing/rigging original assets proves too slow, commission an original low-poly character (Fiverr/ArtStation freelancer) or generate one via a 3D-capable AI tool, ensuring full ownership.

## 5. Per-project "agent avatars"

Each project section spawns a small **geometric orb/drone** (not a full character — keeps poly count sane), colored in that project's accent. This is the site enacting its own subject matter: agent orchestration.

For **AegisOps** specifically, use four labeled orbs matching the real architecture: **Healer, Sentinel, Correlator, Architect** (see §6 for what each does — pull directly from the project's real agent roles, don't invent new ones).

## 6. Site structure & content

### Hero
- Name: **Shalwin Sanju**
- Line: *AI Engineer. I build agents that ship.* (or similar — confident, no hedging)
- 3D character companion + neon grid floor
- Optional stats strip: e.g. "$7,500 hackathon win · 4 shipped agent platforms · MCP servers in production"

### About / Summary
Pull from resume: Associate Software Engineer & CS graduate, experience in AI agentic development, full-stack engineering, cloud-native systems. Skilled in React, Node.js, Express, Supabase. Hands-on with agentic AI, RAG, multi-agent architectures via LangChain/LangGraph. Hackathon-proven.

### Experience (brief, resume has full detail — site can summarize)
- **Generative AI Engineer — Cprime (GSK Client)**, Aug–Dec 2025: agentic AI for bio-statistics workflows, MCP server integration, autonomous dev/deploy tooling.
- **Associate Software Engineer — Cprime**, Aug 2025–Present: AI Sales Assistant (call prep, RFP generation, PPT automation), PCSAT Platform (AI-driven customer satisfaction analysis).

### Projects (full-bleed case-study sections, in this order)

1. **AegisOps — Multi-Agent SecOps Platform**
   - [github.com/shalwin04/aegis-ops](https://github.com/shalwin04/aegis-ops)
   - Built for Splunk Agentic Ops Hackathon 2026
   - Unifies Security, Observability, and Platform ops over Splunk's MCP Server
   - Four agents (map to the four orb avatars):
     - **Healer** (Observability) — `splunk_run_query` for APM traces, latency analysis
     - **Sentinel** (Security) — `splunk_get_indexes`, firewall/auth log correlation
     - **Correlator** (Synthesis) — merges findings, determines severity, uses `saia_explain_spl`
     - **Architect** (Platform/DX) — generates remediation + code fixes via `saia_generate_spl`
   - Autonomous execution (WAF rules, alerts) with human-in-the-loop only on code merges (GitHub PR)
   - Tech: LangGraph JS, Node.js/TypeScript, Claude, Splunk MCP, React

2. **Agentic CI/CD**
   - [git-lab-cicd-agent.vercel.app](https://git-lab-cicd-agent.vercel.app/) · [repo](https://github.com/shalwin04/GitLab-CICD-Agent)
   - Multi-agent CI/CD automation on a GitLab MCP server — natural language triggers complex GitLab workflows
   - **2nd place ($7,500) — Google Cloud's "AI in Action" Hackathon, GitLab Track**
   - Tech: ReactJS, LangGraph JS, GitLab MCP, GCP, Kubernetes

3. **Analytics Copilot**
   - [ai-insights-copilot.vercel.app](https://ai-insights-copilot.vercel.app/)
   - Agentic analytics system: ElasticSearch + Vertex AI + LangChain for hybrid retrieval, conversational data exploration over Tableau-style dashboards
   - Tech: LangChain JS, LangGraph, Vertex AI, ElasticSearch, GCP

4. **EmoWell — Multi-Agent Mental Health Companion**
   - [github.com/shalwin04/EmoWell-BackEnd](https://github.com/shalwin04/EmoWell-BackEnd)
   - Supervisor agent orchestrating Therapy, Journal, Emergency Support, and Blogs agents for empathetic, context-aware conversations
   - Tech: LangGraph, LangChain JS, Google Generative AI, React

### Education / Credentials
- B.E. Computer Science, Loyola-ICAM College of Engineering and Technology (CGPA 8.32)
- Notion Service Specialist Certified · Notion Technical Specialist Certified · Atlassian Accreditation (ROVO Fundamentals)

### Contact / Footer
- Email: shalwinsanju.25cs@licet.ac.in
- [GitHub](https://github.com/shalwin04) · [LinkedIn](https://www.linkedin.com/in/shalwin-sanju/) · @shalwin04
- 3D asset credits (CC-BY attribution per §4)

## 7. Suggested tech stack

- **Framework:** React (Vite) or Next.js
- **3D/WebGL:** Three.js via `react-three-fiber` + `@react-three/drei` (helpers for GLTF loading, orbit controls, etc.)
- **Model format:** glTF/GLB, Draco-compressed for load performance
- **Scroll-driven animation:** GSAP + ScrollTrigger, or Framer Motion for simpler transitions
- **Styling:** TailwindCSS (matches Shalwin's existing stack) with custom CSS vars for the neon/grid theme
- **Hosting:** Vercel (matches existing project deployments)

## 8. Performance notes (flag for builder)

- Rigged WebGL characters are the heaviest asset class for a portfolio site — budget real time for:
  - GLTF/Draco compression
  - Lazy-loading the model after first paint (don't block LCP)
  - LOD or a static poster-frame fallback for low-end devices/mobile
  - Testing actual load time on throttled 4G, not just localhost
- Consider a "reduced motion" / lite mode for accessibility and low-power devices (respect `prefers-reduced-motion`).

## 9. Open decisions (not yet locked — builder or Shalwin to decide during build)

- Exact copy/tagline wording for hero and about section
- Whether hero character is center-stage or corner-docked by default
- Exact color values per project (currently just "distinct accent per project," not yet assigned)
- Whether to build a live "ask my portfolio" chat agent (raised earlier in ideation as a high-leverage idea, not yet committed to)
- Mobile behavior for the 3D character (full 3D vs. static image fallback on small/low-power devices)

## 10. Explicitly ruled out

- Any use of copyrighted characters/franchises (Cyberpunk 2077, Cyberpunk Edgerunners, Ghost in the Shell, etc.) as the 3D character or visual reference — original/CC-licensed assets only, with attribution.
