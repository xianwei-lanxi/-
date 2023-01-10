<template>
  <div class="login">
    <div class="ms-login">
      <h3 style="text-align:center">后端音乐管理管理系统</h3>
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop="username">
          <el-input
            placeholder="请输入用户名"
            prefix-icon="el-icon-user-solid"
            v-model="form.username"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="请输入密码"
            prefix-icon="el-icon-s-goods"
            v-model="form.password"
          >
          </el-input>
        </el-form-item>

        <div class="login-btn">
          <el-button type="primary" @click="btnSubimt()">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        username: "ikun1",
        password: "123"
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "change" }]
      }
    };
  },
  methods: {
    btnSubimt() {
      //连接后端服务器，从数据库中查询是否存在用户，存在进行密码验证进行登录
      //发送异步请求
      //箭头函数  es6
      axios
        .get("http://localhost:8090/login", {
          params: {
            name: this.form.username,
            password: this.form.password
          }
        })
        .then(result => {
          console.log(result);
          if (result.data.code == 1001) {
            //result存储起来 放在 localStorage
            // json格式 数据转换为字符串
            localStorage.setItem("vo", JSON.stringify(result));

            this.$message({
              showClose: true,
              message: result.data.msg,
              type: "success"
            });
            this.$router.push("/home");
          } else {
            this.$message({
              showClose: true,
              message: result.data.msg,
              type: "error"
            });
          }
        });
    }
  }
};
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  background: #42b983;
  /* background-image: url(../assets/logo.png); */
}
.ms-login {
  width: 300px;
  height: 250px;
  border: 1px solid #ccc;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -150px 0 00 -190px;
  padding: 40px;
  border-radius: 5px;
  background: #fff;
  line-height: 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 35px;
}
</style>
