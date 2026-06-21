/* ===================================================
   PLAYLIST BATTLE — app.js
   Iyed & Yomna · 56 songs · Tournament to the death
   =================================================== */

/* ─── YOUR 56 SONGS ─── */
const PLAYLIST_SONGS = [
  { title: "James Dean", artist: "Cairokee", ytId: "m540R-vGLlI", artworkUrl: "https://i.ytimg.com/vi/m540R-vGLlI/hqdefault.jpg" },
  { title: "Kelma", artist: "Ramy Sabry", ytId: "XDrNd5qkza4", artworkUrl: "https://i.ytimg.com/vi/XDrNd5qkza4/hqdefault.jpg" },
  { title: "Heseeny", artist: "TUL8TE", ytId: "bcMIr1xhXQI", artworkUrl: "https://i.ytimg.com/vi/bcMIr1xhXQI/hqdefault.jpg" },
  { title: "Nefsy Ahbek", artist: "Cairokee", ytId: "NGiRwLC3Xc8", artworkUrl: "https://i.ytimg.com/vi/NGiRwLC3Xc8/hqdefault.jpg" },
  { title: "Khalik Ma'aya", artist: "Amr Diab", ytId: "bmbHfXq2CAc", artworkUrl: "https://i.ytimg.com/vi/bmbHfXq2CAc/hqdefault.jpg" },
  { title: "Mesh Habibi Bas", artist: "Angham", ytId: "SYLHTvxe7NQ", artworkUrl: "https://i.ytimg.com/vi/SYLHTvxe7NQ/hqdefault.jpg" },
  { title: "We Akhyran", artist: "Mahmoud El Esseily", ytId: "v41hcsVUbV0", artworkUrl: "https://i.ytimg.com/vi/v41hcsVUbV0/hqdefault.jpg" },
  { title: "Athadda Al Aalam", artist: "Saber Rebai", ytId: "CqWNFChfCl4", artworkUrl: "https://i.ytimg.com/vi/CqWNFChfCl4/hqdefault.jpg" },
  { title: "Hob Taht El Enshaa", artist: "Amir Eid", ytId: "JmUBIwK7d-E", artworkUrl: "https://i.ytimg.com/vi/JmUBIwK7d-E/hqdefault.jpg" },
  { title: "Ymken Kher", artist: "Ramy Sabry", ytId: "WgrLAh4BxPo", artworkUrl: "https://i.ytimg.com/vi/WgrLAh4BxPo/hqdefault.jpg" },
  { title: "Amarain", artist: "Amr Diab", ytId: "P1VVPMwGgPs", artworkUrl: "https://i.ytimg.com/vi/P1VVPMwGgPs/hqdefault.jpg" },
  { title: "Doub", artist: "TUL8TE", ytId: "MLgCidfXl4Y", artworkUrl: "https://i.ytimg.com/vi/MLgCidfXl4Y/hqdefault.jpg" },
  { title: "Ana Mish Haykoon", artist: "Mahmoud El Esseily", ytId: "-2fGsXONSMU", artworkUrl: "https://i.ytimg.com/vi/-2fGsXONSMU/hqdefault.jpg" },
  { title: "Aam Bimzah Maak", artist: "Najwa Karam", ytId: "C_Z6djJNT7Y", artworkUrl: "https://i.ytimg.com/vi/C_Z6djJNT7Y/hqdefault.jpg" },
  { title: "Fakkerni", artist: "Fairuz", ytId: "l9UQabALQZA", artworkUrl: "https://i.ytimg.com/vi/l9UQabALQZA/hqdefault.jpg" },
  { title: "Basrah w Atooh", artist: "Cairokee", ytId: "948wqojRi4I", artworkUrl: "https://i.ytimg.com/vi/948wqojRi4I/hqdefault.jpg" },
  { title: "Rouh Rouhi", artist: "Najwa Karam", ytId: "-ZTMCkDPFvQ", artworkUrl: "https://i.ytimg.com/vi/-ZTMCkDPFvQ/hqdefault.jpg" },
  { title: "Kda Kda Bayza", artist: "Mahmoud El Esseily ft. Aly Fathalla", ytId: "ewrWugmoavQ", artworkUrl: "https://i.ytimg.com/vi/ewrWugmoavQ/hqdefault.jpg" },
  { title: "Na7nou7", artist: "Donia Samir Ghanem", ytId: "6-FV8bo3DgU", artworkUrl: "https://i.ytimg.com/vi/6-FV8bo3DgU/hqdefault.jpg" },
  { title: "Maghroumah", artist: "Najwa Karam", ytId: "u-0-AkkuMJ8", artworkUrl: "https://i.ytimg.com/vi/u-0-AkkuMJ8/hqdefault.jpg" },
  { title: "Kesert Koul El Nass", artist: "Georges Wassouf", ytId: "NbDLkKe3hfs", artworkUrl: "https://i.ytimg.com/vi/NbDLkKe3hfs/hqdefault.jpg" },
  { title: "Hobek Ghala", artist: "JAB", ytId: "S4j7cKGymhI", artworkUrl: "https://i.ytimg.com/vi/S4j7cKGymhI/hqdefault.jpg" },
  { title: "Wainek Min Zaman", artist: "Yazan Haifawi", ytId: "rbPcNV0gfLA", artworkUrl: "https://i.ytimg.com/vi/rbPcNV0gfLA/hqdefault.jpg" },
  { title: "Haygely Mawgow3", artist: "Tamer Ashour", ytId: "6r2nBhBUYHs", artworkUrl: "https://i.ytimg.com/vi/6r2nBhBUYHs/hqdefault.jpg" },
  { title: "Koul Waad", artist: "Wael Jassar", ytId: "8sbWhSQ9Dx4", artworkUrl: "https://i.ytimg.com/vi/8sbWhSQ9Dx4/hqdefault.jpg" },
  { title: "Ale Eih Beyessalouni", artist: "Wael Jassar", ytId: "h6r_g0_t-CQ", artworkUrl: "https://i.ytimg.com/vi/h6r_g0_t-CQ/hqdefault.jpg" },
  { title: "Betew7ashini", artist: "Wael Jassar", ytId: "rngxuyPZ7Zo", artworkUrl: "https://i.ytimg.com/vi/rngxuyPZ7Zo/hqdefault.jpg" },
  { title: "Nasini El Donya", artist: "Ragheb Alama", ytId: "LHRzANXJEEM", artworkUrl: "https://i.ytimg.com/vi/LHRzANXJEEM/hqdefault.jpg" },
  { title: "We Maloh", artist: "Amr Diab", ytId: "n45XOgKijec", artworkUrl: "https://i.ytimg.com/vi/n45XOgKijec/hqdefault.jpg" },
  { title: "Kel El Qasayed", artist: "Marwan Khoury", ytId: "5EgyhbdSZoU", artworkUrl: "https://i.ytimg.com/vi/5EgyhbdSZoU/hqdefault.jpg" },
  { title: "Mafi Mennik", artist: "Aziz Maraka", ytId: "K4NACOEF0Qo", artworkUrl: "https://i.ytimg.com/vi/K4NACOEF0Qo/hqdefault.jpg" },
  { title: "Narein", artist: "TUL8TE", ytId: "JnCTOi2QAZk", artworkUrl: "https://i.ytimg.com/vi/JnCTOi2QAZk/hqdefault.jpg" },
  { title: "Ana Baashaak", artist: "Nancy Ajram", ytId: "xdc7D2D3EKU", artworkUrl: "https://i.ytimg.com/vi/xdc7D2D3EKU/hqdefault.jpg" },
  { title: "Aayshalak", artist: "Elissa", ytId: "hODVrXRGsY4", artworkUrl: "https://i.ytimg.com/vi/hODVrXRGsY4/hqdefault.jpg" },
  { title: "Laiel El Ashekin", artist: "Georges Wassouf", ytId: "rQ7CahWbJUo", artworkUrl: "https://i.ytimg.com/vi/rQ7CahWbJUo/hqdefault.jpg" },
  { title: "Wehyaty Andak", artist: "Zekra", ytId: "X8XRKItBWi8", artworkUrl: "https://i.ytimg.com/vi/X8XRKItBWi8/hqdefault.jpg" },
  { title: "Khaleni Zekra", artist: "Wael Jassar", ytId: "Dnwa8_03ULY", artworkUrl: "https://i.ytimg.com/vi/Dnwa8_03ULY/hqdefault.jpg" },
  { title: "Je T'aime", artist: "Lara Fabian", ytId: "vz0OIwXOOYE", artworkUrl: "https://i.ytimg.com/vi/vz0OIwXOOYE/hqdefault.jpg" },
  { title: "Et si tu n'existais pas", artist: "Joe Dassin", ytId: "EJLDd-VOH1U", artworkUrl: "https://i.ytimg.com/vi/EJLDd-VOH1U/hqdefault.jpg" },
  { title: "Habaitak Belsaif", artist: "Fayrouz", ytId: "WWllBI4oheI", artworkUrl: "https://i.ytimg.com/vi/WWllBI4oheI/hqdefault.jpg" },
  { title: "Esmaa Alby", artist: "Majida El Roumi", ytId: "DDr9MpVV2GM", artworkUrl: "https://i.ytimg.com/vi/DDr9MpVV2GM/hqdefault.jpg" },
  { title: "Nghir Alik", artist: "YUMA", ytId: "sTXv0sPgjXY", artworkUrl: "https://i.ytimg.com/vi/sTXv0sPgjXY/hqdefault.jpg" },
  { title: "Ya Tara", artist: "Bahaa Sultan", ytId: "HrcGwDdti7Q", artworkUrl: "https://i.ytimg.com/vi/HrcGwDdti7Q/hqdefault.jpg" },
  { title: "Hob Hayaty", artist: "Bahaa Sultan", ytId: "hMh9fwZnNDo", artworkUrl: "https://i.ytimg.com/vi/hMh9fwZnNDo/hqdefault.jpg" },
  { title: "Je veux", artist: "Zaz", ytId: "Z7cuTnbF-2c", artworkUrl: "https://i.ytimg.com/vi/Z7cuTnbF-2c/hqdefault.jpg" },
  { title: "Ya Ghali", artist: "Fadel Chaker", ytId: "0B3tagy4eBc", artworkUrl: "https://i.ytimg.com/vi/0B3tagy4eBc/hqdefault.jpg" },
  { title: "Rak Enti", artist: "TUL8TE", ytId: "_MuRtKVA7w4", artworkUrl: "https://i.ytimg.com/vi/_MuRtKVA7w4/hqdefault.jpg" },
  { title: "Bent El Shou7", artist: "Fadel Chaker", ytId: "dk2tFHCWb2s", artworkUrl: "https://i.ytimg.com/vi/dk2tFHCWb2s/hqdefault.jpg" },
  { title: "Maghrorah", artist: "Release", ytId: "H6QV6vG8SfU", artworkUrl: "https://i.ytimg.com/vi/H6QV6vG8SfU/hqdefault.jpg" },
  { title: "Helwa Ya Baladi", artist: "Dalida", ytId: "39RHI3ZZwLc", artworkUrl: "https://i.ytimg.com/vi/39RHI3ZZwLc/hqdefault.jpg" },
  { title: "Matrahak Bi Albi", artist: "Majida El Roumi", ytId: "D450gaz-Xqo", artworkUrl: "https://i.ytimg.com/vi/D450gaz-Xqo/hqdefault.jpg" },
  { title: "Awel Mara", artist: "Abdel Halim Hafez", ytId: "qhqJYGn5x5E", artworkUrl: "https://i.ytimg.com/vi/qhqJYGn5x5E/hqdefault.jpg" },
  { title: "Ana Ghaltan", artist: "Bahaa Sultan", ytId: "515OrfbY324", artworkUrl: "https://i.ytimg.com/vi/515OrfbY324/hqdefault.jpg" },
  { title: "Ahlamna", artist: "Angham & Cairokee", ytId: "TtexFbGjS8w", artworkUrl: "https://i.ytimg.com/vi/TtexFbGjS8w/hqdefault.jpg" },
  { title: "Ya Habib El Alb", artist: "Sayed Sallam", ytId: "0pdeBt1o_zE", artworkUrl: "https://i.ytimg.com/vi/0pdeBt1o_zE/hqdefault.jpg" },
  { title: "Bayent El Hob Alaya", artist: "Mayada El Hennawy", ytId: "63Oe7moEdao", artworkUrl: "https://i.ytimg.com/vi/63Oe7moEdao/hqdefault.jpg" },
];

