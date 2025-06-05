function checkOrientation() {
  const overlay = document.getElementById('rotateOverlay');
  if (!overlay) return;
  if (window.matchMedia('(orientation: portrait)').matches) {
    overlay.style.display = 'flex';
  } else {
    overlay.style.display = 'none';
  }
}

window.addEventListener('orientationchange', checkOrientation);
window.addEventListener('DOMContentLoaded', checkOrientation);

