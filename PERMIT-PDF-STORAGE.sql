-- OMBOR QOLDIG'I — Ruxsatnoma PDF fayllari (Supabase Storage)
-- Supabase → SQL Editor'da BIR MARTA ishga tushiring.
--
-- Nima qiladi:
--  1) "permit-pdfs" nomli ochiq (public) Storage bucket yaratadi. Bucket
--     public bo'lgani uchun yuklangan PDF faylni istalgan payt (login
--     talab qilinmasdan) ochish/yuklab olish mumkin bo'ladi — xuddi
--     ruxsatnoma ma'lumotlari (permits jadvali) kabi ochiq ko'rinadi.
--  2) Shu bucket'ga fayl YUKLASH (INSERT) va ALMASHTIRISH (UPDATE)
--     huquqini faqat tizimga kirgan "editors" HAM "contributors"
--     jadvalidagi foydalanuvchilarga beradi (xuddi ruxsatnoma/yuklama
--     qo'sha olish huquqi bilan bir xil — CONTRIBUTORS-SQL.sql'ga qarang).
--  3) Faylni O'CHIRISH (DELETE) huquqini faqat "editors" jadvalidagilarga
--     beradi.
--
-- Eslatma: bu skript "editors" va "contributors" jadvallari allaqachon
-- mavjud bo'lishini talab qiladi (ular avvalgi SQL skriptlar bilan
-- yaratilgan bo'lishi kerak). Agar "contributors" jadvali hali yaratilmagan
-- bo'lsa, avval CONTRIBUTORS-SQL.sql'ni ishga tushiring.

insert into storage.buckets (id, name, public)
values ('permit-pdfs', 'permit-pdfs', true)
on conflict (id) do update set public = true;

-- O'qish (fayl ochish/yuklab olish): bucket public bo'lgani uchun bu odatda
-- shart emas, lekin Storage API orqali ro'yxatlash/select ham ishlashi
-- uchun qo'shib qo'yamiz.
drop policy if exists "permit_pdfs_select_public" on storage.objects;
create policy "permit_pdfs_select_public"
on storage.objects for select
to public
using (bucket_id = 'permit-pdfs');

-- Yuklash (yangi PDF qo'shish): editor HAM contributor.
drop policy if exists "permit_pdfs_insert_contributors" on storage.objects;
create policy "permit_pdfs_insert_contributors"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'permit-pdfs'
  and (
    exists (select 1 from public.editors e where e.user_id = auth.uid())
    or exists (select 1 from public.contributors c where c.user_id = auth.uid())
  )
);

-- Almashtirish (mavjud faylni yangisi bilan upsert qilish): editor HAM contributor.
drop policy if exists "permit_pdfs_update_contributors" on storage.objects;
create policy "permit_pdfs_update_contributors"
on storage.objects for update
to authenticated
using (
  bucket_id = 'permit-pdfs'
  and (
    exists (select 1 from public.editors e where e.user_id = auth.uid())
    or exists (select 1 from public.contributors c where c.user_id = auth.uid())
  )
)
with check (
  bucket_id = 'permit-pdfs'
  and (
    exists (select 1 from public.editors e where e.user_id = auth.uid())
    or exists (select 1 from public.contributors c where c.user_id = auth.uid())
  )
);

-- O'chirish: faqat to'liq editor.
drop policy if exists "permit_pdfs_delete_editors" on storage.objects;
create policy "permit_pdfs_delete_editors"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'permit-pdfs'
  and exists (select 1 from public.editors e where e.user_id = auth.uid())
);
