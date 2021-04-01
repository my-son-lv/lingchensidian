<template>
  <div>
    <HomeNav />
    <div class="service_wrapper">
      <div class="top_wrapper">
        <h2>Foreign Talent Service</h2>
        <p>
          We will help job seekers who want to work in China with professional guidance and enter China faster . Foreign talents enjoy the best service on our platform
        </p>
      </div>
      <div class="line"></div>
      <div class="service_list">
        <div class="list_item">
          <img src="../../assets/sure.png" />
          <p>TESOL Certificate</p>
        </div>
        <div class="list_item">
          <img src="../../assets/sure.png" />
          <p>Pre-service training</p>
        </div>
        <div class="list_item">
          <img src="../../assets/sure.png" />
          <p>Employment change</p>
        </div>
        <div class="list_item">
          <img src="../../assets/sure.png" />
          <p>Professional Promotion training</p>
        </div>
      </div>
      <h3>Visa Service</h3>
      <div class="online_wrapper">
        <h4>Online qualification</h4>
        <p>Online certification to check whether you are qualified to apply for a work visa</p>
        <div class="btn_wrapper" @click="handleJumpServiceDetails">Certification</div>
      </div>
      <div class="online_wrapper">
        <h4>Upload visa documents</h4>
        <p>Now we will certify the working documents. If the documents are eligible we can assist you with visa application as soon as possible</p>
        <div class="btn_wrapper" @click="handleJumpServiceDetails">To handle the</div>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import HomeNav from '../../components/homeNav/homeNav'
import Footer from '../../components/footer/footer'
export default {
  name: 'service',
  data() {
    return {
    }
  },
  components: { HomeNav, Footer },
  created() {
  },
  computed: {
  },
  methods: {
    handleJumpServiceDetails() {
      this.$router.push('/serviceDetails');
    }
    //   
  },
}
</script>
<style scoped>
.service_wrapper {
  margin-top: 98px;
  padding: 80px 32px 0 32px;
  background: #f3fafb;
}
.top_wrapper h2 {
  margin-bottom: 40px;
  font-size: 40px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.top_wrapper p {
  font-size: 24px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  line-height: 34px;
  text-align: justify;
}
.line {
  margin-top: 82px;
  width: 100%;
  height: 1px;
  background: #dddddd;
}
.service_list {
  margin-top: 78px;
}
.list_item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
  height: 96px;
  background: #333333;
}
.list_item img {
  margin-left: 42px;
  width: 32px;
  height: 32px;
}
.list_item p {
  margin-left: 14px;
  font-size: 24px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #b8e986;
}
h3 {
  margin: 80px 0;
  font-size: 36px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  text-align: center;
}
.online_wrapper {
  margin-bottom: 20px;
  padding: 40px;
  background: #ffffff;
}
.online_wrapper h4 {
  font-size: 32px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.online_wrapper p {
  margin: 20px 0 40px 0;
  width: 100%;
  font-size: 24px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  line-height: 32px;
  text-align: justify;
}
.online_wrapper .btn_wrapper {
  width: 100%;
  height: 80px;
  background: rgba(7, 140, 169, 0);
  border-radius: 4px;
  border: 1px solid #078ca9;
  font-size: 28px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #078ca9;
  line-height: 80px;
  letter-spacing: 1px;
  text-align: center;
}
</style>
