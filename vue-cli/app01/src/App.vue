<template>
  <div id="app">
    <BaiduMap></BaiduMap>
    <Echarts></Echarts>
    <Liner></Liner>
    {{msg}}
    <List title="数据列表" v-slot="slot" :data="listData">
      <div>{{slot.scope.id}}</div>
      <div>{{slot.scope.name}}</div>
    </List>
    <button @click="currentPage='Article'">文章管理</button>
    <button @click="currentPage='Category'">栏目管理</button>
    <button @click="currentPage='User'">用户管理</button>
    <keep-alive>
      <component :is="currentPage"></component>
    </keep-alive>
  </div>
</template>

<script>
import List from './components/List'
import Article from './pages/Article'
import Category from './pages/Category'
import User from './pages/User'
import Liner from './components/Liner'

import Echarts from './components/Echarts'

import BaiduMap from './components/BaiduMap'

export default {
  name: 'App',
  data () {
    return {
      msg:'hello vue-cli',
      listData:[{
        id:1,
        name:'军事'
      },{
        id:2,
        name:'爱情'
      },{
        id:3,
        name:'新闻'
      }],
      currentPage:"Article"
    }
  },
  components: {
    List,Article,Category,User,Liner,Echarts,BaiduMap
  }
}
</script>

<style scoped>

</style>
