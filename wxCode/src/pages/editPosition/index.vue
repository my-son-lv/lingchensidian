// 编辑职位
<template>
  <div class="indexContatiner">
    <div class="content">
      <!-- <scroll-view
        :scroll-into-view="toView"
        scroll-y="true"
        scroll-with-animation="true"
        :style="{ height: scrollHeight + 'px' } "
        style="margin-bottom: 140px !important;"
      >-->
      <h6 class="tips_tit">招聘需求</h6>
      <p class="tips_con">将根据您的招聘需求，为您精准推荐更合适的外教</p>
      <div class="establish_wrapper">
        <h5 class="tit">
          职位名称
          <span class="xing">*</span>
          <span class="title_tips">请输入英文名称</span>
        </h5>
        <input
          type="text"
          placeholder="Please enter the job title"
          v-model="positionName"
          class="position_name"
          @input="inputChange"
        />
      </div>
      <div class="establish_wrapper">
        <h5 class="tit">
          工作地点
          <span class="xing">*</span>
        </h5>
        <div
          class="type_content"
          @click="handleClickShowWorkCity"
          :style="!splicingValue ? 'color:#999999;'  : '' "
        >
          {{splicingValue == '' ? 'Please enter work location' : splicingValue}}
          <img
            class="down_icon"
            src="/static/images/down_icon.png"
            alt
          />
        </div>
      </div>
      <div class="establish_wrapper">
        <h5 class="tit">
          工作类型
          <span class="xing">*</span>
        </h5>
        <div class="type_content" @click="handleClickShowType">
          {{typeValue == '' ? typeColumns[0] : typeValue}}
          <img
            class="down_icon"
            src="/static/images/down_icon.png"
            alt
          />
        </div>
      </div>
      <div class="establish_wrapper">
        <h5 class="tit">
          工作性质
          <span class="xing">*</span>
        </h5>
        <div class="type_content" @click="handleClickShowWorkType">
          {{workTypeValue == '' ? workTypeColumns[0] : workTypeValue}}
          <img
            class="down_icon"
            src="/static/images/down_icon.png"
            alt
          />
        </div>
      </div>
      <div class="establish_wrapper">
        <h5 class="tit">学生年龄</h5>
        <div class="benefits_tag">
          <div
            :class="allAgeColumns[0].flg ? 'benefits_tag_item_active' : ''"
            @click="age_tag_click(0)"
            class="benefits_tag_item"
          >{{allAgeColumns[0].value}}</div>
          <div
            :class="allAgeColumns[1].flg ? 'benefits_tag_item_active' : ''"
            @click="age_tag_click(1)"
            class="benefits_tag_item"
          >{{allAgeColumns[1].value}}</div>
          <div
            :class="allAgeColumns[2].flg ? 'benefits_tag_item_active' : ''"
            @click="age_tag_click(2)"
            class="benefits_tag_item"
          >{{allAgeColumns[2].value}}</div>
        </div>
        <div class="benefits_tag">
          <div
            :class="allAgeColumns[3].flg ? 'benefits_tag_item_active' : ''"
            @click="age_tag_click(3)"
            class="benefits_tag_item"
          >{{allAgeColumns[3].value}}</div>
          <div
            :class="allAgeColumns[4].flg ? 'benefits_tag_item_active' : ''"
            @click="age_tag_click(4)"
            class="benefits_tag_item"
          >{{allAgeColumns[4].value}}</div>
        </div>
      </div>
      <div class="establish_wrapper clearfix">
        <h5 class="tit">
          工作时长（每周）
        </h5>
        <div class="money">
          <input
            type="text"
            placeholder="eg. 35"
            v-model="durationValue"
            class="position_name money1"
            maxlength="9"
            @input="inputDuration1Change"
          />
          <div class="money_line">-</div>
          <input
            type="text"
            placeholder="eg. 40"
            v-model="endDurationValue"
            maxlength="9"
            class="position_name money1"
            @input="inputDuration2Change"
          />
        </div>
      </div>
      <div class="establish_wrapper clearfix">
        <h5 class="tit">
          教学时长（每周）
          <span class="xing">*</span>
        </h5>
        <div class="money">
          <input
            type="text"
            placeholder="eg.20"
            v-model="teaching_time1"
            class="position_name money1"
            maxlength="9"
            @input="inputTeachTime1Change"
          />
          <div class="money_line">-</div>
          <input
            type="text"
            placeholder="eg.25"
            v-model="teaching_time2"
            maxlength="9"
            class="position_name money1"
            @input="inputTeachTime2Change"
          />
        </div>
      </div>
      <div class="establish_wrapper clearfix">
        <h5 class="tit">
          薪资(￥)
          <span class="xing">*</span>
        </h5>
        <div class="money">
          <input
            type="text"
            placeholder="￥eg. 1000"
            v-model="money1"
            class="position_name money1"
            maxlength="9"
            @input="inputMoney1Change"
          />
          <div class="money_line">-</div>
          <input
            type="text"
            placeholder="￥eg. 2000"
            v-model="money2"
            maxlength="9"
            class="position_name money1"
            @input="inputMoney2Change"
          />
          <div class="money_unit money1 position_name" @click="handleClickShowPayUnit">
            {{payUnitValue}}
            <img class="down_icon" src="/static/images/down_icon.png" alt />
          </div>
        </div>
      </div>
      <div class="establish_wrapper">
        <h5 class="tit">招聘人数</h5>
        <input type="text" placeholder="请输入招聘人数" v-model="peopleNum" class="position_name" />
        <span class="right_con">人</span>
      </div>

      <div class="establish_wrapper">
        <h5 class="tit">计划上岗时间</h5>
        <div class="date_wrapper">
          <div
            class="date_content"
            @click="handleClickShowStartDate"
            :style="!startDateValue ? 'color:#999999;'  : '' "
          >
            {{startDateValue == '' ? '选择时间' : startDateValue}}
            <img
              class="down_icon"
              v-if="startDateValue == ''"
              src="/static/images/down_icon.png"
              alt
            />
            <img
              class="down_icon"
              v-else
              src="/static/images/close_icon_first.png"
              @click.stop="closStartDateValue"
            />
          </div>
          <!-- <div class="oblique_line">
            <img src="/static/images/line.png" class="obl_line" />
          </div>-->
          <!-- <div
            class="date_content"
            @click="handleClickShowEndDate"
            :style="!endDateValue ? 'color:#999999;'  : '' "
          >
            {{endDateValue == '' ? '结束时间' : endDateValue}}
            <img
              class="down_icon"
              v-if="endDateValue == ''"
              src="/static/images/down_icon.png"
              alt
            />
            <img
              class="down_icon"
              v-else
              src="/static/images/close_icon_first.png"
              @click.stop="closEndDateValue"
            />
          </div>-->
        </div>
      </div>
      <div class="establish_wrapper">
        <h5 class="tit">福利标签（可多选）</h5>
        <div class="benefits_tag">
          <div
            :class="benefits_tag[0].flg ? 'benefits_tag_item_active' : ''"
            @click="benefits_tag_click(0)"
            class="benefits_tag_item"
          >Annual Bonus</div>
          <div
            :class="benefits_tag[1].flg ? 'benefits_tag_item_active' : ''"
            @click="benefits_tag_click(1)"
            class="benefits_tag_item"
          >Insurance</div>
          <div
            :class="benefits_tag[2].flg ? 'benefits_tag_item_active' : ''"
            @click="benefits_tag_click(2)"
            class="benefits_tag_item"
          >Apartment</div>
        </div>
        <div class="benefits_tag">
          <div
            :class="benefits_tag[3].flg ? 'benefits_tag_item_active' : ''"
            @click="benefits_tag_click(3)"
            class="benefits_tag_item"
          >House Allowance</div>
          <div
            :class="benefits_tag[4].flg ? 'benefits_tag_item_active' : ''"
            @click="benefits_tag_click(4)"
            class="benefits_tag_item"
          >Flight Allowance</div>
          <div
            :class="benefits_tag[5].flg ? 'benefits_tag_item_active' : ''"
            @click="benefits_tag_click(5)"
            class="benefits_tag_item"
          >Paid Leave</div>
        </div>
      </div>
      <div class="establish_wrapper">
        <h5 class="tit">福利</h5>
        <textarea
          placeholder="请输入更多福利，如没有请填写 None"
          v-model="welfareValue"
          maxlength="100000"
          class="welfare"
          :style="welfareValue ? 'color:#333333;'  : '' "
          @input="welfareChange"
        />
      </div>
      <div class="establish_wrapper">
        <h5 class="tit">
          工作职责描述
          <span class="xing">*</span>
          <span class="title_tips">请输入英文</span>
        </h5>
        <textarea
          placeholder="Please enter a brief job description"
          v-model="workIntroduce"
          class="welfare"
          maxlength="100000"
          :style="workIntroduce ? 'color:#333333;'  : '' "
          @input="textareaChange"
        />
      </div>
      <div class="establish_wrapper">
        <h5 class="tit">
          国籍要求
          <span class="xing">*</span>
        </h5>
        <div class="type_content" @click="handleClickShowNationality">
          {{nationalityValue == '' ? nationalityColumns[0] : nationalityValue}}
          <img
            class="down_icon"
            src="/static/images/down_icon.png"
            alt
          />
        </div>
      </div>
      <div class="establish_wrapper">
        <h5 class="tit">肤色要求</h5>
        <div
          class="type_content"
          @click="handleClickShowSecondColour"
          :style="!secondColourValue ? 'color:#999999;'  : '' "
        >
          {{secondColourValue == '' ? '请选择肤色' : secondColourValue}}
          <img
            class="down_icon"
            v-if="secondColourValue == ''"
            src="/static/images/down_icon.png"
            alt
          />
          <img
            class="down_icon"
            v-else
            src="/static/images/close_icon_first.png"
            @click.stop="closeSecondColourValue"
          />
        </div>
      </div>

      <div class="establish_wrapper">
        <h5 class="tit">
          性别
          <span class="xing">*</span>
        </h5>
        <div class="type_content" @click="handleClickShowSex">
          {{sexValue == '' ? sexColumns[0] : sexValue}}
          <img
            class="down_icon"
            src="/static/images/down_icon.png"
            alt
          />
        </div>
      </div>

      <div class="establish_wrapper">
        <h5 class="tit">
          学历要求
          <span class="xing">*</span>
        </h5>
        <div class="type_content" @click="handleClickShowEducation">
          {{educationValue == '' ? educationColumns[0] : educationValue}}
          <img
            class="down_icon"
            src="/static/images/down_icon.png"
            alt
          />
        </div>
      </div>
      <div class="establish_wrapper">
        <h5 class="tit">教学资质证书</h5>
        <div
          class="type_content"
          @click="handleClickShowCertificate"
          :style="!certificateValue ? 'color:#999999;'  : '' "
        >
          {{certificateValue == '' ? '选择教学资质证书' : certificateValue}}
          <img
            class="down_icon"
            v-if="certificateValue == ''"
            src="/static/images/down_icon.png"
            alt
          />
          <img
            class="down_icon"
            v-else
            src="/static/images/close_icon_first.png"
            @click.stop="closCertificateValue"
          />
        </div>
      </div>
      <div class="establish_wrapper">
        <h5 class="tit">
          教学经验
          <span class="xing">*</span>
        </h5>
        <div class="type_content" @click="handleClickShowExperience">
          {{experienceValue == '' ? experienceColumns[0] : experienceValue}}
          <img
            class="down_icon"
            src="/static/images/down_icon.png"
            alt
          />
        </div>
      </div>

      <div class="establish_wrapper">
        <h5 class="tit">
          签证要求
          <span class="xing">*</span>
        </h5>
        <div class="type_content" @click="handleClickShowColour">
          {{colourValue == '' ? colourColumns[0] : colourValue}}
          <img
            class="down_icon"
            src="/static/images/down_icon.png"
            alt
          />
        </div>
      </div>
      <div class="bottom_btn">
        <div class="submit_btn" @click="handleClickSubmit">保存</div>
      </div>
      <!-- </scroll-view> -->
    </div>
    <!-- 单位 -->
    <van-popup :show="showPayUnitPicker" overlay position="bottom">
      <van-picker
        title="薪资单位"
        show-toolbar
        :default-index="payUnit"
        :columns="payUnitColumns"
        @confirm="onPayUnitConfirm"
        @cancel="hidePayUnitPicker"
      />
    </van-popup>
    <!-- 性别 -->
    <van-popup :show="showSexPicker" overlay position="bottom">
      <van-picker
        title="选择性别"
        show-toolbar
        :columns="sexColumns"
        @confirm="onSexConfirm"
        @cancel="hideSexPicker"
      />
    </van-popup>
    <!-- 工作类型 -->
    <van-popup :show="showTypePicker" overlay position="bottom">
      <van-picker
        :visible-item-count="5"
        title="选择工作类型"
        show-toolbar
        :columns="typeColumns"
        @confirm="onTypeConfirm"
        @cancel="hideTypePicker"
      />
    </van-popup>
    <!-- 工作性质 -->
    <van-popup :show="showWorkType" overlay position="bottom">
      <van-picker
        :visible-item-count="5"
        title="选择工作性质"
        show-toolbar
        :columns="workTypeColumns"
        @confirm="onWorkTypeConfirm"
        @cancel="hideWorkTypePicker"
      />
    </van-popup>
    <!-- 国籍 -->
    <van-popup :show="showNationalityPicker" overlay position="bottom">
      <van-picker
        :visible-item-count="5"
        title="选择国籍要求"
        show-toolbar
        :columns="nationalityColumns"
        @confirm="onNationalityConfirm"
        @cancel="hideNationalityPicker"
      />
    </van-popup>
    <!-- 肤色 -->
    <van-popup :show="showColourPicker" overlay position="bottom">
      <van-picker
        :visible-item-count="5"
        title="选择签证要求"
        show-toolbar
        :columns="colourColumns"
        @confirm="onColourConfirm"
        @cancel="hideColourPicker"
      />
    </van-popup>
    <!-- 学历要求 -->
    <van-popup :show="showEducationPicker" overlay position="bottom">
      <van-picker
        title="选择学历"
        show-toolbar
        :columns="educationColumns"
        @confirm="onEducationConfirm"
        @cancel="hideEducationPicker"
      />
    </van-popup>
    <!-- 教学经验 -->
    <van-popup :show="showExperiencePicker" overlay position="bottom">
      <van-picker
        title="选择教学经验"
        show-toolbar
        :columns="experienceColumns"
        @confirm="onExperienceConfirm"
        @cancel="hideExperiencePicker"
      />
    </van-popup>
    <!-- 肤色 -->
    <van-popup :show="showSecondColourPicker" overlay position="bottom">
      <van-picker
        :visible-item-count="5"
        title="选择肤色要求"
        show-toolbar
        :columns="secondColourColumns"
        @confirm="onSecondColourConfirm"
        @cancel="hideSecondColourPicker"
      />
    </van-popup>
    <!-- 学生年龄 -->
    <van-popup :show="showAgePicker" overlay position="bottom">
      <van-picker
        :visible-item-count="5"
        title="选择学生年龄"
        show-toolbar
        :columns="ageColumns"
        @confirm="onAgeConfirm"
        @cancel="hideAgePicker"
      />
    </van-popup>
    <!-- 教学资质证书 -->
    <van-popup :show="showCertificatePicker" overlay position="bottom">
      <van-picker
        :visible-item-count="5"
        title="选择教学资质证书"
        show-toolbar
        :columns="certificateColumns"
        @confirm="onCertificateConfirm"
        @cancel="hideCertificatePicker"
      />
    </van-popup>
    <!-- 开始时间 -->
    <van-popup :show="showStartDatePicker" overlay position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="year-month"
        title="选择开始日期"
        :min-date="minDate"
        @confirm="onStartDateConfirm"
        @cancel="hideStartDatePicker"
      />
    </van-popup>
    <!-- 结束时间 -->
    <van-popup :show="showEndDatePicker" overlay position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="year-month"
        title="选择结束日期"
        :min-date="minDate"
        @confirm="onEndDateConfirm"
        @cancel="hideEndDatePicker"
      />
    </van-popup>
    <!-- 每天工作时长-->
    <van-popup :show="showDurationPicker" overlay position="bottom">
      <van-picker
        title="选择工作时长"
        show-toolbar
        :columns="durationColumns"
        @confirm="onDurationConfirm"
        @cancel="hideDurationPicker"
      />
    </van-popup>
    <van-popup :show="showEndDurationPicker" overlay position="bottom">
      <van-picker
        title="选择工作时长"
        show-toolbar
        :columns="durationEndColumns"
        @confirm="onEndDurationConfirm"
        @cancel="hideEndDurationPicker"
      />
    </van-popup>
    <!-- 省市区 -->
    <van-popup :show="showProvincePicker" overlay position="bottom">
      <van-picker
        title="选择省份"
        show-toolbar
        :columns="provinceColumns"
        @confirm="onProvinceConfirm"
        @cancel="hideProvincePicker"
      />
    </van-popup>
    <van-popup :show="showCityPicker" overlay position="bottom">
      <van-picker
        title="选择城市"
        show-toolbar
        :columns="cityColumns"
        @confirm="onCityConfirm"
        @cancel="hideCityPicker"
      />
    </van-popup>
    <van-popup :show="showCountyPicker" overlay position="bottom">
      <van-picker
        title="选择区县"
        show-toolbar
        :columns="countyColumns"
        @confirm="onCountyConfirm"
        @cancel="hideCountyPicker"
      />
    </van-popup>
    <!-- 弹窗 -->
    <van-notify id="van-notify" class="van-notify" />
    <van-popup
      :show="showPopup"
      round
      position="bottom"
      custom-style="height: 25%; box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);"
    >
      <h6 class="popup_title">完善需求信息</h6>
      <p class="popup_con">完善需求有助于为您更精准的推荐哦</p>
      <div class="popup_btn clearfix">
        <div class="lside_btn fl" @click.stop="handleClickNotPerfect">暂不完善</div>
        <div class="rside_btn fl" @click.stop="handleClickPerfect" data-opt="jump1">去完善</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import moment from "moment";
