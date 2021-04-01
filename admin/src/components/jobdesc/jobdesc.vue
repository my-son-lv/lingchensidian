<template>
  <div class="disabled">
    <div class="conent">
      <h5>职位介绍</h5>
      <div class="con_item">
        <p class="name">
          职位名称
          <span class="xing">*</span>
        </p>
        <el-input
          v-model="companyName"
          placeholder="Please enter the job title"
          style="width: 40%"
          maxlength="100"
          onkeyup="value=value.replace(/[\u4e00-\u9fa5]/g,'')"
        ></el-input>
      </div>
      <div class="con_item">
        <p class="name">
          机构名称
          <span class="xing">*</span>
        </p>
        <el-select v-model="companyId" placeholder="请选择" filterable style="width: 40%">
          <el-option
            v-for="item in company_list"
            :key="item.id"
            :label="item.company_name"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <div class="con_item">
        <p class="name">
          工作城市
          <span class="xing">*</span>
        </p>
        <el-cascader
          style="width: 40%"
          placeholder
          :options="cascaderData"
          @change="handleAreaChange"
          :props="{
            value: 'id',
            label: 'name',
            lazy: true,
            lazyLoad: cascader_load,
          }"
        ></el-cascader>
        <div class="back_city" v-if="showCity">{{ showBackCity }}</div>
      </div>
      <div class="con_item">
        <p class="name">
          工作类型
          <span class="xing">*</span>
        </p>
        <el-select v-model="workType" placeholder="请选择" style="width: 40%">
          <el-option
            v-for="item in optionsWorkType"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <div class="con_item">
        <p class="name">
          工作性质
          <span class="xing">*</span>
        </p>
        <el-select v-model="jobWorkType" placeholder="请选择" style="width: 40%">
          <el-option v-for="item in work_type" :key="item.id" :label="item.value" :value="item.id"></el-option>
        </el-select>
      </div>
      <!-- <div class="con_item">
        <p class="name" style="margin-right: 90px">教学语言</p>
        <el-select v-model="language" placeholder="请选择" style="width: 40%">
          <el-option
            v-for="item in languageList"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>-->
      <div class="con_item">
        <p class="name" style="margin-right: 98px">学生年龄</p>
        <el-checkbox-group v-model="studentAge">
          <el-checkbox
            v-for="(age, index) in studentAgeList"
            :label="index + 1"
            :key="index"
          >{{ age.value }}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="con_item">
        <p class="name" style="margin-right: 54px">工作时长(每周)</p>
        <el-input v-model="startDuration" placeholder="请输入" style="width: 20%"></el-input>-
        <el-input v-model="endDuration" placeholder="请输入" style="width: 20%"></el-input>
        <span style="display: inline-block; margin-left: 10px">hours</span>
      </div>
      <div class="con_item">
        <p class="name" style="margin-right: -43px">
          教学时长(每周)
          <span class="xing">*</span>
        </p>
        <el-col :span="15">
          <el-input
            v-model="teaching_time1"
            type="number"
            min="1"
            placeholder="e.g20"
            style="width: 20%"
          ></el-input>-
          <el-input
            v-model="teaching_time2"
            placeholder="e.g25"
            type="number"
            min="1"
            style="width: 20%"
          ></el-input>
          <span style="display: inline-block; margin-left: 10px">hours</span>
        </el-col>
      </div>
      <div class="con_item">
        <p class="name" style="margin-right: 5px">
          薪资
          <span class="xing">*</span>
        </p>
        <el-select
          v-model="startPay"
          placeholder="请选择"
          style="width: 20%; margin-left: 28px"
          @change="startPayChange"
        >
          <el-option v-for="(item, index) in startPayList" :key="index" :label="item" :value="item"></el-option>
        </el-select>-
        <el-select v-model="endPay" placeholder="请选择" style="width: 20%">
          <el-option v-for="(item, index) in endPayList" :key="index" :label="item" :value="item"></el-option>
        </el-select>
        <span style="display: inline-block; margin-left: 10px">RMB</span>
      </div>
      <div class="con_item">
        <p class="name">
          招聘人数
          <span class="xing">*</span>
        </p>
        <el-input v-model="needNum" placeholder="请输入" style="width: 20%"></el-input>
        <span style="display: inline-block; margin-left: 10px">人</span>
      </div>
      <div class="con_item">
        <p class="name" style="margin-right: 3px">
          计划上岗时间
          <span class="xing" style="margin-right: 45px">*</span>
        </p>
        <el-date-picker
          format="yyyy-MM"
          value-format="yyyy-MM"
          v-model="startDate"
          type="month"
          placeholder="计划上岗时间"
        ></el-date-picker>
      </div>
      <div class="con_item">
        <p class="name">
          工作介绍
          <span class="xing">*</span>
        </p>
        <el-input
          type="textarea"
          :rows="5"
          autosize
          v-model="job_info"
          style="width: 40%"
          maxlength="10000"
          onkeyup="value=value.replace(/[\u4e00-\u9fa5]/g,'')"
        ></el-input>
      </div>
      <div class="con_item">
        <p class="name" style="margin-right:92px;">福利标签</p>
        <div class="fuli_tags">
          <div
            class="fuli_tags_item"
            v-for="(item,index) in benefits_tag"
            :key="item.id"
            :class="benefits_tag[index].flg ? 'fuli_tags_active' : ''"
          >{{item.value}}</div>
        </div>
      </div>
      <div class="con_item">
        <p class="name" style="margin-right:128px;">福利</p>
        <el-input
          type="textarea"
          :rows="5"
          v-model="benefits"
          autosize
          style="width: 40%;"
          maxlength="10000"
          onkeyup="value=value.replace(/[\u4e00-\u9fa5]/g,'')"
        ></el-input>
      </div>

      <h5>工作要求</h5>
      <div class="con_item">
        <p class="name">
          国籍
          <span class="xing">*</span>
        </p>
        <el-select v-model="first_language" placeholder="请选择" style="width: 40%; margin-left: 28px">
          <el-option
            v-for="item in first_language_list"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <div class="con_item">
        <p class="name" style="margin-right: 125px">肤色</p>
        <el-select v-model="colour" placeholder="请选择" style="width: 40%">
          <el-option v-for="item in colourList" :key="item.id" :label="item.value" :value="item.id"></el-option>
        </el-select>
      </div>
      <div class="con_item">
        <p class="name">
          性别
          <span class="xing" style="margin-right:108px;">*</span>
        </p>
        <el-radio v-model="sex" :label="0">Any</el-radio>
        <el-radio v-model="sex" :label="1">Male</el-radio>
        <el-radio v-model="sex" :label="2">Female</el-radio>
      </div>
      <div class="con_item">
        <p class="name">
          学历要求
          <span class="xing" style="margin-right: 75px">*</span>
        </p>
        <el-select v-model="degree" placeholder="请选择" style="width: 40%">
          <el-option v-for="item in degreeList" :key="item.id" :label="item.value" :value="item.id"></el-option>
        </el-select>
      </div>
      <div class="con_item">
        <p class="name" style="margin-right: 60px">教学资质证书</p>
        <el-select v-model="certificate" style="width: 40%">
          <el-option v-for="item in cert_list" :key="item.id" :label="item.value" :value="item.id"></el-option>
        </el-select>
      </div>
      <div class="con_item">
        <p class="name" style="margin-right: -3px">
          教学经验
          <span class="xing">*</span>
        </p>
        <el-select v-model="job_year" placeholder="请选择" style="width: 40%">
          <el-option
            v-for="item in job_year_list"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <div class="con_item">
        <p class="name" style="margin-right: -3px">
          签证要求
          <span class="xing">*</span>
        </p>
        <el-select v-model="visa_ask" placeholder="请选择" style="width: 40%">
          <el-option
            v-for="item in visa_ask_list"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <div class="con_item">
        <p class="name" style="margin-right:126px;">备注</p>
        <el-input
          type="textarea"
          :rows="5"
          v-model="memo"
          style="width: 40%"
          maxlength="10000"
          onkeyup="value=value.replace(/[\u4e00-\u9fa5]/g,'')"
        ></el-input>
      </div>
      <!-- <div class="btn_wrapper" @click="handleClickSubmit">保存</div> -->
    </div>
  </div>
