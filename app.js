'use strict';

// ===== STATE =====
const state = {
  config: null,
  logs: [],           // [{date, sessionId, sessionName, exercises: [{exerciseId, sets:[{kg,reps}]}]}]
  currentSession: null,
  currentExIndex: 0,
  currentSets: [],    // sets logged for current exercise this session
  allCurrentSets: {}, // {exerciseId: [{kg, reps}]} for the whole workout
  currentWeek: 1,
  restTimer: null,
  restRemaining: 0,
  modalContext: null, // {mode: 'set'|'edit', setIndex, exerciseId}
  freeWorkout: [],    // [{exerciseId, name, sets:[]}]
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
  saveLogs(logs) {
    localStorage.setItem('gym_logs', JSON.stringify(logs));
  },
  loadLogs() {
    try { return JSON.parse(localStorage.getItem('gym_logs') || '[]'); } catch { return []; }
  },
  saveWeek(w) { localStorage.setItem('gym_week', w); },
  loadWeek() { return parseInt(localStorage.getItem('gym_week') || '1'); },
};

// ===== INIT =====
async function init() {
  state.currentWeek = storage.loadWeek();
  state.logs = storage.loadLogs();

  const res = await fetch('config.json');
  state.config = await res.json();

  renderHome();
  updateWeekUI();
  setupEventListeners();

  // Try to load logs from GitHub in background
  if (gh.token && gh.repo) syncLogsFromGitHub();
}

// ===== RENDER HOME =====
function renderHome() {
  const grid = document.getElementById('session-grid');
  grid.innerHTML = '';
  state.config.sessions.forEach(session => {
    const last = getLastSession(session.id);
    const card = document.createElement('div');
    card.className = 'session-card';
    card.style.setProperty('--card-color', session.color);
    card.innerHTML = `
      <div class="session-card-name">${session.name.replace('Day ', 'D').replace(' —', '')}</div>
      <div class="session-card-sub">${session.name.split('—')[1]?.trim() || ''}</div>
      <div class="session-card-meta">${session.exercises.length} esercizi</div>
      ${last ? `<div class="session-card-last">${formatDateShort(last.date)}</div>` : ''}
    `;
    card.addEventListener('click', () => startSession(session));
    grid.appendChild(card);
  });
}

// ===== SESSION =====
function startSession(session) {
  state.currentSession = session;
  state.currentExIndex = 0;
  state.allCurrentSets = {};
  session.exercises.forEach(ex => { state.allCurrentSets[ex.id] = []; });

  document.getElementById('workout-title').textContent = session.name;
  renderExerciseNav();
  renderCurrentExercise();
  showScreen('screen-workout');
}

function renderExerciseNav() {
  const nav = document.getElementById('exercise-nav');
  nav.innerHTML = '';
  state.currentSession.exercises.forEach((ex, i) => {
    const dot = document.createElement('div');
    dot.className = 'ex-dot' + (i === state.currentExIndex ? ' current' : '')
      + (state.allCurrentSets[ex.id]?.length > 0 ? ' done' : '');
    dot.addEventListener('click', () => { state.currentExIndex = i; renderCurrentExercise(); renderExerciseNav(); });
    nav.appendChild(dot);
  });
}

function renderCurrentExercise() {
  const ex = state.currentSession.exercises[state.currentExIndex];
  const total = state.currentSession.exercises.length;
  const rir = getRIR(ex);

  document.getElementById('ex-number').textContent = `${state.currentExIndex + 1} / ${total}`;

  const nameEl = document.getElementById('ex-name');
  const supersetTag = ex.superset_label
    ? `<span class="superset-badge">${ex.superset_label}</span>` : '';
  nameEl.innerHTML = `${supersetTag}${ex.name_it}`;

  const repsStr = ex.reps_min === ex.reps_max
    ? `${ex.reps_min} rip`
    : ex.reps_min && ex.reps_max ? `${ex.reps_min}-${ex.reps_max} rip` : `${ex.duration_seconds}s`;
  const restStr = formatRest(ex.rest_seconds);
  const rirStr = rir !== null ? ` · RIR ${rir}` : '';
  const optStr = ex.optional ? ' · opzionale' : '';
  document.getElementById('ex-target').textContent =
    `${ex.sets} serie × ${repsStr} · riposo ${restStr}${rirStr}${optStr}`;

  document.getElementById('ex-note').textContent = ex.note || '';

  renderLastSession(ex);
  renderSetsLog(ex);

  document.getElementById('btn-prev-ex').disabled = state.currentExIndex === 0;
  const isLast = state.currentExIndex === total - 1;
  document.getElementById('btn-next-ex').textContent = isLast ? 'Fine ✓' : 'Succ →';
}

