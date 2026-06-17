# Claude Code invocation

```bash
claude --model claude-opus-4-8
```

Then inside the session, paste this entire prompt:

---

/remotion-best-practices

Create a new Remotion composition `LocalesyLaunchV2` (1920×1080, 30fps, 1650 frames / ~55s) in this existing project. Register it in `src/Root.tsx` alongside the existing compositions. Create `src/compositions/LocalesyLaunchV2.tsx` and one scene file per scene in `src/scenes/`. Reuse `GrainOverlay`, `AnimatedText`, animation hooks from `src/animations/index.ts`, and constants from `src/constants.ts`. Do not modify any other existing files.

---

## Brand system — apply everywhere

**Accent**: `#905AF6` (real Localesy purple, from brand SVG).
**Palette**: bg `#030305`, surface `#0c0b10`, surface-raised `#13111a`, border `rgba(255,255,255,0.06)`, border-bright `rgba(255,255,255,0.12)`, text `#ffffff`, muted `rgba(255,255,255,0.60)`, dim `rgba(255,255,255,0.28)`, green `#22c55e`, red `#ef4444`.
**Font**: Load DM Sans via `@remotion/google-fonts/DM_Sans` with weights `["400","500","600","700","800"]` outside each component at file scope. Fall back to Inter if the package key differs.
**Transitions**: all `fade()` + `springTiming({ config: { damping: 200 }, durationInFrames: 14 })`.
**Grain**: `<GrainOverlay opacity={0.032}/>` as the topmost child on every scene.

---

## Shared helpers — create once, import everywhere

**`src/scenes/shared/PurpleWash.tsx`**: An `AbsoluteFill` `pointerEvents:"none"` containing a single `div` with `position:"absolute" inset:0` and `background: "radial-gradient(70% 60% at 50% 42%, rgba(144,90,246,0.11) 0%, transparent 72%)"`. Accept an optional `opacity` prop (default 1) on the outer fill.

**`src/scenes/shared/Vignette.tsx`**: An `AbsoluteFill` `pointerEvents:"none"` with `background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 42%, rgba(0,0,0,0.60) 100%)"`.

**`src/scenes/shared/Badge.tsx`**: Accepts `children`. Renders a centered pill: `display:"inline-flex" alignItems:"center" gap:8 backgroundColor:"rgba(144,90,246,0.10)" border:"1px solid rgba(144,90,246,0.22)" borderRadius:100 padding:"6px 18px"`. A `6×6px` circle `backgroundColor:"#905af6"` on the left. Children in DM Sans `fontSize:12 fontWeight:700 letterSpacing:"3px" color:"#905af6" textTransform:"uppercase"`.

---

## 10 scenes in TransitionSeries

---

### Scene 1 — Hero (`src/scenes/HeroV2Scene.tsx`, 150 frames / 5s)

Background `#030305`. Render `<PurpleWash/>`.

**Badge** springs down from `translateY(-24px)→0` with spring `damping:16 stiffness:90` and fades in over 18 frames, centered, frame 0: `<Badge>Early Access · 1,160+ Teams</Badge>`.

**Headline block** — three lines centered in DM Sans, all `fontSize:94 fontWeight:800 letterSpacing:"-3.5px" lineHeight:1.05`:

*Line 1* `"Localize your"` color `#ffffff`. Slides up from `translateY(56px)→0` with spring `damping:13 stiffness:85` starting frame 12. Fades in over 16 frames.

*Line 2* — the **cycling word pill**. A `display:"inline-flex" alignItems:"center" justifyContent:"center" borderRadius:"16px" padding:"6px 28px" overflow:"hidden"` container. Background: `linear-gradient(135deg, #a975f8 0%, #905af6 100%)`. Box shadow: `"inset 0 1px 0 0 rgba(255,255,255,0.18), inset 0 0 0 1px rgba(196,162,255,0.16), 0 0 48px rgba(144,90,246,0.30)"`. The active word is selected by `Math.floor((frame - 20) / 26) % 6` (clamped so it only starts at frame 20). Word list: `["Company Website","Figma Designs","Admin Dashboard","Mobile App","Landing Page","CLI Toolkit"]`. Map each word to a fixed target width in px: `{Company Website:352, Figma Designs:310, Admin Dashboard:376, "Mobile App":258, Landing Page:330, CLI Toolkit:264}`. Animate pill width from previous to current target using `spring({ frame: frame - switchFrame, fps, config:{ damping:18, stiffness:90 } })` and `interpolate(progress,[0,1],[prevWidth,targetWidth])`. On word switch, the exiting word fades `opacity:1→0` over 6 frames and the entering word fades `opacity:0→1` over 6 frames offset by 3 frames. Word text: DM Sans `fontSize:94 fontWeight:800 color:"#ffffff" letterSpacing:"-3.5px" whiteSpace:"nowrap"`. Pill slides up from `translateY(56px)→0` spring same config, frame 16.

*Line 3* `"in just minutes."` color `#ffffff`. Same slide-up spring, starting frame 20.

**Subtitle** at frame 62: `"Translation management for fast-moving teams."` DM Sans `fontSize:22 fontWeight:400 color:"rgba(255,255,255,0.62)" letterSpacing:"0.2px"` centered max-width 640px. Fades in over 22 frames, slides from `translateY(18px)→0`.