</template>
<script>
export default {
  name: "jobdesc",
  data() {
    return {
      cert_list: [
        {
          id: 1,
          value: "Required"
        },
        {
          id: 2,
          value: "Not required"
        }
      ],
      benefits_tag_str: "",
      teaching_time1: "",
      teaching_time2: "",
      teaching_time: "",
      benefits_tag: [
        {
          flg: false,
          id: 1,
          value: "Annual Bonus"
        },
        {
          flg: false,
          id: 2,
          value: "Insurance"
        },
        {
          flg: false,
          id: 3,
          value: "Apartment"
        },
        {
          flg: false,
          id: 4,
          value: "House Allowance"
        },
        {
          flg: false,
          id: 5,
          value: "Flight Allowance"
        },
        {
          flg: false,
          id: 6,
          value: "Paid Leave"
        }
      ],
      allPayUnit: [
        {
          value: "Per Hour",
          id: 1
        },
        {
          value: "Per Day",
          id: 2
        },
        {
          value: "Per Week",
          id: 3
        },
        {
          value: "Per Month",
          id: 4
        },
        {
          value: "Per Year",
          id: 5
        }
      ],
      companyName: "",
      cascaderData: [],
      cityId: "",
      showCity: false,
      optionsWorkType: [
        { value: "Offline", id: 1 },
        { value: "Online", id: 2 },
        { value: "Any", id: 3 },
      ],
      workType: 1,
      work_type: [
        { value: "Any", id: 1 },
        { value: "Full-time", id: 2 },
        { value: "Part-time", id: 3 }
      ],
      jobWorkType: 1,
      languageList: [{ value: "English", id: 1 }],
      language: 1,
      studentAge: [],
      studentAgeList: [
        { value: "0-3years old", id: 1 },
        { value: "3-6years old", id: 2 },
        { value: "7-12years old", id: 3 },
        { value: "13-18years old", id: 4 },
        { value: "18+years old", id: 5 }
      ],
      startDuration: "",
      endDuration: "",
      startPay: "",
      endPay: "",
      startPayList: [],
      endPayList: [],
      needNum: "",
      startDate: "",
      endDate: "",
      benefits: "",
      job_info: "",
      first_language: 0,
      first_language_list: [
        {
          value: "Any",
          id: 0
        },
        {
          value: "Native English Countries",
          id: 1
        },
        {
          value: "Non-native English Countries",
          id: 2
        }
      ],
      colour: "",
      colourList: [
        {
          value: "Any",
          id: 0
        },
        {
          value: "White",
          id: 1
        }
      ],
      sex: 0,
      certificate: [],
      certificateList: [
        {
          value: "TEFL",
          id: 1
        },
        {
          value: "TESOL",
          id: 2
        },
        {
          value: "TESL",
          id: 3
        },
        {
          value: "CELTA",
          id: 4
        }
      ],
      job_year: "",
      job_year_list: [
        { id: 1, value: "Less than 1 year" },
        { id: 2, value: "1-3years" },
        { id: 3, value: "3-5years" },
        { id: 4, value: "5-10years" },
        { id: 5, value: "More than 10 years" },
      ],
      visa_ask: "",
      visa_ask_list: [
        {
          value: "Z visa",
          id: 1
        },
        {
          value: "Any",
          id: 2
        }
      ],
      memo: "",
      company_list: [],
      companyId: "",
      degreeList: [
        {
          value: "Any",
          id: 4
        },
        {
          value: "Bachelor and above",
          id: 1
        },
        {
          value: "Master and above",
          id: 2
        },
        {
          value: "PHD and above",
          id: 3
        }
      ],
      degree: "",
      jobDayTime: "",
      allPay: "",
      showBackCity: ""
    };
  },
  created() {
    let jobId = sessionStorage.getItem("JOBID");
    this.getProvince();
    this.getCompanyList();
    this.getPay();
    if (this.$route.query.id) {
      this.getJobEdit();
    }
    if (jobId) {
      this.companyId = parseInt(jobId);
    }
  },
  computed: {},
  methods: {
    //   获取编辑信息
    async getJobEdit() {
      let res = await this.$post("/company/jobDesc", {
        id: this.$route.query.id
      });
      if (res.code == 200) {
        this.companyName = res.data.name;
        this.companyId = res.data.cid;
        this.cityId = res.data.job_city;
        this.showCity = true;
        this.showBackCity =
          res.data.job_province_data.pinyin +
          "/" +
          res.data.job_city_data.pinyin +
          "/" +
          res.data.job_area_data.pinyin;
        this.language = res.data.language;
        if (res.data.student_age != null) {
          this.studentAge = res.data.student_age.split(",").map(Number);
        }
        if (res.data.job_day_time != null) {
          this.startDuration = res.data.job_day_time.split(",")[0];
          this.endDuration = res.data.job_day_time.split(",")[1];
        }
        this.startPay = res.data.pay.split(",")[0];
        this.endPay = res.data.pay.split(",")[1];
        this.needNum = res.data.num;
        this.startDate = res.data.start_time;
        this.endDate = res.data.end_time;
        if (res.data.benefits != null) {
          this.benefits = res.data.benefits;
        }
        this.job_info = res.data.job_info;
        this.first_language = res.data.first_language;
        this.colour = parseInt(res.data.colour);
        this.sex = res.data.sex;
        this.degree = res.data.edu_type;
        if (res.data.cert) {
          this.certificate = parseInt(res.data.cert);
        }
        this.job_year = res.data.job_year;
        this.visa_ask = res.data.visa_ask;
        if (res.data.memo != null) {
          this.memo = res.data.memo;
        }
        this.workType = parseInt(res.data.type);
        this.jobWorkType = parseInt(res.data.work_type);
        this.teaching_time = res.data.teaching_time;
        if (res.data.teaching_time) {
          this.teaching_time1 = res.data.teaching_time.split(",")[0];
          this.teaching_time2 = res.data.teaching_time.split(",")[1];
        }
        this.benefits_tag_str = res.data.benefits_tag;
        if (res.data.benefits_tag) {
          let tags = res.data.benefits_tag.split(",");
          let that = this;
          tags.forEach(function(v, k) {
            that.benefits_tag[parseInt(v) - 1].flg = true;
          });
        }
      }
    },
    // 获取薪资
    getPay() {
      for (var i = 1; i <= 200; i++) {
        this.startPayList.push(i);
      }
    },
    // 结束薪资
    startPayChange() {
      this.endPayList = [];
      for (var i = this.startPay; i <= 200; i++) {
        this.endPayList.push(i);
      }
    },
    // 获取省份
    async getProvince() {
      let res = await this.$post("getProvince", {}, 1);
      if (res.code == 200) {
        this.cascaderData = res.data;
      }
    },
    async cascader_load(node, resolve) {
      if (node && node.data && node.data.id) {
        let res = await this.$post(
          "getCity",
          {
            id: node.data.id
          },
          1
        );
        res.data.forEach(element => {
          element.leaf = element.level == 3;
        });
        resolve(res.data);
      } else {
        resolve();
      }
    },
    handleAreaChange(val) {
      this.cityId = val[2];
      this.showCity = false;
    },
    // 获取所有企业
    async getCompanyList() {
      let res = await this.$post("/public/getCompaanyList");
      if (res.code == 200) {
        this.company_list = res.data;
      } else {
        this.$message.error(res.msg);
      }
    },
    // 保存
    async handleClickSubmit() {
      if (this.startDuration != "" && this.endDuration != "") {
        this.jobDayTime = this.startDuration + "," + this.endDuration;
      } else {
        this.jobDayTime = "";
      }
      if (this.startPay != "" && this.endPay != "") {
        this.allPay = this.startPay + "," + this.endPay;
      } else {
        this.allPay = "";
      }
      if (this.$route.query.id) {
        if (this.companyName == "") {
          this.$message.error("请填写职位名称");
        } else if (this.companyId == "") {
          this.$message.error("请选择机构名称");
        } else if (this.cityId == "") {
          this.$message.error("请选择工作城市");
        } else if (this.startPay == "" || this.endPay == "") {
          this.$message.error("请选择薪资");
        } else if (this.needNum == "") {
          this.$message.error("请填写招聘人数");
        } else if (this.startDate == "" || this.endDate == "") {
          this.$message.error("请选择招聘计划时间");
        } else if (this.job_info == "") {
          this.$message.error("请填写工作介绍");
        } else if (this.degree == "") {
          this.$message.error("请选择学历");
        } else if (this.job_year == "") {
          this.$message.error("请选择教学经验");
        } else if (this.visa_ask == "") {
          this.$message.error("请选择签证要求");
        } else {
          let res = await this.$post("/company/jobEdit", {
            id: this.$route.query.id,
            name: this.companyName,
            cid: this.companyId,
            job_city: this.cityId,
            type: this.workType,
            work_type: this.jobWorkType,
            language: this.language,
            student_age: this.studentAge.toString(),
            job_day_time: this.jobDayTime,
            pay: this.allPay,
            num: this.needNum,
            start_time: this.startDate,
            end_time: this.endDate,
            benefits: this.benefits,
            job_info: this.job_info,
            first_language: this.first_language,
            colour: this.colour,
            sex: this.sex,
            edu_type: this.degree,
            cert: this.certificate.toString(),
            job_year: this.job_year,
            visa_ask: this.visa_ask,
            memo: this.memo
          });
          if (res.code == 200) {
            this.$router.go(-1);
            this.$message.success("修改成功");
          } else {
            this.$message.error(res.msg);
          }
        }
      } else {
        if (this.companyName == "") {
          this.$message.error("请填写职位名称");
        } else if (this.companyId == "") {
          this.$message.error("请选择机构名称");
        } else if (this.cityId == "") {
          this.$message.error("请选择工作城市");
        } else if (this.startPay == "" || this.endPay == "") {
          this.$message.error("请选择薪资");
        } else if (this.needNum == "") {
          this.$message.error("请填写招聘人数");
        } else if (this.startDate == "" || this.endDate == "") {
          this.$message.error("请选择招聘计划时间");
        } else if (this.job_info == "") {
          this.$message.error("请填写工作介绍");
        } else if (this.degree == "") {
          this.$message.error("请选择学历");
        } else if (this.job_year == "") {
          this.$message.error("请选择教学经验");
        } else if (this.visa_ask == "") {
          this.$message.error("请选择签证要求");
        } else {
          let res = await this.$post("/company/jobAdd", {
            name: this.companyName,
            cid: this.companyId,
            job_city: this.cityId,
            type: this.workType,
            work_type: this.jobWorkType,
            language: this.language,
            student_age: this.studentAge.toString(),
            job_day_time: this.jobDayTime,
            pay: this.allPay,
            num: this.needNum,
            start_time: this.startDate,
            end_time: this.endDate,
            benefits: this.benefits,
            job_info: this.job_info,
            first_language: this.first_language,
            colour: this.colour,
            sex: this.sex,
            edu_type: this.degree,
            cert: this.certificate.toString(),
            job_year: this.job_year,
            visa_ask: this.visa_ask,
            memo: this.memo
          });
          if (res.code == 200) {
            this.$router.go(-1);
            this.$message.success("创建成功");
          } else {
            this.$message.error(res.msg);
          }
        }
      }
    }
  }
};
</script>
<style>
.el-cascader-menu__wrap {
  margin-right: 0 !important;
}
.el-select-dropdown__list {
  padding: 15px 0;
}
</style>
<style scoped>
.conent {
  margin-top: 20px;
  padding-bottom: 40px;
  width: 100%;
  background: #fff;
}
.conent h5 {
  padding: 40px;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.con_item {
  position: relative;
  display: flex;
  margin-bottom: 40px;
  padding-left: 40px;
  align-items: center;
}
.con_item .name {
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
}
.con_item .name .xing {
  margin: 0 80px 0 5px;
  display: inline-block;
  color: #ff6010;
}
.btn_wrapper {
  margin-left: 40px;
  width: 180px;
  height: 47px;
  background: #078ca9;
  border-radius: 4px;
  font-size: 18px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 47px;
  text-align: center;
  cursor: pointer;
}
.back_city {
  position: absolute;
  top: 10px;
  left: 210px;
  color: #606266;
  font-size: 14px;
}
.tips {
  margin-left: 10px;
  color: #ff6010;
}
.disabled {
  pointer-events: none;
  opacity: 0.9;
}
.fuli_tags {
  display: flex;
  margin-bottom: 20px;
}
.fuli_tags_item {
  text-align: center;
  line-height: 40px;
  background: rgb(170, 169, 169);
  margin: 0 5px;
  border-radius: 4px;
  color: white;
  padding: 0 20px;
  cursor: pointer;
  display: inline;
}
.fuli_tags_active {
  background: rgba(7, 140, 169, 1);
}
</style>
