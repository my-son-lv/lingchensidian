// 外教详情
<template>
  <div class="indexContatiner">
    <div class="teacher_top">
      <img
        :src="allTeacherMessages.photos_path.path"
        class="teacher_img"
        v-if="allTeacherMessages.photos_path != null"
      />
      <img
        :src="allTeacherMessages.sex == 0 ? '/static/images/man.png' : '/static/images/woman.png'"
        class="teacher_img"
        v-else
      />
      <h3 class="teacher_name">{{allTeacherMessages.name}}</h3>
      <p
        class="con"
        style="width:62%;"
      >{{allTeacherMessages.sex == 0 ? 'Male' : 'Female'}} | {{allTeacherMessages.nationality_val != null ? allTeacherMessages.nationality_val.code : ''}} | {{ageValue}} | {{degree[allTeacherMessages.university - 1]}} | {{workYearList[allTeacherMessages.working_seniority - 1]}}</p>
      <div class="moeny">{{payList[allTeacherMessages.pay_type - 1]}}</div>
      <div class="line"></div>
      <div class="message_wrapper clearfix" v-if="allTeacherMessages.desc">
        <h4 class="title" style="margin-top: 20px;">Personal Statement</h4>
        <div class="desc" style="line-height: 24px;">{{allTeacherMessages.desc}}</div>
      </div>
      <div class="tacher_photo">
        <video
          :src=" allTeacherMessages.videos_path ? allTeacherMessages.videos_path.path : '' "
          controls="controls"
          class="photo"
        ></video>
      </div>
    </div>

    <div class="basic_wrapper" style="margin:10px 0;padding:0 16px;">
      <h4 class="title">Basic Information</h4>
      <div class="message_wrapper clearfix">
        <p class="message_title fl">Tel：</p>
        <p
          class="message_content fr"
          v-if="allTeacherMessages.phone != null"
        >{{ allTeacherMessages.area_code ? '+' + allTeacherMessages.area_code : ''}}{{ allTeacherMessages.phone}}</p>
        <img src="../../asset/phone_mohu.png" class="phone_img fr" v-else />
      </div>
      <div class="message_wrapper clearfix">
        <p class="message_title fl">E-mail：</p>
        <p
          class="message_content fr"
          v-if="allTeacherMessages.email != null"
        >{{allTeacherMessages.email}}</p>
        <img src="../../asset/email_mohu.png" v-else class="email_img fr" />
      </div>
      <div class="message_wrapper clearfix">
        <p class="message_title fl">{{mediaList[allTeacherMessages.comm_type - 1]}}</p>
        <p
          class="message_content fr"
          v-if="allTeacherMessages.wechat != null"
        >{{allTeacherMessages.wechat}}</p>
        <img src="../../asset/email_mohu.png" v-else class="email_img fr" />
      </div>

      <div
        class="message_wrapper clearfix"
        v-if="(allTeacherMessages.china_address_city_data != null || allTeacherMessages.country_val != null) && (allTeacherMessages.phone != null || allTeacherMessages.email != null)"
      >
        <p class="message_title fl">Current Location：</p>
        <p
          class="message_content fr"
        >{{allTeacherMessages.country_val != null ? allTeacherMessages.country_val.code : allTeacherMessages.china_address_city_data.city_data.pinyin}}</p>
      </div>
      <div class="message_wrapper clearfix">
        <p class="message_title fl">Highest Degree：</p>
        <p class="message_content fr">{{degree[allTeacherMessages.university - 1]}}</p>
      </div>
      <div class="message_wrapper clearfix" v-if="certList.length != 0">
        <p class="message_title fl">Teaching Certificate</p>
        <p class="message_content fr">
          <span
            v-for="(item,index) in certList"
            :key="index"
          >{{ (certList.length-1) != index ? item+'，':item }}</span>
        </p>
      </div>
    </div>
    <div class="basic_wrapper">
      <h4 class="title">Work Intention</h4>
      <div class="message_wrapper clearfix" v-if="allTeacherMessages.work_flg != null">
        <p class="message_title fl">Work Status</p>
        <p
          class="message_content fr"
        >{{allTeacherMessages.work_flg == 0 ? 'Unemployed' : 'Employed'}}</p>
      </div>
      <div
        class="message_wrapper clearfix"
        v-if="allTeacherMessages.job_type != null && (allTeacherMessages.phone != null || allTeacherMessages.email != null)"
      >
        <p class="message_title fl">Job Type</p>
        <p
          class="message_content fr"
        >{{ allTeacherMessages.job_type == 3 ? "Offline，Online" : (allTeacherMessages.job_type == 1 ? 'Offline' : 'Online' ) }}</p>
      </div>
      <div class="message_wrapper clearfix" v-if="allTeacherMessages.job_work_type">
        <p class="message_title fl">Job Category</p>
        <p
          class="message_content fr"
        >{{ allTeacherMessages.job_work_type == 0 ? "Full-time，Part-time" : (allTeacherMessages.job_work_type ==1 ? 'Part-time' : 'Full-time') }}</p>
      </div>
      <div class="message_wrapper" v-if="allTeacherMessages.working_city_datas">
        <p class="school_title">Preferred Job Locations</p>
        <div style="display:flex;">
          <div
            class="message_content school_item school_item2"
            v-for="(item,index) in allTeacherMessages.working_city_datas"
            :key="index"
          >{{item.city_data.pinyin}}</div>
        </div>
      </div>
      <div class="message_wrapper" v-if="schoolList.length != 0">
        <p class="school_title">Preferred Type of school</p>
        <p
          class="message_content school_item school_item1"
          v-for="(item,index) in schoolList"
          :key="index"
        >{{item}}</p>
      </div>
      <div
        class="message_wrapper"
        v-if="ageList.length > 0"
        style="overflow: hidden;margin-bottom: 20px;"
      >
        <p class="school_title">Age of Students</p>
        <div v-for="(item,index) in ageList" :key="index">
          <div class="ageItem">{{ item }} years old</div>
        </div>
      </div>
    </div>

    <div class="basic_wrapper" v-if="allTeacherMessages.work.length">
      <h4 class="title">Work Experience</h4>
      <div
        class="message_content school_item"
        v-for="(item,index) in allTeacherMessages.work"
        :key="index"
        style="padding: 0 16px;margin-top: 24px;"
      >
        <div class="major_wrapper clearfix">
          <div
            class="rside_con fl"
            style="font-weight: 500;font-size: 16px;width: 64%;"
          >{{item.company_name}}</div>
          <div
            v-if="item.start_time"
            class="lside_title fr"
            style="margin-bottom: 6px;"
          >{{item.start_time + '-' + (item.end_time && item.now == 1 ? item.end_time : 'Present')}}</div>
        </div>
        <div class="conent_inner clearfix" style="margin-top: 0px;">
          <p
            class="lside_title"
            style="margin-bottom: 0; display: inline-block;margin-right: 5px;color: #666666;font-size: 14px;"
          >Position:</p>
          <p
            class="lside_title"
            style="display: inline-block;color: #666666;font-size: 14px;"
          >{{item.position}}</p>
        </div>
        <div class="position_desc clearfix" v-if="item.work_desc">
          <p class="message_content" style="line-height: 26px;">{{item.work_desc}}</p>
        </div>
      </div>
    </div>

    <div class="basic_wrapper" v-if="education">
      <h4 class="title">Education Background</h4>
      <div
        class="education_wrapper"
        v-for="(item,index) in education"
        :key="index"
        style="padding: 0 16px;margin-top: 24px;margin-bottom:24px;"
      >
        <div class="major_wrapper clearfix">
          <p
            class="lside_title fl"
            style="width:64%;margin-bottom: 4px;color: #000;font-weight: 500;"
          >University:{{item.school}}</p>
          <p
            class="lside_title fr"
            style="margin-bottom: 0;"
          >{{item.edu_start_time + '-' + item.edu_end_time}}</p>
        </div>
        <div class="major_wrapper clearfix">
          <p class="lside_title fl" style="margin-bottom: 0;">Major:{{item.major}}</p>
        </div>
      </div>
    </div>

    <div class="basic_wrapper" v-if="certList.length> 0 || allTeacherMessages.visa_type">
      <h4 class="title">Other</h4>
      <div class="message_wrapper clearfix" v-if="certList.length != 0">
        <p class="message_title fl">Teaching Certificate</p>
        <p class="message_content fr">
          <span
            v-for="(item,index) in certList"
            :key="index"
          >{{ (certList.length-1) != index ? item+'，':item }}</span>
        </p>
      </div>
      <div class="message_wrapper clearfix" v-if="allTeacherMessages.visa_type">
        <p class="message_title fl">Visa Type</p>
        <p class="message_content fr">{{visaList[allTeacherMessages.visa_type - 1]}}</p>
      </div>
    </div>

    <div class="footer_wrapper">
      <div class="lside_wrapper" @click="handleClickCollection">
        <img
          :src="allTeacherMessages.collect_flg ? '/static/images/shoucang_icon.png' : '/static/images/moren_icon.png'"
          class="shoucang_icon"
        />
        <p class="con">{{allTeacherMessages.collect_flg ? '已收藏' : '收藏'}}</p>
      </div>
      <div class="rside_wrapper">
        <button open-type="share" class="share_btn"></button>
        <img src="/static/images/share_icon.png" class="shoucang_icon" />
        <p class="con">分享</p>
      </div>
      <div
        class="down_btn"
        @click="handleClickDown"
        v-if="allTeacherMessages.category == 1 && allTeacherMessages.email == null"
      >下载简历</div>
      <div
        :class="allTeacherMessages.category == 2 || allTeacherMessages.email != null ? 'hide_down_btn' : ''"
        class="btn_wrapper"
        @click="handleClickReserveInterview"
        v-if="allTeacherMessages.interview_status >= 6 || allTeacherMessages.interview_status == null && allTeacherMessages.sign_flg == 1"
      >预约面试</div>
      <div
        :class="allTeacherMessages.category == 2 || allTeacherMessages.email != null ? 'hide_down_btn' : ''"
        class="btn_last_wrapper"
        v-else-if="allTeacherMessages.interview_status < 6 && allTeacherMessages.sign_flg == 1"
      >{{statusList[allTeacherMessages.interview_status]}}</div>
      <div
        :class="allTeacherMessages.category == 2 || allTeacherMessages.email != null ? 'hide_down_btn' : ''"
        class="btn_last_wrapper"
        v-else
      >已签约</div>
    </div>
    <van-popup :show="showWorkPicker" overlay position="bottom">
      <van-picker
        title="选择职位"
        show-toolbar
        :columns="workColumns"
        @confirm="onWorkConfirm"
        @cancel="hideWorkPicker"
      />
    </van-popup>
    <van-popup :show="showDatePicker" overlay position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择日期"
        :min-date="minDate"
        @confirm="onDateConfirm"
        @cancel="hideDatePicker"
      />
    </van-popup>
    <van-popup :show="showTimePicker" overlay position="bottom">
      <van-datetime-picker
        v-model="currentTime"
        type="time"
        title="选择时间"
        @confirm="onTimeConfirm"
        @cancel="hideTimePicker"
      />
    </van-popup>
    <van-toast id="van-toast" />
    <van-notify id="van-notify" class="van-notify" />
    <van-dialog id="van-dialog" />
  </div>
