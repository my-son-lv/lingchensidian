// 职位管理
<template>
  <div class="indexContatiner">
    <div class="top_tips">
      <h6 class="tip_tit">想找什么样的外教？</h6>
      <p class="tips_con">发布多条招聘职位，可获得更多精准推荐与外教投递</p>
      <p class="position_num">
        {{ listNum }}
         <!-- /
        <span class="inner_num">{{allListNum}}</span> -->
      </p>
    </div>
    <scroll-view
      scroll-y="true"
      :style="{ height: scrollHeight + 'px' }"
      style="margin-bottom: 100px;"
      @scrolltolower="loadMore"
      v-if="jobListArr.length > 0"
    >
      <div class="list_wrapper clearfix" v-if="jobListArr.length > 0">
        <div
          class="list_content"
          v-for="(list, index) in jobListArr"
          :key="index"
          @click.stop="handleClickToDetails(list.id, index)"
        >
          <div class="list_title">
            <h5 class="list_name">{{ list.name }}</h5>
            <span class="close_con" v-if="list.status == 2">已关闭</span>
          </div>
          <div class="list_details">
            {{ experienceColumns[list.job_year - 1] }} |
            {{ nationalityColumns[list.first_language] }} |
            {{ payList[index].value }}
          </div>
          <ul class="right_btn_wrapper fr">
            <li class="btn_item" @click.stop="handleClickEdit(list.id)">编辑</li>
            <li class="btn_item" @click.stop="handleClickJiPing(list.id)">急聘</li>
            <li class="btn_item" @click.stop="handleClickTop(list.id)" v-if="list.top == 0">置顶</li>
            <li
              class="btn_cancel_item"
              tyle="width:140rpx;"
              @click.stop="handleClickCancelTop(list.id)"
              v-else
            >取消置顶</li>
            <li
              class="btn_item"
              @click.stop="handleClickTuiSong(list.id)"
              style="width:140rpx;"
            >精准推送</li>
            <li
              class="btn_item"
              style="margin-right: 0;"
              @click.stop="handleClickClose(list.id, list.status)"
            >{{ list.status == 1 ? "关闭" : "开启" }}</li>
          </ul>
          <div class="top_wrapper" v-if="list.top == 1">置顶</div>
        </div>
      </div>
      <div class="bottom_tips" v-if="vip == 0">
        您当前可免费发布1个职位，加入会员可发布更多职位
        <p class="tips_left">
          享有更多权益
          <span class="tips_active" @click="handleClickExperience">立即体验</span>
        </p>
      </div>
      <div class="bottom_tips" v-else>
        尊敬的会员，会员期间可免费开启或关闭职位。
        <p class="tips_left">
          升级会员，可发布更多职位
          <span class="tips_active" @click="handleClickExperience">查看权益</span>
        </p>
      </div>
    </scroll-view>
    <div class="empty_img_wrapper" v-else>
      <img class="empty_img" src="../../asset/interview_empty.png" />
      <h6 class="empty_title">空空如也</h6>
      <p class="empty_con">您还没有招聘需求，快去添加一个需求吧</p>
    </div>
    <div class="btn_wrapper">
      <div class="creat_btn" @click.stop="handleClickCreat">添加招聘需求</div>
    </div>
    <van-toast id="van-toast" />
    <van-dialog id="van-dialog" />
    <van-notify id="van-notify" class="van-notify" />
  </div>
</template>

