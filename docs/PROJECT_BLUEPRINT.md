# Her Shore: Birthday Web Experience

*Project blueprint for a cinematic, mobile-first birthday surprise*

Version 1.0 · Built for Antigravity · Mobile first, depth driven, quietly magical

## 1. Vision

**Her Shore** is a single, continuous scroll that travels from a Konkan beach at night to sunrise. Scrolling is time passing. The calm scene hides layered 3D depth, a living water surface, a rotating Ashoka Chakra and a candle she can blow out with her real breath.

The visitor sees one beautiful place and does one simple gesture. Underneath, there is serious craft. She should never feel overwhelmed. She should feel *seen*.

**One-line pitch:** a night-to-sunrise walk on her favourite beach, where every scroll reveals a memory, a quality, and a belief in her dream.

## 2. Experience Principles

1. **One idea per screen.** No clutter, no pop-ups, no menus.
2. **Depth, not decoration.** Every 3D effect must make the scene feel more real or more emotional. If it is only showy, remove it.
3. **Calm motion.** Slow easing, long durations, no bouncing or flashing.
4. **Personal over technical.** Her photos, your words, her dream. The technology stays invisible.
5. **Belief, not pressure.** Never mention exam stress or "study harder". Celebrate who she already is.
6. **Works on a mid-range phone.** Beautiful on a flagship, smooth on a budget Android.

## 3. Who This Is For

| Detail | Design response |
| --- | --- |
| Dream of becoming an IAS officer, preparing for UPSC | Ashoka Chakra scene, appointment letter finale, wishes framed as qualities of a leader |
| Civil engineering graduate | Blueprint scene: lighthouse, bridge, house drawn in lines, then coloured in |
| Loves beaches and Konkan | Whole world is a Konkan shore: laterite rocks, coconut palms, lighthouse, fishing boats, Marathi greeting |
| Likes simplicity | Restrained palette, one serif font, generous empty space, one gesture to navigate |
| Best friend | Handwritten notes, polaroid memories, personal letter at the end |

## 4. Story Flow at a Glance

| # | Scene | Time of day | Core interaction | Emotion |
| --- | --- | --- | --- | --- |
| 0 | Gate: "Tap to hear the sea" | Deep night | Tap to begin | Curiosity |
| 1 | Night Shore | Night | Touch ripples water, name writes in sand | Wonder |
| 2 | The Blueprint | Pre-dawn blue | Scroll draws then colours lines | Pride |
| 3 | Messages in Bottles | Early dawn | Tap bottles to open polaroids | Nostalgia |
| 4 | The Wheel Turns | Dawn | Scroll rotates 24-spoke Chakra | Purpose |
| 5 | Sunrise | Sunrise | Sun rises behind the wheel, key line appears | Joy |
| 6 | Sky Lanterns | Golden morning | Lanterns rise, tap to read wishes | Warmth |
| 7 | Sandcastle Cake | Morning | Blow into mic to extinguish candle | Delight |
| 8 | Letter from the Future | Full daylight | Read the appointment order and your note | Belief |

## 5. Design System

### 5.1 Colour tokens

Colours move with the time of day. The base tokens never change, the sky gradient does.

| Token | Hex | Use |
| --- | --- | --- |
| `--night-900` | `#070B1A` | Deep night background |
| `--night-700` | `#0F1B3D` | Night sky mid |
| `--dawn-blue` | `#2B4C7E` | Pre-dawn sky |
| `--sea-teal` | `#2F7F86` | Water highlights |
| `--sand-100` | `#F4E9D8` | Text on dark, paper surfaces |
| `--sand-300` | `#E3CFA9` | Sand, cards |
| `--coral-400` | `#F2866B` | Sunrise accent |
| `--gold-300` | `#F6CF7A` | Sun, lanterns, key highlights |
| `--rose-200` | `#F7C8C1` | Soft sky blush |
| `--ink-800` | `#1E2433` | Text on light surfaces |

