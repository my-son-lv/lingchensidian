<template>
  <div style="margin-top: 80px">
    <div class="activity_wrapper" v-if="advertImg != ''" @click="jumpDetail">
      <img :src="advertImg" style="width:100%;height:100%;" />
    </div>
    <div class="content_1">
      <div class="content_1_right">
        <div class="frosted-glass">
          <div class="content_1_right_list">
            <div class="content_1_right_cell">
              <img class="content_1_right_img" src="../assets/image/homepage_c1_0.png">
              <div class="t10 mt_20">AI招聘管理系统</div>
              <div class="t11 mt_10">一体化人才管理云平台</div>
            </div>
            <div class="content_1_right_cell">
              <img class="content_1_right_img" src="../assets/image/homepage_c1_1.png">
              <div class="t10 mt_20">寰球直聘</div>
              <div class="t11 mt_10">从源头解决外教供给和质量</div>
            </div>
            <div class="content_1_right_cell">
              <img class="content_1_right_img" src="../assets/image/homepage_c1_2.png">
              <div class="t10 mt_20">寰球学院</div>
              <div class="t11 mt_10">致力于打造英语培训行业的黄埔军校</div>
            </div>
            <div class="content_1_right_cell">
              <img class="content_1_right_img" src="../assets/image/homepage_c1_3.png">
              <div class="t10 mt_20">征信体系</div>
              <div class="t11 mt_10">异步互评，解决企业与外教间信任问题</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content_2">
      <div class="t1 mt_80 ct">寰球AI招聘系统</div>
      <div class="t2 mt_10 ct">在线专属顾问 + 安心线上签约 + 多维度数据可视化</div>
      <div class="content_2_cell">
        <el-row :gutter="100">
          <el-col :span="8" v-for="(item, index) in content_2_list" :key="index" class="ct mt_40">
            <img :src="require('../assets/image/homepage_c2_0' + index + '.png')" class="content_2_img" />
            <div class="t3 mt_10">{{item.title}}</div>
            <div class="t4 mt_20">{{item.sub_title}}</div>
            <el-button plain class="content_2_btn" @click="content_2_click(index)">点击查看</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="content_3">
      <div class="t1 mt_80 ct">产品服务</div>
      <div class="t2 mt_10 ct">线上招聘+签证办理+企业增值服务+外教增值服务</div>
      <div class="content_3_cell">
        <el-row :gutter="20">
          <el-col :span="12" v-for="(item, index) in content_3_list" :key="index">
            <div class="ct content_3_col mt_20">
              <!-- <div class="content_3_img"></div> -->
              <img :src="require('../assets/image/homepage_c3_0' + index + '.png')" class="content_3_img" />
              <div class="content_3_text">
                <div class="t5">{{item.title}}</div>
                <div class="t6 mt_20" v-for="(obj, i) in item.sub_title" :key="i">{{obj}}</div>
                <el-button type="text" class="content_3_btn" @click="content_3_click(index)">查看详情 ></el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="content_4">
      <div class="t7 ct mt_80">核心优势</div>
      <div class="t8 ct mt_20">省时+省力+智能的外教招聘平台</div>
      <div class="w">
        <el-row :gutter="30" class="mt_20">
          <el-col :span="12" v-for="(item, index) in content_4_list" :key="index">
            <div class="content_4_col mt_20">{{item}}</div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="content_5">
      <div class="t1 ct mt_80">外籍人才全球战略合作</div>
      <div class="t2 ct mt_10">深度挖掘高品质外教</div>
      <!-- <div class="t9 ct mt_40">
        国外建立Base，多渠道建立国外高校合作，深入挖掘高质量外教资源，从源头把控外教质量。通过模式创新
        <br />建立国际学校联盟，外国社团机构与中国学校合作
      </div> -->
      <div class="content_5_map"></div>
      <div class="t1 ct mt_80">合作企业</div>
      <div class="t2 ct mt_10">携手全球伙伴，提供优秀方案</div>
      <div class="content_5_img mt_40"></div>
    </div>
    <div class="content_6">
      <div class="t1 ct mt_80">伙伴合作申请</div>
      <div class="t2 ct mt_10">PARTNER APPLICATION</div>
      <div class="content_6_inputs">
        <el-input class="content_6_input mt_20" v-model="message.name" placeholder="请输入企业名称"></el-input>
        <el-input class="content_6_input mt_20" v-model="message.contact_person" placeholder="请输入联系人姓名"></el-input>
        <el-input class="content_6_input mt_20" v-model="message.contact_information" placeholder="请输入联系方式（如:手机号或邮箱）"></el-input>
        <el-button class="submit_btn" @click="submit_click">提交申请</el-button>
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

