<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="姓名">
        <el-col :span="11">
          <el-input v-model="form.name" :disabled="true" />
        </el-col>
        <el-col :span="2" class="line">工号:</el-col>
        <el-col :span="11">
          <el-input v-model="form.num" :disabled="true" />
        </el-col>
      </el-form-item>
      <el-form-item label="部门">
        <el-select v-model="form.partment" placeholder="年级">
          <el-option label="数理部" value="数理部" />
          <el-option label="计算机工程学院" value="计算机工程学院" />
          <el-option label="经管院" value="经管院" />
          <el-option label="电力工程学院" value="电力工程学院" />
          <el-option label="机械工程学院" value="机械工程学院" />
          <el-option label="土木工程学院" value="土木工程学院" />
          <el-option label="研究生院" value="研究生院" />
          <el-option label="教务处" value="教务处" />
        </el-select>
      </el-form-item>
      <el-form-item label="密码">
        <el-col :span="11">
          <el-input v-model="form.password" show-password />
        </el-col>
        <el-col :span="2">-</el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { getStudentInformation, postStudentInformation } from '@/api/user'
import { getUsername } from '@/utils/auth'
export default {
  data() {
    return {
      form: {
        name: '',
        num: '',
        partment: '',
        password: ''
      }
    }
  },
  created() {
    var nowuser = getUsername()
    this.form.num = nowuser
    console.log(`nowuser=${nowuser}`)
    getStudentInformation(nowuser).then((res) => {
      var data = JSON.parse(res.result)
      // eslint-disable-next-line no-unused-vars
      var { id, name, password, partment } = data
      this.form.name = name
      this.form.num = id
      this.form.partment = partment
      this.form.password = password
      console.log(`res=${id}`)
    })
  },
  methods: {
    onSubmit() {
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