**Rules:** no neon, no pure black, no pure white. Gold is used sparingly, like a jewel.

### 5.2 Typography

| Role | Font | Notes |
| --- | --- | --- |
| Headings and key lines | Cormorant Garamond (600, italic available) | Elegant, editorial |
| Body | Inter or DM Sans (400, 500) | Clean and readable on mobile |
| Handwritten notes only | Caveat or Homemade Apple | Used only for your personal notes, so they feel human |
| Marathi | Noto Serif Devanagari | For "वाढदिवसाच्या हार्दिक शुभेच्छा" |

Self-host fonts as WOFF2 subsets to avoid layout shift and speed up load.

Type scale (mobile): Display 44/48, H1 32/38, H2 24/30, Body 17/26, Caption 13/18. Use `clamp()` for fluid sizing.

### 5.3 Spacing, radius and layout

- 8 px spacing grid. Safe-area padding for notches (`env(safe-area-inset-*)`).
- Card radius 20 to 28 px. Photo frames get a soft 4 px paper border like a real polaroid.
- Maximum text width 32 ch for readability and elegance.
- Use `100svh` (not `100vh`) so mobile browser bars do not break scenes.

### 5.4 Depth language (the 3D look)

Depth is built in five consistent layers so the whole site feels like one physical diorama.

| Layer | Z position | Contents | Behaviour |
| --- | --- | --- | --- |
| Far | -1000 | Stars, moon, sun, distant clouds | Barely moves |
| Mid-far | -600 | Horizon, distant hills, lighthouse | Slow parallax |
| Mid | -300 | Sea surface (WebGL), boats | Reacts to touch and tilt |
| Near | 0 | Content cards, bottles, Chakra | Main focus |
| Foreground | +200 | Palm leaves, rocks, sand grains, mist | Moves fastest, slightly blurred |

**Depth tools used everywhere:**

- **Atmospheric perspective:** farther layers are lighter, bluer and lower contrast.
- **Soft layered shadows** under cards and polaroids (two or three stacked shadows, never one hard one).
- **Depth of field:** foreground elements get a light blur, focus layer stays sharp.
- **Fog and mist** between layers using gradient overlays and a subtle noise texture.
- **Glass surfaces** (frosted `backdrop-filter`) for the few UI elements, such as the sound toggle.
- **Light direction:** a single light source, the moon at night and the sun at dawn. Shadows and highlights follow it.

### 5.5 Motion language

| Property | Value |
| --- | --- |
| Default easing | `power2.inOut` (GSAP) or `cubic-bezier(.22,.61,.36,1)` |
| Scene transition | 1.2 to 2.0 s, cross-dissolve with parallax |
| Micro-interaction | 300 to 500 ms |
| Idle motion | Looping, 6 to 14 s cycles (waves, lantern sway, star twinkle) |
| Forbidden | Bounce, shake, rapid flashing, anything under 150 ms |

Respect `prefers-reduced-motion`: swap parallax and heavy animation for gentle fades.

## 6. Technology Stack

| Need | Tool | Why |
| --- | --- | --- |
| Framework | **Vite + vanilla TypeScript** (or Next.js if you prefer) | Light, fast, easy to host |
| Scroll storytelling | **GSAP + ScrollTrigger** | Industry standard timeline control |
| Smooth scroll | **Lenis** | Buttery inertia scroll, essential for the cinematic feel |
| 3D and shaders | **Three.js** (or OGL for a smaller bundle) | Water surface, particles, depth |
| Water shader | Custom GLSL fragment shader | Ripples at touch point, sky reflection |
| Blueprint drawing | **SVG** with `stroke-dasharray` animation (GSAP DrawSVG alternative: manual dashoffset) | Crisp on any screen |
| Audio | **Web Audio API** (or Howler.js) | Layered waves, music, crossfades |
| Mic blow detection | `getUserMedia` + `AnalyserNode` | Real breath detection |
| Tilt parallax | `DeviceOrientationEvent` | Phone tilt moves the scene |
| Particles | Canvas 2D or Three.js `Points` | Stars, lanterns, sand, confetti |
| Hosting | Netlify or Vercel (free, HTTPS) | HTTPS is required for mic and gyroscope |