<script>
import moment from "moment";
import Toast from "@/../static/vant/toast/toast";
import Dialog from "@/../static/vant/dialog/dialog";
import Notify from "@/../static/vant/notify/notify";
export default {
  data() {
    return {
      jobListArr: [],
      sexColumns: ["不限", "男", "女"],
      educationColumns: ["本科及以上", "研究生及以上", "博士及以上", "不限"],
      payList: [],
      createdAtList: [],
      activeIndex: -1,
      scrollHeight: 0,
      finished: false,
      page: 1,
      pageSize: 10,
      experienceColumns: ["1年以内", "1-3年", "3-5年", "5-10年", "10年以上"],
      nationalityColumns: ["不限国籍", "母语国家", "非母语国家"],
      listNum: 0,
      allListNum: 0,
      vip: 0,
    };
  },

  components: {},
  methods: {
    async handleClickJiPing(id) {
      let that = this;
      let TOKEN = wx.getStorageSync("token");
      wx.showModal({
        content: "您将发起急聘服务，是否确认使用该功能？",
        success: function (res) {
          if (res.confirm) {
            that.$httpWX
              .post({
                url: "/api/company/job/jiping",
                data: {
                  token: TOKEN,
                  id: id,
                },
              })
              .then((res) => {
                if (res.code == 200) {
                  wx.showModal({
                    content: "您已成功发起急聘服务",
                    icon: "success", //默认值是success,就算没有icon这个值，就算有其他值最终也显示success
                    duration: 1500, //停留时间
                    showCancel: false,
                  });
                } else if (res.code == 2500003) {
                  wx.showModal({
                    content: "升级会员享有更多会员专属权益！",
                    icon: "", //默认值是success,就算没有icon这个值，就算有其他值最终也显示success
                    duration: 1500, //停留时间
                    showCancel: false,
                    success: function (res) {
                      wx.navigateTo({
                        url: "../../pages/vipCenter/main",
                      });
                    },
                  });
                } else if (res.code == 2500002) {
                  wx.showModal({
                    content: "您套餐内的急聘服务已用尽，请联系顾问升级套餐！",
                    icon: "", //默认值是success,就算没有icon这个值，就算有其他值最终也显示success
                    duration: 1500, //停留时间
                    showCancel: false,
                    success: function (res) {
                      wx.navigateTo({
                        url: "../../pages/vipCenter/main",
                      });
                    },
                  });
                } else {
                  wx.showToast({
                    title: res.msg,
                    icon: "", //默认值是success,就算没有icon这个值，就算有其他值最终也显示success
                    duration: 1500, //停留时间
                  });
                }
              });
          }
        },
      });
    },
    handleClickTuiSong(id) {
      let that = this;
      let TOKEN = wx.getStorageSync("token");
      wx.showModal({
        content: "您将发起精准推送服务，是否确认使用该功能？",
        success: function (res) {
          if (res.confirm) {
            that.$httpWX
              .post({
                url: "/api/company/job/jingzhuntuisong",
                data: {
                  token: TOKEN,
                  id: id,
                },
              })
              .then((res) => {
                if (res.code == 200) {
                  wx.showModal({
                    content: "您已成功发起精准推送服务",
                    icon: "success", //默认值是success,就算没有icon这个值，就算有其他值最终也显示success
                    duration: 1500, //停留时间
                    showCancel: false,
                  });
                } else if (res.code == 2500003) {
                  wx.showModal({
                    content: "升级会员享有更多会员专属权益！",
                    icon: "", //默认值是success,就算没有icon这个值，就算有其他值最终也显示success
                    duration: 1500, //停留时间
                    showCancel: false,
                    success: function (res) {
                      wx.navigateTo({
                        url: "../../pages/vipCenter/main",
                      });
                    },
                  });
                } else if (res.code == 2500002) {
                  wx.showModal({
                    content:
                      "您套餐内的精准推送服务已用尽，请联系顾问升级套餐！",
                    icon: "", //默认值是success,就算没有icon这个值，就算有其他值最终也显示success
                    duration: 1500, //停留时间
                    showCancel: false,
                    success: function (res) {
                      wx.navigateTo({
                        url: "../../pages/vipCenter/main",
                      });
                    },
                  });
                } else {
                  wx.showToast({
                    title: res.msg,
                    icon: "", //默认值是success,就算没有icon这个值，就算有其他值最终也显示success
                    duration: 1500, //停留时间
                  });
                }
              });
          }
        },
      });
    },
    // 获取用户信息
    async getInfoByToken() {
      let TOKEN = wx.getStorageSync("token");
      const res = await this.$httpWX.post({
        url: "/api/company/getInfoByToken",
        data: {
          token: TOKEN,
        },
      });
      if (res.code == 200) {
        this.listNum = res.data.yy_job_num;
        this.allListNum = res.data.job_num;
        this.vip = res.data.vip;
      }
    },
    // 获取列表
    async getJobList() {
      let TOKEN = wx.getStorageSync("token");
      const res = await this.$httpWX.post({
        url: "/api/company/job/list",
        data: {
          token: TOKEN,
          page: this.page,
          pageSize: this.pageSize,
        },
      });
      if (res.code == 200) {
        if (res.data.list.length == 0) {
          this.finished = true;
        } else {
          this.jobListArr.push(...res.data.list);
          if (res.data.count == this.page) {
            this.finished = true;
          }
          this.payList = this.jobListArr.map((ele) => {
            return {
              value: ele.pay.replace(",", "-"),
              showType: false,
            };
          });
          this.createdAtList = this.jobListArr.map((ele) =>
            ele.created_at.slice(0, 10)
          );
        }
        this.listNum = res.data.list.length;
      }
    },
    loadMore() {
      if (this.finished != true) {
        this.page += 1;
        this.getJobList();
      }
    },
    // 创建职位
    handleClickCreat() {
      // if (this.listNum == 5) {
      //   Toast("当前只可添加5条招聘需求");
      // } else {
        wx.navigateTo({
          url: "../../pages/createPosition/main",
        });
      // }
    },
    // 详情
    handleClickToDetails(id, index) {
      wx.setStorageSync("detailId", id);
      wx.navigateTo({
        url: "../../pages/editPosition/main",
      });
    },
    // 编辑
    handleClickEdit(id) {
      wx.setStorageSync("detailId", id);
      wx.navigateTo({
        url: "../../pages/editPosition/main",
      });
    },
    // 关闭
    handleClickClose(id, status) {
      if (status == 1) {
        this.closeType = 2;
      } else {
        this.closeType = 1;
      }
      if (status == 1) {
        Dialog.confirm({
          message: "是否关闭招聘需求？关闭后外教端将不再显示",
        })
          .then(() => {
            this.page = 1;
            this.finished = false;
            this.jobListArr = [];
            let TOKEN = wx.getStorageSync("token");
            this.$httpWX
              .post({
                url: "/api/company/job/close",
                data: {
                  id: id,
                  token: TOKEN,
                  type: this.closeType,
                },
              })
              .then((res) => {
                if (res.code == 200) {
                  setTimeout(() => {
                    Toast.success("职位关闭成功");
                  }, 500);
                } else {
                  setTimeout(() => {
                    Toast.fail(res.msg);
                  }, 500);
                }
                this.getJobList();
              });
          })
          .catch(() => {
            // on cancel
          });
      } else {
        Dialog.confirm({
          message: "是否打开招聘需求？打开后外教端将展示该职位",
        })
          .then(() => {
            this.page = 1;
            this.finished = false;
            this.jobListArr = [];
            let TOKEN = wx.getStorageSync("token");
            this.$httpWX
              .post({
                url: "/api/company/job/close",
                data: {
                  id: id,
                  token: TOKEN,
                  type: this.closeType,
                },
              })
              .then((res) => {
                if (res.code == 200) {
                  setTimeout(() => {
                    Toast.success("职位开启成功");
                  }, 500);
                } else {
                  setTimeout(() => {
                    Toast.fail(res.msg);
                  }, 500);
                }
                this.getJobList();
              });
          })
          .catch(() => {
            // on cancel
          });
      }
    },
    // 删除
    async handleClickDelete(id) {
      Dialog.confirm({
        message: " 是否删除招聘需求？ 外教将看不到职位需求",
      })
        .then(() => {
          // on confirm
          let TOKEN = wx.getStorageSync("token");
          this.$httpWX
            .post({
              url: "/api/company/job/del",
              data: {
                id: id,
                token: TOKEN,
              },
            })
            .then((res) => {
              if (res.code == 200) {
                this.page = 1;
                this.finished = false;
                this.jobListArr = [];
                setTimeout(() => {
                  Toast.success("职位删除成功");
                }, 500);
                this.getJobList();
              } else {
                setTimeout(() => {
                  Toast.fail(res.msg);
                }, 500);
              }
            });
        })
        .catch(() => {
          // on cancel
        });
    },
    // 置顶
    handleClickTop(id) {
      let TOKEN = wx.getStorageSync("token");
      this.$httpWX
        .post({
          url: "/api/company/job/top",
          data: {
            id: id,
            type: 1,
            token: TOKEN,
          },
        })
        .then((res) => {
          if (res.code == 200) {
            Dialog.alert({
              message: "是否将职位置顶到外教平台招聘首页，置顶时间为7天",
            }).then(() => {
              this.page = 1;
              this.finished = false;
              this.jobListArr = [];
              this.getJobList();
            });
          } else if (res.code == 2000215) {
            Dialog.confirm({
              message:
                "您当前已用完置顶特权，续费会员可享有更多置顶特权，外教平台优先展示",
            })
              .then(() => {
                wx.navigateTo({
                  url: "../../pages/vipCenter/main",
                });
              })
              .catch(() => {
                // on cancel
              });
          } else if (res.code == 2000216) {
            Dialog.confirm({
              message:
                "您当前不可置顶职位，充值会员可享有置顶特权，外教平台优先展示",
            })
              .then(() => {
                wx.navigateTo({
                  url: "../../pages/vipCenter/main",
                });
              })
              .catch(() => {
                // on cancel
              });
          } else {
            Notify({ type: "warning", message: res.msg });
          }
        });
    },
    // 取消置顶
    handleClickCancelTop(id) {
      Dialog.confirm({
        message: "取消置顶？",
      })
        .then(() => {
          let TOKEN = wx.getStorageSync("token");
          this.$httpWX
            .post({
              url: "/api/company/job/top",
              data: {
                id: id,
                type: 2,
                token: TOKEN,
              },
            })
            .then((res) => {
              if (res.code == 200) {
                this.page = 1;
                this.finished = false;
                this.jobListArr = [];
                Toast.success("取消成功");
                this.getJobList();
              } else {
                Notify({ type: "warning", message: res.msg });
              }
            });
        })
        .catch(() => {
          // on cancel
        });
    },
    handleClickExperience() {
      wx.navigateTo({
        url: "../../pages/vipCenter/main",
      });
    },
  },
  beforeMount() {},
  onShow() {
    Object.assign(this.$data, this.$options.data());
    this.getJobList();
    this.getInfoByToken();
    let self = this;
    wx.getSystemInfo({
      success: function (res) {
        self.scrollHeight = res.windowHeight - 112;
      },
    });
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
.list_wrapper {
  background: #f5f5f5;
  width: 100%;
}
.list_content {
  position: relative;
  margin-bottom: 12px;
  padding: 16px 0 0 16px;
  height: 104px;
  background: rgba(255, 255, 255, 1);
}
.list_title {
  display: flex;
}
.list_content .list_name {
  margin-bottom: 12px;
  max-width: 160px;
  height: 30px;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.list_details {
  margin-bottom: 12px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
}
.plan_time {
  margin-bottom: 8px;
  padding: 4px 8px;
  width: 196px;
  height: 16px;
  background: rgba(245, 245, 245, 1);
  border-radius: 2px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
.creat_time {
  padding: 4px 8px;
  width: 140px;
  height: 16px;
  background: rgba(245, 245, 245, 1);
  border-radius: 2px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
.close_con {
  margin-left: 12px;
  display: block;
  width: 38px;
  height: 20px;
  background: rgba(255, 96, 16, 1);
  border-radius: 2px;
  font-size: 10px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 20px;
  text-align: center;
}
.over_con {
  margin-left: 12px;
  display: block;
  width: 85px;
  height: 20px;
  background: #f5f5f5;
  border-radius: 2px;
  font-size: 10px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  line-height: 20px;
  text-align: center;
}
.right_icon_wrapper {
  position: absolute;
  top: 15px;
  right: 16px;
}
.right_icon_wrapper .img_icon {
  width: 32px;
  height: 32px;
}
.btn_wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 65px;
  border-top: 1px solid #eeeeee;
  background: #fff;
}
.creat_btn {
  margin: 8px auto;
  width: 90%;
  height: 49px;
  background: rgba(7, 140, 169, 1);
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 49px;
  letter-spacing: 1px;
  text-align: center;
}
.operate_wrapper {
  position: absolute;
  top: 46px;
  right: 16px;
  padding: 12px 16px;
  width: 50px;
  height: 108px;
  background: rgba(51, 51, 51, 1);
  border-radius: 4px;
  z-index: 999;
}
.operate_item:nth-child(2) {
  margin: 20px 0;
}
.operate_item .icon {
  margin-right: 6px;
  width: 16px;
  height: 16px;
  vertical-align: middle;
}
.operate_item .cont {
  display: inline-block;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  vertical-align: middle;
}
.empty_img_wrapper {
  margin-top: 30%;
  text-align: center;
}
.empty_img_wrapper .empty_img {
  width: 130px;
  height: 130px;
}
.empty_img_wrapper .empty_con {
  margin: 0 auto;
  width: 169px;
  height: 26px;
  font-size: 9px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  line-height: 13px;
  text-align: center;
}
.top_tips {
  position: relative;
  margin-bottom: 8px;
  width: 100%;
  height: 112px;
  background: #ffffff;
}
.top_tips .tip_tit {
  margin: 24px 0 12px 16px;
  font-size: 24px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.top_tips .tips_con {
  margin-left: 16px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  line-height: 20px;
}
.position_num {
  position: absolute;
  top: 24px;
  right: 16px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
}
.position_num .inner_num {
  color: #999999;
}
.right_btn_wrapper {
  display: flex;
  margin-right: 16px;
}
.right_btn_wrapper .btn_item {
  margin-right: 12px;
  width: 48px;
  height: 24px;
  background: rgba(216, 216, 216, 0);
  border-radius: 4px;
  border: 1px solid #078ca9;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #078ca9;
  line-height: 24px;
  text-align: center;
}
.btn_cancel_item {
  margin-right: 12px;
  width: 68px;
  height: 24px;
  background: rgba(216, 216, 216, 0);
  border-radius: 4px;
  border: 1px solid #078ca9;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #078ca9;
  line-height: 24px;
  text-align: center;
}
.van-notify {
  width: 100%;
}
.bottom_tips {
  margin: 0 16px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  line-height: 22px;
}
.bottom_tips .tips_active {
  color: #53d1ec;
}
.top_wrapper {
  position: absolute;
  top: 0;
  right: 0;
  width: 32px;
  height: 20px;
  background: #c4df16;
  border-radius: 0px 0px 0px 8px;
  font-size: 10px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 20px;
  text-align: center;
}
</style>
