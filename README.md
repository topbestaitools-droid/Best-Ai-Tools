# AIAdvisor.tools — AI Tools Discovery Platform

🤖 **Find the best AI tools** with semantic search, personalized recommendations, community reviews, and an interactive AI matcher.

## ✨ Features

- 🔍 **Semantic Search** — Search by intent, not keywords
- 🤖 **AI Matcher** — Get personalized tool recommendations
- ⭐ **Community Reviews** — Read and write tool reviews
- 💬 **Discussions** — Chat with the community
- 🏆 **Gamification** — Earn badges, level up, climb leaderboard
- 📱 **PWA** — Install as app on mobile/desktop
- 🌐 **Multi-language** — 20+ language support (coming soon)
- 🔐 **Auth** — NextAuth with GitHub OAuth + email
- 📊 **Analytics** — Track engagement and trends
- 🎨 **Dark Neon Theme** — Modern, sleek UI design
- ⚡ **Performance** — Optimized for speed and SEO
- 📈 **Admin Panel** — Manage users, tools, and content

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 14, React 18, TypeScript |
| **Styling** | Tailwind CSS, Dark theme |
| **Database** | PostgreSQL + Prisma ORM |
| **Auth** | NextAuth.js 4 |
| **APIs** | REST with TypeScript |
| **Search** | Semantic embeddings (stub) |
| **Email** | Resend |
| **Analytics** | Google Analytics 4 |
| **Deployment** | Vercel + Docker |
| **CI/CD** | GitHub Actions |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- PostgreSQL 13+
- Git

### 1. Clone Repository
```bash
git clone https://github.com/topbestaitools-droid/bestai-tools.git
cd bestai-tools
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment
```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/aiadvisor"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-random-secret"
GITHUB_ID="your-github-oauth-id"
GITHUB_SECRET="your-github-oauth-secret"
```

### 4. Setup Database
```bash
# Create migrations
npx prisma migrate dev --name init

# Seed sample data
npm run db:seed

# Open Prisma Studio
npm run db:studio
```

### 5. Run Development Server
```bash
npm run dev
```

Visit **http://localhost:3000** 🎉

## 📁 Project Structure

```
bestai-tools/
├── app/                    # Next.js pages + layouts
│   ├── api/               # API routes
│   ├── admin/             # Admin dashboard
│   ├── auth/              # Authentication pages
│   ├── community/         # Community features
│   ├── dashboard/         # User dashboard
│   ├── gamification/      # Badges & achievements
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── ui/               # Base UI components
│   ├── site-header.tsx   # Header
│   └── ...
├── lib/                   # Utilities & helpers
│   ├── analytics.ts      # Analytics tracking
│   ├── auth.ts           # Auth utilities
│   ├── embeddings.ts     # Semantic search
│   ├── email.ts          # Email sending
│   ├── gamification.ts   # Points & badges
│   ├── prisma.ts         # Database client
│   ├── types.ts          # TypeScript types
│   └── utils.ts          # General utilities
├── prisma/               # Database
│   ├── schema.prisma     # Data model
│   └── seed.ts           # Seed script
├── public/               # Static assets
│   ├── icons/
│   ├── manifest.json     # PWA manifest
│   └── service-worker.js # Service worker
├── styles/               # Global CSS
├── types/                # Type definitions
├── middleware.ts         # Request middleware
├── .env.example          # Environment template
├── .env.production       # Production env (secrets)
├── docker-compose.yml    # Docker setup
├── Dockerfile            # Production image
├── next.config.js        # Next.js config
├── tsconfig.json         # TypeScript config
├── package.json          # Dependencies
└── README.md             # This file
```

## 🔗 Page Routes

| Route | Purpose |
|-------|---------|
| `/` | Homepage |
| `/tools` | Browse all tools |
| `/tools/[slug]` | Tool details & reviews |
| `/search` | Semantic search |
| `/matcher` | AI tool matcher |
| `/community` | Community hub |
| `/community/reviews` | Tool reviews |
| `/community/discussions` | Community discussions |
| `/leaderboard` | User leaderboard |
| `/gamification` | Badges & achievements |
| `/dashboard` | User dashboard |
| `/profile` | User profile |
| `/auth/signin` | Sign in page |
| `/auth/signup` | Sign up page |
| `/admin` | Admin dashboard |
| `/admin/users` | Manage users |
| `/admin/tools` | Manage tools |
| `/api/docs` | API documentation |
| `/legal/privacy` | Privacy policy |
| `/legal/terms` | Terms of service |

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Health check |
| `GET` | `/api/tools` | List all tools |
| `POST` | `/api/auth/signin` | Sign in |
| `POST` | `/api/auth/signup` | Sign up |
| `POST` | `/api/search/semantic` | Semantic search |
| `POST` | `/api/gamification/points` | Add user points |
| `GET` | `/api/notifications` | Get notifications |
| `POST` | `/api/analytics` | Track event |
| `POST` | `/api/admin/tools` | Create tool (admin) |
| `PUT` | `/api/admin/tools` | Update tool (admin) |
| `DELETE` | `/api/admin/tools` | Delete tool (admin) |

See **http://localhost:3000/api/docs** for full API documentation.

## 📦 Docker Setup

### Run with Docker Compose
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop services
docker-compose down
```

