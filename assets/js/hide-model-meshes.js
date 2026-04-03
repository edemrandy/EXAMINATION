/* global AFRAME */
/**
 * After glTF loads, optionally log mesh names (logMeshes) or hide meshes whose
 * names contain any comma-separated substring (case-insensitive).
 */
AFRAME.registerComponent('hide-meshes', {
  schema: {
    names: { type: 'string', default: '' },
    logMeshes: { type: 'boolean', default: false }
  },

  init: function () {
    this.onLoaded = this.onLoaded.bind(this);
    this.el.addEventListener('model-loaded', this.onLoaded);
  },

  remove: function () {
    this.el.removeEventListener('model-loaded', this.onLoaded);
  },

  onLoaded: function (evt) {
    const root = evt.detail.model || this.el.object3D;
    this.apply(root);
  },

  apply: function (root) {
    if (!root) return;
    const subs = this.data.names
      .split(',')
      .map(function (s) {
        return s.trim().toLowerCase();
      })
      .filter(Boolean);
    const logMeshes = this.data.logMeshes;
    if (!subs.length && !logMeshes) return;

    root.traverse(function (node) {
      if (!node.isMesh) return;
      if (logMeshes) {
        console.log('[gltf mesh]', node.name || '(unnamed)');
      }
      if (!subs.length) return;
      const n = (node.name || '').toLowerCase();
      for (let i = 0; i < subs.length; i++) {
        if (n.indexOf(subs[i]) !== -1) {
          node.visible = false;
          break;
        }
      }
    });
  }
});
