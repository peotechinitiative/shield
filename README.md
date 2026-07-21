# Shield App 🔒

A privacy-focused safety app disguised as a calculator. Built with **Vite + TypeScript**.

## Features

- **Calculator Disguise** — Fully functional calculator that unlocks with `2 4 6 8 = =`
- **Meetup Check-in** — Share your location with a trusted contact for a set window
- **Profile Lookup** — Check phone numbers/usernames against community reports
- **Encrypted Evidence Vault** — Client-side AES-GCM encryption via Web Crypto API
- **Blackmail Playbook** — Step-by-step guidance for extortion situations
- **Panic Alert** — One-tap location sharing with trusted contacts
- **PWA Support** — Installable on iOS/Android, works offline

## Tech Stack

- Vite 5
- TypeScript 5
- vite-plugin-pwa (Workbox)
- Web Crypto API (PBKDF2 + AES-GCM)
- IndexedDB (client-side storage)

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

### GitHub Pages
```bash
npm run deploy
```

### Vercel / Netlify
Connect your repo and set the build command to `npm run build` with output directory `dist`.

## Project Structure

```
shield-app/
├── public/           # Static assets (icons, manifest)
├── src/
│   ├── components/   # UI components (Calculator, Shell, Views)
│   ├── utils/        # Crypto, DB, Router, Toast
│   ├── types/        # TypeScript interfaces
│   ├── style.css     # Global styles
│   └── main.ts       # Entry point
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## Security Notes

- Vault encryption keys are **never persisted** — they live only in memory
- PBKDF2 uses 150,000 iterations with SHA-256
- AES-GCM with 256-bit keys and random 12-byte IVs
- All data stays on-device unless explicitly shared

## License

MIT
