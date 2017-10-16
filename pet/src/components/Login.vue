<template>
  <table>
    <tr>
      <!-- 登录 -->
      <td>
        <form>
          <table align="center">
            <tr>
              <td align="right">email:</td>
              <td align="right">
                <el-input name="email" placeholder="请输入email"></el-input>
              </td>
            </tr>
            <tr>
              <td align="right">密码:</td>
              <td align="right">
                <el-input type='password' name="pwd"></el-input>
              </td>
            </tr>
            <tr>
              <td colspan="2" align="center">
                <el-button type="primary">登录</el-button>
              </td>
            </tr>
          </table>
        </form>
      </td>
      <!-- 注册 -->
      <td>
        <form name="zhuceForm">
          <table align="center">
            <tr>
              <td align="right">email:</td>
              <td align="right">
                <el-input name="email" placeholder="请输入email"></el-input>
              </td>
            </tr>
            <tr>
              <td align="right">密码:</td>
              <td align="right">
                <el-input type='password' name="pwd"></el-input>
              </td>
            </tr>
            <tr>
              <td align="right">重复密码:</td>
              <td align="right">
                <el-input type='password' name="repwd"></el-input>
              </td>
            </tr>
            <tr>
              <td align="right">昵称:</td>
              <td align="right">
                <el-input name="nicheng"></el-input>
              </td>
            </tr>
            <tr>
              <td colspan="2" align="center">
                <el-button type="primary" @click='zhuce'>注册</el-button>
              </td>
            </tr>
          </table>
        </form>
      </td>
    </tr>
  </table>
</template>

<script>
import axios from 'axios'
export default {
  methods:{
    zhuce:function() {
      let formObj = {};
      formObj.email = zhuceForm.email.value;
      formObj.pwd = zhuceForm.pwd.value;
      formObj.repwd = zhuceForm.repwd.value;
      formObj.nicheng = zhuceForm.nicheng.value;

      // 向服务器传参
      axios.post('http://localhost:3000/users/zhuce',formObj)
        .then(function(res){
          console.log(res);
          alert(res.data);
        })
        .catch(function(err){
          console.log(err);
        })
    }
  }
}
</script>
