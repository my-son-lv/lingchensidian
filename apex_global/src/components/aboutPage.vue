<template>
  <div style="margin-top: 80px">
    <div class="content_1"></div>
    <div class="content_2">
      <div class="w">
        <div class="mt_80 ct t1">公司介绍</div>
        <div class="mt_40 t2">
          寰球阿帕斯是一家AI驱动的智能外教招聘平台，利用AI自主学习与大数据分析，基于人才画像和岗位需求，高效整合全球1000＋精准渠道优质外教资源，同时引入优质第三方猎头入驻，形成“会员平台+自营优选+猎头入驻”的智能平台模式，颠覆传统途径外教稀缺和质量差的行业痛点，我们致力于成为外教招聘行业的资源整合平台和整体解决方案提供商。
          
          <br />
          <br />
          <br />Apex Global is a leading AI-powered foreign teachers recruitment platform with a vision to transform the way companies recruit on a global scale. Based on talent portraits and job requirements, we used AI-driven recommendations and big data analysis to optimize the entire recruitment process. The idea was to efficiently integrate 1000+ accurate foreign teacher resources and attract reliable headhunters that provide solutions to the recruitment world’s difficulties of talent scarcity and quality of the hire. Our module of intelligence recruitment platform is “Membership service+ Premium Service+ Headhunter service” which aims to design a platform as a resource integration portal and a total solution provider with innovative tech implementation.
        </div>
        <div class="mt_40">
          <el-row :gutter="20">
            <el-col :span="12">
              <img
                src="../assets/image/aboutpage_2.png"
                class="content_2_img"
              />
            </el-col>
            <el-col :span="12">
              <img
                src="../assets/image/aboutpage_3.png"
                class="content_2_img"
              />
            </el-col>
          </el-row>
        </div>
        <!-- <div class="mt_80 ct t1">团队介绍</div>
        <div class="mt_40" style="height: 412px">
          <div class="member" style="margin-left: 0"></div>
          <div class="member"></div>
          <div class="member"></div>
          <div class="member"></div>
          <div class="member"></div>
        </div> -->
        <div class="mt_80 ct t1">联系我们</div>
        <div class="mt_40">
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="content_3_img ct">
                <img
                  class="content_3_logo mt_80"
                  src="../assets/image/about_1.png"
                />
                <div class="t3 mt_20">电话</div>
                <div class="t4 mt_20">+86 13512906375</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="content_3_img ct">
                <img
                  class="content_3_logo mt_80"
                  src="../assets/image/about_2.png"
                />
                <div class="t3 mt_20">邮箱</div>
                <div class="t4 mt_20">service@globalapex.cn</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="content_3_img ct">
                <img
                  class="content_3_logo mt_80"
                  src="../assets/image/about_3.png"
                />
                <div class="t3 mt_20">地址</div>
                <div class="t4 mt_20">北京市 朝阳区 悠乐汇</div>
              </div>
            </el-col>
          </el-row>
        </div>

        <img class="map mt_40" src="../assets/image/aboutpage_map.png" />
      </div>
    </div>

    <bottomComponent></bottomComponent>
  </div>
</template>

<script>
import bottomComponent from "./bottomComponent";
(function () {
  var bp = document.createElement("script");
  var curProtocol = window.location.protocol.split(":")[0];
  if (curProtocol === "https") {
    bp.src = "https://zz.bdstatic.com/linksubmit/push.js";
  } else {
    bp.src = "http://push.zhanzhang.baidu.com/push.js";
  }
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(bp, s);
})();
export default {
  name: "aboutPage",
  components: { bottomComponent },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>

<style scoped>
.content_1 {
  height: 600px;
  background: rgba(31, 37, 50, 1);
  background: url("../assets/image/aboutpage_1.png") center center no-repeat;
}
.content_2 {
  background: rgba(243, 250, 251, 1);
  overflow: hidden;
  padding-bottom: 80px;
}
.t1 {
  font-size: 34px;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 48px;
  letter-spacing: 2px;
}
.t2 {
  font-size: 16px;
  font-weight: 300;
  color: rgba(102, 102, 102, 1);
}
.content_2_img {
  height: 300px;
  background: rgba(255, 255, 255, 1);
}
.content_3_img {
  height: 280px;
  background: rgba(255, 255, 255, 1);
}
.content_3_logo {
  width: 44px;
  height: 44px;
}
.t3 {
  font-size: 24px;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  letter-spacing: 1px;
}
.t4 {
  font-size: 18px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  letter-spacing: 1px;
}
.member {
  width: 220px;
  height: 100%;
  background: rgba(255, 255, 255, 1);
  float: left;
  margin-left: 20px;
}
.map {
  width: 1177px;
  height: 400px;
  background: rgba(1, 255, 255, 1);
}
</style>