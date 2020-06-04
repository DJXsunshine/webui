import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import HotMusic from "../pages/MusicList/HotMusic.vue"
import KingMusic from "../pages/MusicList/KingMusic.vue"
import NewMusic from "../pages/MusicList/NewMusic.vue"
import SingerInfo from "../pages/Singer/SingerInfo.vue"
import MusicPlay from "../pages/MusicPlay.vue"
import Recommend from "../pages/Recommend/Recommend.vue"
import SearchView from "../pages/Search/SearchView.vue"

Vue.use(Router)

export default new Router({
  // history 模式，去除路径的#
  // mode: 'history',
  linkActiveClass:"active",
  routes: [{
      path: '/',
      name: 'Index',
      component: Index,
      redirect:"/hot",
      children: [{
          path: '/hot',
          name: 'HotMusic',
          component: HotMusic
        },
        {
          path: '/new',
          name: 'NewMusic',
          component: NewMusic
        },
        {
          path: '/king',
          name: 'KingMusic',
          component: KingMusic
        }
      ]
    },
    {
      path:"/singer/:singerid",
      name:"SingerInfo",
      component: SingerInfo
    },
    {
      path:"/play/:songid",
      name:"MusicPlay",
      component: MusicPlay
    },
    {
      path:"/recommend/:musictype",
      name:"Recommend",
      component: Recommend
    },
    {
      path:"/search/:searchcontent",
      name:"SearchView",
      component: SearchView
    }
  ]
})
