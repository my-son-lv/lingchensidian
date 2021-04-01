<template>
  <div class="wrapper">
    <div class="service_wrapper" v-if="showService">
      <h4>Foreign Talent Service</h4>
      <p class="top_con">We will help job seekers who want to work in China with professional guidance and enter China faster . Foreign talents enjoy the best service on our platform</p>
      <ul class="tesol_wrapper clearfix">
        <li>
          <div class="inner">
            <img src="../../assets/image/visa_01.png" />
            <p>TESOL Certificate</p>
          </div>
        </li>
        <li style="margin-right:0;">
          <div class="inner">
            <img src="../../assets/image/visa_01.png" />
            <p>Pre-service training</p>
          </div>
        </li>
        <li>
          <div class="inner">
            <img src="../../assets/image/visa_01.png" />
            <p>Employment change</p>
          </div>
        </li>
        <li style="margin-right:0;">
          <div class="inner">
            <img src="../../assets/image/visa_01.png" />
            <p>Professional Promotion training</p>
          </div>
        </li>
      </ul>
      <h2>Visa Service</h2>
      <div class="service_bottom_wrapper" style="margin-bottom:20px;">
        <div class="inner_title">Online qualification</div>
        <p>Online certification to check whether you are qualified to apply for a work visa</p>
        <div class="right_btn" @click="handleClickFirst">Certification</div>
      </div>
      <div class="service_bottom_wrapper" style="margin-bottom:90px;">
        <div class="inner_title">Upload visa documents</div>
        <p>Now we will certify the working documents. If the documents are eligible we can assist you with visa application as soon as possible</p>
        <div class="right_btn" @click="handleClickFirst">To handle the</div>
      </div>
    </div>
    <div class="concat_wrapper" v-if="showFirst">
      <div class="top_btn" @click="handleClickBack">
        <img src="../../assets/image/back.png" class="back_img" />
        Back
      </div>
      <h3>Please select the following information according to your own situation, we will contact you</h3>
      <div class="line"></div>
      <ul class="choose_wrapper">
        <li class="clearfix">
          <p class="lside_cont fl">Do you have Notarized Degree (Bachelor's and above)</p>
          <div class="radio_wrapper fr">
            <el-radio v-model="radio" label="1">YES</el-radio>
            <el-radio v-model="radio" label="2">NO</el-radio>
          </div>
        </li>
        <li class="clearfix">
          <p class="lside_cont fl">Do you have Non-criminal Record</p>
          <div class="radio_wrapper fr">
            <el-radio v-model="radio1" label="1">YES</el-radio>
            <el-radio v-model="radio1" label="2">NO</el-radio>
          </div>
        </li>
        <li class="clearfix">
          <p class="lside_cont fl">Do you have Working Reference Letter (2 years and above)</p>
          <div class="radio_wrapper fr">
            <el-radio v-model="radio2" label="1">YES</el-radio>
            <el-radio v-model="radio2" label="2">NO</el-radio>
          </div>
        </li>
      </ul>
      <div class="submit_btn" @click="handleClickSubmit">submit</div>
    </div>
    <footerBottom></footerBottom>
  </div>
</template>
<script>
import footerBottom from '../../components/footer/footer'
export default {
  name: 'service',
  components: {
    footerBottom
  },
  data() {
    return {
      radio: '1',
      radio1: '1',
      radio2: '1',
      showFirst: false,
      showService: true
    }
  },
  created() {
    this.$emit('passParent', 3);
  },
  computed: {
  },
  methods: {
    handleClickFirst() {
      this.showFirst = true;
      this.showService = !this.showService;
    },
    handleClickBack() {
      this.showFirst = false;
      this.showService = !this.showService;
    },
    handleClickSubmit() {
      if (this.radio == "1" && this.radio1 == "1" && this.radio2 == "1") {
        this.$alert(
          "Congratulations, the certification is successful, your qualification can apply for a visa",
          "Notification",
          {
            confirmButtonText: "OK",
            callback: (action) => { },
          }
        );
      } else {
        this.$alert(
          "Sorry, you are not eligible for visa processing. If you are required to get a visa, you will need to: Notarized Degree (Bachelor's and Above). Non-criminal Record Working Reference Letter (2 years and above)",
          "Notification",
          {
            confirmButtonText: "OK",
            callback: (action) => { },
          }
        );
      }
    }
  },
}
</script>
<style scoped>
.wrapper {
  margin-top: 80px;
  background: #f3fafb;
}
.service_wrapper {
  margin: 0 auto;
  padding-top: 40px;
  width: 1183px;
}
.service_wrapper h4 {
  margin-bottom: 20px;
  font-size: 40px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.service_wrapper .top_con {
  margin-bottom: 80px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  line-height: 22px;
}
.tesol_wrapper {
  width: 100%;
}
.tesol_wrapper li {
  display: flex;
  align-items: center;
  justify-content: center;
  float: left;
  margin: 0 20px 20px 0;
  width: 580px;
  height: 160px;
  background: #333333;
}
.tesol_wrapper li .inner {
  display: flex;
}
.tesol_wrapper li .inner img {
  width: 28px;
  height: 28px;
}
.tesol_wrapper li .inner p {
  margin-left: 20px;
  height: 32px;
  font-size: 24px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #b8e986;
  line-height: 32px;
}
.service_wrapper h2 {
  margin: 70px 0 60px 0;
  font-size: 34px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  text-align: center;
}
.service_bottom_wrapper {
  position: relative;
  padding: 50px 40px 50px 50px;
  width: 1183px;
  height: 176px;
  background: #ffffff;
  border-left: 10px solid #078ca9;
  box-sizing: border-box;
}
.service_bottom_wrapper .inner_title {
  margin-bottom: 20px;
  font-size: 24px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  letter-spacing: 1px;
}
.service_bottom_wrapper p {
  width: 750px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  line-height: 22px;
  letter-spacing: 1px;
}
.service_bottom_wrapper .right_btn {
  position: absolute;
  top: 50%;
  right: 40px;
  margin-top: -30px;
  width: 180px;
  height: 60px;
  background: #ffffff;
  border-radius: 4px;
  border: 1px solid #078ca9;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #078ca9;
  line-height: 60px;
  text-align: center;
  cursor: pointer;
}
.concat_wrapper {
  margin: 0 auto;
  padding-top: 40px;
  width: 1183px;
}
.top_btn {
  display: flex;
  padding-top: 20px;
  width: 60px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  cursor: pointer;
}
.top_btn .back_img {
  margin-right: 5px;
  width: 16px;
  height: 16px;
}
.concat_wrapper h3 {
  margin: 40px 0;
  width: 100%;
  font-size: 40px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  line-height: 56px;
}
.line {
  margin-bottom: 40px;
  width: 100%;
  height: 1px;
  background: #eeeeee;
}
.choose_wrapper {
  margin-bottom: 90px;
  width: 100%;
}
.choose_wrapper li .lside_cont {
  width: 680px;
  height: 30px;
  font-size: 22px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  line-height: 30px;
}
.choose_wrapper li:nth-child(2) {
  margin: 40px 0;
}
.radio_wrapper {
  line-height: 30px;
}
.submit_btn {
  margin: 0 auto 222px auto;
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
}
</style>
