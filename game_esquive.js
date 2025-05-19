// === VZone - Mode Esquive corrigé ===

let esquiveRunning = false;
let intervalEsquive = null;

function startEsquiveMode() {
  esquiveRunning = true;
  let score = 0;
  let player = { x: 150, y: 150, size: 20, speed: 5 };
  let obstacles = [];

  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth * 0.95;
  canvas.height = window.innerHeight * 0.7;
  canvas.setAttribute('tabindex', '0');
  canvas.focus();

  let keys = {};

  // D'abord, nettoyer d'anciens handlers (sécurité)
  canvas.onkeydown = null;
  canvas.onkeyup = null;

  function keydown(e) { keys[e.key] = true; }
  function keyup(e) { keys[e.key] = false; }
  canvas.addEventListener('keydown', keydown);
  canvas.addEventListener('keyup', keyup);

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
    if (keys['ArrowUp'] || keys['z']) player.y -= player.speed;
    if (keys['ArrowDown'] || keys['s']) player.y += player.speed;
    if (keys['ArrowLeft'] || keys['q']) player.x -= player.speed;
    if (keys['ArrowRight'] || keys['d']) player.x += player.speed;

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
        gameOver();
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

  // Nettoyer tout à la fin
  function gameOver() {
    esquiveRunning = false;
    clearInterval(intervalEsquive);
    canvas.removeEventListener('keydown', keydown);
    canvas.removeEventListener('keyup', keyup);
    setTimeout(() => {
      alert('Game Over! Score: ' + score);
      document.getElementById("game-container").classList.remove("active");
      document.getElementById("menu-screen").classList.add("active");
    }, 50);
  }

  // Interval pour les obstacles, bien stocké pour clearInterval
  intervalEsquive = setInterval(() => {
    if (esquiveRunning) spawnObstacle();
  }, 1000);

  // Affiche bien le jeu (au cas où !)
  document.getElementById("menu-screen").classList.remove("active");
  document.getElementById("game-container").classList.add("active");

  update();
}
