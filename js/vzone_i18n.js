// === VZone i18n.js ===

let currentLang = 'fr';
const supportedLangs = ['fr', 'en', 'es', 'de', 'it', 'pt', 'pt-br', 'nl', 'ar'];
const translations = {};

// Change la langue de l'interface
function setLang(langCode) {
  if (!supportedLangs.includes(langCode)) langCode = 'en';
  currentLang = langCode;

  document.documentElement.lang = langCode;
  document.documentElement.dir = (langCode === 'ar') ? 'rtl' : 'ltr';

  applyTranslations();
}

// Applique les traductions dynamiquement aux éléments de la page
function applyTranslations() {
  const elements = {
    playEsquive: 'bouton_jouer_esquive',
    playSafeZone: 'bouton_jouer_safezone',
    shopButton: 'bouton_boutique',
    settingsButton: 'bouton_parametres',
    titreJeu: 'titre_jeu'
    // Ajoute d'autres clés ici si besoin
  };

  for (let id in elements) {
    const el = document.getElementById(id);
    if (el && translations[currentLang] && translations[currentLang][elements[id]]) {
      el.textContent = translations[currentLang][elements[id]];
    } else if (el && translations['en'] && translations['en'][elements[id]]) {
      // Fallback sur l'anglais si la trad manque
      el.textContent = translations['en'][elements[id]];
    }
  }
}

// Initialise le sélecteur de langue dans le header
function initLangSelector() {
  const select = document.getElementById('langSelect');
  select.innerHTML = "";
  supportedLangs.forEach(lang => {
    const option = document.createElement('option');
    option.value = lang;
    option.textContent = lang.toUpperCase();
    if (lang === currentLang) option.selected = true;
    select.appendChild(option);
  });

  select.addEventListener('change', e => setLang(e.target.value));
}

// Chargement du fichier de langue courant (appelé dans chaque `fr.js`, `en.js`…)
function registerTranslations(lang, data) {
  translations[lang] = data;
}

window.addEventListener('DOMContentLoaded', () => {
  initLangSelector();
  setLang(currentLang);
});
