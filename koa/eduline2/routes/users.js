const router = require('koa-router')()

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

// 登录页路由
router.get('/login', function *(next) {
  // this.body = 'login页面';
  await ctx.render('login', {});
});

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
