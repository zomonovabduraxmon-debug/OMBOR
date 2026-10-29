-- Ruxsatnoma va invoys fayllari uchun ruxsat etilgan fayl turlari (server tomonida).
-- PDF, ZIP, RAR, 7Z, Excel, CSV, Word va rasmlar. HTML/JS/SVG ruxsat etilmagan
-- (ochiq bucketda ular saytda ishlab ketishi mumkin).
-- Supabase → SQL Editor da bir marta ishga tushiring.

update storage.buckets
set allowed_mime_types = array[
  'application/pdf',
  'application/zip', 'application/x-zip-compressed',
  'application/vnd.rar', 'application/x-rar-compressed', 'application/x-rar',
  'application/x-7z-compressed',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/csv',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg', 'image/png'
]
where id in ('permit-pdfs', 'invoice-files');

-- Tekshirish:
select id, allowed_mime_types, file_size_limit from storage.buckets
where id in ('permit-pdfs', 'invoice-files');
