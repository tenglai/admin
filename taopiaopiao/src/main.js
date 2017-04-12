import Vue from 'vue'
import VueRouter from 'vue-router'
import Mint from 'mint-ui'
import store from './store'
import 'vconsole'

import VueResource from 'vue-resource'
import 'mint-ui/lib/style.css'
import 'assets/css/common.css'
import 'assets/css/swiper.min.css'

import Home from './views/Home'

Vue.use(Mint)
Vue.use(VueRouter)
Vue.use(VueResource)

const routes = [{
  path: '/',
  component: Home
},{
  path: '/mv',
  component: Home
}]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next) => {
  store._mutations.pushLoadStack[0]()
  next()
})

router.afterEach(route => {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
  window.onscroll = null
  setTimeout(() => {
    store._mutations.completeLoad[0]()
  },100)
})

var app = new Vue({
  el: '#app',
  router,
  store,
  ...App
})
