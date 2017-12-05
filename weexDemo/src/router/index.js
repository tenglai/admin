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
        { path: '/', redirect: '/home' },
        { path: '/home', component: Home },
        { path: '/topic', component: Topic },
        { path: '/class', component: Class },
        { path: '/shop', component: Shop },
        { path: '/my', component: My }
    ]
})