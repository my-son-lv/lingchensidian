<template>
  <div class="wrapper">
    <div class="back">
      <div class="btn" @click="handleClickBack">
        <img src="../../assets/image/back.png" class="back_img" />
        Back
      </div>
    </div>
    <div class="desc_wrapper clearfix" v-if="jobInfo != null">
      <div class="job_info fl">
        <div class="job_title" style="width:90%;line-height:48px;">{{ jobInfo.name }}</div>
        <p class="adress">
          <span class="lside_icon">
            <img src="../../assets/image/info_c3_2.png" alt />
          </span>
          {{ jobInfo.job_city_data.pinyin }}，{{
          jobInfo.job_province_data.pinyin
          }}，China
        </p>
        <div style="position: absolute;top: 48px;right: 26px;">
          <el-popover trigger="hover">
            <div class="qrcode">
              <div ref="qrCodeUrl" id="qrcode"></div>
              <div
                style="font-size:12px;line-height:28px;text-align:center;color:#bdb3b3;"
              >Scan to check on smartphone</div>
            </div>
            <el-button slot="reference" style="padding: 0;margin: 0;border: unset;">
              <img
                src="../../assets/image/erweima.png"
                style="width:64px;height:64px;"
                lot="reference"
              />
            </el-button>
          </el-popover>
        </div>
        <!-- <div class="qrcode" style="position: absolute;top: 20px;right: 26px;">
          <div  ref="qrCodeUrl" id="qrcode" ></div>
        <div style="font-size:12px;line-height:28px;text-align:center;color:#bdb3b3;">Scan to check on smartphone</div>
        </div>-->
        <div class="line"></div>
        <div style="margin-bottom: 30px;">
          <h6 class="con_title">Job Description</h6>
          <div class="info_con">
            <div class="info_con_item">
              <div class="info_con_left">
                <span class="item_title">Location:</span>
                <span class="item_content">{{jobInfo.job_city_data.pinyin}}</span>
              </div>
              <div class="info_con_left">
                <span class="item_title">Working Hours(weekly):</span>
                <span
                  class="item_content"
                >{{ jobInfo.job_day_time ? jobInfo.job_day_time.split(",").join("-")+' hours' : ''}}</span>
              </div>
            </div>
          </div>

          <div class="info_con">
            <div class="info_con_item">
              <div class="info_con_left">
                <span class="item_title">Job Category:</span>
                <span
                  class="item_content"
                >{{jobInfo.type == 3 ? 'Offline，Online' : (jobInfo.type == 2 ? 'Online' : 'Offline')}}</span>
              </div>
              <div class="info_con_left">
                <span class="item_title">Teaching Hours(weekly):</span>
                <span
                  class="item_content"
                >{{jobInfo.teaching_time ? jobInfo.teaching_time.split(",").join("-") + ' hours' : ''}}</span>
              </div>
            </div>
          </div>

          <div class="info_con">
            <div class="info_con_item">
              <div class="info_con_left">
                <span class="item_title">Job Type:</span>
                <span
                  class="item_content"
                >{{jobInfo.work_type == 1 ? 'Full-time，Part-time' : ( jobInfo.work_type == 2 ? 'Full-time' : 'Part-time')}}</span>
              </div>
              <div class="info_con_left">
                <span
                  class="item_title"
                >Salary ({{ parseInt(jobInfo.pay_unit) | filterJobPayUnit}}):</span>
                <span
                  class="item_content"
                >{{ jobInfo.pay ? '￥' + jobInfo.pay.split(",").join("-") : ''}}</span>
              </div>
            </div>
          </div>

          <div class="info_con">
            <div class="info_con_item">
              <div class="info_con_left" style="width:100%;">
                <span class="item_title">Age of Students:</span>
                <span class="item_content">
                  <span
                    v-for="(age, index) in agesList"
                    :key="index"
                    style="margin-bottom: 10px; display: inline-block"
                  >{{ agesList.length -1 == index ? age :age+'，' }}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="line"></div>
        <div style="margin-bottom: 30px;">
          <h6 class="con_title">Job Details</h6>
          <div class="item_content" style="line-height: 23px;">
            <el-input
              class="text_input"
              disabled
              type="textarea"
              autosize
              resize
              v-model="jobInfo.job_info"
            ></el-input>
          </div>
        </div>
        <div class="line"></div>
        <div style="margin-bottom: 30px;">
          <h6 class="con_title">Benefits</h6>
          <div
            class="fuli_tags"
            v-if="jobInfo.benefits_tag"
            style="line-height:20px;margin-top:10px"
          >
            <div class="fuli_tags_item" v-if="jobInfo.benefits_tag.indexOf('1') !=-1">Annual Bonus</div>
            <div class="fuli_tags_item" v-if="jobInfo.benefits_tag.indexOf('2') !=-1">Insurance</div>
            <div class="fuli_tags_item" v-if="jobInfo.benefits_tag.indexOf('3') !=-1">Apartment</div>
            <div
              class="fuli_tags_item"
              v-if="jobInfo.benefits_tag.indexOf('4') !=-1"
            >House Allowance</div>
            <div
              class="fuli_tags_item"
              v-if="jobInfo.benefits_tag.indexOf('5') !=-1"
            >Flight Allowance</div>
            <div class="fuli_tags_item" v-if="jobInfo.benefits_tag.indexOf('6') !=-1">Paid Leave</div>
          </div>
          <div class="item_content">
            <el-input
              class="text_input"
              disabled
              type="textarea"
              autosize
              resize
              v-model="jobInfo.benefits"
            ></el-input>
          </div>
        </div>
        <div style="margin-bottom: 30px;">
          <h6 class="con_title">Job Requirements</h6>
          <div class="info_con_item">
            <div class="info_con_left_all">
              <span class="item_title">Gender:</span>
              <span class="item_content">{{jobInfo.sex | filterSex}}</span>
            </div>
          </div>
          <div class="info_con_item">
            <div class="info_con_left_all">
              <span class="item_title">Degree Required:</span>
              <span
                class="item_content"
              >{{jobInfo.edu_type == 1 || jobInfo.edu_type == 4 ? 'Bachelor and above' : (jobInfo.edu_type == 2 ? 'Master and above' : 'PHD and above')}}</span>
            </div>
          </div>

          <div class="info_con_item">
            <div class="info_con_left_all">
              <span class="item_title">Qualification Certificate:</span>
              <span class="item_content">
                <span>{{jobInfo.cert ==1 ? 'Required' : 'Not required'}}</span>
              </span>
            </div>
          </div>

          <div class="info_con_item">
            <div class="info_con_left_all">
              <span class="item_title">Experience in Teaching:</span>
              <span class="item_content">{{jobInfo.job_year | filterJobYear}}</span>
            </div>
          </div>
        </div>

        <div class="line" v-if="jobInfo.company.vip"></div>
        <div style="margin-bottom: 30px;" v-if="jobInfo.company.vip">
          <h6 class="con_title">About Employer</h6>
          <div class="schoole_info">
            <div class="school_img">
              <img
                :src="jobInfo.company.logo ? jobInfo.company.logo.path:  'https://api.apex.link/logo/company_defaut_logo.png' "
              />
            </div>
            <div style="margin-left:20px;margin-top:0px;">
              <div
                style="font-size:18px;font-weight:500;line-height:40px;"
              >{{jobInfo.company.company_name}}</div>
              <div>
                <div class="info_con_left_all" style="line-height:30px;">
                  <span class="item_title" style="width:unset;">School Type：</span>
                  <span
                    style="color:#999999;"
                    v-for="(v,index) in jobInfo.company.type.split(',')"
                    :key="index"
                  >{{ (index+1) == jobInfo.company.type.split(',').length ? typeList[v-1].txt : typeList[v-1].txt + ', ' }}</span>
                </div>
              </div>
              <div class="info_con_left_all" style="line-height:30px;">
                <span class="item_title" style="width:unset;">Recruit Number：</span>
                <span class="item_content" style="color:#999999;">{{jobInfo.num }}</span>
              </div>
            </div>
          </div>

          <div style="margin: 30px 0;" v-if="jobInfo.company.vip">
            <h6 class="con_title">About Us</h6>
            <div
              class="item_content"
            >{{jobInfo.company.school_en_info!=null && jobInfo.company.school_en_info ? jobInfo.company.school_en_info : 'None'}}</div>
          </div>
        </div>

        <div class="info_con">
          <div class="line" style="margin-top: 40px"></div>
          <div style="text-align:center">
            <div class="apply_btn" @click="handleClickApply">Apply Now</div>
            <div class="fengxiang fa fa-share-square" @mouseenter="enter" @mouseleave="leave">
              Share Job
              <div class="fengxiang_list" v-if="fx_flg">
                <ShareNetwork
                  v-for="network in networks"
                  :network="network.network"
                  :key="network.network"
                  :style="{backgroundColor: network.color}"
                  :url="sharing.url"
                  :title="sharing.title"
                  :description="sharing.description"
                  :quote="sharing.quote"
                  :hashtags="sharing.hashtags"
                  :twitterUser="sharing.twitterUser"
                >
                  <i :class="network.icon"></i>
                  <span>{{ network.name }}</span>
                </ShareNetwork>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <img src="../../assets/image/ad.png" class="right_img fl" @click="handleClickShare" /> -->

      <div class="right_img1 fl">
        <img
          src="../../assets/image/ad.png"
          style="width:100%;height:410px;"
          @click="handleClickShare"
        />

        <div class="click_detaile" @click="handleClickShare">Click the details</div>
      </div>
    </div>
    <div class="join_us_wrapper">
      <div class="join_con clearfix">
        <div class="lside_con fl">
          <p class="l_con">Join us</p>
          <p class="find">Upload your profile and resume so that more employers can find you</p>
        </div>
        <div class="rside_btn fr">LET'S GO！</div>
      </div>
    </div>
    <footerBottom></footerBottom>
  </div>
