<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="姓名">
        <el-col :span="11">
          <el-input v-model="form.name" :disabled="true" />
        </el-col>
        <el-col :span="2" class="line">学号:</el-col>
        <el-col :span="11">
          <el-input v-model="form.num" :disabled="true" />
        </el-col>
      </el-form-item>
      <el-form-item label="年级">
        <el-select v-model="form.term" placeholder="年级">
          <el-option label="2016" value="2016" />
          <el-option label="2017" value="2017" />
        </el-select>
        <el-select v-model="form.stu_class" placeholder="班级">
          <el-option label="网络161" value="网络161" />
          <el-option label="网络162" value="网络162" />
        </el-select>
      </el-form-item>
      <el-form-item label="密码">
        <el-col :span="11">
          <el-input v-model="form.password" show-password />
        </el-col>
        <el-col :span="2" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getStudentInformation, postStudentInformation } from '@/api/user'
import { getUsername } from '@/utils/auth'
export default {
  data() {
    return {
      form: {
        name: '',
        num: '',
        term: '',
        password: '',
        stu_class: ''
      },
      data: '213'
    }
  },
  created() {
    var nowuser = getUsername()
    this.form.num = nowuser
    console.log(`nowuser=${nowuser}`)
    getStudentInformation(nowuser).then((res) => {
      var data = JSON.parse(res.result)
      // eslint-disable-next-line no-unused-vars
      var { stu_id, stu_name, term, password, stu_class } = data
      this.form.name = stu_name
      this.form.num = stu_id
      this.form.term = term
      this.form.stu_class = stu_class
      this.form.password = password
      console.log(`res=${stu_id}`)
    })
  },
  methods: {
    onSubmit() {
      postStudentInformation(this.form)
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: right;
}
</style>

