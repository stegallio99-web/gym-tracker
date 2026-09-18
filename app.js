'use strict';

// ===== EXERCISE CATALOG (100 esercizi per gruppo muscolare) =====
const EXERCISE_CATALOG = [
  { group: 'Petto', exercises: [
    { id: 'cat_001', name: 'Panca piana con bilanciere' },
    { id: 'cat_002', name: 'Panca inclinata con bilanciere' },
    { id: 'cat_003', name: 'Panca inclinata con manubri' },
    { id: 'cat_004', name: 'Panca piana con manubri' },
    { id: 'cat_005', name: 'Panca declinata' },
    { id: 'cat_006', name: 'Croci ai cavi' },
    { id: 'cat_007', name: 'Croci su panca con manubri' },
    { id: 'cat_008', name: 'Pectoral machine (peck deck)' },
    { id: 'cat_009', name: 'Chest press alla macchina' },
    { id: 'cat_010', name: 'Dip alle parallele con busto inclinato' },
    { id: 'cat_011', name: 'Piegamenti sulle braccia (push-up)' },
    { id: 'cat_012', name: 'Pullover con manubrio' },
  ]},
  { group: 'Dorso', exercises: [
    { id: 'cat_013', name: 'Trazioni alla sbarra presa prona' },
    { id: 'cat_014', name: 'Trazioni presa supina (chin-up)' },
    { id: 'cat_015', name: 'Trazioni presa neutra' },
    { id: 'cat_016', name: 'Lat machine presa larga' },
    { id: 'cat_017', name: 'Lat machine presa neutra o inversa' },
    { id: 'cat_018', name: 'Pulldown a braccia tese (straight-arm)' },
    { id: 'cat_019', name: 'Rematore con bilanciere' },
    { id: 'cat_020', name: 'Rematore con manubrio a un braccio' },
    { id: 'cat_021', name: 'Rematore con bilanciere presa supina' },
    { id: 'cat_022', name: 'Pulley basso (seated cable row)' },
    { id: 'cat_023', name: 'Rematore con appoggio al petto (chest-supported row)' },
    { id: 'cat_024', name: 'T-bar row' },
    { id: 'cat_025', name: 'Rematore inverso (inverted row)' },
    { id: 'cat_026', name: 'Rack pull' },
  ]},
  { group: 'Spalle', exercises: [
    { id: 'cat_027', name: 'Lento avanti con bilanciere (military press)' },
    { id: 'cat_028', name: 'Overhead press con manubri' },
    { id: 'cat_029', name: 'Arnold press' },
    { id: 'cat_030', name: 'Push press' },
    { id: 'cat_031', name: 'Alzate laterali con manubri' },
    { id: 'cat_032', name: 'Alzate laterali ai cavi' },
    { id: 'cat_033', name: 'Alzate laterali alla macchina' },
    { id: 'cat_034', name: 'Alzate frontali' },
    { id: 'cat_035', name: 'Alzate a 90° con manubri (rear delt fly)' },
    { id: 'cat_036', name: 'Reverse pectoral machine' },
    { id: 'cat_037', name: 'Face pull ai cavi' },
    { id: 'cat_038', name: 'Scrollate (shrug)' },
  ]},
  { group: 'Bicipiti', exercises: [
    { id: 'cat_039', name: 'Curl con bilanciere' },
    { id: 'cat_040', name: 'Curl con bilanciere EZ' },
    { id: 'cat_041', name: 'Curl alternato con manubri' },
    { id: 'cat_042', name: 'Curl a martello' },
    { id: 'cat_043', name: 'Curl su panca inclinata' },
    { id: 'cat_044', name: 'Curl concentrato' },
    { id: 'cat_045', name: 'Panca Scott (preacher curl)' },
    { id: 'cat_046', name: 'Curl ai cavi' },
    { id: 'cat_047', name: 'Spider curl' },
  ]},
  { group: 'Tricipiti', exercises: [
    { id: 'cat_048', name: 'Push-down ai cavi con corda' },
    { id: 'cat_049', name: 'Push-down ai cavi alla sbarra' },
    { id: 'cat_050', name: 'French press / skull crusher' },
    { id: 'cat_051', name: 'Estensioni overhead ai cavi' },
    { id: 'cat_052', name: 'Estensioni overhead con manubrio' },
    { id: 'cat_053', name: 'Dip alle parallele con busto verticale' },
    { id: 'cat_054', name: 'Panca a presa stretta' },
    { id: 'cat_055', name: 'Kickback con manubrio' },
    { id: 'cat_056', name: 'Dip alla panca (bench dip)' },
  ]},
  { group: 'Avambracci e presa', exercises: [
    { id: 'cat_057', name: 'Curl ai polsi' },
    { id: 'cat_058', name: 'Curl ai polsi inverso' },
    { id: 'cat_059', name: 'Curl inverso con bilanciere' },
    { id: 'cat_060', name: 'Appensione alla sbarra / farmer walk' },
  ]},
  { group: 'Quadricipiti', exercises: [
    { id: 'cat_061', name: 'Back squat con bilanciere' },
    { id: 'cat_062', name: 'Front squat' },
    { id: 'cat_063', name: 'Goblet squat' },
    { id: 'cat_064', name: 'Hack squat' },
    { id: 'cat_065', name: 'Leg press' },
    { id: 'cat_066', name: 'Leg extension' },
    { id: 'cat_067', name: 'Affondi con manubri' },
    { id: 'cat_068', name: 'Affondi camminati' },
    { id: 'cat_069', name: 'Affondi inversi' },
    { id: 'cat_070', name: 'Bulgarian split squat' },
    { id: 'cat_071', name: 'Step-up su rialzo' },
    { id: 'cat_072', name: 'Squat al multipower (Smith machine)' },
  ]},
  { group: 'Ischiocrurali', exercises: [
    { id: 'cat_073', name: 'Stacco da terra convenzionale' },
    { id: 'cat_074', name: 'Stacco sumo' },
    { id: 'cat_075', name: 'Stacco rumeno (RDL)' },
    { id: 'cat_076', name: 'Stacco a gambe semitese' },
    { id: 'cat_077', name: 'Stacco con trap bar' },
    { id: 'cat_078', name: 'Leg curl seduto' },
    { id: 'cat_079', name: 'Leg curl prono' },
    { id: 'cat_080', name: 'Nordic curl' },
  ]},
  { group: 'Glutei e adduttori', exercises: [
    { id: 'cat_081', name: 'Hip thrust con bilanciere' },
    { id: 'cat_082', name: 'Ponte per glutei a terra' },
    { id: 'cat_083', name: 'Cable pull-through' },
    { id: 'cat_084', name: 'Back extension a 45°' },
    { id: 'cat_085', name: 'Good morning' },
    { id: 'cat_086', name: 'Kickback ai cavi' },
    { id: 'cat_087', name: 'Abduzioni alla macchina' },
    { id: 'cat_088', name: 'Adduzioni alla macchina' },
  ]},
  { group: 'Polpacci', exercises: [
    { id: 'cat_089', name: 'Calf raise in piedi' },
    { id: 'cat_090', name: 'Calf raise seduto' },
    { id: 'cat_091', name: 'Calf raise alla leg press' },
    { id: 'cat_092', name: 'Calf raise a una gamba con manubrio' },
  ]},
  { group: 'Core', exercises: [
    { id: 'cat_093', name: 'Plank' },
    { id: 'cat_094', name: 'Side plank' },
    { id: 'cat_095', name: 'Crunch a terra' },
    { id: 'cat_096', name: 'Crunch ai cavi in ginocchio' },
    { id: 'cat_097', name: 'Hanging knee raise' },
    { id: 'cat_098', name: 'Russian twist' },
    { id: 'cat_099', name: 'Ab wheel rollout' },
    { id: 'cat_100', name: 'Pallof press ai cavi' },
  ]},
];

