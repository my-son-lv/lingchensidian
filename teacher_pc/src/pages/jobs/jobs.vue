<template>
  <div class="wrapper">
    <div class="jobs_wrapper clearfix">
      <div class="jobs fl">
        <div
          class="hot_wrapper"
          @mouseenter="showArrowBtn = true"
          @mouseleave="showArrowBtn = false"
          v-if="topJobList.length != 0"
        >
          <div class="hot_title">
            <img src="../../assets/image/hot_icon.png" class="hot_icon" />
            <p class="title_con">Hot Jobs</p>
          </div>
          <div class="hot_all_city_wrapper">
            <div class="lside_arrow" @click.stop="handleClickLeftArrow" v-show="showArrowBtn">
              <img src="../../assets/image/left_swiper_icon.png" class="rside_arrow_icon" />
            </div>
            <div class="rside_arrow" @click.stop="handleClickRightArrow" v-show="showArrowBtn">
              <img src="../../assets/image/right_swiper_icon.png" class="rside_arrow_icon" />
            </div>
            <ul
              class="swiper_wrapper clearfix"
              :style="{
                width: topJobList.length * 260 + 'px',
                'margin-left': topItemIndex * 260 + 'px'
              }"
            >
              <li
                v-for="(item, index) in topJobList"
                :key="index"
                @click="handleClickJobDetails(item.id, item.cid)"
              >
                <h5>{{ item.name }}</h5>
                <p class="year">
                  <span class="lside_icon">
                    <img src="../../assets/image/info_c3_0.png" alt />
                  </span>
                  {{ item.work_type == 1 ? 'Full-time，Part-time' : ( item.work_type == 2 ? 'Full-time' : 'Part-time') }}
                </p>
                <p class="price">
                  <span class="lside_icon">
                    <img src="../../assets/image/info_c3_1.png" alt />
                  </span>
                  {{ item.pay.split(",").join("-") }}/{{ parseInt(item.pay_unit) | filterJobPayUnit}}
                </p>
                <p class="adress" style="margin-bottom:20px;">
                  <span class="lside_icon">
                    <img src="../../assets/image/info_c3_2.png" alt />
                  </span>
                  {{ item.job_city_data.pinyin }}，{{
                  item.job_province_data.pinyin
                  }}，China
                </p>
                <div class="bottom_btn_wrapper">
                  <img
                    :src="
                      item.collect_type == 0
                        ? '/static/images/job_c3_0.png'
                        : '/static/images/job_c3_1.png'
                    "
                    @click.stop="
                      handleClickCollection(item.id, item.collect_type)
                    "
                  />
                  <div class="apply" @click.stop="handleClickApply(item.id, item.cid)">APPLY</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="top_img_wrapper">
          <div class="top_tips_wrapper" v-if="jobList.length > 0">
            <img src="../../assets/image/top_bg.png" class="top_bg" />
            <div class="inner_wrapper" v-if="!token || token == null">
              <p class="no_login_con" style="height:40px;">Create an Account & Upload Resume</p>
              <p
                style="font-size: 15px;color:white;"
              >Create an account to get recommended jobs that matches your resume and apply to multiple jobs in seconds!</p>
              <div style="display:flex; color:white;margin-top:14px;font-size:23px;">
                <div style="line-height: 68px;">Already have an account?</div>
                <div class="sign_in" @click="handleClickLogin">Sign In</div>
              </div>
            </div>
            <div class="inner_wrapper" v-else>
              <p
                class="no_login_con"
              >Find your next job, fast. Search by job title. View salaries. One-click apply.</p>
              <div class="inner_btn_wrapper">
                <div
                  class="login_btn"
                  style="margin-right:20px;"
                  @click="handleClickSort"
                  v-if="jobType == 0"
                >Latest vacancies</div>
                <div
                  v-else
                  class="login_btn"
                  style="margin-right:20px;"
                  @click="handleClickIntelligent"
                >Intelligent recommendation</div>
              </div>
            </div>
          </div>
          <div class="no_message_wrapper" v-else>
            <p class="no_message_tips">
              There is no content for you to search, the system recommends the
              following content for you.
            </p>
            <div class="search_suggestions">
              <p>Search suggestions:</p>
              <p>Try more general keywords</p>
              <p>Check your spelling</p>
              <p>Try browsing:</p>
              <p @click="handleClickReload">All Jobs</p>
            </div>
          </div>
        </div>
        <div
          class="jobs_item"
          v-for="(job, index) in jobList"
          :key="index"
          @click="handleClickJobDetails(job.id, job.cid)"
        >
          <h6 class="job_title">{{ job.name }}</h6>
          <p class="job_con">{{ job.job_info }}</p>
          <p class="year">
            <span class="lside_icon">
              <img src="../../assets/image/info_c3_0.png" alt />
            </span>
            {{job.work_type == 1 ? 'Full-time，Part-time' : ( job.work_type == 2 ? 'Full-time' : 'Part-time')}}
          </p>
          <p class="price">
            <span class="lside_icon">
              <img src="../../assets/image/info_c3_1.png" alt />
            </span>
            {{ job.pay.split(",").join("-") }}/{{ parseInt(job.pay_unit) | filterJobPayUnit}}
          </p>
          <p class="adress" style="margin-bottom:20px;">
            <span class="lside_icon">
              <img src="../../assets/image/info_c3_2.png" alt />
            </span>
            {{ job.job_city_data.pinyin }}，{{
            job.job_province_data.pinyin
            }}，China
          </p>
          <div class="right_btn_wrapper">
            <img
              :src="
                job.collect_type == 0
                  ? '/static/images/job_c3_0.png'
                  : '/static/images/job_c3_1.png'
              "
              @click.stop="handleClickCollection(job.id, job.collect_type)"
            />
            <div class="apply" @click.stop="handleClickApply(job.id, job.cid)">APPLY</div>
          </div>
        </div>
        <pagination
          :count="count"
          :currentPage="page"
          v-if="this.count > 0"
          @activePage="receivePage"
          style="margin-right:20px;"
        ></pagination>
      </div>
      <div class="right_search_wrapper fl">
        <div class="search_wrapper">
          <h5>Job Title</h5>
          <el-input v-model="name" placeholder="Job"></el-input>
          <h5 style="margin-top:20px;">Work City</h5>
          <div class="all_city_wrapper" @click="showCityMask = true">
            <div
              class="city_wrapper"
              :class="chooseCitiesList == 0 ? 'select_cities' : 'active_cities'"
            >
              <span v-if="chooseCityIdList.length == 0">Select Cities (Max.3)</span>
              <span
                v-else
                class="choose_content_wrapper"
                v-for="(item, index) in chooseCityIdList"
                :key="index"
              >{{ item }},</span>
              <img src="../../assets/image/select_down.png" class="right_down_icon" />
              <div class="hot_city_wrapper" v-if="showCityMask">
                <h3 class="city_title">Please select Cities (Max 3)</h3>
                <ul class="city_nav_wrapper clearfix">
                  <li
                    class="city_nav_item"
                    v-for="(nav, index) in cityNavList"
                    :key="index"
                    :class="activeNavClass == index ? 'active_nav' : ''"
                    @click="getCityItem(index)"
                  >{{ nav }}</li>
                </ul>
                <el-checkbox-group
                  v-model="chooseCitiesList"
                  class="city_all_city_wrapper"
                  fill="#078CA91A"
                  text-color="#078CA9"
                  :max="3"
                  @change="cityChange"
                >
                  <el-checkbox-button
                    v-for="(city, index) in cityList"
                    :label="city.id"
                    :key="index"
                  >{{ city.pinyin }}</el-checkbox-button>
                </el-checkbox-group>
                <div class="choose_city_wrapper">
                  <p class="lside-title">Your selection:(max3)</p>
                  <div
                    class="choose_city_item"
                    v-for="(item, index) in chooseCityIdList"
                    :key="index"
                  >{{ item }}</div>
                </div>
                <div class="city_btn_wrapper">
                  <div class="lside_btn" @click.stop="showCityMask = false">Cancel</div>
                  <div class="rside_btn" @click.stop="handleClickCityConfirm">Confirm</div>
                </div>
              </div>
            </div>
          </div>
          <div v-show="showSearchItem">
            <h5 style="margin-top:20px;">Job Type</h5>
            <el-select v-model="cate" placeholder="Please Select" clearable>
              <el-option
                v-for="item in jobWorkTypeList"
                :key="item.id"
                :label="item.value"
                :value="item.id"
              ></el-option>
            </el-select>
            <h5 style="margin-top:20px;">Job Category</h5>
            <el-select v-model="jobSearchType" placeholder="Please Select" clearable>
              <el-option
                v-for="item in jobTypeList"
                :key="item.id"
                :label="item.value"
                :value="item.id"
              ></el-option>
            </el-select>
            <h5 style="margin-top:20px;">Salary</h5>
            <el-select v-model="salary" placeholder="Please Select" clearable>
              <el-option
                v-for="item in payList"
                :key="item.id"
                :label="item.value"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <div class="inner_search_btn" @click="handleClickSearch">Search</div>
          <div class="show_btn" @click="showSearchItem = true">
            Advanced Search
            <img src="../../assets/image/search_dowm.png" class="search_dowm" />
          </div>
        </div>
        <img src="../../assets/image/ad.png" class="right_img" @click="handleClickShare" />
      </div>
    </div>
    <footerBottom></footerBottom>
  </div>