**Command + CTA row** at frame 78, displayed as `display:"flex" gap:16 justifyContent:"center" alignItems:"center"`:

- Command pill: `width:406px height:56px backgroundColor:"rgba(255,255,255,0.04)" border:"1px solid rgba(255,255,255,0.10)" borderRadius:"14px"` with `display:"flex" alignItems:"center" justifyContent:"space-between" padding:"0 18px"`. Left: `"npx localesy@latest init"` monospace `fontSize:17 fontWeight:500 color:"#905af6"`. Right: a copy icon (two overlapping `12×14px` rounded rect outlines, `stroke:"rgba(255,255,255,0.35)" strokeWidth:1.5`, drawn with inline SVG). Slides up from `translateY(16px)` spring `damping:16 stiffness:100` frame 78.

- CTA button: `width:228px height:56px borderRadius:"14px" background:"linear-gradient(135deg, #a975f8 0%, #905af6 100%)" boxShadow:"0 10px 36px -8px rgba(144,90,246,0.55), inset 0 1px 0 0 rgba(255,255,255,0.18)"`. Text: `"Get started for free"` DM Sans `fontSize:17 fontWeight:700 color:"#ffffff"`. Springs in scale `0.88→1` `damping:13 stiffness:120` frame 84.

**Social proof** at frame 104: `"Join"` + `" 1,160+ others "` (`fontWeight:700 color:"rgba(255,255,255,0.70)"`) + `"on the early access list"` — all `fontSize:14 color:"rgba(255,255,255,0.32)" letterSpacing:"0.3px"` centered. Fades in over 16 frames.

Render `<Vignette/>` then `<GrainOverlay opacity={0.032}/>`.

---

### Scene 2 — Pain (`src/scenes/PainV2Scene.tsx`, 180 frames / 6s)

Background `#030305`. `<PurpleWash/>`.

**Label** frame 0: `"KNOW THAT FEELING?"` `fontSize:12 fontWeight:700 letterSpacing:"5px" color:"rgba(255,255,255,0.22)"` centered, fades in 14 frames.

Three pain **statement blocks**, each centered `maxWidth:860px`, appearing sequentially:

**Block 01** starts frame 18: Numbered label `"01"` `fontSize:12 fontWeight:700 letterSpacing:"4px" color:"#905af6"` fades in 10 frames. Then (6f delay) headline: `"Translations management gives you a headache."` DM Sans `fontSize:44 fontWeight:800 color:"#ffffff" letterSpacing:"-1.5px"` slides up from `translateY(36px)` spring `damping:13 stiffness:80`. Then (8f delay) body: `"Copy-pasting. Reviewing. Filling all empty translations. An unwanted chore you always have to push through."` `fontSize:19 fontWeight:400 color:"rgba(255,255,255,0.52)" lineHeight:1.65` fades in 16 frames.

**Block 02** starts frame 68: same structure. `"02"` in purple. Headline: `"Generated translations feel and sound robotic."`. Body: `"So you pick professional services — which are costly, require extra effort, and push your deadlines even further."`.

**Block 03** starts frame 118: `"03"` in purple. Headline: `"Your team finds even the top tools hard to use."`. Body: `"Extra work, annoyance, slower dev pace — so they leave out the language part to meet deadlines."`.

At frame 152: all three blocks fade out simultaneously over 12 frames (`opacity:1→0 translateY:0→-28px`).

At frame 164: two lines spring in centered:
- `"We felt it many times."` `fontSize:34 fontWeight:400 color:"rgba(255,255,255,0.48)" letterSpacing:"-0.5px"` slides from `translateY(32px)` spring `damping:14 stiffness:90`.
- `"We said no more."` (8f delay) `fontSize:78 fontWeight:800 color:"#905af6" letterSpacing:"-3.5px"` springs from `scale:0.92` and `translateY(40px)`, spring `damping:12 stiffness:100`.

`<Vignette/>` `<GrainOverlay/>`.

---

### Scene 3 — Platform Reveal (`src/scenes/PlatformScene.tsx`, 210 frames / 7s)

Background `#030305`. `<PurpleWash/>`.

**Label + headline** frame 0/14: `"MEET LOCALESY"` `fontSize:12 color:"#905af6" letterSpacing:"5px" fontWeight:700` + headline `"The smart localization platform."` `fontSize:62 fontWeight:800 letterSpacing:"-2.5px"` slides up + subhead `"Designed to help you manage translations effortlessly for all kinds of applications. Just plug and play."` `fontSize:20 color:"rgba(255,255,255,0.55)"` max-width 680px.

**Browser mockup** springs up from `translateY(120px)→0` spring `damping:12 stiffness:75` starting frame 38. `width:1540px borderRadius:"14px" overflow:"hidden" boxShadow:"0 0 0 1px rgba(255,255,255,0.07), 0 60px 120px rgba(0,0,0,0.95), 0 0 0 1px rgba(144,90,246,0.04), 0 0 180px rgba(144,90,246,0.06)"`.

