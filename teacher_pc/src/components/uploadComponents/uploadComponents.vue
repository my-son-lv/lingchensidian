<template>
  <div class="clearfix">
    <el-upload
      v-if="hideUpload == true"
      action
      list-type="picture-card"
      :show-file-list="false"
      :auto-upload="false"
      :on-change="uploadChange"
      v-loading="isloading"
      class="fl"
    >
      <div class="upload_wrapper">
        <img src="../../assets/image/upload_icon.png" class="upload_icon" />
        <p class="upload_tips" v-if="type == 0">
          Only jpg/png/jpeg, less than 8MB
        </p>
        <p class="upload_tips" v-if="type == 1">
          MP4 AVI 3GP MOV RMVB RM FLV, Less than 50M
        </p>
        <p class="upload_tips" v-if="type == 2">
          Only pdf/docx/doc，Less than 50M
        </p>
      </div>
    </el-upload>
    <div class="img_wrapper" v-if="this.type == 0 && uploadImgUrl">
      <img class="lside_img" :src="uploadImgUrl" />
      <img
        src="../../assets/image/right_close_icon.png"
        class="close_icon"
        @click="handleClickCloseImg"
      />
    </div>
    <video
      :src="videoUrl"
      class="video"
      controls="controls"
      v-if="this.type == 1 && videoUrl"
    ></video>
    <div v-if="this.type == 2 && notesName" class="right_test_wrapper fl">
      <div
        class="right_test_item"
        v-for="(name, index) in notesName"
        :key="index"
      >
        {{ name.file_name }}
        <img
          src="../../assets/image/delete_icon.png"
          class="delete_icon"
          @click="handleClickDeleteNotes(index)"
        />
      </div>
    </div>
    <el-dialog
      title="Picture Clipping"
      :visible.sync="dialogVisible"
      append-to-body
    >
      <div class="cropper-content">
        <div class="cropper" style="text-align: center">
          <vueCropper
            ref="cropper"
            :img="option.img"
            :outputSize="option.size"
            :outputType="option.outputType"
            :info="true"
            :full="option.full"
            :canMove="option.canMove"
            :canMoveBox="option.canMoveBox"
            :original="option.original"
            :autoCrop="option.autoCrop"
            :fixed="option.fixed"
            :fixedNumber="option.fixedNumber"
            :centerBox="option.centerBox"
            :infoTrue="option.infoTrue"
            :fixedBox="option.fixedBox"
          ></vueCropper>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handleClickConfirm"
          >Confirm</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from "../../apis/http";
