// 个人中心
<template>
  <div class="indexContatiner">
    <div class="center_top">
      <div class="clearfix">
        <img
          :src="infoMessage.logo != null ? infoMessage.logo_path[0].path : '/static/images/company_logo.png'"
          class="company_img fl"
        />
        <div class="fl">
          <p class="company_name" v-if="token != ''">
            {{companyName}}
            <img
              src="../../asset/vip_icon.png"
              class="vip_icon"
              v-if="infoMessage.vip == 1"
            />
          </p>
          <p class="company_name" v-else @click="handleClickLogin">登录/注册</p>
          <p class="vip_date" v-if="token != '' && infoMessage.vip == 1">VIP有效期至：{{vip_exp_time}}</p>
        </div>
      </div>
      <div class="num_wrapper">
        <div class="num_item" @click="handleClickCollection">
          <p class="num">{{collect_num}}</p>
          <p class="cont">收藏/备选</p>
        </div>
        <div class="num_item" @click="handClickDropBox">
          <p class="num">{{job_application}}</p>
          <p class="cont">外教投递</p>
        </div>
        <div class="num_item" @click="handleClickDown">
          <p class="num">{{down_num}}</p>
          <p class="cont">下载简历</p>
        </div>
      </div>
      <div class="vip_wrapper">
        <p class="vip_name">VIP 会员卡</p>
        <p class="vip_tips">提升职位曝光，海量外教投递</p>
        <div class="look_btn" @click="handleClickLookVip">查看权益</div>
      </div>
    </div>
    <ul class="center_content">
      <li
        class="con clearfix"
        v-for="(item,index) in contentList"
        :key="index"
        @click="handleClickJump(item.pathUrl,index)"
      >
        <img :src="item.imageUrl" alt class="con_img fl" />
        <p class="item_title fl">{{item.value}}</p>
        <van-icon name="arrow" class="fr" size="20px" color="#999" />
      </li>
    </ul>

    <div class="copy_wrapper clearfix">
      <img src="../../asset/copy_icon.png" class="copy_icon fl" />
      <p class="copy_con fl">邀请码：</p>
      <p class="copy_content fl">{{copy_content}}</p>
      <div class="copy_btn_wrapper fr" @click="handleClickCopy">复制</div>
    </div>

    <div
      v-if="year_xlh" style="margin-top:20px;margin-top: 20px;width: 100%;margin-left: 50px;line-height: 36px;color: #999;">红包封面序列号</div>
    <div class="yqm_list" v-if="year_xlh">
      <div class="yqm_item" v-for="(item,index) in year_xlh" :key="index">
        <img
          src="https://files.apex.link/apexlink/2021020515533445049378.png"
          class="copy_icon fl"
          style="margin-top: 10px;"
        />
        <p class="copy_con fl">序列号：</p>
        <p class="copy_content fl">{{item}}</p>
        <div
          class="copy_btn_wrapper fr"
          @click="handleClickCopyXlh(item)"
          style="margin-top: 10px;"
        >复制</div>
      </div>
    </div>

    <div class="login_mask" v-if="showLoginMask">
      <div class="inner_content">
        <div class="cont_title">
          请登录/注册寰球阿帕斯
          <img
            src="/static/images/close_icon_first.png"
            class="close_img"
            @click="showLoginMask = false"
          />
        </div>
        <div class="con_btn">
          <div class="bottom_btn" @click="handleClickLogin">去登录/注册</div>
        </div>
      </div>
    </div>
    <van-dialog id="van-dialog" />
  </div>
</template>

