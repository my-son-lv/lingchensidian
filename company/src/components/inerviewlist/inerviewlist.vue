<template>
  <div>
    <div class="header">
      <el-button
        :class="[search.status == 0 ? 'header_btn_s' : 'header_btn_u']"
        @click="header_btn_click(0)"
        >全部</el-button
      >
      <el-button
        :class="[search.status == 1 ? 'header_btn_s' : 'header_btn_u']"
        @click="header_btn_click(1)"
        >已约面</el-button
      >
      <el-button
        :class="[search.status == 2 ? 'header_btn_s' : 'header_btn_u']"
        @click="header_btn_click(2)"
        >待面试</el-button
      >
      <el-button
        :class="[search.status == 4 ? 'header_btn_s' : 'header_btn_u']"
        @click="header_btn_click(4)"
        >待签约</el-button
      >
      <el-button
        :class="[search.status == 5 ? 'header_btn_s' : 'header_btn_u']"
        @click="header_btn_click(5)"
        >已录用</el-button
      >
      <el-button
        :class="[search.status == 6 ? 'header_btn_s' : 'header_btn_u']"
        @click="header_btn_click(6)"
        >未通过</el-button
      >
      <el-button
        :class="[search.status == 7 ? 'header_btn_s' : 'header_btn_u']"
        @click="header_btn_click(7)"
        >已结束</el-button
      >
    </div>

    <div class="details" style="overflow: auto" v-if="list.length > 0">
      <div v-infinite-scroll="load" infinite-scroll-disabled="disabled">
        <el-row class="row" v-for="(item, index) in list" :key="index">
          <div class="row_div" v-on:click="cell_click(item, 0)">
            <el-col :span="12">
              <img
                class="row_icon"
                v-if="item.photos_path && item.photos_path.length > 0"
                :src="item.photos_path[0].path"
              />
              <img
                class="row_icon"
                v-else
                :src="
                  item.sex == 0
                    ? '/static/images/man.png'
                    : '/static/images/woman.png'
                "
              />
              <span class="t1">{{ item.name }} {{ item.last_name }}</span>
              <span :class="classObject(item)">{{
                status_list[item.status + 1]
              }}</span>
              <div class="t2">{{ get_row_detail(item) }}</div>
            </el-col>

            <el-col :span="7">
              <div class="t3">预约时间：</div>
              <div class="t2">{{ item.inte_time }}</div>
            </el-col>

            <el-col :span="5">
              <el-button class="btn_1" @click="cell_click(item, 3)"
                >查看进度</el-button
              >
              <el-button
                v-show="item.status == 0"
                class="btn"
                type="text"
                @click="cell_click(item, 2)"
                >取消</el-button
              >
              <el-button
                v-show="item.status == 0"
                class="btn"
                type="text"
                @click="cell_click(item, 1)"
                >编辑</el-button
              >
            </el-col>
          </div>
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

    <el-dialog
      title="查看面试进度"
      :visible.sync="dialogVisible"
      width="50%"
      class="dialog_t1"
    >
      <el-timeline>
        <el-timeline-item
          class="dialog_t3"
          :timestamp="'面试时间： ' + item.interview.inte_time"
          placement="top"
          v-for="(item, index) in interview_speed_list"
          :key="index"
        >
          <el-card style="margin-top: 20px">
            <h4 class="dialog_t3">{{ item.info }}</h4>
            <p class="dialog_t2">记录时间：{{ item.created_at }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-dialog>

    <el-dialog
      title="修改面试时间"
      :visible.sync="job_update_dialogVisible"
      width="50%"
      class="dialog_t1"
    >
      <div class="height: 25px">
        <div class="dialog_s">面试时间</div>
        <div class="dialog_m">{{ current_item.inte_time }}</div>
      </div>
      <div style="margin-top: 50px; height: 45px">
        <div class="dialog_s">修改时间</div>
        <el-date-picker
          class="dialog_m"
          style="width: 40%"
          v-model="time"
          type="datetime"
          placeholder="选择日期时间"
          default-time="12:00:00"
          format="yyyy-MM-dd HH:mm"
          value-format="yyyy-MM-dd HH:mm"
        ></el-date-picker>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="job_update_dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="job_update_click()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="./inerviewlist.js"></script>
<style src="./inerviewlist.css" scoped></style>
