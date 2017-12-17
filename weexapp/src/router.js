/**
 * 配置路由
 */
import Router from 'vue-router'
// 首页
import ViewHome from './assets/views/home.vue'
// 关于
import ViewMy from './assets/views/my.vue'
// PHP教程
import ViewAll from './assets/views/all.vue'
// 分类
import Viewdemo from './assets/views/demo.vue'
// 推荐
import ViewTopbvive from './assets/views/top.vue'

Vue.use(Router)


export default new Router({
    // mode: 'abstract',
    routes: [
    	// 默认页面 首页
        {
        	path: '/',
        	redirect: '/home'
        },
        // 首页
        {
        	path: '/home',
        	component: ViewHome
        },
        // 关于
        {
        	path: '/my',
        	component: ViewMy
        },
        // 分类
        {
        	path: '/demo',
        	component: Viewdemo
        },
        // PHP教程
        {
        	path: '/all',
        	component: ViewAll
        },
        // 推荐
        {
        	path: '/top',
        	component: ViewTopbvive
        }
    ]
})