Services:
- **App**: http://localhost:3000
- **Database**: localhost:5432
- **pgAdmin** (optional): http://localhost:5050

## 🧪 Development Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Format code
npm run format

# Database commands
npm run db:push      # Push schema to DB
npm run db:seed      # Seed sample data
npm run db:studio    # Open Prisma Studio
npm run db:reset     # Reset database

# Migrations
npm run migrate      # Run migrations

# Type check
npm run type-check
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repository to Vercel
3. Add environment variables:
   ```
   DATABASE_URL
   NEXTAUTH_SECRET
   NEXTAUTH_URL
   GITHUB_ID
   GITHUB_SECRET
   OPENAI_API_KEY
   RESEND_API_KEY
   ```
4. Deploy automatically on push

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Docker to Production

```bash
# Build image
docker build -t aiadvisor:latest .

# Run container
docker run -p 3000:3000 \
  -e DATABASE_URL="postgresql://..." \
  -e NEXTAUTH_SECRET="..." \
  aiadvisor:latest
```

### Manual Deployment

```bash
# Build
npm run build

# Start
npm start
```

## 🔐 Security

- ✅ NextAuth for authentication
- ✅ HTTPS/TLS enforced
- ✅ CSRF protection
- ✅ SQL injection prevention (Prisma ORM)
- ✅ XSS protection
- ✅ Rate limiting (planned)
- ✅ Admin route protection
- ✅ Secure environment variables

## 📊 Performance

- ⚡ Next.js 14 (App Router)
- 📦 Automatic code splitting
- 🎨 Tailwind CSS (JIT)
- 🖼️ Image optimization
- 🔄 Incremental Static Regeneration (ISR)
- 📱 PWA with offline support
- 🗜️ Gzip compression

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ Core tool browsing & discovery
- ✅ User authentication
- ✅ Community reviews
- ✅ Gamification system

### Phase 2
- 🔄 Advanced semantic search with real embeddings
- 🔄 AI Matcher improvements
- 🔄 Multi-language support
- 🔄 Collections/favorites

### Phase 3
- 📅 Mobile app (React Native)
- 📅 Email digests
- 📅 Browser extension
- 📅 API marketplace

### Phase 4
- 📅 AI agents integration
- 📅 Real-time notifications
- 📅 Social features
- 📅 Monetization

## 🤝 Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Guidelines
- Use TypeScript for type safety
- Follow ESLint rules
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes

## 📝 License

MIT License — see [LICENSE](./LICENSE) file for details

## 🙋 Support

- 📧 **Email**: support@aiadvisor.tools
- 🐦 **Twitter**: [@aiadvisor_tools](https://twitter.com/aiadvisor_tools)
- 💬 **Discord**: [Join our community](https://discord.gg/aiadvisor)
- 📖 **Documentation**: [Read the docs](https://docs.aiadvisor.tools)

## 📈 Stats

- **Tools**: 6+ (growing)
- **Community members**: 0+ (be the first!)
- **Reviews**: 0+ (start reviewing!)
- **Languages**: 1 (more coming)

---

**Made with ❤️ by the AIAdvisor team**

*Last updated: March 2026*
