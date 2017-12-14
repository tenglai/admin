/**
 * Created by wuxp on 2017/5/17.
 */

export default class EnumProxyFactory {
    /**
     * 获取一个代理服务对象的实例
     * @param targetEnum  目标服务对象
     * @return {{}}
     */
    static newEnumProxyInstances(targetEnum: any): any {
        const proxy = {};
        for (let key in targetEnum) {
            const desc:Object = {
                ordinal: function () {
                    return targetEnum[key];
                },
                name: function () {
                    return key;
                },
                desc: function () {
                    // return Reflect.getMetadata("desc", targetEnum, key);
                    const prop = key + "Desc";
                    return targetEnum[prop];
                }
            };
            proxy[key as string] = desc;

            // proxy[key as string] = function () {
            //     return desc;
            // }
        }
        return proxy;
    }
}