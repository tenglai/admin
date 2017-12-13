/**
 * 混合
 */
export default {
  methods: {
  	// 封装路由跳转
    jump (to) {
      if (this.$router) {
        this.$router.push(to)
      }
    },
    // 适配 iphoneX
    isIpx() {
      return weex && (weex.config.env.deviceModel === 'iPhone10,3' || weex.config.env.deviceModel === 'iPhone10,6');
  	}
  }
}