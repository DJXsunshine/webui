<template>
  <div class="search">
    <div class="search-wrap">
      <!-- <div class="search-bar-left">
        <i class="cancelBtn"></i>
      </div>-->
      <div class="search-bar-center">
        <div class="search-bar">
          <input class="search-bar-input" v-model="searchData" type="search" placeholder="搜索你喜欢的音乐" />
          <i class="search-delete"></i>
        </div>
      </div>
      <div class="search-bar-right">
        <router-link tag="span" :to="{name:'SearchView',params:{searchcontent:searchData}}" @click="searchHandler">搜索</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "search",
  data() {
    return {
      searchData: ""
    };
  },
  components: {},
  methods:{
      searchHandler(event){

      }
  }
};
</script>

<style scoped>
.search-wrap {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  height: 44px;
  background-color: #fff;
}
.search-wrap .search-bar-left {
  width: 30px;
  height: 44px;
  text-align: center;
  line-height: 44px;
}
.search-wrap .search-bar-left .cancelBtn {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-left: 2px solid #848484;
  border-bottom: 2px solid #848484;
  -webkit-transform: rotate(45deg) translate3d(1px, 1px, 0);
  -moz-transform: rotate(45deg) translate3d(1px, 1px, 0);
  -ms-transform: rotate(45deg) translate3d(1px, 1px, 0);
  transform: rotate(45deg) translate3d(1px, 1px, 0);
  margin-left: 14px;
}
.search-wrap .search-bar-center {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1 1;
}
.search-bar {
  background-color: #fff;
  padding: 7px 10px;
  position: relative;
}
.search-bar .search-bar-input {
  padding: 0 30px;
  height: 30px;
  width: 100%;
  background-color: #f8f8f8;
  color: #333;
  font-size: 14px;
  line-height: 30px;
  border-radius: 17px;
  display: inline-block;
  box-sizing: border-box;
}
.search-bar .search-delete,
.search-delete {
  background: url(//static-o2o.360buyimg.com/daojia/react/images/search_bar_sprites.57c20493.png)
    no-repeat;
  background-size: 44px auto;
  background-position: -12px -140px;
}
.search-wrap .search-bar-right {
  position: relative;
  right: 10px;
  width: 42px;
  height: 44px;
  line-height: 44px;
  font-size: 14px;
  color: #333;
  text-align: center;
}
</style>