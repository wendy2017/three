<template>
  <div>
    panoramic house dd
    <div
      id="panoramic-house-con"
      style="width: 500px; height: 500px"
    ></div>
  </div>
</template>

<script>
import * as Three from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
export default {
  name: "PanoramicHouse",
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      mesh: null,
    };
  },
  mounted() {
    this.init();
    this.animate();
  },
  methods: {
    init() {
      let container = document.getElementById("panoramic-house-con");

      this.scene = new Three.Scene();
      this.camera = new Three.PerspectiveCamera(
        90,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      );
      this.camera.position.set(-0.3, 0, 0);

      // const geometry = new Three.SphereGeometry(1, 10, 10);
      // const material = new Three.MeshBasicMaterial({ color: 0xff0000 });
      // this.mesh = new Three.Mesh(geometry, material);
      const imgUrl = require("../../assets/images/panoramicHouse/livingRoom.jpg");
      const texture = new Three.TextureLoader().load(imgUrl);
      const material = new Three.MeshBasicMaterial({ map: texture });
      // const geometry = new Three.BoxGeometry(10, 10, 10);
      const geometry = new Three.SphereGeometry(0.6, 10, 10);

      this.mesh = new Three.Mesh(geometry, material);
      this.mesh.geometry.scale(10, 10, -10);
      this.scene.add(this.mesh);
      // this.scene.add(new Three.AxisHelper(1000));

      this.renderer = new Three.WebGLRenderer();
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);

      // 控制器
      const controls = new OrbitControls(this.camera, this.renderer.domElement);
      controls.addEventListener("change", this.render);
      controls.minDistance = 1;
      controls.maxDistance = 2;
      controls.enablePan = false;
      controls.update();
      controls.target.copy(this.mesh.position);
    },
    render() {
      this.renderer.render(this.scene, this.camera);
    },
    animate() {
      this.render();
      requestAnimationFrame(this.animate);
    },
  },
};
</script>

<style scoped></style>
