// === VZone - game_safezone.js ===

let safeZoneRunning = false;
let playerSZ, safeZone, timeInside = 0, totalRequired = 30;
let safezoneAnimFrame = null, szMoveInterval = null;
let obstaclesSZ = [], levelSZ = 0, obsIntervalSZ = null;

function startSafeZoneMode(testing = false) {
  safeZoneRunning = true;
  timeInside = 0;
  playerSZ = { x: 110, y: 110, radius: 12, speed: 4,
    color: localStorage.getItem('vzone-player-color') || '#f1c40f' };

  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  resizeCanvas(canvas);

  // Zone safe ronde
  safeZone = {
    x: Math.random() * (canvas.width - 140) + 70,
    y: Math.random() * (canvas.height - 140) + 70,
    radius: 40
  };
  obstaclesSZ = [];
  levelSZ = 0;

  function addObstacleSZ() {
    levelSZ++;
    const base = 12;
    const r = base + levelSZ * 1.5;
    const speed = 2 + levelSZ * 0.4;
    const angle = Math.random() * Math.PI * 2;
    obstaclesSZ.push({
      x: Math.random() * (canvas.width - 2 * r) + r,
      y: Math.random() * (canvas.height - 2 * r) + r,
      radius: r,
      dx: speed * Math.cos(angle),
      dy: speed * Math.sin(angle),
    color: "#e74c3c"
    });
  }

  addObstacleSZ();
  if (obsIntervalSZ) clearInterval(obsIntervalSZ);
  obsIntervalSZ = setInterval(addObstacleSZ, 6000);

  // Contrôles clavier/tactile/souris
  let keys = {};
  clearAllEvents();

  document.onkeydown = e => keys[e.key] = true;
  document.onkeyup = e => keys[e.key] = false;

  // Drag tactile/souris
  let dragging = false;
  let lastPos = null;

  canvas.ontouchstart = e => {
    e.preventDefault();
    dragging = true;
    const touch = e.touches[0];
    lastPos = { x: touch.clientX, y: touch.clientY };
  };
  canvas.ontouchmove = e => {
    e.preventDefault();
    if (!dragging) return;
    const touch = e.touches[0];
    const dx = touch.clientX - lastPos.x;
    const dy = touch.clientY - lastPos.y;
    playerSZ.x += dx;
    playerSZ.y += dy;
    lastPos = { x: touch.clientX, y: touch.clientY };
  };
  canvas.ontouchend = () => dragging = false;

  canvas.onmousedown = e => {
    dragging = true;
    lastPos = { x: e.offsetX, y: e.offsetY };
  };
  canvas.onmousemove = e => {
    if (!dragging) return;
    const dx = e.offsetX - lastPos.x;
    const dy = e.offsetY - lastPos.y;
    playerSZ.x += dx;
    playerSZ.y += dy;
    lastPos = { x: e.offsetX, y: e.offsetY };
  };
  canvas.onmouseup = () => dragging = false;
  canvas.onmouseleave = () => dragging = false;

  // Safe zone bouge toutes les 5s
  if (szMoveInterval) clearInterval(szMoveInterval);
  szMoveInterval = setInterval(() => {
    safeZone.x = Math.random() * (canvas.width - 140) + 70;
    safeZone.y = Math.random() * (canvas.height - 140) + 70;
  }, 5000);

  function update() {
    if (!safeZoneRunning) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Déplacements clavier
    if (keys['ArrowUp'] || keys['z']) playerSZ.y -= playerSZ.speed;
    if (keys['ArrowDown'] || keys['s']) playerSZ.y += playerSZ.speed;
    if (keys['ArrowLeft'] || keys['q']) playerSZ.x -= playerSZ.speed;
    if (keys['ArrowRight'] || keys['d']) playerSZ.x += playerSZ.speed;

    // Bordures canvas
    playerSZ.x = Math.max(playerSZ.radius, Math.min(canvas.width - playerSZ.radius, playerSZ.x));
    playerSZ.y = Math.max(playerSZ.radius, Math.min(canvas.height - playerSZ.radius, playerSZ.y));

    // Safe zone (rond vert semi-transparent)
    ctx.beginPath();
    ctx.arc(safeZone.x, safeZone.y, safeZone.radius, 0, 2 * Math.PI);
    ctx.fillStyle = "rgba(65, 255, 125, 0.23)";
    ctx.shadowColor = "#b0faac";
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Joueur (rond bleu)
    ctx.beginPath();
    ctx.arc(playerSZ.x, playerSZ.y, playerSZ.radius, 0, 2 * Math.PI);
    ctx.fillStyle = playerSZ.color;
    ctx.shadowColor = "#fff9";
    ctx.shadowBlur = 6;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Obstacles rebondissants
    for (let o of obstaclesSZ) {
      o.x += o.dx;
      o.y += o.dy;

      if (o.x - o.radius < 0 || o.x + o.radius > canvas.width) o.dx *= -1;
      if (o.y - o.radius < 0 || o.y + o.radius > canvas.height) o.dy *= -1;

      ctx.beginPath();
      ctx.arc(o.x, o.y, o.radius, 0, 2 * Math.PI);
      ctx.fillStyle = o.color;
      ctx.globalAlpha = 0.90;
      ctx.fill();
      ctx.globalAlpha = 1.0;

      const dCol = Math.hypot(playerSZ.x - o.x, playerSZ.y - o.y);
      if (dCol < playerSZ.radius + o.radius) {
        safeZoneRunning = false;
        clearInterval(szMoveInterval);
        clearInterval(obsIntervalSZ);
        cancelAnimationFrame(safezoneAnimFrame);
        showGameOverSafeZone(timeInside);
        return;
      }
    }

    // Est-ce que le joueur est dans la zone ?
    const dist = Math.hypot(playerSZ.x - safeZone.x, playerSZ.y - safeZone.y);
    if (dist < safeZone.radius - playerSZ.radius * 0.5) {
      timeInside += 1/60; // cumule pendant qu'il est dans la zone
    }

    // Affichage du temps cumulé
    ctx.font = "17px Poppins, Arial, sans-serif";
    ctx.fillStyle = "#fff";
    ctx.fillText("Dans la zone : " + timeInside.toFixed(1) + " s", 13, 27);
    ctx.fillText("Objectif : " + totalRequired + " s", 13, 54);

    // Si temps atteint → victoire
    if (timeInside >= totalRequired) {
      safeZoneRunning = false;
      clearInterval(szMoveInterval);
      clearInterval(obsIntervalSZ);
      cancelAnimationFrame(safezoneAnimFrame);
      showVictorySafeZone(timeInside);
      return;
    }

    safezoneAnimFrame = requestAnimationFrame(update);
  }

  if (!testing) update();
  return playerSZ;
}

