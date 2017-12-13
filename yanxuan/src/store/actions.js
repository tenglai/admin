/**
 * 步骤三
 * 管理事件(行为)
 */

// 引入 状态(类型),用于提交到mutations
import * as types from './types'

export function showTabBar ({ commit }) {
  // 提交到 mutations
  commit(types.SHOWTABBAR);
}

export function hideTabBar ({ commit }) {
  // 提交到 mutations
  commit(types.HIDETABBAR);
}
