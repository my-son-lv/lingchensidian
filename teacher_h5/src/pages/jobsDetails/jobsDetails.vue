<template>
  <div class="details_wrapper">
    <HomeNav />
    <div class="details_content_wrapper">
      <div class="teacher_name">
        <h5>{{this.teacherMessage.name}}</h5>
        <div class="address" v-if="this.teacherMessage.job_city_data">
          <img src="../../assets/adress.png" />
          {{this.teacherMessage.job_city_data.pinyin}}，{{this.teacherMessage.job_province_data.pinyin}}，China
        </div>
      </div>
      <div class="line"></div>
      <p class="name">Job Description</p>
      <div class="same_class">
        Location：
        <span
          v-if="this.teacherMessage.job_city_data"
        >{{this.teacherMessage.job_city_data.pinyin}}</span>
      </div>
      <div class="same_class" v-if="this.teacherMessage.type">
        Job Category：
        <span>{{ teacherMessage.type == 3 ? 'Offline，Online' : (teacherMessage.type == 2 ? 'Online' : 'Offline')  }}</span>
      </div>
      <div class="same_class" v-if="this.teacherMessage.work_type">
        Job Type：
        <span>{{ teacherMessage.work_type == 1 ? 'Full-time，Part-time' : (teacherMessage.work_type == 2 ? 'Full-time' : 'Part-time') }}</span>
      </div>
      <!-- <div class="same_class">
        The language of instruction：
        <span>English</span>
      </div>-->
      <div class="age_class">
        Age of Students：
        <span
          v-for="(age,index) in agesList"
          :key="index"
        >{{(agesList.length-1) == index ? age : age + '，'}}</span>
      </div>
      <!-- <div class="same_class">
        Work hours(weekly):
        <span
          v-if="this.teacherMessage.job_day_time"
        >{{this.teacherMessage.job_day_time.split(',').join('-')}}hours</span>
      </div>-->

      <p class="same_class" v-if="teacherMessage.job_day_time">
        Working Hours(weekly)：
        <span>{{teacherMessage.job_day_time.split(",").join("-") }} hours</span>
      </p>
      <p class="same_class" v-if="teacherMessage.teaching_time">
        Teaching Hours(weekly)：
        <!--教学时长-->
        <span>{{ teacherMessage.teaching_time ? teacherMessage.teaching_time.split(",").join("-") : ''}} hours</span>
      </p>

      <div class="same_class">
        Salary：
        <span
          v-if="this.teacherMessage.pay"
        >￥{{ teacherMessage.pay.split(",").join("-") }}/{{ parseInt(teacherMessage.pay_unit) | filterJobPayUnit}}</span>
      </div>
      <div class="same_class">
        <p>
          <span class="lside_tit">Job Profile：</span>
        </p>
        <van-field
          readonly
          v-model="this.teacherMessage.job_info"
          rows="3"
          autosize
          type="textarea"
        />
      </div>
      <div class="same_class">
        <p>
          <span class="lside_tit">Welfare：</span>
        </p>
        <div style="width:80%;">
          <van-field readonly v-model="this.teacherMessage.benefits" autosize type="textarea" />
        </div>
      </div>
      
      <div class="fuli_tags" v-if="teacherMessage.benefits_tag">
        <div class="fuli_tags_item" v-if="teacherMessage.benefits_tag.indexOf('1') !=-1">Annual Bonus</div>
        <div class="fuli_tags_item" v-if="teacherMessage.benefits_tag.indexOf('2') !=-1">Insurance</div>
        <div class="fuli_tags_item" v-if="teacherMessage.benefits_tag.indexOf('3') !=-1">Apartment</div>
        <div class="fuli_tags_item" v-if="teacherMessage.benefits_tag.indexOf('4') !=-1">House Allowance</div>
        <div class="fuli_tags_item" v-if="teacherMessage.benefits_tag.indexOf('5') !=-1">Flight Allowance</div>
        <div class="fuli_tags_item" v-if="teacherMessage.benefits_tag.indexOf('6') !=-1">Paid Leave</div>
      </div>
      <div class="line"></div>
      <p class="name">Job Details</p>
      <div class="same_class">
        Gender：
        <span>{{sexList[this.teacherMessage.sex]}}</span>
      </div>
      <div class="same_class">
        Degree required：
        <span
          v-if="this.teacherMessage.edu_type"
        >{{  (this.teacherMessage.edu_type-1) == 3 ? 'Bachelor and above' : degreeList[this.teacherMessage.edu_type - 1].value}}</span>
      </div>
      <!-- <div class="age_class" v-if="certList.length>0">
        Qualification certificate:
        <span v-for="(item,index) in certList" :key="index">{{item}}，</span>
      </div>-->
      <div class="same_class" v-if="this.teacherMessage.cert">
        Qualification Certificate：
        <span>{{this.teacherMessage.cert ==1 ? 'Required' : 'Not required'}}</span>
      </div>
      <div class="same_class">
        Experience in teaching：
        <span
          v-if="this.teacherMessage.job_year"
        >{{job_year_list[this.teacherMessage.job_year -1].value}}</span>
      </div>
      <div class="line"></div>
      <div class="now_btn" @click="handleClickApply">Apply Now</div>
    </div>
    <img src="../../assets/details_img.png" class="details_img" @click="handleClickShare" />
    <div class="join_wrapper">
      <h6>Join Us</h6>
      <p>Upload your profile and resume so that more employers can find you</p>
      <div class="join_btn" @click="handleClickJoin">LET’S GO！</div>
    </div>
    <Footer />
  </div>
