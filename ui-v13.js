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
    darkMode:{ru:'Тёмная тема',en:'Dark mode',uz:'Qorong‘i rejim',tr:'Koyu tema'}
  };


  // Additional UI strings used by the core page, audit module and legacy visual layers.
  // These entries translate interface text only; product/item names and user data are never translated.
  const EXTRA_TEXT = {
    'История':{ru:'История',en:'History',uz:'Tarix',tr:'Geçmiş'},
    'Hisobotlar':{ru:'Отчёты',en:'Reports',uz:'Hisobotlar',tr:'Raporlar'},
    'Ombor, ruxsatnomalar va qoldiqlar bo‘yicha joriy ko‘rsatkichlar':{ru:'Текущие показатели склада, разрешений и остатков',en:'Current warehouse, permit and balance indicators',uz:'Ombor, ruxsatnomalar va qoldiqlar bo‘yicha joriy ko‘rsatkichlar',tr:'Depo, izin ve bakiye göstergeleri'},
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
    'кг':{ru:'кг',en:'kg',uz:'kg',tr:'kg'}
  };

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
      {id:'export', label:'Eksport', icon:'ship'},
      {id:'reports', label:'Hisobotlar', icon:'chart'},
      {id:'audit', label:'Tarix', icon:'audit'}
    ];
  }

  function sidebarDestinationV12(id){
    if(id === 'reports') return {tab:'dashboard', mode:'reports'};
    return {tab:['dashboard','permits','shipment','shipmentHistory','export','audit'].includes(id) ? id : 'dashboard', mode:'normal'};
  }

  function resolveSidebarSelectionV12(activeTab, requested){
    const tab = ['dashboard','permits','shipment','shipmentHistory','export','audit'].includes(activeTab) ? activeTab : 'dashboard';
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
    const key = reverseText.get(value);
    if(!key) return value;
    if(key.startsWith('__extra__:')){
      const source = key.slice(10);
      const entry = EXTRA_TEXT[source];
      return entry ? (entry[normalizeLang(lang)] || entry.ru || value) : value;
    }
    return textByKey(key, lang);
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

    return value;
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
      const allowed = new Set([...quickSections().map(x=>x.tab), 'audit', 'shipmentHistory']);
      if(!allowed.has(tab)) return false;
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
        clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7.5v5l3.5 2"/>'
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

    function updateV12SidebarActive(){
      const activeTab = document.querySelector('.tab-btn.active')?.dataset.tab || 'dashboard';
      v12SideSelection = resolveSidebarSelectionV12(activeTab, v12SideSelection);
      document.querySelectorAll('.v12-side-btn[data-v12-section]').forEach(btn=>{
        btn.classList.toggle('active', btn.dataset.v12Section === v12SideSelection);
      });
      document.querySelector('.tab-btn[data-tab="dashboard"]')?.classList.toggle('v12-under-reports', v12SideSelection === 'reports');
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

      const view = existing || document.createElement('section');
      view.className = 'v12-reports-view';
      view.innerHTML = `
        <div class="v12-reports-head">
          <div><h1>Hisobotlar</h1><p>Omborning joriy holati va so‘nggi o‘zgarishlar</p></div>
          <button type="button" class="v12-report-export-btn">Eksportga o‘tish</button>
        </div>
        <div class="v12-report-grid">
          ${values.map(v=>`
            <article class="v12-report-card v12-report-primary">
              <span>${v.label || 'Ko‘rsatkich'}</span>
              <strong>${v.num}</strong><small>${v.unit}</small>
            </article>`).join('')}
          ${stats.map((s,i)=>`
            <article class="v12-report-card">
              <div class="v12-report-icon">${v9IconSvg(i===0?'clipboard':i===1?'spool':'chart')}</div>
              <span>${s.lbl}</span><strong>${s.num}</strong>
            </article>`).join('')}
        </div>`;

      if(!existing) app.appendChild(view);
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
          badge.title = titles[index];
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
        if(rawDataCell && !parent.closest('.badge,button')) continue;
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

    function styleExportPanel(){
      const btn = document.getElementById('btnExportAll');
      if(!btn) return;

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
      icon.innerHTML = `
        <svg viewBox="0 0 24 24">
          <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7z"></path>
          <path d="M14 2v5h5"></path>
          <path d="M9 13h6M9 17h6"></path>
        </svg>`;

      const content = document.createElement('div');
      content.className = 'export-content-v7';

      const meta = document.createElement('div');
      meta.className = 'export-meta-v7';
      meta.innerHTML = `
        <span class="export-format-v7">XLSX</span>
        <span class="export-safe-v7">✓</span>`;

      if(text){
        content.appendChild(meta);
        content.appendChild(text);
      }else{
        content.appendChild(meta);
      }

      const action = document.createElement('div');
      action.className = 'export-action-v7';
      action.appendChild(btn);

      card.appendChild(icon);
      card.appendChild(content);
      card.appendChild(action);
      body.appendChild(card);
    }

    function decorateLoginModalV15(){
      const backdrop = document.querySelector('.modal-backdrop');
      if(!backdrop) return;

      const modal = backdrop.querySelector('.modal');
      const email = modal?.querySelector('#authEmail');
      const password = modal?.querySelector('#authPassword');
      if(!modal || !email || !password) return;

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
      scheduleEnhance();
    }

    if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initBrowser, {once:true});
    else initBrowser();
  }

  return { paginate, translateText, translateDynamicText, safeSheetName, nextTheme, quickSections, sidebarSectionsV9, resolveSidebarSelectionV10, sidebarSectionsV11, sidebarDestinationV11, resolveSidebarSelectionV11, sidebarSectionsV12, sidebarDestinationV12, resolveSidebarSelectionV12, computeKpiDeltasV12, formatDeltaV12, UI_TEXT, LANGUAGES, PAGE_SIZE, getCurrentLanguage:()=> (typeof localStorage!=='undefined' ? normalizeLang(localStorage.getItem(LANG_KEY)||'ru') : 'ru'), extraText:EXTRA_TEXT };
});
