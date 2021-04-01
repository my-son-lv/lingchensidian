<template>
  <div>
    <div class="login_background" v-show="!drawer_register">
      <div class="login_content" v-show="!drawer_register">
        <div class="login_logo_1" @click="handleClickOffice"></div>
        <div class="login_form">
          <div class="t1">Hi! 欢迎使用 APEX GLOBAL</div>
          <img src="../../assets/image/login_bg2.png" class="login_bgimg" />
          <el-form :model="ruleForm_login" :rules="rules_login" ref="ruleForm_login">
            <div class="t2 mt_40">账号：</div>
            <el-form-item prop="phone">
              <el-input id="loing_i1" class="login_input" v-model="ruleForm_login.phone"></el-input>
            </el-form-item>
            <div class="t2 mt_20">密码：</div>
            <el-form-item prop="password">
              <el-input id="loing_i2" class="login_input" v-model="ruleForm_login.password" show-password></el-input>
            </el-form-item>
          </el-form>

          <el-row>
            <el-button class="login_sign_btn btn1" @click="login_click()">登录</el-button>
          </el-row>

          <el-row class="login_bottom mt_40">
            <div style="float: left">
              <span class="span_right" @click="drawerClick(1)">忘记密码</span>
            </div>
            <div style="float: right">
              <span class="span_left">没有账号？</span>
              <span class="span_right" @click="drawerClick(0)">立即注册</span>
            </div>
          </el-row>
        </div>
      </div>
    </div>

    <!-- 注册相关 -->
    <div v-show="drawer_register" class="register_content">
      <div class="login_logo_2"></div>
      <div class="register_container">
        <div class="register_title">{{drawer_type == 0 ? '新用户注册' : '重置密码'}}</div>
        <el-form :model="ruleForm_register" :rules="rules_register" ref="ruleForm_register" class="ruleForm_register_div">
          <el-form-item prop="phone">
            <el-input class="register_input mt_40" v-model="ruleForm_register.phone">
              <template slot="prepend">手机号</template>
            </el-input>
          </el-form-item>
        </el-form>

        <el-form :model="ruleForm_register2" :rules="rules_register2" ref="ruleForm_register2" class="ruleForm_register_div">
          <el-form-item prop="pwd">
            <el-input class="register_input" v-model="ruleForm_register2.pwd" show-password>
              <template class="slot" slot="prepend">输入密码：</template>
            </el-input>
          </el-form-item>

          <el-form-item prop="rpwd">
            <el-input class="register_input" v-model="ruleForm_register2.rpwd" show-password>
              <template class="slot" slot="prepend">确认密码：</template>
            </el-input>
          </el-form-item>

          <el-form-item prop="code">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-input v-model="ruleForm_register2.code" maxlength="4" placeholder="图片验证码"></el-input>
              </el-col>
              <el-col :span="12">
                <img id="code_img" v-on:click="get_captcha" />
                <span class="change_code" v-on:click="get_captcha">换一张</span>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item prop="smscode">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-input v-model="ruleForm_register2.smscode" maxlength="6" placeholder="短信验证码"></el-input>
              </el-col>
              <el-col :span="12">
                <el-button :loading="register_loading" class="send_btn" @click="send_code()">{{sendTitle}}</el-button>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item prop="invite_code">
            <el-input class="register_input" v-model="ruleForm_register2.invite_code" show-password>
              <template class="slot" slot="prepend">输入邀请码(非必填)：</template>
            </el-input>
          </el-form-item>
        </el-form>

        <div class="buttons">
          <el-button class="btn_l btn1" type="primary" @click="register_submit()" :disabled="!checked" :loading="submit_loading">{{drawer_type == 0 ? '立即注册' : '重置密码'}}</el-button>
          <el-button class="btn_r btn2" v-on:click="register_cancel">取消</el-button>
        </div>

        <div v-if="drawer_type" class="mt_40"></div>
        <div class="terms_div">
          <el-checkbox v-show="!drawer_type" style=" margin-top: 2%; font-size: 16px; color:rgba(153,153,153,1);" v-model="checked">我已阅读并同意</el-checkbox>
          <a v-show="!drawer_type" style="font-size: 16px; color:rgba(7, 140, 169, 1);" href="javascript:void(0)" v-on:click="terms_of_use">《APEX GLOBAL 服务条款》</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./login.js"></script>
<style src="./login.css" scoped></style>
