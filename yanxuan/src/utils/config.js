var baseUrl = 'http://10.1.1.33:8080/weidaikuanWeex';

module.exports = {

  // weex和原生交互的module
  interaction: weex.requireModule('interaction'),
  modal: weex.requireModule('modal'),
  navigator: weex.requireModule('navigator'),
  storage: weex.requireModule('storage'),
  stream: weex.requireModule('stream'),
  jsdownloader: weex.requireModule('jsdownloader'),
  jyloadingview: weex.requireModule('jyloadingview'),
  jyutil: weex.requireModule('jyutil'),
  native: weex.requireModule('native'),

  // weex 环境的变量
  baseUrl: baseUrl,
  walletBaseUrl: 'http://test.boccfc.cc',
  assetsUrl: baseUrl + '/src/assets/',
  fontUrl: baseUrl + '/fonts',
  backImgUrl: baseUrl + '/src/assets/back_white1.png',
  deviceWidth: weex.config.env.deviceWidth,
  deviceHeight: weex.config.env.deviceHeight,
  weexHeight: 750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight,
  weexWidth: 750,
  tabbarHeight: 98,
  navBarHeight: ((weex.config.env.platform == 'android') ? 98 : 128),
  // jsURL(url) {,
  // var bundleUrl = weex.config.bundleUrl;
  // var baseURL = bundleUrl.substring(0, bundleUrl.lastIndexOf("/") + 1)
  // return baseURL + url
  // },
  currentPlatform: weex.config.env.platform,

  isIOSPlatform() {
    if (weex.config.env.platform == 'android') {
      return false;
    }
      return true;
  },

  navURL(url) {
    var params = {
      'url': this.jsURL(url),
      'animated': 'true',
    }
    return params;
  },

  jsURL(url) {
    var tempUrl = '';
    if (url.prefix == 'http://' || url.prefix == 'https://' || url.prefix == 'file://') {
      tempUrl = url;
    } else if (url.indexOf('index.js') >= 0) {
      tempUrl = baseUrl + "/dist/" + url
    } else {
      tempUrl = baseUrl + "/dist/vue/" + url
    }
    console.log(tempUrl)
    return tempUrl;
  },

  assetsURL(url) {
    return baseUrl + '/src/assets/' + url;
  },

  toParams(obj) {
    var param = ""
    for (const name in obj) {
      if (typeof obj[name] != 'function') {
        param += "&" + name + "=" + encodeURI(obj[name])
      }
    }
    return param.substring(1)
  },

  push(url) {
    var navigator = weex.requireModule('navigator')
    navigator.push(this.navURL(url), function() {});
  },

  pop(url) {
    var navigator = weex.requireModule('navigator')
    if (url == '') {
      navigator.pop({}, function() {});
    } else {
      navigator.pop(this.navURL(url), function() {});
    }
  },

  goHomePage(){
    this.jyutil.navPopToHome();
  },

  toast(message) {
    this.modal.toast({
      message: message,
      duration: 2
    });
  }
}
