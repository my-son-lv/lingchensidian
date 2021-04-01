<!-- 人才管理 -->
<template>
  <div class="wrapper">
    <el-col class="slect_wrapper">
      <el-select v-model="check_info" placeholder="请选择" clearable @change="valueChange">
        <el-option
          style="padding:0 10px;"
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-col>
    <ul class="list_title clearfix">
      <li
        v-for="(list ,index) in titleList "
        :key="index"
        :class="activeClass == index ? 'actived':''"
        @click="getItem(index,list.id)"
      >{{list.name}}</li>
    </ul>
    <el-table :data="tableData" style="width: 100%;padding:0 20px;" align="center">
      <el-table-column label="序号" type="index" width="80"></el-table-column>
      <el-table-column prop="company_name" label="公司名称"></el-table-column>
      <el-table-column prop="name" label="外教姓名"></el-table-column>
      <el-table-column label="照片">
        <template slot-scope="scope">
          <img :src="scope.row.photos_path[0].path" class="list_photos" />
        </template>
      </el-table-column>
      <el-table-column prop="nationality_val" label="国籍"></el-table-column>
      <el-table-column prop="working_seniority" label="工作年限" :formatter="working_seniority_Format"></el-table-column>
      <el-table-column v-if="this.type != 1" prop="created_at" label="预约时间" width="220"></el-table-column>
      <el-table-column label="状态" v-if="this.type != 1">
        <template slot-scope="scope">
          <i :class="addClassState(scope.row.status)">{{ scope.row.status | filterState}}</i>
        </template>
      </el-table-column>
      <el-table-column label="状态" v-else>
        <template>
          <i>收藏/候选人管理</i>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :page-count="count"
      @current-change="handleCurrentChange"
      style="margin-top:10px"
    ></el-pagination>
  </div>
</template>

<script src="./talentManagement.js"></script>
<style src="./talentManagement.css" scoped></style>