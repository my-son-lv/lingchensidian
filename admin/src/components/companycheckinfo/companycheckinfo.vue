<template>
  <div class="content">
    <div class="mt40">
      <span class="t1">请选择不合格的信息</span>
      <el-checkbox style="margin-left: 40px" v-model="select_all" @change="handleCheckAllChange">全选</el-checkbox>
    </div>

    <div class="t1 mt40">机构信息</div>

    <div class="mt40">
      <div class="w400 fl">
        <el-checkbox v-model="select_options[0].selected"></el-checkbox>
        <span class="t2">学校名称：{{info.company_name}}</span>
      </div>
      <div class="fr">
        <el-checkbox v-model="select_options[1].selected"></el-checkbox>
        <span class="t2">学生年龄：{{get_student_age()}}</span>
      </div>
    </div>

    <div class="mt40">
      <div class="w400 fl">
        <el-checkbox v-model="select_options[2].selected"></el-checkbox>
        <span class="t2">机构类型：{{type()}}</span>
      </div>
      <div class="fr">
        <el-checkbox v-model="select_options[3].selected"></el-checkbox>
        <span class="t2">外籍员工人数：{{info.abroad_staff}}人</span>
      </div>
    </div>

    <div class="mt40">
      <div class="w400 fl">
        <el-checkbox v-model="select_options[4].selected"></el-checkbox>
        <span class="t2">办公地址：{{info.city_name ? info.city_name.merger_name : ''}}</span>
        <div
          class="t2"
          style="margin-top: 5px; margin-left: 18px"
        >详细地址：{{info.address ? info.address : ''}}</div>
      </div>
      <div class="fr">
        <el-checkbox v-model="select_options[5].selected"></el-checkbox>
        <span class="t2">年度外教需求量：{{needs_num()}}</span>
      </div>
    </div>

    <div class="mt40">
      <div class="w400 fl">
        <el-checkbox v-model="select_options[6].selected"></el-checkbox>
        <span class="t2">办学许可资质：{{info.talent ? '具备' : '不具备'}}</span>
      </div>
      <div class="fr">
        <el-checkbox v-model="select_options[7].selected"></el-checkbox>
        <span class="t2">月均基本薪资范围：{{pay()}}</span>
      </div>
    </div>

    <div class="mt40">
      <div class="w400 fl">
        <el-checkbox v-model="select_options[8].selected"></el-checkbox>
        <span class="t2">办学资质证书</span>
      </div>
      <div class="fr">
        <el-checkbox v-model="select_options[9].selected"></el-checkbox>
        <span class="t2">营业执照</span>
      </div>
    </div>

    <div class="mt40" style="height: 200px">
      <img
        class="img_p"
        :src="info.talent_img_path && info.talent_img_path.length > 0 ? info.talent_img_path[0].path : ''"
      />
      <img
        class="img_p"
        style="margin-left: 20px"
        :src="info.business_img_path && info.business_img_path.length > 0 ? info.business_img_path[0].path : ''"
      />
    </div>

    <div class="mt40">
      <div class="w400 fl">
        <el-checkbox v-model="select_options[13].selected"></el-checkbox>
        <span class="t2">校区图片一</span>
      </div>
      <div class="fr">
        <el-checkbox v-model="select_options[14].selected"></el-checkbox>
        <span class="t2">校区图片二</span>
      </div>
    </div>

    <div class="mt40" style="height: 200px">
      <img
        class="img_p"
        :src="info.school_img_1_path ? info.school_img_1_path.path : ''"
      />
      <img
        class="img_p"
        style="margin-left: 20px"
        :src="info.school_img_2_path ? info.school_img_2_path.path : ''"
      />
    </div>

    <div class="t1" style="margin-top: 80px;">联系人信息</div>
    <div class="w400 mt40">
      <el-checkbox v-model="select_options[10].selected"></el-checkbox>
      <span class="t2">联系人：{{info.contact}}</span>
    </div>
    <div class="w400 mt20">
      <el-checkbox v-model="select_options[11].selected"></el-checkbox>
      <span class="t2">联系电话：{{info.contact_phone}}</span>
    </div>
    <div class="w400 mt20">
      <el-checkbox v-model="select_options[12].selected"></el-checkbox>
      <span class="t2">工作邮箱：{{info.work_email}}</span>
    </div>

    <div class="buttons">
      <el-button class="btn_l btn1" v-on:click="finish" v-if="info.status == 1">完成审核</el-button>
      <el-button class="btn_r btn2" v-on:click="back">取消</el-button>
    </div>
  </div>
</template>

<script src="./companycheckinfo.js"></script>
<style src="./companycheckinfo.css" scoped></style>
