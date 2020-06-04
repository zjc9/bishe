<template>
  <div>
    <tablecomponet ref="table" :data="chengji" />
  </div>
</template>

<script>
import tablecomponet from '@/views/tablecomponet'
import { getAllGrade } from '@/api/user'
import { mapGetters } from 'vuex'
export default {
  components: {
    tablecomponet
  },
  data() {
    return {
      chengji: [],
      loading: true,
      user: ''
    }
  },
  computed: {
    ...mapGetters([
      'username',
      'name'
    ])
  }, created() {
    var _this = this
    this.user = sessionStorage.getItem('username')
    getAllGrade().then((res) => {
      var da = JSON.parse(res.data)
      for (let i = 0; i < da.length; i++) {
        var d = da[i].Record
        if (d.teacher === this.user) {
          _this.chengji.push(d)
        }

        _this.$refs.table.isReady()
      }
    })
  }, methods: {

  }
}
</script>
<style scoped>
</style>
