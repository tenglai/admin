<template>
  <section style="height: 100%">
    <city></city>
    <header class="home-header border-bottom">
      <div class="city f1" @click="showCityList">
        <span class="vm city-name f14">{{ $store.state.city.name }}</span>
        <span class="city-arrow-icon vm"></span>
      </div>
      <div class="sel-lists f14 f1 pr" @click="moveTab">
        <div hot="sel" :class="{selnav: selnav}">正在热映</div>
        <div :class="{selnav: !selnav}">即将上映</div>
        <span class="move pa" :style="{left: moveDistance}"></span>
      </div>
    </header>
    <section v-show="selnav" class="content">
      <swiper :imgs="imgs"></swiper>
      <hot :hotLists="hotLists"></hot>
    </section>
    <section v-show="!selnav" class="content">
      <coming :comingLists="comingLists"></coming>
      <div class="click-load-more" @click="clickLoadMore">
        <span v-show="clickLoadStatus === 'start'">点击查看更多</span>
        <div v-show="clickLoadStatus === 'loading'" class="loading-icon">
          <span>加载中</span>
          <mt-spinner style="display: inline-block" type="fading-circle" color="rgb(100,100,100)" :size="19"></mt-spinner>
        </div>
        <span v-show="clickLoadStatus === 'complete'">已经全部显示</span>
      </div>
    </section>
    <play-video></play-video>
  </section>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import { swiper, hot, city, coming, playVideo } from '../components/'
  export default {
    data () {  // 定义变量
      return {
        moveDistance: '5%',
        imgs: [],
        comingLists: [],
        loadingLists: [],
        selnav: true,
        clickLoadStatus: 'start',
        offset: 0,
        limit: 20,
        total: 0
      }
    },
    components: {
      swiper,
      hot,
      city,
      coming,
      playVideo
    },
    computed: mapGetters([  // 计算属性 当
      'hotLists'
    ]),
    methods: {
      ...mapMutations([
        'pushLoadStack',
        'completeLoad',
        'showCityList',
        'pushComingList'
      ]),
      moveTab (event) {
        event.target.getAttribute('hot') ? this.selectHotTab() : this.selectComingTab()
      },
      selectHotTab () {
        this.selnav = true
        this.moveDistance = '5%'
        this.pushComingList({lists: []})
      },
      getWeekDay (num) {
        let weeks = ['周日','周一','周二','周三','周四','周五','周六']
        return weeks[num]
      },
      clickLoadMore () {
        if (this.clickLoadStatus != 'complete') {
          this.clickLoadStatus = 'loading'
          setTimeout(() => {
            this.$http.get(`/movie/coming/?limit=${this.limit}&offset=${this.offset}`).then((response) => {
              let data = response.data
              let lists = data.data.data.returnValue
              this.loadingLists = this.loadingLists.concat(lists)
              // 模拟索引数据的id号
              this.loadingLists.forEach((item,index) => {
                item.mID = index
              })
              this.pushComingList({lists: this.loadingLists})
              this.comingLists = this.sortComingData(this.loadingLists)
              this.offset = this.offset + this.limit
              if (this.offset < this.total) {
                this.clickLoadStatus = 'start'
              } else {
                this.clickLoadStatus = 'complete'
              }
            })
          },500)
        }
      },
      requestData (url, fn) {
        this.pushLoadStack()
        this.$http.get(url).then(fn).then(this.completeLoad)
      },
      sortComingData (lists) {
        let comingLists = []
        lists.forEach((item) => {
          let hasItem = false
          for (let i = 0;i < comingLists.length; i++) {
            if (item.openTime === comingLists[i].openTime) {
              comingLists[i].movies.push(item)
              hasItem = true
              break
            }
          }
          if (!hasItem) {
            let comingItem = {  // 定义对象
              openTime: '',
              day: '',
              movies: []
            }
            comingItem.openTime = item.openTime
            comingItem.day = this.getWeekDay(new Date(item.openTime).getDay)
            comingItem.movies.push(item)
            comingLists.push(comingItem)
          }
        })
        return comingLista
      }
    },
    created () {
      this.pushComingList({lists: []})
      this.requestData('/movie/swiper', (response) => {
        let data = response.data
        this.imgs = data.data.data.returnValue
      })

      this.requestData(`/movie/coming/?limit`)
    }
  }
</script>
