<!-- 登录页 -->
<template>  
  <div class="wrapper">  
    <div class="login">  
      <div class="input-wrapper">  
        <input @input="onchangeUserNumber" class="input" type="text" placeholder="手机号" autofocus="true" value=""/> 
        <image class="input-img" src="http://172.16.1.208:8081/src/assets/img/user.png"></image>  
      </div>  
      <div class="input-wrapper">  
        <input @input="onchangeUserPassword" class="input" type="password" placeholder="密码" value=""/>  
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
  // 引入弹窗
  var modal = weex.requireModule('modal');

  export default {  
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
      /*找回密码*/  
      findPassword() {
        modal.toast({
          message: 'Hello,找回密码暂时未开发，后续我们会进行完善。',
          duration: 2
        });
      },  
      /*注册*/  
      register() {
        modal.toast({
          message: 'Hello,注册暂时未开发，后续我们会进行完善。',
          duration: 2
        }); 
      },  
      /*处理登录*/  
      login() {
        if(this.userNumber.length < 1){
          modal.toast({
            message: '请输入手机号',
            duration: 2
          }); 
          return;  
        }else if(this.userPassword.length < 1){
          modal.toast({
            message: '请输入密码',
            duration: 2
          });
          return;  
        }
        modal.toast({
          message: '登录成功',
          duration: 2
        });
        // 跳转首页
        this.$router.push({path:'/home'});
      }
    }  
  }  
</script>  
  
<style lang="less" scoped>
  /*整体页面*/ 
  .wrapper {  
    position: absolute;  
    top: 0;  
    right: 0;  
    bottom: 0;  
    left: 0;
    /*输入框 及 按钮*/
    .login{
      width: 80%;
      height: 300px;
      overflow: hidden;
      /*垂直水平居中*/
      position:absolute;
      left:0;
      top: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      .input-wrapper{  
        /*输入框*/
        .input {  
          height: 44px;
          border: 1px solid #48c9bf;
          border-radius: 5px;
          margin-bottom: 30px;
          text-indent: 2em;
        }
        /*图标*/
        .input-img{
          position: absolute;
          top: 10px;
          left: 10px; 
          width: 20px;
          height: 20px;
        }
        /*登录按钮*/
        .input-login{  
          height: 44px;
          background-color: #48c9bf;
          border-radius: 5px;
          margin-bottom: 20px;
          .input-login-text{  
            color: #fff;
            height: 44px;
            line-height: 44px;
            text-align: center;
            font-size: 20px;
          }
        }
        /*找回密码*/
        .input-forget{  
          position: absolute;
          left: 0px;
        }
        /*立即注册*/  
        .input-register{  
          position: absolute;
          right: 0px;
        }
      }
    }
  }  
</style>