// ===== STATE =====
const state = {
  config: null,
  logs: [],
  currentSession: null,
  activeExercise: null,       // exercise object currently open in screen-exercise
  allCurrentSets: {},         // {exerciseId: [{kg, reps}]} for entire workout
  currentWeek: 1,
  restTimer: null,
  restEnd: 0,
  restExerciseId: null,
  modalContext: null,
  freeWorkout: [],
  historyBackScreen: 'screen-workout',
  pickerContext: 'free',  // 'free' | 'session'
};

// ===== GITHUB API =====
const gh = {
  get token() { return localStorage.getItem('gh_token') || ''; },
  get repo()  { return localStorage.getItem('gh_repo') || ''; },

  async request(method, path, body) {
    const res = await fetch(`https://api.github.com/repos/${this.repo}/contents/${path}`, {
      method,
      headers: {
        Authorization: `token ${this.token}`,
        'Content-Type': 'application/json',
        Accept: 'application/vnd.github+json',
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) throw new Error(`GitHub ${res.status}: ${await res.text()}`);
    return res.json();
  },

  async getFile(path) {
    try {
      const data = await this.request('GET', path);
      return { content: JSON.parse(atob(data.content.replace(/\n/g, ''))), sha: data.sha };
    } catch (e) {
      if (e.message.includes('404')) return null;
      throw e;
    }
  },

  async putFile(path, content, sha) {
    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(content, null, 2))));
    return this.request('PUT', path, {
      message: `log: ${path}`,
      content: encoded,
      ...(sha ? { sha } : {}),
    });
  },
};

// ===== STORAGE =====
const storage = {
  saveLogs(logs) { localStorage.setItem('gym_logs', JSON.stringify(logs)); },
  loadLogs() {
    try { return JSON.parse(localStorage.getItem('gym_logs') || '[]'); } catch { return []; }
  },
  saveWeek(w) { localStorage.setItem('gym_week', w); },
  loadWeek() { return parseInt(localStorage.getItem('gym_week') || '1'); },
};

// ===== INIT =====
async function init() {
  state.logs = storage.loadLogs();
  const res = await fetch('config.json');
  state.config = await res.json();
  renderHome();
  setupEventListeners();
  if (gh.token && gh.repo) syncLogsFromGitHub();
}

// ===== HOME =====
function renderHome() {
  const grid = document.getElementById('session-grid');
  grid.innerHTML = '';
  state.config.sessions.forEach(session => {
    const last = getLastSession(session.id);
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'session-card';
    card.style.setProperty('--card-color', session.color);
    const dayLabel = session.name.replace('Day ', 'D').replace(/ —.*/, '');
    const typeLabel = session.name.split('—')[1]?.trim() || '';
    card.innerHTML = `
      <div class="session-card-name">${dayLabel} — ${typeLabel}</div>
      <div class="session-card-meta">${session.exercises.length} esercizi</div>
      ${last ? `<div class="session-card-last">${formatDateShort(last.date)}</div>` : ''}
    `;
    card.addEventListener('click', () => startSession(session));
    grid.appendChild(card);
  });
}

// ===== SESSION — EXERCISE LIST =====
function startSession(session) {
  state.currentSession = session;
  state.activeExercise = null;
  // Preserve existing sets if resuming same session today
  if (!state.allCurrentSets._sessionId || state.allCurrentSets._sessionId !== session.id) {
    state.allCurrentSets = { _sessionId: session.id };
    session.exercises.forEach(ex => { state.allCurrentSets[ex.id] = []; });
  }
  document.getElementById('workout-title').textContent = session.name;
  renderExerciseList();
  showScreen('screen-workout');
}

