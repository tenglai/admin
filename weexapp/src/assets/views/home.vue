<!-- 首页 -->
<template>
  <div class="wrapper">
    <!-- 标题栏 -->
  	<wxc-minibar
      title="首页"
      right-button="N"
      left-button="N"
      background-color="#F2F3F4"
      text-color="#333333"></wxc-minibar>
    <!-- 滚动视图 -->
    <scroller class="main-list">
      <!-- 轮播图 -->
      <kx-slider :imageList="Banners"></kx-slider>
      <!-- 顶部标签页 -->
      <wxc-tab-page
        ref="wxc-tab-page"
        :tab-titles="tabTitles"
        :tab-styles="tabStyles"
        title-type="text"
        :needSlider="needSlider"
        :is-tab-view="isTabView"
        :tab-page-height="tabPageHeight"
        :spm-c="4307989"
        @wxcTabPageCurrentTabSelected="wxcTabPageCurrentTabSelected">
          <list
            v-for="(v,index) in tabList"
            :key="index"
            class="item-container">
            <cell class="border-cell"></cell>
            <cell
              class="cell"
              v-for="(demo,key) in v"
              :accessible="true"
              :aria-label="demo.title"
              :key="key">
                <wxc-pan-item
                  :ext-id="'1-' + (v) + '-' + (key)"
                  @wxcPanItemPan="wxcPanItemPan" >
                    <wxc-cell
                      label=""
                      :title="demo.title"
                      :has-arrow="true"
                      @wxcCellClicked="wxcCellClicked(webUrl+'/'+demo.inputtime.replace('-','').replace('-','')+'/'+demo.id+'.shtml')"
                      spm="181.12312312.12312.d01"
                      :has-top-border="false"
                      :price="demo.inputtime"></wxc-cell>
                </wxc-pan-item>
            </cell>
          </list>
      </wxc-tab-page>
    </scroller>   
  </div>
</template>

<script>
  const dom = weex.requireModule('dom');
  // 引入 工具类
  import util from '../util';
  // 引入 轮播图组件
  import Slider from '../components/Slider.vue';
  // 引入 UI组件
  import { WxcMinibar, WxcTabPage, WxcPanItem, Utils } from 'weex-ui';
  // 配置文件
  import Config from './config';

  export default {
    components: {
      'kx-slider': Slider,
      WxcMinibar,
      WxcTabPage,
      WxcPanItem,
      Utils
    },
    data () {
      return {
        // 轮播图
        Banners: [
          { title: '', src: 'http://app.kuitao8.com/images/banner/1.jpg'},
          { title: '', src: 'http://app.kuitao8.com/images/banner/2.jpg'},
          { title: '', src: 'http://app.kuitao8.com/images/banner/3.jpg'}
        ],
        // 顶部标签页(wxc-tab-page) 配置信息
        tabTitles: Config.tabTitles, // 顶部标签 标题
        tabStyles: Config.tabStyles, // 顶部标签 样式
        needSlider: true, // 是否需要滑动功能
        isTabView: true, // 当设置为false,同时 tab 配置 url 参数即可跳出
        tabPageHeight: 1334, // Tab page 页面的高度
        // 内容部分
        tabList: [],
        demoList: [1, 2, 3, 4, 5, 6, 7, 8, 9]
      }
    },
    created (_e) {
      // 字体图标初始化
      util.initIconFont();
      // 根据设备 设置Tab page 页面的高度
      this.tabPageHeight = Utils.env.getPageHeight();

      this.tabList = [...Array(this.tabTitles.length).keys()].map(i => []);
      Vue.set(this.tabList, 0, this.demoList);
    },
    methods: {
      wxcTabPageCurrentTabSelected (e) {
        const self = this;
        const index = e.page;
        /* 未加载tab模拟数据请求 */
        if (!Utils.isNonEmptyArray(self.tabList[index])) {
          setTimeout(() => {
            Vue.set(self.tabList, index, self.demoList);
          }, 100);
        }
      },
      wxcPanItemPan (e) {
        if (Utils.env.supportsEBForAndroid()) {
          this.$refs['wxc-tab-page'].bindExp(e.element);
        }
      }
    }
  }
</script>

<style scoped>
  .wrapper{
  }
  .iconfont {
    font-family:iconfont;
  }
  /*内容部分*/
  .main-list{
    position: fixed;
    top: 91px;
    bottom: 90px;
    left: 0;
    right: 0;
  }
  .item-container {
    width: 750px;
    background-color: #f2f3f4;
  }
  .border-cell {
    background-color: #f2f3f4;
    width: 750px;
    height: 24px;
    align-items: center;
    justify-content: center;
    border-bottom-width: 1px;
    border-style: solid;
    border-color: #e0e0e0;
  }
  /*内容部分*/
  .cell {
    background-color: #ffffff;
  }
</style>