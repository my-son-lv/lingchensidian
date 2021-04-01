<!--  -->
<template>
  <div class>
    <commonNav></commonNav>
    <div class="first_details_wrapper">
      <div class="details_title">Basic information</div>
      <div class="details_item clearfix">
        <span class="lside_con fl">
          Name
          <i>*</i>
        </span>
        <span class="rside_con fr">{{this.name}}</span>
      </div>
      <div class="details_item clearfix">
        <span class="lside_con fl">
          Last name
          <i>*</i>
        </span>
        <span class="rside_con fr">{{this.lastName}}</span>
      </div>
      <div class="details_item clearfix">
        <span class="lside_con fl">
          Gender
          <i>*</i>
        </span>
        <span class="rside_con fr">{{this.gende}}</span>
      </div>
      <div class="details_item clearfix">
        <span class="lside_con fl">
          Date of birth
          <i>*</i>
        </span>
        <span class="rside_con fr">{{this.dateOfBirth}}</span>
      </div>
      <div class="details_item clearfix">
        <span class="lside_con fl">
          Nationality
          <i>*</i>
        </span>
        <span class="rside_con fr">{{this.nationValue}}</span>
      </div>
      <div class="details_item clearfix">
        <span class="lside_con fl">
          Are you in China
        </span>
        <span class="rside_con fr">{{this.inChina}}</span>
      </div>
      <div class="details_item clearfix" v-show="this.showInChina == 1">
        <span class="lside_con fl">
          City
        </span>
        <span class="rside_con fr">{{this.cityValue}}</span>
      </div>
      <div class="details_item clearfix" v-show="this.showInChina == 1">
        <span class="lside_con fl">
          Visa Type
        </span>
        <span class="rside_con fr">{{this.visaValue}}</span>
      </div>
      <div class="details_item clearfix" v-show="this.showInChina == 1">
        <span class="lside_con fl">
          Date of Expiry
        </span>
        <span class="rside_con fr">{{this.expiryValue}}</span>
      </div>
      <div class="details_item clearfix" v-show="this.showInChina == 0">
        <span class="lside_con fl">
          Address
        </span>
        <span class="rside_con fr">{{this.address}}</span>
      </div>
      <div class="details_item clearfix">
        <span class="lside_con fl">
          Phone Number
        </span>
        <span class="rside_con fr">{{this.phoneNum}}</span>
      </div>
      <div class="details_item clearfix">
        <span class="lside_con fl">
          Wechat
          <i>*</i>
        </span>
        <span class="rside_con fr">{{this.weChart}}</span>
      </div>
      <div class="details_item clearfix">
        <span class="lside_con fl">
          picture upload
        </span>
        <img class="upload_img fr" :src="this.photosPath" />
      </div>
    </div>
    <!-- 第二页 -->
    <div class="third_details_wrapper">
      <div class="details_title">Education information</div>
      <div class="details_item clearfix">
        <span class="lside_con fl">
          Name of University
        </span>
        <span class="rside_con fr">{{this.nameOfUniversity }}</span>
      </div>
      <div class="details_item clearfix">
        <span class="lside_con fl">
          Major
        </span>
        <span class="rside_con fr">{{this.major}}</span>
      </div>
      <div class="details_item clearfix">
        <span class="lside_con fl">
          Highest Academic Degree
          <i>*</i>
        </span>
        <span class="rside_con fr">{{this.degreeList[this.highest - 1]}}</span>
      </div>
      <div class="upload_tefl clearfix">
        <span class="lside_con">
          TEFL
        </span>
        <span class="rside_con fr">{{this.teflValue}}</span>
      </div>
      <div class="upload_tefl">
        <span class="lside_con">
          TESOL
        </span>
        <img v-if="this.edu_auth_flg == 1" :src="this.tesolUrl" class="tefl_img" />
        <span v-else class="rside_con fr">{{this.tesolValue}}</span>
      </div>
    </div>
    <!-- 第三页 -->
    <div class="fouth_details_wrapper">
      <div class="details_title">Job information</div>
      <div class="details_item clearfix">
        <span class="lside_con fl">
          Working years
          <i>*</i>
        </span>
        <span class="rside_con fr">{{this.workingYearList[this.workingYears - 1]}}</span>
      </div>
      <div class="details_item clearfix">
        <span class="lside_con fl">
          Still in role
        </span>
        <span class="rside_con fr">{{this.role}}</span>
      </div>
      <div class="details_item clearfix">
        <span class="lside_con fl">
          Expected Salary
          <i>*</i>
        </span>
        <span class="rside_con fr">{{this.expectationList[this.salaryExpectationValue - 1]}}</span>
      </div>
      <div class="details_item clearfix">
        <span class="lside_con fl">
          Preferred cities to work-if any
        </span>
        <span class="rside_con fr">{{this.preferredValue}}</span>
      </div>
      <div class="school_wrapper">
        <h6 class="school_title">
          preferred type of school
        </h6>
        <div class="school_content" v-for="(item,index) in chooseSchoolList" :key="index">{{item}}</div>
      </div>
      <div class="details_item clearfix">
        <span class="lside_con fl">
          Job Type
        </span>
        <span class="rside_con fr">{{this.jobList[this.workTypeValue - 1]}}</span>
      </div>
      <div class="details_item clearfix">
        <span class="lside_con fl">
          Job Category
        </span>
        <span class="rside_con fr">{{this.jobTypeList[this.categoryValue - 1]}}</span>
      </div>
      <div class="school_wrapper">
        <h6 class="school_title">
          Age of Students(years old)
        </h6>
        <div class="school_content" v-for="(item,index) in chooseAgeList" :key="index">{{item}}</div>
      </div>
      <div class="upload_tefl">
        <span class="lside_con">
          About me(text)
        </span>
        <div class="self_con">{{this.selfContent}}</div>
      </div>
      <div class="upload_tefl">
        <span class="lside_con">
          Upload your video(Video)
        </span>
        <div class="video_wrapper">
          <video width="100%" class="self_video" :src="this.videoUrl" controls="controls"></video>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCountryList, desc, upStatusToNewUser } from "../../apis/baseUrls";
