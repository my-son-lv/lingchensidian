<template>
  <div>
    <!-- <el-button class="btn_back" @click="go_back()" >返回</el-button> -->
    <div class="header">
      <img v-if="info.photos_path" :src="info.photos_path.path" class="header_img" />
      <img
        class="header_img"
        v-else
        :src="
          info.sex == 0 ? '/static/images/man.png' : '/static/images/woman.png'
        "
      />
      <div class="header_info">
        <div class="header_name_div">
          <span class="header_name">
            {{
            info.name + " " + info.last_name
            }}
          </span>
          <span class="status" v-if="info.interview_status != null">
            {{
            info.interview_status != null
            ? status_list[info.interview_status + 1]
            : ""
            }}
          </span>
        </div>
        <div
          class="header_sex"
        >{{ info.sex ? "Female" : "Male" }} | {{ info.brithday }} | {{ get_degree() }}</div>
        <div class="header_label fl">
          <div
            class="label_t"
            v-if="info.nationality_val != null"
          >Nationality:{{ info.nationality_val.code }}</div>
          <div class="label_t">Working Experience:{{ info.working_seniority | filterWorkingYear }}</div>
          <div class="label_t">Expected Salary:{{ get_pay() }}</div>
        </div>

        <div class="header_buttons fr">
          <img
            :src="
              info.collect_flg
                ? '/static/images/shoucang_icon.png'
                : '/static/images/moren_icon.png'
            "
            @click="spare_click"
            class="shoucang_icon"
          />
          <div
            class="down_btn"
            v-if="info.category == 1 && info.email == null"
            @click="handleClickDown"
          >下载简历</div>
          <el-button
            class="header_btn_s"
            @click="interview_click"
            v-if="info.interview_status == null || info.interview_status >= 5"
          >
            {{
            info.interview_status >= 5 ? "再次邀请" : "邀请应聘"
            }}
          </el-button>
          <el-button class="header_btn_u" v-else>
            {{
            status_list[info.interview_status + 1]
            }}
          </el-button>
        </div>
      </div>
    </div>

    <div class="content">
      <div class="s18 h40">Basic Information</div>
      <div class="message_wrapper">
        <div class="lside_con">
          <div class="con_item">
            <span class="lside_title">Telephone:</span>
            <span class="item_con" v-if="info.phone != null">
              {{ info.area_code ? '+' + info.area_code : ''}}{{
              info.phone
              }}
            </span>
            <img src="/static/images/phone_mohu.png" v-else class="phone_mohu" />
          </div>

          <div class="con_item">
            <span class="lside_title">Email:</span>
            <span class="item_con" v-if="info.email != null">
              {{
              info.email
              }}
            </span>
            <img src="/static/images/email_mohu.png" v-else class="phone_mohu" />
          </div>

          <div class="con_item" v-if="certList.length">
            <span class="lside_title">Teaching Certificate:</span>
            <span
              class="item_con"
              v-for="(item, index) in certList"
              :key="index"
            >{{ certList.length -1 == index ? item : item + '，' }}</span>
          </div>
        </div>

        <div class="rside_con">
          <div class="con_item">
            <span class="lside_title">Social Media:</span>
            <span class="item_con" v-if="info.wechat != null">
              {{
              mediaList[info.comm_type - 1] + ":" + info.wechat
              }}
            </span>
            <img src="/static/images/email_mohu.png" v-else class="phone_mohu" />
          </div>
          <div class="con_item" v-if="info.work_flg != null">
            <span class="lside_title">Work Status:</span>
            <span class="item_con">
              {{
              info.work_flg == 0 ? "Employed" : "Employed"
              }}
            </span>
          </div>
        </div>
      </div>

      <div class="s18 h40">Work Intention</div>
      <div class="message_wrapper">
        <div class="rside_con">
          <div class="con_item" v-if="info.china_address_city_data != null">
            <span class="lside_title">Current Location:</span>
            <span class="item_con">
              {{
              info.china_address_city_data.city_data.pinyin +
              "，" +
              info.china_address_city_data.province_data.pinyin
              }}
            </span>
          </div>

          <div class="con_item">
            <span class="lside_title">Work Category:</span>
            <span class="item_con">
              {{
              jobWorkTypeList[info.job_work_type - 1]
              }}
            </span>
          </div>

          <div class="con_item" v-if="ageList.length > 0">
            <span class="lside_title">Preferred Student Age:</span>
            <span
              class="item_con"
              v-for="(age, index) in ageList"
              :key="index"
            >{{ (ageList.length - 1) == index ? age + " years old" : age + ' years old，' }}</span>
          </div>
          <div class="con_item" v-if="schoolList.length > 0">
            <span class="lside_title">Preferred Type of School:</span>
            <span
              class="item_con"
              v-for="(item, index) in schoolList"
              :key="index"
            >{{ (schoolList.length - 1) == index ? item : item + '，' }}</span>
          </div>
          <div class="con_item" v-if="info.working_city_datas != null">
            <span class="lside_title">Preferred Job Location:</span>
            <span
              class="item_con"
            >{{info.working_city_datas[0].city_data.pinyin +"，" +info.working_city_datas[0].province_data.pinyin}}</span>
          </div>
        </div>
        <div class="rside_con" v-if="user_info.vip">
          <div class="con_item">
            <span class="lside_title">Work Type:</span>
            <span class="item_con">{{ jobTypeList[info.job_type - 1] }}</span>
          </div>
        </div>
      </div>

      <div>
        <div class="s18 h40">Education Background</div>
        <div class="education_wrapper" v-for="(item, index) in education" :key="index">
          <div class="education_con">
            <div class="lside_education">
              <span class="lside_title">Duration:</span>
              <span class="item_con">{{ item.edu_start_time + "-" + item.edu_end_time }}</span>
            </div>
            <div class="lside_education" style="display:flex;">
              <p class="lside_title" style="width: 54px;">School:</p>
              <p class="item_con" style="min-width: 324px;vertical-align: top;">{{ item.school }}</p>
            </div>
            <div class="rside_education">
              <span class="lside_title">Major:</span>
              <span class="item_con">{{ item.major }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="s18" style="margin-bottom:20px;">Work Experience</div>
      <div class="education_wrapper" v-for="(item, index) in info.work" :key="index">
        <!-- <p
          class="date_time"
          v-if="item.start_time != null && item.end_time != null"
        >{{ item.start_time + "-" + item.end_time }}</p>-->
        <div class="education_con">
          <div class="lside_education">
            <span class="lside_title">Duration:</span>
            <span class="item_con">{{item.start_time + '-' + (item.end_time && item.now == 1 ? item.end_time : 'Present')}}</span>
          </div>
          <div class="lside_education">
            <span class="lside_title">Company:</span>
            <span class="item_con">{{ item.company_name }}</span>
          </div>
          <div class="rside_education">
            <span class="lside_title">Position:</span>
            <span class="item_con">{{ item.position }}</span>
          </div>
        </div>
        <el-input
          type="textarea"
          autosize
          v-model="item.work_desc"
          style="width:40%;margin-bottom:20px;"
          :disabled="true"
        ></el-input>
      </div>

      <div class="s18">Personal Statement</div>

      <div class="introduce mt20">{{ info.desc }}</div>

      <div class="s18" v-if="info.videos_path != null">Self-introduction Video</div>
      <video
        v-if="info.videos_path != null"
        controls="controls"
        :src="
          info.videos_path
            ? info.videos_path.path
            : ''
        "
        style="margin-top: 20px; width:780px; border-radius: 10px; outline: none;max-width:434px;max-height:300px;"
      ></video>

      <div
        v-if="
          info.notes_path &&
            info.notes_path.length > 0 &&
            info.notes_path[0] &&
            info.notes_path[0].path
        "
      >
        <div class="s18">附件 / 其他</div>
        <div class="resume mt20">
          <img class="resume_img" src="../../assets/image/resume.png" />
          <div class="resume_t">Lyon Resume . docx</div>
          <el-button class="resume_btn" type="text" @click="download">下载</el-button>
        </div>
      </div>
    </div>

    <el-dialog :visible.sync="dialogVisible" width="50%" :show-close="false">
      <div slot="title" class="dialog_title">发送线上面试邀请</div>
      <div>
        <el-steps :active="3" simple class="dialog_steps">
          <el-step title="选择时间" icon="el-icon-edit"></el-step>
          <el-step title="等待确认" icon="el-icon-upload"></el-step>
          <el-step title="预约成功" icon="el-icon-success"></el-step>
        </el-steps>
      </div>

      <el-row class="dialog_row" :gutter="10">
        <el-col :span="4">
          <div class="dialog_t1">招聘需求</div>
        </el-col>
        <el-col :span="10">
          <el-select v-model="invite_data.jid" placeholder="请选择" style="width: 100%">
            <el-option v-for="item in job_list" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-row class="dialog_row" :gutter="10">
        <el-col :span="4">
          <div class="dialog_t1">选择时间</div>
        </el-col>

        <el-col :span="10">
          <el-date-picker
            :picker-options="pickerOptions"
            style="width: 100%"
            v-model="invite_data.time"
            type="datetime"
            placeholder="选择日期时间"
            default-time="12:00:00"
            format="yyyy-MM-dd HH:mm"
            value-format="yyyy-MM-dd HH:mm"
          ></el-date-picker>
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialog_submit()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="./teachdesc.js"></script>
<style src="./teachdesc.css" scoped></style>
