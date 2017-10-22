const router = require('koa-router')()

// 1.导入 mongoose
var mongoose = require('mongoose');
mongoose.Promise = global.Promise; // 2.初始化
// mongoose.Promise = require('bluebird'); // 疑似高效
 
// 3.导入 User
let User = require('../models/UserModel.js');
 
// 4.连接数据库
var db = mongoose.connect('mongodb://localhost/eduline');

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

// 注册页路由
router.post('/zhuce', async function (ctx, next) {
	// // 获取参数
	// // let email = ctx.query['email']; // get 方式获取参数
	// let email = ctx.request.body['email']; // post 方式获取参数

	// // 输出
	// ctx.body = '收到email:' + email;

  // 5.实例化 user
  let user = new User(); // 因为user是关键词,当插入时,没有表会自动生成一个表,表名是users
  // 6.保存参数
  user.email = ctx.request.body['email'];
  user.pwd = ctx.request.body['pwd'];
  user.nicheng = ctx.request.body['nicheng'];
  // 9.异常处理
  try{
    // 7.保存
    user.save();
  }catch(err){
    console.log(err);
    if(err.toString().indexOf('emailuiq')>1){
      ctx.body = 'email重复';
    }else if(err.toString().indexOf('nichenguiq')>1){
      ctx.body = '昵称重复';
    }
    // 拦截
    return;
  }
  // 8.输出 自增涨id 自动生成组件
  ctx.body = user._id;
});

module.exports = router