**Mac chrome bar** `height:44px backgroundColor:"#0a0a0f" borderBottom:"1px solid rgba(255,255,255,0.05)"`. Traffic lights (`#FF5F56` `#FFBD2E` `#27C93F` — `12px` circles, `gap:8` at `paddingLeft:18`). Centered URL bar `width:460px height:26px backgroundColor:"rgba(255,255,255,0.04)" borderRadius:"8px"`: `"app.localesy.com"` monospace `fontSize:13 color:"rgba(255,255,255,0.32)"`.

**Dashboard interior** `height:560px backgroundColor:"#07060c" display:"flex"`:

Left sidebar `width:196px borderRight:"1px solid rgba(255,255,255,0.05)" backgroundColor:"rgba(0,0,0,0.25)" padding:"20px 0"`:
- Localesy mark at top: `width:28px height:28px` purple arc icon (two curved div shapes, `backgroundColor:"#905af6" borderRadius:"50%" width/height:28`, use `clip-path:"inset(0 50% 0 0)"` and `clip-path:"inset(0 0 0 50%)"` on two overlapping divs to fake the two-arc logo) + `"Localesy"` `fontSize:15 fontWeight:800 color:"#905af6"` — `display:"flex" alignItems:"center" gap:8 padding:"0 18px 16px"`.
- Nav items (stagger 8f from frame 55): `Dashboard` `Projects` `Translations` (active) `Settings` `Team` — each `height:38px padding:"0 18px" fontSize:14`. Active `Translations`: `backgroundColor:"rgba(144,90,246,0.10)" color:"#905af6" borderLeft:"3px solid #905af6"`. Others: `color:"rgba(255,255,255,0.45)"`.

Main panel `flex:1 padding:"24px"`:
- Header: `"My Projects"` `fontSize:22 fontWeight:700 color:"#ffffff"` + `"+ New"` small button `backgroundColor:"rgba(144,90,246,0.12)" border:"1px solid rgba(144,90,246,0.22)" borderRadius:"8px" padding:"6px 14px" fontSize:13 color:"#905af6" fontWeight:600`.
- Three **project rows** with 18f stagger from frame 62. Each: `height:58px backgroundColor:"rgba(255,255,255,0.02)" borderRadius:"10px" border:"1px solid rgba(255,255,255,0.05)" margin:"4px 0" padding:"0 20px" display:"flex" alignItems:"center" justifyContent:"space-between"`. Left: project name `fontSize:15 fontWeight:600 color:"#fff"` + flag emoji strip `fontSize:18` below `fontSize:12 color:"rgba(255,255,255,0.35)"`. Center: thin progress bar `height:5px width:200px backgroundColor:"rgba(255,255,255,0.06)" borderRadius:"3px"` with filled region `backgroundColor:"#905af6" borderRadius:"3px"` width animating `0→targetPct%` via `interpolate(frame,[startF,startF+40],[0,targetPct],{extrapolateRight:"clamp"})`. Right: percentage label `fontSize:15 fontWeight:700 color:"#905af6"`.
  - Row 1: `"localesy.com"` · `🇺🇸 🇩🇪 🇫🇷 🇯🇵 🇪🇸` · 88%
  - Row 2: `"admin-dashboard"` · `🇺🇸 🇩🇪 🇫🇷` · 62%
  - Row 3: `"mobile-app"` · `🇺🇸 🇯🇵 🇰🇷` · 34%
- Stats row at frame 118: `display:"flex" gap:32 marginTop:24`. Three stat boxes `width:160px padding:"18px 24px" backgroundColor:"rgba(255,255,255,0.02)" borderRadius:"12px" border:"1px solid rgba(255,255,255,0.05)"`. Big number `fontSize:42 fontWeight:800 color:"#905af6"` counting up via `Math.round(interpolate(frame,[118,158],[0,target],{extrapolateRight:"clamp"}))`: `1247` Keys · `6` Languages · `98` `(% AI-filled)`. Muted label `fontSize:13 color:"rgba(255,255,255,0.40)" marginTop:4`.

Scene begins fading to black frame 194 over 16 frames.

`<Vignette/>` `<GrainOverlay/>`.

---

### Scene 4 — AI Translation (`src/scenes/AITranslationScene.tsx`, 180 frames / 6s)

Background `#030305`. `<PurpleWash/>`.

**Label + headline** frame 0/14: `"AI-POWERED LOCALIZATION"` purple label + `"Batch translate with AI in seconds."` `fontSize:58 fontWeight:800 letterSpacing:"-2.5px"` + subhead `"Context-aware, on-brand tone. Auto-fills every missing string."` muted 20px.

**Translation card** `width:1400px borderRadius:"18px" backgroundColor:"rgba(8,8,14,0.92)" border:"1px solid rgba(255,255,255,0.06)" boxShadow:"0 0 0 1px rgba(255,255,255,0.04), 0 40px 90px rgba(0,0,0,0.85)"` springs up from `translateY(90px)` spring `damping:13 stiffness:78` starting frame 38.

