<template>
  <div>
    three.js demo geometry cube
    <!-- <img src="../../assets/crate.gif" alt=""> -->
  </div>
</template>

<script>
import * as Three from "three";
export default {
  name: "GeometryCube",
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      mesh: null,
    };
  },
  props: {},
  components: {},
  mounted() {
    this.init();
    this.animate();
  },
  methods: {
    init() {
      this.camera = new Three.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000);
      this.camera.position.z = 1;

      this.scene = new Three.Scene();

      const url = require("../../assets/crate.gif");

      const texture = new Three.TextureLoader().load(url);
      let geomerty = new Three.BoxGeometry(0.2, 0.2, 0.2);
      let material = new Three.MeshBasicMaterial({ map: texture });
      this.mesh = new Three.Mesh(geomerty, material);
      this.scene.add(this.mesh);

      // 光源
      let point = new Three.PointLight(0xffffff);
      point.position.set(400, 200, 300);
      this.scene.add(point);
      var ambient = new Three.AmbientLight(0x444444);
      this.scene.add(ambient);

      this.renderer = new Three.WebGLRenderer({ antialias: true });
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(this.renderer.domElement);
    },
    animate() {
      requestAnimationFrame(this.animate);

      this.mesh.rotation.x += 0.005;
      this.mesh.rotation.y += 0.01;

      this.renderer.render(this.scene, this.camera);
    },
  },
};
</script>

<style scoped></style>
