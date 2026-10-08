-- OMBOR QOLDIG'I — Server tomoni mustahkamlash (v2)
-- Supabase → SQL Editor'da BIR MARTA ishga tushiring. Qayta ishga tushirish xavfsiz.
--
-- Nima qiladi:
--  1) server_now(): qurilma soati noto'g'ri bo'lsa ham to'g'ri vaqt belgisi qo'yish uchun
--     (ilova server vaqtini shu funksiyadan oladi).
--  2) sync_records():
--       - kelajakdagi vaqt belgisini (soati oldinda qurilma) server vaqtiga tushiradi;
--       - server yangiroq versiyani topgani uchun QABUL QILINMAGAN yozuvlar ro'yxatini
--         qaytaradi ({"rejected":[...]}) — ilova foydalanuvchini ogohlantiradi
--         (avval bunday o'zgarishlar jimgina yo'qolardi);
--       - yozuv shaklini tekshiradi (id va data bo'lishi shart).
--       Ruxsatlar avvalgidek: editors — hammasi; contributors — qo'shish/tahrirlash, o'chirish yo'q.
--  3) Ro'yxatdan o'tish taklif kodini SERVERDA tekshiradi (auth.users trigger).
--     Kod brauzerdagi config.js'da turishi shart emas. Admin Supabase paneldan yoki
--     service_role orqali qo'shgan foydalanuvchilarga bu tekshiruv tegmaydi.
--  4) Asosiy jadvallar mavjud bo'lmasa yaratadi (yangi loyiha / tiklash uchun).
--     Mavjud jadvallar va siyosatlarga TEGMAYDI.
--
-- TARTIB: avval shu faylni ishga tushiring, so'ng pastdagi "TAKLIF KODI" bo'limidagi
-- kodni o'zingiznikiga almashtiring, keyin config.js'dagi editorInviteCode ni bo'sh qoldiring.

-- ===========================================================================
-- 4) Asosiy jadvallar (mavjud bo'lsa o'zgarmaydi)
-- ===========================================================================
create table if not exists public.permits (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now(),
  deleted_at timestamptz null
);
create table if not exists public.shipments (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now(),
  deleted_at timestamptz null
);
create table if not exists public.editors (
  user_id uuid primary key
);
create table if not exists public.contributors (
  user_id uuid primary key
);
create table if not exists public.comments (
  id text primary key,
  entity_type text null,
  entity_id text null,
  author_id uuid null,
  author_email text null,
  text text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz null,
  deleted_at timestamptz null
);
create index if not exists permits_updated_at_idx on public.permits(updated_at desc);
create index if not exists shipments_updated_at_idx on public.shipments(updated_at desc);

alter table public.permits enable row level security;
alter table public.shipments enable row level security;
alter table public.editors enable row level security;
alter table public.contributors enable row level security;
alter table public.comments enable row level security;

-- Faqat mavjud bo'lmagan hollarda zarur o'qish siyosatlari (ilova permits/shipments'ni
-- kirmasdan ham ko'rsatadi). Boshqa nomdagi mavjud siyosatlar saqlanib qoladi.
do $$
begin
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='permits' and cmd='SELECT') then
    create policy "permits_select_all" on public.permits for select to anon, authenticated using (true);
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='shipments' and cmd='SELECT') then
    create policy "shipments_select_all" on public.shipments for select to anon, authenticated using (true);
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='editors' and cmd='SELECT') then
    create policy "editors_select_own" on public.editors for select to authenticated using (user_id = auth.uid());
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='contributors' and cmd='SELECT') then
    create policy "contributors_select_own" on public.contributors for select to authenticated using (user_id = auth.uid());
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='comments' and cmd='SELECT') then
    create policy "comments_select_all" on public.comments for select to anon, authenticated using (true);
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='comments' and cmd='INSERT') then
    create policy "comments_insert_authenticated" on public.comments for insert to authenticated
      with check (author_id is null or author_id::text = auth.uid()::text);
  end if;
end $$;

-- ===========================================================================
-- 1) Server vaqti
-- ===========================================================================
create or replace function public.server_now()
 returns timestamptz
 language sql
 stable
as $$ select now() $$;

grant execute on function public.server_now() to anon, authenticated;