import Notify from "@/../static/vant/notify/notify";
export default {
  data() {
    return {
      durationColumns: [],
      durationEndColumns: [],
      provinceColumns: [],
      countyColumns: [],
      cityColumns: [],
      showPopup: false,
      positionName: "",
      showTypePicker: false,
      showWorkType: false,
      toView: "",
      scrollHeight: 0,
      typeColumns: ["Any", "Offline", "Online"],
      allTypeList: [
        {
          value: "Any",
          id: 1,
        },
        {
          value: "Offline",
          id: 2,
        },
        {
          value: "Online",
          id: 3,
        },
      ],
      typeId: 1,
      typeValue: "",
      nationalityColumns: [
        "Any",
        "Native English Countries",
        "Non-native English Countries",
      ],
      allNationality: [
        {
          value: "Any",
          id: 0,
        },
        {
          value: "Native English Countries",
          id: 1,
        },
        {
          value: "Non-native English Countries",
          id: 2,
        },
      ],
      showNationalityPicker: false,
      nationalityValue: "",
      first_language: 0,
      showColourPicker: false,
      colourColumns: ["Z visa", "Any"],
      allColour: [
        {
          value: "Z visa",
          id: 1,
        },
        {
          value: "Any",
          id: 2,
        },
      ],
      colourValue: "",
      colourId: 1,
      sexValue: "",
      showSexPicker: false,
      sexColumns: ["Any", "Male", "Female"],
      allSex: [
        {
          value: "Any",
          id: 0,
        },
        {
          value: "Male",
          id: 1,
        },
        {
          value: "Female",
          id: 2,
        },
      ],
      sex: 0,
      showPayPicker: false,
      payNumStartValue: "",
      payNumStartColumns: [],
      showPayNumStartPicker: false,
      payNumEndValue: "",
      payNumEndColumns: [],
      showPayNumEndPicker: false,
      educationValue: "",
      showEducationPicker: false,
      educationColumns: [
        "Bachelor and above",
        "Master and above",
        "PHD and above",
        "Any",
      ],
      allEducation: [
        {
          value: "Bachelor and above",
          id: 1,
        },
        {
          value: "Master and above",
          id: 2,
        },
        {
          value: "PHD and above",
          id: 3,
        },
        {
          value: "Any",
          id: 4,
        },
      ],
      edu_type: "",
      experienceValue: "",
      showExperiencePicker: false,
      allCountyArr: [],
      countyColumns: [],
      provinceValue: "",
      cityId: 100000,
      allProvinceArr: [],
      cityColumns: [],
      allCityArr: [],
      showCityPicker: false,
      cityValue: "",
      showProvincePicker: false,
      showCountyPicker: false,
      countyValue: "",
      splicingValue: "",
      showAdress: false,
      experienceColumns: [
        "Less than 1 year",
        "1-3years",
        "3-5years",
        "5-10years",
        "More than 10 years",
      ],
      allExperience: [
        {
          value: "Less than 1 year",
          id: 1,
        },
        {
          value: "1-3years",
          id: 2,
        },
        {
          value: "3-5years",
          id: 3,
        },
        {
          value: "5-10years",
          id: 4,
        },
        {
          value: "More than 10 years",
          id: 5,
        },
      ],
      job_year: 1,
      workIntroduce: "",
      payList: [],
      durationEndColumns: [],
      workTypeColumns: ["Any", "Full-time", "Part-time"],
      allWorkTypeColumns: [
        {
          value: "Any",
          id: 1,
        },
        {
          value: "Full-time",
          id: 2,
        },
        {
          value: "Part-time",
          id: 3,
        },
      ],
      workTypeValue: "",
      workTypeId: 1,
      showSecondColourPicker: false,
      secondColourValue: "",
      secondColourColumns: ["Any", "White"],
      allsecondColourColumns: [
        {
          value: "Any",
          id: 0,
        },
        {
          value: "White",
          id: 1,
        },
      ],
      secondColourId: "",
      ageValue: "",
      ageColumns: [
        "0-3years old",
        "3-6years old",
        "7-12years old",
        "13-18years old",
        "18+years old",
      ],
      allAgeColumns: [
        {
          id: 1,
          value: "0-3years old",
          flg: false,
        },
        {
          id: 2,
          value: "3-6years old",
          flg: false,
        },
        {
          id: 3,
          value: "7-12years old",
          flg: false,
        },
        {
          id: 4,
          value: "13-18years old",
          flg: false,
        },
        {
          id: 5,
          value: "18+years old",
          flg: false,
        },
      ],
      benefits_tag_str: "",
      benefits_tag: [
        {
          flg: 0,
          id: 1,
        },
        {
          flg: 0,
          id: 2,
        },
        {
          flg: 0,
          id: 3,
        },
        {
          flg: 0,
          id: 4,
        },
        {
          flg: 0,
          id: 5,
        },
        {
          flg: 0,
          id: 6,
        },
      ],
      money1: "",
      money2: "",
      payUnitColumns: [
        "Per Hour",
        "Per Day",
        "Per Week",
        "Per Month",
        "Per Year",
      ],
      allPayUnit: [
        {
          value: "Per Hour",
          id: 1,
        },
        {
          value: "Per Day",
          id: 2,
        },
        {
          value: "Per Week",
          id: 3,
        },
        {
          value: "Per Month",
          id: 4,
        },
        {
          value: "Per Year",
          id: 5,
        },
      ],
      payUnitValue: "Per Month",
      payUnit: 3,
      showPayUnitPicker: false,
      showAgePicker: false,
      ageId: "",
      certificateValue: "",
      showCertificatePicker: false,
      certificateColumns: ["Required", "Not required"],
      allCertificateColumns: [
        { value: "Required", id: 1 },
        { value: "Not required", id: 2 },
      ],
      certificateId: "",
      peopleNum: "",
      startDateValue: "",
      endDateValue: "",
      showStartDatePicker: false,
      minDate: new Date().getTime(),
      currentDate: new Date().getTime(),
      showEndDatePicker: false,
      welfareValue: "",
      remarksValue: "",
      editId: "",
      durationValue: "",
      endDurationValue: "",
      showDurationPicker: false,
      showEndDurationPicker: false,
      job_day_time: "",
      teaching_time1: "",
      teaching_time2: "",
    };
  },

  components: {},

  methods: {
    age_tag_click(index) {
      let that = this;
      this.allAgeColumns[index].flg = !this.allAgeColumns[index].flg;
      that.ageId = "";
      this.allAgeColumns.forEach(function (v, k) {
        if (v.flg) {
          that.ageId += v.id + ",";
        }
      });
      that.ageId = that.ageId
        ? that.ageId.substring(0, that.ageId.length - 1)
        : "";
    },
    inputTeachTime1Change() {
      let flag = new RegExp("^[1-9]([0-9])*$").test(this.teaching_time1);
      if (!flag) {
        Notify({ type: "warning", message: "教学时长请输入数值" });
        this.teaching_time1 = "";
      }
    },
    inputTeachTime2Change() {
      let flag = new RegExp("^[1-9]([0-9])*$").test(this.teaching_time2);
      if (!flag) {
        Notify({ type: "warning", message: "教学时长请输入数值" });
        this.teaching_time2 = "";
      }
    },
    inputDuration1Change() {
      let flag = new RegExp("^[1-9]([0-9])*$").test(this.durationValue);
      if (!flag) {
        Notify({ type: "warning", message: "请输入数值" });
        this.durationValue = "";
      }
    },
    inputDuration2Change() {
      let flag = new RegExp("^[1-9]([0-9])*$").test(this.endDurationValue);
      if (!flag) {
        Notify({ type: "warning", message: "请输入数值" });
        this.endDurationValue = "";
      }
    },
    inputMoney1Change() {
      let flag = new RegExp("^[1-9]([0-9])*$").test(this.money1);
      if (!flag) {
        Notify({ type: "warning", message: "金额请输入数值" });
        this.money1 = "";
      }
    },
    inputMoney2Change() {
      let flag = new RegExp("^[1-9]([0-9])*$").test(this.money2);
      if (!flag) {
        Notify({ type: "warning", message: "金额请输入数值" });
        this.money2 = "";
      }
    },
    //金额单位
    handleClickShowPayUnit() {
      this.showPayUnitPicker = true;
    },
    hidePayUnitPicker() {
      this.showPayUnitPicker = false;
    },
    onPayUnitConfirm(event) {
      let idx = event.mp.detail.index;
      this.payUnitValue = event.mp.detail.value;
      this.payUnit = this.allPayUnit[idx].id;
      this.showPayUnitPicker = false;
    },
    benefits_tag_click(type) {
      let that = this;
      if (this.benefits_tag[type].flg) {
        this.benefits_tag[type].flg = 0;
      } else {
        this.benefits_tag[type].flg = 1;
      }
      that.benefits_tag_str = "";
      this.benefits_tag.forEach(function (v, k) {
        if (v.flg === 1) {
          that.benefits_tag_str += v.id + ",";
        }
      });
      that.benefits_tag_str = that.benefits_tag_str
        ? that.benefits_tag_str.substring(0, that.benefits_tag_str.length - 1)
        : "";
    },
    // 输入框限制
    inputChange(e) {
      let value = (e.mp.detail.value || "").trim();
      if (value) {
        const reg = /[\u4e00-\u9fa5]/g;
        if (reg.test(value)) {
          this.positionName = value.replace(reg, "");
        }
      }
    },
    textareaChange(e) {
      let value = (e.mp.detail.value || "").trim();
      if (value) {
        const reg = /[\u4e00-\u9fa5]/g;
        if (reg.test(value)) {
          this.workIntroduce = value.replace(reg, "");
        }
      }
    },
    welfareChange(e) {
      let value = (e.mp.detail.value || "").trim();
      if (value) {
        const reg = /[\u4e00-\u9fa5]/g;
        if (reg.test(value)) {
          this.welfareValue = value.replace(reg, "");
        }
      }
    },
    // 编辑数据
    async getDesc() {
      let TOKEN = wx.getStorageSync("token");
      const res = await this.$httpWX.post({
        url: "/api/company/job/desc",
        data: {
          id: this.editId,
          token: TOKEN,
        },
      });
      if (res.code == 200) {
        this.payUnitValue = this.allPayUnit[
          parseInt(res.data.pay_unit) - 1
        ].value;
        this.payUnit = parseInt(res.data.pay_unit);
        this.teaching_time1 = res.data.teaching_time
          ? res.data.teaching_time.split(",")[0]
          : "";
        this.teaching_time2 = res.data.teaching_time
          ? res.data.teaching_time.split(",")[1]
          : "";
        this.money1 = res.data.pay.split(",")[0];
        this.money2 = res.data.pay.split(",")[1];
        for (let i = 1; i <= 40; i++) {
          this.durationColumns.push(i);
          this.durationEndColumns.push(i);
        }
        if (!res.data.job_day_time) {
          this.job_day_time = "";
        } else {
          this.durationValue = res.data.job_day_time.split(",")[0] ;
          this.endDurationValue = res.data.job_day_time.split(",")[1];
          this.job_day_time = res.data.job_day_time;
        }
        if (res.data.job_province_data.pinyin) {
          this.splicingValue =
            res.data.job_province_data.pinyin +
            "/" +
            res.data.job_city_data.pinyin +
            "/" +
            res.data.job_area_data.pinyin;
        }
        //福利标签赋值
        let _this = this;
        if (res.data.benefits_tag) {
          let tags = res.data.benefits_tag.split(",");
          tags.forEach(function (v) {
            _this.benefits_tag[parseInt(v) - 1].flg = 1;
          });
        }
        if (res.data.student_age) {
          let age_tags = res.data.student_age.split(",");
          age_tags.forEach(function (v) {
            _this.allAgeColumns[parseInt(v) - 1].flg = true;
          });
        }
        this.cityId = res.data.job_city;
        this.positionName = res.data.name;
        this.sexValue = this.sexColumns[res.data.sex];
        this.sex = res.data.sex;
        this.typeValue = this.typeColumns[parseInt(res.data.type) - 1];
        this.typeId = parseInt(res.data.type);
        this.workTypeValue = this.workTypeColumns[res.data.work_type - 1];
        this.workTypeId = res.data.work_type;
        this.nationalityValue = this.nationalityColumns[
          res.data.first_language
        ];
        this.first_language = res.data.first_language;
        this.colourValue = this.colourColumns[res.data.visa_ask - 1];
        this.colourId = res.data.visa_ask;
        this.educationValue = this.educationColumns[res.data.edu_type - 1];
        this.edu_type = res.data.edu_type;
        this.experienceValue = this.experienceColumns[res.data.job_year - 1];
        this.job_year = res.data.job_year;
        this.workIntroduce = res.data.job_info;
        if (res.data.colour) {
          this.secondColourValue = this.secondColourColumns[
            parseInt(res.data.colour) - 1
          ];
          this.secondColourId = res.data.colour;
        }
        if (res.data.student_age) {
          this.ageValue = this.ageColumns[res.data.student_age - 1];
          this.ageId = res.data.student_age;
        }
        if (res.data.cert) {
          this.certificateValue = this.certificateColumns[res.data.cert - 1];
          this.certificateId = res.data.cert;
        }
        if (res.data.num > 0) {
          this.peopleNum = res.data.num;
        }
        if (res.data.start_time) {
          this.startDateValue = res.data.start_time;
        }
        // if (res.data.end_time) {
        //   this.endDateValue = res.data.end_time;
        // }
        if (res.data.benefits) {
          this.welfareValue = res.data.benefits;
        }
        if (this.remarksValue) {
          this.remarksValue = res.data.memo;
        }
      }
    },
    closeSecondColourValue() {
      this.secondColourValue = "";
    },
    closeSplicingValue() {
      this.splicingValue = "";
    },
    closeAgeValue() {
      this.ageValue = "";
    },
    closeDurationValue() {
      this.durationValue = "";
    },
    closEendDurationValue() {
      this.endDurationValue = "";
    },
    closCertificateValue() {
      this.certificateValue = "";
    },
    closStartDateValue() {
      this.startDateValue = "";
    },
    closEndDateValue() {
      this.endDateValue = "";
    },
    // 获取薪资范围
    // getPay() {
    //   for (let index = 1; index <= 250; index++) {
    //     this.payNumStartColumns.push(index + "K");
    //   }
    // },
    // 获取省市区
    async getArea() {
      const res = await this.$httpWX.post({
        url: "/api/company/getCity",
        data: {
          id: this.cityId,
        },
      });
      if (res.code == 200) {
        this.provinceColumns = res.data.map((item) => item.pinyin);
        this.allProvinceArr = res.data;
      }
    },
    // 性别
    handleClickShowSex() {
      this.showSexPicker = true;
    },
    onSexConfirm(event) {
      let idx = event.mp.detail.index;
      this.sexValue = event.mp.detail.value;
      this.sex = this.allSex[idx].id;
      this.showSexPicker = false;
    },
    hideSexPicker() {
      this.showSexPicker = false;
    },
    // 工作类型
    handleClickShowType() {
      this.showTypePicker = true;
    },
    onTypeConfirm(event) {
      let idx = event.mp.detail.index;
      this.typeValue = event.mp.detail.value;
      this.typeId = this.allTypeList[idx].id;
      this.showTypePicker = false;
    },
    hideTypePicker() {
      this.showTypePicker = false;
    },
    // 工作性质
    handleClickShowWorkType() {
      this.showWorkType = true;
    },
    onWorkTypeConfirm(event) {
      let idx = event.mp.detail.index;
      this.workTypeValue = event.mp.detail.value;
      this.workTypeId = this.allWorkTypeColumns[idx].id;
      this.showWorkType = false;
    },
    hideWorkTypePicker() {
      this.showWorkType = false;
    },
    // 国籍
    handleClickShowNationality() {
      this.showNationalityPicker = true;
    },
    onNationalityConfirm(event) {
      let idx = event.mp.detail.index;
      this.nationalityValue = event.mp.detail.value;
      this.first_language = this.allNationality[idx].id;
      this.showNationalityPicker = false;
    },
    hideNationalityPicker() {
      this.showNationalityPicker = false;
    },
    // 签证要求
    handleClickShowColour() {
      this.showColourPicker = true;
    },
    onColourConfirm(event) {
      let idx = event.mp.detail.index;
      this.colourValue = event.mp.detail.value;
      this.colourId = this.allColour[idx].id;
      this.showColourPicker = false;
    },
    hideColourPicker() {
      this.showColourPicker = false;
    },

    // 学历要求
    handleClickShowEducation() {
      this.showEducationPicker = true;
    },
    onEducationConfirm(event) {
      let idx = event.mp.detail.index;
      this.educationValue = event.mp.detail.value;
      this.edu_type = this.allEducation[idx].id;
      this.showEducationPicker = false;
    },
    hideEducationPicker() {
      this.showEducationPicker = false;
    },
    // 工作时长
    handleClickShowDuration() {
      this.showDurationPicker = true;
    },
    onDurationConfirm(event) {
      this.durationValue = event.mp.detail.value + "H";
      this.showDurationPicker = false;
    },
    hideDurationPicker() {
      this.showDurationPicker = false;
    },
    handleClickShowEndDuration() {
      this.showEndDurationPicker = true;
    },
    onEndDurationConfirm(event) {
      // let idx = event.mp.detail.index;
      // this.endDurationValue = event.mp.detail.value + "H";
      // if (
      //   parseInt(this.endDurationValue.slice(0, 1)) <
      //   parseInt(this.durationValue.slice(0, 1))
      // ) {
      //   Notify({ type: "warning", message: "请选择正确时长范围" });
      // } else {
      //   this.job_day_time =
      //     this.durationValue.slice(0, this.durationValue.length - 1) +
      //     "," +
      //     this.endDurationValue.slice(0, this.endDurationValue.length - 1);
      //   this.showEndDurationPicker = false;
      // }
    },
    hideEndDurationPicker() {
      this.showEndDurationPicker = false;
    },
    // 工作地点
    handleClickShowWorkCity() {
      this.showProvincePicker = true;
    },
    // 省份确认按钮
    async onProvinceConfirm(event) {
      const idx = event.mp.detail.index;
      this.provinceValue = event.mp.detail.value;
      this.cityId = this.allProvinceArr[idx].id;
      const res = await this.$httpWX.post({
        url: "/api/company/getCity",
        data: {
          id: this.cityId,
        },
      });
      if (res.code == 200) {
        this.cityColumns = res.data.map((item) => item.pinyin);
        this.allCityArr = res.data;
      }
      this.showProvincePicker = false;
      this.showCityPicker = true;
    },
    // 省份取消按钮
    hideProvincePicker() {
      this.showProvincePicker = false;
    },
    // 选择城市确认按钮
    async onCityConfirm(event) {
      const idx = event.mp.detail.index;
      this.cityId = this.allCityArr[idx].id;
      this.cityValue = event.mp.detail.value;
      const res = await this.$httpWX.post({
        url: "/api/company/getCity",
        data: {
          id: this.cityId,
        },
      });
      if (res.code == 200) {
        this.countyColumns = res.data.map((item) => item.pinyin);
        this.allCountyArr = res.data;
      }
      this.showCityPicker = false;
      this.showCountyPicker = true;
    },
    // 城市取消按钮
    hideCityPicker() {
      this.showCityPicker = false;
    },
    // 区县确认按钮
    onCountyConfirm(event) {
      const idx = event.mp.detail.index;
      this.cityId = this.allCountyArr[idx].id;
      this.countyValue = event.mp.detail.value;
      this.splicingValue =
        this.provinceValue + "/" + this.cityValue + "/" + this.countyValue;
      this.showCountyPicker = false;
      this.showAdress = false;
    },
    // 区县取消按钮
    hideCountyPicker() {
      this.showCountyPicker = false;
    },
    // 教学经验
    handleClickShowExperience() {
      this.showExperiencePicker = true;
    },
    onExperienceConfirm(event) {
      let idx = event.mp.detail.index;
      this.experienceValue = event.mp.detail.value;
      this.job_year = this.allExperience[idx].id;
      this.showExperiencePicker = false;
    },
    hideExperiencePicker() {
      this.showExperiencePicker = false;
    },
    // 保存
    async handleClickSubmit() {
      if (
        this.positionName == "" ||
        this.money1 == "" ||
        this.money2 == "" ||
        this.workIntroduce == "" ||
        this.splicingValue == "" ||
        this.teaching_time1 == "" ||
        this.teaching_time2 == ""
      ) {
        Notify({ type: "warning", message: "您有信息未填写" });
      } else {
        if (parseInt(this.money2) < parseInt(this.money1)) {
          let tmp = this.money1;
          this.money1 = this.money2;
          this.money2 = tmp;
        }
        let TOKEN = wx.getStorageSync("token");
        const res = await this.$httpWX.post({
          url: "/api/company/job/update",
          data: {
            id: this.editId,
            token: TOKEN,
            name: this.positionName,
            type: this.typeId,
            first_language: this.first_language,
            pay: this.money1 + "," + this.money2,
            pay_unit: this.payUnit,
            edu_type: this.edu_type,
            job_year: this.job_year,
            job_info: this.workIntroduce,
            visa_ask: this.colourId,
            sex: this.sex,
            work_type: this.workTypeId,
            colour: this.secondColourId,
            student_age: this.ageId,
            cert: this.certificateId,
            num: this.peopleNum,
            start_time: this.startDateValue,
            // end_time: this.endDateValue,
            benefits: this.welfareValue,
            benefits_tag: this.benefits_tag_str,
            memo: this.remarksValue,
            job_day_time: this.durationValue + ',' + this.endDurationValue,
            job_city: this.cityId,
            teaching_time: this.teaching_time1 + "," + this.teaching_time2,
          },
        });
        if (res.code == 200) {
          wx.navigateBack({
            delta: 1,
          });
        } else {
          Notify({ type: "warning", message: res.msg });
        }
      }
    },
    // 不完善按钮
    handleClickNotPerfect() {
      this.showPopup = false;
    },
    // 完善按钮
    handleClickPerfect(e) {
      this.toView = e.currentTarget.dataset.opt;
      this.showPopup = false;
    },
    // 肤色要求
    handleClickShowSecondColour() {
      this.showSecondColourPicker = true;
    },
    onSecondColourConfirm(event) {
      let idx = event.mp.detail.index;
      this.secondColourValue = event.mp.detail.value;
      this.secondColourId = this.allColour[idx].id;
      this.showSecondColourPicker = false;
    },
    hideSecondColourPicker() {
      this.showSecondColourPicker = false;
    },
    // 学生年龄
    handleClickShowAge() {
      this.showAgePicker = true;
    },
    onAgeConfirm(event) {
      let idx = event.mp.detail.index;
      this.ageValue = event.mp.detail.value;
      this.ageId = this.allAgeColumns[idx].id;
      this.showAgePicker = false;
    },
    hideAgePicker() {
      this.showAgePicker = false;
    },
    // 教学资质证书
    handleClickShowCertificate() {
      this.showCertificatePicker = true;
    },
    onCertificateConfirm(event) {
      let idx = event.mp.detail.index;
      this.certificateValue = event.mp.detail.value;
      this.certificateId = this.allCertificateColumns[idx].id;
      this.showCertificatePicker = false;
    },
    hideCertificatePicker() {
      this.showCertificatePicker = false;
    },
    // 计划上岗时间
    handleClickShowStartDate() {
      this.showStartDatePicker = true;
    },
    onStartDateConfirm(event) {
      this.startDateValue = moment(parseInt(event.mp.detail)).format("YYYY-MM");
      this.showStartDatePicker = false;
    },
    hideStartDatePicker() {
      this.showStartDatePicker = false;
    },
    // 结束日期
    handleClickShowEndDate() {
      this.showEndDatePicker = true;
    },
    onEndDateConfirm(event) {
      this.endDateValue = moment(parseInt(event.mp.detail)).format("YYYY-MM");
      this.showEndDatePicker = false;
    },
    hideEndDatePicker() {
      this.showEndDatePicker = false;
    },
  },
  beforeMount() {},
  onShow() {
    Object.assign(this.$data, this.$options.data());
    let self = this;
    wx.getSystemInfo({
      success: function (res) {
        self.scrollHeight = res.windowHeight - 100;
      },
    });
    this.editId = wx.getStorageSync("detailId");
    this.getDesc();
    // this.getPay();
    this.getArea();
  },
  onLoad() {},
};
</script>
<style scoped>
.indexContatiner {
  display: flex;
  flex-direction: column;
  align-items: center;
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
.content {
  margin-top: 12px;
  width: 90%;
  margin-bottom: 100px;
}
.establish_wrapper {
  position: relative;
  margin-bottom: 12px;
}
.establish_wrapper .tit {
  margin-bottom: 7px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
.tit .xing {
  color: #ff6010;
}
.position_name {
  padding: 0 12px;
  height: 49px;
  background: rgba(248, 248, 248, 1);
  border-radius: 4px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.type_content {
  position: relative;
  padding: 0 12px;
  height: 49px;
  background: rgba(248, 248, 248, 1);
  border-radius: 4px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 49px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.type_content .down_icon {
  position: absolute;
  top: 50%;
  right: 12px;
  margin-top: -8px;
  width: 16px;
  height: 16px;
}
.pay_wrapper {
  background: #fff !important;
}
.pay_content_left,
.pay_content_right {
  position: relative;
  padding: 0 10px;
  width: 130px;
  height: 49px;
  background: rgba(248, 248, 248, 1);
  border-radius: 4px;
  line-height: 49px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.pay_content_left .down_icon,
.pay_content_right .down_icon {
  position: absolute;
  top: 50%;
  right: 12px;
  margin-top: -8px;
  width: 16px;
  height: 16px;
}
.line {
  margin-left: 10px;
  display: inline-block;
  height: 49px;
  line-height: 49px;
  text-align: center;
}
.checked_wrapper {
  margin-top: 7px;
  width: 100%;
}
.checked_wrapper .checked_item {
  margin-bottom: 15px;
  float: left;
  width: 30%;
  display: flex;
}
.checked_wrapper .checked_icon {
  width: 16px;
  height: 16px;
}
.checked_item .checked_content {
  margin: -2px 0 0 5px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.right_con {
  position: absolute;
  top: 50%;
  right: 12px;
  display: block;
  width: 14px;
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.date_wrapper {
  display: flex;
}
.date_content {
  position: relative;
  flex: 1;
  padding: 0 12px;
  height: 49px;
  background: rgba(248, 248, 248, 1);
  border-radius: 4px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 49px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.date_content .down_icon {
  position: absolute;
  top: 50%;
  right: 12px;
  margin-top: -8px;
  width: 16px;
  height: 16px;
}
.oblique_line .obl_line {
  width: 12px;
  height: 49px;
  background: #f8f8f8;
}
.welfare {
  padding: 15px 12px;
  width: 93%;
  height: 120px;
  background: rgba(248, 248, 248, 1);
  border-radius: 4px;
  text-align: justify;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(204, 204, 204, 1);
  line-height: 20px;
}
.bottom_btn {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 78px;
  background: #ffffff;
  box-shadow: 0px 0px 0px 0px #eeeeee;
  z-index: 10;
  /* z-index: 999999; */
}
.submit_btn {
  margin: 8px auto 0 auto;
  width: 90%;
  height: 49px;
  background: rgba(7, 140, 169, 1);
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 49px;
  letter-spacing: 1px;
  text-align: center;
}
.van-notify {
  width: 100%;
}
.tips_tit {
  margin: 24px 0 12px 0;
  font-size: 24px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.tips_con {
  margin-bottom: 24px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
}
.popup_title {
  margin: 24px 0 12px 16px;
  font-size: 20px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.popup_con {
  margin: 0 0 24px 16px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  line-height: 20px;
}
.popup_btn {
  margin-left: 16px;
}
.popup_btn .lside_btn {
  width: 166px;
  height: 49px;
  background: #f8f8f8;
  border-radius: 4px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  line-height: 49px;
  letter-spacing: 1px;
  text-align: center;
}
.popup_btn .rside_btn {
  margin-left: 12px;
  width: 166px;
  height: 49px;
  background: #078ca9;
  border-radius: 4px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 49px;
  letter-spacing: 1px;
  text-align: center;
}
.jump_title {
  margin: 24px 0 8px 0;
  width: 128px;
  height: 24px;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.jump_con {
  margin-bottom: 24px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
}
.date_wrapper {
  display: flex;
}
.date_content {
  position: relative;
  flex: 1;
  padding: 0 12px;
  height: 49px;
  background: rgba(248, 248, 248, 1);
  border-radius: 4px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 49px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.date_content .down_icon {
  position: absolute;
  top: 50%;
  right: 12px;
  margin-top: -8px;
  width: 16px;
  height: 16px;
}
.welfare {
  padding: 15px 12px;
  width: 93%;
  height: 120px;
  background: rgba(248, 248, 248, 1);
  border-radius: 4px;
  text-align: justify;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(204, 204, 204, 1);
  line-height: 20px;
}
.title_tips {
  display: inline-block;
  margin-left: 10px;
  font-size: 12px;
  color: #078ca9;
}
.benefits_tag {
  display: flex;
}
.benefits_tag_item {
  flex: 1;
  text-align: center;
  font-size: 20rpx;
  background: #999;
  margin: 5px 5px;
  line-height: 36px;
  border-radius: 4px;
  color: #fff;
}
.benefits_tag_item_active {
  background: #078ca9;
}
.money {
  display: flex;
}
.money_line {
  line-height: 46px;
  margin: 0 10px;
}
.money_unit {
  margin-left: 20px;
  line-height: 50px;
  text-align: left;
  height: 98rpx;
  background: rgba(248, 248, 248, 1);
  border-radius: 8rpx;
  font-size: 24rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333;
}
.money1 {
  flex: 1;
}
.money_unit .down_icon {
  position: absolute;
  top: 56%;
  right: 12px;
  width: 16px;
  height: 16px;
}
</style>
