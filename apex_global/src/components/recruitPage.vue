<template>
  <div style="margin-top: 80px">
    <div class="content_1 ct">
      <div class="t1">寰球阿帕斯—专注于英语培训行业，让AI助力精准招聘</div>
      <div
        class="t2"
      >寰球阿帕斯是技术驱动的品质外教服务平台，我们通过在英语母语国家建立基地的方式，从源头解决外教供给和外教质量的问题，作为首家将AI技术应用于外教招聘行业的互联网科技平台，寰球阿帕斯——我们只招优秀合格的外教</div>
      <el-button class="recruit_btn" @click="jump_to_company">我要招聘</el-button>
    </div>
    <div class="content_2">
      <div class="w">
        <div class="content_2_img_text">
          <div class="t3 mt_80">海外直聘</div>
          <div class="t4 mt_40">
            专业猎聘渠道候选人海外招募，海外团队候选人简历筛选、推荐，面试签约录用，AI智能搜索，1V1贴心服务，为企业一站式解决问题，安心线上面试
            智能合约，线上合同管理，入职进度实时更新。
          </div>
          <el-button class="ask_btn" @click="jump_to_company">立即咨询</el-button>
        </div>
        <img src="../assets/image/recruitpage_2.png" class="content_2_img" />
      </div>
    </div>
    <div class="content_3">
      <div class="t5 mt_80 ct">寰球学院</div>
      <div class="w">
        <el-row :gutter="20">
          <el-col :span="6" class="mt_40">
            <div class="content3_cell ct">
              <div class="t6">人才发展</div>
              <div class="t7 mt_20">顶级教育行业人员专业解答外籍聘任人才发展相关问题</div>
            </div>
          </el-col>
          <el-col :span="6" class="mt_40">
            <div class="content3_cell ct">
              <div class="t6">建校管理</div>
              <div class="t7 mt_20">以外籍招聘管理为依托，兼顾企业管理，对建校相关流程进行讲解与指导</div>
            </div>
          </el-col>
          <el-col :span="6" class="mt_40">
            <div class="content3_cell ct">
              <div class="t6">行业论坛</div>
              <div class="t7 mt_20">针对现教育行业相关问题，专业导师参与论坛</div>
            </div>
          </el-col>
          <el-col :span="6" class="mt_40">
            <div class="content3_cell ct">
              <div class="t6">研究报告</div>
              <div class="t7 mt_20">行业资讯与行业数据相关权威市场研究报告</div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="content_4">
      <div>
        <div class="t5 mt_80 ct">外籍人才服务</div>
        <div class="content4_titles">
          <div class="fl">
            <img class="fl" src="../assets/image/check.png" />
            <div class="fl t8">TESOL证书</div>
          </div>
          <div class="fl ml_80">
            <img class="fl" src="../assets/image/check.png" />
            <div class="fl t8">岗前培训</div>
          </div>
          <div class="fl ml_80">
            <img class="fl" src="../assets/image/check.png" />
            <div class="fl t8">聘任变更</div>
          </div>
          <div class="fl ml_80">
            <img class="fl" src="../assets/image/check.png" />
            <div class="fl t8">专业提升培训</div>
          </div>
        </div>
        <el-button class="ask_btn_1" @click="jump_to_company">立即咨询</el-button>
      </div>
    </div>
    <div class="content_5">
      <div class="t5 mt_80 ct">签证服务</div>
      <div class="w">
        <div class="mt_40 content_5_list">
          <div class="t9 mt_40">材料公证认证服务</div>
          <div class="t10 mt_20">为解决企业申请外籍人才工作签证中认证材料的难题，寰球阿帕斯提供外籍人才无犯罪记录证明+学历认证代办服务</div>
          <el-button class="contact_us" @click="jump_nav">联系我们</el-button>
        </div>
        <div class="mt_20 content_5_list">
          <div class="t9 mt_40">永久居留权和居留许可证</div>
          <div class="t10 mt_20">为帮助企业或外籍个人更好的工作及居住。推出居留许可证服务，联系我们了解外国人是否符合要求以及相关服务报价</div>
          <el-button class="contact_us" @click="jump_nav">联系我们</el-button>
        </div>
        <div class="mt_20 content_5_list">
          <div class="t9 mt_40">外国人工作许可转聘和续签</div>
          <div class="t10 mt_20">寰球阿帕斯为企业提供外籍人才定制化“一对一”签证服务，外国人工作区可证新办、转签续签等服务</div>
          <el-button class="contact_us" @click="jump_nav">联系我们</el-button>
        </div>
      </div>
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
  name: "recruitPage",
  components: { bottomComponent },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    jump_to_company() {
      window.location.href = "https://company.apex.link";
    },
    jump_nav() {
      this.$bus.$emit("nav_jump", 4);
    },
  },
  created() {},
  mounted() {},
};
</script>

