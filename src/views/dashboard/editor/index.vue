<template>
  <div class="dashboard-editor-container">
    <div class=" clearfix">
      <pan-thumb :image="avatar" style="float: left">
        您的身份是:
        <span v-for="item in roles" :key="item" class="pan-info-roles">{{ item }}</span>
      </pan-thumb>
      <div class="info-container">
        <span class="display_name">{{ username }}</span>
        <span style="font-size:20px;padding-top:20px;display:inline-block;">欢迎使用方正教务系统</span>
      </div>
    </div>
    <div>
      <el-carousel :interval="4000" indicator-position="outside" height="450px">
        <el-carousel-item v-for="(img, index) in imgList" :key="index">
          <img :src="img.url">
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PanThumb from '@/components/PanThumb'
// import GithubCorner from '@/components/GithubCorner'
import { getUsername } from '@/utils/auth'
export default {
  name: 'DashboardEditor',
  components: { PanThumb },
  data() {
    return {
      emptyGif: 'https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3',
      username: '',
      imgList: [
        { url: require('@/assets/img/1.jpg') },
        { url: require('@/assets/img/2.jpg') },
        { url: require('@/assets/img/3.png') },
        { url: require('@/assets/img/4.jpg') },
        { url: require('@/assets/img/5.jpg') },
        { url: require('@/assets/img/6.png') }

      ]
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  },
  created() {
    this.username = getUsername()
  }
}
</script>

<style lang="scss" scoped>
  .emptyGif {
    display: block;
    width: 45%;
    margin: 0 auto;
  }

  .dashboard-editor-container {
    background-color: #e3e3e3;
    min-height: 100vh;
    padding: 50px 60px 0px;
    .pan-info-roles {
      font-size: 12px;
      font-weight: 700;
      color: #333;
      display: block;
    }
    .info-container {
      position: relative;
      margin-left: 190px;
      height: 150px;
      line-height: 200px;
      .display_name {
        font-size: 48px;
        line-height: 48px;
        color: #212121;
        position: absolute;
        top: 25px;
      }
    }
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  img {
    width: 100%;
    height: 100%;
  }
</style>
