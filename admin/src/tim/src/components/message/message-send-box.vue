<template>
  <div id="message-send-box-wrapper" :style="focus ? { backgroundColor: 'white' } : {}" @drop="dropHandler">
    <div class="send-header-bar">
      <el-popover placement="top" width="400" trigger="click">
        <div class="emojis">
          <div v-for="item in emojiName" class="emoji" :key="item" @click="chooseEmoji(item)">
            <img :src="emojiUrl + emojiMap[item]" style="width:30px;height:30px" />
          </div>
        </div>
        <i class="iconfont icon-smile" slot="reference" title="发表情"></i>
      </el-popover>
      <!-- <i class="iconfont icon-tupian" title="发图片" @click="handleSendImageClick"></i> -->
      <!-- <i class="el-icon-camera" title="发视频" @click="handleSendVideoClick"></i> -->
      <i class="iconfont icon-wenjian" title="发文件" @click="handleSendFileClick"></i>
      <i class="el-icon-edit" title="发自定义消息" @click="sendCustomDialogVisible = true"></i>
      <i class="el-icon-notebook-2" title="常用语" @click="showCommonlyList = true"></i>
      <!-- <i class="iconfont icon-diaocha" title="小调查" @click="surveyDialogVisible = true"></i> -->
      <!-- <i class="el-icon-video-camera" v-if="currentConversationType === 'C2C'&& toAccount !== userID" title="视频通话" @click="videoCall"></i> -->
    </div>
    <div class="note_book_message" v-show="this.showCommonlyList">
      <div class="tit clearfix">
        <p class="fl">常用语</p>
        <p class="close_icon fr">
          <i class="el-icon-close" @click="showCommonlyList = false"></i>
        </p>
      </div>
      <ul>
        <li v-for="(message, index) in this.commonlyUsedList" :key="index" @click="toMessage(message.msg)">
          <p>{{ index + 1 }}.{{ message.msg }}</p>
          <i class="el-icon-delete" @click.stop="handleClickDelete(message.id)"></i>
        </li>
      </ul>
      <div class="add_bottom">
        <el-input v-model="addValue" placeholder="请输入常用语" class="fl"></el-input>
        <p class="add_btn fl" @click="handleClickAddBtn">添加</p>
      </div>
    </div>
    <el-dialog title="推荐外教" :visible.sync="sendCustomDialogVisible" width="600px" :modal="false" class="talk_dialog">
      <el-select v-model="seacherTeacherInput" placeholder="请选择" @change="customSelectChange" filterable>
        <el-option v-for="item in teacherOptions" :key="item.id" :label="item.name + ' ' + item.last_name" :value="item.id">
        </el-option>
      </el-select>
      <div class="btn_wrapper">
        <el-button @click="cancelCustom">取 消</el-button>
        <el-button type="primary" @click="sendCustomMessage()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- <el-dialog title="对IM Web demo的建议和使用感受" :visible.sync="surveyDialogVisible" width="30%">
      <el-form label-width="100px">
        <el-form-item label="评分">
          <div class="block">
            <el-rate v-model="rate" :colors="colors" show-text></el-rate>
          </div>
        </el-form-item>
        <el-form-item label="建议">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            resize="none"
            v-model="suggestion"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="surveyDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sendSurvey">确 定</el-button>
      </span>
    </el-dialog>
    <el-popover
      trigger="manual"
      v-model="showAtGroupMember"
      placement="top"
      style="max-height:500px;overflow-y:scroll;"
    >
      <el-radio-group
        v-model="atUserID"
        style="display:flex;flex-decoration: column;"
        v-for="member in memberList"
        :key="member.userID"
        @change="handleSelectAtUser"
      >
        <el-radio :label="member.userID">{{ member.nameCard || member.nick || member.userID }}</el-radio>
      </el-radio-group>
    </el-popover> -->
    <div class="bottom">
      <textarea ref="text-input" rows="4" resize="false" v-model="messageContent" class="text-input" @focus="focus = true" @blur="focus = false" @keydown.enter.exact.prevent="handleEnter" @keyup.ctrl.enter.prevent.exact="handleLine" @keydown.up.stop="handleUp" @keydown.down.stop="handleDown"></textarea>
      <el-tooltip class="item" effect="dark" content="按Enter发送消息，Ctrl+Enter换行" placement="left-start">
        <div class="btn-send" @click="sendTextMessage">
          <div class="tim-icon-send"></div>
        </div>
      </el-tooltip>
    </div>
    <input type="file" id="imagePicker" ref="imagePicker" accept=".jpg, .jpeg, .png, .gif" @change="sendImage" style="display:none" />
    <input type="file" id="filePicker" ref="filePicker" @change="sendFile" style="display:none" />
    <input type="file" id="videoPicker" ref="videoPicker" @change="sendVideo" style="display:none" accept=".mp4" />
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import {
  Form,
  FormItem,
  Input,
  Dialog,
  Popover,
  RadioGroup,
  Radio,
  Tooltip,
  Rate
} from "element-ui";
import { emojiMap, emojiName, emojiUrl } from "../../utils/emojiMap";