function renderLastSession(ex) {
  const container = document.getElementById('last-session');
  const lastLog = getLastExerciseLog(ex.id);
  if (!lastLog) {
    container.innerHTML = `<div class="last-session-title">Ultima sessione</div><div class="last-session-empty">Nessun dato</div>`;
    return;
  }
  const chips = lastLog.sets.map(s => `<span class="last-set-chip">${s.kg}kg × ${s.reps}</span>`).join('');
  container.innerHTML = `
    <div class="last-session-title">Ultima · ${formatDateShort(lastLog.date)}</div>
    <div class="last-session-row">${chips}</div>
  `;
}

function renderSetsLog(ex) {
  const container = document.getElementById('sets-log');
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
  const lastSet = editIndex !== null ? sets[editIndex]
    : (sets.length > 0 ? sets[sets.length - 1] : lastLog?.sets?.[0]);

  document.getElementById('modal-kg').value = lastSet?.kg ?? 0;
  document.getElementById('modal-reps').value = lastSet?.reps ?? 8;

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
    // Start rest timer
    const ex = state.currentSession.exercises.find(e => e.id === exerciseId);
    if (ex && ex.rest_seconds > 0) startRestTimer(ex.rest_seconds);
  }

  closeModal();
  renderCurrentExercise();
  renderExerciseNav();
}

// ===== REST TIMER =====
function startRestTimer(seconds) {
  clearInterval(state.restTimer);
  state.restRemaining = seconds;
  const timerEl = document.getElementById('rest-timer');
  timerEl.hidden = false;
  updateRestDisplay();

  state.restTimer = setInterval(() => {
    state.restRemaining--;
    updateRestDisplay();
    if (state.restRemaining <= 0) {
      clearInterval(state.restTimer);
      timerEl.hidden = true;
      showToast('Riposo finito!', 'success');
    }
  }, 1000);
}

function updateRestDisplay() {
  const m = Math.floor(state.restRemaining / 60);
  const s = state.restRemaining % 60;
  document.getElementById('rest-countdown').textContent = `${m}:${s.toString().padStart(2, '0')}`;
}

function skipRest() {
  clearInterval(state.restTimer);
  document.getElementById('rest-timer').hidden = true;
}

// ===== FINISH WORKOUT =====
function finishWorkout() {
  const totalSets = Object.values(state.allCurrentSets).reduce((n, sets) => n + sets.length, 0);
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
      .filter(([, sets]) => sets.length > 0)
      .map(([exerciseId, sets]) => ({ exerciseId, sets })),
  };

  state.logs.unshift(entry);
  storage.saveLogs(state.logs);
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
    const index = await gh.getFile('logs/.gitkeep');
    // List logs folder
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

    // Merge with local, deduplicate by date+sessionId
    const merged = [...state.logs];
    for (const remote of remoteLogs) {
      const exists = merged.find(l => l.date === remote.date && l.sessionId === remote.sessionId);
      if (!exists) merged.push(remote);
    }
    merged.sort((a, b) => b.date.localeCompare(a.date));
    state.logs = merged;
    storage.saveLogs(merged);
    renderHome();
  } catch {
    // silent — sync is best-effort
  }
}

// ===== FREE WORKOUT =====
function startFreeWorkout() {
  state.freeWorkout = [];
  document.getElementById('free-log').innerHTML = '';
  showScreen('screen-free');
}

function openExercisePicker() {
  const list = document.getElementById('picker-list');
  list.innerHTML = '';
  const allExercises = state.config.sessions.flatMap(s =>
    s.exercises.map(ex => ({ ...ex, sessionName: s.name, sessionColor: s.color }))
  );

  renderPickerItems(allExercises);
  document.getElementById('picker-search').value = '';
  document.getElementById('picker-search').oninput = e => {
    const q = e.target.value.toLowerCase();
    renderPickerItems(allExercises.filter(ex =>
      ex.name_it.toLowerCase().includes(q) || ex.name_en.toLowerCase().includes(q)
    ));
  };

  hideAllModals();
  document.getElementById('modal-picker').classList.remove('hidden');
  document.getElementById('modal-overlay').classList.remove('hidden');
}

