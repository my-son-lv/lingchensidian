<template>
  <div class="page_wrapper">
    <stepNav></stepNav>
    <topTitle :Parentcontent="content" :progressNum="progressNum"></topTitle>
    <div class="first_content_wrapper">
      <h3 class="content_title">Education information</h3>
      <div class="item_wrapper">
        <p class="lside_title">Highest Degree</p>
        <el-select
          v-model="secondInfo.university"
          filterable
          placeholder="Please Select"
          clearable
          style="margin: 0 20px;"
        >
          <el-option
            v-for="item in allDegreeList"
            :key="item.id"
            :label="item.code"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <p class="err_tips" v-if="showDegreeError && !secondInfo.university">
          Please enter Highest Degree
        </p>
        <img
          src="../../assets/image/sure.png"
          class="right_sure_img"
          v-if="
            secondInfo.university
              ? (showDegreeSure = true)
              : (showDegreeSure = false)
          "
        />
      </div>
      <div class="upload_wrapper">
        <uploadComponents
          :type="0"
          :getImgUrl="childrenImgUrl"
          @uploadImgId="uploadImgId"
        ></uploadComponents>
      </div>
      <div class="line" style="margin-bottom:40px;"></div>
      <div
        class="item_wrapper small_select"
        v-for="(item, index) in secondInfo.education"
        :key="index"
      >
        <p class="lside_title">
          <span v-show="index == 0">Education Background</span>
        </p>
        <div class="education_wrapper">
          <div class="picker_wrapper clearfix">
            <el-date-picker
              v-model="item.edu_start_time"
              value-format="yyyy-MM"
              type="month"
              placeholder="Start time"
              class="fl"
            >
            </el-date-picker>
            <el-date-picker
              v-model="item.edu_end_time"
              value-format="yyyy-MM"
              type="month"
              placeholder="End time"
              class="fl"
              style="margin:0 20px;"
            >
            </el-date-picker>
            <img
              src="../../assets/image/sure.png"
              class="right_sure_img fl"
              v-if="item.edu_start_time && item.edu_end_time"
            />
          </div>
          <div class="input_wrapper clearfix">
            <el-input
              v-model="item.school"
              placeholder="University"
              class="fl"
            ></el-input>
            <el-input
              v-model="item.major"
              placeholder="Major"
              class="fl"
              style="margin:0 20px;"
            ></el-input>
            <img
              src="../../assets/image/sure.png"
              class="right_sure_img fl"
              v-if="item.school && item.major"
            />
          </div>
        </div>
      </div>
      <p
        class="education_tips"
        v-if="
          showEducationError &&
            (!this.secondInfo.education[this.secondInfo.education.length - 1]
              .edu_start_time ||
              !this.secondInfo.education[this.secondInfo.education.length - 1]
                .edu_end_time ||
              !this.secondInfo.education[this.secondInfo.education.length - 1]
                .school ||
              !this.secondInfo.education[this.secondInfo.education.length - 1]
                .major)
        "
      >
        Please enter Education Background
      </p>
      <div class="add_btn_wrapper" style="margin-top:20px;">
        <div
          class="lside_con"
          style="margin-right:55px;"
          @click="handleClickAdd"
        >
          <img src="../../assets/image/add_icon.png" class="add_icon" />
          <span>Add Education</span>
        </div>
        <div
          class="rside_con"
          v-if="this.secondInfo.education.length > 1"
          @click="handleClickDelete"
        >
          <img src="../../assets/image/delete_icon.png" class="add_icon" />
          <span>Delete</span>
        </div>
      </div>
      <div class="line" style="margin-bottom:40px;"></div>
      <div class="item_wrapper">
        <p class="lside_title">Teaching Certificate</p>
        <div class="right_content clearfix">
          <div
            class="item_certificate fl"
            v-for="(item, index) in teachingList"
            :key="index"
            @click="handleClickChooseItem(item.id)"
            :class="item.activeClass == true ? 'actived' : ''"
          >
            {{ item.value }}
          </div>
          <div
            class="item_certificate fl"
            @click="handleClickNone"
            :class="clickNone == true ? 'actived' : ''"
          >
            NONE
          </div>
        </div>
      </div>
      <div
        v-if="
          chooseTeachingList.includes(4)
            ? (showOther = true)
            : (showOther = false)
        "
        class="certificates"
      >
        <div class="other_wrapper">
          <el-input
            v-model="secondInfo.cert_other"
            placeholder="Please fill in any teaching certificates you have"
          ></el-input>
        </div>
        <p class="err_tips" v-if="!secondInfo.cert_other && showOtherError">
          Please enter teaching certificates
        </p>
        <img
          src="../../assets/image/sure.png"
          class="right_sure_img"
          v-if="
            secondInfo.cert_other
              ? (showOtherSure = true)
              : (showOtherSure = false)
          "
        />
      </div>
      <div class="line" style="margin-bottom:40px;"></div>
      <h3 class="content_title">Job information</h3>
      <div class="item_wrapper">
        <p class="lside_title">Working Years</p>
        <el-select
          v-model="secondInfo.working_seniority"
          filterable
          placeholder="Please Select"
          clearable
          style="margin: 0 20px;"
        >
          <el-option
            v-for="(item, index) in workYearList"
            :key="index"
            :label="item"
            :value="index + 1"
          >
          </el-option>
        </el-select>
        <p
          class="err_tips"
          v-if="showWorkYear && !secondInfo.working_seniority"
        >
          Please enter Working Years
        </p>
        <img
          src="../../assets/image/sure.png"
          class="right_sure_img"
          v-if="
            secondInfo.working_seniority
              ? (showWorkYear = true)
              : (showWorkYear = false)
          "
        />
      </div>
      <div class="item_wrapper">
        <p class="lside_title">Work Status</p>
        <div class="right_content clearfix">
          <div
            class="item_certificate fl"
            v-for="(item, index) in roleList"
            :key="index"
            @click="handleClickRoleItem(index)"
            :class="activeRoleClass == index ? 'actived' : ''"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div
        class="item_wrapper small_select"
        v-for="(work, idx) in secondInfo.work_experiences"
        :key="'next' + idx"
      >
        <p class="lside_title">
          <span>Work Experience</span>
        </p>
        <div class="education_wrapper">
          <div class="picker_wrapper clearfix">
            <el-date-picker
              v-model="work.start_time"
              value-format="yyyy-MM"
              type="month"
              placeholder="Start time"
              class="fl"
            >
            </el-date-picker>
            <el-date-picker
              v-model="work.end_time"
              value-format="yyyy-MM"
              type="month"
              placeholder="End time"
              class="fl"
              style="margin:0 20px;"
              @change="endTimeChange(idx)"
            >
            </el-date-picker>
            <img
              src="../../assets/image/sure.png"
              class="right_sure_img fl"
              v-if="work.start_time && (work.end_time || work.now == 2)"
            />
          </div>
          <div class="radio_wrapper" @click="handleClickPresent(idx)">
            <img
              :src="
                work.now == 1
                  ? '/static/images/not_icon.png'
                  : '/static/images/yes_icon.png'
              "
              class="not_icon"
            />
            <span>Present</span>
          </div>
          <div class="clearfix">
            <el-input
              v-model="work.company_name"
              placeholder="Company name"
              class="fl"
            ></el-input>
            <el-input
              v-model="work.position"
              placeholder="Position"
              class="fl"
              style="margin:0 20px;"
            ></el-input>
            <img
              src="../../assets/image/sure.png"
              class="right_sure_img fl"
              v-if="work.company_name && work.position"
            />
          </div>
          <el-input
            type="textarea"
            :autosize="{ minRows: 5 }"
            placeholder="Please fill in the job details"
            v-model="work.work_desc"
            style="margin-top: 20px;width: 380px;"
            class="fl"
          >
          </el-input>
          <img
            src="../../assets/image/sure.png"
            class="right_sure_img fl"
            v-if="work.work_desc"
            style="margin: 20px 0 0 20px;"
          />
        </div>
      </div>
      <p
        class="education_tips"
        v-if="
          showWorkError &&
            (!this.secondInfo.work_experiences[
              this.secondInfo.work_experiences.length - 1
            ].start_time ||
              (!this.secondInfo.work_experiences[
                this.secondInfo.work_experiences.length - 1
              ].end_time &&
                !this.secondInfo.work_experiences[
                  this.secondInfo.work_experiences.length - 1
                ].now == 1) ||
              !this.secondInfo.work_experiences[
                this.secondInfo.work_experiences.length - 1
              ].company_name ||
              !this.secondInfo.work_experiences[
                this.secondInfo.work_experiences.length - 1
              ].position)
        "
      >
        Please enter Work Experience
      </p>
      <div class="add_btn_wrapper" style="margin-top:20px;">
        <div
          class="lside_con"
          style="margin-right:55px;"
          @click="handleClickAddWork"
        >
          <img src="../../assets/image/add_icon.png" class="add_icon" />
          <span>Add Education</span>
        </div>
        <div
          class="rside_con"
          v-if="this.secondInfo.work_experiences.length > 1"
          @click="handleClickDeleteWork"
        >
          <img src="../../assets/image/delete_icon.png" class="add_icon" />
          <span>Delete</span>
        </div>
      </div>
      <div class="line" style="margin-bottom:40px;"></div>
      <div class="introduction_wrapper">
        <p class="lside_title" style="margin-right:20px;">Upload resume</p>
        <uploadComponents
          :type="2"
          :getNotesName="childrenNotesName"
          :limit="1"
          @uploadNotesId="uploadNotesId"
        ></uploadComponents>
      </div>
      <div class="introduction_wrapper">
        <p class="lside_title" style="margin-right:20px;">Upload video</p>
        <uploadComponents
          :type="1"
          :getVideoUrl="childrenVideoUrl"
          @uploadVideoId="uploadVideoId"
        ></uploadComponents>
      </div>
      <div class="line"></div>
      <div class="bottom_btn_wrapper">
        <div class="btn" @click="submitSecond">Next</div>
      </div>
    </div>
  </div>
