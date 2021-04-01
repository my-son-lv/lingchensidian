<!--  -->
<template>
  <div class="wrapper">
    <div class="title_top">
      <div class="candidate_name">
        {{this.teacherName}}
        <span>候选人</span>
      </div>
    </div>
    <div class="center-page">
      <div class="join_wrapper">
        <div ref="candidateVideoWrap" class="distant-stream_video" id="candidateVideo_1" v-show="adviserName != null"></div>
      </div>
      <div class="rside">
        <div class="ride_top">
          <div id="local_stream" class="local-stream">
          </div>
          <div class="item_title">
            {{this.$route.params.companyMessage.contact}}
            <span>{{this.$route.params.companyMessage.company_name}}</span>
          </div>
        </div>
        <div class="ride_bottom">
          <div ref="companyStream" class="company-stream" id="companyStream_1">
          </div>
          <div class="item_title">
            {{this.adviserName}}
            <span>招聘顾问</span>
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

<script src="./realTimeCall.js">
</script>
<style src="./realTimeCall.css" scoped>
</style>