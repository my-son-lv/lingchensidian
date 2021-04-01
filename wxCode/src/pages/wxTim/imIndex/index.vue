<template>
  <div class="chat-container">
    <div v-if="token">
      <div class="nav_top">
        <div class="nav_item" v-for="(nav,index) in navList" :key="index" :class="activeClass == index ? 'actived' : ''" @click="getItem(index)">
          {{nav}}
        </div>
        <img src="../../../asset/yuan.png" v-if="showCircular" class="yuan" />
      </div>
      <div v-if="activeClass == 0">
        <div class="set_message" v-if="showSetMessage">
          <h5 class="set_tips">设置消息通知</h5>
          <div class="set_steps">
            <p class="step_item">1.消息回复</p>
            <p class="step_item step_center">2.外教投递</p>
            <p class="step_item">3.面试消息</p>
          </div>
          <div class="btn_wrapper">
            <!-- <div class="lside_btn" @click="showSetMessage = false">暂不接收消息</div> -->
            <!-- <div class="rside_btn" @click="handleClickSetMessage">有消息通知我</div> -->
            <button class="rside_btn" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">有消息通知我</button>
          </div>
        </div>
        <div v-for="(item,index) in allConversation" :key="index">
          <div class="chat" v-if="item.type === 'C2C'" :key="item.conversationID" @click="checkoutConversation(item, item.userProfile.nick || item.userProfile.userID)">
            <div class="avatar-container">
              <i-avatar :src="item.userProfile.avatar || '/static/images/avatar.png'" i-class="avatar" />
            </div>
            <div class="right">
              <div class="information">
                <div class="username">{{item.userProfile.nick || item.userProfile.userID}}</div>
                <div class="content" v-if="!item.lastMessage.isRevoked">{{item.lastMessage.messageForShow}}</div>
                <div class="content" v-else>
                  <div v-if="myInfo.userID === item.lastMessage.fromAccount">你撤回了一条消息</div>
                  <div v-else>{{item.lastMessage.fromAccount}}撤回了一条消息</div>
                </div>
              </div>
              <div class="time">
                <div class="last">{{item.lastMessage._lastTime}}</div>
                <div class="remain" v-if="item.unreadCount > 0">
                  <span v-if="item.unreadCount > 99" class="info">99+</span>
                  <span v-else class="info">{{item.unreadCount}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <scroll-view scroll-y="true" :style="{ height: scrollHeight + 'px' }" @scrolltolower="loadMore">
          <div class="box_content" v-for="(item,index) in dropBoxList" :key="index" @click="handleClickTeacherDetails(item.id, item.mid)" style="margin-top:8px;">
            <div class="cont_top clearfix">
              <p class="lside_name fl">{{item.job_name}}</p>
              <p class="rside_time fr">{{item.created_at}}</p>
            </div>
            <div class="bottom_wrapper">
              <div class="teacher_name">{{item.name}}</div>
              <div class="country">
                {{item.nationality_val}} | {{degree[item.university - 1].code}}
              </div>
              <div class="price_wrapper">
                <p class="year">{{item.working_seniority ? workYearList[item.working_seniority - 1].code : workYearList[2].code }}</p>
                <p class="price">{{item.pay_type ? payList[item.pay_type - 1].code : '' }}</p>
              </div>
              <img v-if="item.photos_path != null" class="rside_img" :src="item.photos_path[0].path" />
              <img v-else class="rside_img" :src="item.sex == 0 ? '/static/images/man.png' : '/static/images/woman.png'" />
            </div>
          </div>
        </scroll-view>
        <div class="empty_month_wrapper" v-if="dropBoxList.length == 0">
          <img class="empty_img" src="../../../asset/interview_empty.png" />
          <h6 class="empty_title">空空如也</h6>
        </div>
      </div>
    </div>
    <div class="empty_month_wrapper" v-else>
      <img class="empty_img" src="../../../asset/interview_empty.png" />
      <h6 class="empty_title">空空如也</h6>
    </div>
    <van-notify id="van-notify" class="van-notify" />
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { throttle } from "../../../utils/index";
import Notify from "@/../static/vant/notify/notify";
export default {
  data() {
    return {
      modalVisible: false,
      conversation: {},
      showEmpty: false,
      navList: ['消息', '新投递'],
      activeClass: 0,
      dropBoxList: [],
      degree: [
        { id: 1, code: "High School Diploma" },
        { id: 2, code: "Associate's Degree" },
        { id: 3, code: "Bachelor's Degree" },
        { id: 4, code: "Master's Degree" },
        { id: 5, code: "MBA" },
        { id: 6, code: "PHD" },
      ],
      workYearList: [
        { id: 1, code: "Less than 1 year" },
        { id: 2, code: "1 years experience" },
        { id: 3, code: "2 years experience" },
        { id: 4, code: "3 years experience" },
        { id: 5, code: "4 years experience" },
        { id: 6, code: "5 years experience" },
        { id: 7, code: "6 years experience" },
        { id: 8, code: "7 years experience" },
        { id: 9, code: "8 years experience" },
        { id: 10, code: "9 years experience" },
        { id: 11, code: "More than 10years" },
      ],
      payList: [
        { id: 1, code: "10k-13k" },
        { id: 2, code: "13k-16k" },
        { id: 3, code: "16k-20k" },
        { id: 4, code: "20k-25k" },
        { id: 5, code: ">25k" },
      ],
      showCircular: false,
      token: '',
      showSetMessage: true,
      scrollHeight: 0,
      finished: false,
      page: 1,
      wxCode: '',
      wxIv: '',
      wxEncryptedData: ''
    };
  },
  computed: {
    ...mapState({
      allConversation: state => state.conversation.allConversation,
      isSdkReady: state => state.global.isSdkReady
    }),
    ...mapGetters(["totalUnreadCount", "myInfo"])
  },
  methods: {
    // 导航切换
    async getItem(index) {
      this.activeClass = index;
      if (index == 1) {
        let TOKEN = wx.getStorageSync("token");
        let res = await this.$httpWX.post({
          url: '/api/company/job/JobAppRead',
          data: {
            token: TOKEN
          }
        });
        if (res.code == 200) {
          console.log('成功');
          this.getDropBox();
        } else {
          Notify({
            type: "warning",
            message: res.msg
          });
        }
      }
    },
    // 获取列表数据
    async getDropBox() {
      let TOKEN = wx.getStorageSync("token");
      let res = await this.$httpWX.post({
        url: '/api/company/job/application',
        data: {
          token: TOKEN,
          type: this.navId,
          page: this.page,
          pageSize: 10
        }
      });
      if (res.code == 200) {
        if (res.data.list.length == 0) {
          this.finished = true;
        } else {
          this.dropBoxList.push(...res.data.list);
          if (res.data.count == this.page) {
            this.finished = true;
          };
          let boxList = this.dropBoxList.filter(ele => ele.read_flg == 1);
          if (boxList.length > 0) {
            this.showCircular = true;
          } else {
            this.showCircular = false;
          }
        };
      } else {
        Notify({
          type: "warning",
          message: res.msg
        });
      }
    },
    // 加载更多
    loadMore() {
      if (this.finished != true) {
        this.page += 1;
        this.getDropBox();
      }
    },
    // 跳转详情
    handleClickTeacherDetails(id, mid) {
      wx.navigateTo({
        url: "../../../pages/teachersDetail/main?id=" + id + "&mid=" + mid,
      });
    },
    // 将某会话设为已读
    setMessageRead(item) {
      if (item.unreadCount === 0) {
        return;
      }
      wx.$app.setMessageRead({
        conversationID: item.conversationID
      });
    },
    // 点击某会话
    checkoutConversation(item, name) {
      this.$store.dispatch("checkoutConversation", item.conversationID);
    },
    // 登录进行初始化
    handleLogin() {
      const userID = wx.getStorageSync("imUSerId");
      if (
        this.myInfo.userID &&
        userID === this.myInfo.userID &&
        this.allConversation.length > 0
      ) {
        return;
      }
      // case2: 当前已经登录了用户，但是和即将登录的用户不一致，则先登出当前登录的用户，再登录
      if (this.myInfo.userID) {
        this.$store.dispatch("resetStore");
        wx.$app.logout().then(() => {
          this.login(userID);
        });
        return;
      }
      // case3: 正常登录流程
      this.login(userID);
    },
    login(userID) {
      wx.$app
        .login({
          userID,
          userSig: wx.getStorageSync("imUSerSig")
        })
        .then(() => { })
        .catch(() => { });
    },
    // 授权
    bindGetUserInfo(e) {
      let that = this;
      if (e.mp.detail.userInfo) {
        wx.login({
          success(res) {
            if (res.code) {
              that.wxCode = res.code;
              console.log(res.code);
              that.wxIv = e.mp.detail.iv;
              that.wxEncryptedData = e.mp.detail.encryptedData;
              that.wxAuthInfo();
            } else {
              console.log('请求失败' + res.errMsg)
            }
          }
        })
        wx.navigateTo({
          url: '../../../pages/wxTim/setMessages/main'
        })
      }
    },
    async wxAuthInfo() {
      let TOKEN = wx.getStorageSync("token");
      let res = await this.$httpWX.post({
        url: '/api/company/wxAuthInfo',
        data: {
          token: TOKEN,
          code: this.wxCode,
          iv: this.wxIv,
          encryptedData: this.wxEncryptedData,
        }
      });
    }
  },
  onShow() {
    Object.assign(this.$data, this.$options.data());
    let self = this;
    wx.getSystemInfo({
      success: function (res) {
        self.scrollHeight = res.windowHeight - 45;
      },
    });
    let TOKEN = wx.getStorageSync("token");
    this.token = TOKEN;
    if (TOKEN != "" && TOKEN != null) {
      this.showEmpty = true;
      this.handleLogin();
      if (!this.isSdkReady) {
        wx.showLoading({ title: "正在同步数据", mask: true });
      }
    };
    this.getDropBox();
  },
  onUnload() { },
  watch: {
    isSdkReady(newVal) {
      if (newVal) {
        wx.hideLoading();
      }
    }
  }
};
</script>
<style>
page {
  background: #f5f5f5;
}
</style>
<style lang='stylus'>
.clearfix:after {
  content: '';
  display: block;
  clear: both;
}

.clearfix {
  zoom: 1;
}

.fl {
  float: left;
}

.fr {
  float: right;
}

.chat-container {
  background-color: $background;
  min-height: 100vh;
  box-sizing: border-box;
  border-bottom: 1px solid $border-base;

  .chat {
    background-color: white;
    box-sizing: border-box;
    display: flex;
    height: 80px;
    border-bottom: 1px solid #EEEEEE;

    &:last-child .right {
      border-bottom: none;
    }

    .avatar-container {
      padding: 16px;
      box-sizing: border-box;

      .avatar {
        width: 48px;
        height: 48px;
        border-radius: 50%;
      }
    }
  }
}

.information {
  display: flex;
  flex-direction: column;
  padding-right: 10px;
  height: 48px;
  width: 60%;
  flex-grow: 1;

  .username {
    margin-bottom: 4px;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .content {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.right {
  padding: 17px 0;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  border-bottom: 1px solid $light-background;
  width: calc(100% - 80px); // 80px 是头像框的宽度
  flex-grow: 1;
}

.time {
  padding-right: 16px;
  display: flex;
  flex-direction: column;
  flex-basis: 100px;
  text-align: right;

  .last {
    font-size: 10px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
  }

  .remain {
    display: flex;
    flex-direction: row-reverse;

    .info {
      margin-top: 10px;
      padding: 2px 7px;
      background: #FF3B30;
      border-radius: 50%;
      font-size: 10px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #FFFFFF;
    }
  }
}

.input {
  text-align: center;
  height: 32px;
  background-color: white;
  border-radius: 8px;
  font-size: 16px;
}

.content-red {
  color: #fb5250;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 80%;
}

.delete {
  color: white;
  font-size: 14px;
  font-weight: 600;
  background-color: #fb5250;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.delete-button {
  text-align: center;
}

.nav_top {
  display: flex;
  padding-left: 16px;
  width: 100%;
  height: 44px;
  background: #FFFFFF;
  border-bottom: 0.5px solid #EEEEEE;
}

.nav_top .nav_item {
  margin-right: 24px;
  height: 40px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  line-height: 40px;
}

.actived {
  font-weight: 700 !important;
  color: #333333 !important;
  border-bottom: 4px solid #078ca9 !important;
}

.set_message {
  margin: 16px auto;
  padding: 12px 0;
  width: 92%;
  height: 98px;
  background: #FFFFFF;
  box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
}

.set_tips {
  margin-bottom: 12px;
  width: 100%;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  text-align: center;
}

.set_steps {
  display: flex;
  justify-content: center;
  margin: 0 auto;
}

.step_item {
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
}

.step_center {
  margin: 0 24px;
}

.btn_wrapper {
  display: flex;
  margin-top: 12px;
}

.btn_wrapper .lside_btn {
  margin: 0 12px;
  width: 154px;
  height: 36px;
  background: #F5F5F5;
  border-radius: 4px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  line-height: 36px;
  text-align: center;
}

.btn_wrapper .rside_btn {
  width: 80%;
  height: 36px;
  background: #F5F5F5;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  border-radius: 4px;
  line-height: 36px;
  text-align: center;
}
.rside_btn::after{
  border: 0;
}

.box_content {
  margin-bottom: 8px;
  width: 100%;
  height: 166px;
  background: #ffffff;
}

.cont_top {
  padding: 0 16px;
  height: 54px;
  line-height: 54px;
  background: #ffffff;
  border-bottom: 1px solid rgba(238, 238, 238, 1);
}

.cont_top .lside_name {
  width: 200px;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cont_top .rside_time {
  font-size: 12px;
  font-family: PingFangSC-Light, PingFang SC;
  font-weight: 300;
  color: #999999;
}

.bottom_wrapper {
  position: relative;
  margin-top: 16px;
  padding-left: 16px;
}

.bottom_wrapper .teacher_name {
  width: 210px;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.bottom_wrapper .country {
  margin: 4px 0 12px 0;
  width: 200px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.bottom_wrapper .price_wrapper {
  display: flex;
}

.price_wrapper .year {
  padding: 0 5px;
  min-width: 58px;
  height: 24px;
  background: #f5f5f5;
  border-radius: 1px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  line-height: 24px;
  text-align: center;
}

.price_wrapper .price {
  margin-left: 8px;
  min-width: 58px;
  height: 24px;
  background: #f5f5f5;
  border-radius: 1px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  line-height: 24px;
  text-align: center;
}

.bottom_wrapper .rside_img {
  position: absolute;
  top: 0;
  right: 16px;
  display: block;
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

.nav_item:nth-child(2) {
  margin-right: 0;
}

.nav_top .yuan {
  margin-top: 1%;
  margin-left: -5px;
  width: 20px;
  height: 20px;
}

.empty_month_wrapper {
  margin-top: 30%;
  text-align: center;
}

.empty_month_wrapper .empty_img {
  width: 130px;
  height: 130px;
}

.empty_title {
  margin: 13px 0 5px 0;
  font-size: 12px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  line-height: 16px;
}
</style>
