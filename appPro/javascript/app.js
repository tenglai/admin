var giftMoudle = angular.module('gift',['ionic','gift-service']);
//设置路由 注入服务
giftMoudle.config(['$stateProvider','$urlRouterProvider','$ionicConfigProvider','globalProvider',function($stateProvider,$urlRouterProvider,$ionicConfigProvider,globalProvider){
	//进行路由配置
	$stateProvider
	.state('tabs',{//根路径
		url:'/tabs',
		templateUrl:'views/tabs.html'//模版的路径
	})
	.state('tabs.home',{//继承
		url:'/home',
		views:{
			'home':{//名字为home
				templateUrl:'views/home/home.html',
				controller:'homeCtrl'
			}
		}
	})
	.state('tabs.top',{//继承
		url:'/top',
		views:{
			'top':{//名字为top
				templateUrl:'views/top/top.html',
				controller:'topCtrl'
			}
		}
	})
	.state('tabs.category',{//继承
		url:'/category',
		views:{
			'category':{//名字为category
				templateUrl:'views/category/category.html',
				controller:'categoryCtrl'
			}
		}
	})
	.state('tabs.me',{//继承
		url:'/me',
		views:{
			'me':{//名字为me
				templateUrl:'views/me/me.html',
				controller:'meCtrl'
			}
		}
	})
	
	//设置路由其他情况显示
	$urlRouterProvider.otherwise('/tabs/home');
	
	//配置全局风格
	$ionicConfigProvider.platform.ios.tabs.style('standard');
	$ionicConfigProvider.platform.android.tabs.style('standard');
	//tabs的位置
	$ionicConfigProvider.platform.ios.tabs.position('bottom');
	$ionicConfigProvider.platform.android.tabs.position('bottom');
	//title字体居中
	$ionicConfigProvider.platform.ios.navBar.alignTitle('center');
	$ionicConfigProvider.platform.android.navBar.alignTitle('center');
	//设置返回按钮没有文字
	$ionicConfigProvider.platform.android.backButton.previousTitleText('');
	$ionicConfigProvider.platform.ios.backButton.previousTitleText('');
	
	//调用服务
	globalProvider.globalPath = '/appPro';//在config中给属性赋值
	
}])

//构建服务模版 用于挂靠服务 需要注入到 giftMoudle
var giftSer = angular.module('gift-service',[]);
//注入供应商
//giftSer.config(['globalProvider',function(globalProvider){
//	globalProvider.globalPath = '/appPro';
//}])
//全局配置统一的请求路径
giftSer.provider('global',function(){
	this.globalPath = "";//provider的globalPath属性 为空
	//外部使用get方法 this.$get 使用$get return出去的东西
	this.$get=function(){
		var that = this;
		var obj = {};
		obj.getGlobalPath = function(){//往对象上挂靠方法，通过方法获得globalPath
			return that.globalPath;
		}
		return obj;
	}
})