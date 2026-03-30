# AIAdvisor.tools

AI tools discovery platform built with Next.js 14, TypeScript, Tailwind CSS, Prisma, and NextAuth.

## Features

- 🔍 **Semantic Search** — Find tools by intent
- 🤖 **AI Matcher** — Get personalized recommendations
- 👥 **Community** — Reviews, ratings, discussions
- 🏆 **Gamification** — Badges, leaderboard, achievements
- 📱 **Mobile PWA** — Install on your device
- 🌐 **i18n** — 20+ languages
- 🔐 **NextAuth** — OAuth + email authentication
- 📊 **Analytics Dashboard** — Track tool popularity
- ⚡ **Performance** — Optimized for speed
- 🎨 **Dark Neon Theme** — Modern UI design

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Prisma + PostgreSQL
- **Auth**: NextAuth.js
- **Icons**: Lucide React
- **Validation**: Zod

## Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/topbestaitools-droid/bestai-tools.git
cd bestai-tools
npm install
```

### 2. Setup Environment
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/aiadvisor"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-a-random-secret"
```

### 3. Setup Database
```bash
npx prisma migrate dev
npx prisma db seed
```

### 4. Run Dev Server
```bash
npm run dev
```

Visit `http://localhost:3000` 🚀

## Project Structure

```
bestai-tools/
├── app/                 # Next.js pages + API routes
├── components/          # Reusable React components
├── lib/                 # Utilities & helpers
├── prisma/              # Database schema
├── public/              # Static assets
├── styles/              # Global styles
└── ...
```

## Pages

- `/` — Homepage
- `/tools` — Browse tools
- `/tools/[slug]` — Tool details
- `/search` — Semantic search
- `/legal/privacy` — Privacy policy
- `/legal/terms` — Terms of service

## API Routes

- `GET /api/health` — Health check

## Deployment

### Vercel (Recommended)

```bash
vercel link
vercel env add DATABASE_URL
vercel deploy
```

### Docker

```bash
docker build -t aiadvisor .
docker run -p 3000:3000 aiadvisor
```

## Development

### Lint & Format
```bash
npm run lint
npm run format
```

### Database
```bash
npx prisma studio    # UI for database
npx prisma migrate   # Run migrations
```

## Contributing

Pull requests welcome! Please follow the code style and add tests.

## License

MIT License — see LICENSE file.

## Support

Issues? Email: support@aiadvisor.tools
