<template>
  <router-link :to="{name:'SingerInfo',params:{singerid:singerid}}" tag="div" class="card">
    <div class="card-slider">
      <div class="poster">
        <img :src="singerInfo.avatar_big" :alt="singerInfo.name" />
      </div>
    </div>
    <div class="info">
      <div class="name">{{singerInfo.name}}<i v-if="singerInfo.company !== ''">:</i>{{singerInfo.company}}</div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "singerlist",
  data() {
    return {
        singerInfo:{}
    };
  },
  props: {
    singerid: {
      type: String,
      default: "0"
    }
  },
  created() {
    const SingerUrl =
      this.HOST +
      "/v1/restserver/ting?method=baidu.ting.artist.getInfo&tinguid=" +
      this.singerid;
    this.$axios.get(SingerUrl)
    .then(res =>{
        this.singerInfo = res.data;
    })
    .catch(error =>{
        console.log(error);
    })
  }
};
</script>

<style scoped>
.card {
  width: 33.3%;
  float: left;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 0 5px 20px;
}
.card-slider {
  border: 1px solid #eee;
}
.card .poster {
  position: relative;
  height: 0;
  padding-bottom: 100%;
}
.img {
  max-width: 100%;
}
.card .info {
  font-size: 12px;
  overflow: hidden;
  white-space: normal;
  margin-top: 4px;
  line-height: 14px;
  max-height: 28px;
  margin-bottom: 2px;
}
</style>