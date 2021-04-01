<template>
  <div class="wrapper">
    <div class="banner_wrapper">
      <!-- <h5>Be a teacher in China</h5> -->
      <h5>AI-powered ESL teacher recruitment platform</h5>
      <p class="con">
        “Find the right job for your career.”
      </p>
      <div class="btn" @click="handleClickJoin">Join Us</div>
    </div>
    <h4 class="title">How Apex Global can help</h4>
    <div class="china_con"> 
      <div class="con_item">
        <img src="../../assets/image/info_c2_0.png" alt="" class="item_img" />
        <p class="tit">Find a high-quality position quickly</p>
        <p class="cont" style="height:unset;line-height:22px;">-1000+ teachers placed by Apex Global</p>
        <p class="cont" style="height:unset;line-height:22px;">-800+ qualified partner schools</p>
        <p class="cont" style="height:unset;line-height:22px;">-50+ cities for placement in China</p>
        <el-button plain class="content_btn" @click="handleClickJobs"
          >Latest Jobs</el-button
        >
      </div>
      <div class="con_item">
        <img src="../../assets/image/info_c2_1.png" alt="" class="item_img" />
        <p class="tit">Professional career advice</p>
        <p class="cont" style="height:unset;line-height:22px;">
          -Advise you on job opportunities in China that are a right fit for you, based on your skills，qualifications, desired salary, lifestyle interests.
        </p>
        <el-button plain class="content_btn" @click="handleClickJoin"
          >View Now</el-button
        >
      </div>
      <div class="con_item">
        <img src="../../assets/image/info_c2_2.png" alt="" class="item_img" />
        <p class="tit">Individualized service</p>
        <p class="cont" style="height:unset;line-height:22px;">-TESOL/TEFL certificate training</p>
        <p class="cont" style="height:unset;line-height:22px;">-Visa support</p>
        <p class="cont" style="height:unset;line-height:22px;">-Ground support</p>
        <el-button plain class="content_btn" @click="handleClickService"
          >View Now</el-button
        >
      </div>
    </div>
    <h4 class="title">Hot Jobs</h4>
    <ul class="jobs_wrapper clearfix">
      <li
        class="jobs_item fl"
        v-for="(job, index) in jobList"
        :key="index"
        @click="handleClickJobDetails(job.id, job.cid)"
      >
        <h6 class="job_title">{{ job.name }}</h6>
        <p class="job_con">
          {{ job.job_info }}
        </p>
        <p class="year">
          <span class="lside_icon">
            <img src="../../assets/image/info_c3_0.png" alt="" />
          </span>
          {{ job.job_year | filterJobYear }}
        </p>
        <p class="price">
          <span class="lside_icon">
            <img src="../../assets/image/info_c3_1.png" alt="" />
          </span>
          {{ job.pay.split(",").join("-") }}K
        </p>
        <p class="adress">
          <span class="lside_icon">
            <img src="../../assets/image/info_c3_2.png" alt="" />
          </span>
          {{ job.job_city_data.pinyin }}，{{
            job.job_province_data.pinyin
          }}，China
        </p>
        <img src="../../assets/image/info_c2_4.png" class="right_icon" />
      </li>
    </ul>
    <div class="more_and_more" @click="handleClickJobs">Register for Free ></div>
    <h4 class="title">The Latest</h4>
    <ul class="news_wrapper clearfix">
      <li
        class="news_item fl"
        v-for="(news, index) in newsList"
        :key="index"
        @click="handleClickNews(news.url)"
      >
        <img :src="news.thumb_url" class="news_img" />
        <h5 class="news_title">{{ news.title }}</h5>
        <p class="news_con">{{ news.desc }}</p>
      </li>
    </ul>
    <div
      class="more_and_more"
      style="margin-bottom:90px;"
      @click="handleClickNewsList"
    >
      Read More Articles >
    </div>
    <footerBottom></footerBottom>
  </div>
