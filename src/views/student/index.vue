<template>
  <div>
    <el-container>
      <el-main id="eltable">
        <el-table v-loading="loading" :data="chengji" :row-class-name="testtwo" width="100%" :default-sort="{prop: 'num', order: 'descending'}" @select="ons">
          <el-table-column v-if="show" type="selection" width="55" :select="ons" />
          <el-table-column label="学号" width="90" prop="num" />
          <el-table-column label="班级" prop="bj" />
          <el-table-column label="姓名" prop="stu_name" />
          <el-table-column label="教师" prop="teacher" />
          <el-table-column label="课程" prop="course" />
          <el-table-column label="学期" prop="term" />
          <el-table-column label="点名成绩1" width="85" prop="dm1" />
          <el-table-column label="点名成绩2" width="85" prop="dm2" />
          <el-table-column label="点名成绩3" width="85" prop="dm3" />
          <el-table-column label="课堂成绩1" width="85" prop="kt1" />
          <el-table-column label="课堂成绩2" width="85" prop="kt2" />
          <el-table-column label="课堂成绩3" width="85" prop="kt3" />
          <el-table-column label="实验成绩1" width="85" prop="sy1" />
          <el-table-column label="实验成绩2" width="85" prop="sy2" />
          <el-table-column label="实验成绩3" width="85" prop="sy3" />

          <el-table-column label="平时成绩" prop="ps_grade" />
          <el-table-column label="期末成绩" prop="qm_grade" />
          <el-table-column label="总成绩" prop="totalgrade" width="90" sortable />
          <el-table-column label="作业" width="200" prop="homework">
            <template slot-scope="scope">
              <a
                :href="'http://192.168.253.142:3001/download?id=' + scope.row.homework"
                target="_blank"
              >
                {{ scope.row.homework }}</a>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
    <div style="margin-top: 20px">
      <el-button @click="sub">提交疑问</el-button>
      <el-button @click="showcheck">取消选择</el-button>
    </div>
  </div>
</template>

<script>
// import shortid from 'shortid'
// eslint-disable-next-line no-unused-vars
import tablecomponet from '@/views/tablecomponet'
// eslint-disable-next-line no-unused-vars
import moment, { relativeTimeThreshold } from 'moment'
import { mapGetters } from 'vuex'
import { postGrade, postQuestion } from '@/api/user'
export default {
  name: 'ListRenderTwo',
  filters: {
    timeFormate(value, format = 'YYYY--MM--DD HH:mm:ss') {
      return moment(value).format(format)
    }
  }, components: {
    // eslint-disable-next-line vue/no-unused-components
    tablecomponet
  },
  data() {
    return {
      loading: true,
      show: true,
      time: new Date(),
      searchName: '',
      grade: [],
      personkyes: [],
      orderType: 0,
      outputs: [],
      e: '',
      chengji: [
      ],
      newcj: {
        stu_name: '',
        bj: '',
        num: '',
        teacher: '',
        course: '',
        ps_grade: 0,
        qm_grade: 0,
        totalgrade: 0,
        sta: '待审核'
      },
      arr1: []
    }
  },
  computed: {
    ...mapGetters([
      'username',
      'name'
    ])
  },
  mounted() {
    // this.personkyes = this.persons.map(v => shortid.generate())
  },
  beforeCreate() {
    this.$store.dispatch('user/getGrade', { id: this.username }).then((response) => {
      var data = JSON.parse(response)
      for (let i = 0; i < data.length; i++) {
        var da = data[i].Record
        this.chengji.push(da)
      }
      this.loading = false
      // this.$refs.tablecom.isReady()
      console.log('1111111111111111111username=' + this.username)
    }).catch((error) =>
      console.log(error)
    )
  },
  methods: {
    sub() {
      postQuestion(this.grade[0]).then(() => {
        this.$alert('提交成功', '消息', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `已成功提交复核请求`
            })
            this.chengji = []
            this.$store.dispatch('user/getGrade', { id: this.username }).then((response) => {
              var data = JSON.parse(response)
              for (let i = 0; i < data.length; i++) {
                var da = data[i].Record
                this.chengji.push(da)
              }
              console.log('1111111111111111111username=' + data.length)
            }).catch((error) =>
              console.log(error)
            )
          }
        })
      })
    },
    showcheck() {
      this.show = !this.show
    },
    ons(rows, row) {
      var selectd = rows.length && rows.indexOf(row) !== -1
      console.log(`select=${selectd}`)
      if (selectd) {
        this.grade.push(`${row.num}${row.teacher}${row.term}`)
        console.log(`${selectd}`)
      } else {
        // this.grade.pop()
        this.grade.splice(this.grade.indexOf(`${row.num}${row.teacher}${row.term}`), 1)
        console.log(`${row.num}${row.teacher}${row.term}+${selectd}`)
      }
    },
    onsubmit() {
      postGrade(this.chengji).then(() => {
        this.$alert('添加成功', '消息', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${action}`
            })
          }
        })
      })
      console.log(typeof (this.chengji))
    },
    onChange(file, fileList) {
      console.log(fileList)
      this.fileData = file
      this.readExcel()
    },
    testtwo({ row, rowIndex }) {
      if (row.totalgrade < 60) {
        // console.log('当前不及格' + row.totalgrade)
        if (row.sta === '有疑问') {
          return 'question'
        }
        return 'bujige'
      } else {
        // console.log('当前及格' + row.totalgrade)
        if (row.sta === '有疑问') {
          return 'question'
        }
        return 'jige'
      }
    },
    orderByAge(orderType) {
      this.orderType = orderType
    },
    test(arr) {
      this.cj = arr
    },
    exportToExcel() {
      // excel数据导出
      require.ensure([], () => {
        const { export_json_to_excel } = require('../excel/Export2Excel')
        const tHeader = [
          '学号',
          '班级',
          '姓名',
          '教师',
          '课程',
          '平时成绩',
          '期末成绩',
          '总成绩',
          '状态'
        ]
        const filterVal = [
          'num',
          'bj',
          'stu_name',
          'teacher',
          'course',
          'ps_grade',
          'qm_grade',
          'totalgrade',
          'sta'
        ]
        const list = this.cj
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '学生列表excel')
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  }
}
</script>

<style >
.el-table .warning-row {
  background: red;
}

.el-table .success-row {
  background: #f0f9eb;
}
.el-table .bujige {
  background-color: rgb(240, 140, 140);
}
.el-table .jige {
  background-color: #dcdfe6;
}
.el-table .question {
  background-color: #E6A23C;
}
/* .div {
  display: inline;
} */
.inline-block {
  display: inline-block;}
</style>