function renderExerciseList() {
  const list = document.getElementById('ex-list');
  list.innerHTML = '';

  state.currentSession.exercises.forEach(ex => {
    const sets = state.allCurrentSets[ex.id] || [];
    const lastLog = getLastExerciseLog(ex.id);
    const done = sets.length > 0;

    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'ex-list-item' + (done ? ' done' : '');

    // Check circle: shows sets done / target sets
    const checkContent = done ? `${sets.length}/${ex.sets}` : ex.sets;

    // Last weight summary
    let lastStr = '';
    if (lastLog) {
      const maxKg = Math.max(...lastLog.sets.map(s => s.kg));
      lastStr = `<div class="ex-list-last">Ultima: ${lastLog.sets.map(s => `${s.kg}kg×${s.reps}`).join(' · ')}</div>`;
    } else {
      lastStr = `<div class="ex-list-last-empty">Nessun dato precedente</div>`;
    }

    const repsStr = ex.reps_min === ex.reps_max
      ? `${ex.reps_min} rip`
      : (ex.reps_min && ex.reps_max ? `${ex.reps_min}-${ex.reps_max} rip` : `${ex.duration_seconds}s`);
    const supersetTag = ex.superset_label ? `<span class="superset-badge">${ex.superset_label}</span>` : '';

    item.innerHTML = `
      <div class="ex-list-check">${checkContent}</div>
      <div class="ex-list-body">
        <div class="ex-list-name">${supersetTag}${ex.name_it}</div>
        <div class="ex-list-target">${ex.sets} × ${repsStr} · ${formatRest(ex.rest_seconds)}</div>
        ${lastStr}
      </div>
      <div class="ex-list-arrow">›</div>
    `;
    item.addEventListener('click', () => openExercise(ex));
    list.appendChild(item);
  });

  updateProgressBar();
}

function updateProgressBar() {
  const total = state.currentSession.exercises.length;
  const done = state.currentSession.exercises.filter(ex =>
    (state.allCurrentSets[ex.id] || []).length > 0
  ).length;
  const pct = total > 0 ? (done / total) * 100 : 0;
  document.getElementById('session-progress-fill').style.width = pct + '%';
}

// ===== EXERCISE DETAIL =====
function openExercise(ex) {
  state.activeExercise = ex;
  clearInterval(state.restTimer);
  document.getElementById('rest-timer').hidden = true;

  // Header
  const supersetTag = ex.superset_label ? `<span class="superset-badge">${ex.superset_label}</span>` : '';
  document.getElementById('ex-detail-name').innerHTML = `${supersetTag}${ex.name_it}`;

  // Target line
  const repsStr = ex.reps_min === ex.reps_max
    ? `${ex.reps_min} rip`
    : (ex.reps_min && ex.reps_max ? `${ex.reps_min}-${ex.reps_max} rip` : `${ex.duration_seconds}s`);
  const rir = getRIR(ex);
  const rirStr = rir !== null ? ` · RIR ${rir}` : '';
  const failStr = ex.last_set_failure ? ' · ultima a cedimento' : '';
  const optStr = ex.optional ? ' · opzionale' : '';
  document.getElementById('ex-detail-target').textContent =
    `${ex.sets} serie × ${repsStr} · riposo ${formatRest(ex.rest_seconds)}${rirStr}${failStr}${optStr}`;

  document.getElementById('ex-detail-note').textContent = ex.note || '';

  renderLastSessionDetail(ex);
  renderDetailSetsLog(ex);

  showScreen('screen-exercise');
}

function renderLastSessionDetail(ex) {
  const container = document.getElementById('ex-detail-last');
  const lastLog = getLastExerciseLog(ex.id);
  if (!lastLog) {
    container.innerHTML = `<div class="last-session-title">Ultima sessione</div><div class="last-session-empty">Nessun dato precedente</div>`;
    return;
  }
  const chips = lastLog.sets.map(s =>
    `<span class="last-set-chip">${s.kg}&nbsp;kg × ${s.reps}</span>`
  ).join('');
  container.innerHTML = `
    <div class="last-session-title">Ultima · ${formatDateShort(lastLog.date)}</div>
    <div class="last-session-row">${chips}</div>
  `;
}

function renderDetailSetsLog(ex) {
  const container = document.getElementById('ex-detail-sets-log');
  container.innerHTML = '';
  const sets = state.allCurrentSets[ex.id] || [];
  sets.forEach((set, i) => {
    const row = document.createElement('div');
    row.className = 'set-row done';
    row.innerHTML = `
      <div class="set-num">S${i + 1}</div>
      <div class="set-values">
        <span class="set-chip weight">${set.kg} kg</span>
        <span class="set-chip">${set.reps} rip</span>
      </div>
      <button class="set-edit-btn" data-index="${i}">✏️</button>
    `;
    row.querySelector('.set-edit-btn').addEventListener('click', () => openSetModal(ex.id, i));
    container.appendChild(row);
  });
}

// ===== SET MODAL =====
function openSetModal(exerciseId, editIndex = null) {
  const sets = state.allCurrentSets[exerciseId] || [];
  const lastLog = getLastExerciseLog(exerciseId);

  let prefillKg, prefillReps;
  if (editIndex !== null) {
    // Editing existing set
    prefillKg = sets[editIndex].kg;
    prefillReps = sets[editIndex].reps;
  } else if (sets.length > 0) {
    // Use last set logged today
    prefillKg = sets[sets.length - 1].kg;
    prefillReps = sets[sets.length - 1].reps;
  } else if (lastLog?.sets?.length) {
    // Use same-index set from last session, or first set
    const sameSet = lastLog.sets[sets.length] ?? lastLog.sets[0];
    prefillKg = sameSet.kg;
    prefillReps = sameSet.reps;
  } else {
    prefillKg = 0;
    prefillReps = 8;
  }

  document.getElementById('modal-kg').value = prefillKg;
  document.getElementById('modal-reps').value = prefillReps;
  state.modalContext = { exerciseId, editIndex };

  hideAllModals();
  document.getElementById('modal-set').classList.remove('hidden');
  document.getElementById('modal-overlay').classList.remove('hidden');
}

