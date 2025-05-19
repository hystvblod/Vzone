// === VZone i18n.js ===

let currentLang = 'fr';
const supportedLangs = ['fr', 'en', 'es', 'de', 'it', 'pt', 'pt-br', 'nl', 'ar'];
const translations = {};

function setLang(langCode) {
  if (!supportedLangs.includes(langCode)) langCode = 'en';
  currentLang = langCode;

  document.documentElement.lang = langCode;
  document.documentElement.dir = (langCode === 'ar') ? 'rtl' : 'ltr';

  applyTranslations();
}

function applyTranslations() {
  const elements = {
    playEsquive: 'bouton_jouer_esquive',
    playSafeZone: 'bouton_jouer_safezone',
    shopButton: 'bouton_boutique',
    settingsButton: 'bouton_parametres',
    titreJeu: 'titre_jeu'
  };

  for (let id in elements) {
    const el = document.getElementById(id);
    if (el && translations[currentLang] && translations[currentLang][elements[id]]) {
      el.textContent = translations[currentLang][elements[id]];
    }
  }
}

function initLangSelector() {
  const select = document.getElementById('langSelect');
  supportedLangs.forEach(lang => {
    const option = document.createElement('option');
    option.value = lang;
    option.textContent = lang.toUpperCase();
    if (lang === currentLang) option.selected = true;
    select.appendChild(option);
  });

  select.addEventListener('change', e => setLang(e.target.value));
}

window.addEventListener('DOMContentLoaded', () => {
  initLangSelector();
  setLang(currentLang);
});