// Overlay victoire SafeZone
function showVictorySafeZone(score) {
  showOverlay(`
    <div style="background:#232342;padding:2.2em 2.2em 1.4em 2.2em;border-radius:20px;box-shadow:0 6px 32px #0008;text-align:center;min-width:240px;max-width:97vw">
      <h2 style="color:#1eff86">${t('victory_title')}</h2>
      <p style="font-size:1.2em;color:#fff;margin:0.6em 0 1.3em 0;">
        Tu as cumulé <b>${score.toFixed(1)} s</b> dans la zone !
      </p>
      <button class="main-button" onclick="hideOverlay();launchMode('safe')">${t('retry')}</button>
      <button class="sub-btn" style="margin-left:0.5em" onclick="returnToMenu()">${t('menu')}</button>
    </div>
  `);
}

// Overlay d\'échec SafeZone
function showGameOverSafeZone(score) {
  showOverlay(`
    <div style="background:#232342;padding:2.2em 2.2em 1.4em 2.2em;border-radius:20px;box-shadow:0 6px 32px #0008;text-align:center;min-width:240px;max-width:97vw">
      <h2 style="color:#f1c40f">${t('game_over_title')}</h2>
      <p style="font-size:1.2em;color:#fff;margin:0.6em 0 1.3em 0;">${t('score_label')} <b>${score.toFixed(1)}</b></p>
      <button class="main-button" onclick="hideOverlay();launchMode('safe')">${t('retry')}</button>
      <button class="sub-btn" style="margin-left:0.5em" onclick="returnToMenu()">${t('menu')}</button>
    </div>
  `);
}

