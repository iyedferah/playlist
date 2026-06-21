/* ===================================================
   PLAYLIST BATTLE — app.js
   Iyed & Yomna · Wildcard Format (56 -> 32)
   Round 1 (28 matches) -> 28 winners + 4 random "Lucky Losers" = 32
   Top 32 -> Sweet 16 -> Elite 8 -> Final 4 -> Final
   =================================================== */

const PLAYLIST_SONGS = [
  { title: "James Dean",              artist: "Cairokee",                            ytId: "m540R-vGLlI", artworkUrl: "https://i.ytimg.com/vi/m540R-vGLlI/hqdefault.jpg" },
  { title: "Kelma",                   artist: "Ramy Sabry",                          ytId: "XDrNd5qkza4", artworkUrl: "https://i.ytimg.com/vi/XDrNd5qkza4/hqdefault.jpg" },
  { title: "Heseeny",                 artist: "TUL8TE",                              ytId: "bcMIr1xhXQI", artworkUrl: "https://i.ytimg.com/vi/bcMIr1xhXQI/hqdefault.jpg" },
  { title: "Nefsy Ahbek",             artist: "Cairokee",                            ytId: "NGiRwLC3Xc8", artworkUrl: "https://i.ytimg.com/vi/NGiRwLC3Xc8/hqdefault.jpg" },
  { title: "Khalik Ma'aya",           artist: "Amr Diab",                            ytId: "bmbHfXq2CAc", artworkUrl: "https://i.ytimg.com/vi/bmbHfXq2CAc/hqdefault.jpg" },
  { title: "Mesh Habibi Bas",         artist: "Angham",                              ytId: "SYLHTvxe7NQ", artworkUrl: "https://i.ytimg.com/vi/SYLHTvxe7NQ/hqdefault.jpg" },
  { title: "We Akhyran",              artist: "Mahmoud El Esseily",                  ytId: "v41hcsVUbV0", artworkUrl: "https://i.ytimg.com/vi/v41hcsVUbV0/hqdefault.jpg" },
  { title: "Athadda Al Aalam",        artist: "Saber Rebai",                         ytId: "CqWNFChfCl4", artworkUrl: "https://i.ytimg.com/vi/CqWNFChfCl4/hqdefault.jpg" },
  { title: "Hob Taht El Enshaa",      artist: "Amir Eid",                            ytId: "JmUBIwK7d-E", artworkUrl: "https://i.ytimg.com/vi/JmUBIwK7d-E/hqdefault.jpg" },
  { title: "Ymken Kher",              artist: "Ramy Sabry",                          ytId: "WgrLAh4BxPo", artworkUrl: "https://i.ytimg.com/vi/WgrLAh4BxPo/hqdefault.jpg" },
  { title: "Amarain",                 artist: "Amr Diab",                            ytId: "P1VVPMwGgPs", artworkUrl: "https://i.ytimg.com/vi/P1VVPMwGgPs/hqdefault.jpg" },
  { title: "Doub",                    artist: "TUL8TE",                              ytId: "MLgCidfXl4Y", artworkUrl: "https://i.ytimg.com/vi/MLgCidfXl4Y/hqdefault.jpg" },
  { title: "Ana Mish Haykoon",        artist: "Mahmoud El Esseily",                  ytId: "-2fGsXONSMU", artworkUrl: "https://i.ytimg.com/vi/-2fGsXONSMU/hqdefault.jpg" },
  { title: "Aam Bimzah Maak",         artist: "Najwa Karam",                         ytId: "C_Z6djJNT7Y", artworkUrl: "https://i.ytimg.com/vi/C_Z6djJNT7Y/hqdefault.jpg" },
  { title: "Fakkerni",                artist: "Fairuz",                              ytId: "l9UQabALQZA", artworkUrl: "https://i.ytimg.com/vi/l9UQabALQZA/hqdefault.jpg" },
  { title: "Basrah w Atooh",          artist: "Cairokee",                            ytId: "948wqojRi4I", artworkUrl: "https://i.ytimg.com/vi/948wqojRi4I/hqdefault.jpg" },
  { title: "Rouh Rouhi",              artist: "Najwa Karam",                         ytId: "-ZTMCkDPFvQ", artworkUrl: "https://i.ytimg.com/vi/-ZTMCkDPFvQ/hqdefault.jpg" },
  { title: "Kda Kda Bayza",           artist: "Mahmoud El Esseily ft. Aly Fathalla", ytId: "ewrWugmoavQ", artworkUrl: "https://i.ytimg.com/vi/ewrWugmoavQ/hqdefault.jpg" },
  { title: "Na7nou7",                 artist: "Donia Samir Ghanem",                  ytId: "6-FV8bo3DgU", artworkUrl: "https://i.ytimg.com/vi/6-FV8bo3DgU/hqdefault.jpg" },
  { title: "Maghroumah",              artist: "Najwa Karam",                         ytId: "u-0-AkkuMJ8", artworkUrl: "https://i.ytimg.com/vi/u-0-AkkuMJ8/hqdefault.jpg" },
  { title: "Kesert Koul El Nass",     artist: "Georges Wassouf",                     ytId: "NbDLkKe3hfs", artworkUrl: "https://i.ytimg.com/vi/NbDLkKe3hfs/hqdefault.jpg" },
  { title: "Hobek Ghala",             artist: "JAB",                                 ytId: "S4j7cKGymhI", artworkUrl: "https://i.ytimg.com/vi/S4j7cKGymhI/hqdefault.jpg" },
  { title: "Wainek Min Zaman",        artist: "Yazan Haifawi",                       ytId: "rbPcNV0gfLA", artworkUrl: "https://i.ytimg.com/vi/rbPcNV0gfLA/hqdefault.jpg" },
  { title: "Haygely Mawgow3",         artist: "Tamer Ashour",                        ytId: "6r2nBhBUYHs", artworkUrl: "https://i.ytimg.com/vi/6r2nBhBUYHs/hqdefault.jpg" },
  { title: "Koul Waad",               artist: "Wael Jassar",                         ytId: "8sbWhSQ9Dx4", artworkUrl: "https://i.ytimg.com/vi/8sbWhSQ9Dx4/hqdefault.jpg" },
  { title: "Ale Eih Beyessalouni",    artist: "Wael Jassar",                         ytId: "h6r_g0_t-CQ", artworkUrl: "https://i.ytimg.com/vi/h6r_g0_t-CQ/hqdefault.jpg" },
  { title: "Betew7ashini",            artist: "Wael Jassar",                         ytId: "rngxuyPZ7Zo", artworkUrl: "https://i.ytimg.com/vi/rngxuyPZ7Zo/hqdefault.jpg" },
  { title: "Nasini El Donya",         artist: "Ragheb Alama",                        ytId: "LHRzANXJEEM", artworkUrl: "https://i.ytimg.com/vi/LHRzANXJEEM/hqdefault.jpg" },
  { title: "We Maloh",                artist: "Amr Diab",                            ytId: "n45XOgKijec", artworkUrl: "https://i.ytimg.com/vi/n45XOgKijec/hqdefault.jpg" },
  { title: "Kel El Qasayed",          artist: "Marwan Khoury",                       ytId: "5EgyhbdSZoU", artworkUrl: "https://i.ytimg.com/vi/5EgyhbdSZoU/hqdefault.jpg" },
  { title: "Mafi Mennik",             artist: "Aziz Maraka",                         ytId: "K4NACOEF0Qo", artworkUrl: "https://i.ytimg.com/vi/K4NACOEF0Qo/hqdefault.jpg" },
  { title: "Narein",                  artist: "TUL8TE",                              ytId: "JnCTOi2QAZk", artworkUrl: "https://i.ytimg.com/vi/JnCTOi2QAZk/hqdefault.jpg" },
  { title: "Ana Baashaak",            artist: "Nancy Ajram",                         ytId: "xdc7D2D3EKU", artworkUrl: "https://i.ytimg.com/vi/xdc7D2D3EKU/hqdefault.jpg" },
  { title: "Aayshalak",               artist: "Elissa",                              ytId: "hODVrXRGsY4", artworkUrl: "https://i.ytimg.com/vi/hODVrXRGsY4/hqdefault.jpg" },
  { title: "Laiel El Ashekin",        artist: "Georges Wassouf",                     ytId: "rQ7CahWbJUo", artworkUrl: "https://i.ytimg.com/vi/rQ7CahWbJUo/hqdefault.jpg" },
  { title: "Wehyaty Andak",           artist: "Zekra",                               ytId: "X8XRKItBWi8", artworkUrl: "https://i.ytimg.com/vi/X8XRKItBWi8/hqdefault.jpg" },
  { title: "Khaleni Zekra",           artist: "Wael Jassar",                         ytId: "Dnwa8_03ULY", artworkUrl: "https://i.ytimg.com/vi/Dnwa8_03ULY/hqdefault.jpg" },
  { title: "Je T'aime",               artist: "Lara Fabian",                         ytId: "vz0OIwXOOYE", artworkUrl: "https://i.ytimg.com/vi/vz0OIwXOOYE/hqdefault.jpg" },
  { title: "Et si tu n'existais pas", artist: "Joe Dassin",                          ytId: "EJLDd-VOH1U", artworkUrl: "https://i.ytimg.com/vi/EJLDd-VOH1U/hqdefault.jpg" },
  { title: "Habaitak Belsaif",        artist: "Fayrouz",                             ytId: "WWllBI4oheI", artworkUrl: "https://i.ytimg.com/vi/WWllBI4oheI/hqdefault.jpg" },
  { title: "Esmaa Alby",              artist: "Majida El Roumi",                     ytId: "DDr9MpVV2GM", artworkUrl: "https://i.ytimg.com/vi/DDr9MpVV2GM/hqdefault.jpg" },
  { title: "Nghir Alik",              artist: "YUMA",                                ytId: "sTXv0sPgjXY", artworkUrl: "https://i.ytimg.com/vi/sTXv0sPgjXY/hqdefault.jpg" },
  { title: "Ya Tara",                 artist: "Bahaa Sultan",                        ytId: "HrcGwDdti7Q", artworkUrl: "https://i.ytimg.com/vi/HrcGwDdti7Q/hqdefault.jpg" },
  { title: "Hob Hayaty",              artist: "Bahaa Sultan",                        ytId: "hMh9fwZnNDo", artworkUrl: "https://i.ytimg.com/vi/hMh9fwZnNDo/hqdefault.jpg" },
  { title: "Je veux",                 artist: "Zaz",                                 ytId: "Z7cuTnbF-2c", artworkUrl: "https://i.ytimg.com/vi/Z7cuTnbF-2c/hqdefault.jpg" },
  { title: "Ya Ghali",                artist: "Fadel Chaker",                        ytId: "0B3tagy4eBc", artworkUrl: "https://i.ytimg.com/vi/0B3tagy4eBc/hqdefault.jpg" },
  { title: "Rak Enti",                artist: "TUL8TE",                              ytId: "_MuRtKVA7w4", artworkUrl: "https://i.ytimg.com/vi/_MuRtKVA7w4/hqdefault.jpg" },
  { title: "Bent El Shou7",           artist: "Fadel Chaker",                        ytId: "dk2tFHCWb2s", artworkUrl: "https://i.ytimg.com/vi/dk2tFHCWb2s/hqdefault.jpg" },
  { title: "Maghrorah",               artist: "Release",                             ytId: "H6QV6vG8SfU", artworkUrl: "https://i.ytimg.com/vi/H6QV6vG8SfU/hqdefault.jpg" },
  { title: "Helwa Ya Baladi",         artist: "Dalida",                              ytId: "39RHI3ZZwLc", artworkUrl: "https://i.ytimg.com/vi/39RHI3ZZwLc/hqdefault.jpg" },
  { title: "Matrahak Bi Albi",        artist: "Majida El Roumi",                     ytId: "D450gaz-Xqo", artworkUrl: "https://i.ytimg.com/vi/D450gaz-Xqo/hqdefault.jpg" },
  { title: "Awel Mara",               artist: "Abdel Halim Hafez",                   ytId: "qhqJYGn5x5E", artworkUrl: "https://i.ytimg.com/vi/qhqJYGn5x5E/hqdefault.jpg" },
  { title: "Ana Ghaltan",             artist: "Bahaa Sultan",                        ytId: "515OrfbY324", artworkUrl: "https://i.ytimg.com/vi/515OrfbY324/hqdefault.jpg" },
  { title: "Ahlamna",                 artist: "Angham & Cairokee",                   ytId: "TtexFbGjS8w", artworkUrl: "https://i.ytimg.com/vi/TtexFbGjS8w/hqdefault.jpg" },
  { title: "Ya Habib El Alb",         artist: "Sayed Sallam",                        ytId: "0pdeBt1o_zE", artworkUrl: "https://i.ytimg.com/vi/0pdeBt1o_zE/hqdefault.jpg" },
  { title: "Bayent El Hob Alaya",     artist: "Mayada El Hennawy",                   ytId: "63Oe7moEdao", artworkUrl: "https://i.ytimg.com/vi/63Oe7moEdao/hqdefault.jpg" },
];

