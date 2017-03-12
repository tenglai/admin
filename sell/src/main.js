import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import goods from './components/goods/goods'
import ratings from './components/ratings/ratings'
import seller from './components/seller/seller'
import './common/scss/index.scss'

Vue.use(VueRouter)
Vue.use(VueResource)

// extend中出入的参数为App挂载的组件
let app = Vue.extend(App)

// 实例化router
let router = new VueRouter({
	// 设置选中时的样式
  linkActiveClass: 'active'
})

// 定义路由规则
router.map({
  '/goods': {
    component: goods
  },
  '/ratings': {
    component: ratings
  },
  '/seller': {
    component: seller
  }
})

// 启动应用
// 路由器会创建一个App 实例，并且挂载到 选择符 #app 匹配的元素上
router.start(app, '#app')

// 默认跳转
router.go('/goods')