**Language tab strip** `height:50px borderBottom:"1px solid rgba(255,255,255,0.06)" display:"flex" alignItems:"center" padding:"0 28px" gap:4`. Tabs: `🇺🇸 EN` `🇩🇪 DE` `🇫🇷 FR` `🇯🇵 JA` `🇪🇸 ES` `🇪🇪 ET`. Active tab at index `Math.floor((frame - 60) / 40) % 6` (clamped, starts frame 60). Active: `color:"#905af6" fontWeight:700 borderBottom:"2px solid #905af6" paddingBottom:"2px"`. Inactive: `color:"rgba(255,255,255,0.35)"`. Tab switch is instant cross-fade (opacity `0→1` over 8 frames). Each tab: `padding:"0 14px" fontSize:14 fontWeight:500 height:"100%" display:"flex" alignItems:"center" gap:6 cursor:"default"`.

**Key-value table** `padding:"0 28px"`. Five rows, each `height:54px borderBottom:"1px solid rgba(255,255,255,0.04)" display:"flex" alignItems:"center" gap:0`. Vertical separator `width:1px height:28px backgroundColor:"rgba(255,255,255,0.06)" margin:"0 32px"`. Row structure:

| Key column `flex:0 0 280px` | Value column `flex:1` |
|---|---|
| monospace `fontSize:13 color:"#905af6" fontWeight:500` | DM Sans `fontSize:15 color:"#ffffff"` |

Keys (appear with 7f stagger from frame 48):
```
hero.headline   |  "Localize anything in just minutes"
nav.pricing     |  "Pricing"
cta.button      |  "Get started for free"
error.required  |  "This field is required"
feature.ai      |  "AI-powered translations"
```

For the value column, reveal translated text character-by-character: 1 char per 1.3 frames, each row offset by 12 frames (`row0` starts frame 60, `row1` frame 72, etc.). The displayed value changes when the active tab switches — cross-fade over 8 frames to the new language's translation (hardcode 6 languages × 5 keys as a constant lookup table: use recognizable short phrases like `"In Minuten lokalisieren"` for DE, `"Commencer gratuitement"` for FR, etc.).

**Status indicator** top-right inside card: spinning `16px` circle `border:"2px solid #905af6" borderTopColor:"transparent" borderRadius:"50%"` with `transform:rotate(${frame * 11 % 360}deg)`. Text `"Translating..."` `fontSize:13 color:"rgba(255,255,255,0.40)"` muted. Visible frames 60–148. Replaced frame 149 by `"✓ Done"` `fontSize:13 fontWeight:700 color:"#22c55e"` fades in over 8 frames.

`<Vignette/>` `<GrainOverlay/>`.

---

### Scene 5 — Clean Locale Files (`src/scenes/CleanFilesScene.tsx`, 150 frames / 5s)

Background `#030305`. `<PurpleWash/>`.

**Label + headline** frame 0/14: `"CLEAN · ORGANIZED · STRUCTURED"` + `"Locale files that stay clean."` `fontSize:58 fontWeight:800` + `"Structured like your codebase — no more wrestling with messy JSON."` muted.

**Two code panels** side by side at frame 38, `gap:28px`, each `width:640px borderRadius:"16px" overflow:"hidden"` springing up from `translateY(80px)` with 20f stagger:

**Left panel** (BEFORE) — `backgroundColor:"rgba(14,6,6,0.95)" border:"1px solid rgba(239,68,68,0.14)"`:
Header: `height:44px backgroundColor:"rgba(239,68,68,0.07)" borderBottom:"1px solid rgba(239,68,68,0.12)" padding:"0 20px" display:"flex" alignItems:"center"` · `"❌  Before Localesy"` DM Sans `fontSize:13 fontWeight:600 color:"#ef4444"`.
Code block `padding:"20px 24px" fontFamily:"monospace" fontSize:14 lineHeight:1.9 color:"rgba(255,255,255,0.70)"`. Lines appear with 4f stagger from frame 44:
```
{
  "hero.title": "",
  "hero.desc":  "",
  "nav.home":   "Home",
  "cta":        "",
  "error.msg":  "",
  "nav.about":  "About Us",
  "hero.cta":   "",
}
```
Empty string `""` instances rendered with `color:"#ef4444"`. Keys rendered `color:"rgba(255,255,255,0.55)"`. Curly braces `color:"rgba(255,255,255,0.30)"`.

**Right panel** (AFTER) — `backgroundColor:"rgba(6,14,8,0.95)" border:"1px solid rgba(34,197,94,0.14)"`:
Header: `"✓  With Localesy"` `color:"#22c55e" backgroundColor:"rgba(34,197,94,0.07)" borderBottom:"1px solid rgba(34,197,94,0.12)"`.
Code block lines appear with 4f stagger from frame 68:
```
{
  // Hero section
  "hero.cta":   "Get started for free",
  "hero.desc":  "Localize in minutes.",
  "hero.title": "Localize anything",

  // Navigation
  "nav.about":  "About Us",
  "nav.home":   "Home",
}
```
Comment lines `color:"rgba(255,255,255,0.28)"`. Keys `color:"#905af6"`. String values `color:"#22c55e"`. Braces `color:"rgba(255,255,255,0.28)"`.

