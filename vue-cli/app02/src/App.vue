<template>
  <div class="container">
    <div class="header">
      看点咨询精选
      <div type="primary" @click="logout" style="display:inline-block;float:right;">登出</div>
    </div>
    <div class="left">
      <el-menu @select="selectHandler" default-active="Article">
        <el-menu-item index="Article">
          <i class="el-icon-menu"></i>
          <span slot="title">文章管理</span>
        </el-menu-item>
        <el-menu-item index="Category">
          <i class="el-icon-document"></i>
          <span slot="title">栏目管理</span>
        </el-menu-item>
        <el-menu-item index="User">
          <i class="el-icon-s-custom"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
        <el-menu-item index="Comment">
          <i class="el-icon-setting"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="right">
      <div class="wrapper">
        <keep-alive>
          <component :is="currentPage"></component>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Common from "./components/common";
import Article from "./pages/Article";
import Category from "./pages/Category";
import User from "./pages/User";
import Comment from "./pages/Comment";

export default {
  data() {
    return {
      currentPage: "Article"
    };
  },
  components: {
    Article,
    Category,
    User,
    Comment
  },
  methods: {
    selectHandler(index) {
      this.currentPage = index;
    },
    // 退出登录
    logout() {
      $.ajax({
        url: Common.baseUrl + "manager/user/logout",
        method: "post",
        data: {},
        success: res => {
          // 清空浏览器的token
          localStorage.clear();
          // 刷新浏览器
          location.reload();
        }
      });
    }
  }
};
</script>

<style scoped>
.container {
  height: 100%;
  overflow: hidden;
}
/* 头部样式 */
.container .header {
  height: 50px;
  line-height: 50px;
  color: #fff;
  padding: 0 1em;
  background-color: teal;
}
/* 左侧样式 */
.container .left {
  float: left;
  width: 200px;
  height: 100%;
}
/* 右侧样式 */
.container .right {
  height: 100%;
  margin-left: 200px;
  padding: 1em;
}
.container .right .wrapper {
  height: 600px;
  margin: 1em;
  background-color: #ccc;
  border-radius: 5px;
  padding: 1em;
  overflow: auto;
}
</style>
