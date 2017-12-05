/**
 * 入口文件
 */
import App from './App.vue'
import router from './router'
// import * as filters from './filters'
// import mixins from './mixins'

// // 全局注册 工具类过滤器
// Object.keys(filters).forEach(key => {
// 	Vue.filter(key, filters[key])
// })

// // 全局注册 mixins
// Vue.mixin(mixins)


// 创建应用程序实例
// here we inject the router and store to all child components,
// making them available everywhere as `this.$router` and `this.$store`.
new Vue(Vue.util.extend({ el: '#root', router }, App));

router.push('/');