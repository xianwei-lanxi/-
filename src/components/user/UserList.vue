<template>
  <div class="body" >
    <!-- 模糊查询 -->
    <el-form ref="form" :inline="true" :model="form" label-width="80px" size="small">
      <el-form-item label="姓名">
        <!--v-model 双向绑定  -->
        <el-input placeholder="输入姓名" v-model="form.name" size="small"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="selectSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="dialogFormVisible = true">添加新用户
        </el-button>
      </el-form-item>
    </el-form>

    <!-- 点击新增用户弹框 -->
    <el-dialog title="新增用户" :visible.sync="dialogFormVisible" width="400px" center>
      <el-form label-width="70px" :model="user">
        <el-form-item label="名称" size="mini">
          <el-input v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="性别" size="mini">
          <el-radio-group v-model="user.sex">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="地址" size="mini">
          <el-input v-model="user.address"></el-input>
        </el-form-item>
        <el-form-item label="电话" size="mini">
          <el-input v-model="user.phone"></el-input>
        </el-form-item>
        <el-form-item label="生日" size="mini">
          <el-date-picker v-model="user.birthday" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-dialog>

     <!-- 点击修改用户弹框 -->
     <el-dialog title="编辑用户" :visible.sync="dialogUpdateVisible" width="400px" center>
      <el-form label-width="70px" :model="user">
        <el-form-item label="名称" size="mini">
          <el-input v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="性别" size="mini">
          <el-radio-group v-model="user.sex">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="地址" size="mini">
          <el-input v-model="user.address"></el-input>
        </el-form-item>
        <el-form-item label="电话" size="mini">
          <el-input v-model="user.phone"></el-input>
        </el-form-item>
        <el-form-item label="生日" size="mini">
          <el-date-picker v-model="user.birthday" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdateVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateUser">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 表格 -->
    <!-- tableData 获取到的是 userPageInfo -->
    <el-table :data="tableData.list" style="width: 100%" :border="true">
      <el-table-column prop="id" label="编号" align="center" width="180">
      </el-table-column>
      <el-table-column prop="username" label="姓名" align="center" width="180">
      </el-table-column>
      <el-table-column prop="birthday" align="center" label="出生日期" width="180">
      </el-table-column>
      <el-table-column prop="sex" align="center" label="性别">
      </el-table-column>
      <el-table-column prop="address" align="center" label="地址">
      </el-table-column>
      <el-table-column prop="phone" label="电话" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <!--  slot-scope 自定义列的内容 参数为 { row 行, column, $index }  -->
          <el-button size="mini" @click="updateUserHandle(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="delUserHandle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 :total总页数  
       :pageSize：页面容量 
        :current-page：当前页  
         @current-change：
         currentPage 改变时会触发
        -->
    <div class="pagination">
      <el-pagination background 
      layout="prev, pager, next" 
      :pageSize="tableData.pageSize" 
      :total="tableData.total"
      @current-change="currentChange">
      </el-pagination>
    </div>
    <!-- 删除的提示框 -->
    <el-dialog title="提示" :visible.sync="centerDialogVisible" width="300px" center>
      <div align="center">
        删除不可以恢复，是否确定删除！
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="delUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
const axios = require("axios"); //引入axios
export default {
  components: {},
  // 数据初始化组件
  data() {
    return {
      centerDialogVisible: false, //删除弹框
      dialogFormVisible: false, // 弹框默认隐藏
      dialogUpdateVisible:false, // 修改弹窗，默认不显示——false

      tableData: [
        {
          id: 1,
          username: "joke",
          birthday: "2020-01-01",
          sex: "man",
          address: "China",
          phone: "5438"
        }, {
          id: 1,
          username: "joke",
          birthday: "2020-01-01",
          sex: "man",
          address: "China",
          phone: "5438"
        }
      ],
      // 当前页
      currentPage:1,
      // 名字搜索查询输入框
      form:{
        name:""
      },
      // 新增表单
      user:{
        username:"",
        sex:"",
        address:"",
        phone:"",
        birthday:""
      },
      uid:0
    };
  },
  //  vue 生命周期钩子函数
  created() {
    this.findAll();// 初始化数据
    // axios.get("http://localhost:8090/findAll",{
    //     params:{
    //       pageNum:this.currentPage
    //     }
    //   }).then(result => {
    //     //  result.data 指后端响应的数据
    //     console.log(result.data)
    //     // this 指的是vue实例对象  result.data 指获取到的是封装的统一结果对象，.data 后面的 data是统一结果对象里的数据属性
    //     this.tableData = result.data.data
    //   })
  },
  // 写函数的地方
  methods: {
    /**
     * 分页：当前页改变触发事件函数
     */
    currentChange(val) {
      console.log("获取当页码", val);
      this.currentPage = val; // 把获取到的页码赋值给当前页
      this.findAll(); // 去查询
      // axios.get("http://localhost:8090/findAll",{
      //   params:{
      //     pageNum:val
      //   }
      // }).then(result => {
      //   //  result.data 指后端响应的数据
      //   console.log(result.data)
      //   // this 指的是vue实例对象  result.data 指获取到的是封装的统一结果对象，.data 后面的 data是统一结果对象里的数据属性
      //   this.tableData = result.data.data
      // })
    },
    /**
     * 封装查询所有函数——发送请求
     */
    findAll() {
      // 初始化的时候默认查询第一页   可以不用传参
      axios.get("http://localhost:8090/findAll",{
        params:{
          pageNum:this.currentPage,
          name:this.form.name
        }
      }).then(result => {
        //  result.data 指后端响应的数据
        console.log(result.data)
        // this 指的是vue实例对象  result.data 指获取到的是封装的统一结果对象，.data 后面的 data是统一结果对象里的数据属性
        this.tableData = result.data.data
      })
    },

    /**
     * 条件查询
     */
     selectSubmit(){
      console.log("获取条件查询输入的用户名：",this.form.name);
      this.findAll();
    //   axios.get("http://localhost:8090/findAll",{
    //     params:{
    //       name:this.form.name
    //     }
    //   }).then(result => {
    //     //  result.data 指后端响应的数据
    //     console.log(result.data)
    //     // this 指的是vue实例对象  result.data 指获取到的是封装的统一结果对象，.data 后面的 data是统一结果对象里的数据属性
    //     this.tableData = result.data.data
    //   })
     },

     /**
      * 新增用户
      */
     addUser(){
      // console.log(this.user)
      // 处理数据对象
      let param = new URLSearchParams();
      // append(name string, value string) name 要和后端接口参数名一致，value 值  键值对
      param.append("username",this.user.username);
      param.append("sex",this.user.sex);
      param.append("address",this.user.address);
      param.append("phone",this.user.phone);
      param.append("birthday",this.user.birthday);

      // 发送post请求
      this.$http.post("http://localhost:8090/addUser",param).then(result=>{
        // console.log(result);
        if(result.data.code == 3000){
          // 对话框关闭
          this.dialogFormVisible = false;
          // 刷新表格
          this.findAll();
        }
      })
     },
     /**
      * 删除按钮事件，弹出删除提示框
      * 
      */
      delUserHandle(val){
        console.log("删除功能获取用户id",val);
        this.uid = val; // 把获取到的id 复制给uid变量
        // 打开删除的提示框
        this.centerDialogVisible = true;
      },

      /**
       * 真正执行删除的操作是提示框的确认按钮
       * 路径传参的url: http://localhost:8090/delUser/2
       */
       delUser(){
        axios.get("http://localhost:8090/delUser/" + this.uid).then(result=>{
          // console.log(result)
          if(result.data.code == 4000){
              // 对话框关闭
          this.centerDialogVisible = false;
          // 刷新表格
          this.findAll();
          }

        })
       },

       /**
        * 编辑按钮事件函数，点击弹出编辑弹窗
        * 数据回显
        * val 传入的是表格的一行数据
        */
        updateUserHandle(val){
          // 把id赋值给 uid
          this.uid = val.id;
          console.log("编辑功能数据回显，获取id",this.uid);
          this.dialogUpdateVisible = true;
          // console.log(val);
          // 把接收到的一行数据赋值给 user（双向数据绑定）
          // this.user = val;
          // 如果直接赋值给 user 对象，会存在一个bug——改变输入框的值时，表格中的值也会实时跟着改变，
          // 原因是使用了v-model的双向数据绑定
          // 解决：通过复制一个对象，把复制的对象复制给user,破坏他们之间的双向数据绑定约定
          // JSON.stringify(val) 将json格式数据转换称 字符串
          var _user = JSON.parse(JSON.stringify(val))
          this.user = _user;
        },
        /**
         * 真正修改用户的函数，确定修改
         * 发送http请求 
         */
        updateUser(){
          axios.get("http://localhost:8090/updateUser",{
            params:{
              id:this.uid,
              username:this.user.username,
              sex:this.user.sex,
              address:this.user.address,
              phone:this.user.phone,
              birthday:this.user.birthday
            }
          }).then(result=>{
            // console.log(result)
            if(result.data.code == 5000){
                   // 对话框关闭
              this.dialogUpdateVisible = false;
               // 刷新表格
              this.findAll();
            }
          })
        }


  }
};
</script>
<style scoped>
.pagination {
  margin: 30px;
  text-align: center;
}
/* .body{
  background: url(../../../build/logo.png) no-repeat;
} */
</style>
