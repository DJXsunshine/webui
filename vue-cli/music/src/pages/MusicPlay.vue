<template>
  <div class="play">
    <div class="header">
      <div class="title">
        <router-link to="/">
          <i class="iconfont icon-shouye left"></i>
        </router-link>
        <div class="music-info">
          <p>{{ playData.songinfo.title }}</p>
          <p class="author">{{ playData.songinfo.author }}</p>
        </div>
        <router-link to="/search">
          <router-link tag="i" to="/" class="iconfont icon-sousuo right"></router-link>
        </router-link>
      </div>
    </div>
    <div class="song-info">
      <div class="song-info-img">
        <img :src="playData.songinfo.pic_big" />
        <div class="song-lrc">
          <LRC
            :currentTime="currentTime"
            :durationTime="durationTime"
            :songid="$route.params.songid"
          />
        </div>
      </div>
      <div class="iconbox">
        <i class="iconfont icon-shoucang2 left"></i>
        <i class="box"></i>
        <i class="iconfont icon-xiazai right"></i>
      </div>
    </div>
    <div class="song">
      <audio ref="player" :src="playData.bitrate.file_link" autoplay controls></audio>
    </div>
  </div>
</template>

<script>
import "../assets/font/iconfont.css";
import LRC from "../components/LRC";
export default {
  name: "play",
  data() {
    return {
      playData: {
        songinfo: {},
        bitrate: {
          file_link: ""
        }
      },
      currentTime: 0, //当前播放时间
      durationTime: 0 //整体的时常
    };
  },
  components: {
    LRC
  },
  mounted() {
    //生命周期函数
    this.addEventListeners();
  },
  beforeDestroy() {
    this.removeEventListeners();
  },
  methods: {
    addEventListeners() {
      this.$refs.player.addEventListener("timeupdate", this._currentTime),
        this.$refs.player.addEventListener("canplay", this._durationTime);
    },
    removeEventListeners: function() {
      this.$refs.player.removeEventListener("timeupdate", this._currentTime);
      this.$refs.player.removeEventListener("canplay", this._durationTime);
    },
    _currentTime() {
      this.currentTime = this.$refs.player.currentTime;
      // currentTime是audio标签提供的获取当前播放时间的方法
    },
    _durationTime() {
      this.durationTime = this.$refs.player.duration;
      // duration是audio标签提供的获得歌曲播放整体时间的方法
    }
  },
  created() {
    const playUrl =
      this.HOST +
      "/v1/restserver/ting?method=baidu.ting.song.play&songid=" +
      this.$route.params.songid;
    this.$axios
      .get(playUrl)
      .then(res => {
        this.playData = res.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style scoped>
.header {
  padding: 15px;
}
.music-info {
  flex: 1;
  font-size: 20px;
}
.title {
  display: flex;
  text-align: center;
}
.left {
  font-size: 30px;
}
.ca {
  color: red;
}
.right {
  font-size: 30px;
}
.song-info {
  padding: 15px;
}
.song-info-img {
  text-align: center;
}
.song-info-img img {
  width: 50%;
  border-radius: 5px;
  box-shadow: 0 0 10px 0 rgba(50, 50, 50, 0.31);
}
.song-lrc {
  margin-top: 10px;
  min-height: 50px;
}
.iconbox {
  display: flex;
  margin-top: 30px;
}
.iconbox .box {
  flex: 1;
}
.song {
  width: 100%;
  text-align: center;
}
.song audio {
  width: 80%;
}
.active {
  color: #222;
}
.author {
  font-size: 12px;
  color: #999;
}
</style>