<template>
  <div class="page_wrapper">
    <stepNav></stepNav>
    <topTitle :Parentcontent="content" :progressNum="progressNum"></topTitle>
    <div class="first_content_wrapper">
      <h3 class="content_title">Job Sought</h3>
      <div class="item_wrapper">
        <p class="lside_title">Job Type</p>
        <el-select
          v-model="thirdInfo.job_work_type"
          placeholder="Please Select"
          style="margin: 0 20px;"
        >
          <el-option
            v-for="item in jobWorkTypeList"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <p
          class="err_tips"
          v-if="showjobWorkTypeError && !thirdInfo.job_work_type"
        >
          Please enter Job Type
        </p>
        <img
          src="../../assets/image/sure.png"
          class="right_sure_img"
          v-if="
            thirdInfo.job_work_type
              ? (showjobWorkTypeSure = true)
              : (showjobWorkTypeSure = false)
          "
        />
      </div>
      <div class="item_wrapper">
        <p class="lside_title">Job Category</p>
        <el-select
          v-model="thirdInfo.job_type"
          placeholder="Please Select"
          style="margin: 0 20px;"
        >
          <el-option
            v-for="item in jobTypeList"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <p class="err_tips" v-if="showjoTypeError && !thirdInfo.job_type">
          Please enter Job Category
        </p>
        <img
          src="../../assets/image/sure.png"
          class="right_sure_img"
          v-if="
            thirdInfo.job_type
              ? (showjoTypeSure = true)
              : (showjoTypeSure = false)
          "
        />
      </div>
      <div class="item_wrapper">
        <p class="lside_title">Expected Salary</p>
        <el-select
          v-model="thirdInfo.pay_type"
          placeholder="Please Select"
          style="margin: 0 20px;"
        >
          <el-option
            v-for="item in payList"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <p class="err_tips" v-if="showPayError && !thirdInfo.pay_type">
          Please enter Expected Salary
        </p>
        <img
          src="../../assets/image/sure.png"
          class="right_sure_img"
          v-if="
            thirdInfo.pay_type ? (showPaySure = true) : (showPaySure = false)
          "
        />
      </div>
      <div class="item_wrapper" v-if="showRelocate">
        <p class="lside_title">Relocate in China</p>
        <div
          class="right_sex"
          v-for="(item, index) in inChinaList"
          :key="index"
          :class="activeChinaClass == index ? 'actived' : ''"
          @click="getChinaItem(index, item.id)"
        >
          {{ item.value }}
        </div>
      </div>
      <div class="item_wrapper" v-if="thirdInfo.relocate == 2">
        <p class="lside_title">Preferred Job Locations</p>
        <div
          class="city_wrapper"
          :class="chooseCitiesList == 0 ? 'select_cities' : 'active_cities'"
          @click="showCityMask = true"
        >
          <span v-if="chooseCityIdList.length == 0">
            Select Cities (Max.3)</span
          >
          <span
            v-else
            class="choose_content_wrapper"
            v-for="(item, index) in chooseCityIdList"
            :key="index"
          >
            {{ item }},
          </span>
          <img
            src="../../assets/image/select_down.png"
            class="right_down_icon"
          />
          <div class="hot_city_wrapper" v-if="showCityMask">
            <h3 class="city_title">Please select Cities (Max 3)</h3>
            <ul class="city_nav_wrapper clearfix">
              <li
                class="city_nav_item"
                v-for="(nav, index) in cityNavList"
                :key="index"
                :class="activeNavClass == index ? 'active_nav' : ''"
                @click="getCityItem(index)"
              >
                {{ nav }}
              </li>
            </ul>
            <el-checkbox-group
              v-model="chooseCitiesList"
              class="city_item_wrapper"
              fill="#078CA91A"
              text-color="#078CA9"
              :max="3"
              @change="cityChange"
            >
              <el-checkbox-button
                v-for="(city, index) in cityList"
                :label="city.id"
                :key="index"
                >{{ city.pinyin }}</el-checkbox-button
              >
            </el-checkbox-group>
            <div class="choose_city_wrapper">
              <p class="lside-title">Your selection:(max3)</p>
              <div
                class="choose_city_item"
                v-for="(item, index) in chooseCityIdList"
                :key="index"
              >
                {{ item }}
              </div>
            </div>
            <div class="city_btn_wrapper">
              <div class="lside_btn" @click.stop="showCityMask = false">
                Cancel
              </div>
              <div class="rside_btn" @click.stop="handleClickCityConfirm">
                Confirm
              </div>
            </div>
          </div>
        </div>
        <p
          class="err_tips"
          v-if="showCityError && chooseCityIdList.length == 0"
        >
          Please select Cities
        </p>
        <img
          src="../../assets/image/sure.png"
          class="right_sure_img"
          v-if="
            chooseCityIdList.length != 0 || this.thirdInfo.all_city == 2
              ? (showCitySure = true)
              : (showCitySure = false)
          "
        />
      </div>
      <div
        v-if="thirdInfo.relocate == 2"
        class="radio_wrapper"
        @click="handleClickInChina"
        style="margin-top:10px;"
      >
        <img
          :src="
            showNotIcon == true
              ? '/static/images/yes_icon.png'
              : '/static/images/not_icon.png'
          "
          class="not_icon"
        />
        <span>Any city in China</span>
      </div>
      <div class="line" style="margin-bottom:40px;"></div>
      <div class="item_wrapper">
        <p class="lside_title">Preferred type of school</p>
        <div class="right_content clearfix">
          <div
            class="item_certificate fl"
            v-for="(item, index) in schoolList"
            :key="index"
            @click="handleClickSchoolItem(item.id)"
            :class="item.activeClass == true ? 'actived' : ''"
          >
            {{ item.value }}
          </div>
        </div>
        <p
          class="err_tips"
          style="margin-left: 20px;"
          v-if="showSchoolError && chooseSchoolList.length == 0"
        >
          Please enter Preferred type of school
        </p>
        <img
          src="../../assets/image/sure.png"
          class="right_sure_img"
          style="margin-left: 20px;"
          v-if="
            chooseSchoolList.length != 0
              ? (showSchoolSure = true)
              : (showSchoolSure = false)
          "
        />
      </div>
      <div class="line" style="margin-bottom:40px;"></div>
      <div class="item_wrapper">
        <p class="lside_title">Age of Students</p>
        <div class="right_content clearfix">
          <div
            class="item_certificate fl"
            v-for="(item, index) in sudentAgeList"
            :key="index"
            @click="handleClickAgesItem(item.id)"
            :class="item.activeClass == true ? 'actived' : ''"
          >
            {{ item.value }}
          </div>
        </div>
        <p
          class="err_tips"
          style="margin-left: 20px;"
          v-if="showAgesError && chooseAgeList.length == 0"
        >
          Please enter Age of Students
        </p>
        <img
          src="../../assets/image/sure.png"
          class="right_sure_img"
          style="margin-left: 20px;"
          v-if="
            chooseAgeList.length != 0
              ? (showAgesSure = true)
              : (showAgesSure = false)
          "
        />
      </div>
      <div class="line"></div>
      <div class="bottom_btn_wrapper">
        <div class="btn" @click="submitAllStep">Next</div>
      </div>
    </div>
  </div>
