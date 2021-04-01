<template>
  <div class="chat" id="chat" :style="{ paddingBottom: isIphoneX ? (safeBottom + 70) + 'px': '70px' }">
    <i-modal title="提示" i-class="custom-modal" :visible="revokeModal" @ok="handleRevokeMessage" @cancel="revokeModal = false">
      <div class="custom-wrapper">
        确定要撤回本消息吗？
      </div>
    </i-modal>
    <div id="list" @click="loseFocus" class="list_wrapper">
      <li v-for="(message, index) in currentMessageList" :key="message.ID" :id="message.ID">
        <!--        系统消息-->
        <div class="notice" v-if="message.type === 'TIMGroupTipElem' || message.type === 'TIMGroupSystemNoticeElem'">
          <div class="content">
            <span v-for="(div, index1) in message.virtualDom" :key="message.ID + index1">
              <span v-if="div.name === 'groupTip' || 'system'">{{div.text}}</span>
            </span>
          </div>
        </div>
        <!--        撤回的消息-->
        <div v-else-if="message.isRevoked" :key="message.ID">
          <div class="notice">
            <div class="content">
              <template v-if="message.from === myInfo.userID">你撤回了一条消息</template>
              <template v-else>{{message.from}}撤回了一条消息</template>
            </div>
            <template v-if="message.from === myInfo.userID">
              <div v-if="(currentTime - message.time < 120) && message.type === 'TIMTextElem'" @click="reEdit(message)" class="re-edit">重新编辑</div>
            </template>
          </div>
        </div>
        <!--        非系统消息-->
        <div v-else :class="(message.flow === 'out') ? 'item-right' : 'item-left'">
          <div class="content">
            <div class="name">
              <template v-if="currentConversation.type === 'C2C'">
                <template v-if="message.flow === 'in'">
                  {{currentConversation.userProfile.nick || currentConversation.userProfile.userID}}
                </template>
                <template v-else>
                  {{myInfo.nick || myInfo.userID}}
                </template>
              </template>
              <template v-else>
                {{message.nameCard || message.nick || message.from}}
              </template>
            </div>
            <div class="wrapper" @longpress="handleMessage(message)">
              <div class="name read-receipts" v-if="currentConversation.type === 'C2C' && message.from === myInfo.userID">
                <template v-if="message.isPeerRead">已读</template>
                <template v-else>未读</template>
              </div>
              <div class="load" @click="handleResend(message)" v-if="message.from === myInfo.userID">
                <div :class="message.status">
                </div>
              </div>
              <div class="message" v-if="message.type === 'TIMTextElem'">
                <div class="text-message">
                  <span v-for="(div, index2) in message.virtualDom" :key="message.ID + index2">
                    <span v-if="div.name === 'span'">{{div.text}}</span>
                    <image v-if="div.name === 'img'" :src="div.src" style="width:20px;height:20px;" />
                  </span>
                </div>
              </div>
              <image class="image-message" v-else-if="message.type === 'TIMImageElem'" :src="message.payload.imageInfoArray[1].url" mode='widthFix' @click="previewImage(message.payload.imageInfoArray[1].url)" />
              <div class="message" v-else-if="message.type === 'TIMFileElem'">
                <div class="file" @click="handleDownload(message.payload)">
                  <i-avatar src="/static/images/file.png" size="large" shape="square" />
                  <div>{{message.payload.fileName}}</div>
                </div>
              </div>
              <div class="message" v-else-if="message.type === 'TIMCustomElem'">
                <div v-if="message.payload.data === 'survey'" class="survey">
                  <div class="title">
                    对IM DEMO的评分和建议
                  </div>
                  <div class="description">
                    <i-rate disabled="true" :value="message.payload.description">
                    </i-rate>
                  </div>
                  <div class="suggestion">
                    <div>{{message.payload.extension}}</div>
                  </div>
                </div>
                <div v-else-if="message.payload.data === 'group_create'">
                  <div>{{message.payload.extension}}</div>
                </div>
                <div v-else-if="message.virtualDom[0].name === 'videoCall'" class="custom-elem">
                  <div>{{message.virtualDom[0].text}}</div>
                </div>
                <div v-else class="custom-elem">
                  <div class="custom_wrapper" v-if="message.payload.description == '推荐外教'" @click="handleClickLook(message.payload.data[0].id,message.payload.data[0].mid)">
                    <div class="custom_top">
                      <img v-if="message.payload.data[0].photos_path != null" class="lside_img" :src="message.payload.data[0].photos_path.path" />
                      <img :src="message.payload.data[0].sex == 0 ? '/static/images/man.png' : '/static/images/woman.png'" class="lside_img" v-else />
                      <p class="custom_con">给您推荐了合适您的优质外教</p>
                    </div>
                    <div class="custom_btn">
                      立即查看
                    </div>
                  </div>
                </div>
              </div>
              <div class="message" v-else-if="message.type === 'TIMSoundElem'" :url="message.payload.url">
                <div class="box" @click="openAudio(message.payload)">
                  <image src="/static/images/audio-play.png" style="height:22px;width:22px" />
                  <div style="padding-left: 4px;">{{message.payload.second}}s</div>
                </div>
              </div>
              <div class="message" v-else-if="message.type === 'TIMFaceElem'">
                <div class="custom-elem">
                  <image :src="message.payload.data.indexOf('@') > 0 ? faceUrl + message.payload.data + '.png' : faceUrl + message.payload.data + '@2x.png'" style="height:90px; width:90px" />
                </div>
              </div>
              <div class="message" v-else-if="message.type === 'TIMVideoFileElem'">
                <video :src="message.payload.videoUrl" class="video" :poster="message.payload.thumbUrl" object-fit="contain" @error="videoError"></video>
              </div>
            </div>

          </div>
          <div>
            <!-- 自己发的消息头像 -->
            <i-avatar i-class="avatar" v-if="message.flow === 'out'" :src="myInfo.avatar" shape="square" />
            <!-- 收到的消息头像 -->
            <i-avatar i-class="avatar" shape="square" v-else-if="currentConversation.type === 'C2C'" :src="currentConversation.userProfile.avatar" />
            <i-avatar i-class="avatar" shape="square" v-else :src="message.avatar" />
          </div>
        </div>
      </li>
    </div>
    <!--    输入框及选择框部分-->
    <div class="bottom" :style="{ paddingBottom: isIphoneX ? safeBottom + 'px': '' }">
      <div class="bottom-div" :style="{marginBottom: isFocus ? '10px' : 0}">
        <div v-if="!isRecord" style="width: 100%">
          <input type="text" class="input" v-model.lazy:value="messageContent" confirm-type="send" :focus="isFocus" @focus="isFocus = true" @blur="isFocus = false" @confirm='sendMessage' />
        </div>

        <div class="btn" @click="handleEmoji()">
          <icon src="/static/images/smile.png" :size="28"></icon>
        </div>
        <div class="send" @click="sendMessage" v-if="messageContent.length !== 0">
          发送
        </div>
        <div class="btn" @click="handleMore()" v-else>
          <icon src="/static/images/more.png" :size="28"></icon>
        </div>

      </div>
      <!--    emoji部分-->
      <div class="bottom-emoji" v-if="isEmojiOpen">
        <div class="emoji-tab">
          <div class="tabs">
            <div class="single" @click="handleEmojiShow" :class="emojiShow ? 'choosed' : ''">
              <image src="/static/images/smile.png" style="width:100%;height:100%"></image>
            </div>
            <div class="single" @click="handleBigEmojiShow" :class="bigEmojiShow ? 'choosed' : ''">
              <image :src="faceUrl + 'tt16@2x.png'" style="width:100%;height:100%"></image>
            </div>
          </div>
        </div>
        <div class="emojis" v-if="emojiShow">
          <div v-for="(emojiItem, index3) in emojiName" class="emoji" :key="emojiItem" @click="chooseEmoji(emojiItem)">
            <image :src="emojiUrl + emojiMap[emojiItem]" style="width:100%;height:100%" />
          </div>
        </div>
        <div class="emojis" v-if="bigEmojiShow">
          <div v-for="(bigItem, index4) in bigEmoji" class="bigemoji" :key="bigItem" @click="chooseBigEmoji(bigItem)">
            <image :src="faceUrl + bigItem + '@2x.png'" style="width:100%;height:100%" />
          </div>
        </div>
      </div>
      <!--    更多部分-->
      <div class="bottom-image" v-if="isMoreOpen">
        <div class="images">
          <div class="block" @click="sendPhoto('camera')">
            <div class="image">
              <image src="/static/images/take-pic.png" class="icon" />
            </div>
            <div class="name">
              拍摄
            </div>
          </div>
          <div class="block" @click="sendPhoto('album')">
            <div class="image">
              <image src="/static/images/picture.png" class="icon" />
            </div>
            <div class="name">
              图片
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { emojiName, emojiMap, emojiUrl } from '../../../utils/emojiMap'
import { throttle } from '../../../utils/index'
const audioContext = wx.createInnerAudioContext()
const recorderManager = wx.getRecorderManager()
const recordOptions = {
  duration: 60000,
  sampleRate: 44100,
  numberOfChannels: 1,
  encodeBitRate: 192000,
  format: 'aac' // 音频格式，选择此格式创建的音频消息，可以在即时通信 IM 全平台（Android、iOS、微信小程序和Web）互通
}
export default {
  data() {
    return {
      messageContent: '',
      conversation: {},
      messageKey: '',
      lastMsgTime: '',
      count: 15,
      isEmojiOpen: false,
      isMoreOpen: false,
      isFocus: false,
      isGroup: false,
      messageList: [],
      emojiName: emojiName,
      emojiMap: emojiMap,
      emojiUrl: emojiUrl,
      height: 0,
      modalVisible: false,
      downloadInfo: {},
      percent: 0,
      sysInfo: {},
      customModalVisible: false,
      customData: '',
      customDescription: '',
      customExtension: '',
      focusedInput: '',
      safeBottom: 34,
      isRecord: false,
      isRecording: false,
      canSend: true,
      startPoint: 0,
      title: '正在录音',
      rateModal: false,
      rate: 5,
      isShow: false,
      faceUrl: 'https://webim-1252463788.file.myqcloud.com/assets/face-elem/',
      emojiShow: true,
      bigEmojiShow: false,
      bigEmoji: ['tt01', 'tt02', 'tt03', 'tt04', 'tt05', 'tt06', 'tt07', 'tt08', 'tt09', 'tt10', 'tt11', 'tt12', 'tt13', 'tt14', 'tt15', 'tt16'],
      revokeModal: false,
      revokeMessage: {},
      currentTime: 0,
      currentTimeID: '',
    }
  },
  onShow() {
    this.isShow = true
    const that = this
    this.currentTimeID = setInterval(function () {
      that.currentTime = new Date().getTime() / 1000
    }, 3000)
  },
  onLoad(options) {
    this.set = options.toAccount
    // 设置header——聊天对象昵称或群名
    wx.setNavigationBarTitle({
      title: this.set
    })
    this.height = this.sysInfo.windowHeight
    let query = wx.createSelectorQuery()
    let that = this
    wx.$app.on(this.TIM.EVENT.MESSAGE_RECEIVED, () => {
      query.select('#chat').boundingClientRect(function (res) {
        if (res.bottom - that.height < 150) {
          that.scrollToBottom()
        }
      }).exec()
    })
    let interval = setInterval(() => {
      if (this.currentMessageList.length !== 0) {
        this.scrollToBottom()
        clearInterval(interval)
      }
    }, 600)
    this.$bus.$off('atUser')
    this.$bus.$on('atUser', (user) => {
      this.messageContent += user.userID
      this.messageContent += ' '
    })
    recorderManager.onStart(() => {
    })
    recorderManager.onPause(() => {
    })
    recorderManager.onStop((res) => {
      wx.hideLoading()
      if (this.canSend) {
        if (res.duration < 1000) {
          this.$store.commit('showToast', {
            title: '录音时间太短'
          })
        } else {
          const message = wx.$app.createAudioMessage({
            to: this.$store.getters.toAccount,
            conversationType: this.$store.getters.currentConversationType,
            payload: {
              file: res
            }
          })
          this.$store.commit('sendMessage', message)
          wx.$app.sendMessage(message)
        }
      }
    })
  },
  // 退出聊天页面的时候所有状态清空
  onUnload() {
    clearInterval(this.currentTimeID)
    wx.$app.setMessageRead({ conversationID: this.$store.state.conversation.currentConversationID })
    this.isEmojiOpen = false
    this.rateModal = false
    this.isMoreOpen = false
    this.messageContent = ''
    this.isShow = false
  },
  onPullDownRefresh() {
    throttle(this.getMessageList, 1000)()
  },
  computed: {
    ...mapState({
      currentMessageList: state => {
        return state.conversation.currentMessageList
      },
      currentConversation: state => state.conversation.currentConversation,
      myInfo: state => state.user.myInfo,
      sysInfo: state => state.global.systemInfo
    }),
    ...mapGetters(['isIphoneX'])
  },
  methods: {
    // 点击查看
    handleClickLook(id, mid) {
      wx.navigateTo({
        url: "../../../pages/teachersDetail/main?id=" + id + "&mid=" + mid,
      });
    },
    onChange(e) {
      this.rate = e.mp.detail.index
    },
    chooseRecord() {
      this.isRecord = !this.isRecord
    },
    // 滚动到列表bottom
    scrollToBottom() {
      if (this.isShow) {
        wx.pageScrollTo({
          scrollTop: 99999
        })
      }
    },
    customModal() {
      this.customModalVisible = !this.customModalVisible
      this.handleClose()
    },
    sendCustomMessage() {
      if (this.customData.length === 0 && this.customDescription.length === 0 && this.customExtension.length === 0) {
        this.$store.commit('showToast', {
          title: '不能为空'
        })
        return
      }
      const message = wx.$app.createCustomMessage({
        to: this.$store.getters.toAccount,
        conversationType: this.$store.getters.currentConversationType,
        payload: {
          data: this.customData,
          description: this.customDescription,
          extension: this.customExtension
        }
      })
      this.$store.commit('sendMessage', message)
      wx.$app.sendMessage(message)
      this.customModal()
      this.customData = ''
      this.customDescription = ''
      this.customExtension = ''
    },
    // 失去焦点
    loseFocus() {
      this.handleClose()
    },
    // 下载文件模态框
    handleModalShow() {
      this.modalVisible = !this.modalVisible
    },
    // 下载文件前判断小程序是否支持预览，只支持 office 相关文件预览
    handleDownload(message) {
      const fileType = message.fileUrl.slice(message.fileUrl.lastIndexOf('.')).toLowerCase()
      const allow = ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf']
      if (allow.indexOf(fileType) > -1) {
        this.percent = 0
        this.downloadInfo = message
        this.handleModalShow()
      } else {
        this.$store.commit('showToast', {
          title: '小程序不支持该文件预览哦',
          icon: 'none',
          duration: 2000
        })
      }
    },
    // 获取消息
    getMessageList() {
      this.$store.dispatch('getMessageList')
      wx.stopPullDownRefresh()
    },
    // 处理emoji选项卡
    handleEmoji() {
      if (this.isFocus) {
        this.isFocus = false
        this.isMoreOpen = false
        this.isEmojiOpen = true
      } else {
        this.isEmojiOpen = !this.isEmojiOpen
        this.isMoreOpen = false
      }
    },
    // 处理更多选项卡
    handleMore() {
      if (this.isFocus) {
        this.isFocus = false
        this.isEmojiOpen = false
        this.isMoreOpen = true
      } else {
        this.isMoreOpen = !this.isMoreOpen
        this.isEmojiOpen = false
      }
    },
    // 选项卡关闭
    handleClose() {
      this.rateModal = false
      this.isFocus = false
      this.isMoreOpen = false
      this.isEmojiOpen = false
    },
    isnull(content) {
      if (content === '') {
        return true
      }
      const reg = '^[ ]+$'
      const re = new RegExp(reg)
      return re.test(content)
    },
    // 发送text message 包含 emoji
    sendMessage() {
      if (!this.isnull(this.messageContent)) {
        const message = wx.$app.createTextMessage({
          to: this.$store.getters.toAccount,
          conversationType: this.$store.getters.currentConversationType,
          payload: { text: this.messageContent }
        })
        let index = this.$store.state.conversation.currentMessageList.length
        this.$store.commit('sendMessage', message)
        wx.$app.sendMessage(message).catch(() => {
          this.$store.commit('changeMessageStatus', index)
        })
        this.messageContent = ''
      } else {
        this.$store.commit('showToast', { title: '消息不能为空' })
      }
      this.isFocus = false
      this.isEmojiOpen = false
      this.isMoreOpen = false
    },
    sendPhoto(name) {
      let self = this
      if (name === 'album') {
        this.chooseImage(name)
      } else if (name === 'camera') {
        wx.getSetting({
          success: function (res) {
            if (!res.authSetting['scope.camera']) { // 无权限，跳转设置权限页面
              wx.authorize({
                scope: 'scope.camera',
                success: function () {
                  self.chooseImage(name)
                }
              })
            } else {
              self.chooseImage(name)
            }
          }
        })
      }
    },
    videoError(e) {
      this.$store.commit('showToast', {
        title: `视频出现错误，错误信息${e.mp.detail.errMsg}`,
        duration: 1500
      })
    },
    chooseImage(name) {
      let self = this
      let message = {}
      wx.chooseImage({
        sourceType: [name],
        count: 1,
        success: function (res) {
          message = wx.$app.createImageMessage({
            to: self.$store.getters.toAccount,
            conversationType: self.$store.getters.currentConversationType,
            payload: {
              file: res
            },
            onProgress: percent => {
              self.percent = percent
            }
          })
          self.$store.commit('sendMessage', message)
          wx.$app.sendMessage(message).then(() => {
            self.percent = 0
          }).catch((err) => {
          })
        }
      })
      this.handleClose()
    },
    previewImage(src) {
      wx.previewImage({
        current: src, // 当前显示图片的http链接
        urls: [src]
      })
    },
    // 发消息选中emoji
    chooseEmoji(item) {
      this.messageContent += item
    },
    // 重发消息
    handleResend(message) {
      if (message.status === 'fail') {
        wx.$app.resendMessage(message)
      }
    },
    sendSurvey() {
      if (this.customExtension) {
        const message = wx.$app.createCustomMessage({
          to: this.$store.getters.toAccount,
          conversationType: this.$store.getters.currentConversationType,
          payload: {
            data: 'survey',
            description: String(this.rate),
            extension: this.customExtension
          }
        })
        this.rate = 0
        this.customExtension = ''
        this.$store.commit('sendMessage', message)
        wx.$app.sendMessage(message)
        this.handleClose()
      } else {
        this.$store.commit('showToast', {
          title: '建议不要为空哦！'
        })
      }
    },
    // 播放音频
    openAudio(audio) {
      let that = this
      audioContext.src = audio.url
      audioContext.play()
      audioContext.onPlay(() => {
      })
      audioContext.onEnded(() => {
        wx.hideToast()
      })
      audioContext.onError(() => {
        that.$store.commit('showToast', {
          title: '小程序暂不支持播放该音频格式',
          icon: 'none',
          duration: 2000
        })
      })
    },
    // 发送视频消息
    video() {
      let that = this
      wx.chooseVideo({
        sourceType: ['album', 'camera'],
        maxDuration: 60,
        camera: 'back',
        success(res) {
          let message = wx.$app.createVideoMessage({
            to: that.$store.getters.toAccount,
            conversationType: that.$store.getters.currentConversationType,
            payload: {
              file: res
            }
          })
          that.$store.commit('sendMessage', message)
          wx.$app.sendMessage(message)
          that.handleClose()
        }
      })
    },
    getRandomInt(min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min)) + min
    },
    videoCall() {
      const options = {
        call_id: '',
        version: 3,
        room_id: this.getRandomInt(0, 42949),
        action: 0,
        duration: 0,
        invited_list: []
      }
      let args = JSON.stringify(options)
      const message = wx.$app.createCustomMessage({
        to: this.$store.getters.toAccount,
        conversationType: this.$store.getters.currentConversationType,
        payload: {
          data: args,
          description: '',
          extension: ''
        }
      })
      this.$store.commit('sendMessage', message)
      wx.$app.sendMessage(message)
      let url = `../call/main?args=${args}&&from=${message.from}&&to=${message.to}`
      wx.navigateTo({ url })
      this.handleClose()
    },
    handleEmojiShow() {
      this.emojiShow = true
      this.bigEmojiShow = false
    },
    handleBigEmojiShow() {
      this.emojiShow = false
      this.bigEmojiShow = true
    },
    chooseBigEmoji(item) {
      let message = wx.$app.createFaceMessage({
        to: this.$store.getters.toAccount,
        conversationType: this.$store.getters.currentConversationType,
        payload: {
          index: 1,
          data: item
        }
      })
      this.$store.commit('sendMessage', message)
      wx.$app.sendMessage(message)
      this.handleClose()
    },
    // 长按消息触发是否撤回
    handleMessage(message) {
      if (message.from === this.myInfo.userID) {
        const revokeTimeout = 2 * 60 * 1000
        const now = new Date().getTime()
        if (now - message.time * 1000 < revokeTimeout) {
          this.revokeModal = true
          this.revokeMessage = message
        }
      }
    },
    // 撤回消息
    handleRevokeMessage() {
      wx.$app.revokeMessage(this.revokeMessage).then(res => {
        this.revokeModal = false
        this.$store.commit('showToast', {
          title: '撤回成功',
          duration: 500
        })
      })
    },
    // 撤回后时间限制内，重新编辑
    reEdit(message) {
      this.messageContent = message.payload.text
    }
  },
  destory() { }
}
</script>
<style>
page {
  background: #f5f5f5;
}
</style>
<style lang="stylus">
.custom-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 12px;
  box-sizing: border-box;

  .custom-input {
    color: #111111;
    background-color: white;
    border-radius: 8px;
    height: 30px;
    margin: 5px 0;
    box-sizing: border-box;
    border-bottom: 1px solid $light-background;
  }
}

