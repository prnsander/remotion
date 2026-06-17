# Remotion Product Launch Video Engine

## Project overview
Remotion 4.x project for generating cinematic 1920×1080 30fps product launch videos.
- Composition: `src/compositions/ProductLaunch.tsx`
- Scenes: `src/scenes/`
- Reusable components: `src/components/`
- Animation utilities: `src/animations/index.ts`
- Shared constants (colors, type scale, easing): `src/constants.ts`
- Static assets: `public/`

## Before writing any Remotion code
Always read: `.agents/skills/remotion-best-practices/SKILL.md`
Then read the relevant rule file from: `.agents/skills/remotion-best-practices/rules/`

## Critical rules — never break these
- NEVER use CSS transitions or Tailwind animation classes (`animate-*`, `transition-*`) — they do not render in Remotion
- ALWAYS animate using `interpolate()` and `useCurrentFrame()`
- ALWAYS use `staticFile("filename")` to reference anything in `public/`
- Composition is 1920×1080 at 30fps — hardcode nothing, use `useVideoConfig()` for dimensions
- Use `<Sequence from={n}>` to delay content, never `setTimeout` or CSS delays
- Load Google Fonts using `loadFont()` from `@remotion/google-fonts/<FontName>` at the top of the file, outside the component

## Adding a new scene
1. Create `src/scenes/YourScene.tsx`
2. Add it to `src/compositions/ProductLaunch.tsx` inside `<TransitionSeries>`
3. Use `AnimatedText` from `src/components/AnimatedText.tsx` for all text
4. Import easing presets from `src/constants.ts` — do not define your own inline

## Rendering
```bash
npx remotion render ProductLaunch out/launch.mp4 --codec=h264 --crf=14 --video-bitrate=20000000
```

## Preview
```bash
npx remotion studio
```