function renderPickerItems(exercises) {
  const list = document.getElementById('picker-list');
  list.innerHTML = '';
  exercises.forEach(ex => {
    const item = document.createElement('div');
    item.className = 'picker-item';
    item.innerHTML = `<div class="picker-item-name">${ex.name_it}</div><div class="picker-item-day">${ex.sessionName}</div>`;
    item.addEventListener('click', () => {
      addFreeExercise(ex);
      closeModal();
    });
    list.appendChild(item);
  });
}

function addFreeExercise(ex) {
  const entry = { exerciseId: ex.id, name: ex.name_it, sets: [] };
  state.freeWorkout.push(entry);
  renderFreeWorkout();
}

function renderFreeWorkout() {
  const container = document.getElementById('free-log');
  container.innerHTML = '';
  state.freeWorkout.forEach((entry, idx) => {
    const block = document.createElement('div');
    block.className = 'free-exercise-block';
    const chips = entry.sets.map((s, i) =>
      `<span class="last-set-chip">${s.kg}kg × ${s.reps}</span>`
    ).join('');
    block.innerHTML = `
      <div class="free-exercise-title">${entry.name}</div>
      <div class="last-session-row" style="margin-bottom:8px">${chips || '<span style="color:var(--text2);font-size:.8rem">Nessuna serie</span>'}</div>
      <button class="add-set-btn" data-idx="${idx}">+ Serie</button>
    `;
    block.querySelector('.add-set-btn').addEventListener('click', () => {
      state.modalContext = { freeIdx: idx };
      document.getElementById('modal-kg').value = entry.sets.at(-1)?.kg ?? 0;
      document.getElementById('modal-reps').value = entry.sets.at(-1)?.reps ?? 8;
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
    exercises: state.freeWorkout
      .filter(e => e.sets.length > 0)
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

// ===== HISTORY / PROGRESSION =====
function showExerciseHistory(exerciseId) {
  const allExercises = state.config.sessions.flatMap(s => s.exercises);
  const ex = allExercises.find(e => e.id === exerciseId);
  if (!ex) return;

  const logs = getExerciseLogs(exerciseId);

  document.getElementById('history-title').textContent = ex.name_it;
  const content = document.getElementById('history-content');
  content.innerHTML = '';

  if (logs.length === 0) {
    content.innerHTML = '<p style="color:var(--text2);padding:16px">Nessun dato registrato.</p>';
  } else {
    // Chart
    const chartDiv = document.createElement('div');
    chartDiv.className = 'chart-container';
    chartDiv.innerHTML = `<div class="chart-title">Peso massimo per sessione (kg)</div><canvas class="chart-canvas" id="prog-chart"></canvas>`;
    content.appendChild(chartDiv);

    // Log entries
    logs.forEach(log => {
      const div = document.createElement('div');
      div.className = 'log-entry';
      const chips = log.sets.map(s => `<span class="last-set-chip">${s.kg}kg × ${s.reps}</span>`).join('');
      div.innerHTML = `<div class="log-entry-date">${log.date} · ${log.sessionName}</div><div class="log-entry-sets">${chips}</div>`;
      content.appendChild(div);
    });

    requestAnimationFrame(() => drawChart(logs));
  }

  showScreen('screen-history');
}

function drawChart(logs) {
  const canvas = document.getElementById('prog-chart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);
  const W = rect.width, H = rect.height;

  const points = logs.slice().reverse().map(log => ({
    date: log.date.slice(5),
    max: Math.max(...log.sets.map(s => s.kg)),
  }));

  if (points.length < 1) return;

  const minY = Math.min(...points.map(p => p.max)) * 0.9;
  const maxY = Math.max(...points.map(p => p.max)) * 1.1 || 10;
  const pad = { top: 10, bottom: 28, left: 10, right: 10 };
  const plotW = W - pad.left - pad.right;
  const plotH = H - pad.top - pad.bottom;

  const toX = i => pad.left + (i / Math.max(points.length - 1, 1)) * plotW;
  const toY = v => pad.top + plotH - ((v - minY) / (maxY - minY)) * plotH;

  ctx.clearRect(0, 0, W, H);

  // Line
  ctx.beginPath();
  ctx.strokeStyle = '#d4a853';
  ctx.lineWidth = 2;
  points.forEach((p, i) => {
    i === 0 ? ctx.moveTo(toX(i), toY(p.max)) : ctx.lineTo(toX(i), toY(p.max));
  });
  ctx.stroke();

  // Dots + labels
  ctx.fillStyle = '#d4a853';
  ctx.font = `${11 * dpr / dpr}px -apple-system, sans-serif`;
  ctx.textAlign = 'center';
  points.forEach((p, i) => {
    const x = toX(i), y = toY(p.max);
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#a0a0a0';
    ctx.fillText(p.date, x, H - 4);
    ctx.fillStyle = '#d4a853';
  });
}

// ===== HELPERS =====
function getLastSession(sessionId) {
  return state.logs.find(l => l.sessionId === sessionId);
}

function getLastExerciseLog(exerciseId) {
  for (const log of state.logs) {
    const ex = log.exercises?.find(e => e.exerciseId === exerciseId);
    if (ex && ex.sets?.length > 0) return { date: log.date, sessionName: log.sessionName, sets: ex.sets };
  }
  return null;
}

function getExerciseLogs(exerciseId) {
  return state.logs
    .filter(log => log.exercises?.some(e => e.exerciseId === exerciseId))
    .map(log => {
      const ex = log.exercises.find(e => e.exerciseId === exerciseId);
      return { date: log.date, sessionName: log.sessionName, sets: ex.sets };
    });
}

function getRIR(ex) {
  if (ex.rir_week3 === null || ex.rir_week3 === undefined) return null;
  const delta = state.currentWeek - 3;
  return Math.max(0, ex.rir_week3 - delta);
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

// ===== UI HELPERS =====
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

function updateWeekUI() {
  document.querySelectorAll('.week-btn').forEach(btn => {
    btn.classList.toggle('active', parseInt(btn.dataset.week) === state.currentWeek);
  });
  const rir = state.config?.rir_progression?.[`week${state.currentWeek}`] ?? '—';
  document.getElementById('rir-label').textContent = `RIR ${rir}`;
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
  // Week selector
  document.querySelectorAll('.week-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.currentWeek = parseInt(btn.dataset.week);
      storage.saveWeek(state.currentWeek);
      updateWeekUI();
    });
  });

  // Home buttons
  document.getElementById('btn-settings').addEventListener('click', () => {
    document.getElementById('input-token').value = gh.token;
    document.getElementById('input-repo').value = gh.repo;
    renderStats();
    showScreen('screen-settings');
  });
  document.getElementById('btn-free-workout').addEventListener('click', startFreeWorkout);

  // Workout buttons
  document.getElementById('btn-back-home').addEventListener('click', () => {
    clearInterval(state.restTimer);
    showScreen('screen-home');
  });
  document.getElementById('btn-finish-workout').addEventListener('click', finishWorkout);
  document.getElementById('btn-add-set').addEventListener('click', () => {
    const ex = state.currentSession.exercises[state.currentExIndex];
    openSetModal(ex.id);
  });
  document.getElementById('btn-prev-ex').addEventListener('click', () => {
    if (state.currentExIndex > 0) {
      state.currentExIndex--;
      renderCurrentExercise();
      renderExerciseNav();
    }
  });
  document.getElementById('btn-next-ex').addEventListener('click', () => {
    const total = state.currentSession.exercises.length;
    if (state.currentExIndex < total - 1) {
      state.currentExIndex++;
      renderCurrentExercise();
      renderExerciseNav();
    } else {
      finishWorkout();
    }
  });
  document.getElementById('btn-skip-rest').addEventListener('click', skipRest);

  // History
  document.getElementById('btn-back-from-history').addEventListener('click', () => showScreen('screen-workout'));

  // Free workout
  document.getElementById('btn-back-from-free').addEventListener('click', () => showScreen('screen-home'));
  document.getElementById('btn-finish-free').addEventListener('click', finishFreeWorkout);
  document.getElementById('btn-add-free-exercise').addEventListener('click', openExercisePicker);
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

  // Modal buttons
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

  // +/- buttons in modal
  document.querySelectorAll('.num-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = document.getElementById(btn.dataset.target);
      const delta = parseFloat(btn.dataset.delta);
      const val = parseFloat(input.value) || 0;
      input.value = Math.max(0, Math.round((val + delta) * 10) / 10);
    });
  });

  // Close modal on overlay click
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
