<!-- 第三步 -->
<template>
  <div class>
    <submitTitle :titleContent="titleContent"></submitTitle>
    <div class="tips">
      <p>Please fill in your job information</p>
      <p style="margin-top: 5px">Your employer knows more about you</p>
    </div>
    <div class="submit_messages">
      <div class="message_wrapper van-hairline--bottom area_wrapper">
        <div class="salary_asterisk">*</div>
        <van-field
          readonly
          clickable
          name="picker"
          :value="expectationValue"
          label="Expected Salary"
          @click="showExpectationPicker = true"
        />
        <van-popup v-model="showExpectationPicker" position="bottom">
          <van-picker
            :item-height="45"
            show-toolbar
            :columns="expectationList"
            @confirm="onExpectationConfirm"
            @cancel="showExpectationPicker = false"
            confirm-button-text="confirm"
            cancel-button-text="cancel"
            title="Expected Salary"
          />
        </van-popup>
        <img src="../../assets/down.png" class="icon" />
      </div>
      <div class="message_wrapper van-hairline--bottom date_wrapper">
        <div class="work_year_asterisk">*</div>
        <van-field
          readonly
          clickable
          name="picker"
          :value="workingYearValue"
          label="Working Years"
          @click="showworkingYearPicker = true"
        />
        <van-popup v-model="showworkingYearPicker" position="bottom">
          <van-picker
            :item-height="45"
            show-toolbar
            :columns="workingYearList"
            @confirm="onworkingYearConfirm"
            @cancel="showworkingYearPicker = false"
            confirm-button-text="confirm"
            cancel-button-text="cancel"
            title="Working Years"
          />
        </van-popup>
        <img src="../../assets/down.png" class="icon" />
      </div>
      <div class="message_wrapper van-hairline--bottom role">
        <div class="role_asterisk">*</div>
        <van-field name="radio" label="Work Status">
          <template #input>
            <van-radio-group v-model="workFlg" direction="horizontal" :icon-size="22">
              <van-radio name="1" checked-color="#078CA9">Employed</van-radio>
              <van-radio name="0" checked-color="#078CA9">Unemployed</van-radio>
            </van-radio-group>
          </template>
        </van-field>
      </div>
      <div class="message_wrapper van-hairline--bottom" v-show="inChina != 1">
        <div class="tefl_asterisk">*</div>
        <van-field name="radio" label="Relocate in China">
          <template #input>
            <van-radio-group v-model="relocate" direction="horizontal" :icon-size="22">
              <van-radio name="2" checked-color="#078CA9">Yes</van-radio>
              <van-radio name="1" checked-color="#078CA9" style="margin-right:6px;">No</van-radio>
            </van-radio-group>
          </template>
        </van-field>
      </div>
      <div
        class="message_wrapper city_wrapper van-hairline--bottom area_wrapper"
        v-show="relocate == 2"
      >
        <van-field
          readonly
          clickable
          name="picker"
          :value="residencetValue"
          label="Preferred Job Locations"
          @click="showResidencetPicker = true"
        />
        <div class="any_asterisk">*</div>
        <van-popup v-model="showResidencetPicker" position="bottom">
          <van-picker
            :item-height="45"
            show-toolbar
            :columns="residencetList"
            @confirm="onResidencetConfirm"
            @cancel="showResidencetPicker = false"
            confirm-button-text="confirm"
            cancel-button-text="cancel"
            title="Current residencet"
          />
        </van-popup>
        <van-popup v-model="showcityPicker" position="bottom">
          <van-picker
            :item-height="45"
            show-toolbar
            :columns="cityList"
            @confirm="onCityConfirm"
            @cancel="showcityPicker = false"
            confirm-button-text="confirm"
            cancel-button-text="cancel"
            title="Current city"
          />
        </van-popup>
        <img src="../../assets/down.png" class="icon" />
        <van-checkbox
          v-model="allCity"
          class="all_city_check"
          checked-color="#078CA9"
          shape="square"
          @change="cityChange"
        >Any city in China</van-checkbox>
      </div>

      <div class="message_wrapper van-hairline--bottom">
        <div class="work_left_title">Work Experience</div>
        <div class="University_asterisk">*</div>
        <div class="picker_wrapper" v-for="(item, index) in work_experiences" :key="index">
          <div class="clearfix">
            <div
              class="start_date fl"
              @click="handleClickStart(index)"
            >{{ item.start_time ? item.start_time : "Start Time" }}</div>
            <img src="../../assets/date_line.png" class="line_img fl" />
            <div
              class="end_date fl"
              @click="handleClickEnd(index)"
            >{{ item.end_time ? item.end_time : "End Time" }}</div>
            <div class="add_item fl" @click="addEducation" v-if="item.show == 1">+Add</div>
            <div class="delete_item fl" @click="deleteEducation(index)" v-else>Delete</div>
          </div>
          <div class="present">
            <van-checkbox
              v-model="item.now"
              class="present_check"
              checked-color="#078CA9"
              shape="square"
              @change="presentChange(index)"
            >Present</van-checkbox>
          </div>
          <div class="input_wrapper">
            <input
              type="text"
              class="input_item"
              v-model="item.company_name"
              placeholder="Company name"
            />
            <input type="text" class="input_item" v-model="item.position" placeholder="Position" />
          </div>
          <textarea
            v-model="item.work_desc"
            cols="30"
            rows="10"
            class="self_textarea"
            placeholder="Introduce yourself to you. We can talk about your hobbies and personalities. Maybe we can have fun with more people"
          ></textarea>
        </div>
      </div>

      <div class="van-hairline--bottom school_type">
        <h5 class="work_title">preferred type of school</h5>
        <div class="school_asterisk">*</div>
        <van-checkbox-group
          v-model="result"
          v-for="(item, index) in this.schoolTypeList"
          :key="index"
        >
          <van-checkbox
            :name="item.id"
            class="checkbox_item"
            checked-color="#078CA9"
          >{{ item.value }}</van-checkbox>
        </van-checkbox-group>
      </div>
      <div class="message_wrapper van-hairline--bottom area_wrapper">
        <van-field
          readonly
          clickable
          name="picker"
          :value="jobValue"
          label="Job Type"
          @click="showJobPicker = true"
        />
        <div class="job_asterisk">*</div>
        <van-popup v-model="showJobPicker" position="bottom">
          <van-picker
            :item-height="45"
            show-toolbar
            :columns="jobList"
            @confirm="onJobConfirm"
            @cancel="showJobPicker = false"
            confirm-button-text="confirm"
            cancel-button-text="cancel"
            title="Job Type"
          />
        </van-popup>
        <img src="../../assets/down.png" class="icon" />
      </div>
      <div class="message_wrapper van-hairline--bottom area_wrapper">
        <van-field
          readonly
          clickable
          name="picker"
          :value="jobTypeValue"
          label="Job Category"
          @click="showJobTypePicker = true"
        />
        <div class="job_type_asterisk">*</div>
        <van-popup v-model="showJobTypePicker" position="bottom">
          <van-picker
            :item-height="45"
            show-toolbar
            :columns="jobTypeList"
            @confirm="onJobTypeConfirm"
            @cancel="showJobTypePicker = false"
            confirm-button-text="confirm"
            cancel-button-text="cancel"
            title="Job Category"
          />
        </van-popup>
        <img src="../../assets/down.png" class="icon" />
      </div>
      <div class="van-hairline--bottom student_age_wrapper clearfix">
        <h5 class="work_title">Age of Students</h5>
        <div class="students_asterisk">*</div>
        <van-checkbox-group
          v-model="student_age"
          v-for="(item, index) in this.studentAgeList"
          :key="index"
        >
          <van-checkbox
            :name="item.id"
            class="student_checkbox_item fl"
            checked-color="#078CA9"
          >{{ item.value }}</van-checkbox>
        </van-checkbox-group>
      </div>
      <div class="upload_video_wrapper">
        <h5>Self introduction(Video)</h5>
        <div class="upload_wrapper">
          <div class="uplaod_title">Please record a video and upload it</div>
          <div class="tips">
            <p>less than 50M</p>
          </div>
          <uploadVideo
            @videoUrl="acceptVideoUrl"
            :limit="limit"
            @progressValue="acceptProgressNum"
            :fileListArr="this.videoesUrl"
          ></uploadVideo>
          <van-progress :percentage="this.progressNum" class="upload_progress" />
        </div>
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
import uploadImg from "../../components/uploadImg/uploadImg";
import uploadVideo from "../../components/uploadImg/uploadVideo";
import { Dialog, Checkbox, CheckboxGroup, Notify } from "vant";
import moment from "moment";
import {
  firstMobileComment,
  getCity,
  getProvince,
  getCommentInfo,
} from "../../apis/baseUrls";
export default {
  name: "JobInformation",
  //import引入的组件需要注入到对象中才能使用
  components: { submitTitle, uploadImg, uploadVideo },
  data() {
    //这里存放数据
    return {
      titleContent: "Job information",
      workingYear: "",
      workFlg: "",
      showExpectationPicker: false,
      expectationValue: "",
      expectationList: ["10k-13k", "13k-16k", "16k-20k", "20k-25k", ">25k"],
      allExpectationList: [
        { id: 1, code: "10k-13k" },
        { id: 2, code: "13k-16k" },
        { id: 3, code: "16k-20k" },
        { id: 4, code: "20k-25k" },
        { id: 5, code: ">25k" },
      ],
      payType: "",
      residencetValue: "",
      showPlaceErr: false,
      limit: 1,
      photos: "",
      videoUrl: "",
      showResidencetPicker: false,
      residencetList: [],
      showcityPicker: false,
      cityList: [],
      allCityList: [],
      allResidencetList: [],
      lastAreaId: "",
      progressNum: 0,
      videoesUrl: [],
      workingYearValue: "",
      showworkingYearPicker: false,
      workingYearList: [
        "Less than 1 year",
        "1 year experience",
        "2 year experience",
        "3 year experience",
        "4 year experience",
        "5 year experience",
        "6 year experience",
        "7 year experience",
        "8 year experience",
        "9 year experience",
        "More than 10years",
      ],
      allWorkingYearList: [
        { id: 1, code: "Less than 1 year" },
        { id: 2, code: "1 year experience" },
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
      schoolTypeList: [
        {
          value: "Training Center",
          id: 1,
        },
        {
          value: "International Kindergarten",
          id: 2,
        },
        {
          value: "International School",
          id: 3,
        },
        {
          value: "Public School",
          id: 4,
        },
        {
          value: "Online Class",
          id: 5,
        },
        {
          value: "Others",
          id: 6,
        },
      ],
      result: [],
      jobValue: "",
      showJobPicker: false,
      jobList: ["Any", "Full-time", "Part-time"],
      allJobList: [
        { id: 1, code: "Any" },
        { id: 2, code: "Full-time" },
        { id: 3, code: "Part-time" },
      ],
      job_work_type: "",
      jobTypeValue: "",
      showJobTypePicker: false,
      jobTypeList: ["Offline", "Online", "Any"],
      allJobTypeList: [
        { id: 1, code: "Offline" },
        { id: 2, code: "Online" },
        { id: 3, code: "Any" },
      ],
      job_type: "",
      studentAgeList: [
        { value: "0-3", id: 1 },
        { value: "3-6", id: 2 },
        { value: "7-12", id: 3 },
        { value: "13-18", id: 4 },
        { value: "18+", id: 5 },
      ],
      student_age: [],
      relocate: 2,
      allCity: false,
      checkedAllCity: "",
      work_experiences: [
        {
          start_time: "",
          end_time: "",
          company_name: "",
          position: "",
          work_desc: "",
          now: false,
          show: 1,
        },
      ],
      showStartTimePicker: false,
      startDateIndex: "",
      showEndTimePicker: false,
      endDateIndex: "",
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(2200, 12, 30),
      currentDate: new Date(),
      inChina: "",
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
        type: 3,
        token: localStorage.getItem("token"),
      }).then((res) => {
        if (res.data.code == 200) {
          const result = res.data.data;
          if (result.working_seniority != null) {
            this.workingYearValue = this.workingYearList[
              result.working_seniority - 1
            ];
            this.workingYear = result.working_seniority;
          }
          if (result.all_city == 2) {
            this.allCity = true;
          }
          this.checkedAllCity = result.all_city;
          this.workFlg = result.work_flg.toString();
          if (result.pay_type != null) {
            this.payType = result.pay_type;
            this.expectationValue = this.expectationList[result.pay_type - 1];
          }
          this.lastAreaId = result.working_city;
          if (result.working_city_datas != null) {
            this.residencetValue =
              result.working_city_datas[0].city_data.pinyin;
          }
          if (result.school_type != null) {
            this.result = result.school_type.split(",").map(Number);
          }
          this.jobValue = this.jobList[result.job_work_type - 1];
          this.job_work_type = result.job_work_type;
          this.jobTypeValue = this.jobTypeList[result.job_type - 1];
          this.job_type = result.job_type;
          if (result.student_age != null) {
            this.student_age = result.student_age.split(",").map(Number);
          }
          if (result.videos_path != null) {
            this.videoUrl = result.videos;
            this.videoesUrl.push({
              url: result.videos_path.file_name,
            });
          }
          this.relocate = result.relocate.toString();
          if (result.work.length > 0) {
            this.work_experiences = result.work.map((ele) => {
              return {
                ...ele,
                now: ele.now == 1 ? false : true,
              };
            });
          }
        } else {
          Toast.fail(res.data.msg);
        }
      });
    },
    // 获取省份接口
    getProvinces() {
      getProvince().then((res) => {
        if (res.data.code == 200) {
          this.allResidencetList = res.data.data;
          this.residencetList = res.data.data.map((item) => item.pinyin);
        } else {
          Toast.fail(res.data.msg);
        }
      });
    },
    // 薪资
    onExpectationConfirm(value, index) {
      this.expectationValue = value;
      this.payType = this.allExpectationList[index].id;
      this.showExpectationPicker = false;
    },
    // // 子组件传来的头像路径
    // acceptUrl(obj) {
    //   this.photos = obj;
    // },
    acceptVideoUrl(obj, num) {
      this.videoUrl = obj;
      this.progressNum = num;
    },
    // 进度条数值
    acceptProgressNum(num) {
      this.progressNum = num;
      if (num >= 90) {
        this.progressNum = 95;
      }
    },
    // 确认选择省份
    onResidencetConfirm(value, index) {
      let provinceId = this.allResidencetList[index].id;
      getCity({
        id: provinceId,
      }).then((res) => {
        if (res.data.code == 200) {
          this.allCityList = res.data.data;
          this.cityList = res.data.data.map((item) => item.pinyin);
        } else {
          Toast.fail(res.data.msg);
        }
      });
      this.showResidencetPicker = false;
      this.showcityPicker = true;
    },
    // 确认选择市
    onCityConfirm(value, index) {
      this.residencetValue = value;
      this.lastAreaId = this.allCityList[index].id;
      this.showcityPicker = false;
      this.allCity = false;
      this.checkedAllCity = "";
    },
    // 所有城市复选框改变
    cityChange() {
      this.lastAreaId = "";
      this.residencetValue = "";
      if (this.allCity == true) {
        this.checkedAllCity = 2;
      } else {
        this.checkedAllCity = 1;
      }
    },
    // 提交
    handleClickSubmit() {
      this.work_experiences.forEach(function (v) {
        if (!v.start_time || !v.company_name || !v.position || (!v.now && !v.end_time)) {
          Notify({
            type: "warning",
            message: "Please enter your work experience",
          });
        }
      });
      if (this.expectationValue == "") {
        Notify({
          type: "warning",
          message: "Please complete your expected salary",
        });
        return;
      }
      if (this.workingYearValue == "") {
        Notify({
          type: "warning",
          message: "Please complete your working years",
        });
        return;
      }
      if (this.residencetValue == "" && this.allCity == false) {
        Notify({
          type: "warning",
          message: "Please complete your preferred cities",
        });
        return;
      }
      if (this.result.length == 0) {
        Notify({
          type: "warning",
          message: "Please complete your preferred type of school",
        });
        return;
      }
      if (this.jobValue == "") {
        Notify({
          type: "warning",
          message: "Please complete job type",
        });
        return;
      }
      if (this.jobTypeValue == "") {
        Notify({
          type: "warning",
          message: "Please complete job category",
        });
        return;
      }
      if (this.student_age.length == 0) {
        Notify({
          type: "warning",
          message: "Please complete age of students",
        });
        return;
      }
      this.work_experiences = this.work_experiences.map((ele) => {
        return {
          ...ele,
          now: ele.now == true ? 2 : 1,
        };
      });
      firstMobileComment({
        token: localStorage.getItem("token"),
        type: 1,
        working_seniority: this.workingYear,
        work_flg: this.workFlg,
        pay_type: this.payType,
        working_city: this.lastAreaId,
        videos: this.videoUrl,
        type: 1,
        school_type: this.result.toString(),
        job_work_type: this.job_work_type,
        student_age: this.student_age.toString(),
        job_type: this.job_type,
        relocate: this.relocate,
        all_city: this.checkedAllCity,
        work_experiences: JSON.stringify(this.work_experiences),
      }).then((res) => {
        if (res.data.code == 200) {
          this.$router.push({ name: "result" });
        } else {
          Toast(res.data.msg);
        }
      });
    },
    onworkingYearConfirm(value, index) {
      this.workingYearValue = value;
      this.workingYear = this.allWorkingYearList[index].id;
      this.showworkingYearPicker = false;
    },
    // 工作性质
    onJobConfirm(value, index) {
      this.job_work_type = this.allJobList[index].id;
      this.jobValue = value;
      this.showJobPicker = false;
    },
    // 工作类型
    onJobTypeConfirm(value, index) {
      this.job_type = this.allJobTypeList[index].id;
      this.jobTypeValue = value;
      this.showJobTypePicker = false;
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
      this.work_experiences[this.startDateIndex].start_time = moment(
        val
      ).format("YYYY-MM");
      this.showStartTimePicker = false;
    },
    // 结束时间
    handleClickEnd(index) {
      this.showEndTimePicker = true;
      this.endDateIndex = index;
    },
    // 结束时间确认按钮
    onEndConfirm(val) {
      this.work_experiences[this.endDateIndex].end_time = moment(val).format(
        "YYYY-MM"
      );
      this.showEndTimePicker = false;
      this.work_experiences[this.endDateIndex].now = false;
    },
    // 添加
    addEducation() {
      if (this.work_experiences.length == 5) {
        Notify({ type: "warning", message: "Maximum 5 lines" });
      } else {
        let lastItem = this.work_experiences[this.work_experiences.length - 1];
        if (lastItem.start_time == "") {
          Notify({ type: "warning", message: "Please fill in Start Time" });
        } else if (lastItem.end_time == "" && lastItem.now == false) {
          Notify({ type: "warning", message: "Please fill in End Time" });
        } else if (lastItem.company_name == "") {
          Notify({ type: "warning", message: "Please fill in Company Name" });
        } else if (lastItem.position == "") {
          Notify({ type: "warning", message: "Please fill in Position" });
        } else if (lastItem.work_desc == "") {
          Notify({
            type: "warning",
            message: "Please fill in your previous jobs",
          });
        } else {
          this.work_experiences.push({
            start_time: "",
            end_time: "",
            company_name: "",
            position: "",
            work_desc: "",
            now: false,
            show: 2,
          });
        }
      }
    },
    // 删除
    deleteEducation(index) {
      this.work_experiences.splice(index, 1);
    },
    presentChange(index) {
      this.work_experiences[index].end_time = "";
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getProvinces();
    this.getCommentMessage();
    this.inChina = sessionStorage.getItem("inChina");
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.$nextTick(() => {});
  },
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
.message_wrapper {
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
.err_school_messages {
  color: #ee0a24;
  font-size: 28px;
  font-weight: 400;
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
.working_asterisk {
  position: absolute;
  top: 38%;
  left: 29%;
  width: 15px;
  height: 15px;
  color: #ee0a24;
  z-index: 1;
}
.salary_asterisk {
  position: absolute;
  top: 38%;
  left: 33%;
  width: 15px;
  height: 15px;
  color: #ee0a24;
  z-index: 1;
}
.work_year_asterisk {
  position: absolute;
  top: 38%;
  left: 30%;
  width: 15px;
  height: 15px;
  color: #ee0a24;
  z-index: 1;
}
.cities_asterisk {
  position: absolute;
  top: 38%;
  left: 54%;
  width: 15px;
  height: 15px;
  color: #ee0a24;
  z-index: 1;
}
.job_asterisk {
  position: absolute;
  top: 38%;
  left: 21%;
  width: 15px;
  height: 15px;
  color: #ee0a24;
  z-index: 1;
}
.job_type_asterisk {
  position: absolute;
  top: 38%;
  left: 28%;
  width: 15px;
  height: 15px;
  color: #ee0a24;
  z-index: 1;
}
.students_asterisk {
  position: absolute;
  top: 14%;
  left: 32%;
  width: 15px;
  height: 15px;
  color: #ee0a24;
  z-index: 1;
}
.me_asterisk {
  position: absolute;
  top: 7%;
  left: 28%;
  width: 15px;
  height: 15px;
  color: #ee0a24;
  z-index: 1;
}
/deep/ .van-radio--horizontal {
  margin-right: 30px;
}
/deep/ .van-cell__value {
  padding-left: 40px !important;
}
.role_asterisk {
  position: absolute;
  top: 38%;
  left: 26%;
  width: 15px;
  height: 15px;
  color: #ee0a24;
  z-index: 1;
}
.any_asterisk {
  position: absolute;
  top: 30%;
  left: 45%;
  width: 15px;
  height: 15px;
  color: #ee0a24;
  z-index: 1;
}
.school_asterisk {
  position: absolute;
  top: 7%;
  left: 45%;
  width: 15px;
  height: 15px;
  color: #ee0a24;
  z-index: 1;
}
/deep/ .role .van-cell__title {
  width: 30% !important;
  text-align: justify;
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
/deep/ .date_wrapper .van-field__control {
  margin-right: 50px;
  text-align: right;
}
.area_wrapper .icon {
  position: absolute;
  top: 40%;
  right: 4%;
  margin-top: -22px;
  width: 44px;
  height: 44px;
  pointer-events: none;
}
/deep/ .area_wrapper .van-field__control {
  margin-right: 50px;
  text-align: right;
}
.left_title {
  margin-left: 30px;
  font-size: 28px;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}
.upload_icon {
  position: absolute;
  top: 50%;
  right: 4%;
  margin-top: -22px;
  width: 44px;
  height: 44px;
  pointer-events: none;
}
.upload_img_wrapper {
  line-height: 120px;
}
.upload_wrapper {
  position: relative;
  padding: 30px 0 0 30px;
  margin: 30px auto;
  width: 660px;
  height: 350px;
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
  bottom: 24%;
  right: 30px;
  padding: 0;
  width: auto;
  height: 30px;
}
.upload_wrapper .tips p {
  font-size: 24px;
  font-weight: 400;
  letter-spacing: 1px;
}
.self_wrapper {
  position: relative;
  padding-top: 30px;
  width: 100%;
  height: 442px;
  background: #f8f8f8;
}
.self_inner_content {
  position: relative;
  padding: 30px;
  width: 100%;
  background: rgba(255, 255, 255, 1);
}
.self_inner_content h5,
.upload_video_wrapper h5 {
  font-size: 28px;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}
.self_asterisk,
.video_asterisk {
  display: inline-block;
  margin-left: 10px;
  width: 15px;
  height: 15px;
  color: #ee0a24;
  z-index: 1;
}
.upload_video_wrapper h5 {
  margin: 30px 0 69px 30px;
}
.self_textarea {
  margin-top: 30px;
  padding: 30px;
  width: 615px;
  height: 220px;
  background: rgba(248, 248, 248, 1);
  border-radius: 10px;
  resize: none;
  font-size: 28px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 42px;
}
.upload_video_wrapper {
  width: 100%;
  background: rgba(255, 255, 255, 1);
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
/deep/ .van-progress {
  width: 95%;
}
.upload_progress {
  margin: 20px 0;
}
.work_title {
  font-size: 28px;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}
.school_type {
  padding: 30px;
}
.checkbox_item {
  margin: 20px 0;
}
.student_checkbox_item {
  margin: 20px 25px 10px 0;
}
.student_age_wrapper {
  padding: 30px;
  height: 160px;
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
.tefl_asterisk {
  position: absolute;
  top: 38%;
  left: 35%;
  width: 15px;
  height: 15px;
  color: #ee0a24;
  z-index: 1;
}
.all_city_check {
  position: absolute;
  bottom: 20px;
  left: 4%;
}
.city_wrapper {
  height: 160px !important;
  border-bottom: 1px solid #ebedf0; /* no */
}
/deep/ .city_wrapper .van-cell::after {
  border-bottom: none;
}
.University_asterisk {
  position: absolute;
  top: 0;
  left: 35%;
  width: 15px;
  height: 15px;
  color: #ee0a24;
  z-index: 1;
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
.work_left_title {
  margin: 20px auto;
  width: 90%;
  font-size: 0.373333rem;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}
.self_textarea {
  margin-bottom: 30px;
  padding: 30px;
  width: 615px;
  height: 220px;
  background: rgba(248, 248, 248, 1);
  border-radius: 10px;
  resize: none;
  font-size: 28px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 42px;
}
.present_check {
  margin-top: 20px;
  margin-left: 39%;
}
</style>
