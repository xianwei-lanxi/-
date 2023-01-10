<template>
  <div>
    <el-row class="tac">
      <el-col>
        <el-menu
          active-text-color="#ffd04b"
          background-color="#545c64"
          text-color="#fff"                    
        >
          <div class="el-title">
            <span class="hs">Ikun粉丝后援会</span>
          </div>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-home"></i>
              <router-link to="/home/index" tag="span">首页</router-link>
            </template>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-eleme"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1"
                ><i class="el-icon-location"></i>
                <router-link to="/home/userList" tag="span"
                  >用户列表</router-link
                ></el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-grid"></i>
              <span>蔡徐坤</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-2">
                <i class="el-icon-location"></i>
                <router-link to="/home/singerList1" tag="span">个人信息</router-link>
                </el-menu-item>
                <el-menu-item index="1-3">
                <i class="el-icon-location"></i>
                <router-link to="/home/singerList2" tag="span">作品集</router-link>
                </el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-s-data"></i>
              <span>参加过的综艺</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-4">
                <i class="el-icon-location"></i>
                <router-link to="/home/singerList3" tag="span">《童话二分之一》</router-link>
                </el-menu-item>
                <el-menu-item index="1-5">
                <i class="el-icon-location"></i>
                <router-link to="/home/singerList3" tag="span">《青春有你第二季》</router-link>
                </el-menu-item>
                <el-menu-item index="1-6">
                <i class="el-icon-location"></i>
                <router-link to="/home/singerList3" tag="span">《奔跑吧第四季》</router-link>
                </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {};
</script>

<style scoped>
.el-title {
  line-height: 70px; /*行高 */
  background: rgb(100, 215, 219);
  font-size: 16px;
  text-align: center; /**水平居中 */
}
.hs{
  color: rgb(255, 238, 0);
}

</style>