const content_2_list = [
  {
    title: "职位需求发布",
    sub_title: "岗位招聘需求发布，获取精准化外籍人才推荐",
    image: "",
  },
  {
    title: "简历搜索与查看",
    sub_title: "每天数万外籍教师在线，智能搜索与匹配人才库",
    image: "",
  },
  {
    title: "收藏候选人邀约面试",
    sub_title: "优秀人才添加收藏，24小时可在线发起面试邀约",
    image: "",
  },
  {
    title: "专属顾问平台交流",
    sub_title: "1V1平台定制化指导，随时随地线上交流招聘效果提升",
    image: "",
  },
  {
    title: "线上签约合同管理",
    sub_title: "招聘合同签订与线上管理，智能合约全程留痕，安心有保障",
    image: "",
  },
  {
    title: "签证入职进度实时跟进",
    sub_title: "线上进度实时更新，电脑、手机数据共享同步更新",
    image: "",
  },
];

const content_3_list = [
  {
    title: "寰球直聘服务",
    sub_title: [
      "精准化智能搜索",
      "顾问式贴心服务",
      "安心线上交易",
      "企业外教评价体系",
    ],
    image: "",
  },
  {
    title: "企业增值服务",
    sub_title: ["寰球学院", "合同管理", "岗位培训", "聘任变更"],
    image: "",
  },
  {
    title: "外教增值服务",
    sub_title: ["工作许可", "TESOL证书", "教师备案", "中文培训"],
    image: "",
  },
  {
    title: "签证办理服务",
    sub_title: [
      "材料公证认证",
      "工作许可证",
      "居留许可证",
      "转聘及续签",
    ],
    image: "",
  },
];

const content_4_list = [
  "AI自动化简历筛选",
  "数据驱动智慧招聘",
  "专业的客户成功服务体系",
  "多端协同优化面试流程",
];

export default {
  name: "homePage",
  components: { bottomComponent },
  data() {
    return {
      content_2_list: content_2_list,
      content_3_list: content_3_list,
      content_4_list: content_4_list,
      message: {
        name: "",
        contact_person: "",
        contact_information: "",
      },
      advertList: [],
      advertImg: '',
      jumpDetailUrl: ''
    };
  },
  computed: {},
  watch: {},
  methods: {
    async getActivity() {
      let res = await this.$fetch('../company/advert', {
        type: 3
      });
      if (res.code == 200) {
        this.advertList = res.data;
        console.log(res.data)
        if (this.advertList.length > 0) {
          this.advertImg = res.data[0].img3_path.path;
          if (res.data[0].url3 != null) {
            this.jumpDetailUrl = res.data[0].url3;
          }
        }
      }
    },
    jumpDetail() {
      if (this.jumpDetailUrl != '') {
        window.open(this.jumpDetailUrl);
      }
    },
    content_2_click(index) {
      console.log(index);
      this.$bus.$emit("nav_jump", 2);
      // window.location.href="https://company.apex.link"
      // this.$router.push({
      //   path: '/recruit',
      // });
    },
    content_3_click(index) {
      console.log(index);
      this.$bus.$emit("nav_jump", 1);
    },
    async submit_click() {
      let res = await this.$post("message", this.message);
      console.log(res);
      if (res.code == 200) {
        this.$message.success("提交成功");
        this.message.name = "";
        this.message.contact_person = "";
        this.message.contact_information = "";
      }
    },
  },
  created() { this.getActivity(); },
  mounted() { },
};
</script>

