// === VZone - core.js ===

function resizeCanvas(canvas) {
  const ratio = window.innerWidth / window.innerHeight;
  const width = Math.min(window.innerWidth * 0.9, 800);
  const height = width / ratio;
  canvas.width = width;
  canvas.height = height;
}

function resetGameCanvas() {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function clearAllEvents() {
  document.onkeydown = null;
  document.onkeyup = null;
}

function launchMode(mode) {
  resetGameCanvas();
  clearAllEvents();
  if (mode === 'esquive') startEsquiveMode();
  if (mode === 'safe') startSafeZoneMode();
}

window.addEventListener('resize', () => {
  const canvas = document.getElementById('gameCanvas');
  if (canvas) resizeCanvas(canvas);
});
