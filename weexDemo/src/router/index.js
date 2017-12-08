/**
 * 配置路由
 */
import Router from 'vue-router'
// 首页
import Home from '../pages/Home/Home.vue'
// 专题
import Topic from '../pages/Topic/Topic.vue'
// 分类
import Class from '../pages/Class/Class.vue'
// 购物车
import Shop from '../pages/Shop/Shop.vue'
// 个人
import My from '../pages/My/My.vue'

Vue.use(Router)


export default new Router({
    // mode: 'abstract',
    routes: [
    	// 默认页面(重定向)
        {
        	path: '/',
        	redirect: '/home'
        },
        // 首页
        {
        	path: '/home',
        	name: 'Home',
        	component: Home
        },
        // 专题
        {
        	path: '/topic',
        	name: 'Topic',
        	component: Topic
        },
        // 分类
        {
        	path: '/class',
        	name: 'Class',
        	component: Class
        },
        // 购物车
        {
        	path: '/shop',
        	name: 'Shop',
        	component: Shop
        },
        // 个人
        {
        	path: '/my',
        	name: 'My',
        	component: My
        }
    ]
})