</template>

<script>
import Toast from "@/../static/vant/toast/toast";
import Notify from "@/../static/vant/notify/notify";
import Dialog from "@/../static/vant/dialog/dialog";
import moment from "moment";
export default {
  data() {
    return {
      teacherId: "",
      teacherMid: "",
      allTeacherMessages: {},
      ageValue: "",
      degree: [
        "High School Diploma",
        "Associate's Degree",
        "Bachelor's Degree",
        "Master's Degree",
        "MBA",
        "PHD",
      ],
      workYearList: [
        "Less than 1 year",
        "1 years",
        "2 years",
        "3 years",
        "4 years",
        "5 years",
        "6 years",
        "7 years",
        "8 years",
        "9 years",
        "More than 10years",
      ],
      payList: ["10k-13k", "13k-16k", "16k-20k", "20k-25k", ">25k"],
      jobTypeList: ["Any", "Offline", "Online"],
      jobWorkTypeList: ["Any", "Full-time", "Part-time"],
      visaList: ["Z", "M", "F", "X", "others"],
      teacherStatus: "",
      jobFlg: "",
      sign_flg: "",
      allWorkColumns: [],
      workColumns: [],
      showWorkPicker: false,
      showDatePicker: false,
      showTimePicker: false,
      minDate: new Date().getTime(),
      currentDate: new Date().getTime(),
      currentTime: "12:00",
      chooseWorkId: "",
      dataValue: "",
      timeValue: "",
      statusList: [
        "已约面",
        "待面试",
        "面试中",
        "待签约",
        "已录用",
        "未通过",
        "已结束",
        "已取消",
        "已过期",
        "已拒绝",
      ],
      mediaList: ["Wechat", "Skype", "WhatsApp", "Instagram"],
      schoolTypeList: [
        {
          value: "Training Center",
          id: 1,
        },
        {
          value: "International Kindergarten",
          id: 2,
        },
        {
          value: "International School",
          id: 3,
        },
        {
          value: "Public School",
          id: 4,
        },
        {
          value: "Online Class",
          id: 5,
        },
        {
          value: "Others",
          id: 6,
        },
      ],
      schoolList: [],
      studentAgeList: [
        { value: "0-3", id: 1 },
        { value: "3-6", id: 2 },
        { value: "7-12", id: 3 },
        { value: "13-18", id: 4 },
        { value: "18+", id: 5 },
      ],
      ageList: [],
      education: [],
      certList: [],
      vipCode: "",
    };
  },

  components: {},

  methods: {
    // token获取信息
    async getInfoByToken() {
      let TOKEN = wx.getStorageSync("token");
      const res = await this.$httpWX.post({
        url: "/api/company/getInfoByToken",
        data: {
          token: TOKEN,
        },
      });
      if (res.code == 200) {
        this.teacherStatus = res.data.status;
        this.jobFlg = res.data.job_flg;
        this.sign_flg = res.data.sign_flg;
        this.vipCode = res.data.vip;
      }
    },
    // 获取信息
    async getTeacherDesc() {
      let TOKEN = wx.getStorageSync("token");
      let res = await this.$httpWX.post({
        url: "/api/company/teachDesc",
        data: {
          id: this.teacherId,
          token: TOKEN,
        },
      });
      if (res.code == 200) {
        this.allTeacherMessages = res.data;
        this.ageValue = moment().format("YYYY") - res.data.brithday.slice(0, 4);
        if (this.allTeacherMessages.school_type) {
          let schoolListArr = res.data.school_type.split(",").map(Number);
          this.schoolTypeList.forEach((ele) => {
            let menuId = schoolListArr.find((item) => item == ele.id);
            if (menuId) {
              this.schoolList.push(ele.value);
            }
          });
        }
        if (this.allTeacherMessages.student_age) {
          let ageListArr = res.data.student_age.split(",").map(Number);
          this.studentAgeList.forEach((ele) => {
            let menuId = ageListArr.find((item) => item == ele.id);
            if (menuId) {
              this.ageList.push(ele.value);
            }
          });
        }
        this.education = res.data.education;
        if (res.data.edu_cert_flg == 1) {
          this.certList.push("TEFL");
        }
        if (res.data.edu_auth_flg == 1) {
          this.certList.push("TESOL");
        }
        if (res.data.celta_flg == 2) {
          this.certList.push("CELTA");
        }
        if (res.data.cert_other_flg == 2) {
          this.certList.push("Others");
        }
      }
    },
    // 预约面试
    async handleClickReserveInterview() {
      if (this.vipCode == 0) {
        Dialog.confirm({
          message: "您需要办理寰球会员才可进行面试",
        })
          .then(() => {
            wx.navigateTo({
              url: "../../pages/vipCenter/main",
            });
          })
          .catch(() => {});
        return;
      }
      if (this.teacherStatus == 0) {
        Dialog.confirm({
          message: "入驻平台填写招聘需求即可预约面试",
        })
          .then(() => {
            wx.navigateTo({
              url: "../../pages/residenceApplication/main",
            });
          })
          .catch(() => {});
      } else if (this.teacherStatus == 1 && this.jobFlg == 0) {
        Dialog.confirm({
          message: "请先添加招聘需求哦",
        })
          .then(() => {
            wx.navigateTo({
              url: "../../pages/createPosition/main",
            });
          })
          .catch(() => {});
      } else if (this.teacherStatus == 1 && this.jobFlg > 0) {
        Dialog.confirm({
          message: "请等待审核后预约面试哦",
        })
          .then(() => {})
          .catch(() => {});
      } else if (this.teacherStatus == 2) {
        let TOKEN = wx.getStorageSync("token");
        const res = await this.$httpWX.post({
          url: "/api/company/job/list",
          data: {
            token: TOKEN,
            page: 1,
            pageSize: 10,
          },
        });
        if (res.code == 200) {
          this.allWorkColumns = res.data.list;
          if (this.allWorkColumns.length > 0) {
            let filterArr = this.allWorkColumns.filter(
              (ele) => ele.status != 2
            );
            this.workColumns = filterArr.map((item) => item.name);
            if (this.workColumns.length == 0) {
              Dialog.alert({
                message:
                  "您的职位需求已关闭，预约面试请先去开启职位需求或发布新的招聘需求",
              })
                .then(() => {
                  wx.navigateTo({
                    url: "../../pages/positionManager/main",
                  });
                })
                .catch(() => {
                  // on cancel
                });
            } else {
              this.showWorkPicker = true;
            }
          } else {
            Dialog.alert({
              message:
                "欢迎加入寰球阿帕斯之旅，请前往设置您的招聘需求，让我们更精准的为您服务",
            }).then(() => {
              wx.navigateTo({
                url: "../../pages/createPosition/main",
              });
            });
          }
        } else {
          Notify({ type: "warning", message: res.msg });
        }
      } else if (this.teacherStatus == 3) {
        Dialog.confirm({
          message: "请重新提交驻资料进行预约面试哦",
        })
          .then(() => {
            wx.navigateTo({
              url: "../../pages/findingsOfAudit/main",
            });
          })
          .catch(() => {
            // on cancel
          });
      }
    },
    onWorkConfirm(event) {
      let idx = event.mp.detail.index;
      this.chooseWorkId = this.allWorkColumns[idx].id;
      this.showWorkPicker = false;
      this.showDatePicker = true;
    },
    hideWorkPicker() {
      this.showWorkPicker = false;
    },
    // 日期确认按钮
    onDateConfirm(event) {
      this.dataValue = moment(parseInt(event.mp.detail)).format("YYYY-MM-DD");
      this.showDatePicker = false;
      this.showTimePicker = true;
    },
    // 日期取消按钮
    hideDatePicker() {
      this.showDatePicker = false;
    },
    // 时间确认按钮
    async onTimeConfirm(event) {
      this.timeValue = event.mp.detail;
      let TOKEN = wx.getStorageSync("token");
      const res = await this.$httpWX.post({
        url: "/api/company/inerview/invite",
        data: {
          token: TOKEN,
          mid: this.teacherMid,
          time: this.dataValue + " " + this.timeValue,
          jid: this.chooseWorkId,
        },
      });
      if (res.code == 200) {
        Toast.success("预约成功");
        this.showTimePicker = false;
        this.getTeacherDesc();
      } else {
        Notify({
          type: "warning",
          message: res.msg,
        });
      }
      this.showTimePicker = false;
    },
    // 时间取消按钮
    hideTimePicker() {
      this.showTimePicker = false;
    },
    // 收藏
    async handleClickCollection() {
      let TOKEN = wx.getStorageSync("token");
      const res = await this.$httpWX.post({
        url: "/api/company/collect",
        data: {
          token: TOKEN,
          type: 1,
          class: this.allTeacherMessages.collect_flg + 1,
          mid: this.teacherMid,
        },
      });
      if (res.code == 200) {
        this.allTeacherMessages.collect_flg = !this.allTeacherMessages
          .collect_flg;
        setTimeout(() => {
          Toast.success(
            this.allTeacherMessages.collect_flg
              ? "加入收藏成功"
              : "取消收藏成功"
          );
        }, 500);
        this.getTeacherDesc();
      } else {
        Notify({ type: "warning", message: res.msg });
      }
    },
    // 下载简历
    async handleClickDown() {
      let TOKEN = wx.getStorageSync("token");
      let res = await this.$httpWX.post({
        url: "/api/company/teach/downNotes",
        data: {
          token: TOKEN,
          id: this.teacherMid,
        },
      });
      if (res.code == 200) {
        Toast.loading({
          message: "正在下载",
          forbidClick: true,
          onClose: () => {
            Toast.success("下载成功");
          },
        });
        this.allTeacherMessages = res.data;
      } else {
        if (res.code == 2000212 || res.code == 2000213) {
          Dialog.confirm({
            message: "您下载简历的额度已用完，充值会员下载更多",
          })
            .then(() => {
              wx.navigateTo({
                url: "../../pages/vipCenter/main",
              });
            })
            .catch(() => {});
        } else if (
          res.code == 1000200 ||
          res.code == 1000201 ||
          res.code == 1000202
        ) {
          Dialog.confirm({
            message: "您当前未登录，是否登录？",
          })
            .then(() => {
              wx.navigateTo({
                url: "../../pages/login/main",
              });
            })
            .catch(() => {
              // on cancel
            });
        } else {
          wx.showToast({
            title: res.msg,
            icon: "none",
            duration: 2000,
          });
        }
      }
    },
  },
  beforeMount() {},
  onShow() {},
  onLoad(options) {
    Object.assign(this.$data, this.$options.data());
    this.teacherId = options.id;
    this.teacherMid = options.mid;
    this.getTeacherDesc();
    this.getInfoByToken();
  },
  onShareAppMessage() {
    var that = this;
    return {
      title: "分享页面",
      path: "/pages/teacherShare/main?id=" + that.teacherId,
    };
  },
  onUnload() {},
};
</script>
<style>
page {
  background: #f5f5f5;
}
button::after {
  border: none;
}
</style>
<style scoped>
.indexContatiner {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f8f8f8;
  margin-bottom: 72px;
}
.teacher_top {
  position: relative;
  padding-top: 16px;
  width: 100%;
  min-height: 80px;
  background: #fff;
}
.teacher_top .teacher_name {
  width: 280px;
  margin-bottom: 8px;
  margin-left: 16px;
  font-size: 24px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  line-height: 32px;
}
.teacher_top .con {
  margin-bottom: 15px;
  margin-left: 16px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
}
.teacher_top .line {
  margin: 10px auto;
  width: 95%;
  height: 1px;
  background: #eeeeee;
}
.teacher_top .teacher_img {
  position: absolute;
  top: 10px;
  right: 16px;
  width: 64px;
  height: 64px;
  background: #d8d8d8;
  border-radius: 50%;
}
.desc {
  /* padding: 16px; */
  margin-top: 20px;
  width: 343px;
  background: #fff;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  line-height: 18px;
}
.tacher_photo {
  padding: 0 16px 16px 16px;
  background: #fff;
  margin-top: 20px;
}
.photo {
  width: 343px;
  height: 343px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}
