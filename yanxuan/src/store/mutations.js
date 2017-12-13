/**
 * 步骤四
 * 突变(处理状态改变)
 */
export function SHOW_TABBAR (state) {
  state.tabbar = true;
}

export function HIDE_TABBAR (state) {
  state.tabbar = false;
}