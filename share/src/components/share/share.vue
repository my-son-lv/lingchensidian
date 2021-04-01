<template>
  <div>
    <div class="logo_div">
      <img class="logo" src="../../assets/logo.png" />
      <el-button class="phone" icon="el-icon-phone" @click="call" :autofocus="false"></el-button>
    </div>
    <img class="cover" src="../../assets/cover.png" />

    <div class="content">
      <!-- <div class="t2">填写下表，邀请优质外教</div> -->
      <div class="t3">Fill in the form and invite qualified foreign teachers</div>

      <div class="t4">Phone number</div>
      <el-row :gutter="20">
        <el-col :span="11">
          <el-select
            v-model="info.code"
            placeholder="请选择"
            style="margin-top:12px; width: 100%"
            :popper-append-to-body="false"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.titleKey"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>

        <el-col :span="13">
          <el-input class="el_input" v-model="info.phone"></el-input>
        </el-col>
      </el-row>

      <div class="t4">Auth code</div>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-input
            class="el_input"
            v-model="info.sms_code"
            maxlength="4"
            v-on:blur="check_account"
          >
            <!-- <template slot="prepend">验证码 | auth code</template> -->
          </el-input>
        </el-col>

        <el-col :span="12">
          <el-button class="send_btn" @click="send_code">Send</el-button>
        </el-col>
      </el-row>

      <div class="t4">Name</div>
      <el-input class="el_input" v-model="info.name"></el-input>

      <div class="t4">E-mail</div>
      <el-input class="el_input" v-model="info.email"></el-input>

      <el-button class="btn" @click="send()">submit</el-button>

      <div class="introduce">
        <div class="title">
          <img class="crown" src="../../assets/crown.png" />
          <div class="crown_t">COMMISSION</div>
        </div>

        <!-- <div class="t5">Referral Rewards:</div>
        <div
          class="t6"
        >If the recommender successfully enters the platform and passes the review, the recommender can receive a recommendation bonus of RMB 50.</div> -->
        <div class="t5">Signing Bonus:</div>
        <div
          class="t6"
        >Once the candidates successfully signed the contract with employer, the referrer can receive a signing bonus of RMB 1888 via bank card</div>
      </div>

      <div class="introduce">
        <div class="title">
          <img class="crown" src="../../assets/crown.png" />
          <div class="crown_t">Receive Rewards</div>
        </div>
        <!-- <div
          class="t6"
        >Click the phone sign in the upper right corner of the page to contact customer service, and wechat red packet will receive it after both parties check it.</div> -->
        <div class="t5">Contract Bonus:</div>
        <div
          class="t6"
        >Click the telephone icon on the upper right corner of this page, contact customer service and provide personal bank card information. After confirmation, the referral bonus will be received within 15 working days</div>
      </div>

      <div class="introduce">
        <div class="title">
          <img class="crown" src="../../assets/crown.png" />
          <div class="crown_t">Teacher's Benefits:</div>
        </div>
        <div class="t5">Foreign Teachers' Benefits to Join Us:</div>
        <div class="t6">1. Free Employment Opportunities</div>
        <div class="t6">2. TESOL/TEFL Course and Certification </div>
        <div class="t6">3. Work Visa Consultation</div>
      </div>
    </div>

    <div class="bottom">Apex Global contact via mail: vivian@apex.link</div>
  </div>
</template>

<script src="./share.js"></script>
<style src="./share.css" scoped></style>
