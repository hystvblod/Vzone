// === VZone - Mode Safe Zone corrigé ===

let safeZoneRunning = false;
let moveInterval = null;

function startSafeZoneMode() {
  safeZoneRunning = true;
  let playerSZ = { x: 150, y: 150, size: 20, speed: 4 };
  let timeInside = 0;
  const totalRequired = 30;
  let safeZone;

  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth * 0.95;
  canvas.height = window.innerHeight * 0.7;
  canvas.setAttribute('tabindex', '0');
  canvas.focus();

  let keys = {};

  // Nettoyage anciens handlers
  canvas.onkeydown = null;
  canvas.onkeyup = null;

  function keydown(e) { keys[e.key] = true; }
  function keyup(e) { keys[e.key] = false; }
  canvas.addEventListener('keydown', keydown);
  canvas.addEventListener('keyup', keyup);

  // Safe zone initiale
  function spawnSafeZone() {
    safeZone = {
      x: Math.random() * (canvas.width - 100),
      y: Math.random() * (canvas.height - 100),
      w: 100,
      h: 100
    };
  }
  spawnSafeZone();

  function moveSafeZone() {
    safeZone.x = Math.random() * (canvas.width - safeZone.w);
    safeZone.y = Math.random() * (canvas.height - safeZone.h);
  }

  // Bouge la safe zone toutes les 5 secondes
  moveInterval = setInterval(() => {
    if (safeZoneRunning) moveSafeZone();
  }, 5000);

  function update() {
    if (!safeZoneRunning) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Déplacements joueur
    if (keys['ArrowUp'] || keys['z']) playerSZ.y -= playerSZ.speed;
    if (keys['ArrowDown'] || keys['s']) playerSZ.y += playerSZ.speed;
    if (keys['ArrowLeft'] || keys['q']) playerSZ.x -= playerSZ.speed;
    if (keys['ArrowRight'] || keys['d']) playerSZ.x += playerSZ.speed;

    // Bordures
    playerSZ.x = Math.max(0, Math.min(canvas.width - playerSZ.size, playerSZ.x));
    playerSZ.y = Math.max(0, Math.min(canvas.height - playerSZ.size, playerSZ.y));

    // Dessin safe zone
    ctx.fillStyle = 'rgba(0, 255, 0, 0.2)';
    ctx.fillRect(safeZone.x, safeZone.y, safeZone.w, safeZone.h);

    // Dessin joueur
    ctx.fillStyle = '#3498db';
    ctx.fillRect(playerSZ.x, playerSZ.y, playerSZ.size, playerSZ.size);

    // Détection présence dans la zone
    if (
      playerSZ.x + playerSZ.size > safeZone.x &&
      playerSZ.x < safeZone.x + safeZone.w &&
      playerSZ.y + playerSZ.size > safeZone.y &&
      playerSZ.y < safeZone.y + safeZone.h
    ) {
      timeInside += 0.016; // environ 60 fps
    }

    // Score et objectif
    ctx.fillStyle = '#fff';
    ctx.font = '16px Poppins';
    ctx.fillText('Temps dans la zone : ' + timeInside.toFixed(1) + 's', 10, 20);
    ctx.fillText('Objectif : ' + totalRequired + 's', 10, 40);

    if (timeInside >= totalRequired) {
      gameOver();
      return;
    }

    requestAnimationFrame(update);
  }

  function gameOver() {
    safeZoneRunning = false;
    clearInterval(moveInterval);
    canvas.removeEventListener('keydown', keydown);
    canvas.removeEventListener('keyup', keyup);
    setTimeout(() => {
      alert('Victoire ! Tu as survécu ' + totalRequired + ' secondes.');
      document.getElementById("game-container").classList.remove("active");
      document.getElementById("menu-screen").classList.add("active");
    }, 50);
  }

  document.getElementById("menu-screen").classList.remove("active");
  document.getElementById("game-container").classList.add("active");

  update();
}