<script>
import Dialog from "@/../static/vant/dialog/dialog";
export default {
  data() {
    return {
      infoMessage: {},
      contentList: [
        {
          value: "发布职位",
          imageUrl: "/static/images/personnel_icon.png",
          pathUrl: "../../pages/positionManager/main",
        },
        {
          value: "我的权益",
          imageUrl: "/static/images/wai_iccon.png",
          pathUrl: "../../pages/platformData/main",
        },
        {
          value: "账户设置",
          imageUrl: "/static/images/set_icon.png",
          pathUrl: "../../pages/accountSettings/main",
        },
      ],
      showLoginMask: false,
      token: "",
      companyName: "",
      copy_content: "",
      collect_num: "",
      down_num: "",
      job_application: "",
      vip_exp_time: "",
      year_xlh: '',
    };
  },

  components: {},
  methods: {
    async getInfoByToken() {
      let TOKEN = wx.getStorageSync("token");
      const res = await this.$httpWX.post({
        url: "/api/company/getInfoByToken",
        data: {
          token: TOKEN,
        },
      });
      if (res.code == 200) {
        this.infoMessage = res.data;
        this.copy_content = this.infoMessage.code;
        if (res.data.company_name != null) {
          this.companyName = res.data.company_name;
        } else {
          this.companyName = "";
        }
        this.year_xlh = res.data.year_xlh ? res.data.year_xlh.split(",") : "";
        this.collect_num = this.infoMessage.collect_num;
        this.down_num = this.infoMessage.down_num;
        this.job_application = this.infoMessage.job_application;
        this.vip_exp_time = this.infoMessage.vip_exp_time.slice(0, 10);
      }
    },
    handleClickJump(url, index) {
      if (this.infoMessage.status == 0 && index == 0) {
        Dialog.confirm({
          message: "完善企业信息，职位免费发布",
        })
          .then(() => {
            wx.redirectTo({
              url: "../../pages/residenceApplication/main",
            });
          })
          .catch(() => {
            // on cancel
          });
      } else {
        let TOKEN = wx.getStorageSync("token");
        if (TOKEN != "" && TOKEN != null) {
          wx.navigateTo({
            url: url,
          });
        } else {
          this.showLoginMask = true;
        }
      }
    },
    handleClickLogin() {
      wx.redirectTo({
        url: "../../pages/login/main",
      });
    },
    handleClickCopyXlh(text) {
      wx.setClipboardData({
        data: text,
        success(res) {
          wx.getClipboardData({
            success(res) {},
          });
        },
      });
    },
    handleClickCopy() {
      wx.setClipboardData({
        data: this.copy_content,
        success(res) {
          wx.getClipboardData({
            success(res) {
              console.log(res.data);
            },
          });
        },
      });
    },
    handleClickCollection() {
      wx.navigateTo({
        url: "../../pages/alternativeTeacher/main",
      });
    },
    handleClickLookVip() {
      wx.navigateTo({
        url: "../../pages/vipCenter/main",
      });
    },
    handleClickDown() {
      wx.navigateTo({
        url: "../../pages/downloadResume/main",
      });
    },
    handClickDropBox() {
      wx.navigateTo({
        url: "../../pages/dropBox/main",
      });
    },
  },
  beforeMount() {},
  onShow() {
    Object.assign(this.$data, this.$options.data());
    this.token = wx.getStorageSync("token");
    this.getInfoByToken();
  },
};
</script>
<style>
page {
  background: #f5f5f5;
}
</style>
<style scoped>
.indexContatiner {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.clearfix:after {
  content: "";
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
.center_top {
  padding-top: 24px;
  margin-bottom: 8px;
  width: 100%;
  height: 200px;
  background: #ffffff;
}
.company_img {
  margin: 0 16px;
  width: 64px;
  height: 64px;
  background: rgba(255, 255, 255, 1);
  border-radius: 50%;
}
.company_name {
  margin-top: 5px;
  font-size: 20px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.center_content {
  padding: 25px 16px;
  width: 343px;
  background: #ffffff;
}
.center_content .con {
  position: relative;
  margin-bottom: 32px;
}
.center_content .con_img {
  margin-right: 12px;
  width: 24px;
  height: 24px;
}
.con:last-child {
  margin-bottom: 0;
}
.center_content .item_title {
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
}
.login_mask {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
}
.inner_content {
  width: 280px;
  height: 150px;
  background: #ffffff;
  border-radius: 4px;
}
.cont_title {
  position: relative;
  width: 100%;
  height: 54px;
  line-height: 54px;
  background: #ffffff;
  border-bottom: 1px solid #dddddd;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  text-align: center;
}
.bottom_btn {
  margin: 16px auto;
  width: 90%;
  height: 49px;
  background: #078ca9;
  border-radius: 4px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 49px;
  text-align: center;
}
.close_img {
  position: absolute;
  top: 50%;
  right: 16px;
  margin-top: -8px;
  width: 16px;
  height: 16px;
}
.copy_wrapper {
  margin-top: 24px;
  padding: 11px 21px 11px 16px;
  width: 306px;
  height: 27px;
  background: #ffffff;
  border-radius: 30px;
}
.copy_icon {
  margin-right: 15px;
  width: 28px;
  height: 28px;
}
.copy_btn_wrapper {
  width: 60px;
  height: 29px;
  background: #f5f5f5;
  border-radius: 15px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  line-height: 29px;
  text-align: center;
}
.copy_con {
  margin-top: 5px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
}
.copy_content {
  margin-top: 5px;
  width: 120px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.vip_icon {
  display: inline-block;
  width: 20px;
  height: 20px;
}
.vip_date {
  margin-top: 8px;
  width: 151px;
  height: 20px;
  background: rgba(83, 209, 236, 0.1);
  border-radius: 13px;
  font-size: 10px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #53d1ec;
  line-height: 20px;
  text-align: center;
}
.num_wrapper {
  display: flex;
  margin-top: 24px;
  width: 100%;
}
.num_wrapper .num_item {
  flex: 1;
  text-align: center;
}
.num_item .num {
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.num_item .cont {
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
}
.vip_wrapper {
  position: relative;
  margin: 14px auto 0 auto;
  padding-top: 6px;
  width: 92%;
  height: 50px;
  background: url(../../asset/center_bg.png) no-repeat;
  background-size: 100% 100%;
}
.vip_wrapper .vip_name {
  margin-left: 20px;
  font-size: 16px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #fed0a7;
}
.vip_wrapper .vip_tips {
  margin-left: 20px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(254, 208, 167, 0.6);
  line-height: 16px;
}
.vip_wrapper .look_btn {
  position: absolute;
  top: 50%;
  right: 16px;
  margin-top: -14px;
  width: 72px;
  height: 28px;
  background: #ffd0a7;
  border-radius: 14px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #0f0c19;
  line-height: 28px;
  text-align: center;
}
.yqm_list {
  background: white;
  border-radius: 20px;
  /* margin-top: 30px; */
  margin-bottom: 30px;
}
.yqm_item {
  overflow: hidden;
  line-height: 40px;
  padding: 0 12px;
  width: 640rpx;
}
</style>
