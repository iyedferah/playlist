import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";

/* ===================================================
   PLAYLIST BATTLE — app.js
   Iyed & Yomna · Firebase Realtime Multiplayer
   =================================================== */

const firebaseConfig = {
  apiKey: "AIzaSyDpxKD_XGG5KOOTNyMExe05y4mMSAHKyjE",
  authDomain: "playlistbattle-b29ff.firebaseapp.com",
  databaseURL: "https://playlistbattle-b29ff-default-rtdb.firebaseio.com",
  projectId: "playlistbattle-b29ff",
  storageBucket: "playlistbattle-b29ff.firebasestorage.app",
  messagingSenderId: "645449858580",
  appId: "1:645449858580:web:1a54f568135c2b89adf101"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const stateRef = ref(db, 'tournament');

const PLAYLIST_SONGS = [
  { title: "James Dean", artist: "CairokeeOfficial", ytId: "m540R-vGLlI", artworkUrl: "https://i.ytimg.com/vi/m540R-vGLlI/hqdefault.jpg" },
  { title: "Kelma", artist: "Ramy Sabry", ytId: "XDrNd5qkza4", artworkUrl: "https://i.ytimg.com/vi/XDrNd5qkza4/hqdefault.jpg" },
  { title: "Heseeny", artist: "TUL8TE", ytId: "bcMIr1xhXQI", artworkUrl: "https://i.ytimg.com/vi/bcMIr1xhXQI/hqdefault.jpg" },
  { title: "Nefsy Ahbek", artist: "CairokeeOfficial", ytId: "NGiRwLC3Xc8", artworkUrl: "https://i.ytimg.com/vi/NGiRwLC3Xc8/hqdefault.jpg" },
  { title: "Khalik Ma'aya", artist: "Amr Diab", ytId: "bmbHfXq2CAc", artworkUrl: "https://i.ytimg.com/vi/bmbHfXq2CAc/hqdefault.jpg" },
  { title: "Mesh Habibi Bas", artist: "Angham", ytId: "SYLHTvxe7NQ", artworkUrl: "https://i.ytimg.com/vi/SYLHTvxe7NQ/hqdefault.jpg" },
  { title: "We Akhyran", artist: "Mahmoud El Esseily", ytId: "v41hcsVUbV0", artworkUrl: "https://i.ytimg.com/vi/v41hcsVUbV0/hqdefault.jpg" },
  { title: "Athadda Al Aalam", artist: "Saber Rebai", ytId: "CqWNFChfCl4", artworkUrl: "https://i.ytimg.com/vi/CqWNFChfCl4/hqdefault.jpg" },
  { title: "Hob Taht El Enshaa", artist: "Amir Eid", ytId: "JmUBIwK7d-E", artworkUrl: "https://i.ytimg.com/vi/JmUBIwK7d-E/hqdefault.jpg" },
  { title: "Ymken Kher", artist: "Ramy Sabry", ytId: "WgrLAh4BxPo", artworkUrl: "https://i.ytimg.com/vi/WgrLAh4BxPo/hqdefault.jpg" },
  { title: "Amarain", artist: "Amr Diab", ytId: "P1VVPMwGgPs", artworkUrl: "https://i.ytimg.com/vi/P1VVPMwGgPs/hqdefault.jpg" },
  { title: "حبيبي ليه", artist: "TUL8TE", ytId: "MLgCidfXl4Y", artworkUrl: "https://i.ytimg.com/vi/MLgCidfXl4Y/hqdefault.jpg" },
  { title: "هنا مصر هفضل كل مرة اجيلك", artist: "Mahmoud El Esseily", ytId: "-2fGsXONSMU", artworkUrl: "https://i.ytimg.com/vi/-2fGsXONSMU/hqdefault.jpg" },
  { title: "Aam Bimzah Maak", artist: "Rotana", ytId: "C_Z6djJNT7Y", artworkUrl: "https://i.ytimg.com/vi/C_Z6djJNT7Y/hqdefault.jpg" },
  { title: "انا نجم - من مسلسل ريفو", artist: "ريفو شو", ytId: "l9UQabALQZA", artworkUrl: "https://i.ytimg.com/vi/l9UQabALQZA/hqdefault.jpg" },
  { title: "Basrah w Atooh", artist: "CairokeeOfficial", ytId: "948wqojRi4I", artworkUrl: "https://i.ytimg.com/vi/948wqojRi4I/hqdefault.jpg" },
  { title: "Rouh Rouhi", artist: "Rotana", ytId: "-ZTMCkDPFvQ", artworkUrl: "https://i.ytimg.com/vi/-ZTMCkDPFvQ/hqdefault.jpg" },
  { title: "Maghroumah", artist: "Najwa Karam", ytId: "u-0-AkkuMJ8", artworkUrl: "https://i.ytimg.com/vi/u-0-AkkuMJ8/hqdefault.jpg" },
  { title: "ياسمين علي _نقابل ناس", artist: "JAB", ytId: "S4j7cKGymhI", artworkUrl: "https://i.ytimg.com/vi/S4j7cKGymhI/hqdefault.jpg" },
  { title: "Wainek Min Zaman", artist: "Yazan Haifawi", ytId: "rbPcNV0gfLA", artworkUrl: "https://i.ytimg.com/vi/rbPcNV0gfLA/hqdefault.jpg" },
  { title: "Haygely Mawgow3", artist: "Tamer Ashour", ytId: "6r2nBhBUYHs", artworkUrl: "https://i.ytimg.com/vi/6r2nBhBUYHs/hqdefault.jpg" },
  { title: "Koul Waad", artist: "Wael Jassar", ytId: "8sbWhSQ9Dx4", artworkUrl: "https://i.ytimg.com/vi/8sbWhSQ9Dx4/hqdefault.jpg" },
  { title: "Betew7ashini", artist: "ArabicaTV", ytId: "rngxuyPZ7Zo", artworkUrl: "https://i.ytimg.com/vi/rngxuyPZ7Zo/hqdefault.jpg" },
  { title: "Nasini El Donya", artist: "Ragheb Alama", ytId: "LHRzANXJEEM", artworkUrl: "https://i.ytimg.com/vi/LHRzANXJEEM/hqdefault.jpg" },
  { title: "We Maloh", artist: "Amr Diab", ytId: "n45XOgKijec", artworkUrl: "https://i.ytimg.com/vi/n45XOgKijec/hqdefault.jpg" },
  { title: "Kel El Qasayed", artist: "Marwan Khoury", ytId: "5EgyhbdSZoU", artworkUrl: "https://i.ytimg.com/vi/5EgyhbdSZoU/hqdefault.jpg" },
  { title: "Mafi Mennik", artist: "Aziz Maraka", ytId: "K4NACOEF0Qo", artworkUrl: "https://i.ytimg.com/vi/K4NACOEF0Qo/hqdefault.jpg" },
  { title: "Narein", artist: "TUL8TE", ytId: "JnCTOi2QAZk", artworkUrl: "https://i.ytimg.com/vi/JnCTOi2QAZk/hqdefault.jpg" },
  { title: "Ana Baashaak Live", artist: "Nancy Ajram", ytId: "xdc7D2D3EKU", artworkUrl: "https://i.ytimg.com/vi/xdc7D2D3EKU/hqdefault.jpg" },
  { title: "Aayshalak", artist: "Elissa", ytId: "hODVrXRGsY4", artworkUrl: "https://i.ytimg.com/vi/hODVrXRGsY4/hqdefault.jpg" },
  { title: "Laiel El Ashekin", artist: "Georges Wassouf", ytId: "rQ7CahWbJUo", artworkUrl: "https://i.ytimg.com/vi/rQ7CahWbJUo/hqdefault.jpg" },
  { title: "Wehyaty Andak", artist: "Zekra", ytId: "X8XRKItBWi8", artworkUrl: "https://i.ytimg.com/vi/X8XRKItBWi8/hqdefault.jpg" },
  { title: "Khaleni Zekra", artist: "ArabicaTV", ytId: "Dnwa8_03ULY", artworkUrl: "https://i.ytimg.com/vi/Dnwa8_03ULY/hqdefault.jpg" },
  { title: "Je T’aime", artist: "Lara Fabian", ytId: "vz0OIwXOOYE", artworkUrl: "https://i.ytimg.com/vi/vz0OIwXOOYE/hqdefault.jpg" },
  { title: "Et si tu n'existais pas", artist: "Joe Dassin", ytId: "EJLDd-VOH1U", artworkUrl: "https://i.ytimg.com/vi/EJLDd-VOH1U/hqdefault.jpg" },
  { title: "Habaitak Belsaif", artist: "arabicmusicroots", ytId: "WWllBI4oheI", artworkUrl: "https://i.ytimg.com/vi/WWllBI4oheI/hqdefault.jpg" },
  { title: "Esmaa Alby", artist: "WATARY", ytId: "DDr9MpVV2GM", artworkUrl: "https://i.ytimg.com/vi/DDr9MpVV2GM/hqdefault.jpg" },
  { title: "Nghir Alik", artist: "Ÿuma", ytId: "sTXv0sPgjXY", artworkUrl: "https://i.ytimg.com/vi/sTXv0sPgjXY/hqdefault.jpg" },
  { title: "Ya Tara", artist: "Free Music", ytId: "HrcGwDdti7Q", artworkUrl: "https://i.ytimg.com/vi/HrcGwDdti7Q/hqdefault.jpg" },
  { title: "Hob Hayaty", artist: "Bahaa Sultan FM", ytId: "hMh9fwZnNDo", artworkUrl: "https://i.ytimg.com/vi/hMh9fwZnNDo/hqdefault.jpg" },
  { title: "Je veux", artist: "Zaz", ytId: "Z7cuTnbF-2c", artworkUrl: "https://i.ytimg.com/vi/Z7cuTnbF-2c/hqdefault.jpg" },
  { title: "صحاك الشوق", artist: "Fadel Chaker", ytId: "0B3tagy4eBc", artworkUrl: "https://i.ytimg.com/vi/0B3tagy4eBc/hqdefault.jpg" },
  { title: "ماتيجي اعدي عليكي", artist: "TUL8TE", ytId: "_MuRtKVA7w4", artworkUrl: "https://i.ytimg.com/vi/_MuRtKVA7w4/hqdefault.jpg" },
  { title: "أحلى رسمه", artist: "Fadel Chaker", ytId: "dk2tFHCWb2s", artworkUrl: "https://i.ytimg.com/vi/dk2tFHCWb2s/hqdefault.jpg" },
  { title: "Maghrorah", artist: "Release - Topic", ytId: "H6QV6vG8SfU", artworkUrl: "https://i.ytimg.com/vi/H6QV6vG8SfU/hqdefault.jpg" },
  { title: "Helwa Ya Baladi", artist: "Dalida", ytId: "39RHI3ZZwLc", artworkUrl: "https://i.ytimg.com/vi/39RHI3ZZwLc/hqdefault.jpg" },
  { title: "Matrahak Bi Albi", artist: "Magida El Roumi", ytId: "D450gaz-Xqo", artworkUrl: "https://i.ytimg.com/vi/D450gaz-Xqo/hqdefault.jpg" },
  { title: "Awel Mara", artist: "Abdel Halim Hafez", ytId: "qhqJYGn5x5E", artworkUrl: "https://i.ytimg.com/vi/qhqJYGn5x5E/hqdefault.jpg" },
  { title: "Ana Ghaltan", artist: "Bahaa Sultan FM", ytId: "515OrfbY324", artworkUrl: "https://i.ytimg.com/vi/515OrfbY324/hqdefault.jpg" },
  { title: "Ahlamna", artist: "Misr Italia Properties", ytId: "TtexFbGjS8w", artworkUrl: "https://i.ytimg.com/vi/TtexFbGjS8w/hqdefault.jpg" },
  { title: "مفاجأة. الكينج منير مع أمير عيد", artist: "sayed sallam", ytId: "0pdeBt1o_zE", artworkUrl: "https://i.ytimg.com/vi/0pdeBt1o_zE/hqdefault.jpg" },
  { title: "Bayent El Hob Alaya", artist: "Mayada El Hennawy", ytId: "63Oe7moEdao", artworkUrl: "https://i.ytimg.com/vi/63Oe7moEdao/hqdefault.jpg" },
  { title: "أغنية يا ما نفسي أقولك", artist: "أصفر ", ytId: "PsCeX5eH5gs", artworkUrl: "https://i.ytimg.com/vi/PsCeX5eH5gs/hqdefault.jpg" },
  { title: "C'est toi que jaime", artist: "Cheb Amrou - Topic", ytId: "9woRPqcS63c", artworkUrl: "https://i.ytimg.com/vi/9woRPqcS63c/hqdefault.jpg" },
  { title: "Wayah", artist: "Amr Diab", ytId: "4hfj4OIWQ-0", artworkUrl: "https://i.ytimg.com/vi/4hfj4OIWQ-0/hqdefault.jpg" },
  { title: "Yana Yana", artist: "Mazzika", ytId: "89tokXyVp0o", artworkUrl: "https://i.ytimg.com/vi/89tokXyVp0o/hqdefault.jpg" },
  { title: "Sawwah", artist: "Abdel Halim Hafez", ytId: "LFO2doiRHMI", artworkUrl: "https://i.ytimg.com/vi/LFO2doiRHMI/hqdefault.jpg" },
  { title: "على حسب وداد قلبي", artist: "Abdel Halim Hafez", ytId: "JvuUzJHDBmM", artworkUrl: "https://i.ytimg.com/vi/JvuUzJHDBmM/hqdefault.jpg" },
  { title: "Helaf El Amar", artist: "Georges Wassouf", ytId: "R96pix7Zx2w", artworkUrl: "https://i.ytimg.com/vi/R96pix7Zx2w/hqdefault.jpg" },
  { title: "Asaab Kelmi Bfaker Fiha", artist: "Jean-Marie Riachi", ytId: "OVUF3-X27oU", artworkUrl: "https://i.ytimg.com/vi/OVUF3-X27oU/hqdefault.jpg" },
  { title: "Ana Mn Gherak", artist: "Bahaa Sultan FM", ytId: "Us3y7js9SO8", artworkUrl: "https://i.ytimg.com/vi/Us3y7js9SO8/hqdefault.jpg" },
  { title: "Law Bass Fe Eyne", artist: "Rotana", ytId: "5mJ1xTHYFEw", artworkUrl: "https://i.ytimg.com/vi/5mJ1xTHYFEw/hqdefault.jpg" },
  { title: "Aal Eih Beyesaloon", artist: "Warda", ytId: "NdlhemOg_YU", artworkUrl: "https://i.ytimg.com/vi/NdlhemOg_YU/hqdefault.jpg" },
  { title: "Mestaniak", artist: "Nancy Ajram", ytId: "ShMfhK_ZTQI", artworkUrl: "https://i.ytimg.com/vi/ShMfhK_ZTQI/hqdefault.jpg" },
];

/* ─── STATE ─── */
let state = null; // Syncs from Firebase

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

function stageLabel(roundIndex) {
  const n = state.songsPerRound[roundIndex] || 0;
  if (n === 64) return 'Round 1 — Top 64';
  if (n === 32) return 'Round 2 — Top 32';
  if (n === 16) return 'Sweet 16';
  if (n === 8)  return 'Elite 8';
  if (n === 4)  return 'Semi-Finals';
  if (n === 2)  return '⭐ Grand Final ⭐';
  return `Round ${roundIndex + 1} — Top ${n}`;
}

/* ─── TOURNAMENT LOGIC ─── */
function buildTournament() {
  const songs = shuffle(PLAYLIST_SONGS); 

  const round1 = [];
  for (let i = 0; i + 1 < songs.length; i += 2)
    round1.push({ a: songs[i], b: songs[i + 1] });

  const newState = {
    rounds:        [round1],
    songsPerRound: [64],
    currentRound:  0,
    currentMatch:  0,
    winners:       [],
    scores:        { iyed: 0, yomna: 0 },
    totalMatches:  63,
    votes:         { iyed: null, yomna: null },
    isFinished:    false,
    finalWinner:   null
  };
  
  // Save to Firebase (this will trigger everyone's onValue)
  set(stateRef, newState);
}

function currentMatchup() {
  if (!state || !state.rounds) return null;
  return state.rounds[state.currentRound]?.[state.currentMatch];
}

/* ─── FIREBASE LISTENER ─── */
onValue(stateRef, (snapshot) => {
  const data = snapshot.val();
  if (data) {
    state = data;
    // Firebase removes empty arrays, so we ensure they exist
    if (!state.rounds) state.rounds = [];
    if (!state.winners) state.winners = [];
    if (!state.songsPerRound) state.songsPerRound = [];
    if (!state.votes) state.votes = { iyed: null, yomna: null };
    
    if (state.isFinished) {
      showWinner(state.finalWinner);
    } else {
      showScreen('screen-battle');
      renderBattle();
    }
  } else {
    // Database is empty (first load ever) -> initialize!
    buildTournament();
  }
});

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

  refreshVoteUI();
  
  // We only hide players if we just switched matches. 
  // We rely on the local iframes to stay playing if it's the exact same match.
  // Actually, to prevent players stopping on every vote, we shouldn't stopAllPlayers() blindly.
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
  if (frame && frame.dataset.ytid !== song.ytId) {
    // Only update iframe data if song changed
    frame.dataset.ytid = song.ytId || '';
    stopPlayer(side);
  }
}

