var router = require('koa-router')();

router.prefix('/users');

router.get('/', function *(next) {
  this.body = 'this is a users response!';
});

// 登录页路由
router.get('/login', function *(next) {
  // this.body = 'login页面';
  yield this.render('login',{});
});

router.get('/bar', function *(next) {
  this.body = 'this is a users/bar response!';
});

module.exports = router;