</template>
<script>
import { getJobs, getNews } from "../../apis/baseUrls";
import footerBottom from "../../components/footer/footer";
export default {
  components: {
    footerBottom
  },
  data() {
    return {
      jobList: [],
      newsList: []
    };
  },
  created() {
    this.$emit("passParent", 0);
    this.getJobList();
    this.getNewsList();
  },
  computed: {},
  methods: {
    // 获取工作列表
    async getJobList() {
      let res = await getJobs({
        page: 1,
        pageSize: 6
      });
      if (res.data.code == 200) {
        this.jobList = res.data.data.list;
      }
    },
    // 获取新闻
    async getNewsList() {
      let res = await getNews(1, 3);
      if (res.data.code == 200) {
        this.newsList = res.data.data.data;
      }
    },
    // 跳转工作列表
    handleClickJobs() {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      this.$router.push("/jobs");
    },
    // 跳转服务
    handleClickService() {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      this.$router.push("/service");
    },
    // 跳转工作详情
    handleClickJobDetails(id, cId) {
      this.$router.push({
        path: "/jobsDetails",
        query: {
          id: id,
          cid: cId
        }
      });
    },
    // 点击新闻
    handleClickNews(url) {
      window.location.href = url;
    },
    // 跳转新闻列表
    handleClickNewsList() {
      this.$router.push("/blog");
    },
    // 点击join us
    handleClickJoin() {
      this.$router.push("/register");
    }
  }
};
</script>
<style scoped>
.wrapper {
  margin-top: 80px;
}
.banner_wrapper {
  padding-top: 295px;
  width: 100%;
  height: 565px;
  background: url("../../assets/image/info_01.png") center center no-repeat;
}
.banner_wrapper h5 {
  font-size: 48px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  text-align: center;
}
.banner_wrapper .con {
  margin: 40px auto;
  width: 980px;
  font-size: 34px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 26px;
  text-align: center;
}
.banner_wrapper .btn {
  margin: 0 auto;
  width: 180px;
  height: 60px;
  background: #ffffff;
  border-radius: 4px;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #078ca9;
  line-height: 60px;
  text-align: center;
  cursor: pointer;
}
.title {
  margin: 90px 0 60px 0;
  width: 100%;
  font-size: 34px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  text-align: center;
}
.china_con {
  display: flex;
  margin: 0 auto;
  width: 1210px;
}
.china_con .con_item {
  flex: 1;
}
.china_con .item_img {
  margin: 0 auto;
}
.china_con .tit {
  margin: 20px auto;
  font-size: 22px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  text-align: center;
}
.china_con .cont {
  margin: 0 auto;
  width: 370px;
  height: 88px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  line-height: 22px;
  text-align: center;
}
.china_con .content_btn {
  display: block;
  margin: 20px auto 0 auto;
  width: 160px;
  height: 40px;
  background: rgba(7, 140, 169, 0);
  border-radius: 2px;
  border: 1px solid #078ca9;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #078ca9;
  letter-spacing: 1px;
  cursor: pointer;
}
.china_con .content_btn:hover {
  background: #078ca9;
  border: 1px solid #078ca9;
  color: #ffffff;
}
.jobs_wrapper,
.news_wrapper {
  margin: 0 auto;
  width: 1210px;
}
.jobs_item {
  margin-bottom: 20px;
  padding: 40px 20px 0 20px;
  width: 340px;
  height: 266px;
  background: #f8f8f8;
}
.jobs_item:nth-child(2),
.jobs_item:nth-child(5) {
  margin: 0 20px;
}
.jobs_item .job_title {
  margin-bottom: 10px;
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
  width: 340px;
  height: 66px;
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
.jobs_item .adress {
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
}
.jobs_item .price {
  margin: 10px 0;
}
.jobs_item .lside_icon {
  display: inline-block;
  margin-right: 12px;
  vertical-align: middle;
}
.jobs_item .right_icon {
  margin-top: 15px;
}
.jobs_item:hover {
  background: #ffffff;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
}
.more_and_more {
  margin-top: 40px;
  font-size: 18px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #078ca9;
  text-align: center;
  cursor: pointer;
}
.news_wrapper .news_item:nth-child(2) {
  margin: 0 20px;
}
.news_wrapper .news_item .news_img {
  margin-bottom: 16px;
  width: 380px;
  height: 284px;
}
.news_item,
.jobs_item {
  cursor: pointer;
}
.news_title {
  margin-bottom: 20px;
  width: 316px;
  height: 60px;
  font-size: 22px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #078ca9;
  line-height: 30px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.news_con {
  width: 360px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  line-height: 24px;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
