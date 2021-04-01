<!-- 人才管理 -->
<template>
  <div class="content_c" style="padding-left: 4%; padding-right: 2%; padding-top: 1px; padding-bottom: -1px;">
    <div style="margin-top: 40px;position: relative;" class="clearfix">
      <el-select v-model="id" placeholder="请选择" @change="select_change" class="fl">
        <el-option v-for="item in company_list" :key="item.id" :label="item.company_name" :value="item.id">{{item.company_name}}</el-option>
      </el-select>
      <div class="btn_wrapper fr" @click="handleClickAdd">添加</div>
    </div>

    <el-table :data="list" style="width: 100%; margin-top: 3%; background:rgba(255,255,255,1); height: 60%" max-height="400" @row-click="check">
      <el-table-column label="序号" width="50" type="index"></el-table-column>
      <el-table-column prop="name" label="岗位名称"></el-table-column>
      <el-table-column prop="job_city_data.merger_name" label="工作城市"></el-table-column>
      <el-table-column label="薪资">
        <template slot-scope="scope">
          {{scope.row.pay.split(',').join('-')}}K
        </template>
      </el-table-column>
      <el-table-column label="学历要求">
        <template slot-scope="scope">
          {{edu_type[scope.row.edu_type - 1]}}
        </template>
      </el-table-column>
      <el-table-column prop="" label="时间">
        <template slot-scope="scope">
          {{scope.row.updated_at.slice(0, 10)}}
        </template>
      </el-table-column>
      <el-table-column prop="memo" label="备注"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          {{scope.row.status == 1 ? '打开' : '关闭' }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button type="text" @click.stop="handleClickClose(scope.row)" v-if="scope.row.status == 1">关闭</el-button>
          <el-button type="text" @click.stop="handleClickOpen(scope.row)" v-else>打开</el-button>
          <el-button type="text" @click.stop="handleClickEdit(scope.row)">编辑</el-button>
          <el-button type="text" @click.stop="handleClickDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination layout="prev, pager, next" :page-count="count" @current-change="handleCurrentChange" style="margin-top:10px"></el-pagination>
  </div>
</template>

<script src="./joblist.js"></script>
<style src="./joblist.css" scoped></style>