/* ─── STATE ─── */
const state = {
  rounds:        [],   
  currentRound:  0,
  currentMatch:  0,
  votes:         { iyed: null, yomna: null },
  winners:       [],   
  losers:        [],   // Keep track of losers in Round 1
  wildcards:     [],   // Keep track of the 4 lucky losers
  scores:        { iyed: 0, yomna: 0 },
  totalMatches:  59,   // 28 + 16 + 8 + 4 + 2 + 1 = 59
  songsPerRound: [],   
};

/* ─── HELPERS ─── */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ─── STAGE LABEL ─── */
function stageLabel(roundIndex) {
  const n = state.songsPerRound[roundIndex] || 0;
  if (n === 56) return 'Round 1 — All 56 Songs';
  if (n === 32) return 'Round 2 — Top 32';
  if (n === 16) return 'Sweet 16';
  if (n === 8)  return 'Elite 8';
  if (n === 4)  return 'Semi-Finals';
  if (n === 2)  return '⭐ Grand Final ⭐';
  return `Round ${roundIndex + 1} — Top ${n}`;
}

/* ─── BUILD TOURNAMENT ─── */
function buildTournament() {
  const songs = shuffle(PLAYLIST_SONGS); 

  // Round 1: 56 songs -> 28 matches
  const round1 = [];
  for (let i = 0; i + 1 < songs.length; i += 2)
    round1.push({ a: songs[i], b: songs[i + 1] });

  state.rounds        = [round1];
  state.songsPerRound = [56]; 
  state.currentRound  = 0;
  state.currentMatch  = 0;
  state.winners       = [];
  state.losers        = [];
  state.wildcards     = [];
  state.scores        = { iyed: 0, yomna: 0 };
}

