<template>
  <div id="app">
    <router-view></router-view>
    <m-tabbar v-model="select">
     <m-tabbar-item id='Index' isRouter>
        <!-- <img src="./assets/images/icTabHomeNormal.png" alt="" slot="icon-normal">
        <img src="./assets/images/icTabHomeActive.png" alt="" slot="icon-active"> -->
        首页
      </m-tabbar-item>
      <m-tabbar-item id='AudioBook' isRouter>
        <!-- <img src="./assets/images/icTabSubjectNormal.png" alt="" slot="icon-normal">
        <img src="./assets/images/icTabSubjectActive.png" alt="" slot="icon-active"> -->
        书影音
      </m-tabbar-item>
      <m-tabbar-item id='Broadcast' isRouter>
        <!-- <img src="./assets/images/icTabStatusNormal.png" alt="" slot="icon-normal">
        <img src="./assets/images/icTabStatusActive.png" alt="" slot="icon-active"> -->
        广播
      </m-tabbar-item>
      <m-tabbar-item id='Group' isRouter>
        <!-- <img src="./assets/images/icTabGroupNormal.png" alt="" slot="icon-normal">
        <img src="./assets/images/icTabGroupActive.png" alt="" slot="icon-active"> -->
        小组
      </m-tabbar-item>
       <m-tabbar-item id='Mine' isRouter>
        <!-- <img src="./assets/images/icTabProfileNormal.png" alt="" slot="icon-normal">
        <img src="./assets/images/icTabProfileActive.png" alt="" slot="icon-active"> -->
        我的
      </m-tabbar-item>
    </m-tabbar>
  </div>
</template>

<script>
  import mTabbar from './components/tabbar.vue'
  import mTabbarItem from './components/tabbar-item.vue'
  export default {
    name: 'app',
    components:{
      mTabbar,
      mTabbarItem
    },
    data() {
      return {
        select:"Index"
      }
    }
  }
</script>

<style>

</style>