/* ─── STATE ─── */
const state = {
  songs: [],
  rounds: [],
  currentRound: 0,
  currentMatch: 0,
  votes: { iyed: null, yomna: null },
  winners: [],
  byeSongs: [],
  scores: { iyed: 0, yomna: 0 },
  totalMatches: 0,
  matchesPlayed: 0,
};

/* ─── SCREENS ─── */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

/* ─── TOURNAMENT SETUP ─── */
// 56 songs → bracket of 64 → 8 byes → Qual (24 matches) + R32 + R16 + QF + SF + Final = 55 matches
function buildTournament(songs) {
  const shuffled = shuffle([...songs]);
  const total = shuffled.length;
  let bracketSize = 1;
  while (bracketSize < total) bracketSize *= 2;
  const byes = bracketSize - total;
  const qualSlots = total - byes;

  const qualSongs = shuffled.slice(0, qualSlots);
  state.byeSongs = shuffled.slice(qualSlots);

  const qualMatchups = [];
  for (let i = 0; i < qualSlots; i += 2) {
    qualMatchups.push({ a: qualSongs[i], b: qualSongs[i + 1] });
  }

  state.rounds       = [qualMatchups];
  state.currentRound = 0;
  state.currentMatch = 0;
  state.winners      = [];
  state.scores       = { iyed: 0, yomna: 0 };
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
  document.getElementById('stage-label').textContent =
    stageNames[state.currentRound] || `Round ${state.currentRound + 1}`;

  let played = 0;
  for (let r = 0; r < state.currentRound; r++) played += state.rounds[r].length;
  played += state.currentMatch;
  const pct = Math.round((played / state.totalMatches) * 100);
  document.getElementById('progress-fill').style.width = pct + '%';
  document.getElementById('progress-text').textContent =
    `Match ${state.currentMatch + 1} of ${state.rounds[state.currentRound].length}`;

  document.getElementById('score-iyed').textContent  = `Iyed: ${state.scores.iyed}`;
  document.getElementById('score-yomna').textContent = `Yomna: ${state.scores.yomna}`;

  renderSongCard('a', match.a);
  renderSongCard('b', match.b);

  state.votes = { iyed: null, yomna: null };
  updateVoteUI();

  document.getElementById('agree-banner').hidden    = true;
  document.getElementById('disagree-banner').hidden = true;
  document.getElementById('card-a').classList.remove('winner-glow');
  document.getElementById('card-b').classList.remove('winner-glow');

  stopAllPlayers();
}

