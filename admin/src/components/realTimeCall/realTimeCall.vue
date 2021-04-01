<!--  -->
<template>
  <div class="wrapper">
    <div class="title_top">
      <div class="candidate_name">
        {{teacherName}}
        <span>候选人</span>
      </div>
    </div>
    <div class="center-page">
      <div class="join_wrapper">
        <div ref="candidateVideoWrap" class="distant-stream_video" id="teach"></div>
      </div>
      <div class="rside">
        <div class="ride_top">
          <div id="local_stream" class="local-stream">
          </div>
          <div class="item_title">
            {{name}}
            <span>招聘顾问</span>
          </div>
        </div>
        <div class="ride_bottom">
          <div ref="companyStream" class="company-stream" id="company"></div>
          <div class="item_title">
            {{companyName}}
            <span>招聘企业</span>
          </div>
        </div>
      </div>
    </div>

    <div class="btn_wrapper">
      <div class="close" @click="handleClickClose">
        <img src="../../assets/image/close.png" />挂断
      </div>
      <div class="close_audio" @click="handleClickCloseAudio" v-show="this.showAudioType == false">
        <i class="el-icon-turn-off-microphone"></i>开启静音
      </div>
      <div class="open_audio" @click="handleClickOpenAudio" v-show="this.showAudioType == true">
        <i class="el-icon-microphone"></i>关闭静音
      </div>
    </div>
  </div>
</template>

