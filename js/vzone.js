// VZone – JS moteur principal
let canvas = document.getElementById("vzone-canvas");
let ctx = canvas.getContext("2d");
let playing = false;
let score = 0;
let bestScore = 0;
let timer;
let zones = [];
let user = {
  pseudo: "Joueur",
  avatar: "🐱",
  vcoins: 0,
  theme: "dark",
  lang: "fr",
  sound: true,
  music: true,
  unlockedColors: ["red"],
  badges: []
};

// Audio elements
const audioClick = document.getElementById("audio-click");
const audioMusic = document.getElementById("audio-music");
const audioCoin = document.getElementById("audio-coin");
const audioCollision = document.getElementById("audio-collision");
const audioRecord = document.getElementById("audio-record");

// Gestion écran responsive
function resizeCanvas() {
  canvas.width = window.innerWidth * 0.95;
  canvas.height = window.innerHeight * 0.7;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();
// =======================
// ZONES ET GAMEPLAY
// =======================

function startGame() {
  zones = [];
  score = 0;
  playing = true;
  document.getElementById("menu-screen").classList.remove("active");
  document.getElementById("game-container").classList.add("active");
  audioMusic.volume = 0.3;
  if (user.music && audioMusic && audioMusic.src) {
  try { audioMusic.play(); } catch(e) {}
}

  spawnZones();
  requestAnimationFrame(gameLoop);
}

function spawnZones() {
  zones.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: 40 + Math.random() * 40,
    dx: 1 + Math.random() * 2,
    dy: 1 + Math.random() * 2,
    color: getCurrentZoneColor()
  });
}

function getCurrentZoneColor() {
  let selected = user.unlockedColors[user.unlockedColors.length - 1];
  switch (selected) {
    case "blue": return getComputedStyle(document.documentElement).getPropertyValue('--zone-blue');
    case "green": return getComputedStyle(document.documentElement).getPropertyValue('--zone-green');
    case "violet": return getComputedStyle(document.documentElement).getPropertyValue('--zone-violet');
    default: return getComputedStyle(document.documentElement).getPropertyValue('--zone-red');
  }
}

function gameLoop(timestamp) {
  if (!playing) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dessiner zones
  zones.forEach(zone => {
    ctx.beginPath();
    ctx.arc(zone.x, zone.y, zone.r, 0, Math.PI * 2);
    ctx.fillStyle = zone.color;
    ctx.fill();
    zone.x += zone.dx;
    zone.y += zone.dy;

    // Rebond
    if (zone.x + zone.r > canvas.width || zone.x - zone.r < 0) zone.dx *= -1;
    if (zone.y + zone.r > canvas.height || zone.y - zone.r < 0) zone.dy *= -1;

    // Collision avec curseur au centre
    let cx = canvas.width / 2;
    let cy = canvas.height / 2;
    let dist = Math.hypot(zone.x - cx, zone.y - cy);
    if (dist < zone.r + 10) {
      gameOver();
    }
  });

  // Afficher le curseur au centre
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 10, 0, Math.PI * 2);
  ctx.fillStyle = "#00ffff";
  ctx.fill();

  score += 0.016;
  document.getElementById("score-display").innerText = score.toFixed(1) + " s";

  if (Math.random() < 0.005) spawnZones(); // nouvelles zones
  requestAnimationFrame(gameLoop);
}
// =======================
// GAME OVER & SCORE
// =======================

function gameOver() {
  playing = false;
  document.getElementById("game-container").classList.remove("active");
  document.getElementById("gameover-screen").classList.add("active");
  audioCollision.volume = 0.5;
 if (user.music && audioMusic && audioMusic.src) {
  try { audioMusic.play(); } catch(e) {}
}


  const finalScore = score.toFixed(1);
  document.getElementById("final-score").innerText = `Score : ${finalScore} s`;

  // Enregistrement du meilleur score
  if (score > bestScore) {
    bestScore = score;
    localStorage.setItem("vzone_best", bestScore);
    if (user.sound) audioRecord.play();
  }

  document.getElementById("best-score").innerText = bestScore.toFixed(1);

  // Récompense en VCoins
  const gain = Math.floor(score);
  user.vcoins += gain;
  localStorage.setItem("vzone_vcoins", user.vcoins);
  document.getElementById("vcoins").innerText = user.vcoins;
  document.getElementById("bonus-display").innerText = `💰 +${gain} VCoins`;
  if (user.sound) audioCoin.play();

  // Ajout de badge
  if (score > 30 && !user.badges.includes("survivor")) {
    user.badges.push("survivor");
    displayBadge("🎖️ Survivant !");
  }

  saveUser();
}

function displayBadge(text) {
  const badgeEl = document.createElement("div");
  badgeEl.className = "badge";
  badgeEl.innerText = text;
  document.getElementById("badges-list").appendChild(badgeEl);
}

// =======================
// UTILITAIRES
// =======================

function saveUser() {
  localStorage.setItem("vzone_user", JSON.stringify(user));
}

function loadUser() {
  const saved = localStorage.getItem("vzone_user");
  if (saved) {
    user = JSON.parse(saved);
  }
  bestScore = parseFloat(localStorage.getItem("vzone_best")) || 0;
  document.getElementById("best-score").innerText = bestScore.toFixed(1);
  document.getElementById("vcoins").innerText = user.vcoins;
}
// =======================
// NAVIGATION ENTRE ÉCRANS
// =======================

function goTo(screenId) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  if (screenId === 'menu') {
    document.getElementById("menu-screen").classList.add("active");
  } else {
    document.getElementById(`${screenId}-screen`).classList.add("active");
  }
  if (user.sound) audioClick.play();
}

// =======================
// GESTION BOUTONS
// =======================

document.getElementById("btn-play").onclick = startGame;
document.getElementById("btn-retry").onclick = startGame;
document.getElementById("btn-menu").onclick = () => goTo('menu');
document.getElementById("btn-profile").onclick = () => goTo('profile');
document.getElementById("btn-settings").onclick = () => goTo('settings');
document.getElementById("btn-shop").onclick = () => goTo('shop');
document.getElementById("resume-btn").onclick = () => {
  document.getElementById("pause-screen").classList.remove("active");
  playing = true;
  requestAnimationFrame(gameLoop);
};
document.getElementById("pause-btn").onclick = () => {
  playing = false;
  document.getElementById("pause-screen").classList.add("active");
};

// =======================
// PARAMÈTRES
// =======================

document.getElementById("sound-toggle").onchange = (e) => {
  user.sound = e.target.checked;
  saveUser();
};
document.getElementById("music-toggle").onchange = (e) => {
  user.music = e.target.checked;
  if (!user.music) audioMusic.pause(); else audioMusic.play();
  saveUser();
};
document.getElementById("theme-select").onchange = (e) => {
  user.theme = e.target.value;
  document.body.classList.toggle("light", user.theme === "light");
  saveUser();
};
document.getElementById("reset-score").onclick = () => {
  bestScore = 0;
  user.vcoins = 0;
  user.badges = [];
  saveUser();
  localStorage.removeItem("vzone_best");
  goTo('menu');
};

// =======================
// PROFIL
// =======================

document.getElementById("pseudo-input").oninput = (e) => {
  user.pseudo = e.target.value.slice(0, 20);
  saveUser();
};
document.getElementById("avatar-select").onchange = (e) => {
  user.avatar = e.target.value;
  saveUser();
};

