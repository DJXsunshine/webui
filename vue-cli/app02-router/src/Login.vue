<template>
  <div class="login">
    <h2>看点咨询精选</h2>
    <el-form :model="form" ref="form" label-width="100px">
      <el-form-item label="用户名">
        <el-input type="text" v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.prevent="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import $ from 'jquery';
import Common from './components/common'

export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      $.ajax({
        url: Common.baseUrl+"manager/user/login",
        method: "post",
        // 发送json格式数据
        contentType: "application/json",
        data: JSON.stringify(this.form),
        success: res => {
          vm.token = res.data.token;
          localStorage.setItem("token", this.token);
        }
      });
    }
  }
};
</script>

<style>
</style>