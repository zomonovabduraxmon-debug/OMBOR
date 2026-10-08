# OMBOR QOLDIG'I

Mengi Tekstil Group ombor hisobi: statik PWA (GitHub Pages) + Supabase. Oflayn ishlaydi (IndexedDB + service worker).

## Fayllar
| Fayl | Vazifa |
|---|---|
| `index.html` | Asosiy ilova (holat, ekranlar, hisob-kitob, eksport) |
| `ui-v13.js`, `ui-v13.css`, `client-final-fixed.css` | Interfeys qatlami (yon panel, tillar, mavzu, eksport tugmasi) |
| `offline-sync.js`, `sync-core.js` | Oflayn saqlash va Supabase bilan sinxronizatsiya |
| `config.js` | Supabase manzili va ommaviy (anon) kalit |
| `sw.js`, `manifest.webmanifest` | PWA |
| `*.sql` | Supabase sozlamalari (pastga qarang) |
| `tests/` | Avtomatik testlar |

## Supabase sozlash (bir marta, SQL Editor)
Yangi loyiha uchun tartib: `AUDIT-SUPABASE.sql` → `HARDENING-v2.sql` → `COMMENTS-EDIT-DELETE.sql` → `AUDIT-DELETE-EDITORS.sql` → `CONTRIBUTORS-SQL.sql` → `PERMIT-PDF-STORAGE.sql` → `INVOICE-FILES-STORAGE.sql`.
Mavjud loyiha uchun faqat `HARDENING-v2.sql` ni ishga tushirish yetarli (qayta ishga tushirish xavfsiz).

`HARDENING-v2.sql` nima beradi:
- `server_now()` — qurilma soati noto'g'ri bo'lsa ham vaqt belgilari to'g'ri qo'yiladi;
- `sync_records()` — server yangiroq versiyani topib qabul qilmagan yozuvlarni qaytaradi, ilova foydalanuvchini ogohlantiradi (avval jimgina yo'qolardi);
- taklif kodi **serverda** tekshiriladi. SQL ichidagi `'OMBOR'` ni o'zingizning kodingizga almashtiring, so'ng `config.js` dagi `editorInviteCode` ni `""` qiling. Kodni keyin o'zgartirish: `update public.app_secrets set value='YANGI' where key='signup_invite_code';`

Tahrirlash huquqi: foydalanuvchi `user_id` sini `editors` (hammasi) yoki `contributors` (qo'shish/tahrirlash, o'chirishsiz) jadvaliga qo'lda qo'shing.

`OPTIONAL-require-login.sql` — ma'lumotni faqat tizimga kirganlarga ko'rsatish (hozir kirmasdan ham ko'rinadi). Ixtiyoriy.

## Testlar
```
node --test "tests/*.test.js"      # Node 18+, hech narsa o'rnatish shart emas
```
GitHub Actions har push da shuni ishga tushiradi (`.github/workflows/test.yml`).

## Zaxira
Eksport bo'limida «Скачать резервную копию» (JSON). Supabase panelida ham muntazam zaxira (Database → Backups) yoqilganini tekshiring.

## Ma'lum cheklovlar
- Bir yozuvni ikki kishi bir vaqtda tahrirlasa, yangiroq o'zgarish saqlanadi; ikkinchisi ogohlantiriladi (yozuv darajasida «oxirgi yozgan yutadi»).
- Interfeys tillari (ru/uz/en/tr) to'liq tarjima qilinmagan: ba'zi matnlar bitta tilda qolgan.
