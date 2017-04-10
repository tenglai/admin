<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <input type="file" name="fileInput" id="fileInput" v-on:change="showImg" />
    <img :src="buffer" />
  </div>
</template>

<script>
function arrayBufferToBase64(buffer){
  var binary = '';
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for(var i=0;i<len;i++){
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);  // 返回字符串
}
var thisa;  // 定义一个thisa用于传输
export default {
  name: 'hello',  // 变量的name是hello
  data () {
    studyEs6();
    return {
      buffer:'data:image/png;base64,',
      msg: '欢迎 to Your Vue.js App',
    }
  },
  created () {  // 页面全部渲染完毕后调用
    thisa = this; // 此处的this表示default这个对象，所以可以通过thisa访问buffer
  },
  methods: {  // 定义方法
    showImg: function(){
      var fileInput = document.getElementById('fileInput');
      var file = fileInput.files[0]; // 获取文件对象
      var reader = new FileReader(); // 读取文件
      reader.readAsArrayBuffer(file); // 将reader转为ArrayBuffer对象
      reader.onload = function () {
        var arrayBuffer = reader.result;
        let arrayBase = arrayBufferToBase64(arrayBuffer); // 将arrayBuffer转成字符串
        thisa.buffer = 'data:image/png;base64,' + arrayBase;
      }
    }
  }
}
function studyEs6(){
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
