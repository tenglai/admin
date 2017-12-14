import {isArray, isNullOrUndefined} from "util";

import GlobalApiConfig from "../config/GlobalAipConfig";

/**
 * 不需要登录的url配置
 */
const config: any = GlobalApiConfig.NO_LOGIN_URL_MAP;

/**
 * 请求的url是否需要token
 * @param url
 * @return true 需要 false 不需要
 */
const requestURLIsNeedToken = (url: String): Boolean => {

    if (url.indexOf("/ws/") >= 0) {
        return false;
    }

    const uriNames = url.replace(GlobalApiConfig.API_BASE_URL + "/", "").split("/");
    let uriConfig = config[uriNames[0]];
    if (isNullOrUndefined(uriConfig)) {
        return true;
    }
    //是数组
    if (isArray(uriConfig)) {
        uriConfig = uriConfig as Array<String>;
        return !uriConfig.some((item) => {
            return item === uriNames[1];
        });
    }

    //通配符 表示该模块下的所有url都不需要token
    if (uriConfig === "**") {
        return false;
    }

    return false;
};

export default requestURLIsNeedToken;