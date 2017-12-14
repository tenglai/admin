/**
 * 分页查询
 */

export default {

    data() {
        return {
            pageInfo: {
                queryPage: 1,
                querySize: 10
            },
            queryStatus: {
                loading: false,
                end: false
            }
        }
    },
    methods: {
        setQueryPage(queryPage = 1) {
            this.pageInfo.queryPage = queryPage;
        },
        setQuerySize(querySize = 10) {
            this.pageInfo.querySize = querySize;
        },
        getPageInfo(rest = false) {
            if (rest) {
                this.queryStatus.end = false;
                this.pageInfo.queryPage = 1;
            }
            return this.pageInfo;
        },
        setQueryLoading(isLoading = false) {
            this.queryStatus.loading = isLoading;
        },
        setQueryEnd(isEnd = true) {
            this.queryStatus.end = isEnd;
        },

        /**
         * 查询动作结束
         * @param length 查询结果的长度
         */
        queryActionEnd(length = 0) {
            this.setQueryLoading(false);
            if (length === 0 || length < this.pageInfo.querySize) {
                this.setQueryEnd(true);
            } else {
                this.getPageInfo().queryPage++;
            }
        },
        queryIsLock() {
            return this.queryStatus.loading || this.queryStatus.end;
        },
        /**
         * 处理查询结果
         * @param resultData   结果数据
         * @param data         保存数据对象
         * @param dataHandler  数据处理函数，必须要放回数据的处理结果
         */
        handleQueryResult(resultData = [], data, dataHandler) {
            const list = Object.assign([], data);
            if (typeof dataHandler === "function") {
                resultData.forEach((item) => {
                    list[list.length] = dataHandler(item);
                });
            } else {
                resultData.forEach((item) => {
                    list[list.length] = item;
                });
            }
            return list;
        }

    }
}