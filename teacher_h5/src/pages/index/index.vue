<template>
  <div class="index_wrapper">
    <HomeNav />
    <div class="banner_wrapper">
      <h5 style="font-size: 15px;">AI-powered ESL teacher recruitment platform</h5>
      <div class="content">
        "Find the right job for your career"
      </div>
      <div class="join_btn" @click="handleClickJoin">Join Us</div>
    </div>
    <div class="con_wrapper">
      <h4>How Apex Global can help</h4>
      <div class="con_item">
        <div class="left_img">
          <img src="../../assets/latest.png" alt="">
        </div>
        <div class="rside_con" style="width: 100%;">
          <h5>Find a high-quality position quickly</h5>
          <p>-1000+ teachers placed by Apex Global</p>
          <p>-800+ qualified partner schools</p>
          <p>-50+ cities for placement in China</p>
          <div class="con_btn" @click="handleClickJob">Latest Jobs</div>
        </div>
      </div>
      <div class="con_item">
        <div class="left_img">
          <img src="../../assets/join.png" alt="">
        </div>
        <div class="rside_con" style="width: 100%;">
          <h5>Professional career advice</h5>
          <p>-Advise you on job opportunities in China that are a right fit for you, based on your skills，qualifications, desired salary, and lifestyle interests.</p>
          <div class="con_btn" @click="handleClickJoin">View Now</div>
        </div>
      </div>
      <div class="con_item">
        <div class="left_img">
          <img src="../../assets/details.png" alt="">
        </div>
        <div class="rside_con" style="width: 100%;">
          <h5>Individualized service</h5>
          <p>-TESOL/TEFL certificate training</p>
          <p>-Visa support</p>
          <p>-Ground support</p>
          <div class="con_btn" @click="handleClickJumpService">View Now</div>
        </div>
      </div>
      <div class="van-hairline--bottom line"></div>
      <h4 class="con_h4">Hot Jobs</h4>
      <div class="teacher_item" v-for="(teacher, idx) in jobList" :key="'job' + idx" @click="handleClickJobs(teacher.id)">
        <h5>{{teacher.name}}</h5>
        <p>{{teacher.job_info}}</p>
        <div class="work_year">
          <img src="../../assets/year.png" alt="">
          <span>{{job_year_list[teacher.job_year - 1].value}}</span>
        </div>
        <div class="price">
          <img src="../../assets/monery.png" alt="">
          <span>{{teacher.pay.split(',').join('-')}}K</span>
        </div>
        <div class="adress">
          <img src="../../assets/adress.png" alt="">
          <span>{{teacher.job_city_data.pinyin}}，{{ teacher.job_province_data.pinyin}}，China</span>
        </div>
      </div>
      <div class="more" @click="handleMoreJobs">Register for free ></div>
      <div class="van-hairline--bottom line"></div>
      <h4 class="con_h4">The Latest</h4>
      <div class="news_item" v-for="(news,index) in newsList" :key="index" @click="handleClickJump(index)">
        <img :src="news.thumb_url" class="img" />
        <h6>{{news.title}}</h6>
        <p class="tit">{{news.created_at}}</p>
        <p class="con">{{news.desc}}</p>
      </div>
      <div class="new_more" @click="handleClickMore">Read More Articles ></div>
    </div>
    <Footer />
  </div>