function renderSongCard(side, song) {
  document.getElementById(`rank-${side}`).textContent   = side.toUpperCase();
  document.getElementById(`title-${side}`).textContent  = song.title;
  document.getElementById(`artist-${side}`).textContent = song.artist || 'Unknown Artist';

  const artEl = document.getElementById(`artwork-${side}`);
  if (song.artworkUrl) {
    artEl.innerHTML = `<img src="${song.artworkUrl}" alt="${song.title}"
      onerror="this.parentElement.innerHTML='<div class=artwork-inner><span class=note-icon>♪</span></div>'" />`;
  } else {
    artEl.innerHTML = `<div class="artwork-inner"><span class="note-icon">♪</span></div>`;
  }

  // Store ytId on the iframe for later use
  const frame = document.getElementById(`yt-frame-${side}`);
  if (frame) frame.dataset.ytid = song.ytId || '';

  const btn = document.getElementById(`btn-listen-${side}`);
  if (btn) {
    btn.textContent = '▶ Listen';
    btn.classList.remove('playing');
  }
}

/* ─── IFRAME PLAYER ─── */
function togglePlayer(side) {
  const wrap  = document.getElementById(`player-wrap-${side}`);
  const frame = document.getElementById(`yt-frame-${side}`);
  const btn   = document.getElementById(`btn-listen-${side}`);
  const isOpen = !wrap.hidden;

  if (isOpen) {
    frame.src = '';
    wrap.hidden = true;
    btn.textContent = '▶ Listen';
    btn.classList.remove('playing');
  } else {
    const ytId = frame.dataset.ytid;
    if (!ytId) return;
    frame.src = `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1`;
    wrap.hidden = false;
    btn.textContent = '⏹ Stop';
    btn.classList.add('playing');
  }
}

