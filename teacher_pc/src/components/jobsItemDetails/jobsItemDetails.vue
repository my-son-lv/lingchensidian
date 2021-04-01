<template>
  <div class="jobsItemDetails_wrapper" v-show="showDetailsMask">
    <div class="content_wrapper" v-if="jobDetails != null">
      <div class="jobs_top_wrapper">
        <div class="jobs_title_wrapper">
          <div class="clearfix">
            <div class="lside_title fl">{{ jobDetails.job_name }}</div>
            <div class="rside_time fr">
              interview time：{{ splitTime }} (GMT+8)
            </div>
          </div>
          <div class="jobs_price" v-if="jobDetails.pay">
            {{ jobDetails.pay.split(",").join("-") }}K RMB /Month
          </div>
          <div class="jobs_year" v-if="jobDetails.job_city_data">
            {{ jobDetails.job_city_data.pinyin }} |
            {{ jobDetails.work_type | filterWorkType }} |
            {{ jobDetails.job_year | filterJobWorkYear }}
          </div>
          <div class="company_img_wrapper">
            <img
              :src="
                jobDetails.logo_path
                  ? jobDetails.logo_path.path
                  : '/static/images/company_logo.png'
              "
            />
            <h5>{{ jobDetails.company_name }}</h5>
          </div>
          <div class="jobs_btn_wrapper" v-if="jobDetails.status == 0">
            <div
              class="jobs_lside_btn fl"
              style="margin-right: 20px"
              @click="handleClickChangeTime"
            >
              Accept
            </div>
            <div class="jobs_rside_btn fl" @click="hanleClickCancel">
              Decline
            </div>
          </div>
        </div>
      </div>
      <div class="jobs_content_wrapper">
        <h5>Job Description</h5>
        <div class="con_wrapper">
          <p class="job_lside_con">Location :</p>
          <p class="job_rside_con" v-if="jobDetails.job_city_data">
            {{ jobDetails.job_city_data.pinyin }}
          </p>
        </div>
        <div class="con_wrapper">
          <p class="job_lside_con">Job Category :</p>
          <p class="job_rside_con" v-if="jobDetails.job_work_type">
            {{ jobDetails.work_type | filterWorkType }}
          </p>
        </div>
        <div class="con_wrapper">
          <p class="job_lside_con">Job Type :</p>
          <p class="job_rside_con">
            {{ jobDetails.type == 1 ? "Offline" : "Online" }}
          </p>
        </div>
        <div class="con_wrapper">
          <p class="job_lside_con">The language of instruction :</p>
          <p class="job_rside_con">English</p>
        </div>
        <div class="con_wrapper">
          <p class="job_lside_con">Age of Students :</p>
          <p
            class="job_rside_con"
            v-for="(age, index) in agesList"
            :key="index"
          >
            {{ age }},
          </p>
        </div>
        <div class="con_wrapper">
          <p class="job_lside_con">Work hours (weekly) :</p>
          <p class="job_rside_con" v-if="jobDetails.job_day_time">
            {{ jobDetails.job_day_time.split(",").join("-") }} hours
          </p>
        </div>
        <div class="con_wrapper">
          <p class="job_lside_con">Salary :</p>
          <p class="job_rside_con" v-if="jobDetails.pay">
            {{ jobDetails.pay.split(",").join("-") }}K
          </p>
        </div>
      </div>
      <div class="welfare_wrapper">
        <h5>Welfare</h5>
        <el-input
          type="textarea"
          autosize
          v-model="jobDetails.benefits"
          :disabled="true"
        >
        </el-input>
      </div>
      <div class="welfare_wrapper">
        <h5>Job Profile</h5>
        <el-input
          type="textarea"
          autosize
          v-model="jobDetails.job_info"
          :disabled="true"
        >
        </el-input>
      </div>
      <div class="jobs_content_wrapper" style="border-bottom: none">
        <h5>Job Requirements</h5>
        <div class="con_wrapper">
          <p class="job_lside_con">Gender :</p>
          <p class="job_rside_con">Shanghai</p>
        </div>
        <div class="con_wrapper">
          <p class="job_lside_con">Degree required :</p>
          <p class="job_rside_con">{{ jobDetails.edu_type | filterDegree }}</p>
        </div>
        <div class="con_wrapper">
          <p class="job_lside_con">Qualification certificate :</p>
          <p
            class="job_rside_con"
            v-for="(cert, index) in certList"
            :key="index"
          >
            {{ cert }},
          </p>
        </div>
        <div class="con_wrapper">
          <p class="job_lside_con">Experience in teaching :</p>
          <p class="job_rside_con">
            {{ jobDetails.job_year | workingSeniority }}
          </p>
        </div>
      </div>
    </div>
    <div class="jobs_right_close" @click="handleClickClose">
      <img src="/static/images/close.png" />
    </div>
  </div>