**Browser support target:** iOS Safari 16+, Chrome Android 100+, plus modern desktop browsers as a bonus.

## 7. Scene-by-Scene Specification

### Scene 0: The Gate

- Full-screen deep navy with a few faint stars and a slow breathing glow in the centre.
- Text: *"Tap to hear the sea"* in italic serif. A small line below: *"Best with sound on and headphones."*
- On tap: unlock audio context, request nothing else yet, fade in sea waves over 3 s, then fade in soft piano melody under the waves.
- Preload hidden assets while this screen is shown so the next scene is instant.
- **Why it exists:** mobile browsers block autoplay audio, so this tap is both the gate and the "surprise begins" moment.

### Scene 1: Night Shore

- Three.js scene: starfield (far), moon with soft halo, dark horizon, WebGL sea in the foreground.
- Sea shader reacts to touch. A finger drag leaves expanding ripples that fade over 3 s.
- Her name appears letter by letter as if written in wet sand: each letter fades in, then a faint wave washes over it and leaves a shimmer.
- Below it, a single small line: *"Scroll slowly."*
- **Depth:** stars on the far layer, moon mid-far, water mid, small foreground rocks with blur.

### Scene 2: The Blueprint (Civil Engineering)

- Background shifts to blueprint blue with a faint grid.
- Three SVG drawings, one per screen of scroll: **a Konkan lighthouse**, **a suspension bridge**, **a small coastal house**.
- Lines draw themselves with the scroll (stroke-dashoffset linked to scroll progress). Dimension lines and tiny annotations ("Span 120 m", "Foundation") add the engineer feel.
- As the scroll continues, each drawing fills with soft watercolour (animated SVG masks).
- Text: *"You were trained to build things that last. Someday you will build something bigger."*
- **Depth:** drawings sit on a slightly tilted plane that rotates a few degrees with scroll, like a drafting table.

### Scene 3: Messages in Bottles

- The tide brings glass bottles one by one. Each floats on the shader water with gentle bobbing and a small trail of foam.
- Tap a bottle: it rises and unrolls into a **3D polaroid card** (CSS 3D transform) with her photo, a date, and your note in handwriting font.
- Card can be tilted by finger drag or phone tilt, with a moving highlight like glossy paper.
- Close by tapping outside. The bottle drifts away.
- Use 5 to 8 memories. More than 8 becomes tiring.
- **Content per bottle:** photo (WebP, about 150 KB), a one-line caption, and a 2 to 4 line note.

### Scene 4: The Wheel Turns (the IAS dream)

- A large Ashoka Chakra rises from the horizon, sized like the sun, in deep navy with a gold edge.
- 24 spokes. As the user scrolls, the wheel rotates and each spoke lights up in turn with a single word or short phrase (see list below).
- The wheel is rendered as a Three.js mesh or layered SVG with a soft glow and depth bevel, so it feels like a carved object.
- Text under it, once all 24 are lit: *"Not a goal on a list. A direction you were always walking in."*

**Starter list of 24 qualities** (edit freely to be personal to her):

1. Discipline · 2. Courage · 3. Kindness · 4. Patience · 5. Integrity · 6. Curiosity · 7. Resilience · 8. Fairness · 9. Humility · 10. Focus · 11. Empathy · 12. Wisdom · 13. Honesty · 14. Leadership · 15. Hope · 16. Strength · 17. Grace · 18. Service · 19. Clarity · 20. Faith · 21. Grit · 22. Compassion · 23. Vision · 24. Joy

### Scene 5: Sunrise (the emotional peak)