function stopAllPlayers() {
  ['a', 'b'].forEach(side => {
    const wrap  = document.getElementById(`player-wrap-${side}`);
    const frame = document.getElementById(`yt-frame-${side}`);
    const btn   = document.getElementById(`btn-listen-${side}`);
    if (wrap && !wrap.hidden) {
      frame.src = '';
      wrap.hidden = true;
    }
    if (btn) { btn.textContent = '▶ Listen'; btn.classList.remove('playing'); }
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
  const match  = currentMatchup();
  const winner = side === 'a' ? match.a : match.b;

  document.getElementById(`card-${side}`).classList.add('winner-glow');
  document.getElementById(`card-${side === 'a' ? 'b' : 'a'}`).classList.remove('winner-glow');

  const emoji = ['🎉','🎶','✨','🔥','💜','🌟','❤️','🎵'][Math.floor(Math.random() * 8)];
  document.getElementById('agree-emoji').textContent = emoji;
  document.getElementById('agree-text').textContent  = `You both chose "${winner.title}"!`;
  document.getElementById('agree-banner').hidden    = false;
  document.getElementById('disagree-banner').hidden = true;

  if (state.votes.iyed  === side) state.scores.iyed++;
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
  const match  = currentMatchup();
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
  if (state.currentRound === 0 && state.byeSongs.length) {
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
  document.getElementById('winner-title').textContent  = song.title;
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
  const emojis = ['🎵','🎶','❤️','🌟','✨','🎉','💜','🔥','🎸','🎤','💕','🎼'];
  const layer  = document.getElementById('confetti-layer');
  layer.innerHTML = '';
  for (let i = 0; i < 60; i++) {
    const el = document.createElement('span');
    el.className = 'confetti-piece';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.top  = '-60px';
    el.style.animationDuration = (2 + Math.random() * 4) + 's';
    el.style.animationDelay   = (Math.random() * 4) + 's';
    layer.appendChild(el);
  }
}

/* ─── SONG PREVIEW ─── */
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

  // Pre-load all 56 songs immediately
  state.songs = [...PLAYLIST_SONGS];
  renderSongPreview(state.songs);
  document.getElementById('btn-start').hidden = false;

  // Mark URL field as already loaded
  const urlInput = document.getElementById('playlist-url');
  const fetchBtn = document.getElementById('btn-fetch');
  urlInput.value    = 'https://music.youtube.com/playlist?list=PLcwzilaKdgP4';
  urlInput.disabled = true;
  fetchBtn.innerHTML = '✓ Loaded';
  fetchBtn.disabled = true;
  fetchBtn.style.background  = 'linear-gradient(135deg, #14b8a6, #3b82f6)';
  fetchBtn.style.boxShadow   = '0 4px 20px rgba(20,184,166,.4)';

  // Manual override still works
  document.getElementById('btn-manual').addEventListener('click', () => {
    const text = document.getElementById('manual-songs').value.trim();
    if (!text) return;
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean).map(line => {
      const sep = line.includes(' - ') ? ' - ' : (line.includes(' – ') ? ' – ' : null);
      if (sep) {
        const [title, ...rest] = line.split(sep);
        return { title: title.trim(), artist: rest.join(sep).trim(), ytId: '', artworkUrl: '' };
      }
      return { title: line, artist: '', ytId: '', artworkUrl: '' };
    });
    if (lines.length < 4) { alert('Please enter at least 4 songs.'); return; }
    state.songs = lines;
    renderSongPreview(state.songs);
    document.getElementById('btn-start').hidden = false;
  });

  // Start button
  document.getElementById('btn-start').addEventListener('click', () => {
    if (!state.songs.length) return;
    buildTournament(state.songs);
    showScreen('screen-battle');
    renderBattle();
  });

  // Vote buttons
  document.querySelectorAll('.voter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const voter = btn.dataset.voter;
      const side  = btn.dataset.side;
      state.votes[voter] = state.votes[voter] === side ? null : side;
      updateVoteUI();
    });
  });

  // Next match
  document.getElementById('btn-next').addEventListener('click', advanceMatch);

  // Restart
  document.getElementById('btn-restart').addEventListener('click', () => {
    stopAllPlayers();
    state.songs  = [...PLAYLIST_SONGS];
    state.rounds = [];
    showScreen('screen-landing');
  });
});
