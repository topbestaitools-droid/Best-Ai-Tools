# Import System — Quick Start

This guide explains how to populate your database with 1000+ AI tools using the built-in import scripts.

## Prerequisites

1. **PostgreSQL database** running and accessible
2. **`.env` file** at the project root with `DATABASE_URL` set:
   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/bestaitools"
   ```
3. **Dependencies installed**: `npm install`
4. **Prisma schema applied**: `npm run db:push`

---

## Available Import Commands

| Command | Description |
|---|---|
| `npm run import:awesome` | Import 1000+ tools from Awesome AI lists |
| `npm run import:dedupe` | Remove duplicate tools from the database |
| `npm run import:product-hunt` | *(Template)* Import from Product Hunt API |
| `npm run import:github-trending` | *(Template)* Import GitHub trending AI repos |

---

## Step-by-Step: Populate Your Database

### 1. Apply the database schema

```bash
npm run db:push
```

### 2. Run the main import

```bash
npm run import:awesome
```

This will:
- Fetch tool data from curated GitHub awesome lists
- Parse tool names, descriptions, websites, and categories
- Validate all entries (URLs, slugs, required fields)
- Upsert into your database (safe to re-run — no duplicates)
- Print a progress log and final summary

Expected output:
```
🚀 Starting Awesome AI Tools import...
   Mode: LIVE
   Sources: 3 repositories

📥 Fetching e2b-dev/awesome-ai-agents/README.md...
   Parsed 85 raw entries
...
🎉 Import complete!
   Inserted : 947
   Updated  : 0
   Skipped  : 12
   Total DB : 947
```

### 3. Clean up duplicates

```bash
npm run import:dedupe
```

### 4. Start the dev server

```bash
npm run dev
```

Visit `http://localhost:3000/tools` to see your imported tools.

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | ✅ Yes | PostgreSQL connection string |
| `GITHUB_TOKEN` | Optional | Raises GitHub API rate limit (5000/hr vs 60/hr) |
| `DRY_RUN` | Optional | Set `true` to preview without writing to DB |

### Setting a GitHub Token (recommended)

Without a token, GitHub limits you to **60 requests/hour**. With a token: **5000/hr**.

1. Go to https://github.com/settings/tokens
2. Create a **Classic token** with `public_repo` scope
3. Add to `.env`:
   ```
   GITHUB_TOKEN="ghp_your_token_here"
   ```

---

## Dry Run Mode

Test imports without writing to the database:

```bash
DRY_RUN=true npm run import:awesome
DRY_RUN=true npm run import:dedupe
```

---

## Future Import Sources

### Product Hunt

Requires a Product Hunt Developer API key:

1. Register at https://api.producthunt.com/v2/oauth/token
2. Add `PRODUCT_HUNT_API_KEY=your_key` to `.env`
3. Run: `npm run import:product-hunt`

### GitHub Trending

Uses the GitHub Search API (set `GITHUB_TOKEN` for higher rate limits):

```bash
npm run import:github-trending
```

---

## Data Model

The `Tool` table includes the following fields added for the import system:

| Field | Type | Description |
|---|---|---|
| `source` | String? | Where the tool was imported from |
| `importedAt` | DateTime? | When the tool was imported |
| `description` | String? | Full description (longer than tagline) |
| `category` | String? | Normalized category (e.g., "Machine Learning") |
| `logoUrl` | String? | Logo URL (Clearbit when available) |
| `rating` | Float? | Average rating from source |

---

## Troubleshooting

**`PrismaClientKnownRequestError: Invalid value for argument`**
→ Run `npm run db:push` to apply schema changes.

**`Error: GitHub API error 403`**
→ You've hit the rate limit. Set `GITHUB_TOKEN` or wait for the window to reset.

**`Error: connect ECONNREFUSED`**
→ Check `DATABASE_URL` in your `.env` file.
