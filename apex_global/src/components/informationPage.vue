<template>
  <div style="margin-top: 80px">
    <div class="content_1"></div>
    <div class="content_2">
      <div class="w">
        <div
          class="content_2_card mt_40"
          v-for="(item, index) in articleList"
          :key="index"
          @click="open_url(item)"
        >
          <!-- <div class="content_2_card_img"></div> -->
          <img :src="item.thumb_url" class="content_2_card_img" />
          <div class="content_2_card_main">
            <div class="t1 mt_80">{{item.title}}</div>
            <div class="t2 mt_20">{{item.desc}}</div>
            <div class="t3 mt_40">{{item.create_time}}</div>
          </div>
        </div>
        <div class="pagination_div">
          <el-pagination
            @current-change="handleCurrentChange"
            class="mt_40 ct"
            background
            layout="prev, pager, next"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>
    <div class="content_3 ct">
      <div class="mt_80 t4">招聘问答</div>
      <div class="mt_40 t5">如果您有外教招聘等相关问题可直接注册账户，我们的顾问人员会与您取得联系</div>
      <el-button class="content_3_btn" @click="jump_to_company">立即注册</el-button>
    </div>
    <bottomComponent></bottomComponent>
  </div>
</template>

<script>
import bottomComponent from "./bottomComponent";
(function(){
    var bp = document.createElement('script');
    var curProtocol = window.location.protocol.split(':')[0];
    if (curProtocol === 'https'){
   bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
  }
  else{
  bp.src = 'http://push.zhanzhang.baidu.com/push.js';
  }
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
})();
export default {
  name: "informationPage",
  components: { bottomComponent },
  data() {
    return {
      page: 1,
      pageSize: 10,
      total: 0,
      articleList: [],
    };
  },
  computed: {},
  watch: {},
  methods: {
    jump_to_company() {
      window.location.href = "https://company.apex.link";
    },
    async handleCurrentChange(val) {
      this.page = val;
      let res = await this.$fetch("getArticleList" + "?page=" + val);
      if (res.code === 200) {
        this.articleList = res.data.data;
        this.page = res.data.page;
        this.pageSize = res.data.pageSize;
        this.total = res.data.total;
      }
    },
    open_url(item) {
      window.location.href = item.url;
    },
  },
  created() {},
  async mounted() {
    let res = await this.$fetch("getArticleList");
    // console.log(JSON.stringify(res));
    if (res.code == 200) {
      this.articleList = res.data.data;
      this.page = res.data.page;
      this.pageSize = res.data.pageSize;
      this.total = res.data.total;
    }
  },
};
</script>

<style scoped>
.content_1 {
  height: 600px;
  background: rgba(31, 37, 50, 1);
  background: url("../assets/image/informationpage_2.png") center center
    no-repeat;
}
.content_2 {
  background: rgba(243, 250, 251, 1);
  overflow: hidden;
  padding-bottom: 40px;
}
.content_2_card {
  height: 336px;
  background: rgba(255, 255, 255, 1);
  overflow: hidden;
  cursor: pointer;
}
.content_2_card_img {
  width: 340px;
  height: 256px;
  background: rgba(238, 238, 238, 1);
  margin-top: 40px;
  margin-left: 40px;
  float: left;
}
.content_2_card_main {
  float: left;
  margin-left: 40px;
  width: 660px;
}
.t1 {
  font-size: 24px;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  letter-spacing: 1px;
}
.t2 {
  font-size: 16px;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  letter-spacing: 1px;
}
.t3 {
  font-size: 14px;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  letter-spacing: 1px;
}
.content_3 {
  background: url("../assets/image/informationpage_1.png") center center
    no-repeat;
  height: 376px;
  overflow: hidden;
}

.t4 {
  font-size: 34px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  letter-spacing: 2px;
}

.t5 {
  font-size: 18px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.8);
  letter-spacing: 1px;
}
.content_3_btn {
  width: 180px;
  height: 60px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  font-size: 16px;
  font-weight: 400;
  color: rgba(7, 140, 169, 1);
  margin-top: 40px;
}

/deep/ .pagination_div .el-pagination .btn-prev {
  background-color: white;
  border-radius: 6px;
  border: 1px solid rgba(221, 221, 221, 1);
}

/deep/ .pagination_div .el-pagination .btn-next {
  background-color: white;
  border-radius: 6px;
  border: 1px solid rgba(221, 221, 221, 1);
}

/deep/ .pagination_div .el-pagination .more {
  background-color: white;
  border-radius: 6px;
  border: 1px solid rgba(221, 221, 221, 1);
}

/deep/ .pagination_div .el-pagination .el-pager .number {
  background-color: white;
  border-radius: 6px;
  border: 1px solid rgba(221, 221, 221, 1);
}
/deep/ .pagination_div .el-pagination .el-pager .number:not(.disabled).active {
  background-color: rgba(7, 140, 169, 1);
}
</style>