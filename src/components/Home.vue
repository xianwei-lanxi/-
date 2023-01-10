<template>
  <div>
    <el-container>
      <!-- 左侧菜单 -->
      <el-aside width="240px">
        <!-- 3.使用组件 -->
        <Menu></Menu>
      </el-aside>
      <el-container>
        <!-- 头部 -->
        <el-header height="70px">
          <Header></Header>
        </el-header>
        <el-main>
          <!-- 主体部分 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>   
  </div>

</template>

<script>
import Menu from "./Menu"; // 1.引入菜单组件
import Header from "./Header"; //引入头部组件

export default {
  components: {
    Menu, //2.注册组件
    Header
  }
};
</script>

<style>
.el-header {
  background-color: #42b983;
  color: #333;
  text-align: right;
}

.el-aside {
  background-color: #545c64;
  height: 650px;
}
</style>
