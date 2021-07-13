<template>
  <div id="app">
    <el-button>展示three.js</el-button>

    <div id="container"></div>
    <line-sphere></line-sphere>
    <geometry-cube></geometry-cube>
  </div>
</template>

<script>
import * as Three from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import GeometryCube from "./components/GeometryCube/index.vue";
import LineSphere from "./components/LineSphere/index.vue";

export default {
  name: "App",
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      mesh: null,
    };
  },
  components: { GeometryCube, LineSphere },

  methods: {
    init: function() {
      let container = document.getElementById("container");

      this.camera = new Three.PerspectiveCamera(
        70,
        container.clientWidth / container.clientHeight,
        0.01,
        10
      );
      this.camera.position.z = 1;
      // this.camera.position.x = 1
      // this.camera.position.y = 0.5

      this.scene = new Three.Scene();
      let geometry = new Three.BoxGeometry(0.2, 0.2, 0.2);
      let material = new Three.MeshNormalMaterial();
      this.mesh = new Three.Mesh(geometry, material);
      this.scene.add(this.mesh);

      // 光源
      let point = new Three.PointLight(0xffffff);
      point.position.set(400, 200, 300);
      this.scene.add(point);
      var ambient = new Three.AmbientLight(0x444444);
      this.scene.add(ambient);

      this.renderer = new Three.WebGLRenderer({ animate: false });
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);
    },
    animate: function() {
      this.mesh.rotation.x += 0.01;
      this.mesh.rotation.y += 0.02;
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.animate);
    },
    control: function() {
      new OrbitControls(this.camera, this.renderer.domElement);

      // let controls = new OrbitControls(this.camera,this.renderer.domElement)
      // controls.addEventListener('change',this.animate)
    },
  },
  mounted() {
    this.init();
    this.animate();
    this.control();
  },
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#container {
  height: 400px;
}
</style>
