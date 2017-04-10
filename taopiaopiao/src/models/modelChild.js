// 模块可以被继承
// 继承modelTest.js中的 webName、url、year、add
export {webName,url,year,add,User,Register} from './modelTest.js'
// 子类中可以写默认 default
export default class Student{
  constructor(){
    console.log('Student被创建了');
  }
}


