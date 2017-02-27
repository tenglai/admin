giftMoudle.controller('homeCtrl',['$scope','homeService','$ionicSlideBoxDelegate','$ionicScrollDelegate','$timeout',function($scope,homeService,$ionicSlideBoxDelegate,$ionicScrollDelegate,$timeout){
	//禁用外部的ion-slide 通过touch事件 判断手指滑动的位置
	//$ionicSlideBoxDelegate.$getByHandle('home-box').enableSlide(false);
	//通过touch事件 判断手指滑动的位置
	$timeout(function(){//直接调用allBanner还没有加载出来 利用$timeout延时调用
		//对touch事件的三种情况分别进行判断
		document.getElementById("allBanner").addEventListener('touchstart',function(event){
			//判断偏移量
			//console.log(event.touches[0].clientY)
			$ionicSlideBoxDelegate.$getByHandle('home-box').enableSlide(false);
		},false)
		document.getElementById("allBanner").addEventListener('touchend',function(event){
			$ionicSlideBoxDelegate.$getByHandle('home-box').enableSlide(true);
		},false)
		document.getElementById("allBanner").addEventListener('touchcancel',function(event){
			$ionicSlideBoxDelegate.$getByHandle('home-box').enableSlide(true);
		},false)
	},100)
//	//请求列表的ID
//	$scope.listId = 107;
	//请求数据的总数
	$scope.limit = 20;
	//请求数据的初始位置
	$scope.offset = 0;
	//初始化数据源，设置数据源为空
//	$scope.listData = []; //allListDat取代了listData
	$scope.allListData = [];
	//初始化ng-if设为true
	$scope.canLoadMore = true;
	//初始化导航栏的选定项
	$scope.selectIndex = 0;
	//初始话所选择的ion-slide  范围是[0,16]
	$scope.selectSlide = 0;//让当前导航栏的下标等于selectSlide 来达到滑动页面导航栏跟着变化
	
	//导航栏点击事件
	$scope.navAction = function(index,id){
//		$scope.selectIndex = index;
		$scope.selectSlide = index;
		$scope.listId = id;
		//对指点delegate-handle 的 值的元素进行操作 改变页面
		$ionicSlideBoxDelegate.$getByHandle('home-box').slide(index);
	}
	
	//在控制器里用$http服务进行网络请求 请求导航栏数据
	//首先提供成功的回调 用于homeService通过方法传回数据
//	function success(data){
//		console.log("请求成功！")
//	}
//	homeService.getHomeNavData(success); //将success方法提供给 请求getHomeNavData
	
	homeService.getHomeNavData(
		function(data){
			//请求导航数据成功
			$scope.navData = data;//定义绑定navData
			//进行列表数据初始化 第0个导航数据的id值
			$scope.listId = $scope.navData[0].id;
			//因为listData有17个导航，所有需要准备17个空数组来装导航数据，通过for循环创建，并创建一个新数组allListData来装这17个空数组
			for(var i = 0;i<$scope.navData.length;i++){
				$scope.allListData.push([]);
//				console.log($scope.allListData);
			}
			requestList('init');//初始请求(先有导航数据，然后再有列表数据)
		},
		networkError	
	);
	//将请求banner数据的语句封装成方法，便于刷新调用
	function requestBanner(){
		homeService.getBannerListData(
			function(data){
				$scope.banners = data;
				//刷新轮播图
				$ionicSlideBoxDelegate.$getByHandle('banner').update();
			},
			networkError
		);
		
		//请求SecondBanner数据
		homeService.getSecondBannerData(
			function(data){
				$scope.secondBanners = data;
			},
			networkError
		);
	}
	requestBanner();//初始请求
	
	//将请求商品列表list数据的语句封装成方法，便于下拉调用
	function requestList(flag){
		//请求商品列表list数据
		homeService.getHomeListData(
			$scope.listId,$scope.limit,$scope.offset,
			function(data){
				//进行判断是否为第一次加载，如果flag == 'refresh'动画取消
				if(flag == 'refresh'){
					//当下拉刷新时，需要先清空，再执行concat
					$scope.$broadcast('scroll.refreshComplete');
//					$scope.listData = [];
					//listData 改为allListData[$scope.selectSlide] 清空对应的数据数组，即清空当前页的数据
					$scope.allListData[$scope.selectSlide] = [];
				}else if(flag == 'loadMore'){
					//注意："加载更多"取消动画的代码与"刷新"取消动画的代码不同
					$scope.$broadcast('scroll.infiniteScrollComplete');
				}
				//对数据进行拼接，来实现上拉时，原数据不变，在其基础之上加载更多,成为一个新的数组
//				$scope.listData = $scope.listData.concat(data);
				//在17个数组中取出对应的数组，将请求回来的数据追加到后面
				$scope.allListData[$scope.selectSlide]=$scope.allListData[$scope.selectSlide].concat(data);
			},
			//请求数据失败的时候，也需要关闭动画
			function(){
				if(flag == 'refresh'){
					//当下拉刷新时，需要先清空，再执行concat
					$scope.$broadcast('scroll.refreshComplete');
					$scope.listData = [];
				}else if(flag == 'loadMore'){
					$scope.$broadcast('scroll.infiniteScrollComplete');
					$scope.canLoadMore = false;
					//通过$timeout将ng-if重新改为true，当后台可以加载更多时，客户仍可以通过上拉加载更多
					$timeout(function(){
						$scope.canLoadMore = true;
					},500)
					//通过content的代理$ionicScrollDelegate将数据往回拖，以实现加载更多时无数据的情况关闭动画
//					console.log($scope.loadMorePosition);
//					$ionicScrollDelegate.scrollTo(0,$scope.loadMorePosition-61,true);
					
				}
				//需要调用networkError这个方法
				networkError();
			}
		);
	}
//	requestList('init');//初始请求
	
	function networkError(){
		alert("数据加载失败，请检查网络！");
	}
	//页面要用的方法放在scope上
	$scope.refresh = function(){
		//刷新列表
		$scope.offset = 0;
		requestList('refresh');
		//刷新banner
		requestBanner();
	}
	//上拉加载更多
	$scope.loadMore = function(){
		console.log("加载更多。。。。")
		//获得content的偏移量，用以加载更多失败时关闭动画
//		$scope.loadMorePosition= $ionicScrollDelegate.getScrollPosition().top;//从顶部到用户已滚动的距离
		//加载更多，先改变请求条件，再发送请求,开始数据位置为已经数据之后（即已加载数据长度）
//		$scope.offset = $scope.listData.length;
		//重置offset
		$scope.offset = $scope.allListData[$scope.selectSlide].length;
		requestList('loadMore');
	}
	
	//list翻页事件
	$scope.listChangeAction = function(index){
		console.log(index);
		//控制页面的显示
		$scope.selectSlide = index;
		//改变列表的Id 重新请求数据 此处反反复复使用一个数据源$scope.listData
		$scope.listId = $scope.navData[index].id;
//		console.log($scope.listId);
		//请求数据(进行判断 只有下一页没有数据的情况下才重新请求数据)
		if($scope.allListData[index].length == 0){
			requestList('init');
		}
		//点击事件 按钮自动移动
		var length=document.getElementsByClassName("nav-btn")[1].offsetWidth;
		$ionicScrollDelegate.scrollTo(index*length,0,true)
	}
}])