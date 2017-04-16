<template>
  <div id="TalionNav">
    <header class="TalionNav">
      <div class="TalionNav-primary">
        <a href="/"><h1>豆瓣</h1></a>
        <nav>
          <ul>
            <li><a href="#/movies" style="color: #2384E8;">电影</a></li>
            <li><a href="#/book" style="color: #9F7860;">图书</a></li>
          </ul>
          <span class="search"></span>
        </nav>
      </div>
    </header>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    }
  }
</script>

<style lang="scss" scoped>
.TalionNav {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9999;
  background: #fff;
  a{
    text-decoration: none;
  }
  .TalionNav-primary{
    border-bottom: 1px solid #f3f3f3;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
    padding: 0 18px;
    background: #fff;
    height: 47px;
    box-sizing: border-box;
    display: -webkit-box;
    display: flex;
    &>a{
      font-size: 0
    }
    &>*{
      white-space: nowrap;
    }
    &>*,nav li{
      display: inline-block;
    }
    nav li{
      font-size: 15px;
      margin-right: 19px;
    }
    nav>*{
      vertical-align: middle;
    }
    h1{
      margin: 0;
      padding: 0;
      color: #00b600;
      font-size: 0;
      background-size: cover;
      height: 22px;
      width: 46px;
      display: inline-block;
    }
    .search{
      font-size: 0;
      background-size: cover;
      width: 24px;
      height: 18px;
      margin-top: 4px;
      position: relative;
    }
  }
  ul,li{
    margin: 0;
    padding: 0;
    list-style: none;
  }
}
</style>
