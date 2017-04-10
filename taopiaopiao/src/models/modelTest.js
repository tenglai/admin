// export var webName = "百度";  // export导出
// export let url = "www.baidu.com";
// export const year = 2016;

// 集体用别名导出，优势是可以集中控制
// var webName = "百度";
// let url = "www.baidu.com";
// const year = 2016;
// export {
//   webName as web,
//   url as webUrl,
//   year as webYear
// }

var webName = "百度";
let url = "www.baidu.com";
const year = 2016;
export{  // 导出变量和常量
  webName,
  url,
  year
}

export function add(a,b){ // 导出一个函数
  return a+b;
}

export class User{ // 导出一个类
  constructor(){
    console.log('user被创建了');
  }
}

// export default class Register{ // default 默认导出值，当没有其他导出，此导出默认为整个模块的导出值
//   constructor(){
//     console.log('Register被创建了');
//   }
// }

// 在父子类继承的过程中，如果父类里面有default,default无效且会报错，如果想要被继承，需要删除父类中的default
export class Register{
  constructor(){
    console.log('Register被创建了');
  }
}