function currentMatchup() {
  return state.rounds[state.currentRound]?.[state.currentMatch];
}

/* ─── RENDER BATTLE ─── */
function renderBattle() {
  const match = currentMatchup();
  if (!match) return;

  document.getElementById('stage-label').textContent = stageLabel(state.currentRound);

  let played = 0;
  for (let r = 0; r < state.currentRound; r++) played += state.rounds[r].length;
  played += state.currentMatch;
  document.getElementById('progress-fill').style.width =
    Math.round((played / state.totalMatches) * 100) + '%';
  document.getElementById('progress-text').textContent =
    `Match ${state.currentMatch + 1} of ${state.rounds[state.currentRound].length}`;

  document.getElementById('score-iyed').textContent  = `Iyed: ${state.scores.iyed}`;
  document.getElementById('score-yomna').textContent = `Yomna: ${state.scores.yomna}`;

  fillCard('a', match.a);
  fillCard('b', match.b);

  state.votes = { iyed: null, yomna: null };
  refreshVoteUI();
  
  // Hide wildcards alert if it exists
  const wcAlert = document.getElementById('wildcard-alert');
  if(wcAlert) wcAlert.remove();
  
  document.getElementById('agree-banner').hidden    = true;
  document.getElementById('disagree-banner').hidden = true;
  document.getElementById('waiting-hint').hidden    = false;
  document.getElementById('card-a').classList.remove('winner-glow');
  document.getElementById('card-b').classList.remove('winner-glow');
  stopAllPlayers();
}