</template>
<script>
import stepNav from "../../components/stepNav/stepNav";
import topTitle from "../../components/topTitle/topTitle";
import {
  submitStep,
  getCityByLetter,
  getTeachCommentInfo
} from "../../apis/baseUrls";
import axios from "../../apis/http";
export default {
  name: "thirdStep",
  components: {
    stepNav,
    topTitle
  },
  data() {
    return {
      content:
        "One last step! Fill out your job expectation to match the right job",
      progressNum: 100,
      thirdInfo: {
        token: "",
        job_work_type: "",
        pay_type: "",
        job_type: "",
        relocate: 2,
        all_city: 1,
        school_type: [],
        student_age: [],
        type: 1
      },
      jobWorkTypeList: [
        {
          value: "Any",
          id: 1
        },
        {
          value: "Full-time",
          id: 2
        },
        {
          value: "Part-time",
          id: 3
        }
      ],
      jobTypeList: [
        {
          value: "Offline",
          id: 1
        },
        {
          value: "Online",
          id: 2
        },
        {
          value: "Any",
          id: 3
        }
      ],
      payList: [
        {
          value: "10k-13k",
          id: 1
        },
        {
          value: "13k-16k",
          id: 2
        },
        {
          value: "16k-20k",
          id: 3
        },
        {
          value: "20k-25k",
          id: 4
        },
        {
          value: ">25k",
          id: 5
        }
      ],
      inChinaList: [
        {
          value: "YES",
          id: 2
        },
        {
          value: "NO",
          id: 1
        }
      ],
      activeChinaClass: 0,
      showNotIcon: false,
      activeSchoolClass: 0,
      schoolList: [
        {
          value: "Training Center",
          id: 1,
          activeClass: false
        },
        {
          value: "International Kindergarten",
          id: 2,
          activeClass: false
        },
        {
          value: "Inernational School",
          id: 3,
          activeClass: false
        },
        {
          value: "Public School",
          id: 4,
          activeClass: false
        },
        {
          value: "Online Class",
          id: 5,
          activeClass: false
        },
        {
          value: "Others",
          id: 6,
          activeClass: false
        }
      ],
      chooseSchoolList: [],
      sudentAgeList: [
        {
          value: "0-3",
          id: 1,
          activeClass: false
        },
        {
          value: "3-6",
          id: 2,
          activeClass: false
        },
        {
          value: "7-12",
          id: 3,
          activeClass: false
        },
        {
          value: "13-18",
          id: 4,
          activeClass: false
        },
        {
          value: "18+",
          id: 5,
          activeClass: false
        }
      ],
      chooseAgeList: [],
      showjobWorkTypeSure: false,
      showjobWorkTypeError: false,
      showjoTypeError: false,
      showjoTypeSure: false,
      showPayError: false,
      showPaySure: false,
      showSchoolSure: false,
      showSchoolError: false,
      showAgesError: false,
      showAgesSure: false,
      chooseCitiesList: [],
      cityNavList: [
        "Hot Cities",
        "ABCD",
        "EFGH",
        "JKLM",
        "NOPQ",
        "RSTU",
        "WXYZ"
      ],
      activeNavClass: 0,
      cityList: [
        {
          pinyin: "Beijing",
          id: 110100
        },
        {
          pinyin: "Shanghai",
          id: 310100
        },
        {
          pinyin: "Chongqing",
          id: 500100
        },
        {
          pinyin: "Tianjin",
          id: 120100
        },
        {
          pinyin: "Guangzhou",
          id: 440100
        },
        {
          pinyin: "Hangzhou",
          id: 330100
        },
        {
          pinyin: "Chengdu",
          id: 510100
        },
        {
          pinyin: "Shenzhen",
          id: 440300
        },
        {
          pinyin: "Suzhou",
          id: 320500
        },
        {
          pinyin: "Nanjing",
          id: 320100
        },
        {
          pinyin: "Xian",
          id: 610100
        },
        {
          pinyin: "Changsha",
          id: 430100
        },
        {
          pinyin: "Sanya",
          id: 460200
        }
      ],
      defaultCityList: [
        {
          pinyin: "Beijing",
          id: 110100
        },
        {
          pinyin: "Shanghai",
          id: 310100
        },
        {
          pinyin: "Chongqing",
          id: 500100
        },
        {
          pinyin: "Tianjin",
          id: 120100
        },
        {
          pinyin: "Guangzhou",
          id: 440100
        },
        {
          pinyin: "Hangzhou",
          id: 330100
        },
        {
          pinyin: "Chengdu",
          id: 510100
        },
        {
          pinyin: "Shenzhen",
          id: 440300
        },
        {
          pinyin: "Suzhou",
          id: 320500
        },
        {
          pinyin: "Nanjing",
          id: 320100
        },
        {
          pinyin: "Xian",
          id: 610100
        },
        {
          pinyin: "Changsha",
          id: 430100
        },
        {
          pinyin: "Sanya",
          id: 460200
        }
      ],
      hotCityId: "",
      chooseCityIdList: [],
      allCitylist: [],
      showCityMask: false,
      showCitySure: false,
      showCityError: false,
      showRelocate: true
    };
  },
  created() {
    this.getAllCity();
    let inChina = sessionStorage.getItem("inChina");
    this.thirdInfo.token = localStorage.getItem("token");
    if (inChina == 1) {
      this.showRelocate = false;
    }
    this.getFirstStepInfo();
  },
  computed: {},
  methods: {
    //   获取草稿信息
    async getFirstStepInfo() {
      let res = await getTeachCommentInfo({
        token: this.thirdInfo.token
      });
      if (res.data.code == 200) {
        this.thirdInfo.job_type = res.data.data.job_type;
        this.thirdInfo.job_work_type = res.data.data.job_work_type;
        this.thirdInfo.pay_type = res.data.data.pay_type;
        this.thirdInfo.relocate = res.data.data.relocate;
        if (res.data.data.relocate == 1) {
          this.activeChinaClass = 1;
        } else {
          this.activeChinaClass = 0;
        }
        if (res.data.data.working_city_datas != null) {
          this.chooseCitiesList = res.data.data.working_city
            .split(",")
            .map(Number);
          res.data.data.working_city_datas.map(ele => {
            this.chooseCityIdList.push(ele.city_data.pinyin);
          });
        }
        this.thirdInfo.all_city = res.data.data.all_city;
        if (res.data.data.school_type != null) {
          this.chooseSchoolList = res.data.data.school_type
            .split(",")
            .map(Number);
          this.chooseSchoolList.forEach(ele => {
            let sameId = this.schoolList.find(item => ele == item.id);
            if (sameId) {
              return (sameId.activeClass = true);
            }
          });
        }
        if (res.data.data.student_age != null) {
          this.chooseAgeList = res.data.data.student_age.split(",").map(Number);
          this.chooseAgeList.forEach(ele => {
            let sameId = this.sudentAgeList.find(item => ele == item.id);
            if (sameId) {
              return (sameId.activeClass = true);
            }
          });
        }
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 选择in China
    getChinaItem(index, id) {
      this.activeChinaClass = index;
      this.thirdInfo.relocate = id;
      this.thirdInfo.all_city = 1;
      this.showNotIcon = false;
      this.chooseCityIdList = [];
      this.chooseCitiesList = [];
    },
    // 点击in china
    handleClickInChina() {
      this.showNotIcon = !this.showNotIcon;
      if (this.showNotIcon == true) {
        this.thirdInfo.all_city = 2;
        this.showCityError = false;
      } else {
        this.thirdInfo.all_city = 1;
        this.showCityError = true;
      }
      this.chooseCityIdList = [];
      this.chooseCitiesList = [];
    },
    // 学校选择
    handleClickSchoolItem(id) {
      if (!this.chooseSchoolList.includes(id)) {
        this.chooseSchoolList.push(id);
        this.schoolList.find(ele => {
          if (ele.id == id) {
            ele.activeClass = true;
          }
        });
      } else {
        this.chooseSchoolList = this.chooseSchoolList.filter(
          cell => cell !== id
        );
        this.schoolList.find(ele => {
          if (ele.id == id) {
            ele.activeClass = false;
          }
        });
      }
    },
    // 学生年龄
    handleClickAgesItem(id) {
      if (!this.chooseAgeList.includes(id)) {
        this.chooseAgeList.push(id);
        this.sudentAgeList.find(ele => {
          if (ele.id == id) {
            ele.activeClass = true;
          }
        });
      } else {
        this.chooseAgeList = this.chooseAgeList.filter(cell => cell !== id);
        this.sudentAgeList.find(ele => {
          if (ele.id == id) {
            ele.activeClass = false;
          }
        });
      }
    },
    // 获取所有的城市
    async getAllCity() {
      let res = await axios.get("/api/index/getCityByChar");
      if (res.data.code == 200) {
        this.allCitylist = res.data.data;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 选择城市
    async getCityItem(index) {
      this.activeNavClass = index;
      if (index == 0) {
        this.hotCityId = "";
        this.cityList = this.defaultCityList;
      } else {
        if (index == 1) {
          this.hotCityId = "A,B,C,D";
        }
        if (index == 2) {
          this.hotCityId = "E,F,G,H";
        }
        if (index == 3) {
          this.hotCityId = "J,K,L,M";
        }
        if (index == 4) {
          this.hotCityId = "N,O,P,Q";
        }
        if (index == 5) {
          this.hotCityId = "R,S,T,U";
        }
        if (index == 6) {
          this.hotCityId = "W,X,Y,Z";
        }
        let res = await getCityByLetter(this.hotCityId);
        console.log(res.data);
        if (res.data.code == 200) {
          this.cityList = res.data.data;
        }
      }
    },
    // 选择城市发生改变
    cityChange() {
      this.chooseCityIdList = [];
      this.allCitylist.forEach(ele => {
        let sameId = this.chooseCitiesList.find(item => item == ele.id);
        if (sameId) {
          return this.chooseCityIdList.push(ele.pinyin);
        }
      });
      this.thirdInfo.all_city = 1;
      this.showNotIcon = false;
    },
    // 选择城市确认按钮
    handleClickCityConfirm() {
      this.showCityMask = !this.showCityMask;
    },
    // 提交
    async submitAllStep() {
      if (
        this.showjobWorkTypeSure == true &&
        this.showjoTypeSure == true &&
        this.showPaySure == true &&
        (this.showCitySure == true || this.thirdInfo.relocate) &&
        this.showSchoolSure == true &&
        this.showAgesSure == true
      ) {
        let res = await submitStep({
          token: this.thirdInfo.token,
          job_type: this.thirdInfo.job_type,
          job_work_type: this.thirdInfo.job_work_type,
          pay_type: this.thirdInfo.pay_type,
          relocate: this.thirdInfo.relocate,
          working_city: this.chooseCitiesList.toString(),
          all_city: this.thirdInfo.all_city,
          school_type: this.chooseSchoolList.sort().toString(),
          student_age: this.chooseAgeList.sort().toString(),
          type: this.thirdInfo.type
        });
        if (res.data.code == 200) {
          this.$router.push("/toExaminePage");
        } else {
          this.$message.error(res.data.msg);
        }
      } else {
        if (this.showjobWorkTypeSure == false) {
          this.showjobWorkTypeError = true;
        }
        if (this.showjoTypeSure == false) {
          this.showjoTypeError = true;
        }
        if (this.showPaySure == false) {
          this.showPayError = true;
        }
        if (this.showCitySure == false) {
          this.showCityError = true;
        }
        if (this.showSchoolSure == false) {
          this.showSchoolError = true;
        }
        if (this.showAgesSure == false) {
          this.showAgesError = true;
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
.item_wrapper .right_sex {
  margin-left: 20px;
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
.item_wrapper .right_sex.actived {
  color: #078ca9;
  background: rgba(7, 140, 169, 0.1);
  border: 1px solid #078ca9;
}
.city_wrapper {
  position: relative;
  margin: 0 20px;
  padding: 0 14px;
  width: 380px;
  height: 40px;
  background: #ffffff;
  border-radius: 4px;
  border: 1px solid #cccccc;
  box-sizing: border-box;
  line-height: 40px;
  cursor: pointer;
}
.radio_wrapper {
  margin-left: 320px;
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
.right_sure_img {
  margin-top: 12px;
  width: 16px;
  height: 16px;
}
.item_wrapper .city_wrapper.select_cities {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #cccccc;
}
.item_wrapper .city_wrapper.active_cities {
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.item_wrapper .right_down_icon {
  position: absolute;
  top: 50%;
  right: 12px;
  margin-top: -8px;
  width: 16px;
  height: 16px;
}
.hot_city_wrapper {
  position: absolute;
  top: 44px;
  left: 0;
  padding: 20px 20px 0 20px;
  width: 480px;
  background: #ffffff;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  border: 1px solid #dddddd;
  z-index: 99;
  box-sizing: border-box;
}
.hot_city_wrapper .city_title {
  margin-bottom: 20px;
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.hot_city_wrapper .city_nav_wrapper {
  margin-bottom: 20px;
  width: 438px;
  height: 32px;
  border-bottom: 1px solid #078ca9;
}
.hot_city_wrapper .city_nav_item {
  float: left;
  margin-right: 4px;
  padding: 0 10px;
  min-width: 54px;
  height: 32px;
  background: #f2f2f2;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  line-height: 32px;
  text-align: center;
  box-sizing: border-box;
}
.hot_city_wrapper .city_nav_item:nth-last-child() {
  margin-right: 0px;
}
.hot_city_wrapper .city_nav_item.active_nav {
  font-size: 12px;
  font-weight: 500;
  color: #ffffff;
  background: #078ca9;
}
.city_item_wrapper {
  display: flex;
  align-content: flex-start;
  flex-flow: row wrap;
  width: 100%;
  height: 180px;
  border-bottom: 1px solid #dddddd;
  overflow-y: scroll;
}
/deep/ .city_item_wrapper .el-checkbox-button__inner {
  padding: 0;
  width: 78px;
  height: 32px;
  background: #f8f8f8;
  border: 1px solid #cccccc;
  box-sizing: border-box;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  line-height: 30px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/deep/ .el-checkbox-button {
  margin-bottom: 10px;
  margin-right: 8px;
  width: 78px;
  height: 32px;
}
.choose_city_wrapper {
  display: flex;
  align-items: center;
  height: 70px;
  border-bottom: 1px solid #dddddd;
}
.choose_city_wrapper .lside-title {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
}
.choose_city_wrapper .choose_city_item {
  margin-left: 18px;
  width: 80px;
  height: 32px;
  background: rgba(7, 140, 169, 0.1);
  border: 1px solid #078ca9;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #078ca9;
  line-height: 32px;
  text-align: center;
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.city_btn_wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80px;
}
.city_btn_wrapper .lside_btn {
  width: 80px;
  height: 40px;
  background: #f2f2f2;
  border-radius: 4px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
}
.city_btn_wrapper .rside_btn {
  margin-left: 20px;
  width: 80px;
  height: 40px;
  background: #078ca9;
  border-radius: 4px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
}
</style>
