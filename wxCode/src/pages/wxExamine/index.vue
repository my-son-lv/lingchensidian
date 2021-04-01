// 微信审核用
<template>
  <div class="indexContatiner">
    <div class="login_wrapper" v-if="showDef == 1">
      <img src="/static/images/logo.png" alt class="logo" />
      <p class="welcome_text">欢迎使用寰球阿帕斯</p>
      <div class="pass_word_login">
        <input
          type="text"
          placeholder="请输入手机号"
          v-model="userPhone"
          class="user_phone"
          maxlength="11"
        />
        <div class="pass_word_wrapper" style="margin-top: 20px">
          <input
            type="password"
            placeholder="请输入密码"
            v-model="userPassWord"
            class="user_phone"
          />
        </div>
        <div class="login_btn" @click="phoneLogin">登录</div>
      </div>
    </div>
    <div v-if="showDef == 2" class="indexContatiner">
      <div class="top_tips">
        <img
          src="https://files.apex.link/apexlink/2020121519563996705691.png"
          class="resident_img"
        />
        <div class="tips_con">
          <p style="margin: 24px 0 12px 0" class="tips_item">
            简单填写信息入驻平台
          </p>
        </div>
      </div>
      <div class="content">
        <h5 class="basic_information">基本信息</h5>
        <div class="company_name">
          <p class="name">
            学校名称
            <span class="xing">*</span>
          </p>
          <input
            type="text"
            v-model="companyName"
            class="input_name"
            placeholder="请输入学校名称机构类型"
          />
        </div>
        <div class="mechanism_type">
          <h5 class="type_title">
            机构类型
            <span class="xing">*</span>
          </h5>
          <ul class="type_list clearfix">
            <li
              :class="activeClass == index ? 'actived' : ''"
              class="list_item"
              v-for="(item, index) in typeList"
              :key="index"
              @click="getItem(index, item.id)"
            >
              {{ item.value }}
            </li>
          </ul>
        </div>
        <div class="office_address">
          <h5 class="office_title">
            学校地址
            <span class="xing">*</span>
          </h5>
          <div class="choose_address" @click="handleClickShowProvince">
            <p class="tips_content" v-show="showAdress">请选择学校地址</p>
            <p class="tips_content" v-show="!showAdress">
              {{ provinceValue }}/{{ cityValue }}/{{ countyValue }}
            </p>
            <van-icon
              name="arrow"
              class="address_icon"
              color="#CCCCCC"
              size="16px"
            />
          </div>
        </div>
        <div class="detailed_address">
          <h5 class="detailed_title">详细地址</h5>
          <input
            type="text"
            v-model="detailedAddress"
            class="input_name"
            placeholder="请输入详细地址"
          />
        </div>
        <div class="business_license_wrapper">
          <h5 class="business_license_title">营业执照</h5>
          <ul class="btn_wrapper">
            <li
              :class="
                activeBusinessClass == index ? 'active_qualifications' : ''
              "
              class="item"
              v-for="(item, index) in businessLicenseList"
              :key="index"
              @click="getsBusinessItem(index, item.id)"
            >
              {{ item.value }}
            </li>
          </ul>
        </div>
        <div class="upload_wrapper" v-show="showBusinesUpload">
          <h6 class="upload_title">营业执照</h6>
          <p class="upload_tips">
            请上传有年检章的企业营业执照副本扫描件，文件小于2M
            支持JPG/PNG/BMP等格式文件
          </p>
          <uploadImg @uploadBusinessId="getBusinessId"></uploadImg>
        </div>
        <div class="qualifications">
          <h5 class="qualifications_title">办学许可资质</h5>
          <ul class="btn_wrapper">
            <li
              :class="
                activeQualificationsClass == index
                  ? 'active_qualifications'
                  : ''
              "
              class="item"
              v-for="(item, index) in qualificationsList"
              :key="index"
              @click="getQualificationsItem(index, item.id)"
            >
              {{ item.value }}
            </li>
          </ul>
        </div>
        <div class="upload_wrapper" v-show="showQualifications">
          <h6 class="upload_title">办学许可证书</h6>
          <p class="upload_tips">文件小于2M 支持JPG/PNG/BMP等格式文件</p>
          <uploadImg @uploadBusinessId="getQualificationsId"></uploadImg>
        </div>
        <div class="student_age">
          <h5 class="age_title">
            学生年龄
            <span class="xing">*</span>
          </h5>
          <ul class="age_btn clearfix">
            <li
              :class="age.activeClass == true ? 'active_qualifications' : ''"
              class="age_item"
              v-for="(age, index) in ageList"
              :key="index"
              @click="handleClickAge(age.id)"
            >
              {{ age.value }}
            </li>
          </ul>
        </div>
        <!-- <div class="company_name">
          <p class="name">
            外籍员工人数（单位：名）
            <span class="xing">*</span>
          </p>
          <input
            type="number"
            @blur="numberRule"
            v-model="recruitNum"
            class="input_name"
            placeholder="请输入招聘人数"
          />
        </div> -->
        <div class="salary_range">
          <h5 class="range_title">
            年度外教需求数
            <span class="xing">*</span>
          </h5>
          <ul class="clearfix">
            <li
              :class="activeDemandNumClass == index ? 'actived' : ''"
              class="salary_item"
              v-for="(item, index) in demandNumList"
              :key="index"
              @click="getDemandNumItem(index, item.id)"
            >
              {{ item.value }}
            </li>
          </ul>
        </div>
        <!-- <div class="salary_range">
          <h5 class="range_title">
            月均基本工资范围（税后）
            <span class="xing">*</span>
          </h5>
          <ul class="clearfix">
            <li
              :class="activeSalaryClass == index ? 'actived' : ''"
              class="salary_item"
              v-for="(item, index) in salaryList"
              :key="index"
              @click="getSalaryItem(index, item.id)"
            >
              {{ item.value }}
            </li>
          </ul>
        </div> -->
        <h4 class="contacts">联系人信息</h4>
        <div class="contacts_name">
          <h5 class="name_title">
            联系人姓名
            <span class="xing">*</span>
          </h5>
          <input
            type="text"
            v-model="contactsName"
            class="input_name"
            placeholder="请输入联系人姓名"
          />
        </div>
        <div class="contacts_name">
          <h5 class="name_title">
            联系电话
            <span class="xing">*</span>
          </h5>
          <input
            type="text"
            v-model="contactsPhone"
            @blur="phoneRule"
            class="input_name"
            maxlength="11"
            placeholder="请输入电话号码"
          />
        </div>
        <div class="contacts_name">
          <h5 class="name_title">
            工作邮箱
            <!-- <span class="xing">*</span> -->
          </h5>
          <input
            type="text"
            v-model="contactsEmail"
            @blur="emailRule"
            class="input_name"
            placeholder="请输入您的工作邮箱"
          />
        </div>
      </div>
      <div class="submit_btn" @click="handleClickSubmit">提交</div>
    </div>
    <div class="go_content" v-if="showDef == 3">
      <img class="review_img" src="/static/images/icon_review.png" />
      <p class="submit_success">您的资料已提交成功</p>
      <p class="end_content">我们将在1-3个工作日内完成审核</p>
    </div>
    <van-popup :show="showProvincePicker" overlay position="bottom">
      <van-picker
        title="选择省份"
        show-toolbar
        :columns="provinceColumns"
        @confirm="onProvinceConfirm"
        @cancel="hideProvincePicker"
      />
    </van-popup>
    <van-popup :show="showCityPicker" overlay position="bottom">
      <van-picker
        title="选择城市"
        show-toolbar
        :columns="cityColumns"
        @confirm="onCityConfirm"
        @cancel="hideCityPicker"
      />
    </van-popup>
    <van-popup :show="showCountyPicker" overlay position="bottom">
      <van-picker
        title="选择区县"
        show-toolbar
        :columns="countyColumns"
        @confirm="onCountyConfirm"
        @cancel="hideCountyPicker"
      />
    </van-popup>
    <van-notify id="van-notify" class="van-notify" />
  </div>
