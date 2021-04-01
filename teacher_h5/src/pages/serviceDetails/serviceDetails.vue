<template>
  <div>
    <HomeNav />
    <div class="content_wrapper">
      <h5 class="con_top">
        Please select the following information according to your own situation, we will contact you
      </h5>
      <div class="line"></div>
      <div class="checkbox_wrapper">
        <h6>Do you have Notarized Degree</h6>
        <p>(Bachelor's and above)</p>
        <div class="check_box">
          <van-radio-group v-model="radioDegree" class="clearfix">
            <van-radio name="1" class="first_checked fl">
              <span :class="this.radioDegree ==1 ? 'checkedColor' : 'noCheckedColor'">YES</span>
              <template #icon="props">
                <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" />
              </template>
            </van-radio>
            <van-radio name="2" class="fl">
              <span :class="this.radioDegree ==2 ? 'checkedColor' : 'noCheckedColor'">NO</span>
              <template #icon="props">
                <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" />
              </template>
            </van-radio>
          </van-radio-group>
        </div>
      </div>
      <div class="checkbox_wrapper">
        <h6>Do you have Non-criminal Record</h6>
        <div class="check_box">
          <van-radio-group v-model="radioRecord" class="clearfix">
            <van-radio name="1" class="first_checked fl">
              <span :class="this.radioRecord ==1 ? 'checkedColor' : 'noCheckedColor'">YES</span>
              <template #icon="props">
                <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" />
              </template>
            </van-radio>
            <van-radio name="2" class="fl">
              <span :class="this.radioRecord ==2 ? 'checkedColor' : 'noCheckedColor'">NO</span>
              <template #icon="props">
                <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" />
              </template>
            </van-radio>
          </van-radio-group>
        </div>
      </div>
      <div class="checkbox_wrapper">
        <h6>Do you have Working Reference Letter</h6>
        <p>(2 years and above)</p>
        <div class="check_box">
          <van-radio-group v-model="radioLetter" class="clearfix">
            <van-radio name="1" class="first_checked fl">
              <span :class="this.radioLetter ==1 ? 'checkedColor' : 'noCheckedColor'">YES</span>
              <template #icon="props">
                <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" />
              </template>
            </van-radio>
            <van-radio name="2" class="fl">
              <span :class="this.radioLetter ==2 ? 'checkedColor' : 'noCheckedColor'">NO</span>
              <template #icon="props">
                <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" />
              </template>
            </van-radio>
          </van-radio-group>
        </div>
      </div>
      <div class="submit_btn" @click="handleShowDialog">Submit</div>
      <div class="submit_mask" v-show="showMask">
        <div class="content">
          <h6>notification</h6>
          <p>{{this.maskText}}</p>
          <div class="mask_line"></div>
          <div class="mask_btn" @click="showMask = false">OK</div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import HomeNav from '../../components/homeNav/homeNav'
import Footer from '../../components/footer/footer'
import { RadioGroup, Radio } from 'vant'
export default {
  name: 'serviceDetails',
  data() {
    return {
      radioDegree: '',
      activeIcon: '/static/images/checked.png',
      inactiveIcon: '/static/images/no_checked.png',
      radioRecord: '',
      radioLetter: '',
      showMask: false,
      maskText: ''
    }
  },
  components: { HomeNav, Footer },
  created() {
  },
  computed: {
  },
  methods: {
    handleShowDialog() {
      this.showMask = true;
      if (this.radioDegree == 1 && this.radioRecord == 1 && this.radioLetter == 1) {
        this.maskText = 'Congratulations, the certification is successful, your qualification can apply for a visa'
      } else {
        this.maskText = `Sorry, you are not eligible for visa processing. If you are required to get a visa, you will need to: Notarized Degree (Bachelor's and Above).Non-criminal Record Working Reference Letter (2 years and above)`
      }

    }
  },
}
</script>
<style scoped>
.content_wrapper {
  margin-top: 98px;
  padding: 40px 30px 0 30px;
}
.con_top {
  font-size: 40px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  line-height: 56px;
}
.line {
  margin: 108px 0 62px 0;
  width: 100%;
  height: 1px;
  background: #dddddd;
}
.checkbox_wrapper h6,
.checkbox_wrapper p {
  margin-bottom: 15px;
  font-size: 28px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
}
.check_box {
  display: flex;
  margin: 40px 0 80px 0;
}
.check_box .img-icon {
  width: 32px;
  height: 32px;
}
/deep/ .van-radio__label {
  margin-top: -8px;
}
.first_checked {
  margin-right: 40px;
}
.checkedColor {
  font-size: 24px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #078ca9;
}
.noCheckedColor {
  font-size: 24px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
}
.submit_btn {
  margin: 0 auto 80px auto;
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
  min-height: 420px;
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
  margin: 54px 26px 92px 26px;
  font-size: 28px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  line-height: 40px;
  text-align: left;
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
</style>