.loadMore {
  font-size: 14px;
  color: #8a8a8a;
  box-sizing: border-box;
  width: 100%;
  padding: 15px;
  display: flex;
  justify-content: center;
}

.unload {
  font-size: 0;
  color: #fff;
  box-sizing: border-box;
  width: 100%;
  text-align: center;
}

.emoji-open {
  height: calc(100vh - 262px);
}

.emoji-close {
  height: calc(100vh - 82px);
}

.chat {
  background-color: #f5f5f5;
  box-sizing: border-box;
}

.file {
  display: flex;
  text-align: left;
  width: fit-content;
  word-break: break-all;
  font-size: 14px;
  background-color: white;
  padding: 10px 8px;
}

.bottom {
  background-color: #FFFFFF;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 69;
}

.bottom-div {
  width: 100%;
  display: flex;
  align-items: center;
  border-top: 1px solid $border;
  padding: 10px;
  flex-direction: row;
  box-sizing: border-box;
  transition: all 0.3s;

  .send {
    font-size: 14px;
    background-color: #006fff;
    color: white;
    border-radius: 4px;
    width: 50px;
    height: fit-content;
    padding: 6px;
    margin-left: 12rpx;
    text-align: center;
  }
}

.bottom-emoji {
  position: relative;

  .emojis {
    height: 150px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    overflow-y: scroll;
    box-sizing: border-box;

    .emoji {
      height: 12.5vw;
      width: 12.5vw;
      padding: 8px;
      box-sizing: border-box;
    }

    .bigemoji {
      height: 20vw;
      width: 20vw;
      padding: 10px;
      box-sizing: border-box;
    }
  }
}

