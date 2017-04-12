<template>
  <div>
    <v-header></v-header>
    <!-- 路由视图 -->
    <router-view></router-view>
  </div>
</template>

<script>
  import vHeader from './components/header.vue'
  import Hello from './components/Hello.vue'
  import Index from './views/Index'
  import VuexDemo from './views/Vuex-demo.vue'
  import Movie from './views/movie.vue'
  import MovieDetail from './views/movie-detail.vue'

  export default {
    name: 'app',
    components: {
      vHeader,
      Hello,
      Index,
      VuexDemo,
      Movie,
      MovieDetail
    }
  }
</script>

<style>
  #app{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
