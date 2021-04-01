<template>
  <div>
    <div class="content">
      <h3 class="title">机构信息</h3>
      <div class="name_wrapper clearfix">
        <div class="form_title fl">
          机构名称
          <span class="required">*</span>
        </div>
        <el-input class="el_input fl" placeholder="请输入机构名称" v-model="company_name"></el-input>
      </div>

      <div class="name_wrapper clearfix">
        <div class="form_title fl">机构LOGO</div>
        <el-upload
          v-loading="isloading"
          action
          :show-file-list="false"
          :auto-upload="false"
          :on-change="onchangeUploadLogo"
          list-type="picture-card"
          accept="image/png, image/gif, image/jpg, image/jpeg"
          class="fl"
        >
          <i class="el-icon-plus upload_icon">
            <div class="upload_text">点击上传图片</div>
          </i>
        </el-upload>
        <img :src="logoUrl" v-show="logoUrl != ''" class="logo_img" />
      </div>

      <div class="name_wrapper clearfix" style="line-height: 40px">
        <div class="form_title fl">
          学校类型
          <span class="required">*</span>
        </div>
        <!-- <el-radio
          v-model="type"
          :label="item.id"
          v-for="(item, index) in typeList"
          :key="index"
          >{{ item.value }}</el-radio
        >-->
        <el-checkbox-group v-model="type" style="line-height:40px;">
          <el-checkbox v-for="item in typeList" :label="item.id" :key="item.id">{{item.txt}}</el-checkbox>
        </el-checkbox-group>
      </div>

      <div class="name_wrapper clearfix" style="position: relative">
        <div class="form_title fl">
          办公地址
          <span class="required">*</span>
        </div>
        <el-cascader
          placeholder
          :options="cascaderData"
          @change="handleChange"
          :props="{
            value: 'id',
            label: 'name',
            lazy: true,
            lazyLoad: cascader_load,
          }"
          class="cascader fl"
        ></el-cascader>
        <p class="cascader_value" v-show="showCityValue">{{ cityValue }}</p>
      </div>
      <div class="name_wrapper clearfix">
        <div class="form_title fl">
          详细地址
          <span class="required">*</span>
        </div>
        <el-input
          type="textarea"
          :rows="3"
          class="el_input fl"
          placeholder="请输入详细地址"
          v-model="addressDetails"
        ></el-input>
      </div>

      <div class="name_wrapper clearfix" style="line-height: 40px">
        <div class="form_title fl">营业执照</div>
        <div class="fl">
          <el-radio-group v-model="business_flg" @change="bussinessChange">
            <el-radio :label="1">具备</el-radio>
            <el-radio :label="0">不具备</el-radio>
          </el-radio-group>
        </div>
      </div>

      <div class="name_wrapper clearfix" v-show="business_flg == 1">
        <div class="form_title fl">公司名称</div>
        <el-input class="el_input fl" placeholder="请输入公司名称" v-model="business_name"></el-input>
      </div>

      <div class="name_wrapper clearfix" v-show="business_flg == 1">
        <div class="form_title fl">营业执照</div>
        <el-upload
          v-loading="isloading"
          action
          :show-file-list="false"
          :auto-upload="false"
          :on-change="onchangeUploadBusiness"
          list-type="picture-card"
          accept="image/png, image/gif, image/jpg, image/jpeg"
          class="fl"
        >
          <i class="el-icon-plus upload_icon">
            <div class="upload_text">点击上传图片</div>
          </i>
        </el-upload>
        <p class="tips_con fl" v-if="businessUrl == ''">
          请上传有年检章的企业营业执照副本扫描件
          <br />文件小于5M
          <br />支持JPG/PNG/JPEG等格式文件
          <br />
        </p>
        <img :src="businessUrl" v-else class="logo_img" />
      </div>

      <div class="name_wrapper clearfix" style="line-height: 40px">
        <div class="form_title fl">办学许可资质</div>
        <div class="fl">
          <el-radio-group v-model="talent" @change="talentChange">
            <el-radio :label="1">具备</el-radio>
            <el-radio :label="0">不具备</el-radio>
          </el-radio-group>
        </div>
      </div>

      <div class="name_wrapper clearfix" v-show="talent == 1">
        <div class="form_title fl">办学许可资质证书</div>
        <el-upload
          v-loading="isloading"
          action
          :show-file-list="false"
          :auto-upload="false"
          :on-change="onchangeUploadTalent"
          list-type="picture-card"
          accept="image/png, image/gif, image/jpg, image/jpeg"
          class="fl"
        >
          <i class="el-icon-plus upload_icon">
            <div class="upload_text">点击上传图片</div>
          </i>
        </el-upload>
        <img :src="talentUrl" v-show="talentUrl != ''" class="logo_img" />
      </div>

      <div class="name_wrapper clearfix" style="line-height: 40px">
        <div class="form_title fl">
          学生年龄
          <span class="required">*</span>
        </div>
        <el-checkbox-group v-model="student_age">
          <el-checkbox v-for="(age, index) in ageList" :label="index + 1" :key="age">{{ age }}</el-checkbox>
        </el-checkbox-group>
      </div>

      <!-- <div class="name_wrapper clearfix">
        <div class="form_title fl">
          外籍员工人数<span class="required">*</span>
        </div>
        <el-input
          onkeyup="value=value.replace(/[^\d]/g,'')"
          class="el_input fl"
          placeholder="请输入外籍员工人数"
          v-model="abroad_staff"
        ></el-input>
      </div>-->

      <div class="name_wrapper clearfix" style="line-height: 40px">
        <div class="form_title fl">
          年度外教需求量
          <span class="required">*</span>
        </div>
        <el-radio
          v-model="needs_num"
          :label="item.id"
          v-for="(item, index) in needNumList"
          :key="index"
        >{{ item.value }}</el-radio>
      </div>

      <!-- <div class="name_wrapper clearfix" style="line-height: 40px">
        <div class="form_title fl">
          月均薪资范围(税后)<span class="required">*</span>
        </div>
        <el-radio
          v-model="pay"
          :label="item.id"
          v-for="(item, index) in payList"
          :key="index"
          >{{ item.value }}</el-radio
        >
      </div>-->

      <div class="name_wrapper clearfix">
        <div class="form_title fl">机构/校区图片一</div>
        <el-upload
          v-loading="isloading"
          action
          :show-file-list="false"
          :auto-upload="false"
          :on-change="onchangeUploadSchooolFirst"
          list-type="picture-card"
          accept="image/png, image/gif, image/jpg, image/jpeg"
          class="fl"
        >
          <i class="el-icon-plus upload_icon">
            <div class="upload_text">点击上传图片</div>
          </i>
        </el-upload>
        <p class="tips_con fl" v-if="schoolFirstUrl == ''">请上传两张校区图片，便于平台了解</p>
        <img :src="schoolFirstUrl" v-else class="logo_img" />
      </div>

      <div class="name_wrapper clearfix">
        <div class="form_title fl">机构/校区图片二</div>
        <el-upload
          v-loading="isloading"
          action
          :show-file-list="false"
          :auto-upload="false"
          :on-change="onchangeUploadSchooolSecond"
          list-type="picture-card"
          accept="image/png, image/gif, image/jpg, image/jpeg"
          class="fl"
        >
          <i class="el-icon-plus upload_icon">
            <div class="upload_text">点击上传图片</div>
          </i>
        </el-upload>
        <p class="tips_con fl" v-if="schoolSecondUrl == ''">请上传两张校区图片，便于平台了解</p>
        <img :src="schoolSecondUrl" v-else class="logo_img" />
      </div>
      <el-row class="row">
        <el-col :span="2.5">
          <div class="form_title fl">学校英文简介</div>
        </el-col>
        <el-col :span="10">
          <el-input
            type="textarea"
            :rows="5"
            onkeyup="value=value.replace(/[\u4e00-\u9fa5]/g,'')"
            class="el_textarea"
            placeholder="Please introduce your school"
            maxlength="100000"
            v-model="school_en_info"
          ></el-input>
        </el-col>
      </el-row>

      <h3 class="title">联系人信息</h3>
      <div class="name_wrapper clearfix">
        <div class="form_title fl">
          联系人姓名
          <span class="required">*</span>
        </div>
        <el-input class="el_input fl" placeholder="请输入联系人姓名" v-model="contact"></el-input>
      </div>

      <div class="name_wrapper clearfix">
        <div class="form_title fl">
          联系电话
          <span class="required">*</span>
        </div>
        <el-input class="el_input fl" placeholder="请输入联系人电话" v-model="contact_phone" maxlength="11"></el-input>
      </div>

      <div class="name_wrapper clearfix">
        <div class="form_title fl">工作邮箱</div>
        <el-input class="el_input fl" placeholder="请输入工作邮箱" v-model="work_email"></el-input>
      </div>

      <h3 class="title">账号信息</h3>
      <div class="name_wrapper clearfix">
        <div class="form_title fl">
          账号
          <span class="required">*</span>
        </div>
        <el-input class="el_input fl" placeholder="请输入手机号" v-model="company_phone" maxlength="11"></el-input>
      </div>

      <div class="submit_btn" @click="clickSubmit">提交</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "companyMessage",
  data() {
    return {
      company_name: "",
      isloading: false,
      logoUrl: "",
      type: [],
      school_en_info:'',
      typeList: [
        {
          id: 1,
          txt: "培训机构",
        },
        {
          id: 2,
          txt: "幼儿园",
        },
        {
          id: 3,
          txt: "小学",
        },
        {
          id: 4,
          txt: "初中",
        },
        {
          id: 5,
          txt: "高中",
        },
        {
          id: 6,
          txt: "大学",
        },
      ],
      cascaderData: [],
      addressDetails: "",
      business_flg: 1,
      business_name: "",
      businessUrl: "",
      talentUrl: "",
      talent: 1,
      ageList: ["0-3岁", "3-6岁", "7-12岁", "13-18岁", "18岁以上"],
      student_age: [],
      abroad_staff: "",
      needNumList: [
        {
          value: "1-3",
          id: 1,
        },
        {
          value: "3-6",
          id: 2,
        },
        {
          value: "6-10",
          id: 3,
        },
        {
          value: "10-20",
          id: 4,
        },
        {
          value: "20-50",
          id: 5,
        },
        {
          value: "50人以上",
          id: 6,
        },
      ],
      needs_num: 1,
      pay: 1,
      payList: [
        {
          value: "15000元以下",
          id: 1,
        },
        {
          value: "15000-20000元",
          id: 2,
        },
        {
          value: "20000元以上",
          id: 3,
        },
      ],
      schoolFirstUrl: "",
      schoolSecondUrl: "",
      contact: "",
      contact_phone: "",
      work_email: "",
      business_img: "",
      cityId: "",
      talent_img: "",
      school_img_1: "",
      school_img_2: "",
      company_phone: "",
      logoId: "",
      companyId: "",
      cityValue: "",
      showCityValue: false,
    };
  },
  created() {
    this.getProvince();
    if (this.$route.query.id) {
      this.companyId = this.$route.query.id;
      this.getEditCompany();
    }
  },
  computed: {},
  methods: {
    // 获取编辑信息
    async getEditCompany() {
      let res = await this.$post("/companyCheck/desc", {
        id: this.companyId,
      });
      if (res.code == 200) {
        this.school_en_info = res.data.school_en_info
        this.company_name = res.data.company_name;
        if (res.data.logo) {
          this.logoId = res.data.logo;
          this.logoUrl = res.data.logo_path.path;
        }
        let type = res.data.type.split(",");
        type.forEach((item) => {
          this.type.push(parseInt(item));
        });
        this.cityId = res.data.city;
        this.showCityValue = true;
        this.cityValue =
          res.data.city_name.merger_name.split(",")[1] +
          " / " +
          res.data.city_name.merger_name.split(",")[2] +
          " / " +
          res.data.city_name.merger_name.split(",")[3];
        this.addressDetails = res.data.address;
        if (res.data.talent) {
          this.talent = res.data.talent;
        }
        if (res.data.talent_img_path.length > 0) {
          this.talent_img = res.data.talent_img;
          this.talentUrl = res.data.talent_img_path[0].path;
        }
        this.student_age = res.data.student_age.split(",").map(Number);
        // this.abroad_staff = res.data.abroad_staff;
        this.needs_num = res.data.needs_num;
        // this.pay = res.data.pay;
        this.contact = res.data.contact;
        this.contact_phone = res.data.contact_phone;
        this.work_email = res.data.work_email;
        if (res.data.business_name) {
          this.business_name = res.data.business_name;
        }
        if (res.data.business_flg) {
          this.business_flg = res.data.business_flg;
        }
        if (res.data.business_img_path.length > 0) {
          this.business_img = res.data.business_img;
          this.businessUrl = res.data.business_img_path[0].path;
        }
        if (res.data.school_img_1) {
          this.school_img_1 = res.data.school_img_1;
          this.schoolFirstUrl = res.data.school_img_1_path.path;
        }
        if (res.data.school_img_2) {
          this.school_img_2 = res.data.school_img_2;
          this.schoolSecondUrl = res.data.school_img_2_path.path;
        }
        this.company_phone = res.data.phone;
      }
    },
    // 上传logo
    onchangeUploadLogo(file) {
      var that = this;
      const isLt5M = file.size / 1024 / 1024 < 8;
      if (!isLt5M) {
        this.$message.error("上传图片应小于8M");
        return false;
      }
      let fd = new FormData();
      fd.append("file", file.raw);
      fd.append("type", 0);
      that.$post("upload", fd, 1).then((response) => {
        if (response.code === 200) {
          this.logoUrl = response.data.path;
          this.logoId = response.data.id;
        }
      });
    },
    // 省市区
    handleChange(val) {
      this.cityId = val[2];
      this.showCityValue = false;
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
            id: node.data.id,
          },
          1
        );
        res.data.forEach((element) => {
          element.leaf = element.level == 3;
        });
        resolve(res.data);
      } else {
        resolve();
      }
    },
    // 上传营业执照
    onchangeUploadBusiness(file) {
      var that = this;
      const isLt5M = file.size / 1024 / 1024 < 8;
      if (!isLt5M) {
        this.$message.error("上传图片应小于8M");
        return false;
      }
      let fd = new FormData();
      fd.append("file", file.raw);
      fd.append("type", 0);
      that.$post("upload", fd, 1).then((response) => {
        if (response.code === 200) {
          this.businessUrl = response.data.path;
          this.business_img = response.data.id;
        }
      });
    },
    // 营业执照选框切换
    bussinessChange(event) {
      if (event == 0) {
        this.business_name = "";
        this.business_img = "";
        this.businessUrl = "";
      }
    },
    // 上传资质证书
    onchangeUploadTalent(file) {
      var that = this;
      const isLt5M = file.size / 1024 / 1024 < 8;
      if (!isLt5M) {
        this.$message.error("上传图片应小于8M");
        return false;
      }
      let fd = new FormData();
      fd.append("file", file.raw);
      fd.append("type", 0);
      that.$post("upload", fd, 1).then((response) => {
        if (response.code === 200) {
          this.talentUrl = response.data.path;
          this.talent_img = response.data.id;
        }
      });
    },
    // 资质证书选框切换
    talentChange(event) {
      if (event == 0) {
        this.talent_img = "";
        this.talentUrl = "";
      }
    },
    // 上传学校图片一
    onchangeUploadSchooolFirst(file) {
      var that = this;
      const isLt5M = file.size / 1024 / 1024 < 8;
      if (!isLt5M) {
        this.$message.error("上传图片应小于8M");
        return false;
      }
      let fd = new FormData();
      fd.append("file", file.raw);
      fd.append("type", 0);
      that.$post("upload", fd, 1).then((response) => {
        if (response.code === 200) {
          this.schoolFirstUrl = response.data.path;
          this.school_img_1 = response.data.id;
        }
      });
    },
    // 上传学校图片二
    onchangeUploadSchooolSecond(file) {
      var that = this;
      const isLt5M = file.size / 1024 / 1024 < 8;
      if (!isLt5M) {
        this.$message.error("上传图片应小于8M");
        return false;
      }
      let fd = new FormData();
      fd.append("file", file.raw);
      fd.append("type", 0);
      that.$post("upload", fd, 1).then((response) => {
        if (response.code === 200) {
          this.schoolSecondUrl = response.data.path;
          this.school_img_2 = response.data.id;
        }
      });
    },
    // 点击提交
    async clickSubmit() {
      if (this.$route.query.id) {
        let reg = /^1[3-9][0-9]{9}$/;
        if (this.company_name == "") {
          this.$message.error("请填写机构名称");
        } else if (this.cityId == "") {
          this.$message.error("请选择办公地址");
        } else if (this.addressDetails == "") {
          this.$message.error("请填写详细地址");
        } else if (this.student_age.length == 0) {
          this.$message.error("请选择学生年龄");
        } else if (this.contact == "") {
          this.$message.error("请填写联系人姓名");
        } else if (this.contact_phone == "") {
          this.$message.error("请填写联系电话");
        } else if (!reg.test(this.contact_phone)) {
          this.$message.error("请填写正确格式手机号");
        } else if (!reg.test(this.company_phone)) {
          this.$message.error("请填写正确格式手机号");
        } else {
          let res = await this.$post("company/edit", {
            id: this.companyId,
            company_name: this.company_name,
            business_img: this.business_img,
            type: this.type.toString(),
            city: this.cityId,
            address: this.addressDetails,
            talent: this.talent,
            talent_img: this.talent_img,
            student_age: this.student_age.toString(),
            // abroad_staff: this.abroad_staff,
            needs_num: this.needs_num,
            school_en_info: this.school_en_info,
            // pay: this.pay,
            contact: this.contact,
            contact_phone: this.contact_phone,
            work_email: this.work_email,
            business_name: this.business_name,
            business_flg: this.business_flg,
            school_img_1: this.school_img_1,
            school_img_2: this.school_img_2,
            phone: this.company_phone,
            user_id: "",
            logo: this.logoId,
            password: "",
          });
          if (res.code == 200) {
            this.$message({
              message: "修改成功",
              type: "success",
            });
            this.$router.go(-1);
          } else {
            this.$message.error(res.msg);
          }
        }
      } else {
        let reg = /^1[3-9][0-9]{9}$/;
        if (this.company_name == "") {
          this.$message.error("请填写机构名称");
        } else if (this.cityId == "") {
          this.$message.error("请选择办公地址");
        } else if (this.addressDetails == "") {
          this.$message.error("请填写详细地址");
        } else if (this.student_age.length == 0) {
          this.$message.error("请选择学生年龄");
        } else if (this.contact == "") {
          this.$message.error("请填写联系人姓名");
        } else if (this.contact_phone == "") {
          this.$message.error("请填写联系电话");
        } else if (!reg.test(this.contact_phone)) {
          this.$message.error("请填写正确格式手机号");
        } else if (!reg.test(this.company_phone)) {
          this.$message.error("请填写正确格式手机号");
        } else {
          let res = await this.$post("/company/add", {
            company_name: this.company_name,
            business_img: this.business_img,
            type: this.type.toString(),
            city: this.cityId,
            school_en_info: this.school_en_info,
            address: this.addressDetails,
            talent: this.talent,
            talent_img: this.talent_img,
            student_age: this.student_age.toString(),
            // abroad_staff: this.abroad_staff,
            needs_num: this.needs_num,
            // pay: this.pay,
            contact: this.contact,
            contact_phone: this.contact_phone,
            work_email: this.work_email,
            business_name: this.business_name,
            business_flg: this.business_flg,
            school_img_1: this.school_img_1,
            school_img_2: this.school_img_2,
            phone: this.company_phone,
            user_id: "",
            logo: this.logoId,
            password: "",
          });
          if (res.code == 200) {
            this.$router.push("/home/companylist");
          } else {
            this.$message.error(res.msg);
          }
        }
      }
    },
  },
};
</script>
<style>
.el-cascader-menu__wrap {
  margin-right: 0 !important;
}
</style>
<style scoped>
.content {
  margin-top: 20px;
  padding: 30px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
}
.title {
  margin-bottom: 40px;
  font-size: 18px;
  font-weight: 500;
  color: #333;
  line-height: 24px;
}
.clearfix:after {
  content: "";
  display: block;
  clear: both;
}

.clearfix {
  zoom: 1;
}

.fl {
  float: left;
}

.fr {
  float: right;
}
.form_title {
  min-width: 180px;
  font-size: 16px;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  text-align: right;
  height: 40px;
  line-height: 40px;
  text-align: left;
}
.required {
  display: inline-block;
  margin: 0 0 0 10px;
  font-size: 16px;
  font-weight: 400;
  color: rgba(255, 96, 16, 1);
  margin-left: 5px;
  line-height: 40px;
}
.el_input,
.cascader {
  width: 30%;
}
.name_wrapper {
  margin-bottom: 30px;
}
.upload_text {
  font-size: 16px;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 16px;
}

.upload_icon {
  width: 100%;
  height: 100%;
  font-size: 50px;
  line-height: 100px;
  border: 800;
}
.logo_img {
  margin-left: 30px;
  width: 146px;
  height: 146px;
}
.tips_con {
  margin-left: 30px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 30px;
  letter-spacing: 1px;
}
.submit_btn {
  margin-top: 20px;
  width: 100px;
  height: 40px;
  background: #078ca9;
  border-radius: 4px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
}
.cascader_value {
  position: absolute;
  top: 10px;
  left: 197px;
  color: #606266;
  font-size: 14px;
}
</style>
