# Audit Log

This version adds an **Аудит** tab.

It records:
- who changed data (email + Supabase user id)
- date/time
- action
- object
- a compact summary of changes
- old/new JSON snapshots for permits and shipments
- the mandatory reason entered for an edit or deletion
- a field-by-field list of exactly what changed (previous value → new value)

Editing a record only asks for a reason when something was actually
changed. Saving an edit with no changes, or creating a brand-new record,
does not prompt for a reason (new records are still logged). Deleting a
record always requires a reason.

Click any row in the History/Audit table to open a detail view with the
full before/after comparison.

## One required Supabase step

Open Supabase → SQL Editor and run **`AUDIT-SUPABASE.sql`** once.

Until that table exists, the audit entries remain in the browser's local IndexedDB and will not be uploaded to the shared database.

If you already ran this script before the reason/changes fields were
added, re-run it — it now also adds the two new columns
(`reason`, `changes`) to an existing `audit_logs` table without touching
any existing rows.

## Important

Audit entries are only created for authenticated editors. The audit table is protected by RLS and can only be read/inserted by authenticated users. There are no UPDATE/DELETE policies.
