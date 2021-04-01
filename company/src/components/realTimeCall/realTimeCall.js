//导入sdk
import TRTC from "trtc-js-sdk";
import Bus from '../../tools/bus'
export default {
  name: "realTimeCall",
  data() {
    return {
      roomId: "", //房间号--加入相同房间才能聊
      client: "", //客户端服务
      remoteStream: "", //远方播放流
      localStream: "", //本地流
      urlType: "",
      showAudioType: false,
      teacherName: "",
      adviserName: null,
      userId: ''
    };
  },

  methods: {
    //创建链接
    createClient(userId) {
      //获取签名
      const config = this.genTestUserSig(userId);
      const sdkAppId = this.$route.params.sdkId;
      const userSig = this.$route.params.userSig;
      console.log(sdkAppId + '.....' + '....' + userSig + '.....' + userId);
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
        .join({
          roomId
        })
        .catch(error => {
          // console.error("进房失败 " + error);
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
          // console.error("初始化本地流失败 " + error);
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
          // console.error("本地流发布失败 " + error);
        })
        .then(() => {
          // if (this.adviserName == null) {
          //   this.$message('您的顾问正在前往房间，请在当前页面等候')
          // }
        });
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
        console.log(user_id)
        let type = parseInt(user_id.substr(0, 1));
        // 右下角
        // if (type == 1) {
          var el = document.getElementById('companyStream_1');
          var childs = el.childNodes;
          for (var i = childs.length - 1; i >= 0; i--) {
            el.removeChild(childs[i]);
          }
          this.$refs.companyStream.appendChild(videoDiv);
          this.adviserName = user_id.substr(2, user_id.length - 2);
        // }
        // 大屏
        // if (type == 3) {
          var el = document.getElementById('candidateVideo_1');
          var childs = el.childNodes;
          for (var i = childs.length - 1; i >= 0; i--) {
            el.removeChild(childs[i]);
          }
          this.$refs.candidateVideoWrap.appendChild(videoDiv);
          this.teacherName = user_id.substr(2, user_id.length - 2);
        // }
        //播放
        this.$nextTick(() => {
          remoteStream.play(remoteId);
        });
      });
      this.shotOffRoom(this.client);
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
      let res = await this.$post("inerview/closeRoome", {
        room_id: this.roomId
      });
      if (res.code === 200) {
        localStorage.setItem('endMask',true)
        this.$router.go(-1);
      }
      // localStorage.setItem('endMask',true)
      // this.$router.go(-1);
    },
    handleClickCloseAudio() {
      this.showAudioType = true;
      this.localStream.muteAudio();
    },
    handleClickOpenAudio() {
      this.showAudioType = false;
      this.localStream.unmuteAudio();
    },
    shotOffRoom(client) {
      client.on("client-banned", err => {
        this.$router.go(-1);
        setTimeout(() => {
          Bus.$emit('endMask', true)
        }, 1000)
      });
    }
  },
  created() {
    this.roomId = this.$route.params.roomId;
    this.urlType = this.$route.params.type;
    this.userId = this.$route.params.user_id;
  },
  mounted() {
    //测试用，所以直接创建了，其他需求可自行更改
    this.createClient(this.userId);
  },
  destroyed() {
    this.leaveRoom(this.client);
  }
};
