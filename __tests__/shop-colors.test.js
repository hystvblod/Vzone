let applyTheme, selectPlayerColor;

beforeEach(() => {
  jest.resetModules();
  document.body.innerHTML = '';
  localStorage.clear();
  ({ applyTheme, selectPlayerColor } = require('../js/shop'));
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
  beforeEach(() => {
    jest.resetModules();
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
    const { startEsquiveMode } = require('../js/game_esquive');
    const player = startEsquiveMode(true);
    expect(player.color).toBe('#abcdef');
  });

  test('safezone mode uses stored color', () => {
    const { startSafeZoneMode } = require('../js/game_safezone');
    const player = startSafeZoneMode(true);
    expect(player.color).toBe('#abcdef');
  });
});
