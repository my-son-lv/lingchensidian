
<template>
  <div>
    <div class="header">
      <el-button
        :class="[this.select_type == 1 ? 'header_btn_s' : 'header_btn_u']"
        @click="header_btn_click(1)"
      >投递简历</el-button>
      <el-button
        :class="[this.select_type == 2 ? 'header_btn_s' : 'header_btn_u']"
        @click="header_btn_click(2)"
      >下载简历</el-button>

      <div class="pay" v-show="this.select_type == 1">
        <div class="s1"></div>
        <el-select
          v-model="search.type"
          placeholder="全部"
          size="small"
          class="select_pay"
          @change="type_change"
        >
          <el-option key label="全部" value>全部</el-option>
          <el-option v-for="item in job_list" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </div>
    </div>

    <div class="details" style="overflow: auto" v-if="resume_list.length > 0">
      <div class="list" v-infinite-scroll="load" infinite-scroll-disabled="disabled">
        <el-row class="list-item" :gutter="20">
          <el-col :span="8" v-for="(item, index) in resume_list" :key="index">
            <div class="cell">
              <div class="clearfix">
                <div class="job_name fl">{{ item.job_name }}</div>
                <div class="creat_time fl">{{ item.created_at }}</div>
              </div>

              <div class="clearfix">
                <img
                  class="user_head fl"
                  v-if="item.photos_path && item.photos_path.length > 0"
                  :src="item.photos_path[0].path"
                />
                <img
                  class="user_head fl"
                  v-else
                  :src="
                    item.sex == 0
                      ? '/static/images/man.png'
                      : '/static/images/woman.png'
                  "
                />
                <!-- src="../../assets/logo.png" -->
                <div class="user_name">{{ item.name }}</div>
              </div>
              <div class="user_info">
                {{ item.nationality_val }} |
                {{
                item.nationality_val ? degree[item.university - 1].code : 1
                }}
              </div>
              <div class="user_info">
                {{ item.working_seniority | filterWorkingYear }} |
                {{ get_pay(item.pay_type) }}
              </div>
              <div class="user_bottom">
                <img
                  src="../../assets/image/youxuan_icon.png"
                  v-if="item.category == 2"
                  class="good_icon"
                />
                <el-button
                  class="right"
                  :style=" select_type ==1 ?  'float:left;' : '' "
                  @click="detail_click(item)"
                >详情</el-button>

                <el-button
                  class="right"
                  v-if="select_type == 1 && item.result == 1"
                  @click.stop="buheshi(item.job_app_id,index)"
                  style="color:white;background:rgb(197 197 197);border:none;"
                >不合适</el-button>
                <el-button
                  class="right"
                  v-if="select_type == 1 && item.result == 1"
                  @click.stop="keyiliao"
                >可以聊</el-button>

                <div v-if="select_type == 1 && item.result == 3" class="right yitaotai">已淘汰</div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <p class="p_t" v-if="loading">加载中...</p>
      <p class="p_t" v-if="noMore">没有更多了</p>
    </div>

    <div v-else style="text-align: center; margin-top: 150px">
      <img src="../../assets/image/nodata.png" style="width: 281px; height: 216px" />
      <div
        style="
          font-size: 18px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          letter-spacing: 1px;
        "
      >暂无数据</div>
    </div>
  </div>
</template>

<script src="./resumelist.js"></script>
<style src="./resumelist.css" scoped></style>

