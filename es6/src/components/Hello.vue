<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    studyEs6()
    return {
      msg: '欢迎 to Your Vue.js App'
    }
  }
}
function studyEs6() {
  // let [a,b,c,d] = ['aa','bb',77,88]
  // alert(c)
  // let [a,b,[c,d],e] = ['aa','bb',[33,44],55]
  // alert(d)
  // let [a,b,,e] = ['aa','bb',[33,44],55]
  // alert(e)
  // let [a,b,,e,f] = ['aa','bb',[33,44],55]
  // alert(f)  // undefined
  // let [a,b,,e,f='hello'] = ['aa','bb',[33,44],55]
  // alert(f)
  // let [a,b,,e,f='hello'] = ['aa','bb',[33,44],55,'ff']
  // alert(f)
  let obj = new Object()
  obj.uid = 111
  obj.uname = '张三'
  obj.arr = ['aa','bb']
  // let {uid:id,uname:name} = obj // 顺序改变无影响
  // alert(name)
  // let uid,uname,arr
  // ({uid,uname} = obj)
  // alert(uname)
  // let uid,uname,arr,a,b
  // ({arr:[a,b]} = obj)
  // alert(a)  // a,b需要定义
  // let uid,uname,arr,a,b,c
  // ({arr:[a,b,c='ccc']} = obj)
  // alert(c)  // 默认值c
  // let [a,b,c,d] = '倚天屠龙'
  // console.log(a,b,c,d)
  analysis(obj)
}
function analysis ({uid,uname}) {
  alert(uid)
  alert(uname)
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