**Three feature pills** centered below both panels, `display:"flex" gap:12 justifyContent:"center" marginTop:24`, appearing with 14f stagger from frame 112. Each: `backgroundColor:"rgba(144,90,246,0.08)" border:"1px solid rgba(144,90,246,0.22)" borderRadius:"100px" padding:"7px 18px" fontSize:13 fontWeight:600 color:"#905af6"`. Pills: `"↕ Sort & group keys"` · `"📦 Export JSON / YAML"` · `"✏️ Rename without breaking"`.

`<Vignette/>` `<GrainOverlay/>`.

---

### Scene 6 — Git Workflow (`src/scenes/GitWorkflowScene.tsx`, 150 frames / 5s)

Background `#030305`. `<PurpleWash/>`.

**Label + headline** frame 0/14: `"GIT-NATIVE"` + `"Fits into your git workflow."` `fontSize:58 fontWeight:800` + `"Translations move with your code — pushes, PRs and merges, all taken care of."` muted.

**Three cards in a horizontal row** at frame 40, centered, `gap:0`, with connecting lines between them:

**Card 1** `width:420px borderRadius:"18px 0 0 18px" backgroundColor:"rgba(8,8,14,0.9)" border:"1px solid rgba(255,255,255,0.06)" borderRight:"none" padding:"32px 28px"`. Slides from `translateX(-90px)→0` spring `damping:14 stiffness:82`. Icon: `48×48px backgroundColor:"rgba(144,90,246,0.11)" border:"1px solid rgba(144,90,246,0.20)" borderRadius:"12px" display:"flex" alignItems:"center" justifyContent:"center"` containing `"⬆"` emoji `fontSize:22`. Title `"git push origin main"` `fontFamily:"monospace" fontSize:15 fontWeight:600 color:"#905af6" marginTop:16`. Body `"Localesy detects your changes automatically on every push."` `fontSize:14 color:"rgba(255,255,255,0.50)" lineHeight:1.6 marginTop:8`. At frame 80: `"✓ 12 new keys found"` `fontSize:14 fontWeight:700 color:"#22c55e"` fades in with `translateY(8px)→0` spring.

**Connector 1→2** `width:60px display:"flex" alignItems:"center" justifyContent:"center" backgroundColor:"rgba(8,8,14,0.9)" border:"1px solid rgba(255,255,255,0.06)" borderLeft:"none" borderRight:"none"`: animated arrow — `"→"` `fontSize:24 color:"rgba(144,90,246,0.50)"` with horizontal `translateX` oscillating `interpolate((frame + 20) % 40, [0,20,40], [-4,4,-4])`.

**Card 2** `width:420px borderRadius:0 backgroundColor:"rgba(8,8,14,0.9)" border:"1px solid rgba(255,255,255,0.06)" borderLeft:"none" borderRight:"none" padding:"32px 28px"`. Slides from `translateY(90px)→0` spring delayed 22f. Icon: `"⚙"` in purple circle. Title `"Diff Engine™"` `fontSize:17 fontWeight:800 color:"#ffffff"`. Body `"Smart conflict resolution — every key tracked, every change versioned."` muted. Diff snippet `marginTop:14 backgroundColor:"rgba(0,0,0,0.35)" borderRadius:"8px" padding:"10px 14px" fontFamily:"monospace" fontSize:12 lineHeight:1.8`:
- `"+ "hero.cta": "Get started""` `color:"#22c55e"` — appears frame 95
- `"- "hero.cta": "Start now""` `color:"#ef4444"` — appears frame 99
Badge `"Smart conflict resolution via Diff Engine™"` `fontSize:11 fontWeight:700 letterSpacing:"2px" color:"#905af6" marginTop:10`.

**Connector 2→3**: same animated arrow.

**Card 3** `width:420px borderRadius:"0 18px 18px 0" backgroundColor:"rgba(8,8,14,0.9)" border:"1px solid rgba(255,255,255,0.06)" borderLeft:"none" padding:"32px 28px"`. Slides from `translateX(90px)→0` delayed 44f. Icon: `"⎇"` (git branch) in purple circle. Title `"#47  feat: update translations"` `fontSize:14 fontWeight:600 color:"#ffffff"`. Badges row `display:"flex" gap:6 marginTop:10 flexWrap:"wrap"`: `"translations"` purple · `"auto-generated"` `backgroundColor:"rgba(255,255,255,0.06)" color:"rgba(255,255,255,0.50)"` · `"✓ merge-ready"` `color:"#22c55e" backgroundColor:"rgba(34,197,94,0.08)"` — each `fontSize:11 fontWeight:700 letterSpacing:"1.5px" borderRadius:"6px" padding:"4px 10px"`. Footer `"2 files changed · +47 −3"` `fontSize:12 color:"rgba(255,255,255,0.35)" marginTop:12`.

**Bottom tagline** at frame 125: `"Auto-sync on push or on demand · Smart conflict resolution · Merge-ready pull requests"` `fontSize:16 color:"rgba(255,255,255,0.40)" letterSpacing:"0.2px"` centered, fades in 16 frames.

`<Vignette/>` `<GrainOverlay/>`.

---

### Scene 7 — Use Cases Bento (`src/scenes/UseCasesBentoScene.tsx`, 180 frames / 6s)

Background `#030305`. `<PurpleWash/>`.

