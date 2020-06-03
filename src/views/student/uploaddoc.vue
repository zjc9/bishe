<template>
  <div>
    <el-card>
      <div>
        <label>待上传科目：</label>
        <el-select v-model="value" filterable placeholder="请选择" @change="output">
          <el-option
            v-for="(item, index) in filtersgrade"
            :key="item.value"
            :label="item.course"
            :value="index"
          />
        </el-select>
      </div>
      <div>
        <el-upload
          ref="uploaddoc"
          class="upload-demo"
          drag
          action="http://192.168.253.142:3001/upload"
          :auto-upload="false"
          multiple
          :before-upload="beforUpload"
        >
          <i class="el-icon-upload" />
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </div>
      <el-button type="primary" @click="upload">上传<i class="el-icon-upload el-icon--right" /></el-button>
    </el-card>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import { newdoc } from '@/api/user'
export default {
  data() {
    return {
      fgrade: [],
      value: '',
      gradeID: ''
    }
  },
  computed: {
    ...mapGetters([
      'grade'
    ]),
    filtersgrade() {
      var arr = [...this.grade]
      var arr1 = []
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].homework === '空') {
          arr1.push(arr[i])
        }
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.fgrade = arr1
      return arr1
    }
  },
  methods: {
    on() {
      var id = this.gradeID
      window.open(`http://192.168.253.142:3001/download?id=${id}`, '_blank')
    }, output(value) {
      var { num, teacher, term } = this.fgrade[value]
      this.gradeID = num + teacher + term
      console.log(value)
    }, upload() {
      this.$refs.uploaddoc.submit()
    },
    beforUpload(file) {
      console.log(file)
      var name = file.name
      var type_ = name.split('.')
      var type = type_[1]
      var newname = this.gradeID + '.' + type
      var renameReportFile = new File([file], newname, { type: type })
      const fd = new FormData()
      fd.append('file', renameReportFile)
      fd.append('gradeID', this.gradeID)
      console.log(fd)

      this.$confirm('是否提交作业?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        newdoc(fd)
        this.$message({
          type: 'success',
          message: '提交成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })

      return false
    }

  }
}

</script>
<style scoped>
</style>
