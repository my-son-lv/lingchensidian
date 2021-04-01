<template>
  <div>
    <div class="logo_div">
      <img class="logo" src="../../assets/logo.png" />
      <el-button class="phone" icon="el-icon-phone" @click="call" :autofocus="false"></el-button>
    </div>
    <img class="cover" src="../../assets/cover.png" />

    <div class="content">
      <div class="success" style="margin-top: 24px">
        <i class="el-icon-success success_icon"></i>Verification successful
      </div>

      <!-- <div class="t4">将连接或二维码分享至优质外教，即可领取奖金</div> -->
      <div class="t5">Share the link or QR code to the qualified foreign teacher, get your rewards now !</div>

      <div class="link">
        <div class="t6">{{info.url}}</div>
        <a class="btn" v-clipboard:copy="info.url" v-clipboard:success="onCopy" v-clipboard:error="onError">Copy</a>
      </div>
    </div>
    <el-row style="display:flex;">
      <el-col :span="12" style="padding:30px 0 30px 30px;">
        <el-image src="/static/images/share_code.jpg" :lazy="true" fit="fill"></el-image>
      </el-col>
      <el-col :span="12" style="padding:30px 0 30px 30px;">
        <div class="save_btn" @click="saveCode">Get Your Poster</div>
      </el-col>
    </el-row>
    <div>

    </div>
    <el-row style="height: 50px; background:rgba(248,248,248,1)">
      <el-col :span="8">
        <div v-on:click="nav_click(0)">
          <!-- <div class="nav_t1" v-bind:style="{'color' : nav_select == 0 ? 'rgba(51, 51, 51, 1)': 'rgba(153,153,153,1)'}">入驻记录</div> -->
          <div class="nav_t2" v-bind:style="{'color' : nav_select == 0 ? 'rgba(51, 51, 51, 1)': 'rgba(153,153,153,1)'}">Settlement records</div>
          <div class="nav_line" v-show="nav_select == 0"></div>
        </div>
      </el-col>

      <el-col :span="8">
        <div v-on:click="nav_click(1)">
          <!-- <div class="nav_t1" v-bind:style="{'color' : nav_select == 1 ? 'rgba(51, 51, 51, 1)': 'rgba(153,153,153,1)'}">入驻成功</div> -->
          <div class="nav_t2" v-bind:style="{'color' : nav_select == 1 ? 'rgba(51, 51, 51, 1)': 'rgba(153,153,153,1)'}">Successful settlement</div>
          <div class="nav_line" v-show="nav_select == 1"></div>
        </div>
      </el-col>

      <el-col :span="8">
        <div v-on:click="nav_click(2)">
          <!-- <div class="nav_t1" v-bind:style="{'color' : nav_select == 2 ? 'rgba(51, 51, 51, 1)': 'rgba(153,153,153,1)'}">签约成功</div> -->
          <div class="nav_t2" v-bind:style="{'color' : nav_select == 2 ? 'rgba(51, 51, 51, 1)': 'rgba(153,153,153,1)'}">Signing success</div>
          <div class="nav_line" v-show="nav_select == 2"></div>
        </div>
      </el-col>
    </el-row>

    <div class="nav_content">
      <div class="t4">{{msg_zh}}</div>
      <div class="t5">{{msg_en}}</div>
    </div>

    <div v-for="(item, index) in list_1" :key="index" class="cell">
      <el-row>
        <el-col :span="4">
          <img :src="(item.photos_path && item.photos_path.length > 0) ? item.photos_path[0].path : ''" class="cell_img" />
        </el-col>

        <el-col :span="11">
          <div class="cell_name">{{item.name}}</div>
          <div class="cell_info1">Only one step! Get up to ¥1888!</div>
        </el-col>

        <el-col :span="9">
          <div class="cell_info3" v-bind:style="{'color' : ((item.status == 2 && nav_select == 0) || (nav_select == 1 && item.sign_status) || nav_select == 2) ? 'rgba(255,96,16,1)': 'rgba(153,153,153,1)'}">{{get_info_3(item)}}</div>
          <div class="cell_info4" v-bind:style="{'color' : ((item.status == 2 && nav_select == 0) || (nav_select == 1 && item.sign_status) || nav_select == 2) ? 'rgba(255,96,16,1)': 'rgba(153,153,153,1)'}">{{get_info_4(item)}}</div>
          <div class="cell_info5">{{item.phone}}</div>
        </el-col>
      </el-row>
    </div>

    <div class="bottom">Apex Global contact via mail: vivian@apex.link</div>
  </div>
</template>

<script src="./shareinfo.js"></script>
<style src="./shareinfo.css" scoped></style>
// 111