function confirmSet() {
  const kg = parseFloat(document.getElementById('modal-kg').value) || 0;
  const reps = parseInt(document.getElementById('modal-reps').value) || 0;
  const { exerciseId, editIndex } = state.modalContext;

  if (!state.allCurrentSets[exerciseId]) state.allCurrentSets[exerciseId] = [];
  const sets = state.allCurrentSets[exerciseId];

  if (editIndex !== null) {
    sets[editIndex] = { kg, reps };
  } else {
    sets.push({ kg, reps });
    const ex = state.currentSession
      ? state.currentSession.exercises.find(e => e.id === exerciseId)
      : null;
    if (ex && ex.rest_seconds > 0) startRestTimer(ex.rest_seconds, exerciseId);
  }

  closeModal();

  // Refresh whichever view is active
  if (state.activeExercise?.id === exerciseId) {
    renderDetailSetsLog(state.activeExercise);
  }
  // Refresh list in background so progress bar updates
  if (state.currentSession) renderExerciseList();
}

// ===== REST TIMER =====
function syncRestSelects(seconds) {
  const minSel = document.getElementById('rest-edit-min');
  const secSel = document.getElementById('rest-edit-sec');
  if (minSel && secSel) {
    minSel.value = Math.floor(seconds / 60);
    secSel.value = seconds % 60;
  }
}

function startRestTimer(seconds) {
  const saved = localStorage.getItem('rest_default_seconds');
  const actual = saved ? Number(saved) : seconds;
  clearInterval(state.restTimer);
  state.restEnd = Date.now() + actual * 1000;
  const timerEl = document.getElementById('rest-timer');
  timerEl.hidden = false;
  syncRestSelects(actual);
  updateRestDisplay();

  state.restTimer = setInterval(() => {
    const remaining = Math.ceil((state.restEnd - Date.now()) / 1000);
    if (remaining <= 0) {
      clearInterval(state.restTimer);
      timerEl.hidden = true;
      showToast('Riposo finito!', 'success');
    } else {
      updateRestDisplay();
    }
  }, 500);
}

function updateRestDisplay() {
  const remaining = Math.max(0, Math.ceil((state.restEnd - Date.now()) / 1000));
  const m = Math.floor(remaining / 60);
  const s = remaining % 60;
  document.getElementById('rest-countdown').textContent = `${m}:${s.toString().padStart(2, '0')}`;
}

// ===== FINISH WORKOUT =====
function finishWorkout() {
  const totalSets = Object.entries(state.allCurrentSets)
    .filter(([k]) => k !== '_sessionId')
    .reduce((n, [, sets]) => n + sets.length, 0);
  document.getElementById('modal-finish-text').textContent =
    `Hai loggato ${totalSets} serie totali. Salvare su GitHub?`;
  hideAllModals();
  document.getElementById('modal-confirm-finish').classList.remove('hidden');
  document.getElementById('modal-overlay').classList.remove('hidden');
}

async function confirmFinishWorkout() {
  closeModal();
  const today = new Date().toISOString().slice(0, 10);
  const entry = {
    date: today,
    sessionId: state.currentSession.id,
    sessionName: state.currentSession.name,
    week: state.currentWeek,
    exercises: Object.entries(state.allCurrentSets)
      .filter(([k, sets]) => k !== '_sessionId' && sets.length > 0)
      .map(([exerciseId, sets]) => ({ exerciseId, sets })),
  };
  state.logs.unshift(entry);
  storage.saveLogs(state.logs);
  state.allCurrentSets = {};
  renderHome();
  showScreen('screen-home');
  showToast('Allenamento salvato!', 'success');

  if (gh.token && gh.repo) {
    try {
      await saveLogToGitHub(entry);
      showToast('Sincronizzato con GitHub ✓', 'success');
    } catch (e) {
      showToast('Errore GitHub: ' + e.message, 'error');
    }
  }
}

// ===== GITHUB SYNC =====
async function saveLogToGitHub(entry) {
  const path = `logs/${entry.date}-${entry.sessionId}.json`;
  const existing = await gh.getFile(path);
  await gh.putFile(path, entry, existing?.sha);
}

async function syncLogsFromGitHub() {
  try {
    const res = await fetch(`https://api.github.com/repos/${gh.repo}/contents/logs`, {
      headers: { Authorization: `token ${gh.token}`, Accept: 'application/vnd.github+json' },
    });
    if (!res.ok) return;
    const files = await res.json();
    const jsonFiles = files.filter(f => f.name.endsWith('.json'));
    const remoteLogs = [];
    for (const file of jsonFiles) {
      const data = await gh.getFile(`logs/${file.name}`);
      if (data) remoteLogs.push(data.content);
    }
    const merged = [...state.logs];
    for (const remote of remoteLogs) {
      const exists = merged.find(l => l.date === remote.date && l.sessionId === remote.sessionId);
      if (!exists) merged.push(remote);
    }
    merged.sort((a, b) => b.date.localeCompare(a.date));
    state.logs = merged;
    storage.saveLogs(merged);
    renderHome();
  } catch { /* silent */ }
}

// ===== FREE WORKOUT =====
function startFreeWorkout() {
  state.freeWorkout = [];
  document.getElementById('free-log').innerHTML = '';
  showScreen('screen-free');
}

function openExercisePicker(context = 'free') {
  state.pickerContext = context;
  document.getElementById('picker-search').value = '';
  renderCatalogPicker('');
  document.getElementById('picker-search').oninput = e => {
    renderCatalogPicker(e.target.value.toLowerCase().trim());
  };
  hideAllModals();
  document.getElementById('modal-picker').classList.remove('hidden');
  document.getElementById('modal-overlay').classList.remove('hidden');
}

