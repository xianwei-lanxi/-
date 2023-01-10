<template>
  <div class="h-title">
    <div class="s-title">
      <!-- 用户图像 -->
      <!-- <img src="../assets/b.jpg" alt="" /> -->
      <img :src="require('../assets/' + imgName)" alt="" style="width:40px;height:40px;" />
    </div>
    <!-- 显示用户名使用下拉菜单 -->
    <el-dropdown class="uu" @command="handleCommand">
      <span class="el-dropdown-link">
        {{ name }}&nbsp;&nbsp;&nbsp;&nbsp;<i class="el-icon-switch-button"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      imgName:"",
    };
  },
  created() {
    var jsonStr = localStorage.getItem("vo");
    //把字符串类型转换为json格式
    var vo = eval("(" + jsonStr + ")");
    this.name = vo.data.data.username;

    this.imgName=vo.data.data.imgs
  },
  methods: {
    //退出功能实现
    handleCommand(command) {
      if (command == "loginout") {
        //退出系统
        localStorage.removeItem("vo");
        this.$router.push("/");
      }
    }
  }
};
</script>

<style scoped>
.h-title {
  display: flex;
  align-items: center; /**纵行居中 */
  height: 70px;
  float: right; /**右浮动 */
  padding-right: 50px;
}

.s-title img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.uu {
  margin-left: 20px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #fff;
  font-size: 16px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