<script>
//导入sdk
import TRTC from "trtc-js-sdk";
export default {
  data() {
    return {
      roomId: 7, //房间号--加入相同房间才能聊
      client: "", //客户端服务
      remoteStream: "", //远方播放流
      localStream: "", //本地流
      urlType: "",
      name: "",
      teacherName: "",
      companyName: "",
      showAudioType: false,
      userId: ''
    };
  },
  name: "realTimeCall",
  methods: {
    //创建链接
    createClient(userId) {
      //获取签名
      const config = this.genTestUserSig(userId);
      const sdkAppId = this.$route.params.sdkId;
      const userSig = this.$route.params.userSig;
      this.client = TRTC.createClient({
        mode: "videoCall",
        sdkAppId,
        userId,
        userSig
      });
      //注册远程监听，要放在加入房间前--这里用了发布订阅模式
      this.subscribeStream(this.client);
      //初始化后才能加入房间
      this.joinRoom(this.client, this.roomId);
    },
    //加入房间
    joinRoom(client, roomId) {
      client
        .join({ roomId })
        .catch(error => {
          console.error("进房失败 " + error);
        })
        .then(() => {
          //创建本地流
          this.createStream(this.userId);
          //播放远端流
          this.playStream(this.client);
        });
    },

    //创建本地音视频流
    createStream(userId) {
      const localStream = TRTC.createStream({
        userId,
        audio: true,
        video: true
      });
      this.localStream = localStream;

      localStream
        .initialize()
        .catch(error => {
          console.error("初始化本地流失败 " + error);
        })
        .then(() => {
          // 创建好后才能播放 本地流播放 local_stream 是div的id
          localStream.play("local_stream");
          //创建好后才能发布
          this.publishStream(localStream, this.client);
        });
    },

    //发布本地音视频流
    publishStream(localStream, client) {
      client
        .publish(localStream)
        .catch(error => {
          console.error("本地流发布失败 " + error);
        })
        .then(() => { });
    },

    //订阅远端流--加入房间之前
    subscribeStream(client) {
      client.on("stream-added", event => {
        const remoteStream = event.stream;
        //订阅远端流
        client.subscribe(remoteStream);
      });
    },

    //播放远端流
    playStream(client) {
      client.on("stream-subscribed", event => {
        const remoteStream = event.stream;
        const remoteId = "remote" + remoteStream.getId();

        const videoDiv = document.createElement("div");
        videoDiv.id = remoteId;
        videoDiv.style.width = "100%";
        videoDiv.style.height = "100%";
        videoDiv.style.marginBottom = "60px";
        videoDiv.className = "remoteVidwo";

        let user_id = event.stream.userId_;

        let type = parseInt(user_id.substr(0, 1));
        if (type == 3) {
          var el = document.getElementById("teach");
          var childs = el.childNodes;
          for (var i = childs.length - 1; i >= 0; i--) {
            el.removeChild(childs[i]);
          }

          this.$refs.candidateVideoWrap.appendChild(videoDiv);
          this.teacherName = user_id.substr(2, user_id.length - 2);
        }
        if (type == 2) {
          var el = document.getElementById("company");
          var childs = el.childNodes;
          for (var i = childs.length - 1; i >= 0; i--) {
            el.removeChild(childs[i]);
          }

          this.$refs.companyStream.appendChild(videoDiv);
          this.companyName = user_id.substr(2, user_id.length - 2);
        }

        if (type == 1) {
          this.$message.error("已有其他顾问加入");
          this.$router.go(-1);
        }

        //播放
        this.$nextTick(() => {
          remoteStream.play(remoteId);
        });
      });
    },

    //退出音视频
    leaveRoom(client) {
      client
        .leave()
        .then(() => {
          // 停止本地流，关闭本地流内部的音视频播放器
          this.localStream.stop();
          // 关闭本地流，释放摄像头和麦克风访问权限
          this.localStream.close();
          this.localStream = null;
          this.client = null;
          // 退房成功，可再次调用client.join重新进房开启新的通话。
        })
        .catch(error => {
          // 错误不可恢复，需要刷新页面。
        });
    },

    //获取用户签名--前端测试用
    genTestUserSig(userID) {
      const SDKAPPID = this.$route.params.sdkId;

      const EXPIRETIME = 604800;

      const SECRETKEY = this.$route.params.userSig;
    },
    async handleClickClose() {
      let res = await this.$post("interview/closeRoome", {
        room_id: this.roomId
      });
      if (res.code === 200) {
        this.$router.go(-1);
      }
    },
    handleClickCloseAudio() {
      this.showAudioType = true;
      this.localStream.muteAudio();
    },
    handleClickOpenAudio() {
      this.showAudioType = false;
      this.localStream.unmuteAudio();
    }
  },
  created() {
    this.roomId = this.$route.params.roomId;
    this.urlType = this.$route.params.type;
    this.userId = this.$route.params.user_id;
    this.name = this.$route.params.user_id.substr(
      2,
      this.$route.params.user_id.length - 2
    );
  },
  mounted() {
    //测试用，所以直接创建了，其他需求可自行更改
    this.createClient(this.userId);
  },
  destroyed() {
    this.leaveRoom(this.client);
  }
};
</script>
<style scoped>
.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}
.rside {
  padding-top: 60px;
  width: 50%;
}
.company-stream {
  width: 100%;
  height: 100%;
}
.local-stream {
  width: 100%;
  height: 100%;
}
.distant-stream_video {
  width: 100%;
  height: 100%;
}
.title_top {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: rgba(51, 51, 51, 1);
}
.candidate_name {
  margin-left: 40px;
  font-size: 18px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 60px;
  letter-spacing: 1px;
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
.join_wrapper {
  padding-top: 60px;
  width: 50%;
}
.candidate_name span {
  margin-left: 20px;
  padding: 4px 10px;
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 20px;
  letter-spacing: 1px;
  text-align: center;
}
.item_title {
  padding-left: 40px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 40px;
  background: #333;
}
.item_title span {
  margin-left: 10px;
  padding: 2px 10px;
  display: inline-block;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  background: rgba(255, 255, 255, 0.2);
  line-height: 20px;
}
.btn_wrapper {
  display: flex;
  position: absolute;
  left:30%;
  bottom:20px;
}
.close {
  margin-right: 15px;
  width: 80px;
  height: 32px;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 4px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 32px;
  text-align: center;
  cursor: pointer;
}
.close_audio {
  width: 100px;
  height: 32px;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 4px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 32px;
  text-align: center;
  cursor: pointer;
}
.close img {
  margin: 10px 10px -4px 0;
  width: 16px;
  height: 16px;
}
.close_audio i {
  margin: 10px 10px -4px 0;
  width: 16px;
  height: 16px;
}
.open_audio {
  position: fixed;
  bottom: 45px;
  left: 50%;
  width: 100px;
  height: 32px;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 4px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 32px;
  text-align: center;
  cursor: pointer;
}
.center-page {
  display: flex;
  width: 100%;
  height: 100%;
}
.ride_top,
.ride_bottom {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 50%;
}
</style>