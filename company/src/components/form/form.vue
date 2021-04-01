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
      <div class="title_selected t1">入驻申请</div>
      <div class="t2" :class="[active > 0 ?'title_selected':'title']">资料审核</div>
      <div class="t3" :class="[active > 1 ?'title_selected':'title']">审核结果</div>
    </div>

    <div class="detail" v-if="active == 0">
      <div class="main_title">机构信息</div>

      <el-row class="row">
        <el-col :span="5">
          <div class="form_title fl">学校名称</div>
          <span class="required fl">*</span>
        </el-col>
        <el-col :span="10">
          <el-input class="el_input fl" placeholder="请输入学校名称" v-model="user_info.company_name"></el-input>
        </el-col>
      </el-row>

      <el-row class="row">
        <el-col :span="5">
          <div class="form_title fl">机构LOGO</div>
          <!-- <span class="required fl">*</span> -->
        </el-col>
        <el-col :span="6">
          <el-upload
            v-loading="isloading"
            action
            :show-file-list="false"
            :auto-upload="false"
            :on-change="onchangeUpload_logo"
            list-type="picture-card"
            style="margin-top: 10px; margin-left: 20px"
            accept="image/png, image/gif, image/jpg, image/jpeg"
          >
            <i class="el-icon-plus upload_icon">
              <div class="upload_text">点击上传图片</div>
            </i>
          </el-upload>
        </el-col>

        <el-col :span="8" v-if="logo_path">
          <img style="margin-top: 10px; height: 146px;" :src="logo_path" />
        </el-col>
      </el-row>

      <el-row class="row">
        <el-col :span="5">
          <div class="form_title fl">学校类型</div>
          <span class="required fl">*</span>
        </el-col>
        <el-col :span="15">
          <el-checkbox-group v-model="type" style="line-height:40px;">
            <el-checkbox v-for="item in typeList" :label="item.id" :key="item.id">{{item.txt}}</el-checkbox>
          </el-checkbox-group>
        </el-col>
      </el-row>

      <el-row class="row">
        <el-col :span="5">
          <div class="form_title fl">学校地址</div>
          <span class="required fl">*</span>
        </el-col>
        <el-col :span="9">
          <div style="margin-left: 20px; width: 280px">
            <el-cascader
              placeholder="请选择省市区"
              :options="cascaderData"
              @change="handleChange"
              :props="{value: 'id', label: 'name', lazy: true, lazyLoad: cascader_load}"
              style="width: 100%"
            ></el-cascader>
          </div>
        </el-col>
      </el-row>

      <el-row class="row">
        <el-col :span="5">
          <div class="form_title fl">详细地址</div>
          <span class="required fl">*</span>
        </el-col>
        <el-col :span="10">
          <el-input
            type="textarea"
            :rows="3"
            class="el_input fl"
            placeholder="请输入详细地址"
            v-model="user_info.address"
          ></el-input>
        </el-col>
      </el-row>

      <el-row class="row">
        <el-col :span="5">
          <div class="form_title fl">营业执照</div>
        </el-col>
        <el-col :span="10">
          <div style="margin-top: 10px; margin-left: 20px">
            <el-radio v-model="user_info.business_flg" :label="1">具备</el-radio>
            <el-radio v-model="user_info.business_flg" :label="0">不具备</el-radio>
          </div>
        </el-col>
      </el-row>

      <el-row class="row" v-if="user_info.business_flg == 1">
        <el-col :span="5">
          <div class="form_title fl">公司名称</div>
        </el-col>
        <el-col :span="19" style="margin-bottom:30px;">
          <el-input class="el_input fl" placeholder="请输入公司名称" v-model="user_info.business_name"></el-input>
        </el-col>
        <el-col :span="5">
          <div class="form_title fl">营业执照</div>
        </el-col>
        <el-col :span="6">
          <el-upload
            v-loading="isloading"
            action
            :show-file-list="false"
            :auto-upload="false"
            :on-change="onchangeUpload_business"
            list-type="picture-card"
            style="margin-top: 10px; margin-left: 20px"
            accept="image/png, image/gif, image/jpg, image/jpeg"
          >
            <i class="el-icon-plus upload_icon">
              <div class="upload_text">点击上传图片</div>
            </i>
          </el-upload>
        </el-col>

        <el-col :span="8" v-if="!business_img_path">
          <div class="explain">
            请上传有年检章的企业营业执照副本扫描件
            文件小于5M
            支持JPG/PNG/JPEG等格式文件
          </div>
        </el-col>

        <el-col :span="8" v-if="business_img_path">
          <img style="margin-top: 10px; height: 146px;" :src="business_img_path" />
        </el-col>
      </el-row>

      <el-row class="row">
        <el-col :span="5">
          <div class="form_title fl">办学许可资质</div>
        </el-col>
        <el-col :span="10">
          <div style="margin-top: 10px; margin-left: 20px">
            <el-radio v-model="user_info.talent" :label="1">具备</el-radio>
            <el-radio v-model="user_info.talent" :label="0">不具备</el-radio>
          </div>
        </el-col>
      </el-row>

      <el-row class="row" v-if="user_info.talent == 1">
        <el-col :span="5">
          <div class="form_title fl">办学许可资质证书</div>
        </el-col>
        <el-col :span="6">
          <el-upload
            v-loading="isloading"
            action
            :show-file-list="false"
            :auto-upload="false"
            :on-change="onchangeUpload_talent"
            list-type="picture-card"
            style="margin-top: 10px; margin-left: 20px"
            accept="image/png, image/gif, image/jpg, image/jpeg"
          >
            <i class="el-icon-plus upload_icon">
              <div class="upload_text">点击上传图片</div>
            </i>
          </el-upload>
        </el-col>

        <el-col :span="8">
          <img style="margin-top: 10px; height: 146px;" :src="talent_img_path" />
        </el-col>
      </el-row>

      <el-row class="row">
        <el-col :span="5">
          <div class="form_title fl">学生年龄</div>
          <span class="required fl">*</span>
        </el-col>
        <el-col :span="15">
          <el-checkbox-group
            v-model="user_info.student_age"
            :min="0"
            :max="5"
            style="margin-top: 10px; margin-left: 20px"
          >
            <el-checkbox v-for="(age, index) in ages" :label="index + 1" :key="age">{{age}}</el-checkbox>
          </el-checkbox-group>
          <!-- <div style="margin-top: 10px; margin-left: 20px">
            <el-radio v-model="user_info.student_age" :label="1">1-4岁 &nbsp&nbsp</el-radio>
            <el-radio v-model="user_info.student_age" :label="2">5-9岁</el-radio>
            <el-radio v-model="user_info.student_age" :label="3">9-13岁</el-radio>
          </div>

          <div style="margin-top: 10px; margin-left: 20px">
            <el-radio v-model="user_info.student_age" :label="4">14-17岁</el-radio>
            <el-radio v-model="user_info.student_age" :label="5">18+years old</el-radio>
          </div>-->
        </el-col>
      </el-row>

      <!-- <el-row class="row">
        <el-col :span="5">
          <div class="form_title fl">外籍员工人数</div>
          <span class="required fl">*</span>
        </el-col>
        <el-col :span="10">
          <el-input
            oninput="value=value.replace(/[^\d]/g,'')"
            class="el_input fl"
            style="width: 180px"
            placeholder="请输入外籍员工人数"
            v-model="user_info.abroad_staff"
          ></el-input>
          <span class="form_title">&nbsp&nbsp名</span>
        </el-col>
      </el-row>-->

      <el-row class="row">
        <el-col :span="5">
          <div class="form_title fl">年度外教需求量</div>
          <span class="required fl">*</span>
        </el-col>
        <el-col :span="15">
          <div style="margin-top: 10px; margin-left: 20px">
            <el-radio v-model="user_info.needs_num" :label="1">1-3</el-radio>
            <el-radio v-model="user_info.needs_num" :label="2">3-6</el-radio>
            <el-radio v-model="user_info.needs_num" :label="3">6-10</el-radio>
            <el-radio v-model="user_info.needs_num" :label="4">10-20</el-radio>
            <el-radio v-model="user_info.needs_num" :label="5">20-50</el-radio>
            <el-radio v-model="user_info.needs_num" :label="6">50及以上</el-radio>
          </div>
        </el-col>
      </el-row>

      <!-- <el-row class="row">
        <el-col :span="5">
          <div class="form_title fl">月均薪资范围(税后)</div>
          <span class="required fl">*</span>
        </el-col>
        <el-col :span="15">
          <div style="margin-top: 10px; margin-left: 20px">
            <el-radio v-model="user_info.pay" :label="1">15000元以下</el-radio>
            <el-radio v-model="user_info.pay" :label="2">15000-20000元</el-radio>
            <el-radio v-model="user_info.pay" :label="3">20000元以上</el-radio>
          </div>
        </el-col>
      </el-row>-->

      <el-row class="row">
        <el-col :span="5">
          <div class="form_title fl">机构/校区图片一</div>
          <!-- <span class="required fl">*</span> -->
        </el-col>
        <el-col :span="6">
          <el-upload
            v-loading="isloading"
            action
            :show-file-list="false"
            :auto-upload="false"
            :on-change="onchangeUpload_school_1"
            list-type="picture-card"
            style="margin-top: 10px; margin-left: 20px"
            accept="image/png, image/gif, image/jpg, image/jpeg"
          >
            <i class="el-icon-plus upload_icon">
              <div class="upload_text">点击上传图片</div>
            </i>
          </el-upload>
        </el-col>

        <el-col :span="8" v-if="!school_img_1_path">
          <div class="explain">请上传两张校区图片，便于平台了解</div>
        </el-col>

        <el-col :span="8" v-if="school_img_1_path">
          <img style="margin-top: 10px; height: 146px;" :src="school_img_1_path" />
        </el-col>
      </el-row>

      <el-row class="row">
        <el-col :span="5">
          <div class="form_title fl">机构/校区图片二</div>
          <!-- <span class="required fl">*</span> -->
        </el-col>
        <el-col :span="6">
          <el-upload
            v-loading="isloading"
            action
            :show-file-list="false"
            :auto-upload="false"
            :on-change="onchangeUpload_school_2"
            list-type="picture-card"
            style="margin-top: 10px; margin-left: 20px"
            accept="image/png, image/gif, image/jpg, image/jpeg"
          >
            <i class="el-icon-plus upload_icon">
              <div class="upload_text">点击上传图片</div>
            </i>
          </el-upload>
        </el-col>

        <el-col :span="8" v-if="!school_img_2_path">
          <div class="explain">请上传两张校区图片，便于平台了解</div>
        </el-col>

        <el-col :span="8" v-if="school_img_2_path">
          <img style="margin-top: 10px; height: 146px;" :src="school_img_2_path" />
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="5">
          <div class="form_title fl">学校英文简介</div>
        </el-col>
        <el-col :span="10">
          <el-input
            type="textarea"
            :rows="5"
            onkeyup="value=value.replace(/[\u4e00-\u9fa5]/g,'')"
            class="el_textarea"
            placeholder="Please introduce your school"
            maxlength="100000"
            v-model="user_info.school_en_info"
          ></el-input>
        </el-col>
      </el-row>

      <div class="main_title">联系人信息</div>

      <el-row class="row">
        <el-col :span="5">
          <div class="form_title fl">联系人姓名</div>
          <span class="required fl">*</span>
        </el-col>
        <el-col :span="10">
          <el-input class="el_input fl" placeholder="请输入联系人姓名" v-model="user_info.contact"></el-input>
        </el-col>
      </el-row>

      <el-row class="row">
        <el-col :span="5">
          <div class="form_title fl">联系电话</div>
          <span class="required fl">*</span>
        </el-col>
        <el-col :span="10">
          <el-input
            class="el_input fl"
            placeholder="请输入联系人电话"
            v-model="user_info.contact_phone"
            maxlength="11"
          ></el-input>
        </el-col>
      </el-row>

      <el-row class="row">
        <el-col :span="5">
          <div class="form_title fl">工作邮箱</div>
          <!-- <span class="required fl">*</span> -->
        </el-col>
        <el-col :span="10">
          <el-input class="el_input fl" placeholder="请输入工作邮箱" v-model="user_info.work_email"></el-input>
        </el-col>
      </el-row>

      <div class="buttons">
        <el-button class="btn_l btn1" v-on:click="submit_and_next">提交</el-button>
      </div>
    </div>

    <div v-if="active == 1" class="detail">
      <div class="act_1">
        <i class="el-icon-success icon"></i>
        <span class="title">您的资料已提交成功，我们将在1-3个工作日内完成审核,立即添加详细招聘需求，让专属顾问为您进行定制化外教推荐服务</span>
      </div>

      <div class="buttons">
        <el-button class="btn_l btn2" v-on:click="to_home">返回首页</el-button>
        <el-button
          class="btn_l btn1"
          v-on:click="write_needs"
          v-if="job_list.length == 0"
          style="margin-left: 20px"
        >填写需求</el-button>
        <el-button
          class="btn_l btn1"
          v-on:click="check_needs"
          v-if="job_list.length > 0"
          style="margin-left: 20px"
        >查看需求</el-button>
      </div>
    </div>

    <div v-if="active == 2" class="detail">
      <i class="el-icon-success success_icon"></i>
      <div class="success_div">
        <span class="s1">恭喜您，企业认证成功，</span>
        <span class="s2" v-on:click="read_success">点击跳转</span>
      </div>
    </div>

    <div v-if="active == 3" class="detail">
      <i class="el-icon-error failed_icon"></i>
      <div class="success_div">
        <div class="s1">抱歉，您的企业认证申请审核未通过，原因：</div>
        <div class="s1" style="margin-top: 20px">{{info.info}}</div>
        <div style="margin-top: 20px">
          <span class="s1">请</span>
          <span class="s2" v-on:click="read_failed">重新填写入驻信息</span>
          <span class="s1">提交，感谢您对寰球阿帕斯的支持，期待您的加入</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./form.js"></script>
<style src="./form.css" scoped></style>
