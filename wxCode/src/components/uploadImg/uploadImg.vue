<!-- 上传图片 -->
<template>
  <div class>
    <van-uploader :max-count="1" @afterread="afterRead" >
      <div class="upload_img" v-show="showUploadImg == true">
        <van-icon name="plus" color="#DDDDDD" size="50px" class="add_icon" />
        <p class="click_tips">点击上传图片</p>
      </div>
    </van-uploader>
    <div class="upload_success_img" v-show="showUploadImg == false">
      <img :src="fileUrl" class="show_img" />
      <van-icon
        name="clear"
        size="20"
        class="clear_icon"
        color="#333"
        @click="handleClickDeleteImg"
      />
    </div>
    <van-toast id="van-toast" />
  </div>
</template>

<script>
import Toast from "@/../static/vant/toast/toast";
export default {
  props: {
    businessUrl: {
      type: String,
      default: "",
    },
    isTrue: {
      type: String,
      default: "",
    },
  },
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      fileUrl: "",
      showUploadImg: true,
      ImgKey: "",
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
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
            that.showUploadImg = false;
            that.$emit("uploadBusinessId", data.data.id);
          }
        },
      });
    },
    // 删除图片
    handleClickDeleteImg() {
      let that = this;
      that.showUploadImg = true;
      that.fileUrl = "";
      that.$emit("uploadBusinessId", "");
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    
  },
  onLoad() {
    if (!this.businessUrl && !this.isTrue) {
      return;
    } else {
      this.fileUrl = this.businessUrl;
      this.showUploadImg = this.isTrue;
    }
  },
  oshow() {
    
  },
  watch: {
    
  },
};
</script>
<style scoped>
.upload_wrapper .upload_img {
  position: relative;
  width: 165px;
  height: 165px;
  background: rgba(248, 248, 248, 1);
  border-radius: 8px;
}
.upload_img .add_icon {
  position: absolute;
  top: 42px;
  left: 62px;
}
.upload_img .click_tips {
  position: absolute;
  bottom: 42px;
  left: 47px;
  width: 72px;
  height: 17px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 17px;
}
.upload_success_img {
  position: relative;
  margin-top: -20px;
  width: 165px;
  height: 165px;
  background: rgba(248, 248, 248, 1);
  border-radius: 8px;
}
.upload_success_img .show_img {
  width: 100%;
  height: 100%;
}
.upload_success_img .clear_icon {
  position: absolute;
  top: 0;
  right: 0;
}
</style>