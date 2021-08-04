<template>
  <div>
    house
    <div id="house-con" style="width: 600px; height: 600px"></div>
  </div>
</template>

<script>
import * as Three from "three";
import {
  MeshLambertMaterial,
  PlaneGeometry,
  RepeatWrapping,
  TextureLoader,
  Color,
  Vector3,
  Fog
} from "three";

export default {
  name: "House",
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      mesh: null
    };
  },
  mounted() {
    this.init();
    this.animate();
  },
  methods: {
    init() {
      let container = document.getElementById("house-con");
      this.scene = new Three.Scene();
      this.renderer = new Three.WebGLRenderer({ antialias: true });

      this.camera = new Three.PerspectiveCamera(
        70,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      );
      this.camera.position.z = 100;
      this.scene.add(this.camera);

      let geometry = new PlaneGeometry(20000, 20000);
      const url = require("../../assets/images/room/grass.jpg");
      const groundTexture = new TextureLoader().load(url);
      groundTexture.wrapS = groundTexture.wrapT = RepeatWrapping;
      groundTexture.repeat.set(50, 50);
      groundTexture.anisotropy = 16;
      let material = new MeshLambertMaterial({
        map: groundTexture
      });
      this.mesh = new Three.Mesh(geometry, material);
      this.scene.add(this.mesh);

      // 光源
      let point = new Three.PointLight(0xffffff);
      point.position.set(400, 200, 300);
      this.scene.add(point);
      var ambient = new Three.AmbientLight(0x444444);
      this.scene.add(ambient);

      // this.renderer.setClearColor(new Color(0xcce0ff));
      this.scene.fog = new Three.Fog(0x050505, 2000, 3500);

      const axesHelper = new Three.AxesHelper(50);
      axesHelper.position.y = -1;
      this.scene.add(axesHelper);

      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);
    },
    animate() {
      requestAnimationFrame(this.animate);
      this.renderer.render(this.scene, this.camera);
    }
  }
};
</script>

<style scoped>
.house-con {
  width: 600px;
  height: 600px;
}
</style>
