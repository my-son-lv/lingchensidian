<template>
  <div>
    <HomeNav />
    <div class="content_wrapper">
      <div
        class="teacher_item"
        v-for="(teacher, idx) in jobList"
        :key="idx"
        @click="handleClickJobs(teacher.id, teacher.cid)"
      >
        <div class="item_top">
          <h5>{{ teacher.name }}</h5>
          <div class="right_div">
            <img
              :src="
                teacher.collect_type == 0
                  ? '/static/images/nochoose.png'
                  : '/static/images/choose.png'
              "
              class="choose_img"
              @click.stop="
                handleClickCollection(teacher.id, teacher.collect_type)
              "
            />
            <img
              src="../../assets/apply.png"
              class="apply_img"
              @click.stop="handleClickApply(teacher.id, teacher.cid)"
            />
          </div>
        </div>
        <p class="teacher_con">{{ teacher.job_info }}</p>
        <div class="work_year">
          <img src="../../assets/year.png" alt />
          <span>{{ teacher.work_type == 1 ? 'Full-time，Part-time' : (teacher.work_type == 2 ? 'Full-time' : 'Part-time') }}</span>
        </div>
        <div class="price">
          <img src="../../assets/monery.png" alt />
          <span>￥{{ teacher.pay.split(",").join("-") }}/{{ parseInt(teacher.pay_unit) | filterJobPayUnit}}</span>
        </div>
        <div class="adress">
          <img src="../../assets/adress.png" alt />
          <span>
            {{ teacher.job_city_data.pinyin }}，{{
            teacher.job_province_data.pinyin
            }}，China
          </span>
        </div>
      </div>
      <van-pagination
        v-model="currentPage"
        :page-count="total"
        :show-page-size="5"
        class="current_page"
        @change="handleChangeCurrentPage"
      >
        <template #prev-text>
          <van-icon name="arrow-left" />
        </template>
        <template #next-text>
          <van-icon name="arrow" />
        </template>
      </van-pagination>
      <img src="../../assets/details_img.png" class="details_img" @click="handleClickShare" />
    </div>
    <div class="join_wrapper">
      <h6>Join Us</h6>
      <p>Upload your profile and resume so that more employers can find you</p>
      <div class="join_btn" @click="handleClickJoin">LET’S GO！</div>
    </div>
    <Footer />
  </div>
