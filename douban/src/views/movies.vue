<template>
  <section class="grid">
    <div v-for="movie in movies">
      <h2>
        {{movie.title}}
        <!-- 命名的路由，跳转到movie-list，query带查询参数  /movie-list?type=movie.type -->
        <router-link tag="span" :to="{name: 'movie-list', query: {type: movie.type}}" class="more">更多</router-link>
        <router-link :to="{name: 'movie-detail', params: {id: item.id}}" class="item" v-for="item in movie.subjects">
          <div class="cover">
            <div class="wp">
              <img class="img-show" :src="item.images.medium">
            </div>
          </div>
          <div class="info">
            <h3>{{item.title}}</h3>
          </div>
        </router-link>
      </h2>
    </div>
  </section>
</template>

<script>
  import {mapState} from 'vuex'
  import * as types from '../store/types'
  import {API_TYPE} from '../store/api'

  function fetchMovies (store, payload) {
    return store.dispatch([types.FETCH_MOVIES], payload)
  }
  export default {
    data () {
      return {}
    },
    computed: mapState({ // mapState工具函数会将 store 中的 state 映射到局部计算属性中
      movies: state => state.movie.movies
    }),
    mounted () {
      fetchMovies(this.$store, {type: API_TYPE.movie.in_theaters, start: 0, count: 9})
        .then(() => {
          fetchMovies(this.$store, {type: API_TYPE.movie.coming_soon, start: 0, count: 9})
        })
    },
    methods: {}
  }
</script>
