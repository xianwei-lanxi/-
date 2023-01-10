<template>
  <div class="">
    <el-tabs :tab-position="tabPosition" style="height: 200px;">
      <el-tab-pane label="艺人信息">
        <div class="widths ">
          <div class="l">
            <img src="../../assets/cxk.jpeg" alt="" style="width:100px;height:150px;" />
          </div>
          <div class="r">
            <el-descriptions title="蔡徐坤">
              <el-descriptions-item label="英文名">KUN</el-descriptions-item>
              <el-descriptions-item label="年龄">24周岁</el-descriptions-item>
              <el-descriptions-item label="身高">184cm</el-descriptions-item>
              <el-descriptions-item label="备注">
                <el-tag size="small">学校</el-tag>格雷斯布莱恩斯中学
              </el-descriptions-item>
              <el-descriptions-item label="籍贯">籍贯湖南吉首</el-descriptions-item>
              <el-descriptions-item label="粉丝名">IKUN</el-descriptions-item>
            </el-descriptions>
          </div>
        </div>
        <div class="widths">
          <el-descriptions title="简介">
            <el-descriptions-item colon="false">
              蔡徐坤（KUN），1998年8月2日出生于浙江省，中国内地男歌手、演员、音乐制作人。
              2012年4月，蔡徐坤因参加综艺节目《向上吧！少年》进入全国200强而进入娱乐圈；同年8月，参演个人首部偶像剧《童话二分之一》
              。2014年3月，参演个人首部电影《完美假妻168》。2018年1月，参加中国首档偶像男团竞演养成类真人秀《偶像练习生》，并于同年4月6日获得最高票数，以NINE
              PERCENT九人男团C位出道并担任队长 ；同年8月，发行个人首张EP《1》
              ；随后获得出道后首个个人音乐类奖项亚洲新歌榜2018年度盛典“最受欢迎潜力男歌手”
              ；同年12月，获第十二届音乐盛典咪咕汇年度“最佳彩铃销量歌手”、年度十大金曲《WaitWaitWait》、搜狐时尚盛典“年度人气男明星”以及今日头条年度盛典“年度偶像人物”。2019年2月，首登北京台春晚便包揽词曲，为其创作歌曲《那年春天》
              。</el-descriptions-item>
          </el-descriptions>
        </div>
      </el-tab-pane>
      <el-tab-pane label="大事记">
        <div class="block">
          <div class="radio">
            <el-radio-group v-model="reverse">
              <el-radio :label="true">倒序</el-radio>
              <el-radio :label="false">正序</el-radio>
            </el-radio-group>
          </div>

          <el-timeline :reverse="reverse">
            <el-timeline-item v-for="(activity, index) in activities" :key="index" :timestamp="activity.timestamp">
              {{ activity.content }}<br />
              {{ activity.tips }}
            </el-timeline-item>
          </el-timeline>
        </div>
      </el-tab-pane>

      <el-tab-pane label="音乐单曲">
        <el-table :data="tableData" height="500" border style="width: 100%">
          <el-table-column prop="date" label="发行时间" width="180">
          </el-table-column>
          <el-table-column prop="name" label="歌曲名称" width="180">
          </el-table-column>
          <el-table-column prop="address" label="歌曲简介"> </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="打榜">
        <div class="body">
          <!-- 模糊查询 -->
          <el-form ref="form" :inline="true" :model="form" label-width="80px" size="small">
            <el-form-item label="姓名">
              <!--v-model 双向绑定  -->
              <el-input placeholder="输入姓名" v-model="form.name" size="small"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="selectSubmit">查询</el-button>
            </el-form-item>
          </el-form>
          <el-dialog title="编辑用户" :visible.sync="dialogUpdateVisible" width="400px" center>
            <el-form label-width="70px" :model="user">
              <el-form-item label="名称" size="mini">
                <el-input v-model="user.username"></el-input>
              </el-form-item>
              <el-form-item label="打榜数量" size="mini">
                <el-input v-model="user.sbs"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogUpdateVisible = false">取 消</el-button>
              <el-button type="primary" @click="updateUser">确 定</el-button>
            </div>
          </el-dialog>

          <!-- 表格 -->
          <!-- tableData 获取到的是 userPageInfo -->
          <el-table :data="tableData2.list" style="width: 100%" :border="true">
            <el-table-column prop="id" label="编号" align="center" width="180">
            </el-table-column>
            <el-table-column prop="username" label="姓名" align="center" width="180">
            </el-table-column>
            <el-table-column prop="sbs" label="打榜数" align="center">
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <!--  slot-scope 自定义列的内容 参数为 { row 行, column, $index }  -->
                <el-button size="mini" @click="updateUserHandle(scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="delUserHandle(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination background layout="prev, pager, next" :pageSize="tableData2.pageSize"
              :total="tableData2.total" @current-change="currentChange">
            </el-pagination>
          </div>
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

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
const axios = require("axios"); //引入axios
export default {
  components: {},
  data() {
    return {
      centerDialogVisible: false, //删除弹框
      dialogFormVisible: false, // 弹框默认隐藏
      dialogUpdateVisible: false, // 修改弹窗，默认不显示——false
      tabPosition: "top",
      reverse: true,
      activities: [
        {
          content: "出生",
          timestamp: "1998年8月2日",
          tips: "蔡徐坤出生于浙江温州。"
        },
        {
          content: "首次出演电视剧",
          timestamp: "2012年8月2日",
          tips:
            "蔡徐坤担任主演的偶像剧《童话二分之一》播出，他开始步入大众视线。"
        },
        {
          content: "首次参加青春励志综艺节目",
          timestamp: "2015年7月10日",
          tips: "参加中韩青春励志原创综艺节目《星动亚洲》，进入前三强。"
        },
        {
          content: "正式出道",
          timestamp: "2018年1月1日",
          tips:
            "蔡徐坤参加竞演类综艺节目《偶像练习生》，并于同年4月6日以第一名的成绩正式出道。"
        },
        {
          content: "发行首张EP音乐作品",
          timestamp: "2018年8月2日",
          tips:
            "蔡徐坤担任EP制作人发行了个人的首张EP《1》，随后，EP里的《Pull Up》获得Billboard Radio China年度十大华语金曲奖"
        },
        {
          content: "担任北京电视台春节联欢晚会的代言人",
          timestamp: "2019年1月1日",
          tips: "蔡徐坤作为新生力量代表担任北京电视台春节联欢晚会的代言人"
        },
        {
          content: "发行首张数专音乐作品",
          timestamp: "2019年7月26日",
          tips: "发行首张数字专辑《YOUNG》，该专辑打破多项记录"
        },
        {
          content: "成立葵计划爱心基金",
          timestamp: "2019年10月17日",
          tips:
            "中国儿童少年基金会携手蔡徐坤共同设立“葵计划爱心基金”，他首期捐赠63万元善款。2020年8月2日，捐赠82万元助力葵计划公益合唱训练营等公益项目，截至2022年3月已带动粉丝为葵计划累计捐款460余万元"
        },
        {
          content: "担任青春制作人代表",
          timestamp: "2020年3月1日",
          tips: "加盟《青春有你第二季》，担任青春制作人代表"
        },
        {
          content: "抗疫歌曲《山河无恙在我胸》MV发布",
          timestamp: "2020年3月15日",
          tips:
            "致敬抗疫英雄公益歌曲《山河无恙在我胸》MV发布，该歌曲获得2020咪咕音乐公益影响力奖项"
        },
        {
          content: "原创公益歌曲《Home》上线",
          timestamp: "2020年4月9日",
          tips:
            "蔡徐坤为抗疫创作公益歌曲《Home》，歌曲通过钢琴与童声的结合将祝福与温暖传递"
        },
        {
          content: "加入《奔跑吧》成为常驻嘉宾",
          timestamp: "2020年4月24日",
          tips: "蔡徐坤连续三年加入户外竞技真人秀《奔跑吧》并担任常驻嘉宾"
        },
        {
          content: "发布的原创单曲《情人》掀起热潮",
          timestamp: "2020年5月24日",
          tips:
            "发布原创单曲《情人》，该曲刷新了15项音乐榜单冠军，随后他还获得第27届东方风云榜最佳男歌手、亚洲人气歌手及网络影响力三个奖项。"
        },
        {
          content: "音乐盛典咪咕汇收获多个奖项",
          timestamp: "2020年12月26日",
          tips:
            "蔡徐坤在第十四届音乐盛典咪咕汇获得年度内地最佳男歌手、年度内地最受欢迎男歌手及年度最佳人气男歌手三个奖项，同时，单曲《情人》也获得了年度十大金曲奖。"
        },
        {
          content: "TMEA腾讯音乐娱乐盛典持续发力",
          timestamp: "2021年1月23日",
          tips:
            "蔡徐坤在第二届TMEA腾讯音乐娱乐盛典上获得年度最具影响力唱作歌手和年度最具号召力歌手两个奖项，单曲《情人》获年度十大金曲奖。12月11日，第三届TMEA腾讯音乐娱乐盛典获得年度最具影响力制作人，歌曲《感受她》获得年度十大金曲奖。"
        },
        {
          content: "发行个人原创专辑《迷》",
          timestamp: "2021年4月13日",
          tips:
            "蔡徐坤以原创音乐制作人身份发行个人创作专辑《迷》，他不仅参与专辑词曲创作和编曲制作，还先后担任《迷》MV编剧和《感受她》MV导演。"
        },
        {
          content: "首次举办个人巡回演唱会",
          timestamp: "2021年7月17日",
          tips: "于北京凯迪拉克中心举办首场个人巡回演唱会。"
        },
        {
          content: "被评为2021年度面孔",
          timestamp: "2022年1月1日",
          tips: "蔡徐坤被《人物》杂志评选为2021年度面孔登上一月刊封面。"
        }
      ],

      tableData: [
        {
          date: "2022-7-22",
          name: "Hug me",
          address: "作词、作曲、演唱"
        },
        {
          date: "2020-05-24",
          name: "情人",
          address: "作词、作曲、演唱"
        },
        {
          date: "2020-04-09",
          name: "Home",
          address: "抗疫公益歌曲、作词、作曲、演唱"
        },
        {
          date: "2020-03-24",
          name: "山河无恙在我胸",
          address: "抗疫公益歌曲，与佟丽娅合唱"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2019-12-05",
          name: "冬梦飞翔",
          address: "2022北京冬奥会推广曲，与佟丽娅合唱"
        },
        {
          date: "2019-11-15",
          name: "重生",
          address: "作词、制作、演唱"
        },
        {
          date: "2019-11-15",
          name: "Hard To Get",
          address: "作词、制作、演唱"
        },
        {
          date: "	2019-03-22",
          name: "Bigger",
          address: "作词、作曲、制作、首支EDM，海外公演主题曲"
        },
        {
          date: "2019-02-18",
          name: "没有意外",
          address: "作词、演唱"
        },
        {
          date: "2019-02-09",
          name: "一起笑出来",
          address: "电影《神探蒲松龄》主题曲，与成龙合唱"
        },
      ],

      tableData2: [
        {
          id: 1,
          username: "joke",
          sbs: "5438"
        }, {
          id: 1,
          username: "joke",
          sbs: "5438"
        }
      ],
      // 当前页
      currentPage: 1,
      // 名字搜索查询输入框
      form: {
        name: ""
      },
      // 新增表单
      user: {
        username: "",
        sbs: "",
      },
      uid: 0
    };
  },
  //  vue 生命周期钩子函数
  created() {
    this.findAll();// 初始化数据
  },

  methods: {
    /**
     * 分页：当前页改变触发事件函数
     */
    currentChange(val) {
      console.log("获取当页码", val);
      this.currentPage = val; // 把获取到的页码赋值给当前页
      this.findSbs(); // 去查询
    },
    findSbs() {
      // 初始化的时候默认查询第一页   可以不用传参
      axios.get("http://localhost:8090/findSbs", {
        params: {
          pageNum: this.currentPage,
          name: this.form.name
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
    selectSubmit() {
      console.log("获取条件查询输入的用户名：", this.form.name);
      this.findAll();
    },
    /**
     * 新增用户
     */
    addUser() {
      // console.log(this.user)
      // 处理数据对象
      let param = new URLSearchParams();
      // append(name string, value string) name 要和后端接口参数名一致，value 值  键值对
      param.append("username", this.user.username);
      param.append("sbs", this.user.sbs);
      // 发送post请求
      this.$http.post("http://localhost:8090/addUser", param).then(result => {
        // console.log(result);
        if (result.data.code == 3000) {
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
    delUserHandle(val) {
      console.log("删除功能获取用户id", val);
      this.uid = val; // 把获取到的id 复制给uid变量
      // 打开删除的提示框
      this.centerDialogVisible = true;
    },

    /**
     * 真正执行删除的操作是提示框的确认按钮
     * 路径传参的url: http://localhost:8090/delUser/2
     */
    delUser() {
      axios.get("http://localhost:8090/delUser/" + this.uid).then(result => {
        // console.log(result)
        if (result.data.code == 4000) {
          // 对话框关闭
          this.centerDialogVisible = false;
          // 刷新表格
          this.findAll();
        }

      })
    },
    updateUserHandle(val) {
      // 把id赋值给 uid
      this.uid = val.id;
      console.log("编辑功能数据回显，获取id", this.uid);
      this.dialogUpdateVisible = true;
      var _user = JSON.parse(JSON.stringify(val))
      this.user = _user;
    },
    updateUser() {
      axios.get("http://localhost:8090/updateUser", {
        params: {
          id: this.uid,
          username: this.user.username,
          sbs: this.user.sbs,
        }
      }).then(result => {
        // console.log(result)
        if (result.data.code == 5000) {
          // 对话框关闭
          this.dialogUpdateVisible = false;
          // 刷新表格
          this.findAll();
        }
      })
    }


  },

  created() { },
  mounted() { },
  watch: {},
  computed: {},
  methods: {}
};
</script>
<style scoped>
.pagination {
  margin: 30px;
  text-align: center;
}

.widths {
  width: 80%;
  margin-left: 50px;
  display: flex;
}

.l {
  width: 120;
  padding: 20px 80px 20px 0px;
}

.r {
  width: auto;
  padding-top: 20px;
}

.radio {
  margin: 20px 0px 20px 0px;
}
</style>
