<template>
  <div class="recommend">
    <div class="panel hotsongs on" v-loading.fullscreen.lock="fullscreenLoading">
      <vue-data-loading
        :loading="loading"
        :completed="completed"
        :listens="['pull-up']"
        @pull-up="pullUp"
      >
        <ul class="list">
          <router-link
            tag="li"
            :to="{name:'MusicPlay',params:{songid:item.song_id}}"
            class="song"
            v-for="(item,index) in musicData"
            :key="index"
          >
            <div class="poster">
              <img :src="item.pic_big" alt="item.title" />
            </div>
            <div class="info">
              <div class="name">{{item.title}}</div>
              <div class="author">{{item.author}}</div>
            </div>
          </router-link>
        </ul>
      </vue-data-loading>
    </div>
  </div>
</template>

<script>
import VueDataLoading from "vue-data-loading";
export default {
  name: "recommendlist",
  data() {
    return {
      musicData: [],
      loading: false,
      completed: false,
      offsetNum: 0,
      fullscreenLoading: true
    };
  },
  created() {
    this.fetchData();
  },
  props: {
    musictype: {
      type: String,
      default: "1"
    }
  },
  components: {
    VueDataLoading
  },
  methods: {
    fetchData() {
      this.loading = true; //为true加载数据
      const musiclistUrl =
        this.HOST +
        "/v1/restserver/ting?method=baidu.ting.billboard.billList&type=" +
        this.musictype +
        "&size=20&offset=" +
        this.offsetNum;
      this.$axios
        .get(musiclistUrl)
        .then(res => {
          this.musicData = this.musicData.concat(res.data.song_list);
          this.loading = false;
          this.offsetNum += 20;
          this.fullscreenLoading = false;
          //   console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    },
    pullUp() {
      this.fetchData();
    }
  }
};
</script>

<style scoped>
.recommend {
  background-color: #fff;
  margin-top: 10px;
  padding: 10px 17px;
  padding-top: 0;
}
.layout.home .mod-list .panel {
  border-top: 1px solid #eee;
  position: relative;
  top: -1px;
  display: none;
}
.list {
  word-wrap: break-word;
  -webkit-hyphens: auto;
  hyphens: auto;
  word-break: break-all;
  border-bottom: 1px solid #e5e5e5;
  border-top: 1px solid #e5e5e5;
}
.panel .list li {
  height: 55px;
  border-bottom: 1px solid #eee;
  padding-left: 0;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}
.list li.song {
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  min-height: 55px;
  text-align: left;
  margin-top: 10px;
}
.panel .list li .poster {
  position: relative;
  width: 45px;
  margin-right: 8px;
}
.panel .list li .poster img {
  border: 1px solid #eee;
}
.list li .info {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.panel .list li .info .name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 16px;
  color: #333;
}
.panel .list li .info .author {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  color: #999;
  margin-top: 2px;
}
</style>