<!-- 登录页 -->
<template>  
  <div class="wrapper">  
    <div class="login">  
      <div class="input-wrapper">  
        <input onchange="onchangeUserNumber" class="input" type="text" placeholder="手机号" autofocus="true" value=""/> 
        <image class="input-img" src="http://172.16.1.208:8081/src/assets/img/user.png"></image>  
      </div>  
      <div class="input-wrapper">  
        <input onchange="onchangeUserPassword" class="input" type="password" placeholder="密码" value=""/>  
        <image class="input-img" src="http://172.16.1.208:8081/src/assets/img/password.png"></image>
      </div>  
      <div class="input-wrapper">
        <div class="input-login" @click="login"> 
          <text class="input-login-text">登录</text>  
        </div>  
      </div>  
      <div class="input-wrapper">  
        <text class="input-forget" @click="findPassword">找回密码</text>  
        <text class="input-register" @click="register">立即注册</text>  
      </div>  
    </div>
  </div>  
</template>  
  
<script>  
  module.exports = {  
    data(){  
      return {
        userNumber:'',  
        userPassword:''
      }  
    },  
    methods:{  
      onchangeUserNumber(event) {
        this.userNumber = event.value;  
      },  
      onchangeUserPassword(event) {  
        this.userPassword = event.value;  
      },  
      /*找回密码 #48c9bf*/  
      findPassword() {
        // this.$vm('toast').$emit('toast','Hello,找回密码暂时未开发，后续我们会进行完善。');  
      },  
      /*注册*/  
      register() {
        // this.$vm('toast').$emit('toast','Hello,注册暂时未开发，后续我们会进行完善。');  
      },  
      /*处理登录*/  
      login() {
        console.log(1);
        if(this.userNumber.length < 1){  
          // this.$vm('toast').$emit('toast','请输入手机号');  
          return;  
        }else if(this.userPassword.length < 1){  
          // this.$vm('toast').$emit('toast','请输入密码');  
          return;  
        }  
        // this.$vm('toast').$emit('toast',"登录成功");  
      }
    }  
  }  
</script>  
  
<style>  
  .wrapper {  
    position: absolute;  
    top: 0;  
    right: 0;  
    bottom: 0;  
    left: 0;  
  }  
  .login{
    margin-top: 130px;
  }  
  .input-wrapper{  
    width: 100%;  
    margin-bottom: 30px;  
  }  
  .input {  
    font-size: 16px;  
    height: 50px;  
    width: 80%;
    margin: 0px auto;
    border-width:1px;  
    border-color: #48c9bf;  
    border-radius:5px;  
    outline: none;
    text-indent: 2em;
  }  
  .input-img{  
    position: absolute;  
    top:10px;  
    left: 35px;  
    width: 30px;  
    height: 30px;  
  }  
  .input-login{  
    height: 50px;  
    width: 80%;  
    background-color: #48c9bf;  
    border-radius: 10px;  
    margin: 30px auto 0px; 
  }  
  .input-login-text{  
    height: 50px;  
    width: 100%;  
    text-align: center;  
    line-height: 50px;  
    color: white;  
    font-size: 20px;  
  }  
  .input-forget{  
    position: absolute;  
    left: 50px;  
    font-size: 16px;  
  }  
  .input-register{  
    position: absolute;  
    right: 50px;  
    font-size: 16px;  
  }  
</style>