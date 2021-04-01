<template>
  <div style="margin-top: 80px">
    <div class="content_1"></div>
    <div class="content_2">
      <div class="content_2_nav w ct">
        <div
          class="content_2_btn_l"
          @click="content_2_active = 0"
          :class="[content_2_active == 0 ? 't2' : 't1']"
          :style="{
            borderBottom:
              content_2_active == 0 ? '1px solid rgba(7, 140, 169, 1)' : 'none',
          }"
        >
          招聘服务
        </div>
        <div
          class="content_2_btn_r"
          @click="content_2_active = 1"
          :class="[content_2_active == 1 ? 't2' : 't1']"
          :style="{
            borderBottom:
              content_2_active == 1 ? '1px solid rgba(7, 140, 169, 1)' : 'none',
          }"
        >
          平台服务
        </div>
      </div>
      <div
        class="content_2_main w"
        v-for="(item, index) in content_2_list"
        :key="index"
        v-show="content_2_active"
      >
        <div
          class="content_2_main_text"
          :style="{ float: index % 2 == 0 ? 'left' : 'right' }"
        >
          <div class="t3">{{ item.title }}</div>
          <div class="t4 mt_40">{{ item.sub_title }}</div>
        </div>
        <img
          :src="require('../assets/image/' + item.image + '.png')"
          class="content_2_main_img"
          :style="{ float: index % 2 == 0 ? 'right' : 'left' }"
        />
      </div>
      <div
        style="
          background: rgba(243, 250, 251, 1);
          padding-top: 40px;
          padding-bottom: 80px;
        "
        v-show="!content_2_active"
      >
        <div
          class="content_2_main_0 w mt_40"
          v-for="(item, index) in content_2_list_0"
          :key="index"
        >
          <el-row>
            <el-col :span="8">
              <div class="t5">{{ item.title }}</div>
              <div class="t6 mt_20" style="width: 300px">
                {{ item.sub_title }}
              </div>
              <el-button class="apply_btn" @click="jump_to_company(index)"
                >立即申请</el-button
              >
            </el-col>
            <el-col :span="8">
              <el-row
                v-for="(row_1, i_1) in item.row_1"
                :key="i_1"
                :class="[i_1 == 0 ? '' : 'mt_20']"
              >
                <div class="r1"></div>
                <div class="t6 ct r2">{{ row_1 }}</div>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row
                v-for="(row_2, i_2) in item.row_2"
                :key="i_2"
                :class="[i_2 == 0 ? '' : 'mt_20']"
              >
                <div class="r1"></div>
                <div class="t6 ct r2">{{ row_2 }}</div>
              </el-row>
            </el-col>
          </el-row>
          <div class="line"></div>
        </div>
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
const content_2_list = [
  {
    title: "注册账号，发布职位",
    sub_title:
      "平台注册账号，发布招聘需求，专属顾问一对一服务，通过线上提交招聘需求，学校信息，节省沟通成本，我们将急速响应，按需求匹配职位",
    image: "servicespage_c0",
  },
  {
    title: "人才匹配，定向邀约",
    sub_title:
      "精准化外教在线推荐，外教推荐，预约面试，专属顾问一对一服务，针对需求推送简历，查看教师详情，预约面试时间",
    image: "servicespage_c1",
  },
  {
    title: "推送简历，线上面试",
    sub_title:
      "面试全程线上化，您可以直接通过线上反馈筛选及面试结果，招聘流程精准高效",
    image: "servicespage_c2",
  },
  {
    title: "线上签约，线上支付",
    sub_title:
      "实名认证的异步评价，帮助外教和企业建立互信，并彼此规范和约束，协议在线签订，在线支付费用，便捷安全",
    image: "servicespage_c3",
  },
  {
    title: "签证办理，服务追踪",
    sub_title:
      "绑定手机号及邮箱，可时刻收到签证状态及企业服务状态。顾问全程动态追踪，协助您更高效招聘外教",
    image: "servicespage_c4",
  },
];