.emoji-tab {
  box-sizing: border-box;
  border-bottom: 1px solid #dbdbdb;

  .tabs {
    display: flex;
    height: 29px;
    flex-direction: row;
    padding-left: 10px;
    box-sizing: border-box;

    .single {
      display: flex;
      margin-top: 2px;
      width: 26px;
      height: 26px;
      padding: 2px;
      border-radius: 6px;
      box-sizing: border-box;
      margin-right: 8px;
    }

    .choosed {
      background-color: rgba(255, 255, 255, 0.7);
    }
  }
}

.bottom-image {
  box-sizing: border-box;

  .images {
    box-sizing: border-box;
    display: flex;
    padding: 0 12px;
    margin-top: 16px;

    &:last-child {
      margin-bottom: 16px;
    }

    .block {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 0 12px;

      .name {
        margin-top: 6px;
        font-size: 12px;
        color: #999999;
        text-align: center;
      }

      .image {
        width: 64px;
        height: 64px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        border-radius: 8px;
        background-color: white;
        padding: 3vw;

        .icon {
          width: 26px;
          height: 26px;
        }
      }
    }
  }
}

.input {
  margin-left: 16px;
  background-color: #F8F8F8;
  border-radius: 6px;
  height: 44px;
  box-sizing: border-box;
  padding: 0 8px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}