function renderCatalogPicker(query) {
  const list = document.getElementById('picker-list');
  list.innerHTML = '';

  if (query) {
    // Flat filtered list across all groups
    EXERCISE_CATALOG.forEach(group => {
      const matches = group.exercises.filter(ex => ex.name.toLowerCase().includes(query));
      if (!matches.length) return;
      const header = document.createElement('div');
      header.className = 'picker-group-header';
      header.textContent = group.group;
      list.appendChild(header);
      matches.forEach(ex => appendCatalogItem(list, ex));
    });
  } else {
    // Grouped with headers
    EXERCISE_CATALOG.forEach(group => {
      const header = document.createElement('div');
      header.className = 'picker-group-header';
      header.textContent = `${group.group} (${group.exercises.length})`;
      list.appendChild(header);
      group.exercises.forEach(ex => appendCatalogItem(list, ex));
    });
  }
}

function appendCatalogItem(list, catEx) {
  const lastLog = getLastExerciseLog(catEx.id);
  const lastStr = lastLog
    ? lastLog.sets.map(s => `${s.kg}kg×${s.reps}`).join(' · ')
    : '';
  const item = document.createElement('button');
  item.type = 'button';
  item.className = 'picker-item';
  item.innerHTML = `
    <div class="picker-item-name">${catEx.name}</div>
    ${lastStr ? `<div class="picker-item-day">${lastStr}</div>` : ''}
  `;
  item.addEventListener('click', () => {
    if (state.pickerContext === 'session') {
      addExerciseToSession(catEx);
    } else {
      addFreeExercise(catEx);
    }
    closeModal();
  });
  list.appendChild(item);
}

function addExerciseToSession(catEx) {
  const sessionEx = {
    id: catEx.id,
    name_it: catEx.name,
    name_en: catEx.name,
    sets: 3,
    reps_min: 8,
    reps_max: 12,
    rest_seconds: 120,
    rir_week3: null,
    optional: false,
    superset_label: null,
    note: '',
    last_set_failure: false,
  };
  state.currentSession.exercises.push(sessionEx);
  state.allCurrentSets[sessionEx.id] = [];
  renderExerciseList();
  showToast(`${catEx.name} aggiunto`, 'success');
}

function addFreeExercise(ex) {
  const name = ex.name_it || ex.name || ex.id;
  state.freeWorkout.push({ exerciseId: ex.id, name, sets: [] });
  renderFreeWorkout();
}

function renderFreeWorkout() {
  const container = document.getElementById('free-log');
  container.innerHTML = '';
  state.freeWorkout.forEach((entry, idx) => {
    const block = document.createElement('div');
    block.className = 'free-exercise-block';
    const chips = entry.sets.map(s => `<span class="last-set-chip">${s.kg}kg × ${s.reps}</span>`).join('');
    block.innerHTML = `
      <div class="free-exercise-title">${entry.name}</div>
      <div class="last-session-row" style="margin-bottom:8px">${chips || '<span style="color:var(--text2);font-size:.8rem">Nessuna serie</span>'}</div>
      <button class="add-set-btn" data-idx="${idx}">+ Serie</button>
    `;
    block.querySelector('.add-set-btn').addEventListener('click', () => {
      const lastKg = entry.sets.at(-1)?.kg ?? getLastExerciseLog(entry.exerciseId)?.sets?.[0]?.kg ?? 0;
      const lastReps = entry.sets.at(-1)?.reps ?? 8;
      document.getElementById('modal-kg').value = lastKg;
      document.getElementById('modal-reps').value = lastReps;
      state.modalContext = { freeIdx: idx };
      hideAllModals();
      document.getElementById('modal-set').classList.remove('hidden');
      document.getElementById('modal-overlay').classList.remove('hidden');
    });
    container.appendChild(block);
  });
}

async function finishFreeWorkout() {
  const today = new Date().toISOString().slice(0, 10);
  const entry = {
    date: today,
    sessionId: 'free',
    sessionName: 'Allenamento libero',
    week: state.currentWeek,
    exercises: state.freeWorkout.filter(e => e.sets.length > 0)
      .map(e => ({ exerciseId: e.exerciseId, sets: e.sets })),
  };
  state.logs.unshift(entry);
  storage.saveLogs(state.logs);
  renderHome();
  showScreen('screen-home');
  showToast('Allenamento libero salvato!', 'success');
  if (gh.token && gh.repo) {
    try { await saveLogToGitHub(entry); } catch { /* silent */ }
  }
}

// ===== SHARE / STRAVA TEXT =====
function generateShareText() {
  if (!state.currentSession) return '';
  const lines = [];
  for (const ex of state.currentSession.exercises) {
    const logged = (state.allCurrentSets[ex.id] || []).filter(s => s.reps > 0);

    let setsCount, repsStr;
    if (logged.length > 0) {
      setsCount = logged.length;
      const repsList = logged.map(s => s.reps);
      const allSame = repsList.every(r => r === repsList[0]);
      if (allSame) {
        repsStr = `${repsList[0]}`;
      } else {
        const sorted = [...repsList].sort((a, b) => a - b);
        const mid = Math.floor(sorted.length / 2);
        const median = sorted.length % 2 !== 0
          ? sorted[mid]
          : Math.round((sorted[mid - 1] + sorted[mid]) / 2);
        repsStr = `${median}`;
      }
    } else {
      setsCount = ex.sets || 3;
      if (ex.duration_seconds) {
        repsStr = `${ex.duration_seconds}s`;
      } else {
        const min = ex.reps_min || 8;
        const max = ex.reps_max || min;
        repsStr = `${min === max ? min : Math.round((min + max) / 2)}`;
      }
    }

    lines.push(`${ex.name_it} ${setsCount} x ${repsStr} reps`);
  }
  return lines.join('\n');
}

function openShareModal() {
  const text = generateShareText();
  document.getElementById('share-text').value = text;
  hideAllModals();
  document.getElementById('modal-share').classList.remove('hidden');
  document.getElementById('modal-overlay').classList.remove('hidden');
}