export default {
  name: "message-send-box",
  props: ["scrollMessageListToButtom"],
  components: {
    ElInput: Input,
    ElForm: Form,
    ElFormItem: FormItem,
    ElDialog: Dialog,
    ElPopover: Popover,
    ElRadioGroup: RadioGroup,
    ElRadio: Radio,
    ElTooltip: Tooltip,
    ElRate: Rate
  },
  data() {
    return {
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"],
      messageContent: "",
      isSendCustomMessage: false,
      sendCustomDialogVisible: false,
      surveyDialogVisible: false,
      form: {
        data: ""
      },
      rate: 5, // 评分
      suggestion: "", // 建议
      file: "",
      emojiMap: emojiMap,
      emojiName: emojiName,
      emojiUrl: emojiUrl,
      showAtGroupMember: false,
      atUserID: "",
      focus: false,
      addValue: "",
      commonlyUsedList: [],
      showCommonlyList: false,
      seacherTeacherInput: "",
      teacherOptions: [],
      sendList: []
    };
  },
  computed: {
    ...mapGetters(["toAccount", "currentConversationType"]),
    ...mapState({
      memberList: state => state.group.currentMemberList,
      userID: state => state.user.userID
    })
  },
  mounted() {
    this.$refs["text-input"].addEventListener("paste", this.handlePaste);
    this.$bus.$on("reEditMessage", this.reEditMessage);
  },
  beforeDestroy() {
    this.$refs["text-input"].removeEventListener("paste", this.handlePaste);
  },
  methods: {
    reEditMessage(payload) {
      this.messageContent = payload;
    },
    handleSelectAtUser() {
      this.messageContent += this.atUserID + " ";
      this.showAtGroupMember = false;
    },
    handleUp() {
      const index = this.memberList.findIndex(
        member => member.userID === this.atUserID
      );
      if (index - 1 < 0) {
        return;
      }
      this.atUserID = this.memberList[index - 1].userID;
    },
    handleDown() {
      const index = this.memberList.findIndex(
        member => member.userID === this.atUserID
      );
      if (index + 1 >= this.memberList.length) {
        return;
      }
      this.atUserID = this.memberList[index + 1].userID;
    },
    handleEnter() {
      if (this.showAtGroupMember) {
        this.handleSelectAtUser();
      } else {
        this.sendTextMessage();
      }
    },
    handleLine() {
      this.messageContent += "\n";
    },
    handlePaste(e) {
      let clipboardData = e.clipboardData;
      let file;
      if (
        clipboardData &&
        clipboardData.files &&
        clipboardData.files.length > 0
      ) {
        file = clipboardData.files[0];
      }

      if (typeof file === "undefined") {
        return;
      }
      // 1. 创建消息实例，接口返回的实例可以上屏
      let message = this.tim.createImageMessage({
        to: this.toAccount,
        conversationType: this.currentConversationType,
        payload: {
          file: file
        },
        onProgress: percent => {
          this.$set(message, "progress", percent); // 手动给message 实例加个响应式属性: progress
        }
      });
      this.$store.commit("pushCurrentMessageList", message);

      // 2. 发送消息
      let promise = this.tim.sendMessage(message);
      promise.catch(error => {
        this.$store.commit("showMessage", {
          type: "error",
          message: error.message
        });
      });
    },
    dropHandler(e) {
      e.preventDefault();
      let file = e.dataTransfer.files[0];
      let message = {};
      if (file.type === "video/mp4") {
        message = this.tim.createVideoMessage({
          to: this.toAccount,
          conversationType: this.currentConversationType,
          payload: {
            file: file
          },
          onProgress: percent => {
            this.$set(message, "progress", percent); // 手动给message 实例加个响应式属性: progress
          }
        });
      } else {
        message = this.tim.createFileMessage({
          to: this.toAccount,
          conversationType: this.currentConversationType,
          payload: {
            file: file
          },
          onProgress: percent => {
            this.$set(message, "progress", percent); // 手动给message 实例加个响应式属性: progress
          }
        });
      }
      this.$store.commit("pushCurrentMessageList", message);
      this.tim
        .sendMessage(message)
        .then(() => {
          this.$refs.videoPicker.value = null;
        })
        .catch(imError => {
          this.$store.commit("showMessage", {
            message: imError.message,
            type: "error"
          });
        });
    },
    sendTextMessage() {
      if (
        this.messageContent === "" ||
        this.messageContent.trim().length === 0
      ) {
        this.messageContent = "";
        this.$store.commit("showMessage", {
          message: "不能发送空消息哦！",
          type: "info"
        });
        return;
      }
      const message = this.tim.createTextMessage({
        to: this.toAccount,
        conversationType: this.currentConversationType,
        payload: { text: this.messageContent }
      });
      this.$store.commit("pushCurrentMessageList", message);
      this.$bus.$emit("scroll-bottom");
      this.tim.sendMessage(message).catch(error => {
        this.$store.commit("showMessage", {
          type: "error",
          message: error.message
        });
      });
      this.messageContent = "";
    },
    async sendCustomMessage() {
      if (this.sendList.length === 0) {
        this.$store.commit("showMessage", {
          message: "不能发送空消息",
          type: "info"
        });
        return;
      }
      
      let res = await this.$post("/teach/recommednTeach", {
        id: this.sendList[0].id,
        cid: this.toAccount,
      });
      if (res.code != 200) {
        this.$message({
          message: res.msg,
          type: "warning"
        });
        return;
      }
      const message = this.tim.createCustomMessage({
        to: this.toAccount,
        conversationType: this.currentConversationType,
        payload: {
          data: JSON.stringify(this.sendList),
          description: "推荐外教",
          extension: ""
        }
      });
      this.$store.commit("pushCurrentMessageList", message);
      this.tim.sendMessage(message).catch(error => {
        this.$store.commit("showMessage", {
          type: "error",
          message: error.message
        });
      });
      this.sendCustomDialogVisible = false;
    },
    cancelCustom() {
      this.sendCustomDialogVisible = false;
      this.seacherTeacherInput = "";
    },
    customSelectChange() {
      this.sendList = this.teacherOptions.filter(
        ele => ele.id == this.seacherTeacherInput
      );
    },
    random(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    sendSurvey() {
      const message = this.tim.createCustomMessage({
        to: this.toAccount,
        conversationType: this.currentConversationType,
        payload: {
          data: "survey",
          description: String(this.rate),
          extension: this.suggestion
        }
      });
      this.$store.commit("pushCurrentMessageList", message);
      Object.assign(this.form, {
        data: "",
        description: "",
        extension: ""
      });
      this.tim
        .sendMessage(message)
        .then(() => {
          Object.assign(this, {
            rate: 5,
            suggestion: ""
          });
        })
        .catch(error => {
          this.$store.commit("showMessage", {
            type: "error",
            message: error.message
          });
        });
      this.surveyDialogVisible = false;
    },
    chooseEmoji(item) {
      this.messageContent += item;
    },
    handleSendImageClick() {
      this.$refs.imagePicker.click();
    },
    handleSendFileClick() {
      this.$refs.filePicker.click();
    },
    handleSendVideoClick() {
      this.$refs.videoPicker.click();
    },
    videoCall() {
      this.$bus.$emit("video-call");
    },
    sendImage() {
      const message = this.tim.createImageMessage({
        to: this.toAccount,
        conversationType: this.currentConversationType,
        payload: {
          file: document.getElementById("imagePicker") // 或者用event.target
        },
        onProgress: percent => {
          this.$set(message, "progress", percent); // 手动给message 实例加个响应式属性: progress
        }
      });
      this.$store.commit("pushCurrentMessageList", message);
      this.tim
        .sendMessage(message)
        .then(() => {
          this.$refs.imagePicker.value = null;
        })
        .catch(imError => {
          this.$store.commit("showMessage", {
            message: imError.message,
            type: "error"
          });
        });
    },
    sendFile() {
      const message = this.tim.createFileMessage({
        to: this.toAccount,
        conversationType: this.currentConversationType,
        payload: {
          file: document.getElementById("filePicker") // 或者用event.target
        },
        onProgress: percent => {
          this.$set(message, "progress", percent); // 手动给message 实例加个响应式属性: progress
        }
      });
      this.$store.commit("pushCurrentMessageList", message);
      this.tim
        .sendMessage(message)
        .then(() => {
          this.$refs.filePicker.value = null;
        })
        .catch(imError => {
          this.$store.commit("showMessage", {
            message: imError.message,
            type: "error"
          });
        });
    },
    sendVideo() {
      const message = this.tim.createVideoMessage({
        to: this.toAccount,
        conversationType: this.currentConversationType,
        payload: {
          file: document.getElementById("videoPicker") // 或者用event.target
        },
        onProgress: percent => {
          this.$set(message, "progress", percent); // 手动给message 实例加个响应式属性: progress
        }
      });
      this.$store.commit("pushCurrentMessageList", message);
      this.tim
        .sendMessage(message)
        .then(() => {
          this.$refs.videoPicker.value = null;
        })
        .catch(imError => {
          this.$store.commit("showMessage", {
            message: imError.message,
            type: "error"
          });
        });
    },
    async getMessagesList() {
      let res = await this.$fetch("/message/list", {
        token: localStorage.getItem("token")
      });
      if (res.code == 200) {
        this.commonlyUsedList = res.data;
      }
    },
    async handleClickAddBtn() {
      let res = await this.$post("/message/store", {
        msg: this.addValue
      });
      if (res.code == 200) {
        this.addValue = "";
        this.getMessagesList();
      } else {
        this.$message({
          message: res.msg,
          type: "warning"
        });
        this.addValue = "";
      }
    },
    async handleClickDelete(id) {
      let res = await this.$post("/message/destroy", {
        id: id
      });
      if (res.code == 200) {
        this.$message({
          message: "删除成功",
          type: "success"
        });
        this.getMessagesList();
      }
    },
    toMessage(msg) {
      this.messageContent = msg;
      this.showCommonlyList = false;
    }
  },
  created() {
    this.getMessagesList();
    this.teacherOptions = JSON.parse(sessionStorage.getItem("allTeacherList"));
  }
};
</script>

<style lang="stylus" scoped>
#message-send-box-wrapper {
  box-sizing: border-box;
  overflow: hidden;
  padding: 3px 20px 20px 20px;
}

