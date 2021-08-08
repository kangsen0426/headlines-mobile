import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/layout'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/')
  },
  {
    path: '/layout',
    component: () => import('@/views/layout/'),
    redirect: '/home',
    children:[
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/'),
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my/'),
      },
      {
        path: '/question',
        name: 'question',
        component: () => import('@/views/question/'),
      },
      {
        path: '/video',
        name: 'vide',
        component: () => import('@/views/video/'),
      },
      {
        path: '/search',
        name: 'search',
        component: () => import('@/views/search/'),
      },
    
    ]
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    // 将路由动态参数映射到组件的 props 中，更推荐这种做法
    props: true
  }

]

const router = new VueRouter({
  routes
})

export default router
