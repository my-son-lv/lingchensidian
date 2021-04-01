<template>
  <div class="nav_wrapper">
    <div class="nav">
      <img src="../../assets/nav_bar.png" class="nav_bar" @click.stop="showPopup" />
      <img src="../../assets/nav_logo.png" class="logo" @click="handleJumpIndex" />
      <div class="login_btn" @click="handleClickLogin" v-if="this.token == null">Register/Sign In</div>
      <img src="../../assets/user_icon.png" class="user_icon" v-else @click="handleClickLogin" />
    </div>
    <transition name="fade">
      <ul class="left_nav" v-if="this.show" @click.stop="show = false">
        <li class="nav_item" v-for="(item,index) in navList" :key="index" @click="handleClickNav(item.path,index)">
          {{item.value}}
        </li>
      </ul>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showUserIcon: true,
      token: '',
      show: false,
      navList: [
        {
          value: 'Home',
          path: '/index'
        },
        {
          value: 'Current Opportunities',
          path: '/jobs'
        },
        {
          value: 'Blog',
          path: '/blog'
        },
        {
          value: 'Support Service',
          path: '/service'
        },
        {
          value: 'Activity',
          path: 'https://cooperation.apex.link/'
        }
      ]
    }
  },
  created() {
    this.token = localStorage.getItem("token");
  },
  computed: {
  },
  methods: {
    //   跳转登陆
    handleClickLogin() {
      this.$router.push('/register');
    },
    showPopup() {
      this.show = !this.show;
    },
    // 跳转链接
    handleClickNav(path, index) {
      if (index == 4) {
        window.location.href = 'https://cooperation.apex.link/';
      } else {
        this.$router.push(path);
      };
    },
    handleJumpIndex() {
      this.$router.push('/index');
    }
  },
}
</script>
<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 98px;
  background: #1f2532;
  z-index: 99;
}
.nav_bar {
  margin: 0 40px 0 32px;
  width: 48px;
  height: 48px;
}
.logo {
  width: 244px;
  height: 52px;
}
.login_btn {
  margin-left: 114px;
  width: 240px;
  height: 64px;
  background: #ffffff;
  border-radius: 8px;
  font-size: 24px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #078ca9;
  line-height: 64px;
  text-align: center;
}
.user_icon {
  position: absolute;
  right: 32px;
  top: 50%;
  margin-top: -32px;
  width: 64px;
  height: 64px;
}
.left_nav {
  position: fixed;
  left: 0;
  top: 98px;
  width: 500px;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  transition: all 0.3s;
  z-index: 99;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s linear;
  transform: translateX(0);
}
.fade-enter,
.fade-leave {
  transform: translateX(-100%);
}
.fade-leave-to {
  transform: translateX(-100%);
}
.nav_item {
  width: 100%;
  height: 92px;
  background: rgba(216, 216, 216, 0);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 32px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
  line-height: 92px;
  text-align: center;
}
</style>
