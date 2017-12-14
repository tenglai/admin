import  GlobalApiConfig from "../config/GlobalAipConfig";
/**
 * Created by wuxp on 2017/5/4.
 * api请求对象基类
 */
export abstract class ApiReq {

    /**
     * 接入账号
     */
    public readonly clientId?: String;

    /**
     * 签名信息
     */
    public sign?: String;

    /**
     * 签名时间戳
     */
    public timestamp?: String;


    constructor(clientId: String = GlobalApiConfig.CLIENT_ID,
                sign: String = "", timestamp: String = new Date().getTime().toString()) {
        this.clientId = clientId;
        this.sign = sign;
        this.timestamp = timestamp;
    }



}