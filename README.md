# For Surabhi 🌊 — Birthday Web Experience

> An intimate, cinematic, and emotional birthday experience crafted for Surabhi — celebrating her Civil Engineering background, her UPSC dream of public service, her strength of faith, and authentic friendship.

---

## ✨ Features

- **Scene 0: The Gate** — Personalized atmospheric threshold (*"For Surabhi"*).
- **Scene 1: Peace (Night Shore)** — Calming moonlit ocean with custom WebGL ocean shader and glowing Marathi sand calligraphy.
- **Scene 2: Memories** — Interactive 3D Polaroid photo cards with specular highlights and reflections.
- **Scene 3: Civil Engineering ("Built on Strong Foundations")** — Technical blueprint drafting canvas (`DWG. NO. CE-SURABHI-2026`) showcasing Foundation, Structure, and Bridge principles with authentic structural annotations.
- **Scene 4: Public Service ("A Dream That Serves")** — 24-spoke Ashoka Chakra revealing the 8 core virtues of ethical public service (Integrity, Compassion, Courage, Justice, Responsibility, Empathy, Humility, Service).
- **Scene 5: Sacred Wisdom & Faith** — Bhagavad Gita 2.47 verse in Sanskrit with Marathi translation and reflections tailored for civil services preparation.
- **Scene 6: Sunrise** — Visual transition from night to dawn with inspiring Marathi blessings.
- **Scene 7: Birthday Celebration** — Interactive 3D birthday cake with microphone/tap candle blowing, celebration confetti, and 12 floating sky lanterns opening multi-dimensional wishes.
- **Scene 8: Letter from a Best Friend** — Sincere, warm parchment letter with personal reassurance, pride, and heartfelt wishes.

---

## 🚀 Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## 🌐 Easy & Recommended Ways to Deploy (100% Free, No Backend Required)

Since this is a modern, static frontend application (Vite + TypeScript + Three.js), it does **not require any backend server or database**. Here are the three easiest ways to deploy it live:

### Option 1: Vercel (Recommended — Easiest, 1-Click)
1. Go to [vercel.com](https://vercel.com) and sign in with your GitHub account (`SankeT2705`).
2. Click **"Add New..."** → **"Project"**.
3. Select your repository: `Birthday`.
4. Vercel automatically detects Vite!
5. Click **"Deploy"**.
6. Within 30 seconds, you get a fast, free, secure HTTPS link (e.g., `https://birthday-xxx.vercel.app`) with automatic updates on every Git push.

### Option 2: GitHub Pages (Directly from this Repo)
1. Go to your GitHub repository: [https://github.com/SankeT2705/Birthday](https://github.com/SankeT2705/Birthday).
2. Go to **Settings** → **Pages** (in the left sidebar).
3. Under **Build and deployment** → **Source**, select **GitHub Actions**.
4. That's it! The pre-configured `.github/workflows/deploy.yml` will automatically build and deploy the site to:
   `https://sanket2705.github.io/Birthday/`

### Option 3: Netlify (Alternative 1-Click)
1. Go to [netlify.com](https://netlify.com) and sign in with GitHub.
2. Click **"Add new site"** → **"Import an existing project"**.
3. Select GitHub and choose `Birthday`.
4. The included `netlify.toml` automatically configures the build command (`npm run build`) and publish directory (`dist`).
5. Click **"Deploy"**.

---

## 🛠️ Tech Stack

- **Vite 8**
- **TypeScript 6**
- **Three.js** (Custom ocean vertex & fragment shaders)
- **Lenis** (Inertial smooth scrolling)
- **Web Audio API** (Self-contained ambient synthesizer)
- **Canvas Confetti & CSS3D**
