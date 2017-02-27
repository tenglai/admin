//将topService注入到控制器当中
//注入$timeout 延时获取topItem 的offsetWidth
//滑动页面 导航栏跟着一起变化 注入代理$ionicSlideBoxDelegate
giftMoudle.controller('topCtrl',['$scope','topService','$ionicSlideBoxDelegate',function($scope,topService,$ionicSlideBoxDelegate){
	$scope.allTitle = ['每日推荐','TOP100','独立原创榜','新星榜'];
	//初始化所选择的导航元素下标 点击时，使所选元素的下标与selectIndex相等
	$scope.selectIndex = 0;
	$scope.topAction = function(index){
		$scope.selectIndex = index;
		//在点击事件中进行翻页
		$ionicSlideBoxDelegate.slide(index);
	}
	//初始化数据请求路径
	$scope.listId =0;
	$scope.limit = 20;
	$scope.offsetArr = [];//$scope.offset全为0
	//创建allListData 并在其中进行for循环 创建与导航元素等量的空数组，用于储存列表数据
	$scope.allListData = [];
	for(var i =0;i<$scope.allTitle.length;i++){
		$scope.allListData.push([]);
		$scope.offsetArr.push(0);//设置offse的初始值全部为零
	}

	//初始化item-height
//	$scope.itemHeight = 200;
	//toplist只用页面加载完成后才会出现 所以用$on进行监听
	$scope.$on('$ionicView.loaded',function(){
		//通过获取屏幕的高度 进而给item 设置宽、高
		//因为对ion-slide 进行了ng-repeat 通过ducument.getElementById('toplist').offsetWidth获得的是最后一个ion-slide宽度，需要遍历完成后才能取整，所以改为给body增加id并获取器offsetWidth
//		console.log(document.getElementById('app').offsetWidth);
		$scope.itemWidth = (document.getElementById('app').offsetWidth - 30)/2;
		$scope.itemHeight = $scope.itemWidth + 100;
		//设置图片样式 宽高相等 设置为正方形
		$scope.imgStyle = "{height:'" + $scope.itemWidth + "px'}";
	})
	
	
	//请求列表数据  对getTopListData传入参数 将请求语句封装到方法中
	function requestListData(){
		topService.getTopListData(
			$scope.listId,$scope.limit,$scope.offsetArr[$scope.selectIndex],
			function(data){
				//接受topService回传的数据 将所请求到的数据绑定到allListData下的当请所选择的数组中
				$scope.allListData[$scope.selectIndex] = data;
			},
			function(error){
				alert("数据加载失败，请检查网络");
			}
		)
	}
	//初始化第一页的列表数据
	requestListData();
	//翻页时进行判断是否有数据，如果没有则进行请求
	$scope.topPageChange = function(index){
		//进行赋值
		$scope.selectIndex = index;
		//判断下一个页面是否有数据，如果没有则请求
		//发送请求前需要更改id
		$scope.listId = index;
		if($scope.allListData[index].length == 0){
			requestListData();
		}
	}
}])