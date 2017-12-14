/**
 * 配置路由
 */
import Router from 'vue-router'
// 登录页
import Login from '../pages/Login/Login.vue'
// 首页
import Home from '../pages/Home/Home.vue'
// 特别推荐
import Recommend from '../pages/Recommend/Recommend.vue'
// 消息中心
import Message from '../pages/Message/Message.vue'
// 我的主页
import Mine from '../pages/Mine/Mine.vue'
 
Vue.use(Router)
 
 
export default new Router({
  // mode: 'abstract',
  routes: [
    // 默认页面
    {
      path: '/',
      component: Home
    },
    // 登录页
    {
      path: '/login',
      component: Login
    },
    // 首页
    {
      path: '/home',
      component: Home
    },
    // 特别推荐
    {
      path: '/recommend',
      component: Recommend
    },
    // 消息中心
    {
      path: '/message',
      component: Message
    },
    // 我的主页
    {
      path: '/mine',
      component: Mine
    },
    {
      path: '/home',
      redirect: '/'
    },
    {
      path: '*',
      redirect: '/'
    },
  ]
})