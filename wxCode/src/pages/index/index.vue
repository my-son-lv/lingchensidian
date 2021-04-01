// 发现外教
<template>
  <div class="indexContatiner">
    <!-- <div class="activity_banner_wrapper" v-if="showbanner">
      <div class="activity_banner" @click="handleClickActivityDetail(bannerUrl)">
        <img :src="bannerImg" class="banner_img" alt="">
      </div>
    </div>-->
    <div class="searchDiv" v-if="searchFlg">
      <div class="searchModel">
        <div class="searchModelTitle">
          <div class="searchClose" @click="closeSearchFrom">
            <img src="../../asset/right_close.png" />
          </div>
          <div class="searchTitle">筛选</div>
        </div>
        <div class="searchModelContent">
          <div class="searachItem">
            <div class="searachItemTitle">国籍</div>
            <div class="searachItemContent">
              <div
                class="searchItemSelectFloat"
                :class="searchFrom.nationality == 0 ? 'searchItemSelectActive' : '' "
                @click="nationalitySearch(0)"
              >Any</div>
              <div
                class="searchItemSelectFloat"
                :class="searchFrom.nationality == 1 ? 'searchItemSelectActive' : '' "
                @click="nationalitySearch(1)"
              >Native Countries</div>
              <div
                class="searchItemSelectFloat"
                :class="searchFrom.nationality == 2 ? 'searchItemSelectActive' : '' "
                @click="nationalitySearch(2)"
              >Non-native Countries</div>
            </div>
          </div>

          <div class="searachItem">
            <div class="searachItemTitle">期望薪资</div>
            <div class="searachItemContentBloack">
              <div
                class="searchItemSelectFloat"
                :class="searchFrom.salary == 0 ? 'searchItemSelectActive' : '' "
                @click="salarySearch(0)"
              >Any</div>
              <div
                class="searchItemSelectFloat"
                :class="searchFrom.salary == 1 ? 'searchItemSelectActive' : '' "
                @click="salarySearch(1)"
              >10K-13K</div>
              <div
                class="searchItemSelectFloat"
                :class="searchFrom.salary == 2 ? 'searchItemSelectActive' : '' "
                @click="salarySearch(2)"
              >13K-16K</div>
              <div
                class="searchItemSelectFloat"
                :class="searchFrom.salary == 3 ? 'searchItemSelectActive' : '' "
                @click="salarySearch(3)"
                style="clear:both;"
              >16K-20K</div>
              <div
                class="searchItemSelectFloat"
                :class="searchFrom.salary == 4 ? 'searchItemSelectActive' : '' "
                @click="salarySearch(4)"
              >20K-25K</div>
              <div
                class="searchItemSelectFloat"
                :class="searchFrom.salary == 5 ? 'searchItemSelectActive' : '' "
                @click="salarySearch(5)"
              >>25K</div>
            </div>
          </div>

          <div class="searachItem">
            <div class="searachItemTitle">学历</div>
            <div class="searachItemContentBloack">
              <div
                class="searchItemSelectFloat"
                :class="searchFrom.degree == 0 ? 'searchItemSelectActive' : '' "
                @click="degreeSearch(0)"
              >Any</div>
              <div
                class="searchItemSelectFloat"
                :class="searchFrom.degree == 1 ? 'searchItemSelectActive' : '' "
                @click="degreeSearch(1)"
              >Bachelor and above</div>
              <div
                class="searchItemSelectFloat"
                :class="searchFrom.degree == 2 ? 'searchItemSelectActive' : '' "
                @click="degreeSearch(2)"
              >Master and above</div>
              <div
                class="searchItemSelectFloat"
                :class="searchFrom.degree == 3 ? 'searchItemSelectActive' : '' "
                @click="degreeSearch(3)"
                style="clear:both;"
              >PHD and above</div>
            </div>
          </div>

          <div class="searachItem">
            <div class="searachItemTitle">经验</div>
            <div class="searachItemContentBloack">
              <div
                class="searchItemSelectFloat"
                :class="searchFrom.seniority == 0 ? 'searchItemSelectActive' : '' "
                @click="senioritySearch(0)"
              >Any</div>
              <div
                class="searchItemSelectFloat"
                :class="searchFrom.seniority == 1 ? 'searchItemSelectActive' : '' "
                @click="senioritySearch(1)"
              >Less than 1 year</div>
              <div
                class="searchItemSelectFloat"
                :class="searchFrom.seniority == 2 ? 'searchItemSelectActive' : '' "
                @click="senioritySearch(2)"
              >1-3years</div>
              <div
                class="searchItemSelectFloat"
                :class="searchFrom.seniority == 3 ? 'searchItemSelectActive' : '' "
                @click="senioritySearch(3)"
                style="clear:both;"
              >3-5years</div>
              <div
                class="searchItemSelectFloat"
                :class="searchFrom.seniority == 4 ? 'searchItemSelectActive' : '' "
                @click="senioritySearch(4)"
              >5-10years</div>
              <div
                class="searchItemSelectFloat"
                :class="searchFrom.seniority == 5 ? 'searchItemSelectActive' : '' "
                @click="senioritySearch(5)"
              >More than 10 years</div>
            </div>
          </div>
        </div>
      </div>
      <div class="searchFromBtnGroup">
        <div class="searchFromBtnClean" @click="searchFromBtnClean">重置</div>
        <div class="searchFromBtnSearch" @click="searchFromBtnSearch">确定</div>
      </div>
    </div>

    <div class="top_wrapper" :class="token == '' ? 'active_top_wrapper' : '' " v-if="!searchFlg">
      <div class="top_title_wrapper">
        <img
          src="https://files.apex.link/apexlink/2021010910025911131421.png"
          class="top_title_img"
        />
        <div class="title_con" :style="{ top: titTop + 'px' }">
          <h3 class="tit">发现外教</h3>
          <div
            class="recruit_wrapper"
            v-if="showStatus == 1 || showStatus == 2 || showStatus == 3 || token != ''"
          >
            <div class="show_defult clearfix" v-if="jobFlag == 0" @click="handleCreatRecruit">
              <p class="lside_con fl">填写招聘需求</p>
              <img src="/static/images/zhaopin_icon.png" class="zhaopin_icon fr" />
            </div>
            <div class="show_defult clearfix" v-else @click="handleClickPosition">
              <p class="lside_con fl">您有{{jobFlag}}条招聘需求，点击查看</p>
              <img src="../../asset/right_icon.png" class="zhaopin_icon fr" />
            </div>
          </div>
          <div class="top_con">
            <div class="left_title clearfix">
              <ul class="fl">
                <li
                  :class="activeClass == index ? 'actived' : ''"
                  class="title_item"
                  v-for="(item, index) in titleList"
                  :key="index"
                  @click="getItem(index, item.id)"
                >{{ item.value }}</li>
              </ul>
              <div class="rside_select fr">
                <div class="price fl" @click="searchModel">
                  <span class="inner_con">搜索</span>
                  <img class="price_icon" src="/static/images/down_first.png" />
                </div>

                <!-- <div class="nationality fl" @click="getNationalityList">
                  <span class="inner_con">
                    {{
                    nationalityValue == "" ? "国籍" : nationalityValue
                    }}
                  </span>
                  <img
                    v-if="nationalityValue == ''"
                    class="nationality_icon"
                    src="/static/images/down_first.png"
                  />
                  <img
                    v-else
                    class="nationality_icon"
                    src="/static/images/close_icon_first.png"
                    @click.stop="hanleClickCloseNationality"
                  />
                </div>
                <div class="price fl" @click="getSalary">
                  <span class="inner_con">
                    {{
                    priceValue == "" ? "薪资" : priceValue
                    }}
                  </span>
                  <img
                    v-if="priceValue == ''"
                    class="price_icon"
                    src="/static/images/down_first.png"
                  />
                  <img
                    v-else
                    class="price_icon"
                    src="/static/images/close_icon_first.png"
                    @click.stop="handleClcikClosePrice"
                  />
                </div>-->
              </div>
            </div>
          </div>
          <div class="activity_banner_wrapper">
            <div class="activity_banner">
              <img
                src="https://files.apex.link/apexlink/2021011717500263007905.jpeg"
                class="banner_img"
                alt
                @click="handleClickVip"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="scroll_text_wrapper" v-show="showScroll" v-if="!searchFlg">
      <div class="scroll_text">
        <div>
          <van-notice-bar
            class="notice-bar"
            speed="30"
            :background="showInterView == true ? '#52A6F61A' : '#FF60101A'"
            :color="showInterView == true ? '#52A6F6' : '#FF6010'"
            :left-icon="showInterView == true ? '/static/images/left_interview.png' : '/static/images/left_icon.png'"
            :text="scrollTopText"
          />
        </div>
        <div class="login_btn" @click="handleClickLogin" v-if="showStatus == 99">
          <div class="btn">去登录</div>
        </div>
        <div class="login_btn" @click="handleClickSettlement" v-if="showStatus == 0">
          <div class="btn">立即入驻</div>
        </div>
        <div class="login_btn" @click="handleClickLook" v-if="showStatus == 3">
          <div class="btn">点击查看</div>
        </div>
        <div
          class="right_close"
          :class="showInterView == true ? 'right_close_interview_img' : ''"
          v-if="showStatus == 1 || showStatus == 2"
          @click="handleClickCloseBar"
        >
          <img src="../../asset/right_close.png" class="right_close_img" alt />
        </div>
      </div>
    </div>
    <scroll-view
      scroll-y="true"
      :style="{ height: scrollHeight + 'px' }"
      @scrolltolower="loadMore"
      v-if="backTeacherList.length > 0 && !searchFlg"
      :scroll-top="scrollTop"
      @scroll="onPageScroll"
    >
      <ul class="teacher_list">
        <li
          class="list_item clearfix"
          v-for="(item, index) in backTeacherList"
          :key="index"
          @click="
            gotTeaccherDetails(item.id, item.mid, item.view_num, item.view_flg)
          "
        >
          <div class="teacher_introduce">
            <div style="display:flex">
              <div class="teacher_name">{{ item.name }}</div>
              <div class="good_wrapper" v-if="item.category == 2">
                <img src="../../asset/youxuan_icon.png" class="good_img" />
              </div>
              <div class="sig_con" v-if="item.sign_flg == 2">已签约</div>
            </div>
            <div class="teacher_country">
              {{ item.nationality_val }} |
              {{ item.university ? degree[item.university - 1].code : '' }}
            </div>
            <div class="working_years clearfix">
              <div
                class="years fl"
              >{{item.working_seniority? workYearList[item.working_seniority - 1].code: workYearList[2].code}}</div>
              <div class="salary fl">{{ item.pay_type ? payList[item.pay_type - 1].code : '' }}</div>
            </div>
            <div class="self_content" v-if="item.desc != null">{{item.desc}}</div>
            <div class="comment_wrapper" v-if="item.comments != null">
              <img src="../../asset/comment_icon.png" class="comment_icon" />
              <span class="comment_con">{{item.comments}}</span>
            </div>
          </div>
          <div class="portrait_wrapper">
            <!-- <img src="../../asset/img_top.png" class="festival_icon" /> -->
            <img
              v-if="item.photos_path != null"
              class="left_portrait"
              :src="item.photos_path[0].path"
            />
            <img
              v-else
              class="left_portrait"
              :src="item.sex == 0 ? '/static/images/man.png' : '/static/images/woman.png'"
            />
          </div>
        </li>
      </ul>
    </scroll-view>
    <div class="empty_img_wrapper" v-else-if="!searchFlg">
      <img class="empty_img" src="../../asset/interview_empty.png" />
      <h6 class="empty_title">空空如也</h6>
      <p class="empty_con">数据加载中，请稍后...</p>
    </div>
    <van-popup :show="showNationalityPicker" overlay position="bottom">
      <van-picker
        :visible-item-count="5"
        title="选择国籍"
        show-toolbar
        :columns="nationalityColumns"
        @confirm="onNationalityConfirm"
        @cancel="hideNationalityPicker"
      />
    </van-popup>
    <van-popup :show="showSalaryPicker" overlay position="bottom">
      <van-picker
        :visible-item-count="5"
        title="选择薪资"
        show-toolbar
        :columns="salaryListColumns"
        @confirm="onSalaryConfirm"
        @cancel="hideSalaryPicker"
      />
    </van-popup>
    <div class="login_mask" v-if="showLoginMask">
      <div class="inner_content">
        <div class="cont_title">
          请登录/注册寰球阿帕斯
          <img
            src="/static/images/close_icon_first.png"
            class="close_img"
            @click="showLoginMask = false"
          />
        </div>
        <div class="con_btn">
          <div class="bottom_btn" @click="handleClickLogin">去登录/注册</div>
        </div>
      </div>
    </div>
    <van-dialog id="van-dialog" />
    <div class="activity_mask" v-if="showActivityImg">
      <div class="activity_mask_content" @click="handleClickActivityDetail(activityUrl)">
        <img :src="activityImg" class="activity_content_img" />
      </div>
      <img
        src="../../asset/activity_close.png"
        class="activity_icon"
        alt
        @click="showActivityImg = false"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Dialog from "@/../static/vant/dialog/dialog";