**Label + headline** frame 0/14: `"USE CASES"` purple + `"Translations, off your plate."` `fontSize:62 fontWeight:800 letterSpacing:"-2.5px"` + `"Built for founders and developers who'd rather ship features than let translations become the bottleneck."` muted max-width 700px.

**2×2 bento grid** `width:1280px display:"grid" gridTemplateColumns:"2fr 1fr" gridTemplateRows:"1fr 1fr" gap:"18px"` starting frame 42. Cards spring in with scale `0.90→1` and opacity `0→1`, staggered 22f apart:

Each card shares: `borderRadius:"20px" overflow:"hidden" backgroundColor:"rgba(8,8,14,0.96)" border:"1px solid rgba(255,255,255,0.07)" boxShadow:"0 24px 60px rgba(0,0,0,0.75)" position:"relative" height:"360px"`.

**Card TL (row 1, col 1)**: Dark illustration background — a `72×72` grid of `4×4px` dots `rgba(255,255,255,0.04)` covering the top 55% of card (create with a CSS `backgroundImage:"radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)" backgroundSize:"24px 24px"`). Over the dot grid, a centered terminal mini-mockup: `width:280px height:140px backgroundColor:"rgba(0,0,0,0.6)" borderRadius:"10px" border:"1px solid rgba(255,255,255,0.08)"` with mac chrome dots and lines of monospace code (`$ localesy push` → `✓ 12 keys synced` in purple). Gradient overlay: `linear-gradient(to bottom, transparent 40%, rgba(8,8,14,0.98) 72%)` covering full card as `AbsoluteFill`. Bottom content `position:"absolute" bottom:0 left:0 padding:"28px 32px"`: `"Speed"` `fontSize:12 fontWeight:700 letterSpacing:"3px" color:"#905af6"`, then `"Ship fast, localize faster"` `fontSize:21 fontWeight:700 color:"#ffffff" marginTop:6 letterSpacing:"-0.5px"`, then `"Localesy keeps pace with your releases."` `fontSize:14 color:"rgba(255,255,255,0.52)" marginTop:4 lineHeight:1.55`.

**Card TR (row 1, col 2)**: Background: a purple-tinted globe wireframe illustration — a `200×200px` circle in `rgba(144,90,246,0.08)` with 3 horizontal ellipse strokes `stroke:"rgba(144,90,246,0.18)" strokeWidth:1` and 3 vertical strokes, all as inline SVG centered in the top portion. From the globe, 5 language flag emojis radiate outward: `🇩🇪 🇫🇷 🇯🇵 🇪🇸 🇰🇷` each in a `32×32px` `backgroundColor:"rgba(144,90,246,0.10)"` circle positioned at `[{top:15%,left:20%},{top:10%,right:18%},{top:35%,right:8%},{top:55%,left:12%},{top:50%,right:15%}]`, floating gently with `translateY: interpolate(frame % 90, [0,45,90], [-3,3,-3])` offset each by `+frame * 0.8`. Bottom content: `"Global reach"` + `"New languages in minutes"` `fontSize:21 fontWeight:700` + `"Generate all locales at once."` muted.

**Card BL (row 2, col 1)**: Background: animated git branch diagram — SVG with: 3 commit circles `cx:[60,180,300] cy:[80,80,80]` `r:8 fill:"rgba(144,90,246,0.6)"`, connecting line `stroke:"rgba(144,90,246,0.25)" strokeWidth:2`, branch path `M180,80 Q200,80 220,120 L340,120` `stroke:"rgba(144,90,246,0.20)"`, merge node at `340,120 r:8 fill:"rgba(34,197,94,0.6)"`. An animated "commit pulse" — a 20px ring expanding from the last commit, `opacity: interpolate(frame % 45, [0,22,44], [0.8,0,0])` scale `interpolate(frame % 45, [0,44], [1,2.5])`. Bottom content: `"Developer-first"` + `"Translations never block dev"` + `"Changes merge smoothly. Devs ship."` muted.

**Card BR (row 2, col 2)**: Background: hub diagram — 4 small node circles at cardinal positions `[{top:15%,left:15%},{top:15%,right:15%},{bottom:18%,left:15%},{bottom:18%,right:15%}]` in `rgba(255,255,255,0.06)` border, connected by thin animated lines to a central `48×48px` `backgroundColor:"rgba(144,90,246,0.14)" border:"1px solid rgba(144,90,246,0.30)" borderRadius:"12px"` hub circle containing `"L"` purple `fontWeight:800 fontSize:18`. Connection lines pulse `opacity: interpolate(frame % 60, [0,30,60], [0.25,0.65,0.25])`. Node labels: `"Web"` `"Git"` `"CLI"` `"API"` `fontSize:11 color:"rgba(255,255,255,0.40)"`. Bottom: `"One hub"` + `"Central translation sync"` + `"One source of truth across all platforms."` muted.

`<Vignette/>` `<GrainOverlay/>`.

---

### Scene 8 — Autopilot CTA (`src/scenes/AutopilotScene.tsx`, 150 frames / 5s)

This recreates the actual website's purple CTA section. The entire AbsoluteFill has `backgroundColor:"#905af6"`. Inner glow: `boxShadow:"inset 0 0 0 2px rgba(196,162,255,0.85), inset 0 0 120px rgba(144,90,246,0.20)"` on an overlay `AbsoluteFill pointerEvents:"none"`.

