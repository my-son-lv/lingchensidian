// 企业logo
<template>
  <div class="wrapper">
    <div class="logo">
      <img :src="fileUrl" class="logo_img" />
    </div>
    <van-uploader @afterread="afterRead">
      <div class="upload_img">上传头像</div>
    </van-uploader>
    <div class="upload_img" @click="handleClickKeep">保存头像</div>
    <van-toast id="van-toast" />
  </div>
</template>

<script>
import Toast from "@/../static/vant/toast/toast";
export default {
  data() {
    return {
      fileUrl: "",
      fileId: ""
    };
  },

  components: {},

  methods: {
    async getInfoByToken() {
      let TOKEN = wx.getStorageSync("token");
      const res = await this.$httpWX.post({
        url: "/api/company/getInfoByToken",
        data: {
          token: TOKEN
        }
      });
      if (res.code == 200) {
        this.fileUrl = res.data.logo_path[0].path;
      }
    },
    // 上传
    afterRead(event) {
      let that = this;
      const { file } = event.mp.detail;
      // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
      wx.uploadFile({
        url: this.$httpWX.host + "/api/index/upload?type=0", // 仅为示例，非真实的接口地址
        filePath: file.path,
        name: "file",
        formData: {},
        success(res) {
          const data = JSON.parse(res.data);
          if (data.code == 200) {
            Toast.success("上传成功");
            that.fileUrl = data.data.path;
            that.fileId = data.data.id;
          }
        }
      });
    },
    // 保存
    async handleClickKeep() {
      let TOKEN = wx.getStorageSync("token");
      const res = await this.$httpWX.post({
        url: "/api/company/updateLogo",
        data: {
          token: TOKEN,
          logo: this.fileId
        }
      });
      if (res.code == 200) {
        wx.navigateTo({
          url: "../../pages/accountSettings/main"
        });
      } else {
        setTimeout(() => {
          Toast.fail(res.msg);
        }, 500);
      }
    }
  },
  beforeMount() {},
  onShow() {
    Object.assign(this.$data, this.$options.data());
    this.getInfoByToken();
  },
  onUnload() {}
};
</script>
<style>
page {
  background: #f5f5f5;
}
</style>
<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
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
.logo_img {
  margin: 40px 0 206px 0;
  width: 130px;
  height: 130px;
  border-radius: 50%;
}
.upload_img {
  margin-bottom: 16px;
  width: 343px;
  height: 49px;
  background: #ffffff;
  border-radius: 4px;
  border: 1px solid #dddddd;
  text-align: center;
  line-height: 49px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
}
</style>
