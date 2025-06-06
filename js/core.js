// === VZone - core.js ===

// Redimensionne le canvas selon la fenêtre et le ratio voulu (responsive)
function resizeCanvas(canvas) {
  const ratio = window.innerWidth / window.innerHeight;
  const width = Math.min(window.innerWidth * 0.96, 520);
  const height = Math.min(window.innerHeight * 0.52, 390);
  canvas.width = width;
  canvas.height = height;
}

// Nettoie le canvas
function resetGameCanvas() {
  const canvas = document.getElementById('gameCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Supprime tous les events clavier/touch précédents pour éviter les doublons
function clearAllEvents() {
  document.onkeydown = null;
  document.onkeyup = null;
  document.ontouchstart = null;
  document.ontouchmove = null;
  document.ontouchend = null;
}

// Lance le bon mode de jeu selon le paramètre (esquive ou safezone)
function launchMode(mode) {
  resetGameCanvas();
  clearAllEvents();
  hideOverlay();

  if (mode === 'esquive' && typeof startEsquiveMode === 'function') {
    startEsquiveMode();
  }
  if (mode === 'safe' && typeof startSafeZoneMode === 'function') {
    startSafeZoneMode();
  }
}

// Affiche un overlay (boutique, paramètres, etc.)
function showOverlay(contentHtml = "") {
  const overlay = document.getElementById('uiOverlay');
  if (!overlay) return;
  overlay.innerHTML = contentHtml;
  overlay.classList.add('active');
}

// Ferme l’overlay
function hideOverlay() {
  const overlay = document.getElementById('uiOverlay');
  if (!overlay) return;
  overlay.innerHTML = "";
  overlay.classList.remove('active');
}

// Redimensionnement auto du canvas à chaque resize de fenêtre
window.addEventListener('resize', () => {
  const canvas = document.getElementById('gameCanvas');
  if (canvas) resizeCanvas(canvas);
});

// Permet de lancer un mode de jeu via boutons du menu principal
window.addEventListener('DOMContentLoaded', () => {
  const btnEsquive = document.getElementById('playEsquive');
  const btnSafeZone = document.getElementById('playSafeZone');
  if (btnEsquive) btnEsquive.onclick = () => launchMode('esquive');
  if (btnSafeZone) btnSafeZone.onclick = () => launchMode('safe');

  // Si d’autres boutons/menu à brancher, on peut continuer ici...
});

if (typeof module !== "undefined") {
  module.exports = { resizeCanvas, clearAllEvents };
}

