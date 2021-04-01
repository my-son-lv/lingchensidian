<template>
  <div class="content">
    <div class="steps">
      <div class="step_selected s1">1</div>
      <div class="line_selected l1"></div>
      <div class="s2" :class="[active > 0 ?'step_selected':'step']">2</div>
      <div class="s3" :class="[active > 1 ?'step_selected':'step']">3</div>
      <div class="line l2" :class="[active > 0 ?'line_selected':'line']"></div>
    </div>
    <div class="titles">
      <div class="title_selected t1">验证密码</div>
      <div class="t2" :class="[active > 0 ?'title_selected':'title']">更换手机号</div>
      <div class="t3" :class="[active > 1 ?'title_selected':'title']">完成修改</div>
    </div>

    <div class="inputs" v-if="active == 0">
      <el-input class="el_input" disabled :value="'手机号：' + user_info.phone"></el-input>
      <el-input class="el_input" placeholder="请输入密码" v-model="old_pwd"></el-input>
      <el-button class="next_btn" @click="next_step_1" :disabled="!(old_pwd.length > 0)">确认</el-button>
    </div>

    <div class="inputs" v-if="active == 1">
      <el-input class="el_input" placeholder="请输入新手机号" v-model="update_phone.phone" maxlength="11">
        <el-button slot="suffix" type="text" class="append_btn" @click="phone_exist">确定</el-button>
      </el-input>
      <el-input class="el_input" placeholder="验证码" v-model="update_phone.code" maxlength="6">
        <el-button
          slot="suffix"
          type="text"
          class="append_btn"
          :disabled="(!phone_exist_flg) || (time < 60)"
          @click="send_check_sms"
        >{{sendTitle}}</el-button>
      </el-input>
      <el-button class="next_btn" @click="next_step_2" :disabled="!phone_exist_flg">确认</el-button>
    </div>

    <div v-if="active == 2" class="detail">
      <i class="el-icon-success success_icon"></i>
      <div class="success_div">
        <span class="s1">恭喜您，账号已经修改成功，</span>
        <span class="s2" v-on:click="re_login">重新登录</span>
      </div>
    </div>
  </div>
</template>

<script src="./changeAccount.js"></script>
<style src="./changeAccount.css" scoped></style>
