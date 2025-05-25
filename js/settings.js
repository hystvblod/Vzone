// === VZone - settings.js ===

function openSettings() {
  let html = `<div style="background:#222238;padding:2.1em 1.2em;border-radius:22px;min-width:260px;max-width:98vw;text-align:center;box-shadow:0 6px 30px #0008">
    <h2 style="color:#f1c40f;margin-bottom:1.1em;">${getTrad("bouton_parametres")}</h2>
    <div style="margin-bottom:1.2em">
      <label style="display:block;margin-bottom:0.6em;">
        <input type="checkbox" id="sound-toggle" checked style="margin-right:0.8em;vertical-align:middle;">
        <span style="vertical-align:middle;">Sons activés</span>
      </label>
      <label style="display:block;margin-bottom:0.6em;">
        <input type="checkbox" id="music-toggle" checked style="margin-right:0.8em;vertical-align:middle;">
        <span style="vertical-align:middle;">Musique activée</span>
      </label>
      <label style="display:block;margin-bottom:0.7em;">
        Thème :
        <select id="theme-select" style="margin-left:0.8em;">
          <option value="classic">Classique</option>
          <option value="neon">Néon</option>
          <option value="sunset">Coucher de soleil</option>
        </select>
      </label>
      <label style="display:block;margin-bottom:1em;">
        Langue :
        <select id="settings-lang-select" style="margin-left:0.8em;">
          <option value="fr">Français</option>
          <option value="en">English</option>
          <option value="de">Deutsch</option>
          <option value="es">Español</option>
          <option value="nl">Nederlands</option>
          <option value="it">Italiano</option>
          <option value="pt">Português</option>
          <option value="pt-br">Português (BR)</option>
          <option value="ar">العربية</option>
        </select>
      </label>
    </div>
    <button class="danger-btn" id="reset-score">🗑️ Réinitialiser le score</button>
    <button class="sub-btn" style="margin-left:0.5em" onclick="hideOverlay()">Retour</button>
  </div>`;

  showOverlay(html);

  // Branche les listeners une fois l'overlay affiché
  setTimeout(() => {
    document.getElementById('settings-lang-select').value = currentLang;
    document.getElementById('settings-lang-select').onchange = (e) => setLang(e.target.value);
    document.getElementById('theme-select').value = currentTheme;
    document.getElementById('theme-select').onchange = (e) => {
      selectTheme(e.target.value);
      applyTheme(e.target.value);
    };
    document.getElementById('reset-score').onclick = () => {
      localStorage.removeItem('vzone-best-esquive');
      localStorage.removeItem('vzone-best-safezone');
      hideOverlay();
      alert("Scores réinitialisés !");
    };
    // Sons et musique : branche selon ton système (assets/audio, etc.)
  }, 80);
}

// Branche le bouton paramètres sur le menu principal
window.addEventListener('DOMContentLoaded', () => {
  const btnSettings = document.getElementById('settingsButton');
  if (btnSettings) btnSettings.onclick = openSettings;
});
