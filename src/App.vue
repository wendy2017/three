<template>
  <div id="app">
    <el-button>展示three.js</el-button>

    <!-- <div id="container"></div> -->
    <el-select @change="handleChnage" v-model="currentChart">
      <el-option
        v-for="item in allCharts"
        :key="item.value"
        :value="item.value"
        :label="item.label"
      ></el-option>
    </el-select>
    <template v-if="currentChart === 'base'">
      <base-three></base-three>
    </template>
    <template v-if="currentChart === 'lineSphere'">
      <line-sphere></line-sphere>
    </template>
    <template v-if="currentChart === 'geometryCube'">
      <geometry-cube></geometry-cube>
    </template>
    <template v-if="currentChart === 'house'">
      <house></house>
    </template>
    <template v-if="currentChart === 'panoramicHouse'">
      <panoramic-house></panoramic-house>
    </template>
  </div>
</template>

<script>
import GeometryCube from "./components/GeometryCube/index.vue";
import LineSphere from "./components/LineSphere/index.vue";
import BaseThree from "./components/BaseThree/index.vue";
import House from "./components/House/index.vue";
import PanoramicHouse from "./components/PanoramicHouse/index.vue";

export default {
  name: "App",
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      mesh: null,
      allCharts: [
        {
          label: "base",
          value: "base"
        },
        {
          label: "lineSphere",
          value: "lineSphere"
        },
        {
          label: "geometryCube",
          value: "geometryCube"
        },
        {
          label: "house",
          value: "house"
        },
        {
          label: "panoramicHouse",
          value: "panoramicHouse"
        }
      ],
      currentChart: ""
    };
  },
  components: { GeometryCube, LineSphere, BaseThree, House, PanoramicHouse },

  methods: {
    handleChnage(val) {
      this.currentChart = val;
    },
    init: function () {},
    animate: function () {},
    control: function () {}
  },
  mounted() {
    this.init();
    this.animate();
    this.control();
  }
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
