const router = require('koa-router')()

router.prefix('/users')

// 默认路由
router.get('/', async function (ctx, next) {
  // ctx.body = 'this is a users response!'
  ctx.state = {
  	title:'我是koa2的login'
  };
})

// 登录页路由
router.get('/login', async function (ctx, next) {
  await ctx.render('login', {});
});

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
