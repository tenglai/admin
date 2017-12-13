/**
 * 入口文件
 */
import App from './App.vue'
import router from './router'
 
// 创建应用程序实例
new Vue(Vue.util.extend({ el: '#root', router }, App));
 
router.push('/');