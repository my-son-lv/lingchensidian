<template>
  <div>
    <div class="login_background" v-show="!drawer_register"></div>
    <div class="login_content" v-show="!drawer_register">
      <div class="login_logo_1" @click="handleClickOffice"></div>
      <div class="login_form">
        <h1 style="font-size: 25px;">Welcome back!</h1>
        <div
          class="t1"
          style="margin-bottom:40px;font-size: 12px;
    margin-top: 20px;
    color: #8f9290;"
        >Better jobs and higher pay are waiting. Sign in and find your next move.</div>
        <img src="../../assets/image/login_bg2.png" class="login_bgimg" />
        <el-form :model="ruleForm_login" :rules="rules_login" ref="ruleForm_login">
          <div class="mt_40 t2">Your ID</div>
          <el-form-item prop="id">
            <el-input class="login_input" v-model="ruleForm_login.id"></el-input>
          </el-form-item>
          <div class="mt_20 t2">Password</div>
          <el-form-item prop="pwd">
            <el-input class="login_input" v-model="ruleForm_login.pwd" show-password></el-input>
          </el-form-item>
        </el-form>
        <el-button class="login_sign_btn btn1" :loading="login_loading" @click="login_click()">GO</el-button>
        <el-row class="login_bottom">
          <div class="forget_wrapper" style="margin: 20px 0;">
            <p class="span_left" style="margin-right:5px">Forgot Password？</p>
            <span class="span_right" @click="drawerClick(1)">Click Here</span>
          </div>
          <div class="forget_wrapper">
            <span class="span_left">Don't have an account？</span>
            <span class="span_right" @click="drawerClick(0)">Sign Up</span>
          </div>
        </el-row>
      </div>
    </div>

    <!-- 注册相关 -->
    <div v-show="drawer_register" class="register_content">
      <div class="login_logo_2"></div>
      <div class="register_container">
        <div
          class="register_title"
        >{{drawer_type == 0 ? 'Create account to upload your Resume and get more visibility!' : 'Change Password'}}</div>
        <el-form
          :model="ruleForm_register"
          :rules="rules_register"
          ref="ruleForm_register"
          class="ruleForm_register_div"
        >
          <el-form-item v-show="!drawer_type" prop="name">
            <el-input class="register_input mt_20" v-model="ruleForm_register.name">
              <template slot="prepend">User Name：</template>
            </el-input>
          </el-form-item>

          <div v-if="drawer_type" class="mt_40"></div>

          <el-form-item prop="email">
            <el-input class="register_input" v-model="ruleForm_register.email">
              <template slot="prepend">Email：</template>
            </el-input>
          </el-form-item>
        </el-form>

        <el-form
          :model="ruleForm_register2"
          :rules="rules_register2"
          ref="ruleForm_register2"
          class="ruleForm_register2_div"
        >
          <el-form-item prop="code">
            <el-input class="register_input" v-model="ruleForm_register2.code" maxlength="6">
              <template slot="prepend">Verification Code：</template>
              <el-button
                :loading="register_loading"
                class="send_btn"
                slot="append"
                @click="send('ruleForm_register')"
              >{{sendTitle}}</el-button>
            </el-input>
          </el-form-item>

          <div class="email-code">We will send you a verification code to your E-mail.</div>

          <el-form-item prop="pwd">
            <el-input class="register_input" v-model="ruleForm_register2.pwd" show-password>
              <template class="slot" slot="prepend">New Password：</template>
            </el-input>
          </el-form-item>

          <el-form-item prop="rpwd">
            <el-input class="register_input" v-model="ruleForm_register2.rpwd" show-password>
              <template class="slot" slot="prepend">Confirm Password：</template>
            </el-input>
          </el-form-item>
        </el-form>

        <div class="terms_div">
          <el-checkbox
            v-show="!drawer_type"
            style=" margin-top: 2%"
            v-model="checked"
          >By continuing, you agree to our</el-checkbox>
          <a
            v-show="!drawer_type"
            style="font-size: 14px"
            href="javascript:void(0)"
            v-on:click="terms_of_use"
          >Terms of Use</a>
          <span v-show="!drawer_type" style="font-size: 14px" href="javascript:void(0)">and</span>
          <a
            v-show="!drawer_type"
            style="font-size: 14px"
            href="javascript:void(0)"
            v-on:click="Privacy_Policy"
          >Privacy Policy.</a>
        </div>

        <div class="buttons">
          <el-button
            class="btn_l btn1"
            type="primary"
            @click="register_submit('ruleForm_register')"
            :disabled="!checked"
            :loading="submit_loading"
          >Sign in</el-button>
          <el-button class="btn_r btn2" v-on:click="register_cancel">Cancel</el-button>
        </div>
        <div v-if="drawer_type" class="mt_40"></div>
      </div>
    </div>
  </div>
</template>

<script src="./register.js"></script>
<style src="./register.css" scoped></style>
