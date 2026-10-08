---
name: supabase
description: Work with Supabase Postgres, migrations, RLS policies, auth and storage through the supabase CLI, following the migration safety rules. Use when querying data, creating or reviewing a migration, or checking RLS.
---

# Skill: Supabase

Access Supabase databases, run migrations, and manage auth using the Supabase CLI and direct PostgreSQL queries.

## When to use

- Querying the database to understand data shape or debug issues
- Running or creating migrations
- Checking auth configuration
- Inspecting Row Level Security (RLS) policies
- Managing storage buckets

## Prerequisites

- `supabase` CLI installed: `brew install supabase/tap/supabase`
- Authenticated: `supabase login`
- Project linked: `supabase link --project-ref <ref>` (run once per project)
- For direct DB access: connection string from Supabase dashboard → Settings → Database

## Key operations

### Database queries

```bash
# Connect to local Supabase DB (when running locally)
supabase db connect

# Or use psql with the connection string
psql "postgresql://postgres:<password>@db.<ref>.supabase.co:5432/postgres"
```

### Migrations

```bash
# Create a new migration
supabase migration new <name>

# Apply pending migrations to local DB
supabase db reset

# Push migrations to remote (staging/prod)
supabase db push

# Diff schema changes (generates migration from local changes)
supabase db diff --file <name>
```

### Local development

```bash
# Start local Supabase stack (DB + Auth + Studio)
supabase start

# Stop local stack
supabase stop

# Open local Supabase Studio
open http://localhost:54323
```

### Status and inspection

```bash
# Show project status and local URLs
supabase status

# List all migrations
supabase migration list
```

## Migration safety

Follow `SPEC.md` R9 for every migration:

1. **Reuse first.** Check whether an existing column, table or enum value already meets the need. Propose a migration only when it does not, and say what you checked.
2. **Classify each operation.**

   | Risk | Operations | Needs |
   |------|-----------|-------|
   | LOW | Add table, add nullable column, add index (`CREATE INDEX CONCURRENTLY` on large tables) | Normal review |
   | MEDIUM | Add `NOT NULL` column with default, add constraint, backfill data | Test against a copy of real data (`supabase db reset` + seed) |
   | HIGH | Drop or rename a column or table, change a column type, drop a constraint | Explicit user approval and a staged rollout |

3. **Stay backward compatible.** The previous app version must keep working on the new schema: add before you remove, widen before you narrow, and rename in steps (add new, copy data, switch readers, drop old in a later release).
4. **RLS on every new table.** `alter table ... enable row level security;` plus explicit policies, in the same migration.
5. **Write the risk at the top of the file:** `-- migration-risk: LOW | MEDIUM | HIGH`, and for HIGH, who approved it.
6. **Never run `supabase db push` against production without the user's go-ahead.**

## Notes

- Always use migrations for schema changes — never edit the schema directly in production.
- RLS policies must be reviewed whenever a new table is added.
- The `anon` and `service_role` keys have different permission levels — use `anon` in client code.
- Never expose the `service_role` key in client-side code or public repos.
