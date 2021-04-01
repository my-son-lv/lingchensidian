<template>
  <div class="wrapper">
    <div class="news_wrapper clearfix">
      <div class="lside_news_wrapper fl">
        <h3 class="title">Working and living in China</h3>
        <p class="top_con" style="margin-bottom:20px;">
          Welcome to the blogosphere, which is a collection of real stories,
          practical advice, official policy and more about working and living in
          China.
        </p>
        <p class="top_con">
          If you have stories in China that you would like to share, please feel
          free to contribute and contact us Now, time to relax and enjoy the
          wonderful time of reading
        </p>
        <div class="line"></div>
        <div
          class="news_item_wrapper"
          v-for="(news, index) in newsList"
          :key="index"
        >
          <div class="news_item" @click="handleClickNews(news.url)">
            <img :src="news.thumb_url" class="lside_img" />
            <div class="rside_cont">
              <h5 class="item_news_title">{{ news.title }}</h5>
              <p class="item_news_con">{{ news.desc }}</p>
            </div>
          </div>
          <div class="line"></div>
        </div>
        <pagination
          :count="count"
          :currentPage="page"
          v-if="this.count > 0"
          @activePage="receivePage"
        ></pagination>
      </div>
      <img
        src="../../assets/image/ad.png"
        class="right_img fl"
        @click="handleClickShare"
      />
    </div>
    <footerBottom></footerBottom>
  </div>
</template>
<script>
import { getNews } from "../../apis/baseUrls";
import footerBottom from "../../components/footer/footer";
import pagination from "../../components/pagination/pagination";
export default {
  name: "blog",
  components: {
    footerBottom,
    pagination
  },
  data() {
    return {
      newsList: [],
      page: 1,
      pageSize: 5,
      count: 0
    };
  },
  created() {
    this.getNewsList();
    this.$emit("passParent", 2);
    if (this.$route.query.page) {
      this.page = this.$route.query.page;
    }
  },
  computed: {},
  methods: {
    // 获取新闻
    async getNewsList() {
      let res = await getNews(this.page, this.pageSize);
      if (res.data.code == 200) {
        this.newsList = res.data.data.data;
        this.count = res.data.data.total;
      }
    },
    // 点击新闻
    handleClickNews(url) {
      window.location.href = url;
    },
    handleClickShare() {
      window.location.href = "https://cooperation.apex.link";
    },
    // 接收分页
    receivePage(page) {
      this.page = page;
      this.$router.push({
        url: window.location.href,
        query: {
          page: this.page
        }
      });
      this.getNewsList();
    }
  }
};
</script>
<style scoped>
.wrapper {
  margin-top: 80px;
  background: #f3fafb;
}
.news_wrapper {
  margin: 0 auto;
  width: 1210px;
}
.lside_news_wrapper {
  padding-top: 40px;
  width: 880px;
}
.lside_news_wrapper .title {
  margin-bottom: 20px;
  font-size: 40px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.right_img {
  margin-left: 20px;
  margin-top: 20px;
  width: 280px;
  height: 410px;
}
.lside_news_wrapper .top_con {
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  line-height: 22px;
}
.line {
  margin: 40px 0;
  width: 100%;
  height: 1px;
  background: #eeeeee;
}
.news_item {
  display: flex;
  cursor: pointer;
}
.news_item .lside_img {
  margin-right: 20px;
  width: 300px;
  height: 224px;
}
.news_item .item_news_title {
  margin-bottom: 20px;
  width: 458px;
  font-size: 22px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #078ca9;
  line-height: 30px;
}
.news_item .item_news_con {
  width: 516px;
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
