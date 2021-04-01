<!--  -->
<template>
  <div>
    <commonNav></commonNav>

    <div class="content">
      <div
        class="mt_120 block_wrapper"
        style="text-align: center"
        v-if="active == 0"
        @finish="finish"
      >
        <van-count-down :time="time">
          <template #default="timeData">
            <span class="block">0{{ timeData.minutes }}</span>
            <span class="colon">:</span>
            <span class="block"
              ><span v-if="timeData.seconds < 10">0</span
              >{{ timeData.seconds }}</span
            >
          </template>
        </van-count-down>
        <div class="t1 text">Waiting for Approval</div>
      </div>
      <div class="mt_120" style="text-align: center" v-if="active == 1">
        <img class="icon" src="../../assets/success.png" />
        <div class="t1 text">Review the results</div>
      </div>
      <div class="mt_120" style="text-align: center" v-if="active == 2">
        <img class="icon" src="../../assets/fail.png" />
        <div class="t1 text">Review the results</div>
      </div>
      <div class="mt_120 detail t2" v-if="active == 0">
        Your application has been submitted successfully, we will proceed your
        application in 10mins, please contact vivian@apex.link if you have any
        concern.
      </div>
      <div class="mt_120 detail t2" v-if="active == 1">
        Application approved. 100% profile completion will improve the chance to
        get discovered by employers!<br />You can browse the latest job
        vacancies and apply.
      </div>
      <!-- 123 -->
      <div class="mt_120 detail t2" v-if="active == 2">
        It is a pity that your application was not approved due to {{ info }}.
        Please revise the information and submit again.
      </div>
      <img
        src="../../assets/share_image.png"
        class="share_image"
        @click="handleClickShare"     
        
      />
      <!-- 阿斯顿发送到发 -->
      <div class="btn_wrapper" v-if="active == 0">
        <div class="lside_btn" @click="handleClickLook">Preview</div>
        <div class="rside_btn" style="margin-right: 0" @click="jumpIndex">
          Home page
        </div>
      </div>
      <div class="modily_btn" v-if="active == 1" @click="jumpIndex">
        Home page
      </div>
      <div class="modily_btn" @click="handleClickModify" v-if="active == 2">
        Modify the data
      </div>
    </div>
  </div>
</template>

<script>
import commonNav from "../../components/commonNav/commonNav";
import { getStatusByToken } from "../../apis/baseUrls";
import { CountDown } from "vant";
export default {
  name: "result",
  //import引入的组件需要注入到对象中才能使用
  components: { commonNav },
  data() {
    //这里存放数据
    return {
      active: 0, // 0提交中 1审核通过 2审核驳回
      info: "",
      timer: null,
      time: "",
      submit_time: "",
      lsat_time: "",
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //   查看
    handleClickLook() {
      this.$router.push("/cancelApplication");
    },
    // 重新审核
    handleClickModify() {
      this.$router.push("/basicInformation");
    },
    jumpIndex() {
      this.$router.replace("/index");
    },
    backChange() {
      const that = this;
      that.$router.replace("/index");
    },
    getStatus() {
      getStatusByToken({ token: localStorage.getItem("token") }).then((res) => {
        if (res.data.code == 200) {
          this.info = res.data.data.info;
          this.submit_time = res.data.data.submit_time;
          console.log(this.submit_time);
          this.lsat_time = this.submit_time + 600;
          let nowTime = Math.floor(Date.parse(new Date()) / 1000);
          this.time = (this.lsat_time - nowTime) * 1000;
          // 提交中
          if (res.data.data.status === 1) {
            this.active = 0;
          }
          // 审核通过
          if (res.data.data.status === 2) {
            this.active = 1;
            this.timer = setTimeout(() => {
              this.$router.push("/index");
            }, 10000);
          }

          // 审核驳回
          if (res.data.data.status === 3) {
            this.active = 2;
          }
        } else {
          Toast.fail(res.data.msg);
        }
      });
    },
    handleClickShare() {
      window.location.href = "https://cooperation.apex.link/";
    },
    finish() {
      this.getStatus();
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getStatus();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    if (window.history && window.history.pushState) {
      // 往历史记录里面添加一条新的当前页面的url
      history.pushState(null, null, document.URL);
      // 给 popstate 绑定一个方法 监听页面刷新
      window.addEventListener("popstate", this.backChange, false);
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  destroyed() {
    window.removeEventListener("popstate", this.backChange, false);
  },
};
</script>
<style scoped>
.content {
  padding: 80px 30px;
}
.t1 {
  font-size: 32px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  letter-spacing: 1px;
}
.t2 {
  font-size: 28px;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 46px;
}
.t3 {
  font-size: 24px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
.icon {
  width: 44px;
  height: 44px;
  display: inline-block;
}
.text {
  display: inline-block;
  margin-left: 18px;
  transform: translateY(-30%);
}
.detail {
  margin-top: 60px;
  background: rgba(248, 248, 248, 1);
  border-radius: 10px;
  padding: 30px;
}

.mail {
  font-size: 28px;
  font-weight: 400;
  color: rgba(7, 140, 169, 1);
  line-height: 46px;
  letter-spacing: 1px;
}

.mt_150 {
  margin-top: 30%;
}

.mt_60 {
  margin-top: 18%;
}
.mt_30 {
  margin-top: 30px;
}
.mt_18 {
  margin-top: 3.6%;
}

.btn {
  height: 98px;
  background: rgba(7, 140, 169, 1);
  border-radius: 10px;
  font-size: 36px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  width: 100%;
}

.fr {
  float: right;
}

.card {
  background: rgba(248, 248, 248, 1);
  padding: 60px 30px;
}

.images {
  margin: 120px 60px 60px 60px;
  position: relative;
  height: 120px;
}

.image {
  width: 120px;
  height: 120px;
  position: absolute;
}

.img_r {
  right: 0;
}

.img_c {
  left: 50%;
  transform: translateX(-50%);
}
.btn_wrapper {
  margin-top: 30px;
  width: 100%;
  display: flex;
}
.btn_wrapper div {
  margin-right: 60px;
  flex: 1;
  height: 80px;
  background: rgba(7, 140, 169, 1);
  border-radius: 10px;
  font-size: 36px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  line-height: 68px;
}
.modily_btn {
  margin-top: 60px;
  width: 100%;
  height: 98px;
  background: #078ca9;
  border-radius: 10px;
  font-size: 36px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  line-height: 98px;
  text-align: center;
}
.block {
  display: inline-block;
  width: 91px;
  height: 90px;
  background: #333333;
  border-radius: 16px;
  font-size: 60px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  line-height: 84px;
  letter-spacing: 1px;
  text-align: center;
}
.block_wrapper .text {
  margin: 30px 10px 60px 0;
}
.share_image {
  margin: 60px 0;
  width: 100%;
  height: 800px;
}
.colon {
  color: #333333;
  font-size: 80px;
}
</style>