import Vue from "vue";
import Router from "vue-router";
import Login from "../components/Login";
import Home from "../components/Home";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login
    },
    {
      path: "/home",
      redirect: "/home/index"
    },
    {
      path: "/home",
      component: Home,
      children: [
        // 首页走马灯的组件页面
        {
          path: "index",
          name: "首页",
          component: () => import("../components/Index")
        },
        // 用户列表的页面
        {
          path: "userList",
          name: "用户列表",
          component: () => import("../components/user/UserList")
        },
        // 歌手列表的页面
        {
          path: "SingerList1",
          name: "歌手列表",
          component: () => import("../components/singer/SingerList1")
        },
        {
          path: "SingerList2",
          name: "歌手列表",
          component: () => import("../components/singer/SingerList2")
        },
        {
          path: "SingerList3",
          name: "歌手列表",
          component: () => import("../components/singer/SingerList3")
        }
      ]
    }
  ],
  mode: "history" // 页面路径#可以不用写
});