</template>
<script>
import pagination from "../../components/pagination/pagination";
import {
  getJobs,
  getInfoByToken,
  jobCollect,
  topList,
  getCityByLetter,
} from "../../apis/baseUrls";
import footerBottom from "../../components/footer/footer";
import axios from "../../apis/http";
export default {
  name: "jobs",
  inject: ["reload"],
  components: {
    footerBottom,
    pagination,
  },
  data() {
    return {
      jobList: [],
      page: 1,
      pageSize: 5,
      user_info: null,
      count: 0,
      token: "",
      type: "",
      topJobList: [],
      topItemIndex: 0,
      showArrowBtn: false,
      jobType: 0,
      name: "",
      chooseCitiesList: [],
      cityNavList: [
        "Hot Cities",
        "ABCD",
        "EFGH",
        "JKLM",
        "NOPQ",
        "RSTU",
        "WXYZ",
      ],
      activeNavClass: 0,
      cityList: [
        {
          pinyin: "Beijing",
          id: 110100,
        },
        {
          pinyin: "Shanghai",
          id: 310100,
        },
        {
          pinyin: "Chongqing",
          id: 500100,
        },
        {
          pinyin: "Tianjin",
          id: 120100,
        },
        {
          pinyin: "Guangzhou",
          id: 440100,
        },
        {
          pinyin: "Hangzhou",
          id: 330100,
        },
        {
          pinyin: "Chengdu",
          id: 510100,
        },
        {
          pinyin: "Shenzhen",
          id: 440300,
        },
        {
          pinyin: "Suzhou",
          id: 320500,
        },
        {
          pinyin: "Nanjing",
          id: 320100,
        },
        {
          pinyin: "Xian",
          id: 610100,
        },
        {
          pinyin: "Changsha",
          id: 430100,
        },
        {
          pinyin: "Sanya",
          id: 460200,
        },
      ],
      defaultCityList: [
        {
          pinyin: "Beijing",
          id: 110100,
        },
        {
          pinyin: "Shanghai",
          id: 310100,
        },
        {
          pinyin: "Chongqing",
          id: 500100,
        },
        {
          pinyin: "Tianjin",
          id: 120100,
        },
        {
          pinyin: "Guangzhou",
          id: 440100,
        },
        {
          pinyin: "Hangzhou",
          id: 330100,
        },
        {
          pinyin: "Chengdu",
          id: 510100,
        },
        {
          pinyin: "Shenzhen",
          id: 440300,
        },
        {
          pinyin: "Suzhou",
          id: 320500,
        },
        {
          pinyin: "Nanjing",
          id: 320100,
        },
        {
          pinyin: "Xian",
          id: 610100,
        },
        {
          pinyin: "Changsha",
          id: 430100,
        },
        {
          pinyin: "Sanya",
          id: 460200,
        },
      ],
      hotCityId: "",
      chooseCityIdList: [],
      allCitylist: [],
      showCityMask: false,
      showCityError: false,
      showNotIcon: false,
      all_city: "",
      jobWorkTypeList: [
        {
          value: "Any",
          id: 1,
        },
        {
          value: "Full-time",
          id: 2,
        },
        {
          value: "Part-time",
          id: 3,
        },
      ],
      jobTypeList: [
        {
          value: "Any",
          id: 1,
        },
        {
          value: "Offline",
          id: 2,
        },
        {
          value: "Online",
          id: 3,
        },
      ],
      payList: [
        {
          value: "10k-13k",
          id: 1,
        },
        {
          value: "13k-16k",
          id: 2,
        },
        {
          value: "16k-20k",
          id: 3,
        },
        {
          value: "20k-25k",
          id: 4,
        },
        {
          value: ">25k",
          id: 5,
        },
      ],
      jobSearchType: "",
      cate: "",
      salary: "",
      showSearchItem: false,
    };
  },
  created() {
    this.token = localStorage.getItem("token");
    if (this.token) {
      this.getUserInfo();
    }
    this.$emit("passParent", 1);
    this.getTopJobList();
    this.getAllCity();
    if (this.$route.query.page) {
      this.page = this.$route.query.page;
    }
    this.getJobList();
  },
  computed: {},
  methods: {
    // 获取用户信息
    async getUserInfo() {
      let res = await getInfoByToken({
        token: this.token,
      });
      if (res.data.code == 200) {
        this.user_info = res.data.data;
      }
    },
    // 获取工作列表
    async getJobList() {
      let res = await getJobs({
        sort_type: this.jobType,
        token: this.token,
        name: this.name,
        type: this.cate,
        city: this.chooseCitiesList.toString(),
        cate: this.jobSearchType,
        salary: this.salary,
        page: this.page,
        pageSize: this.pageSize,
      });
      if (res.data.code == 200) {
        this.jobList = res.data.data.list;
        this.count = res.data.data.count;
      }
    },
    // 获取置顶列表
    async getTopJobList() {
      let res = await topList({
        token: this.token,
      });
      if (res.data.code == 200) {
        this.topJobList = res.data.data;
      }
    },
    // 跳转详情
    handleClickJobDetails(id, cId) {
      this.$router.push({
        path: "/jobsDetails",
        query: {
          id: id,
          cid: cId,
        },
      });
    },
    handleClickShare() {
      window.location.href = "https://cooperation.apex.link";
    },
    // 点击apply
    handleClickApply(id, cid) {
      let token = localStorage.getItem("token");
      if (this.user_info == null) {
        this.$router.push("/register");
      } else if (this.user_info.status == 0) {
        this.$router.push("/welcome");
      } else if (this.user_info.status == 1) {
        this.$alert(
          "Your application is awaiting for review, please check your registration status via email and apply the position after approved.",
          {
            confirmButtonText: "OK",
          }
        );
      } else if (this.user_info.status == 2) {
        axios
          .post("/api/index/job/jobApplication", {
            token: this.token,
            cid: cid,
            jid: id,
          })
          .then((res) => {
            if (res.data.code == 200) {
              this.$alert(
                "You have submitted the job application successfully, the employer will review your application and contact you soon.",
                {
                  confirmButtonText: "OK",
                }
              );
            } else {
              this.$message.error(res.data.msg);
            }
          });
      } else if (this.user_info.status == 3) {
        this.$router.push("/toExaminePage");
      }
    },
    // 接收分页
    receivePage(page) {
      this.page = page;
      this.$router.push({
        url: window.location.href,
        query: {
          page: this.page,
        },
      });
      this.getJobList();
    },
    // 收藏
    async handleClickCollection(id, type) {
      if (type == 0) {
        this.type = 1;
      } else {
        this.type = 2;
      }
      if (this.token) {
        let res = await jobCollect({
          token: this.token,
          type: this.type,
          jid: id,
        });
        if (res.data.code == 200) {
          this.$message(this.type == 1 ? "Saved successfully" : "Unsaved");
          this.getJobList();
          this.getTopJobList();
        } else {
          this.$message({
            message: res.data.msg,
            type: "warning",
          });
        }
      } else {
        this.$router.push("/register");
      }
    },
    // 右滑动
    handleClickLeftArrow() {
      if (this.topItemIndex < 0) {
        this.topItemIndex++;
      }
    },
    // 左滑动
    handleClickRightArrow() {
      if (this.topItemIndex > -(this.topJobList.length + this.topItemIndex)) {
        this.topItemIndex--;
      }
    },
    // 去登陆
    handleClickLogin() {
      this.$router.push("/register");
    },
    // 最新职位
    handleClickSort() {
      this.jobType = 1;
      this.getJobList();
    },
    handleClickIntelligent() {
      this.jobType = 0;
      this.getJobList();
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
        if (res.data.code == 200) {
          this.cityList = res.data.data;
        }
      }
    },
    // 选择城市发生改变
    cityChange() {
      this.chooseCityIdList = [];
      this.allCitylist.forEach((ele) => {
        let sameId = this.chooseCitiesList.find((item) => item == ele.id);
        if (sameId) {
          return this.chooseCityIdList.push(ele.pinyin);
        }
      });
      this.all_city = 1;
      this.showNotIcon = false;
    },
    // 选择城市确认按钮
    handleClickCityConfirm() {
      this.showCityMask = !this.showCityMask;
    },
    // 点击搜索
    handleClickSearch() {
      this.getJobList();
    },
    // 页面重置
    handleClickReload() {
      this.reload();
    },
  },
};
</script>
<style scoped>
.wrapper {
  margin-top: 80px;
  background: #f3fafb;
}
.jobs_wrapper {
  margin: 0 auto 90px auto;
  padding-top: 20px;
  width: 1210px;
}
.jobs {
  /* padding-top: 40px; */
  width: 880px;
  background: #ffffff;
  border-radius: 10px;
  box-sizing: border-box;
}
.jobs .jobs_item {
  position: relative;
  margin-top: 40px;
  margin-bottom: 20px;
  padding: 0 20px 0 20px;
  background: #ffffff;
  cursor: pointer;
  border-bottom: 1px solid #eeeeee;
  box-sizing: border-box;
}
.right_search_wrapper {
  margin-left: 20px;
  width: 280px;
}
.right_img {
  width: 100%;
  height: 410px;
}
.jobs_item .job_title {
  margin-bottom: 10px;
  height: 25px;
  font-size: 22px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #078ca9;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.jobs_item .job_con {
  margin-bottom: 20px;
  width: 100%;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  line-height: 22px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.jobs_item .year,
.jobs_item .price,
.jobs_item .adress,
.swiper_wrapper .year,
.swiper_wrapper .price,
.swiper_wrapper .adress {
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
}
.jobs_item .price,
.swiper_wrapper .price {
  margin: 10px 0;
}
.jobs_item .lside_icon,
.swiper_wrapper .lside_icon {
  display: inline-block;
  margin-right: 12px;
  vertical-align: middle;
}
.right_btn_wrapper {
  position: absolute;
  top: 0;
  right: 20px;
  display: flex;
}
.bottom_btn_wrapper {
  display: flex;
}
.right_btn_wrapper .apply,
.bottom_btn_wrapper .apply {
  margin-left: 10px;
  width: 66px;
  height: 30px;
  background: rgba(216, 216, 216, 0);
  border-radius: 4px;
  border: 1px solid #333333;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  line-height: 30px;
  text-align: center;
}
.hot_wrapper {
  padding: 0 20px 20px 20px;
  overflow: hidden;
}
.hot_title {
  display: flex;
  margin: 0 0 24px 0;
  padding-top: 40px;
}
.hot_title .hot_icon {
  margin-right: 10px;
  width: 16px;
  height: 16px;
}
.hot_title .title_con {
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}

.hot_all_city_wrapper {
  position: relative;
  height: 214px;
}
.hot_all_city_wrapper .swiper_wrapper {
  position: absolute;
  top: 0;
  left: 0;
  transition: all 0.5s linear;
}
.hot_all_city_wrapper .swiper_wrapper li {
  float: left;
  margin-right: 20px;
  padding: 20px;
  width: 240px;
  height: 214px;
  background: #ffffff;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.06);
  border-radius: 10px;
  box-sizing: border-box;
  cursor: pointer;
}
.hot_all_city_wrapper .rside_arrow,
.hot_all_city_wrapper .lside_arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: -20px;
  top: 0;
  width: 40px;
  height: 214px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 4px;
  z-index: 99;
  cursor: pointer;
}
.hot_all_city_wrapper .lside_arrow {
  position: absolute;
  top: 0;
  left: -20px;
}
.hot_all_city_wrapper .rside_arrow_icon {
  width: 16px;
  height: 16px;
}
.swiper_wrapper h5 {
  margin-bottom: 20px;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 24px;
}
.top_img_wrapper {
  padding: 40px 0;
  width: 100%;
  background: #f3fafb;
  box-sizing: border-box;
}
.top_tips_wrapper {
  position: relative;
  margin: 0 auto;
  width: 840px;
}
.top_tips_wrapper .top_bg {
  width: 100%;
  height: 240px;
}
.top_tips_wrapper .inner_wrapper {
  position: absolute;
  top: 40px;
  left: 20px;
}
.top_tips_wrapper .no_login_con {
  width: 672px;
  height: 60px;
  font-size: 22px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #ffffff;
  line-height: 30px;
}
.top_tips_wrapper .login_btn {
  margin-top: 40px;
  padding: 0 20px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
  box-sizing: border-box;
}
.top_tips_wrapper .inner_btn_wrapper {
  display: flex;
}
.right_search_wrapper .search_wrapper {
  margin-bottom: 20px;
  padding: 20px;
  width: 280px;
  background: #ffffff;
  border-radius: 10px;
  box-sizing: border-box;
}
.search_wrapper h5 {
  margin-bottom: 10px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
}
/deep/ .search_wrapper .el-input__inner:focus {
  border-color: #333;
  outline: 0;
}
/deep/ .search_wrapper .el-input {
  height: 40px;
}
/deep/ .search_wrapper .el-input__inner {
  font-size: 14px;
  font-weight: 500;
  color: #333333;
  border: 1px solid #cccccc;
}
/deep/ .search_wrapper .el-select {
  width: 100%;
}
.all_city_wrapper .city_wrapper {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.all_city_wrapper .city_wrapper.select_cities {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #cccccc;
}
.all_city_wrapper .city_wrapper.active_cities {
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.all_city_wrapper .right_down_icon {
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
  right: 0;
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
.city_all_city_wrapper {
  display: flex;
  align-content: flex-start;
  flex-flow: row wrap;
  width: 100%;
  height: 180px;
  border-bottom: 1px solid #dddddd;
  overflow-y: scroll;
}
/deep/ .city_all_city_wrapper .el-checkbox-button__inner {
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
.all_city_wrapper {
  position: relative;
  padding: 0 15px;
  width: 240px;
  height: 40px;
  background: #ffffff;
  border-radius: 4px;
  border: 1px solid #cccccc;
  line-height: 40px;
  box-sizing: border-box;
}
.search_wrapper .inner_search_btn,
.search_wrapper .show_btn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0 10px 0;
  width: 100%;
  height: 40px;
  background: #078ca9;
  border-radius: 4px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  cursor: pointer;
}
.search_wrapper .show_btn {
  background: #f2f2f2;
  color: #333333;
}
.search_wrapper .search_dowm {
  margin-left: 10px;
  width: 14px;
  height: 14px;
}
.no_message_wrapper {
  width: 100%;
}
.no_message_wrapper .no_message_tips {
  margin-bottom: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  line-height: 20px;
  text-align: center;
}
.search_suggestions {
  display: flex;
  justify-content: center;
}
.search_suggestions p {
  margin-right: 20px;
  height: 24px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333;
}
.search_suggestions p:nth-child(5) {
  color: #078ca9;
  cursor: pointer;
}
.sign_in {
  margin-top: 0px;
  background: #bbb4b44d;
  text-align: center;
  border-radius: 2px;
  padding: 5px 10px;
  margin-left: 10px;
  cursor: pointer;
  width: unset;
  align-self: center;
}
</style>
