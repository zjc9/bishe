
<template>
  <div>
    <div class="selectchannel">
      <el-select v-model="channelname" placeholder="选择通道">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.label"
          :change="change"
        />
      </el-select>
    </div>
    <div class="gradehead">
      <el-row type="flex">
        <el-col :span="6"><div class="grid-content bg-purple"><div class="box1">
          <el-card class="card1">
            <p align="center">
              <img :src="url1" width="18.6px" height="18.6px">
              <font style="color: white" size="5">Blocks</font>
            </p>

            <p v-if="channelname == 'grade'" align="center" class="pdata">{{ stringgrade }}</p>
            <p v-if="channelname == 'student'" align="center" class="pdata">{{ student.length }}</p>

          </el-card>
        </div></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple-light">
          <div class="box1" style="background-color: pink">
            <el-card class="card1">
              <p align="center">
                <font style="color: white" size="5">Channel</font>
              </p>

              <p align="center" class="pdata">{{ channelname }}</p>

            </el-card>
          </div></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"><div class="box1">
          <el-card class="card1">
            <p align="center">
              <font style="color: white" size="5">Transactions</font>
            </p>

            <p align="center" class="pdata">{{ comuptedcommitnum }}</p>

          </el-card>
        </div></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple-light">
          <div class="box1">
            <el-card class="card1">
              <p align="center">
                <font style="color: white" size="5">Chaincodes</font>
              </p>

              <p align="center" class="pdata">1</p>

            </el-card>
          </div></div>
        </el-col>
      </el-row>
    </div>
    <!-- 加载图表 -->
    <div class="bolckmain">
      <el-row type="flex" justify="center">
        <el-col :span="12"><div class="grid-content bg-purple"><div style="margin-left: 20%;">
          <mix-chart v-if="channelname =='grade'" />
          <channel_student v-if="channelname == 'student'" />
        </div></div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light" /><div v-if="channelname == 'grade'" class="blockdetail">
          <div v-for="(v , i ) in grade" :key="i" class="box2">
            <el-card class="box-card1" shadow="hover">
              <el-form>
                <el-form-item label="学号">
                  <el-input v-model="grade[i].num" />
                  <el-form-item label="姓名">
                    <el-input v-model="grade[i].stu_name" />
                  </el-form-item>
                  <el-form-item label="课程" prop="age">
                    <el-input v-model="grade[i].course" />
                  </el-form-item>
                  <div v-show="show">
                    <el-form-item label="总成绩" prop="age">
                      <el-input v-model="grade[i].totalgrade" />
                    </el-form-item>
                  </div>
                </el-form-item></el-form>
              <el-button @click="showmore(i)">查看详细</el-button>
              <el-button @click="table = true">显示全部</el-button>

            </el-card>
            <div><img :src="url" class="down"></div>
          </div>
        </div></el-col>
      </el-row>
    </div>
    <el-drawer
      ref="drawer"
      title="详细信息"
      :visible.sync="more"
      direction="ltr"
      custom-class="demo-drawer"
    >
      <div class="infinite-list-wrapper" style="overflow:auto">
        <div class="demo-drawer__content">
          <el-form>
            <el-form-item label="学号">
              <el-input v-model="detail.num" autocomplete="off" />
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="detail.stu_name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="班级">
              <el-input v-model="detail.bj" autocomplete="off" />
            </el-form-item>
            <el-form-item label="教师">
              <el-input v-model="detail.teacher" autocomplete="off" />
            </el-form-item>
            <el-form-item label="课程">
              <el-input v-model="detail.course" autocomplete="off" />
            </el-form-item>
            <el-form-item label="平时成绩">
              <el-input v-model="detail.ps_grade" autocomplete="off" />
            </el-form-item>
            <el-form-item label="期末成绩">
              <el-input v-model="detail.qm_grade" autocomplete="off" />
            </el-form-item>
            <el-form-item label="总成绩">
              <el-input v-model="detail.totalgrade" autocomplete="off" />
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-drawer>
    <el-drawer
      title="全部信息"
      :visible.sync="table"
      direction="rtl"
      size="30%"
    >
      <el-table :data="grade">
        <el-table-column property="num" label="学号" width="150" />
        <el-table-column property="stu_name" label="姓名" width="200" />
        <el-table-column property="course" label="科目" />
      </el-table>
    </el-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import mixChart from '@/views/charts/index'
import channel_student from '@/views/charts/channel_student'
export default {
  components: {
    mixChart,
    channel_student
  },
  data() {
    return {
      show: false,
      url: require('@/assets/img/down.png'),
      url1: require('@/assets/img/block.jpg'),
      commitnum: 0,
      table: false,
      more: false,
      showvalue: 0,
      detail: [],
      channelname: 'grade',
      options: [{
        value: '选项1',
        label: 'student'
      }, {
        value: '选项2',
        label: 'teacher'
      }, {
        value: '选项3',
        label: 'grade'
      }],
      reverse: true,
      activities: [{
        content: '活动按期开始',
        timestamp: '2018-04-15'
      }, {
        content: '通过审核',
        timestamp: '2018-04-13'
      }, {
        content: '创建成功',
        timestamp: '2018-04-11'
      }]
    }
  },
  computed: {
    ...mapGetters([
      'grade',
      'student'
    ]),
    stringgrade() {
      var gradedata = this.grade
      var arr = gradedata.length
      // for (let i = 0; i < gradedata.length; i++) {
      //   var data = JSON.stringify(gradedata[i])
      //   arr.push(data)
      // }
      return arr
    },
    comuptedcommitnum() {
      var num = 0
      var g = this.grade
      for (let i = 0; i < g.length; i++) {
        num += parseInt(g[i].commits)
      }
      return num
    },
    detailgrade(value) {
      console.log(`detailgrade=${value}`)
      var gradedata = this.grade
      var arr = gradedata[value]
      // for (let i = 0; i < gradedata.length; i++) {
      //   var data = JSON.stringify(gradedata[i])
      //   arr.push(data)
      // }
      return arr
    }
  },
  methods: {
    showmore(value) {
      this.showvalue = value
      this.more = true
      this.detail = this.grade[value]
      console.log(`value==${value}`)
    },
    change() {
      console.log(this.channelname)
    }
  }
}
</script>
<style>
.box-card{
  margin-left: 30%;
  border-radius: 30px;
  width: 40%;
   box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.down{
  width: 50px;
  height: 50px;
  margin-left: 50%;
}
.box1{
   margin: 10px;
   margin-left: 0px;
  width: 200px;
  height: 126px;
  border-radius: 30px;
  overflow: hidden;
}
.el-drawer{
    overflow: scroll;
}
.card1{
  padding: 0px;
   background-color: black;
}
.pdata{
  color: white;
  font-size:30px;
  margin-top: 0px;
}
i{
  align-content: center;
}
.blockdetail{
  width: 500px;
  height: 440px;
  overflow: auto;
  margin-left: 10%;
   border-radius: 30px;
}
.gradehead{
  width: 900px;
  margin-left: 20%;
}
.selectchannel{
  margin-left: 90%;
}
.blockmain{
  margin-left: 30%;
}
</style>
