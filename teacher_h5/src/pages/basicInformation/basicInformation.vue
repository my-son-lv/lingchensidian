<!-- 第一步 -->
<template>
  <div class="first_wrapper">
    <submitTitle :titleContent="titleContent"></submitTitle>
    <div class="tips">
      <p>Please fill in your basic information</p>
      <p style="margin-top: 5px">Your employer knows more about you</p>
    </div>
    <div class="submit_messages">
      <div class="message_wrapper van-hairline--bottom">
        <div class="name_asterisk">*</div>
        <van-field input-align="right" v-model="name" label=" First Name" maxlength="30" />
      </div>
      <div class="message_wrapper van-hairline--bottom">
        <div class="last_name_asterisk">*</div>
        <van-field input-align="right" v-model="last_name" label="Last Name" maxlength="30" />
      </div>
      <div class="message_wrapper van-hairline--bottom date_wrapper">
        <div class="brithday_asterisk">*</div>
        <van-field
          readonly
          clickable
          name="datePicker"
          :value="brithday"
          label="Date of birth"
          @click="showBrithdayPicker = true"
        />
        <van-popup v-model="showBrithdayPicker" position="bottom">
          <van-datetime-picker
            :item-height="45"
            v-model="currentDate"
            type="date"
            @confirm="onBrithdayConfirm"
            @cancel="showBrithdayPicker = false"
            :min-date="minDate"
            :max-date="maxDate"
            confirm-button-text="confirm"
            cancel-button-text="cancel"
            title="Date of birth"
          />
        </van-popup>
        <img src="../../assets/down.png" class="icon" />
      </div>
      <div class="message_wrapper van-hairline--bottom date_wrapper">
        <div class="weChat_asterisk">*</div>
        <van-field
          readonly
          clickable
          name="picker"
          :value="wechatValue == '' || wechatValue == null ? '' : wechatValue"
          label="Social Media"
          @click="showWechatPicker = true"
        />
        <van-popup v-model="showWechatPicker" position="bottom">
          <van-picker
            :item-height="45"
            show-toolbar
            :columns="wechatList"
            @confirm="onWechatConfirm"
            @cancel="showWechatPicker = false"
            confirm-button-text="confirm"
            cancel-button-text="cancel"
            title="Social Media"
          />
        </van-popup>
        <img src="../../assets/down.png" class="icon" />
      </div>
      <div class="message_wrapper van-hairline--bottom">
        <div class="weChat_input_asterisk">*</div>
        <van-field
          input-align="right"
          v-model="weChat"
          :label="wechatValue == '' ? wechatList[2] : wechatValue"
          maxlength="30"
        />
      </div>

      <div class="message_wrapper van-hairline--bottom date_wrapper">
        <div class="Nation_asterisk">*</div>
        <van-field
          readonly
          clickable
          name="picker"
          :value="nationalityValue"
          label="Nationality"
          @click="showNationalityPicker = true"
        />
        <van-popup v-model="showNationalityPicker" position="bottom">
          <van-picker
            :item-height="45"
            show-toolbar
            :columns="nationalityList"
            @confirm="onNationalityConfirm"
            @cancel="showNationalityPicker = false"
            confirm-button-text="confirm"
            cancel-button-text="cancel"
            title="Nationality"
          />
        </van-popup>
        <img src="../../assets/down.png" class="icon" />
      </div>
      <div class="message_wrapper van-hairline--bottom">
        <div class="radio_asterisk">*</div>
        <van-field name="radio" label="Gender">
          <template #input>
            <van-radio-group v-model="sex" direction="horizontal" :icon-size="22">
              <van-radio name="0" checked-color="#078CA9">Male</van-radio>
              <van-radio name="1" checked-color="#078CA9" style="margin-right: 6px">Female</van-radio>
            </van-radio-group>
          </template>
        </van-field>
      </div>
      <div class="message_wrapper van-hairline--bottom">
        <div class="china_asterisk">*</div>
        <van-field name="radio" label="Are you in China">
          <template #input>
            <van-radio-group
              v-model="inChina"
              direction="horizontal"
              :icon-size="22"
              @change="handleChangeCheckbox"
            >
              <van-radio name="1" checked-color="#078CA9">Yes</van-radio>
              <van-radio name="0" checked-color="#078CA9" style="margin-right: 6px">No</van-radio>
            </van-radio-group>
          </template>
        </van-field>
      </div>
      <div class="message_wrapper van-hairline--bottom date_wrapper" v-show="inChina == 1">
        <van-field
          readonly
          clickable
          name="picker"
          :value="cityValue"
          label="Current Location"
          @click="handleClickShowCity"
        />
        <div class="City_asterisk">*</div>
        <van-popup v-model="showCityPicker" position="bottom">
          <van-picker
            :item-height="45"
            show-toolbar
            :columns="residencetList"
            @confirm="onCityConfirm"
            @cancel="showCityPicker = false"
            confirm-button-text="confirm"
            cancel-button-text="cancel"
            title="Province"
          />
        </van-popup>
        <van-popup v-model="showTownPicker" position="bottom">
          <van-picker
            :item-height="45"
            show-toolbar
            :columns="cityList"
            @confirm="onTownConfirm"
            @cancel="showTownPicker = false"
            confirm-button-text="confirm"
            cancel-button-text="cancel"
            title="City"
          />
        </van-popup>
        <img src="../../assets/down.png" class="icon" />
      </div>
      <div class="message_wrapper van-hairline--bottom date_wrapper" v-show="inChina == 1">
        <van-field
          readonly
          clickable
          name="picker"
          :value="visaValue"
          label="Visa Type"
          @click="showVisaPicker = true"
        />
        <div class="Visa_asterisk">*</div>
        <van-popup v-model="showVisaPicker" position="bottom">
          <van-picker
            :item-height="45"
            show-toolbar
            :columns="visaList"
            @confirm="onVisaConfirm"
            @cancel="showVisaPicker = false"
            confirm-button-text="confirm"
            cancel-button-text="cancel"
            title="Visa Type"
          />
        </van-popup>
        <img src="../../assets/down.png" class="icon" />
      </div>
      <div class="message_wrapper van-hairline--bottom date_wrapper" v-show="inChina == 1">
        <van-field
          readonly
          clickable
          name="picker"
          :value="expiryValue"
          label="Date of Expiry"
          @click="showExpiryPicker = true"
        />
        <div class="Date_asterisk">*</div>
        <van-popup v-model="showExpiryPicker" position="bottom">
          <van-datetime-picker
            :item-height="45"
            v-model="currentExpiryDate"
            type="date"
            @confirm="onExpiryConfirm"
            @cancel="showExpiryPicker = false"
            :min-date="minDate"
            :max-date="maxDate"
            confirm-button-text="confirm"
            cancel-button-text="cancel"
            title="Date of Expiry"
          />
        </van-popup>
        <img src="../../assets/down.png" class="icon" />
      </div>
      <div class="message_wrapper van-hairline--bottom date_wrapper" v-show="this.inChina == 0">
        <van-field
          readonly
          clickable
          name="picker"
          :value="addressValue"
          label="Current Location"
          @click="showAdressPicker = true"
        />
        <div class="Address_asterisk">*</div>
        <van-popup v-model="showAdressPicker" position="bottom">
          <van-picker
            :item-height="45"
            show-toolbar
            :columns="nationalityList"
            @confirm="onAdressConfirm"
            @cancel="showAdressPicker = false"
            confirm-button-text="confirm"
            cancel-button-text="cancel"
            title="Adress"
          />
        </van-popup>
        <img src="../../assets/down.png" class="icon" />
      </div>
      <!--区号-->
      <div class="message_wrapper van-hairline--bottom date_wrapper">
        <div class="Nation_asterisk" style="left: 28%;">*</div>
        <van-field
          readonly
          clickable
          name="picker"
          :value="areaCodeValue"
          label="Country Code"
          @click="showAreaCodePicker = true"
        />
        <van-popup v-model="showAreaCodePicker" position="bottom">
          <van-picker
            :item-height="45"
            show-toolbar
            :columns="areaCodeList"
            @confirm="onAreaCodeConfirm"
            @cancel="showAreaCodePicker = false"
            confirm-button-text="confirm"
            cancel-button-text="cancel"
            title="Country Code"
          />
        </van-popup>
        <img src="../../assets/down.png" class="icon" />
      </div>
      <div class="message_wrapper van-hairline--bottom">
        <van-field input-align="right" v-model="phoneNumber" label="Phone Number" />
        <div class="Phone_asterisk">*</div>
      </div>
      <div class="self_wrapper">
        <div class="self_inner_content">
          <h5>Your introduction</h5>
          <div class="me_asterisk">*</div>
          <textarea
            v-model="selfContent"
            cols="30"
            rows="10"
            class="self_textarea"
            placeholder="Introduce yourself to you. We can talk about your hobbies and personalities. Maybe we can have fun with more people"
          ></textarea>
        </div>
      </div>
      <div class="upload_wrapper">
        <div class="uplaod_title">Please upload picture</div>
        <div class="tips">
          <p>Only jpg/png/jpeg</p>
          <p>less than 8M</p>
        </div>
        <uploadImg @avatarUrl="acceptUrl" :limit="limit" :fileListArr="this.photosUrl"></uploadImg>
      </div>
      <div class="btn_wrapper">
        <div class="next_btn" @click="handleClickSubmit">Next step</div>
      </div>
    </div>
  </div>
