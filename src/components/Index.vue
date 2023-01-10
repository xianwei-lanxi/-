<template>
  <div class="imgs">
    <el-carousel :interval="4000" type="card">
      <el-carousel-item v-for="item in imgArray" :key="item">
        <el-image style="height: 350px" :src="item"></el-image>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "Index",
  components: {},
  data() {
    return {
      imgArray: [
        require("../assets/01.jpg"),
        require("../assets/02.jpg"),
        require("../assets/03.jpg"),
        require("../assets/04.jpg")
      ]
    };
  }
};
</script>

<style scoped>
.el-carousel__item:nth-child(2n) {
  background-color: #c3cad400;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce600;
}
.imgs {
  margin-top: 100px;
  text-align: center;
}
</style>
