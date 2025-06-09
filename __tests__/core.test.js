const { resizeCanvas, clearAllEvents } = require('../js/core');

describe('resizeCanvas', () => {
  test('sets canvas dimensions to window size', () => {
    const canvas = document.createElement('canvas');
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1000 });
    Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 800 });
    resizeCanvas(canvas);
    expect(canvas.width).toBe(1000);
    expect(canvas.height).toBe(800);
  });
});

describe('clearAllEvents', () => {
  test('removes event handlers from document', () => {
    document.onkeydown = jest.fn();
    document.onkeyup = jest.fn();
    document.ontouchstart = jest.fn();
    document.ontouchmove = jest.fn();
    document.ontouchend = jest.fn();
    clearAllEvents();
    expect(document.onkeydown).toBeNull();
    expect(document.onkeyup).toBeNull();
    expect(document.ontouchstart).toBeNull();
    expect(document.ontouchmove).toBeNull();
    expect(document.ontouchend).toBeNull();
  });
});