function fillCard(side, song) {
  document.getElementById(`rank-${side}`).textContent   = side.toUpperCase();
  document.getElementById(`title-${side}`).textContent  = song.title;
  document.getElementById(`artist-${side}`).textContent = song.artist || '';

  const art = document.getElementById(`artwork-${side}`);
  art.innerHTML = song.artworkUrl
    ? `<img src="${song.artworkUrl}" alt="${song.title}"
         onerror="this.parentElement.innerHTML='<div class=artwork-inner><span class=note-icon>♪</span></div>'">`
    : `<div class="artwork-inner"><span class="note-icon">♪</span></div>`;

  const frame = document.getElementById(`yt-frame-${side}`);
  if (frame) frame.dataset.ytid = song.ytId || '';

  const btn = document.getElementById(`btn-listen-${side}`);
  if (btn) { btn.textContent = '▶ Listen'; btn.classList.remove('playing'); }
}

/* ─── IFRAME PLAYER ─── */
function togglePlayer(side) {
  const wrap  = document.getElementById(`player-wrap-${side}`);
  const frame = document.getElementById(`yt-frame-${side}`);
  const btn   = document.getElementById(`btn-listen-${side}`);

  if (!wrap.hidden) {
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
    if (wrap && !wrap.hidden) { frame.src = ''; wrap.hidden = true; }
    if (btn) { btn.textContent = '▶ Listen'; btn.classList.remove('playing'); }
  });
}

