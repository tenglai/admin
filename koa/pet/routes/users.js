const router = require('koa-router')()

router.prefix('/users')

router.get('/', function (ctx, next) {
  	ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  	ctx.body = 'this is a users/bar response'
})

// 配置 注册路由
router.post('/zhuce', function (ctx, next) {
	let email = ctx.request.body.email;
  	ctx.body = '收到:' + email;
})

module.exports = router
