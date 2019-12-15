import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/views/login'
import index from '@/views/index'
import user from '@/components/user'
import level from '@/components/level'
import shop from '@/components/shop'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: login,
      beforeRouteEnter(to, from, next) {
        // 添加背景色
        document.querySelector('#app').setAttribute('style', 'background-color:#CCFFFF')
        next()
      },
      beforeRouteLeave(to, from, next) {
        // 去除背景色
        document.querySelector('#app').setAttribute('style', '')
        next()
      }
    },
    {
       path:'/index',
       component:index,
      children:[
        {
          path:'user',
          component:user
        },
        {
          path:'level',
          component: level
        },
        {
          path:'shop',
          component: shop
        }
      ]
     }
  ]
})
