//将服务注入到控制器里
//注入$ionicScrollDelegate 调用其中的scrollTo 方法 控制点击按钮 按钮置顶
giftMoudle.controller('categoryCtrl',['$scope','categoryService','$ionicScrollDelegate',function($scope,categoryService,$ionicScrollDelegate){
	//初始化显示页面
	$scope.tmpUrl = 'views/category/tipsTmp.html';
	//定义 初始化 selectIndex 绑定到$scope上
	$scope.selectIndex = 0;
	//初始化 titleIndex 左侧导航栏所选元素的下标
	$scope.titleIndex = 0;
	//将点击事件绑定到$scope上
	$scope.titleAction = function(index){
		//将传入的index 赋值给 $scope.selectIndex
		$scope.selectIndex = index;
		//切换页面
		if(index == 0){
			$scope.tmpUrl = 'views/category/tipsTmp.html';
		}else if(index ==1){
			$scope.tmpUrl = 'views/category/singleTmp.html';
		}
	}
	//执行请求
	categoryService.getSingleTree(
		//成功的回调函数
		function(titles,lists){
			//绑定到$scope上
			$scope.titles = titles;
			$scope.lists = lists;
//			console.log($scope.titles);
			//计算 item 的宽、高 listRows 是一个数组 对lists进行遍历
			//每行3个list 计算得出每一个列表的行数 组成新数组
			$scope.listRows = lists.map(function(list,index){
				//向上取整 (获取list的长度 每一个list都是一个数组 向上取整 并返回值 最终得到一个新数组)
				return Math.ceil(list.length/3);
			})
//			console.log($scope.listHeightArr)
			//计算得出每一个列表的高度 遍历listRows中每一个元素 组成新数组
			$scope.listHeightArr = $scope.listRows.map(function(item,index){
				return item*100 + 50;
			})
			//获取每个导航模块列表所占的高度哦 遍历listHeightArr 组成新数组
			//设置每一个列表style的样式
			$scope.listStyleArr = $scope.listHeightArr.map(function(item){
				return '{height:"'+ item +'px"}'
			})
			console.log($scope.listRows);
			console.log($scope.listHeightArr);
			console.log($scope.listStyleArr);
		}
		,
		//失败的回调函数
		function(error){
			alert("数据加载失败，请检查网络");
		}
	);
	
	//点击事件 绑定到$scope 上
	$scope.navAction = function(index){
		//传入index 改变title样式
		$scope.titleIndex = index;
		//列表跳转到对应的位置
		//通过index确定点击的位置 然后滚动到前几个高度之和的位置
		console.log(index);
		var offset =0;
		for(var i=0;i<index;i++){
			offset += $scope.listHeightArr[i];
		}
		//设置开关 以便取消事件触发 避免由点击nav让list滚动带动listScrollAction方法执行
		$scope.canTriggle = false;
		
		$ionicScrollDelegate.$getByHandle("list").scrollTo(0,offset,false);
		//点击按钮 该按钮置顶
		//scrollTo(left值,top值,动画) 通过$getByhandle 与 delegate-handle配合绑定
		$ionicScrollDelegate.$getByHandle("nav").scrollTo(0,index*40,true)
	}
	
	//滑动事件 右边滑动 左边跟着选择
	$scope.listScrollAction = function(){
		//在listScrollAction方法执行前进行判断 判断如果是有点击事件触发的，就结束这个方法
		if(!$scope.canTriggle){
			$scope.canTriggle = true;
			return
		}
		console.log("正在滚动......");
		//获得当前位置
		var top = $ionicScrollDelegate.$getByHandle("list").getScrollPosition().top;
		console.log(top);
		//以防作用两边互相牵制 关闭右边的动画 只有点击左边按钮 右边滚动仅触发一次
		//通过当前的位置判断处于哪一个list列表中
//		[350, 450, 450, 350, 450, 250, 350, 750, 350, 150, 250, 750, 350, 350, 350, 250, 250]
//      min  max
//		0-350                          1
//		350-350+450                    2
//		350+450-350+450+450            3
		for(var i=0;i<$scope.listHeightArr.length;i++){
			//获得范围的最小值
			var min = 0;
			for(var j=0;j<i;j++){
				min +=$scope.listHeightArr[j];
			}
			//获得范围的最大值
			var max = min + $scope.listHeightArr[i];
			console.log(min+"--"+max);
			//有最小值和最大值后 对top 进行判断
			//判断如果介于最小值和最大值之间 则在这个列表中
			if(top>=min&&top<max){
				$scope.$apply(function(){
					//titleIndex 控制所选nav的样式
					$scope.titleIndex = i;//让这个列表的title选中
				})	
				//让这个列表的title滚动到最顶部
				$ionicScrollDelegate.$getByHandle("nav").scrollTo(0,i*40,true);
				//通过 break 结束外围的for循环
				break;
			}
		}
	}
}])