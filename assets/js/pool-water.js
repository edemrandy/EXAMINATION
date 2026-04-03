/* global AFRAME, THREE */
/**
 * Animated pool surface: scrolls normal map UVs for water motion (custom script / ECS).
 */
AFRAME.registerComponent('pool-water', {
  schema: {
    speed: { type: 'number', default: 0.06 },
    repeat: { type: 'number', default: 10 },
    normalUrl: { type: 'string', default: 'https://threejs.org/examples/textures/waternormals.jpg' }
  },

  init: function () {
    this.tex = null;
    this._meshRetries = 0;
    this._loadStarted = false;
    const apply = function () {
      window.setTimeout(this._applyMaterial.bind(this), 0);
    }.bind(this);
    if (this.el.sceneEl && this.el.sceneEl.hasLoaded) {
      apply();
    } else if (this.el.sceneEl) {
      this.el.sceneEl.addEventListener('loaded', apply);
    } else {
      this.el.addEventListener('loaded', apply);
    }
  },

  remove: function () {},

  _applyMaterial: function () {
    const mesh = this.el.getObject3D('mesh');
    if (!mesh) {
      if (this._meshRetries++ < 60) {
        window.setTimeout(this._applyMaterial.bind(this), 50);
      }
      return;
    }
    if (this._loadStarted) return;
    this._loadStarted = true;

    const THREE = AFRAME.THREE;
    const repeat = this.data.repeat;
    const loader = new THREE.TextureLoader();
    loader.crossOrigin = 'anonymous';
    loader.load(
      this.data.normalUrl,
      function (texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(repeat, repeat);
        this.tex = texture;
        const mat = new THREE.MeshStandardMaterial({
          color: 0x1e6b8c,
          metalness: 0.35,
          roughness: 0.15,
          normalMap: texture,
          normalScale: new THREE.Vector2(0.65, 0.65),
          transparent: true,
          opacity: 0.88,
          envMapIntensity: 0.6
        });
        mesh.material = mat;
        mesh.material.needsUpdate = true;
      }.bind(this),
      undefined,
      function () {
        mesh.material.color.setHex(0x2a7f9e);
        mesh.material.transparent = true;
        mesh.material.opacity = 0.85;
      }
    );
  },

  tick: function (t, dt) {
    const mesh = this.el.getObject3D('mesh');
    if (!mesh || !mesh.material || !mesh.material.normalMap) return;
    const u = (t / 1000) * this.data.speed;
    mesh.material.normalMap.offset.set(u % 1, (u * 0.73) % 1);
    mesh.material.normalMap.needsUpdate = true;
  }
});