<style scoped>
.content_1 {
  width: 100%;
  height: 600px;
  background: url("../assets/image/recruitpage_1.png") center center no-repeat;
  overflow: hidden;
}
.t1 {
  font-size: 40px;
  color: rgba(255, 255, 255, 1);
  margin-top: 156px;
}
.t2 {
  width: 956px;
  font-size: 16px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.8);
  margin: 40px auto 0 auto;
}
.recruit_btn {
  width: 180px;
  height: 60px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  font-size: 16px;
  font-weight: 400;
  color: rgba(7, 140, 169, 1);
  margin-top: 80px;
}
.content_2 {
  width: 100%;
  height: 480px;
}
.content_2_img_text {
  float: left;
  width: 680px;
}
.content_2_img {
  float: right;
  width: 480px;
  height: 480px;
}
.t3 {
  font-size: 34px;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  letter-spacing: 2px;
}
.t4 {
  font-size: 18px;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  letter-spacing: 1px;
}
.ask_btn {
  width: 180px;
  height: 60px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  border: 1px solid rgba(7, 140, 169, 1);
  font-size: 16px;
  font-weight: 400;
  color: rgba(7, 140, 169, 1);
  margin-top: 80px;
}
.ask_btn_1 {
  width: 180px;
  height: 60px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  border: 1px solid rgba(7, 140, 169, 1);
  font-size: 16px;
  font-weight: 400;
  color: rgba(7, 140, 169, 1);
  margin-top: 80px;
  margin-left: 50%;
  transform: translateX(-50%);
}
.content_3 {
  width: 100%;
  height: 436px;
  background: rgba(7, 140, 169, 0.05);
  overflow: hidden;
}
.t5 {
  font-size: 34px;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  letter-spacing: 2px;
}
.content3_cell {
  padding: 40px 32px 0 32px;
  background: rgba(255, 255, 255, 1);
  height: 148px;
}
.t6 {
  font-size: 24px;
  font-weight: 500;
  color: rgba(7, 140, 169, 1);
  letter-spacing: 1px;
}
.t7 {
  font-size: 16px;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  letter-spacing: 1px;
}
.content_4 {
  width: 100%;
  height: 416px;
}
.content4_titles {
  height: 28px;
  width: 800px;
  margin: 40px auto 0 auto;
}
.fl {
  float: left;
}

.ml_80 {
  margin-left: 80px;
}

.t8 {
  font-size: 18px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 28px;
  letter-spacing: 1px;
  margin-left: 20px;
}
.content_5 {
  width: 100%;
  height: 816px;
  background: rgba(7, 140, 169, 0.05);
  overflow: hidden;
}
.content_5_list {
  height: 176px;
  background: white;
  border-left: rgba(7, 140, 169, 1) solid 10px;
  overflow: hidden;
  padding-left: 40px;
  position: relative;
}
.t9 {
  font-size: 24px;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  letter-spacing: 1px;
}
.t10 {
  font-size: 16px;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 22px;
  letter-spacing: 1px;
  width: 680px;
}
.contact_us {
  width: 180px;
  height: 60px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  border: 1px solid rgba(7, 140, 169, 1);
  font-size: 16px;
  font-weight: 400;
  color: rgba(7, 140, 169, 1);
  position: absolute;
  right: 40px;
  top: 58px;
}
</style>