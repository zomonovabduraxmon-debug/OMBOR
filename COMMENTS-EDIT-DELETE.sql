-- OMBOR QOLDIG'I — Izohlarni tahrirlash / o'chirish (faqat editor)
-- Supabase → SQL Editor'da BIR MARTA ishga tushiring.
--
-- Nima qiladi:
--  1) comments jadvaliga updated_at va deleted_at ustunlarini qo'shadi
--     (mavjud bo'lsa, qayta ishga tushirish xavfsiz — hech narsa buzilmaydi).
--  2) Faqat "editors" jadvalidagi foydalanuvchilarga izohni UPDATE qilish
--     (matnini o'zgartirish yoki deleted_at qo'yib "o'chirish") huquqini beradi.
--     Oddiy (editor bo'lmagan) tizimga kirgan foydalanuvchilar hamon yangi
--     izoh qo'sha oladi (bu — mavjud comments_insert_authenticated siyosati,
--     bu skript uni o'zgartirmaydi), lekin mavjud izohni o'zgartira/o'chira
--     olmaydi.

alter table public.comments add column if not exists updated_at timestamptz null;
alter table public.comments add column if not exists deleted_at timestamptz null;

create index if not exists comments_deleted_at_idx on public.comments(deleted_at);

-- Xavfsizlik uchun RLS yoqilganligiga ishonch hosil qilamiz
-- (odatda comments_insert_authenticated siyosati yaratilganda allaqachon yoqilgan).
alter table public.comments enable row level security;

drop policy if exists "comments_update_editors" on public.comments;
create policy "comments_update_editors"
on public.comments for update
to authenticated
using (
  exists (select 1 from public.editors e where e.user_id = auth.uid())
)
with check (
  exists (select 1 from public.editors e where e.user_id = auth.uid())
);
