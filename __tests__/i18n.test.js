const fs = require('fs');
const path = require('path');

function load(file) {
  const code = fs.readFileSync(path.join(__dirname, '..', 'js', file), 'utf8');
  const script = document.createElement('script');
  script.textContent = code;
  document.head.appendChild(script);
}

let setLang;

beforeAll(() => {
  load('vzone_i18n.js');
  ({ setLang } = window);
});

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
