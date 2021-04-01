<template>
  <div class="content">
    <el-button class="mt40" @click="back">返回</el-button>

    <div class="t1 mt40" style="width: 400px">招聘需求</div>

    <div class="job_list">
      <div
        v-for="(item, index) in job_list"
        :key="index"
        class="job_card"
        v-on:click="job_card_click(item)"
      >
        <div class="job_card_t1">{{item.name}}</div>
        <div class="job_card_t2">{{job_years[item.job_year - 1]}}教学经验</div>
        <div class="job_card_t2">{{edu_types[item.edu_type - 1]}}</div>
      </div>
    </div>

    <div class="t1 mt40 fl" style="width: 400px">机构信息</div>
    <el-button class="edit_btn fr" @click="editCompany">编辑</el-button>
    <div class="mt40">
      <div class="w400 fl">
        <span class="t2 st3" v-on:click="edit('company_name')">学校名称：{{info.company_name}}</span>
      </div>
      <div class="fr">
        <span class="t2 st3" v-on:click="edit_dialog('student_age')">学生年龄：{{get_student_age()}}</span>
      </div>
    </div>

    <div class="mt40">
      <div class="w400 fl">
        <span class="t2 st3" v-on:click="edit_dialog('type')">学校类型：{{get_type()}}</span>
      </div>
      <!-- <div class="fr">
        <span class="t2 st3" v-on:click="edit('abroad_staff')">外籍员工人数：{{info.abroad_staff}}人</span>
      </div>-->
    </div>

    <div class="mt40">
      <div class="w400 fl">
        <span
          class="t2 st3"
          v-on:click="edit_dialog('city')"
        >办公地址：{{info.city_name ? info.city_name.merger_name : ''}}</span>
      </div>
      <!-- <div class="fr">
        <span class="t2 st3" v-on:click="edit_dialog('needs_num')">年度外教需求量：{{get_needs_num()}}</span>
      </div>-->
    </div>

    <div class="mt40">
      <div class="w400 fl">
        <span
          class="t2 st3"
          v-on:click="edit_dialog('talent')"
        >办学许可资质：{{info.talent ? '具备' : '不具备'}}</span>
      </div>
      <div class="fr">
        <span class="t2 st3" v-on:click="edit_dialog('pay')">&nbsp;&nbsp;&nbsp;</span>
      </div>
    </div>

    <div class="mt40">
      <div class="w400 fl">
        <span class="t2">办学资质证书</span>
      </div>
      <div class="fr">
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
        <span class="t2">校区图片一</span>
      </div>
      <div class="fr">
        <span class="t2">校区图片二</span>
      </div>
    </div>

    <div class="mt40" style="height: 200px">
      <img class="img_p" :src="info.school_img_1_path ? info.school_img_1_path.path : ''" />
      <img
        class="img_p"
        style="margin-left: 20px"
        :src="info.school_img_2_path ? info.school_img_2_path.path : ''"
      />
    </div>

    <div class="mt40" style="height: 200px">
      <div class="w400">
        <span class="t2">学校英文简介</span>
      </div>
      <el-col :span="18" style="margin-top:20px;">
        <el-input
          type="textarea"
          :rows="5"
          onkeyup="value=value.replace(/[\u4e00-\u9fa5]/g,'')"
          class="el_textarea"
          placeholder="Please introduce your school"
          maxlength="100000"
          v-model="info.school_en_info"
          disabled
        ></el-input>
      </el-col>
    </div>

    <div class="t1" style="margin-top: 80px;">联系人信息</div>
    <div class="w400 mt40">
      <span class="t2 st3" v-on:click="edit('contact')">联系人：{{info.contact}}</span>
    </div>
    <div class="w400 mt20">
      <span class="t2 st3" v-on:click="edit('contact_phone')">联系电话：{{info.contact_phone}}</span>
    </div>
    <div class="w400 mt20">
      <span class="t2 st3" v-on:click="edit('work_email')">工作邮箱：{{info.work_email}}</span>
    </div>

    <el-dialog :visible.sync="dialogFormVisible">
      <div style="margin-top: 10px; margin-left: 20px" v-if="dialog_title == 'student_age'">
        <el-checkbox-group
          v-model="student_ages"
          :min="0"
          :max="5"
          style="margin-top: 10px; margin-left: 20px"
        >
          <el-checkbox v-for="(age, index) in ages" :label="index + 1" :key="age">{{age}}</el-checkbox>
        </el-checkbox-group>
      </div>

      <div style="margin-top: 10px; margin-left: 20px" v-if="dialog_title == 'type'">
        <el-checkbox-group v-model="type" style="line-height:40px;">
          <el-checkbox v-for="item in typeList" :label="item.id" :key="item.id">{{item.txt}}</el-checkbox>
        </el-checkbox-group>
        <!-- <el-radio v-model="type" :label="1">培训机构</el-radio>
        <el-radio v-model="type" :label="2">公立学校</el-radio>
        <el-radio v-model="type" :label="3">私立学校</el-radio>
        <el-radio v-model="type" :label="4">中介机构</el-radio>
        <el-radio v-model="type" :label="5">幼儿园 &nbsp&nbsp</el-radio>
        <el-radio v-model="type" :label="6">其他</el-radio>-->
      </div>

      <div style="margin-top: 10px; margin-left: 20px" v-if="dialog_title == 'needs_num'">
        <!-- <el-radio v-model="needs_num" :label="1">1-20</el-radio>
        <el-radio v-model="needs_num" :label="2">21-50</el-radio>
        <el-radio v-model="needs_num" :label="3">51人以上</el-radio>-->

        <el-radio v-model="needs_num" :label="1">1-3</el-radio>
        <el-radio v-model="needs_num" :label="2">3-6</el-radio>
        <el-radio v-model="needs_num" :label="3">6-10</el-radio>
        <el-radio v-model="needs_num" :label="4">10-20</el-radio>
        <el-radio v-model="needs_num" :label="5">20-50</el-radio>
        <el-radio v-model="needs_num" :label="6">50及以上</el-radio>
      </div>

      <div style="margin-top: 10px; margin-left: 20px" v-if="dialog_title == 'talent'">
        <el-radio v-model="talent" :label="1">具备</el-radio>
        <el-radio v-model="talent" :label="0">不具备</el-radio>
      </div>

      <div style="margin-top: 10px; margin-left: 20px" v-if="dialog_title == 'pay'">
        <el-radio v-model="pay" :label="1">15000元以下</el-radio>
        <el-radio v-model="pay" :label="2">15000-20000元</el-radio>
        <el-radio v-model="pay" :label="3">20000元以上</el-radio>
      </div>

      <div style="margin-left: 20px; width: 280px" v-if="dialog_title == 'city'">
        <el-cascader
          placeholder="请选择省市区"
          :options="cascaderData"
          @change="handleChange"
          :props="{value: 'id', label: 'name', lazy: true, lazyLoad: cascader_load}"
          style="width: 100%"
        ></el-cascader>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialog_submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script src="./companyinfo.js"></script>
<style src="./companyinfo.css" scoped></style>