const content_2_list_0 = [
  {
    title: "寰球会员",
    sub_title: "面向有外教需求的B端客户，提供月度、季度、年度会员服务。",
    row_1: ["简历智能筛选", "精准人岗匹配", "AI视频面试", "区块链在线签约"],
    row_2: [
      "动态简历库管理预警",
      "平台权益优先体验",
      "助力企业品牌宣传",
      "优先曝光职位需求",
    ],

  },
  {
    title: "寰球优选",
    sub_title:
      "7大母语国家，100+线下优质大学等合作渠道，优选招募高品质外教服务！",
    row_1: [
      "7×24专属客服",
      "10000+优质海外母语简历库",
      "雇主品牌海外推广",
      "企业定制化服务",
    ],
    row_2: [
      "候选人在华生活指南",
      "候选人心里沟通、心情疏导",
      "候选人居住证协助办理",
      "候选人中文培训指导",
    ],
  },
  {
    title: "寰球猎头",
    sub_title: "制定行业标准，赋能优质第三方猎头，整合全行业效率升级。",
    row_1: [
      "1000＋企业资源库共享海量外教需求",
      "AI智能运营系统助力效率提升",
      "专业猎聘渠道候选人海外招募",
      "海外团队候选人简历筛选",
      "专业顾问候选人定制推荐",
    ],
    row_2: [
      "TESOL证件考取认证",
      "候选人招聘平台技术支持",
      "雇主企业品牌平台推广",
      "招聘平台使用与指导",
    ],
  },
  {
    title: "增值服务",
    sub_title:
      "TEFL、TESOL、签证等增值服务一站式办理，并提供行业整体解决方案。",
    row_1: [
      "专业签证团队",
      "材料公证认证",
      "工作许可转聘和续签",
      "永久居留权和许可",
    ],
    row_2: [
      "签证材料准备定向服务",
      "TEFL相关课程",
      "境外来华工作签证协助办理",
      "顾问全程实时跟进签证动态",
    ],
  },
];

export default {
  name: "servicesPage",
  components: { bottomComponent },
  data() {
    return {
      content_2_active: 0,
      content_2_list: content_2_list,
      content_2_list_0: content_2_list_0,
    };
  },
  computed: {},
  watch: {},
  methods: {
    jump_to_company(index) {
      console.log(index)
      if (index==0) {
         window.location.href = "https://apex.link/vip";
      } else {
         window.location.href = "https://company.apex.link";
      }
    },
  },
  created() {},
  mounted() {},
};
</script>

<style scoped>
.content_1 {
  height: 600px;
  background: rgba(31, 37, 50, 1);
  background: url("../assets/image/servicespage_1.png") center center no-repeat;
}
.content_2 {
  /* height: 720px; */
}
.content_2_nav {
  height: 80px;
  line-height: 80px;
}
.content_2_btn_l {
  width: 50%;
  float: left;
}
.content_2_btn_r {
  width: 50%;
  float: right;
}
.t1 {
  font-size: 16px;
  font-weight: 300;
  color: rgba(51, 51, 51, 1);
  letter-spacing: 1px;
}
.t2 {
  font-size: 16px;
  font-weight: 500;
  color: rgba(7, 140, 169, 1);
  letter-spacing: 1px;
}
.content_2_main {
  height: 640px;
  margin-top: 1px;
  background: white;
}
.content_2_main_text {
  margin-top: 248px;
  float: left;
  width: 580px;
}
.content_2_main_img {
  width: 480px;
  height: 480px;
  /* background: rgba(248, 248, 248, 1); */
  float: right;
  margin-top: 80px;
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
  line-height: 28px;
  letter-spacing: 1px;
}
.content_2_main_0 {
  padding: 40px 80px;
  border-left: 4px solid rgba(7, 140, 169, 1);
  position: relative;
  background: white;
}
.t5 {
  font-size: 24px;
  font-weight: 500;
  color: #333333;
  letter-spacing: 1px;
}
.t6 {
  font-size: 16px;
  font-weight: 400;
  color: #999999;
  line-height: 36px;
}
.apply_btn {
  width: 180px;
  height: 60px;
  background: #ffffff;
  border-radius: 4px;
  border: 1px solid #078ca9;
  font-size: 16px;
  font-weight: 400;
  color: #078ca9;
  margin-top: 20px;
}
.line {
  width: 1px;
  height: 180px;
  background: #eeeeee;
  position: absolute;
  top: 66px;
  left: 480px;
}
.r1 {
  width: 8px;
  height: 8px;
  background: #078ca9;
  float: left;
  border-radius: 8px;
  margin-top: 13px;
  margin-left: 25%;
}
.r2 {
  float: left;
  margin-left: 10px;
}
</style>