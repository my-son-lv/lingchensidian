<template>
  <div class="content_c">
    <div class="top_div">
      <div class="header">
        <img src="../../assets/image/3.png" class="header_img" v-on:click="rili_click()" />

        <el-button
          :class="[type == 1 ? 'header_btn_s' : 'header_btn_u']"
          @click="header_btn_click(1)"
          style="margin-left: 20px"
        >面试日程</el-button>
        <el-button
          :class="[type == 2 ? 'header_btn_s' : 'header_btn_u']"
          style="margin-left: 20px"
          @click="header_btn_click(2)"
        >面试记录</el-button>

        <el-input
          v-show="type == 1"
          size="small"
          v-model="search.company_name"
          placeholder="企业名称"
          style="float: left; width: 180px; margin-left: 80px"
        ></el-input>

        <el-input
          v-show="type == 1"
          size="small"
          v-model="search.name"
          placeholder="外教姓名"
          style="float: left; width: 180px; margin-left: 40px"
        ></el-input>

        <el-button
          v-show="type == 1"
          class="header_btn_s"
          style="margin-left: 40px"
          @click="search_daylist()"
        >查询</el-button>

        <el-date-picker
          v-show="type == 2"
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="small"
          style="float: left; margin-left: 80px; "
          value-format="yyyy-MM-dd"
        ></el-date-picker>

        <el-button
          v-show="type == 2"
          style="float: left; margin-left: 40px; "
          class="header_btn_s"
          @click="loglist_click()"
        >确定</el-button>

        <el-button class="header_btn_u" style="margin-left: 20px" @click="reset()">重置</el-button>
      </div>
    </div>

    <!-- {{ data.isSelected ? '●' : ''}} -->
    <el-row class="el_row" :gutter="20" v-show="type == 1">
      <el-col :span="12">
        <el-calendar
          id="calendar"
          v-model="value"
          style="border-radius: 4px; border:1px solid rgba(221,221,221,1);"
        >
          <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
          <template slot="dateCell" slot-scope="{date, data}">
            <div :class="[data.isSelected ? 'day_content_s' : 'day_content_u']">
              <div
                :class="[data.isSelected ? 'day_t_s' : 'day_t_u']"
              >{{ data.day.split('-').slice(2).join('-') }}</div>
              <div v-for="(item, index) in list" :key="index">
                <div
                  v-if="item.time == data.day"
                  :class="[data.isSelected ? 'day_a_s' : 'day_a_u']"
                >●</div>
              </div>
            </div>
          </template>
        </el-calendar>
      </el-col>

      <el-col :span="12" style="overflow: auto; height: 663px;">
        <div class="teach_card" v-for="(item, index) in teach_info_list" :key="index">
          <div style="margin-top: 20px; margin-left: 20px">
            <span class="teach_card_time">{{item.inte_time}}</span>
            <span class="teach_card_status">{{status_list[item.status + 1]}}</span>
          </div>

          <el-row class="el_row" :gutter="20" style="padding-left: 20px; padding-right: 20px">
            <el-col :span="12">
              <div class="teach_card_content">
                <img
                  v-if="item.logo_path && item.logo_path.length > 0"
                  :src="(item.logo_path && item.logo_path.length > 0) ? item.logo_path[0].path : ''"
                  class="teach_card_img"
                />

                <img
                  v-if="!(item.logo_path && item.logo_path.length > 0)"
                  src="../../assets/image/company_logo.png"
                  class="teach_card_img"
                />

                <div class="teach_card_name">{{item.company_name}}</div>
              </div>
            </el-col>

            <el-col :span="12">
              <div class="teach_card_content">
                <img :src="item.photos_path[0].path" class="teach_card_img" />
                <div class="teach_card_name">{{item.name}}</div>
                <div
                  class="teach_card_info"
                >{{item.nationality_val}} | {{ item.university ? degree[item.university - 1].code : 1}}</div>
                <div style="height: 32px;">
                  <span
                    class="teach_card_info_2"
                  >{{item.working_seniority ? working_seniority_list[item.working_seniority - 1].code : ''}} | {{item.pay_type ? pay_type_list[item.pay_type].code : 1}}</span>
                </div>
              </div>
            </el-col>

            <el-button
              class="teach_card_btn"
              @click="room_click(item)"
              v-if="item.status == 2 || item.status == 1"
            >进入房间</el-button>
            <div class="teach_card_advier">顾问: {{get_company_advier(item.company_advier)}}</div>
          </el-row>
        </div>
      </el-col>
    </el-row>

    <div
      style="width: 100%; margin-top: 20px; background:rgba(255,255,255,1);border-radius: 4px; padding: 4px"
      v-show="type == 2"
    >
      <div class="details" style="overflow: auto;">
        <div class="list" v-infinite-scroll="load" infinite-scroll-disabled="disabled">
          <el-row class="list-item" :gutter="20">
            <el-col
              :span="12"
              v-for="(item, index) in log_list"
              :key="index"
              style="margin-bottom: 20px"
            >
              <div style="border-radius: 4px; border:1px solid rgba(221,221,221,1);">
                <div style="margin-top: 20px; margin-left: 20px">
                  <span class="teach_card_time">{{item.inte_time}}</span>
                  <span class="teach_card_status">{{status_list[item.status + 1]}}</span>
                </div>

                <el-row
                  class="el_row"
                  :gutter="20"
                  style="padding-left: 20px; padding-right: 20px;"
                >
                  <el-col :span="12">
                    <div class="teach_card_content">
                      <img
                        v-if="item.logo_path && item.logo_path.length > 0"
                        :src="(item.logo_path && item.logo_path.length > 0) ? item.logo_path[0].path : ''"
                        class="teach_card_img"
                      />

                      <img
                        v-if="!(item.logo_path && item.logo_path.length > 0)"
                        src="../../assets/image/company_logo.png"
                        class="teach_card_img"
                      />
                      <div class="teach_card_name">{{item.company_name}}</div>
                    </div>
                  </el-col>

                  <el-col :span="12">
                    <div class="teach_card_content">
                      <img :src="item.photos_path[0].path" class="teach_card_img" />
                      <div class="teach_card_name">{{item.name}}</div>
                      <div
                        class="teach_card_info"
                      >{{item.nationality_val}} | {{ item.university ? degree[item.university - 1].code : 1}}</div>
                      <div style="height: 32px;">
                        <span
                          class="teach_card_info_2"
                        >{{working_seniority_list[item.working_seniority - 1].code}} | {{item.pay_type ? pay_type_list[item.pay_type].code : 1}}</span>
                      </div>
                    </div>
                  </el-col>

                  <el-button
                    class="teach_card_btn"
                    @click="room_click(item)"
                    v-if="item.status == 2 || item.status == 1"
                  >进入房间</el-button>
                  <div
                    class="teach_card_advier"
                    style="margin-bottom: 20px"
                  >顾问: {{get_company_advier(item.company_advier)}}</div>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </div>
        <p class="p_t" v-if="loading">加载中...</p>
        <p class="p_t" v-if="noMore">没有更多了</p>
      </div>
    </div>

    <el-dialog title="面试记录" :visible.sync="dialogFormVisible">
      <div style="padding: 20px; background-color: #E9EEF3">
        <el-row class="list-item" :gutter="20">
          <el-col :span="12" v-for="(item, index) in dialog_list" :key="index">
            <div class="cell" v-on:click="detail_click(item)">
              <img
                :src="(item.photos_path && item.photos_path.length > 0) ? item.photos_path[0].path : ''"
                class="teach_card_img"
              />
              <div class="teach_card_status">{{status_list[item.status + 1]}}</div>
              <div class="teach_card_time">{{item.inte_time}}</div>
              <div class="teach_card_name">{{item.name}}</div>
              <div
                class="teach_card_info"
              >{{item.nationality_val}} | {{ item.university ? degree[item.university - 1].code : 1}}</div>
              <div style="height: 32px;">
                <span
                  class="teach_card_info_2"
                >{{working_seniority_list[item.working_seniority - 1].code}} | {{item.pay_type ? pay_type_list[item.pay_type].code : 1}}</span>
                <el-button
                  class="teach_card_btn"
                  @click="room_click(item)"
                  v-if="item.status == 2 || item.status == 1"
                >进入房间</el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script src="./interview.js"></script>
<style src="./interview.css" scoped></style>