- The sky shifts navy → rose → coral → gold. The sun rises precisely behind the Chakra so the wheel is silhouetted with a gold rim light.
- God rays (soft radial light streaks) and lens bloom, subtle, never harsh.
- Water reflects the sun with a golden path on the shader sea.
- Background audio: waves soften, piano rises, a few birds fade in.
- **Display your best line here.** One sentence, large, centred, nothing else on screen. Example format: *"\[Her name\], the world is about to meet the person I already know."*

### Scene 6: Sky Lanterns

- Warm lanterns rise from the beach, glowing gold with tiny flickering light.
- Each lantern carries a short wish. Tap one to enlarge and read it.
- 8 to 12 lanterns, each with slightly different speed, size and sway, to create depth.
- Far lanterns are small and dim, near ones large and slightly blurred.
- A soft "Happy Birthday" in Marathi appears as the lanterns cross the sky: **वाढदिवसाच्या हार्दिक शुभेच्छा.**

### Scene 7: The Sandcastle Cake

- A detailed sandcastle with one candle on the central tower. Candle flame is a real shader or animated sprite with flicker and warm glow on the sand.
- Text: *"Make a wish… then blow."*
- Tap "Allow mic" (a clear, friendly button explaining it is only used for blowing out the candle and nothing is recorded).
- When she blows, the flame leans, flickers, then goes out with a thin smoke trail, followed by soft confetti (gold and coral petals), a gentle chime, and a hidden message that fades in: *"Your wish is safe with the sea."*
- **Fallback:** if mic is denied or unsupported, show a "Hold to blow" button.

### Scene 8: Letter from the Future

- Daylight, calm sea, a paper letter slides up with a soft 3D tilt.
- Letterhead style: *"Government of India · Appointment Order"*, her name, a placeholder date, and a warm tone.
- Below it, your personal note in handwriting font. Keep it honest, specific and short.
- Final line: *"Happy Birthday."* with a small signature.
- Optional: a "Replay from the beginning" link, quiet and understated.
- **Important:** do not use real government emblems or imply a real document. Use a clearly playful, fictional design.

## 8. Audio Design

| Layer | Behaviour |
| --- | --- |
| Waves (loop) | Starts on tap, constant bed at low volume, intensity follows scenes |
| Piano "Happy Birthday" | Fades in 8 to 10 s after waves, loops softly or plays once and returns to ambient |
| Birds | Fade in at sunrise |
| Chime | Plays when candle goes out |
| UI sounds | Very soft bottle "clink" and paper rustle |

**Rules:**

- Always provide a visible **sound toggle** (glass pill, top right).
- Pause audio when the tab is hidden (`visibilitychange`).
- Keep total audio under about 3 MB (compressed MP3 or OGG, lazy load after the gate).
- Use licensed or royalty-free tracks (for example Pixabay, Free Music Archive with correct licence) or a recording you made yourself. A self-played piano version is the most personal choice.

## 9. Key Technical Details

### 9.1 Blow detection (microphone)

1. Request mic only when she taps the button: `navigator.mediaDevices.getUserMedia({ audio: true })`.
2. Feed into an `AnalyserNode` and read time-domain data every frame.
3. Compute RMS volume and focus on low-frequency energy (blowing is mostly low-frequency noise, speech is not).
4. Trigger "blow" when the level stays above a threshold for roughly 300 to 500 ms.
5. Stop all mic tracks immediately after success. Nothing is recorded or sent anywhere.
6. Calibrate the threshold with the first second of quiet to adapt to room noise.

### 9.2 Gyroscope parallax

- On iOS, `DeviceOrientationEvent.requestPermission()` must be called from a user tap. Combine it with the gate tap.
- Clamp tilt to about ±12° and smooth with linear interpolation.
- Fall back to pointer or touch position on desktop and when permission is denied.

### 9.3 Water shader

- Plane mesh with a fragment shader: layered noise for wave motion, Fresnel for sky reflection, a ripple array (last 8 touch points with age) for interactive rings.
- Colour of the water and the reflected sky are driven by a single `uTime` and `uProgress` uniform, so it follows the scroll from night to sunrise.
- Run at reduced resolution (0.6 to 0.75 pixel ratio) on low-end devices.

