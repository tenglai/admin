import {isNullOrUndefined} from "util";
import {storage, modal, cache, timer} from './ExportWeexModel.js';
import EnumProxyFactory from "./EnumProxyFactory";
import "./PromiseExt";
import GlobalApiConfig from "../api/config/GlobalAipConfig";


/**
 * 工具类
 */
class WeexUtils {

    constructor() {

    }

    /**
     * @param target  目标枚举对象
     * @return       目标枚举对象
     */
    valueOfEnum = function (target: any) {
        let targetEnum = new target();
        return EnumProxyFactory.newEnumProxyInstances(targetEnum);
    };

    /**
     * 获取资源url路径
     * @param uri
     * @param weex weex对象
     */
    getResourcesURL(uri: String, weex: any) {
        //return GlobalConfig.DOMAIN + uri + "?123";
        const basePath = this.getBasePath(weex).replace(GlobalApiConfig.WEB_DEPLOYMENT_DIRECTORY + "/", "");
        return basePath + uri;
    }

    /**
     * 获取base path
     * @param weex
     * @return {any}
     */
    getBasePath(weex: any) {
        const bundleUrl = weex.config.bundleUrl;
        //console.log("-bundleUrl->"+bundleUrl);
        let nativeBase;
        let isAndroidAssets = bundleUrl.indexOf('file://assets/') >= 0;
        let isiOSAssets = bundleUrl.indexOf('file:///') >= 0 && bundleUrl.indexOf(GlobalApiConfig.IOS_PROJECT_NAME) > 0;
        if (isAndroidAssets) {
            nativeBase = 'file://assets/js/';
        } else if (isiOSAssets) {
            nativeBase = bundleUrl.substring(0, bundleUrl.lastIndexOf(GlobalApiConfig.IOS_PROJECT_NAME + '/')) + GlobalApiConfig.IOS_PROJECT_NAME + "/bundlejs/";
        } else {
            let host = GlobalApiConfig.BASE_DOMAIN + '/weex/' + GlobalApiConfig.WEB_DEPLOYMENT_DIRECTORY + '/';
            nativeBase = 'http://' + host;
        }

        return nativeBase;
    };

    /**
     * 获取页面配置
     * @param view
     */
    getViewConfig(view: any = {}, weex: any) {
        const config = {
            bodyScroll: false,
            bodyPadding: true,
            bodyIsCenter: true,
            bodyBackgroundColor: "#f2f2f2",
            useHeader: true,
            useFooter: true,
            headerHeight: weex.config.env.platform.toLowerCase() === "ios" ? "128px" : "100px",
            footerHeight: "83px",
            scrollerStyle: {flex: "1"}
        };

        return Object.assign(config, view);
    }


    /**
     * 移除对象
     * @param key
     */
    removeItem = (key: string): Promise<Function> => {
        return new Promise((resolve: Function = () => {
        }, reject: Function = () => {
        }) => {
            const result = cache.removeCache(key);
            if (key !== null) {
                resolve(result);
            } else {
                reject();
            }
        })
    };

    /**
     * 保证对象到storage中
     * @param data
     */
    setItem = (key: String, data: any, expireTime?: number, needExpireTime: boolean = false): Promise<Function> => {
        const self = this;
        return new Promise((resolve: Function = () => {
        }, reject: Function = () => {
        }) => {
            const store = {};
            if (needExpireTime) {
                Object.assign(store, {
                    data: data,
                    expire: isNullOrUndefined(expireTime) ? null : self.getMaxExpireTime(expireTime) //超时时间
                });
            } else {
                Object.assign(store, {
                    data: data
                });
            }
            console.log("设置数据--> " + JSON.stringify(store));
            const result = cache.setCache(key, JSON.stringify(store));
            if (store !== null) {
                resolve(result);
            } else {
                reject();
            }
        });

    };

    /**
     * 获取storage 中的对象
     * @param key
     * @param Verification 验证
     */
    getItem = (key: String, verification: Function = (): Boolean => {
        return true;
    }): Promise<Function> => {

        return new Promise(function (resolve: Function = () => {
        }, reject: Function = () => {
        }) {
            //console.log("--获取的key--> " + key);
            cache.getCache(key, (data) => {
                //console.log("获取到的数据--> " + data);
                if (isNullOrUndefined(data)) {
                    reject();
                    return;
                }
                let item = JSON.parse(data);
                if (!isNullOrUndefined(item.expire) && item.expire < new Date().getTime()) {
                    //如果超时了 移除
                    storage.removeItem(key);
                    reject();
                    return;
                }
                let result = item.data;
                //console.log("--执行callback--> " + JSON.stringify(result));
                if (verification(result)) {
                    resolve(result);
                } else {
                    reject();
                }
            });
        });
    };


    /**
     * toast
     * @param message  消息
     * @param callback 回调
     * @param times    提示的时间长度 单位:秒
     */
    toast = (message: string, callback: Function = () => {
    }, times: number = 2) => {
        modal.toast({message: message, duration: times});
        if (callback == null) {
            return;
        }
        timer.setTimeout(callback, times * 1000);
    };

    /**
     * 警告框
     * @param options
     * @param callback
     */
    alert = (options: any = {}, callback) => {
        if (options.constructor === String) {
            options = {message: options}
        }
        options = Object.assign({
            message: "",
            duration: 1,
            okTitle: "确认",
            cancelTitle: "取消"
        }, options);
        modal.alert(options, callback)
    };

    /**
     * 带确认的对话框
     * @param options 配置详情
     * @param confirm 确认回调
     * @param cancel  取消回调
     */
    confirm = (options: any = {}, confirm = () => {
    }, cancel = () => {
    }) => {
        if (options.constructor === String) {
            options = {message: options}
        }
        options = Object.assign({
            message: "",
            duration: 1,
            okTitle: "确认",
            cancelTitle: "取消"
        }, options);
        modal.confirm(options, (result) => {
            if (result === options.okTitle) {
                confirm();
            } else {
                cancel();
            }
        });
    };

    /**
     * 带输入框的对话框
     * @param options 配置详情
     * @param confirm 确认回调
     * @param cancel  取消回调
     */
    prompt = (options: any = {}, confirm = (data) => {
    }, cancel = (data) => {
    }) => {
        if (options.constructor === String) {
            options = {message: options}
        }
        options = Object.assign({
            message: "",
            duration: .3,
            okTitle: "确认",
            cancelTitle: "取消"
        }, options);
        modal.prompt(options, ({result, data}) => {
            if (result === options.okTitle) {
                confirm(data);
            } else {
                cancel(data);
            }
        });
    };

    /**
     * 获取最大保存有效时间
     * @return {number}
     */
    private getMaxExpireTime = (expireTime: number): Number => {
        const times = new Date().getTime() + expireTime;
        return times;
    }

}

const weexUtils = new WeexUtils();
export default weexUtils;