export default {
  components: {},
  data() {
    return {
      searchFlg: false,
      activityImg: "",
      showActivityImg: false,
      bannerImg: "",
      showbanner: false,
      titleList: [
        { value: "推荐", id: 1 },
        { value: "最新", id: 3 },
      ],
      activeClass: 0,
      showNationalityPicker: false,
      nationalityColumns: ["全部", "母语", "非母语"],
      allCountryList: [
        {
          value: "全部",
          id: 0,
        },
        {
          value: "母语",
          id: 1,
        },
        {
          value: "非母语",
          id: 2,
        },
      ],
      salaryListColumns: ["10k-13k", "13k-16k", "16k-20k", "20k-25k", ">25k"],
      allSalaryList: [
        { id: 1, code: "10k-13k" },
        { id: 2, code: "13k-16k" },
        { id: 3, code: "16k-20k" },
        { id: 4, code: "20k-25k" },
        { id: 5, code: ">25k" },
      ],
      showSalaryPicker: false,
      countryId: "",
      typeId: 1,
      payType: "",
      backTeacherList: [],
      page: 1,
      pageSize: 10,
      degree: [
        { id: 1, code: "High School Diploma" },
        { id: 2, code: "Associate's Degree" },
        { id: 3, code: "Bachelor's Degree" },
        { id: 4, code: "Master's Degree" },
        { id: 5, code: "MBA" },
        { id: 6, code: "PHD" },
      ],
      workYearList: [
        { id: 1, code: "Less than 1 year" },
        { id: 2, code: "1 years experience" },
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
      payList: [
        { id: 1, code: "10k-13k" },
        { id: 2, code: "13k-16k" },
        { id: 3, code: "16k-20k" },
        { id: 4, code: "20k-25k" },
        { id: 5, code: ">25k" },
      ],
      scrollHeight: 0,
      finished: false,
      nationalityValue: "",
      priceValue: "",
      scrollTop: 0,
      activeScrollTop: 0,
      scrollTopText: "",
      showLoginMask: false,
      showStatus: 99,
      jobFlag: "",
      showRecruitFlag: false,
      interviewName: "",
      interviewDateTime: "",
      showScroll: true,
      showInterView: false,
      activityPopList: [],
      activityBannerList: [],
      activityUrl: "",
      bannerUrl: "",
      token: "",
      titTop: 0,
      searchFrom: {
        salary: 0,
        degree: 0,
        seniority: 0,
        nationality: 0,
      },
    };
  },
  computed: {
    ...mapState({
      myInfo: (state) => state.user.myInfo,
    }),
  },

  methods: {
    //搜索
    searchFromBtnSearch() {
      this.page = 1;
      this.backTeacherList = [];
      this.getSearchTeacher();
      this.searchFlg = false;
    },
    //重置
    searchFromBtnClean() {
      this.searchFrom.salary = 0;
      this.searchFrom.degree = 0;
      this.searchFrom.seniority = 0;
      this.searchFrom.nationality = 0;
    },
    nationalitySearch(type) {
      this.searchFrom.nationality = type;
    },
    salarySearch(type) {
      this.searchFrom.salary = type;
    },

    degreeSearch(type) {
      this.searchFrom.degree = type;
    },

    senioritySearch(type) {
      this.searchFrom.seniority = type;
    },
    closeSearchFrom() {
      this.searchFlg = false;
    },
    searchModel() {
      this.searchFlg = true;
    },
    async getInfoByToken() {
      let TOKEN = wx.getStorageSync("token");
      const res = await this.$httpWX.post({
        url: "/api/company/getInfoByToken",
        data: {
          token: TOKEN,
        },
      });
      if (res.code == 200) {
        wx.setStorageSync("imUSerId", res.data.im_user_id);
        wx.setStorageSync("imUSerSig", res.data.im_user_sig);
        if (res.data.interview != null && res.data.interview.status == 1) {
          this.interviewName = res.data.interview.first_name;
          this.interviewDateTime = res.data.interview.inte_time;
        } else if (
          res.data.interview != null &&
          res.data.interview.status == 2
        ) {
          this.interviewName = res.data.interview.first_name;
          this.interviewDateTime = res.data.interview.inte_time.slice(10);
        }
        this.handleLogin();
        if (res.data.status == 0) {
          this.scrollTopText =
            "平台送您免费查看3位外教详情福利，入驻可查看更多";
          this.showStatus = 0;
        } else if (res.data.status == 1) {
          this.scrollTopText =
            "您当前享有免费查看10位外教福利，入驻审核成功后可查看全部";
          this.showStatus = 1;
        } else if (res.data.status == 2 && res.data.interview == null) {
          if (res.data.job_flg == 0) {
            this.scrollTopText =
              "恭喜您认证成功，填写招聘需求，让更多外教关注您！";
          } else {
            this.scrollTopText =
              "您享有免费面试外教特权，在消息页可与你的专属顾问沟通哦";
          }
          this.showStatus = 2;
        } else if (res.data.status == 3) {
          this.scrollTopText = "您提交的资料暂未通过，通过后可查看全部外教";
          this.showStatus = 3;
        } else if (
          res.data.status == 2 &&
          res.data.interview != null &&
          res.data.interview.status == 2
        ) {
          this.scrollTopText = `外教${this.interviewName}与您的面试${this.interviewDateTime}开始，请做好准备呦`;
          this.showStatus = 2;
          this.showInterView = true;
        } else if (
          res.data.status == 2 &&
          res.data.interview != null &&
          res.data.interview.status == 1
        ) {
          this.scrollTopText = `外教${this.interviewName}与您的面试${this.interviewDateTime}开始，请做好准备呦`;
          this.showStatus = 2;
          this.showInterView = true;
        }
        this.jobFlag = res.data.job_flg;
      }
    },
    // 登录进行初始化
    handleLogin() {
      const userID = wx.getStorageSync("imUSerId");
      if (this.myInfo.userID && userID === this.myInfo.userID) {
        return;
      }
      // case2: 当前已经登录了用户，但是和即将登录的用户不一致，则先登出当前登录的用户，再登录
      if (this.myInfo.userID) {
        this.$store.dispatch("resetStore");
        wx.$app.logout().then(() => {
          this.login(userID);
        });
        return;
      }
      // case3: 正常登录流程
      this.login(userID);
    },
    login(userID) {
      wx.$app
        .login({
          userID,
          userSig: wx.getStorageSync("imUSerSig"),
        })
        .then(() => {})
        .catch(() => {});
    },
    // 点击国籍
    getNationalityList() {
      this.page = 1;
      this.finished = false;
      this.showNationalityPicker = true;
    },
    // 国籍确认按钮
    onNationalityConfirm(event) {
      this.backTeacherList = [];
      let idx = event.mp.detail.index;
      this.countryId = this.allCountryList[idx].id;
      this.nationalityValue = event.mp.detail.value;
      this.getSearchTeacher();
      this.showNationalityPicker = false;
    },
    // 国籍取消按钮
    hideNationalityPicker() {
      this.showNationalityPicker = false;
    },
    getItem(index, id) {
      this.countryId = "";
      this.payType = "";
      this.activeClass = index;
      this.typeId = id;
      this.page = 1;
      this.finished = false;
      this.backTeacherList = [];
      this.getSearchTeacher();
    },
    // 点击薪资
    getSalary() {
      this.page = 1;
      this.finished = false;
      this.showSalaryPicker = true;
    },
    // 薪资确认按钮
    onSalaryConfirm(event) {
      this.backTeacherList = [];
      let idx = event.mp.detail.index;
      this.priceValue = event.mp.detail.value;
      this.payType = this.allSalaryList[idx].id;
      this.getSearchTeacher();
      this.showSalaryPicker = false;
    },
    // 薪资取消按钮
    hideSalaryPicker() {
      this.showSalaryPicker = false;
    },
    // 搜索外教
    async getSearchTeacher() {
      let TOKEN = wx.getStorageSync("token");
      const res = await this.$httpWX.post({
        url: "/api/company/searchTeach",
        data: {
          //     this.searchFrom.salary = 0;
          // this.searchFrom.degree = 0;
          // this.searchFrom.seniority = 0;
          // this.searchFrom.nationality = 0;
          token: TOKEN,
          type: this.typeId,
          page: this.page,
          pageSize: this.pageSize,
          language_flg: this.searchFrom.nationality, //国籍
          pay_type: this.searchFrom.salary, //薪资
          degree: this.searchFrom.degree, //学历
          seniority: this.searchFrom.seniority, //工作年限
        },
      });
      if (res.code == 200) {
        if (res.data.list.length == 0) {
          this.finished = true;
        } else {
          this.backTeacherList.push(...res.data.list);
          if (res.data.count == this.page) {
            this.finished = true;
          }
        }
      }
    },
    // 跳转详情
    gotTeaccherDetails(id, mid, viewNum, viewFlag) {
      let TOKEN = wx.getStorageSync("token");
      if (TOKEN != "" && TOKEN != null) {
        if (viewNum == 3 && this.showStatus == 0 && viewFlag == 0) {
          Dialog.confirm({
            confirmButtonText: "立即入驻",
            message: "您已查看3位外教，免费查看更多请入驻平台",
          })
            .then(() => {
              wx.navigateTo({
                url: "../../pages/residenceApplication/main",
              });
            })
            .catch(() => {
              // on cancel
            });
        } else if (
          viewNum == 10 &&
          (this.showStatus == 1 || this.showStatus == 3) &&
          viewFlag == 0
        ) {
          if (this.jobFlag == 0) {
            Dialog.confirm({
              message:
                "您已查看10位外教，审核成功后可免费查看全部，添加招聘需求，可加快审核呦",
            })
              .then(() => {})
              .catch(() => {
                // on cancel
              });
          } else {
            Dialog.confirm({
              message: "审核成功后可免费查看全部，请等待审核哦",
            })
              .then(() => {})
              .catch(() => {
                // on cancel
              });
          }
        } else {
          wx.navigateTo({
            url: "../../pages/teachersDetail/main?id=" + id + "&mid=" + mid,
          });
        }
      } else {
        this.showLoginMask = true;
      }
    },
    loadMore() {
      if (this.finished != true) {
        this.page += 1;
        this.getSearchTeacher();
      }
    },
    onPageScroll(event) {
      this.activeScrollTop = event.mp.detail.scrollTop;
    },
    hanleClickCloseNationality() {
      this.nationalityValue = "";
      this.countryId = "";
      this.page = 1;
      this.finished = false;
      this.backTeacherList = [];
      this.getSearchTeacher();
    },
    handleClcikClosePrice() {
      this.priceValue = "";
      this.payType = "";
      this.page = 1;
      this.finished = false;
      this.backTeacherList = [];
      this.getSearchTeacher();
    },
    handleClickLogin() {
      wx.navigateTo({
        url: "../../pages/login/main",
      });
      this.showLoginMask = false;
    },
    handleClickSettlement() {
      wx.navigateTo({
        url: "../../pages/residenceApplication/main",
      });
    },
    handleClickLook() {
      wx.navigateTo({
        url: "../../pages/findingsOfAudit/main",
      });
    },
    handleCreatRecruit() {
      wx.navigateTo({
        url: "../../pages/createPosition/main",
      });
    },
    handleClickPosition() {
      wx.navigateTo({
        url: "../../pages/positionManager/main",
      });
    },
    // 活动弹窗
    async getActivityPop() {
      const res = await this.$httpWX.get({
        url: "/api/company/advert",
        data: {
          type: 1,
        },
      });
      if (res.code == 200) {
        this.activityPopList = res.data;
        if (this.activityPopList.length > 0) {
          this.showActivityImg = true;
          this.activityImg = res.data[0].img1_path.path;
          if (res.data[0].url1 != null) {
            this.activityUrl = res.data[0].url1;
          }
        }
        this.getActivityBanner();
      }
    },
    // 活动banner
    async getActivityBanner() {
      const res = await this.$httpWX.get({
        url: "/api/company/advert",
        data: {
          type: 2,
        },
      });
      if (res.code == 200) {
        this.activityBannerList = res.data;
        if (this.activityBannerList.length > 0) {
          this.bannerImg = res.data[0].img2_path.path;
          this.showbanner = true;
          if (res.data[0].url2 != null) {
            this.bannerUrl = res.data[0].url2;
          }
        }
      }
    },
    // 外链跳转
    handleClickActivityDetail(obj) {
      if (obj != "" || obj != null || obj != undefined) {
        wx.navigateTo({
          url: "../../pages/activityDetail/main?url=" + obj,
        });
      }
    },
    handleClickVip() {
      wx.navigateTo({
        url: "../../pages/vipCenter/main",
      });
    },
    // 关闭消息通知滚动
    handleClickCloseBar() {
      let self = this;
      self.showScroll = false;
      wx.getSystemInfo({
        success: function (res) {
          self.scrollHeight = res.windowHeight - 265;
        },
      });
    },
  },
  onShow() {
    let titleTop = wx.getMenuButtonBoundingClientRect();
    this.titTop = titleTop.top;
    this.token = wx.getStorageSync("token");
    this.getInfoByToken();
    if (this.showStatus == 99 || this.token == "") {
      this.scrollTopText = "登录后可免费查看外教详情信息";
    }
  },
  onShareAppMessage() {},
  onLoad() {
    // /* 版本自动更新代码 */
    const updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate(function (res) {
      console.log(res.hasUpdate); // 请求完新版本信息的回调 true说明有更新
    });
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: "更新检测",
        content: "检测到新版本，是否重启小程序？",
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate();
          } else if (res.cancel) {
            updateManager.applyUpdate();
          }
        },
      });
    });
    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
      wx.showModal({
        title: "更新提示",
        content: "新版本下载失败",
        showCancel: false,
      });
    });
    this.getSearchTeacher();
    this.getActivityPop();
  },
  onReady() {
    let self = this;
    wx.getSystemInfo({
      success: function (res) {
        if (self.token == "") {
          self.scrollHeight = res.windowHeight - 310;
        } else {
          self.scrollHeight = res.windowHeight - 350;
        }
      },
    });
  },
  onHide() {
    this.scrollTop = this.activeScrollTop;
  },
};
</script>
<style>
page {
  position: relative;
  background: #f5f5f5;
}
.van-notice-bar {
  height: 45px !important;
}
.van-cell__left-icon-wrap {
  display: none !important;
}
</style>
<style scoped>
.indexContatiner {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}
.top_con {
  width: 100%;
  height: 48px;
}
.left_title {
  margin: 12px 16px 0 auto;
  width: 93%;
}
.left_title .title_item {
  margin-right: 24px;
  margin-left: 8px;
  float: left;
  height: 24px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.8);
}
.actived {
  font-weight: 700 !important;
  color: #ffffff !important;
  border-bottom: 4px solid #ffffff !important;
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
.rside_select .nationality,
.rside_select .price {
  padding: 4px 0 4px 8px;
  min-width: 48px;
  height: 16px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.8);
}
.rside_select .nationality {
  margin-right: 16px;
}
.nationality .nationality_icon,
.price .price_icon {
  margin: 0 4px;
  padding: 0 2px;
  width: 16px;
  height: 16px;
}
.teacher_list {
  width: 100%;
}
.teacher_list .list_item {
  position: relative;
  padding-top: 16px;
  margin-bottom: 8px;
  min-height: 144px;
  background: #ffffff;
}
.teacher_introduce {
  margin: 0 0 0 16px;
}
.teacher_introduce .teacher_name {
  max-width: 250px;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.teacher_introduce .teacher_country {
  margin: 4px 0 12px 0;
  height: 16px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666;
}
.working_years .years {
  padding: 4px 8px;
  background: rgba(255, 255, 255, 1);
  border-radius: 2px;
  background: #f5f5f5;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666;
  text-align: center;
}
.working_years .salary {
  margin-left: 8px;
  padding: 4px 8px;
  border-radius: 2px;
  background: #f5f5f5;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666;
  text-align: center;
}
.teacher_introduce .teacher_heat {
  position: absolute;
  top: 24px;
  right: 16px;
  width: 64px;
  height: 20px;
  background: rgba(7, 140, 169, 0.1);
  border-radius: 2px;
  font-size: 10px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(7, 140, 169, 1);
  line-height: 20px;
  text-align: center;
}
.empty_img_wrapper {
  margin-top: 30%;
  text-align: center;
}
.empty_img_wrapper .empty_img {
  width: 130px;
  height: 130px;
}
.empty_img_wrapper .empty_con {
  margin: 0 auto;
  width: 169px;
  height: 26px;
  font-size: 9px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  line-height: 13px;
  text-align: center;
}
.inner_con {
  display: inline-block;
  vertical-align: top;
}
.scroll_text_wrapper {
  width: 100%;
  height: 61px;
  background: #ffffff;
}
.scroll_text {
  position: relative;
  margin: 8px auto;
  width: 343px;
  height: 45px;
  border-radius: 4px;
}
.notice-bar {
  width: 100%;
  height: 38px;
}

.login_btn {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 88px;
  height: 45px;
  background: #ffefe7;
  border-radius: 4px;
}
.login_btn .btn {
  width: 78px;
  height: 24px;
  background: #ff6010;
  border-radius: 12px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 24px;
  text-align: center;
}
.login_mask {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
}
.inner_content {
  width: 280px;
  height: 150px;
  background: #ffffff;
  border-radius: 4px;
}
.cont_title {
  position: relative;
  width: 100%;
  height: 54px;
  line-height: 54px;
  background: #ffffff;
  border-bottom: 1px solid #dddddd;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  text-align: center;
}
.bottom_btn {
  margin: 16px auto;
  width: 90%;
  height: 49px;
  background: #078ca9;
  border-radius: 4px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 49px;
  text-align: center;
}
.close_img {
  position: absolute;
  top: 50%;
  right: 16px;
  margin-top: -8px;
  width: 16px;
  height: 16px;
}
.recruit_wrapper {
  width: 100%;
  height: 44px;
  line-height: 44px;
}
.recruit_wrapper .lside_con {
  margin-left: 16px;
  font-size: 18px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #ffffff;
}
.recruit_wrapper .zhaopin_icon {
  margin-top: 10px;
  margin-right: 16px;
  width: 24px;
  height: 24px;
}
.portrait_wrapper {
  position: absolute;
  top: 15px;
  right: 16px;
}
.left_portrait {
  width: 48px;
  height: 48px;
  border-radius: 30px;
}
.festival_icon {
  position: absolute;
  top: -11px;
  left: 13px;
  width: 24px;
  height: 24px;
}
.right_close {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  background: #ffefe7;
  z-index: 999;
}
.right_close_img {
  width: 12px;
  height: 12px;
}
.right_close_interview_img {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  background: #eef6fe;
  z-index: 999;
}
.self_content {
  margin-top: 12px;
  width: 343px;
  height: 36px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  line-height: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.sig_con {
  display: inline-block;
  margin-left: 12px;
  margin-top: 3px;
  width: 38px;
  height: 18px;
  background: #c4df16;
  border-radius: 2px;
  font-size: 10px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 18px;
  text-align: center;
}
.activity_mask {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 9999;
}
.activity_mask_content {
  width: 249px;
  height: 350px;
  background: rgb(255, 255, 255);
  border-radius: 20px;
}
.activity_content_img {
  width: 100%;
  height: 100%;
}
.activity_icon {
  position: absolute;
  bottom: 10%;
  left: 49%;
  width: 32px;
  height: 32px;
}
.activity_banner_wrapper {
  width: 100%;
  height: 128px;
}
.activity_banner {
  margin: 0 auto;
  width: 343px;
  height: 128px;
}
.banner_img {
  margin-top: -10px;
  width: 100%;
  height: 112px;
  border-radius: 8px;
}
.good_wrapper {
  margin: 3px 0 0 8px;
}
.good_img {
  width: 28px;
  height: 18px;
}
.top_wrapper {
  position: relative;
  width: 100%;
  height: 303px;
  background: #fff;
}
.active_top_wrapper {
  position: relative !important;
  width: 100% !important;
  height: 265px !important;
  background: #fff !important;
}
.top_title_wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 265px;
}
.top_title_wrapper .top_title_img {
  width: 100%;
  height: 100%;
}
.top_title_wrapper .title_con {
  position: absolute;
  left: 0;
  width: 100%;
}
.title_con .tit {
  width: 100%;
  height: 40px;
  line-height: 36px;
  text-align: center;
  font-size: 18px; /* no */
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
}
.comment_wrapper {
  margin-top: 16px;
  display: flex;
  align-items: center;
  width: 343px;
  height: 48px;
  border-top: 0.5px solid #eeeeee;
  box-sizing: border-box;
}
.comment_icon {
  margin-right: 4px;
  width: 16px;
  height: 16px;
}
.comment_con {
  font-size: 12px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.searchModel {
  background: white;
  height: 100vh;
}
.searchDiv {
  width: 100%;
  height: 100vh;
  z-index: 9999;
  background: white;
  position: relative;
}
.searchModel {
  width: 100%;
  width: 90%;
  margin: 0 auto;
  margin-top: 50px;
  color: #333333;
  font-family: PingFangSC-Medium, PingFang SC;
}
.searchModelTitle {
  position: relative;
  width: 100%;
}
.searchClose {
  position: absolute;
  font-size: 18px;
}
.searchTitle {
  text-align: center;
  font-size: 18px;
  font-weight: 500;
}
.searchClose image {
  width: 24px;
  height: 24px;
}
.searachItemTitle {
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  line-height: 30px;
  padding: 0 8px;
}
.searachItemContent {
  display: flex;
}
.searchItemSelect {
  flex: 1;
  background: #f5f5f5;
  border-radius: 8rpx;
  border: none;
  text-align: center;
  line-height: 35px;
  margin: 5px 4px;
  color: #666666;
  font-size: 20rpx;
}
.searachItemContentBloack {
  display: block;
  overflow: hidden;
}
.searchItemSelectFloat {
  background: #f5f5f5;
  border-radius: 8rpx;
  border: none;
  text-align: center;
  line-height: 35px;
  margin: 5px 0.6%;
  color: #666666;
  float: left;
  width: 31%;
  font-size: 20rpx;
}

.searchItemSelectActive {
  color: #078ca9;
  border: 1rpx solid #078ca9;
}
.searchFromBtnGroup {
  width: 100%;
  height: 106rpx;
  position: absolute;
  width: 100%;
  bottom: 0;
  border-top: 2rpx solid #eee;
  background: white;
}
.searchFromBtnClean {
  width: 30%;
  float: left;
  margin-left: 5%;
  line-height: 70rpx;
  border: 1rpx solid #dddddd;
  background: #f5f5f5;
  border-radius: 8rpx;
  text-align: center;
  margin-top: 12rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  font-size: 30rpx;
  letter-spacing: 2rpx;
}
.searchFromBtnSearch {
  width: 56%;
  float: right;
  margin-right: 5%;
  line-height: 70rpx;
  border: 1rpx solid #078ca9;
  background: #078ca9;
  border-radius: 8rpx;
  text-align: center;
  margin-top: 12rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  font-size: 30rpx;
  letter-spacing: 2rpx;
}
</style>
