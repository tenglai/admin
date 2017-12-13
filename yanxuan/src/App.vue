<!-- 入口页面 -->
<template>
  <div class="app-wrapper">
    <router-view class="r-box"></router-view>
    <tab-bar @tabTo="onTabTo" v-show="tabbarShow"></tab-bar>
  </div>
</template>
 
<script>
  var modal = weex.requireModule('modal');
  import util from './utils/util.js';
  import tabBar from './components/TabBar.vue';
  // 引入 vuex 的两个方法
  import {mapGetters, mapActions} from 'vuex';
 
  export default {
    data () {
      return {
        //
      }
    },
    components: {
      'tab-bar': tabBar
    },
    // 计算属性
    computed:mapGetters([
      // 从 getters 中获取值
      'tabbarShow'
    ]),
    // 监听,当路由发生变化的时候执行
    watch:{
      $route(to,from){
        console.log(to.path);
        if(to.path == '/home' || to.path == '/topic' || to.path == '/class' || to.path == '/shop' || to.path == '/my'){
          /**
           * this.$options.store来自Store对象
           * dispatch 向 actions 发起请求
           */
          this.$store.dispatch('showTabBar');
        }else{
          this.$store.dispatch('hideTabBar');
        }
      }
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