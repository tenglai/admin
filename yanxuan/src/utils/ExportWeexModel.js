/**
 * Created by wuxp on 2017/5/16.
 */
import  "../weex_ext/Broadcast";
import  "../weex_ext/Cache";
import  "../weex_ext/AppMain";
import  "../weex_ext/ImageLoad";
import  "../weex_ext/MessagagePush";
import  "../weex_ext/Qrcode";
import  "../weex_ext/Picker";
import  "../weex_ext/Timer";
import  "../weex_ext/Common";
import  "../weex_ext/AppUpdate";
import  "../weex_ext/Photo";
import  "../weex_ext/Location";

const weexModule=weex;
//weex官方提供的模块
const animation = weex.requireModule('animation');
const WebSocket = weex.requireModule('WebSocket');
const picker = weex.requireModule('picker');
const clipboard = weex.requireModule('clipboard');
const dom = weex.requireModule('dom');
const modal = weex.requireModule('modal');
const navigator = weex.requireModule('navigator');
const storage = weex.requireModule('storage');
const stream = weex.requireModule('stream');
const webview = weex.requireModule('webview');
const globalEvent = weex.requireModule('globalEvent');
const timer = weex.requireModule("timer");

//自定义weex模块
const broadcast = weex.requireModule("broadcast");  //自定义广播对象
const cache = weex.requireModule("cache");
const appMain=weex.requireModule("appMain");
const imageLoader=weex.requireModule("image");
const msgPush=weex.requireModule("msgPush");
const qrcode=weex.requireModule("qrcode");
const common=weex.requireModule("common");
const appUpdate=weex.requireModule("appUpdate");
const photo=weex.requireModule("photo");
const location=weex.requireModule("location");

//此处为了导入地方能够进行结构赋值，不能使用 export default
export  {
    weexModule,
    animation,
    WebSocket,
    picker,
    clipboard,
    dom,
    modal,
    navigator,
    storage,
    stream,
    webview,
    globalEvent,
    timer,
    broadcast,
    cache,
    appMain,
    imageLoader,
    msgPush,
    qrcode,
    common,
    appUpdate,
    photo,
    location
};