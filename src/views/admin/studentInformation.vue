<template>
  <div class="app-container">
    <div> <el-upload
      action="/上传文件接口"
      :on-change="onChange"
      :auto-upload="false"
      :show-file-list="false"
      accept=".xls, .xlsx"
    >
      <el-button :loading="loading" type="warning">批量导入</el-button>
    </el-upload></div>
    <el-container>

      <el-main id="eltable">
        <el-table v-loading="loading" :data="student" width="100%">
          <el-table-column label="学号" prop="stu_id" />
          <el-table-column label="班级" prop="stu_class" />
          <el-table-column label="姓名" prop="stu_name" />
          <el-table-column label="学期" prop="term" />
        </el-table>
      </el-main>
    </el-container>
    <div>
      <el-button :loading="loading" type="primary" @click="onSubmit">上传<i class="el-icon-upload el-icon--right" /></el-button>

    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { getStudentInformation, postStudentInformation, getAllStudent, createStudent } from '@/api/user'
export default {
  data() {
    return {
      loading: true,
      student: [
      ],
      newstudent: []
    }
  },
  created() {
    getAllStudent().then((res) => {
      console.log(typeof res.data)
      var data = JSON.parse(res.data)
      for (var i = 0; i < data.length; i++) {
        this.student.push(data[i].Record)
      }
      this.loading = false
    })
  },
  methods: {
    onSubmit() {
      createStudent(this.newstudent)
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    onChange(file, fileList) {
      console.log(fileList)
      this.fileData = file
      this.readExcel()
    }, readExcel(e) {
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
              stu_id: ws[i]['学号'],
              stu_class: ws[i]['班级'],
              stu_name: ws[i]['姓名'],
              term: ws[i]['学期']
            }
            that.student.unshift(sheetData)
            that.newstudent.unshift(sheetData)

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
    }
  }

}
</script>

<style scoped>
.line{
  text-align: right;
}
</style>

