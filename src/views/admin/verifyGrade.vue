<template>
  <div>
    <el-container>
      <el-main id="eltable">
        <el-table v-loading="loading" :data="filterPersons" :row-class-name="testtwo" width="100%" @select="ons">
          <el-table-column v-if="show" type="selection" width="55" :select="ons" />
          <el-table-column label="状态" prop="sta" />
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
          <el-table-column label="总成绩" prop="totalgrade" />
          <el-table-column label="作业" width="180" prop="homework" />

        </el-table>
      </el-main>
    </el-container>
    <div style="margin-top: 20px">
      <el-button icon="el-icon-check" type="success" @click="sub">提交审核</el-button>
      <el-button @click="showcheck">多选</el-button>
    </div>
  </div>
</template>

<script>
// import shortid from 'shortid'
// eslint-disable-next-line no-unused-vars
import moment, { relativeTimeThreshold } from 'moment'
import { mapGetters } from 'vuex'
import { postGrade, verifyGrade, getAllGrade } from '@/api/user'
export default {
  name: 'ListRenderTwo',
  filters: {
    timeFormate(value, format = 'YYYY--MM--DD HH:mm:ss') {
      return moment(value).format(format)
    }
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
        // {
        //   stu_name: '张久成',
        //   bj: '网络161',
        //   num: '202160735',
        //   teacher: '0101',
        //   course: 'tcp/ip',
        //   term: '2019',
        //   dm1: 100,
        //   dm2: 100,
        //   dm3: 100,
        //   kt1: 70,
        //   kt2: 70,
        //   kt3: 80,
        //   sy1: 60,
        //   sy2: 90,
        //   sy3: 80,
        //   ps_grade: '',
        //   qm_grade: 100,
        //   totalgrade: '',
        //   sta: '待审核'

        // },
        // {
        //   stu_name: '朱广辉',
        //   bj: '网络161',
        //   num: '202160736',
        //   teacher: '0101',
        //   course: 'tcp/ip',
        //   term: '2019',
        //   dm1: 100,
        //   dm2: 100,
        //   dm3: 100,
        //   kt1: 70,
        //   kt2: 70,
        //   kt3: 80,
        //   sy1: 60,
        //   sy2: 90,
        //   sy3: 80,
        //   ps_grade: '',
        //   qm_grade: 100,
        //   totalgrade: '',
        //   sta: '待审核'

        // }
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
      arr1: [],
      a() {}
    }
  },
  computed: {
    ...mapGetters([
      'username',
      'name'
    ]),
    filterPersons() {
      const { searchName, chengji, orderType } = this
      let arr = [...chengji]
      for (var i = 0; i < arr.length; i++) {
        arr[i].ps_grade = ((parseInt(arr[i].dm1) + parseInt(arr[i].dm2) + parseInt(arr[i].dm3)) / 15 + (parseInt(arr[i].kt1) + parseInt(arr[i].kt2) + parseInt(arr[i].kt3)) / 10 + (parseInt(arr[i].sy1) + parseInt(arr[i].sy2) + parseInt(arr[i].sy3)) / 6).toFixed(1)
        console.log('300除以20时:' + (parseInt(arr[i].dm1) + parseInt(arr[i].dm2)))
        arr[i].totalgrade = (
          parseInt(arr[i].ps_grade) * 0.3 +
          parseInt(arr[i].qm_grade) * 0.7
        ).toFixed(1)
      }

      if (searchName.trim()) {
        // eslint-disable-next-line no-undef
        arr = cj.filter(p => p.stu_name.toString().indexOf(searchName) !== -1)
      }
      if (orderType) {
        arr.sort((p1, p2) => {
          if (orderType === 1) {
            // 降序

            return p2.totalgrade - p1.totalgrade
          } else {
            return p1.totalgrade - p2.totalgrade
          }
        })
      }

      return arr
    }
  },
  mounted() {
    // this.personkyes = this.persons.map(v => shortid.generate())
    setInterval(() => {
      this.time = new Date()
    }, 1000)
  },
  created() {
    console.log(this.$route.path)
    var _this = this
    // eslint-disable-next-line no-unused-vars
    function a() {
      getAllGrade().then((res) => {
      // var da = res[0].Record
      //  this.chengji.push(res.data)
        console.log(typeof (res))
        console.log(typeof (res.data))
        var da = JSON.parse(res.data)
        for (let i = 0; i < da.length; i++) {
          var d = da[i].Record
          if (_this.$route.path === '/adminquerygrade/index') {
            if (d.sta === '待审核') {
              _this.chengji.push(d)
            }
          } else if (_this.$route.path === '/secondvertify') {
            if (d.sta === '有疑问') {
              _this.chengji.push(d)
            }
          } else if (_this.$route.path === '/vertified') {
            if (d.sta === '已审核') {
              _this.chengji.push(d)
            }
          }
        }
      })
    }
    this.a = a
    console.log(a)
    a()
    this.loading = false
  },
  methods: {
    sub() {
      verifyGrade(this.grade).then(() => {
        this.$alert('已提交审核', '消息', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `审核成功`
            })
            getAllGrade().then((res) => {
              // var da = res[0].Record
              //  this.chengji.push(res.data)
              console.log(typeof (res))
              console.log(typeof (res.data))
              var da = JSON.parse(res.data)
              this.chengji = []
              for (let i = 0; i < da.length; i++) {
                var d = da[i].Record
                if (this.$route.path === '/adminquerygrade/index') {
                  if (d.sta === '待审核') {
                    this.chengji.push(d)
                  }
                } else if (this.$route.path === '/secondvertify') {
                  if (d.sta === '有疑问') {
                    this.chengji.push(d)
                  }
                } else if (this.$route.path === '/vertified') {
                  if (d.sta === '已审核') {
                    this.chengji.push(d)
                  }
                }
              }
            })
          }
        })
      })
    },
    showcheck() {
      this.show = !this.show
    },
    ons(rows, row) {
      var selectd = rows.length && rows.indexOf(row) !== -1
      if (selectd) {
        this.grade.push(`${row.num}${row.teacher}${row.term}`)
        console.log(`${selectd}`)
      } else {
        // this.grade.pop()
        this.grade.splice(this.grade.indexOf(`${row.num}${row.teacher}${row.term}`), 1)
        console.log(`${row.num}${row.teacher}${row.term}+${selectd}`)
      }
      console.log(rows)
      console.log(row)
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
        var a = this.a
        a()
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
        console.log('当前不及格' + row.totalgrade)
        if (row.sta === '有疑问') {
          return 'question'
        }
        return 'bujige'
      } else {
        console.log('当前及格' + row.totalgrade)
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
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    createNewCj() {
      const {
        stu_nam,
        // eslint-disable-next-line no-unused-vars
        bj,
        // eslint-disable-next-line no-unused-vars
        num,
        // eslint-disable-next-line no-unused-vars
        teacher,
        // eslint-disable-next-line no-unused-vars
        course,
        // eslint-disable-next-line no-unused-vars
        ps_grade,
        // eslint-disable-next-line no-unused-vars
        qm_grade,
        // eslint-disable-next-line no-unused-vars
        z_grat,
        // eslint-disable-next-line no-unused-vars
        sta
      } = this.newcj
      if (stu_nam === '') {
        alert('姓名不能为空')
        return
      }
      this.cj.unshift(this.newcj)

      // 清空数据
      this.newcj = {
        stu_name: '',
        bj: '',
        num: '',
        teacher: '',
        course: '',
        ps_grade: 0,
        qm_grade: 0,
        totalgrade: 0,
        sta: '待审核'
      }
    },
    delCj(index) {
      console.log(index)
      this.cj.splice(index, 1)
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
