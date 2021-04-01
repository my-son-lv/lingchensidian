<template>
  <div>
    <div class="content">
      <div class="content_wrapper">
        <p class="content_name">机构名称<span class="xing">*</span></p>
        <el-select v-model="memberName" placeholder="请选择" style="width:30%;" filterable>
          <el-option v-for="item in companyNameOptions" :key="item.id" :label="item.company_name" :value="item.id"></el-option>
        </el-select>
      </div>
      <div class="content_wrapper">
        <p class="content_name">会员类型<span class="xing">*</span></p>
        <el-select v-model="memberType" placeholder="请选择" style="width:30%;" @change="select_change">
          <el-option v-for="item in typeOptions" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="content_wrapper">
        <p class="content_name">应收款项</p>
        <span>{{pay}}</span>
      </div>
      <div class="content_wrapper">
        <p class="content_name">实收款项<span class="xing">*</span></p>
        <el-input v-model="memberIncome" placeholder="请输入" style="width:30%;margin-right:10px;" maxlength="20"></el-input>
        <span>元</span>
      </div>
      <div class="content_wrapper">
        <p class="content_name">对方经办人<span class="xing">*</span></p>
        <el-input v-model="otherParty" placeholder="请输入" style="width:30%;margin-right:10px;" maxlength="20"></el-input>
      </div>
      <div class="content_wrapper">
        <p class="content_name">经办人联系电话<span class="xing">*</span></p>
        <el-input v-model="otherPartyPhone" placeholder="请输入" style="width:30%;margin-right:10px;" maxlength="20"></el-input>
      </div>
      <div class="content_wrapper">
        <p class="content_name">收款方式<span class="xing">*</span></p>
        <el-input v-model="payMode" placeholder="请输入" style="width:30%;margin-right:10px;" maxlength="20"></el-input>
      </div>
      <div class="content_wrapper">
        <p class="content_name">收款人<span class="xing">*</span></p>
        <el-input v-model="payee" placeholder="请输入" style="width:30%;margin-right:10px;" maxlength="20"></el-input>
      </div>
      <div class="content_wrapper">
        <p class="content_name">收款日期<span class="xing">*</span></p>
        <el-date-picker v-model="payDate" type="date" placeholder="请选择" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 30%"></el-date-picker>
      </div>
      <div class="content_wrapper">
        <p class="content_name">备注</p>
        <el-input type="textarea" :rows="3" v-model="memo" style="width:30%;"></el-input>
      </div>
      <div class="btn_wrapper">
        <div class="sure_btn" @click="submit">确定</div>
        <div class="cancel_btn" @click="handleClickCancel">取消</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'addMember',
  data() {
    return {
      memberName: '',
      memberType: '',
      memberIncome: '',
      otherParty: '',
      otherPartyPhone: '',
      companyNameOptions: [],
      typeOptions: [],
      payMode: '',
      payDate: '',
      pay: '',
      payee: '',
      memo: ''
    }
  },
  created() {
    if (this.$route.query.id) {
      this.getMember();
    };
    this.getCompanyList();
    this.getMemberType();
  },
  computed: {
  },
  methods: {
    // 获取会员详情
    async getMember() {
      let res = await this.$fetch('/vip_action/' + this.$route.query.id);
      this.memberName = res.cid;
      this.memberType = res.vip.id;
      this.pay = res.vip.money;
      this.memberIncome = res.pay;
      this.otherParty = res.operator;
      this.otherPartyPhone = res.operator_tel;
      this.payMode = res.type;
      this.payee = res.payee;
      this.payDate = res.pay_date;
      if (res.memo != null) {
        this.memo = res.memo;
      }
    },
    // 提交
    async submit() {
      if (
        this.memberName != '' &&
        this.memberType != '' &&
        // this.memberIncome != '' &&
        this.otherParty != '' &&
        this.otherPartyPhone != '' &&
        this.payMode != '' &&
        this.payee != '' &&
        this.payDate != ''
      ) {
        let res = await this.$post('/vip_action', {
          cid: this.memberName,
          vip_id: this.memberType,
          pay: this.memberIncome,
          operator: this.otherParty,
          operator_tel: this.otherPartyPhone,
          type: this.payMode,
          payee: this.payee,
          pay_date: this.payDate,
          memo: this.memo
        });
        this.$message.success('添加成功');
        this.$router.push('/home/memberList');
      } else {
        this.$message.error('请填写完整信息');
      }

    },
    // 获取所有企业
    async getCompanyList() {
      let res = await this.$post('/public/getCompaanyList');
      if (res.code == 200) {
        this.companyNameOptions = res.data;
      } else {
        this.$message.error(res.msg);
      }
    },
    // 获取会员类型
    async getMemberType() {
      let res = await this.$fetch('/public/getVipList');
      if (res.data.length > 0) {
        this.typeOptions = res.data;
      };
    },
    // 应收款项
    select_change(val) {
      this.typeOptions.filter(ele => {
        if (ele.id == val) {
          this.pay = ele.money;
        }
      });
    },
    // 返回上一步
    handleClickCancel() {
      this.$router.go(-1);
    }
  },
}
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
  width: 140px;
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