### 9.4 Scroll architecture

- A single master GSAP timeline mapped to total scroll height, divided into scene sections.
- Lenis drives smooth scrolling and feeds ScrollTrigger.
- Each scene exposes `enter()`, `leave()` and `progress(p)` so scenes stay independent and easy to debug.

### 9.5 3D cards

- CSS `perspective` and `transform-style: preserve-3d` for polaroids and the letter.
- Dynamic highlight: a gradient overlay whose position follows tilt.
- Layered `box-shadow` that grows when the card "lifts".

## 10. Content Kit: What You Need to Prepare

Collect all of this before building so the final result feels complete.

| Item | Quantity | Spec |
| --- | --- | --- |
| Her photos | 8 to 12 | Portrait and landscape mix, best quality, with beach or happy moments preferred |
| Photo caption | One per photo | One line, simple and specific |
| Personal notes | 5 to 8 | 2 to 4 lines each, honest and warm |
| Lantern wishes | 8 to 12 | Short, up to 12 words each |
| Chakra qualities | 24 | One word each, confirm they feel like *her* |
| Sunrise key line | 1 | Your best sentence |
| Final letter | 1 | About 120 words |
| Marathi greeting | 1 | Check spelling with a Marathi speaker |
| Music | 1 to 2 tracks | Licensed or self-recorded, plus sea waves loop |
| Her name and nickname | 1 | Decide which appears on screen |

**Photo prep:** crop to consistent ratios, export as WebP at about 1200 px on the long side and about 150 KB each, and soften skin retouching, since natural looks better.

## 11. Recommended Project Structure

```
her-shore/
├─ index.html
├─ vite.config.ts
├─ package.json
├─ public/
│  ├─ audio/        (waves.mp3, piano.mp3, birds.mp3, chime.mp3)
│  ├─ photos/       (memory-01.webp ... memory-10.webp)
│  ├─ fonts/        (woff2 subsets)
│  └─ og-image.jpg  (link preview image)
└─ src/
   ├─ main.ts
   ├─ content.ts          (ALL text, wishes, qualities, photo paths)
   ├─ styles/
   │  ├─ tokens.css       (colours, spacing, type scale)
   │  └─ base.css
   ├─ core/
   │  ├─ scroll.ts        (Lenis + GSAP setup)
   │  ├─ audio.ts         (Web Audio manager)
   │  ├─ tilt.ts          (gyroscope and pointer)
   │  ├─ mic.ts           (blow detection)
   │  └─ perf.ts          (device tier detection)
   ├─ gl/
   │  ├─ renderer.ts
   │  ├─ sea.frag.glsl
   │  ├─ sea.vert.glsl
   │  └─ particles.ts
   └─ scenes/
      ├─ gate.ts
      ├─ nightShore.ts
      ├─ blueprint.ts
      ├─ bottles.ts
      ├─ wheel.ts
      ├─ sunrise.ts
      ├─ lanterns.ts
      ├─ cake.ts
      └─ letter.ts
```

Keeping **all text in `content.ts`** means you can edit wishes without touching any code.

## 12. Performance Budget and Fallbacks

| Metric | Target |
| --- | --- |
| First interactive (gate screen) | Under 2 s on 4G |
| Total initial JS | Under 250 KB gzipped |
| Total page weight (everything loaded) | Under 12 MB, lazy loaded by scene |
| Frame rate | 60 fps on flagship, steady 30+ fps on budget Android |
| Largest image | Under 200 KB |

**Device tiering:** at load, detect GPU capability and memory (`navigator.deviceMemory`, a quick frame-time test). Choose:

- **High:** full shaders, 12 lanterns, blur and bloom.
- **Medium:** reduced shader resolution, 8 lanterns, no bloom.
- **Low:** pre-rendered gradient sea, CSS-only parallax, 5 lanterns.

