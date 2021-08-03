<template>
  <div>
    three.js demo- lines spheres
    <div id="container-line" style="width: 600px; height: 600px"></div>
  </div>
</template>

<script>
import * as Three from "three";

export default {
  name: "LineSphere",
  data() {
    return {
      scene: null,
      mesh: null,
      camera: null,
      renderer: null,
      r: 450,
      mouseY: 0
    };
  },
  mounted() {
    this.init();
    this.animate();
  },
  methods: {
    init() {
      let container = document.getElementById("container-line");

      this.camera = new Three.PerspectiveCamera(
        70,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      );
      this.camera.position.z = 1;

      this.scene = new Three.Scene();

      let geometry = this.createGrometry();

      const parameters = [
        [0.25, 0xff7700, 1],
        [0.5, 0xff9900, 1],
        [0.75, 0xffaa00, 0.75],
        [1, 0xffaa00, 0.5],
        [1.25, 0x000833, 0.8],
        [3.0, 0xaaaaaa, 0.75],
        [3.5, 0xffffff, 0.5],
        [4.5, 0xffffff, 0.25],
        [5.5, 0xffffff, 0.125]
      ];

      for (let i = 0; i < parameters.length; ++i) {
        const p = parameters[i];

        const material = new Three.LineBasicMaterial({
          color: p[1],
          opacity: p[2]
        });

        const line = new Three.LineSegments(geometry, material);
        line.scale.x = line.scale.y = line.scale.z = p[0];
        line.userData.originalScale = p[0];
        line.rotation.y = Math.random() * Math.PI;
        line.updateMatrix();
        this.scene.add(line);
      }
      // let material = new Three.MeshNormalMaterial();
      // this.mesh = new Three.Mesh(geometry, material);

      // this.scene.add(this.mesh);

      this.renderer = new Three.WebGLRenderer({ antialias: true });
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);

      setInterval(() => {
        const geometry = this.createGrometry();

        this.scene.traverse(function (object) {
          if (object.isLine) {
            object.geometry.dispose();
            object.geometry = geometry;
          }
        });
      }, 1000);
    },
    animate() {
      requestAnimationFrame(this.animate);
      this.render();
    },
    render() {
      this.camera.position.y +=
        (-this.mouseY + 200 - this.camera.position.y) * 0.05;
      this.camera.lookAt(this.scene.position);

      this.renderer.render(this.scene, this.camera);

      const time = Date.now() * 0.0001;

      for (let i = 0; i < this.scene.children.length; i++) {
        const object = this.scene.children[i];

        if (object.isLine) {
          object.rotation.y = time * (i < 4 ? i + 1 : -(i + 1));

          if (i < 5) {
            const scale =
              object.userData.originalScale *
              (i / 5 + 1) *
              (1 + 0.5 * Math.sin(7 * time));

            object.scale.x = object.scale.y = object.scale.z = scale;
          }
        }
      }
    },
    createGrometry() {
      const geometry = new Three.BufferGeometry();
      const vertices = [];
      const vertex = new Three.Vector3();

      for (let i = 0; i < 1500; i++) {
        vertex.x = Math.random() * 2 - 1;
        vertex.y = Math.random() * 2 - 1;
        vertex.z = Math.random() * 2 - 1;
        vertex.normalize();
        vertex.multiplyScalar(this.r);

        vertices.push(vertex.x, vertex.y, vertex.z);

        vertex.multiplyScalar(Math.random() * 0.09 + 1);

        vertices.push(vertex.x, vertex.y, vertex.z);
      }

      geometry.setAttribute(
        "position",
        new Three.Float32BufferAttribute(vertices, 3)
      );
      return geometry;
    }
  }
};
</script>

<style scoped></style>
