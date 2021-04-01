<template>
  <div>
    <div class="header">
      <el-button :class="[type == 1 ? 'header_btn_s' : 'header_btn_u']" @click="header_btn_click(1)">面试日程</el-button>
      <el-button :class="[type == 2 ? 'header_btn_s' : 'header_btn_u']" @click="header_btn_click(2)">面试记录</el-button>

      <el-input v-show="type == 1" size="small" v-model="name" placeholder="按姓名搜索" prefix-icon="el-icon-search" style="float: right; width: 180px" @keyup.enter.native="search_name()"></el-input>

      <el-button v-show="type == 2" style="float: right" class="header_btn_s" @click="loglist_click()">确定</el-button>

      <el-date-picker v-show="type == 2" v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="small" style="float: right; margin-right: 20px" value-format="yyyy-MM-dd"></el-date-picker>
    </div>
    <!-- {{ data.isSelected ? '●' : ''}} -->
    <el-row class="el_row" :gutter="20" v-show="type == 1">
      <el-col :span="12">
        <el-calendar id="calendar" v-model="value" style="border-radius: 4px">
          <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
          <template slot="dateCell" slot-scope="{ date, data }">
            <div :class="[data.isSelected ? 'day_content_s' : 'day_content_u']">
              <div :class="[data.isSelected ? 'day_t_s' : 'day_t_u']">
                {{ data.day.split("-").slice(2).join("-") }}
              </div>
              <div v-for="(item, index) in list" :key="index">
                <div v-if="item.time == data.day" :class="[data.isSelected ? 'day_a_s' : 'day_a_u']">
                  ●
                </div>
              </div>
            </div>
          </template>
        </el-calendar>
      </el-col>

      <el-col :span="12" style="overflow: auto; height: 663px" v-if="teach_info_list">
        <div class="teach_card" v-for="(item, index) in teach_info_list" :key="index" v-on:click="detail_click(item)">
          <img v-if="item.photos_path && item.photos_path.length > 0" :src="item.photos_path[0].path" class="teach_card_img" />
          <img class="teach_card_img" v-else :src="
              item.sex == 0
                ? '/static/images/man.png'
                : '/static/images/woman.png'
            " />
          <div class="teach_card_status">
            {{ status_list[item.status + 1] }}
          </div>
          <div class="teach_card_time">{{ item.inte_time }}</div>
          <div class="teach_card_name">{{ item.name }}</div>
          <div class="teach_card_info">
            {{ item.nationality_val }} |
            {{ item.university ? degree[item.university - 1].code : 1 }}
          </div>
          <div style="height: 32px">
            <span class="teach_card_info_2">{{ item.working_seniority | filterWorkingYear }} |
              {{ item.pay_type ? pay_type_list[item.pay_type - 1].code : 1 }}
            </span>
            <el-button class="teach_card_btn" @click.stop="room_click(item)" v-if="item.status == 2 || item.status == 1">进入房间</el-button>
          </div>
        </div>
      </el-col>
    </el-row>

    <div class="details" style="overflow: auto" v-show="type == 2">
      <div class="list" v-infinite-scroll="load" infinite-scroll-disabled="disabled" v-if="log_list">
        <el-row class="list-item" :gutter="20">
          <el-col :span="8" v-for="(item, index) in log_list" :key="index">
            <div class="cell" v-on:click="detail_click(item)">
              <img v-if="item.photos_path && item.photos_path.length > 0" :src="item.photos_path[0].path" class="teach_card_img" />
              <img class="teach_card_img" v-else :src="
                  item.sex == 0
                    ? '/static/images/man.png'
                    : '/static/images/woman.png'
                " />
              <div class="teach_card_status">
                {{ status_list[item.status + 1] }}
              </div>
              <div class="teach_card_time">{{ item.inte_time }}</div>
              <div class="teach_card_name">{{ item.name }}</div>
              <div class="teach_card_info">
                {{ item.nationality_val }} |
                {{ item.university ? degree[item.university - 1].code : 1 }}
              </div>
              <div style="height: 32px">
                <span class="teach_card_info_2">{{ item.working_seniority | filterWorkingYear }} |
                  {{
                    item.pay_type ? pay_type_list1[item.pay_type].code : 1
                  }}
                  </span>
                <el-button class="teach_card_btn" @click.stop="room_click(item)" v-if="item.status == 2 || item.status == 1">进入房间</el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <p class="p_t" v-if="loading">加载中...</p>
      <p class="p_t" v-if="noMore">没有更多了</p>
    </div>

    <el-dialog title="面试记录" :visible.sync="dialogFormVisible">
      <div style="padding: 20px; background-color: #e9eef3" v-if="dialog_list">
        <el-row class="list-item" :gutter="20">
          <el-col :span="12" v-for="(item, index) in dialog_list" :key="index">
            <div class="cell" v-on:click.stop="detail_click(item)">
              <img v-if="item.photos_path && item.photos_path.length > 0" :src="item.photos_path[0].path" class="teach_card_img" />
              <img class="teach_card_img" v-else :src="
                  item.sex == 0
                    ? '/static/images/man.png'
                    : '/static/images/woman.png'
                " />
              <div class="teach_card_status">
                {{ status_list[item.status + 1] }}
              </div>
              <div class="teach_card_time">{{ item.inte_time }}</div>
              <div class="teach_card_name">{{ item.name }}</div>
              <div class="teach_card_info">
                {{ item.nationality_val }} |
                {{ item.university ? degree[item.university - 1].code : 1 }}
              </div>
              <div style="height: 32px">
                <span class="teach_card_info_2">{{ item.working_seniority | filterWorkingYear }} |
                  {{
                    item.pay_type ? pay_type_list[item.pay_type].code : 1
                  }}</span>
                <el-button class="teach_card_btn" @click.stop="room_click(item)" v-if="item.status == 2 || item.status == 1">进入房间</el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <transition name="fade">
      <div class="inter_view_end_mask" v-show="this.interViewEndMask">
        <div class="content" v-show="this.contentMask">
          <div class="teacher_messages" v-if="this.interViewTeacherList != null">
            <img v-if="this.interViewTeacherList.photos_path != null" :src="this.interViewTeacherList.photos_path[0].path" />
            <img class="teach_card_img" v-else :src="
                this.interViewTeacherList.sex == 0
                  ? '/static/images/man.png'
                  : '/static/images/woman.png'
              " />
            <p class="teacher_name">
              {{ this.interViewTeacherList.last_name }}
            </p>
            <p class="country">
              {{ this.interViewTeacherList.nationality_val }} |
              {{
                this.interViewTeacherList.university
                  ? degree[this.interViewTeacherList.university - 1].code
                  : ""
              }}
            </p>
            <p class="price">
              {{
                this.interViewTeacherList.working_seniority | filterWorkingYear
              }}
              |
              {{
                this.interViewTeacherList.pay_type
                  ? pay_type_list[this.interViewTeacherList.pay_type].code
                  : ""
              }}
            </p>
          </div>
          <div class="btn_wrapper">
            <div :class="activeClass == index ? 'actived' : ''" class="btn" v-for="(btn, index) in btnList" :key="index" @click="getItem(btn.id, index)">
              {{ btn.value }}
            </div>
          </div>
        </div>
        <div class="score_wrapper" v-show="this.scoreMask">
          <h5>评价</h5>
          <ul class="score_content">
            <li>
              <div class="lside_title">总体</div>
              <div class="center_content">
                <el-rate v-model="wholeValue" show-text :texts="this.textsList" :colors="this.colorsList"></el-rate>
              </div>
            </li>
            <li>
              <div class="lside_title">形象气质</div>
              <div class="center_content">
                <el-rate v-model="temperamentValue" show-text :texts="this.textsList" :colors="this.colorsList"></el-rate>
              </div>
            </li>
            <li>
              <div class="lside_title">专业技能</div>
              <div class="center_content">
                <el-rate v-model="skillValue" show-text :texts="this.textsList" :colors="this.colorsList"></el-rate>
              </div>
            </li>
            <li>
              <div class="lside_title">沟通表达</div>
              <div class="center_content">
                <el-rate v-model="expressionValue" show-text :texts="this.textsList" :colors="this.colorsList"></el-rate>
              </div>
            </li>
          </ul>
          <el-input style="margin-top: 20px" type="textarea" v-model="companyEvaluate" placeholder="请填写评价" rows="5" resize="none"></el-input>
          <div class="over_btn" @click="submitBtn" :class="
              this.wholeValue == 0 ||
              this.temperamentValue == 0 ||
              this.skillValue == 0 ||
              this.expressionValue == 0
                ? 'disabled_btn'
                : 'over_btn'
            ">
            确定
          </div>
          <p class="tips"><span>*</span>请您点击上方星对本次面试进行评价</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script src="./inerview.js"></script>
<style src="./inerview.css" scoped></style>