.basic_wrapper {
  margin: 8px 0;
  width: 100%;
  background: #fff;
}
.basic_wrapper .title {
  margin: 16px;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.message_wrapper {
  padding: 0 16px;
}
.message_wrapper .message_title,
.major_wrapper .lside_title,
.education_wrapper .date_time {
  margin-bottom: 16px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
}
.school_title {
  margin-bottom: 10px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
}
.message_wrapper .message_content,
.major_wrapper .rside_con {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
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
.footer_wrapper {
  display: flex;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 375px;
  height: 64px;
  background: #ffffff;
  box-shadow: 0px 0px 0px 0px rgba(238, 238, 238, 1);
}
.last_cont {
  margin-bottom: 74px;
}
.lside_wrapper {
  margin: 11px 32px 0 23px;
  text-align: center;
}
.lside_wrapper .shoucang_icon {
  width: 24px;
  height: 24px;
}
.lside_wrapper .con {
  font-size: 10px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
}
.rside_wrapper {
  position: relative;
  margin: 11px 32px 0 0;
  text-align: center;
}
.rside_wrapper .shoucang_icon {
  width: 24px;
  height: 24px;
}
.rside_wrapper .con {
  font-size: 10px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
}
.btn_wrapper {
  margin-top: 8px;
  width: 106px;
  height: 49px;
  background: #078ca9;
  border-radius: 4px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 49px;
  text-align: center;
}
.btn_last_wrapper {
  margin-top: 8px;
  width: 106px;
  height: 49px;
  background: rgba(7, 140, 169, 0.2);
  border-radius: 4px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 49px;
  text-align: center;
}
.van-notify {
  width: 100%;
}
.share_btn {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0);
}
.school_item {
  margin-bottom: 10px;
}
.down_btn {
  margin-top: 8px;
  margin-right: 12px;
  width: 106px;
  height: 49px;
  background: #53d1ec;
  border-radius: 4px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 49px;
  text-align: center;
}
.hide_down_btn {
  width: 225px !important;
}
.phone_img {
  width: 94px;
  height: 20px;
}
.email_img {
  width: 109px;
  height: 20px;
}
.comment_wrapper {
  margin: 16px auto;
  display: flex;
  align-items: center;
  width: 92%;
  height: 48px;
  background: #f5f5f5;
  border-radius: 4px;
}
.comment_wrapper .comment_icon {
  margin: 0 7px 0 15px;
  width: 16px;
  height: 16px;
}
.comment_wrapper .comment_con {
  font-size: 12px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.conent_inner {
  margin: 10px 0;
}
.position_desc {
  margin: 0 auto;
  font-size: 12px;
  font-family: PingFangSC-Light, PingFang SC;
  font-weight: 300;
  color: #666666;
  line-height: 17px;
}
.ageItem {
  width: 46%;
  display: block;
  background: rgba(215, 228, 230, 0.2);
  line-height: 60rpx;
  text-align: center;
  border-radius: 8rpx;
  float: left;
  margin: 0 1%;
  margin-bottom: 10rpx;
  color: #000;
  font-size: 13px;
}
.moeny {
  color: #ff6010;
  /* font-siez: 152px; */
  margin-left: 25rpx;
  margin-bottom: 40rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 500;
  font-size: 20px;
}
.school_item1 {
  background: rgba(215, 228, 230, 0.2);
  line-height: 60rpx;
  border-radius: 8rpx;
  color: #000;
  font-size: 26rpx;
  text-align: left;
  text-indent: 10px;
}
.school_item2 {
  background: rgba(215, 228, 230, 0.2);
  line-height: 60rpx;
  text-align: center;
  border-radius: 8rpx;
  margin: 0 1%;
  color: #000;
  font-size: 26rpx;
  width: 30%;
}
</style>
