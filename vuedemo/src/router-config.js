// 引入组件
import activePublic from './page/activePublic/index.vue'
// 引入子页面
import step1 from './page/activePublic/step1.vue'
import step2 from './page/activePublic/step2.vue'
import step3 from './page/activePublic/step3.vue'
import step4 from './page/activePublic/step4.vue'

export default [
  {
    // 配置路由，当路径为'./activePublic',使用组件activePublic
    path: '/activePublic',
    component: activePublic,
    // 配置子路由
    children: [
      // 路径为'/activePublic',使用组件step1
      {path: '', component: step1},
      // 路径为'/activePublic/step1',使用组件step1
      {path: 'step1', component: step1},
      // 路径为'/activePublic/step2',使用组件step2
      {path: 'step2', component: step2},
      {path: 'step3', component: step3},
      {path: 'step4', component: step4}
    ]
  }
]
