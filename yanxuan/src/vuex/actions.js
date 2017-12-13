/**
 * 步骤三
 * 管理事件(行为)
 */
// 引入 状态(类型),用于提交到mutations
import * as types from './types'

// 导出
export default {
  showTabBar:({commit}) => {
    // 提交到 mutations
    commit(types.SHOWTABBAR);
  },
  hideTabBar:({commit}) => {
    // 提交到 mutations
    commit(types.HIDETABBAR);
  }
}