<style scoped>
.content_1 {
  width: 100%;
  height: 696px;
  background: url("../assets/image/homepage_1.jpeg") center center no-repeat;
}
.content_2 {
  width: 100%;
}
.content_3 {
  width: 100%;
  height: 960px;
  background: rgba(7, 140, 169, 0.05);
  overflow: hidden;
}
.content_4 {
  width: 100%;
  height: 530px;
  overflow: hidden;
  background: url("../assets/image/homepage_2.png") center center no-repeat;
}
.content_5 {
  width: 100%;
  height: 1100px;
}
.content_5_img {
  background: url("../assets/image/homepage_5.png") center center no-repeat;
  height: 250px;
}
.content_6 {
  overflow: hidden;
  width: 100%;
  height: 680px;
  background: url("../assets/image/homepage_4.png") center center no-repeat;
}
.content_1_right {
  float: right;
  width: 380px;
  height: 696px;
  overflow: hidden;
}
.frosted-glass {
  width: 380px;
  height: 880px;
  /* background: inherit; */
  /* background: url("../assets/image/homepage_1.jpeg") center right no-repeat; */
  overflow: hidden;
  /* filter: blur(5px);
  -webkit-filter: blur(5px);
  -moz-filter: blur(5px);
  -ms-filter: blur(5px);
  -o-filter: blur(5px); */
}

.content_1_right_list {
  background: rgba(31, 37, 50, 0.8);
  width: 380px;
  height: 696px;
}

.content_1_right_cell {
  padding-left: 40px;
  overflow: hidden;
}

.content_1_right_img {
  height: 40px;
  width: 40px;
  margin-top: 40px;
}

.content_2_cell {
  height: 692px;
  width: 1095px;
  margin: 0 auto 80px auto;
}

.content_2_img {
  height: 140px;
  width: 200px;
}

.content_2_btn {
  margin-top: 20px;
  background: rgba(7, 140, 169, 0);
  border-radius: 2px;
  border: 1px solid rgba(7, 140, 169, 1);
  font-size: 14px;
  font-weight: 400;
  color: rgba(7, 140, 169, 1);
  letter-spacing: 1px;
}

.content_3_cell {
  height: 680px;
  width: 1180px;
  margin: 20px auto 80px auto;
}

.content_3_col {
  padding: 40px;
  background: white;
  height: 250px;
  position: relative;
}

.content_3_img {
  width: 250px;
  height: 250px;
  /* background: rgba(0, 0, 0, 0.05); */
  float: left;
}

.content_3_text {
  float: left;
  margin-left: 40px;
  text-align: left;
}

.content_3_btn {
  font-size: 16px;
  font-weight: 400;
  color: rgba(7, 140, 169, 1);
  letter-spacing: 1px;
  position: absolute;
  bottom: 30px;
}

.content_4_col {
  height: 100px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  font-size: 24px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.8);
  letter-spacing: 1px;
  padding-left: 40px;
  line-height: 100px;
}

.content_5_map {
  width: 1135px;
  height: 507px;
  margin: 32px auto 0 auto;
  background: url("../assets/image/homepage_map.png") center center no-repeat;
}

.content_6_inputs {
  margin: 40px auto 0 auto;
  width: 580px;
}

.content_6_input {
  font-size: 18px;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  letter-spacing: 1px;
}
/deep/ .content_6_input .el-input__inner {
  height: 80px;
  padding-left: 40px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
}
.submit_btn {
  font-size: 18px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  letter-spacing: 1px;
  width: 100%;
  height: 80px;
  background: rgba(7, 140, 169, 1);
  border-radius: 10px;
  margin-top: 40px;
}
.t1 {
  font-size: 34px;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  letter-spacing: 2px;
}
.t2 {
  font-size: 14px;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  letter-spacing: 1px;
}
.t3 {
  font-size: 20px;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  letter-spacing: 1px;
}
.t4 {
  font-size: 16px;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  letter-spacing: 1px;
}
.t5 {
  font-size: 24px;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  letter-spacing: 1px;
}
.t6 {
  font-size: 16px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  letter-spacing: 1px;
}
.t7 {
  font-size: 40px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  letter-spacing: 2px;
}
.t8 {
  font-size: 24px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 1px;
}
.t9 {
  font-size: 14px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  letter-spacing: 1px;
}
.t10 {
  font-size: 20px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  letter-spacing: 1px;
}
.t11 {
  font-size: 16px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.8);
}
.activity_wrapper {
  width: 100%;
  height: 60px;
}
</style>