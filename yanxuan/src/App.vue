<!-- 入口页面 -->
<template>
  <!-- 底部选项卡 -->
  <wxc-tab-bar
    :tab-titles="tabTitles"
    :tab-styles="tabStyles"
    title-type="icon"
    :tab-page-height="tabPageHeight"
    @wxcTabBarCurrentTabSelected="wxcTabBarCurrentTabSelected">
    <!-- 视图 -->
    <router-view></router-view>
  </wxc-tab-bar>
</template>

<style scoped>

</style>

<script>
  import { WxcTabBar, Utils } from 'weex-ui';
 
  import Config from './config'

  export default {
    components: { WxcTabBar },
    data: () => ({
      tabTitles: Config.tabTitles, // 标题
      tabStyles: Config.tabStyles, // 底部 Tab 样式配置
      tabPageHeight: Utils.env.getPageHeight() // Tab page 页面的高度
    }),
    mounted() {
      this.wxcTabBarCurrentTabSelected({page:0});
    },
    methods: {
      // 当前选中的 tab
      wxcTabBarCurrentTabSelected (e) {
        const index = e.page;
        if(index == 0){
          this.jump('/home');
        }else if(index == 1){
          this.jump('/recommend');
        }else if(index == 2){
          this.jump('/message');
        }else if(index == 3){
          this.jump('/mine');
        }else{
          this.jump('/home');
        }
      }
    }
  };
</script>