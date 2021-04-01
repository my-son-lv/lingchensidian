<template>
  <el-container style="height: 100%">
    <el-aside width="220px" class="aside">
      <img class="logo" src="../../assets/image/logo_3.png" @click="handleClickOffice" />
      <div class="user_info">
        <!-- <img
        v-if="user_info.vip > 0"
        :src="../../assets/image/vip.png"
        /> -->
        <img v-if="user_info.vip > 0" src="../../assets/image/vip.png" class="vip_img" />
        <br>
        <img v-if="user_info.logo_path && user_info.logo_path.length > 0" :src="
            user_info.logo_path && user_info.logo_path.length > 0
              ? user_info.logo_path[0].path
              : '../../assets/image/company_logo.png'
          " class="user_img" />
        <img v-if="!(user_info.logo_path && user_info.logo_path.length > 0)" src="../../assets/image/company_logo.png" class="user_img" />

        <div class="user_name">{{ user_info.company_name }}</div>
        <div class="vip_time">{{user_info.vip_exp_time? 'VIP有效期至:' + user_info.vip_exp_time.slice(0,10) :''}}</div>
      </div>

      <div class="aside_content">
        <div class="row" v-on:click="aside_click(index)" v-for="(item, index) in list" :key="index">
          <div class="row_content">
            <div :class="[aside_index == index ? 'active' : '']"></div>
            <img class="img1" :src="aside_index == index ? item.img_s : item.img_u" />
            <span class="t1" :style="{
                color:
                  aside_index == index
                    ? 'rgba(255,255,255,1)'
                    : 'rgba(255,255,255,0.6)',
              }">{{ item.name }}</span>

          </div>
        </div>
      </div>
    </el-aside>
    <el-container>
      <el-header>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="this.list[this.aside_index].path">{{
            this.list[this.aside_index].name
          }}</el-breadcrumb-item>
          <el-breadcrumb-item v-if="this.list[this.aside_index].name !== this.$route.meta.title">{{ this.$route.meta.title }}</el-breadcrumb-item>

          <el-button @click="logout" type="text" class="logout_btn">退出登录</el-button>

          <img v-if="user_info.logo_path && user_info.logo_path.length > 0" :src="
              user_info.logo_path && user_info.logo_path.length > 0
                ? user_info.logo_path[0].path
                : '../../assets/image/company_logo.png'
            " class="right_img" />
          <img v-if="!(user_info.logo_path && user_info.logo_path.length > 0)" src="../../assets/image/company_logo.png" class="right_img" />
          <el-button type="text" class="right_btn" @click="adviser_click">
            <p class="circular" v-show="this.$store.getters.totalUnreadCount > 0"></p>
            在线顾问
          </el-button>

          <!-- <el-button type="text" class="right_icon" icon="el-icon-bell"></el-button> -->
        </el-breadcrumb>
      </el-header>

      <div class="alert">
        <div class="aaa" v-show="alert_flg">
          <img class="alert_img" src="../../assets/image/alert.png" />
          <div class="alert_text">{{ alert_text }}</div>
          <el-button type="text" class="alert_btn" @click="alert_btn_click">{{alert_btn}}</el-button>
        </div>
      </div>

      <el-main>
        <!-- <keep-alive exclude="realTimeCall,ucenter">
          <router-view></router-view>
        </keep-alive> -->
        <router-view></router-view>
        <Index v-show="dialogVisible"></Index>
      </el-main>
    </el-container>
  </el-container>
</template>

<script src="./main.js"></script>
<style src="./main.css" scoped></style>
