//将categoryService挂靠在giftSer之下 注入$http
giftSer.service('categoryService',['$http','global',function($http,global){
	//获取数据
	this.getSingleTree = function(successCallback,errorCallback){
		$http.get(global.getGlobalPath()+'/data/category/tree')
		.success(function(data){
			//将data拆分成两个数组
			var titles = [];
			var lists = [];
//			console.log(data.data.categories)
			//通过forEach对数据进行遍历
			angular.forEach(data.data.categories,function(item,index){
				titles.push(item.name)
				lists.push(item.subcategories)
			})
//			console.log(titles);
//			console.log(lists);
			successCallback(titles,lists);
		})
		.error(function(error){
			errorCallback(error);
		})
	}
}])