/* ─── IFRAME PLAYER ─── */
window.togglePlayer = function(side) {
  const wrap  = document.getElementById(`player-wrap-${side}`);
  const frame = document.getElementById(`yt-frame-${side}`);
  const btn   = document.getElementById(`btn-listen-${side}`);

  if (!wrap.hidden) {
    stopPlayer(side);
  } else {
    const ytId = frame.dataset.ytid;
    if (!ytId) return;
    frame.src = `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1`;
    wrap.hidden = false;
    btn.textContent = '⏹ Stop';
    btn.classList.add('playing');
  }
};

function stopPlayer(side) {
  const wrap  = document.getElementById(`player-wrap-${side}`);
  const frame = document.getElementById(`yt-frame-${side}`);
  const btn   = document.getElementById(`btn-listen-${side}`);
  if (wrap) {
    frame.src = '';
    wrap.hidden = true;
    if (btn) {
      btn.textContent = '▶ Listen';
      btn.classList.remove('playing');
    }
  }
}

function stopAllPlayers() {
  stopPlayer('a');
  stopPlayer('b');
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
  
  if (!iyed || !yomna) {
    // Missing a vote
    document.getElementById('waiting-hint').hidden = false;
    document.getElementById('agree-banner').hidden = true;
    document.getElementById('disagree-banner').hidden = true;
    document.getElementById('card-a').classList.remove('winner-glow');
    document.getElementById('card-b').classList.remove('winner-glow');
    return;
  }
  
  // Both voted!
  document.getElementById('waiting-hint').hidden = true;
  if (iyed === yomna) showAgreement(iyed);
  else showDisagreement();
}