// ===== STORICO ESERCIZI =====
function renderStoricoScreen() {
  const container = document.getElementById('storico-list');
  container.innerHTML = '';

  const allExercises = state.config.sessions.flatMap(s =>
    s.exercises.map(ex => ({ ...ex, sessionName: s.name, sessionColor: s.color }))
  );

  let currentQuery = '';

  function renderItems(query) {
    container.innerHTML = '';
    const filtered = query
      ? allExercises.filter(ex =>
          ex.name_it.toLowerCase().includes(query) ||
          ex.name_en.toLowerCase().includes(query))
      : null;

    const grouped = filtered
      ? [{ name: 'Risultati', color: '#d4a853', exercises: filtered }]
      : state.config.sessions.map(s => ({
          name: s.name,
          color: s.color,
          exercises: s.exercises,
        }));

    grouped.forEach(group => {
      const groupEl = document.createElement('div');
      groupEl.className = 'storico-group';

      const title = document.createElement('div');
      title.className = 'storico-group-title';
      title.style.color = group.color;
      title.textContent = group.name;
      groupEl.appendChild(title);

      group.exercises.forEach(ex => {
        const lastLog = getLastExerciseLog(ex.id);
        const allLogs = getExerciseLogs(ex.id);
        const maxEver = allLogs.length
          ? Math.max(...allLogs.flatMap(l => l.sets.map(s => s.kg)))
          : null;

        const item = document.createElement('button');
        item.type = 'button';
        item.className = 'storico-item';

        let lastStr = '';
        if (lastLog) {
          lastStr = `<div class="storico-item-last">${lastLog.sets.map(s => `${s.kg}kg×${s.reps}`).join(' · ')} · ${formatDateShort(lastLog.date)}</div>`;
        } else {
          lastStr = `<div class="storico-no-data">Nessun dato registrato</div>`;
        }

        const maxStr = maxEver !== null
          ? `<span style="color:var(--accent)">Max ${maxEver}kg</span> · ` : '';

        item.innerHTML = `
          <div class="storico-item-body">
            <div class="storico-item-name">${ex.name_it}</div>
            <div class="storico-item-meta">${maxStr}${allLogs.length} sessioni</div>
            ${lastStr}
          </div>
          <div class="storico-item-arrow">›</div>
        `;
        item.addEventListener('click', () => {
          showExerciseHistory(ex.id, 'screen-storico');
        });
        groupEl.appendChild(item);
      });

      container.appendChild(groupEl);
    });
  }

  renderItems('');

  const searchInput = document.getElementById('storico-search');
  searchInput.value = '';
  searchInput.oninput = e => renderItems(e.target.value.toLowerCase().trim());

  showScreen('screen-storico');
}

// ===== HISTORY / PROGRESSIONE =====
function showExerciseHistory(exerciseId, backScreen) {
  state.historyBackScreen = backScreen || 'screen-storico';
  const allExercises = state.config.sessions.flatMap(s => s.exercises);
  const configEx = allExercises.find(e => e.id === exerciseId);
  const catEx = configEx ? null : EXERCISE_CATALOG.flatMap(g => g.exercises).find(e => e.id === exerciseId);
  const ex = configEx || (catEx ? { ...catEx, name_it: catEx.name } : null);
  if (!ex) return;

  const logs = getExerciseLogs(exerciseId);
  document.getElementById('history-title').textContent = ex.name_it;
  const content = document.getElementById('history-content');
  content.innerHTML = '';

  if (logs.length === 0) {
    content.innerHTML = '<p style="color:var(--text2);padding:16px">Nessun dato registrato per questo esercizio.</p>';
    showScreen('screen-history');
    return;
  }

  // Chart container with tabs (peso max / volume)
  const maxEver = Math.max(...logs.flatMap(l => l.sets.map(s => s.kg)));
  const chartDiv = document.createElement('div');
  chartDiv.className = 'chart-container';
  chartDiv.innerHTML = `
    <div class="chart-header">
      <div class="chart-title">Progressione</div>
      <div class="chart-max-label">Max: ${maxEver} kg</div>
    </div>
    <div class="chart-tabs">
      <button class="chart-tab active" data-mode="max">Peso max</button>
      <button class="chart-tab" data-mode="avg">Peso medio</button>
      <button class="chart-tab" data-mode="volume">Volume</button>
    </div>
    <canvas class="chart-canvas" id="prog-chart"></canvas>
  `;
  content.appendChild(chartDiv);

  // Log entries
  logs.forEach(log => {
    const volume = log.sets.reduce((v, s) => v + s.kg * s.reps, 0);
    const div = document.createElement('div');
    div.className = 'log-entry';
    const chips = log.sets.map(s => `<span class="last-set-chip">${s.kg}kg×${s.reps}</span>`).join('');
    div.innerHTML = `
      <div class="log-entry-date">${formatDateFull(log.date)}</div>
      <div class="log-entry-sets">${chips}</div>
      <div class="log-entry-volume">Volume: ${volume.toLocaleString('it-IT')} kg totali</div>
    `;
    content.appendChild(div);
  });

  let chartMode = 'max';

  function redraw() {
    requestAnimationFrame(() => drawChart(logs, chartMode));
  }

  chartDiv.querySelectorAll('.chart-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      chartDiv.querySelectorAll('.chart-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      chartMode = tab.dataset.mode;
      redraw();
    });
  });

  showScreen('screen-history');
  requestAnimationFrame(redraw);
}

