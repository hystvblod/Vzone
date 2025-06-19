const fs = require('fs');
const path = require('path');

const load = file => {
  const code = fs.readFileSync(path.join(__dirname, '..', 'js', file), 'utf8');
  const script = document.createElement('script');
  script.textContent = code;
  document.head.appendChild(script);
};

let applyTheme, selectPlayerColor;

beforeAll(() => {
  load('shop.js');
  applyTheme = window.applyTheme;
  selectPlayerColor = window.selectPlayerColor;
});

beforeEach(() => {
  document.body.innerHTML = '';
  localStorage.clear();
});

describe('shop color selection', () => {
  test('applyTheme updates CSS variable', () => {
    applyTheme('neon');
    expect(document.body.style.getPropertyValue('--main-color')).toBe('#00ffe7');
  });

  test('selectPlayerColor stores value and updates CSS', () => {
    selectPlayerColor('#123456');
    expect(localStorage.getItem('vzone-player-color')).toBe('#123456');
    expect(document.body.style.getPropertyValue('--player-color')).toBe('#123456');
  });
});

describe('game modules read stored color', () => {
  beforeAll(() => {
    load('game_esquive.js');
    load('game_safezone.js');
  });

  beforeEach(() => {
    document.body.innerHTML = '<canvas id="gameCanvas"></canvas>';
    const canvas = document.getElementById('gameCanvas');
    canvas.getContext = () => ({
      clearRect: jest.fn(),
      beginPath: jest.fn(),
      arc: jest.fn(),
      fill: jest.fn(),
      fillText: jest.fn()
    });
    localStorage.setItem('vzone-player-color', '#abcdef');
    global.requestAnimationFrame = jest.fn();
    global.cancelAnimationFrame = jest.fn();
    global.resizeCanvas = jest.fn();
    global.clearAllEvents = jest.fn();
  });

  test('esquive mode uses stored color', () => {
    const player = window.startEsquiveMode(true);
    expect(player.color).toBe('#abcdef');
  });

  test('safezone mode uses stored color', () => {
    const player = window.startSafeZoneMode(true);
    expect(player.color).toBe('#abcdef');
  });
});