function showAgreement(side) {
  const match  = currentMatchup();
  const winner = side === 'a' ? match.a : match.b;

  document.getElementById(`card-${side}`).classList.add('winner-glow');
  document.getElementById(`card-${side === 'a' ? 'b' : 'a'}`).classList.remove('winner-glow');

  const emojis = ['🎉','🎶','✨','🔥','💜','🌟','❤️','🎵'];
  // Use a pseudo-random emoji based on match number so it stays synced
  const eIdx = state.currentMatch % emojis.length;
  document.getElementById('agree-emoji').textContent = emojis[eIdx];
  document.getElementById('agree-text').textContent  = `You both chose "${winner.title}"!`;
  document.getElementById('agree-banner').hidden    = false;
  document.getElementById('disagree-banner').hidden = true;
}

function showDisagreement() {
  document.getElementById('agree-banner').hidden = true;
  document.getElementById('card-a').classList.remove('winner-glow');
  document.getElementById('card-b').classList.remove('winner-glow');
  
  const db = document.getElementById('disagree-banner');
  db.hidden = false;
  // trigger reflow for animation
  db.style.animation = 'none';
  db.offsetHeight;
  db.style.animation = '';
}

/* ─── ADVANCE ─── */
function advanceMatch() {
  const match  = currentMatchup();
  const winner = state.votes.iyed === 'a' ? match.a : match.b;
  
  state.winners.push(winner);
  
  // Update scores
  if (state.votes.iyed  === (state.votes.iyed === 'a' ? 'a' : 'b')) state.scores.iyed++;
  if (state.votes.yomna === (state.votes.iyed === 'a' ? 'a' : 'b')) state.scores.yomna++;

  state.currentMatch++;

  const roundDone = state.currentMatch >= state.rounds[state.currentRound].length;
  if (roundDone) advanceRoundLogic();
  
  // Reset votes
  state.votes = { iyed: null, yomna: null };
  
  stopAllPlayers();
  
  // Sync to Firebase!
  set(stateRef, state);
}

function advanceRoundLogic() {
  let advancing = [...state.winners];

  if (advancing.length === 1) {
    state.isFinished = true;
    state.finalWinner = advancing[0];
    return;
  }

  const nextRound = [];
  for (let i = 0; i + 1 < advancing.length; i += 2)
    nextRound.push({ a: advancing[i], b: advancing[i + 1] });

  state.songsPerRound.push(advancing.length);
  state.rounds.push(nextRound);
  state.currentRound++;
  state.currentMatch = 0;
  state.winners = []; 
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
  stopAllPlayers();
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

/* ─── DOM BINDINGS ─── */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.voter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const voter = btn.dataset.voter;
      const side  = btn.dataset.side;
      
      if (!state) return; // Wait for firebase load
      
      // Update local vote
      state.votes[voter] = state.votes[voter] === side ? null : side;
      
      // Sync only votes node to be faster and avoid race conditions
      set(ref(db, `tournament/votes`), state.votes);
    });
  });

  document.getElementById('btn-next').addEventListener('click', advanceMatch);

  document.getElementById('btn-restart').addEventListener('click', () => {
    buildTournament(); // Overwrites firebase state
  });
});
