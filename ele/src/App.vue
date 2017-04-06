<template>
  <div class="app" :style="{height:'100%'}">
    <div class="main" :style="{height:'100%'}">
      <router-view></router-view>
    </div>
    <footer-nav :showNav="showNav"></footer-nav>
  </div>
</template>

<script>
import { footerNav } from './components/'
export default {
  name: 'app',
  data () { // 定义变量
    return {
      direction: 'forward', //
      showNav: true  //
    }
  },
  compnents: {
    footerNav
  },
  watch: {
    // 如果路由有变化,会执行该方法
    '$route': function() {
      this.routeChange()
    }
  },
  method: { // 定义方法
    routeChange () {
      let path = this.$route.path
      if (path === '' || path === '/cinema' || path === '/me') {
        this.showNav = true
      } else {
        this.showNav = false
      }
    }
  },
  created () {  // 页面刚开始就执行
    this.routeChange()
  }
}
</script>

<style>
  body {
    background: #f5f5f5;
  }
</style>