**Radial texture overlay** `AbsoluteFill pointerEvents:"none"`: `background:"radial-gradient(ellipse 80% 60% at 50% 50%, rgba(196,162,255,0.08) 0%, transparent 65%)"`.

**Right-side floating components illustration**: an `AbsoluteFill pointerEvents:"none"` containing an absolutely-positioned `800×480px` block at `right:-60px bottom:0`. Inside: 6 stacked UI component mockups drawn with divs — input field `(height:40px width:360px borderRadius:8px backgroundColor:"rgba(0,0,0,0.20)" border:"1px solid rgba(255,255,255,0.15)" marginBottom:12)`, a badge row, a key-value row, a toggle (`width:44px height:26px borderRadius:13px backgroundColor:"rgba(0,0,0,0.25)"`), a button `(width:180px height:38px borderRadius:8px backgroundColor:"rgba(0,0,0,0.30)")` — all in `rgba(255,255,255,0.06)` and `rgba(0,0,0,0.20)` tones, `opacity:0.65`. Entire block slides from `translateX(100px)→0` spring `damping:16 stiffness:70` starting frame 28.

**Left content** `position:"absolute" left:0 top:0 bottom:0 width:"54%" display:"flex" flexDirection:"column" justifyContent:"center" padding:"0 80px"`:

- Frame 10: `"Translation management,"` DM Sans `fontSize:52 fontWeight:700 color:"rgba(255,255,255,0.95)" letterSpacing:"-2px"` slides from `translateY(40px)` spring `damping:14 stiffness:85`.
- Frame 20 (same line continues): `"on autopilot."` same style, `color:"rgba(255,255,255,0.80)"`.
- Frame 38: `"Stop losing engineering hours to translation busywork."` `fontSize:22 fontWeight:500 color:"rgba(255,255,255,0.78)" letterSpacing:"-0.3px"` fades in.
- Frame 52: `"Set up in less than 2 minutes. No credit card required."` `fontSize:18 color:"rgba(255,255,255,0.58)"` fades in.
- Frame 72: `"Get started for free →"` button `display:"inline-flex" alignItems:"center" gap:8 backgroundColor:"rgba(0,0,0,0.72)" borderRadius:"14px" padding:"13px 26px" color:"rgba(255,255,255,0.95)" fontSize:17 fontWeight:700 boxShadow:"0 4px 16px rgba(0,0,0,0.30)"`. Springs in scale `0.90→1`. The `"→"` `fontSize:18` oscillates `translateX: interpolate(frame % 60, [0,30,60], [0,5,0])`.

At frame 124: entire scene fades `backgroundColor` from `#905af6` toward `#030305` over 26 frames using `interpolate(frame,[124,150],[0,1])` as a fade overlay `AbsoluteFill` `backgroundColor:"#030305"`.

`<GrainOverlay opacity={0.025}/>`.

---

### Scene 9 — Logo Reveal (`src/scenes/LogoRevealScene.tsx`, 120 frames / 4s)

Background `#000000`.

**Radial glow** `AbsoluteFill pointerEvents:"none"`: `background:"radial-gradient(ellipse 64% 44% at 50% 50%, rgba(144,90,246,0.24) 0%, transparent 68%)"`. Pulses: `opacity: interpolate(frame % 70, [0,35,70], [0.85,1.15,0.85])` (multiply onto the opacity prop).

**Logo icon** — a `96×96px` centered group springs in from `scale:0→1` `opacity:0→1` spring `damping:12 stiffness:110` starting frame 8. Recreate the two-arc Localesy logo: two `AbsoluteFill`-style `div` elements inside a `96×96` container. Arc 1: `position:"absolute" inset:0 borderRadius:"50%"` with `background:"radial-gradient(circle at 0% 50%, transparent 40%, #905af6 100%)"`. Arc 2: `position:"absolute" inset:0 borderRadius:"50%"` with `background:"radial-gradient(circle at 100% 50%, transparent 40%, #905af6 100%)"`. Combined they form the double-arc mark. Alternatively implement as an inline `<svg viewBox="0 0 32 32" width={96} height={96}>` with the two `<path>` elements from the website's logo SVG data — copy the `d` attributes exactly from the original SVG in the codebase or HTML: the first path `"M0.149768 18.4005H3.05893C..."` and second path `"M31.8502 13.5995L28.9411..."` both with `fill="url(#localesy-grad)"`, and define a `<radialGradient id="localesy-grad">` with stops `#905af6 opacity:0 at 0.32` and `#905af6 at 0.99` (matching the original gradient from the site HTML).

**Wordmark** `"Localesy"` DM Sans `fontSize:104 fontWeight:800 color:"#ffffff" letterSpacing:"-4.5px"` slides from `translateY(64px)→0` spring `damping:11 stiffness:95` starting frame 18.

**Purple accent line** expanding under wordmark: `height:3px backgroundColor:"#905af6" borderRadius:"2px"` width `interpolate(frame,[40,72],[0,210],{extrapolateRight:"clamp"})` px, centered under wordmark, fades in over 10 frames at frame 38.

