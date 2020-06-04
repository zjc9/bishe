<template>
  <div>
    <el-container>
      <el-header>
        <div>
          <div id="upfile" class="inline-block">
            <el-upload
              action="/上传文件接口"
              :on-change="onChange"
              :auto-upload="false"
              :show-file-list="false"
              accept=".xls, .xlsx"
            >
              <el-button type="warning">批量导入</el-button>
            </el-upload>
          </div>
          <div class="inline-block">
            <el-button type="warning" @click="exportToExcel">批量导出</el-button>
          </div>
        </div>
      </el-header>
      <el-main id="eltable">
        <el-table :data="filterPersons" :row-class-name="testtwo" width="100%">
          <el-table-column label="审核状态" prop="sta" />
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
        </el-table>
      </el-main>
    </el-container>
    <div>
      <el-button type="button" @click="onsubmit()">批量导入</el-button>
    </div>
  </div>
</template>

<script>
// import shortid from 'shortid'
import moment from 'moment'
import { mapGetters } from 'vuex'
import { postGrade } from '@/api/user'
export default {
  name: 'ListRenderTwo',
  filters: {
    timeFormate(value, format = 'YYYY--MM--DD HH:mm:ss') {
      return moment(value).format(format)
    }
  },
  data() {
    return {
      time: new Date(),
      searchName: '',
      grade: [],
      persons: [
        { name: '张三', age: 16, sex: '男' },
        { name: '张四', age: 17, sex: '男' },
        { name: '张五', age: 18, sex: '男' },
        { name: '张六', age: 19, sex: '男' },
        { name: '张七', age: 30, sex: '男' },
        { name: '张七', age: 30, sex: '男' },

        { name: '网七', age: 11, sex: '男' },

        { name: '李七', age: 3, sex: '男' }
      ],
      personkyes: [],
      orderType: 0,
      outputs: [],
      e: '',
      cj: [
        {
          stu_name: '张久成',
          bj: '网络161',
          num: '202160735',
          teacher: '李大伟',
          course: 'tcp/ip',
          ps_grade: 80,
          qm_grade: 90,
          totalgrade: '',
          sta: '待审核'
        },
        {
          stu_name: '朱广沪',
          bj: '网络161',
          num: '202160736',
          teacher: '李大伟',
          course: 'tcp/ip',
          ps_grade: 70,
          qm_grade: 100,
          totalgrade: '',
          sta: '待审核'
        },

        {
          stu_name: '祝亲一',
          bj: '网络161',
          num: '202160737',
          teacher: '李大伟',
          course: 'tcp/ip',
          ps_grade: 80,
          qm_grade: 67,
          totalgrade: '',
          sta: '待审核'
        },

        {
          stu_name: '朱晓峰',
          bj: '网络161',
          num: '202160738',
          teacher: '李大伟',
          course: 'tcp/ip',
          ps_grade: 80,
          qm_grade: 75,
          totalgrade: '',
          sta: '待审核'
        },

        {
          stu_name: '主政杠',
          bj: '网络161',
          num: '202160739',
          teacher: '李大伟',
          course: 'tcp/ip',
          ps_grade: 60,
          qm_grade: 80,
          totalgrade: '',
          sta: '待审核'
        },

        {
          stu_name: '邹阳',
          bj: '网络161',
          num: '202160740',
          teacher: '李大伟',
          course: 'tcp/ip',
          ps_grade: 100,
          qm_grade: 50,
          totalgrade: '',
          sta: '待审核'
        }
      ],
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
  },
  methods: {
    onsubmit() {
      postGrade(this.chengji).then(() => {
        this.$alert('添加成功', '消息', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `成功提交`
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
        console.log('当前不及格' + row.totalgrade)
        return 'bujige'
      } else {
        console.log('当前及格' + row.totalgrade)
        return 'jige'
      }
    },
    orderByAge(orderType) {
      this.orderType = orderType
    },
    test(arr) {
      this.cj = arr
    },
    readExcel(e) {
      const that = this
      const files = that.fileData
      // console.log(files)
      if (!files) {
        // 如果没有文件
        return false
      } else if (!/\.(xls|xlsx)$/.test(files.name.toLowerCase())) {
        this.$message.error('上传格式不正确，请上传xls或者xlsx格式')
        return false
      }
      const fileReader = new FileReader()
      fileReader.onload = ev => {
        try {
          const data = ev.target.result
          const workbook = this.XLSX.read(data, {
            type: 'binary'
          })
          console.log(workbook.SheetNames)
          if (workbook.SheetNames.length >= 1) {
            this.$message({
              message: '导入数据表格成功',
              showClose: true,
              type: 'success'
            })
          }
          const wsname = workbook.SheetNames[0] // 取第一张表
          const ws = this.XLSX.utils.sheet_to_json(workbook.Sheets[wsname]) // 生成json表格内容
          console.log('ws=' + ws)
          that.outputs = [] // 清空接收数据
          for (var i = 0; i < ws.length; i++) {
            var sheetData = {
              // 键名为绑定 el 表格的关键字，值则是 ws[i][对应表头名]
              num: ws[i]['学号'],
              bj: ws[i]['班级'],
              stu_name: ws[i]['姓名'],
              teacher: ws[i]['教师'],
              course: ws[i]['课程'],
              dm1: ws[i]['点名成绩1'],
              dm2: ws[i]['点名成绩2'],
              dm3: ws[i]['点名成绩3'],
              kt1: ws[i]['课堂成绩1'],
              kt2: ws[i]['课堂成绩2'],
              kt3: ws[i]['课堂成绩3'],
              sy1: ws[i]['实验成绩1'],
              sy2: ws[i]['实验成绩2'],
              sy3: ws[i]['实验成绩3'],
              term: ws[i]['学期'],
              ps_grade: '',
              qm_grade: ws[i]['期末成绩'],
              totalgrade: '',
              sta: '待审核'
            }
            that.chengji.unshift(sheetData)
            console.log('sheetdata=' + sheetData)
          }

          this.$refs.upload.value = ''
        } catch (e) {
          console.log('发送错误' + e)
          return false
        }
      }
      // 如果为原生 input 则应是 files[0]
      fileReader.readAsBinaryString(files.raw)
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
/* .div {
  display: inline;
} */
.inline-block {
  display: inline-block;}

</style>
