/* ===================================================
   PLAYLIST BATTLE — app.js
   Tournament engine: 56 songs → Qualification → Bracket → Champion
   Both players must agree (consensus voting)
   =================================================== */

/* ─── CORS PROXY for YT Music scraping ─── */
const CORS_PROXY = 'https://api.allorigins.win/get?url=';

/* ─── STATE ─── */
const state = {
  songs: [],           // { title, artist, ytId, artworkUrl }
  rounds: [],          // array of round arrays [matchups per round]
  currentRound: 0,
  currentMatch: 0,
  votes: { iyed: null, yomna: null }, // 'a' or 'b'
  winners: [],         // songs that won so far in current round
  roundWinners: [],    // accumulated winners across rounds
  scores: { iyed: 0, yomna: 0 },
  phase: 'qualification', // 'qualification' | 'bracket'
  totalMatches: 0,
  matchesPlayed: 0,
  byeSongs: [],
};

/* ─── SCREEN NAVIGATION ─── */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

/* ─── YOUTUBE MUSIC FETCH ─── */
async function fetchPlaylist(url) {
  // Try to extract list id
  const match = url.match(/[?&]list=([^&]+)/);
  if (!match) throw new Error('Invalid YouTube Music URL. Make sure it contains "list=".');
  const listId = match[1];
  const ytUrl = `https://music.youtube.com/playlist?list=${listId}`;
  const proxyUrl = CORS_PROXY + encodeURIComponent(ytUrl);

  const res = await fetch(proxyUrl);
  if (!res.ok) throw new Error('Network error fetching playlist.');
  const data = await res.json();
  const html = data.contents;
  return parseYTMusicHtml(html, listId);
}

function parseYTMusicHtml(html, listId) {
  // Extract ytInitialData JSON blob
  const marker = 'var ytInitialData = ';
  const start = html.indexOf(marker);
  if (start === -1) throw new Error('Could not parse YouTube Music page. Try the manual entry option.');
  const jsonStart = start + marker.length;
  let depth = 0, i = jsonStart;
  while (i < html.length) {
    if (html[i] === '{') depth++;
    else if (html[i] === '}') { depth--; if (depth === 0) { i++; break; } }
    i++;
  }
  const rawJson = html.slice(jsonStart, i);
  let ytData;
  try { ytData = JSON.parse(rawJson); } catch { throw new Error('Failed to parse playlist data.'); }

  // Walk the JSON to find music items
  const songs = [];
  function walk(obj) {
    if (!obj || typeof obj !== 'object') return;
    if (Array.isArray(obj)) { obj.forEach(walk); return; }
    // musicResponsiveListItemRenderer contains song rows
    if (obj.musicResponsiveListItemRenderer) {
      const r = obj.musicResponsiveListItemRenderer;
      try {
        const flexCols = r.flexColumns;
        const titleRuns = flexCols[0]?.musicResponsiveListItemFlexColumnRenderer?.text?.runs;
        const title = titleRuns?.[0]?.text || '';
        const subtitleRuns = flexCols[1]?.musicResponsiveListItemFlexColumnRenderer?.text?.runs;
        const artist = subtitleRuns?.[0]?.text || '';
        const thumbnail = r.thumbnail?.musicThumbnailRenderer?.thumbnail?.thumbnails;
        const artworkUrl = thumbnail ? thumbnail[thumbnail.length - 1]?.url : '';
        const ytId = r.playlistItemData?.videoId || '';
        songs.push({ title, artist, ytId, artworkUrl });
      } catch(e) {}
    }
    Object.values(obj).forEach(walk);
  }
  walk(ytData);
  return songs;
}

/* ─── MANUAL PARSE ─── */
function parseSongsFromText(text) {
  return text.trim().split('\n')
    .map(l => l.trim()).filter(Boolean)
    .map(line => {
      const sep = line.includes(' - ') ? ' - ' : (line.includes(' – ') ? ' – ' : null);
      if (sep) {
        const [title, ...rest] = line.split(sep);
        return { title: title.trim(), artist: rest.join(sep).trim(), ytId: '', artworkUrl: '' };
      }
      return { title: line, artist: '', ytId: '', artworkUrl: '' };
    });
}

