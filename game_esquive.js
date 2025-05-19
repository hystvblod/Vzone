// === VZone - Mode Esquive Active ===

let esquiveRunning = false;
let player, obstacles = [], score = 0;

function startEsquiveMode() {
  esquiveRunning = true;
  score = 0;
  player = { x: 150, y: 150, size: 20, speed: 5 };
  obstacles = [];

  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');

  resizeCanvas(canvas);

  let keys = {};
  document.onkeydown = e => keys[e.key] = true;
  document.onkeyup = e => keys[e.key] = false;

  function spawnObstacle() {
    const size = 20 + Math.random() * 30;
    obstacles.push({
      x: Math.random() * canvas.width,
      y: -size,
      w: size,
      h: size,
      speed: 2 + Math.random() * 3
    });
  }

  function update() {
    if (!esquiveRunning) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Déplacements
    if (keys['ArrowUp']) player.y -= player.speed;
    if (keys['ArrowDown']) player.y += player.speed;
    if (keys['ArrowLeft']) player.x -= player.speed;
    if (keys['ArrowRight']) player.x += player.speed;

    // Bordures
    player.x = Math.max(0, Math.min(canvas.width - player.size, player.x));
    player.y = Math.max(0, Math.min(canvas.height - player.size, player.y));

    // Dessin joueur
    ctx.fillStyle = '#f1c40f';
    ctx.fillRect(player.x, player.y, player.size, player.size);

    // Obstacles
    for (let o of obstacles) {
      o.y += o.speed;
      ctx.fillStyle = '#e74c3c';
      ctx.fillRect(o.x, o.y, o.w, o.h);

      if (
        player.x < o.x + o.w &&
        player.x + player.size > o.x &&
        player.y < o.y + o.h &&
        player.y + player.size > o.y
      ) {
        esquiveRunning = false;
        alert('Game Over! Score: ' + score);
        return;
      }
    }

    // Nettoyage
    obstacles = obstacles.filter(o => o.y < canvas.height);

    // Score
    score++;
    ctx.fillStyle = '#fff';
    ctx.font = '16px Poppins';
    ctx.fillText('Score: ' + score, 10, 20);

    requestAnimationFrame(update);
  }

  setInterval(() => {
    if (esquiveRunning) spawnObstacle();
  }, 1000);

  update();
}
