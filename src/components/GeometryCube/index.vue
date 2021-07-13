<template>
  <div>
    three.js demo geometry cube
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
  },
  methods: {
    init() {
      this.scene = new Three.Scene();

      let geomerty = new Three.BoxGeometry(0.2, 0.2, 0.2);
      let material = new Three.MeshNormalMaterial();
      this.mesh = new Three.Mesh(geomerty, material);
      this.scene.add(this.mesh);

      this.camera = new Three.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
      this.camera.position.z = 400;

       // 光源
      let point = new Three.PointLight(0xffffff);
      point.position.set(400, 200, 300);
      this.scene.add(point);
      var ambient = new Three.AmbientLight(0x444444);
      this.scene.add(ambient);

      this.renderer = new Three.WebGLRenderer({ animate: false });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(this.renderer.domElement)

    },
  },
};
</script>

<style scoped></style>