.emojis {
  height: 160px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow-y: scroll;
}

.emoji {
  height: 40px;
  width: 40px;
  box-sizing: border-box;
}

.send-header-bar {
  box-sizing: border-box;
  padding: 3px 0 0 0;
}

.send-header-bar i {
  cursor: pointer;
  font-size: 24px;
  color: gray;
  margin: 0 12px 0 0;
}

.send-header-bar i:hover {
  color: $black;
}

textarea {
  resize: none;
}

.text-input {
  font-size: 16px;
  width: 100%;
  box-sizing: box-sizing;
  border: none;
  outline: none;
  background-color: transparent;
}

.block {
  padding: 10px 0;
  display: flex;
  align-items: center;
}

.bottom {
  padding-top: 10px;
  position: relative;

  .btn-send {
    cursor: pointer;
    position: absolute;
    color: $primary;
    font-size: 30px;
    right: 0;
    bottom: -5px;
    padding: 6px 6px 4px 4px;
    border-radius: 50%;
  }
}

.note_book_message {
  position: absolute;
  top: 128px;
  left: 260px;
  width: 400px;
  height: 300px;
  transform-origin: center bottom;
  z-index: 2002;
  background: #FFF;
  min-width: 150px;
  border: 1px solid #EBEEF5;
}

