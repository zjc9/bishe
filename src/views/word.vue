<template>
  <div>
    <el-upload
      class="avatar-uploader"
      action="#"
      :show-file-list="false"
      :http-request="httpRequest"
    >

      <el-button type="primary" @click="getFile(index)">选取文件</el-button>
      <div slot="tip" class="el-upload__tip">文件上传限制说明</div>
    </el-upload>
  </div>
</template>

<script>
export default {
  components: {

  },
  data() {
    return {

    }
  },
  computed: {

  },
  methods: {
    // 这个file参数 也就是文件信息，你使用 插件 时 你就可以打印出文件信息 看看嘛
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        let fileResult = ''
        reader.readAsDataURL(file)
        // 开始转
        reader.onload = function() {
          fileResult = reader.result
        }
        // 转 失败
        reader.onerror = function(error) {
          reject(error)
        }
        // 转 结束  咱就 resolve 出去
        reader.onloadend = function() {
          resolve(fileResult)
        }
      })
    },
    httpRequest(data) {
      // 没事儿就打印data看看呗
      // 这是限制上传文件类型
      const isPFX = data.file.type === 'application/x-pkcs12'
      const isLt2M = data.file.size / 1024 / 1024 < 2

      if (!isPFX) {
        this.$message.error('上传文件只能是 PFX 格式!')
      } else if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 2MB!')
      } else {
        // 转base64
        this.getBase64(data.file).then(resBase64 => {
          this.fileBase64 = resBase64.split(',')[1]
          // 直接拿到base64信息
          console.log(resBase64.split(',')[1])
        })
        this.$message.success('文件上传成功')
      }
    }
  }
}
</script>
<style scoped>
</style>
