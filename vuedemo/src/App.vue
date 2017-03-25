<template>
  <div id="app">
    <!-- 头部导航 -->
    <header class="header">
      <el-row>
        <el-col :span="24">
          <el-menu default-active="5" class="el-menu-demo" mode="horizontal" @select="">
            <el-menu-item index="1">高级插件</el-menu-item>
            <el-menu-item index="2">在线商城</el-menu-item>
            <el-menu-item index="3">客户管理</el-menu-item>
            <el-menu-item index="4">系统设置</el-menu-item>
            <el-menu-item index="5">活动发布</el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </header>
    <div style="position: relative;height: 60;width: 100%;"></div>

    <main>
      <!-- 左侧导航 -->
      <div class="main-left">
        <el-menu default-active="/activePublic" class="el-menu-vertical-demo" :router="true">
          <el-menu-item index="/activePublic" :class="{'isActive': active}">活动发布</el-menu-item>
          <el-menu-item index="/activeManage" :class="{'isActive': !active}">活动管理</el-menu-item>
        </el-menu>
      </div>

      <!-- 右侧主内容区 -->
      <div class="main-right">

      </div>
    </main>
  </div>
</template>

<script>
import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(Element)

export default {
  name: 'app',
  data: function () {
    return {
      active: true
    }
  }
}
</script>

<style>
body{
  margin: 0;
}
#app {
  min-width: 1200px;
  margin: 0 auto;
  font-family: "Helvetica Neue","PingFang SC",Arial,sans-serif;
}
</style>
