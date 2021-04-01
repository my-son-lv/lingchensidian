<template>
  <div class="content">
    <el-button class="rt_btn_1" @click="next_click">下一步、补全信息</el-button>
    <el-button class="rt_btn_2" @click="save">保存到草稿</el-button>

    <div class="t1">签约基本信息</div>

    <div class="mt_20 row">
      <div class="t2">标题:</div>
      
      <el-input
        class="input_1"
        size="small"
        placeholder="请输入标题，如<英孚教育合同签约>"
        v-model="sign.name"
      ></el-input>
      
    </div>

    <div class="mt_20 row">
      <div class="t2">合同类型:</div>
      <el-select
        v-model="sign.contract_id"
        placeholder="请选择合同类型"
        style="margin-left: 10px"
      >
        <el-option-group
          v-for="group in options"
          :key="group.label"
          :label="group.label"
        >
          <el-option
            v-for="item in group.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-option-group>
      </el-select>
    </div>

    <div class="t1 mt_40">发起人</div>

    <div class="mt_20 row">
      <div class="t2">经办人:</div>
      <el-input
        class="input_2"
        size="small"
        placeholder
        v-model="sign.a_name"
      ></el-input>
      <div class="t3">手机:</div>
      <el-input
        class="input_2"
        size="small"
        placeholder
        v-model="sign.a_phone"
      ></el-input>
    </div>

    <div class="t1 mt_40">签约方</div>

    <div class="mt_20 row">
      <div class="t2">关联企业:</div>
      <el-input
        class="input_2"
        size="small"
        placeholder
        disabled
        v-model="sign.company_name"
      ></el-input>
      <div class="t3">公司名称:</div>
      <el-input
        class="input_2"
        size="small"
        placeholder="工商营业执照上的名称"
        v-model="sign.b_company_name"
      ></el-input>
    </div>

    <div class="mt_20 row">
      <div class="t2">经办人:</div>
      <el-input
        class="input_2"
        size="small"
        placeholder="接收人真实姓名"
        v-model="sign.b_name"
      ></el-input>
      <div class="t3">电话号:</div>
      <el-input
        class="input_2"
        size="small"
        placeholder
        v-model="sign.b_phone"
      ></el-input>
    </div>

    <div class="mt_20 row">
      <div class="t2">认证方式:</div>
      <el-radio v-model="sign.auth_type" :label="1" class="radio"
        >企业认证</el-radio
      >
      <el-radio v-model="sign.auth_type" :label="2" class="radio"
        >个人认证</el-radio
      >
    </div>

    <div class="line mt_40"></div>
    <div class="mt_40 row">
      <div class="t2">签署截止日期:</div>
      <el-date-picker
        class="input_2"
        v-model="sign.end_time"
        type="date"
        placeholder="选择日期"
        size="small"
        value-format="yyyy-MM-dd"
      ></el-date-picker>
    </div>

    <div class="mt_20 row">
      <div class="t2">备注:</div>
      <el-input
        class="input_1"
        size="small"
        v-model="sign.memo"
        placeholder="请输入备注信息"
      ></el-input>
    </div>
  </div>
</template>

<script src="./signstart.js"></script>
<style src="./signstart.css" scoped></style>
