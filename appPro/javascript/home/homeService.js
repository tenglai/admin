//服务 服务名为homeService
giftSer.service('homeService',['$http','global',function($http,global){
	//请求数据 需要调用回调方法 将数据传送给 homeCtrl
	this.getHomeNavData = function(successCallback,errorCallback){//传入success
		//异步请求数据
		$http.get(global.getGlobalPath() + '/data/home/homeNav.json')//请求的路径
		.success(function(data){
//			console.log(data);
			//调用成功的回调方法 将数据通过方法回传回去
			//执行success 将data 传入
			successCallback(data.data.channels);
		})
		.error(function(error){
			errorCallback(error);
		})
	}
//	$http.get(global.getGlobalPath() + '/data/home/homeNav.json')//请求的路径
//	.success(function(){//数据申请成功时
//		
//	}).error(function(error){//数据申请失败时
//		alert('抱歉，数据加载失败，请检查网络')
//	})
	this.getBannerListData = function(successCallback,errorCallback){
		$http.get(global.getGlobalPath()+'/data/home/homeBanners.json')
		.success(function(data){
//			console.log(data.data.banners);
			var newData = data.data.banners.map(function(item,index){
				var newItem = {};
				newItem.id = item.id;
				newItem.imgUrl = item.image_url;
				return newItem;
			})
			//通过successCallback将newData 传到 homeController 当中
			successCallback(newData);
		})
		.error(function(error){
			errorCallback(error);
		})
	}
	
	this.getSecondBannerData = function(successCallback,errorCallback){
		$http.get(global.getGlobalPath()+'/data/home/homeSecondBanners.json')
		.success(function(data){
//			console.log(data.data.secondary_banners);
			var newData = data.data.secondary_banners.map(function(item,index){
				var newItem = {};
				newItem.id = item.id;
				newItem.imgUrl = item.image_url;
				return newItem;
			})
			successCallback(newData);
		})
		.error(function(error){
			errorCallback(error);
		})
	}
	//获得列表数据
	this.getHomeListData = function(homeId, limit, offset, successCallback, errorCallback){
		//上下拉刷新
		//提供传入参数：count/limit offset/page
		$http.get(global.getGlobalPath()+'/data/home/home'+homeId+'limit'+limit+'offset'+offset)
		.success(function(data){
			var newData = data.data.items.map(function(item, index){
				var newItem = {};
				newItem.id = item.id;
				newItem.imgUrl = item.cover_image_url;
				newItem.likes = item.likes_count;
				newItem.title = item.title;
				return newItem;
			})
			successCallback(newData);
		})
		.error(function(error){
			errorCallback();
		})
	}
}])

//数据的绑定需要绑定到控制器 $scope 上