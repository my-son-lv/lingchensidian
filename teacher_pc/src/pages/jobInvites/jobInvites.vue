<template>
  <div class="jobInvites_wrapper">
    <div class="no_message_wrapper" v-if="invitationList.length == 0">
      <img src="../../assets/image/no_message.png" />
      <p>Temporarily no Job invites</p>
    </div>

    <div v-else>
      <div
        class="jobs_wrapper"
        v-for="(job, index) in invitationList"
        :key="index"
      >
        <div class="jobs_title clearfix">
          <h5 class="fl">{{ job.job_name }}</h5>
          <p class="time fr">interview time：{{ splitTime[index] }} (GMT+8)</p>
        </div>
        <div class="price">{{ job.pay.split(",").join("-") }}K RMB /Month</div>
        <div class="con">
          {{ job.job_city_data.pinyin }} |
          {{ job.work_type | filterWorkType }} |
          {{ job.job_year | filterJobWorkYear }}
        </div>
        <div class="bottom_wrapper">
          <img
            :src="
              job.logo_path
                ? job.logo_path.path
                : '/static/images/company_logo.png'
            "
          />
          <span>{{ job.company_name }}</span>
        </div>
        <div class="details_btn" @click="handleClickDetails(job.id)">
          Details
        </div>
      </div>
      <pagination
        :count="count"
        v-if="this.count > 0"
        @activePage="receivePage"
        style="margin-right: 20px"
      ></pagination>
    </div>
    <jobsItemDetails
      :showDetailsMask="showDetailsMask"
      :jobSesc="jobSesc"
      @closeMask="closeMask"
    ></jobsItemDetails>
  </div>
</template>
<script>
import pagination from "../../components/pagination/pagination";
import { interviewList, interviewDesc } from "../../apis/baseUrls";
import moment from "moment";
import jobsItemDetails from "../../components/jobsItemDetails/jobsItemDetails";
export default {
  name: "jobInvites",
  components: {
    pagination,
    jobsItemDetails
  },
  data() {
    return {
      page: 1,
      pageSize: 5,
      token: "",
      invitationList: [],
      count: 0,
      splitTime: [],
      showDetailsMask: false,
      jobSesc: {}
    };
  },
  created() {
    this.$emit("passParentNum", 2);
    this.token = localStorage.getItem("token");
    if (this.token) {
      this.getInterviewList();
    }
  },
  computed: {},
  methods: {
    // 获取面试列表
    async getInterviewList() {
      let res = await interviewList({
        token: this.token,
        page: this.page,
        pageSize: this.pageSize
      });
      if (res.data.code == 200) {
        this.count = res.data.data.count;
        this.invitationList = res.data.data.list;
        this.splitTime = this.invitationList.map(
          ele =>
            (ele.inte_time =
              ele.inte_time.split(" ")[1].slice(0, 5) +
              "，" +
              moment(ele.inte_time.split(" ")[0]).format("DD MMM YYYY"))
        );
      }
    },
    // 点击详情
    async handleClickDetails(id) {
      let res = await interviewDesc({
        token: this.token,
        id: id
      });
      if (res.data.code == 200) {
        this.jobSesc = res.data.data;
        this.showDetailsMask = true;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    closeMask(obj) {
      this.showDetailsMask = false;
    },
    // 接收分页
    receivePage(page) {
      this.page = page;
      this.getJobList();
    },
  }
};
</script>
<style scoped>
.jobs_wrapper {
  position: relative;
  margin-bottom: 20px;
  padding: 20px;
  width: 100%;
  background: #ffffff;
  border-radius: 10px;
  box-sizing: border-box;
}
.jobs_wrapper .jobs_title h5 {
  width: 450px;
  height: 24px;
  font-size: 22px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  line-height: 24px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.jobs_wrapper .jobs_title .time {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
}
.jobs_wrapper .price {
  margin: 10px 0;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ff6010;
}
.jobs_wrapper .con {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
}
.jobs_wrapper .bottom_wrapper {
  display: flex;
  align-items: center;
  margin-top: 20px;
  height: 40px;
}
.jobs_wrapper .bottom_wrapper img {
  margin-right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 10px;
}
.jobs_wrapper .bottom_wrapper span {
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.jobs_wrapper .details_btn {
  position: absolute;
  top: 72px;
  right: 20px;
  width: 160px;
  height: 40px;
  background: #078ca9;
  border-radius: 4px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
}
.no_message_wrapper {
  padding-top: 188px;
  width: 980px;
  height: 880px;
  background: #ffffff;
  border-radius: 10px;
  box-sizing: border-box;
}
.no_message_wrapper img {
  margin: 0 auto 10px auto;
  width: 300px;
  height: 258px;
}
.no_message_wrapper p {
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  text-align: center;
}
</style>
