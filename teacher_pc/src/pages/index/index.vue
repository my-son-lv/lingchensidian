<template>
  <div>
    <div class="header">
      <div class="lside_logo" @click="clickLogo">
        <img src="../../assets/image/login_logo_1.png" class="logo" />
      </div>
      <div class="nav_wrapper">
        <div
          class="nav_item"
          v-for="(nav, index) in navList"
          :key="index"
          @click="getItem(index, nav.path)"
          :class="activeClass == index ? 'actived' : ''"
        >
          {{ nav.value }}
        </div>
      </div>
      <div class="rside_btn_wrapper">
        <div v-if="token">
          <el-dropdown class="show_login" @command="handleCommand">
            <p>
              {{ userInfo.nick_name }}<i class="el-icon-caret-bottom down"></i>
            </p>
            <el-dropdown-menu slot="dropdown" class="dropdown">
              <el-dropdown-item class="dropdown_item" command="resume"
                >My resume</el-dropdown-item
              >
              <el-dropdown-item class="dropdown_item" command="saved"
                >Saved jobs</el-dropdown-item
              >
              <el-dropdown-item class="dropdown_item" command="jobInvites"
                >Job invites</el-dropdown-item
              >
              <el-dropdown-item class="dropdown_item" command="myInvites"
                >My interview</el-dropdown-item
              >
              <el-dropdown-item class="dropdown_item" command="out"
                >Log out</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div v-else class="btn" @click="jumpLogin">Register/Sign In</div>
        <div></div>
      </div>
    </div>
    <router-view @passParent="receiveNavNum"></router-view>
  </div>
</template>
<script>
import { getInfoByToken, logout } from "../../apis/baseUrls";
export default {
  name: "index",
  inject: ["reload"],
  data() {
    return {
      navList: [
        {
          value: "Home",
          path: "/"
        },
        {
          value: "Current Opportunities",
          path: "/jobs"
        },
        {
          value: "Support Service",
          path: "/blog"
        },
        {
          value: "Contact Us",
          path: "/service"
        }
      ],
      activeClass: 0,
      token: "",
      userInfo: {},
      status: ""
    };
  },
  created() {
    this.token = localStorage.getItem("token");
    if (this.token) {
      this.getUserInfo();
    }
  },
  computed: {},
  methods: {
    // 获取用户信息
    async getUserInfo() {
      let res = await getInfoByToken({
        token: this.token
      });
      if (res.data.code == 200) {
        this.userInfo = res.data.data;
        sessionStorage.setItem("name", res.data.data.name);
        this.status = this.userInfo.status;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 导航切换
    getItem(index, path) {
      this.activeClass = index;
      this.$router.push({
        path: path
      });
    },
    receiveNavNum(num) {
      this.activeClass = num;
    },
    // 点击logo
    clickLogo() {
      this.$router.push("/");
      this.activeClass = 0;
    },
    // 跳转登陆
    jumpLogin() {
      this.$router.push("/register");
    },
    // 点击下拉菜单
    async handleCommand(command) {
      if (command == "resume") {
        switch (this.userInfo.status) {
          case 1:
            this.$router.push("/toExaminePage");
            break;
          case 2:
            this.$router.push("/myResume");
            break;
          case 3:
            this.$router.push("/toExaminePage");
            break;
          default:
            this.$router.push("/welcome");
            break;
        }
      } else if (command == "saved") {
        switch (this.userInfo.status) {
          case 1:
            this.$router.push("/toExaminePage");
            break;
          case 2:
            this.$router.push("/savedJobs");
            break;
          case 3:
            this.$router.push("/toExaminePage");
            break;
          default:
            this.$router.push("/welcome");
            break;
        }
      } else if (command == "jobInvites") {
        switch (this.userInfo.status) {
          case 1:
            this.$router.push("/toExaminePage");
            break;
          case 2:
            this.$router.push("/jobInvites");
            break;
          case 3:
            this.$router.push("/toExaminePage");
            break;
          default:
            this.$router.push("/welcome");
            break;
        }
      } else if (command == "myInvites") {
        switch (this.userInfo.status) {
          case 1:
            this.$router.push("/toExaminePage");
            break;
          case 2:
            this.$router.push("/myInterview");
            break;
          case 3:
            this.$router.push("/toExaminePage");
            break;
          default:
            this.$router.push("/welcome");
            break;
        }
      } else if (command == "out") {
        let res = await logout({
          token: this.token
        });
        if (res.data.code == 200) {
          localStorage.clear();
          sessionStorage.clear();
          this.$message.success("Signed out successfully");
          this.$router.push("/");
          this.reload();
        } else {
          this.message.error("Parameter error.");
        }
      }
    }
  }
};
</script>
<style scoped>
.header {
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 1100px;
  height: 80px;
  background: #1f2532;
  z-index: 99;
}
.lside_logo {
  width: 200px;
}
.nav_wrapper {
  display: flex;
  flex: 1;
  justify-content: center;
}
.rside_btn_wrapper {
  padding-right: 40px;
}
.logo {
  margin-left: 40px;
  width: 160px;
  height: 34px;
  cursor: pointer;
}
.nav_item {
  margin-right: 60px;
  height: 32px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
  line-height: 22px;
  cursor: pointer;
}
.btn {
  width: 164px;
  height: 40px;
  background: #ffffff;
  border-radius: 2px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #078ca9;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
}
.actived {
  font-size: 16px !important;
  font-weight: 600 !important;
  color: #ffffff !important;
  border-bottom: 4px solid #ffffff;
}
.rside_btn_wrapper p {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.rside_btn_wrapper .show_login {
  display: flex;
  cursor: pointer;
}
.rside_btn_wrapper .down {
  display: inline-block;
  margin-left: 4px;
  font-size: 16px;
}
.dropdown {
  width: 160px;
  text-align: center;
}
.dropdown_item {
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  border-bottom: 1px solid #eeeeee;
}
</style>
