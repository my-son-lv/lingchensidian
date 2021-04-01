<template>
  <div class="wrapper">
    <HomeNav />
    <div class="blog_wrapper">
      <div class="top_wrapper">
        <h2>Working and living in China</h2>
        <p>Welcome to the blogosphere, which is a collection of real stories, practical advice, official policy and more about working and living in China.</p>
        <p class="second">If you have stories in China that you would like to share, please feel free to contribute and contact us</p>
        <p>Now, time to relax and enjoy the wonderful time of reading</p>
      </div>
      <div class="line"></div>
      <div class="news_item" v-for="(news,index) in newsList" :key="index" @click="handleClickJump(index)">
        <img :src="news.thumb_url" class="img" />
        <h6>{{news.title}}</h6>
        <p class="tit">{{news.created_at}}</p>
        <p class="con">{{news.desc}}</p>
      </div>
      <van-pagination v-model="currentPage" :total-items="total" :show-page-size="5" class="current_page" :items-per-page="5" @change="handleChangeCurrentPage">
        <template #prev-text>
          <van-icon name="arrow-left" />
        </template>
        <template #next-text>
          <van-icon name="arrow" />
        </template>
      </van-pagination>
      <img src="../../assets/details_img.png" class="details_img" @click="handleClickShare" />
    </div>
    <Footer />
  </div>
</template>
<script>
import HomeNav from '../../components/homeNav/homeNav'
import Footer from '../../components/footer/footer'
import { Pagination, Icon } from 'vant'
import axios from '../../apis/http'
export default {
  name: 'blog',
  components: { HomeNav, Footer },
  data() {
    return {
      currentPage: 1,
      newsList: [],
      total: 0,
      pageSize: 5
    }
  },
  created() {
    this.getEnArticleList();
  },
  computed: {
  },
  methods: {
    // 获取新闻
    getEnArticleList() {
      axios.get('https://api.apex.link/api/website/getEnArticleList', {
        params: {
          page: this.currentPage,
          pageSize: this.pageSize
        }
      }).then(res => {
        if (res.data.code == 200) {
          const result = res.data.data;
          if (result.data != null) {
            this.newsList = result.data;
          };
          this.total = result.total;
        } else {
          Toast.fail(res.data.msg);
        }
      })
    },
    // 分页改变
    handleChangeCurrentPage() {
      this.getEnArticleList();
    },
    // 跳转详情
    handleClickJump(index) {
      let jumpUrl = this.newsList[index].url;
      window.location.href = jumpUrl;
    },
    handleClickShare() {
      window.location.href = 'https://cooperation.apex.link/';
    }
  },
}
</script>
<style scoped>
.blog_wrapper {
  margin-top: 98px;
  padding: 80px 32px 0 32px;
}
.top_wrapper h2 {
  margin-bottom: 40px;
  font-size: 40px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.top_wrapper p {
  font-size: 24px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  line-height: 34px;
  text-align: justify;
}
.top_wrapper .second {
  margin: 40px 0;
}
.line {
  margin-top: 82px;
  width: 100%;
  height: 1px;
  background: #dddddd;
}
.news_item {
  margin-top: 80px;
}
.news_item .img {
  width: 100%;
  height: 512px;
}
.news_item h6 {
  margin: 36px 0 14px 0;
  font-size: 36px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #078ca9;
  line-height: 44px;
}
.news_item .tit {
  margin-bottom: 30px;
  font-size: 24px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
}
.news_item .con {
  margin-bottom: 80px;
  font-size: 28px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  line-height: 32px;
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
</style>
