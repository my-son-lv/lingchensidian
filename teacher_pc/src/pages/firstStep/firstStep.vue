<template>
  <div class="page_wrapper">
    <stepNav></stepNav>
    <topTitle :Parentcontent="content" :progressNum="progressNum"></topTitle>
    <div class="first_content_wrapper">
      <h3 class="content_title">The Basic information</h3>
      <div class="item_wrapper">
        <p class="lside_title">First Name</p>
        <el-input
          v-model="firstInfo.name"
          placeholder="First Name"
          style="margin: 0 20px;"
        ></el-input>
        <p class="err_tips" v-show="showNameErr && !firstInfo.name">
          Please enter First name
        </p>
        <img
          src="../../assets/image/sure.png"
          class="right_sure_img"
          v-if="firstInfo.name ? (showNameSure = true) : (showNameSure = false)"
        />
      </div>
      <div class="item_wrapper">
        <p class="lside_title">Last Name</p>
        <el-input
          v-model="firstInfo.last_name"
          placeholder="Last Name"
          style="margin: 0 20px;"
        ></el-input>
        <p class="err_tips" v-show="showLastNameErr && !firstInfo.last_name">
          Please enter Last name
        </p>
        <img
          src="../../assets/image/sure.png"
          class="right_sure_img"
          v-if="
            firstInfo.last_name
              ? (showLastNameSure = true)
              : (showLastNameSure = false)
          "
        />
      </div>
      <div class="item_wrapper">
        <p class="lside_title">Gender</p>
        <div
          class="right_sex"
          v-for="(sex, index) in sexList"
          :key="index"
          :class="activeClass == index ? 'actived' : ''"
          @click="getSexItem(index)"
        >
          {{ sex }}
        </div>
      </div>
      <div class="item_wrapper">
        <p class="lside_title">Date of Birth</p>
        <el-date-picker
          v-model="firstInfo.brithday"
          :picker-options="pickerOptions"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="Please select your Date of Birth"
          style="margin: 0 20px;width:380px;"
        >
        </el-date-picker>
        <p class="err_tips" v-show="showBirthErr && !firstInfo.brithday">
          Please enter Date of Birth
        </p>
        <img
          src="../../assets/image/sure.png"
          class="right_sure_img"
          v-if="
            firstInfo.brithday
              ? (showBirthSure = true)
              : (showBirthSure = false)
          "
        />
      </div>
      <div class="item_wrapper">
        <p class="lside_title">Nationality</p>
        <el-select
          v-model="firstInfo.nationality"
          filterable
          placeholder="Nationality"
          clearable
          style="margin: 0 20px;"
        >
          <el-option
            v-for="item in countryList"
            :key="item.id"
            :label="item.code"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <p
          class="err_tips"
          v-show="showNationalityErr && !firstInfo.nationality"
        >
          Please enter Nationality
        </p>
        <img
          src="../../assets/image/sure.png"
          class="right_sure_img"
          v-if="
            firstInfo.nationality
              ? (showNationalitySure = true)
              : (showNationalitySure = false)
          "
        />
      </div>
      <div class="item_wrapper">
        <p class="lside_title">Are you in China</p>
        <div
          class="right_sex"
          v-for="(item, index) in inChinaList"
          :key="index"
          :class="activeChinaClass == index ? 'actived' : ''"
          @click="getChinaItem(index, item.id)"
        >
          {{ item.value }}
        </div>
      </div>
      <div class="item_wrapper small_select" v-if="firstInfo.in_domestic == 1">
        <p class="lside_title">Visa Type</p>
        <el-select
          v-model="firstInfo.visa_type"
          filterable
          placeholder="Please select"
          clearable
          style="margin: 0 20px"
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
          v-model="firstInfo.visa_exp_date"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="Date of Expiry"
          style="margin-right: 20px"
        >
        </el-date-picker>
        <p class="err_tips" v-show="showVisaErr && !firstInfo.visa_exp_date">
          Please enter Visa Type
        </p>
        <img
          src="../../assets/image/sure.png"
          class="right_sure_img"
          v-if="
            firstInfo.visa_type && firstInfo.visa_exp_date
              ? (showVisaSure = true)
              : (showVisaSure = false)
          "
        />
      </div>
      <p class="bottom_tips" v-if="firstInfo.in_domestic == 1">
        Please select visa type and date of expiry
      </p>
      <div class="item_wrapper small_select" v-if="firstInfo.in_domestic == 1">
        <p class="lside_title">Current Location</p>
        <el-select
          v-model="provincId"
          filterable
          placeholder="Current Location"
          style="margin: 0 20px"
          @change="provincChange"
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
          v-model="firstInfo.china_address"
          filterable
          placeholder="Location City"
          style="margin-right: 20px"
        >
          <el-option
            v-for="item in cityList"
            :key="item.id"
            :label="item.pinyin"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <p class="err_tips" v-show="showCityErr && !firstInfo.china_address">
          Please enter Current Location
        </p>
        <img
          src="../../assets/image/sure.png"
          class="right_sure_img"
          v-if="
            firstInfo.china_address
              ? (showCitySure = true)
              : (showCitySure = false)
          "
        />
      </div>
      <div class="item_wrapper" v-else>
        <p class="lside_title">Current Location</p>
        <el-select
          v-model="firstInfo.country"
          filterable
          placeholder="Current Location"
          clearable
          style="margin: 0 20px;"
        >
          <el-option
            v-for="item in countryList"
            :key="item.id"
            :label="item.code"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <p class="err_tips" v-show="showLocationErr && !firstInfo.country">
          Please enter Current Location
        </p>
        <img
          src="../../assets/image/sure.png"
          class="right_sure_img"
          v-if="
            firstInfo.country
              ? (showLocationSure = true)
              : (showLocationSure = false)
          "
        />
      </div>
      <div class="item_wrapper small_select">
        <p class="lside_title">Phone Number</p>
        <el-select
          v-model="firstInfo.area_code"
          filterable
          placeholder="Please select"
          style="margin: 0 20px"
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
          v-model="firstInfo.phone"
          placeholder="Phone Number"
          style="margin-right: 20px;"
        ></el-input>
        <p class="err_tips" v-show="showPhoneErr && !firstInfo.area_code">
          Please enter Phone Number
        </p>
        <img
          src="../../assets/image/sure.png"
          class="right_sure_img"
          v-if="
            firstInfo.phone && firstInfo.area_code ? (showPhoneSure = true) : (showPhoneSure = false)
          "
        />
      </div>
      <div class="item_wrapper small_select">
        <p class="lside_title">Social Media</p>
        <el-select
          v-model="firstInfo.comm_type"
          filterable
          placeholder="Please select"
          style="margin: 0 20px"
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
          v-model="firstInfo.wechat"
          placeholder="Media Number"
          style="margin-right: 20px;"
        ></el-input>
        <p
          class="err_tips"
          v-show="showMediaErr && (!firstInfo.comm_type || !firstInfo.wechat)"
        >
          Please enter Social Media
        </p>
        <img
          src="../../assets/image/sure.png"
          class="right_sure_img"
          v-if="
            firstInfo.wechat ? (showMediaSure = true) : (showMediaSure = false)
          "
        />
      </div>
      <p class="bottom_tips">
        Fill out your social media account to find a job faster
      </p>
      <div class="introduction_wrapper">
        <p class="lside_title">Your introduction</p>
        <el-input
          type="textarea"
          :autosize="{ minRows: 5 }"
          placeholder="Please talk about yourself; your interests"
          v-model="firstInfo.desc"
          style="margin: 0 20px"
        >
        </el-input>
        <p class="err_tips" v-show="showIntroductionErr && !firstInfo.desc">
          Please enter Your introduction
        </p>
        <img
          src="../../assets/image/sure.png"
          class="right_sure_img"
          v-if="
            firstInfo.desc
              ? (showIntroductionSure = true)
              : (showIntroductionSure = false)
          "
        />
      </div>
      <div class="introduction_wrapper">
        <p class="lside_title">Upload your photo</p>
        <div class="upload_wrapper">
          <uploadComponents
            @uploadImgId="uploadImgId"
            :type="0"
            :getImgUrl="childrenImgUrl"
          ></uploadComponents>
        </div>
      </div>
      <div class="line"></div>
      <div class="bottom_btn_wrapper">
        <div class="btn" @click="submitFirst">Next</div>
      </div>
    </div>
  </div>
