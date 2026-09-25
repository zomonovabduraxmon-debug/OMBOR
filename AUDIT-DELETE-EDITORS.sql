-- OMBOR QOLDIG'I — Tarix (audit_logs) yozuvlarini o'chirish (faqat editor)
-- Supabase → SQL Editor'da BIR MARTA ishga tushiring.
--
-- Nima qiladi:
--  1) audit_logs jadvaliga deleted_at ustunini qo'shadi (mavjud bo'lsa,
--     qayta ishga tushirish xavfsiz — hech narsa buzilmaydi). O'chirish
--     "soft delete": qator jadvaldan olinmaydi, faqat deleted_at vaqt bilan
--     belgilanadi (comments jadvalidagi kabi), shunda offline sinxronizatsiya
--     va boshqa qurilmalarga tarqalishi ishlaydi.
--  2) Faqat "editors" jadvalidagilarga audit_logs qatorini UPDATE qilish
--     (ya'ni deleted_at qo'yib "o'chirish") huquqini beradi. Jurnal odatdagidek
--     append-only qoladi: oddiy foydalanuvchilar yangi yozuv qo'sha oladi
--     (mavjud audit_logs_insert_authenticated siyosati o'zgarmaydi), lekin
--     mavjud yozuvni faqat editor o'chira oladi.

alter table public.audit_logs add column if not exists deleted_at timestamptz null;

create index if not exists audit_logs_deleted_at_idx on public.audit_logs(deleted_at);

alter table public.audit_logs enable row level security;

drop policy if exists "audit_logs_update_editors" on public.audit_logs;
create policy "audit_logs_update_editors"
on public.audit_logs for update
to authenticated
using (
  exists (select 1 from public.editors e where e.user_id = auth.uid())
)
with check (
  exists (select 1 from public.editors e where e.user_id = auth.uid())
);
