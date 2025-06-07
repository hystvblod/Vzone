// === VZone unified i18n ===

let currentLang = 'fr';
const supportedLangs = ['fr','en','es','de','it','pt','pt-br','nl','ar','ja'];

const translations = {
  fr: {
    menu_play_esquive: 'Jouer : Esquive',
    menu_play_safezone: 'Jouer : SafeZone',
    menu_shop: 'Boutique',
    menu_settings: 'Param\u00e8tres',
    game_title: 'VZone',
    play: '\u25B6\uFE0F Jouer',
    profile: '\uD83D\uDC64 Profil',
    settings: '\u2699\uFE0F Param\u00e8tres',
    shop: '\uD83D\uDED9\uFE0F Boutique',
    pause: '\u23F8\uFE0F Pause',
    resume: '\u25B6\uFE0F Reprendre',
    menu: '\uD83C\uDFE0 Menu',
    retry: '\uD83D\uDD01 Rejouer',
    sound: 'Sons activ\u00e9s',
    music: 'Musique activ\u00e9e',
    theme: 'Th\u00e8me',
    lang: 'Langue',
    reset: '\uD83D\uDDD1\uFE0F R\u00e9initialiser les scores',
    best: 'Meilleur score',
    coins: 'VCoins',
    challenge: '\uD83D\uDD25 D\u00e9fi du jour',
    challenge_goal: 'Survis au moins',
    challenge_accept: '\uD83C\uDD9A Relever le d\u00e9fi',
    shop_title: '\uD83C\uDFA8 Boutique',
    badge_survivor: '\uD83C\uDFC6 Survivant !',
    back: 'Retour',
    scores_reset: 'Scores r\u00e9initialis\u00e9s !',
    game_over_title: 'Game Over !',
    victory_title: 'Bravo !',
    score_label: 'Score :'
  },
  en: {
    menu_play_esquive: 'Play: Dodge',
    menu_play_safezone: 'Play: SafeZone',
    menu_shop: 'Shop',
    menu_settings: 'Settings',
    game_title: 'VZone',
    play: '\u25B6\uFE0F Play',
    profile: '\uD83D\uDC64 Profile',
    settings: '\u2699\uFE0F Settings',
    shop: '\uD83D\uDED9\uFE0F Shop',
    pause: '\u23F8\uFE0F Pause',
    resume: '\u25B6\uFE0F Resume',
    menu: '\uD83C\uDFE0 Menu',
    retry: '\uD83D\uDD01 Retry',
    sound: 'Sound enabled',
    music: 'Music enabled',
    theme: 'Theme',
    lang: 'Language',
    reset: '\uD83D\uDDD1\uFE0F Reset scores',
    best: 'Best score',
    coins: 'VCoins',
    challenge: '\uD83D\uDD25 Daily Challenge',
    challenge_goal: 'Survive at least',
    challenge_accept: '\uD83C\uDD9A Accept challenge',
    shop_title: '\uD83C\uDFA8 Shop',
    badge_survivor: '\uD83C\uDFC6 Survivor!',
    back: 'Back',
    scores_reset: 'Scores reset!',
    game_over_title: 'Game Over!',
    victory_title: 'Well done!',
    score_label: 'Score:'
  },
  de: {
    play: '\u25B6\uFE0F Spielen',
    profile: '\uD83D\uDC64 Profil',
    settings: '\u2699\uFE0F Einstellungen',
    shop: '\uD83D\uDED9\uFE0F Shop',
    pause: '\u23F8\uFE0F Pause',
    resume: '\u25B6\uFE0F Fortsetzen',
    menu: '\uD83C\uDFE0 Men\u00fc',
    retry: '\uD83D\uDD01 Wiederholen',
    sound: 'Ton aktiviert',
    music: 'Musik aktiviert',
    theme: 'Thema',
    lang: 'Sprache',
    reset: '\uD83D\uDDD1\uFE0F Punkte zur\u00fccksetzen',
    best: 'Bester Score',
    coins: 'VCoins',
    challenge: '\uD83D\uDD25 Tages-Challenge',
    challenge_goal: '\u00dcberlebe mindestens',
    challenge_accept: '\uD83C\uDD9A Herausforderung annehmen',
    shop_title: '\uD83C\uDFA8 Shop',
    badge_survivor: '\uD83C\uDFC6 \u00dcberlebender!',
    back: 'Zur\u00fcck',
    scores_reset: 'Punkte zur\u00fcckgesetzt!'
  },
  es: {
    play: '\u25B6\uFE0F Jugar',
    profile: '\uD83D\uDC64 Perfil',
    settings: '\u2699\uFE0F Ajustes',
    shop: '\uD83D\uDED9\uFE0F Tienda',
    pause: '\u23F8\uFE0F Pausa',
    resume: '\u25B6\uFE0F Continuar',
    menu: '\uD83C\uDFE0 Men\u00fa',
    retry: '\uD83D\uDD01 Reintentar',
    sound: 'Sonidos activados',
    music: 'M\u00fasica activada',
    theme: 'Tema',
    lang: 'Idioma',
    reset: '\uD83D\uDDD1\uFE0F Reiniciar puntuaci\u00f3n',
    best: 'Mejor puntuaci\u00f3n',
    coins: 'VCoins',
    challenge: '\uD83D\uDD25 Desaf\u00edo diario',
    challenge_goal: 'Sobrevive al menos',
    challenge_accept: '\uD83C\uDD9A Aceptar desaf\u00edo',
    shop_title: '\uD83C\uDFA8 Tienda',
    badge_survivor: '\uD83C\uDFC6 Superviviente!',
    back: 'Volver',
    scores_reset: '\u00a1Puntuaciones reiniciadas!'
  },
  nl: {
    play: '\u25B6\uFE0F Spelen',
    profile: '\uD83D\uDC64 Profiel',
    settings: '\u2699\uFE0F Instellingen',
    shop: '\uD83D\uDED9\uFE0F Winkel',
    pause: '\u23F8\uFE0F Pauze',
    resume: '\u25B6\uFE0F Hervatten',
    menu: '\uD83C\uDFE0 Menu',
    retry: '\uD83D\uDD01 Opnieuw',
    sound: 'Geluid aan',
    music: 'Muziek aan',
    theme: 'Thema',
    lang: 'Taal',
    reset: '\uD83D\uDDD1\uFE0F Scores resetten',
    best: 'Beste score',
    coins: 'VCoins',
    challenge: '\uD83D\uDD25 Dagelijkse uitdaging',
    challenge_goal: 'Overleef minstens',
    challenge_accept: '\uD83C\uDD9A Uitdaging accepteren',
    shop_title: '\uD83C\uDFA8 Winkel',
    badge_survivor: '\uD83C\uDFC6 Overlever!',
    back: 'Terug',
    scores_reset: 'Scores gereset!'
  },
  it: {
    play: '\u25B6\uFE0F Gioca',
    profile: '\uD83D\uDC64 Profilo',
    settings: '\u2699\uFE0F Impostazioni',
    shop: '\uD83D\uDED9\uFE0F Negozio',
    pause: '\u23F8\uFE0F Pausa',
    resume: '\u25B6\uFE0F Riprendi',
    menu: '\uD83C\uDFE0 Menu',
    retry: '\uD83D\uDD01 Riprova',
    sound: 'Suoni attivati',
    music: 'Musica attivata',
    theme: 'Tema',
    lang: 'Lingua',
    reset: '\uD83D\uDDD1\uFE0F Reset punteggi',
    best: 'Miglior punteggio',
    coins: 'VCoins',
    challenge: '\uD83D\uDD25 Sfida del giorno',
    challenge_goal: 'Sopravvivi almeno',
    challenge_accept: '\uD83C\uDD9A Accetta la sfida',
    shop_title: '\uD83C\uDFA8 Negozio',
    badge_survivor: '\uD83C\uDFC6 Sopravvissuto!',
    back: 'Indietro',
    scores_reset: 'Punteggi azzerati!'
  },
  pt: {
    play: '\u25B6\uFE0F Jogar',
    profile: '\uD83D\uDC64 Perfil',
    settings: '\u2699\uFE0F Configura\u00e7\u00f5es',
    shop: '\uD83D\uDED9\uFE0F Loja',
    pause: '\u23F8\uFE0F Pausar',
    resume: '\u25B6\uFE0F Retomar',
    menu: '\uD83C\uDFE0 Menu',
    retry: '\uD83D\uDD01 Repetir',
    sound: 'Som ativado',
    music: 'M\u00fasica ativada',
    theme: 'Tema',
    lang: 'Idioma',
    reset: '\uD83D\uDDD1\uFE0F Reiniciar pontua\u00e7\u00e3o',
    best: 'Melhor pontua\u00e7\u00e3o',
    coins: 'VCoins',
    challenge: '\uD83D\uDD25 Desafio di\u00e1rio',
    challenge_goal: 'Sobreviva por pelo menos',
    challenge_accept: '\uD83C\uDD9A Aceitar desafio',
    shop_title: '\uD83C\uDFA8 Loja',
    badge_survivor: '\uD83C\uDFC6 Sobrevivente!',
    back: 'Voltar',
    scores_reset: 'Pontua\u00e7\u00e3o reiniciada!'
  },
  'pt-br': {
    play: '\u25B6\uFE0F Jogar',
    profile: '\uD83D\uDC64 Perfil',
    settings: '\u2699\uFE0F Configura\u00e7\u00f5es',
    shop: '\uD83D\uDED9\uFE0F Loja',
    pause: '\u23F8\uFE0F Pausar',
    resume: '\u25B6\uFE0F Retomar',
    menu: '\uD83C\uDFE0 Menu',
    retry: '\uD83D\uDD01 Repetir',
    sound: 'Som ativado',
    music: 'M\u00fasica ativada',
    theme: 'Tema',
    lang: 'Idioma',
    reset: '\uD83D\uDDD1\uFE0F Reiniciar pontua\u00e7\u00e3o',
    best: 'Melhor pontua\u00e7\u00e3o',
    coins: 'VCoins',
    challenge: '\uD83D\uDD25 Desafio di\u00e1rio',
    challenge_goal: 'Sobreviva por pelo menos',
    challenge_accept: '\uD83C\uDD9A Aceitar desafio',
    shop_title: '\uD83C\uDFA8 Loja',
    badge_survivor: '\uD83C\uDFC6 Sobrevivente!',
    back: 'Voltar',
    scores_reset: 'Pontua\u00e7\u00e3o reiniciada!'
  },
  ar: {
    play: '\u25B6\uFE0F \u0627\u0644\u0644\u0639\u0628',
    profile: '\uD83D\uDC64 \u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u0634\u062e\u0635\u064a',
    settings: '\u2699\uFE0F \u0627\u0644\u0625\u0639\u062f\u0627\u062f\u0627\u062a',
    shop: '\uD83D\uDED9\uFE0F \u0627\u0644\u0645\u062a\u062c\u0631',
    pause: '\u23F8\uFE0F \u0625\u064a\u0642\u0627\u0641 \u0645\u0624\u0642\u062a',
    resume: '\u25B6\uFE0F \u0627\u0633\u062a\u0626\u0646\u0627\u0641',
    menu: '\uD83C\uDFE0 \u0627\u0644\u0642\u0627\u0626\u0645\u0629',
    retry: '\uD83D\uDD01 \u0625\u0639\u0627\u062f\u0629 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629',
    sound: '\u0627\u0644\u0635\u0648\u062a \u0645\u0641\u0639\u0644',
    music: '\u0627\u0644\u0645\u0648\u0633\u064a\u0642\u0649 \u0645\u0641\u0639\u0644\u0629',
    theme: '\u0627\u0644\u0633\u0645\u0629',
    lang: '\u0627\u0644\u0644\u063a\u0629',
    reset: '\uD83D\uDDD1\uFE0F \u0625\u0639\u0627\u062f\u0629 \u062a\u0639\u064a\u064a\u0646 \u0627\u0644\u0646\u0642\u0627\u0637',
    best: '\u0623\u0641\u0636\u0644 \u0646\u062a\u064a\u062c\u0629',
    coins: 'VCoins',
    challenge: '\uD83D\uDD25 \u062a\u062d\u062f\u064a \u0627\u0644\u064a\u0648\u0645',
    challenge_goal: '\u0627\u0635\u0645\u062f \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644',
    challenge_accept: '\uD83C\uDD9A \u0627\u0642\u0628\u0644 \u0627\u0644\u062a\u062d\u062f\u064a',
    shop_title: '\uD83C\uDFA8 \u0627\u0644\u0645\u062a\u062c\u0631',
    badge_survivor: '\uD83C\uDFC6 \u0627\u0644\u0646\u0627\u062c\u064a!',
    back: '\u0631\u062c\u0648\u0639',
    scores_reset: '\u062a\u0645\u062a \u0625\u0639\u0627\u062f\u0629 \u0627\u0644\u0646\u0642\u0627\u0637!'
  },
  ja: {
    play: '\u25B6\uFE0F \u30d7\u30ec\u30a4',
    profile: '\uD83D\uDC64 \u30d7\u30ed\u30d5\u30a3\u30fc\u30eb',
    settings: '\u2699\uFE0F \u8a2d\u5b9a',
    shop: '\uD83D\uDED9\uFE0F \u30b7\u30e7\u30c3\u30d7',
    pause: '\u23F8\uFE0F \u4e00\u6642\u505c\u6b62',
    resume: '\u25B6\uFE0F \u518d\u958b',
    menu: '\uD83C\uDFE0 \u30e1\u30cb\u30e5\u30fc',
    retry: '\uD83D\uDD01 \u30ea\u30c8\u30e9\u30a4',
    sound: '\u30b5\u30a6\u30f3\u30c9\u6709\u52b9',
    music: '\u97f3\u697d\u6709\u52b9',
    theme: '\u30c6\u30fc\u30de',
    lang: '\u8a00\u8a9e',
    reset: '\uD83D\uDDD1\uFE0F \u30b9\u30b3\u30a2\u3092\u30ea\u30bb\u30c3\u30c8',
    best: '\u30d9\u30b9\u30c8\u30b9\u30b3\u30a2',
    coins: 'V\u30b3\u30a4\u30f3',
    challenge: '\uD83D\uDD25 \u4eca\u65e5\u306e\u30c1\u30e3\u30ec\u30f3\u30b8',
    challenge_goal: '\u5c11\u306a\u304f\u3068\u3082\u751f\u304d\u5ef6\u3073\u308d',
    challenge_accept: '\uD83C\uDD9A \u30c1\u30e3\u30ec\u30f3\u30b8\u958b\u59cb',
    shop_title: '\uD83C\uDFA8 \u30b7\u30e7\u30c3\u30d7',
    badge_survivor: '\uD83C\uDFC6 \u30b5\u30d0\u30a4\u30d0\u30fc!',
    back: '\u623b\u308b',
    scores_reset: '\u30b9\u30b3\u30a2\u3092\u30ea\u30bb\u30c3\u30c8\u3057\u307e\u3057\u305f\uFF01'
  }
};

function t(key) {
  return (translations[currentLang] && translations[currentLang][key]) ||
         (translations['en'] && translations['en'][key]) ||
         key;
}

function setLang(langCode) {
  if (!supportedLangs.includes(langCode)) langCode = 'en';
  currentLang = langCode;
  document.documentElement.lang = langCode;
  document.documentElement.dir = (langCode === 'ar') ? 'rtl' : 'ltr';
  applyTranslations();
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });
}

function initLangSelector() {
  const select = document.getElementById('langSelect');
  if (!select) return;
  select.innerHTML = '';
  supportedLangs.forEach(lang => {
    const option = document.createElement('option');
    option.value = lang;
    option.textContent = lang.toUpperCase();
    if (lang === currentLang) option.selected = true;
    select.appendChild(option);
  });
  select.addEventListener('change', e => setLang(e.target.value));
}

function registerTranslations(lang, data) {
  if (!translations[lang]) translations[lang] = {};
  Object.assign(translations[lang], data);
}

window.addEventListener('DOMContentLoaded', () => {
  initLangSelector();
  setLang(currentLang);
});