</template>
<script>
import HomeNav from '../../components/homeNav/homeNav'
import Footer from '../../components/footer/footer'
import axios from '../../apis/http'
import { allJobsList } from '../../apis/baseUrls'
export default {
  name: 'index',
  components: { HomeNav, Footer },
  data() {
    return {
      newsList: [],
      jobList: [],
      currentPage: 1,
      pageSize: 5,
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
    }
  },
  created() {
    this.getEnArticleList();
    this.getJob();
  },
  computed: {
  },
  methods: {
    // 获取新闻
    getEnArticleList() {
      axios.get('https://api.apex.link/api/website/getEnArticleList').then(res => {
        if (res.data.code == 200) {
          const result = res.data.data;
          if (result.data != null) {
            this.newsList = result.data.splice(0, 3);
          }
        } else {
          Toast.fail(res.data.msg);
        }
      })
    },
    // 点击新闻more
    handleClickMore() {
      this.$router.push('/blog');
    },
    // 跳转详情
    handleClickJump(index) {
      let jumpUrl = this.newsList[index].url;
      window.location.href = jumpUrl;
    },
    // 点击join us
    handleClickJoin() {
      this.$router.push('/register');
    },
    // 跳转到job
    handleClickJob() {
      this.$router.push('/jobs')
    },
    // 签证
    handleClickJumpService() {
      this.$router.push('/service');
    },
    // 获取工作
    getJob() {
      allJobsList({
        page: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        if (res.data.code == 200) {
          const result = res.data.data;
          if (result.list != null) {
            this.jobList = result.list;
          };
          this.total = result.count;
        } else {
          Toast.fail(res.data.msg);
        }
      })
    },
    // 更多工作
    handleMoreJobs() {
      this.$router.push('/jobs');
    },
    handleClickJobs(id) {
      this.$router.push({
        path: '/jobsDetails',
        query: {
          id: id
        }
      });
    },
  },
  mounted() {
  },
}
</script>
<style scoped>
.banner_wrapper {
  margin-top: 98px;
  padding: 132px 32px 0 32px;
  height: 468px;
  background: url(../../assets/banner.png) no-repeat;
  background-size: cover;
  text-align: center;
}
.banner_wrapper h5 {
  margin-bottom: 20px;
  font-size: 56px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  text-align: center;
}
.banner_wrapper .content {
  font-size: 28px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 40px;
}
.banner_wrapper .join_btn {
  margin: 40px auto;
  width: 240px;
  height: 80px;
  background: #ffffff;
  border-radius: 8px;
  font-size: 32px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #078ca9;
  line-height: 80px;
  text-align: center;
}
.con_wrapper {
  padding-top: 80px;
  width: 100%;
}
.con_wrapper h4 {
  margin: 0 auto 84px auto;
  width: 624px;
  font-size: 36px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  text-align: center;
  line-height: 50px;
}
.con_item {
  display: flex;
  margin-bottom: 80px;
  padding: 0 32px;
}
.con_item .left_img img {
  margin-right: 40px;
  width: 120px;
  height: 120px;
}
.rside_con h5 {
  margin-bottom: 20px;
  font-size: 32px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.rside_con p {
  margin-bottom: 10px;
  font-size: 24px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  line-height: 34px;
  text-align: justify;
}
.con_item .con_btn {
  width: 100%;
  height: 80px;
  background: rgba(7, 140, 169, 0);
  border-radius: 4px;
  border: 1px solid #078ca9;
  font-size: 28px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #078ca9;
  line-height: 80px;
  letter-spacing: 1px;
  text-align: center;
}
.line {
  margin: 0 auto;
  width: 92%;
  height: 1px;
  background: #eeeeee;
}
.con_wrapper .con_h4 {
  margin-top: 78px;
}
.teacher_item {
  margin: 0 auto 20px auto;
  padding: 40px;
  width: 608px;
  background: #f8f8f8;
}
.teacher_item h5 {
  margin-bottom: 20px;
  font-size: 32px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #078ca9;
}
.teacher_item p {
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
.more {
  margin: 40px 0 80px 0;
  font-size: 32px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #078ca9;
  text-align: center;
}
.news_item {
  padding: 0 32px;
}
.news_item .img {
  width: 100%;
  height: 512px;
}
.news_item h6 {
  margin: 40px 0 20px 0;
  font-size: 32px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #078ca9;
  line-height: 44px;
}
.news_item .tit {
  margin-bottom: 40px;
  font-size: 24px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
}
.news_item .con {
  margin-bottom: 80px;
  font-size: 24px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  line-height: 32px;
}
.new_more {
  margin: -40px 0 80px 0;
  font-size: 32px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #078ca9;
  text-align: center;
}
</style>
