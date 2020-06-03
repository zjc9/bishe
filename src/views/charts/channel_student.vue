<template>
  <div class="Echarts">
    <el-card class="box-card9" shadow="hover">
      <div id="main" style="width: 600px;height: 400px" />
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getAllStudent } from '@/api/user'
export default {
  name: 'Echarts',
  data() {
    return {
      cdata: [],
      studentdata: []
    }
  }, computed: {
    ...mapGetters([
      'grade'
    ])
  }, watch: {
    cdata() {
      this.drawLine()
    }
  },
  mounted() {
    this.drawLine()
  }, created() {
    getAllStudent().then((res) => {
      var da = JSON.parse(res.data)
      console.log(da)
      this.$store.commit('user/SET_STUDENT', da)
      var arr = [{ value: 0, name: '2016届' }, { value: 0, name: '2017届' }]
      for (let i = 0; i < da.length; i++) {
        var d = da[i].Record
        if (d.term === '2016') {
          arr[0].value++
        } else {
          arr[1].value++
        }
        this.studentdata.push(d)
      }
      this.cdata = arr
    })
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('main'))

      // 绘制图表
      myChart.setOption({
        title: {
          show: true,
          text: '学生信息',
          x: 'center',
          textStyle: {
            'color': ' black'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
          {
            name: '访问来源',
            type: 'pie', // 设置图表类型为饼图
            radius: '55%', // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
            // eslint-disable-next-line no-undef
            data: this.cdata
          }
        ]
      })
    }
  }
}
</script>
<style>
.Echarts{
  border-radius: 30px;
  align-content: center;
}
.box-card9{
  border-radius: 30px;
   box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

</style>