</template>

<script>
import uploadImg from "../../components/uploadImg/uploadImg";
import Notify from "@/../static/vant/notify/notify";
export default {
  data() {
    return {
      companyName: "",
      typeList: [
        {
          value: "公立学校",
          id: 2,
        },
        {
          value: "私立学校",
          id: 3,
        },
        {
          value: "中介机构",
          id: 4,
        },
        {
          value: "幼儿园",
          id: 5,
        },
        {
          value: "其他",
          id: 6,
        },
      ],
      showDef: 1,
      userPhone: "",
      userPassWord: "",
      activeClass: 0,
      activeBusinessClass: 1,
      cityId: 100000,
      businessId: 0,
      provinceColumns: [],
      allProvinceArr: [],
      provinceValue: "",
      showProvincePicker: false,
      showCityPicker: false,
      cityColumns: [],
      allCityArr: [],
      cityValue: "",
      showCountyPicker: false,
      countyColumns: [],
      allCountyArr: [],
      countyValue: "",
      showAdress: true,
      detailedAddress: "",
      qualificationsList: [
        {
          value: "具备",
          id: 1,
        },
        {
          value: "不具备",
          id: 0,
        },
      ],
      activeQualificationsClass: 1,
      qualificationsId: 0,
      talent: 0,
      showQualifications: false,
      ageList: [
        {
          value: "0-3岁",
          id: 1,
        },
        {
          value: "3-6岁",
          id: 2,
        },
        {
          value: "7-12岁",
          id: 3,
        },
        {
          value: "13-18岁",
          id: 4,
        },
        {
          value: "18岁以上",
          id: 5,
        },
      ],
      chooseStudentList: [],
      salaryList: [
        {
          value: "10-15K",
          id: 1,
        },
        {
          value: "15K-20K",
          id: 2,
        },
        {
          value: "20K以上",
          id: 3,
        },
      ],
      activeSalaryClass: 0,
      contactsName: "",
      contactsPhone: "",
      contactsEmail: "",
      businessLicenseList: [
        {
          value: "具备",
          id: 1,
        },
        {
          value: "不具备",
          id: 0,
        },
      ],
      businessFlg: 0,
      showBusinesUpload: false,
      typeId: 1,
      payId: 1,
      recruitNum: "",
      demandNumList: [
        {
          value: "1-3",
          id: 1,
        },
        {
          value: "3-6",
          id: 2,
        },
        {
          value: "6-10",
          id: 3,
        },
        {
          value: "10-20",
          id: 4,
        },
        {
          value: "20-50",
          id: 5,
        },
        {
          value: "50及以上",
          id: 6,
        },
      ],
      activeDemandNumClass: 0,
      needsNum: 1,
    };
  },

  components: { uploadImg },

  methods: {
    // 获取省市区
    async getArea() {
      const res = await this.$httpWX.post({
        url: "/api/company/getCity",
        data: {
          id: this.cityId,
        },
      });
      if (res.code == 200) {
        this.provinceColumns = res.data.map((item) => item.name);
        this.allProvinceArr = res.data;
      }
    },
    getDemandNumItem(index, id) {
      this.activeDemandNumClass = index;
      this.needsNum = id;
    },
    getItem(index, id) {
      this.typeId = id;
      this.activeClass = index;
    },
    getQualificationsItem(index, id) {
      this.talent = id;
      if (id == 1) {
        this.showQualifications = true;
      } else {
        this.showQualifications = false;
      }
      this.activeQualificationsClass = index;
    },
    getsBusinessItem(idx, id) {
      this.businessFlg = id;
      this.activeBusinessClass = idx;
      if (id == 1) {
        this.showBusinesUpload = true;
      } else {
        this.showBusinesUpload = false;
      }
    },
    // 接收营业执照id
    getBusinessId(obj) {
      this.businessId = obj;
    },
    // 省份展开
    handleClickShowProvince() {
      this.showProvincePicker = true;
    },
    // 省份确认按钮
    async onProvinceConfirm(event) {
      const idx = event.mp.detail.index;
      this.provinceValue = event.mp.detail.value;
      this.cityId = this.allProvinceArr[idx].id;
      const res = await this.$httpWX.post({
        url: "/api/company/getCity",
        data: {
          id: this.cityId,
        },
      });
      if (res.code == 200) {
        this.cityColumns = res.data.map((item) => item.name);
        this.allCityArr = res.data;
      }
      this.showProvincePicker = false;
      this.showCityPicker = true;
    },
    // 省份取消按钮
    hideProvincePicker() {
      this.showProvincePicker = false;
    },
    // 选择城市确认按钮
    async onCityConfirm(event) {
      const idx = event.mp.detail.index;
      this.cityId = this.allCityArr[idx].id;
      this.cityValue = event.mp.detail.value;
      const res = await this.$httpWX.post({
        url: "/api/company/getCity",
        data: {
          id: this.cityId,
        },
      });
      if (res.code == 200) {
        this.countyColumns = res.data.map((item) => item.name);
        this.allCountyArr = res.data;
      }
      this.showCityPicker = false;
      this.showCountyPicker = true;
    },
    // 城市取消按钮
    hideCityPicker() {
      this.showCityPicker = false;
    },
    // 区县确认按钮
    onCountyConfirm(event) {
      const idx = event.mp.detail.index;
      this.cityId = this.allCountyArr[idx].id;
      this.countyValue = event.mp.detail.value;
      this.showCountyPicker = false;
      this.showAdress = false;
    },
    // 区县取消按钮
    hideCountyPicker() {
      this.showCountyPicker = false;
    },
    // 接收办学资质id
    getQualificationsId(obj) {
      this.qualificationsId = obj;
    },
    // 点击选择年龄
    handleClickAge(id) {
      if (!this.chooseStudentList.includes(id)) {
        this.chooseStudentList.push(id);
        this.ageList.find((ele) => {
          if (ele.id == id) {
            ele.activeClass = true;
          }
        });
      } else {
        this.chooseStudentList = this.chooseStudentList.filter(
          (cell) => cell !== id
        );
        this.ageList.find((ele) => {
          if (ele.id == id) {
            ele.activeClass = false;
          }
        });
      }
    },
    getSalaryItem(index, id) {
      this.payId = id;
      this.activeSalaryClass = index;
    },
    // 提交信息
    async handleClickSubmit() {
      if (
        this.companyName == "" ||
        this.provinceValue == "" ||
        this.chooseStudentList.length == 0 ||
        this.contactsName == "" ||
        this.contactsPhone == "" 
        // || this.contactsEmail == ""
      ) {
        Notify({ type: "warning", message: "您有信息未填写" });
      } else {
        Notify({
          type: "warning",
          message: "您的入驻申请，已提交成功，等待审核结果",
        });
        this.showDef = 3;
      }
    },
    numberRule() {
      let flag = new RegExp("^[1-9]([0-9])*$").test(this.recruitNum);
      if (!flag) {
        Notify({ type: "warning", message: "请输入正确外籍人工数" });
        this.recruitNum = "";
      }
    },
    phoneRule() {
      let reg = /^1[3-9][0-9]{9}$/;
      if (!reg.test(this.contactsPhone)) {
        Notify({ type: "warning", message: "请输入正确手机号" });
      }
    },
    emailRule() {
      if (this.contactsEmail) {
        var reg = new RegExp(
          "^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"
        );
        if (!reg.test(this.contactsEmail)) {
          Notify({ type: "warning", message: "请输入正确邮箱" });
          this.contactsEmail = "";
        }
      }
    },
    // 立即体验
    handleClickJumpIndex() {
      wx.switchTab({
        url: "../../pages/index/main",
      });
    },
    // 账号登录
    phoneLogin() {
      if (this.userPhone != "17744499986") {
        Notify({ type: "warning", message: "请输入正确手机号" });
      } else {
        this.showDef = 2;
      }
    },
    // 搜索外教
    async getSearchTeacher() {
      let TOKEN = wx.getStorageSync("token");
      const res = await this.$httpWX.post({
        url: "/api/company/searchTeach",
        data: {
          token: TOKEN,
          language_flg: "",
          type: "",
          pay_type: "",
          page: 1,
          pageSize: 10,
        },
      });
      if (res.code == 200) {
        if (res.data.show == 2) {
          wx.switchTab({
            url: "../../pages/index/main",
          });
        }
      }
    },
  },
  onLoad() {},
  onShow() {
    Object.assign(this.$data, this.$options.data());
    this.getArea();
    this.getSearchTeacher();
    if (wx.canIUse("hideHomeButton")) {
      wx.hideHomeButton();
    }
  },
  onUnload() {},
};
</script>
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
.login_wrapper {
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.indexContatiner .content {
  margin-top: 24px;
  width: 90%;
}
.content .basic_information,
.content .contacts {
  font-size: 20px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}
.company_name {
  padding: 24px 0;
  border-bottom: 1px solid #eeeeee;
}
.login_btn {
  margin-top: 20px;
  width: 100%;
  height: 49px;
  background: rgba(7, 140, 169, 1);
  border-radius: 4px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 49px;
  letter-spacing: 1px;
  text-align: center;
}
.company_name .name {
  margin-bottom: 12px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
.login_wrapper .user_pass_word {
  padding: 0 24px;
  width: 70%;
  height: 49px;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  letter-spacing: 1px;
}
.company_name .input_name,
.detailed_address .input_name {
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.login_wrapper .user_phone {
  padding: 0 24px;
  width: 100%;
  height: 49px;
  background: rgba(248, 248, 248, 1);
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  letter-spacing: 1px;
}
.upload_wrapper {
  padding: 24px 0;
  width: 100%;
  height: 245px;
  border-bottom: 1px solid #eeeeee;
}
.upload_wrapper .upload_title {
  margin-bottom: 12px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
.upload_wrapper .upload_tips {
  margin-bottom: 12px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(204, 204, 204, 1);
  line-height: 20px;
  letter-spacing: 1px;
  text-align: justify;
}
.go_content {
  margin-top: 78px;
  padding: 24px 0;
  width: 100%;
  height: 100px;
  background: rgba(248, 248, 248, 1);
  border-radius: 10px;
  text-align: center;
}
.review_img {
  margin-bottom: 12px;
  width: 40px;
  height: 40px;
}
.submit_success,
.end_content {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 24px;
}
.mechanism_type {
  padding: 24px 0;
  width: 343px;
  height: 121px;
  border-bottom: 1px solid rgba(238, 238, 238, 1);
}
.mechanism_type .type_title,
.office_title,
.detailed_title,
.qualifications .qualifications_title,
.student_age .age_title,
.range_title,
.contacts_name .name_title,
.business_license_title {
  margin-bottom: 12px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
.type_list .list_item {
  margin: 0 12px 12px 0;
  float: left;
  width: 106px;
  height: 40px;
  background: rgba(248, 248, 248, 1);
  border-radius: 4px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 40px;
  text-align: center;
}
.list_item:nth-child(3),
.list_item:nth-child(6) {
  margin-right: 0;
}
.actived {
  background: #078ca9 !important;
  color: #ffffff !important;
}
.office_address {
  padding: 24px 0;
  width: 100%;
  height: 51px;
  border-bottom: 1px solid #eeeeee;
}
.choose_address {
  position: relative;
  width: 100%;
  height: 22px;
}
.choose_address .tip_content {
  width: 250px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.choose_address .address_icon {
  position: absolute;
  top: 0;
  right: 0;
}
.login_wrapper .logo {
  margin: 46rpx auto 22rpx auto;
  width: 104rpx;
  height: 104rpx;
}
.pass_word_login {
  width: 100%;
}
.login_wrapper .welcome_text {
  margin-bottom: 48rpx;
  font-size: 20px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  letter-spacing: 1px;
}
.detailed_address {
  padding: 24px 0;
  width: 100%;
  height: 74px;
  background: rgba(255, 255, 255, 1);
  border-bottom: 1px solid #eeeeee;
}
.qualifications,
.business_license_wrapper {
  padding: 24px 0;
  width: 100%;
  height: 70px;
  background: rgba(255, 255, 255, 1);
  border-bottom: 1px solid #eeeeee;
}
.btn_wrapper {
  display: flex;
  width: 100%;
}
.btn_wrapper .item {
  flex: 1;
  margin-right: 12px;
  height: 40px;
  background: #f8f8f8;
  border-radius: 4px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333;
  line-height: 40px;
  text-align: center;
}
.btn_wrapper .item:nth-child(2) {
  margin-right: 0;
}
.active_qualifications {
  background: #078ca9 !important;
  color: #ffffff !important;
}
.student_age {
  padding: 24px 0;
  width: 100%;
  height: 122px;
  background: rgba(255, 255, 255, 1);
  border-bottom: 1px solid #eeeeee;
}
.age_btn .age_item {
  margin: 0 9px 12px 0;
  float: left;
  width: 106px;
  height: 40px;
  background: rgba(248, 248, 248, 1);
  border-radius: 4px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 40px;
  text-align: center;
}
.age_item:nth-child(3) {
  margin-right: 0;
}
.salary_range {
  padding: 24px 0;
  width: 100%;
  height: 70px;
  background: rgba(255, 255, 255, 1);
  border-bottom: 1px solid #eeeeee;
}
.salary_range .salary_item {
  float: left;
  margin-right: 9px;
  width: 106px;
  height: 40px;
  background: rgba(248, 248, 248, 1);
  border-radius: 4px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 40px;
  text-align: center;
}
.salary_item:nth-child(3) {
  margin-right: 0;
}
.contacts {
  margin-top: 24px;
}
.contacts_name {
  padding: 24px 0;
  width: 100%;
  height: 52px;
  background: rgba(255, 255, 255, 1);
  border-bottom: 1px solid #eeeeee;
}
.submit_btn {
  margin: 32px 0 40px 0;
  width: 90%;
  height: 49px;
  background: rgba(7, 140, 169, 1);
  border-radius: 4px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 49px;
  letter-spacing: 1px;
  text-align: center;
}
.van-notify {
  width: 100%;
}
.xing {
  display: inline-block;
  color: rgba(255, 96, 16, 1);
}
.top_tips {
  position: relative;
  width: 100%;
  height: 172px;
}
.resident_img {
  width: 100%;
  height: 100%;
}
.tips_con {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
}
.tips_con .tips_item {
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  letter-spacing: 1px;
}
.experience_btn {
  margin: 24px auto;
  width: 152px;
  height: 40px;
  background: #ffffff;
  border-radius: 4px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #078ca9;
  line-height: 40px;
}
</style>