</template>
<script>
import moment from "moment";
import { inertAccept } from "../../apis/baseUrls";
export default {
  props: ["showDetailsMask", "jobSesc"],
  data() {
    return {
      show: false,
      jobDetails: null,
      splitTime: "",
      agesList: [],
      studentAgeList: [
        { value: "0-3years old", id: 1 },
        { value: "3-6years old", id: 2 },
        { value: "7-12years old", id: 3 },
        { value: "13-18years old", id: 4 },
        { value: "18+years old", id: 5 }
      ],
      certList: [],
      certificateList: [
        {
          value: "TEFL",
          id: 1
        },
        {
          value: "TESOL",
          id: 2
        },
        {
          value: "TESL",
          id: 3
        },
        {
          value: "CELTA",
          id: 4
        }
      ],
      token: ""
    };
  },
  watch: {
    showDetailsMask(val) {
      this.show = val;
    },
    jobSesc(val) {
      this.jobDetails = val;
      this.splitTime =
        this.jobDetails.inte_time.split(" ")[1] +
        "，" +
        moment(this.jobDetails.inte_time.split(" ")[0]).format("DD MMM YYYY");
      if (this.jobDetails.student_age != null) {
        let studentAges = this.jobDetails.student_age.split(",").map(Number);
        this.studentAgeList.forEach(ele => {
          let ageId = studentAges.find(item => item == ele.id);
          if (ageId) {
            this.agesList.push(ele.value);
          }
        });
      }
      if (this.jobDetails.cert != null) {
        let certs = this.jobDetails.cert.split(",").map(Number);
        this.certificateList.forEach(ele => {
          let certId = certs.find(item => item == ele.id);
          if (certId) {
            this.certList.push(ele.value);
          }
        });
      }
    }
  },
  created() {
    this.token = localStorage.getItem("token");
  },
  computed: {},
  methods: {
    // 关闭详情
    handleClickClose() {
      this.show = false;
      this.$emit("closeMask", false);
      this.agesList = [];
      this.certList = [];
    },
    // 更改面试时间
    handleClickChangeTime() {
      this.$confirm(
        "Would you like to contact customer service to reschedule the interview?",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel"
        }
      )
        .then(() => {
          inertAccept({
            token: this.token,
            id: this.jobDetails.id,
            type: 1
          }).then(res => {
            this.jobDetails.status = 1
            this.$message({
              message:
                "Your application has been submitted, customer service will contact you soon.",
              type: "success"
            });
          });
        })
        .catch(() => {});
    },
    // 取消面试
    hanleClickCancel() {
      this.$prompt(
        "Please fill up the reason to decline the interview, thanks!",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          // type: "warning",
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel"
        }
      )
        .then((value) => {
          inertAccept({
            token: this.token,
            id: this.jobDetails.id,
            info: value.value,
            type: 2
          }).then(res => {
            this.jobDetails.status = 7
            this.$message({
              message:
                "The interview has been cancelled. Customer service will contact you soon.",
              type: "success"
            });
          });
        })
        .catch(() => {});
    }
  }
};
</script>
<style scoped>
.jobsItemDetails_wrapper {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  padding-top: 80px;
  width: 100%;
  background: rgba(0, 0, 0, 0.65);
  box-sizing: border-box;
  z-index: 999;
}
.jobsItemDetails_wrapper .content_wrapper {
  margin-bottom: 20px;
  width: 980px;
  background: #f8f8f8;
}
.jobs_top_wrapper {
  position: relative;
  padding: 20px;
  background: #ffffff;
  box-sizing: border-box;
}
.jobs_title_wrapper .lside_title {
  font-size: 22px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.jobs_title_wrapper .rside_time {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
}
.jobs_title_wrapper .jobs_price {
  margin: 10px 0;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ff6010;
}
.jobs_title_wrapper .jobs_year {
  margin-bottom: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
}
.jobs_title_wrapper .company_img_wrapper {
  display: flex;
}
.jobs_title_wrapper .company_img_wrapper img {
  margin-right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 10px;
}
.jobs_title_wrapper .company_img_wrapper h5 {
  height: 40px;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  line-height: 40px;
}
.jobs_title_wrapper .jobs_btn_wrapper {
  position: absolute;
  top: 50%;
  right: 20px;
  margin-top: -20px;
  height: 40px;
}
.jobs_title_wrapper .jobs_lside_btn,
.jobs_title_wrapper .jobs_rside_btn {
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
.jobs_content_wrapper {
  margin: 0 auto;
  padding-top: 40px;
  width: 940px;
  border-bottom: 1px solid #eeeeee;
}
.jobs_content_wrapper h5 {
  margin-bottom: 20px;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.jobs_content_wrapper .con_wrapper {
  display: flex;
  margin-bottom: 20px;
}
.jobs_content_wrapper .job_lside_con {
  margin-right: 80px;
  min-width: 200px;
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  line-height: 20px;
}
.welfare_wrapper {
  margin: 0 auto;
  padding: 20px 0;
  width: 940px;
  border-bottom: 1px solid #eeeeee;
}
.welfare_wrapper h5 {
  margin-bottom: 10px;
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
/deep/ .work_background_wrapper .el-textarea.is-disabled .el-textarea__inner {
  background: #fff;
  color: #666666;
}
.jobs_right_close {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
  width: 40px;
  height: 40px;
  background: #ffffff;
  cursor: pointer;
}
.jobs_right_close img {
  width: 20px;
  height: 20px;
}
</style>
