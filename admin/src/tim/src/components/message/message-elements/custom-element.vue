<template>
  <message-bubble :isMine="isMine" :message="message">
    <div class="custom-element-wrapper">
      <div class="survey" v-if="this.payload.data === 'survey'">
        <div class="title">对IM DEMO的评分和建议</div>
        <el-rate v-model="rate" disabled show-score text-color="#ff9900" score-template="{value}">
        </el-rate>
        <div class="suggestion">{{ this.payload.extension }}</div>
      </div>
      <div class="text" v-else>
        <div v-for="(customMsg, id) in customList" :key="id" class="message_item" @click="handleClickCustom(customMsg.id,customMsg.mid)">
          <div class="message_top">
            <img :src="
                customMsg.photos_path == null
                  ? '/static/images/man.png'
                  : customMsg.photos_path.path
              " class="teacher_img" />
            <p class="message_con">
              给您推荐了合适您的优质外教
            </p>
          </div>
          <div class="btn_wrapper">立即查看</div>
        </div>
      </div>
    </div>
  </message-bubble>
</template>

<script>
import MessageBubble from "../message-bubble";
import { Rate } from "element-ui";
import { ACTION } from "../../../utils/trtcCustomMessageMap";
import { formatDuration } from "../../../utils/formatDuration";

export default {
  name: "CustomElement",
  props: {
    payload: {
      type: Object,
      required: true
    },
    message: {
      type: Object,
      required: true
    },
    isMine: {
      type: Boolean
    }
  },
  data() {
    return {
      customList: []
    };
  },
  components: {
    MessageBubble,
    ElRate: Rate
  },
  created() {
    if (this.payload.description == "推荐外教") {
      this.customList = JSON.parse(this.payload.data);
    }
  },
  computed: {
    text() {
      return this.translateCustomMessage(this.payload);
    },
    rate() {
      return parseInt(this.payload.description);
    }
  },
  methods: {
    translateCustomMessage(payload) {
      let videoPayload = {};
      try {
        videoPayload = JSON.parse(payload.data);
      } catch (e) {
        videoPayload = {};
      }
      if (payload.data === "group_create") {
        return `${payload.extension}`;
      }
      switch (videoPayload.action) {
        case ACTION.VIDEO_CALL_ACTION_DIALING:
          return "[请求通话]";
        case ACTION.VIDEO_CALL_ACTION_SPONSOR_CANCEL:
          return "[取消通话]";
        case ACTION.VIDEO_CALL_ACTION_REJECT:
          return "[拒绝通话]";
        case ACTION.VIDEO_CALL_ACTION_SPONSOR_TIMEOUT:
          return "[无应答]";
        case ACTION.VIDEO_CALL_ACTION_ACCEPTED:
          return "[开始通话]";
        case ACTION.VIDEO_CALL_ACTION_HANGUP:
          return `[结束通话，通话时长：${formatDuration(
            videoPayload.duration
          )}]`;
        case ACTION.VIDEO_CALL_ACTION_LINE_BUSY:
          return "[正在通话中]";
        case ACTION.VIDEO_CALL_ACTION_ERROR:
          return "[设备异常]";
      }
    },
    // 点击跳转
    handleClickCustom(id, mid) {
      this.$router.push({
        path: '/home/teachinfo',
        query: {
          id: id,
          mid: mid
        }
      })
    }
  }
};
</script>

<style lang="stylus" scoped>
.text {
  font-weight: bold;
}

.message_item {
  padding: 12px 10px 0 8px;
  width: 220px;
  height: 114px;
  background: #FFFFFF;
  border-radius: 4px;
  cursor: pointer;
}

.message_top {
  display: flex;
  height: 80px;
  border-bottom: 1px solid #EEEEEE;
}

.teacher_img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.message_con {
  margin-left: 12px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  line-height: 24px;
}

.btn_wrapper {
  width: 100%;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #078CA9;
  text-align: center;
  line-height: 30px;
}

.title {
  font-size: 16px;
  font-weight: 600;
  padding-bottom: 10px;
}

.survey {
  background-color: white;
  color: black;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.suggestion {
  padding-top: 10px;
  font-size: 14px;
}
</style>
