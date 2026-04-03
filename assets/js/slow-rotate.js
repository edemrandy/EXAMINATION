/* global AFRAME */
/**
 * Constant rotation on an axis (ceiling fan, mobile decor).
 */
AFRAME.registerComponent('slow-rotate', {
  schema: {
    speed: { type: 'number', default: 0.35 },
    axis: { type: 'string', default: 'y' }
  },

  tick: function (time, dt) {
    const rad = (this.data.speed * dt) / 1000;
    const ax = this.data.axis.toLowerCase();
    if (ax === 'x') this.el.object3D.rotation.x += rad;
    else if (ax === 'z') this.el.object3D.rotation.z += rad;
    else this.el.object3D.rotation.y += rad;
  }
});