</template>

<script>
import submitTitle from "../../components/submitTitle/submitTitle";
import {
  getCountryList,
  firstMobileComment,
  getCommentInfo,
  getProvince,
  getCity
} from "../../apis/baseUrls";
import uploadImg from "../../components/uploadImg/uploadImg";
import { Dialog, Toast, Notify } from "vant";

export default {
  name: "firstContent",
  //import引入的组件需要注入到对象中才能使用
  components: { submitTitle, uploadImg },
  data() {
    //这里存放数据
    return {
      name: "",
      last_name: "",
      sex: "",
      brithday: "",
      showBrithdayPicker: false,
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(2200, 12, 30),
      currentDate: new Date(),
      nationality: "",
      nationalityValue: "",
      showNationalityPicker: false,
      nationalityList: [],
      allNationalityList: [],
      titleContent: "Basic information",
      photos: "",
      photosUrl: [],
      limit: 1,
      showBrithdayErr: false,
      inChina: "",
      showCityPicker: false,
      cityList: [],
      cityValue: "",
      allResidencetList: [],
      residencetList: [],
      allCityList: [],
      showTownPicker: false,
      chinaAddress: "",
      chinaAddressValue: "",
      visaValue: "",
      showVisaPicker: false,
      visaList: ["Z", "M", "F", "X", "others"],
      allVisaList: [
        { id: 1, code: "Z" },
        { id: 2, code: "M" },
        { id: 3, code: "F" },
        { id: 4, code: "X" },
        { id: 5, code: "others" }
      ],
      visaId: "",
      showExpiryPicker: false,
      expiryValue: "",
      currentExpiryDate: new Date(),
      showAdressPicker: false,
      addressValue: "",
      countryId: "",
      phoneNumber: "",
      weChat: "",
      showCityErr: false,
      showVisaErr: false,
      showExpiryErr: false,
      showAddressErr: false,
      wechatValue: "",
      showWechatPicker: false,
      wechatList: ["WeChat", "Skype", "Whatsapp", "Instagram"],
      allWechatList: [
        { value: "WeChat", id: 1 },
        { value: "Skype", id: 2 },
        { value: "Whatsapp", id: 3 },
        { value: "Instagram", id: 4 }
      ],
      showAreaCodePicker: false,
      comm_type: 1,
      selfContent: "",
      areaCodeList: [],
      areaCode: "",
      areaCodeValue: "",
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
      ]
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 获取草稿信息
    getCommentMessage() {
      getCommentInfo({
        token: localStorage.getItem("token")
      }).then(res => {
        if (res.data.code == 200) {
          let result = res.data.data;
          this.name = result.name;
          if (result.last_name != null) {
            this.last_name = result.last_name;
          }
          this.sex = result.sex.toString();
          if (result.brithday != null) {
            this.brithday = result.brithday;
          }
          this.nationality = result.nationality;
          if (result.nationality) {
            this.nationalityValue = result.nationality_val.code;
          }
          this.inChina = result.in_domestic.toString();
          if (result.china_address_city_data) {
            this.cityValue = result.china_address_city_data.city_data.pinyin;
            this.chinaAddress = result.china_address_city_data.city_data.id;
          }
          if (result.in_domestic == 1) {
            this.visaId = result.visa_type;
            this.visaValue = this.visaList[result.visa_type - 1];
            this.expiryValue = result.visa_exp_date;
          }
          if (result.country_val != null) {
            this.countryId = result.country;
            this.addressValue = result.country_val.code;
          }
          if (result.phone != null) {
            this.phoneNumber = result.phone;
          }
          if (result.wechat != null) {
            this.weChat = result.wechat;
          }
          if (result.photos_path != null) {
            this.photosUrl.push({ url: result.photos_path.path });
            this.photos = result.photos;
          }
          this.comm_type = result.comm_type;
          this.wechatValue = this.wechatList[result.comm_type - 1];
          this.selfContent = result.desc;

          this.areaCode = result.area_code;
          if (this.areaCode) {
            let areaCodeIndex = "";
            this.telOptions.forEach(function(v, index) {
              if (v.id == result.area_code) {
                areaCodeIndex = index;
              }
            });
            this.areaCodeValue = this.telOptions[areaCodeIndex].titleKey;
          }
        }
      });
    },
    // 选择生日
    onBrithdayConfirm(date) {
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      if (month >= 1 && month <= 9) {
        month = `0${month}`;
      }
      if (day >= 1 && day <= 9) {
        day = `0${day}`;
      }
      this.brithday = `${year}-${month}-${day}`;
      this.showBrithdayPicker = false;
      this.showBrithdayErr = false;
    },
    // 获取国籍
    getCountry() {
      getCountryList().then(res => {
        const result = res.data;
        if (result.code == 200) {
          this.allNationalityList = result.data;
          this.nationalityList = result.data.map(ele => ele.code);
        }
      });
    },
    onAreaCodeConfirm(value, index) {
      this.areaCode = this.telOptions[index].id;
      this.areaCodeValue = this.telOptions[index].titleKey;
      this.showAreaCodePicker = false;
    },
    // 国籍确认按钮
    onNationalityConfirm(value, index) {
      this.nationalityValue = value;
      this.nationality = this.allNationalityList[index].id;
      this.showNationalityPicker = false;
    },
    // 子组件传来的头像路径
    acceptUrl(obj) {
      this.photos = obj;
    },
    // 提交
    handleClickSubmit() {
      if (this.name == "" || this.name == undefined) {
        Notify({ type: "warning", message: "Please complete your first name" });
        return;
      }
      if (this.last_name == "") {
        Notify({ type: "warning", message: "Please complete your last name" });
        return;
      }
      if (this.brithday == "") {
        Notify({ type: "warning", message: "Please complete your brithday" });
        return;
      }
      if (this.weChat == "") {
        Notify({
          type: "warning",
          message: "Please complete your contact information"
        });
        return;
      }
      if (this.nationalityValue == "" || this.nationalityValue == null) {
        Notify({
          type: "warning",
          message: "Please complete your nationality"
        });
        return;
      }
      if (this.inChina == 1 && this.cityValue == "") {
        Notify({
          type: "warning",
          message: "Please complete Current Location"
        });
        return;
      }
      if (this.inChina == 1 && this.visaValue == null) {
        Notify({
          type: "warning",
          message: "Please complete Visa Type"
        });
        return;
      }
      if (this.inChina == 1 && this.expiryValue == "") {
        Notify({
          type: "warning",
          message: "Please complete Date of Expiry"
        });
        return;
      }
      if (this.inChina == 0 && this.addressValue == "") {
        Notify({
          type: "warning",
          message: "Please complete Current Location"
        });
        return;
      }
      if (this.selfContent == "" || this.selfContent == null) {
        Notify({
          type: "warning",
          message: "Please complete your interests"
        });
        return;
      }
      if (this.phoneNumber == "" || !this.areaCode) {
        Notify({
          type: "warning",
          message: "Please complete your phone number"
        });
        return;
      }
      firstMobileComment({
        token: localStorage.getItem("token"),
        name: this.name,
        last_name: this.last_name,
        sex: this.sex,
        brithday: this.brithday,
        nationality: this.nationality,
        photos: this.photos,
        abroad_address: "",
        in_domestic: this.inChina,
        visa_type: this.visaId,
        visa_exp_date: this.expiryValue,
        china_address: this.chinaAddress,
        wechat: this.weChat,
        phone: this.phoneNumber,
        country: this.countryId,
        comm_type: this.comm_type,
        desc: this.selfContent,
        area_code: this.areaCode
      }).then(res => {
        this.$router.push("/contactInformation");
        sessionStorage.setItem("inChina", this.inChina);
      });
    },
    // 选择省份
    handleClickShowCity() {
      this.showCityPicker = true;
    },
    onCityConfirm(value, index) {
      let provinceId = this.allResidencetList[index].id;
      getCity({
        id: provinceId
      }).then(res => {
        if (res.data.code == 200) {
          this.allCityList = res.data.data;
          this.cityList = res.data.data.map(item => item.pinyin);
          this.showCityPicker = false;
          this.showTownPicker = true;
        } else {
          Toast.fail(res.data.msg);
        }
      });
    },
    onTownConfirm(value, index) {
      this.cityValue = value;
      this.chinaAddress = this.allCityList[index].id;
      this.showTownPicker = false;
      this.showCityErr = false;
    },
    // 获取省份接口
    getProvinces() {
      getProvince().then(res => {
        if (res.data.code == 200) {
          this.allResidencetList = res.data.data;
          this.residencetList = res.data.data.map(item => item.pinyin);
        } else {
          Toast.fail(res.data.msg);
        }
      });
    },
    // 签证类型
    onVisaConfirm(value, index) {
      this.visaValue = value;
      this.visaId = this.allVisaList[index].id;
      this.showVisaPicker = false;
      this.showVisaErr = false;
    },
    // 签证到期时间
    onExpiryConfirm(date) {
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      if (month >= 1 && month <= 9) {
        month = `0${month}`;
      }
      if (day >= 1 && day <= 9) {
        day = `0${day}`;
      }
      this.expiryValue = `${year}-${month}-${day}`;
      this.showExpiryPicker = false;
      this.showExpiryErr = false;
    },
    // 地址
    onAdressConfirm(value, index) {
      this.countryId = this.allNationalityList[index].id;
      this.addressValue = value;
      this.showAdressPicker = false;
      this.showAddressErr = false;
    },
    // 是否在中国切换
    handleChangeCheckbox() {
      if (this.inChina == 0) {
        this.cityValue = "";
        this.chinaAddress = "";
        this.visaId = "";
        this.visaValue = "";
        this.expiryValue = "";
      } else {
        this.countryId = "";
        this.addressValue = "";
      }
    },
    // 微信号
    onWechatConfirm(value, index) {
      this.wechatValue = value;
      this.comm_type = this.allWechatList[index].id;
      this.showWechatPicker = false;
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getCountry();
    this.getProvinces();
    this.getCommentMessage();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    let that = this;
    this.$nextTick(() => {});
    this.telOptions.forEach(function(v) {
      that.areaCodeList.push(v.titleKey);
    });
  }
};
</script>
<style scoped>
.first_wrapper {
  width: 100%;
  background: rgba(248, 248, 248, 1);
}
.tips {
  padding: 60px 30px;
  width: 100%;
  height: 152px;
  background: rgba(248, 248, 248, 1);
}
.tips p {
  font-size: 32px;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 46px;
  letter-spacing: 1px;
}
.submit_messages {
  width: 100%;
  background: #fff;
}
.submit_messages .message_wrapper {
  position: relative;
  width: 100%;
  height: 120px;
}
/deep/ .van-cell {
  display: flex;
  align-items: center;
  padding: 0 30px;
  height: 120px;
}
/deep/ .van-cell__title {
  width: auto !important;
  font-size: 28px;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}
/deep/ .van-field__control {
  font-size: 28px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.err_messages {
  position: absolute;
  top: 40%;
  right: 12%;
  color: #ee0a24;
  font-size: 28px;
  font-weight: 400;
  text-align: right;
  pointer-events: none;
}
/deep/ .van-radio-group--horizontal {
  position: absolute;
  display: flex;
  right: 0;
}
/deep/ .van-radio__label {
  font-size: 28px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.date_wrapper {
  position: relative;
}
.date_wrapper .icon {
  position: absolute;
  top: 50%;
  right: 4%;
  margin-top: -22px;
  width: 44px;
  height: 44px;
  pointer-events: none;
}
/deep/ .date_wrapper .van-field__control {
  margin-right: 50px;
  text-align: right;
}
.upload_wrapper {
  position: relative;
  padding: 30px 0 0 30px;
  margin: 30px auto;
  width: 660px;
  height: 312px;
  background: rgba(248, 248, 248, 1);
  border-radius: 10px;
}
.upload_wrapper .uplaod_title {
  margin: 0 0 60px 0;
  font-size: 28px;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
.upload_wrapper .tips {
  position: absolute;
  bottom: 30px;
  right: 30px;
  padding: 0;
  width: auto;
  height: 72px;
}
.upload_wrapper .tips p {
  font-size: 24px;
  font-weight: 400;
  letter-spacing: 1px;
}
.btn_wrapper {
  margin-bottom: 60px;
  padding-top: 60px;
  width: 100%;
  background: rgba(248, 248, 248, 1);
}
.btn_wrapper .next_btn {
  margin: 0 auto;
  width: 90%;
  height: 98px;
  background: rgba(7, 140, 169, 1);
  border-radius: 10px;
  font-size: 36px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 98px;
  text-align: center;
  cursor: pointer;
}
.name_asterisk {
  position: absolute;
  top: 38%;
  left: 23%;
  width: 15px;
  height: 15px;
  color: #ee0a24;
  z-index: 1;
}
.radio_asterisk {
  position: absolute;
  top: 38%;
  left: 23%;
  width: 15px;
  height: 15px;
  color: #ee0a24;
  z-index: 1;
}
.last_name_asterisk {
  position: absolute;
  top: 38%;
  left: 23%;
  width: 15px;
  height: 15px;
  color: #ee0a24;
  z-index: 1;
}
.radio_asterisk {
  position: absolute;
  top: 38%;
  left: 18%;
  width: 15px;
  height: 15px;
  color: #ee0a24;
  z-index: 1;
}
.datePicker_asterisk {
  position: absolute;
  top: 38%;
  left: 26%;
  width: 15px;
  height: 15px;
  color: #ee0a24;
  z-index: 1;
}
.Nation_asterisk {
  position: absolute;
  top: 38%;
  left: 23%;
  width: 15px;
  height: 15px;
  color: #ee0a24;
  z-index: 1;
}
.brithday_asterisk {
  position: absolute;
  top: 38%;
  left: 25%;
  width: 15px;
  height: 15px;
  color: #ee0a24;
  z-index: 1;
}
.Address_asterisk {
  position: absolute;
  top: 38%;
  left: 33%;
  width: 15px;
  height: 15px;
  color: #ee0a24;
  z-index: 1;
}
.weChat_asterisk {
  position: absolute;
  top: 38%;
  left: 27%;
  width: 15px;
  height: 15px;
  color: #ee0a24;
  z-index: 1;
}
.weChat_input_asterisk {
  position: absolute;
  top: 38%;
  left: 23%;
  width: 15px;
  height: 15px;
  color: #ee0a24;
  z-index: 1;
}
.china_asterisk {
  position: absolute;
  top: 38%;
  left: 33%;
  width: 15px;
  height: 15px;
  color: #ee0a24;
  z-index: 1;
}
.City_asterisk {
  position: absolute;
  top: 38%;
  left: 33%;
  width: 15px;
  height: 15px;
  color: #ee0a24;
  z-index: 1;
}
.Visa_asterisk {
  position: absolute;
  top: 38%;
  left: 22%;
  width: 15px;
  height: 15px;
  color: #ee0a24;
  z-index: 1;
}
.Date_asterisk {
  position: absolute;
  top: 38%;
  left: 29%;
  width: 15px;
  height: 15px;
  color: #ee0a24;
  z-index: 1;
}
/deep/ .van-radio--horizontal {
  margin-right: 60px;
}
.china_radio_asterisk {
  position: absolute;
  top: 38%;
  left: 33%;
  width: 15px;
  height: 15px;
  color: #ee0a24;
  z-index: 1;
}
.sex_err_message {
  position: absolute;
  top: 70%;
  right: 12%;
}
.choose_con {
  margin: 50px 0;
  padding-left: 30px;
}
.choose_con p {
  margin-bottom: 15px;
  font-size: 30px;
  color: #666666;
}
.icon_wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  border-bottom: 1px solid #eeeeee;
}
.icon_wrapper img {
  width: 32px;
  height: 32px;
}
.icon_wrapper p {
  margin-left: 15px;
  font-size: 30px;
  color: #666;
}
.Phone_asterisk {
  position: absolute;
  top: 38%;
  left: 31%;
  width: 15px;
  height: 15px;
  color: #ee0a24;
  z-index: 1;
}
.picture_asterisk {
  position: absolute;
  top: 9%;
  left: 45%;
  width: 15px;
  height: 15px;
  color: #ee0a24;
  z-index: 1;
}
.self_wrapper {
  position: relative;
  padding-top: 30px;
  width: 100%;
  height: 442px;
  background: #f8f8f8;
}
.self_inner_content {
  position: relative;
  padding: 30px;
  width: 100%;
  background: rgba(255, 255, 255, 1);
}
.self_inner_content h5 {
  font-size: 28px;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}
.self_textarea {
  margin-top: 30px;
  padding: 30px;
  width: 615px;
  height: 220px;
  background: rgba(248, 248, 248, 1);
  border-radius: 10px;
  resize: none;
  font-size: 28px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 42px;
}
.me_asterisk {
  position: absolute;
  top: 7%;
  left: 33%;
  width: 15px;
  height: 15px;
  color: #ee0a24;
  z-index: 1;
}
.err_school_messages {
  color: #ee0a24;
  font-size: 28px;
  font-weight: 400;
}
</style>
