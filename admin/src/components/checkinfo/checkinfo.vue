<template>
  <div>
    <div class="menu">
      <el-button type="text" class="menu_btn" icon="el-icon-arrow-left" @click="back">回到外教审核列表</el-button>
      <div class="sub_menu" v-if="info.status == 1">
        <div class="sub_menu_name">{{info.nick_name}}</div>
        <el-button type="text" class="submenu_btn_r" @click="reject">驳回</el-button>
        <el-button type="text" class="submenu_btn_l" @click="pass">通过</el-button>
      </div>
    </div>
    <div class="info_list_content">
      <div class="info_list">
        <div class="margin-l">
          <div class="t1">Account information</div>
          <div class="t2">User ID：{{info.user_id}}</div>
          <div class="t2">Sign in ID：{{info.sign_id}}</div>
        </div>
      </div>

      <div class="info_list_2">
        <div class="margin-lr">
          <div class="row1">
            <div class="fl st1">The Basic information</div>
          </div>
          <div class="row1">
            <el-checkbox v-model="select_options[0].selected" class="checkbox"></el-checkbox>
            <div class="fl st2">Name</div>
            <div class="fr st3">{{info.name}} {{info.last_name}}</div>
          </div>
          <div class="row1">
            <el-checkbox v-model="select_options[8].selected" class="checkbox"></el-checkbox>
            <div class="fl st2">Phone Number</div>
            <div class="fr st3">{{info.phone}}</div>
          </div>
          <div class="row1">
            <el-checkbox v-model="select_options[1].selected" class="checkbox"></el-checkbox>
            <div class="fl st2">Gender</div>
            <div class="fr st3">{{info.sex ? 'female' : 'male'}}</div>
          </div>
          <div class="row1">
            <el-checkbox v-model="select_options[2].selected" class="checkbox"></el-checkbox>
            <div class="fl st2">Date of Birth</div>
            <div class="fr st3">{{info.brithday}}</div>
          </div>
          <div class="row1">
            <el-checkbox v-model="select_options[3].selected" class="checkbox"></el-checkbox>
            <div class="fl st2">Nationality</div>
            <div class="fr st3">{{nationality_obj ? nationality_obj.code : 'blank'}}</div>
          </div>
          <div class="row1">
            <el-checkbox v-model="select_options[9].selected" class="checkbox"></el-checkbox>
            <div class="fl st2">Wechat</div>
            <div class="fr st3">{{info.wechat}}</div>
          </div>

          <div class="row1">
            <el-checkbox v-model="select_options[12].selected" class="checkbox"></el-checkbox>
            <div class="fl st2">In China</div>
            <div class="fr st3">{{ info.in_domestic ? 'Yes' : 'No'}}</div>
          </div>
          <div class="row1" v-if="!info.in_domestic">
            <el-checkbox v-model="select_options[13].selected" class="checkbox"></el-checkbox>
            <div class="fl st2">Address</div>
            <div class="fr st3">{{country_obj ? country_obj.code : 'blank'}}</div>
          </div>

          <div class="row1" v-if="info.in_domestic">
            <el-checkbox v-model="select_options[20].selected" class="checkbox"></el-checkbox>
            <div class="fl st2">Visa Type</div>
            <div class="fr st3">{{ info.visa_type ? visa_type_list[info.visa_type - 1].code : 'blank'}}</div>
          </div>

          <div class="row1" v-if="info.in_domestic">
            <el-checkbox v-model="select_options[21].selected" class="checkbox"></el-checkbox>
            <div class="fl st2">Date of Expiry</div>
            <div class="fr st3">{{info.visa_exp_date}}</div>
          </div>

          <div class="row1" v-if="info.in_domestic">
            <el-checkbox v-model="select_options[22].selected" class="checkbox"></el-checkbox>
            <div class="fl st2">City</div>
            <div class="fr st3">{{info.china_address_city_data ? (info.china_address_city_data.province_data.pinyin + '-' + info.china_address_city_data.city_data.pinyin) : 'blank'}}</div>
          </div>
        </div>
      </div>

      <div class="info_list_2">
        <div class="margin-lr">
          <div class="row1">
            <div class="fl st1">Education information</div>
          </div>
          <div class="row1">
            <el-checkbox v-model="select_options[5].selected" class="checkbox"></el-checkbox>
            <div class="fl st2">Name of University</div>
            <div class="fr st3">{{info.school}}</div>
          </div>
          <div class="row1">
            <el-checkbox v-model="select_options[6].selected" class="checkbox"></el-checkbox>
            <div class="fl st2">Major</div>
            <div class="fr st3">{{info.major}}</div>
          </div>
          <div class="row1">
            <el-checkbox v-model="select_options[10].selected" class="checkbox"></el-checkbox>
            <div class="fl st2">Highest Academic Degree</div>
            <div class="fr st3">{{ info.university ? degree[info.university - 1].code : 'blank'}}</div>
          </div>

          <div style="margin-top: 20px; width:100%; height:25px; position:relative;">
            <div class="st2" style="position:absolute; top:0; left:0; width: 49%; height:100%;">
              <el-checkbox v-model="select_options[17].selected"></el-checkbox>
              TEFL：{{info.edu_cert_flg ? 'Yes' : 'No'}}
            </div>

            <div class="st2" style="position:absolute; top:0; right:0; width: 49%; height:100%;">
              <el-checkbox v-model="select_options[18].selected"></el-checkbox>
              TESOL：{{info.edu_auth_flg ? 'Yes' : 'No'}}
            </div>
          </div>

          <div style="position:relative; width:100%; height:0; padding-top:50%">
            <el-image style="position:absolute; top:20px; left:0; width: 49%; margin-top: 10px; border-radius: 10px;" :src="(info.edu_cert_imgs_path && info.edu_cert_imgs_path.length > 0) ? info.edu_cert_imgs_path[0].path : ''" fit="contain" v-if="info.edu_cert_imgs_path"></el-image>

            <el-image style="position:absolute; top:20px; right:0; width: 49%; margin-top: 10px; border-radius: 10px;" :src="(info.edu_auth_imgs_path  && info.edu_auth_imgs_path.length > 0)? info.edu_auth_imgs_path[0].path : ''" fit="contain" v-if="info.edu_cert_imgs_path"></el-image>
          </div>
        </div>
      </div>

      <div class="info_list_2">
        <div class="margin-lr">
          <div class="row1">
            <div class="fl st1">Job information</div>
          </div>

          <div class="row1">
            <el-checkbox v-model="select_options[19].selected" class="checkbox"></el-checkbox>
            <div class="fl st2">Still in role</div>
            <div class="fr st3">{{info.work_flg ? 'Yes' : 'No'}}</div>
          </div>

          <div class="row1">
            <el-checkbox v-model="select_options[7].selected" class="checkbox"></el-checkbox>
            <div class="fl st2">Working Years</div>
            <div class="fr st3">{{info.working_seniority ? working_seniority_list[info.working_seniority - 1].code : 'blank'}}</div>
          </div>

          <div class="row1">
            <el-checkbox v-model="select_options[11].selected" class="checkbox"></el-checkbox>
            <div class="fl st2">Expected Salary</div>
            <div class="fr st3">{{info.pay_type ? pay_type_list[info.pay_type - 1].code : 'blank'}}</div>
          </div>

          <div class="row1">
            <el-checkbox v-model="select_options[23].selected" class="checkbox"></el-checkbox>
            <div class="fl st2">Preferred cities</div>
            <div class="fr st3">{{get_cities()}}</div>
          </div>
        </div>
      </div>

      <div class="info_list_2">
        <div class="margin-lr">
          <div class="row1">
            <el-checkbox v-model="select_options[14].selected" class="checkbox"></el-checkbox>
            <div class="fl st1">About me (text)</div>
          </div>

          <el-input type="textarea" placeholder v-model="info.desc" maxlength="500" show-word-limit :rows="5" :disabled="true" style="font-size: 16px; margin-top: 20px"></el-input>
        </div>
      </div>

      <div class="info_list_2">
        <div class="margin-lr">
          <div class="row1">
            <el-checkbox v-model="select_options[15].selected" class="checkbox"></el-checkbox>
            <div class="fl st1">Self introduction (Video)</div>
          </div>
          <video :src="(info.videos_path && info.videos_path.length > 0) ? info.videos_path[0].path : ''" controls="controls" style="margin-top: 40px; width:100%; border-radius: 10px; outline: none"></video>
        </div>
      </div>

      <div class="info_list_2">
        <div class="margin-lr">
          <div class="row1">
            <el-checkbox v-model="select_options[16].selected" class="checkbox"></el-checkbox>
            <div class="fl st1">Self introduction (Photo)</div>
          </div>
          <div style="position:relative; width:49%; height:0; padding-top:50%">
            <el-image style="position:absolute; top:10px; left:0; width: 100%; height:100%; margin-top: 10px; border-radius: 10px;" v-if="info.photos_path && info.photos_path.length > 0" :src="info.photos_path[0].path"></el-image>
            <el-image style="position:absolute; top:10px; left:0; width: 100%; height:100%; margin-top: 10px; border-radius: 10px;" v-else :src="info.sex == 0 ? '/static/images/man.png' : '/static/images/woman.png'"></el-image>
          </div>
        </div>
      </div>

      <div class="info_list_2">
        <div class="margin-lr">
          <div class="row1">
            <div class="fl st1">Enclosure</div>
          </div>

          <div class="row1">
            <el-button v-if="info.notes_path && info.notes_path.length > 0 && info.notes_path[0] && info.notes_path[0].path" @click="download">查看附件</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./checkinfo.js"></script>
<style src="./checkinfo.css" scoped></style>
