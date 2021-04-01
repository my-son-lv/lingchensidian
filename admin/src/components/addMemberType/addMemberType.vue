<template>
  <div>
    <div class="content">
      <div class="content_wrapper">
        <p class="content_name">
          会员名称
          <span class="xing">*</span>
        </p>
        <el-input v-model="memberName" placeholder="请输入" style="width:30%;" maxlength="20"></el-input>
      </div>
      <div class="content_wrapper">
        <p class="content_name">
          金额
          <span class="xing">*</span>
        </p>
        <el-input
          v-model="memberPay"
          placeholder="请输入"
          style="width:30%;"
          onkeyup="this.value=this.value.replace(/\D/g,'')"
        ></el-input>
      </div>
      <div class="content_wrapper">
        <p class="content_name">
          期限
          <span class="xing">*</span>
        </p>
        <el-input
          v-model="memberTerm"
          placeholder="请输入"
          style="width:30%;margin-right:10px;"
          onkeyup="this.value=this.value.replace(/\D/g,'')"
        ></el-input>
        <span>个月</span>
      </div>
      <!-- <div class="content_wrapper">
        <p class="content_name">
          发布职位
          <span class="xing">*</span>
        </p>
        <el-input
          v-model="memberPosition"
          placeholder="请输入"
          style="width:30%;margin-right:10px;"
          onkeyup="this.value=this.value.replace(/\D/g,'')"
        ></el-input>
        <span>个</span>
      </div>-->
      <div class="content_wrapper">
        <p class="content_name">
          置顶职位
          <span class="xing">*</span>
        </p>
        <el-input
          v-model="memberTopping"
          placeholder="请输入"
          style="width:30%;margin-right:10px;"
          onkeyup="this.value=this.value.replace(/\D/g,'')"
        ></el-input>
        <span>次</span>
      </div>
      <div class="content_wrapper">
        <p class="content_name">
          精英简历
          <span class="xing">*</span>
        </p>
        <el-input
          v-model="memberLoad"
          placeholder="请输入"
          style="width:30%;margin-right:10px;"
          onkeyup="this.value=this.value.replace(/\D/g,'')"
        ></el-input>
        <span>份</span>
      </div>
      <!-- <div class="content_wrapper">
        <p class="content_name">
          签约优惠
          <span class="xing">*</span>
        </p>
        <el-input
          v-model="visa_coupon"
          placeholder="请输入"
          style="width:30%;margin-right:10px;"
          onkeyup="this.value=this.value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')"
        ></el-input>
        <span>折</span>
      </div> -->
      <div class="content_wrapper">
        <p class="content_name">
          急聘服务
          <span class="xing">*</span>
        </p>
        <el-input
          v-model="jiping"
          placeholder="请输入"
          style="width:30%;margin-right:10px;"
          onkeyup="this.value=this.value.replace(/\D/g,'')"
        ></el-input>
        <span>次</span>
      </div>
      <div class="content_wrapper">
        <p class="content_name">
          应聘邀请
          <span class="xing">*</span>
        </p>
        <el-input
          v-model="yaoqing"
          placeholder="请输入"
          style="width:30%;margin-right:10px;"
          onkeyup="this.value=this.value.replace(/\D/g,'')"
        ></el-input>
        <span>次</span>
      </div>
      <div class="content_wrapper">
        <p class="content_name">
          精准推送
          <span class="xing">*</span>
        </p>
        <el-input
          v-model="tuisong"
          placeholder="请输入"
          style="width:30%;margin-right:10px;"
          onkeyup="this.value=this.value.replace(/\D/g,'')"
        ></el-input>
        <span>次</span>
      </div>
      <div class="content_wrapper">
        <p class="content_name">
          服务期限
          <span class="xing">*</span>
        </p>
        <el-input v-model="service" placeholder="请输入" style="width:30%;margin-right:10px;"></el-input>
      </div>
      <div class="btn_wrapper">
        <div class="sure_btn" @click="submit">确定</div>
        <div class="cancel_btn" @click="cancel">取消</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "addMemberType",
  data() {
    return {
      memberName: "",
      memberPay: 0,
      memberTerm: "",
      memberPosition: 0,
      memberTopping: "",
      memberLoad: "",
      // visa_coupon: "",
      jiping: "",
      yaoqing: "",
      service: "",
      tuisong: "",
    };
  },
  created() {
    if (this.$route.query.id) {
      this.getMemberEdit();
    }
  },
  computed: {},
  methods: {
    //  获取编辑信息
    async getMemberEdit() {
      let res = await this.$put("/vip/" + this.$route.query.id);
      this.memberName = res.name;
      this.memberPay = res.money;
      this.memberTerm = res.month;
      this.tuisong = res.tuisong;
      // this.memberPosition = res.job_num;
      this.memberTopping = res.top;
      this.memberLoad = res.down;
      // this.visa_coupon = res.visa_coupon;
      this.jiping = res.jiping;
      this.yaoqing = res.yaoqing;
      this.service = res.service;
    },
    async submit() {
      if (this.$route.query.id) {
        if (
          this.memberName != "" &&
          this.memberTerm != "" &&
          // this.memberPosition != "" &&
          this.memberTopping != "" &&
          this.memberLoad != "" &&
          // this.visa_coupon != "" &&
          this.jiping != "" &&
          this.yaoqing != "" &&
          this.service != "" &&
          this.tuisong != ""
          //&& this.visa_coupon != null
        ) {
          let res = await this.$put("/vip/" + this.$route.query.id, {
            name: this.memberName,
            money: this.memberPay,
            month: this.memberTerm,
            // job_num: this.memberPosition,
            top: this.memberTopping,
            down: this.memberLoad,
            // visa_coupon: this.visa_coupon,
            jiping: this.jiping,
            yaoqing: this.yaoqing,
            service: this.service,
            tuisong: this.tuisong
          });
          this.$router.push("/home/memberTypeList");
          this.$message.success("修改成功");
        } else {
          this.$message.error("请填写完整信息");
        }
      } else {
        if (
          this.memberName != "" &&
          this.memberTerm != "" &&
          // this.memberPosition != "" &&
          this.memberTopping != "" &&
          this.memberLoad != "" &&
          this.jiping != "" &&
          this.yaoqing != "" &&
          this.service != "" &&
          this.tuisong != ""
          // && this.visa_coupon != ""
        ) {
          let res = await this.$post("/vip", {
            name: this.memberName,
            money: this.memberPay,
            month: this.memberTerm,
            // job_num: this.memberPosition,
            top: this.memberTopping,
            down: this.memberLoad,
            // visa_coupon: this.visa_coupon,
            jiping: this.jiping,
            yaoqing: this.yaoqing,
            service: this.service,
            tuisong: this.tuisong
          });
          this.$router.push("/home/memberTypeList");
          this.$message.success("添加成功");
        } else {
          this.$message.error("请填写完整信息");
        }
      }
    },
    // 取消
    cancel() {
      this.$router.go(-1);
    },
  },
};
</script>
<style scoped>
.content {
  margin-top: 20px;
  padding: 20px 0 0 20px;
  width: 100%;
  height: 1000px;
  background: #ffffff;
}
.content_wrapper {
  display: flex;
  margin-bottom: 20px;
  line-height: 40px;
}
.content_name {
  margin-right: 10px;
  width: 100px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
}
.content_name .xing {
  margin-left: 5px;
  color: #ff6010;
}
.btn_wrapper {
  margin-top: 50px;
  display: flex;
}
.btn_wrapper .sure_btn {
  width: 88px;
  height: 32px;
  background: #078ca9;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 32px;
  text-align: center;
  cursor: pointer;
  border-radius: 4px;
}
.btn_wrapper .cancel_btn {
  margin-left: 30px;
  width: 88px;
  height: 32px;
  background: #dddddd;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  line-height: 32px;
  text-align: center;
  cursor: pointer;
  border-radius: 4px;
}
</style>
