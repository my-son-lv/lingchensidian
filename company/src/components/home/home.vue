<template>
  <el-container style="height: 100%">
    <el-header height="80px">
      <div class="header">
        <img class="logo" src="../../assets/image/logo_2.png" @click="handleClickOffice"/>
        <el-button type="text" class="sign_out" @click="sign_out()">退出登录</el-button>
        <el-button type="text" class="nickname">
          {{user_info ? user_info.phone : ''}}
          <i class="el-icon-user-solid el-icon--right"></i>
        </el-button>
      </div>
    </el-header>
    <el-container>
      <el-main style="padding: 0">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script src="./home.js"></script>
<style src="./home.css" scoped></style>
