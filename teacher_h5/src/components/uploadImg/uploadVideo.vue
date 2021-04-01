<!--  -->
<template>
  <div class>
    <van-uploader
      accept="video/*"
      v-model="fileList"
      :max-count="limit"
      :preview-size="90"
      upload-text="Upload Video"
      :before-read="beforeRead"
      :after-read="afterRead"
    />
  </div>
</template>

<script>
import { Toast } from "vant";
import axios from "../../apis/http";
export default {
  name: "uplaodVideo",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: ["limit", "fileListArr"],
  data() {
    //这里存放数据
    return {
      fileList: [],
      videoUrl: "",
      progressValue: "",
      timer: null
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 限制大小
    beforeRead(file) {
      if (file.size / 1024 > 50 * 1024 * 1024) {
        Toast("less than 50M!");
        return false;
      }
      return true;
    },
    // 上传头像
    afterRead(file) {
      let that = this;
      const instance = axios.create();
      const formData = new FormData();
      formData.append("file", file.file);
      instance
        .post("api/index/upload?type=1", formData, {
          timeout: 1000 * 60 * 2,
          onUploadProgress: function(progressEvent) {
            that.progressValue =
              ((progressEvent.loaded / progressEvent.total) * 100) | 0;
            that.$emit("progressValue", that.progressValue);
          }
        })
        .then(res => {
          const result = res.data;
          if (result.code == 200) {
            that.videoUrl = result.data.id;
            that.progressValue = 100;
            that.$emit("videoUrl", that.videoUrl, that.progressValue);
          }
        });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.fileList = this.fileListArr;
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {}
};
</script>
<style scoped>
/deep/ .van-uploader__upload {
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  border: 1px solid rgba(221, 221, 221, 1);
}
/deep/ .van-uploader__upload-icon {
  font-size: 48px;
}
/deep/ .van-uploader__file {
  border: 1px solid rgba(221, 221, 221, 1);
}
</style>