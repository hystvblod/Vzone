// === VZone - core.js ===

// Redimensionne le canvas pour occuper tout l'écran
function resizeCanvas(canvas) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
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

// Affiche ou masque le canvas
function showCanvas() {
  const canvas = document.getElementById('gameCanvas');
  if (canvas) canvas.style.display = 'block';
}

function hideCanvas() {
  const canvas = document.getElementById('gameCanvas');
  if (canvas) canvas.style.display = 'none';
}

function showBackButton() {
  const b = document.getElementById('backButton');
  if (b) b.style.display = 'block';
}

function hideBackButton() {
  const b = document.getElementById('backButton');
  if (b) b.style.display = 'none';
}

function hideHud() {
  const header = document.querySelector('header');
  const footer = document.querySelector('footer');
  if (header) header.style.display = 'none';
  if (footer) footer.style.display = 'none';
}

function showHud() {
  const header = document.querySelector('header');
  const footer = document.querySelector('footer');
  if (header) header.style.display = '';
  if (footer) footer.style.display = '';
}

// Affiche ou masque le menu principal
function showMenu() {
  const menu = document.querySelector('.menu-principal');
  if (menu) menu.style.display = 'flex';
}

function hideMenu() {
  const menu = document.querySelector('.menu-principal');
  if (menu) menu.style.display = 'none';
}

function returnToMenu() {
  hideOverlay();
  hideCanvas();
  showMenu();
  resetGameCanvas();
  clearAllEvents();
  hideBackButton();
  showHud();
}

// Lance le bon mode de jeu selon le paramètre (esquive ou safezone)
function launchMode(mode) {
  resetGameCanvas();
  clearAllEvents();
  hideOverlay();
  hideMenu();
  showCanvas();
  showBackButton();
  hideHud();

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


