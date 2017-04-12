import Vue from 'vue'
import Vuex from 'vuex'
import videoMutations from './video/mutations'
import loadingMutations from './loading/mutations'
import cityMutations from './city/mutations'
import cityActions from './city/actions'
import comingMutations from './coming/mutations'
import areaMutations from './cinema/mutations'

Vue.use(Vuex);   // 解决繁杂事件订阅和广播

const videoGetters = {
  showMask: state => state.playStatus
}
const video = {
  state: {
    url: '',
    cover: '',
    playStatus: false
  },
  mutations: videoMutations,
  getters: videoGetters
}

const loading = {
  state: {
    stack: []
  },
  mutations: loadingMutations
}

const cityGetters = {
  hotLists: state => state.data,
  cityName: state => state.name
}

const city = {
  state: {
    name: '北京',
    show: false,
    rN: 'bj',
    data: []
  },
  actions: cityActions,
  mutations: cityMutations,
  getters: cityGetters
}

const coming = {
  state: {
    lists: []
  },
  mutations: comingMutations
}

const cinema = {
  state: {
    area: []
  },
  mutations: areaMutations
}

export default new Vuex.Store({ // 导出
  modules: {
    video,
    loading,
    city,
    coming,
    cinema
  }
})
