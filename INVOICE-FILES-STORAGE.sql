-- OMBOR QOLDIG'I — Invoysning imzolangan/tasdiqlangan hujjati (PDF yoki ZIP)
-- Supabase → SQL Editor'da BIR MARTA ishga tushiring.
--
-- Nima qiladi:
--  1) "invoice-files" nomli YOPIQ (private) Storage bucket yaratadi.
--     Havolani bilgan begona odam faylni och OLMAYDI; dastur faylni ochishda
--     qisqa muddatli (5 daqiqa) xavfsiz havola oladi.
--  2) Fayl hajmi 20 MB bilan cheklanadi.
--  3) KO'RISH/yuklab olish: tizimga kirgan har qanday foydalanuvchi
--     (ya'ni "Yuklamalar tarixi"ni ko'ra oladigan hamma).
--  4) YUKLASH / ALMASHTIRISH / O'CHIRISH: "editors" HAM "contributors"
--     jadvalidagi foydalanuvchilar (yuklama qo'sha oladiganlar).
--
-- Eslatma: "editors" va "contributors" jadvallari allaqachon mavjud bo'lishi kerak.

insert into storage.buckets (id, name, public, file_size_limit)
values ('invoice-files', 'invoice-files', false, 20971520)
on conflict (id) do update set public = false, file_size_limit = 20971520;

drop policy if exists "invoice_files_select_authenticated" on storage.objects;
create policy "invoice_files_select_authenticated"
on storage.objects for select
to authenticated
using (bucket_id = 'invoice-files');

drop policy if exists "invoice_files_insert_contributors" on storage.objects;
create policy "invoice_files_insert_contributors"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'invoice-files'
  and (
    exists (select 1 from public.editors e where e.user_id = auth.uid())
    or exists (select 1 from public.contributors c where c.user_id = auth.uid())
  )
);

drop policy if exists "invoice_files_update_contributors" on storage.objects;
create policy "invoice_files_update_contributors"
on storage.objects for update
to authenticated
using (
  bucket_id = 'invoice-files'
  and (
    exists (select 1 from public.editors e where e.user_id = auth.uid())
    or exists (select 1 from public.contributors c where c.user_id = auth.uid())
  )
)
with check (
  bucket_id = 'invoice-files'
  and (
    exists (select 1 from public.editors e where e.user_id = auth.uid())
    or exists (select 1 from public.contributors c where c.user_id = auth.uid())
  )
);

drop policy if exists "invoice_files_delete_contributors" on storage.objects;
create policy "invoice_files_delete_contributors"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'invoice-files'
  and (
    exists (select 1 from public.editors e where e.user_id = auth.uid())
    or exists (select 1 from public.contributors c where c.user_id = auth.uid())
  )
);
