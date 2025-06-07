const { setLang } = require('../js/vzone_i18n');

describe('rotate overlay translation', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="rotateOverlay" data-i18n="rotate_message"></div>';
  });

  test('updates message on language change', () => {
    setLang('en');
    expect(document.getElementById('rotateOverlay').textContent).toBe('Please rotate your device');
    setLang('fr');
    expect(document.getElementById('rotateOverlay').textContent).toBe('Veuillez tourner votre appareil');
  });
});
