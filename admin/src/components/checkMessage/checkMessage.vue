<template>
  <div class="content">
    <h5 class="title_con">Basic information</h5>
    <el-row :gutter="60" class="el_row">
      <el-col :span="12">
        <span class="sub_title">Name</span>
        <span class="sub_required">*</span>
        <el-row :gutter="10" class="mt_10">
          <el-col :span="12">
            <el-input v-model="firstName" placeholder="Frist Name"></el-input>
          </el-col>
          <el-col :span="12">
            <el-input v-model="lastName" placeholder="Last Name"></el-input>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <span class="sub_title">Phone Number</span>
        <div class="country_phone_number">
          <el-select
            v-model="area_code"
            filterable
            placeholder=""
            class="mt_10"
            style="width: 100%; margin-right: 10px"
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.titleKey"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-input
            v-model="phoneNumber"
            placeholder
            class="mt_10"
            type="number"
          ></el-input>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="60" class="el_row">
      <el-col :span="12">
        <span class="sub_title">Gender</span>
        <span class="sub_required">*</span>
        <div class="mt_20">
          <el-radio v-model="sex" :label="0">Male</el-radio>
          <el-radio v-model="sex" :label="1">Female</el-radio>
        </div>
      </el-col>
      <el-col :span="12">
        <span class="sub_title">Whatsapp/Skype/Wechat</span>
        <span class="sub_required">*</span>
        <div class="country_phone_number">
          <el-select
            v-model="comm_type"
            filterable
            placeholder=""
            class="mt_10"
            style="width: 65%; margin-right: 10px"
          >
            <el-option
              v-for="item in contactCodeOptions"
              :key="item.id"
              :label="item.contactType"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-input v-model="wechat" placeholder class="mt_10"></el-input>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="60" class="el_row">
      <el-col :span="12">
        <span class="sub_title">Date of Birth</span>
        <span class="sub_required">*</span>
        <div class="mt_10">
          <el-date-picker
            v-model="brithday"
            type="date"
            placeholder="Select Date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            style="width: 100%"
          ></el-date-picker>
        </div>
      </el-col>

      <el-col :span="12">
        <span class="sub_title">Are you in China?</span>
        <div class="mt_20">
          <el-radio v-model="in_domestic" :label="0">No</el-radio>
          <el-radio v-model="in_domestic" :label="1">Yes</el-radio>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="60" class="el_row">
      <el-col :span="12">
        <span class="sub_title">Nationality</span>
        <span class="sub_required">*</span>
        <div class="mt_10">
          <el-select
            v-model="nationality"
            filterable
            style="width: 100%"
            placeholder=""
          >
            <el-option
              v-for="item in countryList"
              :key="item.id"
              :label="item.code"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="12" v-if="in_domestic == 0">
        <span class="sub_title">Current Location</span>
        <el-select
          v-model="country"
          filterable
          style="width: 100%"
          class="mt_10"
          placeholder=""
        >
          <el-option
            v-for="item in countryList"
            :key="item.id"
            :label="item.code"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-col>

      <el-col :span="12" v-if="in_domestic == 1">
        <el-row :gutter="15">
          <el-col :span="12">
            <span class="sub_title">Visa Type</span>
            <el-select
              v-model="visa_type"
              style="width: 100%"
              class="mt_10"
              placeholder=""
            >
              <el-option
                v-for="item in visa_type_list"
                :key="item.id"
                :label="item.code"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-col>

          <el-col :span="12">
            <span class="sub_title">Date of Expiry</span>
            <div class="mt_10">
              <el-date-picker
                v-model="visa_exp_date"
                type="date"
                placeholder="Select Date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                style="width: 100%"
              ></el-date-picker>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-row :gutter="60" class="el_row" v-if="in_domestic == 1">
      <el-col :span="12">
        <div style="width: 100%; height: 1px"></div>
      </el-col>
      <el-col :span="12">
        <span class="sub_title">Current Location</span>
        <el-row :gutter="15" class="mt_10">
          <el-col :span="10">
            <el-select
              v-model="provinceSelect_china"
              placeholder=""
              @change="provinceChange"
            >
              <el-option
                v-for="item in provinceList"
                :key="item.id"
                :label="item.pinyin"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="10">
            <el-select
              v-model="china_address"
              placeholder=" "
              no-data-text="Choose the left first."
            >
              <el-option
                v-for="item in cityList_china"
                :key="item.id"
                :label="item.pinyin"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="2">
            <el-button
              type
              icon="el-icon-delete"
              @click="clearAddress"
            ></el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <h5 class="title_con" style="margin-top: 20px">Education information</h5>
    <div class="education_wrapper">
      <h5>Education Background<span class="xing">*</span></h5>
      <div
        class="picker_wrapper"
        v-for="(item, index) in education"
        :key="index"
      >
        <el-date-picker
          v-model="item.edu_start_time"
          value-format="yyyy-MM"
          type="month"
          placeholder="Start Time"
          class="cell_item"
        ></el-date-picker>
        <el-date-picker
          v-model="item.edu_end_time"
          value-format="yyyy-MM"
          type="month"
          placeholder="End Time"
          class="cell_item"
        ></el-date-picker>
        <el-input
          v-model="item.school"
          placeholder="University"
          class="cell_item"
        ></el-input>
        <el-input
          v-model="item.major"
          placeholder="Major"
          class="cell_item"
        ></el-input>
        <el-button
          type="primary"
          @click="addEducation"
          v-if="item.show == 1 || item.show == null"
          >+Add</el-button
        >
        <el-button type="danger" v-else @click="deleteEducation(index)"
          >Delete</el-button
        >
      </div>
    </div>
    <el-row :gutter="60" class="el_row" style="margin-bottom:20px;">
      <el-col :span="12">
        <span class="sub_title">Highest Degree</span>
        <span class="sub_required">*</span>
        <div class="mt_10">
          <el-select v-model="university" placeholder=" " style="width: 100%">
            <el-option
              v-for="item in degree"
              :key="item.id"
              :label="item.code"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
    <uploadComponents
      :type="0"
      :getImgUrl="childrenImgUrl"
      @uploadImgId="uploadImgId"
    ></uploadComponents>
    <el-row :gutter="60" class="el_row_2" style="margin-top:50px;">
      <el-col :span="20">
        <span class="sub_title">TEFL</span>
        <div class="mt_20">
          <el-radio v-model="edu_cert_flg" :label="1">Yes</el-radio>
          <el-radio v-model="edu_cert_flg" :label="0">No</el-radio>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="60" class="el_row_2" v-if="edu_cert_flg == 1">
      <el-col :span="12">
        <el-upload
          ref="upload"
          action="url"
          accept="image/png, image/jpg, image/jpeg"
          list-type="picture-card"
          :show-file-list="false"
          class="mt_10"
          :auto-upload="false"
          :on-change="changeUpload_tefl"
        >
          <i class="el-icon-plus upload_icon">
            <div class="upload_text">Picture upload</div>
          </i>
        </el-upload>
      </el-col>
      <el-col :span="12">
        <el-image
          v-if="edu_cert_imgs_path"
          style="width: 146px; height: 146px; margin-top: 10px"
          :src="edu_cert_imgs_path[0].path"
        ></el-image>
      </el-col>
    </el-row>

    <el-row :gutter="60" class="el_row_2">
      <el-col :span="20">
        <span class="sub_title">TESOL</span>
        <div class="mt_20">
          <el-radio v-model="edu_auth_flg" :label="1">Yes</el-radio>
          <el-radio v-model="edu_auth_flg" :label="0">No</el-radio>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="60" class="el_row_2" v-if="edu_auth_flg == 1">
      <el-col :span="12">
        <el-upload
          ref="upload"
          action
          accept="image/png, image/jpg, image/jpeg"
          list-type="picture-card"
          :show-file-list="false"
          :auto-upload="false"
          style="margin-top: 10px"
          :on-change="changeUpload_tesol"
        >
          <i class="el-icon-plus upload_icon">
            <div class="upload_text">Picture upload</div>
          </i>
        </el-upload>
      </el-col>
      <el-col :span="12">
        <el-image
          v-if="edu_auth_imgs_path"
          style="width: 146px; height: 146px; margin-top: 10px"
          :src="edu_auth_imgs_path[0].path"
        ></el-image>
      </el-col>
    </el-row>

    <el-row :gutter="60" class="el_row_2">
      <el-col :span="20">
        <span class="sub_title">CELTA</span>
        <div class="mt_20">
          <el-radio v-model="celta_flg" :label="2">Yes</el-radio>
          <el-radio v-model="celta_flg" :label="1">No</el-radio>
        </div>
      </el-col>
    </el-row>
    <div style="margin-top:20px;" v-show="celta_flg == 2">
      <uploadComponents
        :type="2"
        :getNotesName="childrenCeltaName"
        :limit="1"
        @uploadNotesId="uploadCeltaId"
        @notesName="celtaName"
      ></uploadComponents>
    </div>

    <el-row :gutter="60" class="el_row_2" style="margin-top:40px;">
      <el-col :span="20">
        <span class="sub_title">Others</span>
        <div class="mt_20">
          <el-radio v-model="cert_other_flg" :label="2">Yes</el-radio>
          <el-radio v-model="cert_other_flg" :label="1">No</el-radio>
        </div>
      </el-col>
    </el-row>
    <div style="margin-top:20px;" v-show="cert_other_flg == 2">
      <uploadComponents
        :type="2"
        :getNotesName="childrenOtherName"
        @uploadNotesId="uploadOtherId"
        @notesName="othersName"
      ></uploadComponents>
      <el-input
        v-model="cert_other"
        style="margin-top: 65px;width:450px;"
      ></el-input>
    </div>

    <el-row :gutter="60" class="el_row_2">
      <el-col :span="20">
        <span class="sub_title">None</span>
        <div class="mt_20">
          <el-radio-group v-model="none_flg" @change="noneChange">
            <el-radio :label="2">Yes</el-radio>
            <el-radio :label="1">No</el-radio>
          </el-radio-group>
        </div>
      </el-col>
    </el-row>

    <h5 class="title_con" style="margin-top: 70px">Job information</h5>
    <el-row :gutter="60" class="el_row">
      <el-col :span="12">
        <span class="sub_title">Working Years</span>
        <span class="sub_required">*</span>
        <el-select
          v-model="working_seniority"
          placeholder
          style="width: 100%"
          class="mt_10"
        >
          <el-option
            v-for="item in working_seniority_list"
            :key="item.id"
            :label="item.code"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="12">
        <span class="sub_title">Work Status</span>
        <div class="mt_20">
          <el-radio v-model="work_flg" :label="1">Employed</el-radio>
          <el-radio v-model="work_flg" :label="0">Unemployed</el-radio>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="60" class="el_row">
      <el-col :span="12">
        <span class="sub_title">Expected Salary</span>
        <span class="sub_required">*</span>
        <div class="mt_10">
          <el-select v-model="pay_type" placeholder=" " style="width: 100%">
            <el-option
              v-for="item in pay_type_list"
              :key="item.id"
              :label="item.code"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="60" class="el_row_2" v-show="in_domestic == 0">
      <el-col :span="20">
        <span class="sub_title">Relocate in China</span>
        <div class="mt_20">
          <el-radio-group v-model="relocate" @change="noneChange">
            <el-radio :label="2">Yes</el-radio>
            <el-radio :label="1">No</el-radio>
          </el-radio-group>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="60" class="el_row" v-if="relocate == 2">
      <el-col :span="12">
        <span class="sub_title">Preferred Job Locations</span>
        <span
          ><el-checkbox
            v-model="all_city"
            @change="preferredChange"
            style="margin-left:50px;"
            true-label="2"
            false-label="1"
            >Any city in China</el-checkbox
          ></span
        >
        <el-row :gutter="15" class="mt_10">
          <el-col :span="10">
            <el-select
              v-model="workingAnyProvince"
              placeholder=" "
              @change="provinceChange_working"
            >
              <el-option
                v-for="item in provinceList"
                :key="item.id"
                :label="item.pinyin"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="10">
            <el-select
              v-model="workingAnyCity"
              placeholder=" "
              no-data-text="Choose the left first"
            >
              <el-option
                v-for="item in cityList_china"
                :key="item.id"
                :label="item.pinyin"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="2">
            <el-button
              type
              icon="el-icon-plus"
              @click="showAllCitySelect"
            ></el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-row :gutter="60" class="el_row" v-show="showCitySecond">
      <el-col :span="12">
        <el-row :gutter="15" class="mt_10">
          <el-col :span="10">
            <el-select
              v-model="workingAnyProvinceSecond"
              placeholder=" "
              @change="provinceChange_working_second"
            >
              <el-option
                v-for="item in provinceList"
                :key="item.id"
                :label="item.pinyin"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="10">
            <el-select
              v-model="workingAnyCitySecond"
              placeholder=" "
              no-data-text="Choose the left first"
            >
              <el-option
                v-for="item in cityList_china"
                :key="item.id"
                :label="item.pinyin"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="2">
            <el-button
              type
              icon="el-icon-minus"
              @click="clearCitySecond"
            ></el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-row :gutter="60" class="el_row" v-show="showCityThird">
      <el-col :span="12">
        <el-row :gutter="15" class="mt_10">
          <el-col :span="10">
            <el-select
              v-model="workingAnyProvinceThird"
              placeholder=" "
              @change="provinceChange_working_third"
            >
              <el-option
                v-for="item in provinceList"
                :key="item.id"
                :label="item.pinyin"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="10">
            <el-select
              v-model="workingAnyCityThird"
              placeholder=" "
              no-data-text="Choose the left first"
            >
              <el-option
                v-for="item in cityList_china"
                :key="item.id"
                :label="item.pinyin"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="2">
            <el-button
              type
              icon="el-icon-minus"
              @click="clearCityThird"
            ></el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <div class="education_wrapper">
      <h5>Work Experience<span class="xing">*</span></h5>
      <div
        class="experience_wrapper"
        v-for="(item, index) in work_experiences"
        :key="index"
        style="margin-top:20px;"
      >
        <div class="input_wrapper">
          <div class="clearfix" style="position: relative;margin-bottom: 20px;">
            <el-date-picker
              v-model="item.start_time"
              value-format="yyyy-MM"
              type="month"
              placeholder="Start Time"
              class="cell_item fl"
            ></el-date-picker>
            <el-date-picker
              v-model="item.end_time"
              value-format="yyyy-MM"
              type="month"
              placeholder="End Time"
              class="cell_item fl"
              @change="work_experiences[index].now = ''"
            ></el-date-picker>
            <div class="present">
              <el-checkbox
                v-model="item.now"
                true-label="2"
                false-label="1"
                @change="presentChange(index)"
                >Present</el-checkbox
              >
            </div>
            <div>
              <el-button type="primary" @click="addWorkExperience"
                >+Add</el-button
              >
              <el-button
                type="danger"
                @click="deleteWorkExperience(index)"
                v-if="work_experiences > 1"
                >Delete</el-button
              >
            </div>
          </div>
          <el-input
            v-model="item.company_name"
            placeholder="Company name"
            class="cell_item fl"
          ></el-input>
          <el-input
            v-model="item.position"
            placeholder="Position"
            class="cell_item fl"
          ></el-input>
        </div>
        <el-input
          style="width:35%;"
          v-model="item.work_desc"
          placeholder="Please fill in your previous jobs"
          class="cell_item"
          type="textarea"
          autosize
        ></el-input>
      </div>
    </div>

    <el-row class="el_row">
      <el-col :span="24">
        <span class="sub_title">Preffered type of school</span>
        <el-row :gutter="15" class="mt_10">
          <el-col :span="24">
            <el-checkbox-group v-model="school_type">
              <el-checkbox
                v-for="(obj, index) in school_types"
                :label="index + 1"
                :key="obj"
              >
                {{ obj }}
              </el-checkbox>
            </el-checkbox-group>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-row :gutter="60" class="el_row">
      <el-col :span="12">
        <span class="sub_title">Job Type</span>
        <div class="mt_10">
          <el-select
            v-model="job_work_type"
            placeholder=" "
            style="width: 100%"
          >
            <el-option
              v-for="item in job_work_type_list"
              :key="item.id"
              :label="item.code"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="60" class="el_row">
      <el-col :span="12">
        <span class="sub_title">Job Category</span>
        <div class="mt_10">
          <el-select v-model="job_type" placeholder=" " style="width: 100%">
            <el-option
              v-for="item in job_type_list"
              :key="item.id"
              :label="item.code"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>

    <el-row class="el_row">
      <el-col :span="24">
        <span class="sub_title">Age of Students</span>
        <el-row :gutter="15" class="mt_10">
          <el-col :span="24">
            <el-checkbox-group v-model="student_age">
              <el-checkbox
                v-for="(obj, index) in student_ages"
                :label="index + 1"
                :key="obj"
              >
                {{ obj }}
              </el-checkbox>
            </el-checkbox-group>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-row :gutter="60" class="el_row_2">
      <el-col :span="12" class="mt_10">
        <span class="sub_title"
          >Upload your resume (Only pdf/docx/doc，Less than 50M.)</span
        >
        <el-upload
          ref="upload"
          action
          accept=".pdf, .docx, .doc"
          list-type="picture-card"
          :show-file-list="false"
          :auto-upload="false"
          style="margin-top: 20px"
          :on-change="resume_upload"
        >
          <i class="el-icon-plus upload_icon">
            <div class="upload_text">Upload resume</div>
          </i>
        </el-upload>
      </el-col>
      <el-col :span="12" v-show="notesName.length > 0">
        <div class="sub_title" v-for="(notes, index) in notesName" :key="index">
          <i class="el-icon-tickets"></i>
          {{ notes }}
          <el-button
            type="text"
            icon="el-icon-delete"
            @click="delNotes(index)"
          ></el-button>
        </div>
      </el-col>
    </el-row>

    <h5 class="title_con" style="margin-top: 20px">About me (text)</h5>

    <el-input
      type="textarea"
      placeholder="Please talk about yourself; your interests, hobbies and your previous work experience. Tell us why you want to come to China."
      v-model="desc"
      maxlength="2000"
      show-word-limit
      :rows="5"
      style="font-size: 16px; margin-top: 20px"
    ></el-input>

    <h5 class="title_con" style="margin-top: 20px">Upload your video</h5>
    <h6 class="title_tips">MP4 AVI 3GP MOV RMVB RM FLV, Less than 50M</h6>

    <el-row :gutter="60" class="el_row">
      <el-col :span="10">
        <el-upload
          v-loading="isloading"
          action
          class="avatar-uploader"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="onchangeUploadVideo"
          list-type="picture-card"
          style="margin-top: 10px"
          accept="video/mp4, video/avi, video/3gp, video/*, video/rmvb, video/rm, video/flv"
        >
          <i class="el-icon-plus upload_icon">
            <div class="upload_text">Video Uploads</div>
          </i>
        </el-upload>
      </el-col>
      <el-col :span="10">
        <video
          v-show="videoUrl != ''"
          :src="videoUrl"
          class="avatar"
          controls="controls"
          style="width: 400px; height: 146px; margin-top: 10px"
        ></video>
      </el-col>
    </el-row>

    <h5 class="title_con" style="margin-top: 20px">Upload your photo</h5>
    <h6 class="title_tips">Only.jpg/png/jpeg less than 8M</h6>
    <el-row :gutter="60" class="el_row">
      <el-col :span="12">
        <el-upload
          ref="upload"
          action
          accept="image/png, image/gif, image/jpg, image/jpeg"
          list-type="picture-card"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="changeUpload"
          style="margin-top: 10px"
        >
          <i class="el-icon-plus upload_icon">
            <div class="upload_text">Picture upload</div>
          </i>
        </el-upload>
      </el-col>
      <el-col :span="12" v-show="avatarUrl != ''">
        <el-image
          style="width: 146px; height: 146px; margin-top: 10px"
          :src="avatarUrl"
        ></el-image>
      </el-col>
    </el-row>

    <h5 class="title_con" style="margin-top: 20px">账号信息</h5>
    <el-row :gutter="60" class="el_row">
      <el-col :span="12">
        <span class="sub_title">账号</span>
        <span class="sub_required">*</span>
        <el-row :gutter="10" class="mt_10">
          <el-col :span="12">
            <el-input v-model="email" placeholder=""></el-input>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-row :gutter="60" class="el_row">
      <el-col :span="12">
        <span class="sub_title">用户昵称</span>
        <span class="sub_required">*</span>
        <el-row :gutter="10" class="mt_10">
          <el-col :span="12">
            <el-input v-model="nick_name" placeholder=""></el-input>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-dialog
      title="Picture Clipping"
      :visible.sync="dialogVisible"
      append-to-body
    >
      <div class="cropper-content">
        <div class="cropper" style="text-align: center">
          <vueCropper
            ref="cropper"
            :img="option.img"
            :outputSize="option.size"
            :outputType="option.outputType"
            :info="true"
            :full="option.full"
            :canMove="option.canMove"
            :canMoveBox="option.canMoveBox"
            :original="option.original"
            :autoCrop="option.autoCrop"
            :fixed="option.fixed"
            :fixedNumber="option.fixedNumber"
            :centerBox="option.centerBox"
            :infoTrue="option.infoTrue"
            :fixedBox="option.fixedBox"
          ></vueCropper>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="finish" :loading="loading"
          >Confirm</el-button
        >
      </div>
    </el-dialog>
    <div class="submit_btn" @click="submitMessage">submit</div>
  </div>