**Other tactics:** lazy load each scene's assets just before it is needed, compress with WebP and AVIF where supported, cap device pixel ratio to 2, pause rendering for off-screen scenes, and use `will-change` sparingly.

## 13. Accessibility and Safety

- Support `prefers-reduced-motion` with simpler fades.
- All photos have descriptive alt text.
- Text contrast at least 4.5:1 against its background, checked at every sky colour.
- Do not auto-flash or strobe.
- Mic and motion permissions are always optional, with graceful fallbacks.
- Keyboard and screen-reader basic navigation for desktop (arrow keys scroll scenes).
- Add `<meta name="robots" content="noindex">` and optionally a simple passcode so the page stays private to her.

## 14. Build Plan

| Phase | Days | Deliverable |
| --- | --- | --- |
| 1. Foundation | 1 | Project set up, tokens, fonts, Lenis + GSAP, gate screen, audio manager |
| 2. World | 2 | Night shore, WebGL sea, stars, parallax layers, tilt |
| 3. Story scenes | 3 to 4 | Blueprint, bottles and polaroids, Chakra wheel |
| 4. Climax | 2 | Sunrise sky transition, lanterns, sandcastle cake with mic |
| 5. Finale | 1 | Letter scene, replay, final copy |
| 6. Polish | 2 | Performance tuning, device tiers, accessibility, audio mix |
| 7. Test and ship | 1 | Real-device testing, deploy, QR code or link |

Total: about 12 to 14 days of part-time work. If your time is short, build Scenes 0, 1, 4, 5, 7 and 8 first. That gives you the heart of the story, and you can add Scenes 2, 3 and 6 later.

## 15. Testing Checklist

- [ ] Tested on at least one iPhone (Safari) and one Android (Chrome)
- [ ] Audio starts after tap and respects the sound toggle
- [ ] Mic blow works in a quiet room and with mild background noise
- [ ] Mic denied fallback works
- [ ] Gyroscope permission flow works on iOS
- [ ] Scroll is smooth with no jumps when the browser address bar hides
- [ ] Landscape orientation shows a friendly "rotate your phone" hint or adapts
- [ ] All text is readable at every sky colour
- [ ] Spelling checked, especially the Marathi line and her name
- [ ] Page loads acceptably on slow 4G
- [ ] Link preview (WhatsApp) shows a nice image and title
- [ ] Works if she opens it inside the WhatsApp or Instagram in-app browser (test it, since these browsers are limited)

## 16. Deployment and Delivery

1. Build with `npm run build` and deploy the `dist` folder to Netlify or Vercel.
2. Use a custom, personal URL such as `hername-birthday.netlify.app`.
3. Set an Open Graph image and title so the WhatsApp preview already feels special.
4. Schedule the send for midnight, with a short message such as: *"Open this alone, with headphones, and don't skip the last screen."*
5. Suggest she opens it in Chrome or Safari rather than inside the chat app.
6. Keep a backup copy as a screen recording in case her phone or network fails on the day.

## 17. Ready-to-Use Prompts for Antigravity

Use these in order. Paste each one with the relevant context.

**Prompt 1: Setup**