import commonNav from "../../components/commonNav/commonNav";
import { Dialog } from "vant";
export default {
  name: "cancelApplication",
  //import引入的组件需要注入到对象中才能使用
  components: { commonNav },
  data() {
    //这里存放数据
    return {
      titleContent: "Cancel Application",
      name: "",
      lastName: "",
      gende: "",
      dateOfBirth: "",
      nation: "",
      nationValue: "",
      address: "",
      mobilePhoneNum: "",
      weChat: "",
      expectationCity: "",
      nameOfUniversity: "",
      academicDegree: "",
      major: "",
      chineseWorkVisa: "",
      academicAttestation: "",
      workingYears: "",
      role: "",
      salaryExpectation: "",
      placeOfWork: "",
      selfContent: "",
      videoUrl: "",
      nationalityList: [],
      allExpectationList: [
        { id: 1, code: "Negotiable" },
        { id: 2, code: "10-15K" },
        { id: 3, code: "15-20K" },
        { id: 4, code: "20K+" }
      ],
      salaryExpectationValue: "",
      photosPath: "",
      teflUrl: "",
      tesolUrl: "",
      teflValue: "",
      tesolValue: "",
      edu_cert_flg: "",
      edu_auth_flg: "",
      allWorkingYearList: [
        {
          id: 1,
          value: "Less than 1 year"
        },
        {
          id: 2,
          value: "1-3 years"
        },
        {
          id: 3,
          value: "3-5 years"
        },
        {
          id: 4,
          value: "5-10 years"
        },
        {
          id: 5,
          value: "More than 10 years"
        }
      ],
      inChina: '',
      showInChina: '',
      cityValue: '',
      visaValue: '',
      expiryValue: '',
      phoneNum: '',
      weChart: '',
      degreeList: ["High School Diploma", "Associate's Degree", "Bachelor's Degree", "Master's Degree", "MBA", "PHD"],
      highest: '',
      workingYearList: [
        "No any work experience yet",
        "Less than 1 year",
        "1 - 3 years",
        "3 - 5 years",
        "5 - 10 years",
        "More than 10 years"
      ],
      expectationList: ["10k-13k", "13k-16k", "16k-20k", "20k-25k", ">25k"],
      preferredValue: '',
      schoolTypeList: [
        {
          value: 'Training Center',
          id: 1
        },
        {
          value: 'International Kindergarten',
          id: 2
        },
        {
          value: 'International School',
          id: 3
        },
        {
          value: 'Public School',
          id: 4
        },
        {
          value: 'Online Class',
          id: 5
        },
        {
          value: 'Others',
          id: 6
        },
      ],
      schoolValue: '',
      workTypeValue: '',
      jobList: ["Any", "Full-time", "Part-time"],
      categoryValue: '',
      jobTypeList: ["Offline", "Online", "Any"],
      ageValue: '',
      chooseSchoolList: [],
      chooseAgeList: [],
      studentAgeList: [
        { value: '0-3', id: 1 },
        { value: '3-6', id: 2 },
        { value: '7-12', id: 3 },
        { value: '13-18', id: 4 },
        { value: '18+', id: 5 }
      ],
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 获取国籍
    getCountry() {
      getCountryList().then(res => {
        const result = res.data;
        if (result.code == 200) {
          result.data.map(ele => {
            if (this.nation == ele.id) {
              this.nationValue = ele.code;
            }
          });
        }
      });
    },
    getAllMessage() {
      desc({
        token: localStorage.getItem("token")
      }).then(res => {
        if (res.data.code == 200) {
          this.getCountry();
          const result = res.data.data;
          this.name = result.name;
          if (result.last_name != null) {
            this.lastName = result.last_name;
          };
          if (result.sex == 0) {
            this.gende = "Male";
          } else {
            this.gende = "Female";
          };
          if (result.brithday != null) {
            this.dateOfBirth = result.brithday;
          };
          this.nationValue = result.nationality_val;
          this.showInChina = result.in_domestic;
          if (result.in_domestic == 0) {
            this.inChina = "No";
          } else {
            this.inChina = "Yes";
          };
          if (result.china_address_city_data != null) {
            this.cityValue = result.china_address_city_data.city_data.pinyin;
          };
          if (result.visa_type != null) {
            switch (result.visa_type) {
              case 1:
                this.visaValue = 'Z';
                break;
              case 2:
                this.visaValue = 'M';
                break;
              case 3:
                this.visaValue = 'F';
                break;
              case 4:
                this.visaValue = 'X';
                break;
              case 5:
                this.visaValue = 'others';
                break;
            };
          };
          if (result.visa_exp_date != null) {
            this.expiryValue = result.visa_exp_date;
          };
          if (result.country_val != null) {
            this.address = result.country_val;
          };
          if (result.phone != null) {
            this.phoneNum = result.phone;
          };
          if (result.wechat != null) {
            this.weChart = result.wechat;
          };
          if (result.photos != null) {
            this.photosPath = result.photos_path[0].path;
          };
          if (result.school != null) {
            this.nameOfUniversity = result.school;
          };
          if (result.major != null) {
            this.major = result.major;
          };
          this.highest = result.university;
          if (result.edu_cert_flg != null) {
            if (result.edu_cert_flg == 0) {
              this.teflValue = "No";
            } else {
              this.teflValue = "Yes";
            }
          };
          if (result.edu_auth_flg != null) {
            if (result.edu_auth_flg == 0) {
              this.tesolValue = "No";
            } else {
              this.tesolValue = "Yes";
            }
          };
          this.workingYears = result.working_seniority;
          if (result.work_flg != null) {
            if (result.work_flg == 0) {
              this.role = "No";
            } else {
              this.role = "Yes";
            }
          };
          this.salaryExpectationValue = result.pay_type;
          this.preferredValue = result.working_city_datas[0].city_data.pinyin;
          if (result.school_type != null) {
            this.schoolValue = result.school_type.split(',').map(Number);
            this.schoolValue.forEach(ele => {
              let menuId = this.schoolTypeList.find(c => c.id == ele);
              if (menuId) {
                this.chooseSchoolList.push(menuId.value);
              }
            });
          }

          this.workTypeValue = result.job_work_type;
          this.categoryValue = result.job_type;
          if (result.student_age != null) {
            this.ageValue = result.student_age.split(',').map(Number);
            this.ageValue.forEach(ele => {
              let menuId = this.studentAgeList.find(c => c.id == ele);
              if (menuId) {
                this.chooseAgeList.push(menuId.value);
              }
            });
          };
          if (result.desc != null) {
            this.selfContent = result.desc;
          };
          if (result.videos != null) {
            this.videoUrl = result.videos_path[0].path;
          }
        } else {
          Toast.fail(res.data.msg);
        }
      });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getAllMessage();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() { }
};
</script>
<style scoped>
.details_item {
  padding: 0 30px;
  height: 120px;
  border-bottom: 1px solid rgba(238, 238, 238, 1);
  line-height: 120px;
}
.school_wrapper {
  padding: 30px;
  min-height: 60px;
  border-bottom: 1px solid rgba(238, 238, 238, 1);
}
.school_content {
  margin: 20px 0;
  font-size: 28px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.details_item .lside_con,
.upload_tefl .lside_con,
.school_wrapper .school_title {
  font-size: 28px;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}
.lside_con i {
  display: inline-block;
  color: #ee0a24;
}
.details_item .rside_con,
.upload_tefl .rside_con {
  font-size: 28px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.details_title {
  display: flex;
  align-items: center;
  padding-left: 30px;
  height: 92px;
  background: rgba(245, 245, 245, 1);
  font-size: 24px;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
.upload_img {
  margin-top: 3%;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  border: 1px solid rgba(238, 238, 238, 1);
}
.upload_tefl {
  padding: 40px 30px 30px 30px;
  min-height: 50px;
  border-bottom: 1px solid rgba(238, 238, 238, 1);
}
.tefl_img {
  margin-top: 30px;
  width: 380px;
  height: 288px;
  border: 1px solid rgba(238, 238, 238, 1);
}
.self_con {
  margin-top: 30px;
  padding: 30px;
  width: 630px;
  background: rgba(248, 248, 248, 1);
  border-radius: 10px;
  font-size: 28px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 42px;
  text-align: justify;
}
.video_wrapper {
  margin-top: 30px;
  width: 689px;
  height: 388px;
  border-radius: 10px;
}
.video_wrapper .self_video {
  height: 388px;
}
</style>