</template>
<script>
import stepNav from "../../components/stepNav/stepNav";
import topTitle from "../../components/topTitle/topTitle";
import {
  getCountryList,
  getProvince,
  getCity,
  submitStep,
  getTeachCommentInfo
} from "../../apis/baseUrls";
import uploadComponents from "../../components/uploadComponents/uploadComponents";
export default {
  name: "firstStep",
  components: {
    stepNav,
    topTitle,
    uploadComponents
  },
  data() {
    return {
      content:
        "Dear friend, introduce yourself, let numerous employers find you more easily.",
      progressNum: 30,
      firstInfo: {
        token: "",
        name: "",
        last_name: "",
        sex: 0,
        brithday: "",
        nationality: "",
        in_domestic: 1,
        visa_type: "",
        visa_exp_date: "",
        country: "",
        china_address: "",
        area_code: "",
        phone: "",
        comm_type: 3,
        desc: "",
        photos: "",
        wechat: ""
      },
      sexList: ["Male", "Female"],
      activeClass: 0,
      countryList: [],
      inChinaList: [
        {
          value: "YES",
          id: 1
        },
        {
          value: "NO",
          id: 0
        }
      ],
      activeChinaClass: 0,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e7;
        }
      },
      visaList: [
        { id: 1, code: "Z" },
        { id: 2, code: "M" },
        { id: 3, code: "F" },
        { id: 4, code: "X" },
        { id: 5, code: "others" }
      ],
      provincesList: [],
      provincId: "",
      cityList: [],
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
      showGenderErr: false,
      showBirthErr: false,
      showNationalityErr: false,
      showVisaErr: false,
      showCityErr: false,
      showLocationErr: false,
      showPhoneErr: false,
      showMediaErr: false,
      showIntroductionErr: false,
      showNameSure: false,
      showLastNameSure: false,
      showBirthSure: false,
      showNationalitySure: false,
      showVisaSure: false,
      showCitySure: false,
      showLocationSure: false,
      showPhoneSure: false,
      showMediaSure: false,
      showIntroductionSure: false,
      childrenImgUrl: ""
    };
  },
  created() {
    this.firstInfo.token = localStorage.getItem("token");
    this.getCountry();
    this.getProvinces();
    this.getFirstStepInfo();
  },
  computed: {},
  methods: {
    //   获取草稿信息
    async getFirstStepInfo() {
      let res = await getTeachCommentInfo({
        token: this.firstInfo.token
      });
      if (res.data.code == 200) {
        this.firstInfo.name = res.data.data.name;
        this.firstInfo.last_name = res.data.data.last_name;
        this.firstInfo.sex = res.data.data.sex;
        this.firstInfo.brithday = res.data.data.brithday;
        this.firstInfo.nationality = res.data.data.nationality;
        this.firstInfo.in_domestic = res.data.data.in_domestic;
        if (res.data.data.in_domestic == 1) {
          this.activeChinaClass = 0;
        } else {
          this.activeChinaClass = 1;
        }
        if (res.data.data.visa_type != null) {
          this.firstInfo.visa_type = res.data.data.visa_type;
        }
        if (res.data.data.visa_exp_date != null) {
          this.firstInfo.visa_exp_date = res.data.data.visa_exp_date;
        }
        if (res.data.data.country != null) {
          this.firstInfo.country = res.data.data.country;
        }
        if (res.data.data.china_address_city_data != null) {
          this.provincId =
            res.data.data.china_address_city_data.province_data.id;
          this.firstInfo.china_address = res.data.data.china_address;
          this.provincChange();
        }
        this.firstInfo.area_code = res.data.data.area_code;
        this.firstInfo.phone = res.data.data.phone;
        if (res.data.data.comm_type != 0) {
          this.firstInfo.comm_type = res.data.data.comm_type;
        }
        this.firstInfo.wechat = res.data.data.wechat;
        this.firstInfo.desc = res.data.data.desc;
        if (res.data.data.photos_path != null) {
          this.firstInfo.photos = res.data.data.photos;
          this.childrenImgUrl = res.data.data.photos_path.path;
        }
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 性别切换
    getSexItem(index) {
      this.activeClass = index;
      this.firstInfo.sex = index;
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
    // 选择in China
    getChinaItem(index, id) {
      this.activeChinaClass = index;
      this.firstInfo.in_domestic = id;
      this.firstInfo.visa_type = "";
      this.firstInfo.visa_exp_date = "";
      this.firstInfo.china_address = "";
      this.firstInfo.country = "";
      this.provincId = "";
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
        this.cityList = res.data.data;
      } else {
        this.$message({
          message: res.data.msg,
          type: "warning"
        });
      }
    },
    // 接收传过来的id
    uploadImgId(id) {
      this.firstInfo.photos = id;
    },
    // 下一步
    async submitFirst() {
      switch (this.firstInfo.in_domestic == 1) {
        case this.showVisaSure != true:
          this.showVisaErr = true;
        case this.showCitySure != true:
          this.showCityErr = true;
          break;
      }
      switch (this.firstInfo.in_domestic == 0) {
        case this.showLocationSure != true:
          this.showLocationErr = true;
          break;
      }
      if (
        this.showNameSure == true &&
        this.showLastNameSure == true &&
        this.showBirthSure == true &&
        this.showNationalitySure == true &&
        ((this.showVisaSure == true && this.showCitySure == true) ||
          this.showLocationSure == true) &&
        this.showPhoneSure == true &&
        this.showMediaSure == true &&
        this.showIntroductionSure == true
      ) {
        let firstInfo = this.firstInfo;
        let res = await submitStep(firstInfo);
        if (res.data.code == 200) {
          this.$router.push("/secondStep");
          sessionStorage.setItem("inChina", this.firstInfo.in_domestic);
        } else {
          this.$message.error(res.data.msg);
        }
      } else {
        if (this.showNameSure == false) {
          this.showNameErr = true;
        }
        if (this.showLastNameSure == false) {
          this.showLastNameErr = true;
        }
        if (this.showBirthSure == false) {
          this.showBirthErr = true;
        }
        if (this.showNationalitySure == false) {
          this.showNationalityErr = true;
        }
        if (this.showPhoneSure == false) {
          this.showPhoneErr = true;
        }
        if (this.showMediaSure == false) {
          this.showMediaErr = true;
        }
        if (this.showIntroductionSure == false) {
          this.showIntroductionErr = true;
        }
      }
    }
  }
};
</script>
<style scoped>
.page_wrapper {
  padding-bottom: 20px;
  background: #f3fafb;
}
.first_content_wrapper {
  margin: 0 auto;
  padding-top: 43px;
  width: 1020px;
  background: #ffffff;
  border-radius: 10px;
}
.first_content_wrapper .content_title {
  margin-left: 111px;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.item_wrapper {
  position: relative;
  display: flex;
  margin-top: 20px;
  height: 40px;
  line-height: 40px;
}
.item_wrapper .lside_title,
.introduction_wrapper .lside_title {
  width: 300px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  text-align: right;
}
.item_wrapper .center_input {
  width: 380px;
  height: 40px;
  background: #ffffff;
  border-radius: 4px;
  border: 1px solid #cccccc;
  box-sizing: border-box;
}
/deep/ .el-input__inner:focus {
  border-color: #333;
  outline: 0;
}
/deep/ .el-textarea__inner:focus {
  border-color: #333;
  outline: 0;
}
/deep/ .el-input {
  width: 380px;
  height: 40px;
}
/deep/ .el-input__inner {
  font-size: 14px;
  font-weight: 500;
  color: #333333;
  border: 1px solid #cccccc;
}
.err_tips {
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ff6010;
}
.item_wrapper .right_sex {
  margin-left: 20px;
  width: 180px;
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
.item_wrapper .right_sex.actived {
  color: #078ca9;
  background: rgba(7, 140, 169, 0.1);
  border: 1px solid #078ca9;
}
.item_wrapper .down_icon {
  position: absolute;
  top: 50%;
  right: 332px;
  margin-top: -7px;
  width: 14px;
  height: 14px;
  pointer-events: none;
}
/deep/ .small_select .el-input {
  width: 180px;
  height: 40px;
}
.bottom_tips {
  margin: 10px 0 20px 320px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
}
.introduction_wrapper {
  display: flex;
  margin: 20px 0;
}
/deep/ .el-textarea {
  width: 380px;
}
/deep/ .el-textarea__inner {
  font-size: 14px;
  font-weight: 500;
  color: #333333;
  border: 1px solid #cccccc;
}
.upload_wrapper {
  margin: 0 20px;
}
.line {
  margin: 40px auto 0 auto;
  width: 980px;
  height: 1px;
  background: #dddddd;
}
.bottom_btn_wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
}
.bottom_btn_wrapper .btn {
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
.right_sure_img {
  margin-top: 12px;
  width: 16px;
  height: 16px;
}
</style>
