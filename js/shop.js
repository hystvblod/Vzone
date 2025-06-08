// === VZone - shop.js ===

const THEMES = [
  {
    id: 'classic',
    name: { fr: "Classique", en: "Classic" },
    color: "#4e63ea",
    preview: "#4e63ea"
  },
  {
    id: 'neon',
    name: { fr: "Néon", en: "Neon" },
    color: "#00ffe7",
    preview: "linear-gradient(135deg,#00ffe7,#2233ff 65%)"
  },
  {
    id: 'sunset',
    name: { fr: "Coucher de soleil", en: "Sunset" },
    color: "#ff6850",
    preview: "linear-gradient(135deg,#ffb347,#ff6850 60%)"
  }
  // ...ajoute autant de thèmes que tu veux ici
];

let currentTheme = localStorage.getItem('vzone-theme') || 'classic';
let currentPlayerColor = localStorage.getItem('vzone-player-color') || '#f1c40f';

function openShop() {
  let html = `<div style="background:#222238;padding:2em 1.2em;border-radius:22px;min-width:260px;max-width:98vw;text-align:center;box-shadow:0 6px 30px #0008">
    <h2 style="color:#f1c40f;margin-bottom:1em;">${t('shop_title')}</h2>
    <div style="display:flex;gap:1.5em;justify-content:center;margin-bottom:1.6em;flex-wrap:wrap;">`;

  THEMES.forEach(th => {
    const isActive = (th.id === currentTheme);
    html += `
      <div onclick="selectTheme('${th.id}')" style="
        width:70px;height:70px;
        margin-bottom:0.6em;
        border-radius:20px;
        box-shadow:0 2px 12px #0003;
        border:4px solid ${isActive ? '#f1c40f' : '#232342'};
        background:${th.preview};
        cursor:pointer;
        display:flex;align-items:end;justify-content:center;
        position:relative;
        ">
        ${isActive ? `<span style="position:absolute;top:8px;right:9px;color:#f1c40f;font-size:1.3em;">★</span>` : ""}
        <span style="font-size:0.97em;color:#fff;padding-bottom:0.35em;font-weight:600;text-shadow:0 1px 7px #0005">
          ${th.name[currentLang] || th.name["en"]}
        </span>
      </div>
    `;
  });

  html += `</div>
    <button class="sub-btn" onclick="hideOverlay()">${getTrad("bouton_parametres") || "Retour"}</button>
  </div>`;
  showOverlay(html);
}

function selectTheme(themeId) {
  currentTheme = themeId;
  localStorage.setItem('vzone-theme', themeId);
  applyTheme(themeId);
  openShop();
}

// Applique le thème au jeu (canvas, boutons, etc.)
function applyTheme(themeId) {
  const theme = THEMES.find(th => th.id === themeId) || THEMES[0];
  document.body.style.setProperty('--main-color', theme.color);
  // Tu peux customiser ici pour changer aussi le fond, le canvas, etc.
}

function selectPlayerColor(color) {
  currentPlayerColor = color;
  localStorage.setItem('vzone-player-color', color);
  applyPlayerColor(color);
}

function applyPlayerColor(color) {
  document.body.style.setProperty('--player-color', color);
}

// Utilitaire pour traduction dans la boutique
function getTrad(key) {
  return translations[currentLang] && translations[currentLang][key]
    ? translations[currentLang][key]
    : (translations['en'] && translations['en'][key]) || key;
}

// Branche le bouton boutique sur le menu principal
window.addEventListener('DOMContentLoaded', () => {
  const btnShop = document.getElementById('shopButton');
  if (btnShop) btnShop.onclick = openShop;
  applyTheme(currentTheme);
  applyPlayerColor(currentPlayerColor);
});

if (typeof module !== 'undefined') {
  module.exports = { applyTheme, selectPlayerColor, applyPlayerColor };
}
