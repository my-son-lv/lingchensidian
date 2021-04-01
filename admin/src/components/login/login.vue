<template>
  <div class="login_background">
    <div class="content">
      <div class="t1">管理后台登录</div>
      <div class="t2 m1">手机号/邮箱</div>
      <el-input v-model='userinfo.account' placeholder id="i1"></el-input>
      <div class="t2 m1">密码</div>
      <el-input v-model='userinfo.password' placeholder id="i2" show-password></el-input>
      <el-button class="b1" @click="login_in">登录</el-button>
    </div>
  </div>
</template>

<script src="./login.js"></script>
<style src="./login.css" scoped></style>
