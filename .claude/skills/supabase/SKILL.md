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

## Notes

- Always use migrations for schema changes — never edit the schema directly in production.
- RLS policies must be reviewed whenever a new table is added.
- The `anon` and `service_role` keys have different permission levels — use `anon` in client code.
- Never expose the `service_role` key in client-side code or public repos.
