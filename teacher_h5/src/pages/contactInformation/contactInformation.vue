<!-- 第二步 -->
<template>
  <div class>
    <submitTitle :titleContent="titleContent"></submitTitle>
    <div class="tips">
      <p>Please fill in your education information</p>
      <p style="margin-top:5px;">Your employer knows more about you</p>
    </div>
    <div class="submit_messages">
      <div class="message_wrapper van-hairline--bottom date_wrapper">
        <div class="Nation_asterisk">*</div>
        <van-field
          readonly
          clickable
          name="picker"
          :value="degreeValue"
          label="Highest Degree"
          @click="showDegreePicker = true"
        />
        <van-popup v-model="showDegreePicker" position="bottom">
          <van-picker
            :item-height="45"
            show-toolbar
            :columns="degreeList"
            @confirm="onDegreeConfirm"
            @cancel="showDegreePicker = false"
            confirm-button-text="confirm"
            cancel-button-text="cancel"
            title="Highest Academic degree"
          />
        </van-popup>
        <img src="../../assets/down.png" class="icon" />
      </div>
      <div class="message_wrapper van-hairline--bottom">
        <div class="left_title">Education Background</div>
        <div class="University_asterisk">*</div>
        <div
          class="picker_wrapper clearfix"
          v-for="(item, index) in education"
          :key="index"
        >
          <div class="start_date fl" @click="handleClickStart(index)">
            {{ item.edu_start_time ? item.edu_start_time : "Start Time" }}
          </div>
          <img src="../../assets/date_line.png" class="line_img fl" />
          <div class="end_date fl" @click="handleClickEnd(index)">
            {{ item.edu_end_time ? item.edu_end_time : "End Time" }}
          </div>
          <div class="add_item fl" @click="addEducation" v-if="item.show == 1">
            +Add
          </div>
          <div class="delete_item fl" @click="deleteEducation(index)" v-else>
            Delete
          </div>
          <div class="input_wrapper">
            <input
              type="text"
              class="input_item"
              v-model="item.school"
              placeholder="University"
            />
            <input
              type="text"
              class="input_item"
              v-model="item.major"
              placeholder="Major"
            />
          </div>
        </div>
      </div>
      <div class="message_wrapper van-hairline--bottom">
        <div class="tefl_asterisk">*</div>
        <van-field name="radio" label="TEFL">
          <template #input>
            <van-radio-group
              v-model="edu_cert_flg"
              direction="horizontal"
              :icon-size="22"
              @change="handleChangeCertCheck"
            >
              <van-radio name="1" checked-color="#078CA9">Yes</van-radio>
              <van-radio
                name="0"
                checked-color="#078CA9"
                style="margin-right:6px;"
                >No</van-radio
              >
            </van-radio-group>
          </template>
        </van-field>
      </div>
      <div class="upload_wrapper" v-if="this.edu_cert_flg == 1">
        <div class="uplaod_title">
          Please upload the certificate the certificate
        </div>
        <div class="tips">
          <p>Only jpg/png/jpeg</p>
          <p>less than 8M</p>
        </div>
        <uploadImg
          @avatarUrl="acceptTeflUrl"
          :limit="limit"
          :fileListArr="this.eduCertImgsUrl"
        ></uploadImg>
      </div>
      <div class="message_wrapper van-hairline--bottom">
        <div class="tesol_asterisk">*</div>
        <van-field name="radio" label="TESOL">
          <template #input>
            <van-radio-group
              v-model="edu_auth_flg"
              direction="horizontal"
              :icon-size="22"
              @change="handleChangeAuthCheck"
            >
              <van-radio name="1" checked-color="#078CA9">YES</van-radio>
              <van-radio
                name="0"
                checked-color="#078CA9"
                style="margin-right:6px;"
                >NO</van-radio
              >
            </van-radio-group>
          </template>
        </van-field>
      </div>
      <div class="upload_wrapper" v-if="this.edu_auth_flg == 1">
        <div class="uplaod_title">
          Please upload the certificate the certificate
        </div>
        <div class="tips">
          <p>Only jpg/png/jpeg</p>
          <p>less than 8M</p>
        </div>
        <uploadImg
          @avatarUrl="acceptTesolUrl"
          :limit="limit"
          :fileListArr="this.eduAuthImgsUrl"
        ></uploadImg>
      </div>

      <div class="message_wrapper van-hairline--bottom">
        <div class="tesol_asterisk">*</div>
        <van-field name="radio" label="CELTA">
          <template #input>
            <van-radio-group
              v-model="celta_flg"
              direction="horizontal"
              :icon-size="22"
              @change="handleChangeCeltaCheck"
            >
              <van-radio name="2" checked-color="#078CA9">YES</van-radio>
              <van-radio
                name="1"
                checked-color="#078CA9"
                style="margin-right:6px;"
                >NO</van-radio
              >
            </van-radio-group>
          </template>
        </van-field>
      </div>
      <div class="upload_wrapper" v-if="this.celta_flg == 2">
        <div class="uplaod_title">
          Please upload the certificate the certificate
        </div>
        <div class="tips">
          <p>Only jpg/png/jpeg</p>
          <p>less than 8M</p>
        </div>
        <uploadImg
          @avatarUrl="acceptCeltaUrl"
          :limit="limit"
          :fileListArr="this.celtaImgsUrl"
        ></uploadImg>
      </div>

      <div class="message_wrapper van-hairline--bottom">
        <div class="tesol_asterisk">*</div>
        <van-field name="radio" label="Others">
          <template #input>
            <van-radio-group
              v-model="cert_other_flg"
              direction="horizontal"
              :icon-size="22"
              @change="handleChangeOtherCheck"
            >
              <van-radio name="2" checked-color="#078CA9">YES</van-radio>
              <van-radio
                name="1"
                checked-color="#078CA9"
                style="margin-right:6px;"
                >NO</van-radio
              >
            </van-radio-group>
          </template>
        </van-field>
      </div>
      <van-field
        input-align="right"
        v-if="this.cert_other_flg == 2"
        v-model="cert_other"
        maxlength="30"
        placeholder="Please fill in any teaching certificates you have"
      />
      <div class="upload_wrapper" v-if="this.cert_other_flg == 2">
        <div class="uplaod_title">
          Please upload the certificate the certificate
        </div>
        <div class="tips">
          <p>Only jpg/png/jpeg</p>
          <p>less than 8M</p>
        </div>
        <uploadImg
          @avatarUrl="acceptOthersUrl"
          :limit="limit"
          :fileListArr="this.otherImgsUrl"
        ></uploadImg>
      </div>
    </div>
    <div class="btn_wrapper">
      <div class="next_btn" @click="handleClickSubmit">Next step</div>
    </div>

    <!-- 开始时间 -->
    <van-popup v-model="showStartTimePicker" position="bottom">
      <van-datetime-picker
        confirm-button-text="confirm"
        cancel-button-text="cancel"
        @confirm="onStartConfirm"
        @cancel="showStartTimePicker = false"
        v-model="currentDate"
        type="year-month"
        title="Start Time"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
      />
    </van-popup>
    <!-- 结束时间 -->
    <van-popup v-model="showEndTimePicker" position="bottom">
      <van-datetime-picker
        confirm-button-text="confirm"
        cancel-button-text="cancel"
        @confirm="onEndConfirm"
        @cancel="showEndTimePicker = false"
        v-model="currentDate"
        type="year-month"
        title="End Time"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
      />
    </van-popup>
  </div>