> Create a Vite + TypeScript project called "her-shore". Install gsap, lenis and three. Set up CSS design tokens from my palette (night-900 #070B1A, night-700 #0F1B3D, dawn-blue #2B4C7E, sea-teal #2F7F86, sand-100 #F4E9D8, sand-300 #E3CFA9, coral-400 #F2866B, gold-300 #F6CF7A, rose-200 #F7C8C1, ink-800 #1E2433). Use Cormorant Garamond for headings and Inter for body. Create the folder structure with a central content.ts file for all text. Mobile first, use 100svh.

**Prompt 2: Gate and audio**

> Build the gate screen with "Tap to hear the sea". On tap, unlock the Web Audio context, crossfade a waves loop in over 3 seconds, then fade in a piano track after 8 seconds. Add a glass-style sound toggle top right. Pause audio when the tab is hidden. On iOS also request DeviceOrientation permission from the same tap.

**Prompt 3: Sea shader**

> Create a Three.js full-screen scene with a stylised sea plane and a GLSL fragment shader: layered noise waves, Fresnel sky reflection, touch-driven ripples (last 8 points with age fade), and uniforms uProgress (night to sunrise colour grading) and uTime. Add a starfield and moon on far layers with parallax from device tilt. Cap pixel ratio at 2 and add a low-tier fallback.

**Prompt 4: Scroll engine**

> Set up Lenis smooth scroll connected to GSAP ScrollTrigger. Create a scene manager where each scene exports enter, leave and progress(p). Total scroll should map to the night-to-sunrise timeline. Include scene stubs for nightShore, blueprint, bottles, wheel, sunrise, lanterns, cake and letter.

**Prompt 5: Blueprint scene**

> Build the blueprint scene with three SVG line drawings (Konkan lighthouse, suspension bridge, coastal house) on a blue grid. Draw strokes with scroll progress using stroke-dashoffset, add dimension lines and small engineering labels, then fill with soft watercolour using animated masks. Tilt the drawing plane a few degrees with scroll for depth.

**Prompt 6: Bottles and polaroids**

> Create floating bottles on the water that bob and drift in. Tapping one opens a 3D polaroid (CSS perspective, preserve-3d) with a photo, caption and handwritten note from content.ts. Add pointer and gyroscope tilt with a moving glossy highlight and layered shadows. Close on outside tap.

**Prompt 7: Ashoka Chakra**

> Create a large 24-spoke Ashoka Chakra in navy with a gold edge and soft glow. Rotate it with scroll progress, and light up one spoke at a time, showing the matching quality word from content.ts. Give it a carved bevelled look for depth.

**Prompt 8: Sunrise**

> Create the sunrise transition: sky gradient navy to rose to coral to gold, the sun rising behind the Chakra so the wheel is silhouetted with rim light, subtle god rays, and a golden reflection path on the sea. Then display one large centred line from content.ts.

**Prompt 9: Lanterns**

> Build 8 to 12 sky lanterns with different sizes, speeds and sway, using depth blur for far and near ones. Tap a lantern to enlarge it and read the wish from content.ts. Show the Marathi greeting as they rise.

**Prompt 10: Cake and mic**

> Build the sandcastle with a candle and animated flame. Add a friendly mic permission button. Detect blowing using AnalyserNode with low-frequency RMS and a 300 to 500 ms sustained threshold, with calibration from the first second. On success, extinguish the flame with a smoke trail, play a chime, release confetti and reveal a hidden message. Add a "Hold to blow" fallback and stop mic tracks afterwards.

**Prompt 11: Letter and polish**

> Build the final letter scene with a soft 3D tilt, a fictional playful appointment order header (no real emblems), and a handwritten personal note. Then add device tiering, prefers-reduced-motion support, lazy loading per scene, WebP images, Open Graph tags, and noindex meta.

## 18. Risks and How to Avoid Them

| Risk | Mitigation |
| --- | --- |
| Too complex, loses her attention | Keep one idea per screen and cut any scene that does not feel emotional |
| Laggy on her phone | Device tiering, pre-test on a mid-range phone, reduce shader resolution |
| Audio does not play | Gate tap unlocks it, test iOS Safari specifically |
| Mic blocked inside WhatsApp browser | Provide "Hold to blow" fallback and ask her to open in Safari or Chrome |
| Pressure from UPSC theme | Frame everything as belief and celebration, never as expectation or deadlines |
| Spoiler before midnight | Use noindex, an unguessable URL, and share only at the chosen time |
| Copyright strike on music | Use royalty-free or self-recorded audio only |

## 19. Final Quality Bar

Before you send it, ask yourself:

1. Does it feel calm, never busy?
2. Does every scene have *one* clear feeling?
3. Would she recognise herself in the words, not just in the pictures?
4. Does it still feel beautiful with the sound off?
5. Is the last screen the one she remembers?

If yes to all five, it is ready.