-- ===========================================================================
-- 2) sync_records v2 (qaytish turi void -> jsonb, shu sabab avval o'chiriladi)
-- ===========================================================================
drop function if exists public.sync_records(text, jsonb);

create function public.sync_records(p_entity text, p_records jsonb)
 returns jsonb
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
declare
  v_is_editor boolean;
  v_is_contributor boolean;
  v_has_delete boolean;
  v_ids text[];
  v_accepted text[];
  v_rejected text[];
  v_limit timestamptz := now() + interval '1 minute';
begin
  v_is_editor := exists (select 1 from public.editors e where e.user_id = auth.uid());
  v_is_contributor := v_is_editor or exists (select 1 from public.contributors c where c.user_id = auth.uid());

  if not v_is_contributor then
    raise exception 'FORBIDDEN: tahrirlash huquqi yo''q';
  end if;

  if p_entity not in ('permit','shipment') then
    raise exception 'Unknown entity type: %', p_entity;
  end if;

  if p_records is null or jsonb_typeof(p_records) <> 'array' then
    raise exception 'INVALID: p_records massiv bo''lishi kerak';
  end if;

  if exists (
    select 1 from jsonb_array_elements(p_records) x
    where nullif(x->>'id','') is null
       or coalesce(jsonb_typeof(x->'data'),'') <> 'object'
       or nullif(x->>'updated_at','') is null
  ) then
    raise exception 'INVALID: har bir yozuvda id, data (obyekt) va updated_at bo''lishi shart';
  end if;

  if not v_is_editor then
    select exists (
      select 1 from jsonb_array_elements(p_records) x
      where nullif(x->>'deleted_at','') is not null
    ) into v_has_delete;
    if v_has_delete then
      raise exception 'FORBIDDEN: qo''shuvchi o''chira olmaydi';
    end if;
  end if;

  select array_agg(x->>'id') into v_ids from jsonb_array_elements(p_records) x;

  if p_entity = 'permit' then
    with ins as (
      insert into public.permits (id, data, updated_at, deleted_at)
      select
        x->>'id',
        x->'data',
        least((x->>'updated_at')::timestamptz, v_limit),
        case when nullif(x->>'deleted_at','') is null then null
             else least((x->>'deleted_at')::timestamptz, v_limit) end
      from jsonb_array_elements(p_records) x
      on conflict (id) do update
        set data = excluded.data,
            updated_at = excluded.updated_at,
            deleted_at = excluded.deleted_at
      where excluded.updated_at >= public.permits.updated_at
      returning id
    )
    select array_agg(id) into v_accepted from ins;
  else
    with ins as (
      insert into public.shipments (id, data, updated_at, deleted_at)
      select
        x->>'id',
        x->'data',
        least((x->>'updated_at')::timestamptz, v_limit),
        case when nullif(x->>'deleted_at','') is null then null
             else least((x->>'deleted_at')::timestamptz, v_limit) end
      from jsonb_array_elements(p_records) x
      on conflict (id) do update
        set data = excluded.data,
            updated_at = excluded.updated_at,
            deleted_at = excluded.deleted_at
      where excluded.updated_at >= public.shipments.updated_at
      returning id
    )
    select array_agg(id) into v_accepted from ins;
  end if;

  select coalesce(array_agg(i), '{}') into v_rejected
  from unnest(v_ids) i
  where i <> all (coalesce(v_accepted, '{}'));

  return jsonb_build_object('rejected', to_jsonb(v_rejected));
end;
$function$;

revoke all on function public.sync_records(text, jsonb) from public;
grant execute on function public.sync_records(text, jsonb) to authenticated;

-- ===========================================================================
-- 3) Ro'yxatdan o'tish taklif kodini serverda tekshirish
-- ===========================================================================
create table if not exists public.app_secrets (
  key text primary key,
  value text not null
);
-- RLS yoqilgan va siyosat YO'Q: brauzer (anon/authenticated) bu jadvalni o'qiy olmaydi.
alter table public.app_secrets enable row level security;
revoke all on public.app_secrets from anon, authenticated;

-- !!! TAKLIF KODI: pastdagi 'OMBOR' ni o'zingizning murakkab kodingizga almashtiring.
-- Keyinchalik o'zgartirish:  update public.app_secrets set value = 'YANGI-KOD' where key = 'signup_invite_code';
-- Tekshiruvni butunlay o'chirish uchun qiymatni bo'sh qoldiring ('').
insert into public.app_secrets (key, value) values ('signup_invite_code', 'OMBOR')
on conflict (key) do nothing;

create or replace function public.check_signup_invite()
 returns trigger
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
declare
  expected text;
  given text;
begin
  -- Faqat ochiq (anon) ro'yxatdan o'tishda tekshiramiz. Admin paneli / service_role / SQL orqali
  -- qo'shilgan foydalanuvchilarga tegmaymiz.
  if coalesce(auth.role(), '') <> 'anon' then
    return new;
  end if;
  select value into expected from public.app_secrets where key = 'signup_invite_code';
  if expected is null or expected = '' then
    return new;
  end if;
  given := coalesce(new.raw_user_meta_data->>'invite_code', '');
  if given is distinct from expected then
    raise exception 'INVITE_CODE_INVALID';
  end if;
  -- Kodni foydalanuvchi profilida saqlab qo'ymaymiz.
  new.raw_user_meta_data := new.raw_user_meta_data - 'invite_code';
  return new;
end;
$function$;

revoke all on function public.check_signup_invite() from public, anon, authenticated;

drop trigger if exists trg_check_signup_invite on auth.users;
create trigger trg_check_signup_invite
  before insert on auth.users
  for each row execute function public.check_signup_invite();
