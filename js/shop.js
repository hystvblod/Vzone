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

const PLAYER_COLORS = [
  { id: 'yellow', name: { fr: 'Jaune', en: 'Yellow' }, color: '#f1c40f', preview: '#f1c40f' },
  { id: 'blue',   name: { fr: 'Bleu',  en: 'Blue' },   color: '#3498db', preview: '#3498db' },
  { id: 'green',  name: { fr: 'Vert',  en: 'Green' },  color: '#2ecc71', preview: '#2ecc71' },
  { id: 'purple', name: { fr: 'Violet',en: 'Purple' }, color: '#9b59b6', preview: '#9b59b6' }
];

const ENEMY_COLORS = [
  { id: 'red',    name: { fr: 'Rouge',  en: 'Red' },    color: '#e74c3c', preview: '#e74c3c' },
  { id: 'orange', name: { fr: 'Orange', en: 'Orange' }, color: '#e67e22', preview: '#e67e22' },
  { id: 'magenta',name: { fr: 'Magenta',en: 'Magenta'}, color: '#e91e63', preview: '#e91e63' },
  { id: 'teal',   name: { fr: 'Sarcelle',en: 'Teal' },  color: '#1abc9c', preview: '#1abc9c' }
];

const ZONE_COLORS = [
  { id: 'green',  name: { fr: 'Vert',  en: 'Green' },  color: '#41ff7d', preview: '#41ff7d' },
  { id: 'cyan',   name: { fr: 'Cyan',  en: 'Cyan' },   color: '#00ffe7', preview: '#00ffe7' },
  { id: 'pink',   name: { fr: 'Rose',  en: 'Pink' },   color: '#ff69b4', preview: '#ff69b4' },
  { id: 'orange', name: { fr: 'Orange',en: 'Orange' }, color: '#ff8c42', preview: '#ff8c42' }
];

let currentTheme = localStorage.getItem('vzone-theme') || 'classic';
let currentPlayerColor = localStorage.getItem('vzone-player-color') || PLAYER_COLORS[0].id;
let currentEnemyColor = localStorage.getItem('vzone-enemy-color') || ENEMY_COLORS[0].id;
let currentZoneColor = localStorage.getItem('vzone-zone-color') || ZONE_COLORS[0].id;

function optionHTML(list, currentId, cbName) {
  let out = '';
  list.forEach(opt => {
    const active = opt.id === currentId;
    out += `
      <div onclick="${cbName}('${opt.id}')" style="
        width:70px;height:70px;
        margin-bottom:0.6em;
        border-radius:20px;
        box-shadow:0 2px 12px #0003;
        border:4px solid ${active ? '#f1c40f' : '#232342'};
        background:${opt.preview};
        cursor:pointer;
        display:flex;align-items:end;justify-content:center;
        position:relative;">
        ${active ? `<span style="position:absolute;top:8px;right:9px;color:#f1c40f;font-size:1.3em;">★</span>` : ''}
        <span style="font-size:0.85em;color:#fff;padding-bottom:0.35em;font-weight:600;text-shadow:0 1px 7px #0005">
          ${opt.name[currentLang] || opt.name['en']}
        </span>
      </div>`;
  });
  return out;
}

function openShop() {
  let html = `<div style="background:#222238;padding:2em 1.2em;border-radius:22px;min-width:260px;max-width:98vw;text-align:center;box-shadow:0 6px 30px #0008">
    <h2 style="color:#f1c40f;margin-bottom:1em;">${getTrad('bouton_boutique')}</h2>`;

  html += `<h3 style="margin:0.4em 0;color:#fff;">${getTrad('theme')}</h3>`;
  html += `<div class="shop-grid">${optionHTML(THEMES, currentTheme, 'selectTheme')}</div>`;

  html += `<h3 style="margin:0.7em 0 0.3em 0;color:#fff;">${getTrad('label_player_color')}</h3>`;
  html += `<div class="shop-grid">${optionHTML(PLAYER_COLORS, currentPlayerColor, 'selectPlayerColor')}</div>`;

  html += `<h3 style="margin:0.7em 0 0.3em 0;color:#fff;">${getTrad('label_enemy_color')}</h3>`;
  html += `<div class="shop-grid">${optionHTML(ENEMY_COLORS, currentEnemyColor, 'selectEnemyColor')}</div>`;

  html += `<h3 style="margin:0.7em 0 0.3em 0;color:#fff;">${getTrad('label_zone_color')}</h3>`;
  html += `<div class="shop-grid">${optionHTML(ZONE_COLORS, currentZoneColor, 'selectZoneColor')}</div>`;

  html += `<button class="sub-btn" onclick="hideOverlay()">${getTrad('bouton_parametres') || 'Retour'}</button>
  </div>`;
  showOverlay(html);
}

function selectTheme(themeId) {
  currentTheme = themeId;
  localStorage.setItem('vzone-theme', themeId);
  applyTheme(themeId);
  openShop();
}

function selectPlayerColor(colorId) {
  currentPlayerColor = colorId;
  localStorage.setItem('vzone-player-color', colorId);
  openShop();
}

function selectEnemyColor(colorId) {
  currentEnemyColor = colorId;
  localStorage.setItem('vzone-enemy-color', colorId);
  openShop();
}

function selectZoneColor(colorId) {
  currentZoneColor = colorId;
  localStorage.setItem('vzone-zone-color', colorId);
  openShop();
}

// Applique le thème au jeu (canvas, boutons, etc.)
function applyTheme(themeId) {
  const theme = THEMES.find(th => th.id === themeId) || THEMES[0];
  document.body.style.setProperty('--main-color', theme.color);
  // Tu peux customiser ici pour changer aussi le fond, le canvas, etc.
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
});
