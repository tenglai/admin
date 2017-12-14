/**
 * 自定义简单的广播对象 (web模块)
 * Created by wuxp on 2017/5/31.
 */

if (weex.config.env.platform.toLowerCase() === 'web') {
    const broadcastWeexModule = {
        register(category, eventName, succFn = () => {
        }, errorFn = () => {
        }) {
            const key = broadcastWeexModule.getEventName(category, eventName);

            //TODO 多事件广播待支持
            if( broadcastWeexModule.eventMaps[key]===undefined){
                broadcastWeexModule.eventMaps[key]=[];
            }

            broadcastWeexModule.eventMaps[key][broadcastWeexModule.eventMaps[key].length] = {
                success: succFn,
                error: errorFn
            };
            console.log("注册事件成功--> " + category + ":" + eventName);

            //当事件数据存储器中有该注册事件的值，这进行消息广播
            if (broadcastWeexModule.eventData[key] === undefined) {
                return
            }
            //进行广播
            broadcastWeexModule.broadcast(key);
        },
        //广播
        broadcast:(key,isClear=true)=>{

            const eventDatum = broadcastWeexModule.eventData[key];
            const broadcastFnList = broadcastWeexModule.eventMaps[key];

            if(eventDatum===null || eventDatum===undefined){
                console.warn("key-> "+key+" 对应的数据存在!");
                return ;
            }
            if(broadcastFnList===null || broadcastFnList===undefined){
                console.warn("key-> "+key+" 对应的方法不存在!");
                return ;
            }

            eventDatum.forEach(({success, error}) => {
                if (success !== null && success !== undefined) {
                    broadcastFnList.forEach((item)=>{
                        item.success({data:success});
                    });
                }
                if (error !== null && error !== undefined) {
                    broadcastFnList.forEach((item)=>{
                        item.error({data:error});
                    });
                }
            });
            if(isClear){
                broadcastWeexModule.eventData[key]=[];
            }
        },
        send(category, eventName, data, error) {
            // console.log("发送广播事件");
            // console.log(data);

            //保存广播数据
            const key = broadcastWeexModule.getEventName(category, eventName);
            if (broadcastWeexModule.eventData[key] === undefined) {
                broadcastWeexModule.eventData[key] = [];
            }
            broadcastWeexModule.eventData[key][broadcastWeexModule.eventData[key].length] = {
                success: data,
                error
            };
            //进行广播
            broadcastWeexModule.broadcast(key,false);
        },
        getEventName(category, eventName) {
            return category + "_" + eventName;
        },
        /**
         * 事件注册保存器
         */
        eventMaps: {},
        /**
         * 事件注册数据
         */
        eventData: {},
    };
    console.log("注册自定义模块 broadcast");
    weex.registerModule('broadcast', broadcastWeexModule);
}
