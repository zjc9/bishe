<template>
  <div>
    <el-table v-loading="load" :data="data" :row-class-name="isPaSS" width="100%" @select="ons">
      <el-table-column v-if="show" type="selection" width="55" :select="ons" />
      <el-table-column label="状态" prop="sta" />
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
      <el-table-column label="作业" width="200" prop="homework">
        <template slot-scope="scope">
          <a
            :href="'https://view.officeapps.live.com/op/view.aspx?src='+'http://192.168.253.142:3001/download?id=' + scope.row.homework"
            target="_blank"
          >
            {{ scope.row.homework }}</a>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  components: {

  },
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    sort: Boolean,
    loading: Boolean
  },
  data() {
    return {
      grade: [],
      show: false,
      load: true
    }
  },
  computed: {

  }, beforeCreated() {
    this.load = this.loading
  },
  methods: {
    ons(rows, row) {
      var selectd = rows.length && rows.indexOf(row) !== -1
      if (selectd) {
        this.grade.push(`${row.num}${row.teacher}${row.term}`)
        console.log(`${selectd}`)
      } else {
        // this.grade1.pop()
        this.grade.splice(this.grade.indexOf(`${row.num}${row.teacher}${row.term}`), 1)
        console.log(`${row.num}${row.teacher}${row.term}+${selectd}`)
      }
      console.log(rows)
      console.log(row)
    }, isPaSS({ row, rowIndex }) {
      if (row.totalgrade < 60) {
        console.log('当前不及格' + row.totalgrade)
        if (row.sta === '有疑问') {
          return 'question'
        }
        return 'bujige'
      } else {
        console.log('当前及格' + row.totalgrade)
        if (row.sta === '有疑问') {
          return 'question'
        }
        return 'jige'
      }
    }, isReady() {
      this.load = false
    }
  }
}
</script>
<style>
.el-table .bujige {
  background-color: rgb(240, 140, 140);
}
.el-table .jige {
  background-color: #dcdfe6;
}
</style>
