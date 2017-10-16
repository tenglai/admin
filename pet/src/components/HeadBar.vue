<template>
  <el-row>
    <el-col :span="2">&nbsp;</el-col>
    <el-col :span="4" style='background:#f9fafc;font-size:2em;'><i class="el-icon-menu"></i>宠物空间</el-col>
    <el-col :span="10" style='background:#f9fafc;'>
      <el-input
        placeholder="请输入搜索关键词"
        icon="search"
      ></el-input>
    </el-col>
    <el-col :span="6" style='background:#f9fafc;'>
      <el-button type="success" @click='showLogin'>登录/注册</el-button>
    </el-col>
    <el-col :span="2">&nbsp;</el-col>
  </el-row>
</template>

<script>
// 引入 登录 form 表单
import Login from './Login'

export default {
  methods:{
    showLogin(){
      /**
       * $parent 父组件
       * $refs ref的集合对象
       */
      this.$parent.$refs.diaLog.showDiaLog(Login); // 调用父组件中的指定某个子组件的方法
    }
  }
}
</script>