/* ─── TOURNAMENT SETUP ─── */
function buildTournament(songs) {
  const shuffled = shuffle([...songs]);
  const total = shuffled.length;

  let bracketSize = 1;
  while (bracketSize < total) bracketSize *= 2;
  const byes = bracketSize - total;
  const qualSlots = total - byes;

  const qualSongs = shuffled.slice(0, qualSlots);
  const byeSongs  = shuffled.slice(qualSlots);

  const qualMatchups = [];
  for (let i = 0; i < qualSlots; i += 2) {
    qualMatchups.push({ a: qualSongs[i], b: qualSongs[i + 1] });
  }

  state.rounds = [qualMatchups];
  state.byeSongs = byeSongs;
  state.currentRound = 0;
  state.currentMatch = 0;
  state.winners = [];
  state.scores = { iyed: 0, yomna: 0 };
  state.matchesPlayed = 0;
  state.totalMatches = total - 1;
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function currentMatchup() {
  return state.rounds[state.currentRound]?.[state.currentMatch];
}

/* ─── RENDER BATTLE ─── */
function renderBattle() {
  const match = currentMatchup();
  if (!match) return;

  const stageNames = ['Qualification', 'Round of 32', 'Round of 16', 'Quarter-Final', 'Semi-Final', 'Final ✨'];
  document.getElementById('stage-label').textContent = stageNames[state.currentRound] || `Round ${state.currentRound + 1}`;

  state.matchesPlayed = calcMatchesPlayed();
  const pct = Math.round((state.matchesPlayed / state.totalMatches) * 100);
  document.getElementById('progress-fill').style.width = pct + '%';
  document.getElementById('progress-text').textContent =
    `Match ${state.currentMatch + 1} of ${state.rounds[state.currentRound].length}`;

  document.getElementById('score-iyed').textContent = `Iyed: ${state.scores.iyed}`;
  document.getElementById('score-yomna').textContent = `Yomna: ${state.scores.yomna}`;

  renderSongCard('a', match.a);
  renderSongCard('b', match.b);

  state.votes = { iyed: null, yomna: null };
  updateVoteUI();

  document.getElementById('agree-banner').hidden = true;
  document.getElementById('disagree-banner').hidden = true;
  document.getElementById('card-a').classList.remove('winner-glow');
  document.getElementById('card-b').classList.remove('winner-glow');

  // Stop any playing iframes
  stopAllPlayers();
}

function calcMatchesPlayed() {
  let played = 0;
  for (let r = 0; r < state.currentRound; r++) played += state.rounds[r].length;
  return played + state.currentMatch;
}

function renderSongCard(side, song) {
  document.getElementById(`rank-${side}`).textContent = side.toUpperCase();
  document.getElementById(`title-${side}`).textContent = song.title;
  document.getElementById(`artist-${side}`).textContent = song.artist || 'Unknown Artist';

  const artEl = document.getElementById(`artwork-${side}`);
  if (song.artworkUrl) {
    artEl.innerHTML = `<img src="${song.artworkUrl}" alt="${song.title}" onerror="this.parentElement.innerHTML='<div class=artwork-inner><span class=note-icon>♪</span></div>'" />`;
  } else {
    artEl.innerHTML = `<div class="artwork-inner"><span class="note-icon">♪</span></div>`;
  }

  const ytLink = document.getElementById(`yt-link-${side}`);
  if (ytLink) {
    ytLink.href = song.ytId
      ? `https://music.youtube.com/watch?v=${song.ytId}`
      : `https://music.youtube.com/search?q=${encodeURIComponent(song.title + ' ' + song.artist)}`;
  }

  // Update the iframe src (but don't autoplay yet)
  const frame = document.getElementById(`yt-frame-${side}`);
  if (frame) frame.dataset.ytid = song.ytId || '';
  const btn = document.getElementById(`btn-listen-${side}`);
  if (btn) {
    btn.textContent = song.ytId ? '\u25b6 Listen' : '\u25b6 Search';
    btn.classList.remove('playing');
    btn.disabled = !song.ytId && !song.title;
  }
}

/* ─── IFRAME PLAYER ─── */
function togglePlayer(side) {
  const wrap = document.getElementById(`player-wrap-${side}`);
  const frame = document.getElementById(`yt-frame-${side}`);
  const btn = document.getElementById(`btn-listen-${side}`);
  const isOpen = !wrap.hidden;

  if (isOpen) {
    // Close: stop video by clearing src
    frame.src = '';
    wrap.hidden = true;
    btn.textContent = '\u25b6 Listen';
    btn.classList.remove('playing');
  } else {
    const ytId = frame.dataset.ytid;
    if (!ytId) return;
    frame.src = `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1`;
    wrap.hidden = false;
    btn.textContent = '\u23f9 Stop';
    btn.classList.add('playing');
  }
}

function stopAllPlayers() {
  ['a', 'b'].forEach(side => {
    const wrap = document.getElementById(`player-wrap-${side}`);
    const frame = document.getElementById(`yt-frame-${side}`);
    const btn = document.getElementById(`btn-listen-${side}`);
    if (wrap && !wrap.hidden) {
      frame.src = '';
      wrap.hidden = true;
      if (btn) { btn.textContent = '\u25b6 Listen'; btn.classList.remove('playing'); }
    }
  });
}

/* ─── VOTE UI ─── */
function updateVoteUI() {
  document.querySelectorAll('.voter-btn').forEach(btn => {
    const voter = btn.dataset.voter;
    const side  = btn.dataset.side;
    btn.classList.remove('voted-you', 'voted-yomna');
    btn.querySelector('.vote-check').hidden = true;
    if (state.votes[voter] === side) {
      btn.classList.add(voter === 'iyed' ? 'voted-you' : 'voted-yomna');
      btn.querySelector('.vote-check').hidden = false;
    }
  });

  const { iyed, yomna } = state.votes;
  if (iyed && yomna) {
    if (iyed === yomna) showAgreement(iyed);
    else showDisagreement();
  }
}

function showAgreement(side) {
  const match = currentMatchup();
  const winner = side === 'a' ? match.a : match.b;
  document.getElementById(`card-${side}`).classList.add('winner-glow');
  document.getElementById(`card-${side === 'a' ? 'b' : 'a'}`).classList.remove('winner-glow');

  const emoji = ['🎉', '🎶', '✨', '🔥', '💜', '🌟', '❤️', '🎵'][Math.floor(Math.random() * 8)];
  document.getElementById('agree-emoji').textContent = emoji;
  document.getElementById('agree-text').textContent = `You both chose "${winner.title}"!`;
  document.getElementById('agree-banner').hidden = false;
  document.getElementById('disagree-banner').hidden = true;

  if (state.votes.iyed === side) state.scores.iyed++;
  if (state.votes.yomna === side) state.scores.yomna++;
}

function showDisagreement() {
  document.getElementById('agree-banner').hidden = true;
  const db = document.getElementById('disagree-banner');
  db.hidden = false;
  db.style.animation = 'none';
  db.offsetHeight;
  db.style.animation = '';
}

/* ─── ADVANCE ─── */
function advanceMatch() {
  const match = currentMatchup();
  const winner = state.votes.iyed === 'a' ? match.a : match.b;
  state.winners.push(winner);
  state.currentMatch++;

  if (state.currentMatch >= state.rounds[state.currentRound].length) {
    advanceRound();
  } else {
    renderBattle();
  }
}

function advanceRound() {
  let advancing = [...state.winners];
  if (state.currentRound === 0 && state.byeSongs?.length) {
    advancing = shuffle([...advancing, ...state.byeSongs]);
  }
  if (advancing.length === 1) { showWinner(advancing[0]); return; }

  const nextRound = [];
  for (let i = 0; i < advancing.length; i += 2) {
    nextRound.push({ a: advancing[i], b: advancing[i + 1] });
  }
  state.rounds.push(nextRound);
  state.currentRound++;
  state.currentMatch = 0;
  state.winners = [];
  renderBattle();
}

/* ─── WINNER ─── */
function showWinner(song) {
  document.getElementById('winner-title').textContent = song.title;
  document.getElementById('winner-artist').textContent = song.artist || 'Unknown Artist';
  const artEl = document.getElementById('winner-artwork');
  if (song.artworkUrl) artEl.innerHTML = `<img src="${song.artworkUrl}" alt="${song.title}" />`;
  const link = document.getElementById('winner-link');
  link.href = song.ytId
    ? `https://music.youtube.com/watch?v=${song.ytId}`
    : `https://music.youtube.com/search?q=${encodeURIComponent(song.title + ' ' + song.artist)}`;
  showScreen('screen-winner');
  launchConfetti();
}

function launchConfetti() {
  const emojis = ['🎵', '🎶', '❤️', '🌟', '✨', '🎉', '💜', '🔥', '🎸', '🎤', '💕', '🎼'];
  const layer = document.getElementById('confetti-layer');
  layer.innerHTML = '';
  for (let i = 0; i < 60; i++) {
    const el = document.createElement('span');
    el.className = 'confetti-piece';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.top = '-60px';
    el.style.animationDuration = (2 + Math.random() * 4) + 's';
    el.style.animationDelay = (Math.random() * 4) + 's';
    layer.appendChild(el);
  }
}

/* ─── SONG LIST PREVIEW ─── */
function renderSongPreview(songs) {
  const container = document.getElementById('song-preview');
  container.innerHTML = `<h3>📋 ${songs.length} Songs Ready</h3>`;
  songs.forEach((s, i) => {
    const div = document.createElement('div');
    div.className = 'song-item';
    div.innerHTML = `<span class="song-num">${i + 1}</span><span>${s.title}${s.artist ? ' — ' + s.artist : ''}</span>`;
    container.appendChild(div);
  });
  container.hidden = false;
}

/* ─── INIT ─── */
document.addEventListener('DOMContentLoaded', () => {
  // Pre-load the playlist immediately
  state.songs = [...PLAYLIST_SONGS];
  renderSongPreview(state.songs);
  document.getElementById('btn-start').hidden = false;

  // Show it's pre-loaded
  const urlInput = document.getElementById('playlist-url');
  const fetchBtn = document.getElementById('btn-fetch');
  urlInput.value = 'https://music.youtube.com/playlist?list=PLcwzilaKdgP4';
  urlInput.disabled = true;
  fetchBtn.querySelector('.btn-text').textContent = '✓ Loaded!';
  fetchBtn.disabled = true;
  fetchBtn.style.background = 'linear-gradient(135deg, #14b8a6, #3b82f6)';
  fetchBtn.style.boxShadow = '0 4px 20px rgba(20,184,166,.4)';

  /* — Manual override — */
  document.getElementById('btn-manual').addEventListener('click', () => {
    const text = document.getElementById('manual-songs').value.trim();
    if (!text) return;
    const songs = parseSongsFromText(text);
    if (songs.length < 4) { alert('Please enter at least 4 songs.'); return; }
    state.songs = songs;
    renderSongPreview(songs);
    document.getElementById('btn-start').hidden = false;
  });

  /* — Start — */
  document.getElementById('btn-start').addEventListener('click', () => {
    if (!state.songs.length) return;
    buildTournament(state.songs);
    showScreen('screen-battle');
    renderBattle();
  });

  /* — Votes — */
  document.querySelectorAll('.voter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const voter = btn.dataset.voter;
      const side  = btn.dataset.side;
      state.votes[voter] = state.votes[voter] === side ? null : side;
      updateVoteUI();
    });
  });

  /* — Next match — */
  document.getElementById('btn-next').addEventListener('click', advanceMatch);

  /* — Restart — */
  document.getElementById('btn-restart').addEventListener('click', () => {
    state.songs = [];
    state.rounds = [];
    stopAllPlayers();
    document.getElementById('playlist-url').value = '';
    document.getElementById('manual-songs').value = '';
    document.getElementById('song-preview').hidden = true;
    document.getElementById('btn-start').hidden = true;
    document.getElementById('fetch-error').hidden = true;
    showScreen('screen-landing');
  });

  /* — Enter key on URL input — */
  document.getElementById('playlist-url').addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('btn-fetch').click();
  });
});
