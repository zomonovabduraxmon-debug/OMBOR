-- OMBOR QOLDIG'I — Audit Log
-- Run this once in Supabase SQL Editor.

create table if not exists public.audit_logs (
  id text primary key,
  actor_id uuid null,
  actor_email text null,
  action text not null,
  entity_type text not null,
  entity_id text null,
  entity_label text null,
  old_data jsonb null,
  new_data jsonb null,
  reason text null,
  changes jsonb null,
  created_at timestamptz not null default now()
);

-- Additive migration for installations created before the "reason for
-- change" / field-diff feature existed. Safe to re-run.
alter table public.audit_logs add column if not exists reason text null;
alter table public.audit_logs add column if not exists changes jsonb null;

create index if not exists audit_logs_created_at_idx on public.audit_logs(created_at desc);
create index if not exists audit_logs_actor_id_idx on public.audit_logs(actor_id);
create index if not exists audit_logs_entity_idx on public.audit_logs(entity_type, entity_id);

alter table public.audit_logs enable row level security;

drop policy if exists "audit_logs_select_authenticated" on public.audit_logs;
create policy "audit_logs_select_authenticated"
on public.audit_logs for select
to authenticated
using (true);

drop policy if exists "audit_logs_insert_authenticated" on public.audit_logs;
create policy "audit_logs_insert_authenticated"
on public.audit_logs for insert
to authenticated
with check (actor_id is null or actor_id::text = auth.uid()::text);

-- Audit log should be append-only from the application.
-- No UPDATE/DELETE policy is intentionally created.
