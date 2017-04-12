
<template>
  <div>
    <ul>
      <li v-for="fruit in fruitList">
        <div class="name">{{fruit.name}}</div>
        <div class="price">{{fruit.price}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        fruitList: []
      }
    },
    mounted () { // 声明周期 DOM加载完毕，数据还未加载，created 最前
      let temp = {
        name: '苹果',
        price: 90,
        unit: '斤'
      }
      this.fruitList.push(temp)
    }
  }
</script>