.note_book_message li {
  position: relative;
  padding: 10px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}

.note_book_message li p {
  width: 350px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.note_book_message li i {
  position: absolute;
  right: 6px;
  top: 12px;
}

.note_book_message .add_bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  border-top: 1px solid #eee;
  text-align: center;
}

.note_book_message .tit {
  padding: 0 10px;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #eee;
}

.note_book_message .close_icon {
  cursor: pointer;
}

.clearfix:after {
  content: '';
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

/deep/ .el-input {
  margin: 10px 0 0 10px;
  width: 300px;
}

/deep/ .el-input__inner {
  width: 300px;
}

.add_btn {
  margin: 10px 0 0 5px;
  width: 60px;
  height: 38px;
  line-height: 40px;
  text-align: center;
  background: rgba(7, 140, 169, 1);
  border-radius: 4px;
  cursor: pointer;
}

.note_book_message ul {
  height: 198px;
  overflow-y: scroll;
}

.note_book_message ul li:hover {
  background: #eee;
}

/deep/ .talk_dialog .el-dialog {
  margin-top: 0 !important;
  position: fixed;
  bottom: 19%;
  right: 12%;
}

/deep/ .talk_dialog .el-select__tags {
  position: absolute;
  top: 60%;
  left: 20px;
}

.right_company {
  margin: 20px 0 0 10px;
  padding: 20px;
  width: 90%;
  height: 300px;
  border: 1px solid #eee;
  border-radius: 5px;
  overflow-y: scroll;
}

.right_company .throw_item {
  float: left;
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 5px;
  background: rgba(216, 216, 216, 0);
  border-radius: 4px;
  border: 1px solid #078CA9;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #078CA9;
  cursor: pointer;
}

.btn_wrapper {
  margin-left: 10px;
  margin-top: 20px;
}

/deep/ .talk_dialog .el-dialog__headerbtn .el-dialog__close {
  display: none;
}
</style>
