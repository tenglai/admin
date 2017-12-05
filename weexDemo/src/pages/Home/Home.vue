<!-- 首页 -->
<template>
  <div>
    <!-- 顶部标题栏 -->
    <home-header></home-header>
  </div>
</template>
 
<script>
  import Header from '../../components/Header.vue';

  export default {
    name: 'Home',
    components: {
      'home-header': Header,
    },
    data: () => ({
      //
    }),
    created () {
      //
    },
    methods: {
      //
    }
  };
</script>
 
<style scoped>
</style>