</template>
<script>
import { VueCropper } from "vue-cropper";
import uploadComponents from "../../utils/uploadComponents/uploadComponents";
export default {
  name: "teacherMessage",
  components: {
    uploadComponents
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      sex: 0,
      wechat: "",
      brithday: "",
      in_domestic: "",
      nationality: "",
      visa_type: "",
      visa_exp_date: "",
      country: "",
      countryList: [],
      visa_type_list: [
        { id: 1, code: "Z" },
        { id: 2, code: "M" },
        { id: 3, code: "F" },
        { id: 4, code: "X" },
        { id: 5, code: "others" }
      ],
      provinceSelect_china: "",
      china_address: "",
      provinceList: [],
      cityList_china: [],
      school: "",
      major: "",
      university: "",
      relocate: 2,
      degree: [
        { id: 1, code: "High School Diploma" },
        { id: 2, code: "Associate's Degree" },
        { id: 3, code: "Bachelor's Degree" },
        { id: 4, code: "Master's Degree" },
        { id: 5, code: "MBA" },
        { id: 6, code: "PHD" }
      ],
      url: this.$baseURL() + "/api/index/upload",
      edu_cert_flg: "",
      edu_cert_imgs_path: "",
      edu_cert_imgs: "",
      edu_auth_flg: "",
      edu_auth_imgs_path: "",
      edu_auth_imgs: "",
      celta_flg: "",
      childrenCeltaName: [],
      celta_img: "",
      cert_other_flg: "",
      working_seniority: "",
      childrenOtherName: [],
      cert_other_img: "",
      cert_other: "",
      none_flg: "",
      working_seniority_list: [
        { id: 1, code: "Less than 1 year" },
        { id: 2, code: "1 year experience" },
        { id: 3, code: "2 years experience" },
        { id: 4, code: "3 years experience" },
        { id: 5, code: "4 years experience" },
        { id: 6, code: "5 years experience" },
        { id: 7, code: "6 years experience" },
        { id: 8, code: "7 years experience" },
        { id: 9, code: "8 years experience" },
        { id: 10, code: "9 years experience" },
        { id: 11, code: "More than 10years" }
      ],
      work_flg: "",
      pay_type: "",
      pay_type_list: [
        { id: 1, code: "10k-13k" },
        { id: 2, code: "13k-16k" },
        { id: 3, code: "16k-20k" },
        { id: 4, code: "20k-25k" },
        { id: 5, code: ">25k" }
      ],
      workingAnyProvince: "",
      workingAnyProvinceSecond: "",
      workingAnyProvinceThird: "",
      workingAnyCity: "",
      workingAnyCitySecond: "",
      workingAnyCityThird: "",
      showCitySecond: false,
      showCityThird: false,
      school_type: [],
      school_types: [
        "Training Center",
        "International Kindergarten",
        "International School",
        "Public School",
        "Online Class",
        "Others"
      ],
      job_work_type: "",
      job_work_type_list: [
        { id: 1, code: "Any" },
        { id: 2, code: "Full-time" },
        { id: 3, code: "Part-time" }
      ],
      job_type: "",
      university_img: "",
      job_type_list: [
        { id: 3, code: "Any" },
        { id: 2, code: "Online" },
        { id: 1, code: "Offline" }
      ],
      contactCodeOptions: [
        {
          id: 1,
          contactType: "Wechat"
        },
        {
          id: 2,
          contactType: "Skype"
        },
        {
          id: 3,
          contactType: "Whatsapp"
        },
        {
          id: 4,
          contactType: "Instagram"
        }
      ],
      all_city: "",
      comm_type: "",
      student_age: [],
      student_ages: ["0-3", "3-6", "7-12", "13-18", "18+"],
      notesName: [],
      notesId: "",
      desc: "",
      isloading: false,
      videoUrl: "",
      dialogVisible: false,
      option: {
        img: "", // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 1, // 裁剪生成图片的质量
        outputType: "png", // 裁剪生成图片的格式
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 300, // 默认生成截图框宽度
        autoCropHeight: 300, // 默认生成截图框高度
        fixedBox: true, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [5, 5], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: false, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      },
      fileinfo: {},
      loading: false,
      avatarUrl: "",
      videos: "",
      photos: "",
      notes: [],
      email: "",
      password: "",
      nick_name: "",
      editId: "",
      working_city: [],
      teacherInfo: {},
      id: "",
      childrenImgUrl: "",
      options: [
        {
          id: "584",
          titleKey: "china.+86",
          typeName: "nationaal",
          parentId: 0,
          index: 6,
          value: 86
        },
        {
          id: "882",
          titleKey: "united.states.of.america.+1",
          typeName: "nationaal",
          parentId: 0,
          index: 5,
          value: 1
        },
        {
          id: "768",
          titleKey: "india.+91",
          typeName: "nationaal",
          parentId: 0,
          index: 4,
          value: 91
        },
        {
          id: "827",
          titleKey: "pakistan.+92",
          typeName: "nationaal",
          parentId: 0,
          index: 3,
          value: 92
        },
        {
          id: "840",
          titleKey: "russia.+7",
          typeName: "nationaal",
          parentId: 0,
          index: 2,
          value: 7
        },
        {
          id: "881",
          titleKey: "united.kingdom.+44",
          typeName: "nationaal",
          parentId: 0,
          index: 1,
          value: 44
        },
        {
          id: "696",
          titleKey: "afghanistan.+93",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 93
        },
        {
          id: "697",
          titleKey: "albania.+355",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 355
        },
        {
          id: "698",
          titleKey: "algeria.+213",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 213
        },
        {
          id: "699",
          titleKey: "andorra.+376",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 376
        },
        {
          id: "695",
          titleKey: "angola",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 244
        },
        {
          id: "700",
          titleKey: "anguilla.+1264",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 1264
        },
        {
          id: "701",
          titleKey: "antigua.and.barbuda.+1268",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 1268
        },
        {
          id: "702",
          titleKey: "argentina.+54",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 54
        },
        {
          id: "703",
          titleKey: "armenia.+374",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 374
        },
        {
          id: "704",
          titleKey: "ascension.+247",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 247
        },
        {
          id: "705",
          titleKey: "australia.+61",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 61
        },
        {
          id: "706",
          titleKey: "austria.+43",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 43
        },
        {
          id: "707",
          titleKey: "azerbaijan.+994",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 994
        },
        {
          id: "708",
          titleKey: "bahamas+1242",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 1242
        },
        {
          id: "709",
          titleKey: "bahrain.+973",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 973
        },
        {
          id: "710",
          titleKey: "bangladesh.+880",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 880
        },
        {
          id: "711",
          titleKey: "barbados.+1246",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 1246
        },
        {
          id: "712",
          titleKey: "belarus.+375",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 375
        },
        {
          id: "713",
          titleKey: "belgium+32",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 32
        },
        {
          id: "714",
          titleKey: "belize.+501",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 501
        },
        {
          id: "715",
          titleKey: "benin.+229",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 229
        },
        {
          id: "716",
          titleKey: "bermudais.+1441",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 1441
        },
        {
          id: "1119",
          titleKey: "bhutan",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 975
        },
        {
          id: "717",
          titleKey: "bolivia.+591",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 591
        },
        {
          id: "1100",
          titleKey: "bosnia.+387",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 387
        },
        {
          id: "718",
          titleKey: "botswana.+267",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 267
        },
        {
          id: "719",
          titleKey: "brazil.+55",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 55
        },
        {
          id: "720",
          titleKey: "brunei.+673",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 673
        },
        {
          id: "722",
          titleKey: "burkina-faso.+226",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 226
        },
        {
          id: "723",
          titleKey: "burma.+95",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 95
        },
        {
          id: "724",
          titleKey: "burundi.+257",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 257
        },
        {
          id: "726",
          titleKey: "cameroon.+1",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 237
        },
        {
          id: "1063",
          titleKey: "canada.+1",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 2
        },
        {
          id: "727",
          titleKey: "cayman.is..+1345",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 1345
        },
        {
          id: "728",
          titleKey: "central.african.republic.+236",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 236
        },
        {
          id: "729",
          titleKey: "chad.+235",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 235
        },
        {
          id: "730",
          titleKey: "chile.+56",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 56
        },
        {
          id: "732",
          titleKey: "colombia.+57",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 57
        },
        {
          id: "733",
          titleKey: "congo.+242",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 242
        },
        {
          id: "734",
          titleKey: "cook.is..+682",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 682
        },
        {
          id: "735",
          titleKey: "costa.rica.+506",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 506
        },
        {
          id: "736",
          titleKey: "croatia.+385",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 385
        },
        {
          id: "737",
          titleKey: "cuba.+53",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 53
        },
        {
          id: "738",
          titleKey: "cyprus.+357",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 357
        },
        {
          id: "739",
          titleKey: "czech.republic.+420",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 420
        },
        {
          id: "740",
          titleKey: "denmark.+45",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 45
        },
        {
          id: "741",
          titleKey: "djibouti.+253",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 253
        },
        {
          id: "742",
          titleKey: "dominica.rep..+1890",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 1890
        },
        {
          id: "743",
          titleKey: "ecuador.+593",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 593
        },
        {
          id: "744",
          titleKey: "egypt.+20",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 20
        },
        {
          id: "745",
          titleKey: "eisalvador.+503",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 503
        },
        {
          id: "746",
          titleKey: "estonia.+372",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 372
        },
        {
          id: "747",
          titleKey: "ethiopia.+251",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 251
        },
        {
          id: "748",
          titleKey: "fiji.+679",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 679
        },
        {
          id: "749",
          titleKey: "finland.+358",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 358
        },
        {
          id: "750",
          titleKey: "france.+33",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 33
        },
        {
          id: "751",
          titleKey: "french.guiana.+594",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 594
        },
        {
          id: "834",
          titleKey: "french.polynesia.+689",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 689
        },
        {
          id: "752",
          titleKey: "gabon.+241",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 241
        },
        {
          id: "753",
          titleKey: "gambia.+220",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 220
        },
        {
          id: "754",
          titleKey: "georgia.+995",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 995
        },
        {
          id: "755",
          titleKey: "germany.+49",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 49
        },
        {
          id: "757",
          titleKey: "gibraltar.+350",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 350
        },
        {
          id: "758",
          titleKey: "greece.+30",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 30
        },
        {
          id: "759",
          titleKey: "grenada.+1809",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 1809
        },
        {
          id: "760",
          titleKey: "guam.+1671",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 1671
        },
        {
          id: "761",
          titleKey: "guatemala.+502",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 502
        },
        {
          id: "762",
          titleKey: "guinea.+224",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 224
        },
        {
          id: "763",
          titleKey: "guyana.+592",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 592
        },
        {
          id: "764",
          titleKey: "haiti.+509",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 509
        },
        {
          id: "765",
          titleKey: "honduras.+504",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 504
        },
        {
          id: "694",
          titleKey: "hongkong.+852",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 852
        },
        {
          id: "766",
          titleKey: "hungary.+36",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 36
        },
        {
          id: "767",
          titleKey: "iceland.+354",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 354
        },
        {
          id: "769",
          titleKey: "indonesia.+62",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 62
        },
        {
          id: "770",
          titleKey: "iran.+98",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 98
        },
        {
          id: "771",
          titleKey: "iraq.+964",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 964
        },
        {
          id: "772",
          titleKey: "ireland.+353",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 353
        },
        {
          id: "773",
          titleKey: "israel.+972",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 972
        },
        {
          id: "774",
          titleKey: "italy.+39",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 39
        },
        {
          id: "775",
          titleKey: "ivorycoast.+225",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 225
        },
        {
          id: "776",
          titleKey: "jamaica.+1876",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 1876
        },
        {
          id: "777",
          titleKey: "japan.+81",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 81
        },
        {
          id: "778",
          titleKey: "jordan.+962",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 962
        },
        {
          id: "779",
          titleKey: "kampuchea.+855",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 855
        },
        {
          id: "780",
          titleKey: "kazakstan.+327",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 327
        },
        {
          id: "783",
          titleKey: "kenya.+254",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 254
        },
        {
          id: "784",
          titleKey: "korea.+82",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 82
        },
        {
          id: "785",
          titleKey: "kuwait.+965",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 965
        },
        {
          id: "786",
          titleKey: "kyrgyzstan.+331",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 331
        },
        {
          id: "787",
          titleKey: "laos.+856",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 856
        },
        {
          id: "788",
          titleKey: "latvia.+371",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 371
        },
        {
          id: "789",
          titleKey: "lebanon.+961",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 961
        },
        {
          id: "790",
          titleKey: "lesotho.+266",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 266
        },
        {
          id: "791",
          titleKey: "liberia.+231",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 231
        },
        {
          id: "792",
          titleKey: "libya.+218",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 218
        },
        {
          id: "793",
          titleKey: "liechtenstein.+423",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 423
        },
        {
          id: "794",
          titleKey: "lithuania.+370",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 370
        },
        {
          id: "795",
          titleKey: "luxembourg.+352",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 352
        },
        {
          id: "796",
          titleKey: "macao.+853",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 853
        },
        {
          id: "797",
          titleKey: "macedonia.+389",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 389
        },
        {
          id: "798",
          titleKey: "madagascar.+261",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 261
        },
        {
          id: "799",
          titleKey: "malawi.+265",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 265
        },
        {
          id: "800",
          titleKey: "malaysia.+60",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 60
        },
        {
          id: "801",
          titleKey: "maldives.+960",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 960
        },
        {
          id: "802",
          titleKey: "mali.+223",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 223
        },
        {
          id: "803",
          titleKey: "malta.+356",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 356
        },
        {
          id: "804",
          titleKey: "mariana.is.+1670",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 1670
        },
        {
          id: "805",
          titleKey: "martinique.+596",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 596
        },
        {
          id: "806",
          titleKey: "mauritius.+230",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 230
        },
        {
          id: "807",
          titleKey: "mexico.+52",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 52
        },
        {
          id: "808",
          titleKey: "moldova,.republic.of.+373",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 373
        },
        {
          id: "809",
          titleKey: "monaco.+377",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 377
        },
        {
          id: "810",
          titleKey: "mongolia.+976",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 976
        },
        {
          id: "811",
          titleKey: "montenegro.+382",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 382
        },
        {
          id: "812",
          titleKey: "montserrat.is.+1664",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 1664
        },
        {
          id: "813",
          titleKey: "morocco.+212",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 212
        },
        {
          id: "814",
          titleKey: "mozambique.+258",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 258
        },
        {
          id: "815",
          titleKey: "namibia.+264",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 264
        },
        {
          id: "816",
          titleKey: "nauru.+674",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 674
        },
        {
          id: "817",
          titleKey: "nepal.+977",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 977
        },
        {
          id: "818",
          titleKey: "netheriands.+599",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 599
        },
        {
          id: "819",
          titleKey: "netherlands.+31",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 31
        },
        {
          id: "820",
          titleKey: "newzealand.+64",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 64
        },
        {
          id: "821",
          titleKey: "nicaragua.+505",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 505
        },
        {
          id: "822",
          titleKey: "niger.+227",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 227
        },
        {
          id: "823",
          titleKey: "nigeria.+234",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 234
        },
        {
          id: "824",
          titleKey: "north.korea.+850",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 850
        },
        {
          id: "825",
          titleKey: "norway.+47",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 47
        },
        {
          id: "826",
          titleKey: "oman.+968",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 968
        },
        {
          id: "828",
          titleKey: "panama.+507",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 507
        },
        {
          id: "829",
          titleKey: "papua.new.cuinea.+675",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 675
        },
        {
          id: "830",
          titleKey: "paraguay.+595",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 595
        },
        {
          id: "831",
          titleKey: "peru.+51",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 51
        },
        {
          id: "832",
          titleKey: "philippines.+63",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 63
        },
        {
          id: "833",
          titleKey: "poland.+48",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 48
        },
        {
          id: "835",
          titleKey: "portugal.+351",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 351
        },
        {
          id: "836",
          titleKey: "puertorico.+1787",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 1787
        },
        {
          id: "837",
          titleKey: "qatar.+974",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 974
        },
        {
          id: "838",
          titleKey: "reunion.+262",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 262
        },
        {
          id: "839",
          titleKey: "romania.+40",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 40
        },
        {
          id: "1091",
          titleKey: "rwandese",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 250
        },
        {
          id: "841",
          titleKey: "saint.lueia.+1758",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 1758
        },
        {
          id: "842",
          titleKey: "saint.vincent.+1784",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 1784
        },
        {
          id: "843",
          titleKey: "samoa.eastern.+684",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 684
        },
        {
          id: "844",
          titleKey: "samoa.western.+685",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 685
        },
        {
          id: "845",
          titleKey: "san.marino.+378",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 378
        },
        {
          id: "846",
          titleKey: "sao.tome.and.principe.+239",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 239
        },
        {
          id: "847",
          titleKey: "saudi.arabia.+966",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 966
        },
        {
          id: "848",
          titleKey: "senegal.+221",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 221
        },
        {
          id: "849",
          titleKey: "serbia.+381",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 381
        },
        {
          id: "850",
          titleKey: "seychelles.+248",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 248
        },
        {
          id: "851",
          titleKey: "sierra.leone.+232",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 232
        },
        {
          id: "852",
          titleKey: "singapore.+65",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 65
        },
        {
          id: "853",
          titleKey: "slovakia.+421",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 421
        },
        {
          id: "854",
          titleKey: "slovenia.+386",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 386
        },
        {
          id: "855",
          titleKey: "solomon.is.+677",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 677
        },
        {
          id: "856",
          titleKey: "somali.+252",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 252
        },
        {
          id: "857",
          titleKey: "south.africa.+27",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 27
        },
        {
          id: "858",
          titleKey: "spain.+34",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 34
        },
        {
          id: "859",
          titleKey: "sri.lanka.+94",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 94
        },
        {
          id: "862",
          titleKey: "sudan.+249",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 249
        },
        {
          id: "863",
          titleKey: "suriname.+597",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 597
        },
        {
          id: "864",
          titleKey: "swaziland.+268",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 268
        },
        {
          id: "865",
          titleKey: "sweden.+46",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 46
        },
        {
          id: "866",
          titleKey: "switzerland.+41",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 41
        },
        {
          id: "867",
          titleKey: "syria.+963",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 963
        },
        {
          id: "868",
          titleKey: "taiwan.+886",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 886
        },
        {
          id: "869",
          titleKey: "tajikstan.+992",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 992
        },
        {
          id: "870",
          titleKey: "tanzania.+255",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 255
        },
        {
          id: "871",
          titleKey: "thailand.+66",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 66
        },
        {
          id: "872",
          titleKey: "togo.+228",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 228
        },
        {
          id: "873",
          titleKey: "tonga.+676",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 676
        },
        {
          id: "875",
          titleKey: "tunisia.+216",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 216
        },
        {
          id: "876",
          titleKey: "turkey.+90",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 90
        },
        {
          id: "877",
          titleKey: "turkmenistan.+993",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 993
        },
        {
          id: "878",
          titleKey: "uganda.+256",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 256
        },
        {
          id: "879",
          titleKey: "ukraine.+380",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 380
        },
        {
          id: "880",
          titleKey: "united.arab.emirates.+971",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 971
        },
        {
          id: "883",
          titleKey: "uruguay.+598",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 598
        },
        {
          id: "947",
          titleKey: "uzbekistan.+233",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 998
        },
        {
          id: "885",
          titleKey: "venezuela.+233",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 58
        },
        {
          id: "886",
          titleKey: "vietnam.+84",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 84
        },
        {
          id: "887",
          titleKey: "yemen.+967",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 967
        },
        {
          id: "948",
          titleKey: "yugoslavia.+338",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 338
        },
        {
          id: "890",
          titleKey: "zaire.+243",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 243
        },
        {
          id: "891",
          titleKey: "zambia.+260",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 260
        },
        {
          id: "889",
          titleKey: "zimbabwe.+381",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 263
        },
        {
          id: "721",
          titleKey: "bulgaria.+359",
          typeName: "nationaal",
          parentId: 0,
          index: 0,
          value: 359
        }
      ],
      area_code: "",
      education: [
        {
          edu_start_time: "",
          edu_end_time: "",
          school: "",
          major: "",
          show: 1
        }
      ],
      work_experiences: [
        {
          start_time: "",
          end_time: "",
          company_name: "",
          position: "",
          work_desc: "",
          now: 1
        }
      ]
    };
  },
  created() {
    this.getCountryList();
    this.getProvince();
    if (this.$route.query.mid) {
      this.editId = this.$route.query.mid;
      this.id = this.$route.query.id;
      this.getTeacherEdit();
    }
  },
  computed: {},
  methods: {
    //   国籍
    getCountryList() {
      this.$fetch("getCountryList", {}, 1).then(res => {
        if (res.code == 200) {
          this.countryList = res.data;
        }
      });
    },
    //   省份
    getProvince() {
      this.$post("getProvince", {}, 1).then(res => {
        if (res.code == 200) {
          this.provinceList = res.data;
        }
      });
    },
    // 选择城市
    provinceChange(e) {
      this.china_address = "";
      this.$post(
        "getCity",
        {
          id: e
        },
        1
      ).then(res => {
        if (res.code == 200) {
          this.cityList_china = res.data;
        }
      });
    },
    // 清空城市
    clearAddress() {
      this.provinceSelect_china = "";
      this.china_address = "";
    },
    addEducation() {
      if (this.education.length == 5) {
        this.$message.error("Maximum 5 lines");
      } else {
        let lastItem = this.education[this.education.length - 1];
        if (lastItem.edu_start_time == "" || lastItem.edu_start_time == null) {
          this.$message.error("Please fill in Start Time");
        } else if (
          lastItem.edu_end_time == "" ||
          lastItem.edu_end_time == null
        ) {
          this.$message.error("Please fill in End Time");
        } else if (lastItem.school == "" || lastItem.school == null) {
          this.$message.error("Please fill in University");
        } else if (lastItem.major == "" || lastItem.major == null) {
          this.$message.error("Please fill in Major");
        } else {
          this.education.push({
            edu_start_time: "",
            edu_end_time: "",
            school: "",
            major: "",
            show: 2
          });
        }
      }
    },
    deleteEducation(index) {
      this.education.splice(index, 1);
    },
    // 添加工作背景
    addWorkExperience() {
      if (this.work_experiences.length == 5) {
        this.$message.error("Maximum 5 lines");
      } else {
        let lastItem = this.work_experiences[this.work_experiences.length - 1];
        if (lastItem.start_time == "" || lastItem.start_time == null) {
          this.$message.error("Please fill in Start Time");
        } else if (lastItem.end_time == "" && lastItem.now == 1) {
          this.$message.error("Please fill in End Time");
        } else if (
          lastItem.company_name == "" ||
          lastItem.company_name == null
        ) {
          this.$message.error("Please fill in company name");
        } else if (lastItem.position == "" || lastItem.position == null) {
          this.$message.error("Please fill in position");
        }else {
          this.work_experiences.push({
            start_time: "",
            end_time: "",
            company_name: "",
            position: "",
            work_desc: "",
            now: 1
          });
        }
      }
    },
    // 删除工作背景
    deleteWorkExperience(index) {
      this.work_experiences.splice(index, 1);
    },
    // tefl上传
    changeUpload_tefl(file) {
      var that = this;
      const isLt5M = file.size / 1024 / 1024 < 8;
      if (!isLt5M) {
        this.$message.error("less than 8M!");
        return false;
      }
      let fd = new FormData();
      fd.append("file", file.raw);
      fd.append("type", 0);
      that.$post("upload", fd, 1).then(response => {
        if (response.code === 200) {
          this.edu_cert_imgs_path = [response.data];
          this.edu_cert_imgs = response.data.id;
        }
      });
    },
    // tesol上传
    changeUpload_tesol(file) {
      var that = this;
      const isLt5M = file.size / 1024 / 1024 < 8;

      if (!isLt5M) {
        this.$message.error("less than 8M!");
        return false;
      }
      let fd = new FormData();
      fd.append("file", file.raw);
      fd.append("type", 0);
      that.$post("upload", fd, 1).then(response => {
        if (response.code === 200) {
          this.edu_auth_imgs_path = [response.data];
          this.edu_auth_imgs = response.data.id;
        }
      });
    },
    // 工作城市
    provinceChange_working(e) {
      this.workingAnyCity = "";
      this.$post(
        "getCity",
        {
          id: e
        },
        1
      ).then(res => {
        if (res.code == 200) {
          this.cityList_china = res.data;
          this.all_city = "";
        }
      });
    },
    provinceChange_working_second(e) {
      this.workingAnyCitySecond = "";
      this.$post(
        "getCity",
        {
          id: e
        },
        1
      ).then(res => {
        if (res.code == 200) {
          this.cityList_china = res.data;
          this.all_city = "";
        }
      });
    },
    provinceChange_working_third(e) {
      this.workingAnyCityThird = "";
      this.$post(
        "getCity",
        {
          id: e
        },
        1
      ).then(res => {
        if (res.code == 200) {
          this.cityList_china = res.data;
          this.all_city = "";
        }
      });
    },
    showAllCitySelect() {
      this.showCitySecond = true;
      this.showCityThird = true;
    },
    clearCitySecond() {
      this.workingAnyProvinceSecond = "";
      this.workingAnyCitySecond = "";
      this.showCitySecond = false;
    },
    clearCityThird() {
      this.workingAnyProvinceThird = "";
      this.workingAnyCityThird = "";
      this.showCityThird = false;
    },
    // 上传简历
    resume_upload(file) {
      if (this.notesName.length >= 5) {
        this.$message.error("Less than 5.");
      } else {
        var that = this;
        const isLt5M = file.size / 1024 / 1024 < 8;
        if (!isLt5M) {
          this.$message.error("less than 8M!");
          return false;
        }
        let fd = new FormData();
        fd.append("file", file.raw);
        fd.append("type", 2);
        that.$post("upload", fd, 1).then(response => {
          if (response.code === 200) {
            this.notesName.push(response.data.file_name);
            this.notes.push(response.data.id);
          }
        });
      }
    },
    // 删除简历
    delNotes(index) {
      this.$confirm("是否删除该简历？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.notes.splice(index, 1);
          this.notesName.splice(index, 1);
        })
        .catch(() => {});
    },
    // 上传视频
    onchangeUploadVideo(file) {
      var that = this;
      const isLt50M = file.size / 1024 / 1024 < 50;
      if (!isLt50M) {
        this.$message.error("Less than 50M.");
        return false;
      }
      this.isloading = true;
      let fd = new FormData();
      fd.append("file", file.raw);
      fd.append("type", 1);
      that.$post("upload", fd, 1).then(response => {
        this.isloading = false;
        if (response.code === 200) {
          this.videoUrl = response.data.path;
          this.videos = response.data.id;
        }
      });
    },
    // 上传头像
    changeUpload(file, fileList) {
      console.log(file);
      const isLt5M = file.size / 1024 / 1024 < 8;
      if (!isLt5M) {
        this.$message.error("less than 8M!");
        return false;
      }
      this.fileinfo = file;
      // 上传成功后将图片地址赋值给裁剪框显示图片
      this.$nextTick(() => {
        this.option.img = file.url;
        this.dialogVisible = true;
      });
    },
    // 点击裁剪，这一步是可以拿到处理后的地址
    finish() {
      var that = this;
      this.$refs.cropper.getCropBlob(data => {
        var fileName = "photo" + this.fileinfo.uid;
        var formData = new FormData();
        formData.append("file", data, "a.png");
        that.$post("upload", formData, 1).then(response => {
          if (response.code === 200) {
            that.dialogVisible = false;
            this.avatarUrl = response.data.path;
            this.photos = response.data.id;
          }
        });
      });
    },
    // 获取城市
    getCities(city) {
      console.log(city);
      this.$post(
        "getCity",
        {
          id: city
        },
        1
      ).then(res => {
        if (res.code == 200) {
          this.cityList_china = res.data;
        }
      });
    },
    //   获取外教编辑信息
    async getTeacherEdit() {
      let res = await this.$post("/check/desc", {
        id: this.editId
      });
      if (res.code == 200) {
        if (res.data.education.length > 0) {
          this.education = res.data.education;
        }
        this.firstName = res.data.name;
        this.lastName = res.data.last_name;
        this.sex = res.data.sex;
        this.brithday = res.data.brithday;
        this.comm_type = res.data.comm_type;
        this.nationality = res.data.nationality;
        if (res.data.china_address_city_data != null) {
          this.provinceSelect_china =
            res.data.china_address_city_data.province_data.id;
          this.getCities(this.provinceSelect_china);
          this.china_address = res.data.china_address;
        }
        if (this.area_code != null) {
          this.area_code = res.data.area_code;
        }
        if (res.data.school != null) {
          this.school = res.data.school;
        }
        if (res.data.university != null) {
          this.university = res.data.university;
        }
        if (res.data.phone != null) {
          this.phoneNumber = res.data.phone;
        }
        if (res.data.wechat != null) {
          this.wechat = res.data.wechat;
        }
        if (res.data.major != null) {
          this.major = res.data.major;
        }
        if (res.data.working_seniority != null) {
          this.working_seniority = res.data.working_seniority;
        }
        if (
          res.data.working_city_datas != null &&
          res.data.working_city_datas.length == 1
        ) {
          this.workingAnyProvince =
            res.data.working_city_datas[0].province_data.id;
          this.getCities(this.workingAnyProvince);
          this.workingAnyCity = res.data.working_city_datas[0].city_data.id;
        } else if (
          res.data.working_city_datas != null &&
          res.data.working_city_datas.length == 2
        ) {
          this.showCitySecond = true;
          this.showCityThird = true;
          this.workingAnyProvince =
            res.data.working_city_datas[0].province_data.id;
          this.getCities(this.workingAnyProvince);
          this.workingAnyCity = res.data.working_city_datas[0].city_data.id;
          this.workingAnyProvinceSecond =
            res.data.working_city_datas[1].province_data.id;
          this.getCities(this.workingAnyProvinceSecond);
          this.workingAnyCitySecond =
            res.data.working_city_datas[1].city_data.id;
        } else if (
          res.data.working_city_datas != null &&
          res.data.working_city_datas.length == 3
        ) {
          this.showCitySecond = true;
          this.showCityThird = true;
          this.workingAnyProvince =
            res.data.working_city_datas[0].province_data.id;
          this.getCities(this.workingAnyProvince);
          this.workingAnyCity = res.data.working_city_datas[0].city_data.id;
          this.workingAnyProvinceSecond =
            res.data.working_city_datas[1].province_data.id;
          this.getCities(this.workingAnyProvinceSecond);
          this.workingAnyCitySecond =
            res.data.working_city_datas[1].city_data.id;
          this.workingAnyProvinceThird =
            res.data.working_city_datas[2].province_data.id;
          this.getCities(this.workingAnyProvinceThird);
          this.workingAnyCityThird =
            res.data.working_city_datas[2].city_data.id;
        }
        if (res.data.desc != null) {
          this.desc = res.data.desc;
        }
        if (res.data.videos_path != null) {
          this.videos = res.data.videos;
          this.videoUrl = res.data.videos_path.path;
        }
        if (res.data.photos_path != null) {
          this.photos = res.data.photos;
          this.avatarUrl = res.data.photos_path.path;
        }
        if (res.data.pay_type != null) {
          this.pay_type = res.data.pay_type;
        }
        if (res.data.edu_cert_flg != null) {
          this.edu_cert_flg = res.data.edu_cert_flg;
        }
        if (res.data.edu_cert_imgs_path != null) {
          this.edu_cert_imgs = res.data.edu_cert_imgs;
          this.edu_cert_imgs_path = [
            { path: res.data.edu_cert_imgs_path.path }
          ];
        }
        if (res.data.edu_auth_flg != null) {
          this.edu_auth_flg = res.data.edu_auth_flg;
        }
        if (res.data.edu_auth_imgs_path != null) {
          this.edu_auth_imgs = res.data.edu_auth_imgs;
          this.edu_auth_imgs_path = [
            { path: res.data.edu_auth_imgs_path.path }
          ];
        }
        if (res.data.in_domestic != null) {
          this.in_domestic = res.data.in_domestic;
        }
        if (res.data.visa_type != null) {
          this.visa_type = res.data.visa_type;
        }
        if (res.data.country != null) {
          this.country = res.data.country;
        }
        if (res.data.school_type != null) {
          this.school_type = res.data.school_type.split(",").map(Number);
        }
        if (res.data.student_age != null) {
          this.student_age = res.data.student_age.split(",").map(Number);
        }
        if (res.data.job_type != null) {
          this.job_type = res.data.job_type;
        }
        if (res.data.job_work_type != null) {
          this.job_work_type = res.data.job_work_type;
        }
        if (res.data.notes_path != null) {
          this.notes = res.data.notes.split(",").map(Number);
          this.notesName = res.data.notes_path.map(ele => ele.name);
        }
        this.email = res.data.member.email;
        this.nick_name = res.data.member.nick_name;
        if (res.data.visa_exp_date != null) {
          this.visa_exp_date = res.data.visa_exp_date;
        }
        this.celta_flg = res.data.celta_flg;
        if (res.data.celta_img_path != null) {
          this.childrenCeltaName.push(res.data.celta_img_path);
        }
        this.cert_other_flg = res.data.cert_other_flg;
        if (res.data.cert_other_img_path != null) {
          this.childrenOtherName.push(res.data.cert_other_img_path);
        }
        if (res.data.cert_other != null) {
          this.cert_other = res.data.cert_other;
        }
        if (
          res.data.edu_cert_flg == 0 &&
          res.data.edu_auth_flg == 0 &&
          res.data.celta_flg == 1 &&
          res.data.cert_other_flg == 1
        ) {
          this.none_flg = 2;
        }
        this.cert_other = res.data.cert_other;
        this.work_flg = res.data.work_flg;
        this.all_city = res.data.all_city.toString();
        this.university_img = res.data.university_img;
        if (res.data.university_img_path != null) {
          this.childrenImgUrl = res.data.university_img_path.path;
        }
        if (res.data.work) {
          this.work_experiences = res.data.work;
        }
      }
    },
    // 接收图片id
    uploadImgId(id) {
      this.university_img = id;
    },
    // 接收celta id
    uploadCeltaId(id) {
      this.celta_img = id;
    },
    celtaName(file) {
      this.celta_img = "";
    },
    // 接收other id
    uploadOtherId(id) {
      this.cert_other_img = id;
    },
    othersName(file) {
      this.cert_other_img = "";
    },
    // 点击none发生改变
    noneChange() {
      this.edu_cert_flg = "";
      this.edu_cert_imgs = "";
      this.edu_auth_flg = "";
      this.edu_auth_imgs = "";
      this.celta_flg = "";
      this.celta_img = "";
      this.cert_other_flg = "";
      this.cert_other_img = "";
      this.cert_other = "";
    },
    // 任何城市
    preferredChange() {
      this.workingAnyProvince = "";
      this.workingAnyCity = "";
      this.workingAnyProvinceSecond = "";
      this.workingAnyCitySecond = "";
      this.workingAnyProvinceThird = "";
      this.workingAnyCityThird = "";
    },
    // 至今发生改变
    presentChange(index) {
      this.work_experiences[index].end_time = "";
    },
    // 提交信息
    async submitMessage() {
      if (this.editId != "") {
        this.working_city = [
          this.workingAnyCity,
          this.workingAnyCitySecond,
          this.workingAnyCityThird
        ].filter(ele => ele != "");
        if (this.firstName == "") {
          this.$message.error("请填写First Name");
        } else if (this.lastName == "") {
          this.$message.error("请填写Last Name");
        } else if (this.brithday == "") {
          this.$message.error("请填写Date of Birth");
        } else if (this.nationality == "") {
          this.$message.error("请填写Nationality");
        } else if (this.university == "") {
          this.$message.error("请填写Highest Academic Degree");
        } else if (this.pay_type == "") {
          this.$message.error("请填写Expected Salary");
        } else if (this.email == "") {
          this.$message.error("请填写账号");
        } else if (this.nick_name == "") {
          this.$message.error("请填写昵称");
        } else if (this.working_seniority == "") {
          this.$message.error("请填写Working Years");
        } else if (
          this.education[this.education.length - 1].edu_start_time == "" ||
          this.education[this.education.length - 1].edu_end_time == "" ||
          this.education[this.education.length - 1].school == "" ||
          this.education[this.education.length - 1].major == "" ||
          this.education[this.education.length - 1].edu_start_time == null ||
          this.education[this.education.length - 1].edu_end_time == null ||
          this.education[this.education.length - 1].school == null ||
          this.education[this.education.length - 1].major == null
        ) {
          this.$message.error("请填写教育背景");
        } else {
          let res = await this.$post("/check/checkEdit", {
            mid: this.editId,
            name: this.firstName,
            last_name: this.lastName,
            sex: this.sex,
            brithday: this.brithday,
            nationality: this.nationality,
            china_address: this.china_address,
            school: this.school,
            university: this.university,
            phone: this.phoneNumber,
            wechat: this.wechat,
            comm_type: this.comm_type,
            major: this.major,
            working_seniority: this.working_seniority,
            working_city: this.working_city.toString(),
            desc: this.desc,
            videos: this.videos,
            photos: this.photos,
            pay_type: this.pay_type,
            edu_cert_flg: this.edu_cert_flg,
            edu_cert_imgs: this.edu_cert_imgs,
            edu_auth_flg: this.edu_auth_flg,
            edu_auth_imgs: this.edu_auth_imgs,
            in_domestic: this.in_domestic,
            visa_type: this.visa_type,
            country: this.country,
            school_type: this.school_type.toString(),
            student_age: this.student_age.toString(),
            job_type: this.job_type,
            job_work_type: this.job_work_type,
            notes: this.notes.toString(),
            email: this.email,
            nick_name: this.nick_name,
            visa_exp_date: this.visa_exp_date,
            area_code: this.area_code,
            education: JSON.stringify(this.education),
            university_img: this.university_img,
            celta_img: this.celta_img,
            cert_other_img: this.cert_other_img,
            cert_other_flg: this.cert_other_flg,
            cert_other: this.cert_other,
            celta_flg: this.celta_flg,
            relocate: this.relocate,
            all_city: this.all_city,
            work_experiences: JSON.stringify(this.work_experiences)
          });
          if (res.code == 200) {
            this.$message({
              message: "修改成功",
              type: "success"
            });
            this.$router.go(-1);
          } else {
            this.$message.error(res.msg);
          }
        }
      } else {
        this.working_city = [
          this.workingAnyCity,
          this.workingAnyCitySecond,
          this.workingAnyCityThird
        ].filter(ele => ele != "");
        if (this.firstName == "") {
          this.$message.error("请填写First Name");
        } else if (this.lastName == "") {
          this.$message.error("请填写Last Name");
        } else if (this.brithday == "") {
          this.$message.error("请填写Date of Birth");
        } else if (this.nationality == "") {
          this.$message.error("请填写Nationality");
        } else if (this.university == "") {
          this.$message.error("请填写Highest Academic Degree");
        } else if (this.pay_type == "") {
          this.$message.error("请填写Expected Salary");
        } else if (this.working_seniority == "") {
          this.$message.error("请填写Working Years");
        } else if (this.email == "") {
          this.$message.error("请填写账号");
        } else if (this.nick_name == "") {
          this.$message.error("请填写昵称");
        } else if (
          this.education[this.education.length - 1].edu_start_time == "" ||
          this.education[this.education.length - 1].edu_end_time == "" ||
          this.education[this.education.length - 1].school == "" ||
          this.education[this.education.length - 1].major == ""
        ) {
          this.$message.error("请填写教育背景");
        } else {
          let res = await this.$post("/teach/add", {
            name: this.firstName,
            last_name: this.lastName,
            sex: this.sex,
            brithday: this.brithday,
            nationality: this.nationality,
            china_address: this.china_address,
            school: this.school,
            university: this.university,
            phone: this.phoneNumber,
            wechat: this.wechat,
            comm_type: this.comm_type,
            major: this.major,
            working_seniority: this.working_seniority,
            working_city: this.working_city.toString(),
            desc: this.desc,
            videos: this.videos,
            photos: this.photos,
            pay_type: this.pay_type,
            edu_cert_flg: this.edu_cert_flg,
            edu_cert_imgs: this.edu_cert_imgs,
            edu_auth_flg: this.edu_auth_flg,
            edu_auth_imgs: this.edu_auth_imgs,
            in_domestic: this.in_domestic,
            visa_type: this.visa_type,
            country: this.country,
            school_type: this.school_type.toString(),
            student_age: this.student_age.toString(),
            job_type: this.job_type,
            job_work_type: this.job_work_type,
            notes: this.notes.toString(),
            email: this.email,
            nick_name: this.nick_name,
            visa_exp_date: this.visa_exp_date,
            area_code: this.area_code,
            education: JSON.stringify(this.education),
            university_img: this.university_img,
            celta_img: this.celta_img,
            cert_other_img: this.cert_other_img,
            cert_other_flg: this.cert_other_flg,
            cert_other: this.cert_other,
            celta_flg: this.celta_flg,
            relocate: this.relocate,
            all_city: this.all_city,
            work_experiences: JSON.stringify(this.work_experiences)
          });
          if (res.code == 200) {
            this.$router.push("/home/teachlist");
          } else {
            this.$message.error(res.msg);
          }
        }
      }
    }
  }
};
</script>
<style>
.el-scrollbar__wrap {
  margin-bottom: 0 !important;
}
</style>
<style scoped>
/deep/ .el-select {
  display: block !important;
}
.content {
  margin-top: 20px;
  padding: 30px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
}
.title_con {
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.sub_title {
  display: inline-block;
  margin-top: 20px;
  margin-right: 10px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
}
.sub_required {
  color: #ff6010;
}
.upload_icon {
  width: 100%;
  height: 100%;
  font-size: 50px;
  line-height: 100px;
  border: 800;
}
.country_phone_number {
  display: flex;
}
.upload_text {
  font-size: 16px;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 16px;
}
.el_row_2 {
  margin-top: 20px;
}
.title_tips {
  margin-top: 20px;
  font-size: 14px;
  font-weight: 400;
  color: #999;
}
/* 截图 */
.cropper-content .cropper {
  width: auto;
  height: 300px;
}
.submit_btn {
  margin-top: 20px;
  width: 100px;
  height: 40px;
  background: #078ca9;
  border-radius: 4px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
}
/deep/ input::-webkit-outer-spin-button,
/deep/ input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
/deep/ input[type="number"] {
  -moz-appearance: textfield;
}
.clearfix:after {
  content: "";
  display: block;
  clear: both;
}

.clearfix {
  zoom: 1;
}

.fl {
  float: left;
}

.fr {
  float: right;
}
.country_phone_number {
  display: flex;
}
.education_wrapper {
  width: 100%;
}

.education_wrapper h5 {
  margin-top: 20px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}

.education_wrapper .xing {
  display: inline-block;
  margin-left: 5px;
  font-size: 16px;
  font-weight: 500;
  color: rgba(255, 96, 16, 1);
}

.education_wrapper .picker_wrapper {
  display: flex;
  margin-top: 20px;
  flex-wrap: wrap;
}

.picker_wrapper .cell_item {
  flex: 1;
  margin-right: 10px;
}
.experience_wrapper .cell_item {
  width: 35%;
  margin-right: 10px;
  margin-bottom: 20px;
}
.experience_wrapper .present {
  position: absolute;
  bottom: -10px;
  left: 36%;
}
</style>