**Tagline** at frame 56: `"Localization for fast-moving teams."` `fontSize:22 fontWeight:400 color:"rgba(255,255,255,0.42)" letterSpacing:"0.4px"` fades in over 20 frames.

**Exit** frame 90–120: entire content `opacity:1→0` via `interpolate(frame,[90,120],[1,0])` + subtle `scale:1→1.06` simultaneously — cinematic push-out.

`<GrainOverlay opacity={0.030}/>`.

---

### Scene 10 — Final CTA (`src/scenes/FinalCTAScene.tsx`, 180 frames / 6s)

Background `#030305`. `<PurpleWash opacity={1.5}/>` (increase inner purple intensity). Additional `AbsoluteFill pointerEvents:"none"`: `background:"radial-gradient(55% 42% at 50% 58%, rgba(144,90,246,0.18) 0%, transparent 72%)"`.

**Frame 0**: `"TRANSLATION MANAGEMENT, ON AUTOPILOT."` `fontSize:11 fontWeight:700 letterSpacing:"6px" color:"rgba(255,255,255,0.18)"` centered fades in 12 frames.

**Frame 14**: giant counter `"1,160+"` DM Sans `fontSize:148 fontWeight:900 color:"#905af6" letterSpacing:"-7px"` springs from `scale:0.55 opacity:0` → `scale:1 opacity:1` spring `damping:11 stiffness:95`. The number counts up: `Math.round(interpolate(frame,[14,58],[0,1160],{extrapolateLeft:"clamp",extrapolateRight:"clamp"})).toLocaleString() + "+"`.

**Frame 30**: `"developers already on the early access list"` `fontSize:20 fontWeight:400 color:"rgba(255,255,255,0.42)" letterSpacing:"0.2px"` slides from `translateY(16px)→0` over 18 frames.

**Frame 54**: npx command pill — same design as Scene 1. `width:432px height:58px backgroundColor:"rgba(255,255,255,0.04)" border:"1px solid rgba(255,255,255,0.09)" borderRadius:"14px" display:"flex" alignItems:"center" justifyContent:"space-between" padding:"0 20px"`. `"npx localesy@latest init"` monospace `fontSize:18 color:"#905af6" fontWeight:500`. Copy icon SVG right side. Springs from `translateY(22px)→0` spring `damping:15 stiffness:100`.

**Frame 74**: CTA button `width:272px height:58px borderRadius:"16px" background:"linear-gradient(135deg, #a975f8 0%, #905af6 100%)" boxShadow:"0 14px 48px -8px rgba(144,90,246,0.60), 0 0 0 1px rgba(196,162,255,0.14), inset 0 1px 0 rgba(255,255,255,0.20)"`. Text `"Get started for free"` DM Sans `fontSize:18 fontWeight:700 color:"#ffffff"`. Springs in scale `0.88→1` `damping:12 stiffness:120`.

**Frame 94**: `"localesy.com"` DM Sans `fontSize:28 fontWeight:700 color:"rgba(255,255,255,0.78)" letterSpacing:"-0.5px"` slides in. Purple underline `height:2px backgroundColor:"#905af6" borderRadius:"1px"` expands width `0→180px` via `interpolate(frame,[100,128],[0,180],{extrapolateRight:"clamp"})`, centered below the text.

**Frame 118**: `"Free to start · No credit card required · Cancel anytime"` `fontSize:13 color:"rgba(255,255,255,0.22)" letterSpacing:"0.5px"` fades in 14 frames.

**Frame 152**: fade everything to black `interpolate(frame,[152,178],[0,1])` as `AbsoluteFill backgroundColor:"#000000" opacity:{...}`.

`<Vignette/>` `<GrainOverlay/>`.

---

## Composition

`src/compositions/LocalesyLaunchV2.tsx` — a `TransitionSeries` with all 10 scenes. Scene frame counts: 150, 180, 210, 180, 150, 150, 180, 150, 120, 180. Between every consecutive pair: `<TransitionSeries.Transition presentation={fade()} timing={springTiming({config:{damping:200},durationInFrames:14})}/>`.

Register in `src/Root.tsx` with `durationInFrames={1650} fps={30} width={1920} height={1080} defaultProps={{}}`.

---

## Render

```bash
npx remotion render LocalesyLaunchV2 out/localesy-launch-v2.mp4 --codec=h264 --crf=14 --video-bitrate=20000000
```

## Logo assets

Two SVGs are in `public/`:
- `logo_dark.svg` — full landscape lockup (icon + wordmark)
- `logo_icon.svg` — square icon mark only

Usage:
- Scene 9 (LogoRevealScene): render `logo_dark.svg` via `<img src={staticFile("logo_dark.svg")}/>` 
  at `height={80}` (auto width), centered. Apply the spring scale animation to its wrapper. 
  Remove all the manual arc/wordmark/underline code I described — the SVG replaces all of it.
- Scene 1 (HeroV2Scene) sidebar nav area: `logo_icon.svg` at `28×28px`
- Scene 3 (PlatformScene) dashboard left sidebar: `logo_icon.svg` at `28×28px` next to "Localesy" text
- Scene 10 (FinalCTAScene): `logo_icon.svg` at `32×32px` above the counter