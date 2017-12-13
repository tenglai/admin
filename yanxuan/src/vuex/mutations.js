/**
 * 步骤四
 * 突变(处理状态改变)
 */
import {
  SHOWTABBAR,
  HIDETABBAR,
} from './types'

// 定义、初始化数据
const state = {
  tabbar:true
}

// 引入 getters
import getters from './getters'

// 定义 mutations
const mutations = {
  // 匹配actions通过commit传过来的值,并改变state上的属性的值
  [SHOWTABBAR](state){
    state.tabbar = true;
  },
  [HIDETABBAR](state){
    state.tabbar = false;
  }
}

// 导出
export default {
  state,
  mutations,
  getters
}
