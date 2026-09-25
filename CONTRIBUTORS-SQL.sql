-- OMBOR QOLDIG'I — "Qo'shuvchi" (cheklangan editor) roli
-- Supabase → SQL Editor'da BIR MARTA ishga tushiring.
--
-- Nima qiladi:
--  1) contributors jadvalini yaratadi. "editors" jadvali kabi ishlaydi:
--     admin bu yerga qo'lda user_id qo'shsa, o'sha foydalanuvchi
--     ruxsatnoma/yuklama QO'SHA va TAHRIRLAY oladi, lekin O'CHIRA olmaydi.
--  2) sync_records funksiyasini (permits/shipments saqlanadigan joy)
--     yangilaydi: endi u chaqirayotgan foydalanuvchi kim ekanini
--     (editors yoki contributors) serverning o'zida tekshiradi.
--     - Hech qaysi jadvalda yo'q foydalanuvchi — umuman yoza olmaydi.
--     - Faqat "contributors"da bor foydalanuvchi — yangi qo'sha va
--       mavjudini tahrirlay oladi, lekin o'chirishga (deleted_at
--       qo'yishga) urinsa, server rad etadi.
--     - "editors"dagi foydalanuvchi — avvalgidek hammasini qila oladi.
--
-- Yangi "qo'shuvchi" qo'shish: admin Supabase → Table Editor →
-- contributors jadvaliga o'sha foydalanuvchining user_id'sini (Supabase
-- Authentication → Users bo'limidan olinadi) qo'lda qo'shadi.

create table if not exists public.contributors (
  user_id uuid primary key
);

alter table public.contributors enable row level security;

drop policy if exists "contributors_select_own" on public.contributors;
create policy "contributors_select_own"
on public.contributors for select
to authenticated
using (user_id = auth.uid());

create or replace function public.sync_records(p_entity text, p_records jsonb)
 returns void
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
declare
  v_is_editor boolean;
  v_is_contributor boolean;
  v_has_delete boolean;
begin
  v_is_editor := exists (select 1 from public.editors e where e.user_id = auth.uid());
  v_is_contributor := v_is_editor or exists (select 1 from public.contributors c where c.user_id = auth.uid());

  if not v_is_contributor then
    raise exception 'FORBIDDEN: tahrirlash huquqi yo''q';
  end if;

  if not v_is_editor then
    -- Faqat "qo'shuvchi": biror yozuvda deleted_at bo'lsa (o'chirishga urinish) — rad etamiz.
    select exists (
      select 1 from jsonb_array_elements(p_records) x
      where nullif(x->>'deleted_at','') is not null
    ) into v_has_delete;

    if v_has_delete then
      raise exception 'FORBIDDEN: qo''shuvchi o''chira olmaydi';
    end if;
  end if;

  if p_entity = 'permit' then
    insert into public.permits (id, data, updated_at, deleted_at)
    select
      x->>'id',
      x->'data',
      (x->>'updated_at')::timestamptz,
      nullif(x->>'deleted_at','')::timestamptz
    from jsonb_array_elements(p_records) x
    on conflict (id) do update
      set data = excluded.data,
          updated_at = excluded.updated_at,
          deleted_at = excluded.deleted_at
    where excluded.updated_at >= public.permits.updated_at;

  elsif p_entity = 'shipment' then
    insert into public.shipments (id, data, updated_at, deleted_at)
    select
      x->>'id',
      x->'data',
      (x->>'updated_at')::timestamptz,
      nullif(x->>'deleted_at','')::timestamptz
    from jsonb_array_elements(p_records) x
    on conflict (id) do update
      set data = excluded.data,
          updated_at = excluded.updated_at,
          deleted_at = excluded.deleted_at
    where excluded.updated_at >= public.shipments.updated_at;
  else
    raise exception 'Unknown entity type: %', p_entity;
  end if;
end;
$function$;
