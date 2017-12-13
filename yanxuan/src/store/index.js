/**
 * 步骤一
 * vuex 入口文件
 */
import Vuex from 'vuex'
import * as actions from './actions'
import * as mutations from './mutations'

// vuex在Web自动安装
if (WXEnvironment.platform !== 'Web') {
  Vue.use(Vuex)
}

const store = new Vuex.Store({
  actions,
  mutations,

  state: {
    tabbar:true
  },

  getters: {
    tabbarShow (state) {
      return state.tabbar;
    }
  }
})

export default store
