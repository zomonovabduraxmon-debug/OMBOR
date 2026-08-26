(function(root, factory){
  const api = factory();
  if(typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.SyncCore = api;
})(typeof self !== 'undefined' ? self : this, function(){
  function jsonEqual(a,b){
    return JSON.stringify(a) === JSON.stringify(b);
  }

  function cloneRecord(r){
    return {
      id: r.id,
      entity_type: r.entity_type,
      data: r.data == null ? null : JSON.parse(JSON.stringify(r.data)),
      updated_at: r.updated_at,
      deleted_at: r.deleted_at || null,
      dirty: !!r.dirty,
    };
  }

  function diffCollection(existingRecords, items, entityType, nowIso){
    const existing = new Map(
      (existingRecords || [])
        .filter(r => r.entity_type === entityType)
        .map(r => [r.id, cloneRecord(r)])
    );
    const out = [];
    const seen = new Set();

    for(const item of (items || [])){
      if(!item || !item.id) continue;
      seen.add(item.id);
      const prev = existing.get(item.id);
      if(prev && !prev.deleted_at && jsonEqual(prev.data, item)){
        out.push(prev);
      }else{
        out.push({
          id: item.id,
          entity_type: entityType,
          data: JSON.parse(JSON.stringify(item)),
          updated_at: nowIso,
          deleted_at: null,
          dirty: true,
        });
      }
    }

    for(const prev of existing.values()){
      if(seen.has(prev.id)) continue;
      if(prev.deleted_at){
        out.push(prev);
      }else{
        out.push({
          ...prev,
          updated_at: nowIso,
          deleted_at: nowIso,
          dirty: true,
        });
      }
    }
    return out;
  }

  function ts(v){
    const n = Date.parse(v || '');
    return Number.isFinite(n) ? n : 0;
  }

  function chooseRecord(local, remote){
    if(!local) return { ...cloneRecord(remote), dirty:false };
    if(!remote) return cloneRecord(local);

    const lt = ts(local.updated_at);
    const rt = ts(remote.updated_at);
    if(lt > rt) return cloneRecord(local);
    if(rt > lt) return { ...cloneRecord(remote), dirty:false };

    if(local.deleted_at && !remote.deleted_at) return cloneRecord(local);
    if(remote.deleted_at && !local.deleted_at) return { ...cloneRecord(remote), dirty:false };
    return local.dirty ? cloneRecord(local) : { ...cloneRecord(remote), dirty:false };
  }

  function mergeRecordSets(localRecords, remoteRecords){
    const map = new Map();
    for(const r of (localRecords || [])) map.set(`${r.entity_type}:${r.id}`, cloneRecord(r));
    for(const r0 of (remoteRecords || [])){
      const r = { ...r0, dirty:false };
      const key = `${r.entity_type}:${r.id}`;
      map.set(key, chooseRecord(map.get(key), r));
    }
    return Array.from(map.values());
  }

  function recordsToCollection(records, entityType){
    return (records || [])
      .filter(r => r.entity_type === entityType && !r.deleted_at && r.data)
      .map(r => JSON.parse(JSON.stringify(r.data)));
  }


  function chooseBootstrapSource({remoteCount=0, localCount=0, legacyCount=0} = {}){
    if(Number(remoteCount) > 0) return 'remote';
    if(Number(localCount) > 0) return 'local';
    if(Number(legacyCount) > 0) return 'legacy';
    return 'empty';
  }

  function dashboardCategory(row){
    return Number(row && row.st && row.st.remQty || 0) > 0 ? 'accepted' : 'completed';
  }

  function buildDashboardView(inputRows, options){
    const opts = options || {};
    const filter = opts.filter || 'all';
    const sort = opts.sort || 'remaining-desc';
    let rows = (inputRows || []).slice();

    if(filter === 'accepted' || filter === 'completed') {
      rows = rows.filter(row => dashboardCategory(row) === filter);
    } else if(['ok','warn','finished','over'].includes(filter)) {
      rows = rows.filter(row => row && row.st && row.st.level === filter);
    }

    const remQty = row => Number(row && row.st && row.st.remQty || 0);
    const date = row => String(row && row.permit && row.permit.date || '');
    if(sort === 'remaining-asc') rows.sort((a,b) => remQty(a) - remQty(b));
    else if(sort === 'date-desc') rows.sort((a,b) => date(b).localeCompare(date(a)));
    else if(sort === 'date-asc') rows.sort((a,b) => date(a).localeCompare(date(b)));
    else rows.sort((a,b) => remQty(b) - remQty(a));

    const totalQty = rows.reduce((sum,row) => sum + Math.max(0, remQty(row)), 0);
    const totalWeight = rows.reduce((sum,row) => sum + Math.max(0, Number(row && row.st && row.st.remWeight || 0)), 0);

    return { rows, totalQty, totalWeight };
  }

  return { diffCollection, mergeRecordSets, recordsToCollection, chooseBootstrapSource, dashboardCategory, buildDashboardView };
});
