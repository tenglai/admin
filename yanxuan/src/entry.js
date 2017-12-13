/**
 * 入口文件
 */
import App from './App.vue'
import router from './router'
// 引入 vuex入口文件
import store from './store/index'
import { sync } from 'vuex-router-sync'
// 自定义过滤器
import * as filters from './filters'
// 混合
import mixins from './mixins'

// 将 router 同步到 状态管理模式 store 对象上
// this registers `store.state.route`
sync(store, router)

// 全局注册 filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 全局注册 mixins.
Vue.mixin(mixins)
 
// 创建应用程序实例
new Vue(Vue.util.extend({
	el: '#root',
	router,
	store
}, App));
 
router.push('/');