</template>

<script>
import submitTitle from "../../components/submitTitle/submitTitle";
import moment from "moment";
import uploadImg from "../../components/uploadImg/uploadImg";
import { Toast, Notify } from "vant";
import { getCommentInfo, firstMobileComment } from "../../apis/baseUrls";
export default {
  name: "contactInformation",
  //import引入的组件需要注入到对象中才能使用
  components: { submitTitle, uploadImg },
  data() {
    //这里存放数据
    return {
      titleContent: "Education information",
      showDegreePicker: false,
      degreeValue: "",
      degreeList: [
        "High School Diploma",
        "Associate's Degree",
        "Bachelor's Degree",
        "Master's Degree",
        "MBA",
        "PHD",
      ],
      allDegreeList: [
        { id: 1, code: "High School Diploma" },
        { id: 2, code: "Associate's Degree" },
        { id: 3, code: "Bachelor's Degree" },
        { id: 4, code: "Master's Degree" },
        { id: 5, code: "MBA" },
        { id: 6, code: "PHD" },
      ],
      university: "",
      edu_cert_flg: "",
      eduCertImgs: "",
      limit: 1,
      eduCertImgsUrl: [],
      eduAuthImgsUrl: [],
      edu_auth_flg: "",
      eduAuthImgs: "",
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(2200, 12, 30),
      currentDate: new Date(),
      showStartTimePicker: false,
      showEndTimePicker: false,
      education: [
        {
          edu_start_time: "",
          edu_end_time: "",
          school: "",
          major: "",
          show: 1,
        },
      ],
      startDateIndex: "",
      endDateIndex: "",
      celta_flg: "",
      celtaImgsUrl: [],
      celtaImgs: "",
      cert_other_flg: "",
      otherImgsUrl: [],
      cert_other: "",
      otherImgs: "",
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 获取草稿信息
    getCommentMessage() {
      getCommentInfo({
        type: 2,
        token: localStorage.getItem("token"),
      }).then((res) => {
        if (res.data.code == 200) {
          const result = res.data.data;
          if (result.university != null) {
            this.degreeValue = this.degreeList[result.university - 1];
            this.university = result.university;
          }
          this.edu_cert_flg = result.edu_cert_flg.toString();
          this.edu_auth_flg = result.edu_auth_flg.toString();
          if (result.edu_cert_imgs_path != null) {
            this.eduCertImgs = result.edu_cert_imgs;
            this.eduCertImgsUrl.push({
              url: result.edu_cert_imgs_path.path,
            });
          }
          if (result.edu_auth_imgs_path != null) {
            this.eduAuthImgs = result.edu_auth_imgs;
            this.eduAuthImgsUrl.push({
              url: result.edu_auth_imgs_path.path,
            });
          }
          if (result.education.length > 0) {
            this.education = result.education;
          }
          this.celta_flg = result.celta_flg.toString();
          if (result.celta_img_path != null) {
            this.celtaImgs = res.data.celta_img;
            this.celtaImgsUrl.push({ url: result.celta_img_path.path });
          }
          this.cert_other_flg = result.cert_other_flg.toString();
          if (result.cert_other_img_path != null) {
            this.otherImgs = result.cert_other_img;
            this.otherImgsUrl.push({ url: result.cert_other_img_path.path });
          }
          if (result.cert_other != null) {
            this.cert_other = result.cert_other;
          }
        } else {
          Toast.fail(res.data.msg);
        }
      });
    },
    // 提交
    handleClickSubmit() {
      if (
        this.degreeValue != "" &&
        this.education[this.education.length - 1].edu_start_time != "" &&
        this.education[this.education.length - 1].edu_end_time != "" &&
        this.education[this.education.length - 1].school != "" &&
        this.education[this.education.length - 1].major != ""
      ) {
        firstMobileComment({
          token: localStorage.getItem("token"),
          university: this.university,
          edu_cert_flg: this.edu_cert_flg,
          edu_cert_imgs: this.eduCertImgs,
          edu_auth_flg: this.edu_auth_flg,
          edu_auth_imgs: this.eduAuthImgs,
          education: JSON.stringify(this.education),
          celta_flg: this.celta_flg,
          celta_img: this.celtaImgs,
          cert_other_flg: this.cert_other_flg,
          cert_other_img: this.otherImgs,
          cert_other: this.cert_other,
        }).then((res) => {
          if (res.data.code == 200) {
            this.$router.push("/JobInformation");
          } else {
            Toast(res.data.msg);
          }
        });
      } else {
        if (this.degreeValue == "") {
          Notify({
            type: "warning",
            message: "Please complete Highest Degree",
          });
        } else if (
          this.education[this.education.length - 1].edu_start_time == "" ||
          this.education[this.education.length - 1].edu_end_time == "" ||
          this.education[this.education.length - 1].school == "" ||
          this.education[this.education.length - 1].major == ""
        ) {
          Notify({
            type: "warning",
            message: "Please complete your education background",
          });
        }
      }
    },
    // 学位
    onDegreeConfirm(value, index) {
      this.degreeValue = value;
      this.university = this.allDegreeList[index].id;
      this.showDegreePicker = false;
    },
    // 子组件传来的TEFL路径
    acceptTeflUrl(obj) {
      this.eduCertImgs = obj;
    },
    // 子组件传来的TESOL路径
    acceptTesolUrl(obj) {
      this.eduAuthImgs = obj;
    },
    // tefl切换
    handleChangeCertCheck() {
      if (this.edu_cert_flg == 0) {
        this.eduCertImgs = "";
      }
    },
    // tesol切换
    handleChangeAuthCheck() {
      if (this.edu_cert_flg == 0) {
        this.eduAuthImgs = "";
      }
    },
    // Celta 切换
    handleChangeCeltaCheck() {
      this.celtaImgs = "";
    },
    // 子组件传过来的Celta
    acceptCeltaUrl(obj) {
      this.celtaImgs = obj;
    },
    // other切换
    handleChangeOtherCheck() {
      this.otherImgs = "";
    },
    // 子组件传过来的other路径
    acceptOthersUrl(obj) {
      this.otherImgs = obj;
    },
    // 日期格式化
    formatter(type, val) {
      if (type === "year") {
        return `${val}`;
      } else if (type === "month") {
        return `${val}`;
      }
      return val;
    },
    // 点击开始时间
    handleClickStart(index) {
      this.showStartTimePicker = true;
      this.startDateIndex = index;
    },
    // 开始时间确认按钮
    onStartConfirm(val) {
      this.education[this.startDateIndex].edu_start_time = moment(val).format(
        "YYYY-MM"
      );
      this.showStartTimePicker = false;
    },
    // 结束时间
    handleClickEnd(index) {
      this.showEndTimePicker = true;
      this.endDateIndex = index;
    },
    // 结束时间确认按钮
    onEndConfirm(val) {
      this.education[this.endDateIndex].edu_end_time = moment(val).format(
        "YYYY-MM"
      );
      this.showEndTimePicker = false;
    },
    // 添加
    addEducation() {
      if (this.education.length == 5) {
        Notify({ type: "warning", message: "Maximum 5 lines" });
      } else {
        let lastItem = this.education[this.education.length - 1];
        if (lastItem.edu_start_time == "") {
          Notify({ type: "warning", message: "Please fill in Start Time" });
        } else if (lastItem.edu_end_time == "") {
          Notify({ type: "warning", message: "Please fill in End Time" });
        } else if (lastItem.school == "") {
          Notify({ type: "warning", message: "Please fill in University" });
        } else if (lastItem.major == "") {
          Notify({ type: "warning", message: "Please fill in Major" });
        } else {
          this.education.push({
            edu_start_time: "",
            edu_end_time: "",
            school: "",
            major: "",
            show: 2,
          });
        }
      }
    },
    // 删除
    deleteEducation(index) {
      this.education.splice(index, 1);
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getCommentMessage();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
};
</script>
<style scoped>
.tips {
  padding: 60px 30px;
  width: 100%;
  height: 152px;
  background: rgba(248, 248, 248, 1);
}
.tips p {
  font-size: 32px;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 46px;
  letter-spacing: 1px;
}
.submit_messages {
  width: 100%;
  background: #fff;
}
.submit_messages .message_wrapper {
  position: relative;
  width: 100%;
  min-height: 120px;
}
/deep/ .van-cell {
  display: flex;
  align-items: center;
  padding: 0 30px;
  height: 120px;
}
/deep/ .van-cell__title {
  width: auto !important;
  font-size: 28px;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}
/deep/ .van-field__control {
  font-size: 28px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
/deep/ .van-radio-group--horizontal {
  position: absolute;
  display: flex;
  right: 0;
}
/deep/ .van-radio__label {
  font-size: 28px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.err_messages {
  position: absolute;
  top: 40%;
  right: 12%;
  color: #ee0a24;
  font-size: 28px;
  font-weight: 400;
  text-align: right;
  pointer-events: none;
}

.btn_wrapper {
  margin-bottom: 60px;
  padding-top: 60px;
  width: 100%;
  background: rgba(248, 248, 248, 1);
}
.btn_wrapper .next_btn {
  margin: 0 auto;
  width: 90%;
  height: 98px;
  background: rgba(7, 140, 169, 1);
  border-radius: 10px;
  font-size: 36px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 98px;
  text-align: center;
  cursor: pointer;
}
/deep/ .van-cell__value {
  padding-left: 40px !important;
}
.Nation_asterisk {
  position: absolute;
  top: 38%;
  left: 31%;
  width: 15px;
  height: 15px;
  color: #ee0a24;
  z-index: 1;
}
.University_asterisk {
  position: absolute;
  top: 0;
  left: 44%;
  width: 15px;
  height: 15px;
  color: #ee0a24;
  z-index: 1;
}
.major_asterisk {
  position: absolute;
  top: 38%;
  left: 15%;
  width: 15px;
  height: 15px;
  color: #ee0a24;
  z-index: 1;
}
.tefl_asterisk {
  position: absolute;
  top: 38%;
  left: 15%;
  width: 15px;
  height: 15px;
  color: #ee0a24;
  z-index: 1;
}
.tesol_asterisk {
  position: absolute;
  top: 38%;
  left: 17%;
  width: 15px;
  height: 15px;
  color: #ee0a24;
  z-index: 1;
}
.date_wrapper {
  position: relative;
}
.date_wrapper .icon {
  position: absolute;
  top: 50%;
  right: 4%;
  margin-top: -22px;
  width: 44px;
  height: 44px;
  pointer-events: none;
}
.upload_wrapper {
  position: relative;
  margin: 30px auto;
  padding: 30px 0 0 30px;
  width: 660px;
  height: 312px;
  background: rgba(248, 248, 248, 1);
  border-radius: 10px;
}
.upload_wrapper .uplaod_title {
  margin: 0 0 60px 0;
  font-size: 28px;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
.upload_wrapper .tips {
  position: absolute;
  bottom: 30px;
  right: 30px;
  padding: 0;
  width: auto;
  height: 72px;
}
.upload_wrapper .tips p {
  font-size: 24px;
  font-weight: 400;
  letter-spacing: 1px;
}
.choose_con {
  margin: 50px 0;
  padding-left: 30px;
}
.choose_con p {
  margin-bottom: 15px;
  font-size: 30px;
  color: #666666;
}
.icon_wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  border-bottom: 1px solid #eeeeee;
}
.icon_wrapper img {
  width: 32px;
  height: 32px;
}
.icon_wrapper p {
  margin-left: 15px;
  font-size: 30px;
  color: #666;
}
.left_title {
  margin: 20px auto;
  width: 90%;
  font-size: 0.373333rem;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}
.picker_wrapper {
  margin: 0 auto;
  margin-bottom: 20px;
  width: 92%;
}
.picker_wrapper .start_date,
.picker_wrapper .end_date {
  width: 260px;
  height: 98px;
  background: #f8f8f8;
  border-radius: 8px;
  text-align: center;
  line-height: 98px;
}
.picker_wrapper .line_img {
  width: 26px;
  height: 100px;
  background: #f8f8f8;
}
.picker_wrapper .add_item {
  margin-left: 20px;
  width: 120px;
  height: 100px;
  color: #fff;
  background-color: #1989fa;
  text-align: center;
  line-height: 100px;
  border-radius: 5px;
}
.picker_wrapper .delete_item {
  margin-left: 20px;
  width: 120px;
  height: 100px;
  color: #fff;
  background-color: #ff976a;
  text-align: center;
  line-height: 100px;
  border-radius: 5px;
}
.picker_wrapper .input_wrapper {
  display: flex;
  margin: 0 auto;
  width: 100%;
  justify-content: center;
}
.picker_wrapper .input_wrapper .input_item {
  margin: 20px 15px 20px 0;
  padding: 0 20px;
  width: 295px;
  height: 98px;
  background: #f8f8f8;
  border-radius: 8px;
  text-align: center;
  line-height: 98px;
}
</style>
