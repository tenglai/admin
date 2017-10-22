// 引入 mongoose
var mongoose = require('mongoose');

// 创建 user模块
var User = mongoose.model('user', new mongoose.Schema({
	email:String,
	pwd:String,
	nicheng:String,
},{_id:true}));

module.exports = User;