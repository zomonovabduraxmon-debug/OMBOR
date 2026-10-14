(function(root, factory){
  const api = factory();
  if(typeof module !== 'undefined' && module.exports) module.exports = api;
  if(root) root.EOMBOR_UI_V5 = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function(){
  'use strict';

  const PAGE_SIZE = 20;
  const LANG_KEY = 'eombor_lang_v5';
  const THEME_KEY = 'eombor_theme_v5';

  const LANGUAGES = {
    en:{label:'English', flag:'🇬🇧', htmlLang:'en'},
    ru:{label:'Русский', flag:'🇷🇺', htmlLang:'ru'},
    uz:{label:"O‘zbek", flag:'🇺🇿', htmlLang:'uz'},
    tr:{label:'Türkçe', flag:'🇹🇷', htmlLang:'tr'}
  };

  const UI_TEXT = {
    brandSub:{ru:'рухсатнома · остатки по квотам',en:'permits · quota balances',uz:'ruxsatnoma · kvota qoldiqlari',tr:'izinler · kota bakiyeleri'},
    dashboard:{ru:'Остатки',en:'Balances',uz:'Qoldiqlar',tr:'Bakiyeler'},
    permits:{ru:'Разрешения',en:'Permits',uz:'Ruxsatnomalar',tr:'İzinler'},
    shipment:{ru:'Новая отгрузка',en:'New shipment',uz:'Yangi yuklama',tr:'Yeni sevkiyat'},
    export:{ru:'Экспорт',en:'Export',uz:'Eksport',tr:'Dışa aktar'},
    dashboardTitle:{ru:'Остатки по разрешениям',en:'Balances by permit',uz:'Ruxsatnomalar bo‘yicha qoldiqlar',tr:'İzinlere göre bakiyeler'},
    dashboardDesc:{ru:'Сводка по всем позициям всех загруженных разрешений',en:'Summary of all items across uploaded permits',uz:'Yuklangan barcha ruxsatnomalardagi pozitsiyalar bo‘yicha jamlanma',tr:'Yüklenen tüm izinlerdeki kalemlerin özeti'},
    searchPlaceholder:{ru:'Поиск: номер, товар, ТН ВЭД…',en:'Search: number, item, HS code…',uz:'Qidirish: raqam, mahsulot, TIF TN…',tr:'Ara: numara, ürün, GTİP…'},
    filterAll:{ru:'Фильтр: Все',en:'Filter: All',uz:'Filtr: Barchasi',tr:'Filtre: Tümü'},
    statusOk:{ru:'В норме',en:'Normal',uz:'Me’yorda',tr:'Normal'},
    statusWarn:{ru:'Мало осталось',en:'Low balance',uz:'Kam qoldi',tr:'Az kaldı'},
    statusFinished:{ru:'Закончено',en:'Finished',uz:'Tugagan',tr:'Bitti'},
    statusOver:{ru:'Перерасход',en:'Overdrawn',uz:'Ortiqcha sarf',tr:'Aşım'},
    accepted:{ru:'Accepted',en:'Accepted',uz:'Qabul qilingan',tr:'Kabul edildi'},
    completed:{ru:'Completed',en:'Completed',uz:'Yakunlangan',tr:'Tamamlandı'},
    sortRemainDesc:{ru:'Остаток: больше → меньше',en:'Balance: high → low',uz:'Qoldiq: ko‘p → kam',tr:'Bakiye: çok → az'},
    sortRemainAsc:{ru:'Остаток: меньше → больше',en:'Balance: low → high',uz:'Qoldiq: kam → ko‘p',tr:'Bakiye: az → çok'},
    sortDateDesc:{ru:'Дата: новые → старые',en:'Date: newest → oldest',uz:'Sana: yangi → eski',tr:'Tarih: yeni → eski'},
    sortDateAsc:{ru:'Дата: старые → новые',en:'Date: oldest → newest',uz:'Sana: eski → yangi',tr:'Tarih: eski → yeni'},
    stockTitle:{ru:'Остаток на складе',en:'Warehouse balance',uz:'Ombor qoldig‘i',tr:'Depo bakiyesi'},
    stockHint:{ru:'Итого по текущему фильтру',en:'Total for current filter',uz:'Joriy filtr bo‘yicha jami',tr:'Geçerli filtre toplamı'},
    stockHintSearch:{ru:'Итого по текущему фильтру и поиску',en:'Total for current filter and search',uz:'Joriy filtr va qidiruv bo‘yicha jami',tr:'Geçerli filtre ve arama toplamı'},
    permitsTotal:{ru:'Разрешений всего',en:'Total permits',uz:'Jami ruxsatnomalar',tr:'Toplam izin'},
    finishedOver:{ru:'Закончено / перерасход',en:'Finished / overdrawn',uz:'Tugagan / ortiqcha sarf',tr:'Bitti / aşım'},
    positions:{ru:'Позиции',en:'Items',uz:'Pozitsiyalar',tr:'Kalemler'},
    permitHeader:{ru:'Разрешение',en:'Permit',uz:'Ruxsatnoma',tr:'İzin'},
    nameHeader:{ru:'Наименование',en:'Item name',uz:'Nomi',tr:'Ürün adı'},
    categoryHeader:{ru:'Категория',en:'Category',uz:'Kategoriya',tr:'Kategori'},
    allowedHeader:{ru:'Разрешено',en:'Allowed',uz:'Ruxsat etilgan',tr:'İzin verilen'},
    shippedHeader:{ru:'Отгружено',en:'Shipped',uz:'Yuklangan',tr:'Sevk edildi'},
    remainQtyHeader:{ru:'Остаток кол-во',en:'Balance qty',uz:'Qoldiq soni',tr:'Kalan miktar'},
    remainWeightHeader:{ru:'Остаток вес',en:'Balance weight',uz:'Qoldiq vazni',tr:'Kalan ağırlık'},
    fillHeader:{ru:'Заполнение',en:'Remaining',uz:'Qolgan ulush',tr:'Kalan oran'},
    statusHeader:{ru:'Статус',en:'Status',uz:'Holat',tr:'Durum'},
    totalFilter:{ru:'Итого по фильтру',en:'Filter total',uz:'Filtr bo‘yicha jami',tr:'Filtre toplamı'},
    noFilterData:{ru:'По этому фильтру данных нет',en:'No data for this filter',uz:'Bu filtr bo‘yicha ma’lumot yo‘q',tr:'Bu filtre için veri yok'},
    changeFilter:{ru:'Измените фильтр, сортировку или поиск.',en:'Change the filter, sort, or search.',uz:'Filtr, saralash yoki qidiruvni o‘zgartiring.',tr:'Filtreyi, sıralamayı veya aramayı değiştirin.'},
    permitsTitle:{ru:'Разрешения',en:'Permits',uz:'Ruxsatnomalar',tr:'İzinler'},
    permitsDesc:{ru:'Реестр разрешений (рухсатнома) и их позиций',en:'Registry of permits and their items',uz:'Ruxsatnomalar va ularning pozitsiyalari reyestri',tr:'İzinler ve kalemleri kaydı'},
    addPermit:{ru:'+ Добавить разрешение',en:'+ Add permit',uz:'+ Ruxsatnoma qo‘shish',tr:'+ İzin ekle'},
    positionsHeader:{ru:'Позиций',en:'Items',uz:'Pozitsiyalar',tr:'Kalemler'},
    allowedQty:{ru:'Разрешено, шт',en:'Allowed, qty',uz:'Ruxsat etilgan, dona',tr:'İzin verilen, adet'},
    remainHeader:{ru:'Остаток',en:'Balance',uz:'Qoldiq',tr:'Bakiye'},
    edit:{ru:'Изменить',en:'Edit',uz:'Tahrirlash',tr:'Düzenle'},
    delete:{ru:'Удалить',en:'Delete',uz:'O‘chirish',tr:'Sil'},
    noPermits:{ru:'Разрешений ещё нет',en:'No permits yet',uz:'Hali ruxsatnomalar yo‘q',tr:'Henüz izin yok'},
    addFirstPermit:{ru:'Нажмите «Добавить разрешение», чтобы внести первое.',en:'Click “Add permit” to create the first one.',uz:'Birinchisini kiritish uchun “Ruxsatnoma qo‘shish”ni bosing.',tr:'İlkini eklemek için “İzin ekle”ye tıklayın.'},
    shipmentTitle:{ru:'Новая отгрузка',en:'New shipment',uz:'Yangi yuklama',tr:'Yeni sevkiyat'},
    shipmentDesc:{ru:'Спишите количество и вес по конкретному разрешению',en:'Enter quantity and weight for a specific permit',uz:'Aniq ruxsatnoma bo‘yicha miqdor va vaznni kiriting',tr:'Belirli bir izin için miktar ve ağırlık girin'},
    shipmentDescShort:{ru:'Списание количества/веса по разрешению',en:'Quantity/weight deduction by permit',uz:'Ruxsatnoma bo‘yicha miqdor/vazn hisobdan chiqarilishi',tr:'İzine göre miktar/ağırlık düşümü'},
    inputMethod:{ru:'Способ ввода',en:'Input method',uz:'Kiritish usuli',tr:'Giriş yöntemi'},
    manualByItems:{ru:'Вручную по позициям',en:'Manual by item',uz:'Qo‘lda, pozitsiyalar bo‘yicha',tr:'Kalem bazında manuel'},
    uploadInvoice:{ru:'Загрузить инвойс (Excel/CSV)',en:'Upload invoice (Excel/CSV)',uz:'Invoys yuklash (Excel/CSV)',tr:'Fatura yükle (Excel/CSV)'},
    invoiceNo:{ru:'Номер инвойса / накладной',en:'Invoice / waybill number',uz:'Invoys / yuk xati raqami',tr:'Fatura / irsaliye numarası'},
    invoiceExample:{ru:'напр. MTG-ARYANCOM-160',en:'e.g. MTG-ARYANCOM-160',uz:'masalan: MTG-ARYANCOM-160',tr:'örn. MTG-ARYANCOM-160'},
    invoiceDate:{ru:'Дата инвойса',en:'Invoice date',uz:'Invoys sanasi',tr:'Fatura tarihi'},
    choosePermit:{ru:'Выберите разрешение выше.',en:'Select a permit above.',uz:'Yuqoridan ruxsatnomani tanlang.',tr:'Yukarıdan bir izin seçin.'},
    addPermitFirst:{ru:'Сначала добавьте разрешение',en:'Add a permit first',uz:'Avval ruxsatnoma qo‘shing',tr:'Önce bir izin ekleyin'},
    shipmentNeedsPermit:{ru:'Отгрузку можно провести только по существующему разрешению.',en:'A shipment can only be created for an existing permit.',uz:'Yuklama faqat mavjud ruxsatnoma bo‘yicha amalga oshiriladi.',tr:'Sevkiyat yalnızca mevcut bir izin için oluşturulabilir.'},
    autoWeight:{ru:'Пересчитать вес автоматически',en:'Recalculate weight automatically',uz:'Vaznni avtomatik qayta hisoblash',tr:'Ağırlığı otomatik yeniden hesapla'},
    saveShipment:{ru:'Сохранить отгрузку',en:'Save shipment',uz:'Yuklamani saqlash',tr:'Sevkiyatı kaydet'},
    itemName:{ru:'Наименование',en:'Item name',uz:'Nomi',tr:'Ürün adı'},
    remaining:{ru:'Остаток',en:'Balance',uz:'Qoldiq',tr:'Bakiye'},
    shippingQty:{ru:'Отгружаем, кол-во',en:'Ship, quantity',uz:'Yuklanadi, miqdor',tr:'Sevk, miktar'},
    shippingWeight:{ru:'Отгружаем, вес (кг)',en:'Ship, weight (kg)',uz:'Yuklanadi, vazn (kg)',tr:'Sevk, ağırlık (kg)'},
    exportTitle:{ru:'Экспорт',en:'Export',uz:'Eksport',tr:'Dışa aktar'},
    exportDesc:{ru:'Выгрузка полного реестра в Excel — один лист на разрешение, с историей отгрузок',en:'Export the full registry to Excel — one sheet per permit with shipment history',uz:'To‘liq reyestrni Excelga eksport qilish — har ruxsatnomaga bitta varaq va yuklamalar tarixi',tr:'Tüm kaydı Excel’e aktar — izin başına bir sayfa ve sevkiyat geçmişi'},
    downloadExcel:{ru:'Скачать Excel',en:'Download Excel',uz:'Excel yuklab olish',tr:'Excel indir'},
    backupLabel:{ru:'Резервная копия (JSON)',en:'Backup (JSON)',uz:'Zaxira nusxa (JSON)',tr:'Yedek (JSON)'},
    backupBtn:{ru:'Скачать',en:'Download',uz:'Yuklab olish',tr:'İndir'},
    backupHint:{ru:'Полная копия всех данных: разрешения, отгрузки, история и комментарии. Нужна для восстановления при сбое.',en:'Full copy of all data: permits, shipments, history and comments. Used to restore data after a failure.',uz:'Barcha ma’lumotlarning to‘liq nusxasi: ruxsatnomalar, yuklamalar, tarix va izohlar. Nosozlikda tiklash uchun kerak.',tr:'Tüm verilerin tam kopyası: izinler, sevkiyatlar, geçmiş ve yorumlar. Arıza durumunda geri yüklemek için.'},
    exporting:{ru:'Формирование…',en:'Preparing…',uz:'Tayyorlanmoqda…',tr:'Hazırlanıyor…'},
    exportDone:{ru:'Файл сформирован',en:'File created',uz:'Fayl tayyorlandi',tr:'Dosya oluşturuldu'},
    exportError:{ru:'Не удалось сформировать Excel',en:'Could not create Excel file',uz:'Excel faylini yaratib bo‘lmadi',tr:'Excel dosyası oluşturulamadı'},
    exportLibraryMissing:{ru:'Excel-библиотека не загружена',en:'Excel library is not loaded',uz:'Excel kutubxonasi yuklanmagan',tr:'Excel kitaplığı yüklenmedi'},
    exportNoData:{ru:'Нет разрешений для экспорта',en:'No permits to export',uz:'Eksport qilish uchun ruxsatnoma yo‘q',tr:'Dışa aktarılacak izin yok'},
    close:{ru:'Закрыть',en:'Close',uz:'Yopish',tr:'Kapat'},
    cancel:{ru:'Отмена',en:'Cancel',uz:'Bekor qilish',tr:'İptal'},
    save:{ru:'Сохранить',en:'Save',uz:'Saqlash',tr:'Kaydet'},
    login:{ru:'Войти',en:'Sign in',uz:'Kirish',tr:'Giriş yap'},
    logout:{ru:'Выйти',en:'Sign out',uz:'Chiqish',tr:'Çıkış yap'},
    editorAccount:{ru:'Аккаунт редактора',en:'Editor account',uz:'Tahrirlovchi akkaunti',tr:'Editör hesabı'},
    email:{ru:'Email',en:'Email',uz:'Email',tr:'E-posta'},
    password:{ru:'Пароль',en:'Password',uz:'Parol',tr:'Şifre'},
    footer:{ru:'Offline-first: изменения сначала сохраняются на этом устройстве. При появлении интернета они автоматически синхронизируются с общей базой Supabase.',en:'Offline-first: changes are saved on this device first and sync with the shared Supabase database when internet returns.',uz:'Offline-first: o‘zgarishlar avval ushbu qurilmada saqlanadi va internet qaytganda umumiy Supabase bazasi bilan sinxronlanadi.',tr:'Offline-first: değişiklikler önce bu cihazda kaydedilir ve internet geri geldiğinde ortak Supabase veritabanıyla senkronize edilir.'},
    localReady:{ru:'локально · готово',en:'local · ready',uz:'lokal · tayyor',tr:'yerel · hazır'},
    localMode:{ru:'локальный режим',en:'local mode',uz:'lokal rejim',tr:'yerel mod'},
    offlineSaved:{ru:'офлайн · сохранено на устройстве',en:'offline · saved on device',uz:'oflayn · qurilmada saqlandi',tr:'çevrimdışı · cihazda kaydedildi'},
    prev:{ru:'Назад',en:'Previous',uz:'Oldingi',tr:'Önceki'},
    next:{ru:'Далее',en:'Next',uz:'Keyingi',tr:'Sonraki'},
    page:{ru:'Страница',en:'Page',uz:'Sahifa',tr:'Sayfa'},
    of:{ru:'из',en:'of',uz:'/',tr:'/'},
    showing:{ru:'Показано',en:'Showing',uz:'Ko‘rsatilmoqda',tr:'Gösterilen'},
    language:{ru:'Язык',en:'Language',uz:'Til',tr:'Dil'},
    theme:{ru:'Тема',en:'Theme',uz:'Mavzu',tr:'Tema'},
    dashboardShortcut:{ru:'Перейти к остаткам',en:'Go to balances',uz:'Qoldiqlarga o‘tish',tr:'Bakiyelere git'},
    help:{ru:'Помощь',en:'Help',uz:'Yordam',tr:'Yardım'},
    helpMessage:{ru:'Выберите язык, тему или раздел в панели быстрых действий.',en:'Use the quick controls to choose language, theme, or a section.',uz:'Tezkor panel orqali til, mavzu yoki bo‘limni tanlang.',tr:'Hızlı panelden dil, tema veya bölüm seçin.'},
    lightMode:{ru:'Светлая тема',en:'Light mode',uz:'Yorug‘ rejim',tr:'Açık tema'},
    darkMode:{ru:'Тёмная тема',en:'Dark mode',uz:'Qorong‘i rejim',tr:'Koyu tema'},
    syncStatusLabel:{ru:'Синхронизация',en:'Sync',uz:'Sinxronlash',tr:'Senkronizasyon'}
  };


  // Additional UI strings used by the core page, audit module and legacy visual layers.
  // These entries translate interface text only; product/item names and user data are never translated.
  const EXTRA_TEXT = {
    'История':{ru:'История',en:'History',uz:'Tarix',tr:'Geçmiş'},
    'Hisobotlar':{ru:'Отчёты',en:'Reports',uz:'Hisobotlar',tr:'Raporlar'},
    'Ombor, ruxsatnomalar va qoldiqlar bo‘yicha joriy ko‘rsatkichlar':{ru:'Текущие показатели склада, разрешений и остатков',en:'Current warehouse, permit and balance indicators',uz:'Ombor, ruxsatnomalar va qoldiqlar bo‘yicha joriy ko‘rsatkichlar',tr:'Depo, izin ve bakiye göstergeleri'},
    'Materiallar bo‘yicha ulush':{ru:'Доля по материалам',en:'Share by material',uz:'Materiallar bo‘yicha ulush',tr:'Malzemeye göre pay'},
    'Boshqa':{ru:'Прочее',en:'Other',uz:'Boshqa',tr:'Diğer'},
    'Excel hisobot':{ru:'Отчёт Excel',en:'Excel report',uz:'Excel hisoboti',tr:'Excel raporu'},
    'Jami miqdor':{ru:'Общее количество',en:'Total quantity',uz:'Jami miqdor',tr:'Toplam miktar'},
    'Jami vazn':{ru:'Общий вес',en:'Total weight',uz:'Jami vazn',tr:'Toplam ağırlık'},
    'To‘liq ma’lumotlar “Qoldiqlar” va “Ruxsatnomalar” bo‘limlarida saqlanadi. Excel faylini eksport bo‘limidan yuklab olish mumkin.':{ru:'Полные данные находятся в разделах «Остатки» и «Разрешения». Excel-файл можно скачать в разделе экспорта.',en:'Full data is available in the Balances and Permits sections. The Excel file can be downloaded from Export.',uz:'To‘liq ma’lumotlar “Qoldiqlar” va “Ruxsatnomalar” bo‘limlarida saqlanadi. Excel faylini eksport bo‘limidan yuklab olish mumkin.',tr:'Tüm veriler Bakiyeler ve İzinler bölümlerinde bulunur. Excel dosyası Dışa aktar bölümünden indirilebilir.'},
    'Omborning joriy holati va so‘nggi o‘zgarishlar':{ru:'Текущее состояние склада и последние изменения',en:'Current warehouse status and recent changes',uz:'Omborning joriy holati va so‘nggi o‘zgarishlar',tr:'Deponun mevcut durumu ve son değişiklikler'},
    'Eksportga o‘tish':{ru:'Перейти к экспорту',en:'Go to export',uz:'Eksportga o‘tish',tr:'Dışa aktarmaya git'},
    'Ko‘rsatkich':{ru:'Показатель',en:'Indicator',uz:'Ko‘rsatkich',tr:'Gösterge'},
    'Sozlamalar':{ru:'Настройки',en:'Settings',uz:'Sozlamalar',tr:'Ayarlar'},
    'Chiqish':{ru:'Выйти',en:'Sign out',uz:'Chiqish',tr:'Çıkış yap'},
    'OMBOR QOLDIG\'I':{ru:'ОСТАТОК НА СКЛАДЕ',en:'WAREHOUSE BALANCE',uz:'OMBOR QOLDIG\'I',tr:'DEPO BAKİYESİ'},
    'Joriy holat bo‘yicha ombordagi mahsulotlar':{ru:'Товары на складе в текущем состоянии',en:'Products currently in the warehouse',uz:'Joriy holat bo‘yicha ombordagi mahsulotlar',tr:'Depodaki mevcut ürünler'},
    'Jami nomenklaturalar':{ru:'Всего номенклатур',en:'Total items',uz:'Jami nomenklaturalar',tr:'Toplam kalem'},
    'nomenklatura':{ru:'номенклатура',en:'items',uz:'nomenklatura',tr:'kalem'},
    'model':{ru:'модель',en:'model',uz:'model',tr:'model'},
    'dona':{ru:'шт.',en:'pcs',uz:'dona',tr:'adet'},
    'Tizim holati':{ru:'Состояние системы',en:'System status',uz:'Tizim holati',tr:'Sistem durumu'},
    'Tizim faol':{ru:'Система активна',en:'System active',uz:'Tizim faol',tr:'Sistem aktif'},
    'Записей пока нет':{ru:'Записей пока нет',en:'No records yet',uz:'Hozircha yozuvlar yo‘q',tr:'Henüz kayıt yok'},
    'Изменения будут записываться после включения аудита.':{ru:'Изменения будут записываться после включения аудита.',en:'Changes will be recorded after audit is enabled.',uz:'Audit yoqilgandan so‘ng o‘zgarishlar yozib boriladi.',tr:'Denetim etkinleştirildikten sonra değişiklikler kaydedilecektir.'},
    'Журнал истории':{ru:'Журнал истории',en:'History log',uz:'Tarix jurnali',tr:'Geçmiş günlüğü'},
    'История отгрузок':{ru:'История отгрузок',en:'Shipment history',uz:'Yuklamalar tarixi',tr:'Sevkiyat geçmişi'},
    'Все отгрузки и возможность их редактирования':{ru:'Все отгрузки и возможность их редактирования',en:'All shipments, with the option to edit them',uz:'Barcha yuklamalar va ularni tahrirlash imkoniyati',tr:'Tüm sevkiyatlar ve düzenleme imkanı'},
    'Поиск по инвойсу или разрешению':{ru:'Поиск по инвойсу или разрешению',en:'Search by invoice or permit',uz:'Invoys yoki ruxsatnoma bo‘yicha qidirish',tr:'Fatura veya izne göre ara'},
    'Поиск по разрешению':{ru:'Поиск по разрешению',en:'Search by permit',uz:'Ruxsatnoma bo‘yicha qidirish',tr:'İzne göre ara'},
    'Назад к инвойсам':{ru:'Назад к инвойсам',en:'Back to invoices',uz:'Invoyslarga qaytish',tr:'Faturalara geri dön'},
    'Вес':{ru:'Вес',en:'Weight',uz:'Vazn',tr:'Ağırlık'},
    'Изменить отгрузку':{ru:'Изменить отгрузку',en:'Edit shipment',uz:'Yuklamani tahrirlash',tr:'Sevkiyatı düzenle'},
    'Сохранить изменения':{ru:'Сохранить изменения',en:'Save changes',uz:'O‘zgarishlarni saqlash',tr:'Değişiklikleri kaydet'},
    'Отгрузка обновлена':{ru:'Отгрузка обновлена',en:'Shipment updated',uz:'Yuklama yangilandi',tr:'Sevkiyat güncellendi'},
    'Отгрузка изменена':{ru:'Отгрузка изменена',en:'Shipment edited',uz:'Yuklama tahrirlandi',tr:'Sevkiyat düzenlendi'},
    'Нажмите, чтобы повторить попытку':{ru:'Нажмите, чтобы повторить попытку',en:'Click to retry',uz:'Qayta urinish uchun bosing',tr:'Yeniden denemek için tıklayın'},
    'Кто, когда и что изменил':{ru:'Кто, когда и что изменил',en:'Who changed what and when',uz:'Kim, qachon va nimani o‘zgartirdi',tr:'Kim, neyi ve ne zaman değiştirdi'},
    'Поиск по пользователю, действию или объекту':{ru:'Поиск по пользователю, действию или объекту',en:'Search by user, action or object',uz:'Foydalanuvchi, amal yoki obyekt bo‘yicha qidirish',tr:'Kullanıcı, işlem veya nesneye göre ara'},
    'История изменений':{ru:'История изменений',en:'Change history',uz:'O‘zgarishlar tarixi',tr:'Değişiklik geçmişi'},
    'записей':{ru:'записей',en:'records',uz:'ta yozuv',tr:'kayıt'},
    'Дата/время':{ru:'Дата/время',en:'Date/time',uz:'Sana/vaqt',tr:'Tarih/saat'},
    'Пользователь':{ru:'Пользователь',en:'User',uz:'Foydalanuvchi',tr:'Kullanıcı'},
    'Действие':{ru:'Действие',en:'Action',uz:'Amal',tr:'İşlem'},
    'Объект':{ru:'Объект',en:'Object',uz:'Obyekt',tr:'Nesne'},
    'Изменение':{ru:'Изменение',en:'Change',uz:'O‘zgarish',tr:'Değişiklik'},
    'Разрешение':{ru:'Разрешение',en:'Permit',uz:'Ruxsatnoma',tr:'İzin'},
    'Отгрузка':{ru:'Отгрузка',en:'Shipment',uz:'Yuklama',tr:'Sevkiyat'},
    'Создание':{ru:'Создание',en:'Created',uz:'Yaratildi',tr:'Oluşturuldu'},
    'Изменение данных':{ru:'Изменение данных',en:'Data changed',uz:'Ma’lumot o‘zgartirildi',tr:'Veri değiştirildi'},
    'Удаление':{ru:'Удаление',en:'Deleted',uz:'O‘chirildi',tr:'Silindi'},
    'Создана отгрузка':{ru:'Создана отгрузка',en:'Shipment created',uz:'Yuklama yaratildi',tr:'Sevkiyat oluşturuldu'},
    'Удалена отгрузка':{ru:'Удалена отгрузка',en:'Shipment deleted',uz:'Yuklama o‘chirildi',tr:'Sevkiyat silindi'},
    'Изменено':{ru:'Изменено',en:'Changed',uz:'O‘zgartirildi',tr:'Değiştirildi'},
    'Режим просмотра':{ru:'Режим просмотра',en:'View mode',uz:'Ko‘rish rejimi',tr:'Görüntüleme modu'},
    'Ma\'lumotni o\'zgartirish uchun yuqoridagi «Войти» tugmasi orqali tizimga kiring.':{ru:'Для изменения данных войдите через кнопку «Войти» выше.',en:'Sign in using the “Sign in” button above to edit data.',uz:'Ma’lumotni o‘zgartirish uchun yuqoridagi «Kirish» tugmasi orqali tizimga kiring.',tr:'Verileri değiştirmek için yukarıdaki “Giriş yap” düğmesiyle giriş yapın.'},
    'Сначала добавьте разрешение':{ru:'Сначала добавьте разрешение',en:'Add a permit first',uz:'Avval ruxsatnoma qo‘shing',tr:'Önce bir izin ekleyin'},
    'Отгрузку можно провести только по существующему разрешению.':{ru:'Отгрузку можно провести только по существующему разрешению.',en:'A shipment can only be created for an existing permit.',uz:'Yuklama faqat mavjud ruxsatnoma bo‘yicha amalga oshiriladi.',tr:'Sevkiyat yalnızca mevcut bir izin için oluşturulabilir.'},
    'Загрузка инвойса':{ru:'Загрузка инвойса',en:'Invoice upload',uz:'Invoys yuklash',tr:'Fatura yükleme'},
    'Excel (.xlsx) или CSV. Строка с заголовками столбцов определится автоматически.':{ru:'Excel (.xlsx) или CSV. Строка с заголовками столбцов определится автоматически.',en:'Excel (.xlsx) or CSV. The header row will be detected automatically.',uz:'Excel (.xlsx) yoki CSV. Ustun sarlavhalari qatori avtomatik aniqlanadi.',tr:'Excel (.xlsx) veya CSV. Sütun başlık satırı otomatik algılanır.'},
    'Сопоставление столбцов':{ru:'Сопоставление столбцов',en:'Column mapping',uz:'Ustunlarni moslashtirish',tr:'Sütun eşleştirme'},
    'Наименование товара':{ru:'Наименование товара',en:'Product name',uz:'Tovar nomi',tr:'Ürün adı'},
    'Код ТН ВЭД':{ru:'Код ТН ВЭД',en:'HS code',uz:'TIF TN kodi',tr:'GTİP kodu'},
    'Количество':{ru:'Количество',en:'Quantity',uz:'Miqdor',tr:'Miktar'},
    'Вес, кг (необязательно)':{ru:'Вес, кг (необязательно)',en:'Weight, kg (optional)',uz:'Vazn, kg (ixtiyoriy)',tr:'Ağırlık, kg (isteğe bağlı)'},
    'Отменить загрузку':{ru:'Отменить загрузку',en:'Cancel upload',uz:'Yuklashni bekor qilish',tr:'Yüklemeyi iptal et'},
    'Сопоставить с позициями разрешения':{ru:'Сопоставить с позициями разрешения',en:'Match to permit items',uz:'Ruxsatnoma pozitsiyalariga moslashtirish',tr:'İzin kalemleriyle eşleştir'},
    'Проверьте распределение по позициям':{ru:'Проверьте распределение по позициям',en:'Check item allocation',uz:'Pozitsiyalar bo‘yicha taqsimotni tekshiring',tr:'Kalem dağılımını kontrol edin'},
    'Из файла':{ru:'Из файла',en:'From file',uz:'Fayldan',tr:'Dosyadan'},
    'Позиция разрешения':{ru:'Позиция разрешения',en:'Permit item',uz:'Ruxsatnoma pozitsiyasi',tr:'İzin kalemi'},
    'Провести отгрузку':{ru:'Провести отгрузку',en:'Post shipment',uz:'Yuklamani o‘tkazish',tr:'Sevkiyatı kaydet'},
    'найдено':{ru:'найдено',en:'found',uz:'topildi',tr:'bulundu'},
    'проверьте':{ru:'проверьте',en:'check',uz:'tekshiring',tr:'kontrol edin'},
    'авто':{ru:'авто',en:'auto',uz:'avto',tr:'oto'},
    'Удалить строку':{ru:'Удалить строку',en:'Delete row',uz:'Qatorni o‘chirish',tr:'Satırı sil'},
    'Номер разрешения':{ru:'Номер разрешения',en:'Permit number',uz:'Ruxsatnoma raqami',tr:'İzin numarası'},
    'Дата разрешения':{ru:'Дата разрешения',en:'Permit date',uz:'Ruxsatnoma sanasi',tr:'İzin tarihi'},
    'Примечание (клиент / бренд, необязательно)':{ru:'Примечание (клиент / бренд, необязательно)',en:'Note (client / brand, optional)',uz:'Izoh (mijoz / brend, ixtiyoriy)',tr:'Not (müşteri / marka, isteğe bağlı)'},
    'Наименование':{ru:'Наименование',en:'Name',uz:'Nomi',tr:'Adı'},
    'Ед.':{ru:'Ед.',en:'Unit',uz:'Birlik',tr:'Birim'},
    'Кол-во':{ru:'Кол-во',en:'Qty',uz:'Miqdor',tr:'Miktar'},
    'Вес, кг':{ru:'Вес, кг',en:'Weight, kg',uz:'Vazn, kg',tr:'Ağırlık, kg'},
    'Добавить позицию':{ru:'Добавить позицию',en:'Add item',uz:'Pozitsiya qo‘shish',tr:'Kalem ekle'},
    'Новое разрешение':{ru:'Новое разрешение',en:'New permit',uz:'Yangi ruxsatnoma',tr:'Yeni izin'},
    'Отгрузки по этому разрешению':{ru:'Отгрузки по этому разрешению',en:'Shipments for this permit',uz:'Ushbu ruxsatnoma bo‘yicha yuklamalar',tr:'Bu izin için sevkiyatlar'},
    'Отгрузок ещё не было.':{ru:'Отгрузок ещё не было.',en:'No shipments yet.',uz:'Hali yuklama bo‘lmagan.',tr:'Henüz sevkiyat yok.'},
    'Строк':{ru:'Строк',en:'Lines',uz:'Qatorlar',tr:'Satır'},
    'Скачать Excel':{ru:'Скачать Excel',en:'Download Excel',uz:'Excel yuklab olish',tr:'Excel indir'},
    'Файл будет содержать':{ru:'Файл будет содержать',en:'The file will contain',uz:'Faylda',tr:'Dosyada'},
    'Аккаунт редактора':{ru:'Аккаунт редактора',en:'Editor account',uz:'Tahrirlovchi akkaunti',tr:'Editör hesabı'},
    'Выйти из системы':{ru:'Выйти из системы',en:'Log out',uz:'Chiqish',tr:'Çıkış yap'},
    'Вы уверены, что хотите выйти?':{ru:'Вы уверены, что хотите выйти?',en:'Are you sure you want to log out?',uz:'Haqiqatan ham tizimdan chiqmoqchimisiz?',tr:'Çıkış yapmak istediğinizden emin misiniz?'},
    'Нет, остаться':{ru:'Нет, остаться',en:'No, stay',uz:'Yo‘q, qolaman',tr:'Hayır, kalayım'},
    'Да, выйти':{ru:'Да, выйти',en:'Yes, log out',uz:'Ha, chiqish',tr:'Evet, çıkış yap'},
    'Выполнен вход':{ru:'Выполнен вход',en:'Signed in',uz:'Kirish amalga oshirildi',tr:'Giriş yapıldı'},
    'Офлайн-изменения будут отправлены в общую базу при появлении интернета.':{ru:'Офлайн-изменения будут отправлены в общую базу при появлении интернета.',en:'Offline changes will be sent to the shared database when internet is available.',uz:'Oflayn o‘zgarishlar internet paydo bo‘lganda umumiy bazaga yuboriladi.',tr:'Çevrimdışı değişiklikler internet geldiğinde ortak veritabanına gönderilir.'},
    'Вход для редактирования':{ru:'Вход для редактирования',en:'Sign in to edit',uz:'Tahrirlash uchun kirish',tr:'Düzenlemek için giriş'},
    'Просматривать данные можно без входа. Вход нужен, чтобы локальные изменения попали в общую базу.':{ru:'Просматривать данные можно без входа. Вход нужен, чтобы локальные изменения попали в общую базу.',en:'You can view data without signing in. Sign-in is required to sync local changes to the shared database.',uz:'Ma’lumotlarni kirishsiz ko‘rish mumkin. Mahalliy o‘zgarishlarni umumiy bazaga yuborish uchun kirish kerak.',tr:'Verileri giriş yapmadan görüntüleyebilirsiniz. Yerel değişiklikleri ortak veritabanına göndermek için giriş gerekir.'},
    'Номер инвойса / накладной':{ru:'Номер инвойса / накладной',en:'Invoice / waybill number',uz:'Invoys / yuk xati raqami',tr:'Fatura / irsaliye numarası'},
    'Дата инвойса':{ru:'Дата инвойса',en:'Invoice date',uz:'Invoys sanasi',tr:'Fatura tarihi'},
    'Способ ввода':{ru:'Способ ввода',en:'Input method',uz:'Kiritish usuli',tr:'Giriş yöntemi'},
    'Вручную по позициям':{ru:'Вручную по позициям',en:'Manual by item',uz:'Qo‘lda, pozitsiyalar bo‘yicha',tr:'Kalem bazında manuel'},
    'Загрузить инвойс (Excel/CSV)':{ru:'Загрузить инвойс (Excel/CSV)',en:'Upload invoice (Excel/CSV)',uz:'Invoys yuklash (Excel/CSV)',tr:'Fatura yükle (Excel/CSV)'},
    'Пересчитать вес автоматически':{ru:'Пересчитать вес автоматически',en:'Recalculate weight automatically',uz:'Vaznni avtomatik qayta hisoblash',tr:'Ağırlığı otomatik yeniden hesapla'},
    'Сохранить отгрузку':{ru:'Сохранить отгрузку',en:'Save shipment',uz:'Yuklamani saqlash',tr:'Sevkiyatı kaydet'},
    'Отгружаем, кол-во':{ru:'Отгружаем, кол-во',en:'Ship, quantity',uz:'Yuklanadi, miqdor',tr:'Sevk, miktar'},
    'Отгружаем, вес (кг)':{ru:'Отгружаем, вес (кг)',en:'Ship, weight (kg)',uz:'Yuklanadi, vazn (kg)',tr:'Sevk, ağırlık (kg)'},

    'Причина изменения':{ru:'Причина изменения',en:'Reason for change',uz:'O‘zgartirish sababi',tr:'Değişiklik nedeni'},
    'Укажите причину...':{ru:'Укажите причину...',en:'Enter a reason...',uz:'Sababni kiriting...',tr:'Bir neden girin...'},
    'Укажите причину, чтобы сохранить изменения':{ru:'Укажите причину, чтобы сохранить изменения',en:'Enter a reason to save the changes',uz:'O‘zgarishlarni saqlash uchun sababni kiriting',tr:'Değişiklikleri kaydetmek için bir neden girin'},
    'Поле':{ru:'Поле',en:'Field',uz:'Maydon',tr:'Alan'},
    'Было':{ru:'Было',en:'Before',uz:'Oldin',tr:'Önce'},
    'Стало':{ru:'Стало',en:'After',uz:'Keyin',tr:'Sonra'},
    'Мато':{ru:'Мато',en:'Material',uz:'Mato',tr:'Malzeme'},
    'Позиция удалена':{ru:'позиция удалена',en:'item removed',uz:'pozitsiya o‘chirildi',tr:'kalem kaldırıldı'},
    'Новая позиция':{ru:'новая позиция',en:'new item',uz:'yangi pozitsiya',tr:'yeni kalem'},
    'Причина удаления':{ru:'Причина удаления',en:'Reason for deletion',uz:'O‘chirish sababi',tr:'Silme nedeni'},
    'Укажите причину удаления...':{ru:'Укажите причину удаления...',en:'Enter a reason for deletion...',uz:'O‘chirish sababini kiriting...',tr:'Silme nedenini girin...'},
    'Укажите причину, чтобы удалить запись':{ru:'Укажите причину, чтобы удалить запись',en:'Enter a reason to delete the record',uz:'Yozuvni o‘chirish uchun sababni kiriting',tr:'Kaydı silmek için bir neden girin'},
    'Удалить разрешение?':{ru:'Удалить разрешение?',en:'Delete permit?',uz:'Ruxsatnoma o‘chirilsinmi?',tr:'İzin silinsin mi?'},
    'Это действие удалит разрешение. Связанные отгрузки также будут удалены.':{ru:'Это действие удалит разрешение. Связанные отгрузки также будут удалены.',en:'This will delete the permit. Related shipments will also be deleted.',uz:'Bu amal ruxsatnomani o‘chiradi. Bog‘liq yuklamalar ham o‘chiriladi.',tr:'Bu işlem izni silecek. İlgili sevkiyatlar da silinecek.'},
    'Удалить это разрешение?':{ru:'Удалить это разрешение?',en:'Delete this permit?',uz:'Ushbu ruxsatnoma o‘chirilsinmi?',tr:'Bu izin silinsin mi?'},
    'У этого разрешения есть отгрузки. Удалить разрешение и все связанные отгрузки?':{ru:'У этого разрешения есть отгрузки. Удалить разрешение и все связанные отгрузки?',en:'This permit has shipments. Delete the permit and all related shipments?',uz:'Bu ruxsatnomada yuklamalar mavjud. Ruxsatnoma va unga bog‘liq barcha yuklamalar o‘chirilsinmi?',tr:'Bu iznin sevkiyatları var. İzin ve ilgili tüm sevkiyatlar silinsin mi?'},
    'Удалить отгрузку?':{ru:'Удалить отгрузку?',en:'Delete shipment?',uz:'Yuklama o‘chirilsinmi?',tr:'Sevkiyat silinsin mi?'},
    'Остаток по разрешению будет пересчитан.':{ru:'Остаток по разрешению будет пересчитан.',en:'The permit balance will be recalculated.',uz:'Ruxsatnoma qoldig‘i qayta hisoblanadi.',tr:'İzin bakiyesi yeniden hesaplanacak.'},
    'Подробнее':{ru:'Подробнее',en:'Details',uz:'Batafsil',tr:'Ayrıntılar'},
    'Детали изменения':{ru:'Детали изменения',en:'Change details',uz:'O‘zgarish tafsilotlari',tr:'Değişiklik ayrıntıları'},
    'Причина':{ru:'Причина',en:'Reason',uz:'Sabab',tr:'Neden'},
    'Причина не указана':{ru:'Причина не указана',en:'No reason given',uz:'Sabab ko‘rsatilmagan',tr:'Neden belirtilmemiş'},
    'Изменённые поля':{ru:'Изменённые поля',en:'Changed fields',uz:'O‘zgargan maydonlar',tr:'Değişen alanlar'},
    'Детали недоступны для этой записи':{ru:'Детали недоступны для этой записи',en:'Details are not available for this record',uz:'Bu yozuv uchun tafsilotlar mavjud emas',tr:'Bu kayıt için ayrıntılar mevcut değil'},
    'Нажмите на строку, чтобы увидеть детали':{ru:'Нажмите на строку, чтобы увидеть детали',en:'Click a row to see the details',uz:'Tafsilotlarni ko‘rish uchun qatorni bosing',tr:'Ayrıntıları görmek için satıra tıklayın'},
    'ТН ВЭД':{ru:'ТН ВЭД',en:'HS code',uz:'TIF TN',tr:'GTİP'},
    'Вес разр.':{ru:'Вес разр.',en:'Allowed weight',uz:'Ruxsat etilgan vazn',tr:'İzin verilen ağırlık'},
    'Отгружено':{ru:'Отгружено',en:'Shipped',uz:'Yuklangan',tr:'Sevk edildi'},
    'Остаток кол-во':{ru:'Остаток кол-во',en:'Balance qty',uz:'Qoldiq soni',tr:'Kalan miktar'},
    'Остаток вес':{ru:'Остаток вес',en:'Balance weight',uz:'Qoldiq vazni',tr:'Kalan ağırlık'},
    'Заполнение':{ru:'Заполнение',en:'Remaining',uz:'Qolgan ulush',tr:'Kalan oran'},
    'Статус':{ru:'Статус',en:'Status',uz:'Holat',tr:'Durum'},
    'Дата':{ru:'Дата',en:'Date',uz:'Sana',tr:'Tarih'},
    'Инвойс':{ru:'Инвойс',en:'Invoice',uz:'Invoys',tr:'Fatura'},
    'Отмена':{ru:'Отмена',en:'Cancel',uz:'Bekor qilish',tr:'İptal'},
    'Закрыть':{ru:'Закрыть',en:'Close',uz:'Yopish',tr:'Kapat'},
    'Сохранить':{ru:'Сохранить',en:'Save',uz:'Saqlash',tr:'Kaydet'},
    'Изменить':{ru:'Изменить',en:'Edit',uz:'Tahrirlash',tr:'Düzenle'},
    'Удалить':{ru:'Удалить',en:'Delete',uz:'O‘chirish',tr:'Sil'},
    'Создано':{ru:'Создано',en:'Created',uz:'Yaratildi',tr:'Oluşturuldu'},
    'Удалено':{ru:'Удалено',en:'Deleted',uz:'O‘chirildi',tr:'Silindi'},
    'Создана отгрузка':{ru:'Создана отгрузка',en:'Shipment created',uz:'Yuklama yaratildi',tr:'Sevkiyat oluşturuldu'},
    'Данные изменены':{ru:'Данные изменены',en:'Data changed',uz:'Ma’lumot o‘zgartirildi',tr:'Veriler değiştirildi'},
    'Для просмотра журнала войдите в аккаунт редактора.':{ru:'Для просмотра журнала войдите в аккаунт редактора.',en:'Sign in as an editor to view the history log.',uz:'Tarix jurnalini ko‘rish uchun tahrirlovchi akkauntiga kiring.',tr:'Geçmiş günlüğünü görüntülemek için editör olarak giriş yapın.'},
    'Загрузка…':{ru:'Загрузка…',en:'Loading…',uz:'Yuklanmoqda…',tr:'Yükleniyor…'},
    'локальный режим':{ru:'локальный режим',en:'local mode',uz:'lokal rejim',tr:'yerel mod'},
    'Мато':{ru:'Мато',en:'Fabric',uz:'Mato',tr:'Kumaş'},
    'Мато / material':{ru:'Мато / material',en:'Fabric / material',uz:'Mato / material',tr:'Kumaş / malzeme'},
    'Вес 1 ед.':{ru:'Вес 1 ед.',en:'Weight per unit',uz:'1 dona og‘irligi',tr:'Birim ağırlığı'},
    'перерасход':{ru:'перерасход',en:'overdrawn',uz:'ortiqcha sarf',tr:'aşım'},
    'закончено':{ru:'закончено',en:'finished',uz:'tugagan',tr:'bitti'},
    'мало осталось':{ru:'мало осталось',en:'low remaining',uz:'kam qoldi',tr:'az kaldı'},
    'в норме':{ru:'в норме',en:'normal',uz:'me’yorida',tr:'normal'},
    'Удаление отгрузки':{ru:'Удаление отгрузки',en:'Shipment deleted',uz:'Yuklama o‘chirildi',tr:'Sevkiyat silindi'},
    'и поиску':{ru:'и поиску',en:'and search',uz:'va qidiruvga',tr:'ve aramaya'},
    'Сортировка':{ru:'Сортировка',en:'Sorting',uz:'Saralash',tr:'Sıralama'},
    'шт':{ru:'шт',en:'pcs',uz:'dona',tr:'adet'},
    'кг':{ru:'кг',en:'kg',uz:'kg',tr:'kg'},
    'Итого':{ru:'Итого',en:'Total',uz:'Jami',tr:'Toplam'},
    'Разбивка по отгрузкам':{ru:'Разбивка по отгрузкам',en:'Breakdown by shipments',uz:'Yuklamalar bo‘yicha taqsimot',tr:'Sevkiyatlara göre dağılım'},
    'По этой модели пока нет отгрузок':{ru:'По этой модели пока нет отгрузок',en:'No shipments yet for this model',uz:'Ushbu model bo‘yicha hali yuklama qilinmagan',tr:'Bu model için henüz sevkiyat yok'},
    'Нажмите — посмотреть, из каких отгрузок расходовалась эта модель':{ru:'Нажмите — посмотреть, из каких отгрузок расходовалась эта модель',en:'Click to see which shipments used this model',uz:'Bosing — bu model qaysi yuklamalardan sarflanganini ko‘rish',tr:'Bu modelin hangi sevkiyatlardan kullanıldığını görmek için tıklayın'},
    'Orqaga':{ru:'Назад',en:'Back',uz:'Orqaga',tr:'Geri'},
    'Нажмите — какие модели и сколько было в этой отгрузке':{ru:'Нажмите — какие модели и сколько было в этой отгрузке',en:'Click to see which models and how much were in this shipment',uz:'Bosing — ushbu yuklamada qaysi modeldan qancha borligini ko‘rish',tr:'Bu sevkiyatta hangi modellerin ne kadar olduğunu görmek için tıklayın'},
    'Модель не найдена':{ru:'Модель не найдена',en:'Model not found',uz:'Model topilmadi',tr:'Model bulunamadı'},
    'Позиций нет':{ru:'Позиций нет',en:'No items',uz:'Pozitsiyalar yo‘q',tr:'Kalem yok'},

    'PDF файл разрешения':{ru:'PDF файл разрешения',en:'Permit PDF file',uz:'Ruxsatnoma PDF fayli',tr:'İzin PDF dosyası'},
    'saqlashda yuklanadi':{ru:'будет загружен при сохранении',en:'will be uploaded on save',uz:'saqlashda yuklanadi',tr:'kaydedilirken yüklenecek'},
    'ochish / yuklab olish':{ru:'открыть / скачать',en:'open / download',uz:'ochish / yuklab olish',tr:'aç / indir'},
    'Almashtirish':{ru:'Заменить',en:'Replace',uz:'Almashtirish',tr:'Değiştir'},
    'Olib tashlash':{ru:'Убрать',en:'Remove',uz:'Olib tashlash',tr:'Kaldır'},
    'Faqat PDF fayl tanlang':{ru:'Выберите файл в формате PDF',en:'Please select a PDF file',uz:'Faqat PDF fayl tanlang',tr:'Lütfen bir PDF dosyası seçin'},
    'PDF yuklanmoqda...':{ru:'Загрузка PDF...',en:'Uploading PDF...',uz:'PDF yuklanmoqda...',tr:'PDF yükleniyor...'},
    'PDF yuklash uchun tizimga kiring':{ru:'Войдите в систему, чтобы загрузить PDF',en:'Sign in to upload the PDF',uz:'PDF yuklash uchun tizimga kiring',tr:'PDF yüklemek için giriş yapın'},
    'PDF faylni yuklab bo\'lmadi':{ru:'Не удалось загрузить PDF файл',en:'Could not upload the PDF file',uz:'PDF faylni yuklab bo‘lmadi',tr:'PDF dosyası yüklenemedi'},
    'Этот раздел доступен только editor и contributor.':{ru:'Этот раздел доступен только editor и contributor.',en:'This section is only available to editors and contributors.',uz:'Bu bo‘lim faqat editor va contributor uchun ochiq.',tr:'Bu bölüm yalnızca editor ve contributor için görünür.'},
    'Taxminiy vazn, 1 dona (kg) — ±0.05':{ru:'Примерный вес 1 шт (кг) — ±0.05',en:'Approx. weight per unit (kg) — ±0.05',uz:'Taxminiy vazn, 1 dona (kg) — ±0.05',tr:'Yaklaşık birim ağırlık (kg) — ±0.05'},
    'masalan':{ru:'напр.',en:'e.g.',uz:'masalan',tr:'örn.'},
    'Barchasi':{ru:'Все',en:'All',uz:'Barchasi',tr:'Hepsi'},
    'Filtrni tozalash':{ru:'Очистить фильтр',en:'Clear filter',uz:'Filtrni tozalash',tr:'Filtreyi temizle'},
    'Поиск модели':{ru:'Поиск модели',en:'Find model',uz:'Model topish',tr:'Model bul'},
    'Найти артикул по весу 1 шт. среди всех разрешений':{ru:'Найти артикул по весу 1 шт. среди всех разрешений',en:'Find an item by unit weight across all permits',uz:'Artikulsiz modelni 1 dona og‘irligi va mato bo‘yicha barcha ruxsatnomalar orasidan toping',tr:'Tüm izinler arasında birim ağırlığa göre model bul'},
    'Вес 1 шт., грамм (±5 г)':{ru:'Вес 1 шт., грамм (±5 г)',en:'Unit weight, grams (±5 g)',uz:'1 dona vazni, gramm (±5 g)',tr:'Birim ağırlık, gram (±5 g)'},
    'Укажите вес в граммах — поиск идёт по всем разрешениям':{ru:'Укажите вес в граммах — поиск идёт по всем разрешениям',en:'Enter the weight in grams — searching across all permits',uz:'1 dona vaznini grammda kiriting — barcha ruxsatnomalar orasidan qidiriladi.',tr:'Ağırlığı gram olarak girin — tüm izinler aranır'},
    'Остаток, кол-во':{ru:'Остаток, кол-во',en:'Balance, qty',uz:'Qoldiq (soni)',tr:'Bakiye (adet)'},
    'Остаток, вес':{ru:'Остаток, вес',en:'Balance, weight',uz:'Qoldiq (vazn)',tr:'Bakiye (ağırlık)'},
    'Turkum':{ru:'Категория',en:'Category',uz:'Turkum',tr:'Kategori'},
    'Mos pozitsiyalar':{ru:'Подходящих позиций',en:'Matching items',uz:'Mos pozitsiyalar',tr:'Eşleşen kalemler'},
    'Modelni qidirish (ruxsatnomani bilmasangiz)':{ru:'Поиск модели (если не знаете разрешение)',en:'Search for a model (if you don\'t know the permit)',uz:'Modelni qidirish (ruxsatnomani bilmasangiz)',tr:'Model ara (izni bilmiyorsanız)'},
    'Vazn yoki materialni kiriting — barcha ruxsatnomalar orasidan qidiriladi.':{ru:'Введите вес или материал — поиск пройдёт по всем разрешениям.',en:'Enter a weight or material — search runs across all permits.',uz:'Vazn yoki materialni kiriting — barcha ruxsatnomalar orasidan qidiriladi.',tr:'Ağırlık veya malzeme girin — tüm izinlerde aranır.'},
    'Hech narsa topilmadi':{ru:'Ничего не найдено',en:'Nothing found',uz:'Hech narsa topilmadi',tr:'Hiçbir şey bulunamadı'},
    '1 dona vazni':{ru:'Вес 1 шт',en:'Weight per unit',uz:'1 dona vazni',tr:'Birim ağırlık'},
    '1 dona vazni, kg (±50 g)':{ru:'Вес 1 шт, кг (±50 г)',en:'Weight per unit, kg (±50 g)',uz:'1 dona vazni, kg (±50 g)',tr:'Birim ağırlık, kg (±50 g)'},
    'Укажите вес — поиск идёт по всем разрешениям':{ru:'Укажите вес — поиск идёт по всем разрешениям',en:'Enter the weight — searching across all permits',uz:'1 dona vaznini kiriting — barcha ruxsatnomalar orasidan qidiriladi.',tr:'Ağırlığı girin — tüm izinler aranır'},
    'Tanlash':{ru:'Выбрать',en:'Select',uz:'Tanlash',tr:'Seç'},
    'Выбрать всё':{ru:'Выбрать всё',en:'Select all',uz:'Barchasini tanlash',tr:'Tümünü seç'},
    'Выбранные удалить':{ru:'Удалить выбранные',en:'Delete selected',uz:'Tanlanganlarni o‘chirish',tr:'Seçilenleri sil'},
    'Отменить выбор':{ru:'Снять выбор',en:'Clear selection',uz:'Tanlovni bekor qilish',tr:'Seçimi kaldır'},
    'tanlandi':{ru:'выбрано',en:'selected',uz:'tanlandi',tr:'seçildi'}
  };

  /* ===== v6: to'ldirilgan tarjimalar va dinamik shablonlar =====
     Faqat interfeys matni tarjima qilinadi. Model nomi, ruxsatnoma raqami va
     invoys nomi (foydalanuvchi ma'lumoti) HECH QACHON tarjima qilinmaydi:
     lug'at faqat aniq mos kelgan matnlarga, shablonlar esa faqat qat'iy
     tuzilmali xabarlarga ishlaydi, ma'lumot qismlari o'zgarishsiz qoladi. */
  const EXTRA_V6 = [
    // [ru, uz, en, tr]
    ['Отгрузка сохранена, остатки обновлены','Yuklama saqlandi, qoldiqlar yangilandi','Shipment saved, balances updated','Sevkiyat kaydedildi, bakiyeler güncellendi'],
    ['ошибка локального хранилища','mahalliy xotira xatosi','local storage error','yerel depolama hatası'],
    ['Не удалось сохранить разрешения','Ruxsatnomalarni saqlab bo‘lmadi','Could not save permits','İzinler kaydedilemedi'],
    ['Не удалось сохранить отгрузку','Yuklamani saqlab bo‘lmadi','Could not save shipment','Sevkiyat kaydedilemedi'],
    ['Текст комментария','Izoh matni','Comment text','Yorum metni'],
    ['Комментарии','Izohlar','Comments','Yorumlar'],
    ['Введите текст комментария','Izoh matnini kiriting','Enter the comment text','Yorum metnini girin'],
    ['Комментарий добавлен','Izoh qo‘shildi','Comment added','Yorum eklendi'],
    ['В офлайн-режиме комментарии писать нельзя','Offline holatda izoh yozish mumkin emas','Comments cannot be written while offline','Çevrimdışıyken yorum yazılamaz'],
    ['Не удалось сохранить комментарий','Izohni saqlab bo‘lmadi','Could not save the comment','Yorum kaydedilemedi'],
    ['Редактирование комментария','Izohni tahrirlash','Edit comment','Yorumu düzenle'],
    ['Укажите причину изменения текста комментария.','Izoh matnini o‘zgartirish sababini kiriting.','Enter the reason for changing the comment text.','Yorum metnini değiştirme nedenini girin.'],
    ['Комментарий изменён','Izoh tahrirlandi','Comment edited','Yorum düzenlendi'],
    ['Удалить комментарий?','Izohni o‘chirish?','Delete the comment?','Yorum silinsin mi?'],
    ['Комментарий будет удалён навсегда. Это действие нельзя отменить.','Bu izoh butunlay o‘chiriladi. Bu amalni bekor qilib bo‘lmaydi.','This comment will be permanently deleted. This action cannot be undone.','Bu yorum kalıcı olarak silinecek. Bu işlem geri alınamaz.'],
    ['Укажите причину удаления...','O‘chirish sababini yozing...','Enter the reason for deletion...','Silme nedenini yazın...'],
    ['Комментарий удалён','Izoh o‘chirildi','Comment deleted','Yorum silindi'],
    ['Не удалось удалить комментарий','Izohni o‘chirib bo‘lmadi','Could not delete the comment','Yorum silinemedi'],
    ['Примечание','Izoh (eslatma)','Note','Not'],
    ['Запись будет удалена из журнала у всех пользователей. Действие необратимо.','Yozuv barcha foydalanuvchilar uchun jurnaldan o‘chiriladi. Amalni ortga qaytarib bo‘lmaydi.','The entry will be removed from the log for all users. This cannot be undone.','Kayıt tüm kullanıcılar için günlükten silinecek. Bu işlem geri alınamaz.'],
    ['Запись удалена','Yozuv o‘chirildi','Entry deleted','Kayıt silindi'],
    ['Черновик создан','Qoralama yaratildi','Draft created','Taslak oluşturuldu'],
    ['Черновик удалён','Qoralama o‘chirildi','Draft deleted','Taslak silindi'],
    ['Черновик завершён','Qoralama yakunlandi','Draft finalized','Taslak tamamlandı'],
    ['Документ прикреплён','Hujjat biriktirildi','Document attached','Belge eklendi'],
    ['Документ заменён','Hujjat almashtirildi','Document replaced','Belge değiştirildi'],
    ['Документ удалён','Hujjat olib tashlandi','Document removed','Belge kaldırıldı'],
    ['Инвойс изменён','Invoys tahrirlandi','Invoice edited','Fatura düzenlendi'],
    ['Черновик','Qoralama','Draft','Taslak'],
    ['Инвойс изменён:','Invoys tahrirlandi:','Invoice edited:','Fatura düzenlendi:'],
    ['Подписанный документ прикреплён:','Imzolangan hujjat biriktirildi:','Signed document attached:','İmzalı belge eklendi:'],
    ['Документ заменён:','Hujjat almashtirildi:','Document replaced:','Belge değiştirildi:'],
    ['Документ удалён:','Hujjat olib tashlandi:','Document removed:','Belge kaldırıldı:'],
    ['Черновик завершён (стал отгрузкой)','Qoralama yakunlandi (yuklamaga aylandi)','Draft finalized (became a shipment)','Taslak tamamlandı (sevkiyata dönüştü)'],
    ['номер','raqam','number','numara'],
    ['дата','sana','date','tarih'],
    ['позиций','pozitsiya','items','kalem'],
    ['кол-во','miqdor','qty','miktar'],
    ['вес','vazn','weight','ağırlık'],
    ['Удалить выбранные','Tanlanganlarni o‘chirish','Delete selected','Seçilenleri sil'],
    ['Отменить выбор','Tanlovni bekor qilish','Clear selection','Seçimi temizle'],
    ['Разрешение не найдено','Ruxsatnoma topilmadi','Permit not found','İzin bulunamadı'],
    ['Не указана позиция разрешения','Ruxsatnoma pozitsiyasi ko‘rsatilmagan','Permit item not specified','İzin kalemi belirtilmedi'],
    ['Количество должно быть больше 0','Miqdor 0 dan katta bo‘lishi kerak','Quantity must be greater than 0','Miktar 0’dan büyük olmalıdır'],
    ['Вес не может быть отрицательным','Vazn manfiy bo‘lishi mumkin emas','Weight cannot be negative','Ağırlık negatif olamaz'],
    ['Найдена неизвестная позиция разрешения','Noma’lum ruxsatnoma pozitsiyasi topildi','Unknown permit item found','Bilinmeyen izin kalemi bulundu'],
    ['Нажмите — посмотреть модели, которых осталось мало','Bosing — kam qolgan modellarni ko‘rish','Click to view models that are running low','Azalan modelleri görmek için tıklayın'],
    ['Нажмите — посмотреть закончившиеся / перерасходованные модели','Bosing — tugagan / ortiqcha sarflangan modellarni ko‘rish','Click to view finished / overused models','Biten / fazla kullanılan modelleri görmek için tıklayın'],
    ['Отгрузка удалена','Yuklama o‘chirildi','Shipment deleted','Sevkiyat silindi'],
    ['пара','juft','pair','çift'],
    ['напр. RC20260001681','masalan, RC20260001681','e.g. RC20260001681','örn. RC20260001681'],
    ['напр. ARYANCOM','masalan, ARYANCOM','e.g. ARYANCOM','örn. ARYANCOM'],
    ['+ Добавить позицию','+ Pozitsiya qo‘shish','+ Add item','+ Kalem ekle'],
    ['Изменить разрешение','Ruxsatnomani tahrirlash','Edit permit','İzni düzenle'],
    ['Должна остаться хотя бы одна позиция','Kamida bitta pozitsiya qolishi kerak','At least one item must remain','En az bir kalem kalmalıdır'],
    ['Укажите номер разрешения','Ruxsatnoma raqamini kiriting','Enter the permit number','İzin numarasını girin'],
    ['Разрешение с таким номером уже существует','Bunday raqamli ruxsatnoma allaqachon mavjud','A permit with this number already exists','Bu numaralı bir izin zaten mevcut'],
    ['Добавьте хотя бы одну позицию с названием','Nomi bor kamida bitta pozitsiya qo‘shing','Add at least one item with a name','Adı olan en az bir kalem ekleyin'],
    ['Разрешение не сохранено','Ruxsatnoma saqlanmadi','Permit not saved','İzin kaydedilmedi'],
    ['Не удалось загрузить PDF-файл','PDF faylni yuklab bo‘lmadi','Could not upload the PDF file','PDF dosyası yüklenemedi'],
    ['Разрешение обновлено','Ruxsatnoma yangilandi','Permit updated','İzin güncellendi'],
    ['Разрешение добавлено','Ruxsatnoma qo‘shildi','Permit added','İzin eklendi'],
    ['Разрешение удалено','Ruxsatnoma o‘chirildi','Permit deleted','İzin silindi'],
    ['Выберите только PDF-файл','Faqat PDF fayl tanlang','Select a PDF file only','Yalnızca PDF dosyası seçin'],
    ['Для загрузки PDF войдите в систему','PDF yuklash uchun tizimga kiring','Sign in to upload a PDF','PDF yüklemek için giriş yapın'],
    ['Чтобы просматривать данные, войдите в систему кнопкой «Войти» вверху.','Ma’lumotni ko‘rish uchun yuqoridagi «Kirish» tugmasi orqali tizimga kiring.','To view the data, sign in with the “Sign in” button at the top.','Verileri görüntülemek için üstteki «Giriş yap» düğmesiyle oturum açın.'],
    ['Чтобы изменять данные, войдите в систему кнопкой «Войти» вверху.','Ma’lumotni o‘zgartirish uchun yuqoridagi «Kirish» tugmasi orqali tizimga kiring.','To change the data, sign in with the “Sign in” button at the top.','Verileri değiştirmek için üstteki «Giriş yap» düğmesiyle oturum açın.'],
    ['Позиции разрешения','Ruxsatnoma pozitsiyalari','Permit items','İzin kalemleri'],
    ['Вес пересчитан по среднему весу единицы разрешения','Vazn ruxsatnomadagi bir birlikning o‘rtacha vazni bo‘yicha qayta hisoblandi','Weight recalculated using the permit’s average unit weight','Ağırlık, iznin ortalama birim ağırlığına göre yeniden hesaplandı'],
    ['Введите количество хотя бы по одной позиции','Kamida bitta pozitsiya bo‘yicha miqdor kiriting','Enter a quantity for at least one item','En az bir kalem için miktar girin'],
    ['Отгрузка не сохранена','Yuklama saqlanmadi','Shipment not saved','Sevkiyat kaydedilmedi'],
    ['Отгрузка не может быть проведена','Yuklamani amalga oshirib bo‘lmaydi','The shipment cannot be processed','Sevkiyat işlenemiyor'],
    ['Отгрузка не может быть сохранена','Yuklamani saqlab bo‘lmaydi','The shipment cannot be saved','Sevkiyat kaydedilemiyor'],
    ['Без названия (черновик)','Nomsiz qoralama','Untitled draft','Adsız taslak'],
    ['Инвойс_','Invoys_','Invoice_','Fatura_'],
    ['черновик','qoralama','draft','taslak'],
    ['Нет строк с заполненным количеством для экспорта','Eksport qilish uchun miqdori kiritilgan qator yo‘q','No rows with a quantity to export','Dışa aktarmak için miktarı girilmiş satır yok'],
    ['Нет строк с заполненным количеством для печати','Chop etish uchun miqdori kiritilgan qator yo‘q','No rows with a quantity to print','Yazdırmak için miktarı girilmiş satır yok'],
    ['Инвойс:','Invoys:','Invoice:','Fatura:'],
    ['Дата:','Sana:','Date:','Tarih:'],
    ['Разрешение №','Ruxsatnoma №','Permit №','İzin №'],
    ['Вес (кг)','Vazn (kg)','Weight (kg)','Ağırlık (kg)'],
    ['Итого (по разрешению)','Jami (ruxsatnoma)','Total (per permit)','Toplam (izin bazında)'],
    ['ОБЩИЙ ИТОГ','UMUMIY JAMI','GRAND TOTAL','GENEL TOPLAM'],
    ['Окно заблокировано. Разрешите всплывающие окна для этого сайта в браузере.','Oyna bloklandi. Brauzerda ushbu sayt uchun qalqib chiquvchi oynalarga ruxsat bering.','The window was blocked. Allow pop-ups for this site in your browser.','Pencere engellendi. Tarayıcıda bu site için açılır pencerelere izin verin.'],
    ['➕ Новый инвойс','➕ Yangi invoys','➕ New invoice','➕ Yeni fatura'],
    ['— Разрешение —','— Ruxsatnoma —','— Permit —','— İzin —'],
    ['— Модель —','— Model —','— Model —','— Model —'],
    ['Разрешение или модель не найдены','Ruxsatnoma yoki model topilmadi','Permit or model not found','İzin veya model bulunamadı'],
    ['Инвойс с несколькими разрешениями','Ko‘p ruxsatnomali invoys','Multi-permit invoice','Çok izinli fatura'],
    ['Соберите в один инвойс модели из разных разрешений. «Сохранить в черновик» — чтобы продолжить позже, «Сохранить» — чтобы завершить.','Bitta invoysga turli ruxsatnomalardan modellar yig‘ing. «Qoralamaga saqlash» — keyin davom ettirish uchun, «Saqlash» — yakunlash.','Combine models from different permits into one invoice. “Save as draft” — to continue later, “Save” — to finish.','Farklı izinlerden modelleri tek faturada toplayın. «Taslağa kaydet» — daha sonra devam etmek için, «Kaydet» — tamamlamak için.'],
    ['Основные разделы','Asosiy bo‘limlar','Main sections','Ana bölümler'],
    ['Разрешения, обновлённые за последние 24 часа','So‘nggi 24 soatda yangilangan ruxsatnomalar','Permits updated in the last 24 hours','Son 24 saatte güncellenen izinler'],
    ['Изменение количества «мало осталось» из-за отгрузок за последние 24 часа','So‘nggi 24 soatdagi yuklamalar ta’sirida kam qolganlar o‘zgarishi','Change in “running low” caused by shipments in the last 24 hours','Son 24 saatteki sevkiyatların etkisiyle «azalan»larda değişim'],
    ['Изменение «закончено / перерасход» из-за отгрузок за последние 24 часа','So‘nggi 24 soatdagi yuklamalar ta’sirida tugagan/ortiqcha sarf o‘zgarishi','Change in “finished / overused” caused by shipments in the last 24 hours','Son 24 saatteki sevkiyatların etkisiyle «biten / fazla kullanılan»larda değişim'],
    ['Количество моделей','Modellar soni','Number of models','Model sayısı'],
    ['Остаток на складе','Ombordagi qoldiq','Warehouse balance','Depodaki kalan'],
    ['Укажите причину удаления...','O‘chirish sababini yozing...','Enter the reason for deletion...','Silme nedenini yazın...'],
    ['Удалить запись','Yozuvni o‘chirish','Delete entry','Kaydı sil'],
    ['Просмотр и загрузка Excel — все модели','Ko‘rish va Excel yuklash — barcha modellar','View and download Excel — all models','Görüntüle ve Excel indir — tüm modeller'],
    ['Просмотр и загрузка Excel — модели с малым остатком','Ko‘rish va Excel yuklash — kam qolgan modellar','View and download Excel — models running low','Görüntüle ve Excel indir — azalan modeller'],
    ['Просмотр и загрузка Excel — доступные модели','Ko‘rish va Excel yuklash — mavjud modellar','View and download Excel — available models','Görüntüle ve Excel indir — mevcut modeller'],
    ['Просмотр и загрузка Excel — закончившиеся / перерасход','Ko‘rish va Excel yuklash — tugagan / ortiqcha sarf modellar','View and download Excel — finished / overused models','Görüntüle ve Excel indir — biten / fazla kullanılan modeller'],
    ['Показать модели с этим составом материала','Shu mato tarkibiga ega modellarni ko‘rish','Show models with this material composition','Bu malzeme bileşimine sahip modelleri göster'],
    ['В этом состоянии позиций нет','Bu holatda pozitsiya yo‘q','No items in this state','Bu durumda kalem yok'],
    ['Чтобы написать комментарий, войдите в систему (любой аккаунт — права редактирования не нужны).','Izoh yozish uchun tizimga kiring (istalgan hisob bilan — tahrirlash huquqi shart emas).','Sign in to write a comment (any account — editing rights are not required).','Yorum yazmak için giriş yapın (herhangi bir hesapla — düzenleme yetkisi gerekmez).'],
    ['Комментариев пока нет','Izohlar hali yo‘q','No comments yet','Henüz yorum yok'],
    ['Смотреть ›','Ko‘rish ›','View ›','Görüntüle ›'],
    ['Модель можно также найти и добавить через раздел «Поиск модели».','Modelni «Model topish» bo‘limidan ham qidirib qo‘shishingiz mumkin.','You can also find and add a model from the “Find model” section.','Modeli «Model bul» bölümünden de arayıp ekleyebilirsiniz.'],
    ['Модель','Model','Model','Model'],
    ['Добавить','Qo‘shish','Add','Ekle'],
    ['Строки инвойса','Invoys qatorlari','Invoice rows','Fatura satırları'],
    ['Строк пока нет. Выберите разрешение и модель выше и нажмите «Добавить».','Hali qator yo‘q. Yuqoridan ruxsatnoma va modelni tanlab «Qo‘shish» bosing.','No rows yet. Choose a permit and model above and press “Add”.','Henüz satır yok. Yukarıdan izin ve modeli seçip «Ekle»ye basın.'],
    ['Сохранить в черновик','Qoralamaga saqlash','Save as draft','Taslağa kaydet'],
    ['Выберите разрешение и модель','Ruxsatnoma va modelni tanlang','Select a permit and a model','İzin ve modeli seçin'],
    ['Эта модель уже добавлена','Bu model allaqachon qo‘shilgan','This model has already been added','Bu model zaten eklendi'],
    ['Остатка по этой модели нет — добавить нельзя','Bu modelning qoldig‘i yo‘q — qo‘shib bo‘lmaydi','No balance left for this model — cannot add','Bu modelin kalanı yok — eklenemez'],
    ['Введите номер инвойса или добавьте модель','Invoys raqamini kiriting yoki model qo‘shing','Enter an invoice number or add a model','Fatura numarasını girin veya model ekleyin'],
    ['Черновик сохранён','Qoralama saqlandi','Draft saved','Taslak kaydedildi'],
    ['Удалить черновик полностью?','Qoralama butunlay o‘chirilsinmi?','Delete the draft completely?','Taslak tamamen silinsin mi?'],
    ['Введите номер инвойса','Invoys raqamini kiriting','Enter the invoice number','Fatura numarasını girin'],
    ['Введите количество хотя бы в одной строке','Kamida bitta qatorga miqdor kiriting','Enter a quantity in at least one row','En az bir satıra miktar girin'],
    ['Не сохранено','Saqlanmadi','Not saved','Kaydedilmedi'],
    ['Не удалось завершить отгрузку','Yuklamani yakunlab bo‘lmaydi','Could not complete the shipment','Sevkiyat tamamlanamadı'],
    ['Остатка по этой модели нет','Bu modelning qoldig‘i yo‘q','No balance left for this model','Bu modelin kalanı yok'],
    ['Добавить в инвойс','Invoysga qo‘shish','Add to invoice','Faturaya ekle'],
    ['Какой инвойс?','Qaysi invoys?','Which invoice?','Hangi fatura?'],
    ['Номер нового инвойса','Yangi invoys raqami','New invoice number','Yeni fatura numarası'],
    ['Вес (кг) — автоматически','Vazn (kg) — avtomatik','Weight (kg) — automatic','Ağırlık (kg) — otomatik'],
    ['В этом инвойсе уже добавлен весь остаток модели.','Bu invoysda modelning butun qoldig‘i allaqachon kiritilgan.','The entire balance of this model has already been added to this invoice.','Bu modelin tüm kalanı bu faturaya zaten eklenmiş.'],
    ['Введите количество','Miqdorni kiriting','Enter the quantity','Miktarı girin'],
    ['Черновик не найден','Qoralama topilmadi','Draft not found','Taslak bulunamadı'],
    ['Можно загрузить только PDF или ZIP','Faqat PDF yoki ZIP fayl yuklash mumkin','Only PDF or ZIP files can be uploaded','Yalnızca PDF veya ZIP dosyası yüklenebilir'],
    ['Файл больше 20 МБ','Fayl 20 MB dan katta','File is larger than 20 MB','Dosya 20 MB’tan büyük'],
    ['Файл загружается…','Fayl yuklanmoqda…','Uploading file…','Dosya yükleniyor…'],
    ['Файл не загружен','Fayl yuklanmadi','File was not uploaded','Dosya yüklenmedi'],
    ['Файл не загружен.','Fayl yuklanmadi.','File was not uploaded.','Dosya yüklenmedi.'],
    ['Старый файл не удалился','Eski fayl o‘chmadi','The old file was not removed','Eski dosya silinmedi'],
    ['Файл заменён','Fayl almashtirildi','File replaced','Dosya değiştirildi'],
    ['Файл прикреплён','Fayl biriktirildi','File attached','Dosya eklendi'],
    ['Подписанный документ (необязательно) — PDF или ZIP, до 20 МБ','Imzolangan hujjat (ixtiyoriy) — PDF yoki ZIP, 20 MB gacha','Signed document (optional) — PDF or ZIP, up to 20 MB','İmzalı belge (isteğe bağlı) — PDF veya ZIP, en fazla 20 MB'],
    ['Выбрать другой файл','Boshqa fayl tanlash','Choose another file','Başka dosya seç'],
    ['Выбрать файл','Fayl tanlash','Choose file','Dosya seç'],
    ['Файл не выбран','Fayl tanlanmagan','No file selected','Dosya seçilmedi'],
    ['Файл будет прикреплён к инвойсу при нажатии итогового «Сохранить» (в черновике не сохраняется). Если у этого инвойса уже есть файл, он будет заменён.','Fayl yakuniy «Saqlash» bosilganda invoysga biriktiriladi (qoralamaga saqlanmaydi). Bu invoysda fayl allaqachon bo‘lsa, almashtiriladi.','The file will be attached to the invoice when you press the final “Save” (it is not stored in the draft). If this invoice already has a file, it will be replaced.','Dosya, son «Kaydet»e basıldığında faturaya eklenir (taslakta saklanmaz). Bu faturada zaten dosya varsa değiştirilir.'],
    ['Введите номер инвойса, чтобы прикрепить файл','Fayl biriktirish uchun invoys raqamini kiriting','Enter the invoice number to attach a file','Dosya eklemek için fatura numarasını girin'],
    ['Отгрузка сохранена, но файл не загружен — загрузите его снова в «Истории отгрузок»','Yuklama saqlandi, lekin fayl yuklanmadi — «Yuklamalar tarixi»dan qayta yuklang','The shipment was saved, but the file was not uploaded — upload it again from “Shipment history”','Sevkiyat kaydedildi ancak dosya yüklenmedi — «Sevkiyat geçmişi»nden yeniden yükleyin'],
    ['Для открытия файла нужен интернет','Faylni ochish uchun internet kerak','An internet connection is needed to open the file','Dosyayı açmak için internet gerekir'],
    ['Не удалось открыть файл','Faylni ochib bo‘lmadi','Could not open the file','Dosya açılamadı'],
    ['Файл не удалился из хранилища','Fayl saqlash joyidan o‘chmadi','The file was not removed from storage','Dosya depodan silinemedi'],
    ['Удалить прикреплённый документ?','Biriktirilgan hujjatni olib tashlash?','Remove the attached document?','Ekli belge kaldırılsın mı?'],
    ['Подписанный документ','Imzolangan hujjat','Signed document','İmzalı belge'],
    ['Загрузить файл','Fayl yuklash','Upload file','Dosya yükle'],
    ['Документ','Hujjat','Document','Belge'],
    ['Все отгрузки инвойса удалены','Invoysning barcha yuklamalari o‘chirildi','All shipments of the invoice were deleted','Faturanın tüm sevkiyatları silindi'],
    ['Название инвойса не должно быть пустым','Invoys nomi bo‘sh bo‘lmasin','The invoice name must not be empty','Fatura adı boş olmamalı'],
    ['В обоих инвойсах прикреплён подписанный документ. Перед объединением удалите документ у одного из них.','Ikkala invoysda ham imzolangan hujjat biriktirilgan. Birlashtirishdan oldin bittasining hujjatini olib tashlang.','Both invoices have a signed document attached. Remove the document from one of them before merging.','Her iki faturada da imzalı belge ekli. Birleştirmeden önce birinin belgesini kaldırın.'],
    ['Инвойсы объединены','Invoyslar birlashtirildi','Invoices merged','Faturalar birleştirildi'],
    ['Инвойс обновлён','Invoys yangilandi','Invoice updated','Fatura güncellendi'],
    ['Редактировать инвойс','Invoysni tahrirlash','Edit invoice','Faturayı düzenle'],
    ['Название инвойса','Invoys nomi','Invoice name','Fatura adı'],
    ['Удалить инвойс целиком?','Invoysni butunlay o‘chirish?','Delete the whole invoice?','Fatura tamamen silinsin mi?'],
    ['Удалить инвойс','Invoysni o‘chirish','Delete invoice','Faturayı sil'],
    ['Удалить черновик?','Qoralamani o‘chirish?','Delete the draft?','Taslak silinsin mi?'],
    ['кг разрешено','kg ruxsat etilgan','kg allowed','kg izinli'],
    ['Продано, вес','Sotilgan vazn','Shipped weight','Sevk edilen ağırlık'],
    ['Остаток, вес','Qoldiq vazn','Remaining weight','Kalan ağırlık'],
    ['Отгрузка не найдена','Yuklama topilmadi','Shipment not found','Sevkiyat bulunamadı'],
    ['Перетащите файл сюда','Faylni shu yerga tashlang','Drag the file here','Dosyayı buraya sürükleyin'],
    ['или нажмите, чтобы выбрать','yoki tanlash uchun bosing','or click to choose','veya seçmek için tıklayın'],
    ['— не использовать —','— ishlatilmasin —','— do not use —','— kullanma —'],
    ['Файл:','Fayl:','File:','Dosya:'],
    ['Отменить','Bekor qilish','Cancel','İptal'],
    ['Нет строк с количеством больше нуля','Miqdori noldan katta qator yo‘q','No rows with a quantity above zero','Miktarı sıfırdan büyük satır yok'],
    ['Не удалось прочитать файл','Faylni o‘qib bo‘lmadi','Could not read the file','Dosya okunamadı'],
    ['Отгрузка из файла проведена, остатки обновлены','Fayldan yuklama o‘tkazildi, qoldiqlar yangilandi','Shipment from file processed, balances updated','Dosyadaki sevkiyat işlendi, bakiyeler güncellendi'],
    ['Файл содержит','Fayl ichida','The file contains','Dosya şunu içerir:'],
    ['лист(ов), по одному на каждое разрешение, с колонками по каждой отгрузке (как в исходных файлах учёта) и остатками.','varaq bor: har bir ruxsatnomaga bittadan, har bir yuklama uchun ustunlar (asl hisob fayllaridagidek) va qoldiqlar bilan.','sheet(s), one per permit, with a column for each shipment (as in the original records) and balances.','sayfa: her izin için bir tane, her sevkiyat için sütunlar (orijinal kayıt dosyalarındaki gibi) ve kalanlarla.'],
    ['отдельный файл Excel на каждое разрешение, всё в одном ZIP. Имя файла — номер и дата разрешения. Внутри ZIP также есть','ta ruxsatnoma uchun alohida Excel fayl, hammasi bitta ZIP ichida. Fayl nomi — ruxsatnoma raqami va sanasi. ZIP ichida yana','separate Excel file per permit, all in one ZIP. The file name is the permit number and date. The ZIP also contains','izin için ayrı bir Excel dosyası, hepsi tek ZIP içinde. Dosya adı, izin numarası ve tarihidir. ZIP içinde ayrıca şu da var:'],
    ['— общий список всех разрешений.','bor — barcha ruxsatnomalarning umumiy ro‘yxati.','— the overall list of all permits.','— tüm izinlerin genel listesi.'],
    ['Резервная копия скачана','Zaxira nusxa yuklab olindi','Backup downloaded','Yedek indirildi'],
    ['Ошибка резервного копирования','Zaxira nusxa xatosi','Backup error','Yedekleme hatası'],
    ['Название модели','Model nomi','Model name','Model adı'],
    ['Разрешено (шт)','Ruxsat etilgan (dona)','Allowed (pcs)','İzin verilen (adet)'],
    ['Разрешённый вес (кг)','Ruxsat etilgan vazn (kg)','Allowed weight (kg)','İzin verilen ağırlık (kg)'],
    ['Вес 1 ед. (кг)','1 birlik vazni (kg)','Unit weight (kg)','Birim ağırlık (kg)'],
    ['Остаток (шт)','Qoldiq (dona)','Remaining (pcs)','Kalan (adet)'],
    ['Остаток вес (кг)','Qoldiq vazn (kg)','Remaining weight (kg)','Kalan ağırlık (kg)'],
    ['Все модели','Barcha modellar','All models','Tüm modeller'],
    ['Все_модели_','Barcha_modellar_','All_models_','Tum_modeller_'],
    ['Доступные модели (В норме + Мало осталось)','Mavjud modellar (Me’yorda + Kam qolgan)','Available models (OK + Running low)','Mevcut modeller (Normal + Azalan)'],
    ['Доступные модели','Mavjud modellar','Available models','Mevcut modeller'],
    ['Доступные_модели_','Mavjud_modellar_','Available_models_','Mevcut_modeller_'],
    ['Модели_с_остатком_мало_','Kam_qolgan_modellar_','Models_running_low_','Azalan_modeller_'],
    ['Закончившиеся_модели_','Tugagan_modellar_','Finished_models_','Biten_modeller_'],
    ['Нет моделей для скачивания','Yuklab olish uchun modellar yo‘q','No models to download','İndirilecek model yok'],
    ['Мато / состав','Mato / tarkib','Material / composition','Malzeme / bileşim'],
    ['Отгружено (шт)','Yuklangan (dona)','Shipped (pcs)','Sevk edilen (adet)'],
    ['Отгруженный вес (кг)','Yuklangan vazn (kg)','Shipped weight (kg)','Sevk edilen ağırlık (kg)'],
    ['Файл Excel готов','Excel fayl tayyor','Excel file is ready','Excel dosyası hazır'],
    ['Excel файл готов','Excel fayl tayyor','Excel file is ready','Excel dosyası hazır'],
    ['Excel библиотека не загрузилась','Excel kutubxonasi yuklanmadi','The Excel library failed to load','Excel kütüphanesi yüklenemedi'],
    ['Нет позиций для скачивания','Yuklab olish uchun pozitsiyalar yo‘q','No items to download','İndirilecek kalem yok'],
    ['Всего моделей','Jami modellar','Total models','Toplam model'],
    ['Доступные модели (кол.)','Mavjud modellar','Available models','Mevcut modeller'],
    ['Интернета нет — только просмотр. Для входа и редактирования подключитесь к интернету.','Internet yo‘q — faqat ko‘rish rejimi. Kirish/tahrirlash uchun internetga ulaning.','No internet — view-only mode. Connect to the internet to sign in or edit.','İnternet yok — yalnızca görüntüleme modu. Giriş yapmak veya düzenlemek için internete bağlanın.'],
    ['Аккаунт','Hisob','Account','Hesap'],
    ['Аккаунт редактора / выйти','Muharrir hisobi / chiqish','Editor account / sign out','Editör hesabı / çıkış'],
    ['Аккаунт (добавление) / выйти','Hisob (qo‘shish huquqi) / chiqish','Account (can add) / sign out','Hesap (ekleme yetkisi) / çıkış'],
    ['Аккаунт (только просмотр) / выйти','Hisob (faqat ko‘rish) / chiqish','Account (view only) / sign out','Hesap (yalnızca görüntüleme) / çıkış'],
    ['Вы вышли из режима редактирования','Tahrirlash rejimidan chiqdingiz','You have left editing mode','Düzenleme modundan çıktınız'],
    ['Нет аккаунта?','Hisobingiz yo‘qmi?','No account?','Hesabınız yok mu?'],
    ['Введите email и пароль','Email va parolni kiriting','Enter your email and password','E-posta ve şifrenizi girin'],
    ['Вход…','Kirilmoqda…','Signing in…','Giriş yapılıyor…'],
    ['Вход выполнен, синхронизация запущена','Kirish bajarildi, sinxronlash boshlandi','Signed in, synchronization started','Giriş yapıldı, senkronizasyon başladı'],
    ['Введите имя и фамилию','Ism va familiyani kiriting','Enter your first and last name','Ad ve soyadınızı girin'],
    ['Пароль должен содержать не менее 6 символов','Parol kamida 6 belgidan iborat bo‘lishi kerak','The password must be at least 6 characters','Şifre en az 6 karakter olmalıdır'],
    ['Не удалось зарегистрироваться','Ro‘yxatdan o‘tib bo‘lmadi','Could not register','Kayıt yapılamadı'],
    ['Более новая версия на сервере сохранена и показана на экране. Ваше изменение не принято — проверьте данные и при необходимости введите снова.','Serverdagi yangiroq versiya saqlandi va ekranda ko‘rsatildi. Sizning o‘zgarishingiz qabul qilinmadi — iltimos, ma’lumotni tekshirib, kerak bo‘lsa qayta kiriting.','A newer version on the server was kept and is shown on screen. Your change was not accepted — please check the data and re-enter it if needed.','Sunucudaki daha yeni sürüm korundu ve ekranda gösterildi. Değişikliğiniz kabul edilmedi — lütfen verileri kontrol edip gerekirse yeniden girin.'],
    ['Через 1 час бездействия вы автоматически вышли из системы','1 soatlik nofaollikdan so‘ng tizimdan avtomatik chiqarildingiz','You were signed out automatically after 1 hour of inactivity','1 saatlik hareketsizlik nedeniyle oturumunuz otomatik kapatıldı'],
    ['Офлайн: войти в систему нельзя. Подключитесь к интернету.','Offline holatda tizimga kirish mumkin emas. Internetga ulaning.','You cannot sign in while offline. Connect to the internet.','Çevrimdışıyken giriş yapılamaz. İnternete bağlanın.'],
    ['Аккаунт создан. Перейдите по ссылке из письма для подтверждения, затем войдите.','Hisob yaratildi. Emailingizga kelgan havolani bosib tasdiqlang, so‘ng kiring.','Account created. Click the link sent to your email to confirm, then sign in.','Hesap oluşturuldu. E-postanıza gelen bağlantıya tıklayarak onaylayın, ardından giriş yapın.'],
    ['Добро пожаловать! Аккаунт создан, вход выполнен.','Xush kelibsiz! Hisob yaratildi va kirish amalga oshirildi.','Welcome! Your account was created and you are signed in.','Hoş geldiniz! Hesabınız oluşturuldu ve giriş yapıldı.'],
    ['Выберите разрешение и модель','Ruxsatnoma va modelni tanlang','Select a permit and a model','İzin ve modeli seçin'],
    ['Новая отгрузка → «С несколькими разрешениями»','Yangi yuklama → «Ko‘p ruxsatnomali»','New shipment → “Multi-permit”','Yeni sevkiyat → «Çok izinli»'],
    ['Имя, фамилия','Ism, familiya','First and last name','Ad, soyad'],
    ['шт','dona','pcs','adet'],
    ['Всего ячеек','Jami','Total','Toplam']
  ];
  for(const [ru, uz, en, tr] of EXTRA_V6){
    // Kalit band bo'lsa ham (boshqa uz/tr yozuvi bilan) alohida kalit ostida qo'shamiz — manba matn qaysi shaklda bo'lsa ham topilsin.
    EXTRA_TEXT[EXTRA_TEXT[ru] ? ru + '\u200b' : ru] = {ru, uz, en, tr};
  }

  /* Birliklar (faqat raqamdan keyin yoki aniq shablonlarda ishlatiladi). */
  const UNIT_WORDS = {
    'шт':   {ru:'шт',   uz:'dona', en:'pcs',   tr:'adet'},
    'dona': {ru:'шт',   uz:'dona', en:'pcs',   tr:'adet'},
    'пара': {ru:'пара', uz:'juft', en:'pairs', tr:'çift'},
    'juft': {ru:'пара', uz:'juft', en:'pairs', tr:'çift'},
    'кг':   {ru:'кг',   uz:'kg',   en:'kg',    tr:'kg'},
    'kg':   {ru:'кг',   uz:'kg',   en:'kg',    tr:'kg'}
  };
  function unitWord(u, lang){
    const e = UNIT_WORDS[String(u||'').trim().toLowerCase()];
    return e ? e[normalizeLang(lang)] : u;
  }

  /* Dinamik shablonlar. Har bir shablon: [manba regex, {ru,uz,en,tr}].
     Shablondagi $1, $2 … — ma'lumot qismlari (nom, raqam) o'zgarishsiz qo'yiladi.
     $u1 … $u9 — birlik so'zi (shт/кг → dona/pcs/adet). */
  const N = '([\\d\\s\\u00a0\\u202f.,]+)';
  const DYN_PATTERNS = [
    [/^([^:]+): превышено количество \(остаток (.+)\)$/, {ru:'$1: превышено количество (остаток $2)', uz:'$1: miqdor oshib ketdi (qoldiq $2)', en:'$1: quantity exceeded (remaining $2)', tr:'$1: miktar aşıldı (kalan $2)'}],
    [/^([^:]+): превышен вес \(остаток (.+) кг\)$/, {ru:'$1: превышен вес (остаток $2 кг)', uz:'$1: vazn oshib ketdi (qoldiq $2 kg)', en:'$1: weight exceeded (remaining $2 kg)', tr:'$1: ağırlık aşıldı (kalan $2 kg)'}],
    [/^([^:]+): количество должно быть больше 0$/, {ru:'$1: количество должно быть больше 0', uz:'$1: miqdor 0 dan katta bo‘lishi kerak', en:'$1: quantity must be greater than 0', tr:'$1: miktar 0’dan büyük olmalıdır'}],
    [/^([^:]+): вес не может быть отрицательным$/, {ru:'$1: вес не может быть отрицательным', uz:'$1: vazn manfiy bo‘lishi mumkin emas', en:'$1: weight cannot be negative', tr:'$1: ağırlık negatif olamaz'}],
    [/^Qoldiq: (.+) — undan ortiq (kiritib|qo'shib|qo‘shib) bo['‘]lmaydi$/, {ru:'Остаток: $1 — больше вводить нельзя', uz:'Qoldiq: $1 — undan ortiq kiritib bo‘lmaydi', en:'Balance: $1 — cannot enter more', tr:'Kalan: $1 — daha fazla girilemez'}],
    [/^Qoldiq vazn: (.+) kg — undan ortiq (kiritib|qo'shib|qo‘shib) bo['‘]lmaydi$/, {ru:'Остаток веса: $1 кг — больше вводить нельзя', uz:'Qoldiq vazn: $1 kg — undan ortiq kiritib bo‘lmaydi', en:'Remaining weight: $1 kg — cannot enter more', tr:'Kalan ağırlık: $1 kg — daha fazla girilemez'}],
    [/^Yuklama saqlandi \((\d+) ta ruxsatnoma bo['‘]yicha\), qoldiqlar yangilandi$/, {ru:'Отгрузка сохранена ($1 разрешений), остатки обновлены', uz:'Yuklama saqlandi ($1 ta ruxsatnoma bo‘yicha), qoldiqlar yangilandi', en:'Shipment saved (across $1 permits), balances updated', tr:'Sevkiyat kaydedildi ($1 izin için), bakiyeler güncellendi'}],
    [/^Invoys o['‘]chirildi \((\d+) ta yuklama\), qoldiqlar yangilandi$/, {ru:'Инвойс удалён ($1 отгрузок), остатки обновлены', uz:'Invoys o‘chirildi ($1 ta yuklama), qoldiqlar yangilandi', en:'Invoice deleted ($1 shipments), balances updated', tr:'Fatura silindi ($1 sevkiyat), bakiyeler güncellendi'}],
    [/^Qoralamaga qo['‘]shildi: (.+)\. «Новая отгрузка» → «Ko['‘]p ruxsatnomali» bo['‘]limida davom ettiring$/, {ru:'Добавлено в черновик: $1. Продолжите в «Новая отгрузка» → «С несколькими разрешениями»', uz:'Qoralamaga qo‘shildi: $1. «Yangi yuklama» → «Ko‘p ruxsatnomali» bo‘limida davom ettiring', en:'Added to draft: $1. Continue in “New shipment” → “Multi-permit”', tr:'Taslağa eklendi: $1. «Yeni sevkiyat» → «Çok izinli» bölümünden devam edin'}],
    [/^Boshqa foydalanuvchi o['‘]zgartirgan: (\d+) ta yozuv yangilandi$/, {ru:'Изменено другим пользователем: обновлено записей — $1', uz:'Boshqa foydalanuvchi o‘zgartirgan: $1 ta yozuv yangilandi', en:'Changed by another user: $1 record(s) updated', tr:'Başka bir kullanıcı değiştirdi: $1 kayıt güncellendi'}],
    [/^Diqqat: (\d+) ta yozuv boshqa foydalanuvchi tomonidan siz bilan bir vaqtda o['‘]zgartirilgan edi\.$/, {ru:'Внимание: $1 записей были изменены другим пользователем одновременно с вами.', uz:'Diqqat: $1 ta yozuv boshqa foydalanuvchi tomonidan siz bilan bir vaqtda o‘zgartirilgan edi.', en:'Attention: $1 record(s) were changed by another user at the same time as you.', tr:'Dikkat: $1 kayıt, siz değişiklik yaparken başka bir kullanıcı tarafından da değiştirilmişti.'}],
    [/^(\d+) (?:записей|yozuv|records|kayıt) o['‘]chirildi$/, {ru:'Удалено записей: $1', uz:'$1 ta yozuv o‘chirildi', en:'$1 record(s) deleted', tr:'$1 kayıt silindi'}],
    [/^Удалено записей: (\d+)$/, {ru:'Удалено записей: $1', uz:'$1 ta yozuv o‘chirildi', en:'$1 record(s) deleted', tr:'$1 kayıt silindi'}],
    [/^Будет удалено записей: (\d+)\. Они будут удалены из журнала у всех пользователей\. Действие необратимо\.$/, {ru:'Будет удалено записей: $1. Они будут удалены из журнала у всех пользователей. Действие необратимо.', uz:'$1 ta yozuv barcha foydalanuvchilar uchun jurnaldan o‘chiriladi. Amalni ortga qaytarib bo‘lmaydi.', en:'$1 record(s) will be removed from the log for all users. This cannot be undone.', tr:'$1 kayıt tüm kullanıcılar için günlükten silinecek. Bu işlem geri alınamaz.'}],
    [/^(.+) bu qoralamani tahrirlayapti \((\d+) daqiqa oldin\)\.$/, {ru:'$1 редактирует этот черновик ($2 мин. назад).', uz:'$1 bu qoralamani tahrirlayapti ($2 daqiqa oldin).', en:'$1 is editing this draft ($2 min ago).', tr:'$1 bu taslağı düzenliyor ($2 dk önce).'}],
    [/^Baribir ochasizmi\? Oxirgi saqlagan odamning o['‘]zgarishlari qoladi\.$/, {ru:'Всё равно открыть? Останутся изменения того, кто сохранил последним.', uz:'Baribir ochasizmi? Oxirgi saqlagan odamning o‘zgarishlari qoladi.', en:'Open anyway? The changes of the person who saved last will be kept.', tr:'Yine de açılsın mı? En son kaydeden kişinin değişiklikleri korunur.'}],
    [/^(.+) shu qoralamani tahrirlayapti\. Ikkalangiz saqlasangiz, oxirgi saqlagan odamning o['‘]zgarishlari qoladi\.$/, {ru:'$1 редактирует этот черновик. Если сохраните оба, останутся изменения того, кто сохранил последним.', uz:'$1 shu qoralamani tahrirlayapti. Ikkalangiz saqlasangiz, oxirgi saqlagan odamning o‘zgarishlari qoladi.', en:'$1 is editing this draft. If you both save, the changes of the person who saved last will be kept.', tr:'$1 bu taslağı düzenliyor. İkiniz de kaydederseniz, en son kaydedenin değişiklikleri korunur.'}],
    [/^«(.+)» nomli invoys allaqachon bor\. Ikkala invoys BIRLASHTIRILADI \(jami (\d+) ta yuklama bitta invoysda bo['‘]ladi\)\.$/, {ru:'Инвойс «$1» уже существует. Оба инвойса будут ОБЪЕДИНЕНЫ (всего отгрузок в одном инвойсе: $2).', uz:'«$1» nomli invoys allaqachon bor. Ikkala invoys BIRLASHTIRILADI (jami $2 ta yuklama bitta invoysda bo‘ladi).', en:'An invoice named “$1” already exists. Both invoices will be MERGED ($2 shipments in one invoice in total).', tr:'«$1» adlı fatura zaten var. İki fatura BİRLEŞTİRİLECEK (tek faturada toplam $2 sevkiyat olacak).'}],
    [/^Davom etasizmi\?$/, {ru:'Продолжить?', uz:'Davom etasizmi?', en:'Continue?', tr:'Devam edilsin mi?'}],
    [/^«(.+)» fayli saqlash joyidan o['‘]chiriladi\.$/, {ru:'Файл «$1» будет удалён из хранилища.', uz:'«$1» fayli saqlash joyidan o‘chiriladi.', en:'The file “$1” will be removed from storage.', tr:'«$1» dosyası depodan silinecek.'}],
    [/^Faqat umumiy nom va sana o['‘]zgaradi \((\d+) ta yuklamada\)\. Modellar va ruxsatnomalarni invoys ichida o['‘]zgartiring\.$/, {ru:'Изменяются только общее название и дата ($1 отгрузок). Модели и разрешения меняйте внутри инвойса.', uz:'Faqat umumiy nom va sana o‘zgaradi ($1 ta yuklamada). Modellar va ruxsatnomalarni invoys ichida o‘zgartiring.', en:'Only the common name and date change ($1 shipments). Change models and permits inside the invoice.', tr:'Yalnızca ortak ad ve tarih değişir ($1 sevkiyatta). Model ve izinleri fatura içinde değiştirin.'}],
    [/^«(.+)» invoysining (\d+) ta yuklamasi \((\d+) ta ruxsatnoma bo['‘]yicha\) o['‘]chiriladi, ruxsatnomalar qoldig['‘]i qayta hisoblanadi\.(?: Biriktirilgan imzolangan hujjat ham o['‘]chadi\.)?$/, {ru:'Будут удалены отгрузки инвойса «$1» ($2 шт., по $3 разрешениям), остатки разрешений будут пересчитаны.', uz:'«$1» invoysining $2 ta yuklamasi ($3 ta ruxsatnoma bo‘yicha) o‘chiriladi, ruxsatnomalar qoldig‘i qayta hisoblanadi.', en:'$2 shipment(s) of invoice “$1” (across $3 permits) will be deleted and permit balances recalculated.', tr:'«$1» faturasının $2 sevkiyatı ($3 izin için) silinecek ve izin bakiyeleri yeniden hesaplanacak.'}],
    [/^Biriktirilgan imzolangan hujjat ham o['‘]chadi\.$/, {ru:'Прикреплённый подписанный документ тоже будет удалён.', uz:'Biriktirilgan imzolangan hujjat ham o‘chadi.', en:'The attached signed document will also be deleted.', tr:'Ekli imzalı belge de silinecek.'}],
    [/^«(.+)» qoralamasi butunlay o['‘]chiriladi\. Qoldiqlarga ta['’‘]sir qilmaydi\.$/, {ru:'Черновик «$1» будет удалён полностью. На остатки это не влияет.', uz:'«$1» qoralamasi butunlay o‘chiriladi. Qoldiqlarga ta’sir qilmaydi.', en:'The draft “$1” will be deleted completely. Balances are not affected.', tr:'«$1» taslağı tamamen silinecek. Bakiyeleri etkilemez.'}],
    [/^Invoys qatorlari \((\d+)\)$/, {ru:'Строки инвойса ($1)', uz:'Invoys qatorlari ($1)', en:'Invoice rows ($1)', tr:'Fatura satırları ($1)'}],
    [/^Miqdor \((.+)\)$/, {ru:'Количество ($u1)', uz:'Miqdor ($u1)', en:'Quantity ($u1)', tr:'Miktar ($u1)'}],
    [/^Qo['‘]shish mumkin:$/, {ru:'Можно добавить:', uz:'Qo‘shish mumkin:', en:'Can add:', tr:'Eklenebilir:'}],
    [/^\(bu invoysda allaqachon (.+) bor\)$/, {ru:'(в этом инвойсе уже $1)', uz:'(bu invoysda allaqachon $1 bor)', en:'(already $1 in this invoice)', tr:'(bu faturada zaten $1 var)'}],
    [/^— undan ortiq (qo['‘]shib|kiritib) bo['‘]lmaydi$/, {ru:'— больше добавлять нельзя', uz:'— undan ortiq qo‘shib bo‘lmaydi', en:'— cannot add more', tr:'— daha fazla eklenemez'}],
    [/^· qoldiq:$/, {ru:'· остаток:', uz:'· qoldiq:', en:'· balance:', tr:'· kalan:'}],
    [/^Kam qolgan — (\d+) ta pozitsiya$/, {ru:'Мало осталось — позиций: $1', uz:'Kam qolgan — $1 ta pozitsiya', en:'Running low — $1 item(s)', tr:'Azalan — $1 kalem'}],
    [/^Tugagan \/ ortiqcha sarf — (\d+) ta pozitsiya$/, {ru:'Закончено / перерасход — позиций: $1', uz:'Tugagan / ortiqcha sarf — $1 ta pozitsiya', en:'Finished / overused — $1 item(s)', tr:'Biten / fazla kullanılan — $1 kalem'}],
    [/^— моделей: (.+)$/, {ru:'— моделей: $1', uz:'— modellar: $1', en:'— models: $1', tr:'— model: $1'}],
    [/^— позиций: (.+)$/, {ru:'— позиций: $1', uz:'— pozitsiyalar: $1', en:'— items: $1', tr:'— kalem: $1'}],
    [/^Файл: (.+), строка заголовков № (\d+)\. Укажите, какой столбец за что отвечает\.$/, {ru:'Файл: $1, строка заголовков № $2. Укажите, какой столбец за что отвечает.', uz:'Fayl: $1, sarlavhalar qatori № $2. Qaysi ustun nimaga mos ekanini ko‘rsating.', en:'File: $1, header row № $2. Specify which column is which.', tr:'Dosya: $1, başlık satırı № $2. Hangi sütunun neye karşılık geldiğini belirtin.'}],
    [/^от (\S+)\s*(?:·\s*(.+?)\s*)?·\s*разрешено (.+) шт \/ (.+) кг\s*·\s*остаток (.+) шт \/ (.+) кг$/, {ru:'от $1 · $2 · разрешено $3 шт / $4 кг · остаток $5 шт / $6 кг', uz:'$1 dan · $2 · ruxsat etilgan $3 dona / $4 kg · qoldiq $5 dona / $6 kg', en:'from $1 · $2 · allowed $3 pcs / $4 kg · remaining $5 pcs / $6 kg', tr:'$1 tarihli · $2 · izin verilen $3 adet / $4 kg · kalan $5 adet / $6 kg'}],
    [/^(.+) \(sana: (.+) → (.+)\)$/, {ru:'$1 (дата: $2 → $3)', uz:'$1 (sana: $2 → $3)', en:'$1 (date: $2 → $3)', tr:'$1 (tarih: $2 → $3)'}]
  ];

  const _apos = s => String(s).replace(/[ʻ‘’`]/g, "'");
  const reverseNorm = new Map();

  const reverseText = new Map();
  for(const [key, entry] of Object.entries(UI_TEXT)){
    for(const value of Object.values(entry)){
      if(value && !reverseText.has(value)) reverseText.set(value, key);
    }
  }
  for(const [value, entry] of Object.entries(EXTRA_TEXT)){
    for(const translated of Object.values(entry)){
      if(translated && !reverseText.has(translated)) reverseText.set(translated, '__extra__:' + value);
    }
  }

  for(const [v, k] of reverseText){ const nv = _apos(v); if(!reverseNorm.has(nv)) reverseNorm.set(nv, k); }

  function normalizeLang(lang){ return LANGUAGES[lang] ? lang : 'ru'; }

  function nextTheme(theme){
    return theme === 'dark' ? 'light' : 'dark';
  }

  function quickSections(){
    return [
      {tab:'dashboard', textKey:'dashboard'},
      {tab:'permits', textKey:'permits'},
      {tab:'shipment', textKey:'shipment'},
      {tab:'export', textKey:'export'}
    ];
  }

  function sidebarSectionsV9(){
    return [
      {action:'home', label:'Bosh sahifa', icon:'home'},
      {tab:'dashboard', label:'Qoldiqlar', icon:'spool'},
      {tab:'permits', label:'Ruxsatnomalar', icon:'clipboard'},
      {tab:'shipment', label:'Yangi yuklama', icon:'truck'},
      {tab:'export', label:'Eksport', icon:'ship'},
      {action:'stats', label:'Hisobotlar', icon:'chart'},
      {action:'settings', label:'Sozlamalar', icon:'gear'},
      {action:'logout', label:'Chiqish', icon:'logout'}
    ];
  }

  function resolveSidebarSelectionV10(activeTab, requested){
    const tab = ['dashboard','permits','shipment','export'].includes(activeTab) ? activeTab : 'dashboard';
    if(tab !== 'dashboard') return tab;
    return requested === 'home' ? 'home' : 'dashboard';
  }

  function sidebarSectionsV11(){
    return [
      {id:'dashboard', label:'Qoldiqlar', icon:'spool'},
      {id:'permits', label:'Ruxsatnomalar', icon:'clipboard'},
      {id:'shipment', label:'Yangi yuklama', icon:'truck'},
      {id:'export', label:'Eksport', icon:'ship'},
      {id:'reports', label:'Hisobotlar', icon:'chart'}
    ];
  }

  function sidebarDestinationV11(id){
    return id === 'reports'
      ? {tab:'dashboard', mode:'reports'}
      : {tab:['dashboard','permits','shipment','export'].includes(id) ? id : 'dashboard', mode:'normal'};
  }

  function resolveSidebarSelectionV11(activeTab, requested){
    const tab = ['dashboard','permits','shipment','export'].includes(activeTab) ? activeTab : 'dashboard';
    if(tab !== 'dashboard') return tab;
    return requested === 'reports' ? 'reports' : 'dashboard';
  }

  function sidebarSectionsV12(){
    return [
      {id:'dashboard', label:'Qoldiqlar', icon:'spool'},
      {id:'permits', label:'Ruxsatnomalar', icon:'clipboard'},
      {id:'shipment', label:'Yangi yuklama', icon:'truck'},
      {id:'shipmentHistory', label:'Yuklamalar tarixi', icon:'clock'},
      {id:'modelFinder', label:'Model topish', icon:'search'},
      {id:'reports', label:'Hisobotlar', icon:'chart'},
      {id:'audit', label:'Tarix', icon:'audit'}
    ];
  }

  function sidebarDestinationV12(id){
    if(id === 'reports') return {tab:'dashboard', mode:'reports'};
    return {tab:['dashboard','permits','shipment','shipmentHistory','modelFinder','export','audit'].includes(id) ? id : 'dashboard', mode:'normal'};
  }

  function resolveSidebarSelectionV12(activeTab, requested){
    const tab = ['dashboard','permits','shipment','shipmentHistory','modelFinder','export','audit'].includes(activeTab) ? activeTab : 'dashboard';
    // Eksport endi Hisobotlar bo'limining ichki kichik bo'limi — shu sabab
    // eksport ochilganda ham yon panelda "Hisobotlar" band bo'lib qoladi.
    if(tab === 'export') return 'reports';
    if(tab !== 'dashboard') return tab;
    return requested === 'reports' ? 'reports' : 'dashboard';
  }

  function computeKpiDeltasV12(permits, shipments, recentShipmentIds){
    const ps = Array.isArray(permits) ? permits : [];
    const ss = Array.isArray(shipments) ? shipments : [];
    const recent = recentShipmentIds instanceof Set ? recentShipmentIds : new Set(recentShipmentIds || []);

    function statusCounts(excludeRecent){
      const usage = new Map();
      for(const sh of ss){
        if(excludeRecent && recent.has(sh && sh.id)) continue;
        if(!sh || !Array.isArray(sh.lines)) continue;
        for(const ln of sh.lines){
          const key = `${sh.permitId}:${ln.itemId}`;
          usage.set(key, (usage.get(key)||0) + (Number(ln.qty)||0));
        }
      }

      let warn = 0, crit = 0;
      for(const permit of ps){
        for(const item of (permit && Array.isArray(permit.items) ? permit.items : [])){
          const allowed = Number(item.qty)||0;
          const used = usage.get(`${permit.id}:${item.id}`)||0;
          const rem = allowed - used;
          const pct = allowed ? Math.max(0,rem)/allowed : 0;
          if(rem <= 0) crit++;
          else if(pct <= .25) warn++;
        }
      }
      return {warn,crit};
    }

    const current = statusCounts(false);
    const before = statusCounts(true);
    return {
      warn:current.warn,
      crit:current.crit,
      deltaWarn:current.warn-before.warn,
      deltaCrit:current.crit-before.crit
    };
  }

  function computeRecentlyCriticalV12(permits, shipments, recentShipmentIds){
    const ps = Array.isArray(permits) ? permits : [];
    const ss = Array.isArray(shipments) ? shipments : [];
    const recent = recentShipmentIds instanceof Set ? recentShipmentIds : new Set(recentShipmentIds || []);

    function levelsByItem(excludeRecent){
      const usage = new Map();
      for(const sh of ss){
        if(excludeRecent && recent.has(sh && sh.id)) continue;
        if(!sh || !Array.isArray(sh.lines)) continue;
        for(const ln of sh.lines){
          const key = `${sh.permitId}:${ln.itemId}`;
          usage.set(key, (usage.get(key)||0) + (Number(ln.qty)||0));
        }
      }
      const levels = new Map();
      for(const permit of ps){
        for(const item of (permit && Array.isArray(permit.items) ? permit.items : [])){
          const key = `${permit.id}:${item.id}`;
          const allowed = Number(item.qty)||0;
          const used = usage.get(key)||0;
          const rem = allowed - used;
          const pct = allowed ? Math.max(0,rem)/allowed : 0;
          let level = 'ok';
          if(rem < 0) level = 'over';
          else if(rem === 0) level = 'finished';
          else if(pct <= .25) level = 'warn';
          levels.set(key, level);
        }
      }
      return levels;
    }

    const before = levelsByItem(true);
    const current = levelsByItem(false);
    const newWarnKeys = new Set();
    const newCritKeys = new Set();
    for(const [key, level] of current){
      const prevLevel = before.get(key) || 'ok';
      const wasCrit = prevLevel === 'finished' || prevLevel === 'over';
      const isCrit = level === 'finished' || level === 'over';
      if(isCrit && !wasCrit) newCritKeys.add(key);
      if(level === 'warn' && prevLevel !== 'warn' && !wasCrit) newWarnKeys.add(key);
    }
    return { warnKeys:newWarnKeys, critKeys:newCritKeys };
  }

  function formatDeltaV12(value){
    const n = Number(value)||0;
    if(n > 0) return `+${n} ↑`;
    if(n < 0) return `−${Math.abs(n)} ↓`;
    return '0';
  }

  function textByKey(key, lang){
    const entry = UI_TEXT[key];
    if(!entry) return key;
    const code = normalizeLang(lang);
    return entry[code] || entry.ru || key;
  }

  function paginate(items, requestedPage, pageSize){
    const list = Array.isArray(items) ? items : [];
    const size = Math.max(1, Number(pageSize) || PAGE_SIZE);
    const pageCount = Math.max(1, Math.ceil(list.length / size));
    const raw = Math.trunc(Number(requestedPage) || 1);
    const page = Math.min(pageCount, Math.max(1, raw));
    const from = (page - 1) * size;
    const pageItems = list.slice(from, from + size);
    return {
      items: pageItems,
      page,
      pageSize: size,
      pageCount,
      total: list.length,
      start: list.length ? from + 1 : 0,
      end: list.length ? from + pageItems.length : 0
    };
  }

  function translateText(text, lang){
    const value = String(text ?? '');
    const key = reverseText.get(value) || reverseNorm.get(_apos(value));
    if(!key) return value;
    if(key.startsWith('__extra__:')){
      const source = key.slice(10);
      const entry = EXTRA_TEXT[source];
      return entry ? (entry[normalizeLang(lang)] || entry.ru || value) : value;
    }
    return textByKey(key, lang);
  }


  /* Raqam + birlik ("986 шт", "234,53 кг", "832 шт / 542,92 кг") — jadval
     katakchalarida ham xavfsiz tarjima qilinadi (nom/raqamga tegmaydi). */
  const UNIT_ONLY_RE = /^[\d\s\u00a0\u202f.,\-−+\/]*\d\s*(?:шт|кг|пара)(?:[\d\s\u00a0\u202f.,\-−+\/]*(?:шт|кг|пара))*$/;
  function translateUnitsText(text, lang){
    const value = String(text ?? '');
    if(!UNIT_ONLY_RE.test(value.trim())) return value;
    const code = normalizeLang(lang);
    if(code === 'ru') return value;
    return value.replace(/шт|кг|пара/g, u => unitWord(u, code));
  }

  function applyDynPatterns(value, code){
    for(const [re, tpl] of DYN_PATTERNS){
      const m = value.match(re);
      if(!m) continue;
      const t = tpl[code];
      if(!t) continue;
      const out = t.replace(/\$u(\d)/g, (_, i) => unitWord(m[i], code))
                   .replace(/\$(\d)/g, (_, i) => m[i] == null ? '' : m[i]);
      return out.replace(/(\s*·\s*){2,}/g, ' · ');
    }
    return null;
  }

  /* Matn (toast, alert, confirm, interfeys) uchun to'liq tarjima: aniq lug'at →
     ko'p qatorli → shablon → "Prefiks: ma'lumot". Ma'lumot qismi o'zgarmaydi. */
  function translateMessage(text, lang, depth){
    const value = String(text ?? '');
    const code = normalizeLang(lang);
    depth = depth || 0;
    if(!value.trim() || depth > 3) return value;
    const exact = translateText(value, code);
    if(exact !== value) return exact;
    const units = translateUnitsText(value, code);
    if(units !== value) return units;
    if(value.includes('\n')) return value.split('\n').map(l => translateMessage(l, code, depth + 1)).join('\n');
    const dyn = applyDynPatterns(value.trim(), code);
    if(dyn != null) return dyn;
    const m = value.match(/^([^:\n]{3,70}):\s+([\s\S]+)$/);
    if(m){
      const head = m[1].trim();
      const p = translateText(head, code);
      if(p !== head) return p + ': ' + translateMessage(m[2], code, depth + 1);
    }
    const tc = value.match(/^([^:\n]{3,70}):\s*$/);
    if(tc){
      const head = tc[1].trim();
      const p = translateText(head, code);
      if(p !== head) return p + ':';
    }
    return value;
  }

  function translateDynamicText(text, lang){
    const value = String(text ?? '');
    const code = normalizeLang(lang);

    let m = value.match(/^(\d+)\s+позиций$/);
    if(m){
      const n = m[1];
      return code==='en' ? `${n} items` : code==='uz' ? `${n} pozitsiya` : code==='tr' ? `${n} kalem` : `${n} позиций`;
    }

    m = value.match(/^Позиции разрешения\s+(.+)$/);
    if(m){
      const suffix = m[1];
      return code==='en' ? `Permit ${suffix} items` : code==='uz' ? `${suffix} ruxsatnoma pozitsiyalari` : code==='tr' ? `${suffix} izin kalemleri` : `Позиции разрешения ${suffix}`;
    }

    m = value.match(/^Файл будет содержать\s+(\d+)\s+лист\(ов\), по одному на каждое разрешение, с колонками по каждой отгрузке \(как в исходных файлах учёта\) и остатками\.$/);
    if(m){
      const n = m[1];
      return code==='en' ? `The file will contain ${n} sheet(s), one per permit, with shipment columns and balances.`
        : code==='uz' ? `Faylda ${n} ta varaq bo‘ladi: har ruxsatnomaga bittadan, yuklamalar va qoldiqlar bilan.`
        : code==='tr' ? `Dosyada ${n} sayfa olacak: her izin için bir sayfa, sevkiyat sütunları ve bakiyelerle.`
        : value;
    }

    return translateMessage(value, code);
  }

  function safeSheetName(base, usedNames){
    const used = usedNames || new Set();
    let raw = String(base ?? '').replace(/[\\/*?:\[\]]/g, '_').trim();
    if(!raw) raw = 'Sheet';
    raw = raw.slice(0,31);
    let candidate = raw;
    let i = 2;
    const exists = name => {
      const lower = name.toLowerCase();
      for(const v of used){ if(String(v).toLowerCase() === lower) return true; }
      return false;
    };
    while(exists(candidate)){
      const suffix = '_' + i++;
      candidate = raw.slice(0, 31 - suffix.length) + suffix;
    }
    used.add(candidate);
    return candidate;
  }

  /* Browser-only augmentation. */
  if(typeof window !== 'undefined' && typeof document !== 'undefined'){
    let currentLang = normalizeLang(localStorage.getItem(LANG_KEY) || 'ru');
    let currentTheme = localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light';
    let dashboardPage = 1;
    let v10SideSelection = 'dashboard';
    let v11SideSelection = 'dashboard';
    let v12SideSelection = 'dashboard';
    let v12Navigating = false;
    let recentChangesCacheV12 = { at:0, data:null };
    let enhanceTimer = null;
    let observer = null;

    function getText(key){ return textByKey(key, currentLang); }

    function notify(messageOrKey){
      const msg = UI_TEXT[messageOrKey] ? getText(messageOrKey) : String(messageOrKey || '');
      try{
        if(typeof toast === 'function') toast(msg);
        else console.info(msg);
      }catch(_){ console.info(msg); }
    }

    function applyTheme(){
      document.documentElement.dataset.theme = currentTheme;
      const meta = document.querySelector('meta[name="theme-color"]');
      if(meta) meta.setAttribute('content', currentTheme === 'dark' ? '#0d1524' : '#f4f7fb');
      const btn = document.getElementById('themeToggleV5');
      if(btn){
        btn.setAttribute('aria-pressed', currentTheme === 'dark' ? 'true' : 'false');
        btn.setAttribute('title', currentTheme === 'dark' ? getText('lightMode') : getText('darkMode'));
        btn.innerHTML = currentTheme === 'dark'
          ? '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path></svg>'
          : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"></path></svg>';
      }
    }

    function toggleTheme(){
      currentTheme = nextTheme(currentTheme);
      localStorage.setItem(THEME_KEY, currentTheme);
      applyTheme();
    }

    function languageButtonHtml(){
      const info = LANGUAGES[currentLang];
      return `<span class="control-icon-v5">🌐</span><span class="lang-current-v5">${info.label}</span><span class="chev-v5">⌄</span>`;
    }

    function updateLanguageControl(){
      document.documentElement.dataset.lang = currentLang;
      document.documentElement.lang = LANGUAGES[currentLang].htmlLang;
      const btn = document.getElementById('languageToggleV5');
      if(btn){
        btn.innerHTML = languageButtonHtml();
        btn.setAttribute('title', getText('language'));
      }
      document.querySelectorAll('[data-lang-v5]').forEach(el=>{
        const code = el.dataset.langV5;
        el.classList.toggle('active', code === currentLang);
        const check = el.querySelector('.lang-check-v5');
        if(check) check.textContent = code === currentLang ? '✓' : '';
      });
      const help = document.getElementById('helpV5');
      if(help) help.setAttribute('title', getText('help'));
      const dash = document.getElementById('dashboardShortcutV5');
      if(dash) dash.setAttribute('title', getText('dashboardShortcut'));
      applyTheme();
      updateQuickAppsMenu();
    }

    function setLanguage(lang){
      const code = normalizeLang(lang);
      currentLang = code;
      localStorage.setItem(LANG_KEY, code);
      updateLanguageControl();
      closeLanguageMenu();
      try{ if(typeof render === 'function') render(); }catch(err){ console.error(err); }
      scheduleEnhance();
    }

    function navigateQuickTab(tab){
      const allowed = new Set([...quickSections().map(x=>x.tab), 'audit', 'shipmentHistory', 'modelFinder']);
      if(!allowed.has(tab)) return false;
      if(tab === 'audit' && !auditAllowedV12()) return false;
      try{
        const btn = document.querySelector(`.tab-btn[data-tab="${tab}"]`);
        if(btn){
          btn.click();
          return true;
        }
        if(typeof setTab === 'function'){
          setTab(tab);
          return true;
        }
      }catch(err){
        console.error('Quick navigation failed', err);
      }
      return false;
    }

    function closeQuickAppsMenu(){
      const menu = document.getElementById('quickAppsMenuV5');
      const btn = document.getElementById('dashboardShortcutV5');
      if(menu) menu.hidden = true;
      if(btn) btn.setAttribute('aria-expanded','false');
    }

    function updateQuickAppsMenu(){
      const menu = document.getElementById('quickAppsMenuV5');
      if(!menu) return;
      menu.querySelectorAll('[data-quick-tab-v5]').forEach(btn=>{
        const tab = btn.dataset.quickTabV5;
        const section = quickSections().find(x=>x.tab===tab);
        const label = btn.querySelector('.quick-app-label-v5');
        if(label && section) label.textContent = getText(section.textKey);
        btn.classList.toggle('active', !!document.querySelector(`.tab-btn.active[data-tab="${tab}"]`));
      });
    }

    function helpMarkupV5(){
      const info = {
        ru:{
          title:'Помощь',
          intro:'Панель быстрых действий управляет интерфейсом, не изменяя данные разрешений и отгрузок.',
          language:'Язык — переключает интерфейс между Русским, English, O‘zbek и Türkçe.',
          theme:'Тема — переключает светлый и тёмный режим.',
          sections:'Меню разделов — быстрый переход к Остаткам, Разрешениям, Новой отгрузке и Экспорту.',
          login:'Войти — открывает существующий вход редактора для синхронизации изменений.'
        },
        en:{
          title:'Help',
          intro:'Quick controls manage the interface without changing permit or shipment data.',
          language:'Language — switches the interface between Russian, English, Uzbek and Turkish.',
          theme:'Theme — switches light and dark mode.',
          sections:'Sections menu — jump to Balances, Permits, New shipment or Export.',
          login:'Sign in — opens the existing editor login used to sync changes.'
        },
        uz:{
          title:'Yordam',
          intro:'Tezkor boshqaruv paneli faqat interfeysni boshqaradi, ruxsatnoma va yuklama ma’lumotlarini o‘zgartirmaydi.',
          language:'Til — interfeysni Русский, English, O‘zbek va Türkçe orasida almashtiradi.',
          theme:'Rejim — yorug‘ va qorong‘i ko‘rinishni almashtiradi.',
          sections:'Bo‘limlar — Qoldiqlar, Ruxsatnomalar, Yangi yuklama va Eksportga tez o‘tadi.',
          login:'Kirish — o‘zgarishlarni sinxronlash uchun mavjud tahrirlovchi login oynasini ochadi.'
        },
        tr:{
          title:'Yardım',
          intro:'Hızlı kontroller yalnızca arayüzü yönetir; izin ve sevkiyat verilerini değiştirmez.',
          language:'Dil — arayüzü Rusça, İngilizce, Özbekçe ve Türkçe arasında değiştirir.',
          theme:'Tema — açık ve koyu modu değiştirir.',
          sections:'Bölümler — Bakiyeler, İzinler, Yeni sevkiyat ve Dışa aktara hızlı geçiş sağlar.',
          login:'Giriş yap — değişiklikleri eşitlemek için mevcut editör girişini açar.'
        }
      }[currentLang] || null;
      return info;
    }

    function closeHelpModalV5(){
      document.getElementById('helpModalV5')?.remove();
    }

    function openHelpModalV5(){
      closeHelpModalV5();
      const h = helpMarkupV5();
      const syncState = (typeof window!=='undefined' && window.__syncPillState) ? window.__syncPillState : { kind:'local', message:'' };
      const backdrop = document.createElement('div');
      backdrop.className = 'help-backdrop-v5';
      backdrop.id = 'helpModalV5';
      backdrop.innerHTML = `
        <div class="help-card-v5" role="dialog" aria-modal="true" aria-labelledby="helpTitleV5">
          <div class="help-head-v5">
            <div>
              <div class="help-kicker-v5">${getText('help')}</div>
              <h2 id="helpTitleV5">${h.title}</h2>
            </div>
            <button type="button" class="help-close-v5" data-help-close-v5 aria-label="${getText('close')}">×</button>
          </div>
          <div class="help-sync-row-v5">
            <span class="help-sync-label-v5">${getText('syncStatusLabel')}</span>
            <span class="sync-pill" id="syncPill" data-kind="${syncState.kind}">${syncState.message}</span>
          </div>
          <div class="help-sync-row-v5 help-backup-row-v5">
            <span class="help-sync-label-v5">${getText('backupLabel')}</span>
            <button type="button" class="control-btn-v5 help-backup-btn-v5" id="btnBackupJson" title="${getText('backupHint')}">${getText('backupBtn')}</button>
          </div>
          <p class="help-intro-v5">${h.intro}</p>
          <div class="help-list-v5">
            <div class="help-item-v5"><span>🌐</span><p>${h.language}</p></div>
            <div class="help-item-v5"><span>◐</span><p>${h.theme}</p></div>
            <div class="help-item-v5"><span>▦</span><p>${h.sections}</p></div>
            <div class="help-item-v5"><span>↪</span><p>${h.login}</p></div>
          </div>
          <div class="help-foot-v5">
            <button type="button" class="control-btn-v5" data-help-close-v5>${getText('close')}</button>
          </div>
        </div>`;
      document.body.appendChild(backdrop);
      const syncPillEl = backdrop.querySelector('#syncPill');
      if(syncPillEl && syncState.kind === 'error'){
        syncPillEl.style.cursor = 'pointer';
      }
      backdrop.addEventListener('click', e=>{
        if(e.target===backdrop || e.target.closest('[data-help-close-v5]')) closeHelpModalV5();
      });
    }

    function v9IconSvg(kind){
      const icons = {
        home:'<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10.5V20h13v-9.5"/><path d="M9.5 20v-6h5v6"/>',
        spool:'<ellipse cx="12" cy="5" rx="5.5" ry="2.5"/><path d="M7 5v14M17 5v14"/><ellipse cx="12" cy="19" rx="5.5" ry="2.5"/><path d="M8.5 8.2 15.5 10M8.5 11.2l7 1.8M8.5 14.2l7 1.8"/>',
        clipboard:'<rect x="5" y="5" width="14" height="16" rx="2"/><path d="M9 5V3h6v2M8.5 10h7M8.5 14h7M8.5 18h4.5"/>',
        truck:'<path d="M3 7h11v10H3z"/><path d="M14 11h4l3 3v3h-7z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
        ship:'<path d="m4 14 3 6h10l3-6-8-3-8 3Z"/><path d="M9 11V5h6v8M12 5V2M7 20c1.5 1 3 1 5 0 2 1 3.5 1 5 0"/>',
        chart:'<path d="M4 20V10M9 20V5M14 20v-8M19 20V3"/><path d="M3 20h18"/>',
        gear:'<circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.4-2.4 1a7 7 0 0 0-1.7-1L14.5 3h-5l-.4 2.7a7 7 0 0 0-1.7 1L5 5.7 3 9.1 5 10.6a7 7 0 0 0 0 2.8L3 14.9l2 3.4 2.4-1a7 7 0 0 0 1.7 1l.4 2.7h5l.4-2.7a7 7 0 0 0 1.7-1l2.4 1 2-3.4-2-1.5c.1-.5.1-.9.1-1.4Z"/>',
        logout:'<path d="M10 4H5v16h5M14 8l4 4-4 4M8 12h10"/>',
        bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/>',
        audit:'<path d="M5 4h9l5 5v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z"/><path d="M14 4v5h5"/><circle cx="11" cy="15.5" r="2.5"/><path d="m14.5 19 2 2"/>',
        clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7.5v5l3.5 2"/>',
        search:'<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>'
      };
      return `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${icons[kind]||icons.home}</svg>`;
    }

    function updateV9SidebarActive(){
      const activeTab = document.querySelector('.tab-btn.active')?.dataset.tab || 'dashboard';
      v10SideSelection = resolveSidebarSelectionV10(activeTab, v10SideSelection);
      document.querySelectorAll('.v9-side-btn').forEach(btn=>{
        const tabMatch = btn.dataset.v9Tab && btn.dataset.v9Tab === v10SideSelection;
        const homeMatch = btn.dataset.v9Action === 'home' && v10SideSelection === 'home';
        btn.classList.toggle('active', !!(tabMatch || homeMatch));
      });
    }

    function createV9Sidebar(){
      if(document.querySelector('.v9-sidebar')){
        updateV9SidebarActive();
        return;
      }

      const rows = sidebarSectionsV9();
      const side = document.createElement('aside');
      side.className = 'v9-sidebar';
      side.setAttribute('aria-label','Tezkor navigatsiya');
      side.innerHTML = `
        <div class="v9-side-top">
          ${rows.slice(0,6).map(item=>`
            <button type="button" class="v9-side-btn" ${item.tab?`data-v9-tab="${item.tab}"`:`data-v9-action="${item.action}"`} title="${item.label}" aria-label="${item.label}">
              ${v9IconSvg(item.icon)}<span>${item.label}</span>
            </button>`).join('')}
        </div>
        <div class="v9-side-bottom">
          ${rows.slice(6).map(item=>`
            <button type="button" class="v9-side-btn" data-v9-action="${item.action}" title="${item.label}" aria-label="${item.label}">
              ${v9IconSvg(item.icon)}<span>${item.label}</span>
            </button>`).join('')}
        </div>`;

      document.body.prepend(side);

      side.querySelectorAll('[data-v9-tab]').forEach(btn=>btn.addEventListener('click', ()=>{
        v10SideSelection = btn.dataset.v9Tab;
        navigateQuickTab(btn.dataset.v9Tab);
        updateV9SidebarActive();
        scheduleEnhance();
      }));

      side.querySelectorAll('[data-v9-action]').forEach(btn=>btn.addEventListener('click', ()=>{
        const action = btn.dataset.v9Action;
        if(action==='home'){
          v10SideSelection = 'home';
          navigateQuickTab('dashboard');
        }else if(action==='stats'){
          v10SideSelection = 'dashboard';
          navigateQuickTab('dashboard');
        }else if(action==='settings'){
          openHelpModalV5();
        }else if(action==='logout'){
          document.getElementById('authBtn')?.click();
        }
        updateV9SidebarActive();
        scheduleEnhance();
      }));

      updateV9SidebarActive();
    }

    function updateV11SidebarActive(){
      const activeTab = document.querySelector('.tab-btn.active')?.dataset.tab || 'dashboard';
      v11SideSelection = resolveSidebarSelectionV11(activeTab, v11SideSelection);
      document.querySelectorAll('.v11-side-btn[data-v11-section]').forEach(btn=>{
        btn.classList.toggle('active', btn.dataset.v11Section === v11SideSelection);
      });
    }

    function renderV11ReportsView(){
      const app = document.getElementById('app');
      if(!app) return;

      const existing = app.querySelector('.v11-reports-view');
      if(v11SideSelection !== 'reports' || !isDashboardActive()){
        existing?.remove();
        app.classList.remove('v11-reports-active');
        return;
      }

      const stats = Array.from(app.querySelectorAll('.stat-card')).slice(0,3).map(card=>({
        num: card.querySelector('.num')?.textContent?.trim() || '—',
        lbl: card.querySelector('.lbl')?.textContent?.trim() || ''
      }));
      const metrics = Array.from(app.querySelectorAll('.warehouse-value')).slice(0,2).map(v=>({
        num: v.querySelector('strong')?.textContent?.trim() || '—',
        unit: v.querySelector('span')?.textContent?.trim() || ''
      }));

      const view = existing || document.createElement('section');
      view.className = 'v11-reports-view';
      view.innerHTML = `
        <div class="v11-reports-head">
          <div>
            <h1>Hisobotlar</h1>
            <p>Ombor, ruxsatnomalar va qoldiqlar bo‘yicha joriy ko‘rsatkichlar</p>
          </div>
          <button type="button" class="v11-report-export-btn">Excel hisobot</button>
        </div>
        <div class="v11-report-grid">
          <article class="v11-report-card v11-report-wide">
            <span>Jami miqdor</span>
            <strong>${metrics[0]?.num || '—'}</strong>
            <small>${metrics[0]?.unit || ''}</small>
          </article>
          <article class="v11-report-card v11-report-wide">
            <span>Jami vazn</span>
            <strong>${metrics[1]?.num || '—'}</strong>
            <small>${metrics[1]?.unit || ''}</small>
          </article>
          ${stats.map((s,i)=>`
            <article class="v11-report-card">
              <div class="v11-report-card-icon">${v9IconSvg(i===0?'clipboard':i===1?'spool':'chart')}</div>
              <span>${s.lbl}</span>
              <strong>${s.num}</strong>
            </article>`).join('')}
        </div>
        <div class="v11-report-note">
          <div>${v9IconSvg('chart')}</div>
          <p>To‘liq ma’lumotlar “Qoldiqlar” va “Ruxsatnomalar” bo‘limlarida saqlanadi. Excel faylini eksport bo‘limidan yuklab olish mumkin.</p>
        </div>`;

      if(!existing) app.appendChild(view);
      app.classList.add('v11-reports-active');

      view.querySelector('.v11-report-export-btn')?.addEventListener('click', ()=>{
        v11SideSelection = 'export';
        navigateQuickTab('export');
        updateV11SidebarActive();
        scheduleEnhance();
      }, {once:true});
    }

    function createV11Sidebar(){
      document.querySelector('.v9-sidebar')?.remove();
      if(document.querySelector('.v11-sidebar')){
        updateV11SidebarActive();
        return;
      }

      const side = document.createElement('aside');
      side.className = 'v11-sidebar';
      side.setAttribute('aria-label','Asosiy bo‘limlar');
      side.innerHTML = `
        <nav class="v11-side-main">
          ${sidebarSectionsV11().map(item=>`
            <button type="button" class="v11-side-btn" data-v11-section="${item.id}" aria-label="${item.label}" title="${item.label}">
              <span class="v11-side-icon">${v9IconSvg(item.icon)}</span>
              <span class="v11-side-label">${item.label}</span>
            </button>`).join('')}
        </nav>
        <div class="v11-side-aux">
          <button type="button" class="v11-side-aux-btn" data-v11-aux="settings" aria-label="Sozlamalar" title="Sozlamalar">${v9IconSvg('gear')}</button>
          <button type="button" class="v11-side-aux-btn" data-v11-aux="logout" aria-label="Chiqish" title="Chiqish">${v9IconSvg('logout')}</button>
        </div>`;

      document.body.prepend(side);

      side.querySelectorAll('[data-v11-section]').forEach(btn=>btn.addEventListener('click', ()=>{
        const id = btn.dataset.v11Section;
        const destination = sidebarDestinationV11(id);
        v11SideSelection = id;
        navigateQuickTab(destination.tab);
        setTimeout(()=>{
          renderV11ReportsView();
          updateV11SidebarActive();
          scheduleEnhance();
        },0);
      }));

      side.querySelector('[data-v11-aux="settings"]')?.addEventListener('click', openHelpModalV5);
      side.querySelector('[data-v11-aux="logout"]')?.addEventListener('click', ()=>document.getElementById('authBtn')?.click());

      document.querySelectorAll('.tab-btn').forEach(tab=>{
        if(tab.dataset.v11Bound) return;
        tab.dataset.v11Bound = '1';
        tab.addEventListener('click', ()=>{
          v11SideSelection = tab.dataset.tab || 'dashboard';
          setTimeout(()=>{
            renderV11ReportsView();
            updateV11SidebarActive();
          },0);
        });
      });

      updateV11SidebarActive();
    }

    function decorateV11Hero(){
      const app = document.getElementById('app');
      if(!app || !isDashboardActive()) return;

      const toolbar = app.querySelector('.toolbar');
      if(toolbar){
        toolbar.classList.remove('v10-dashboard-toolbar');
        toolbar.classList.add('v11-dashboard-toolbar');
      }

      const summary = app.querySelector('.warehouse-summary');
      if(!summary) return;
      summary.classList.add('v11-textile-hero');

      let main = summary.querySelector('.warehouse-summary-main');
      if(!main){
        main = document.createElement('div');
        main.className = 'warehouse-summary-main';
        const first = summary.firstElementChild;
        if(first && !first.classList.contains('warehouse-values')) main.appendChild(first);
        summary.insertBefore(main, summary.firstChild);
      }

      let icon = main.querySelector('.warehouse-icon');
      if(!icon){
        icon = document.createElement('div');
        icon.className = 'warehouse-icon';
        main.insertBefore(icon, main.firstChild);
      }
      icon.className = 'warehouse-icon v11-warehouse-icon';
      icon.setAttribute('aria-hidden','true');
      icon.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 10.2 12 4l9 6.2V20H3z"/>
          <path d="M6.5 11.5h11V20h-11z"/>
          <path d="M9.2 14h5.6M9.2 17h5.6"/>
        </svg>`;

      const title = main.querySelector('.title');
      const hint = main.querySelector('.hint');
      if(title) title.textContent = "OMBOR QOLDIG'I";
      if(hint) hint.textContent = "Joriy holat bo‘yicha ombordagi mahsulotlar";

      const values = summary.querySelector('.warehouse-values');
      if(values){
        values.classList.add('v11-warehouse-values');
        Array.from(values.querySelectorAll('.warehouse-value')).slice(0,2).forEach((value,index)=>{
          let label = value.querySelector('.v11-metric-label');
          if(!label){
            label = document.createElement('small');
            label.className = 'v11-metric-label';
            value.insertBefore(label, value.firstChild);
          }
          label.textContent = index===0 ? 'Jami miqdor' : 'Jami vazn';
        });
      }

      let rolls = summary.querySelector('.v11-rolls');
      if(!rolls){
        rolls = document.createElement('div');
        rolls.className = 'v11-rolls';
        rolls.setAttribute('aria-hidden','true');
        summary.appendChild(rolls);
      }
    }

    /* «Tarix» bo'limi faqat editor va contributor uchun (index.html: canCreateEdit()).
       Boshqalarga yon paneldagi ro'yxatda ham ko'rinmaydi va ochib bo'lmaydi. */
    function auditAllowedV12(){
      try{ return typeof canCreateEdit === 'function' && !!canCreateEdit(); }catch(err){ return false; }
    }
    function syncAuditSidebarV12(){
      const allowed = auditAllowedV12();
      document.querySelectorAll('.v12-side-btn[data-v12-section="audit"]').forEach(btn=>{
        btn.hidden = !allowed;
        if(allowed) btn.style.removeProperty('display');
        else btn.style.setProperty('display','none','important');
      });
    }

    function updateV12SidebarActive(){
      syncAuditSidebarV12();
      const activeTab = document.querySelector('.tab-btn.active')?.dataset.tab || 'dashboard';
      v12SideSelection = resolveSidebarSelectionV12(activeTab, v12SideSelection);
      document.querySelectorAll('.v12-side-btn[data-v12-section]').forEach(btn=>{
        btn.classList.toggle('active', btn.dataset.v12Section === v12SideSelection);
      });
      document.querySelector('.tab-btn[data-tab="dashboard"]')?.classList.toggle('v12-under-reports', v12SideSelection === 'reports');
    }

    function v12FmtNum(n){
      n = Math.round(Number(n)||0);
      return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }

    function v12DonutSvg(segments, centerLabel, centerSub){
      const size = 108, r = 40, cx = 54, cy = 54, sw = 15;
      const circumference = 2 * Math.PI * r;
      const total = segments.reduce((a,s)=>a+Math.max(0,Number(s.value)||0), 0);
      let offset = 0;
      const arcs = total > 0 ? segments.map(s=>{
        const val = Math.max(0, Number(s.value)||0);
        const dash = (val/total) * circumference;
        const circle = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${s.color}" stroke-width="${sw}" stroke-dasharray="${dash.toFixed(2)} ${(circumference-dash).toFixed(2)}" stroke-dashoffset="${(-offset).toFixed(2)}" transform="rotate(-90 ${cx} ${cy})"></circle>`;
        offset += dash;
        return circle;
      }).join('') : '';
      return `<svg viewBox="0 0 ${size} ${size}" class="v12-donut-svg" role="img" aria-label="${centerSub||''} ${centerLabel||''}">
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#eef2f8" stroke-width="${sw}"></circle>
        ${arcs}
        <text x="${cx}" y="${cy-3}" text-anchor="middle" class="v12-donut-num">${centerLabel}</text>
        <text x="${cx}" y="${cy+15}" text-anchor="middle" class="v12-donut-sub">${centerSub||''}</text>
      </svg>`;
    }

    function v12MaterialPalette(){
      return ['#1768ff','#1fbf8f','#22c3c0','#7ed9a5','#c9d8ee','#f0a340','#e2574c','#8a7fe0'];
    }

    function v12GetLiveState(){
      // State ni xavfsiz topish: state yoki window.state (index.html'dagi
      // exportWorkbook() funksiyasidagi bir xil xavfsiz aniqlash naqshi).
      return (typeof state !== 'undefined' && state && Array.isArray(state.permits) && state.permits.length > 0)
        ? state
        : ((window.state && Array.isArray(window.state.permits) && window.state.permits.length > 0) ? window.state : (typeof state !== 'undefined' && state ? state : { permits: [] }));
    }

    function v12ComputeMaterialBreakdown(){
      const liveState = v12GetLiveState();
      const permits = Array.isArray(liveState.permits) ? liveState.permits : [];

      // "Boshqa" endi faqat mato tarkibi (material) umuman kiritilmagan
      // pozitsiyalarni jamlaydi. Mato tarkibi ko'rsatilgan har bir model
      // — nechta bo'lishidan qat'i nazar — o'z alohida qatorida chiqadi.
      const byMaterial = new Map();
      let totalWeight = 0;
      let totalItems = 0;
      let otherWeight = 0; // mato tarkibi kiritilmagan pozitsiyalar

      permits.forEach(p=>{
        (p.items || []).forEach(it=>{
          const weight = Number(it.weight) || 0;
          totalWeight += weight;
          totalItems += 1;
          const key = (it.material || '').trim();
          if(!key){
            otherWeight += weight;
            return;
          }
          byMaterial.set(key, (byMaterial.get(key) || 0) + weight);
        });
      });

      const entries = Array.from(byMaterial.entries()).map(([label,weight])=>({label,weight}));
      entries.sort((a,b)=>b.weight-a.weight);

      const palette = v12MaterialPalette();
      const segments = [];
      if(otherWeight > 0 || entries.length === 0){
        // key:'' — "Boshqa" guruhi, ya'ni mato tarkibi kiritilmagan pozitsiyalar.
        segments.push({label:'Boshqa', key:'', weight:otherWeight, color:palette[0]});
      }
      entries.forEach((e,i)=>{
        segments.push({label:e.label, key:e.label, weight:e.weight, color:palette[(i+1) % palette.length]});
      });

      return {segments, totalWeight, totalItems};
    }

    function renderV12MaterialCard(materialData){
      const {segments, totalWeight, totalItems} = materialData;
      const donut = v12DonutSvg(
        segments.map(s=>({value:s.weight, color:s.color})),
        v12FmtNum(totalItems),
        translateMessage('Pozitsiyalar', currentLang)
      );
      const total = segments.reduce((a,s)=>a+Math.max(0,s.weight),0);

      const rows = segments.map(s=>{
        const pct = total > 0 ? Math.round((s.weight/total)*100) : 0;
        return `
          <div class="v12-material-row" data-open-material="${escapeHtmlV12(s.key)}" tabindex="0" role="button" title="Shu mato tarkibiga ega modellarni ko'rish">
            <span class="v12-material-dot" style="background:${s.color}"></span>
            <span class="v12-material-name">${escapeHtmlV12(s.label)}</span>
            <span class="v12-material-weight">${v12FmtNum(s.weight)} <span>kg</span></span>
            <strong class="v12-material-pct">${pct}%</strong>
          </div>`;
      }).join('');

      return `
        <article class="v12-report-card v12-material-card">
          <div class="v12-material-head">
            <h2>Materiallar bo‘yicha ulush</h2>
            <p>${v12FmtNum(totalWeight)} <span>kg</span></p>
          </div>
          <div class="v12-material-body">
            <div class="v12-chart-visual">${donut}</div>
            <div class="v12-material-legend">${rows}</div>
          </div>
        </article>`;
    }

    function escapeHtmlV12(str){
      return String(str==null?'':str).replace(/[&<>"']/g, ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
    }

    function renderV12ReportsView(){
      const app = document.getElementById('app');
      if(!app) return;

      const existing = app.querySelector('.v12-reports-view');
      if(v12SideSelection !== 'reports' || !isDashboardActive()){
        existing?.remove();
        app.classList.remove('v12-reports-active');
        return;
      }

      const stats = Array.from(app.querySelectorAll('.stat-card')).slice(0,3).map(card=>({
        num:card.querySelector('.num')?.textContent?.trim() || '—',
        lbl:card.querySelector('.lbl')?.textContent?.trim() || ''
      }));
      const values = Array.from(app.querySelectorAll('.warehouse-value')).slice(0,2).map(v=>({
        num:v.querySelector('strong')?.textContent?.trim() || '—',
        unit:v.querySelector('span')?.textContent?.trim() || '',
        label:v.querySelector('.v11-metric-label,.v12-metric-label')?.textContent?.trim() || ''
      }));
      // Kartochkalar: Ruxsatnomalar -> Jami modellar -> Mavjud modellar ->
      // Kam qolgan -> Tugagan. Raqamlar bosilganda yuklanadigan Excel
      // fayllari bilan bir xil manbadan (buildModelsListRows) olinadi, shunda
      // kartochkadagi son va fayldagi qatorlar soni doim mos tushadi.
      // Mavjud = Jami - Tugagan; Kam qolgan esa Mavjud ning ichida.
      let permitsCount = Number(String(stats[0]?.num||'0').replace(/\D/g,'')) || 0;
      let activeCount = Number(String(values[0]?.num||'0').replace(/\D/g,'')) || 0;
      let warnCount = Number(String(stats[1]?.num||'0').replace(/\D/g,'')) || 0;
      let finishedCount = Number(String(stats[2]?.num||'0').replace(/\D/g,'')) || 0;
      try{
        if(typeof window.buildModelsListRows === 'function'){
          const liveState = v12GetLiveState();
          permitsCount = Array.isArray(liveState.permits) ? liveState.permits.length : permitsCount;
          activeCount = window.buildModelsListRows('available').length;
          warnCount = window.buildModelsListRows('warn').length;
          finishedCount = window.buildModelsListRows('critical').length;
        }
      }catch(err){ console.warn('Hisobot sonlarini hisoblashda xato:', err); }
      const totalModels = activeCount + finishedCount;
      const cards = {permitsCount, totalModels, activeCount, warnCount, finishedCount};

      // Muhim: bu funksiya har bir scheduleEnhance() sikli (ya'ni har bir DOM
      // o'zgarishidan keyin, MutationObserver orqali) chaqiriladi. Agar u har
      // safar innerHTML'ni qayta yozsa, bu o'zi yana DOM o'zgarishini hosil
      // qilib, cheksiz qayta-chizish siklini keltirib chiqaradi — natijada
      // "Eksport" tugmasi doim yangi elementga almashtirilib, foydalanuvchi
      // bosgan click hodisasi brauzer tomonidan bekor qilinadi (chunki
      // mousedown va mouseup orasida element allaqachon almashtirilgan bo'ladi).
      // Shu sababli, ma'lumot haqiqatan o'zgarmagan bo'lsa, qayta chizishni
      // butunlay o'tkazib yuboramiz.
      const materialData = v12ComputeMaterialBreakdown();

      const signature = JSON.stringify({cards, materialData});
      if(existing && existing.dataset.v12ReportsSig === signature){
        return;
      }

      const finishedActiveDonut = v12DonutSvg(
        [
          {value:finishedCount, color:'#e2574c'},
          {value:activeCount, color:'#1fbf8f'}
        ],
        v12FmtNum(finishedCount),
        'tugagan'
      );

      const view = existing || document.createElement('section');
      view.className = 'v12-reports-view';
      view.dataset.v12ReportsSig = signature;
      view.innerHTML = `
        <div class="v12-reports-head">
          <div><h1>Hisobotlar</h1><p>Omborning joriy holati va so‘nggi o‘zgarishlar</p></div>
        </div>
        <div class="v12-report-grid">
          <article class="v12-report-card">
            <div class="v12-report-icon">${v9IconSvg('clipboard')}</div>
            <span>Jami ruxsatnomalar</span><strong>${v12FmtNum(permitsCount)}</strong>
          </article>
          <button type="button" class="v12-report-card v12-report-action" data-models-kind="all" title="Ko‘rish va Excel yuklash — barcha modellar">
            <div class="v12-report-icon">${v9IconSvg('spool')}</div>
            <span>Jami modellar</span><strong>${v12FmtNum(totalModels)}</strong><small>Ko‘rish ›</small>
          </button>
          <button type="button" class="v12-report-card v12-report-action" data-models-kind="available" title="Ko‘rish va Excel yuklash — mavjud modellar">
            <div class="v12-report-icon">${v9IconSvg('spool')}</div>
            <span>Mavjud modellar</span><strong>${v12FmtNum(activeCount)}</strong><small>Ko‘rish ›</small>
          </button>
          <button type="button" class="v12-report-card v12-report-action" data-models-kind="warn" title="Ko‘rish va Excel yuklash — kam qolgan modellar">
            <div class="v12-report-icon">${v9IconSvg('spool')}</div>
            <span>Kam qolgan</span><strong>${v12FmtNum(warnCount)}</strong><small>Ko‘rish ›</small>
          </button>
          <button type="button" class="v12-report-card v12-report-action" data-models-kind="critical" title="Ko‘rish va Excel yuklash — tugagan / ortiqcha sarf modellar">
            <div class="v12-report-icon">${v9IconSvg('chart')}</div>
            <span>Tugagan / ortiqcha sarf</span><strong>${v12FmtNum(finishedCount)}</strong><small>Ko‘rish ›</small>
          </button>
          <button type="button" class="v12-report-card v12-report-export-btn">Eksport <span aria-hidden="true">›</span></button>
          <article class="v12-report-card v12-chart-card">
            <div class="v12-chart-visual">${finishedActiveDonut}</div>
            <div class="v12-chart-legend">
              <div class="v12-chart-legend-title">Tugagan / Faol</div>
              <div class="v12-chart-legend-row"><span class="v12-chart-dot" style="background:#e2574c"></span>Tugagan / ortiqcha<strong>${v12FmtNum(finishedCount)}</strong></div>
              <div class="v12-chart-legend-row"><span class="v12-chart-dot" style="background:#1fbf8f"></span>Faol<strong>${v12FmtNum(activeCount)}</strong></div>
            </div>
          </article>
          ${renderV12MaterialCard(materialData)}
        </div>`;

      if(!existing){
        app.appendChild(view);
        // Delegatsiya orqali: view qayta chizilganda (innerHTML almashganda)
        // ham qayta ulanish shart emas, chunki listener view'ning o'ziga,
        // bir marta (element birinchi yaratilganda) qo'yiladi.
        view.addEventListener('click', e=>{
          const row = e.target.closest('[data-open-material]');
          if(row && typeof window.openMaterialDetailView === 'function'){
            window.openMaterialDetailView(row.dataset.openMaterial);
          }
        });
        view.addEventListener('keydown', e=>{
          if(e.key!=='Enter' && e.key!==' ') return;
          const row = e.target.closest('[data-open-material]');
          if(row && typeof window.openMaterialDetailView === 'function'){
            e.preventDefault();
            window.openMaterialDetailView(row.dataset.openMaterial);
          }
        });
      }
      app.classList.add('v12-reports-active');

      view.querySelector('.v12-report-export-btn')?.addEventListener('click', ()=>{
        v12SideSelection = 'export';
        v12Navigating = true;
        navigateQuickTab('export');
        v12Navigating = false;
        updateV12SidebarActive();
        scheduleEnhance();
      }, {once:true});
    }

    function createV12Sidebar(){
      document.querySelector('.v9-sidebar')?.remove();
      document.querySelector('.v11-sidebar')?.remove();

      if(document.querySelector('.v12-sidebar')){
        updateV12SidebarActive();
        return;
      }

      const side = document.createElement('aside');
      side.className = 'v12-sidebar';
      side.setAttribute('aria-label','Asosiy bo‘limlar');
      side.innerHTML = `
        <nav class="v12-side-main">
          ${sidebarSectionsV12().map(item=>`
            <button type="button" class="v12-side-btn" data-v12-section="${item.id}" aria-label="${item.label}" title="${item.label}">
              <span class="v12-side-icon">${v9IconSvg(item.icon)}</span>
              <span class="v12-side-label">${item.label}</span>
            </button>`).join('')}
        </nav>
        <div class="v12-side-aux">
          <button type="button" class="v12-side-aux-btn" data-v12-aux="settings" aria-label="Sozlamalar" title="Sozlamalar">${v9IconSvg('gear')}</button>
          <button type="button" class="v12-side-aux-btn" data-v12-aux="logout" aria-label="Chiqish" title="Chiqish">${v9IconSvg('logout')}</button>
        </div>`;
      document.body.prepend(side);

      side.querySelectorAll('[data-v12-section]').forEach(btn=>btn.addEventListener('click', ()=>{
        const id = btn.dataset.v12Section;
        const destination = sidebarDestinationV12(id);
        v12SideSelection = id;
        v12Navigating = true;
        navigateQuickTab(destination.tab);
        v12Navigating = false;
        v12SideSelection = id;
        setTimeout(()=>{
          renderV12ReportsView();
          updateV12SidebarActive();
          scheduleEnhance();
        },0);
      }));

      side.querySelector('[data-v12-aux="settings"]')?.addEventListener('click',openHelpModalV5);
      side.querySelector('[data-v12-aux="logout"]')?.addEventListener('click',()=>document.getElementById('authBtn')?.click());

      document.querySelectorAll('.tab-btn').forEach(tab=>{
        if(tab.dataset.v12Bound) return;
        tab.dataset.v12Bound = '1';
        tab.addEventListener('click', ()=>{
          if(v12Navigating) return;
          v12SideSelection = tab.dataset.tab || 'dashboard';
          setTimeout(()=>{
            renderV12ReportsView();
            updateV12SidebarActive();
          },0);
        });
      });

      updateV12SidebarActive();
    }

    function createV12FilterButton(){
      if(!isDashboardActive()) return;
      const controls = document.querySelector('#app .dashboard-controls');
      if(!controls || controls.querySelector('.v12-filter-action')) return;

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'v12-filter-action';
      btn.title = 'Filtrlarni tozalash';
      btn.setAttribute('aria-label','Filtrlarni tozalash');
      btn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
          <path d="M4 7h16M4 12h16M4 17h16"/>
          <circle cx="9" cy="7" r="2"/><circle cx="15" cy="12" r="2"/><circle cx="11" cy="17" r="2"/>
        </svg>`;
      controls.appendChild(btn);

      btn.addEventListener('click', ()=>{
        const search = document.getElementById('dashSearch');
        if(search){
          search.value = '';
          search.dispatchEvent(new Event('input',{bubbles:true}));
        }
        setTimeout(()=>{
          const filter = document.getElementById('dashboardFilter');
          if(filter){
            filter.value = 'all';
            filter.dispatchEvent(new Event('change',{bubbles:true}));
          }
          setTimeout(()=>{
            const sort = document.getElementById('dashboardSort');
            if(sort){
              sort.value = 'remaining-desc';
              sort.dispatchEvent(new Event('change',{bubbles:true}));
            }
          },0);
        },0);
      });
    }

    function decorateV12HeroMetrics(){
      const app = document.getElementById('app');
      if(!app || !isDashboardActive()) return;

      const toolbar = app.querySelector('.toolbar');
      if(toolbar){
        toolbar.classList.remove('v10-dashboard-toolbar','v11-dashboard-toolbar');
        toolbar.classList.add('v12-dashboard-toolbar');
      }

      const summary = app.querySelector('.warehouse-summary');
      if(!summary) return;
      summary.classList.add('v12-textile-hero');

      const title = summary.querySelector('.title');
      const hint = summary.querySelector('.hint');
      if(title) title.textContent = "OMBOR QOLDIG'I";
      if(hint) hint.textContent = "Joriy holat bo‘yicha ombordagi mahsulotlar";

      const rowsCount = app.querySelectorAll('.panel tbody tr').length;
      const values = Array.from(summary.querySelectorAll('.warehouse-value')).slice(0,2);
      if(values[0]){
        const strong = values[0].querySelector('strong');
        const unit = values[0].querySelector('span');
        if(strong) strong.textContent = String(rowsCount).replace(/\B(?=(\d{3})+(?!\d))/g,' ');
        if(unit) unit.textContent = 'nomenklatura';
        let label = values[0].querySelector('.v12-metric-label,.v11-metric-label');
        if(!label){
          label = document.createElement('small');
          values[0].insertBefore(label,values[0].firstChild);
        }
        label.className = 'v12-metric-label';
        label.textContent = 'Jami nomenklaturalar';
      }
      if(values[1]){
        let label = values[1].querySelector('.v12-metric-label,.v11-metric-label');
        if(!label){
          label = document.createElement('small');
          values[1].insertBefore(label,values[1].firstChild);
        }
        label.className = 'v12-metric-label';
        label.textContent = 'Jami vazn';
      }

      summary.querySelector('.v11-rolls')?.classList.add('v12-rolls');
    }

    function cleanupMetricLabelsV13(summary){
      if(!summary) return;
      const metricLabels = ['Modellar soni','Ombordagi qoldiq','Jami vazn'];
      Array.from(summary.querySelectorAll('.warehouse-value')).slice(0,3).forEach((value,index)=>{
        const labels = Array.from(value.querySelectorAll('.v11-metric-label,.v12-metric-label,.v13-metric-label'));
        labels.slice(1).forEach(node=>node.remove());

        let label = labels[0];
        if(!label){
          label = document.createElement('small');
          value.insertBefore(label,value.firstChild);
        }
        label.className = 'v13-metric-label';
        const nextText = metricLabels[index] || '';
        if(label.textContent !== nextText) label.textContent = nextText;

        value.classList.add('v13-metric');

        const strong = value.querySelector('strong');
        if(strong) strong.classList.add('v13-metric-number');

        const unit = value.querySelector('span');
        if(unit) unit.classList.add('v13-metric-unit');
      });
    }

    function decorateV13HeroMetrics(){
      const app = document.getElementById('app');
      if(!app || !isDashboardActive()) return;

      const toolbar = app.querySelector('.toolbar');
      if(toolbar){
        toolbar.classList.remove('v10-dashboard-toolbar','v11-dashboard-toolbar');
        toolbar.classList.add('v12-dashboard-toolbar');
      }

      const summary = app.querySelector('.warehouse-summary');
      if(!summary) return;

      summary.classList.add('v9-textile-summary','v11-textile-hero','v12-textile-hero','v13-textile-hero');

      let main = summary.querySelector('.warehouse-summary-main');
      if(!main){
        main = document.createElement('div');
        main.className = 'warehouse-summary-main';
        const first = summary.firstElementChild;
        if(first && !first.classList.contains('warehouse-values')) main.appendChild(first);
        summary.insertBefore(main, summary.firstChild);
      }

      let icon = main.querySelector('.warehouse-icon');
      if(!icon){
        icon = document.createElement('div');
        main.insertBefore(icon,main.firstChild);
      }
      icon.className = 'warehouse-icon v11-warehouse-icon v13-warehouse-icon';
      if(icon.dataset.v13Ready !== '1'){
        icon.setAttribute('aria-hidden','true');
        icon.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 10.2 12 4l9 6.2V20H3z"/>
            <path d="M6.5 11.5h11V20h-11z"/>
            <path d="M9.2 14h5.6M9.2 17h5.6"/>
          </svg>`;
        icon.dataset.v13Ready = '1';
      }

      const title = main.querySelector('.title');
      const hint = main.querySelector('.hint');
      if(title && title.textContent !== "OMBOR QOLDIG'I") title.textContent = "OMBOR QOLDIG'I";
      if(hint && hint.textContent !== "Joriy holat bo‘yicha ombordagi mahsulotlar"){
        hint.textContent = "Joriy holat bo‘yicha ombordagi mahsulotlar";
      }

      const valuesWrap = summary.querySelector('.warehouse-values');
      if(valuesWrap){
        valuesWrap.classList.add('v11-warehouse-values','v13-warehouse-values');

        const values = Array.from(valuesWrap.querySelectorAll('.warehouse-value')).slice(0,3);

        if(values[0]){
          const unit = values[0].querySelector('span');
          if(unit && unit.textContent !== 'model') unit.textContent = 'model';
        }
        if(values[1]){
          const unit = values[1].querySelector('span');
          if(unit && unit.textContent !== 'dona') unit.textContent = 'dona';
        }

        cleanupMetricLabelsV13(summary);
      }

      let rolls = summary.querySelector('.v11-rolls');
      if(!rolls){
        rolls = document.createElement('div');
        rolls.className = 'v11-rolls v12-rolls';
        rolls.setAttribute('aria-hidden','true');
        summary.appendChild(rolls);
      }else{
        rolls.classList.add('v12-rolls');
      }
    }

    function readRecentChangesV12(){
      const now = Date.now();
      if(recentChangesCacheV12.data && (now-recentChangesCacheV12.at) < 30000){
        return Promise.resolve(recentChangesCacheV12.data);
      }

      return new Promise(resolve=>{
        if(!('indexedDB' in window)){
          resolve({recentPermitIds:new Set(),recentShipmentIds:new Set()});
          return;
        }

        let request;
        try{ request = indexedDB.open('permit_app_offline_v2'); }
        catch(_){
          resolve({recentPermitIds:new Set(),recentShipmentIds:new Set()});
          return;
        }

        request.onerror = ()=>resolve({recentPermitIds:new Set(),recentShipmentIds:new Set()});
        request.onsuccess = ()=>{
          const db = request.result;
          if(!db.objectStoreNames.contains('records')){
            db.close();
            resolve({recentPermitIds:new Set(),recentShipmentIds:new Set()});
            return;
          }

          const tx = db.transaction('records','readonly');
          const get = tx.objectStore('records').getAll();
          get.onerror = ()=>{
            db.close();
            resolve({recentPermitIds:new Set(),recentShipmentIds:new Set()});
          };
          get.onsuccess = ()=>{
            const since = Date.now() - 24*60*60*1000;
            const permitIds = new Set();
            const shipmentIds = new Set();
            for(const r of (get.result||[])){
              const ts = Date.parse(r.updated_at || '');
              if(!Number.isFinite(ts) || ts < since || r.deleted_at) continue;
              if(r.entity_type==='permit') permitIds.add(r.id);
              if(r.entity_type==='shipment') shipmentIds.add(r.id);
            }
            const data = {recentPermitIds:permitIds,recentShipmentIds:shipmentIds};
            recentChangesCacheV12 = {at:Date.now(),data};
            db.close();
            resolve(data);
          };
        };
      });
    }

    function updateV12KpiChanges(){
      if(!isDashboardActive() || typeof state === 'undefined') return;
      readRecentChangesV12().then(meta=>{
        if(!isDashboardActive()) return;
        const cards = Array.from(document.querySelectorAll('#app .stat-card')).slice(0,3);
        if(cards.length < 3) return;

        const deltas = computeKpiDeltasV12(state.permits,state.shipments,meta.recentShipmentIds);
        const recentKeys = computeRecentlyCriticalV12(state.permits,state.shipments,meta.recentShipmentIds);
        const signature = JSON.stringify([Array.from(recentKeys.warnKeys).sort(), Array.from(recentKeys.critKeys).sort()]);
        const changed = window.__omborRecentKeysSigV12 !== signature;
        window.__omborRecentKeysV12 = recentKeys;
        window.__omborRecentKeysSigV12 = signature;
        if(changed && typeof window.__omborOnRecentKeysUpdated === 'function'){
          try{ window.__omborOnRecentKeysUpdated(); }catch(e){}
        }
        const values = [meta.recentPermitIds.size,deltas.deltaWarn,deltas.deltaCrit];
        const titles = [
          'So‘nggi 24 soatda yangilangan ruxsatnomalar',
          'So‘nggi 24 soatdagi yuklamalar ta’sirida kam qolganlar o‘zgarishi',
          'So‘nggi 24 soatdagi yuklamalar ta’sirida tugagan/ortiqcha sarf o‘zgarishi'
        ];

        cards.forEach((card,index)=>{
          let badge = card.querySelector('.v12-kpi-delta');
          if(!badge){
            badge = document.createElement('span');
            badge.className = 'v12-kpi-delta';
            card.appendChild(badge);
          }
          const value = values[index];
          const text = formatDeltaV12(value);
          if(badge.textContent !== text) badge.textContent = text;
          badge.title = translateMessage(titles[index], currentLang);
          badge.dataset.tone = index===0 ? (value>0?'good':'neutral') : (value>0?'bad':value<0?'good':'neutral');
        });
      });
    }

    function showV9Notification(){
      document.querySelector('.v9-notice-popover')?.remove();
      const pill = document.getElementById('syncPill');
      const box = document.createElement('div');
      box.className = 'v9-notice-popover';
      box.innerHTML = `
        <div class="v9-notice-dot"></div>
        <div><strong>Tizim holati</strong><span>${pill?.textContent?.trim() || 'Tizim faol'}</span></div>`;
      document.body.appendChild(box);
      setTimeout(()=>box.classList.add('show'),0);
      setTimeout(()=>{ box.classList.remove('show'); setTimeout(()=>box.remove(),180); },2600);
    }

    function createV9Notification(){
      if(document.getElementById('notificationV9')) return;
      const theme = document.getElementById('themeToggleV5');
      if(!theme) return;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.id = 'notificationV9';
      btn.className = 'control-btn-v5 icon-only-v5 v9-notification-btn';
      btn.setAttribute('aria-label','Bildirishnomalar');
      btn.innerHTML = `${v9IconSvg('bell')}<span class="v9-notification-badge">3</span>`;
      theme.insertAdjacentElement('afterend',btn);
      btn.addEventListener('click',showV9Notification);
    }

    function decorateV10Hero(){
      const app = document.getElementById('app');
      if(!app || !isDashboardActive()) return;

      const toolbar = app.querySelector('.toolbar');
      if(toolbar){
        toolbar.classList.add('v10-dashboard-toolbar');
      }

      const summary = app.querySelector('.warehouse-summary');
      if(!summary) return;
      summary.classList.add('v10-textile-hero');

      let main = summary.querySelector('.warehouse-summary-main');
      if(!main){
        main = document.createElement('div');
        main.className = 'warehouse-summary-main';
        const first = summary.firstElementChild;
        if(first && !first.classList.contains('warehouse-values')){
          main.appendChild(first);
        }
        summary.insertBefore(main, summary.firstChild);
      }

      let icon = main.querySelector('.warehouse-icon');
      if(!icon){
        icon = document.createElement('div');
        icon.className = 'warehouse-icon';
        icon.setAttribute('aria-hidden','true');
        main.insertBefore(icon, main.firstChild);
      }
      icon.classList.add('v10-warehouse-icon');
      icon.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 10.2 12 4l9 6.2V20H3z"/>
          <path d="M7 20v-7.2h10V20"/>
          <path d="M9.5 13v7M14.5 13v7"/>
          <path d="M5.7 10.5h12.6"/>
        </svg>`;
    }

    function decorateV9Dashboard(){
      document.documentElement.classList.add('v9-shell-ready','v11-shell-ready','v12-shell-ready');
      document.body.classList.add('v9-shell-body','v11-shell-body','v12-shell-body');
      document.documentElement.dataset.textileAsset = 'textile-bg-v11.svg';
      createV12Sidebar();

      const app = document.getElementById('app');
      if(!app) return;
      app.classList.toggle('v9-dashboard-active',isDashboardActive());
      if(isDashboardActive()){
        app.querySelector('.warehouse-summary')?.classList.add('v9-textile-summary');
        app.querySelector('.panel')?.classList.add('v9-main-table');
        decorateV13HeroMetrics();
        createV12FilterButton();
        updateV12KpiChanges();
      }
      renderV12ReportsView();
      updateV12SidebarActive();
    }

    function createQuickControlBar(){
      if(document.querySelector('.quick-control-bar-v5')) return;
      const actions = document.querySelector('.topbar-actions');
      if(!actions) return;

      const bar = document.createElement('div');
      bar.className = 'quick-control-bar-v5';
      bar.innerHTML = `
        <div class="language-wrap-v5">
          <button class="control-btn-v5 language-control-v5" id="languageToggleV5" type="button" aria-haspopup="menu" aria-expanded="false"></button>
          <div class="lang-menu-v5" id="languageMenuV5" role="menu" hidden>
            ${Object.entries(LANGUAGES).map(([code,info])=>`
              <button type="button" class="lang-option-v5" data-lang-v5="${code}" role="menuitem">
                <span class="lang-flag-v5">${info.flag}</span><span>${info.label}</span><span class="lang-check-v5"></span>
              </button>`).join('')}
          </div>
        </div>
        <button class="control-btn-v5 icon-only-v5" id="themeToggleV5" type="button" aria-label="Theme"></button>
        <div class="quick-apps-wrap-v5">
          <button class="control-btn-v5 icon-only-v5" id="dashboardShortcutV5" type="button" aria-label="Sections" aria-haspopup="menu" aria-expanded="false">
            <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="6" height="6" rx="1"></rect><rect x="14" y="4" width="6" height="6" rx="1"></rect><rect x="4" y="14" width="6" height="6" rx="1"></rect><rect x="14" y="14" width="6" height="6" rx="1"></rect></svg>
          </button>
          <div class="quick-apps-menu-v5" id="quickAppsMenuV5" role="menu" hidden>
            ${quickSections().map(section=>`
              <button type="button" class="quick-app-option-v5" data-quick-tab-v5="${section.tab}" role="menuitem">
                <span class="quick-app-dot-v5"></span>
                <span class="quick-app-label-v5">${getText(section.textKey)}</span>
                <span class="quick-app-arrow-v5">›</span>
              </button>`).join('')}
          </div>
        </div>`;

      const sync = actions.querySelector('.sync-pill');
      if(sync) sync.insertAdjacentElement('afterend', bar); else actions.prepend(bar);

      document.getElementById('languageToggleV5').addEventListener('click', e=>{
        e.stopPropagation();
        const menu = document.getElementById('languageMenuV5');
        const willOpen = menu.hidden;
        menu.hidden = !willOpen;
        e.currentTarget.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
      });
      document.querySelectorAll('[data-lang-v5]').forEach(btn=>btn.addEventListener('click', ()=>setLanguage(btn.dataset.langV5)));
      document.getElementById('themeToggleV5').addEventListener('click', toggleTheme);
      document.getElementById('dashboardShortcutV5').addEventListener('click', e=>{
        e.stopPropagation();
        const menu = document.getElementById('quickAppsMenuV5');
        const willOpen = menu.hidden;
        closeLanguageMenu();
        menu.hidden = !willOpen;
        e.currentTarget.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
        updateQuickAppsMenu();
      });
      document.querySelectorAll('[data-quick-tab-v5]').forEach(btn=>btn.addEventListener('click', ()=>{
        if(navigateQuickTab(btn.dataset.quickTabV5)){
          closeQuickAppsMenu();
          scheduleEnhance();
        }
      }));
      updateLanguageControl();
      updateQuickAppsMenu();
    }

    function closeLanguageMenu(){
      const menu = document.getElementById('languageMenuV5');
      const btn = document.getElementById('languageToggleV5');
      if(menu) menu.hidden = true;
      if(btn) btn.setAttribute('aria-expanded','false');
    }

    function translateNodeText(node){
      if(!node || !node.nodeValue) return;
      const raw = node.nodeValue;
      const trimmed = raw.trim();
      if(!trimmed) return;
      let translated = translateText(trimmed, currentLang);
      if(translated === trimmed) translated = translateDynamicText(trimmed, currentLang);
      if(translated === trimmed) return;
      const start = raw.indexOf(trimmed);
      node.nodeValue = raw.slice(0,start) + translated + raw.slice(start + trimmed.length);
    }

    function translateAttributes(rootEl){
      const all = rootEl.matches?.('input,button,select,[title],[aria-label]') ? [rootEl] : [];
      if(rootEl.querySelectorAll) all.push(...rootEl.querySelectorAll('input,button,select,[title],[aria-label]'));
      for(const el of all){
        for(const attr of ['placeholder','title','aria-label']){
          const current = el.getAttribute?.(attr);
          if(!current) continue;
          let translated = translateText(current, currentLang);
          if(translated === current) translated = translateDynamicText(current, currentLang);
          if(translated !== current) el.setAttribute(attr, translated);
        }
      }
    }

    function translateDOM(rootEl){
      const rootNode = rootEl || document.body;
      if(!rootNode) return;
      const walker = document.createTreeWalker(rootNode, NodeFilter.SHOW_TEXT);
      const nodes = [];
      let n;
      while((n = walker.nextNode())){
        const parent = n.parentElement;
        if(!parent || parent.closest('script,style')) continue;
        const rawDataCell = parent.closest('tbody td');
        if(rawDataCell && !parent.closest('.badge,button')){
          // Ma'lumot katakchasi (model nomi, raqam...) tarjima qilinmaydi;
          // faqat "986 шт" / "234,53 кг" kabi birliklar tarjima qilinadi.
          const tv = n.nodeValue.trim();
          const tu = translateUnitsText(tv, currentLang);
          if(tu !== tv) n.nodeValue = n.nodeValue.replace(tv, tu);
          continue;
        }
        nodes.push(n);
      }
      nodes.forEach(translateNodeText);
      if(rootNode.nodeType === 1) translateAttributes(rootNode);
    }

    function isDashboardActive(){
      const active = document.querySelector('.tab-btn.active');
      return !!active && active.getAttribute('data-tab') === 'dashboard';
    }

    function applyDashboardPagination(){
      if(!isDashboardActive()){
        document.querySelectorAll('.table-pagination-v5').forEach(el=>el.remove());
        return;
      }
      const app = document.getElementById('app');
      if(!app) return;
      const tables = Array.from(app.querySelectorAll('.panel table'));
      const table = tables.find(t=>t.querySelectorAll('thead th').length >= 9);
      if(!table) return;
      const tbody = table.tBodies && table.tBodies[0];
      if(!tbody) return;
      const rows = Array.from(tbody.rows);
      const info = paginate(rows, dashboardPage, PAGE_SIZE);
      dashboardPage = info.page;
      rows.forEach((row, idx)=>{ row.hidden = idx < (info.page-1)*PAGE_SIZE || idx >= info.page*PAGE_SIZE; });

      const body = table.closest('.panel-body');
      if(!body) return;
      let pager = body.querySelector('.table-pagination-v5');
      if(!pager){
        pager = document.createElement('div');
        pager.className = 'table-pagination-v5';
        body.appendChild(pager);
      }
      const paginationSignatureV5 = `${currentLang}|${info.page}|${info.pageCount}|${info.start}|${info.end}|${info.total}`;
      if(pager.dataset.paginationSignatureV5 !== paginationSignatureV5){
        pager.dataset.paginationSignatureV5 = paginationSignatureV5;
        pager.innerHTML = `
          <div class="pagination-summary-v5">${getText('showing')} ${info.start}–${info.end} / ${info.total}</div>
          <div class="pagination-actions-v5">
            <button type="button" class="pagination-btn-v5" data-page-prev-v5 ${info.page<=1?'disabled':''}>‹ ${getText('prev')}</button>
            <span class="pagination-page-v5">${getText('page')} <strong>${info.page}</strong> ${getText('of')} ${info.pageCount}</span>
            <button type="button" class="pagination-btn-v5" data-page-next-v5 ${info.page>=info.pageCount?'disabled':''}>${getText('next')} ›</button>
          </div>`;
        pager.querySelector('[data-page-prev-v5]')?.addEventListener('click', ()=>{ dashboardPage--; applyDashboardPagination(); });
        pager.querySelector('[data-page-next-v5]')?.addEventListener('click', ()=>{ dashboardPage++; applyDashboardPagination(); });
      }
    }

    function styleExportPanelBreadcrumb(){
      const app = document.getElementById('app');
      const toolbar = app?.querySelector('.toolbar');
      if(!app || !toolbar) return;
      if(document.querySelector('.tab-btn.active')?.dataset.tab !== 'export') return;
      if(!document.getElementById('btnExportAll')) return;
      if(app.querySelector('.v12-export-crumb')) return;

      const crumb = document.createElement('button');
      crumb.type = 'button';
      crumb.className = 'v12-export-crumb';
      crumb.innerHTML = '<span aria-hidden="true">‹</span> Hisobotlar';
      crumb.addEventListener('click', ()=>{
        v12SideSelection = 'reports';
        v12Navigating = true;
        navigateQuickTab('dashboard');
        v12Navigating = false;
        setTimeout(()=>{
          renderV12ReportsView();
          updateV12SidebarActive();
          scheduleEnhance();
        },0);
      });
      app.insertBefore(crumb, toolbar);
    }

    function decorateExportCardV7(btn, formatLabel, iconPaths){
      const panel = btn.closest('.panel');
      const body = btn.closest('.panel-body');
      if(panel){
        panel.classList.add('export-panel-v5','export-panel-v7');
      }
      if(!body) return;

      body.classList.add('export-panel-body-v5','export-panel-body-v7');
      if(body.querySelector('.export-card-v7')) return;

      const text = body.querySelector('p');
      const card = document.createElement('div');
      card.className = 'export-card-v7';

      const icon = document.createElement('div');
      icon.className = 'export-icon-v7';
      icon.setAttribute('aria-hidden','true');
      icon.innerHTML = `<svg viewBox="0 0 24 24">${iconPaths}</svg>`;

      const content = document.createElement('div');
      content.className = 'export-content-v7';

      const meta = document.createElement('div');
      meta.className = 'export-meta-v7';
      meta.innerHTML = `
        <span class="export-format-v7">${formatLabel}</span>
        <span class="export-safe-v7">✓</span>`;

      content.appendChild(meta);
      if(text) content.appendChild(text);

      const action = document.createElement('div');
      action.className = 'export-action-v7';
      action.appendChild(btn);

      card.appendChild(icon);
      card.appendChild(content);
      card.appendChild(action);
      body.appendChild(card);
    }

    function styleExportPanel(){
      const btn = document.getElementById('btnExportAll');
      if(!btn) return;

      styleExportPanelBreadcrumb();

      decorateExportCardV7(btn, 'XLSX',
        '<path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7z"></path><path d="M14 2v5h5"></path><path d="M9 13h6M9 17h6"></path>');

      const zipBtn = document.getElementById('btnExportZip');
      if(zipBtn){
        decorateExportCardV7(zipBtn, 'ZIP',
          '<path d="M4 7a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"></path><path d="M12 10v1.5M12 13v1.5M12 16v1"></path>');
      }
    }

    function decorateLoginModalV15(){
      const backdrop = document.querySelector('.modal-backdrop');
      if(!backdrop) return;

      const modal = backdrop.querySelector('.modal');
      // Ham "Kirish", ham "Ro'yxatdan o'tish" formasini qo'llab-quvvatlaydi —
      // ikkisi ham index.html'da xuddi shu modal qobig'ini ishlatadi, faqat
      // ichidagi maydon id'lari farq qiladi (authEmail/authPassword vs
      // signupEmail/signupPassword/signupCode).
      const isLoginForm = !!(modal?.querySelector('#authEmail') && modal?.querySelector('#authPassword'));
      const isSignupForm = !!(modal?.querySelector('#signupEmail') && modal?.querySelector('#signupPassword'));
      if(!modal || (!isLoginForm && !isSignupForm)) return;

      backdrop.classList.add('v15-auth-backdrop');
      modal.classList.add('v15-login-modal');

      const body = modal.querySelector('.modal-body');
      if(body && !body.querySelector('.v15-login-brand')){
        const brand = document.createElement('div');
        brand.className = 'v15-login-brand';
        brand.innerHTML = `
          <span class="v15-login-symbol" aria-hidden="true">
            <img src="./logo-mark.png" alt="">
          </span>
          <span class="v15-login-company">
            <strong>MENGI TEKSTIL</strong>
            <small>GROUP</small>
          </span>`;
        body.insertBefore(brand, body.firstChild);
      }

      const fields = body?.querySelectorAll('.field') || [];
      fields.forEach(field=>field.classList.add('v15-auth-field'));
    }

    function scheduleEnhance(){
      clearTimeout(enhanceTimer);
      enhanceTimer = setTimeout(()=>{
        createQuickControlBar();
        decorateV9Dashboard();
        decorateLoginModalV15();
        translateDOM(document.body);
        applyDashboardPagination();
        styleExportPanel();
      },0);
    }

    // Bitta ruxsatnoma uchun Excel varag'i (hozirgi "Скачать Excel" dagi varaq
    // bilan aynan bir xil). Bitta fayldagi eksport ham, ZIP (alohida fayllar)
    // ham shu funksiyadan foydalanadi — ikki joyda ko'rinish farq qilmasligi uchun.
    function buildPermitSheetV14(p){
      const shipmentsForPermit = Array.isArray(state.shipments)
        ? state.shipments.filter(s=>s.permitId===p.id).slice().sort((a,b)=>(a.invoiceDate||'').localeCompare(b.invoiceDate||''))
        : [];

      const headerTitles = ['№','Наименование','Код ТН ВЭД','Количество разреш','Вес разрешение кг'];
      shipmentsForPermit.forEach(()=>{ headerTitles.push('Кол-во','Вес'); });
      headerTitles.push('Остаток количество','Остаток вес','Вес 1 единицы');

      const aoa = [];
      const titleRow = new Array(headerTitles.length).fill('');
      titleRow[1] = `Разрешение №${p.number} от ${p.date||''}`;
      aoa.push(titleRow);

      const invRow = new Array(headerTitles.length).fill('');
      let c = 5;
      shipmentsForPermit.forEach(s=>{ invRow[c] = `${s.invoiceNumber||''} от ${s.invoiceDate||''}`; c += 2; });
      aoa.push(invRow);
      aoa.push(headerTitles);

      (Array.isArray(p.items) ? p.items : []).forEach((it,idx)=>{
        const row = [idx+1, it.name, it.tnved, Number(it.qty)||0, Number(it.weight)||0];
        shipmentsForPermit.forEach(s=>{
      const line = Array.isArray(s.lines) ? s.lines.find(l=>l.itemId===it.id) : null;
      row.push(line ? (Number(line.qty)||0) : '', line ? Number((Number(line.weight)||0).toFixed(3)) : '');
        });
        const used = typeof itemUsage === 'function' ? itemUsage(p.id, it.id) : {qty:0,weight:0};
        const remQty = (Number(it.qty)||0) - (Number(used.qty)||0);
        const remWeight = (Number(it.weight)||0) - (Number(used.weight)||0);
        row.push(remQty, Number(remWeight.toFixed(3)), it.qty ? Number(((Number(it.weight)||0)/(Number(it.qty)||1)).toFixed(6)) : '');
        aoa.push(row);
      });

      const items = Array.isArray(p.items) ? p.items : [];
      const totals = ['', 'Итого', '', items.reduce((a,it)=>a+(Number(it.qty)||0),0), items.reduce((a,it)=>a+(Number(it.weight)||0),0)];
      shipmentsForPermit.forEach(s=>{
        const lines = Array.isArray(s.lines) ? s.lines : [];
        totals.push(lines.reduce((a,l)=>a+(Number(l.qty)||0),0), Number(lines.reduce((a,l)=>a+(Number(l.weight)||0),0).toFixed(3)));
      });
      const totalsUsed = shipmentsForPermit.reduce((acc,s)=>{
        for(const line of (Array.isArray(s.lines)?s.lines:[])){
      acc.qty += Number(line.qty)||0;
      acc.weight += Number(line.weight)||0;
        }
        return acc;
      },{qty:0,weight:0});
      totals.push(
        items.reduce((a,it)=>a+(Number(it.qty)||0),0) - totalsUsed.qty,
        Number((items.reduce((a,it)=>a+(Number(it.weight)||0),0) - totalsUsed.weight).toFixed(3)),
        ''
      );
      aoa.push(totals);

      const ws = XLSX.utils.aoa_to_sheet(aoa);
      const merges = [{s:{r:0,c:1},e:{r:0,c:headerTitles.length-1}}];
      let cc = 5;
      shipmentsForPermit.forEach(()=>{ merges.push({s:{r:1,c:cc},e:{r:1,c:cc+1}}); cc += 2; });
      ws['!merges'] = merges;
      ws['!cols'] = headerTitles.map((_,i)=> i===1 ? {wch:38} : {wch:14});
      if(typeof window.styleExportSheet === 'function') window.styleExportSheet(ws, aoa, {fixed:5, shipCount:shipmentsForPermit.length, itemCount:items.length});
      return ws;
    }

    // ===== ZIP: har bir ruxsatnoma uchun alohida Excel + umumiy ro'yxat =====
    function zipSafeName(str){
      return String(str ?? '').replace(/[\\/:*?"<>|\u0000-\u001f]/g,'_').replace(/\s+/g,'_').replace(/_+/g,'_').replace(/^[_.]+|[_.]+$/g,'').slice(0,80) || 'bez_nomera';
    }

    function buildPermitsIndexSheetV14(permits){
      const head = ['№','Разрешение','Дата','Моделей','Разрешено (шт)','Разрешенный вес (кг)','Отгружено (шт)','Отгруженный вес (кг)','Остаток (шт)','Остаток вес (кг)','Файл'];
      const r3 = n => Number((Number(n)||0).toFixed(3));
      let tModels=0,tQty=0,tW=0,tUQ=0,tUW=0;
      const body = permits.map((entry,idx)=>{
        const p = entry.permit;
        const items = Array.isArray(p.items) ? p.items : [];
        let qty=0,w=0,uq=0,uw=0;
        for(const it of items){
          const used = typeof itemUsage === 'function' ? itemUsage(p.id, it.id) : {qty:0,weight:0};
          qty += Number(it.qty)||0; w += Number(it.weight)||0;
          uq += Number(used.qty)||0; uw += Number(used.weight)||0;
        }
        tModels+=items.length; tQty+=qty; tW+=w; tUQ+=uq; tUW+=uw;
        return [idx+1, String(p.number||''), p.date||'', items.length, qty, r3(w), uq, r3(uw), qty-uq, r3(w-uw), entry.fileName];
      });
      const totalRow = ['', 'Итого', '', tModels, tQty, r3(tW), tUQ, r3(tUW), tQty-tUQ, r3(tW-tUW), ''];
      const today = new Date().toISOString().slice(0,10);
      const aoa = [[`Список разрешений — всего: ${permits.length}`,'','','','','','','','','',`Дата: ${today}`], head, ...body, totalRow];
      const ws = XLSX.utils.aoa_to_sheet(aoa);
      const NC = head.length;
      ws['!merges'] = [{s:{r:0,c:0},e:{r:0,c:NC-2}}];
      ws['!cols'] = [{wch:6},{wch:24},{wch:12},{wch:10},{wch:14},{wch:18},{wch:14},{wch:18},{wch:12},{wch:16},{wch:44}];
      ws['!rows'] = [{hpt:30},{hpt:34}];
      try{
        const thin = {style:'thin', color:{rgb:'BFC7D5'}};
        const border = {top:thin, bottom:thin, left:thin, right:thin};
        for(let r=0; r<aoa.length; r++){
          for(let c=0; c<NC; c++){
            const ref = XLSX.utils.encode_cell({r,c});
            const ce = ws[ref] || (ws[ref] = {t:'s', v:''});
            const font = {name:'Calibri', sz:10, color:{rgb:'1F2937'}};
            let bg = (r%2) ? 'F7F9FC' : 'FFFFFF', bd = border;
            if(r === 0){ font.sz = 14; font.bold = true; font.color = {rgb:'FFFFFF'}; bg = '1F3A5F'; bd = undefined; }
            else if(r === 1){ font.bold = true; font.color = {rgb:'FFFFFF'}; bg = '2F5496'; }
            else if(r === aoa.length-1){ font.bold = true; bg = 'E8EEF7'; }
            ce.s = { font, fill:{patternType:'solid', fgColor:{rgb:bg}}, alignment:{horizontal:'left', vertical:'center', wrapText:(r===1)} };
            if(bd) ce.s.border = bd;
            if(r >= 2 && typeof ce.v === 'number'){
              ce.z = (c === 3 || c === 4 || c === 6 || c === 8) ? '#,##0' : '#,##0.000';
              if((c === 8 || c === 9) && ce.v < 0){ ce.s.font = {...font, color:{rgb:'C00000'}, bold:true}; }
            }
          }
        }
        ws['!freeze'] = {xSplit:'2', ySplit:'2', topLeftCell:'C3', activePane:'bottomRight', state:'frozen'};
        ws['!autofilter'] = {ref: XLSX.utils.encode_range({s:{r:1,c:0}, e:{r:aoa.length-2,c:NC-1}})};
      }catch(err){ console.warn("Excel dizayn qo'llanmadi:", err); }
      return ws;
    }

    async function exportPermitsZip(){
      const button = document.getElementById('btnExportZip');
      const originalLabel = button ? button.textContent : '';
      try{
        if(typeof XLSX === 'undefined' || !XLSX.utils || typeof XLSX.write !== 'function'){
          notify('exportLibraryMissing');
          return;
        }
        if(typeof JSZip === 'undefined'){
          notify('ZIP kutubxonasi yuklanmadi. Internetni tekshirib, sahifani yangilang');
          return;
        }
        if(typeof state === 'undefined' || !state || !Array.isArray(state.permits) || !state.permits.length){
          notify('exportNoData');
          return;
        }
        if(button){ button.disabled = true; button.textContent = getText('exporting'); }

        const permits = state.permits.slice().sort((a,b)=>(a.date||'').localeCompare(b.date||'') || String(a.number||'').localeCompare(String(b.number||'')));
        const usedFileNames = new Set(['00_royxat.xlsx']);
        const entries = permits.map(p=>{
          const base = 'Ruxsatnoma_' + zipSafeName(p.number) + (p.date ? '_' + zipSafeName(p.date) : '');
          let name = base + '.xlsx', i = 2;
          while(usedFileNames.has(name.toLowerCase())){ name = base + '_' + (i++) + '.xlsx'; }
          usedFileNames.add(name.toLowerCase());
          return { permit:p, fileName:name };
        });

        const zip = new JSZip();
        const indexWb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(indexWb, buildPermitsIndexSheetV14(entries), 'Список');
        zip.file('00_Royxat.xlsx', XLSX.write(indexWb, {bookType:'xlsx', type:'array'}));

        for(const entry of entries){
          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, buildPermitSheetV14(entry.permit), safeSheetName(entry.permit.number, new Set()));
          zip.file(entry.fileName, XLSX.write(wb, {bookType:'xlsx', type:'array'}));
        }

        const blob = await zip.generateAsync({type:'blob', compression:'DEFLATE'});
        const a = document.createElement('a');
        const url = URL.createObjectURL(blob);
        a.href = url;
        a.download = 'Ruxsatnomalar_' + new Date().toISOString().slice(0,10) + '.zip';
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(()=>URL.revokeObjectURL(url), 5000);
        notify('exportDone');
      }catch(err){
        console.error('ZIP export failed', err);
        notify('exportError');
      }finally{
        if(button){ button.disabled = false; button.textContent = originalLabel; }
      }
    }


    function hardenedExportWorkbook(){
      const button = document.getElementById('btnExportAll');
      let originalLabel = button ? button.textContent : '';
      try{
        if(typeof XLSX === 'undefined' || !XLSX.utils || typeof XLSX.writeFile !== 'function'){
          notify('exportLibraryMissing');
          return;
        }
        if(typeof state === 'undefined' || !state || !Array.isArray(state.permits) || !state.permits.length){
          notify('exportNoData');
          return;
        }
        if(button){ button.disabled = true; button.textContent = getText('exporting'); }

        const wb = XLSX.utils.book_new();
        const usedNames = new Set();
        const permitsForExport = state.permits.slice().sort((a,b)=>(a.date||'').localeCompare(b.date||''));

        for(const p of permitsForExport){
          const ws = buildPermitSheetV14(p);
          XLSX.utils.book_append_sheet(wb, ws, safeSheetName(p.number, usedNames));
        }

        XLSX.writeFile(wb, 'Разрешения_учет.xlsx');
        notify('exportDone');
      }catch(err){
        console.error('Export failed', err);
        notify('exportError');
      }finally{
        if(button){
          button.disabled = false;
          button.textContent = originalLabel || getText('downloadExcel');
          translateDOM(button);
        }
      }
    }

    function initBrowser(){
      document.documentElement.dataset.lang = currentLang;
      document.documentElement.dataset.theme = currentTheme;
      applyTheme();
      createQuickControlBar();
      decorateV9Dashboard();
      translateDOM(document.body);
      applyDashboardPagination();
      styleExportPanel();

      document.addEventListener('click', e=>{
        if(!e.target.closest('.language-wrap-v5')) closeLanguageMenu();
        if(!e.target.closest('.quick-apps-wrap-v5')) closeQuickAppsMenu();
        const zipBtn = e.target.closest('#btnExportZip');
        if(zipBtn){
          e.preventDefault();
          e.stopImmediatePropagation();
          exportPermitsZip();
          return;
        }
        const exportBtn = e.target.closest('#btnExportAll');
        if(exportBtn){
          e.preventDefault();
          e.stopImmediatePropagation();
          hardenedExportWorkbook();
        }
      }, true);
      document.addEventListener('keydown', e=>{
        if(e.key==='Escape'){
          closeLanguageMenu();
          closeQuickAppsMenu();
          closeHelpModalV5();
          // Har qanday ochiq oyna (ruxsatnoma tafsiloti, kirish/ro'yxatdan
          // o'tish, tahrirlash va h.k.) ESC bosilganda ham yopilsin —
          // avval faqat "Orqaga"/X tugmasini bosib yopish mumkin edi.
          if(typeof closeModal === 'function') closeModal();
        }
      });
      // Sichqonchaning "Orqaga"/"Oldinga" (odatda 4- va 5-tugmalar,
      // ba'zi sichqonchalarda 6-tugma ham) bosilganda: agar biror oyna
      // ochiq bo'lsa, brauzer sahifasini o'zgartirish o'rniga o'shanday
      // oynani yopamiz. MouseEvent.button: 3 = orqaga, 4 = oldinga —
      // qolgan qo'shimcha tugmalar brauzer/OS'ga qarab shu ikkisiga
      // yoki boshqa qiymatlarga mos kelishi mumkin, shu sabab >=3
      // bo'lgan barcha tugmalarni ushlaymiz.
      document.addEventListener('mouseup', e=>{
        if(e.button >= 3 && typeof closeModal === 'function' && document.getElementById('modalBackdrop')){
          e.preventDefault();
          closeModal();
        }
      });
      document.addEventListener('input', e=>{ if(e.target && e.target.id==='dashSearch') dashboardPage = 1; }, true);
      document.addEventListener('change', e=>{
        if(e.target && (e.target.id==='dashboardFilter' || e.target.id==='dashboardSort')) dashboardPage = 1;
      }, true);

      const observed = document.getElementById('app') || document.body;
      observer = new MutationObserver(()=>scheduleEnhance());
      observer.observe(observed,{childList:true,subtree:true,characterData:true});
      const topbar = document.querySelector('.topbar');
      if(topbar && topbar !== observed){
        const topObserver = new MutationObserver(()=>scheduleEnhance());
        topObserver.observe(topbar,{childList:true,subtree:true,characterData:true});
      }
      // MUHIM: login/registratsiya oynasi (.modal-backdrop) #app ichiga emas,
      // to'g'ridan-to'g'ri document.body'ga qo'shiladi (index.html'dagi
      // showModal() shunday ishlaydi). Yuqoridagi observer buni SEZMAYDI,
      // shu sababli oyna ochilganda logo/dizayn (decorateLoginModalV15)
      // faqat tasodifan — boshqa nomutanosib DOM o'zgarishi bo'lganda —
      // qo'llanardi. Shu sabab body'ni alohida kuzatib, modal ochilishi
      // yoki uning ichidagi almashinuvlar (login <-> ro'yxatdan o'tish)
      // DARHOL sezilishini ta'minlaymiz.
      if(document.body !== observed){
        const bodyObserver = new MutationObserver(()=>scheduleEnhance());
        bodyObserver.observe(document.body,{childList:true,subtree:true,characterData:true});
      }
      scheduleEnhance();
    }

    if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initBrowser, {once:true});
    else initBrowser();
  }

  return { paginate, translateText, translateDynamicText, translateMessage, translateUnitsText, safeSheetName, nextTheme, quickSections, sidebarSectionsV9, resolveSidebarSelectionV10, sidebarSectionsV11, sidebarDestinationV11, resolveSidebarSelectionV11, sidebarSectionsV12, sidebarDestinationV12, resolveSidebarSelectionV12, computeKpiDeltasV12, computeRecentlyCriticalV12, formatDeltaV12, UI_TEXT, LANGUAGES, PAGE_SIZE, getCurrentLanguage:()=> (typeof localStorage!=='undefined' ? normalizeLang(localStorage.getItem(LANG_KEY)||'ru') : 'ru'), extraText:EXTRA_TEXT };
});
