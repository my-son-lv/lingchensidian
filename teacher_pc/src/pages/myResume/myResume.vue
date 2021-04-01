<template>
  <div class="my_wrapper">
    <div class="no_message_wrapper" v-show="showNoMessage == true"></div>
    <div v-show="showNoMessage == false" style="display: flex;">
      <div class="lside_con_wrapper">
        <div class="lside_top_wrapper">
          <div v-if="showEducation" class="education clearfix">
            <div
              class="fl"
              @mouseenter="showCamera = true"
              @mouseleave="showCamera = false"
            >
              <el-upload
                class="img_wrapper"
                action
                list-type="picture-card"
                :show-file-list="false"
                :auto-upload="false"
                :on-change="file => uploadFileChange(file, 0)"
                v-loading="isloading"
              >
                <img
                  v-if="teacherInfo.photos_path != null"
                  :src="teacherInfo.photos_path.path"
                  class="lside_img"
                />
                <img
                  v-else
                  :src="
                    teacherInfo.sex == 0
                      ? '/static/images/man.png'
                      : '/static/images/woman.png'
                  "
                  class="lside_img"
                />
                <div class="camera_wrapper" v-if="showCamera">
                  <img
                    src="../../assets/image/camera_icon.png"
                    class="camera_icon"
                  />
                </div>
              </el-upload>
            </div>
            <div class="lside_userinfo fl">
              <p class="user_name">
                {{ teacherInfo.name + " " + teacherInfo.last_name }}
                <img
                  :src="
                    teacherInfo.sex == 0
                      ? '/static/images/man_icon.png'
                      : '/static/images/woman_icon.png'
                  "
                  class="sex_icon"
                />
              </p>
              <ul class="work_wrapper clearfix">
                <li class="item">
                  <img src="../../assets/image/wotk.png" />
                  <span>{{
                    teacherInfo.working_seniority | workingSeniority
                  }}</span>
                </li>
                <li class="item">
                  <img src="../../assets/image/education_icon.png" />
                  <span>{{ teacherInfo.university | filterTeachDegree }}</span>
                </li>
                <li class="item">
                  <img src="../../assets/image/type_icon.png" />
                  <span>{{
                    teacherInfo.work_flg == 0 ? "Employed" : "Unemployed"
                  }}</span>
                </li>
              </ul>
              <ul
                class="phone_wrapper clearfix"
                style="margin-top: 20px; margin-bottom: 40px"
              >
                <li class="item">
                  <img src="../../assets/image/phone.png" />
                  <span>{{ teacherInfo.phone }}</span>
                </li>
                <li class="item">
                  <img src="../../assets/image/mail_icon.png" />
                  <span>{{ teacherInfo.email }}</span>
                </li>
                <li class="item">
                  <img src="../../assets/image/wx_icon.png" />
                  <span>{{ teacherInfo.wechat }}</span>
                </li>
              </ul>
            </div>
            <div
              class="right_edit_wrapper"
              @click="showEducation = !showEducation"
            >
              <img src="../../assets/image/edit_icon.png" class="edit_icon" />
              <!-- <span>revise</span> -->
            </div>
          </div>
          <div v-else class="edit_education">
            <h5>Education information</h5>
            <div class="con_wrapper">
              <div class="name">
                <p>First Name</p>
                <el-input v-model="name" placeholder="First Name"></el-input>
                <div class="error_tips" v-show="showNameErr">
                  Please enter name
                </div>
              </div>
              <div class="name" style="margin-left: 20px">
                <p>Last Name</p>
                <el-input
                  v-model="last_name"
                  placeholder="Last Name"
                ></el-input>
                <div class="error_tips" v-show="showLastNameErr">
                  Please enter last name
                </div>
              </div>
            </div>
            <div class="con_wrapper">
              <div class="name">
                <p>Highest Degree</p>
                <el-select
                  v-model="university"
                  filterable
                  placeholder="Please Select"
                  style="width: 310px"
                >
                  <el-option
                    v-for="item in allDegreeList"
                    :key="item.id"
                    :label="item.code"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="name" style="margin-left: 20px">
                <p>Work Status</p>
                <div class="status_wrapper">
                  <div
                    class="item_certificate fl"
                    v-for="(item, index) in roleList"
                    :key="index"
                    @click="handleClickRoleItem(index)"
                    :class="activeRoleClass == index ? 'actived' : ''"
                  >
                    {{ item }}
                  </div>
                </div>
              </div>
            </div>
            <div class="con_wrapper">
              <div class="name" style="margin-right: 20px">
                <p>Phone Number</p>
                <el-select
                  v-model="area_code"
                  filterable
                  placeholder="Please select"
                  style="width: 110px"
                >
                  <el-option
                    v-for="item in telOptions"
                    :key="item.id"
                    :label="item.titleKey"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
                <el-input
                  v-model="phone"
                  placeholder="Phone Number"
                  style="margin-left: 15px; width: 180px"
                ></el-input>
                <div class="error_tips" v-show="showPhoneErr">
                  Please enter phone
                </div>
              </div>
              <div class="name">
                <p>E-mail</p>
                <el-input
                  v-model="teacherInfo.email"
                  placeholder="Email"
                  :disabled="true"
                ></el-input>
              </div>
            </div>
            <div class="con_wrapper">
              <div class="name" style="margin-right: 20px">
                <p>Social Media</p>
                <el-select
                  v-model="comm_type"
                  filterable
                  placeholder="Please select"
                  style="width: 110px"
                >
                  <el-option
                    v-for="item in mediaList"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
                <el-input
                  v-model="wechat"
                  placeholder="Media Number"
                  style="margin-left: 15px; width: 180px"
                ></el-input>
                <div class="error_tips" v-show="showWechatErr">
                  Please enter media number
                </div>
              </div>
            </div>
            <div class="btn_wrapper">
              <div class="cancel_btn" @click="showEducation = !showEducation">
                Cancel
              </div>
              <div class="confirm_btn" @click="handleClickFirstConfirm">
                Confirm
              </div>
            </div>
          </div>
        </div>

        <div class="personal_introduction_wrapper">
          <div class="personal_wrapper" v-if="showPersonal">
            <h5>Personal introduction</h5>
            <el-input
              type="textarea"
              autosize
              placeholder="Please talk about yourself; your interests"
              v-model="desc"
              :disabled="true"
            >
            </el-input>
            <div
              class="right_edit_wrapper"
              @click="showPersonal = !showPersonal"
            >
              <img src="../../assets/image/edit_icon.png" class="edit_icon" />
              <!-- <span>revise</span> -->
            </div>
          </div>
          <div class="edit_personal_wrapper" v-else>
            <h5 style="margin-bottom: 20px">Personal introduction</h5>
            <p>Your Introduction</p>
            <el-input
              type="textarea"
              autosize
              placeholder="Please talk about yourself; your interests"
              v-model="desc"
            ></el-input>
            <div class="error_tips" v-show="showPersonalErr">
              Please enter your introduction
            </div>
            <div class="btn_wrapper">
              <div class="cancel_btn" @click="showPersonal = !showPersonal">
                Cancel
              </div>
              <div class="confirm_btn" @click="handleClickPersonalConfirm">
                Confirm
              </div>
            </div>
          </div>
        </div>

        <div class="personal_introduction_wrapper">
          <div class="sought_wrapper" v-if="showBasic">
            <h5>Basic information</h5>
            <div class="job_con_item clearfix">
              <p class="item_lside_con fl">Nationality</p>
              <p class="item_rside_con fr" v-if="teacherInfo.nationality_val">
                {{ teacherInfo.nationality_val.y_name }}
              </p>
            </div>
            <div class="job_con_item clearfix">
              <p class="item_lside_con fl">Date of Birth</p>
              <p class="item_rside_con fr">
                {{ teacherInfo.brithday }}
              </p>
            </div>
            <div class="job_con_item clearfix">
              <p class="item_lside_con fl">Current Location</p>
              <p
                class="item_rside_con fr"
                v-if="teacherInfo.china_address_city_data"
              >
                {{
                  teacherInfo.china_address_city_data != null
                    ? teacherInfo.china_address_city_data.city_data.pinyin
                    : teacherInfo.country_val.y_name
                }}
              </p>
            </div>
            <div
              class="job_con_item clearfix"
              v-if="teacherInfo.visa_type != null"
            >
              <p class="item_lside_con fl">Visa Type</p>
              <p class="item_rside_con fr">
                {{ teacherInfo.visa_type | filterVisa }}
              </p>
            </div>
            <div
              class="job_con_item clearfix"
              v-if="teacherInfo.visa_exp_date != null"
            >
              <p class="item_lside_con fl">Date of Expiry</p>
              <p class="item_rside_con fr">
                {{ teacherInfo.visa_exp_date }}
              </p>
            </div>
            <div class="right_edit_wrapper" @click="showBasic = !showBasic">
              <img src="../../assets/image/edit_icon.png" class="edit_icon" />
              <!-- <span>revise</span> -->
            </div>
          </div>
          <div class="edit_education" v-else>
            <h5 style="margin-bottom: 20px">Basic information</h5>
            <div class="con_wrapper">
              <div class="name">
                <p>Nationality</p>
                <el-select
                  v-model="nationality"
                  filterable
                  placeholder="Nationality"
                  style="width: 310px"
                >
                  <el-option
                    v-for="item in countryList"
                    :key="item.id"
                    :label="item.code"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="name" style="margin-left: 20px">
                <p>Date of Birth</p>
                <el-date-picker
                  v-model="brithday"
                  :picker-options="pickerOptions"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="Please select your Date of Birth"
                  style="width: 310px"
                >
                </el-date-picker>
                <div class="error_tips" v-show="showBirthErr">
                  Please enter date of birth
                </div>
              </div>
            </div>
            <div class="con_wrapper">
              <div class="name" style="margin-right: 20px">
                <p>Are you in China</p>
                <div class="status_wrapper">
                  <div
                    class="item_certificate fl"
                    v-for="(item, index) in inChinaList"
                    :key="index"
                    @click="handleClickYouInChinaItem(index)"
                    :class="activeYouInChinaClass == index ? 'actived' : ''"
                  >
                    {{ item }}
                  </div>
                </div>
              </div>
              <div class="name" v-if="this.in_domestic == 1">
                <p>Visa Type</p>
                <el-select
                  v-model="visa_type"
                  placeholder="Please select"
                  style="width: 110px"
                >
                  <el-option
                    v-for="item in visaList"
                    :key="item.id"
                    :label="item.code"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
                <el-date-picker
                  v-model="visa_exp_date"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="Date of Expiry"
                  style="margin-left: 15px; width: 180px"
                >
                </el-date-picker>
                <div class="error_tips" v-show="showVisaErr">
                  Please enter visa type
                </div>
              </div>
            </div>
            <div class="con_wrapper">
              <div class="name">
                <p>Current Location</p>
                <div v-if="this.in_domestic == 1">
                  <el-select
                    v-model="provincId"
                    filterable
                    placeholder="Current Location"
                    @change="provincChange"
                    style="width: 150px; margin-right: 5px"
                  >
                    <el-option
                      v-for="item in provincesList"
                      :key="item.id"
                      :label="item.pinyin"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                  <el-select
                    v-model="china_address"
                    filterable
                    placeholder="Location City"
                    style="width: 150px"
                  >
                    <el-option
                      v-for="item in allCitiesList"
                      :key="item.id"
                      :label="item.pinyin"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div v-else>
                  <el-select
                    v-model="country"
                    filterable
                    placeholder="Current Location"
                    style="width: 310px"
                  >
                    <el-option
                      v-for="item in countryList"
                      :key="item.id"
                      :label="item.code"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
            </div>
            <div
              class="error_tips"
              v-show="showLocationErr"
              style="margin-top: -10px"
            >
              Please enter current location
            </div>
            <div class="btn_wrapper">
              <div class="cancel_btn" @click="showBasic = !showBasic">
                Cancel
              </div>
              <div class="confirm_btn" @click="handleClickBasicConfirm">
                Confirm
              </div>
            </div>
          </div>
        </div>

        <div class="job_sought_wrapper">
          <div class="sought_wrapper" v-if="showJobSought">
            <h5>Job Sought</h5>
            <div
              class="right_edit_wrapper"
              @click="showJobSought = !showJobSought"
            >
              <img src="../../assets/image/edit_icon.png" class="edit_icon" />
              <!-- <span>revise</span> -->
            </div>
            <div class="job_con_item clearfix">
              <p class="item_lside_con fl">Job Type</p>
              <p class="item_rside_con fr">
                {{ teacherInfo.job_work_type | filterWorkType }}
              </p>
            </div>
            <div class="job_con_item clearfix">
              <p class="item_lside_con fl">Job Category</p>
              <p class="item_rside_con fr">
                {{ teacherInfo.job_type | filterJobWorkType }}
              </p>
            </div>
            <div class="job_con_item clearfix">
              <p class="item_lside_con fl">Expected Salary</p>
              <p class="item_rside_con fr">
                {{ teacherInfo.pay_type | filterPay }}
              </p>
            </div>
            <div class="job_con_item clearfix">
              <p class="item_lside_con fl">Preferred Job Locations</p>
              <div class="fr">
                <p
                  class="item_rside_con fl"
                  v-if="teacherInfo.working_city_datas == null"
                >
                  Any city in China
                </p>
                <p
                  v-else
                  class="item_rside_con fl"
                  v-for="(city, index) in teacherInfo.working_city_datas"
                  :key="index"
                >
                  {{ city.city_data.pinyin }},
                </p>
              </div>
            </div>
            <div class="job_con_item clearfix">
              <p class="item_lside_con fl">Preferred type of school</p>
              <div style="width: 425px" class="fr">
                <p
                  class="item_rside_con fr"
                  v-for="(school, index) in schoolList"
                  :key="index"
                  style="line-height: 20px"
                >
                  {{ school }},
                </p>
              </div>
            </div>
            <div class="job_con_item clearfix" style="margin-bottom: 0">
              <p class="item_lside_con fl">Age of Students</p>
              <div style="width: 425px; text-align: right" class="fr">
                <p
                  class="item_rside_con"
                  v-for="(age, index) in studentAgeList"
                  :key="index"
                  style="line-height: 20px"
                >
                  {{ age }},
                </p>
              </div>
            </div>
          </div>
          <div v-else class="edit_education">
            <h5>Job Sought</h5>
            <div class="con_wrapper">
              <div class="name">
                <p>Job Type</p>
                <el-select
                  v-model="job_work_type"
                  placeholder="Please Select"
                  style="width: 310px"
                >
                  <el-option
                    v-for="item in jobWorkTypeList"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="name" style="margin-left: 20px">
                <p>Job Category</p>
                <el-select
                  v-model="job_type"
                  placeholder="Please Select"
                  style="width: 310px"
                >
                  <el-option
                    v-for="item in jobTypeList"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="con_wrapper">
              <div class="name">
                <p>Expected Salary</p>
                <el-select
                  v-model="pay_type"
                  placeholder="Please Select"
                  style="width: 310px"
                >
                  <el-option
                    v-for="item in payList"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="name" style="margin-left: 20px">
                <p>Relocate in China</p>
                <div class="status_wrapper">
                  <div
                    class="item_certificate fl"
                    v-for="(item, index) in inChinaList"
                    :key="index"
                    @click="handleClickInChinaItem(index)"
                    :class="activeInChinaClass == index ? 'actived' : ''"
                  >
                    {{ item }}
                  </div>
                </div>
              </div>
            </div>

            <div class="con_wrapper">
              <div class="name">
                <p>Preferred Job Locations</p>
                <div
                  class="china_div"
                  :class="
                    chooseCitiesList == 0 ? 'select_cities' : 'active_cities'
                  "
                  @click="showCityMask = true"
                >
                  <span v-if="chooseCityIdList.length == 0">
                    Select Cities (Max.3)</span
                  >
                  <span
                    v-else
                    v-for="(item, index) in chooseCityIdList"
                    :key="index"
                  >
                    {{ item }},
                  </span>
                </div>
                <div class="error_tips" v-show="showCityErr">
                  Please select Preferred Job Locations
                </div>
              </div>
              <div class="hot_city_wrapper" v-if="showCityMask">
                <h3 class="city_title">Please select Cities (Max 3)</h3>
                <ul class="city_nav_wrapper clearfix">
                  <li
                    class="city_nav_item"
                    v-for="(nav, index) in cityNavList"
                    :key="index"
                    :class="activeNavClass == index ? 'active_nav' : ''"
                    @click="getCityItem(index)"
                  >
                    {{ nav }}
                  </li>
                </ul>
                <el-checkbox-group
                  v-model="chooseCitiesList"
                  class="city_item_wrapper"
                  fill="#078CA91A"
                  text-color="#078CA9"
                  :max="3"
                  @change="cityChange"
                >
                  <el-checkbox-button
                    v-for="(city, index) in cityList"
                    :label="city.id"
                    :key="index"
                    >{{ city.pinyin }}</el-checkbox-button
                  >
                </el-checkbox-group>
                <div class="choose_city_wrapper">
                  <p class="lside-title">Your selection:(max3)</p>
                  <div
                    class="choose_city_item"
                    v-for="(item, index) in chooseCityIdList"
                    :key="index"
                  >
                    {{ item }}
                  </div>
                </div>
                <div class="city_btn_wrapper">
                  <div class="lside_btn" @click.stop="showCityMask = false">
                    Cancel
                  </div>
                  <div class="rside_btn" @click.stop="handleClickCityConfirm">
                    Confirm
                  </div>
                </div>
              </div>
            </div>
            <div
              class="radio_wrapper"
              style="margin-bottom: 20px"
              @click="handleClickInChinaRadio"
            >
              <img
                :src="
                  showNotIcon == true
                    ? '/static/images/yes_icon.png'
                    : '/static/images/not_icon.png'
                "
                class="not_icon"
              />
              <span>Any city in China</span>
            </div>

            <div class="con_wrapper">
              <div class="name" style="margin-right: 20px">
                <p>Preferred type of school</p>
                <el-checkbox-group
                  v-model="school_type"
                  class="school_item_wrapper"
                  fill="#078CA91A"
                  text-color="#078CA9"
                >
                  <el-checkbox-button
                    v-for="(city, index) in allSchoolList"
                    :label="city.id"
                    :key="index"
                    >{{ city.value }}</el-checkbox-button
                  >
                </el-checkbox-group>
                <div
                  class="error_tips"
                  v-show="showSchoolErr"
                  style="margin-top: 0"
                >
                  Please enter Preferred type of school
                </div>
              </div>
            </div>

            <div class="con_wrapper">
              <div class="name" style="margin-right: 20px">
                <p>Age of Students</p>
                <el-checkbox-group
                  v-model="student_age"
                  class="school_item_wrapper"
                  fill="#078CA91A"
                  text-color="#078CA9"
                >
                  <el-checkbox-button
                    v-for="(city, index) in allAgesList"
                    :label="city.id"
                    :key="index"
                    >{{ city.value }}</el-checkbox-button
                  >
                </el-checkbox-group>
                <div class="error_tips" v-show="showAgesErr">
                  Please enter Age of Students
                </div>
              </div>
            </div>

            <div class="btn_wrapper">
              <div class="cancel_btn" @click="showJobSought = !showJobSought">
                Cancel
              </div>
              <div class="confirm_btn" @click="handleClickJobConfirm">
                Confirm
              </div>
            </div>
          </div>
        </div>

        <div class="work_background_wrapper">
          <h2>Work Experience</h2>
          <div class="add_wrapper" @click="handleClickAddWorks">
            <img src="../../assets/image/add_icon.png" class="add_icon" />
            <span class="add">Add</span>
          </div>
          <div class="add_work_wrapper" v-show="showAddEducation">
            <h5>Work Experience</h5>
            <div class="con_wrapper">
              <div class="name">
                <p>Start time</p>
                <el-date-picker
                  v-model="workStartTime"
                  value-format="yyyy-MM"
                  type="month"
                  placeholder="Start time"
                  style="width: 310px"
                >
                </el-date-picker>
                <div class="error_tips" v-show="showStartError">
                  Please enter start time
                </div>
              </div>
              <div class="name" style="margin-left: 20px">
                <p>End time</p>
                <el-date-picker
                  v-model="workEndTime"
                  value-format="yyyy-MM"
                  type="month"
                  placeholder="End time"
                  style="width: 310px"
                  @change="endTimeChange"
                >
                </el-date-picker>
                <div
                  class="date_radio_wrapper"
                  style="margin-top: 10px"
                  @click="handleClickPresent"
                >
                  <img
                    :src="
                      present == false
                        ? '/static/images/not_icon.png'
                        : '/static/images/yes_icon.png'
                    "
                    class="not_icon"
                  />
                  <span>Present</span>
                </div>
                <div class="error_tips" v-show="showEndError">
                  Please enter end time
                </div>
              </div>
            </div>
            <div class="con_wrapper">
              <div class="name">
                <p>Company name</p>
                <el-input
                  v-model="companyName"
                  placeholder="Company name"
                ></el-input>
                <div class="error_tips" v-show="showCompanyNameErr">
                  Please enter company name
                </div>
              </div>
              <div class="name" style="margin-left: 20px">
                <p>Position name</p>
                <el-input
                  v-model="positionName"
                  placeholder="Position name"
                ></el-input>
                <div class="error_tips" v-show="showPositionError">
                  Please enter position name
                </div>
              </div>
            </div>
            <div class="con_wrapper">
              <div class="name">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 5 }"
                  placeholder="Please fill in the job details"
                  v-model="workDesc"
                  style="width: 100%"
                >
                </el-input>
                <!-- <div class="error_tips" v-show="showPreviousError">
                  Please fill in the job details
                </div> -->
              </div>
            </div>
            <div class="btn_wrapper">
              <div
                class="cancel_btn"
                @click="showAddEducation = !showAddEducation"
              >
                Cancel
              </div>
              <div class="confirm_btn" @click="handleClickAddWorkConfirm">
                Confirm
              </div>
            </div>
          </div>
          <div
            class="work_background_inner"
            v-for="(work, index) in work_experiences"
            :key="index"
          >
            <div v-if="work.isShow">
              <div class="work_background_title">
                <p>{{ work.company_name }}</p>
                <span
                  >{{ work.start_time }} -
                  {{ work.now == 2 ? "So Far" : work.end_time }}</span
                >
                <div class="right_revise_wrapper clearfix">
                  <div
                    class="delete_wrapper"
                    style="margin-right: 20px"
                    @click="handleClickWorkDelete(index)"
                    v-if="work_experiences.length > 1"
                  >
                    <img src="../../assets/image/delete.png" />
                    <span>delete</span>
                  </div>
                  <div class="delete_wrapper" @click="handleClickRevise(index)">
                    <img src="../../assets/image/edit_icon.png" />
                    <!-- <span>revise</span> -->
                  </div>
                </div>
              </div>
              <h5 class="position_name">{{ work.position }}</h5>
              <div class="position_content">
                <el-input
                  type="textarea"
                  autosize
                  placeholder="Please fill in the job details"
                  v-model="work.work_desc"
                  :disabled="true"
                >
                </el-input>
              </div>
            </div>

            <div class="add_work_wrapper" v-else>
              <h5>Work Experience</h5>
              <div class="con_wrapper">
                <div class="name">
                  <p>Start time</p>
                  <el-date-picker
                    v-model="work.start_time"
                    value-format="yyyy-MM"
                    type="month"
                    placeholder="Start time"
                    style="width: 290px"
                  >
                  </el-date-picker>
                  <div class="error_tips" v-show="!work.start_time">
                    Please enter start time
                  </div>
                </div>
                <div class="name" style="margin-left: 20px">
                  <p>End time</p>
                  <el-date-picker
                    v-model="work.end_time"
                    value-format="yyyy-MM"
                    type="month"
                    placeholder="End time"
                    style="width: 290px"
                    @change="endTimeItemChange(index)"
                  >
                  </el-date-picker>
                  <div
                    class="date_radio_wrapper"
                    style="margin-top: 10px"
                    @click="handleClickItemPresent(index)"
                  >
                    <img
                      :src="
                        work.now == 1
                          ? '/static/images/not_icon.png'
                          : '/static/images/yes_icon.png'
                      "
                      class="not_icon"
                    />
                    <span>Present</span>
                  </div>
                  <div
                    class="error_tips"
                    v-show="!work.end_time && work.now == 1"
                  >
                    Please enter end time
                  </div>
                </div>
              </div>
              <div class="con_wrapper">
                <div class="name">
                  <p>Company name</p>
                  <el-input
                    v-model="work.company_name"
                    placeholder="Company name"
                  ></el-input>
                  <div class="error_tips" v-show="!work.company_name">
                    Please enter company name
                  </div>
                </div>
                <div class="name" style="margin-left: 20px">
                  <p>Position name</p>
                  <el-input
                    v-model="work.position"
                    placeholder="Position name"
                  ></el-input>
                  <div class="error_tips" v-show="!work.position">
                    Please enter position name
                  </div>
                </div>
              </div>
              <div class="con_wrapper">
                <div class="name">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 5 }"
                    placeholder="Please fill in the job details"
                    v-model="work.work_desc"
                    style="width: 100%"
                  >
                  </el-input>
                  <!-- <div class="error_tips" v-show="!work.work_desc">
                    Please enter fill in the job details
                  </div> -->
                </div>
              </div>
              <div class="btn_wrapper">
                <div class="cancel_btn" @click="work.isShow = !work.isShow">
                  Cancel
                </div>
                <div class="confirm_btn" @click="handleClickAddJobsConfirm">
                  Confirm
                </div>
              </div>
            </div>
            <div class="line"></div>
          </div>
        </div>

        <div class="work_background_wrapper">
          <h2>Education Background</h2>
          <div class="add_wrapper" @click="handleClickAddEducation">
            <img src="../../assets/image/add_icon.png" class="add_icon" />
            <span class="add">Add</span>
          </div>
          <div class="add_work_wrapper" v-show="showAddBackground">
            <h5>Add Education</h5>
            <div class="con_wrapper">
              <div class="name">
                <p>Start time</p>
                <el-date-picker
                  v-model="backgroundStartTime"
                  value-format="yyyy-MM"
                  type="month"
                  placeholder="Start time"
                  style="width: 310px"
                >
                </el-date-picker>
                <div class="error_tips" v-show="showAddEducationStartErr">
                  Please enter start time
                </div>
              </div>
              <div class="name" style="margin-left: 20px">
                <p>End time</p>
                <el-date-picker
                  v-model="backgroundEndTime"
                  value-format="yyyy-MM"
                  type="month"
                  placeholder="End time"
                  style="width: 310px"
                >
                </el-date-picker>
                <div class="error_tips" v-show="showAddEducationEndErr">
                  Please enter end time
                </div>
              </div>
            </div>
            <div class="con_wrapper">
              <div class="name">
                <p>University</p>
                <el-input
                  v-model="universityName"
                  placeholder="University"
                ></el-input>
                <div class="error_tips" v-show="showAddEducationUniversityErr">
                  Please enter University
                </div>
              </div>
              <div class="name" style="margin-left: 20px">
                <p>Major</p>
                <el-input v-model="majorName" placeholder="Major"></el-input>
                <div class="error_tips" v-show="showAddEducationMajorErr">
                  Please enter major
                </div>
              </div>
            </div>
            <div class="btn_wrapper">
              <div
                class="cancel_btn"
                @click="showAddBackground = !showAddBackground"
              >
                Cancel
              </div>
              <div class="confirm_btn" @click="handleClickAdddBackground">
                Confirm
              </div>
            </div>
          </div>
          <div
            class="work_background_inner"
            v-for="(work, index) in education"
            :key="index"
          >
            <div v-if="work.isShow">
              <div class="work_background_title">
                <p>{{ work.school }}</p>
                <span
                  >{{ work.edu_start_time }} -
                  {{ work.now == 2 ? "So Far" : work.edu_end_time }}</span
                >
                <div>
                  <p style="margin-top: 0">Major</p>
                  <span>{{ work.major }}</span>
                </div>
                <div class="right_revise_wrapper clearfix">
                  <div
                    class="delete_wrapper"
                    style="margin-right: 20px"
                    @click="handleClickBackgroundDelete(index)"
                    v-if="education.length > 1"
                  >
                    <img src="../../assets/image/delete.png" />
                    <span>delete</span>
                  </div>
                  <div
                    class="delete_wrapper"
                    @click="handleClickBackgroundRevise(index)"
                  >
                    <img src="../../assets/image/edit_icon.png" />
                    <!-- <span>revise</span> -->
                  </div>
                </div>
              </div>
            </div>

            <div class="add_work_wrapper" v-else>
              <h5>Add Education</h5>
              <div class="con_wrapper">
                <div class="name">
                  <p>Start time</p>
                  <el-date-picker
                    v-model="work.edu_start_time"
                    value-format="yyyy-MM"
                    type="month"
                    placeholder="Start time"
                    style="width: 290px"
                  >
                  </el-date-picker>
                  <div class="error_tips" v-show="!work.edu_start_time">
                    Please enter start time
                  </div>
                </div>
                <div class="name" style="margin-left: 20px">
                  <p>End time</p>
                  <el-date-picker
                    v-model="work.edu_end_time"
                    value-format="yyyy-MM"
                    type="month"
                    placeholder="End time"
                    style="width: 290px"
                    @change="endTimeChange"
                  >
                  </el-date-picker>
                  <div class="error_tips" v-show="!work.edu_end_time">
                    Please enter end time
                  </div>
                </div>
              </div>
              <div class="con_wrapper">
                <div class="name">
                  <p>University</p>
                  <el-input
                    v-model="work.school"
                    placeholder="University"
                  ></el-input>
                  <div class="error_tips" v-show="!work.school">
                    Please enter university
                  </div>
                </div>
                <div class="name" style="margin-left: 20px">
                  <p>Major</p>
                  <el-input v-model="work.major" placeholder="Major"></el-input>
                  <div class="error_tips" v-show="!work.major">
                    Please enter major
                  </div>
                </div>
              </div>
              <div class="btn_wrapper">
                <div class="cancel_btn" @click="work.isShow = !work.isShow">
                  Cancel
                </div>
                <div
                  class="confirm_btn"
                  @click="handleClickAddBackgroundConfirm"
                >
                  Confirm
                </div>
              </div>
            </div>
            <div class="line"></div>
          </div>
        </div>

        <div class="work_background_wrapper">
          <div v-show="showCertificate == true">
            <h2>Qualification certificate</h2>
            <div class="end_edit_wrapper" @click="handleClickQualification">
              <img src="../../assets/image/edit_icon.png" class="edit_icon" />
              <!-- <span>revise</span> -->
            </div>
            <div
              class="degree_wrapper"
              v-if="teacherInfo.university_img_path != null"
            >
              <h5>Degree certificate</h5>
              <img :src="teacherInfo.university_img_path.path" />
            </div>
            <div
              style="margin-top:20px;"
              class="degree_wrapper"
              v-if="certList.length != 0"
            >
              <h5>
                Teaching Certificate:
                <span v-for="(cert, index) in certList" :key="index">
                  {{ cert }},
                </span>
              </h5>
            </div>
          </div>
          <div class="add_work_wrapper" v-show="showCertificate == false">
            <h5>Qualification certificate</h5>
            <div class="con_wrapper">
              <div class="name">
                <p>Degree certificate</p>
                <uploadComponents
                  :type="0"
                  :getImgUrl="childrenImgUrl"
                  @uploadImgId="uploadImgId"
                ></uploadComponents>
              </div>
            </div>
            <div class="con_wrapper">
              <div class="name">
                <p>Teaching Certificate</p>
                <div class="clearfix">
                  <div
                    class="item_certificate fl"
                    v-for="(item, index) in teachingList"
                    :key="index"
                    @click="handleClickChooseItem(item.id)"
                    :class="item.activeClass == true ? 'actived' : ''"
                  >
                    {{ item.value }}
                  </div>
                  <div
                    class="item_certificate fl"
                    @click="handleClickNone"
                    :class="clickNone == true ? 'actived' : ''"
                  >
                    NONE
                  </div>
                </div>
                <div
                  class="tefl_wrapper"
                  v-show="chooseTeachingList.includes(1)"
                >
                  <h6>TEFL</h6>
                  <uploadComponents
                    :type="2"
                    :getNotesName="childrenTeflName"
                    :limit="1"
                    @uploadNotesId="uploadTeflId"
                    @notesName="teflName"
                  ></uploadComponents>
                </div>
                <div
                  class="tefl_wrapper"
                  v-show="chooseTeachingList.includes(2)"
                >
                  <h6>TESOL</h6>
                  <uploadComponents
                    :type="2"
                    :getNotesName="childrenTesolName"
                    :limit="1"
                    @uploadNotesId="uploadTTesolId"
                    @notesName="tesolName"
                  ></uploadComponents>
                </div>
                <div
                  class="tefl_wrapper"
                  v-show="chooseTeachingList.includes(3)"
                >
                  <h6>CELTA</h6>
                  <uploadComponents
                    :type="2"
                    :getNotesName="childrenCeltaName"
                    :limit="1"
                    @uploadNotesId="uploadCeltaId"
                    @notesName="celtaName"
                  ></uploadComponents>
                </div>
                <div
                  class="tefl_wrapper"
                  v-show="chooseTeachingList.includes(4)"
                >
                  <h6>OTHERS</h6>
                  <uploadComponents
                    :type="2"
                    :getNotesName="childrenOtherName"
                    :limit="1"
                    @uploadNotesId="uploadOtherId"
                    @notesName="othersName"
                  ></uploadComponents>
                </div>
              </div>
            </div>
            <div class="btn_wrapper">
              <div class="cancel_btn" @click="handleClickDegreeCancel">
                Cancel
              </div>
              <div class="confirm_btn" @click="handleClickTeachingConfirm">
                Confirm
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="rside_upload_wrapper">
        <div class="upload_top">
          <h3>Attachments</h3>
          <ul class="notes_wrapper">
            <li
              v-for="(notes, index) in allNotes"
              :key="index"
              @click="openNotes(index)"
            >
              <img src="../../assets/image/notes_icon.png" />
              <p>{{ notes.file_name }}</p>
              <img
                src="../../assets/image/right_delete.png"
                @click.stop="deleteNotes(index)"
              />
            </li>
          </ul>
          <el-upload
            action
            :limit="5"
            :show-file-list="false"
            :auto-upload="false"
            :on-change="file => uploadFileChange(file, 2)"
            v-loading="isNotesLoading"
          >
            <el-button class="upload_btn">Upload resume</el-button>
            <div slot="tip" class="el-upload__tip">
              Only PDF/DOCX/DOC，Less than 50M
            </div>
          </el-upload>
        </div>

        <div class="upload_top" style="margin-top: 20px">
          <h3>Self introduction (Video）</h3>
          <el-upload
            action
            :limit="5"
            :show-file-list="false"
            :auto-upload="false"
            :on-change="file => uploadFileChange(file, 1)"
            v-loading="isVideoloading"
          >
            <video
              :src="videosUrl"
              class="upload_video"
              controls="controls"
            ></video>
            <el-button class="upload_btn">Upload Video</el-button>
            <div slot="tip" class="el-upload__tip">
              Only MP4/AVI/3GP/MOV/RMVB/RM/FLV, Less than 50M
            </div>
          </el-upload>
        </div>
      </div>
    </div>
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
        <el-button type="primary" @click="handleClickConfirm"
          >Confirm</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getTeachInfo,
  updateInfo,
  getCityByLetter,
  getCountryList,
  getCity,
  getProvince,
  getInfoByToken
} from "../../apis/baseUrls";
import axios from "../../apis/http";
import { VueCropper } from "vue-cropper";
import uploadComponents from "../../components/uploadComponents/uploadComponents";
export default {
  name: "myResume",
  components: {
    VueCropper,
    uploadComponents
  },
  inject: ["reload"],
  data() {
    return {
      teacherInfo: {},
      showNoMessage: true,
      isloading: false,
      isNotesLoading: false,
      isVideoloading:false,
      showCamera: false,
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
      dialogVisible: false,
      token: "",
      name: "",
      last_name: "",
      sex: "",
      brithday: "",
      nationality: "",
      in_domestic: "",
      visa_type: "",
      visa_exp_date: "",
      country: "",
      china_address: "",
      area_code: "",
      phone: "",
      comm_type: "",
      wechat: "",
      desc: "",
      photos: "",
      university: "",
      university_img: "",
      education: [],
      work_experiences: [],
      edu_cert_flg: "",
      edu_cert_imgs: "",
      edu_auth_flg: "",
      edu_auth_imgs: "",
      celta_flg: "",
      celta_img: "",
      cert_other_flg: "",
      cert_other: "",
      cert_other_img: "",
      working_seniority: "",
      work_flg: "",
      notes: [],
      allNotes: [],
      videos: "",
      videosUrl: "",
      job_type: "",
      job_work_type: "",
      pay_type: "",
      relocate: "",
      all_city: "",
      school_type: [],
      student_age: [],
      showEducation: true,
      childrenNotesName: [],
      allDegreeList: [
        { id: 1, code: "High School Diploma" },
        { id: 2, code: "Associate's Degree" },
        { id: 3, code: "Bachelor's Degree" },
        { id: 4, code: "Master's Degree" },
        { id: 5, code: "MBA" },
        { id: 6, code: "PHD" }
      ],
      roleList: ["Employed", "Unemployed"],
      activeRoleClass: -1,
      showStartError: false,
      showEndError: false,
      showCompanyNameErr: false,
      showPositionError: false,
      showPreviousError: false,
      showAddEducationStartErr: false,
      showAddEducationEndErr: false,
      showAddEducationUniversityErr: false,
      showAddEducationMajorErr: false,
      telOptions: [
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
      mediaList: [
        {
          id: 1,
          value: "Wechat"
        },
        {
          id: 2,
          value: "Skype"
        },
        {
          id: 3,
          value: "WhatsApp"
        },
        {
          id: 4,
          value: "Instagram"
        }
      ],
      showNameErr: false,
      showLastNameErr: false,
      showPhoneErr: false,
      showWechatErr: false,
      showPersonal: true,
      showPersonalErr: false,
      showJobSought: true,
      schoolList: [],
      studentAgeList: [],
      jobWorkTypeList: [
        {
          value: "Any",
          id: 1
        },
        {
          value: "Full-time",
          id: 2
        },
        {
          value: "Part-time",
          id: 3
        }
      ],
      jobTypeList: [
        {
          value: "Offline",
          id: 1
        },
        {
          value: "Online",
          id: 2
        },
        {
          value: "Any",
          id: 3
        }
      ],
      payList: [
        {
          value: "10k-13k",
          id: 1
        },
        {
          value: "13k-16k",
          id: 2
        },
        {
          value: "16k-20k",
          id: 3
        },
        {
          value: "20k-25k",
          id: 4
        },
        {
          value: ">25k",
          id: 5
        }
      ],
      inChinaList: ["YES", "NO"],
      activeInChinaClass: -1,
      showCityMask: false,
      cityNavList: [
        "Hot Cities",
        "ABCD",
        "EFGH",
        "JKLM",
        "NOPQ",
        "RSTU",
        "WXYZ"
      ],
      activeNavClass: 0,
      chooseCitiesList: [],
      cityList: [],
      chooseCityIdList: [],
      cityList: [
        {
          pinyin: "Beijing",
          id: 110100
        },
        {
          pinyin: "Shanghai",
          id: 310100
        },
        {
          pinyin: "Chongqing",
          id: 500100
        },
        {
          pinyin: "Tianjin",
          id: 120100
        },
        {
          pinyin: "Guangzhou",
          id: 440100
        },
        {
          pinyin: "Hangzhou",
          id: 330100
        },
        {
          pinyin: "Chengdu",
          id: 510100
        },
        {
          pinyin: "Shenzhen",
          id: 440300
        },
        {
          pinyin: "Suzhou",
          id: 320500
        },
        {
          pinyin: "Nanjing",
          id: 320100
        },
        {
          pinyin: "Xian",
          id: 610100
        },
        {
          pinyin: "Changsha",
          id: 430100
        },
        {
          pinyin: "Sanya",
          id: 460200
        }
      ],
      defaultCityList: [
        {
          pinyin: "Beijing",
          id: 110100
        },
        {
          pinyin: "Shanghai",
          id: 310100
        },
        {
          pinyin: "Chongqing",
          id: 500100
        },
        {
          pinyin: "Tianjin",
          id: 120100
        },
        {
          pinyin: "Guangzhou",
          id: 440100
        },
        {
          pinyin: "Hangzhou",
          id: 330100
        },
        {
          pinyin: "Chengdu",
          id: 510100
        },
        {
          pinyin: "Shenzhen",
          id: 440300
        },
        {
          pinyin: "Suzhou",
          id: 320500
        },
        {
          pinyin: "Nanjing",
          id: 320100
        },
        {
          pinyin: "Xian",
          id: 610100
        },
        {
          pinyin: "Changsha",
          id: 430100
        },
        {
          pinyin: "Sanya",
          id: 460200
        }
      ],
      hotCityId: "",
      allCitylist: [],
      showNotIcon: false,
      allSchoolList: [
        {
          value: "Training Center",
          id: 1,
          activeClass: false
        },
        {
          value: "International Kindergarten",
          id: 2,
          activeClass: false
        },
        {
          value: "Inernational School",
          id: 3,
          activeClass: false
        },
        {
          value: "Public School",
          id: 4,
          activeClass: false
        },
        {
          value: "Online Class",
          id: 5,
          activeClass: false
        },
        {
          value: "Others",
          id: 6,
          activeClass: false
        }
      ],
      chooseSchoolList: [],
      allAgesList: [
        {
          value: "0-3",
          id: 1,
          activeClass: false
        },
        {
          value: "3-6",
          id: 2,
          activeClass: false
        },
        {
          value: "7-12",
          id: 3,
          activeClass: false
        },
        {
          value: "13-18",
          id: 4,
          activeClass: false
        },
        {
          value: "18+",
          id: 5,
          activeClass: false
        }
      ],
      showCityErr: false,
      showSchoolErr: false,
      showAgesErr: false,
      showBasic: true,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e7;
        }
      },
      activeYouInChinaClass: -1,
      visaList: [
        { id: 1, code: "Z" },
        { id: 2, code: "M" },
        { id: 3, code: "F" },
        { id: 4, code: "X" },
        { id: 5, code: "others" }
      ],
      provincesList: [],
      provincId: "",
      allCitiesList: [],
      showBirthErr: false,
      showVisaErr: false,
      showLocationErr: false,
      allWroksList: [],
      workStartTime: "",
      workEndTime: "",
      companyName: "",
      positionName: "",
      workDesc: "",
      showAddEducation: false,
      present: false,
      nowDate: "",
      showAddBackground: false,
      backgroundStartTime: "",
      backgroundEndTime: "",
      universityName: "",
      majorName: "",
      certList: [],
      showCertificate: true,
      childrenImgUrl: "",
      teachingList: [
        {
          value: "TEFL",
          id: 1,
          activeClass: false
        },
        {
          value: "TESOL",
          id: 2,
          activeClass: false
        },
        {
          value: "CELTA",
          id: 3,
          activeClass: false
        },
        {
          value: "OTHERS",
          id: 4,
          activeClass: false
        }
      ],
      clickNone: false,
      chooseTeachingList: [],
      childrenTeflName: [],
      childrenTesolName: [],
      childrenCeltaName: [],
      childrenOtherName: [],
      userInfoStatus: ""
    };
  },
  created() {
    this.$emit("passParentNum", 0);
    this.token = localStorage.getItem("token");
    if (this.token) {
      this.getAllCity();
      this.getCountry();
      this.getProvinces();
      this.getUserInfoByToken();
    }
  },
  computed: {},
  methods: {
    // 获取用户信息
    async getUserInfoByToken() {
      let res = await getInfoByToken({
        token: this.token
      });
      if (res.data.code == 200) {
        this.userInfoStatus = res.data.data.status;
        if (this.userInfoStatus == 1 || this.userInfoStatus == 3) {
          this.$router.push("/toExaminePage");
        } else {
          this.getUserInfo();
        }
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 获取国籍
    async getCountry() {
      let res = await getCountryList();
      if (res.data.code == 200) {
        this.countryList = res.data.data;
      } else {
        this.$message({
          message: res.data.msg,
          type: "warning"
        });
      }
    },
    // 获取省份接口
    async getProvinces() {
      let res = await getProvince();
      if (res.data.code == 200) {
        this.provincesList = res.data.data;
      } else {
        this.$message({
          message: res.data.msg,
          type: "warning"
        });
      }
    },
    // 省份改变
    async provincChange() {
      let res = await getCity({
        id: this.provincId
      });
      if (res.data.code == 200) {
        this.allCitiesList = res.data.data;
      } else {
        this.$message({
          message: res.data.msg,
          type: "warning"
        });
      }
    },
    // 获取信息
    async getUserInfo() {
      let res = await getTeachInfo({ token: this.token });
      if (res.data.code == 200) {
        this.teacherInfo = res.data.data;
        this.showNoMessage = false;

        this.name = res.data.data.name;
        this.last_name = res.data.data.last_name;
        this.sex = res.data.data.sex;
        this.brithday = res.data.data.brithday;
        this.nationality = res.data.data.nationality;
        this.in_domestic = res.data.data.in_domestic;
        if (res.data.data.in_domestic == 0) {
          this.activeYouInChinaClass = 1;
        } else {
          this.activeYouInChinaClass = 0;
        }
        this.visa_type = res.data.data.visa_type;
        this.visa_exp_date = res.data.data.visa_exp_date;
        if (res.data.data.country != 0) {
          this.country = res.data.data.country;
        }
        if (res.data.data.china_address_city_data != null) {
          this.provincId =
            res.data.data.china_address_city_data.province_data.id;
          this.china_address = res.data.data.china_address;
          this.provincChange();
        }

        this.area_code = res.data.data.area_code;
        this.phone = res.data.data.phone;
        this.comm_type = res.data.data.comm_type;
        this.wechat = res.data.data.wechat;
        this.desc = res.data.data.desc;
        this.photos = res.data.data.photos;
        this.university = res.data.data.university;
        this.university_img = res.data.data.university_img;
        if (res.data.data.university_img_path != null) {
          this.university_img = res.data.data.university_img;
          this.childrenImgUrl = res.data.data.university_img_path.path;
        }
        this.education = res.data.data.education.map(item => {
          return {
            ...item,
            isShow: true
          };
        });
        this.work_experiences = res.data.data.work.map(item => {
          return {
            ...item,
            isShow: true
          };
        });
        this.edu_cert_flg = res.data.data.edu_cert_flg;
        this.edu_cert_imgs = res.data.data.edu_cert_imgs;
        if (res.data.data.edu_cert_imgs_path != null) {
          this.childrenTeflName.push(res.data.data.edu_cert_imgs_path);
        }
        this.edu_auth_flg = res.data.data.edu_auth_flg;
        this.edu_auth_imgs = res.data.data.edu_auth_imgs;
        if (res.data.data.edu_auth_imgs_path != null) {
          this.childrenTesolName.push(res.data.data.edu_auth_imgs_path);
        }
        this.celta_flg = res.data.data.celta_flg;
        this.celta_img = res.data.data.celta_img;
        if (res.data.data.celta_img_path != null) {
          this.childrenCeltaName.push(res.data.data.celta_img_path);
        }
        this.cert_other_flg = res.data.data.cert_other_flg;
        this.cert_other = res.data.data.cert_other;
        this.cert_other_img = res.data.data.cert_other_img;
        if (res.data.data.cert_other_img_path != null) {
          this.childrenOtherName.push(res.data.data.cert_other_img_path);
        }
        this.working_seniority = res.data.data.working_seniority;
        if (res.data.data.edu_cert_flg == 1) {
          this.certList.push("TEFL");
          this.teachingList[0].activeClass = true;
          this.chooseTeachingList.push(1);
        }
        if (res.data.data.edu_auth_flg == 1) {
          this.certList.push("TESOL");
          this.teachingList[1].activeClass = true;
          this.chooseTeachingList.push(2);
        }
        if (res.data.data.celta_flg == 2) {
          this.certList.push("CELTA");
          this.teachingList[2].activeClass = true;
          this.chooseTeachingList.push(3);
        }
        if (res.data.data.cert_other_flg == 2) {
          this.certList.push("OTHERS");
          this.teachingList[3].activeClass = true;
          this.chooseTeachingList.push(4);
        }
        if (this.chooseTeachingList == 0) {
          this.clickNone = true;
        }
        this.work_flg = res.data.data.work_flg;
        if (res.data.data.work_flg == 1) {
          this.activeRoleClass = 1;
        } else {
          this.activeRoleClass = 0;
        }
        if (res.data.data.notes_path != null) {
          this.notes = res.data.data.notes.split(",").map(Number);
          this.allNotes = res.data.data.notes_path;
        }
        if (res.data.data.videos_path != null) {
          this.videos = res.data.data.videos;
          this.videosUrl = res.data.data.videos_path.path;
        }

        this.job_type = res.data.data.job_type;
        this.job_work_type = res.data.data.job_work_type;
        this.pay_type = res.data.data.pay_type;
        this.relocate = res.data.data.relocate;
        if (res.data.data.relocate == 1) {
          this.activeInChinaClass = 1;
        } else {
          this.activeInChinaClass = 0;
        }

        if (res.data.data.working_city_datas != null) {
          this.chooseCitiesList = res.data.data.working_city
            .split(",")
            .map(Number);
          this.chooseCityIdList = res.data.data.working_city_datas.map(
            ele => ele.city_data.pinyin
          );
        }
        this.all_city = res.data.data.all_city;
        if (this.all_city == 1) {
          this.showNotIcon = false;
        } else {
          this.showNotIcon = true;
        }
        this.school_type = res.data.data.school_type.split(",").map(Number);
        if (res.data.data.school_type != null) {
          if (this.school_type.includes(1)) {
            this.schoolList.push("Training Center");
          }
          if (this.school_type.includes(2)) {
            this.schoolList.push("International Kindergarten");
          }
          if (this.school_type.includes(3)) {
            this.schoolList.push("Inernational School");
          }
          if (this.school_type.includes(4)) {
            this.schoolList.push("Public School");
          }
          if (this.school_type.includes(5)) {
            this.schoolList.push("Online Class");
          }
          if (this.school_type.includes(6)) {
            this.schoolList.push("Others");
          }
        }
        this.student_age = res.data.data.student_age.split(",").map(Number);
        if (res.data.data.student_age != null) {
          if (this.student_age.includes(1)) {
            this.studentAgeList.push("0-3");
          }
          if (this.student_age.includes(2)) {
            this.studentAgeList.push("3-6");
          }
          if (this.student_age.includes(3)) {
            this.studentAgeList.push("7-12");
          }
          if (this.student_age.includes(4)) {
            this.studentAgeList.push("13-18");
          }
          if (this.student_age.includes(5)) {
            this.studentAgeList.push("18+");
          }
        }
      }
    },
    // 裁剪图片
    handleClickConfirm() {
      var that = this;
      this.$refs.cropper.getCropBlob(data => {
        const instance = axios.create();
        let uploadFile = new FormData();
        uploadFile.append("file", data, "a.png");
        uploadFile.append("type", 0);
        instance.post("/api/index/upload", uploadFile).then(res => {
          if (res.data.code == 200) {
            that.dialogVisible = false;
            that.photos = res.data.data.id;
            this.editSubmit();
          }
        });
      });
    },
    // 是否在职
    handleClickRoleItem(index) {
      this.activeRoleClass = index;
      this.work_flg = index;
    },
    // Education information编辑
    handleClickFirstConfirm() {
      if (this.name && this.last_name && this.phone && this.wechat) {
        this.showEducation = !this.showEducation;
        this.editSubmit();
      } else {
        if (!this.name) {
          this.showNameErr = true;
        }
        if (!this.last_name) {
          this.showLastNameErr = true;
        }
        if (!this.phone) {
          this.showPhoneErr = true;
        }
        if (!this.wechat) {
          this.showWechatErr = true;
        }
      }
    },
    // 想去中国切换
    handleClickInChinaItem(index) {
      this.activeInChinaClass = index;
      if (index == 0) {
        this.relocate = 2;
      } else {
        this.relocate = 1;
      }
    },
    // 获取所有的城市
    async getAllCity() {
      let res = await axios.get("/api/index/getCityByChar");
      if (res.data.code == 200) {
        this.allCitylist = res.data.data;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 选择城市
    async getCityItem(index) {
      this.activeNavClass = index;
      if (index == 0) {
        this.hotCityId = "";
        this.cityList = this.defaultCityList;
      } else {
        if (index == 1) {
          this.hotCityId = "A,B,C,D";
        }
        if (index == 2) {
          this.hotCityId = "E,F,G,H";
        }
        if (index == 3) {
          this.hotCityId = "J,K,L,M";
        }
        if (index == 4) {
          this.hotCityId = "N,O,P,Q";
        }
        if (index == 5) {
          this.hotCityId = "R,S,T,U";
        }
        if (index == 6) {
          this.hotCityId = "W,X,Y,Z";
        }
        let res = await getCityByLetter(this.hotCityId);
        if (res.data.code == 200) {
          this.cityList = res.data.data;
        }
      }
    },
    // 选择城市发生改变
    cityChange() {
      this.chooseCityIdList = [];
      this.allCitylist.forEach(ele => {
        let sameId = this.chooseCitiesList.find(item => item == ele.id);
        if (sameId) {
          return this.chooseCityIdList.push(ele.pinyin);
        }
      });
      this.all_city = 1;
      this.showNotIcon = false;
    },
    // 选择城市确认按钮
    handleClickCityConfirm() {
      this.showCityMask = !this.showCityMask;
    },
    // 点击all city
    handleClickInChinaRadio() {
      this.showNotIcon = !this.showNotIcon;
      if (this.showNotIcon == true) {
        this.all_city = 2;
      } else {
        this.all_city = 1;
      }
      this.chooseCityIdList = [];
      this.chooseCitiesList = [];
    },
    // Personal编辑
    handleClickPersonalConfirm() {
      if (!this.desc) {
        this.showPersonalErr = true;
      } else {
        this.showPersonal = !this.showPersonal;
        this.editSubmit();
      }
    },
    // job编辑
    handleClickJobConfirm() {
      if (
        (this.chooseCitiesList.length != 0 || this.all_city == 2) &&
        this.school_type.length != 0 &&
        this.student_age.length != 0
      ) {
        this.showJobSought = !this.showJobSought;
        this.editSubmit();
      } else {
        if (this.chooseCitiesList.length == 0 && this.all_city == 1) {
          this.showCityErr = true;
        }
        if (this.school_type.length == 0) {
          this.showSchoolErr = true;
        }
        if (this.student_age.length == 0) {
          this.showAgesErr = true;
        }
      }
    },
    // are you in china切换
    handleClickYouInChinaItem(index) {
      this.activeYouInChinaClass = index;
      this.country = "";
      this.provincId = "";
      this.china_address = "";
      this.visa_type = "";
      this.visa_exp_date = "";
      if (index == 0) {
        this.in_domestic = 1;
      } else {
        this.in_domestic = 0;
      }
    },
    // basic 编辑
    handleClickBasicConfirm() {
      if (this.in_domestic == 1 && (!this.visa_type || !this.visa_exp_date)) {
        this.showVisaErr = true;
        return;
      }
      if (this.in_domestic == 1 && !this.china_address) {
        this.showLocationErr = true;
        return;
      }
      if (this.brithday) {
        this.showBasic = !this.showBasic;
        this.editSubmit();
      }
    },
    // 添加工作背景
    handleClickAddWorks() {
      if (this.work_experiences.length >= 5) {
        this.$message({
          message: "Maximum 5 lines",
          type: "warning"
        });
      } else {
        this.showAddEducation = !this.showAddEducation;
      }
    },
    // 添加教育经历
    handleClickAddEducation() {
      if (this.education.length >= 5) {
        this.$message({
          message: "Maximum 5 lines",
          type: "warning"
        });
      } else {
        this.showAddBackground = !this.showAddBackground;
      }
    },
    // 点击至今
    handleClickPresent() {
      this.present = !this.present;
      if (this.present == false) {
        this.nowDate = 1;
      } else {
        this.nowDate = 2;
      }
      this.workEndTime = "";
    },
    // 编辑每一项的至今
    handleClickItemPresent(index) {
      if (this.work_experiences[index].now == 1) {
        this.work_experiences[index].now = 2;
      } else {
        this.work_experiences[index].now = 1;
      }
      this.work_experiences[index].end_time = "";
    },
    // 工作结束时间发生改变
    endTimeChange() {
      this.present = !this.present;
      this.nowDate = 1;
    },
    // 编辑每一项结束时间发生改变
    endTimeItemChange(index) {
      this.work_experiences[index].now = 1;
    },
    // 添加工作背景提交按钮
    handleClickAddWorkConfirm() {
      if (
        this.workStartTime &&
        this.workEndTime &&
        this.companyName &&
        this.positionName 
      //  && (this.workDesc || this.nowDate == 2)
      ) {
        this.work_experiences.push({
          start_time: this.workStartTime,
          end_time: this.workEndTime,
          company_name: this.companyName,
          position: this.positionName,
          work_desc: this.workDesc,
          now: this.nowDate
        });
        this.showAddEducation = !this.showAddEducation;
        this.editSubmit();
      } else {
        if (!this.workStartTime) {
          this.showStartError = true;
        }
        if (!this.workEndTime) {
          this.showEndError = true;
        }
        if (!this.companyName) {
          this.showCompanyNameErr = true;
        }
        if (!this.positionName) {
          this.showPositionError = true;
        }
        // if (!this.workDesc) {
        //   this.showPreviousError = true;
        // }
        if (this.nowDate == 1 && !this.workEndTime) {
          this.showEndError = true;
        }
      }
    },
    // 编辑工作背景提交按钮
    handleClickAddJobsConfirm() {
      this.editSubmit();
    },
    // 删除工作背景
    handleClickWorkDelete(index) {
      this.work_experiences.splice(index, 1);
      this.editSubmit();
    },
    // 点击工作Revise
    handleClickRevise(index) {
      this.work_experiences[index].isShow = false;
    },
    // 添加教育背景
    handleClickAdddBackground() {
      if (
        this.backgroundStartTime &&
        this.backgroundEndTime &&
        this.universityName &&
        this.majorName
      ) {
        this.education.push({
          edu_start_time: this.backgroundStartTime,
          edu_end_time: this.backgroundEndTime,
          school: this.universityName,
          major: this.majorName
        });
        this.editSubmit();
      } else {
        if (!this.backgroundStartTime) {
          this.showAddEducationStartErr = true;
        }
        if (!this.backgroundEndTime) {
          this.showAddEducationEndErr = true;
        }
        if (!this.universityName) {
          this.showAddEducationUniversityErr = true;
        }
        if (!this.majorName) {
          this.showAddEducationMajorErr = true;
        }
      }
    },
    // 点击教育经历Revise
    handleClickBackgroundRevise(index) {
      this.education[index].isShow = false;
    },
    // 编辑教育经历
    handleClickAddBackgroundConfirm() {
      this.editSubmit();
    },
    // 删除教育经历
    handleClickBackgroundDelete(index) {
      this.education.splice(index, 1);
      this.editSubmit();
    },
    // 删除简历
    deleteNotes(index) {
      this.notes.splice(index, 1);
      this.editSubmit();
    },
    // 查看简历
    openNotes(index) {
      window.open(this.allNotes[index].path, "_blank");
    },
    // 上传文件或者视频
    uploadFileChange(file, type) {
      var that = this;
      if (type == 0) {
        // 图片
        const isTypeTrue = /^image\/(jpeg|png|jpg)$/.test(file.raw.type);
        const isLt5M = file.size / 1024 / 1024 < 8;
        if (!isTypeTrue) {
          that.$message.error("Only jpg/png/jpeg");
          return;
        }
        if (!isLt5M) {
          that.$message.error("less than 8M!");
          return;
        }
        // 上传成功后将图片地址赋值给裁剪框显示图片
        this.$nextTick(() => {
          that.option.img = file.url;
          that.dialogVisible = true;
        });
      }
      // 视频
      if (type == 1) {
        const isLt5M = file.size / 1024 / 1024 < 50;
        const fileSuffix = file.name.substring(file.name.lastIndexOf(".") + 1);
        const whiteList = ["mp4", "avi", "3gp", "mov", "rmvb", "rm", "flv"];
        if (whiteList.indexOf(fileSuffix) === -1) {
          that.$message.error("Only MP4/AVI/3GP/MOV/RMVB/RM/FLV");
          return;
        }
        if (!isLt5M) {
          that.$message.error("less than 50M!");
          return;
        }
        that.isVideoloading = true;
        const instance = axios.create();
        let uploadFile = new FormData();
        uploadFile.append("file", file.raw);
        uploadFile.append("type", 1);
        instance.post("/api/index/upload", uploadFile).then(res => {
          if (res.data.code == 200) {
            that.isVideoloading = false;
            that.videos = res.data.data.id;
            that.videosUrl = res.data.data.path;
            that.editSubmit();
          }
        });
      }
      if (type == 2) {
        // 文档
        if (this.notes.length == 5) {
          that.$message.error("Maximum 5 lines");
          return;
        }
        const isLt5M = file.size / 1024 / 1024 < 50;
        const fileSuffix = file.name.substring(file.name.lastIndexOf(".") + 1);
        const whiteList = ["pdf", "doc", "docx"];
        if (whiteList.indexOf(fileSuffix) === -1) {
          that.$message.error("Only pdf/docx/doc");
          return;
        }
        if (!isLt5M) {
          that.$message.error("less than 50M!");
          return;
        }
        that.isNotesLoading = true;
        const instance = axios.create();
        let uploadFile = new FormData();
        uploadFile.append("file", file.raw);
        uploadFile.append("type", 2);
        instance.post("/api/index/upload", uploadFile).then(res => {
          if (res.data.code == 200) {
            that.isNotesLoading = false;
            that.notes.push(res.data.data.id);
            that.allNotes.push(res.data.data);
            that.editSubmit();
          }
        });
      }
    },
    // 接收图片id
    uploadImgId(id) {
      this.university_img = id;
    },
    // 接收TEFL id
    uploadTeflId(id) {
      this.edu_cert_imgs = id;
    },
    teflName(file) {
      this.edu_cert_imgs = "";
    },
    // 接收tesol id
    uploadTTesolId(id) {
      this.edu_auth_imgs = id;
    },
    tesolName(file) {
      this.edu_auth_imgs = "";
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
    // 点击学历编辑
    handleClickQualification() {
      this.showCertificate = false;
    },
    // 点击证书取消
    handleClickDegreeCancel() {
      this.showCertificate = !this.showCertificate;
    },
    // 点击修改证书确认按钮
    handleClickTeachingConfirm() {
      this.editSubmit();
    },
    // 选择教学证书
    handleClickChooseItem(id) {
      this.clickNone = false;
      if (!this.chooseTeachingList.includes(id)) {
        this.chooseTeachingList.push(id);
        this.teachingList.find(ele => {
          if (ele.id == id) {
            ele.activeClass = true;
          }
        });
      } else {
        this.chooseTeachingList = this.chooseTeachingList.filter(
          cell => cell !== id
        );
        this.teachingList.find(ele => {
          if (ele.id == id) {
            ele.activeClass = false;
          }
        });
      }
    },
    // 点击none
    handleClickNone() {
      this.clickNone = !this.clickNone;
      this.chooseTeachingList = [];
      this.teachingList.map(ele => (ele.activeClass = false));
    },
    // 修改编辑信息
    async editSubmit() {
      if (this.chooseTeachingList.includes(1)) {
        this.edu_cert_flg = 1;
      } else {
        this.edu_cert_flg = 0;
      }
      if (this.chooseTeachingList.includes(2)) {
        this.edu_auth_flg = 1;
      } else {
        this.edu_auth_flg = 0;
      }
      if (this.chooseTeachingList.includes(3)) {
        this.celta_flg = 2;
      } else {
        this.celta_flg = 1;
      }
      if (this.chooseTeachingList.includes(4)) {
        this.cert_other_flg = 2;
      } else {
        this.cert_other_flg = 1;
      }
      let res = await updateInfo({
        token: this.token,
        name: this.name,
        last_name: this.last_name,
        sex: this.sex,
        brithday: this.brithday,
        nationality: this.nationality,
        in_domestic: this.in_domestic,
        visa_type: this.visa_type,
        visa_exp_date: this.visa_exp_date,
        country: this.country,
        china_address: this.china_address,
        area_code: this.area_code,
        phone: this.phone,
        comm_type: this.comm_type,
        wechat: this.wechat,
        desc: this.desc,
        photos: this.photos,
        university: this.university,
        university_img: this.university_img,
        education: JSON.stringify(this.education),
        work_experiences: JSON.stringify(this.work_experiences),
        edu_cert_flg: this.edu_cert_flg,
        edu_cert_imgs: this.edu_cert_imgs,
        edu_auth_flg: this.edu_auth_flg,
        edu_auth_imgs: this.edu_auth_imgs,
        celta_flg: this.celta_flg,
        celta_img: this.celta_img,
        cert_other_flg: this.cert_other_flg,
        cert_other: this.cert_other,
        cert_other_img: this.cert_other_img,
        working_seniority: this.working_seniority,
        work_flg: this.work_flg,
        notes: this.notes.toString(),
        videos: this.videos,
        job_type: this.job_type,
        job_work_type: this.job_work_type,
        pay_type: this.pay_type,
        relocate: this.relocate,
        working_city: this.chooseCitiesList.toString(),
        all_city: this.all_city,
        school_type: this.school_type.toString(),
        student_age: this.student_age.toString()
      });
      if (res.data.code == 200) {
        this.reload();
      } else {
        this.$message.error(res.data.msg);
      }
    }
  }
};
</script>
<style scoped>
.my_wrapper {
  width: 100%;
}
.my_wrapper .lside_con_wrapper {
  margin-bottom: 40px;
  padding-bottom: 20px;
  width: 680px;
  background: #ffffff;
  border-radius: 10px;
  box-sizing: border-box;
}
.my_wrapper .education {
  position: relative;
  padding-top: 40px;
  margin: 0 auto;
  width: 640px;
  border-bottom: 1px solid #dddddd;
  box-sizing: border-box;
}
.lside_top_wrapper .img_wrapper {
  position: relative;
  margin-right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  cursor: pointer;
}
.lside_top_wrapper .lside_img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid #ccc;
  box-sizing: border-box;
}
.img_wrapper .camera_wrapper {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.4);
}
.camera_wrapper .camera_icon {
  width: 20px;
  height: 20px;
}
/* 截图 */
.cropper-content .cropper {
  width: auto;
  height: 300px;
}
/deep/ .lside_top_wrapper .el-upload--picture-card {
  width: 60px;
  height: 60px;
  border: none;
  background: none;
}
.lside_userinfo .user_name {
  margin-bottom: 20px;
  font-size: 24px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.lside_userinfo .sex_icon {
  display: inline-block;
  width: 20px;
  height: 20px;
}
.work_wrapper li,
.phone_wrapper li {
  float: left;
  height: 20px;
  line-height: 20px;
}
.work_wrapper li:nth-child(1) {
  width: 172px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.work_wrapper li:nth-child(2) {
  display: flex;
  justify-content: center;
  margin-right: 20px;
  width: 191px;
  border-left: 1px solid #eeeeee;
  border-right: 1px solid #eeeeee;
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.work_wrapper li img,
.phone_wrapper li img {
  display: inline-block;
  margin-right: 8px;
  width: 20px;
  height: 20px;
  vertical-align: top;
}
.work_wrapper li span,
.phone_wrapper li span {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
}
.phone_wrapper li:nth-child(1) {
  width: 131px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.phone_wrapper li:nth-child(2) {
  display: flex;
  justify-content: center;
  margin-right: 20px;
  width: 219px;
  border-left: 1px solid #eeeeee;
  border-right: 1px solid #eeeeee;
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.phone_wrapper li:nth-child(3) {
  width: 189px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.right_edit_wrapper {
  position: absolute;
  top: 40px;
  right: 0;
  display: flex;
  height: 20px;
  line-height: 20px;
  cursor: pointer;
}
.right_edit_wrapper .edit_icon,
.end_edit_wrapper .edit_icon {
  margin-right: 10px;
  width: 20px;
  height: 20px;
}
.right_edit_wrapper span,
.end_edit_wrapper span {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #078ca9;
}
.end_edit_wrapper {
  position: absolute;
  top: 0;
  right: 20px;
  display: flex;
  height: 20px;
  line-height: 20px;
  cursor: pointer;
}
.edit_education {
  padding: 30px 20px 40px 20px;
  width: 680px;
  background: #f2f2f2;
  border-radius: 10px 10px 0px 0px;
  box-sizing: border-box;
}
.edit_education h5 {
  margin-bottom: 20px;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.edit_education .con_wrapper,
.add_work_wrapper .con_wrapper {
  position: relative;
  display: flex;
  margin-bottom: 20px;
}
.con_wrapper .name {
  flex: 1;
}
.con_wrapper .name p,
.edit_personal_wrapper p {
  margin-bottom: 10px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
}
/deep/ .el-input__inner:focus {
  border-color: #333;
  outline: 0;
}
/deep/ .el-textarea__inner:focus {
  border-color: #333;
  outline: 0;
}
/deep/ .el-input__inner {
  font-size: 14px;
  font-weight: 500;
  color: #333333;
  border: 1px solid #cccccc;
}
.status_wrapper {
  width: 100%;
}
.status_wrapper .item_certificate {
  margin-right: 10px;
  width: 150px;
  height: 40px;
  background: #f8f8f8;
  border-radius: 4px;
  border: 1px solid #cccccc;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #cccccc;
  line-height: 40px;
  text-align: center;
  box-sizing: border-box;
}
.status_wrapper .item_certificate:nth-child(2) {
  margin-right: 0;
}
.status_wrapper .item_certificate.actived {
  color: #078ca9;
  background: rgba(7, 140, 169, 0.1);
  border: 1px solid #078ca9;
}
.btn_wrapper {
  display: flex;
  margin-top: 40px;
  padding-left: 440px;
}
.btn_wrapper .cancel_btn {
  margin-right: 20px;
  width: 100px;
  height: 40px;
  background: #ffffff;
  border-radius: 4px;
  border: 1px solid #dddddd;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  line-height: 40px;
  text-align: center;
  box-sizing: border-box;
  cursor: pointer;
}
.btn_wrapper .confirm_btn {
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
.error_tips {
  margin: 10px 0 0 0;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ff6010;
}
.personal_introduction_wrapper,
.job_sought_wrapper {
  margin-top: 40px;
  width: 100%;
}
.personal_wrapper,
.sought_wrapper {
  position: relative;
  margin: 0 auto;
  padding-bottom: 40px;
  width: 640px;
  border-bottom: 1px solid #dddddd;
}
.personal_wrapper h5,
.sought_wrapper h5 {
  margin-bottom: 20px;
  font-size: 18px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
}
.personal_wrapper .right_edit_wrapper,
.sought_wrapper .right_edit_wrapper {
  position: absolute;
  top: 0;
}
.edit_personal_wrapper {
  padding: 30px 20px 40px 20px;
  width: 680px;
  background: #f2f2f2;
  box-sizing: border-box;
}
.sought_wrapper .job_con_item {
  margin-bottom: 20px;
}
.sought_wrapper .job_con_item .item_lside_con {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
}
.sought_wrapper .job_con_item .item_rside_con {
  display: inline-block;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
}
.hot_city_wrapper {
  position: absolute;
  top: 74px;
  left: 0;
  padding: 20px 20px 0 20px;
  width: 480px;
  background: #ffffff;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  border: 1px solid #dddddd;
  z-index: 99;
  box-sizing: border-box;
}
.hot_city_wrapper .city_title {
  margin-bottom: 20px;
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.hot_city_wrapper .city_nav_wrapper {
  margin-bottom: 20px;
  width: 438px;
  height: 32px;
  border-bottom: 1px solid #078ca9;
}
.hot_city_wrapper .city_nav_item {
  float: left;
  margin-right: 4px;
  padding: 0 10px;
  min-width: 54px;
  height: 32px;
  background: #f2f2f2;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  line-height: 32px;
  text-align: center;
  box-sizing: border-box;
}
.hot_city_wrapper .city_nav_item:nth-last-child() {
  margin-right: 0px;
}
.hot_city_wrapper .city_nav_item.active_nav {
  font-size: 12px;
  font-weight: 500;
  color: #ffffff;
  background: #078ca9;
}
.city_item_wrapper {
  display: flex;
  align-content: flex-start;
  flex-flow: row wrap;
  width: 100%;
  height: 180px;
  border-bottom: 1px solid #dddddd;
  overflow-y: scroll;
}
/deep/ .city_item_wrapper .el-checkbox-button__inner {
  padding: 0;
  width: 78px;
  height: 32px;
  background: #f8f8f8;
  border: 1px solid #cccccc;
  box-sizing: border-box;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  line-height: 30px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/deep/.city_item_wrapper .el-checkbox-button {
  margin-bottom: 10px;
  margin-right: 8px;
  width: 78px;
  height: 32px;
}
.choose_city_wrapper {
  display: flex;
  align-items: center;
  height: 70px;
  border-bottom: 1px solid #dddddd;
}
.choose_city_wrapper .lside-title {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
}
.choose_city_wrapper .choose_city_item {
  margin-left: 18px;
  width: 80px;
  height: 32px;
  background: rgba(7, 140, 169, 0.1);
  border: 1px solid #078ca9;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #078ca9;
  line-height: 32px;
  text-align: center;
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.city_btn_wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80px;
}
.city_btn_wrapper .lside_btn {
  width: 80px;
  height: 40px;
  background: #f2f2f2;
  border-radius: 4px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
}
.city_btn_wrapper .rside_btn {
  margin-left: 20px;
  width: 80px;
  height: 40px;
  background: #078ca9;
  border-radius: 4px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
}
.china_div {
  padding: 0 15px;
  width: 100%;
  height: 40px;
  background: #f8f8f8;
  border-radius: 4px;
  border: 1px solid #cccccc;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #cccccc;
  line-height: 40px;
  cursor: pointer;
  box-sizing: border-box;
}
.china_div.select_cities {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #cccccc;
}
.china_div.active_cities {
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.radio_wrapper {
  cursor: pointer;
}
.date_radio_wrapper .not_icon {
  display: inline-block;
  width: 16px;
  height: 16px;
}
.date_radio_wrapper span {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  vertical-align: top;
}
/deep/.school_item_wrapper .el-checkbox-button {
  margin-bottom: 10px;
  margin-right: 20px;
}
/deep/ .school_item_wrapper .el-checkbox-button__inner {
  padding: 0;
  width: 180px;
  height: 32px;
  background: #f8f8f8;
  border: 1px solid #cccccc;
  box-sizing: border-box;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  line-height: 30px;
}
.work_background_wrapper {
  position: relative;
}
.work_background_inner .work_background_title {
  position: relative;
}
.work_background_inner .work_background_title p {
  display: inline-block;
  margin: 20px;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.work_background_inner .work_background_title span {
  font-size: 12px;
  font-family: PingFangSC-Light, PingFang SC;
  font-weight: 300;
  color: #999999;
}
.work_background_inner .position_name {
  margin-left: 20px;
  margin-bottom: 10px;
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.work_background_inner .position_content {
  margin: 0 20px 40px 20px;
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #666;
  line-height: 22px;
}
.work_background_inner .position_content .content {
  color: #333;
}
.work_background_inner:hover {
  background: #f2f2f2;
}
.work_background_wrapper h2 {
  margin-top: 40px;
  margin-left: 20px;
  margin-bottom: 20px;
  font-size: 18px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
}
.work_background_wrapper .add_wrapper {
  position: absolute;
  top: 0;
  right: 20px;
  display: flex;
  line-height: 20px;
  cursor: pointer;
}
.work_background_wrapper .add_icon {
  margin-right: 5px;
  width: 20px;
  height: 20px;
}
/deep/ .work_background_wrapper .el-textarea.is-disabled .el-textarea__inner {
  background: #fff;
  color: #666666;
}
.add_work_wrapper {
  padding: 30px 20px 40px 20px;
  background: #f2f2f2;
  border-radius: 10px 10px 0px 0px;
}
.add_work_wrapper h5 {
  margin-bottom: 20px;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.right_revise_wrapper {
  position: absolute;
  top: 20px;
  right: 20px;
  display: none;
}
.right_revise_wrapper .delete_wrapper {
  float: left;
  cursor: pointer;
}
.right_revise_wrapper .delete_wrapper img {
  margin-right: 7px;
  display: inline-block;
  width: 16px;
  height: 16px;
  vertical-align: middle;
}
.right_revise_wrapper .delete_wrapper span {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #078ca9;
}
.work_background_inner:hover .right_revise_wrapper {
  display: block;
}
.radio_wrapper .not_icon {
  display: inline-block;
  width: 16px;
  height: 16px;
}
.radio_wrapper span {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  vertical-align: top;
}
.line {
  margin: 0 auto 20px auto;
  width: 640px;
  height: 1px;
  background: #dddddd;
}
.rside_upload_wrapper .upload_top {
  margin-left: 20px;
  padding: 20px;
  width: 280px;
  min-height: 258px;
  background: #ffffff;
  border-radius: 10px;
  box-sizing: border-box;
}
.rside_upload_wrapper .upload_top h3 {
  margin-bottom: 20px;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.upload_top .notes_wrapper li {
  display: flex;
  padding: 0 20px;
  align-items: center;
  margin-bottom: 10px;
  width: 240px;
  height: 40px;
  background: #f8f8f8;
  border-radius: 10px;
  box-sizing: border-box;
  cursor: pointer;
}
.notes_wrapper li img {
  width: 20px;
  height: 20px;
}
.notes_wrapper li p {
  margin: 0 10px;
  width: 140px;
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 20px;
}
.upload_top .upload_btn {
  margin: 10px auto;
  width: 240px;
  height: 40px;
  background: #078ca9;
  border-radius: 10px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  text-align: center;
}
.upload_top .upload_video {
  width: 240px;
  height: 180px;
  background: #f5f5f5;
  border-radius: 10px;
}
.degree_wrapper h5 {
  margin-bottom: 20px;
  margin-left: 20px;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.degree_wrapper img {
  margin-left: 20px;
  width: 261px;
  height: 196px;
  border-radius: 10px;
  border: 1px solid #ddd;
}
.degree_wrapper span {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
}
.degree_img {
  margin-left: 20px;
  width: 180px;
  height: 180px;
  border-radius: 10px;
}
.item_certificate {
  margin-right: 20px;
  margin-bottom: 20px;
  width: 130px;
  height: 40px;
  background: #f8f8f8;
  border-radius: 4px;
  border: 1px solid #cccccc;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #cccccc;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
  box-sizing: border-box;
}
.item_certificate.actived {
  color: #078ca9;
  background: rgba(7, 140, 169, 0.1);
  border: 1px solid #078ca9;
}
.tefl_wrapper {
  position: relative;
  margin-bottom: 20px;
}
.tefl_wrapper h6 {
  margin-bottom: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
}
.no_message_wrapper {
  width: 980px;
  height: 980px;
  background: #f3fafb;
  border-radius: 10px;
}
</style>
