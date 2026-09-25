# Ruxsatnoma PDF fayli

Endi ruxsatnoma (разрешение) qo'shilganda/tahrirlanganda unga tegishli
**PDF faylni** ham biriktirish mumkin. Biriktirilgan PDF:

- Ruxsatnoma qo'shish/tahrirlash oynasida (modal) yuklanadi.
- Ruxsatnomalar ro'yxatida (jadval qatorida) "📄 PDF" tugmasi orqali,
  shuningdek ruxsatnoma tafsilotlari (fullscreen) oynasida "📄 ... — ochish /
  yuklab olish" havolasi orqali istalgan payt ochiladi/yuklab olinadi.
- Mavjud PDF o'rniga yangisini yuklash ("Almashtirish") yoki uni olib
  tashlash ("Olib tashlash") mumkin.

## Bir marta bajariladigan Supabase qadami

Supabase → SQL Editor'ga o'ting va **`PERMIT-PDF-STORAGE.sql`** faylini bir
marta ishga tushiring. Bu skript:

1. `permit-pdfs` nomli ochiq (public) Storage bucket yaratadi — shu joyga
   PDF fayllar yuklanadi va shu yerdan hammaga (login talab qilinmasdan)
   ochiladi/yuklab olinadi.
2. Faylni **yuklash/almashtirish** huquqini faqat tizimga kirgan
   "editors" HAM "contributors" jadvalidagi foydalanuvchilarga beradi —
   xuddi ruxsatnoma qo'sha olish huquqi bilan bir xil.
3. Faylni **o'chirish** huquqini faqat "editors" jadvalidagilarga beradi.

Bu qadam bajarilmaguncha PDF yuklash urinishi xatolik beradi (server
"ruxsat yo'q" deb rad etadi), chunki `permit-pdfs` bucket hali mavjud
bo'lmaydi.

## Muhim

- PDF fayllar `permit-pdfs` bucket ichida `<ruxsatnoma_id>/<vaqt>_<fayl_nomi>`
  yo'li bilan saqlanadi.
- Bucket **public** — ya'ni PDF havolasini bilgan har kim ochishi mumkin
  (xuddi ruxsatnoma ma'lumotlari saytda ochiq ko'rinishi kabi). Agar bu
  istalmasa, kelajakda bucket'ni yopiq qilib, PDF'ni faqat tizimga kirgan
  foydalanuvchilarga (signed URL orqali) ko'rsatishga o'tkazish mumkin.
