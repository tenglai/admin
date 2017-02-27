//topService挂靠在giftSer之下 并且注入$http global
giftSer.service('topService',['$http','global',function($http,global){
	this.getTopListData = function(listId,limit,offset,successCallback,errorCallback){
		$http.get(global.getGlobalPath()+'/data/top/top'+listId+'limit'+limit+'offset'+offset)
		.success(function(data){
//			console.log(data.data.items);
			var newData = data.data.items.map(function(item,index){
				var newItem = {};
				newItem.id = item.data.id;
				newItem.imgUrl = item.data.cover_image_url;
				newItem.name = item.data.name;
				newItem.description = item.data.description;
				newItem.price = item.data.price;
				//只有将newItem  return出去才能组建新数组
				return newItem;
			})
			//return出去后传回到successCallback当中
			successCallback(newData);
		})
		.error(function(error){
			errorCallback(error)
		})
	}
}])