.btn {
  display: flex;
  padding: 0;
  margin: 0;
  margin-left: 10px;
}

.button {
  color: white;
  background-color: #006fff;
  border-radius: 8px;
  height: 26px;
  padding: 0 6px;
  line-height: 26px;
  font-size: 16px;
}

// 添加用户当弹窗
.input-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}

li {
  margin-top: 18px;
  padding: 0 12px;
}

.fail::before {
  padding: 2px 8px;
  background-color: #fb5250;
  color: white;
  content: '!';
  font-size: 12px;
  border-radius: 50%;
  cursor: pointer;
}

@keyframes load {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.notice {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;

  .content {
    background-color: $background;
    border-radius: 8px;
    font-size: 14px;
    color: #495060;
    padding: 6px 8px;
  }
}

.message {
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 24px;
}

.text-message {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  white-space: pre-wrap;
  padding: 10px;
}

.image-message {
  max-width: 100px;
  border-radius: 2px;
}

.fail {
  background-color: transparent;
}

.unSend {
  width: 12px;
  height: 12px;
  border: 4px solid #98c6fd;
  border-bottom: #dbdbdb 4px solid;
  border-radius: 50%;
  -webkit-animation: load 1.1s infinite linear;
}

.item-right {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: 24px 0;
  height: 100%;

  .load {
    height: 100%;
    width: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .content {
    display: flex;
    margin-right: 12px;
    flex-direction: column;
    align-items: flex-end;

    .name {
      font-size: 12px;
      line-height: 1;
      margin-bottom: 6px;
      color: #999999;
      text-align: right;
    }

    .wrapper {
      display: flex;
      flex-direction: row;
      height: 100%;

      .message {
        background: rgba(7, 140, 169, 0.2);
        border-radius: 4px;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
    }
  }
}

.survey {
  padding: 20px;
  background-color: white;

  .title {
    font-size: 16px;
    font-weight: 600;
  }

  .rate {
    display: flex;
    flex-direction: flex-start;
    align-content: center;

    .star {
      width: 30px;
      height: 30px;
    }

    .rating {
      font-weight: 600;
      color: #495060;
      line-height: 30px;
      padding-left: 10px;
    }
  }

  .suggestion {
    padding-top: 10px;
    font-size: 14px;
    color: #000000;
    font-weight: 500;
  }

  .description {
    font-size: 18px;
    color: #000000;
  }
}

.video {
  max-height: 200px;
  max-width: 50vw;
}

.item-left {
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  margin: 24px 0;

  .content {
    margin-left: 10px;

    .name {
      width: 100%;
      font-size: 14px;
      line-height: 1;
      color: #999999;
      margin-bottom: 10px;
    }

    .message {
      background-color: #FFFFFF;
      border-radius: 4px;
    }
  }
}

// 音频解析
.box {
  display: flex;
  height: 20px;
  line-height: 20px;
}

.record {
  width: 100%;
  background-color: white;
  color: #495060;
  border-radius: 6px;
  box-sizing: border-box;
  height: 34px;
  line-height: 34px;
  display: flex;
  justify-content: center;
}

.record-modal {
  height: 150px;
  width: 60vw;
  background-color: black;
  opacity: 0.8;
  position: fixed;
  top: 200px;
  z-index: 9999;
  left: 20vw;
  border-radius: 12px;
  display: flex;
  flex-direction: column;

  .wrapper {
    display: flex;
    height: 100px;
    box-sizing: border-box;
    padding: 10vw;

    .modal-loading {
      opacity: 1;
      width: 20px;
      height: 8px;
      border-radius: 2px;
      background-color: #006fff;
      animation: loading 2s cubic-bezier(0.17, 0.37, 0.43, 0.67) infinite;
    }
  }

  .modal-title {
    text-align: center;
    color: white;
  }
}

@keyframes loading {
  0% {
    transform: translate(0, 0);
  }

  50% {
    transform: translate(30vw, 0);
    background-color: #f5634a;
    width: 40px;
  }

  100% {
    transform: translate(0, 0);
  }
}

.modal-display {
  display: none;
}

.avatar {
  height: 48px !important;
  width: 48px !important;
  border-radius: 50% !important;
}

.float-button-list {
  position: fixed;
  top: 12px;
  right: 12px;

  image {
    width: 20px;
    height: 20px;
    padding: 7px;
    box-shadow: 0 0 4px gray;
    background-color: $background;
    border-radius: 50%;
  }

  .video-icon {
    margin-right: 6px;
  }
}

.re-edit {
  color: #006fff;
  line-height: 30px;
  font-size: 14px;
  margin-left: 10px;
}

.read-receipts {
  top: 50%;
  transform: translateY(45%);
  margin-right: -18px;
}

.list_wrapper {
  padding: 24px 10px 0 10px;
}

.custom_wrapper {
  width: 239px;
  height: 126px;
  background: #FFFFFF;
  border-radius: 2px;
}

.custom_wrapper .custom_top {
  display: flex;
  padding: 16px 14px 0 12px;
  width: 213px;
  height: 64px;
  background: rgba(255, 255, 255, 0);
  border-bottom: 1px solid #EEEEEE;
}

.custom_wrapper .custom_con {
  margin-left: 12px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  line-height: 24px;
}

.custom_wrapper .lside_img {
  width: 52px;
  height: 40px;
  border-radius: 50%;
}

.custom_wrapper .custom_btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 46px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #078CA9;
}
</style>
