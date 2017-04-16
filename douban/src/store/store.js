import Vuex from 'vuex'
import Vue from 'vue'
import movie from './modules/movie'

Vue.use(Vuex)

export default new Vuex.Store({
  // state: { // state为根对象，store里面所有的数据都在state里，可以通过this.$store.state访问数据
  //   inTheaters: { // 数据
  //     title: '',
  //     total: 0,
  //     subjects: []
  //   },
  //   busy: false,
  //   movie: {}
  // },
  // mutations: {
  //   [types.IN_THEATERS] (state, list) { // types.IN_THEATERS变量，state为固定，list传递给state的值
  //     state.inTheaters.title = list.title
  //     state.inTheaters.total = list.total
  //     state.inTheaters.subjects = state.inTheaters.subjects.concat(list.subjects)
  //     if (state.inTheaters.subjects.length < state.inTheaters.total) {
  //       state.busy = false
  //     }
  //   },
  //   [types.FETCH_MOVIE_BY_ID] (state, movie) {
  //     state.movie = movie
  //   },
  //   [types.SET_INFINITE_BUSY] (state, data) {
  //     state.busy = data
  //   }
  // },
  // actions: {
  //   [types.IN_THEATERS] (context, start) {
  //     fetchMoviesByType('in_theaters', start)
  //       .then(data => context.commit([types.IN_THEATERS]))
  //   },
  //   [types.FETCH_MOVIE_BY_ID] (context, id) {
  //     fetchMovieById(id) // 外部可以使用的方法
  //       .then(data => context.commit([types.FETCH_MOVIE_BY_ID], data)) // context.commit向state里面加东西
  //   },
  //   [types.SET_INFINITE_BUSY] (context, data) {
  //     context.commit([types.SET_INFINITE_BUSY], data)
  //   }
  // }

  modules: { // 划分模块
    movie
  }
})
