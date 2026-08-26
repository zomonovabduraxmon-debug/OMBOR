# Audit Log

This version adds an **Аудит** tab.

It records:
- who changed data (email + Supabase user id)
- date/time
- action
- object
- a compact summary of changes
- old/new JSON snapshots for permits and shipments

## One required Supabase step

Open Supabase → SQL Editor and run **`AUDIT-SUPABASE.sql`** once.

Until that table exists, the audit entries remain in the browser's local IndexedDB and will not be uploaded to the shared database.

## Important

Audit entries are only created for authenticated editors. The audit table is protected by RLS and can only be read/inserted by authenticated users. There are no UPDATE/DELETE policies.
