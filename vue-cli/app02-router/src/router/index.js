import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/article'
  },
  {
    path: '/article',
    name: 'Article',
    component: () => import(/* webpackChunkName: "group-foo" */ '../pages/Article.vue')
  },
  {
    path: '/category',
    name: 'Category',
    component: () => import(/* webpackChunkName: "group-foo" */ '../pages/Category.vue')
  },
  {
    path: '/comment',
    component: () => import(/* webpackChunkName: "group-foo" */ '../pages/Comment.vue')
  },
  {
    path: '/user',
    component: () => import(/* webpackChunkName: "group-foo" */ '../pages/User.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router