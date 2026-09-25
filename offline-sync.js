(function(root){
  'use strict';

  const DB_NAME = 'permit_app_offline_v2';
  const DB_VERSION = 1;
  const RECORDS = 'records';
  const META = 'meta';
  const LEGACY_PERMITS = 'ur_permits_v1';
  const LEGACY_SHIPMENTS = 'ur_shipments_v1';
  const TABLES = { permit:'permits', shipment:'shipments', audit:'audit_logs', comment:'comments' };
  const STATUS_EVENT = 'permit-sync-status';
  const DATA_EVENT = 'permit-sync-data';
  let syncPromise = null;
  let syncTimer = null;
  let pollTimer = null;
  let retryTimer = null;
  let retryAttempt = 0;
  let channel = null;

  function config(){ return root.APP_CONFIG || {}; }
  function configured(){
    const c = config();
    return !!(c.supabaseUrl && c.supabaseAnonKey && !String(c.supabaseUrl).includes('YOUR_'));
  }
  function baseUrl(){ return String(config().supabaseUrl || '').replace(/\/$/, ''); }
  function anonKey(){ return String(config().supabaseAnonKey || ''); }

  function emitStatus(kind, message, extra){
    root.dispatchEvent(new CustomEvent(STATUS_EVENT, { detail:{ kind, message, ...(extra||{}) } }));
  }
  function emitData(){ root.dispatchEvent(new CustomEvent(DATA_EVENT)); }

  function openDb(){
    return new Promise((resolve,reject)=>{
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = ()=>{
        const db = req.result;
        if(!db.objectStoreNames.contains(RECORDS)){
          const s = db.createObjectStore(RECORDS, { keyPath:'key' });
          s.createIndex('entity_type','entity_type',{ unique:false });
          s.createIndex('dirty','dirty',{ unique:false });
        }
        if(!db.objectStoreNames.contains(META)) db.createObjectStore(META, { keyPath:'key' });
      };
      req.onsuccess = ()=>resolve(req.result);
      req.onerror = ()=>reject(req.error);
    });
  }

  function reqP(req){
    return new Promise((resolve,reject)=>{
      req.onsuccess = ()=>resolve(req.result);
      req.onerror = ()=>reject(req.error);
    });
  }
  function txP(tx){
    return new Promise((resolve,reject)=>{
      tx.oncomplete = ()=>resolve();
      tx.onerror = ()=>reject(tx.error);
      tx.onabort = ()=>reject(tx.error || new Error('IndexedDB transaction aborted'));
    });
  }
  function storageRecord(r){
    return { ...r, key:`${r.entity_type}:${r.id}` };
  }
  function publicRecord(r){
    if(!r) return r;
    const { key, ...rest } = r;
    return rest;
  }

  async function getAllRecords(){
    const db = await openDb();
    try{
      const tx = db.transaction(RECORDS,'readonly');
      const rows = await reqP(tx.objectStore(RECORDS).getAll());
      await txP(tx);
      return rows.map(publicRecord);
    }finally{ db.close(); }
  }

  async function putRecords(records){
    if(!records || !records.length) return;
    const db = await openDb();
    try{
      const tx = db.transaction(RECORDS,'readwrite');
      const store = tx.objectStore(RECORDS);
      for(const r of records) store.put(storageRecord(r));
      await txP(tx);
    }finally{ db.close(); }
  }


  async function replaceAllRecords(records){
    const db = await openDb();
    try{
      const tx = db.transaction(RECORDS,'readwrite');
      const store = tx.objectStore(RECORDS);
      store.clear();
      for(const r of (records || [])) store.put(storageRecord({ ...r, dirty:false }));
      await txP(tx);
    }finally{ db.close(); }
  }

  async function getMeta(key){
    const db = await openDb();
    try{
      const tx = db.transaction(META,'readonly');
      const row = await reqP(tx.objectStore(META).get(key));
      await txP(tx);
      return row ? row.value : null;
    }finally{ db.close(); }
  }

  async function setMeta(key,value){
    const db = await openDb();
    try{
      const tx = db.transaction(META,'readwrite');
      tx.objectStore(META).put({key,value});
      await txP(tx);
    }finally{ db.close(); }
  }

  async function delMeta(key){
    const db = await openDb();
    try{
      const tx = db.transaction(META,'readwrite');
      tx.objectStore(META).delete(key);
      await txP(tx);
    }finally{ db.close(); }
  }

  function parseLegacy(key){
    try{
      const raw = localStorage.getItem(key);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    }catch(_){ return []; }
  }


  function legacyCount(){
    return parseLegacy(LEGACY_PERMITS).length + parseLegacy(LEGACY_SHIPMENTS).length;
  }

  async function migrateLegacyIfNeeded(){
    const existing = await getAllRecords();
    if(existing.length) return false;
    const permits = parseLegacy(LEGACY_PERMITS);
    const shipments = parseLegacy(LEGACY_SHIPMENTS);
    if(!permits.length && !shipments.length) return false;
    const now = new Date().toISOString();
    const records = [];
    for(const p of permits){
      if(p && p.id) records.push({ id:p.id, entity_type:'permit', data:p, updated_at:now, deleted_at:null, dirty:true });
    }
    for(const s of shipments){
      if(s && s.id) records.push({ id:s.id, entity_type:'shipment', data:s, updated_at:now, deleted_at:null, dirty:true });
    }
    await putRecords(records);
    await setMeta('legacy_migrated_at', now);
    await setMeta('legacy_import_pending', true);
    return true;
  }

  async function loadState(){
    const records = await getAllRecords();
    return {
      permits: root.SyncCore.recordsToCollection(records,'permit'),
      shipments: root.SyncCore.recordsToCollection(records,'shipment'),
      audits: root.SyncCore.recordsToCollection(records,'audit'),
      comments: root.SyncCore.recordsToCollection(records,'comment'),
    };
  }

  async function hasAnyRecords(){
    const rows = await getAllRecords();
    return rows.length > 0;
  }

  async function saveCollection(entityType, items){
    const all = await getAllRecords();
    const now = new Date().toISOString();
    const changed = root.SyncCore.diffCollection(all, items, entityType, now);
    await putRecords(changed);
    emitStatus(navigator.onLine ? 'pending' : 'offline', navigator.onLine ? 'изменения сохранены локально · ожидают синхронизации' : 'офлайн · изменения сохранены на этом устройстве');
    if(channel) channel.postMessage({ type:'local-change' });
    scheduleSync(500);
  }

  function sessionExpired(session){
    if(!session) return true;
    const exp = Number(session.expires_at || 0);
    return !exp || (Date.now()/1000) > (exp - 60);
  }

  async function saveSession(payload){
    const session = {
      access_token: payload.access_token,
      refresh_token: payload.refresh_token,
      expires_at: payload.expires_at || Math.floor(Date.now()/1000) + Number(payload.expires_in || 3600),
      user: payload.user || null,
    };
    await setMeta('auth_session', session);
    return session;
  }

  async function refreshSession(session){
    if(!session || !session.refresh_token) return null;
    let res;
    try{
      res = await fetch(baseUrl() + '/auth/v1/token?grant_type=refresh_token', {
        method:'POST',
        headers:{ 'apikey':anonKey(), 'Content-Type':'application/json' },
        body:JSON.stringify({ refresh_token:session.refresh_token }),
      });
    }catch(networkErr){
      // Tarmoq/server bilan vaqtinchalik aloqa uzilishi (offline, timeout va h.k.).
      // Bu holatda foydalanuvchini tizimdan chiqarib yubormaymiz — keyingi
      // sinxronizatsiyada qayta urinib ko'ramiz.
      return session;
    }
    if(!res.ok){
      // Faqat Supabase aniq "refresh token yaroqsiz/eskirgan" deb javob
      // qaytarganda (400/401) foydalanuvchini chiqarib yuboramiz. Boshqa
      // xatolar (5xx server xatosi, 429 va h.k.) vaqtinchalik bo'lishi
      // mumkin — sessiyani saqlab qolamiz va keyinroq qayta urinamiz.
      if(res.status === 400 || res.status === 401){
        await delMeta('auth_session');
        return null;
      }
      return session;
    }
    return saveSession(await res.json());
  }

  async function getSession(refresh){
    let session = await getMeta('auth_session');
    if(refresh && configured() && navigator.onLine && sessionExpired(session)) session = await refreshSession(session);
    return session;
  }

  async function login(email,password){
    if(!configured()) throw new Error('Supabase ещё не настроен');
    if(!navigator.onLine) throw new Error('Для первого входа нужен интернет');
    const res = await fetch(baseUrl() + '/auth/v1/token?grant_type=password', {
      method:'POST',
      headers:{ 'apikey':anonKey(), 'Content-Type':'application/json' },
      body:JSON.stringify({ email, password }),
    });
    const body = await res.json().catch(()=>({}));
    if(!res.ok) throw new Error(body.msg || body.error_description || body.message || 'Не удалось войти');
    const session = await saveSession(body);
    emitStatus('pending','вход выполнен · синхронизация…');
    await syncNow(true);
    return session;
  }

  // O'z-o'zidan ro'yxatdan o'tish. Taklif kodi (invite code) config.js'da
  // saqlanadi va faqat brauzer tomonida solishtiriladi — bu server-side
  // himoya EMAS (texnik bilimli odam kodni ko'rishi mumkin), balki
  // tasodifiy/bilmasdan ro'yxatdan o'tishni to'xtatadigan oddiy filtr.
  async function signup(email, password, inviteCode, profile){
    if(!configured()) throw new Error('Supabase ещё не настроен');
    if(!navigator.onLine) throw new Error('Ro\'yxatdan o\'tish uchun internet kerak');
    const expected = String(config().editorInviteCode || '');
    if(!expected) throw new Error('Taklif kodi sozlanmagan (config.js)');
    if(String(inviteCode||'').trim() !== expected) throw new Error('Taklif kodi noto\'g\'ri');

    const res = await fetch(baseUrl() + '/auth/v1/signup', {
      method:'POST',
      headers:{ 'apikey':anonKey(), 'Content-Type':'application/json' },
      body:JSON.stringify({
        email, password,
        // Ism va familiya Supabase user_metadata'da saqlanadi (SQL o'zgartirish shart emas).
        data:{
          first_name: String(profile?.firstName||'').trim(),
          last_name: String(profile?.lastName||'').trim(),
          full_name: (String(profile?.firstName||'').trim()+' '+String(profile?.lastName||'').trim()).trim()
        }
      }),
    });
    const body = await res.json().catch(()=>({}));
    if(!res.ok) throw new Error(body.msg || body.error_description || body.message || 'Ro\'yxatdan o\'tib bo\'lmadi');

    if(body.access_token){
      // Supabase loyihasida email tasdiqlash o'chirilgan — session darhol keladi.
      const session = await saveSession(body);
      emitStatus('pending','ro\'yxatdan o\'tildi · sinxronizatsiya…');
      await syncNow(true);
      return { session, needsEmailConfirm:false };
    }
    // Email tasdiqlash yoqilgan bo'lsa, session qaytmaydi — foydalanuvchi
    // emailidagi havolani bosishi kerak.
    return { session:null, needsEmailConfirm:true };
  }

  async function logout(){
    const session = await getSession(false);
    if(session && session.access_token && configured() && navigator.onLine){
      try{
        await fetch(baseUrl() + '/auth/v1/logout', {
          method:'POST',
          headers:{ 'apikey':anonKey(), 'Authorization':'Bearer '+session.access_token },
        });
      }catch(_){ }
    }
    await delMeta('auth_session');
    emitStatus('view','просмотр · для редактирования войдите');
  }

  async function authInfo(){
    const session = await getSession(false);
    const meta = (session && session.user && session.user.user_metadata) || {};
    const firstName = String(meta.first_name||'').trim();
    const lastName = String(meta.last_name||'').trim();
    const fullName = (firstName+' '+lastName).trim() || String(meta.full_name||'').trim();
    const email = session && session.user ? session.user.email : '';
    return {
      loggedIn: !!(session && session.refresh_token),
      email,
      firstName, lastName, fullName,
      // Tarixda va izohlarda ko'rsatiladigan nom: ism-familiya, bo'lmasa email.
      displayName: fullName || email,
      userId: session && session.user ? session.user.id : '',
    };
  }

  // Foydalanuvchi ro'yxatdan o'tgan/kirgan bo'lishi mumkin, lekin bu unga
  // ma'lumotlarni o'zgartirish huquqini bermaydi. Tahrirlash huquqi faqat
  // admin "editors" jadvaliga qo'lda qo'shgan userlarga beriladi.
  // Bu funksiya shu jadvalda joriy foydalanuvchi bor-yo'qligini tekshiradi.
  async function isEditor(){
    const session = await getSession(true);
    if(!session || !session.access_token || !session.user) return false;
    try{
      const res = await apiFetch(
        `/rest/v1/editors?select=user_id&user_id=eq.${encodeURIComponent(session.user.id)}`,
        { method:'GET' },
        true
      );
      if(!res.ok) return false;
      const rows = await res.json().catch(()=>[]);
      return Array.isArray(rows) && rows.length > 0;
    }catch(_){
      return false;
    }
  }

  // "Qo'shuvchi" (cheklangan tahrirlash huquqi): faqat admin "contributors"
  // jadvaliga qo'lda qo'shgan userlar. Ular ruxsatnoma/yuklama qo'sha va
  // tahrirlay oladi, lekin o'chira olmaydi. Bu cheklov ikki joyda ta'minlanadi:
  // 1) frontendda (index.html) — o'chirish tugmalari faqat to'liq editorga
  //    ko'rinadi; 2) serverda — Supabase'dagi sync_records funksiyasi
  //    contributors uchun deleted_at yozilishini rad etadi (AUDIT/CONTRIBUTOR
  //    migratsiyasiga qarang).
  async function isContributor(){
    const session = await getSession(true);
    if(!session || !session.access_token || !session.user) return false;
    try{
      const res = await apiFetch(
        `/rest/v1/contributors?select=user_id&user_id=eq.${encodeURIComponent(session.user.id)}`,
        { method:'GET' },
        true
      );
      if(!res.ok) return false;
      const rows = await res.json().catch(()=>[]);
      return Array.isArray(rows) && rows.length > 0;
    }catch(_){
      return false;
    }
  }

  // ============================= RUXSATNOMA PDF (Supabase Storage) =============================
  // Ruxsatnoma kiritilganda unga tegishli PDF fayl shu bucket'ga yuklanadi.
  // Bucket public bo'lgani uchun qaytariladigan URL orqali istalgan payt
  // ochish/yuklab olish mumkin (login talab qilinmaydi). Yuklash esa faqat
  // tizimga kirgan (editor/contributor) foydalanuvchiga ruxsat etilgan —
  // buni Storage RLS siyosati serverda ta'minlaydi (PERMIT-PDF-STORAGE.sql).
  const PDF_BUCKET = 'permit-pdfs';

  async function uploadPermitPdf(permitId, file){
    if(!configured()) throw new Error('Supabase ещё не настроен');
    if(!navigator.onLine) throw new Error('PDF yuklash uchun internet kerak');
    const session = await getSession(true);
    if(!session || !session.access_token) throw new Error('AUTH_REQUIRED');
    const safeName = String(file.name || 'ruxsatnoma.pdf').replace(/[^a-zA-Z0-9._-]+/g, '_').slice(-140) || 'ruxsatnoma.pdf';
    const path = `${permitId}/${Date.now()}_${safeName}`;
    const res = await fetch(baseUrl() + '/storage/v1/object/' + PDF_BUCKET + '/' + path, {
      method: 'POST',
      headers: {
        'apikey': anonKey(),
        'Authorization': 'Bearer ' + session.access_token,
        'Content-Type': file.type || 'application/pdf',
        'x-upsert': 'true'
      },
      body: file
    });
    if(!res.ok){
      const text = await res.text().catch(()=>String(res.status));
      throw new Error('PDF_UPLOAD_FAILED ' + res.status + ' ' + text);
    }
    return {
      url: baseUrl() + '/storage/v1/object/public/' + PDF_BUCKET + '/' + path,
      path,
      name: file.name || safeName
    };
  }

  async function apiFetch(path, options, useUserToken){
    const headers = { 'apikey':anonKey(), ...(options && options.headers || {}) };
    if(useUserToken){
      const session = await getSession(true);
      if(!session || !session.access_token) throw new Error('AUTH_REQUIRED');
      headers.Authorization = 'Bearer ' + session.access_token;
    }else{
      headers.Authorization = 'Bearer ' + anonKey();
    }
    return fetch(baseUrl() + path, { ...(options||{}), headers });
  }

  async function dirtyRecords(){
    return (await getAllRecords()).filter(r=>r.dirty);
  }

  async function markClean(sentRecords){
    if(!sentRecords.length) return;
    const sent = new Map(sentRecords.map(r=>[`${r.entity_type}:${r.id}`,r.updated_at]));
    const all = await getAllRecords();
    const updates = [];
    for(const r of all){
      if(sent.get(`${r.entity_type}:${r.id}`) === r.updated_at && r.dirty){
        updates.push({ ...r, dirty:false });
      }
    }
    await putRecords(updates);
  }

  async function pushDirty(){
    const session = await getSession(true);
    if(!session || !session.access_token) return { pushed:0, authRequired:true };
    const dirty = await dirtyRecords();
    if(!dirty.length) return { pushed:0, authRequired:false };

    let pushed = 0;
    for(const entityType of ['permit','shipment','audit','comment']){
      const batch = dirty.filter(r=>r.entity_type===entityType);
      if(!batch.length) continue;
      const payload = batch.map(r=>({ id:r.id, data:r.data, updated_at:r.updated_at, deleted_at:r.deleted_at }));
      let res;
      if(entityType === 'audit'){
        const auditPayload = batch.map(r=>({
          id:r.id, actor_id:r.data?.actorId||null, actor_email:r.data?.actorEmail||null,
          action:r.data?.action||'unknown', entity_type:r.data?.entityType||null, entity_id:r.data?.entityId||null,
          entity_label:r.data?.entityLabel||null, old_data:r.data?.oldData||null, new_data:r.data?.newData||null,
          reason:r.data?.reason||null, changes:Array.isArray(r.data?.changes)?r.data.changes:null,
          created_at:r.data?.createdAt||r.updated_at,
          // Tarixni o'chirish (faqat editor): "soft delete" — qator qoladi,
          // deleted_at vaqt bilan belgilanadi (AUDIT-DELETE-EDITORS.sql).
          deleted_at:r.deleted_at||null
        }));
        res = await apiFetch('/rest/v1/audit_logs?on_conflict=id', {
          method:'POST',
          headers:{ 'Content-Type':'application/json', 'Prefer':'resolution=merge-duplicates,return=minimal' },
          body:JSON.stringify(auditPayload),
        }, true);
      }else if(entityType === 'comment'){
        // Izohlar ham audit kabi to'g'ridan-to'g'ri jadvalga yoziladi (sync_records
        // RPC orqali EMAS). Yangi izoh qo'shish (INSERT): tizimga kirgan har
        // qanday foydalanuvchi qoldira oladi (Supabase RLS: comments_insert_authenticated).
        // Mavjud izohni tahrirlash/o'chirish esa upsert ichida UPDATE shoxobchasi
        // orqali amalga oshadi va faqat "editors" jadvalidagilarga ruxsat
        // etilgan (Supabase RLS: comments_update_editors — COMMENTS-EDIT-DELETE.sql).
        // O'chirish "soft delete": deleted_at ustuniga vaqt yoziladi, qator
        // jadvaldan olib tashlanmaydi (boshqa qurilmalarga tombstone sifatida
        // tarqalishi uchun).
        const commentPayload = batch.map(r=>({
          id:r.id, entity_type:r.data?.entityType||null, entity_id:r.data?.entityId||null,
          author_id:r.data?.authorId||null, author_email:r.data?.authorEmail||null,
          text:r.data?.text||'', created_at:r.data?.createdAt||r.updated_at,
          updated_at:r.data?.updatedAt||r.updated_at, deleted_at:r.deleted_at||null
        }));
        res = await apiFetch('/rest/v1/comments?on_conflict=id', {
          method:'POST',
          headers:{ 'Content-Type':'application/json', 'Prefer':'resolution=merge-duplicates,return=minimal' },
          body:JSON.stringify(commentPayload),
        }, true);
      }else{
        res = await apiFetch('/rest/v1/rpc/sync_records', {
          method:'POST',
          headers:{ 'Content-Type':'application/json' },
          body:JSON.stringify({ p_entity:entityType, p_records:payload }),
        }, true);
      }
      if(!res.ok){
        const text = await res.text().catch(()=>String(res.status));
        throw new Error('SYNC_PUSH_FAILED '+res.status+' '+text);
      }
      await markClean(batch);
      pushed += batch.length;
    }
    return { pushed, authRequired:false };
  }

  async function fetchTable(entityType, useUserToken=false){
    const table = TABLES[entityType];
    const select = entityType === 'audit'
      ? 'id,actor_id,actor_email,action,entity_type,entity_id,entity_label,old_data,new_data,reason,changes,created_at,deleted_at'
      : entityType === 'comment'
      ? 'id,entity_type,entity_id,author_id,author_email,text,created_at,updated_at,deleted_at'
      : 'id,data,updated_at,deleted_at';
    const res = await apiFetch(`/rest/v1/${table}?select=${select}`, { method:'GET' }, useUserToken);
    if(!res.ok){
      const text = await res.text().catch(()=>String(res.status));
      throw new Error('SYNC_PULL_FAILED '+res.status+' '+text);
    }
    const rows = await res.json();
    if(entityType === 'audit') return (rows || []).map(r=>({
      id:r.id, entity_type:'audit',
      data:{ id:r.id, actorId:r.actor_id, actorEmail:r.actor_email, action:r.action, entityType:r.entity_type, entityId:r.entity_id, entityLabel:r.entity_label, oldData:r.old_data, newData:r.new_data, reason:r.reason||'', changes:Array.isArray(r.changes)?r.changes:[], createdAt:r.created_at },
      updated_at:r.created_at, deleted_at:r.deleted_at||null, dirty:false
    }));
    if(entityType === 'comment') return (rows || []).map(r=>({
      id:r.id, entity_type:'comment',
      data:{ id:r.id, entityType:r.entity_type, entityId:r.entity_id, authorId:r.author_id, authorEmail:r.author_email, text:r.text||'', createdAt:r.created_at, updatedAt:r.updated_at||null },
      updated_at:r.updated_at||r.created_at, deleted_at:r.deleted_at||null, dirty:false
    }));
    return (rows || []).map(r=>({ ...r, entity_type:entityType, dirty:false }));
  }


  async function fetchRemoteRecords(){
    const [permits, shipments, comments] = await Promise.all([fetchTable('permit'), fetchTable('shipment'), fetchTable('comment')]);
    let audits = [];
    const session = await getSession(true);
    if(session && session.access_token){
      try{ audits = await fetchTable('audit', true); }catch(_){ audits = []; }
    }
    return permits.concat(shipments, comments, audits);
  }

  async function pullRemote(){
    const remote = await fetchRemoteRecords();
    const local = await getAllRecords();
    const merged = root.SyncCore.mergeRecordSets(local, remote);
    await putRecords(merged);
    return merged;
  }

  async function syncNow(force){
    if(syncPromise && !force) return syncPromise;
    syncPromise = (async()=>{
      if(!configured()){
        emitStatus('local','локальный режим · Supabase не подключён');
        return { configured:false };
      }
      if(!navigator.onLine){
        emitStatus('offline','офлайн · данные сохранены на устройстве');
        return { offline:true };
      }
      emitStatus('syncing','синхронизация…');
      try{
        let push = { pushed:0, authRequired:false };
        const legacyPending = !!(await getMeta('legacy_import_pending'));
        if(legacyPending){
          const remoteBeforePush = await fetchRemoteRecords();
          if(remoteBeforePush.length){
            // Another device already established the shared database.
            // Do not upload this browser's old private localStorage snapshot.
            await replaceAllRecords(remoteBeforePush);
            await delMeta('legacy_import_pending');
          }else{
            push = await pushDirty();
            if(!push.authRequired && push.pushed > 0) await delMeta('legacy_import_pending');
          }
        }else{
          push = await pushDirty();
        }
        await pullRemote();
        emitData();
        clearTimeout(retryTimer);
        retryAttempt = 0;
        const pending = (await dirtyRecords()).length;
        if(pending){
          emitStatus(push.authRequired ? 'auth' : 'pending', push.authRequired ? `онлайн · ${pending} лок. изменений ждут входа` : `онлайн · ${pending} изменений ждут синхронизации`, { pending });
        }else{
          emitStatus('synced','общий доступ · синхронизировано');
          await setMeta('last_sync_at', new Date().toISOString());
        }
        return { configured:true, pending };
      }catch(err){
        console.error(err);
        if(String(err && err.message).includes('AUTH_REQUIRED')) emitStatus('auth','онлайн · войдите для отправки изменений');
        else{
          emitStatus('error','ошибка синхронизации · данные сохранены локально');
          clearTimeout(retryTimer);
          retryAttempt = Math.min(retryAttempt + 1, 4);
          const delay = [5000, 10000, 20000, 30000][retryAttempt - 1] || 30000;
          retryTimer = setTimeout(()=>{ if(navigator.onLine) syncNow(false); }, delay);
        }
        return { error:err };
      }
    })();
    try{ return await syncPromise; }
    finally{ syncPromise = null; }
  }

  function scheduleSync(delay){
    clearTimeout(syncTimer);
    syncTimer = setTimeout(()=>syncNow(false), delay == null ? 800 : delay);
  }

  async function bootstrap(){
    const alreadyDone = await getMeta('bootstrap_v3_done');
    if(alreadyDone) return;

    const local = await getAllRecords();
    if(!configured() || !navigator.onLine){
      if(!local.length) await migrateLegacyIfNeeded();
      return; // Keep bootstrap open until we can inspect the shared database online.
    }

    const remote = await fetchRemoteRecords();
    const source = root.SyncCore.chooseBootstrapSource({
      remoteCount: remote.length,
      localCount: local.length,
      legacyCount: legacyCount(),
    });

    if(source === 'remote'){
      await replaceAllRecords(remote);
      await delMeta('legacy_import_pending');
    }else if(source === 'legacy'){
      await migrateLegacyIfNeeded();
    }
    // source === local keeps current IndexedDB cache; source === empty stays empty.
    await setMeta('bootstrap_v3_done', new Date().toISOString());
  }

  async function start(){
    await bootstrap();
    if('BroadcastChannel' in root){
      channel = new BroadcastChannel('permit-app-sync-v2');
      channel.onmessage = async (e)=>{
        if(e.data && e.data.type==='local-change') emitData();
      };
    }
    root.addEventListener('online', ()=>syncNow(true));
    root.addEventListener('offline', ()=>emitStatus('offline','офлайн · данные сохраняются на устройстве'));
    root.addEventListener('focus', ()=>syncNow(false));
    document.addEventListener('visibilitychange', ()=>{ if(!document.hidden) syncNow(false); });
    clearInterval(pollTimer);
    pollTimer = setInterval(()=>syncNow(false), 30000);
    return syncNow(true);
  }

  root.OfflineSync = {
    start,
    syncNow,
    scheduleSync,
    loadState,
    saveCollection,
    hasAnyRecords,
    configured,
    uploadPermitPdf,
    login,
    signup,
    logout,
    authInfo,
    isEditor,
    isContributor,
    onStatus(fn){ root.addEventListener(STATUS_EVENT, e=>fn(e.detail)); },
    onData(fn){ root.addEventListener(DATA_EVENT, fn); },
  };
})(window);
