<template>
  <div class="Echarts">
    <el-card class="box-card9" shadow="hover">
      <div id="main" style="width: 600px;height:400px" />
    </el-card>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { getAllGrade, getAllStudent } from '@/api/user'
export default {
  name: 'Echarts',
  data() {
    return {
      cdata: [],
      gradedata: [],
      grade: []
    }
  }, computed: {
  },
  watch: {
    cdata() {
      this.drawLine()
    }
  },
  mounted() {
    this.drawLine()
  }, created() {
  },
  beforeCreate() {
    getAllGrade().then((res) => {
      var da = JSON.parse(res.data)
      for (let i = 0; i < da.length; i++) {
        var d = da[i].Record
        this.grade.push(d)
      }
      this.$store.commit('user/SET_GRADE', this.grade)
      var arrdata = this.grade
      var arr = [{ value: 0, name: '不及格' }, { value: 0, name: '及格' }]
      for (let i = 0; i < arrdata.length; i++) {
        if (parseInt(arrdata[i].totalgrade) >= 60) {
          console.log(arrdata[i].stu_name + '及格')
          arr[1].value++
        } else {
          console.log(arrdata[i].stu_name + '不及格')
          arr[0].value++
        }
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
          text: '成绩比例',
          x: 'center',
          textStyle: {
            'color': ' black'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['及格', '不及格']
        },
        color: ['red', '#67C23A'],
        series: [
          {
            name: '成绩比列',
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
  width: 400px;
  border-radius: 30px;
  align-content: center;
}
.box-card9{
  float: left;
  border-radius: 30px;
   box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

</style>
