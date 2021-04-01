<template>
  <div class="content">
    <el-button class="btn_back" @click="go_back()">返回</el-button>
    <div :class="[back ? 'container' : '']">
      <div class="t1">职位详情</div>
      <el-row class="row">
        <el-col :span="4">
          <div class="form_title">职位名称</div>
        </el-col>
        <el-col :span="10">
          <div class="t2">{{ info.name }}</div>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="4">
          <div class="form_title">工作地点</div>
        </el-col>
        <el-col :span="10">
          <div class="t2">{{ cascader }}</div>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="4">
          <div class="form_title">工作类型</div>
        </el-col>
        <el-col :span="10">
          <div class="t2">{{ get_type() }}</div>
        </el-col>
      </el-row>

      <el-row class="row">
        <el-col :span="4">
          <div class="form_title">工作性质</div>
        </el-col>
        <el-col :span="10">
          <div class="t2">{{ get_work_type() }}</div>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="4">
          <div class="form_title">学生年龄</div>
        </el-col>
        <el-col :span="10">
          <div class="t2">{{ get_student_age() }}</div>
        </el-col>
      </el-row>

      <el-row class="row">
        <el-col :span="4">
          <div class="form_title">工作时长（每周）</div>
        </el-col>
        <el-col :span="10">
          <div class="t2">{{ get_job_day_time() }}</div>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="4">
          <div class="form_title">教学时长（每周）</div>
        </el-col>
        <el-col :span="10">
          <div class="t2">{{ get_job_teaching_time() }}</div>
        </el-col>
      </el-row>

      <el-row class="row">
        <el-col :span="4">
          <div class="form_title">薪资</div>
        </el-col>
        <el-col :span="15">
          <div class="t2">{{ info.pay ? info.pay.replace(",", "-"): ''}} / {{ allPayUnitValue }}</div>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="4">
          <div class="form_title">招聘人数</div>
        </el-col>
        <el-col :span="15">
          <div class="t2">{{ info.num }}人</div>
        </el-col>
      </el-row>

      <el-row class="row">
        <el-col :span="4">
          <div class="form_title">计划上岗时间</div>
        </el-col>
        <el-col :span="15">
          <div class="t2">{{ info.start_time ? info.start_time.replace("-", ".") : '' }}</div>
        </el-col>
      </el-row>

      <el-row class="row">
        <el-col :span="4">
          <div class="form_title" style="line-height: 25px">福利</div>
        </el-col>
        <el-col :span="15">
          <div class="fuli_tags">
            <div
              class="fuli_tags_item"
              v-for="(item,index) in benefits_tag"
              :key="item.id"
              :class="benefits_tag[index].flg ? 'fuli_tags_active' : ''"
            >{{item.value}}</div>
          </div>
          <div class="t3">{{ info.benefits }}</div>
        </el-col>
      </el-row>

      <el-row class="row">
        <el-col :span="4">
          <div class="form_title" style="line-height: 25px">工作介绍</div>
        </el-col>
        <el-col :span="15">
          <div class="t3">{{ info.job_info }}</div>
        </el-col>
      </el-row>
      <div class="t1">职位要求</div>

      <el-row class="row">
        <el-col :span="4">
          <div class="form_title">国籍要求</div>
        </el-col>
        <el-col :span="10">
          <div class="t2">{{ get_first_language() }}</div>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="4">
          <div class="form_title">肤色要求</div>
        </el-col>
        <el-col :span="10">
          <div class="t2">{{ get_colour() }}</div>
        </el-col>
      </el-row>

      <el-row class="row">
        <el-col :span="4">
          <div class="form_title">性别</div>
        </el-col>
        <el-col :span="10">
          <div class="t2">{{ get_sex() }}</div>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="4">
          <div class="form_title">学历要求</div>
        </el-col>
        <el-col :span="19">
          <div class="t2">{{ get_edu_type() }}</div>
        </el-col>
      </el-row>

      <el-row class="row">
        <el-col :span="4">
          <div class="form_title">教学资质证书</div>
        </el-col>
        <el-col :span="19">
          <div class="t2">{{ get_cert() }}</div>
        </el-col>
      </el-row>

      <el-row class="row">
        <el-col :span="4">
          <div class="form_title">签证要求</div>
        </el-col>
        <el-col :span="10">
          <div class="t2">{{ get_visa_ask() }}</div>
        </el-col>
      </el-row>

      <el-row class="row">
        <el-col :span="4">
          <div class="form_title">教学经验</div>
        </el-col>
        <el-col :span="10">
          <div class="t2">{{ get_job_year() }}</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script src="./jobdesc.js"></script>
<style src="./jobdesc.css" scoped></style>
