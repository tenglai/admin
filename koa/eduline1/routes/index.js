var router = require('koa-router')();

router.get('/', function *(next) {
	// 注：yield 后面必须是一个 Promise
	// let rs = yield new Promise(function(resolve,reject){
	// 	setTimeout(function() {
	// 		console.log('执行setTimeout');
	// 		resolve('返回结果');
	// 	},2000);
	// })

	// reject的用法
	// let rs = 'null';
	// try{
	// 	rs = yield new Promise(function(resolve,reject){
	// 		setTimeout(function(argument) {
	// 			console.log('执行setTimeout');
	// 			reject('出错');
	// 		},2000);
	// 	})
	// }catch(err){
	// 	console.log(err);
	// }

	// console.log('aaaaaaaa=' + rs);
	// this.body = 'hello,koa1' + rs;

  	yield this.render('index', {
  		title: 'Hello World Koa!'
  	});
});

router.get('/foo', function *(next) {
  	yield this.render('index', {
  		title: 'Hello World foo!'
  	});
});

module.exports = router;