function drawChart(logs, mode = 'max') {
  const canvas = document.getElementById('prog-chart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);
  const W = rect.width, H = rect.height;

  const points = logs.slice().reverse().map(log => {
    const kgs = log.sets.map(s => s.kg);
    const val = mode === 'max'
      ? Math.max(...kgs)
      : mode === 'avg'
        ? Math.round((kgs.reduce((a, b) => a + b, 0) / kgs.length) * 10) / 10
        : log.sets.reduce((v, s) => v + s.kg * s.reps, 0);
    return { date: log.date.slice(5), val };
  });
  if (!points.length) return;

  const unit = mode === 'volume' ? '' : 'kg';
  const vals = points.map(p => p.val);
  const rawMin = Math.min(...vals);
  const rawMax = Math.max(...vals);
  const spread = rawMax - rawMin || 1;
  const pad = { top: 28, bottom: 30, left: 38, right: 12 };
  const plotW = W - pad.left - pad.right;
  const plotH = H - pad.top - pad.bottom;
  const yMin = rawMin - spread * 0.15;
  const yMax = rawMax + spread * 0.25;

  const toX = i => pad.left + (i / Math.max(points.length - 1, 1)) * plotW;
  const toY = v => pad.top + plotH - ((v - yMin) / (yMax - yMin)) * plotH;

  ctx.clearRect(0, 0, W, H);

  // Grid lines
  const gridCount = 4;
  ctx.font = `${10}px -apple-system, sans-serif`;
  ctx.textAlign = 'right';
  for (let i = 0; i <= gridCount; i++) {
    const v = yMin + (yMax - yMin) * (i / gridCount);
    const y = toY(v);
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(W - pad.right, y);
    ctx.stroke();
    ctx.fillStyle = '#606060';
    const label = mode === 'volume' ? Math.round(v).toLocaleString('it-IT') : Math.round(v * 10) / 10;
    ctx.fillText(label, pad.left - 4, y + 4);
  }

  // Area under line
  ctx.beginPath();
  points.forEach((p, i) => i === 0 ? ctx.moveTo(toX(i), toY(p.val)) : ctx.lineTo(toX(i), toY(p.val)));
  ctx.lineTo(toX(points.length - 1), pad.top + plotH);
  ctx.lineTo(toX(0), pad.top + plotH);
  ctx.closePath();
  ctx.fillStyle = 'rgba(212,168,83,0.10)';
  ctx.fill();

  // Line
  ctx.beginPath();
  ctx.strokeStyle = '#d4a853';
  ctx.lineWidth = 2.5;
  ctx.lineJoin = 'round';
  points.forEach((p, i) => i === 0 ? ctx.moveTo(toX(i), toY(p.val)) : ctx.lineTo(toX(i), toY(p.val)));
  ctx.stroke();

  // Dots, value labels, date labels
  ctx.font = `bold ${11}px -apple-system, sans-serif`;
  ctx.textAlign = 'center';
  points.forEach((p, i) => {
    const x = toX(i), y = toY(p.val);

    // Dot
    ctx.fillStyle = '#d4a853';
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#0f0f0f';
    ctx.beginPath();
    ctx.arc(x, y, 2.5, 0, Math.PI * 2);
    ctx.fill();

    // Value above dot
    const valLabel = mode === 'volume'
      ? Math.round(p.val).toLocaleString('it-IT')
      : `${p.val}${unit}`;
    ctx.fillStyle = '#d4a853';
    ctx.font = `bold 10px -apple-system, sans-serif`;
    ctx.fillText(valLabel, x, y - 10);

    // Date below
    ctx.fillStyle = '#606060';
    ctx.font = `10px -apple-system, sans-serif`;
    ctx.fillText(p.date, x, H - 6);
  });
}

// ===== HELPERS =====
function getLastSession(sessionId) {
  return state.logs.find(l => l.sessionId === sessionId);
}

function getLastExerciseLog(exerciseId) {
  for (const log of state.logs) {
    const ex = log.exercises?.find(e => e.exerciseId === exerciseId);
    if (ex?.sets?.length) return { date: log.date, sessionName: log.sessionName, sets: ex.sets };
  }
  return null;
}

function getExerciseLogs(exerciseId) {
  return state.logs
    .filter(l => l.exercises?.some(e => e.exerciseId === exerciseId))
    .map(l => {
      const ex = l.exercises.find(e => e.exerciseId === exerciseId);
      return { date: l.date, sessionName: l.sessionName, sets: ex.sets };
    });
}

function getRIR(ex) {
  if (ex.rir_week3 === null || ex.rir_week3 === undefined) return null;
  return Math.max(0, ex.rir_week3 - (state.currentWeek - 3));
}

function formatRest(seconds) {
  if (!seconds) return '—';
  if (seconds >= 60) return `${Math.floor(seconds / 60)}min${seconds % 60 ? (seconds % 60) + 's' : ''}`;
  return `${seconds}s`;
}

function formatDateShort(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('it-IT', { day: '2-digit', month: 'short' });
}

function formatDateFull(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('it-IT', { weekday: 'short', day: '2-digit', month: 'long', year: 'numeric' });
}

// ===== UI =====
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}
function hideAllModals() {
  document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
}
function closeModal() {
  hideAllModals();
  document.getElementById('modal-overlay').classList.add('hidden');
  state.modalContext = null;
}
function showToast(msg, type = '') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast' + (type ? ' ' + type : '');
  setTimeout(() => t.classList.add('hidden'), 2500);
}

