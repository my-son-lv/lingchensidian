<template>
  <el-container style="height: 100%">
    <el-header height="60px" style="background-color: rgba(238, 238, 238, 1); padding: 0">
      <div class="head">
        <div class="logo"></div>
        <div class="t1 m1">寰球阿帕斯 | 后台管理中心</div>
        <el-button class="sign_out" type="text" @click="logout" style="margin-right: 20px">退出登录</el-button>
        <!-- <el-button class="sign_out" type="text" @click="create_account">创建账号</el-button> -->
        <el-button class="sign_out" type="text">修改密码</el-button>
        <el-button class="sign_out" type="text" @click="handleLClickMessages">
          <p class="circular" v-if="showMessage"></p>平台通知
        </el-button>
        <el-button type="text" class="sign_out">
          HI, {{ nick_name }}
          <i class="el-icon-user-solid el-icon--right"></i>
        </el-button>
        <div class="platform_news" v-if="showPlatform">
          <h5 class="message_title">
            平台通知
            <img src="../../assets/image/yuan.png" class="yuan" v-if="showMessage" />
            <img src="../../assets/image/sure.png" class="sure_img" @click="handleClickSure" />
          </h5>
          <div class="message_nav">
            <div
              class="message_nav_item"
              v-for="(item,index) in messageNavList"
              :key="index"
              :class="activeClass == index ? 'actived' : ''"
              @click="getItem(index,item.id)"
            >{{item.value}}</div>
          </div>
          <div class="message_wrapper">
            <div
              class="message_con"
              v-for="(msg,index) in messageList"
              :key="index"
              @click="handleClickjump(msg)"
            >
              <p
                class="item_con"
                :class="msg.read_flg == 1 ? 'active_item_con' : ''"
              >{{msg.content}}</p>
              <p class="item_time">{{msg.created_at}}</p>
            </div>
          </div>
          <div class="bottom_wrapper">
            <img
              src="../../assets/image/history.png"
              class="bottom_img"
              @click="handleClickHistory"
            />
          </div>
        </div>
      </div>
    </el-header>

    <el-container>
      <el-aside
        width="220px"
        style="background-color: rgba(242, 242, 242, 1);border-right: 1px solid rgba(210, 210, 210, 2);"
      >
        <div v-for="(item, index) in menu_list" :key="index">
          <div class="aside_mune" v-on:click="item.select = !item.select">
            <img :src="item.image" class="aside_mune_img" />
            <div class="aside_mune_title">{{ item.name }}</div>
            <i
              class="aside_mune_btn"
              :class="[item.select ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"
            ></i>
          </div>

          <div
            v-for="(obj, i) in item.children"
            :key="i"
            class="aside_sub_mune"
            :class="[obj.select ? 'aside_sub_mune_active' : '']"
            v-show="item.select"
            v-on:click="aside_click(item, obj)"
          >
            <div class="aside_sub_mune_title" :class="[obj.select ? 'active' : '']">{{ obj.name }}</div>
            <div class="active_line" v-show="obj.select"></div>
          </div>
        </div>
      </el-aside>

      <el-main style="background-color: rgba(242, 242, 242, 1)" :span="24" :xs="24">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>{{ current_menu.name }}</el-breadcrumb-item>
          <el-breadcrumb-item :to="this.current_obj.path">
            {{
            this.current_obj.name
            }}
          </el-breadcrumb-item>
          <el-breadcrumb-item
            v-if="this.current_obj.name !== this.$route.meta.title"
          >{{ this.$route.meta.title }}</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- <router-view></router-view> -->
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
        <Index v-show="dialogVisible"></Index>
        <!-- </keep-alive> -->
      </el-main>
      <img
        src="/static/images/talk_img.png"
        class="talk_img"
        v-if="this.$store.getters.totalUnreadCount == 0"
        @click="getAllFriendList"
      />
      <img src="/static/images/default_talk.gif" class="talk_img" v-else @click="getAllFriendList" />
    </el-container>
  </el-container>
</template>

<script src="./home.js"></script>
<style src="./home.css" scoped></style>