</template>
<script>
import HomeNav from "../../components/homeNav/homeNav";
import Footer from "../../components/footer/footer";
import { Pagination, Icon } from "vant";
import {
  allJobsList,
  getStatusByToken,
  jobApplication,
  jobCollect,
} from "../../apis/baseUrls";
import { Dialog, Toast, Notify } from "vant";
export default {
  name: "jobs",
  data() {
    return {
      currentPage: 1,
      jobList: [],
      pageSize: 5,
      total: 0,
      job_year_list: [
        {
          value: "Less than 1 year",
          id: 1,
        },
        {
          value: "1-3years",
          id: 2,
        },
        {
          value: "3-5years",
          id: 3,
        },
        {
          value: "5-10years",
          id: 4,
        },
        {
          value: "more than 10 years",
          id: 5,
        },
      ],
      user_info: null,
      type: "",
    };
  },
  filters: {
    // 工作类型
    filterJobWorkType(val) {
      if (val == 1) {
        return "Any";
      } else if (val == 2) {
        return "Full-time";
      } else if (val == 3) {
        return "Part-time";
      }
    },
    filterJobPayUnit(val) {
      if (val) {
        switch (parseInt(val)) {
          case 1:
            return "Per Hour";
            break;
          case 2:
            return "Per Day";
            break;
          case 3:
            return "Per Week";
            break;
          case 4:
            return "Per Month";
            break;
          case 5:
            return "Per Year";
            break;
        }
      } else {
        return "";
      }
    },
  },

  components: { HomeNav, Footer },
  created() {
    this.getJob();
    this.getInfoByToken();
  },
  computed: {},

  methods: {
    getInfoByToken() {
      let token = localStorage.getItem("token");
      if (token) {
        getStatusByToken({ token: token }).then((res) => {
          if (res.data.code == 200) {
            this.user_info = res.data.data;
          } else {
            Toast.fail(res.data.msg);
          }
        });
      }
    },
    // 点击join us
    handleClickJoin() {
      this.$router.push("/register");
    },
    handleClickShare() {
      window.location.href = "https://cooperation.apex.link/";
    },
    // 获取工作
    getJob() {
      let token = localStorage.getItem("token");
      allJobsList({
        token: token,
        page: this.currentPage,
        pageSize: this.pageSize,
      }).then((res) => {
        if (res.data.code == 200) {
          const result = res.data.data;
          if (result.list != null) {
            this.jobList = result.list;
          }
          this.total = result.count;
        } else {
          Toast.fail(res.data.msg);
        }
      });
    },
    // 分页改变
    handleChangeCurrentPage() {
      this.getJob();
    },
    handleClickJobs(id, cid) {
      this.$router.push({
        path: "/jobsDetails",
        query: {
          id: id,
          cid: cid,
        },
      });
    },
    // 收藏
    async handleClickCollection(id, type) {
      let token = localStorage.getItem("token");
      if (type == 0) {
        this.type = 1;
      } else {
        this.type = 2;
      }
      if (token) {
        let res = await jobCollect({
          token: token,
          type: this.type,
          jid: id,
        });
        if (res.data.code == 200) {
          Notify({
            type: "success",
            message: this.type == 1 ? "Saved successfully" : "Unsaved",
          });
          this.getJob();
        } else {
          Notify({ type: "warning", message: res.data.msg });
        }
      } else {
        this.$router.push("/register");
      }
    },
    // 点击apply
    handleClickApply(id, cid) {
      let token = localStorage.getItem("token");
      if (this.user_info == null) {
        this.$router.push("/register");
      } else if (this.user_info.status == 0) {
        this.$router.push("/home");
      } else if (this.user_info.status == 1) {
        Dialog.alert({
          confirmButtonText: "OK",
          message:
            "Your application is awaiting for review, please check your registration status via email and apply the position after approved.",
        }).then(() => {
          // on close
        });
      } else if (this.user_info.status == 2) {
        jobApplication({
          token: token,
          cid: cid,
          jid: id,
        }).then((res) => {
          if (res.data.code == 200) {
            Dialog.alert({
              confirmButtonText: "OK",
              message:
                "You have submitted the job application successfully, the employer will review your application and contact you soon.",
            }).then(() => {
              // on close
            });
          } else {
            Toast(res.data.msg);
          }
        });
      } else if (this.user_info.status == 3) {
        this.$router.push("/result");
      }
    },
  },
};
</script>
<style scoped>
.content_wrapper {
  margin-top: 98px;
  padding: 40px 32px 0 32px;
  background: #f3fafb;
}
.teacher_item {
  padding: 0 40px 40px 40px;
  margin-bottom: 20px;
  background: #ffffff;
}
.item_top {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 124px;
}
.teacher_item .item_top h5 {
  width: 380px;
  font-size: 32px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #078ca9;
  line-height: 32px;
}
.teacher_item .choose_img {
  margin: 0 20px 0 0;
  width: 56px;
  height: 56px;
}
.teacher_item .apply_img {
  width: 112px;
  height: 56px;
}
.teacher_item .teacher_con {
  margin-bottom: 40px;
  font-size: 24px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  line-height: 32px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-align: left;
}
.teacher_item div {
  display: flex;
  font-size: 24px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
}
.teacher_item div span {
  display: block;
  margin-left: 20px;
  line-height: 45px;
}
.teacher_item div img {
  width: 48px;
  height: 48px;
}
.teacher_item .price {
  margin: 20px 0;
}
/deep/ .van-pagination__item {
  margin-right: 14px;
  width: 51px;
  height: 52px;
  color: #666666;
  background: #ffffff;
  border-radius: 12px;
  border: 2px solid #dddddd;
}
/deep/ .van-pagination__item--active {
  background: #078ca9;
  color: #ffffff;
}
/deep/ .van-pagination__item:active {
  color: #666666;
}
.current_page {
  margin: 80px 0;
}
.details_img {
  margin-bottom: 80px;
  width: 100%;
  height: 1008px;
}
.join_wrapper {
  padding-top: 40px;
  width: 100%;
  height: 288px;
  background: url(../../assets/join_us.png) no-repeat;
  background-size: cover;
}
.join_wrapper h6 {
  font-size: 32px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  text-align: center;
}
.join_wrapper p {
  margin: 20px auto 40px auto;
  width: 644px;
  height: 64px;
  font-size: 24px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.8);
  line-height: 32px;
  text-align: center;
}
.join_wrapper .join_btn {
  margin: 0 auto;
  width: 360px;
  height: 80px;
  background: #ffffff;
  border-radius: 4px;
  font-size: 28px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #078ca9;
  line-height: 80px;
  letter-spacing: 1px;
  text-align: center;
}
.right_div {
  position: absolute;
  right: 0;
  top: 30%;
}
</style>