// ===== EVENTS =====
function setupEventListeners() {
  // Home
  document.getElementById('btn-settings').addEventListener('click', () => {
    document.getElementById('input-token').value = gh.token;
    document.getElementById('input-repo').value = gh.repo;
    renderStats();
    showScreen('screen-settings');
  });
  document.getElementById('btn-free-workout').addEventListener('click', startFreeWorkout);
  document.getElementById('btn-storico').addEventListener('click', renderStoricoScreen);

  // Storico screen
  document.getElementById('btn-back-from-storico').addEventListener('click', () => showScreen('screen-home'));

  // Exercise list screen
  document.getElementById('btn-back-home').addEventListener('click', () => {
    clearInterval(state.restTimer);
    showScreen('screen-home');
  });
  document.getElementById('btn-finish-workout').addEventListener('click', finishWorkout);

  // Exercise detail screen
  document.getElementById('btn-back-to-list').addEventListener('click', () => {
    clearInterval(state.restTimer);
    document.getElementById('rest-timer').hidden = true;
    state.activeExercise = null;
    renderExerciseList();
    showScreen('screen-workout');
  });
  document.getElementById('btn-add-set').addEventListener('click', () => {
    if (state.activeExercise) openSetModal(state.activeExercise.id);
  });
  document.getElementById('btn-ex-chart').addEventListener('click', () => {
    if (state.activeExercise) showExerciseHistory(state.activeExercise.id, 'screen-exercise');
  });
  document.getElementById('btn-skip-rest').addEventListener('click', () => {
    clearInterval(state.restTimer);
    document.getElementById('rest-timer').hidden = true;
  });

  // Populate wheel selects
  const minSel = document.getElementById('rest-edit-min');
  const secSel = document.getElementById('rest-edit-sec');
  for (let m = 0; m <= 9; m++) minSel.add(new Option(m, m));
  for (let s = 0; s < 60; s++) secSel.add(new Option(s.toString().padStart(2, '0'), s));

  document.getElementById('btn-rest-set').addEventListener('click', () => {
    const total = Number(minSel.value) * 60 + Number(secSel.value);
    if (total > 0) {
      localStorage.setItem('rest_default_seconds', total);
      state.restEnd = Date.now() + total * 1000;
      updateRestDisplay();
      showToast('Timer impostato', 'success');
    }
  });

  document.querySelectorAll('.rest-adj-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const delta = Number(btn.dataset.delta);
      const remaining = Math.max(0, Math.ceil((state.restEnd - Date.now()) / 1000));
      const newRemaining = Math.max(10, remaining + delta);
      state.restEnd = Date.now() + newRemaining * 1000;
      updateRestDisplay();
    });
  });

  // History
  document.getElementById('btn-back-from-history').addEventListener('click', () => {
    showScreen(state.historyBackScreen);
  });

  // Free
  document.getElementById('btn-back-from-free').addEventListener('click', () => showScreen('screen-home'));
  document.getElementById('btn-finish-free').addEventListener('click', finishFreeWorkout);
  document.getElementById('btn-add-session-exercise').addEventListener('click', () => openExercisePicker('session'));
  document.getElementById('btn-share-workout').addEventListener('click', openShareModal);
  document.getElementById('btn-share-close').addEventListener('click', closeModal);
  document.getElementById('btn-share-copy').addEventListener('click', () => {
    const text = document.getElementById('share-text').value;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        closeModal();
        showToast('Copiato! Incolla su Strava ✓', 'success');
      }).catch(() => {
        document.getElementById('share-text').select();
        showToast('Seleziona e copia manualmente', '');
      });
    } else {
      document.getElementById('share-text').select();
      document.execCommand('copy');
      closeModal();
      showToast('Copiato! Incolla su Strava ✓', 'success');
    }
  });
  document.getElementById('btn-add-free-exercise').addEventListener('click', () => openExercisePicker('free'));
  document.getElementById('btn-picker-cancel').addEventListener('click', closeModal);

  // Settings
  document.getElementById('btn-back-from-settings').addEventListener('click', () => showScreen('screen-home'));
  document.getElementById('btn-save-settings').addEventListener('click', () => {
    localStorage.setItem('gh_token', document.getElementById('input-token').value.trim());
    localStorage.setItem('gh_repo', document.getElementById('input-repo').value.trim());
    document.getElementById('settings-status').textContent = 'Salvato ✓';
    setTimeout(() => { document.getElementById('settings-status').textContent = ''; }, 2000);
    if (gh.token && gh.repo) syncLogsFromGitHub();
  });

  // Modal — set confirm
  document.getElementById('btn-modal-cancel').addEventListener('click', closeModal);
  document.getElementById('btn-modal-confirm').addEventListener('click', () => {
    const ctx = state.modalContext;
    if (ctx?.freeIdx !== undefined) {
      const kg = parseFloat(document.getElementById('modal-kg').value) || 0;
      const reps = parseInt(document.getElementById('modal-reps').value) || 0;
      state.freeWorkout[ctx.freeIdx].sets.push({ kg, reps });
      closeModal();
      renderFreeWorkout();
    } else {
      confirmSet();
    }
  });

  document.getElementById('btn-finish-cancel').addEventListener('click', closeModal);
  document.getElementById('btn-finish-confirm').addEventListener('click', confirmFinishWorkout);

  // +/- buttons
  document.querySelectorAll('.num-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = document.getElementById(btn.dataset.target);
      const delta = parseFloat(btn.dataset.delta);
      input.value = Math.max(0, Math.round((parseFloat(input.value || 0) + delta) * 10) / 10);
    });
  });

  // Close modal on overlay background tap
  document.getElementById('modal-overlay').addEventListener('click', e => {
    if (e.target === document.getElementById('modal-overlay')) closeModal();
  });
}

function renderStats() {
  const grid = document.getElementById('stats-grid');
  const totalWorkouts = state.logs.length;
  const totalSets = state.logs.reduce((n, l) => n + (l.exercises?.reduce((m, e) => m + e.sets.length, 0) || 0), 0);
  const allExIds = new Set(state.logs.flatMap(l => l.exercises?.map(e => e.exerciseId) || []));
  grid.innerHTML = `
    <div class="stat-card"><div class="stat-value">${totalWorkouts}</div><div class="stat-label">Allenamenti</div></div>
    <div class="stat-card"><div class="stat-value">${totalSets}</div><div class="stat-label">Serie totali</div></div>
    <div class="stat-card"><div class="stat-value">${allExIds.size}</div><div class="stat-label">Esercizi tracciati</div></div>
    <div class="stat-card"><div class="stat-value">W${state.currentWeek}</div><div class="stat-label">Settimana attuale</div></div>
  `;
}

// ===== SERVICE WORKER =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js'));
}

// ===== BOOT =====
init();
