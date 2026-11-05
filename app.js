/* Trainee Performance Scorecard — My Assessments (vanilla JS) */
(function () {
  'use strict';

  const TRAINEE = 'Gowri M Shetty';
  const TOTAL = QUESTIONS.length;     // 25
  const DURATION_MS = 60 * 60 * 1000; // 60 minutes
  const PASS_MARKS = 15;              // 60% of 25
  const MAX_FLAGS = 3;                // the 4th violation ends the exam

  const $ = (s, r = document) => r.querySelector(s);
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };

  /* ------------------------------------------------------------------ cards */
  const FE = 'Frontend (HTML, CSS, JS)';

  /* The Frontend card is locked (bottom of Sprint 5) until this moment, then it
     jumps to the first position as the ACTIVE exam card.  2:00 PM IST, 5 Nov 2026.
     Testing: add ?unlock=now (or ?unlock=lock) to the URL to force either state. */
  const UNLOCK_AT = new Date('2026-11-05T14:00:00+05:30').getTime();
  const forced = new URLSearchParams(location.search).get('unlock');
  const isUnlocked = () => forced === 'now' ? true : forced === 'lock' ? false : Date.now() >= UNLOCK_AT;

  /* the Frontend attempt-3 exam card (shown first once unlocked) */
  const fe3 = { id: 'fe3', status: 'active', title: FE, subject: FE, duration: '60 min', attempt: 3, actions: ['start'] };

  /* "Exams scheduled for you" cards */
  const examCards = [
    { id: 'fe2', status: 'notcleared', title: FE, subject: FE, duration: '60 min', attempt: 2, redNote: 'Not cleared', actions: ['notcleared','view'] },
    { id: 'fe1', status: 'notcleared', title: FE, subject: FE, duration: '60 min', attempt: 1,redNote: 'Not cleared' ,actions: ['notcleared','view'] },
    // { id: 'su3', status: 'cleared', title: 'Supervised_Unsupervised_B3_A1', subject: 'Supervised & Unsupervised Techniques', duration: '90 min', attempt: 3, actions: ['cleared', 'view'] },
    { id: 'py', status: 'notopen', title: 'Python Coding Assessment — Insurance Industry Dataset (Retake / Attempt 2)', subject: 'Python', duration: '100 min', attempt: 3, actions: ['closed'] },
    { id: 'su1', status: 'notcleared', title: 'Supervised & Unsupervised Techniques', subject: 'Supervised & Unsupervised Techniques', duration: '90 min', attempt: 1, actions: ['Not cleared', 'view'] },
    { id: 'su2', status: 'cleared', title: 'Supervised & Unsupervised Techniques', subject: 'Supervised & Unsupervised Techniques', duration: '90 min', attempt: 2, actions: ['cleared', 'view'] },
    { id: 'sql', status: 'submitted', title: 'MU-SIGMA — 2026 SQL Training Program', subject: 'SQL (Advanced)', duration: '60 min', attempt: 1, actions: ['submitted'] },
    { id: 'ig0', status: 'notopen', title: 'INSIGHT GENERATION - MCQ ASSESSMENT — Instructions', subject: 'Insight Generation', duration: '60 min', attempt: 1, actions: ['closed'] },
    { id: 'ag', status: 'notopen', title: 'AGENTIC AI - MCQ ASSESSMENT — Paper 2', subject: 'Agentic AI', duration: '60 min', attempt: 1, actions: ['closed'] },
    { id: 'pya', status: 'notopen', title: 'Python (Advanced) Coding Assessment', subject: 'Python (Advanced)', duration: '90 min', attempt: 3, actions: ['closed'] },
    { id: 'rai', status: 'cleared', title: 'RESPONSIBLE ADOPTION OF AI - MCQ ASSESSMENT', subject: 'Responsible Adoption of AI', duration: '60 min', attempt: 1, actions: ['cleared', 'view'] },
    { id: 'ag3', status: 'cleared', title: 'AGENTIC AI - MCQ ASSESSMENT — Paper 3', subject: 'Agentic AI', duration: '60 min', attempt: 1, actions: ['cleared', 'view'] },
    { id: 'cc5', status: 'notopen', title: 'CLOUD COMPUTING - MCQ ASSESSMENT — Paper 5', subject: 'Cloud Computing', duration: '60 min', attempt: 1, actions: ['closed'] },
    { id: 'ig1', status: 'notopen', title: 'INSIGHT GENERATION - MCQ ASSESSMENT — Instructions', subject: 'Insight Generation', duration: '60 min', attempt: 1, actions: ['closed'] },
    { id: 'ig2', status: 'notopen', title: 'INSIGHT GENERATION - MCQ ASSESSMENT — Instructions', subject: 'Insight Generation', duration: '60 min', attempt: 1, actions: ['closed'] }
  ];
  const STATUS_LABEL = { active: 'ACTIVE', cleared: 'CLEARED', notcleared: 'NOT CLEARED', submitted: 'SUBMITTED', notopen: 'NOT OPEN' };

  /* Sprint sections (state: locked | submitted | cleared) */
  const sprints = [
    { n: 1, title: 'Core Foundations', sub: 'Build the fundamentals', cards: [
      { n: 1, title: 'Prob & Stats Beginner', type: 'MCQ', dur: '20 min', sched: 'Attempt 1' },
      { n: 2, title: 'Programming Basics', type: 'Coding', dur: '35 min', sched: 'Attempt 1' },
      { n: 3, title: 'Python (Intermediate)', type: 'Coding', dur: '100 min', sched: 'Attempt 3' },
      { n: 4, title: 'Prompt Engineering', type: 'MCQ', dur: '25 min' } ] },
    { n: 2, title: 'Data Fluency', sub: 'Work fluently with data', cards: [
      { n: 5, title: 'Project Planning (Agile)', type: 'MCQ', dur: '25 min' },
      { n: 6, title: 'Prob & Stats Intermediate', type: 'MCQ', dur: '25 min' },
      { n: 7, title: 'Transformers & LLM', type: 'MCQ', dur: '25 min' },
      { n: 8, title: 'Git', type: 'Coding', dur: '25 min' },
      { n: 9, title: 'Python (Advanced)', type: 'Coding', dur: '100 min', sched: 'Attempt 3' },
      { n: 10, title: 'SQL (Intermediate)', type: 'Coding', dur: '35 min', sched: 'Attempt 1' } ] },
    { n: 3, title: 'Advanced Analytics', sub: 'Analyse with depth', cards: [
      { n: 11, title: 'AI Analytical Thinking', type: 'MCQ', dur: '25 min' },
      { n: 12, title: 'Agentic AI', type: 'MCQ', dur: '60 min', sched: 'Attempt 1' },
      { n: 13, title: 'Insights Generation', type: 'MCQ', dur: '25 min' },
      { n: 14, title: 'Cloud Computing', type: 'MCQ', dur: '60 min', sched: 'Attempt 1' },
      { n: 15, title: 'SQL (Advanced)', type: 'Coding', dur: '60 min', sched: 'Attempt 2', state: 'submitted', note: 'Not cleared — below the pass mark', noteCls: 'bad' },
      { n: 16, title: 'Excel + Data Viz', type: 'MCQ', dur: '25 min' } ] },
    { n: 4, title: 'ML & Responsible AI', sub: 'Model with responsibility', cards: [
      { n: 17, title: 'Responsible Adoption of AI', type: 'MCQ', dur: '60 min', sched: 'Attempt 1', state: 'cleared', view: true, note: 'Passed on attempt 1' },
      { n: 18, title: 'Supervised & Unsupervised Techniques', type: 'MCQ', dur: '90 min' } ] },
    { n: 5, title: 'Frontend Development', sub: 'Ship the interface', cards: [
      { n: 19, title: 'Frontend (HTML/CSS/JS)', type: 'MCQ', dur: '60 min', sched: 'Attempt 3', frontend: true } ] }
  ];

  const ICON = {
    lock: '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
    check: '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8 12.5l3 3 5-6"/></svg>',
    clock: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    list: '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M5 8h14M5 12h10M5 16h6"/></svg>',
    plus: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
  };

  const pad2 = n => String(n).padStart(2, '0');
  const esc = s => String(s).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));

  /* exam-style card (the "EXAM" cards) */
  function examCard(c) {
    const card = el('article', 'card s-' + c.status);
    card.innerHTML =
      '<div class="c-top"><span class="c-kicker">Exam</span><span class="c-status">' + STATUS_LABEL[c.status] + '</span></div>' +
      '<h3 class="c-title"></h3>' +
      '<div class="meta-grid">' +
        '<div><span class="m-label">Subject</span><span class="m-val"></span></div>' +
        '<div><span class="m-label">Duration</span><span class="m-val">' + c.duration + '</span></div>' +
      '</div>' +
      '<div class="field"><span class="m-label">Attempt</span><span class="m-val">' + c.attempt + '</span></div>';
    $('.c-title', card).textContent = c.title;
    $('.meta-grid .m-val', card).textContent = c.subject;
    if (c.redNote) card.lastElementChild.appendChild(el('span', 'note-red', c.redNote));

    const acts = el('div', 'c-actions');
    c.actions.forEach(a => {
      const b = el('button', 'c-btn');
      b.type = 'button';
      if (a === 'start') { b.textContent = 'Start assessment'; b.classList.add('fill-maroon'); b.onclick = () => openInstructions(c); }
      if (a === 'cleared') { b.textContent = 'Cleared'; b.classList.add('fill-teal'); }
      if (a === 'notcleared') { b.textContent = 'Not cleared'; b.classList.add('fill-teal'); }
      if (a === 'closed') { b.textContent = 'Closed'; b.classList.add('fill-muted'); b.disabled = true; }
      if (a === 'submitted') { b.textContent = 'Submitted'; b.classList.add('fill-gray'); b.disabled = true; }
      if (a === 'view') { b.textContent = 'View my answers'; b.classList.add('outline'); }
      acts.appendChild(b);
    });
    card.appendChild(acts);
    return card;
  }

  /* sprint-style card (numbered cards with lock / progress bar) */
  function sprintCard(c) {
    const st = c.state || 'locked';
    const done = st !== 'locked';
    const wrap = el('div', 'sc-wrap');
    const card = el('article', 'sc ' + (done ? 'done' : 'locked'));
    const label = st === 'submitted' ? ICON.check + 'SUBMITTED' : st === 'cleared' ? ICON.check + 'CLEARED' : ICON.lock + 'OPEN';
    const sched = c.sched ? '<div><span class="sc-l">Scheduled as</span><span class="sc-v">' + c.sched + '</span></div>' : '';
    card.innerHTML =
      '<div class="sc-top"><span class="sc-num">' + pad2(c.n) + '</span><span class="sc-state">' + label + '</span></div>' +
      '<h3 class="sc-title"></h3>' +
      '<div class="sc-grid">' +
        '<div><span class="sc-l">Assessment type</span><span class="sc-v">' + c.type + '</span></div>' +
        '<div><span class="sc-l">Duration</span><span class="sc-v ic">' + ICON.clock + c.dur + '</span></div>' +
        '<div><span class="sc-l">Attempts</span><span class="sc-v ic">' + ICON.list + '1 left</span></div>' +
        sched +
        '<div><span class="sc-l">Proficiency threshold</span><span class="sc-v ic">' + ICON.plus + '≥ 60%' + (done ? ' <em class="earned">EARNED</em>' : '') + '</span></div>' +
      '</div>' +
      '<div class="sc-foot"><span>' + (done ? 'Completed' : 'Not started') + '</span><b>' + (done ? '100%' : '0%') + '</b></div>' +
      '<div class="sc-bar"><i style="width:' + (done ? 100 : 0) + '%"></i></div>' +
      '<button type="button" class="sc-btn ' + (done ? 'teal' : '') + '" ' + (done ? 'disabled' : 'disabled aria-disabled="true" title="Locked"') + '><span>' +
        (st === 'submitted' ? 'Submitted' : st === 'cleared' ? 'Cleared' : 'Open assessment') + '</span>' + ICON.arrow + '</button>';
    $('.sc-title', card).textContent = c.title;
    wrap.appendChild(card);
    if (c.view) { const v = el('button', 'sc-view', 'View my answers'); v.type = 'button'; wrap.appendChild(v); }
    if (c.note) wrap.appendChild(el('p', 'sc-note ' + (c.noteCls || ''), esc(c.note)));
    return wrap;
  }

  function renderCards() {
    const unlocked = isUnlocked();

    /* exam grid — once unlocked, the Frontend attempt-3 card comes first */
    const wrap = $('#cards');
    wrap.innerHTML = '';
    (unlocked ? [fe3].concat(examCards) : examCards).forEach(c => wrap.appendChild(examCard(c)));

    /* sprint sections — the Frontend card (19) is locked at the bottom until unlock, then it moves up */
    const box = $('#sprints');
    box.innerHTML = '';
    sprints.forEach(sp => {
      const list = sp.cards.filter(c => !(c.frontend && unlocked));
      if (!list.length) return;
      const cleared = list.filter(c => c.state === 'cleared').length;
      const sec = el('section', 'sprint');
      sec.innerHTML =
        '<div class="sp-head"><div><p class="sp-kicker">SPRINT ' + sp.n + '</p><h2 class="sp-title"></h2><p class="sp-sub"></p></div>' +
        '<div class="sp-thr"><span class="sp-thr-l">PROFICIENCY THRESHOLD</span><span><b>60%</b><em>' + cleared + '/' + list.length + '</em></span></div></div>';
      $('.sp-title', sec).textContent = sp.title;
      $('.sp-sub', sec).textContent = sp.sub;
      const grid = el('div', 'cards stretch');
      list.forEach(c => grid.appendChild(sprintCard(c)));
      sec.appendChild(grid);
      box.appendChild(sec);
    });
  }

  /* flip the Frontend card live when 2:00 PM arrives (no refresh needed) */
  let lastUnlocked = isUnlocked();
  setInterval(() => {
    const now = isUnlocked();
    if (now !== lastUnlocked) { lastUnlocked = now; if (!state.running) renderCards(); }
  }, 1000);

  /* ------------------------------------------------------------------ views */
  const views = { list: $('#view-list'), instructions: $('#view-instructions'), result: $('#view-result') };
  const shell = $('#shell'), examView = $('#view-exam');

  function show(name) {
    Object.entries(views).forEach(([k, v]) => v.hidden = k !== name);
    examView.hidden = true;
    shell.hidden = false;
    window.scrollTo(0, 0);
  }

  $('#userName').textContent = TRAINEE;
  $('#traineeMeta').textContent = TRAINEE + ' · Emp ID 18100 · Batch 2-C';

  /* ---------------------------------------------------------- instructions */
  const fsChip = $('#fsChip'), fsNote = $('#fsNote'), btnStart = $('#btnStart'), btnFs = $('#btnFs');
  const inFullscreen = () => !!(document.fullscreenElement || document.webkitFullscreenElement);

  function syncFsUI() {
    const on = inFullscreen();
    fsChip.textContent = on ? 'Enabled' : 'Not enabled';
    fsChip.classList.toggle('on', on);
    fsNote.classList.remove('err');
    fsNote.textContent = on ? 'Full-screen mode is on. You can start the exam.' : 'Full-screen mode is required before you can start.';
    btnStart.disabled = !on;
    $('span', btnFs).textContent = on ? 'Full Screen Enabled' : 'Enable Full Screen';
  }

  function enterFullscreen() {
    const root = document.documentElement;
    const req = root.requestFullscreen || root.webkitRequestFullscreen;
    if (!req) return Promise.reject(new Error('unsupported'));
    return Promise.resolve(req.call(root));
  }

  function openInstructions(card) {
    state.card = card;
    show('instructions');
    syncFsUI();
  }

  btnFs.onclick = () => {
    if (inFullscreen()) return;
    enterFullscreen().then(syncFsUI).catch(() => {
      fsNote.textContent = 'Your browser blocked full screen. Allow it (or open this page directly in a browser tab) and try again.';
      fsNote.classList.add('err');
    });
  };
  $('#btnCancel').onclick = () => { exitFullscreen(); show('list'); };
  btnStart.onclick = () => { if (inFullscreen()) startExam(); else syncFsUI(); };

  function exitFullscreen() {
    if (inFullscreen()) {
      const ex = document.exitFullscreen || document.webkitExitFullscreen;
      if (ex) { try { Promise.resolve(ex.call(document)).catch(() => {}); } catch (e) {} }
    }
  }

  /* ------------------------------------------------------------------ exam */
  const state = { card: null, running: false, current: 0, answers: [], visited: [], flags: 0, lastFlagAt: 0, endTime: 0, startTime: 0, timerId: null };

  function startExam() {
    state.running = true;
    state.current = 0;
    state.answers = new Array(TOTAL).fill(null);
    state.visited = new Array(TOTAL).fill(false);
    state.flags = 0;
    state.lastFlagAt = 0;
    state.startTime = Date.now();
    state.endTime = state.startTime + DURATION_MS;

    shell.hidden = true;
    Object.values(views).forEach(v => v.hidden = true);
    examView.hidden = false;
    window.scrollTo(0, 0);

    buildPalette();
    updateFlags();
    renderQuestion();
    tick();
    clearInterval(state.timerId);
    state.timerId = setInterval(tick, 500);
  }

  function fmt(ms) {
    const s = Math.max(0, Math.ceil(ms / 1000));
    const m = Math.floor(s / 60), r = s % 60;
    return String(m).padStart(2, '0') + ':' + String(r).padStart(2, '0');
  }

  function tick() {
    const left = state.endTime - Date.now();
    const t = $('#timer');
    t.textContent = fmt(left);
    t.parentElement.classList.toggle('low', left <= 5 * 60 * 1000);
    if (left <= 0) finishExam('time');
  }

  const answeredCount = () => state.answers.filter(a => a !== null).length;

  function renderQuestion() {
    const i = state.current, q = QUESTIONS[i];
    state.visited[i] = true;
    $('#qCount').textContent = 'Question ' + (i + 1) + ' of ' + TOTAL;
    // code runs inline in the question text (single line, no box)
    $('#qText').textContent = q.code ? q.t + ' ' + q.code.replace(/\s*\n\s*/g, ' ').trim() : q.t;

    const box = $('#options');
    box.innerHTML = '';
    q.o.forEach((text, k) => {
      const b = el('button', 'opt' + (state.answers[i] === k ? ' sel' : ''));
      b.type = 'button';
      b.innerHTML = '<span class="badge">' + 'ABCD'[k] + '</span><span class="otext"></span>';
      $('.otext', b).textContent = text;
      b.onclick = () => { state.answers[i] = k; renderQuestion(); };
      box.appendChild(b);
    });

    $('#progressFill').style.width = ((i + 1) / TOTAL * 100) + '%';
    $('#ansCount').textContent = answeredCount() + ' answered';
    $('#palSub').textContent = answeredCount() + ' of ' + TOTAL + ' answered';
    $('#btnPrev').disabled = i === 0;
    $('#btnNext').disabled = i === TOTAL - 1;
    refreshPalette();
  }

  function buildPalette() {
    const g = $('#palGrid');
    g.innerHTML = '';
    for (let i = 0; i < TOTAL; i++) {
      const b = el('button', 'pq', String(i + 1));
      b.type = 'button';
      b.onclick = () => { state.current = i; renderQuestion(); };
      g.appendChild(b);
    }
  }
  function refreshPalette() {
    [...$('#palGrid').children].forEach((b, i) => {
      b.classList.remove('cur', 'ans', 'vis');
      if (i === state.current) b.classList.add('cur');
      else if (state.answers[i] !== null) b.classList.add('ans');
      else if (state.visited[i]) b.classList.add('vis');
    });
  }

  $('#btnPrev').onclick = () => { if (state.current > 0) { state.current--; renderQuestion(); } };
  $('#btnNext').onclick = () => { if (state.current < TOTAL - 1) { state.current++; renderQuestion(); } };

  /* ---- violations (tab switch / leaving full screen) ---- */
  function updateFlags() {
    const dots = document.querySelectorAll('.flags i');
    dots.forEach((d, i) => d.classList.toggle('on', i < state.flags));
    $('#flagText').textContent = Math.min(state.flags, MAX_FLAGS) + '/' + MAX_FLAGS + ' tab flags';
  }

  function flag(reason) {
    if (!state.running) return;
    const now = Date.now();
    if (now - state.lastFlagAt < 1500) return; // tab switch + fullscreen exit can fire together
    state.lastFlagAt = now;
    state.flags++;
    updateFlags();
    if (state.flags > MAX_FLAGS) { closeModal(); finishExam('violation'); return; }
    openModal('Warning ' + state.flags + ' of ' + MAX_FLAGS,
      reason + '. Please stay in full screen on this tab. The 4th violation ends the exam automatically.',
      [{ label: 'Return to exam', primary: true, onClick: () => { closeModal(); if (!inFullscreen()) enterFullscreen().catch(() => {}); } }]);
  }

  document.addEventListener('visibilitychange', () => { if (state.running && document.hidden) flag('You switched away from the exam tab'); });
  ['fullscreenchange', 'webkitfullscreenchange'].forEach(ev => document.addEventListener(ev, () => {
    if (state.running && !inFullscreen()) flag('You exited full screen');
    if (!state.running && !views.instructions.hidden) syncFsUI();
  }));

  /* ---- submit ---- */
  $('#btnSubmit').onclick = () => {
    const left = TOTAL - answeredCount();
    openModal('Submit exam?',
      left > 0 ? 'You have ' + left + ' unanswered question' + (left > 1 ? 's' : '') + '. Once submitted you cannot change your answers.'
               : 'You have answered all ' + TOTAL + ' questions. Once submitted you cannot change your answers.',
      [{ label: 'Keep working', onClick: closeModal }, { label: 'Submit Exam', primary: true, onClick: () => { closeModal(); finishExam('manual'); } }]);
  };

  function finishExam(reason) {
    if (!state.running) return;
    state.running = false;
    clearInterval(state.timerId);
    closeModal();

    let correct = 0, wrong = 0, skipped = 0;
    QUESTIONS.forEach((q, i) => {
      if (state.answers[i] === null) skipped++;
      else if (state.answers[i] === q.a) correct++;
      else wrong++;
    });
    const score = correct;
    const passed = score >= PASS_MARKS;
    const taken = Math.min(Date.now(), state.endTime) - state.startTime;

    /* update attempt-3 card */
    const c = state.card;
    if (c) {
      if (passed) { c.status = 'cleared'; c.actions = ['cleared', 'view']; c.redNote = null; }
      else { c.status = 'notcleared'; c.actions = ['notcleared', 'view']; c.redNote = 'Not cleared'; }
    }

    exitFullscreen();
    show('result');
    $('#resScore').textContent = score;
    $('.score').classList.toggle('pass-c', passed);
    const v = $('#resVerdict');
    v.textContent = passed ? 'Passed' : 'Not cleared';
    v.className = 'verdict ' + (passed ? 'pass' : 'fail');
    $('#resCorrect').textContent = correct;
    $('#resWrong').textContent = wrong;
    $('#resSkipped').textContent = skipped;
    const mins = Math.floor(taken / 60000), secs = Math.floor(taken / 1000) % 60;
    $('#resTime').textContent = mins + ':' + String(secs).padStart(2, '0');
    const note = $('#resNote');
    note.hidden = reason === 'manual';
    note.textContent = reason === 'time' ? 'Time ran out — the exam was submitted automatically.'
                    : reason === 'violation' ? 'The exam was ended automatically after the 4th tab/full-screen violation.' : '';
    renderCards();
  }

  $('#btnBack').onclick = () => show('list');

  /* ---- modal ---- */
  const modal = $('#modal');
  function openModal(title, body, buttons) {
    $('#mTitle').textContent = title;
    $('#mBody').textContent = body;
    const box = $('#mActions');
    box.innerHTML = '';
    buttons.forEach(b => {
      const btn = el('button', 'btn ' + (b.primary ? 'btn-brown' : 'btn-outline'), '');
      btn.textContent = b.label;
      btn.type = 'button';
      btn.onclick = b.onClick;
      box.appendChild(btn);
    });
    modal.hidden = false;
  }
  function closeModal() { modal.hidden = true; }

  /* tab links are visual only */
  document.querySelectorAll('.navtab').forEach(a => a.addEventListener('click', e => e.preventDefault()));

  /* warn before accidental refresh during an exam */
  window.addEventListener('beforeunload', e => { if (state.running) { e.preventDefault(); e.returnValue = ''; } });

  /* URL like the real site: ?tab=MyAssessments&batch=Batch+2-C */
  try { history.replaceState(null, '', '?tab=MyAssessments&batch=Batch+2-C'); } catch (e) {}

  renderCards();
  show('list');

  /* test hook (no effect on normal use) */
  window.__exam = { state, finishExam, QUESTIONS };
})();