</template>

<script>
import footerBottom from "../../components/footer/footer";
import { jobDesc, getInfoByToken } from "../../apis/baseUrls";
import axios from "../../apis/http";
import "font-awesome/css/font-awesome.min.css";
import QRCode from "qrcodejs2";

export default {
  name: "jobsDetails",
  components: { footerBottom },
  data() {
    return {
      fx_flg: 0,
      sharing: {
        url: "",
        title: "",
        description: ""
        // quote: "The hot reload is so fast it's near instant. - Evan You",
        // hashtags: "vuejs,vite,javascript",
        // twitterUser: "youyuxi",
      },
      typeList: [
        {
          id: 1,
          txt: "Training Center"
        },
        {
          id: 2,
          txt: "Kindergarten"
        },
        {
          id: 3,
          txt: "Promary School"
        },
        {
          id: 4,
          txt: "Middle School"
        },
        {
          id: 5,
          txt: "High School"
        },
        {
          id: 6,
          txt: "University"
        }
      ],
      networks: [
        {
          network: "facebook",
          name: "Facebook",
          icon: "fab fah fa-lg fa fa-facebook-f",
          color: "#1877f2"
        },
        {
          network: "twitter",
          name: "Twitter",
          icon: "fab fah fa-lg fa fa-twitter",
          color: "#1da1f2"
        },
        {
          network: "linkedin",
          name: "LinkedIn",
          icon: "fab fah fa-lg fa fa-linkedin",
          color: "#007bb5"
        },
        {
          network: "telegram",
          name: "Telegram",
          icon: "fab fah fa-lg fa fa-telegram",
          color: "#0088cc"
        },
        {
          network: "skype",
          name: "Skype",
          icon: "fab fah fa-lg fa fa-skype",
          color: "#00aff0"
        },
        {
          network: "whatsapp",
          name: "Whatsapp",
          icon: "fab fah fa-lg fa fa-whatsapp",
          color: "#25d366"
        },
        {
          network: "weibo",
          name: "Weibo",
          icon: "fab fah fa-lg fa fa-weibo",
          color: "#e9152d"
        },
        {
          network: "quora",
          name: "Quora",
          icon: "fab fah fa-lg fa fa-quora",
          color: "#a82400"
        }
      ],
      jobInfo: null,
      agesList: [],
      studentAgeList: [
        { value: "0-3years old", id: 1 },
        { value: "3-6years old", id: 2 },
        { value: "7-12years old", id: 3 },
        { value: "13-18years old", id: 4 },
        { value: "18+years old", id: 5 }
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
      user_info: null,
      token: "",
      job_tag_Select: 1
    };
  },
  computed: {},
  watch: {},
  methods: {
    enter: function() {
      this.fx_flg = 1;
    },
    leave: function() {
      this.fx_flg = 0;
    },
    //   获取详情
    async getJobDesc() {
      let res = await jobDesc({
        id: this.$route.query.id
      });
      if (res.data.code == 200) {
        this.jobInfo = res.data.data;
        if (this.jobInfo.student_age) {
          let studentAges = this.jobInfo.student_age.split(",").map(Number);
          this.studentAgeList.forEach(ele => {
            let ageId = studentAges.find(item => item == ele.id);
            if (ageId) {
              this.agesList.push(ele.value);
            }
          });
        }
        if (this.jobInfo.teaching_time) {
          let time = this.jobInfo.teaching_time.split(",");
          if (!time[0] && !time[1]) {
            this.jobInfo.teaching_time = "";
          }
          if (time[0] == time[1]) {
            this.jobInfo.teaching_time = time[0];
          }
        }
        if (this.jobInfo.job_day_time) {
          let time = this.jobInfo.job_day_time.split(",");
          if (!time[0] && !time[1]) {
            this.jobInfo.job_day_time = "";
          }
          if (time[0] == time[1]) {
            this.jobInfo.job_day_time = time[0];
          }
        }
        // if (this.jobInfo.cert) {
        //   let certs = this.jobInfo.cert.split(",").map(Number);
        //   this.certificateList.forEach((ele) => {
        //     let certId = certs.find((item) => item == ele.id);
        //     if (certId) {
        //       this.certList.push(ele.value);
        //     }
        //   });
        // }
        this.sharing.url = window.location.href;
        this.sharing.title = res.data.data.name;
        this.sharing.title = res.data.data.benefits;
      }
    },
    handleClickShare() {
      window.location.href = "https://cooperation.apex.link";
    },
    handleClickBack() {
      this.$router.go(-1);
    },
    // 获取用户信息
    async getUserInfo() {
      let res = await getInfoByToken({
        token: this.token
      });
      if (res.data.code == 200) {
        this.user_info = res.data.data;
      }
    },
    // 点击apply
    handleClickApply() {
      if (this.user_info == null) {
        this.$router.push("/register");
      } else if (this.user_info.status == 0) {
        this.$router.push("/welcome");
      } else if (this.user_info.status == 1) {
        this.$alert(
          "Your application is awaiting for review, please check your registration status via email and apply the position after approved.",
          {
            confirmButtonText: "OK"
          }
        );
      } else if (this.user_info.status == 2) {
        axios
          .post("/api/admin/teach/jobApplication", {
            cid: this.$route.query.cid,
            jid: this.$route.query.id,
            token: this.token
          })
          .then(res => {
            if (res.code == 200) {
              this.$alert(
                "You have submitted the job application successfully, the employer will review your application and contact you soon.",
                {
                  confirmButtonText: "OK"
                }
              );
            } else {
              this.$message.error(res.msg);
            }
          });
      } else if (this.user_info.status == 3) {
        this.$router.push("/toExaminePage");
      }
    },

    qrcode() {
      let qrcode = new QRCode("qrcode", {
        text:
          "https://m.teach.apex.link/#/jobsDetails?id=" +
          this.$route.query.id +
          "&cid=" +
          this.$route.query.cid, // 需要转换为二维码的内容
        width: 180,
        height: 180,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
    }
  },
  created() {
    this.token = localStorage.getItem("token");
    this.getJobDesc();
    if (this.token) {
      this.getUserInfo();
    }
    this.$emit("passParent", 1);
    this.$nextTick(() => {
      setTimeout(() => {
        this.qrcode();
      }, 500);
    });
  },
  mounted() {}
};
</script>

<style scoped>
.wrapper {
  margin-top: 80px;
  background: #f3fafb;
}
.desc_wrapper {
  margin: 0 auto 20px auto;
  width: 1210px;
}
.desc_wrapper .job_info {
  padding: 40px 20px 0 20px;
  width: 840px;
  background: #ffffff;
  position: relative;
}
.right_img {
  margin-left: 20px;
  width: 280px;
  height: 410px;
}
.right_img1 {
  margin-left: 20px;
  width: 280px;
  height: 510px;
  background: white;
}
.back {
  margin: 20px auto;
  width: 1210px;
}
.back .back_img {
  margin-right: 5px;
  width: 16px;
  height: 16px;
}
.back .btn {
  display: flex;
  padding-top: 20px;
  width: 60px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  cursor: pointer;
}
.job_title {
  font-size: 34px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.desc_wrapper .adress {
  display: flex;
  margin: 20px 0 39px 0;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #078ca9;
}
.desc_wrapper .lside_icon {
  display: inline-block;
  margin-right: 10px;
  vertical-align: middle;
}
.desc_wrapper .line {
  margin-bottom: 30px;
  width: 100%;
  height: 1px;
  background: #eeeeee;
}
.desc_wrapper .con_title {
  margin-bottom: 20px;
  font-size: 22px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.con_item {
  margin-bottom: 20px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
}
.con_item span {
  color: #666666;
}
.age_wrapper {
  display: inline-block;
  color: #666666;
}
.welfare_wrapper {
  display: flex;
  margin-bottom: 20px;
}
.welfare_wrapper p {
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
}
.apply_btn {
  margin: 0 auto 40px auto;
  width: 160px;
  height: 40px;
  background: #078ca9;
  border-radius: 2px;
  border: 1px solid #078ca9;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 40px;
  letter-spacing: 1px;
  text-align: center;
  cursor: pointer;
  display: inline-block;
}
.join_us_wrapper {
  width: 100%;
  height: 200px;
  background: url("../../assets/image/job_c3.png") no-repeat;
}
.join_con {
  margin: 0 auto;
  padding-top: 52px;
  width: 1210px;
}
.join_con .l_con {
  margin-bottom: 20px;
  font-size: 34px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  letter-spacing: 2px;
}
.join_con .find {
  font-size: 18px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.8);
  letter-spacing: 1px;
}
.rside_btn {
  width: 180px;
  height: 60px;
  background: #ffffff;
  border-radius: 4px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #078ca9;
  line-height: 60px;
  text-align: center;
  cursor: pointer;
}
.fengxiang {
  line-height: 30px;
  color: #0d4ec3;
  text-decoration: underline;
  cursor: pointer;
  margin-left: 20px;
}
.fengxiang_list {
  position: absolute;
  width: 146px;
  border: solid 1px #eee;
  border-bottom-left-radius: 4px;
  margin: 0;
  padding: 0;
  padding: 10px 10px 10px 10px !important;
  background: white;
}
.fengxiang_list a {
  display: block;
  line-height: 30px;
  color: #0d4ec3;
  text-decoration: underline;
  cursor: pointer;
}
.fengxiang_list #share-network-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1000px;
  margin: auto;
}
.fengxiang_list a[class^="share-network-"] {
  flex: none;
  color: #ffffff;
  background-color: #333;
  border-radius: 3px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  cursor: pointer;
  margin: 0 10px 10px 0;
}
.fengxiang_list a[class^="share-network-"] .fah {
  background-color: rgba(0, 0, 0, 0.2);
  padding: 10px;
  flex: 0 1 auto;
  width: 20px !important;
}

.fengxiang_list a[class^="share-network-"] span {
  padding: 0 10px;
  flex: 1 1;
  font-weight: 500;
  width: 20px;
}
.fengxiang_list .fa-hacker-news:before {
  content: "\f1d4";
}
.fuli_tags {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
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
}
.job_tag_item {
  width: 160px;
  text-align: center;
  display: inline-block;
  line-height: 50px;
  font-size: 20px;
  background: #eee;
  border: 1px solid #ece4e4;
  padding: 0 20px;
}
.job_tag_item_active {
  background: #fff;
  border-top: 1px solid #078ca9;
}

.info_con_item {
  display: flex;
  line-height: 46px;
}
.info_con_left {
  width: 50%;
}
.info_con_left_all {
  width: 100%;
}
.info_con_left .item_title,
.info_con_left_all .item_title {
  display: inline-block;
  color: rgb(153, 153, 153);
  margin-right: 5px;
}
.info_con_left .item_content,
.info_con_left_all .item_content {
  color: rgb(80, 80, 80);
}
.schoole_info {
  width: 97%;
  background: #f8f8f8;
  padding: 10px;
  display: flex;
}
.school_img {
  width: 100px;
  height: 100px;
  display: inline-block;
}
.school_img img {
  width: 100%;
  height: 100%;
}
.click_detaile {
  background: #078ca9;
  width: 202px;
  text-align: center;
  margin: 0 auto;
  margin-top: 26px;
  line-height: 48px;
  border-radius: 60px;
  color: white;
  cursor: pointer;
}
.qrcode {
  display: inline-block;
}
.qrcode img {
  width: 132px;
  height: 132px;
  background-color: #fff;
  padding: 6px;
  box-sizing: border-box;
}

.el-textarea >>> .el-textarea__inner {
  background: white !important;
  color: rgb(80, 80, 80) !important;
  border: none;
  resize: none;
  cursor: auto;
  font-size: unset;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  line-height: 34px;

  word-break: break-all;
    overflow: hidden;
}
</style>
