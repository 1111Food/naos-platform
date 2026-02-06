# NAOS Platform - Structure & Run Guide

## Local Monorepo Structure

```
naos-platform/
├── server/                 # Backend (Fastify + TypeScript)
│   ├── src/
│   │   ├── config/         # Environment (env.ts)
│   │   ├── modules/        # Domain Logic
│   │   │   ├── astrology/  # Calculation engine
│   │   │   ├── chat/       # (Legacy/Shared with Sigil)
│   │   │   ├── energy/     # Daily snapshot logic
│   │   │   ├── sigil/      # Main Chat/Character engine
│   │   │   ├── user/       # Profile management
│   │   │   └── subscription/# Plan logic
│   │   ├── routes/         # API Route Definitions
│   │   ├── types/          # Shared Interfaces
│   │   ├── app.ts          # App Factory
│   │   └── server.ts       # Entry Point
│   ├── package.json
│   └── tsconfig.json
│
├── client/                 # Frontend (Vite + React + TS)
│   ├── src/
│   │   ├── components/     # UI Components
│   │   ├── hooks/          # API hooks (useSigil, useEnergy, useProfile)
│   │   ├── pages/          # Full page views
│   │   └── lib/            # Utils (Tailwind merger)
│   ├── tailwind.config.js
│   └── package.json
```

## Environment Variables (.env)
Located in `naos-platform/server/.env` (or root if shared).
```env
PORT=3000
GEMINI_API_KEY=AIza...
NODE_ENV=development
```

## Running the Platform (PowerShell)

**Terminal 1: Server**
```powershell
cd server
npm run dev
```
*Starts Fastify on localhost:3000*

**Terminal 2: Client**
```powershell
cd client
npm run dev
```
*Starts Vite on localhost:5173*