</template>
<script>
import HomeNav from "../../components/homeNav/homeNav";
import Footer from "../../components/footer/footer";
import { jobDesc, getStatusByToken, jobApplication } from "../../apis/baseUrls";
import { Dialog, Toast, Field } from "vant";
export default {
  name: "jobsDetails",
  data() {
    return {
      teacherMessage: {},
      sexValue: "",
      optionsWorkType: [
        { value: "Any", id: 1 },
        { value: "Offline", id: 2 },
        { value: "Online", id: 3 }
      ],
      work_type: [
        { value: "Any", id: 1 },
        { value: "Full-time", id: 2 },
        { value: "Part-time", id: 3 }
      ],
      agesList: [],
      studentAgeList: [
        { value: "0-3years old", id: 1 },
        { value: "3-6years old", id: 2 },
        { value: "7-12years old", id: 3 },
        { value: "13-18years old", id: 4 },
        { value: "18+years old", id: 5 }
      ],
      sexList: ["Any", "Male", "Female"],
      degreeList: [
        {
          value: "Bachelor and above",
          id: 1
        },
        {
          value: "Master and above",
          id: 2
        },
        {
          value: "PHD and above",
          id: 3
        },
        {
          value: "Any",
          id: 4
        }
      ],
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
      certList: [],
      job_year_list: [
        {
          value: "Less than 1 year",
          id: 1
        },
        {
          value: "1-3years",
          id: 2
        },
        {
          value: "3-5years",
          id: 3
        },
        {
          value: "5-10years",
          id: 4
        },
        {
          value: "more than 10 years",
          id: 5
        }
      ],
      user_info: null
    };
  },
  filters: {
    // 工作类型
    filterJobWorkType(val) {
      if (val == 1) {
        return "Any";
      } else if (val == 2) {
        return "Full-time";
      } else if (val == 3) {
        return "Part-time";
      }
    },
    filterJobPayUnit(val) {
      if (val) {
        switch (parseInt(val)) {
          case 1:
            return "Per Hour";
            break;
          case 2:
            return "Per Day";
            break;
          case 3:
            return "Per Week";
            break;
          case 4:
            return "Per Month";
            break;
          case 5:
            return "Per Year";
            break;
        }
      } else {
        return "";
      }
    }
  },
  components: { HomeNav, Footer },
  created() {
    this.getJobDesc();
    this.getInfoByToken();
  },
  computed: {},
  methods: {
    getInfoByToken() {
      let token = localStorage.getItem("token");
      if (token) {
        getStatusByToken({ token: token }).then(res => {
          if (res.data.code == 200) {
            this.user_info = res.data.data;
          } else {
            Toast.fail(res.data.msg);
          }
        });
      }
    },
    // 点击join us
    handleClickJoin() {
      this.$router.push("/register");
    },
    handleClickShare() {
      window.location.href = "https://cooperation.apex.link/";
    },
    // 点击apply
    handleClickApply() {
      let token = localStorage.getItem("token");
      if (this.user_info == null) {
        localStorage.setItem('share_job_id',this.teacherMessage.id)
        localStorage.setItem('share_job_cid',this.teacherMessage.cid)
        this.$router.push("/register");
      } else if (this.user_info.status == 0) {
        this.$router.push("/home");
      } else if (this.user_info.status == 1) {
        Dialog.alert({
          confirmButtonText: "OK",
          message:
            "Your application is awaiting for review, please check your registration status via email and apply the position after approved."
        }).then(() => {
          // on close
        });
      } else if (this.user_info.status == 2) {
        jobApplication({
          token: token,
          cid: this.$route.query.cid,
          jid: this.$route.query.id
        }).then(res => {
          if (res.data.code == 200) {
            Dialog.alert({
              confirmButtonText: "OK",
              message:
                "You have submitted the job application successfully, the employer will review your application and contact you soon."
            }).then(() => {
              // on close
            });
          } else {
            Toast(res.data.msg);
          }
        });
      } else if (this.user_info.status == 3) {
        this.$router.push("/result");
      }
    },
    // 获取详情
    getJobDesc() {
      jobDesc({
        id: this.$route.query.id
      }).then(res => {
        if (res.data.code == 200) {
          const result = res.data.data;
          this.teacherMessage = result;
          if (this.teacherMessage.student_age) {
            let studentAges = this.teacherMessage.student_age
              .split(",")
              .map(Number);
            this.studentAgeList.forEach(ele => {
              let ageId = studentAges.find(item => item == ele.id);
              if (ageId) {
                this.agesList.push(ele.value);
              }
            });
          }
          if (this.teacherMessage.teaching_time) {
            let time = this.teacherMessage.teaching_time.split(",");
            if (!time[0] && !time[1]) {
              this.teacherMessage.teaching_time = "";
            }
            if (time[0] == time[1]) {
              this.teacherMessage.teaching_time = time[0];
            }
          }
          if (this.teacherMessage.job_day_time) {
            let time = this.teacherMessage.job_day_time.split(",");
            if (!time[0] && !time[1]) {
              this.teacherMessage.job_day_time = "";
            }
            if (time[0] == time[1]) {
              this.teacherMessage.job_day_time = time[0];
            }
          }
          // if (this.teacherMessage.cert) {
          //   let certs = this.teacherMessage.cert.split(",").map(Number);
          //   this.certificateList.forEach((ele) => {
          //     let certId = certs.find((item) => item == ele.id);
          //     if (certId) {
          //       this.certList.push(ele.value);
          //     }
          //   });
          // }
        } else {
          Toast.fail(res.data.msg);
        }
      });
    }
  }
};
</script>
<style scoped>
.details_wrapper {
  background: #f3fafb;
}
.details_content_wrapper {
  margin-top: 98px;
  padding: 42px 30px 40px 30px;
  background: #fff;
}
.teacher_name h5 {
  margin-bottom: 20px;
  font-size: 36px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.teacher_name .address {
  display: flex;
  font-size: 24px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #078ca9;
}
.teacher_name .address img {
  margin-right: 24px;
  width: 32px;
  height: 32px;
}
.line {
  margin: 40px 0;
  width: 100%;
  height: 1px;
  background: #eeeeee;
}
.name {
  margin-bottom: 20px;
  font-size: 32px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.age_class {
  margin-bottom: 20px;
  font-size: 24px;
  color: #999999;
  font-size: 0.32rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
}
.age_class span {
  display: inline-block;
  color: #666;
  line-height: 40px;
}
.same_class {
  display: flex;
  margin-bottom: 20px;
  font-size: 24px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  line-height: 40px;
}
.same_class span {
  display: block;
  color: #666;
}
.same_class p {
  font-size: 24px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666;
  line-height: 32px;
  text-align: justify;
}
.same_class .lside_tit {
  display: inline-block;
  color: #999999;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.now_btn {
  margin: 0 auto;
  width: 320px;
  height: 80px;
  background: #078ca9;
  border-radius: 4px;
  border: 1px solid #078ca9;
  font-size: 28px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 80px;
  letter-spacing: 1px;
  text-align: center;
}
.details_img {
  margin: 80px auto;
  width: 92%;
  height: 1008px;
}
.join_wrapper {
  padding-top: 40px;
  width: 100%;
  height: 288px;
  background: url(../../assets/join_us.png) no-repeat;
  background-size: cover;
}
.join_wrapper h6 {
  font-size: 32px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  text-align: center;
}
.join_wrapper p {
  margin: 20px auto 40px auto;
  width: 644px;
  height: 64px;
  font-size: 24px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.8);
  line-height: 32px;
  text-align: center;
}
.join_wrapper .join_btn {
  margin: 0 auto;
  width: 360px;
  height: 80px;
  background: #ffffff;
  border-radius: 4px;
  font-size: 28px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #078ca9;
  line-height: 80px;
  letter-spacing: 1px;
  text-align: center;
}
.submit_mask {
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  z-index: 99;
}
.submit_mask .content {
  width: 600px;
  height: 420px;
  background: #ffffff;
  border-radius: 8px;
}
.submit_mask h6 {
  margin-top: 48px;
  font-size: 36px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  text-align: center;
}
.submit_mask p {
  margin: 54px 26px 60px 26px;
  font-size: 28px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  line-height: 40px;
  text-align: center;
}
.submit_mask .mask_line {
  margin: 0 auto;
  width: 96%;
  height: 1px;
  background: #dddddd;
}
.submit_mask .mask_btn {
  margin-top: 28px;
  height: 80px;
  font-size: 32px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #078ca9;
  line-height: 44px;
  letter-spacing: 1px;
  text-align: center;
}
/deep/ .van-cell {
  padding: 0;
}
/deep/ .van-field__control {
  font-weight: 400;
  color: #666;
}
.fuli_tags {
  display: -webkit-box;
  display: -ms-flexbox;
  display: grid;
  margin-left: 24px;
}
.fuli_tags_item {
  text-align: center;
  line-height: 30px;
  background: #078ca9;
  margin: 5px 5px;
  border-radius: 4px;
  color: #fff;
  padding: 0 5px;
  cursor: pointer;
  display: inline;
  line-height: 40px;
}
</style>
