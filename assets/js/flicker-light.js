/* global AFRAME */
/**
 * Subtle random intensity flicker for point/spot lights (fireplace, candles).
 */
AFRAME.registerComponent('flicker-light', {
  schema: {
    base: { type: 'number', default: 0.85 },
    variance: { type: 'number', default: 0.18 },
    speed: { type: 'number', default: 8 }
  },

  init: function () {
    this._t = Math.random() * 1000;
  },

  tick: function (time, dt) {
    const lightComp = this.el.components.light;
    if (!lightComp || !lightComp.light) return;
    this._t += dt * 0.001 * this.data.speed;
    const wobble = Math.sin(this._t * 3.1) * 0.5 + Math.sin(this._t * 7.7) * 0.35;
    const n = (Math.random() - 0.5) * 0.08;
    const intensity = AFRAME.utils.clamp(
      this.data.base + this.data.variance * wobble + n,
      0.05,
      3
    );
    lightComp.light.intensity = intensity;
  }
});
