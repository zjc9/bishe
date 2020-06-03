<template>
  <div>
    <el-card class="cardp">
      <div><label>科目：</label></div>

      <el-card class="cardchildren">
        <label>姓名：{{ user }}</label>
        <el-button icon="el-icon-edit" />
      </el-card>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getAllGrade } from '@/api/user'
export default {
  components: {

  },
  data() {
    return {
      user: '',
      chengji: []

    }
  }, computed: {
    ...mapGetters([
      'username'
    ])
  }, created() {
    var _this = this
    this.user = sessionStorage.getItem('username')
    getAllGrade().then((res) => {
      var da = JSON.parse(res.data)
      for (let i = 0; i < da.length; i++) {
        var d = da[i].Record
        // if (d.teacher === this.user) {
        //   _this.chengji.push(d)
        // }
        _this.chengji.push(d)
      }
    })
  },
  methods: {

  }
}
</script>
<style>
.cardchildren{
  border-radius: 25px;
}
.cardp{
  border-radius: 10px;
}
</style>
