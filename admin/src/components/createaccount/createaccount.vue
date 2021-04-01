<template>
  <div
    class="content_t"
    style="padding-left: 4%; padding-right: 2%; padding-top: 1px; padding-bottom: -1px;"
  >
    <div class="t1">创建账号</div>
    <el-radio v-model="radio" :label="1" style="margin-top: 40px">外教账号</el-radio>
    <el-radio v-model="radio" :label="2">企业账号</el-radio>

    <div style="margin-top: 10px" v-show="radio == 1">
      <el-form :model="info_t" :rules="rules_t" ref="info_t">
        <el-form-item prop="nick_name">
          <el-input class="el_input" v-model="info_t.nick_name">
            <template slot="prepend">User Name：</template>
          </el-input>
        </el-form-item>

        <el-form-item prop="email">
          <el-input class="el_input" v-model="info_t.email">
            <template slot="prepend">Email：</template>
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input class="el_input" v-model="info_t.password">
            <template class="slot" slot="prepend">New Password：</template>
          </el-input>
        </el-form-item>

        <el-form-item prop="password_r">
          <el-input class="el_input" v-model="info_t.password_r">
            <template class="slot" slot="prepend">Confirm Password：</template>
          </el-input>
        </el-form-item>
      </el-form>
    </div>

    <div style="margin-top: 10px" v-show="radio == 2">
      <el-form :model="info_c" :rules="rules_c" ref="info_c">
        <el-form-item prop="phone">
          <el-input class="el_input" v-model="info_c.phone" placeholder="输入11位手机号">
            <template slot="prepend">手机号：</template>
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input class="el_input" v-model="info_c.password" placeholder="输入6-20位密码">
            <template class="slot" slot="prepend">密码：</template>
          </el-input>
        </el-form-item>

        <el-form-item prop="password_r">
          <el-input class="el_input" v-model="info_c.password_r" placeholder="输入6-20位密码">
            <template class="slot" slot="prepend">确认密码：</template>
          </el-input>
        </el-form-item>
      </el-form>
    </div>

    <el-button type="primary" class="btn" @click="creat_account">创建</el-button>
  </div>
</template>

<script src="./createaccount.js"></script>
<style src="./createaccount.css" scoped></style>
