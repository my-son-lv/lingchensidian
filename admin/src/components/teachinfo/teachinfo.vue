<template>
  <div>
    <div class="menu">
      <el-button
        type="text"
        class="menu_btn"
        icon="el-icon-arrow-left"
        @click="back"
        >回到外教审核列表</el-button
      >
      <el-button class="add_btn" @click="jumpEditTeacher">编辑</el-button>
    </div>
    <div class="info_list_content">
      <div class="info_list">
        <div class="margin-l">
          <div class="notes_wrapper clearfix">
            <el-upload
              ref="upload"
              class="fl"
              action
              accept=".pdf, .docx, .doc"
              :show-file-list="false"
              :auto-upload="false"
              :on-change="resume_upload"
            >
              <el-button class="add_notes_btn">添加简历</el-button>
            </el-upload>
            <p class="upload_tips fl">
              简历建议使用PDF文件，也支持DOC，DOCX，文件大小不超过8M
            </p>
          </div>
          <div class="notes_item">
            <div
              class="sub_title"
              v-for="(notes, index) in this.info.notes_path"
              :key="index"
              @click="download(index)"
            >
              <i class="el-icon-tickets"></i>
              {{ notes.name }}
              <el-button
                type="text"
                icon="el-icon-delete"
                @click.stop="delNotes(index, info.mid)"
              ></el-button>
            </div>
          </div>
        </div>
      </div>

      <div class="info_list_2">
        <div class="margin-lr">
          <div class="row1">
            <div class="fl st1">Basic Information</div>
          </div>
          <div class="row1">
            <div class="fl st2">Name</div>
            <div class="fr st3" v-on:click="edit('name')">{{ info.name }}</div>
          </div>
          <div class="row1">
            <div class="fl st2">Last Name</div>
            <div class="fr st3" v-on:click="edit('last_name')">
              {{ info.last_name }}
            </div>
          </div>
          <div class="row1">
            <div class="fl st2">Phone Number</div>
            <div class="fr st3" v-on:click="edit('phone')">
              {{ info.phone }}
            </div>
          </div>
          <div class="row1">
            <div class="fl st2">Gender</div>
            <div class="fr st3" v-on:click="edit_dialog('sex')">
              {{ info.sex ? "female" : "male" }}
            </div>
          </div>
          <div class="row1">
            <div class="fl st2">Date of Birth</div>
            <div class="fr st3" v-on:click="edit_dialog('brithday')">
              {{ info.brithday }}
            </div>
          </div>
          <div class="row1">
            <div class="fl st2">Nationality</div>
            <div class="fr st3" v-on:click="edit_dialog('nationality')">
              {{ nationality_obj ? nationality_obj.code : "" }}
            </div>
          </div>

          <div class="row1">
            <div class="fl st2">Wechat</div>
            <div class="fr st3" v-on:click="edit('wechat')">
              {{ info.wechat }}
            </div>
          </div>

          <div class="row1">
            <div class="fl st2">In China</div>
            <div class="fr st3" v-on:click="edit_dialog('in_domestic')">
              {{ info.in_domestic ? "Yes" : "No" }}
            </div>
          </div>

          <div class="row1" v-if="!info.in_domestic">
            <div class="fl st2">Address</div>
            <div class="fr st3" v-on:click="edit_dialog('country')">
              {{ country_obj ? country_obj.code : "blank" }}
            </div>
          </div>

          <div class="row1" v-if="info.in_domestic">
            <div class="fl st2">Visa Type</div>
            <div class="fr st3" v-on:click="edit_dialog('visa_type')">
              {{
                info.visa_type ? visa_type_list[info.visa_type - 1].code : ""
              }}
            </div>
          </div>

          <div class="row1" v-if="info.in_domestic">
            <div class="fl st2">Date of Expiry</div>
            <div class="fr st3" v-on:click="edit_dialog('visa_exp_date')">
              {{ info.visa_exp_date }}
            </div>
          </div>

          <div class="row1" v-if="info.in_domestic">
            <div class="fl st2">Current Location</div>
            <div class="fr st3" v-on:click="edit_dialog('china_address')">
              {{
                info.china_address_city_data
                  ? info.china_address_city_data.province_data.pinyin +
                    "-" +
                    info.china_address_city_data.city_data.pinyin
                  : ""
              }}
            </div>
          </div>
        </div>
      </div>

      <div class="info_list_2">
        <div class="margin-lr">
          <div class="row1">
            <div class="fl st1">Education Information</div>
          </div>
          <div class="education" v-if="this.education.length > 0">
            <div class="education_title">Education Background</div>
            <div
              class="education_wrapper"
              v-for="(item, index) in this.education"
              :key="index"
            >
              <!-- <p
                class="st3 item"
                v-if="item.edu_start_time != null && item.edu_end_time != null"
              >
                {{ item.edu_start_time + "-" + item.edu_end_time }}
              </p> -->
              <div class="major_wrapper item clearfix">
                <div class="fl st2">Duration</div>
                <div class="fr st3">{{ item.edu_start_time + "-" + item.edu_end_time }}</div>
              </div>
              <div class="major_wrapper item clearfix">
                <div class="fl st2">University</div>
                <div class="fr st3">{{ item.school }}</div>
              </div>
              <div class="major_wrapper item clearfix">
                <div class="fl st2">Major</div>
                <div class="fr st3">{{ item.major }}</div>
              </div>
            </div>
            <!-- <div class="fr st3" v-on:click="edit('school')">
              {{ info.school }}
            </div> -->
          </div>
          <div class="row1">
            <div class="fl st2">Highest Academic Degree</div>
            <div class="fr st3" v-on:click="edit_dialog('university')">
              {{ info.university ? degree[info.university - 1].code : "" }}
            </div>
          </div>
          <div v-if="info.university_img_path != null">
            <img :src="info.university_img_path.path" class="all_cert_img" />
          </div>
          <div style="margin-top:20px;">
            <div class="st2">
              Teaching Certificate
            </div>
            <p
              class="st3"
              v-if="info.edu_cert_flg == 1"
              style="margin-top:20px;"
            >
              TEFL
            </p>
            <img
              :src="info.edu_cert_imgs_path.path"
              class="all_cert_img"
              v-if="info.edu_cert_imgs_path != null"
            />
            <p
              class="st3"
              v-if="info.edu_auth_flg == 1"
              style="margin-top:20px;"
            >
              TESOL
            </p>
            <img
              :src="info.edu_auth_imgs_path.path"
              class="all_cert_img"
              v-if="info.edu_auth_imgs_path != null"
            />
            <p class="st3" v-if="info.celta_flg == 2" style="margin-top:20px;">
              CELTA
            </p>
            <img
              :src="info.celta_img_path.path"
              class="all_cert_img"
              v-if="info.celta_img_path != null"
            />
            <p
              class="st3"
              v-if="info.cert_other_flg == 2"
              style="margin-top:20px;"
            >
              Others
            </p>
            <img
              :src="info.cert_other_img_path.path"
              class="all_cert_img"
              v-if="info.cert_other_img_path != null"
            />
          </div>
        </div>
      </div>

      <div class="info_list_2">
        <div class="margin-lr">
          <div class="row1">
            <div class="fl st1">Job Information</div>
          </div>

          <div class="row1">
            <div class="fl st2">Work Status</div>
            <div class="fr st3" v-on:click="edit_dialog('work_flg')">
              {{ info.work_flg == 1 ? "Employed" : "Unemployed" }}
            </div>
          </div>

          <div class="row1">
            <div class="fl st2">Working Years</div>
            <div class="fr st3" v-on:click="edit_dialog('working_seniority')">
              {{
                info.working_seniority
                  ? working_seniority_list[info.working_seniority - 1].code
                  : ""
              }}
            </div>
          </div>

          <div class="row1">
            <div class="fl st2">Expected Salary</div>
            <div class="fr st3" v-on:click="edit_dialog('pay_type')">
              {{ info.pay_type ? pay_type_list[info.pay_type - 1].code : "" }}
            </div>
          </div>

          <div class="row1">
            <div class="fl st2">Relocate in China</div>
            <div class="fr st3">
              {{ info.relocate == 1 ? "NO" : "YES" }}
            </div>
          </div>

          <div class="row1" v-if="info.working_city_datas != null">
            <div class="fl st2">Preferred Job Locations</div>
            <div
              class="fr st3"
              v-for="(city, index) in info.working_city_datas"
              :key="index"
            >
              {{ city.city_data.pinyin }},
            </div>
          </div>

          <div class="education" v-if="info.work">
            <div class="education_title">Work Experience</div>
            <div
              class="education_wrapper"
              v-for="(item, index) in info.work"
              :key="index"
            >
              <div class="major_wrapper item clearfix">
                <div class="fl st2">Duration</div>
                <div class="fr st3">{{ item.start_time + "-" + (item.end_time ? item.end_time : 'Present') }}</div>
              </div>
              <div class="major_wrapper item clearfix">
                <div class="fl st2">Company Name</div>
                <div class="fr st3">{{ item.company_name }}</div>
              </div>
              <div class="major_wrapper item clearfix">
                <div class="fl st2">Position</div>
                <div class="fr st3">{{ item.position }}</div>
              </div>
              <el-input
                type="textarea"
                autosize
                v-model="item.work_desc"
                style="width:50%;margin-bottom:20px;"
                :disabled="true"
              >
              </el-input>
            </div>
            <!-- <div class="fr st3" v-on:click="edit('school')">
              {{ info.school }}
            </div> -->
          </div>
        </div>
      </div>

      <div class="info_list_2">
        <div class="margin-lr">
          <div class="row1">
            <div class="fl st1">Personal Statement(text)</div>
            <el-button
              type="text"
              class="fr st3"
              v-if="textarea_disabled"
              @click="textarea_edit"
              >编辑</el-button
            >

            <el-button
              type="primary"
              class="fr"
              v-if="!textarea_disabled"
              @click="textarea_done(true)"
              >保存</el-button
            >
            <el-button
              type="plain"
              class="fr"
              style="margin-right: 20px"
              v-if="!textarea_disabled"
              @click="textarea_done(false)"
              >取消</el-button
            >
          </div>

          <el-input
            type="textarea"
            placeholder
            v-model="info.desc"
            maxlength="500"
            show-word-limit
            :rows="5"
            :disabled="textarea_disabled"
            style="font-size: 16px; margin-top: 20px"
          ></el-input>
        </div>
      </div>

      <div class="info_list_2">
        <div class="margin-lr">
          <div class="row1">
            <div class="fl st1">Self-introduction (Video)</div>
          </div>
          <video
            :src="info.videos_path != null ? info.videos_path.path : ''"
            controls="controls"
            style="
              margin-top: 40px;
              width: 100%;
              border-radius: 10px;
              outline: none;
              max-height:300px;
              max-width:434px;
            "
          ></video>
        </div>
      </div>

      <div class="info_list_2">
        <div class="margin-lr">
          <div class="row1">
            <div class="fl st1">Self- introduction (photo)</div>
          </div>

          <div class="row1">
            <div class="st2">Picture</div>
          </div>

          <div
            style="position: relative; width: 49%; height: 0; padding-top: 50%"
          >
            <el-image
              style="
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                margin-top: 10px;
                border-radius: 10px;
                width: 250px;
                height: 250px;
              "
              v-if="info.photos_path != null"
              :src="info.photos_path.path"
            ></el-image>
            <el-image
              style="
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                margin-top: 10px;
                border-radius: 10px;
                width: 250px;
                height: 250px;
              "
              v-else
              :src="
                info.sex == 0
                  ? '/static/images/man.png'
                  : '/static/images/woman.png'
              "
            ></el-image>
          </div>
        </div>
      </div>
    </div>

    <el-dialog :title="dialog_title" :visible.sync="dialogFormVisible">
      <el-radio v-model="sex" :label="0" v-if="dialog_title == 'sex'"
        >male</el-radio
      >
      <el-radio v-model="sex" :label="1" v-if="dialog_title == 'sex'"
        >female</el-radio
      >

      <el-radio
        v-model="in_domestic"
        :label="0"
        v-if="dialog_title == 'in_domestic'"
        >No</el-radio
      >
      <el-radio
        v-model="in_domestic"
        :label="1"
        v-if="dialog_title == 'in_domestic'"
        >Yes</el-radio
      >

      <el-radio v-model="work_flg" :label="0" v-if="dialog_title == 'work_flg'"
        >No</el-radio
      >
      <el-radio v-model="work_flg" :label="1" v-if="dialog_title == 'work_flg'"
        >Yes</el-radio
      >

      <el-select
        v-if="dialog_title == 'university'"
        v-model="university"
        placeholder=" "
        style="width: 100%; margin-top: 17px"
      >
        <el-option
          v-for="item in degree"
          :key="item.id"
          :label="item.code"
          :value="item.id"
        ></el-option>
      </el-select>

      <el-select
        v-if="dialog_title == 'pay_type'"
        v-model="pay_type"
        placeholder=" "
        style="width: 100%; margin-top: 17px"
      >
        <el-option
          v-for="item in pay_type_list"
          :key="item.id"
          :label="item.code"
          :value="item.id"
        ></el-option>
      </el-select>

      <el-date-picker
        v-if="dialog_title == 'brithday'"
        v-model="brithday"
        type="date"
        placeholder="Select Date"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        style="width: 100%"
      ></el-date-picker>

      <el-date-picker
        v-if="dialog_title == 'visa_exp_date'"
        v-model="visa_exp_date"
        type="date"
        placeholder="Select Date"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        style="width: 100%"
      ></el-date-picker>

      <el-select
        v-if="dialog_title == 'nationality'"
        v-model="nationality"
        placeholder=" "
        style="width: 100%"
      >
        <el-option
          v-for="item in countryList"
          :key="item.id"
          :label="item.code"
          :value="item.id"
        ></el-option>
      </el-select>

      <el-select
        v-if="dialog_title == 'country'"
        v-model="country"
        placeholder=" "
        style="width: 100%"
      >
        <el-option
          v-for="item in countryList"
          :key="item.id"
          :label="item.code"
          :value="item.id"
        ></el-option>
      </el-select>

      <el-select
        v-if="dialog_title == 'working_seniority'"
        v-model="working_seniority"
        placeholder=" "
        style="width: 100%"
      >
        <el-option
          v-for="item in working_seniority_list"
          :key="item.id"
          :label="item.code"
          :value="item.id"
        ></el-option>
      </el-select>

      <el-select
        v-if="dialog_title == 'visa_type'"
        v-model="visa_type"
        placeholder=" "
        style="width: 100%"
      >
        <el-option
          v-for="item in visa_type_list"
          :key="item.id"
          :label="item.code"
          :value="item.id"
        ></el-option>
      </el-select>

      <el-row
        :gutter="15"
        style="width: 400px"
        v-if="dialog_title == 'china_address'"
      >
        <el-col :span="10">
          <el-select
            v-model="provinceSelect_working"
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
            v-model="citySelect_working"
            placeholder=" "
            no-data-text="Choose the left first."
          >
            <el-option
              v-for="item in cityList_working"
              :key="item.id"
              :label="item.pinyin"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-row :gutter="60" class="el_row" v-if="dialog_title == 'working_city'">
        <el-col :span="12">
          <el-row :gutter="15" class="mt_20">
            <el-col :span="10">
              <el-select
                v-model="working_city_obj.provinceSelect_0"
                placeholder=" "
                @change="provinceChange_working_1($event, 0)"
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
                v-model="working_city_obj.citySelect_0"
                placeholder=" "
                no-data-text="Choose the left first"
              >
                <el-option
                  v-for="item in working_city_obj.cityList_0"
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
                v-on:click="show_working_city"
              ></el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-row
        :gutter="60"
        class="el_row"
        v-show="working_city_obj.show_obj_01"
        v-if="dialog_title == 'working_city'"
      >
        <el-col :span="12">
          <el-row :gutter="15" class="mt_10">
            <el-col :span="10">
              <el-select
                v-model="working_city_obj.provinceSelect_1"
                placeholder=" "
                @change="provinceChange_working_1($event, 1)"
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
                v-model="working_city_obj.citySelect_1"
                placeholder=" "
                no-data-text="Choose the left first"
              >
                <el-option
                  v-for="item in working_city_obj.cityList_1"
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
                v-on:click="hidden_working_city('show_obj_01')"
              ></el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-row
        :gutter="60"
        class="el_row"
        v-show="working_city_obj.show_obj_02"
        v-if="dialog_title == 'working_city'"
      >
        <el-col :span="12">
          <el-row :gutter="15" class="mt_10">
            <el-col :span="10">
              <el-select
                v-model="working_city_obj.provinceSelect_2"
                placeholder=" "
                @change="provinceChange_working_1($event, 2)"
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
                v-model="working_city_obj.citySelect_2"
                placeholder=" "
                no-data-text="Choose the left first"
              >
                <el-option
                  v-for="item in working_city_obj.cityList_2"
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
                v-on:click="hidden_working_city('show_obj_02')"
              ></el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialog_submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script src="./teachinfo.js"></script>
<style src="./teachinfo.css" scoped></style>
