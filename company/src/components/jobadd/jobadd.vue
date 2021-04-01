<template>
  <div class="content">
    <el-button class="btn_back" @click="go_back()">返回</el-button>
    <div :class="[back ? 'container' : '']">
      <div class="t1">职位详情</div>
      <el-row class="row">
        <el-col :span="4">
          <div class="form_title">职位名称</div>
          <span class="required">*</span>
        </el-col>
        <el-col :span="10">
          <el-input
            onkeyup="value=value.replace(/[\u4e00-\u9fa5]/g,'')"
            class="el_input fl"
            placeholder="Please enter the job title"
            v-model="info.name"
            style="width: 100%"
            maxlength="100"
            show-word-limit
          ></el-input>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="4">
          <div class="form_title">工作地点</div>
          <span class="required">*</span>
        </el-col>
        <el-col :span="10">
          <div style="width: 100%">
            <el-cascader
              placeholder="请选择省市区"
              :options="cascaderData"
              @change="handleChange"
              :props="{
                value: 'id',
                label: 'pinyin',
                lazy: true,
                lazyLoad: cascader_load,
              }"
              style="width: 100%"
              clearable
            ></el-cascader>
          </div>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="4">
          <div class="form_title">工作类型</div>
          <span class="required">*</span>
        </el-col>
        <el-col :span="10">
          <el-select v-model="info.type" style="width: 100%">
            <el-option
              v-for="item in type_list"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="4">
          <div class="form_title">工作性质</div>
          <span class="required">*</span>
        </el-col>
        <el-col :span="10">
          <el-select v-model="info.work_type" style="width: 100%">
            <el-option
              v-for="item in work_type_list"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="4">
          <div class="form_title">学生年龄</div>
        </el-col>
        <el-col :span="19" style="line-height: 40px">
          <el-checkbox-group v-model="info.student_age" :min="0" :max="5">
            <el-checkbox v-for="(age, index) in ages" :label="index + 1" :key="age">{{ age }}</el-checkbox>
          </el-checkbox-group>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="4">
          <div class="form_title">工作时长（每周）</div>
          <span class="required">*</span>
        </el-col>
        <el-col :span="15">
          <el-input
            v-model="startDuration"
            placeholder="eg.35"
            type="number"
            min="1"
            style="width: 20%"
          ></el-input>-
          <el-input
            v-model="endDuration"
            placeholder="eg.40"
            type="number"
            min="1"
            style="width: 20%"
          ></el-input>
          <span style="display: inline-block; margin-left: 10px">hours</span>
          <span v-show="job_day_time_max">
            <span class="to">-</span>
            <el-select v-model="job_day_time_max" style="width: 180px">
              <el-option
                v-for="item in job_day_time_max_list"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </span>
        </el-col>
      </el-row>

      <el-row class="row">
        <el-col :span="4">
          <div class="form_title">教学时长（每周）</div>
          <span class="required">*</span>
        </el-col>
        <el-col :span="15">
          <el-input
            v-model="teaching_time1"
            placeholder="eg.20"
            type="number"
            min="1"
            style="width: 20%"
          ></el-input>-
          <el-input
            v-model="teaching_time2"
            placeholder="eg.25"
            type="number"
            min="1"
            style="width: 20%"
          ></el-input>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="4">
          <div class="form_title">薪资(￥)</div>
          <span class="required">*</span>
        </el-col>
        <el-col :span="15">
          <el-input
            v-model="pay_min"
            type="number"
            min="1"
            placeholder="e.g10000"
            style="width: 20%"
          ></el-input>-
          <el-input
            v-model="pay_max"
            placeholder="e.g20000"
            type="number"
            min="1"
            style="width: 20%"
          ></el-input>
          <span style="display: inline-block; margin-left: 10px">RMB</span>
          <el-select v-model="info.pay_unit" placeholder="请选择">
            <el-option
              v-for="item in allPayUnit"
              :key="item.id"
              :label="item.value"
              :select="info.pay_unit"
              :value="item.id"
            >{{item.value}}</el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-row class="row">
        <el-col :span="4">
          <div class="form_title">招聘人数</div>
          <span class="required">*</span>
        </el-col>
        <el-col :span="15">
          <el-input class="el_input" oninput="value=value.replace(/[^\d]/g,'')" v-model="info.num"></el-input>
          <span class="to_text">人</span>
        </el-col>
      </el-row>

      <el-row class="row">
        <el-col :span="4">
          <div class="form_title">计划上岗时间</div>
          <span class="required">*</span>
        </el-col>
        <el-col :span="15">
          <el-date-picker
            v-model="info.start_time"
            type="month"
            placeholder="请选择时间"
            style="width: 180px"
            format="yyyy-MM"
            value-format="yyyy-MM"
          ></el-date-picker>
          <!-- <span class="to">-</span>
          <el-date-picker
            v-model="info.end_time"
            type="month"
            placeholder="招聘结束时间"
            style="width: 180px"
            format="yyyy-MM"
            value-format="yyyy-MM"
          ></el-date-picker>-->
        </el-col>
      </el-row>

      <el-row class="row">
        <el-col :span="4">
          <div class="form_title" style="line-height: 25px">福利</div>
        </el-col>
        <el-col :span="15" style="position: relative;">
          <div class="fuli_tags">
            <div
              class="fuli_tags_item"
              v-for="(item,index) in benefits_tag"
              @click="fuli_tag_clik(index)"
              :key="item.id"
              :class="benefits_tag[index].flg ? 'fuli_tags_active' : ''"
            >{{item.value}}</div>
          </div>
          <el-input
            type="textarea"
            :rows="5"
            class="el_textarea"
            onkeyup="value=value.replace(/[\u4e00-\u9fa5]/g,'')"
            placeholder="Please enter the welfare"
            v-model="info.benefits"
            maxlength="10000"
            show-word-limit
          ></el-input>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="4">
          <div class="form_title" style="line-height: 25px">工作介绍</div>
          <span class="required" style="line-height: 25px">*</span>
        </el-col>
        <el-col :span="15" style="position: relative;">
          <el-input
            type="textarea"
            :rows="5"
            class="el_textarea"
            onkeyup="value=value.replace(/[\u4e00-\u9fa5]/g,'')"
            placeholder="Please enter a brief job description"
            v-model="info.job_info"
            maxlength="10000"
            show-word-limit
          ></el-input>
        </el-col>
      </el-row>
      <div class="t1">职位要求</div>
      <el-row class="row">
        <el-col :span="4">
          <div class="form_title">国籍要求</div>
          <span class="required">*</span>
        </el-col>
        <el-col :span="10">
          <el-select v-model="info.first_language" style="width: 100%">
            <el-option
              v-for="item in language_list"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="4">
          <div class="form_title">肤色要求</div>
        </el-col>
        <el-col :span="10">
          <el-select v-model="info.colour" style="width: 100%">
            <el-option
              v-for="item in colour_list"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="4">
          <div class="form_title">性别</div>
          <span class="required">*</span>
        </el-col>
        <el-col :span="10">
          <el-select v-model="info.sex" style="width: 100%">
            <el-option
              v-for="item in sex_list"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="4">
          <div class="form_title">学历要求</div>
          <span class="required">*</span>
        </el-col>
        <el-col :span="19" style="line-height: 40px">
          <el-radio v-model="info.edu_type" :label="1">Bachelor and above</el-radio>
          <el-radio v-model="info.edu_type" :label="2">Master and above</el-radio>
          <el-radio v-model="info.edu_type" :label="3">PHD and above</el-radio>
          <el-radio v-model="info.edu_type" :label="4">Any</el-radio>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="4">
          <div class="form_title">教学资质证书</div>
        </el-col>
        <el-col :span="10">
          <el-select v-model="info.cert" style="width: 100%">
            <el-option
              v-for="item in cert_list"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="4">
          <div class="form_title">签证要求</div>
          <span class="required">*</span>
        </el-col>
        <el-col :span="10">
          <el-select v-model="info.visa_ask" style="width: 100%">
            <el-option
              v-for="item in visa_ask_list"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="4">
          <div class="form_title">教学经验</div>
          <span class="required">*</span>
        </el-col>
        <el-col :span="10">
          <el-select v-model="info.job_year" style="width: 100%">
            <el-option
              v-for="item in job_year_list"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-button class="btn" @click="submit()">提交</el-button>
    </div>
  </div>
</template>

<script src="./jobadd.js"></script>
<style src="./jobadd.css" scoped></style>
