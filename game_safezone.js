// === VZone - Mode Safe Zone (temps cumulé) ===

let safeZoneRunning = false;
let playerSZ, safeZone, timeInside = 0, totalRequired = 30, szScore = 0;

function startSafeZoneMode() {
  safeZoneRunning = true;
  playerSZ = { x: 150, y: 150, size: 20, speed: 4 };
  timeInside = 0;

  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');

  resizeCanvas(canvas);

  // Safe zone initiale
  safeZone = {
    x: Math.random() * (canvas.width - 100),
    y: Math.random() * (canvas.height - 100),
    w: 100,
    h: 100
  };

  let keys = {};
  document.onkeydown = e => keys[e.key] = true;
  document.onkeyup = e => keys[e.key] = false;

  function moveSafeZone() {
    safeZone.x = Math.random() * (canvas.width - safeZone.w);
    safeZone.y = Math.random() * (canvas.height - safeZone.h);
  }

  setInterval(() => {
    if (safeZoneRunning) moveSafeZone();
  }, 5000);

  function update() {
    if (!safeZoneRunning) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Déplacements joueur
    if (keys['ArrowUp']) playerSZ.y -= playerSZ.speed;
    if (keys['ArrowDown']) playerSZ.y += playerSZ.speed;
    if (keys['ArrowLeft']) playerSZ.x -= playerSZ.speed;
    if (keys['ArrowRight']) playerSZ.x += playerSZ.speed;

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
      safeZoneRunning = false;
      alert('Victoire ! Tu as survécu ' + totalRequired + ' secondes.');
      return;
    }

    requestAnimationFrame(update);
  }

  update();
}