/* ─── VOTING ─── */
function refreshVoteUI() {
  document.querySelectorAll('.voter-btn').forEach(btn => {
    const voter = btn.dataset.voter;
    const side  = btn.dataset.side;
    btn.classList.remove('voted-iyed', 'voted-yomna');
    btn.querySelector('.vote-check').hidden = true;
    if (state.votes[voter] === side) {
      btn.classList.add(voter === 'iyed' ? 'voted-iyed' : 'voted-yomna');
      btn.querySelector('.vote-check').hidden = false;
    }
  });

  const { iyed, yomna } = state.votes;
  if (iyed && yomna) {
    document.getElementById('waiting-hint').hidden = true;
    if (iyed === yomna) showAgreement(iyed);
    else showDisagreement();
  }
}

function showAgreement(side) {
  const match  = currentMatchup();
  const winner = side === 'a' ? match.a : match.b;

  document.getElementById(`card-${side}`).classList.add('winner-glow');
  document.getElementById(`card-${side === 'a' ? 'b' : 'a'}`).classList.remove('winner-glow');

  const emojis = ['🎉','🎶','✨','🔥','💜','🌟','❤️','🎵'];
  document.getElementById('agree-emoji').textContent = emojis[Math.floor(Math.random() * emojis.length)];
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
  const loser  = state.votes.iyed === 'a' ? match.b : match.a;
  
  state.winners.push(winner);
  if (state.currentRound === 0) {
    state.losers.push(loser); // Keep track of round 1 losers
  }
  
  state.currentMatch++;

  const roundDone = state.currentMatch >= state.rounds[state.currentRound].length;
  if (roundDone) advanceRound();
  else renderBattle();
}

function advanceRound() {
  let advancing = [...state.winners];

  if (advancing.length === 1) {
    showWinner(advancing[0]);
    return;
  }

  // Magic 4 Wildcards after Round 1!
  if (state.currentRound === 0 && advancing.length === 28) {
    // Pick 4 random losers to get a second chance
    const shuffledLosers = shuffle(state.losers);
    state.wildcards = shuffledLosers.slice(0, 4);
    advancing = shuffle([...advancing, ...state.wildcards]);
    
    // Show a fun alert that 4 songs were saved
    setTimeout(() => {
      const alertDiv = document.createElement('div');
      alertDiv.id = 'wildcard-alert';
      alertDiv.style.cssText = 'background: rgba(168,85,247,0.2); border: 1px solid var(--purple); color: #d8b4fe; padding: 12px; text-align: center; border-radius: 12px; margin: 16px 24px; animation: fadeInUp .5s ease;';
      alertDiv.innerHTML = `<strong>🍀 4 Lucky Losers Saved!</strong><br>We brought back 4 randomly eliminated songs to make a perfect Top 32 bracket!`;
      document.querySelector('.battle-header').insertAdjacentElement('afterend', alertDiv);
    }, 100);
  }

  // Build next round matchups
  const nextRound = [];
  for (let i = 0; i + 1 < advancing.length; i += 2)
    nextRound.push({ a: advancing[i], b: advancing[i + 1] });

  state.songsPerRound.push(advancing.length);
  state.rounds.push(nextRound);
  state.currentRound++;
  state.currentMatch = 0;
  state.winners = []; 
  renderBattle();
}

/* ─── WINNER SCREEN ─── */
function showWinner(song) {
  document.getElementById('winner-title').textContent  = song.title;
  document.getElementById('winner-artist').textContent = song.artist || '';
  const art = document.getElementById('winner-artwork');
  if (song.artworkUrl)
    art.innerHTML = `<img src="${song.artworkUrl}" alt="${song.title}">`;
  document.getElementById('winner-link').href = song.ytId
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
    el.style.left              = Math.random() * 100 + 'vw';
    el.style.top               = '-60px';
    el.style.animationDuration = (2 + Math.random() * 4) + 's';
    el.style.animationDelay    = (Math.random() * 4) + 's';
    layer.appendChild(el);
  }
}

/* ─── BOOT ─── */
document.addEventListener('DOMContentLoaded', () => {
  buildTournament();
  renderBattle();

  document.querySelectorAll('.voter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const voter = btn.dataset.voter;
      const side  = btn.dataset.side;
      state.votes[voter] = state.votes[voter] === side ? null : side;
      refreshVoteUI();
    });
  });

  document.getElementById('btn-next').addEventListener('click', advanceMatch);

  document.getElementById('btn-restart').addEventListener('click', () => {
    stopAllPlayers();
    buildTournament();
    showScreen('screen-battle');
    renderBattle();
  });
});