import { VueCropper } from "vue-cropper";
export default {
  props: ["type", "getImgUrl", "getNotesName", "limit", "getVideoUrl", "cert"],
  components: {
    VueCropper
  },
  data() {
    return {
      hideUpload: true,
      uploadImgUrl: "",
      dialogVisible: false,
      option: {
        img: "", // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 1, // 裁剪生成图片的质量
        outputType: "png", // 裁剪生成图片的格式
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 300, // 默认生成截图框宽度
        autoCropHeight: 300, // 默认生成截图框高度
        fixedBox: true, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [5, 5], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: false, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      },
      isloading: false,
      videoId: "",
      videoUrl: "",
      notesId: "",
      notesName: []
    };
  },
  watch: {
    getImgUrl(val) {
      this.uploadImgUrl = val;
      if (this.uploadImgUrl) {
        this.hideUpload = false;
      }
    },
    getNotesName(val) {
      this.notesName = val;
    },
    getVideoUrl(val) {
      this.videoUrl = val;
    }
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    //   上传验证
    uploadChange(file) {
      var that = this;
      // 图片
      if (this.type == 0) {
        const isTypeTrue = /^image\/(jpeg|png|jpg)$/.test(file.raw.type);
        const isLt5M = file.size / 1024 / 1024 < 8;
        if (!isTypeTrue) {
          that.$message.error("Only jpg/png/jpeg");
          return;
        }
        if (!isLt5M) {
          that.$message.error("less than 8MB!");
          return;
        }
        // 上传成功后将图片地址赋值给裁剪框显示图片
        this.$nextTick(() => {
          that.option.img = file.url;
          that.dialogVisible = true;
        });
      }
      // 视频
      if (this.type == 1) {
        const isLt5M = file.size / 1024 / 1024 < 50;
        const fileSuffix = file.name.substring(file.name.lastIndexOf(".") + 1);
        const whiteList = ["mp4", "avi", "3gp", "mov", "rmvb", "rm", "flv"];
        if (whiteList.indexOf(fileSuffix) === -1) {
          that.$message.error("Only MP4/AVI/3GP/MOV/RMVB/RM/FLV");
          return;
        }
        if (!isLt5M) {
          that.$message.error("less than 50M!");
          return;
        }
        that.isloading = true;
        const instance = axios.create();
        let uploadFile = new FormData();
        uploadFile.append("file", file.raw);
        uploadFile.append("type", 1);
        instance.post("/api/index/upload", uploadFile).then(res => {
          if (res.data.code == 200) {
            that.isloading = false;
            that.videoId = res.data.data.id;
            that.videoUrl = res.data.data.path;
            this.$emit("uploadVideoId", res.data.data.id);
          }
        });
      }
      // 文档
      if (this.type == 2) {
        if (this.notesName.length >= 1) {
          that.$message.error("Maximum 1 lines");
          return;
        }
        const isLt5M = file.size / 1024 / 1024 < 50;
        const fileSuffix = file.name.substring(file.name.lastIndexOf(".") + 1);
        const whiteList = ["pdf", "doc", "docx", "jpeg", "png", "jpg"];
        if (whiteList.indexOf(fileSuffix) === -1) {
          that.$message.error("Only pdf/docx/doc/jpeg/png/jpg");
          return;
        }
        if (!isLt5M) {
          that.$message.error("less than 50M!");
          return;
        }
        that.isloading = true;
        const instance = axios.create();
        let uploadFile = new FormData();
        uploadFile.append("file", file.raw);
        uploadFile.append("type", 2);
        instance.post("/api/index/upload", uploadFile).then(res => {
          if (res.data.code == 200) {
            that.isloading = false;
            that.notesId = res.data.data.id;
            that.notesName.push(res.data.data);
            this.$emit("uploadNotesId", res.data.data.id);
          }
        });
      }
    },
    // 删除图片
    handleClickCloseImg() {
      this.hideUpload = true;
      this.uploadImgUrl = "";
    },
    // 裁剪图片
    handleClickConfirm() {
      var that = this;
      this.$refs.cropper.getCropBlob(data => {
        const instance = axios.create();
        let uploadFile = new FormData();
        uploadFile.append("file", data, "a.png");
        uploadFile.append("type", 0);
        instance.post("/api/index/upload", uploadFile).then(res => {
          if (res.data.code == 200) {
            that.dialogVisible = false;
            that.hideUpload = false;
            that.uploadImgUrl = res.data.data.path;
            this.$emit("uploadImgId", res.data.data.id);
          }
        });
      });
    },
    // 删除简历
    handleClickDeleteNotes(index) {
      this.notesName.splice(index, 1);
      this.$emit("notesName", this.notesName);
    }
  }
};
</script>
<style scoped>
/deep/ .el-upload--picture-card {
  padding: 34px 24px;
  width: 180px;
  height: 180px;
  background: #f8f8f8;
  border-radius: 10px;
  border: 1px dashed #cccccc;
  box-sizing: border-box;
}
.upload_wrapper {
  width: 100%;
  height: 100%;
}
.upload_wrapper .upload_icon {
  margin: 0 auto;
  width: 60px;
  height: 60px;
}
.upload_wrapper .upload_tips {
  margin-top: 20px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  line-height: 16px;
  text-align: center;
}
.img_wrapper {
  position: relative;
  width: 180px;
  height: 180px;
}
.img_wrapper .lside_img {
  width: 180px;
  height: 180px;
  border-radius: 10px;
  border: 1px dashed #cccccc;
  box-sizing: border-box;
}
.img_wrapper .close_icon {
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
  height: 20px;
  cursor: pointer;
}
/* 截图 */
.cropper-content .cropper {
  width: auto;
  height: 300px;
}
.video {
  position: absolute;
  top: 0;
  right: 180px;
  height: 180px;
}
.right_test_wrapper {
  margin-left: 20px;
}
.right_test_item {
  position: relative;
  margin-bottom: 10px;
  padding: 0 10px;
  min-width: 180px;
  max-width: 400px;
  height: 40px;
  background: #f8f8f8;
  border-radius: 4px;
  border: 1px solid #cccccc;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #cccccc;
  line-height: 40px;
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
}
.right_test_item .delete_icon {
  position: absolute;
  top: 0;
  right: 0;
  width: 16px;
  height: 16px;
  cursor: pointer;
}
</style>
