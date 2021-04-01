<!--  -->
<template>
  <div class>
    <van-uploader v-model="fileList" :max-count="limit" :preview-size="90" icon="plus" upload-text="Upload" :before-read="beforeRead" :after-read="afterRead" :preview-full-image="false" />
  </div>
</template>

<script>
import { Toast } from "vant";
import axios from "../../apis/http";
export default {
  name: "uplaodImg",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: ["limit", "fileListArr"],
  data() {
    //这里存放数据
    return {
      fileList: [],
      avatar: ""
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
      if (
        file.type !== "image/jpeg" &&
        file.type !== "image/png" &&
        file.type !== "image/jpg"
      ) {
        Toast("Only jpg/png/jpeg");
        return false;
      } else if (file.size / 1024 > 8000) {
        Toast("less than 8M!");
        return false;
      }
      return true;
    },
    // 上传头像
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      const instance = axios.create();
      const formData = new FormData();
      formData.append("file", file.file);
      instance
        .post("/api/index/upload", formData)
        .then(res => {
          const result = res.data;
          if (result.code == 200) {
            this.avatar = result.data.id;
            this.$emit("avatarUrl", this.avatar);
          }
        });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.fileList = this.fileListArr;
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() { }
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
/deep/ .van-uploader__preview-image {
  border: 1px solid rgba(221, 221, 221, 1);
}
</style>