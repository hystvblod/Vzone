// === VZone - game_esquive.js ===

let esquiveRunning = false;
let player, obstacles = [], esquiveScore = 0, level = 0;
let esquiveInterval = null, esquiveAnimFrame = null;

function startEsquiveMode() {
  esquiveRunning = true;
  esquiveScore = 0;
  player = { 
    x: 110, 
    y: 110, 
    radius: 19, 
    speed: 5, 
    color: "#f1c40f" 
  };
  obstacles = [];
  level = 0;

  function addObstacle() {
    level++;
    const base = 18;
    const r = base + level * 2;
    let speed = 2;
    if (level > 3) speed += (level - 3) * 0.4;
    const angle = Math.random() * Math.PI * 2;

    // Positionnement initial éloigné du joueur pour éviter les collisions immédiates
    let x, y;
    const minDist = player.radius + r + 60;
    let attempts = 0;
    do {
      x = Math.random() * (canvas.width - 2 * r) + r;
      y = Math.random() * (canvas.height - 2 * r) + r;
      attempts++;
    } while (Math.hypot(x - player.x, y - player.y) < minDist && attempts < 50);

    obstacles.push({
      x,
      y,
      radius: r,
      dx: speed * Math.cos(angle),
      dy: speed * Math.sin(angle),
      color: "#e74c3c"
    });
  }

  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  resizeCanvas(canvas);

  addObstacle();
  if (esquiveInterval) clearInterval(esquiveInterval);
  esquiveInterval = setInterval(addObstacle, 6000);

  // Gestion des contrôles (clavier + tactile)
  let keys = {};
  clearAllEvents();

  document.onkeydown = e => keys[e.key] = true;
  document.onkeyup = e => keys[e.key] = false;

  // Contrôle tactile (doigt/souris drag)
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
    player.x += dx;
    player.y += dy;
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
    player.x += dx;
    player.y += dy;
    lastPos = { x: e.offsetX, y: e.offsetY };
  };
  canvas.onmouseup = () => dragging = false;
  canvas.onmouseleave = () => dragging = false;



  function update() {
    if (!esquiveRunning) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Déplacement clavier
    if (keys['ArrowUp'] || keys['z']) player.y -= player.speed;
    if (keys['ArrowDown'] || keys['s']) player.y += player.speed;
    if (keys['ArrowLeft'] || keys['q']) player.x -= player.speed;
    if (keys['ArrowRight'] || keys['d']) player.x += player.speed;

    // Bordures
    player.x = Math.max(player.radius, Math.min(canvas.width - player.radius, player.x));
    player.y = Math.max(player.radius, Math.min(canvas.height - player.radius, player.y));

    // Joueur (rond)
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius, 0, 2 * Math.PI);
    ctx.fillStyle = player.color;
    ctx.shadowColor = "#fff9";
    ctx.shadowBlur = 6;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Obstacles (ronds rouges)
    for (let o of obstacles) {
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

      // Collision : joueur/obstacle (ronds)
      const dist = Math.hypot(player.x - o.x, player.y - o.y);
      if (dist < player.radius + o.radius) {
        esquiveRunning = false;
        clearInterval(esquiveInterval);
        cancelAnimationFrame(esquiveAnimFrame);
        showGameOverEsquive(esquiveScore);
        return;
      }
    }

    // Score : temps de survie (ms → s)
    esquiveScore += 1/60;
    ctx.font = "17px Poppins, Arial, sans-serif";
    ctx.fillStyle = "#fff";
    ctx.fillText("Score : " + esquiveScore.toFixed(1), 13, 27);

    esquiveAnimFrame = requestAnimationFrame(update);
  }

  update();
}

// Affiche un écran game over avec score (overlay)
function showGameOverEsquive(score) {
  showOverlay(`
    <div style="background:#232342;padding:2.2em 2.2em 1.4em 2.2em;border-radius:20px;box-shadow:0 6px 32px #0008;text-align:center;min-width:240px;max-width:97vw">
      <h2 style="color:#f1c40f">${t('game_over_title')}</h2>
      <p style="font-size:1.3em;color:#fff;margin:0.6em 0 1.3em 0;">${t('score_label')} <b>${score.toFixed(1)}</b></p>
      <button class="main-button" onclick="hideOverlay();launchMode('esquive')">${t('retry')}</button>
      <button class="sub-btn" style="margin-left:0.5em" onclick="returnToMenu()">${t('menu')}</button>
    </div>
  `);
}
