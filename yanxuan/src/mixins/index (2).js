import weexGetPathUtils from "../utils/WeexGetPathUtils";
import weexUtils from "../utils/WeexUtils";
import commonUtils from "../utils/CommonUtils";
import {navigator} from "../utils/ExportWeexModel";


let packageName = weex.config.env.appGroup;
if (packageName === null || packageName === undefined || packageName.toString().trim().length === 0) {
    packageName = weex.config.env.appName;
}


export default {
    data() {
        let platform = weex.config.env.platform;
        let isIos = platform.toLowerCase() === 'ios';
        let newNavigator = navigator;
        if (isIos) {
            newNavigator = weex.requireModule("nav");
        }
        let deviceWidth = weex.config.env.deviceWidth;
        let defWidth = 750.0;  //默认宽度
        let rpx = deviceWidth / defWidth;
        return {
            deviceWidth,
            rpx: rpx,
            android: platform.toLowerCase() === 'android',
            ios: isIos,
            web: platform.toLowerCase() === 'web',
            newNavigator
        }
    },
    created() {
        // const self = this;
        // const env = weex.config.env;
        // let rWidth = env.deviceWidth;
        // env.deviceWidth > 828 && (rWidth = env.deviceWidth / 3 * 2);
        // self.rpx = 750 / rWidth;
        // if (self.web) {
        //     //浏览器中有vue-route处理
        //     return;
        // }
    },
    methods: {

        /**
         * 返回
         * @param callback
         */
        back: function (callback) {
            if (this.web) {
                this.$router.back();
            } else {
                this.newNavigator.pop({animated: true}, () => {
                    if (commonUtils.isNullOrUndefined(callback) || callback.constructor !== Function) {
                        return;
                    }
                    callback();
                });
            }
        },
        /**
         * 跳转
         * @param url  跳转的目标url
         * @param params 请求参数
         * @param isPopSelf 是否清除自身url(仅支持原生)
         * @param callback 回调函数(仅支持原生)
         */
        jump(url = "", params = {}, isPopSelf = false, callback = () => {
        }) {
            if (!this.web) {
                let routerKey = url.split("?")[0].substr(1, url.length);
                const nativeRoute = this.getNativeRoute();
                let route = nativeRoute[routerKey];   //尝试从路由配置中获取
                console.log(route);
                console.log(url);
                let gotoURL = "";
                if (commonUtils.isNullOrUndefined(route)) {
                    //未获取到改配置，则通过工具类获取该js的地址
                    gotoURL = weexGetPathUtils.getNativeGoToURL(url, weex);
                    route = {
                        path: "",
                        meta: {}
                    };
                } else {
                    let baseURL = this.getBasePath();  //获取根目录地址
                    gotoURL = baseURL + route.url;
                }
                const {main, requireAuth} = Object.assign({main: false, requireAuth: false}, route.meta);
                if (requireAuth) {
                    //需要登陆 检查登陆
                    if (!this.isLogin()) {
                        //未登录 跳到登陆页面
                        this.jump("/login?redirect=" + url);
                        return;
                    }
                }

                if (route.path.indexOf(":") > 0) {
                    //存在参数
                    //仅支持单个参数的解析
                    let split = route.path.split(":");
                    let paramsKey = split[1];
                    let value = url.replace(split[0], "");
                    let p = {};
                    p[paramsKey] = value;
                    params = Object.assign({}, params, p);
                }
                this.openWeexByNative(gotoURL, main, params, callback);
                if (isPopSelf && this.android) {
                    //清除自己的堆栈，防止点击返回时回到该页面
                    console.log("清除自己的堆栈，防止点击返回时回到该页面");
                    this.newNavigator.pop({
                        animated: true
                    });
                }
            } else {
                if (!this.$router) {
                    console.log("vue-router 未实例化!");
                    return;
                }
                if (url.indexOf("/") !== 0) {
                    //不是绝对地址
                    url = weexGetPathUtils.getWebGoToURL();
                }
                if (commonUtils.isNullOrUndefined(params)) {
                    this.$router.push(url);
                } else {
                    console.log(params);
                    this.$router.push({path: url, query: params});
                }
            }
        },

        /**
         * 直接打开远程的weex页面 (仅支持原生调用)
         * @param url
         * @param main 是否为主页
         * @param params
         * @param callback
         */
        openWeexByNative(url, main = false, params = {}, callback = () => {
        }) {
            if (url.indexOf("?") < 0) {
                url += "?";
            }
            let i = 0;
            //构建参数
            for (let key in params) {
                url += key + "=" + params[key] + "&";
                i++;
            }
            if (i > 0) {
                url = url.substr(0, url.length - 1);
            }
            let gotoURL = "weex://" + packageName + (main ? "/main/" : "/page/") + url;
            this.newNavigator.push({
                url: gotoURL,
                animated: "true"
            }, event => {
                callback();
            });
        },
        /**
         * 获取参数
         * @param keys 参数的名称列表 例如 ["id","name"]
         * @param useQuery 是否使用查询字符串参数
         * @return {*}
         */
        getParams(keys, useQuery = true) {
            let params = {};
            let length = keys.length;
            if (!this.web) {
                const bundleUrl = weex.config.bundleUrl;
                const queryStr = bundleUrl.split("?")[1];  //获取查询字符串
                if (queryStr === undefined || queryStr.trim().length === 0) {
                    //如果不存在查询字符串则直接返回
                    return params;
                }
                let list = queryStr.split("&");
                list.forEach(function (item) {
                    let p = item.split("=");
                    params[p[0]] = p[1];
                });
                console.log("参数-->" + JSON.stringify(params));

            } else {
                const self = this;
                if (length > 1 || useQuery === true) {
                    keys.forEach((key) => {
                        //多个参数使用query对象传递
                        params[key] = self.$route.query[key];
                    });
                } else {
                    params[keys[0]] = self.$route.params[keys[0]];
                }
            }
            if (length === 1) {
                return params[keys[0]];
            }
            return params;
        },
        /**
         * 获取base path 路径
         * @param uri  非必填，若传入则放回完整url
         * @return String
         */
        getBasePath(uri = null) {
            let basePath = weexUtils.getBasePath(weex);
            if (uri === null) {
                return basePath;
            } else {
                return basePath + uri;
            }
        },

        /**
         * 点击底部导航
         * @param navItem
         */
        bottomNavOnclick(navItem) {
            this.jump(navItem.url);
        }
    }
}
