<template>
  <div>

    <!-- <header class="m-header is-fixed is-bg top-search">
      <div class="search-wrap">
        <img src="../../assets/images/icSearchGray.png" alt="">
        <span class="placeholder">影视 图书 唱片 小组 舞台剧等</span>
        <img src="../../assets/images/icScanGray.png" alt="">
      </div>
      <div class="m-header-button is-right" style="text-align: center;width: 50px;">
        <a href="javascript:;"><img class="m-icon-img" src="../../assets/images/icChatWhite.png" /></a>
      </div>
    </header>

    <div class="page-content">

      <m-swipe swipeid="swipe01" :autoplay="1000" paginationDirection="right">
        <div class="swiper-slide " slot="swiper-con"><img src="../../assets/images/banner/first.jpg" alt=""></div>
        <div class="swiper-slide " slot="swiper-con"><img src="../../assets/images/banner/second.jpg" alt=""></div>
        <div class="swiper-slide " slot="swiper-con"><img src="../../assets/images/banner/third.jpg" alt=""></div>
      </m-swipe>

      <m-cell title="提醒" icon>
        <img src="../../assets/images/icMineNotification.png" slot="icon">
        <a href="javascript:;" slot="cell-right"><img src="../../assets/images/icArrowGraySmall.png" alt=""></a>
      </m-cell>
      <m-cell title="设置">
        <a href="javascript:;" slot="cell-right"><img src="../../assets/images/icArrowGraySmall.png" alt=""></a>
      </m-cell>

      <div class="hot-wrap">
        <m-cell title="热门" label="hot">
          <a href="javascript:;" slot="cell-right">更多<img src="../../assets/images/icArrowGraySmall.png" alt=""></a>
        </m-cell>
        <m-cell-media :author="item.target.author.name" :column="item.source_cn" :img="item.target.cover_url" v-for="(item,index) in hotData"
          :key="item.id">

          <span slot="title">{{item.title}}</span>
          <span slot="describe">{{item.target.desc}}</span>
        </m-cell-media>
      </div>

      <div class="recommend-wrap">
        <m-cell title="推荐" label="recommend"></m-cell>
        <m-cell-media  :author="item.target.author.name" :column="item.source_cn" :bg="item.target.cover_url" v-for="(item,index) in recommendData" :key="item.id">
          <span slot="title">{{item.title}}</span>
          <span slot="describe">{{item.target.desc}}</span>
        </m-cell-media>
      </div>
    </div> -->
  </div>
</template>

<script>
  import mHeader from '../../components/header.vue'
  import mSwipe from '../../components/swipe.vue'
  import mCell from '../../components/cell.vue'
  import mCellMedia from '../../components/cell-media.vue'
  export default {
    name: 'index',
    components: {
      mHeader,
      mSwipe,
      mCell,
      mCellMedia
    },
    data() {
      return {
        recommendData: [],
        hotData: []
      }
    },
    created() {
      this.fetchData();
    },
    methods: {
      fetchData() {
        // this.axios.get('/api/homeData').then((response) => {
        //   let data = response.data.data.recommend_feeds;
        //   let recommend = [];
        //   let hot = [];
        //   for (var i in data) {
        //     if (data[i].card && data[i].card.name == '为你推荐') {
        //       recommend.push(data[i]);
        //     } else {
        //       hot.push(data[i]);
        //     }
        //   }
        //   this.recommendData = recommend;
        //   this.hotData = hot;
        // })
      }
    }
  }
</script>

<style lang="less">
  // 头部
  header.m-header {
    padding: 0 0 0 10px;
  }

  .is-fixed~.page-content {
    padding-top: 44px;
    padding-bottom: 50px;
  }

  .top-search {
    .search-wrap {
      // width: 100%;
      height: 30px;
      background: #fff;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #c0c0c0;
      padding: 0 12px;
      .placeholder {
        flex: 1;
        text-align: left;
        padding-left: 12px;
      }
      img {
        width: 20px;
        height: 20px;
      }
    }
  }
  // 热门
  .hot-wrap,
  .recommend-wrap {
    padding-top: 12px;
  }
</style>
