-- OMBOR QOLDIG'I — IXTIYORIY: ma'lumotni faqat tizimga kirganlar ko'rsin
--
-- HOZIRGI HOLAT: ruxsatnoma, yuklama va izohlar kirmasdan ham (anon kalit bilan) o'qiladi,
-- ilova "Режим просмотра" da ma'lumotni kirmagan odamga ham ko'rsatadi.
-- Agar ma'lumot FAQAT tizimga kirgan foydalanuvchilarga ko'rinsin desangiz, shu faylni
-- Supabase → SQL Editor'da ishga tushiring.
--
-- OGOHLANTIRISH: shundan keyin kirmagan foydalanuvchi ilovada ma'lumotni ko'rmaydi
-- (avval «Войти» tugmasi orqali kirishi kerak). Shuning uchun bu fayl alohida va ixtiyoriy.
-- Bekor qilish: pastdagi "drop policy" ni "create policy ... to anon, authenticated using (true)" bilan almashtiring.

drop policy if exists "permits_select_all" on public.permits;
drop policy if exists "shipments_select_all" on public.shipments;
drop policy if exists "comments_select_all" on public.comments;

-- Boshqa nomdagi mavjud SELECT siyosatlarini ko'rish:
--   select tablename, policyname, roles from pg_policies
--   where schemaname='public' and cmd='SELECT' and tablename in ('permits','shipments','comments');
-- Ro'yxatda anon ruxsati bor boshqa siyosat chiqsa, uni ham o'chiring.

create policy "permits_select_authenticated" on public.permits for select to authenticated using (true);
create policy "shipments_select_authenticated" on public.shipments for select to authenticated using (true);
create policy "comments_select_authenticated" on public.comments for select to authenticated using (true);
