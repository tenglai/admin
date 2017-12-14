import {ApiReq} from "./ApiReq";


/**
 * 查询请求对象
 */
export abstract class ApiQueryReq extends ApiReq {

    /**
     * 查询类型
     */
    public queryType?: String;

    /**
     * 查询页码
     */
    public queryPage?: Number;

    /**
     * 查询大小
     */
    public querySize?: Number;

    /**
     * 排序字段
     */
    public orderBy?: Array<String>;


    /**
     * 排序类型，\"asc\"升序，\"desc\"降序，必须与orderBy一一对应
     */
    public orderType?: Array<String>;

    /**
     * 是否使用缓存
     */
    public fromCache?: Boolean;

    /**
     *总数
     */
    public  total?: Number;


    constructor(queryType: String ="QUERY_RESET" as String, queryPage: Number = 1, querySize: Number = 20,
                orderBy: Array<String> = [], orderType: Array<String> = [], total: Number = 0,
                fromCache?: Boolean ,) {
        super();
        this.queryType = queryType;
        this.queryPage = queryPage;
        this.querySize = querySize;
        this.orderBy = orderBy;
        this.orderType = orderType;
        this.total = total;
        this.fromCache = fromCache;
    }


}