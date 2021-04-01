<template>
  <div>
    <div class="header">
      <el-button
        :class="[search.type == 1 ? 'header_btn_s' : 'header_btn_u']"
        @click="header_btn_click(1)"
        >收藏</el-button
      >
      <el-button
        :class="[search.type == 2 ? 'header_btn_s' : 'header_btn_u']"
        @click="header_btn_click(2)"
        >备选</el-button
      >
      <!-- <el-button
        :class="[search.type == 3 ? 'header_btn_s' : 'header_btn_u']"
        @click="header_btn_click(3)"
      >最新</el-button>-->

      <div class="pay">
        <div class="s1">薪资</div>
        <el-select
          v-model="search.pay_type"
          placeholder="全部"
          size="small"
          class="select_pay"
          @change="pay_type_change"
        >
          <el-option
            v-for="item in pay_type_list"
            :key="item.id"
            :label="item.code"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>

      <div class="nationality">
        <div class="s1">国籍</div>
        <el-select
          v-model="search.language_flg"
          placeholder="全部"
          @change="select1_change"
          size="small"
          style="width: 120px"
        >
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>

        <el-select
          style="width: 120px; float: right"
          v-model="search.nationality"
          placeholder="全部"
          size="small"
          no-data-text="请先选择左侧."
          @change="select2_change"
        >
          <el-option
            v-for="item in options2"
            :key="item.id"
            :label="item.code"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
    </div>

    <div class="details" style="overflow: auto" v-if="list.length > 0">
      <div
        class="list"
        v-infinite-scroll="load"
        infinite-scroll-disabled="disabled"
      >
        <el-row class="list-item" :gutter="20">
          <el-col :span="8" v-for="(item, index) in list" :key="index">
            <div class="cell">
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
              <div class="user_name ">{{ item.name }}</div>
              </div>
              <div class="user_info">
                {{ item.nationality_val }} |
                {{ item.university ? degree[item.university - 1].code : 1 }}
              </div>
              <div class="user_info">
                {{ item.working_seniority | filterWorkingYear }} |
                {{ get_pay(item.pay_type) }}
              </div>
              <div class="user_bottom">
                <!-- <div class="left">热度:{{item.hot}}</div> -->
                <el-button class="right" @click="detail_click(item)"
                  >详情</el-button
                >
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <p class="p_t" v-if="loading">加载中...</p>
      <p class="p_t" v-if="noMore">没有更多了</p>
    </div>

    <div v-else style="text-align: center; margin-top: 150px">
      <img
        src="../../assets/image/nodata.png"
        style="width: 281px; height: 216px"
      />
      <div
        style="
          font-size: 18px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          letter-spacing: 1px;
        "
      >
        暂无数据
      </div>
    </div>
  </div>
</template>

<script src="./collectlist.js"></script>
<style src="./collectlist.css" scoped></style>

