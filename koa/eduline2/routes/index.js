const router = require('koa-router')()

router.get('/', async (ctx, next) => {
	// await 后面需要接 Promise
	// let rs = await new Promise(function(resolve,reject){
	// 	setTimeout(function(){
	// 		console.log('执行setTimeout');
	// 		resolve('返回结果');
	// 	},2000);
	// })

	// reject的用法
	// let rs = 'null';
	// try{
	// 	rs = await new Promise(function(resolve,reject){
	// 		setTimeout(function(){
	// 			console.log('执行setTimeout');
	// 			reject('出错');
	// 		},2000)
	// 	})
	// }catch(err){
	// 	console.log(err);
	// }

	// ctx.body = 'hello,koa2' + rs;

  	await ctx.render('index', {
  		title: 'Hello Koa 2!'
  	})
})

router.get('/string', async (ctx, next) => {
  	ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  	ctx.body = {
  		title: 'koa2 json'
  	}
})

module.exports = router
