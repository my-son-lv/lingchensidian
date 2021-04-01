// 面试管理
<template>
  <div class="indexContatiner">
    <div class="top_nav_wrapper">
      <div class="top_nav">
        <div :class="activeClass == index ? 'actived' : ''" class="nav_item" v-for="(nav, index) in navList" :key="index" @click="getItem(index)">
          {{ nav }}
        </div>
      </div>
    </div>
    <div v-if="activeClass == 0">
      <scroll-view scroll-x="true" class="nav_wrapper">
        <div :class="activeNavClass == index ? 'actived_nav':''" class="scroll_nav_item" v-for="(nav,index) in navArr" :key="index" @click="getNavItem(nav.id,index)">{{nav.value}}</div>
      </scroll-view>
      <scroll-view scroll-y="true" :style="{ height: scrollHeight + 'px' }" @scrolltolower="loadMore" v-if="teacherListArr.length > 0">
        <ul class="teacher_list">
          <li class="started_item" v-for="(item,index) in teacherListArr" :key="index" @click="gotTeaccherDetails(item.info_mid, item.mid)">
            <div class="item_top" style="position:relative">
              {{item.inte_time}}
              <div class="right_icon_wrapper" @click.stop="showRightOperate(index)">
                <img src="/static/images/shenglue_icon.png" class="img_icon" />
              </div>
              <div class="right_con_wrapper" v-if="ageList[index].showType && activeIndex == index">
                <div class="right_item_con" @click.stop="handleClickChange(item.id)" v-show="item.status == 0 || item.status == 1">
                  <img class="right_icon" src="/static/images/xiugai_icono.png" />
                  <p class="con">修改</p>
                </div>
                <div class="right_item_con" v-show="item.status == 0 || item.status == 1" @click.stop="handleClickCancel(item.id)">
                  <img class="right_icon" src="/static/images/cancel_icon.png" />
                  <p class="con">取消</p>
                </div>
              </div>
            </div>
            <div class="start_teacher clearfix">
              <p class="teacher_name fl">{{item.name}}</p>
              <p class="rside fl" v-if="item.status == 2">正在面试</p>
              <p class="rside_wait fl" v-else-if="item.status == 1">待面试</p>
              <p class="rside_other fl" v-else>{{statusList[item.status]}}</p>
            </div>

            <p class="country">
              {{ item.nationality_val }} |
              {{ item.university ? degree[item.university - 1].code : 1 }}
            </p>
            <p class="work_details clearfix">
              <span class="work_year fl">{{item.working_seniority ? workYearList[item.working_seniority - 1].code : workYearList[2].code}}</span>
              <span class="pay fl">{{ item.pay_type ? payList[item.pay_type - 1].code : 1 }}</span>
            </p>
            <img v-if="item.photos_path != null" :src="item.photos_path[0].path" class="teacher_img" />
            <img v-else :src="item.sex == 0 ? '/static/images/man.png' : '/static/images/woman.png'" class="teacher_img" />
            <div class="join_btn" @click="handleClickJoinRoom(item.id)" v-if="item.status == 2">进入面试房间</div>
            <div class="progress_wrapper" @click.stop="handleClickStep(item.id)">
              查看进度
            </div>
          </li>
        </ul>
      </scroll-view>

      <div class="empty_month_wrapper" v-else>
        <img class="empty_img" src="../../asset/interview_empty.png" />
        <h6 class="empty_title">空空如也</h6>
        <p class="empty_con">您还没有面试信息，快去邀请一个喜欢的外教面试吧</p>
      </div>
    </div>
    <div v-else>
      <div class="interview_record_wrapper" v-if="allRecordArr.length > 0">
        <div class="end_content" v-for="(record,index) in allRecordArr" :key="index" @click="gotTeaccherDetails(record.info_mid,record.mid)">
          <div class="content_top clearfix">
            <p class="lside fl">{{record.inte_time}}</p>
            <p class="rside fr">
              <span class="spot"></span>
              {{statusList[record.status]}}
            </p>
          </div>
          <div class="teacher_con clearfix">
            <img v-if="record.photos_path != null" :src="record.photos_path[0].path" class="teacher_img" />
            <img v-else :src="record.sex == 0 ? '/static/images/man.png' : '/static/images/woman.png'" class="teacher_img" />
            <div class="fl">
              <p class="teacher_name">{{record.name}}</p>
              <p class="country">{{record.nationality_val}} | {{ record.university ? degree[record.university - 1].code : 1}}</p>
              <p class="work_year">{{record.working_seniority ? workYearList[record.working_seniority - 1].code : workYearList[2].code}} | {{record.pay_type ? payList[record.pay_type - 1].code : 1}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="empty_img_wrapper" v-else>
        <img class="empty_img" src="../../asset/interview_empty.png" />
        <h6 class="empty_title">空空如也</h6>
        <p class="empty_con">您还没有面试记录，快去邀请一个喜欢的外教面试吧</p>
      </div>
    </div>
    <!-- 修改面试时间 -->
    <van-popup :show="showDatePicker" overlay position="bottom">
      <van-datetime-picker v-model="currentDate" type="date" title="选择日期" :min-date="minDate" @confirm="onDateConfirm" @cancel="hideDatePicker" />
    </van-popup>
    <van-popup :show="showTimePicker" overlay position="bottom">
      <van-datetime-picker v-model="currentTime" type="time" title="选择时间" @confirm="onTimeConfirm" @cancel="hideTimePicker" />
    </van-popup>
    <!-- 步骤条 -->
    <van-popup :show="showStepPicker" overlay @click="closeStepsPicker">
      <div class="steps_content">
        <van-steps direction="vertical" active-color="#078CA9" inactive-color="#999999" active="0" :steps="steps"></van-steps>
      </div>
    </van-popup>

    <van-notify id="van-notify" class="van-notify" />
    <van-dialog id="van-dialog" />
  </div>
</template>
<script>
import moment from "moment";
import Notify from "@/../static/vant/notify/notify";
import Dialog from "@/../static/vant/dialog/dialog";
export default {
  data() {
    return {
      showDatePicker: false,
      minDate: new Date().getTime(),
      currentDate: new Date().getTime(),
      showTimePicker: false,
      currentTime: "12:00",
      showStepPicker: false,
      activeClass: 0,
      activeNavClass: 0,
      navList: ["人才管理", "面试记录"],
      currentIndex: 0,
      nowDate: moment().format('YYYY-MM-DD'),
      beforeDate: '',
      dayIsToday: "",
      allInterviewList: [],
      soonInterview: [],
      startInterview: [],
      finishInterview: [],
      todayDate: [],
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
      navArr: [
        {
          value: "全部",
          id: 0
        },
        {
          value: "已约面",
          id: 1
        },
        {
          value: "待面试",
          id: 2
        },
        {
          value: "待签约",
          id: 4
        },
        {
          value: "已录用",
          id: 5
        },
        {
          value: "未通过",
          id: 6
        },
        {
          value: "已结束",
          id: 7
        }
      ],
      teacherListArr: [],
      page: 1,
      pageSize: 10,
      interviewStatus: 0,
      finished: false,
      ageList: [],
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
        "已拒绝"
      ],
      activeIndex: -1,
      steps: [],
      scrollHeight: 0,
      allRecordArr: [],
    }
  },
  computed: {
  },
  methods: {
    // 获取面试记录
    async getlogList() {
      let TOKEN = wx.getStorageSync("token");
      const res = await this.$httpWX.post({
        url: "/api/company/inerview/logList",
        data: {
          token: TOKEN,
          start_time: "",
          end_time: "",
          page: 1,
          pageSize: 1000
        }
      });
      if (res.code == 200) {
        this.allRecordArr = res.data.list;
      }
    },
    // 人才管理加载更多
    loadMore() {
      if (this.finished != true) {
        this.page += 1;
        this.getTeahcerList();
      }
    },
    // 人才管理列表
    async getTeahcerList() {
      let TOKEN = wx.getStorageSync("token");
      const res = await this.$httpWX.post({
        url: "/api/company/inerview/list",
        data: {
          token: TOKEN,
          page: this.page,
          pageSize: this.pageSize,
          status: this.interviewStatus
        }
      });
      if (res.code == 200) {
        if (res.data.list.length == 0) {
          this.finished = true;
        } else {
          this.teacherListArr.push(...res.data.list);
          if (res.data.count == this.page) {
            this.finished = true;
          }
          this.ageList = this.teacherListArr.map(ele => {
            return {
              value: ele.brithday.slice(0, 4),
              showType: false
            };
          });
        }
      }
    },
    // 切换标题
    getNavItem(id, idx) {
      this.activeNavClass = idx;
      this.interviewStatus = id;
      this.page = 1;
      this.finished = false;
      this.teacherListArr = [];
      this.getTeahcerList();
    },
    // 右侧操作栏
    showRightOperate(index) {
      this.activeIndex = index;
      this.ageList[index].showType = !this.ageList[index].showType;
    },
    closeStepsPicker() {
      this.showStepPicker = false;
    },
    // 修改
    handleClickChange(id) {
      this.showDatePicker = true;
      this.activeIndex = -1;
      this.changeId = id;
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
      this.changeValue = this.dataValue + " " + event.mp.detail;
      let TOKEN = wx.getStorageSync("token");
      const res = await this.$httpWX.post({
        url: "/api/company/inerview/update",
        data: {
          id: this.changeId,
          time: this.changeValue,
          token: TOKEN
        }
      });
      if (res.code == 200) {
        this.page = 1;
        this.finished = false;
        this.teacherListArr = [];
        Notify({
          type: "success",
          message: `面试时间修改为：${this.changeValue}`
        });
        this.showTimePicker = false;
        this.getTeahcerList();
      } else {
        Notify({
          type: "warning",
          message: res.msg
        });
      }
    },
    // 时间取消按钮
    hideTimePicker() {
      this.showTimePicker = false;
    },
    // 取消面试按钮
    async handleClickCancel(id) {
      let TOKEN = wx.getStorageSync("token");
      const res = await this.$httpWX.post({
        url: "/api/company/inerview/cancelInvite",
        data: {
          id: id,
          token: TOKEN
        }
      });
      if (res.code == 200) {
        this.page = 1;
        this.finished = false;
        this.teacherListArr = [];
        Notify({
          type: "success",
          message: "取消面试成功"
        });
        this.getTeahcerList();
      } else {
        Notify({
          type: "warning",
          message: res.msg
        });
      }
    },
    // 查看进度
    async handleClickStep(id) {
      this.showStepPicker = true;
      this.activeIndex = -1;
      let TOKEN = wx.getStorageSync("token");
      const res = await this.$httpWX.post({
        url: "/api/company/inerview/interviewSpeed",
        data: {
          id: id,
          token: TOKEN
        }
      });
      if (res.code == 200) {
        this.steps = res.data.map(ele => {
          return {
            text: ele.info,
            desc: `操作时间：${ele.created_at}`
          };
        });
      }
    },
    // 导航切换
    getItem(index) {
      this.activeClass = index;
      this.showInterviewIndex = index;
    },
    // 跳转详情
    gotTeaccherDetails(id, mid) {
      wx.navigateTo({
        url: "../../pages/teachersDetail/main?id=" + id + "&mid=" + mid,
      });
    },
  },
  onShow() {
    Object.assign(this.$data, this.$options.data());
    let self = this;
    wx.getSystemInfo({
      success: function (res) {
        self.scrollHeight = res.windowHeight - 100;
      },
    });
    this.getTeahcerList();
    this.getlogList();
  }
}
</script>
<style>
page {
  background: #f5f5f5;
}
</style>
<style scoped>
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
.top_nav_wrapper {
  width: 100%;
  height: 44px;
  background: #ffffff;
  line-height: 44px;
}
.top_nav {
  display: flex;
  margin: 0 auto;
  width: 90%;
  height: 100%;
}
.top_nav_wrapper .nav_item {
  margin-right: 24px;
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 400;
  color: #999999;
}
.actived {
  color: #333333 !important;
  font-weight: 700 !important;
}
.showDate {
  position: relative;
  width: 100%;
  height: 40px;
  background: #ffffff;
  border-top: 0.5px solid #eee;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
}
.list_wrapper {
  margin-top: 8px;
}
.started_item {
  position: relative;
  margin-bottom: 8px;
  padding-bottom: 12px;
  width: 100%;
  min-height: 160px;
  background: #ffffff;
}
.started_item .item_top {
  padding-left: 16px;
  height: 40px;
  background: #ffffff;
  border-bottom: 0.5px solid #eeeeee;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  line-height: 40px;
}
.start_teacher .teacher_name {
  margin: 24px 0 8px 16px;
  max-width: 250px;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.country {
  margin-bottom: 12px;
  margin-left: 16px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
}
.work_details {
  margin-left: 16px;
}
.work_details .work_year {
  display: block;
  padding: 4px 8px;
  margin-right: 8px;
  min-width: 42px;
  height: 16px;
  background: #f2f2f2;
  border-radius: 2px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
}
.work_details .pay {
  display: block;
  padding: 4px 8px;
  min-width: 26px;
  height: 16px;
  background: #f2f2f2;
  border-radius: 2px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
}
.join_btn {
  margin: 12px auto 0 auto;
  width: 92%;
  height: 44px;
  background: rgba(7, 140, 169, 0.1);
  border-radius: 4px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #078ca9;
  line-height: 44px;
  text-align: center;
}
.start_teacher .rside {
  margin: 27px 0 0 8px;
  width: 48px;
  height: 18px;
  background: #078ca9;
  border-radius: 2px;
  line-height: 18px;
  font-size: 10px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  text-align: center;
}
.soon_teacher .rside,
.rside_wait {
  margin: 27px 0 0 8px;
  width: 48px;
  height: 18px;
  background: #c4df16;
  border-radius: 2px;
  line-height: 18px;
  font-size: 10px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  text-align: center;
}
.finish_teacher .rside,
.rside_other {
  margin: 27px 0 0 8px;
  width: 48px;
  height: 18px;
  background: #cccccc;
  border-radius: 2px;
  line-height: 18px;
  font-size: 10px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  text-align: center;
}
.empty_month_wrapper {
  margin-top: 30%;
  text-align: center;
}
.empty_month_wrapper .empty_img {
  width: 130px;
  height: 130px;
}
.empty_month_wrapper .empty_con {
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
.empty_title {
  margin: 13px 0 5px 0;
  font-size: 12px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  line-height: 16px;
}
.nav_wrapper {
  position: relative;
  padding-left: 8px;
  width: 100%;
  height: 56px;
  white-space: nowrap;
  background: #ffffff;
}
.scroll_nav_item {
  display: inline-block;
  margin-right: 12px;
  margin-top: 15px;
  width: 64px;
  height: 24px;
  background: #f8f8f8;
  border-radius: 13px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  line-height: 24px;
  text-align: center;
}
.actived_nav {
  background: rgba(7, 140, 169, 0.1) !important;
  border: 1px solid #078ca9 !important;
  font-weight: 500 !important;
  color: #078ca9 !important;
}
.teacher_list {
  margin-top: 8px;
}
.right_icon_wrapper {
  position: absolute;
  top: 5px;
  right: 16px;
}
.right_icon_wrapper .img_icon {
  width: 32px;
  height: 32px;
}
.right_con_wrapper {
  position: absolute;
  top: 35px;
  right: 16px;
  padding: 14px 16px;
  width: 78px;
  background: rgba(51, 51, 51, 1);
  border-radius: 4px;
  z-index: 999;
}
.right_item_con .right_icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  vertical-align: middle;
}
.right_item_con .con {
  margin-left: 6px;
  display: inline-block;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  vertical-align: middle;
}
.steps_content {
  padding: 10px 16px;
  width: 343px;
  min-height: 180px;
  overflow-y: scroll;
  background: #fff;
}

.start_content,
.end_content {
  margin: 12px auto 0 auto;
  width: 90%;
  height: 132px;
  background: rgba(7, 140, 169, 0.1);
  border-radius: 4px;
}
.content_top {
  padding: 0 12px;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}
.content_top .lside,
.start_content .lside,
.end_content .lside {
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
.content_top .rside,
.start_content .rside,
.end_content .rside {
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
.content_top .spot {
  margin-right: 8px;
  display: inline-block;
  width: 8px;
  height: 8px;
  background: rgba(7, 140, 169, 1);
  border-radius: 50%;
}
.teacher_list .teacher_img {
  position: absolute;
  top: 64px;
  right: 16px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
}
.teacher_con {
  position: relative;
  padding: 12px;
}
.teacher_con .teacher_img {
  position: absolute;
  top: 12px;
  right: 16px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
}
.teacher_con .teacher_name {
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.teacher_con .country {
  margin: 8px 0;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
.teacher_con .work_year {
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
.add_room_btn {
  margin-top: 12px;
  width: 90%;
  height: 44px;
  background: rgba(7, 140, 169, 0.1);
  border-radius: 4px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(7, 140, 169, 1);
  line-height: 44px;
  text-align: center;
}

.start_content .rside .spot {
  background: #c4df16;
}
.end_content .spot {
  background: rgba(204, 204, 204, 1);
}
.interview_record_wrapper {
  margin: 16px 0;
  width: 100%;
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
.progress_wrapper {
  position: absolute;
  bottom: 22px;
  right: 16px;
  width: 80px;
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
</style>