</template>
<script>
import stepNav from "../../components/stepNav/stepNav";
import topTitle from "../../components/topTitle/topTitle";
import uploadComponents from "../../components/uploadComponents/uploadComponents";
import { submitStep, getTeachCommentInfo } from "../../apis/baseUrls";
export default {
  name: "secondStep",
  components: {
    stepNav,
    topTitle,
    uploadComponents
  },
  data() {
    return {
      content:
        "Awesome, almost there! Stand out from the crowd, add your education background and work experience.",
      progressNum: 60,
      secondInfo: {
        token: "",
        university: "",
        university_img: "",
        cert_other: "",
        working_seniority: "",
        education: [
          {
            edu_start_time: "",
            edu_end_time: "",
            school: "",
            major: "",
            show: 1
          }
        ],
        work_flg: 0,
        work_experiences: [
          {
            start_time: "",
            end_time: "",
            company_name: "",
            position: "",
            work_desc: "",
            now: 1
          }
        ],
        edu_cert_flg: 0,
        edu_auth_flg: 0,
        celta_flg: 1,
        cert_other_flg: 1,
        notes: "",
        videos: ""
      },
      allDegreeList: [
        { id: 1, code: "High School Diploma" },
        { id: 2, code: "Associate's Degree" },
        { id: 3, code: "Bachelor's Degree" },
        { id: 4, code: "Master's Degree" },
        { id: 5, code: "MBA" },
        { id: 6, code: "PHD" }
      ],
      teachingList: [
        {
          value: "TEFL",
          id: 1,
          activeClass: false
        },
        {
          value: "TESOL",
          id: 2,
          activeClass: false
        },
        {
          value: "CELTA",
          id: 3,
          activeClass: false
        },
        {
          value: "OTHERS",
          id: 4,
          activeClass: false
        }
      ],
      activeTeachingClass: 0,
      chooseTeachingList: [],
      showOther: false,
      workYearList: [
        "Less than 1 year",
        "1 year experience",
        "2 years experience",
        "3 years experience",
        "4 years experience",
        "5 years experience",
        "6 years experience",
        "7 years experience",
        "8 years experience",
        "9 years experience",
        "More than 10years"
      ],
      activeRoleClass: 0,
      roleList: ["Employed", "Unemployed"],
      showDegreeError: false,
      showDegreeSure: false,
      showOtherError: false,
      showOtherSure: false,
      showWorkYear: false,
      showEducationError: false,
      showWorkError: false,
      clickNone: false,
      childrenImgUrl: "",
      childrenNotesName: [],
      childrenVideoUrl: ""
    };
  },
  created() {
    this.secondInfo.token = localStorage.getItem("token");
    this.getSecondStepInfo();
  },
  computed: {},
  methods: {
    //   获取草稿信息
    async getSecondStepInfo() {
      let res = await getTeachCommentInfo({
        token: this.secondInfo.token
      });
      if (res.data.code == 200) {
        this.secondInfo.university = res.data.data.university;
        if (res.data.data.university_img) {
          this.secondInfo.university_img = res.data.data.university_img;
          this.childrenImgUrl = res.data.data.university_img_path.path;
        }
        if (res.data.data.education.length != 0) {
          this.secondInfo.education = res.data.data.education;
        }

        if (
          res.data.data.edu_cert_flg == 0 &&
          res.data.data.edu_auth_flg == 0 &&
          res.data.data.celta_flg == 1 &&
          res.data.data.cert_other_flg == 1
        ) {
          this.clickNone = true;
        }
        if (res.data.data.edu_cert_flg != 0) {
          this.secondInfo.edu_cert_flg = res.data.data.edu_cert_flg;
          this.teachingList[0].activeClass = true;
          this.chooseTeachingList.push(1);
        }
        if (res.data.data.edu_auth_flg != 0) {
          this.secondInfo.edu_auth_flg = res.data.data.edu_auth_flg;
          this.teachingList[1].activeClass = true;
          this.chooseTeachingList.push(2);
        }
        if (res.data.data.celta_flg == 2) {
          this.secondInfo.celta_flg = res.data.data.celta_flg;
          this.teachingList[2].activeClass = true;
          this.chooseTeachingList.push(3);
        }
        if (res.data.data.cert_other_flg == 2) {
          this.secondInfo.cert_other_flg = res.data.data.cert_other_flg;
          this.teachingList[3].activeClass = true;
          this.chooseTeachingList.push(4);
        }
        if (res.data.data.cert_other != null) {
          this.secondInfo.cert_other = res.data.data.cert_other;
        }
        this.secondInfo.working_seniority = res.data.data.working_seniority;
        this.secondInfo.work_flg = res.data.data.work_flg;
        if (res.data.data.work_flg == 1) {
          this.activeRoleClass = 1;
        } else {
          this.activeRoleClass = 0;
        }
        if (res.data.data.work.length != 0) {
          this.secondInfo.work_experiences = res.data.data.work;
        }
        if (res.data.data.notes_path != null) {
          this.secondInfo.notes = res.data.data.notes;
          this.childrenNotesName = res.data.data.notes_path;
        }
        if (res.data.data.videos_path != null) {
          this.secondInfo.videos = res.data.data.videos;
          this.childrenVideoUrl = res.data.data.videos_path.path;
        }
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 添加经历
    handleClickAdd() {
      let lastItem = this.secondInfo.education[
        this.secondInfo.education.length - 1
      ];
      if (
        !lastItem.edu_start_time ||
        !lastItem.edu_end_time ||
        !lastItem.school ||
        !lastItem.major
      ) {
        this.showEducationError = true;
        return;
      }
      if (this.secondInfo.education.length >= 5) {
        this.$message.error("Maximum 5 lines");
      } else {
        this.secondInfo.education.push({
          edu_start_time: "",
          edu_end_time: "",
          school: "",
          major: "",
          show: 2
        });
      }
      console.log(this.secondInfo.education);
    },
    // 删除经历
    handleClickDelete() {
      this.secondInfo.education.pop();
    },
    // 添加工作经历
    handleClickAddWork() {
      let lastItem = this.secondInfo.work_experiences[
        this.secondInfo.work_experiences.length - 1
      ];
      if (
        !lastItem.start_time ||
        (!lastItem.end_time && lastItem.now == 1) ||
        !lastItem.company_name ||
        !lastItem.position
      ) {
        this.showWorkError = true;
        return;
      }
      if (this.secondInfo.work_experiences.length >= 5) {
        this.$message.error("Maximum 5 lines");
      } else {
        this.secondInfo.work_experiences.push({
          start_time: "",
          end_time: "",
          company_name: "",
          position: "",
          work_desc: "",
          now: 1
        });
      }
    },
    // 删除工作经历
    handleClickDeleteWork() {
      this.secondInfo.work_experiences.pop();
    },
    // 选择教学证书
    handleClickChooseItem(id) {
      this.clickNone = false;
      if (!this.chooseTeachingList.includes(id)) {
        this.chooseTeachingList.push(id);
        this.teachingList.find(ele => {
          if (ele.id == id) {
            ele.activeClass = true;
          }
        });
      } else {
        this.chooseTeachingList = this.chooseTeachingList.filter(
          cell => cell !== id
        );
        this.teachingList.find(ele => {
          if (ele.id == id) {
            ele.activeClass = false;
          }
        });
      }
    },
    // 是否在职
    handleClickRoleItem(index) {
      this.activeRoleClass = index;
      this.secondInfo.work_flg = index;
    },
    // 点击至今
    handleClickPresent(index) {
      if (this.secondInfo.work_experiences[index].now == 1) {
        this.secondInfo.work_experiences[index].now = 2;
        this.secondInfo.work_experiences[index].end_time = "";
      } else {
        this.secondInfo.work_experiences[index].now = 1;
      }
    },
    // 接收图片id
    uploadImgId(id) {
      this.secondInfo.university_img = id;
    },
    // 接收notesId
    uploadNotesId(id) {
      this.secondInfo.notes = id;
    },
    // 接收videoId
    uploadVideoId(id) {
      this.secondInfo.videos = id;
    },
    // 点击none
    handleClickNone() {
      this.clickNone = !this.clickNone;
      this.chooseTeachingList = [];
      this.teachingList.map(ele => (ele.activeClass = false));
    },
    // 工作结束时间改变
    endTimeChange(idx) {
      this.secondInfo.work_experiences[idx].now = 1;
    },
    // 第二页提交
    async submitSecond() {
      let lastItemEducation = this.secondInfo.education[
        this.secondInfo.education.length - 1
      ];
      let lastItemWork = this.secondInfo.work_experiences[
        this.secondInfo.work_experiences.length - 1
      ];
      if (this.chooseTeachingList.includes(1)) {
        this.secondInfo.edu_cert_flg = 1;
      } else {
        this.secondInfo.edu_cert_flg = 0;
      }
      if (this.chooseTeachingList.includes(2)) {
        this.secondInfo.edu_auth_flg = 1;
      } else {
        this.secondInfo.edu_auth_flg = 0;
      }
      if (this.chooseTeachingList.includes(3)) {
        this.secondInfo.celta_flg = 2;
      } else {
        this.secondInfo.celta_flg = 1;
      }
      if (this.chooseTeachingList.includes(4)) {
        this.secondInfo.cert_other_flg = 2;
      } else {
        this.secondInfo.cert_other_flg = 1;
      }
      if (this.chooseTeachingList.includes(4) && !this.secondInfo.cert_other) {
        this.showOtherError = true;
        return;
      }
      if (
        this.showDegreeSure == true &&
        lastItemEducation.edu_start_time &&
        lastItemEducation.edu_end_time &&
        lastItemEducation.school &&
        lastItemEducation.major &&
        this.showWorkYear == true &&
        lastItemWork.start_time &&
        (lastItemWork.end_time || lastItemWork.now) &&
        lastItemWork.company_name &&
        lastItemWork.position
      ) {
        let res = await submitStep({
          token: this.secondInfo.token,
          university: this.secondInfo.university,
          university_img: this.secondInfo.university_img,
          education: JSON.stringify(this.secondInfo.education),
          work_experiences: JSON.stringify(this.secondInfo.work_experiences),
          edu_cert_flg: this.secondInfo.edu_cert_flg,
          edu_auth_flg: this.secondInfo.edu_auth_flg,
          celta_flg: this.secondInfo.celta_flg,
          cert_other_flg: this.secondInfo.cert_other_flg,
          cert_other: this.secondInfo.cert_other,
          working_seniority: this.secondInfo.working_seniority,
          work_flg: this.secondInfo.work_flg,
          notes: this.secondInfo.notes,
          videos: this.secondInfo.videos
        });
        if (res.data.code == 200) {
          this.$router.push("/thirdStep");
        } else {
          this.$message.error(res.data.msg);
        }
      } else {
        if (!this.secondInfo.university) {
          this.showDegreeError = true;
        }
        if (
          !lastItemEducation.edu_start_time ||
          !lastItemEducation.edu_end_time ||
          !lastItemEducation.school ||
          !lastItemEducation.major
        ) {
          this.showEducationError = true;
        }
        if (
          !lastItemWork.start_time ||
          (!lastItemWork.end_time && !lastItemWork.now) ||
          !lastItemWork.company_name ||
          !lastItemWork.position
        ) {
          this.showWorkError = true;
        }
      }
    }
  }
};
</script>
<style scoped>
.page_wrapper {
  padding-bottom: 20px;
  background: #f3fafb;
}
.first_content_wrapper {
  margin: 0 auto;
  padding-top: 43px;
  width: 1020px;
  background: #ffffff;
  border-radius: 10px;
}
.first_content_wrapper .content_title {
  margin-left: 111px;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.item_wrapper {
  position: relative;
  display: flex;
  margin-top: 20px;
  min-height: 40px;
  line-height: 40px;
}
.introduction_wrapper {
  position: relative;
  display: flex;
  margin: 20px 0;
}
.item_wrapper .lside_title,
.introduction_wrapper .lside_title {
  width: 300px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  text-align: right;
}
.item_wrapper .center_input {
  width: 380px;
  height: 40px;
  background: #ffffff;
  border-radius: 4px;
  border: 1px solid #cccccc;
  box-sizing: border-box;
}
/deep/ .el-input__inner:focus {
  border-color: #333;
  outline: 0;
}
/deep/ .el-textarea__inner:focus {
  border-color: #333;
  outline: 0;
}
/deep/ .el-input {
  width: 380px;
  height: 40px;
}
/deep/ .el-input__inner {
  font-size: 14px;
  font-weight: 500;
  color: #333333;
  border: 1px solid #cccccc;
}
/deep/ .small_select .el-input {
  width: 180px;
  height: 40px;
}
.err_tips {
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ff6010;
}
.line {
  margin: 40px auto 0 auto;
  width: 980px;
  height: 1px;
  background: #dddddd;
}
.bottom_btn_wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
}
.bottom_btn_wrapper .btn {
  width: 100px;
  height: 40px;
  background: #078ca9;
  border-radius: 4px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
}
.upload_wrapper {
  margin: 10px 20px 0 320px;
}
.education_wrapper,
.add_btn_wrapper {
  margin: 0 20px;
}
.input_wrapper {
  margin-top: 20px;
}
.add_btn_wrapper {
  display: flex;
  margin-left: 320px;
  cursor: pointer;
}
.add_btn_wrapper .add_icon {
  display: inline-block;
  margin-right: 10px;
  width: 18px;
  height: 18px;
  vertical-align: top;
}
.add_btn_wrapper .lside_con span {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #078ca9;
}
.add_btn_wrapper .rside_con span {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
}
.right_content {
  width: 404px;
}
.right_content .item_certificate {
  margin-left: 20px;
  margin-bottom: 20px;
  width: 180px;
  height: 40px;
  background: #f8f8f8;
  border-radius: 4px;
  border: 1px solid #cccccc;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #cccccc;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
  box-sizing: border-box;
}
.right_content .item_certificate.actived {
  color: #078ca9;
  background: rgba(7, 140, 169, 0.1);
  border: 1px solid #078ca9;
}
.other_wrapper {
  margin-left: 320px;
  margin-right: 20px;
  width: 380px;
}
.certificates {
  display: flex;
  line-height: 40px;
}
.education_wrapper .picker_wrapper,
.education_wrapper .input_wrapper {
  position: relative;
}
.position_err_tips {
  position: absolute;
  top: 0;
  right: -222px;
}
.radio_wrapper {
  margin-left: 202px;
  cursor: pointer;
}
.radio_wrapper .not_icon {
  display: inline-block;
  width: 16px;
  height: 16px;
}
.radio_wrapper span {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  vertical-align: top;
}
.right_sure_img {
  margin-top: 12px;
  width: 16px;
  height: 16px;
}
.education_tips {
  margin-top: 10px;
  padding-left: 320px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ff6010;
}
</style>
