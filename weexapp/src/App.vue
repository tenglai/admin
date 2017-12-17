<!-- 主页面 底部选项卡 -->
<template>
  <div class="app-wrapper">
    <router-view class="r-box"></router-view>
    <tab-bar @tabTo="onTabTo"></tab-bar>
  </div>
</template>

<style>
  body{
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
    color:#333;
  }
</style>

<style scoped>
  .app-wrapper{
    background-color: #f4f4f4;
  }
  .r-box{
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>

<script>
  // 弹窗
  var modal = weex.requireModule('modal');
  // 工具类
  import util from './assets/util';
  // 底部选项卡组件
  import tabBar from './assets/components/tabBar.vue';
  
  export default {
    data () {
      return {
      }
    },
    components: {
      'tab-bar': tabBar
    },
    created () {
      util.initIconFont();
    },
    methods: {
      onTabTo(_result){
        let _key = _result.data.key || '';
        this.$router && this.$router.push('/'+_key)
      }
    }
  }
</script>