<template>
  <div>
    <div class="content_wrapper">
      <div class="name_wrapper clearfix">
        <div class="form_title fl">活动标题<span class="required">*</span></div>
        <el-input class="el_input fl" placeholder="请输入标题" v-model.trim="activity_title" maxlength="30"></el-input>
        <div class="tips_con fl">最多30个字符</div>
      </div>
      <div class="name_wrapper clearfix">
        <div class="form_title fl">起始时间<span class="required">*</span></div>
        <div class="block fl">
          <el-date-picker v-model="startDate" type="datetime" placeholder="选择开始日期" value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </div>
        <div class="tips_con fl">起始时间需大于当前时间</div>
      </div>
      <div class="name_wrapper clearfix">
        <div class="form_title fl">结束时间<span class="required">*</span></div>
        <div class="block fl">
          <el-date-picker v-model="endDate" type="datetime" placeholder="选择结束日期" value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </div>
        <div class="tips_con fl">结束时间需大于开始时间</div>
      </div>
      <div class="name_wrapper clearfix">
        <div class="form_title fl">投放位置<span class="required">*</span></div>
        <el-checkbox v-model="wxPopscreen" class="fl" @change="handleWxPopscreenChange(0)">小程序广告弹屏</el-checkbox>
        <div class="tips_con fl">选择投放位置 显示配置，填写对应配置</div>
      </div>
      <div style="padding-left: 11%;" v-if="wxPopscreen">
        <div class="configure_wrapper clearfix">
          <div class="form_title fl">配置<span class="required">*</span></div>
          <el-upload action :show-file-list="false" :auto-upload="false" :on-change="onchangeUploadWxPopscreen" list-type="picture-card" accept="image/png, image/gif, image/jpg, image/jpeg" class="fl">
            <i class="el-icon-plus upload_icon">
              <div class="upload_text">点击上传图片</div>
            </i>
          </el-upload>
          <img :src="this.wxPopscreenImgUrl" v-if="this.wxPopscreenImgUrl != ''" class="logo_img fl" />
          <div class="tips_con fl">建议尺寸不小于长249px * 宽350px</div>
        </div>
        <div class="name_wrapper clearfix">
          <div class="form_title fl">跳转URL地址</div>
          <el-input class="el_input fl" placeholder="请输入url" v-model.trim="wxPopscreenUrl"></el-input>
        </div>
      </div>
      <div class="name_wrapper clearfix">
        <div class="form_title fl"></div>
        <el-checkbox v-model="wxBanner" class="fl" @change="handleWxBannerChange(1)">小程序banner位置</el-checkbox>
        <div class="tips_con fl">选择投放位置 显示配置，填写对应配置</div>
      </div>
      <div style="padding-left: 11%;" v-if="wxBanner">
        <div class="configure_wrapper clearfix">
          <div class="form_title fl">配置<span class="required">*</span></div>
          <el-upload action :show-file-list="false" :auto-upload="false" :on-change="onchangeUploadWxBanner" list-type="picture-card" accept="image/png, image/gif, image/jpg, image/jpeg" class="fl">
            <i class="el-icon-plus upload_icon">
              <div class="upload_text">点击上传图片</div>
            </i>
          </el-upload>
          <img :src="wxBannerImgUrl" v-if="this.wxBannerImgUrl != ''" class="logo_img fl" />
          <div class="tips_con fl">建议尺寸不小于长343px * 宽112px</div>
        </div>
        <div class="name_wrapper clearfix">
          <div class="form_title fl">跳转URL地址</div>
          <el-input class="el_input fl" placeholder="请输入url" v-model.trim="wxBannerUrl"></el-input>
        </div>
      </div>
      <div class="name_wrapper clearfix">
        <div class="form_title fl"></div>
        <el-checkbox v-model="pcPopscreen" class="fl" @change="handlePcPopscreenChange(2)">官网banner位</el-checkbox>
        <div class="tips_con fl">选择投放位置 显示配置，填写对应配置</div>
      </div>
      <div style="padding-left: 11%;" v-if="pcPopscreen">
        <div class="configure_wrapper clearfix">
          <div class="form_title fl">配置<span class="required">*</span></div>
          <el-upload action :show-file-list="false" :auto-upload="false" :on-change="onchangeUploadpcPopscreen" list-type="picture-card" accept="image/png, image/gif, image/jpg, image/jpeg" class="fl">
            <i class="el-icon-plus upload_icon">
              <div class="upload_text">点击上传图片</div>
            </i>
          </el-upload>
          <img :src="pcPopscreenImgUrl" v-if="this.pcPopscreenImgUrl != ''" class="logo_img fl" />
          <div class="tips_con fl">建议尺寸不小于长1920px * 宽120px</div>
        </div>
        <div class="name_wrapper clearfix">
          <div class="form_title fl">跳转URL地址</div>
          <el-input class="el_input fl" placeholder="请输入url" v-model.trim="pcPopscreenUrl"></el-input>
        </div>
      </div>
      <div class="name_wrapper clearfix">
        <div class="form_title fl"></div>
        <el-checkbox v-model="pcBanner" class="fl" @change="handlePcBannerChange(3)">企业PC banner位</el-checkbox>
        <div class="tips_con fl">选择投放位置 显示配置，填写对应配置</div>
      </div>
      <div style="padding-left: 11%;" v-if="pcBanner">
        <div class="configure_wrapper clearfix">
          <div class="form_title fl">配置<span class="required">*</span></div>
          <el-upload action :show-file-list="false" :auto-upload="false" :on-change="onchangeUploadpcBanner" list-type="picture-card" accept="image/png, image/gif, image/jpg, image/jpeg" class="fl">
            <i class="el-icon-plus upload_icon">
              <div class="upload_text">点击上传图片</div>
            </i>
          </el-upload>
          <img :src="pcBannerImgUrl" v-if="this.pcBannerImgUrl != ''" class="logo_img fl" />
          <div class="tips_con fl">建议尺寸不小于长1920px * 宽120px</div>
        </div>
        <div class="name_wrapper clearfix">
          <div class="form_title fl">跳转URL地址</div>
          <el-input class="el_input fl" placeholder="请输入url" v-model.trim="pcBannerUrl"></el-input>
        </div>
      </div>
      <div class="btn_wrapper">
        <div @click="submit">提交</div>
        <div @click="handleClickCancel">取消</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'addActivity',
  data() {
    return {
      activity_title: '',
      wxPopscreen: false,
      wxPopscreenUrl: '',
      startDate: '',
      endDate: '',
      wxBanner: false,
      wxBannerUrl: '',
      pcPopscreen: false,
      pcPopscreenUrl: '',
      pcBanner: '',
      pcBannerUrl: '',
      wxPopscreenImgUrl: '',
      wxPopscreenId: '',
      wxBannerImgUrl: '',
      wxBannerId: '',
      pcPopscreenImgUrl: '',
      pcPopscreenId: '',
      pcBannerImgUrl: '',
      pcBannerId: '',
      typeList: [],
      queryId: '',
    }
  },
  created() {
    this.queryId = this.$route.query.id;
    if (this.queryId) {
      this.getEditActivity();
    }
  },
  computed: {
  },
  methods: {
    // 获取编辑
    async getEditActivity() {
      let res = await this.$fetch('/advert/show', {
        id: this.queryId
      });
      if (res.code == 200) {
        this.activity_title = res.data.title;
        this.startDate = res.data.start_time;
        this.endDate = res.data.end_time;
        this.typeList = res.data.type.split(',').map(Number);
        if (this.typeList.includes(1)) {
          this.wxPopscreen = true;
          this.wxPopscreenId = res.data.img1;
          this.wxPopscreenImgUrl = res.data.img1_path.path;
          if (res.data.url1 != null) {
            this.wxPopscreenUrl = res.data.url1;
          };
        };
        if (this.typeList.includes(2)) {
          this.wxBanner = true;
          this.wxBannerId = res.data.img2;
          this.wxBannerImgUrl = res.data.img2_path.path;
          if (res.data.url2 != null) {
            this.wxBannerUrl = res.data.url2;
          };
        };
        if (this.typeList.includes(3)) {
          this.pcPopscreen = true;
          this.pcPopscreenId = res.data.img3;
          this.pcPopscreenImgUrl = res.data.img3_path.path;
          if (res.data.url3 != null) {
            this.pcPopscreenUrl = res.data.url3;
          };
        };
        if (this.typeList.includes(4)) {
          this.pcBanner = true;
          this.pcBannerId = res.data.img4;
          this.pcBannerImgUrl = res.data.img4_path.path;
          if (res.data.url4 != null) {
            this.pcBannerUrl = res.data.url4;
          };
        };
      }
    },
    // 微信弹窗
    onchangeUploadWxPopscreen(file) {
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
          this.wxPopscreenImgUrl = response.data.path;
          this.wxPopscreenId = response.data.id;
        }
      });
    },
    // 微信banner
    onchangeUploadWxBanner(file) {
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
          this.wxBannerImgUrl = response.data.path;
          this.wxBannerId = response.data.id;
        }
      });
    },
    // pc弹窗
    onchangeUploadpcPopscreen(file) {
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
          this.pcPopscreenImgUrl = response.data.path;
          this.pcPopscreenId = response.data.id;
        }
      });
    },
    // pc banner
    onchangeUploadpcBanner(file) {
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
          this.pcBannerImgUrl = response.data.path;
          this.pcBannerId = response.data.id;
        }
      });
    },
    // 选框发生改变
    handleWxPopscreenChange(num) {
      if (this.wxPopscreen == true) {
        this.typeList.push(1);
      } else {
        this.typeList.splice(num, 1);
      };
    },
    handleWxBannerChange(num) {
      if (this.wxBanner == true) {
        this.typeList.push(2);
      } else {
        this.typeList.splice(num, 1);
      };
    },
    handlePcPopscreenChange(num) {
      if (this.pcPopscreen == true) {
        this.typeList.push(3);
      } else {
        this.typeList.splice(num, 1);
      };
    },
    handlePcBannerChange(num) {
      if (this.pcBanner == true) {
        this.typeList.push(4);
      } else {
        this.typeList.splice(num, 1);
      };
    },
    // 提交
    async submit() {
      if (this.queryId) {
        if (this.activity_title == '') {
          this.$message({
            message: '请填写活动标题',
            type: 'warning'
          });
        } else if (this.startDate == '') {
          this.$message({
            message: '请选择起始时间',
            type: 'warning'
          });
        } else if (this.endDate == '') {
          this.$message({
            message: '请选择结束时间',
            type: 'warning'
          });
        } else {
          if (this.wxPopscreen == true && this.wxPopscreenImgUrl == '') {
            this.$message({
              message: '请上传小程序广告弹屏图片',
              type: 'warning'
            });
          } else if (this.wxBanner == true && this.wxBannerImgUrl == '') {
            this.$message({
              message: '请上传小程序banner图片',
              type: 'warning'
            });
          } else if (this.pcPopscreen == true && this.pcPopscreenImgUrl == '') {
            this.$message({
              message: '请上传PC广告弹屏图片',
              type: 'warning'
            });
          } else if (this.pcBanner == true && this.pcBannerImgUrl == '') {
            this.$message({
              message: '请上传PC banner图片',
              type: 'warning'
            });
          } else if (this.wxPopscreen == false && this.wxBanner == false && this.pcPopscreen == false && this.pcBanner == false) {
            this.$message({
              message: '请选择投放位置',
              type: 'warning'
            });
          } else {
            let res = await this.$post("/advert/edit", {
              id: this.queryId,
              title: this.activity_title,
              start_time: this.startDate,
              end_time: this.endDate,
              type: this.typeList.toString(),
              status: 1,
              img1: this.wxPopscreenId,
              url1: this.wxPopscreenUrl,
              img2: this.wxBannerId,
              url2: this.wxBannerUrl,
              img3: this.pcPopscreenId,
              url3: this.pcPopscreenUrl,
              img4: this.pcBannerId,
              url4: this.pcBannerUrl,
            });
            if (res.code == 200) {
              this.$message({
                message: '修改成功',
                type: 'success'
              });
              this.$router.push('/home/activityList');
            } else {
              this.$message.error(res.msg);
            };
          }
        };
      } else {
        if (this.activity_title == '') {
          this.$message({
            message: '请填写活动标题',
            type: 'warning'
          });
        } else if (this.startDate == '') {
          this.$message({
            message: '请选择起始时间',
            type: 'warning'
          });
        } else if (this.endDate == '') {
          this.$message({
            message: '请选择结束时间',
            type: 'warning'
          });
        } else {
          if (this.wxPopscreen == true && this.wxPopscreenImgUrl == '') {
            this.$message({
              message: '请上传小程序广告弹屏图片',
              type: 'warning'
            });
          } else if (this.wxBanner == true && this.wxBannerImgUrl == '') {
            this.$message({
              message: '请上传小程序banner图片',
              type: 'warning'
            });
          } else if (this.pcPopscreen == true && this.pcPopscreenImgUrl == '') {
            this.$message({
              message: '请上传PC广告弹屏图片',
              type: 'warning'
            });
          } else if (this.pcBanner == true && this.pcBannerImgUrl == '') {
            this.$message({
              message: '请上传PC banner图片',
              type: 'warning'
            });
          } else if (this.wxPopscreen == false && this.wxBanner == false && this.pcPopscreen == false && this.pcBanner == false) {
            this.$message({
              message: '请选择投放位置',
              type: 'warning'
            });
          } else {
            let res = await this.$post("/advert/add", {
              title: this.activity_title,
              start_time: this.startDate,
              end_time: this.endDate,
              type: this.typeList.toString(),
              status: 1,
              img1: this.wxPopscreenId,
              url1: this.wxPopscreenUrl,
              img2: this.wxBannerId,
              url2: this.wxBannerUrl,
              img3: this.pcPopscreenId,
              url3: this.pcPopscreenUrl,
              img4: this.pcBannerId,
              url4: this.pcBannerUrl,
            });
            if (res.code == 200) {
              this.$message({
                message: '添加成功',
                type: 'success'
              });
              this.$router.push('/home/activityList');
            } else {
              this.$message.error(res.msg);
            };
          }
        };
      }

    },
    // 取消
    handleClickCancel() {
      this.$router.go(-1);
    }
  },
}
</script>
<style scoped>
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
.content_wrapper {
  margin-top: 20px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 4px;
}
.form_title {
  min-width: 180px;
  font-size: 16px;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  text-align: right;
  height: 40px;
  text-align: left;
}
.content_wrapper .name_wrapper {
  margin-bottom: 20px;
  line-height: 40px;
}
.content_wrapper .name_wrapper .required {
  display: inline-block;
  margin: 0 0 0 10px;
  color: #ff6010;
}
.el_input {
  width: 30%;
}
.tips_con {
  margin-left: 20px;
  color: #ff6010;
}
.configure_wrapper {
  margin-bottom: 20px;
}
.configure_wrapper .required {
  display: inline-block;
  margin: 0 0 0 10px;
  color: #ff6010;
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
.btn_wrapper {
  display: flex;
}
.btn_wrapper div {
  margin-right: 20px;
  width: 100px;
  height: 40px;
  background: #078ca9;
  border-radius: 4px;
  font-size: 18px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 40px;
  text-align: center;
}
/deep/ .el-date-editor.el-input {
  width: 100%;
}
.block {
  width: 30%;
}
</style>
