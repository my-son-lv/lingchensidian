<template>
  <div class="settle_wrapper">
    <div class="home_wrapper">
      <ul class="lside_nav">
        <li
          class="nav_item"
          v-for="(nav, index) in navList"
          :key="index"
          :class="activeNavClass == index ? 'actived' : ''"
          @click="getNavItem(index)"
        >
          <img
            :src="activeNavClass == index ? nav.activeImgUrl : nav.imgUrl"
            class="lside_icon"
          />
          <span class="lside_con">{{ nav.value }}</span>
        </li>
      </ul>
      <div class="right_con">
        <router-view @passParentNum="receiveNavNum"></router-view>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "settleInHome",
  data() {
    return {
      navList: [
        {
          value: "My resume",
          imgUrl: "/static/images/My resume-Unchecked.png",
          activeImgUrl: "/static/images/My resume-Select.png",
          path: "/myResume"
        },
        {
          value: "Saved jobs",
          imgUrl: "/static/images/Saved jobs-Unchecked.png",
          activeImgUrl: "/static/images/Saved jobs-Select.png",
          path: "/savedJobs"
        },
        {
          value: "Job  invites",
          imgUrl: "/static/images/Job  invites-Unchecked.png",
          activeImgUrl: "/static/images/My resume-Select.png",
          path: "/jobInvites"
        },
        {
          value: "My interview",
          imgUrl: "/static/images/My interview-Unchecked.png",
          activeImgUrl: "/static/images/My interview-Select.png",
          path: "/myInterview"
        }
      ],
      activeNavClass: 0,
    };
  },
  created() {
    this.$emit("passParent", 99);
  },
  computed: {},
  methods: {
    //   导航切换
    getNavItem(index) {
      this.activeNavClass = index;
      this.$router.push(this.navList[index].path);
    },
    receiveNavNum(num) {
      this.activeNavClass = num;
    }
  }
};
</script>
<style scoped>
.settle_wrapper {
  padding-top: 100px;
  background: #f3fafb;
}
.home_wrapper {
  display: flex;
  margin: 0 auto;
  width: 1180px;
  min-height: 870px;
}
.lside_nav {
  margin-right: 20px;
  width: 180px;
}
.lside_nav .nav_item {
  display: flex;
  align-items: center;
  width: 180px;
  height: 40px;
  cursor: pointer;
}
.lside_nav .lside_icon {
  margin: 0 12px;
  width: 15px;
  height: 17px;
}
.lside_nav .lside_con {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
}
.lside_nav .nav_item.actived {
  width: 180px;
  height: 40px;
  background: rgba(7, 140, 169, 0.1);
  border-radius: 10px;
  font-weight: 500;
  color: #078ca9;
}
.home_wrapper .right_con {
  width: 980px;
}
</style>
