<template>
  <div>
    <div class="status_div">
      <div
        v-for="(item, index) in status_list"
        :key="index"
        class="status_list"
        @click="status_click(index)"
        :style="{marginLeft: index == 0 ? 20 + 'px' : 40 + 'px'}"
      >
        <div :class="[status_select == index ? 'status_name_select' : 'status_name']">{{item}}</div>
        <div class="status_line" v-show="status_select == index"></div>
      </div>
    </div>

    <div class="search_div mt_20">
      <el-row :gutter="40">
        <el-col :span="8">
          <div class="t1">签约标题：</div>
          <el-input class="i1" v-model="title"></el-input>
        </el-col>

        <el-col :span="8">
          <div class="t1">发起时间：</div>
          <div class="i1">
            <el-date-picker
              v-model="date"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
        </el-col>
      </el-row>

      <div style="margin-top:20px">
        <el-button class="b1" @click="search">查询</el-button>
        <el-button class="b2" @click="reset">重置</el-button>
      </div>
    </div>

    <div class="mt_20">
      <div class="data_title">
        <span class="t">已选中</span>
        <span class="n">1</span>
        <span class="t">条数据</span>
        <span class="l">&nbsp|&nbsp</span>
        <span class="d" @click="download">下载</span>
      </div>
    </div>
  </div>
</template>

<script src="./contract.js"></script>
<style src="./contract.css" scoped></style>
