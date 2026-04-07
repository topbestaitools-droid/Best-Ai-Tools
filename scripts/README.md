# Scripts

This directory contains import and maintenance scripts for the Best AI Tools database.

## Structure

```
scripts/
├── import-awesome-ai-tools.ts   # Main import: Awesome AI lists from GitHub
├── import-product-hunt.ts       # Template: Product Hunt API importer
├── import-github-trending.ts    # Template: GitHub Trending AI repos importer
├── deduplicate-tools.ts         # Maintenance: remove duplicate tools
├── utils/
│   ├── tool-parser.ts           # Shared slug/category/tag parsing utilities
│   └── validate-tool.ts         # Tool data validation helpers
└── README.md                    # This file
```

## Scripts

### `import-awesome-ai-tools.ts`

Fetches tool data from popular "awesome list" repositories on GitHub, parses the
markdown, and upserts records into the database.

**Run:** `npm run import:awesome`

**Sources:**
- `e2b-dev/awesome-ai-agents`
- `steven2358/awesome-generative-ai`
- `ai-collection/ai-collection`

**Options (env vars):**
- `GITHUB_TOKEN` — raises API rate limit from 60/hr to 5000/hr
- `DRY_RUN=true` — preview without writing to DB

---

### `deduplicate-tools.ts`

Scans the database for duplicate tools by website URL and name, keeping the
record with the most reviews (or most recently updated) and deleting the rest.

**Run:** `npm run import:dedupe`

**Options:**
- `DRY_RUN=true` — report duplicates without deleting

---

### `import-product-hunt.ts` *(Template)*

Scaffolding for a future Product Hunt GraphQL API importer.

**Run:** `npm run import:product-hunt`

**Requires:** `PRODUCT_HUNT_API_KEY` environment variable

---

### `import-github-trending.ts` *(Template)*

Scaffolding for importing trending AI/ML repositories from the GitHub Search API.

**Run:** `npm run import:github-trending`

**Options:**
- `GITHUB_TOKEN` — recommended to avoid rate limiting

---

## Utilities

### `utils/tool-parser.ts`

Shared parsing utilities:

| Export | Description |
|---|---|
| `generateSlug(name)` | Converts a name to a URL-safe slug |
| `normalizeCategory(raw)` | Maps raw category strings to standard categories |
| `getClearbitLogoUrl(website)` | Builds a Clearbit logo URL for a domain |
| `normalizePricing(raw)` | Normalizes pricing strings to Free/Freemium/Paid |
| `normalizeTags(rawTags)` | Cleans and deduplicates tag arrays |
| `truncate(str, max)` | Truncates a string with ellipsis |

### `utils/validate-tool.ts`

Validation helpers:

| Export | Description |
|---|---|
| `validateTool(tool)` | Validates a single tool object, returns `{ valid, errors }` |
| `validateBatch(tools)` | Validates an array, returns `{ valid, invalid, stats }` |
| `isValidUrl(url)` | Returns `true` if the string is a valid HTTP/HTTPS URL |
| `isValidSlug(slug)` | Returns `true` if the string is a valid URL slug |

---

## Adding a New Importer

1. Create `scripts/import-<source>.ts`
2. Import shared utilities from `./utils/tool-parser` and `./utils/validate-tool`
3. Set `source = "<source-name>"` on all records
4. Add a script to `package.json`:
   ```json
   "import:<source>": "tsx scripts/import-<source>.ts"
   ```
5. Document it in this README and in `IMPORT_README.md`

See `import-product-hunt.ts` or `import-github-trending.ts` for template examples.
