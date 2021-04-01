<template>
  <div class="content_c">
    <div class="top_div">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="t1">公司名称</div>
          <el-input class="i1" v-model="check_info.company_name"></el-input>
        </el-col>

        <el-col :span="6">
          <div class="t1">状态</div>
          <el-select v-model="check_info.status" placeholder="请选择" class="i1">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <div style="margin-top: 20px">
        <el-button class="b1" @click="search">查询</el-button>
        <el-button class="b2" @click="reset">重置</el-button>
      </div>
    </div>

    <div
      style="width: 100%; margin-top: 20px; background:rgba(255,255,255,1);border-radius: 4px; padding: 4px"
    >
      <el-table :data="list" style="padding: 0 20px;" @row-click="checkElTable">
        <el-table-column fixed="left" label="序号" width="50">
          <template
            slot-scope="scope"
          >{{ scope.$index + (check_info.page - 1) * check_info.pageSize + 1 }}</template>
        </el-table-column>
        <el-table-column fixed="left" prop="company_name" label="机构名称" ></el-table-column>
        <el-table-column prop="phone" label="联系电话" width="150"></el-table-column>
        <!-- <el-table-column
          prop="type"
          :formatter="typeFormat"
          label="机构类型"
          width="100"
        ></el-table-column>-->
        <el-table-column prop="city_name.merger_name" label="办公地址" ></el-table-column>
        <el-table-column prop="talent" :formatter="talentFormat" label="办学资质" ></el-table-column>
        <el-table-column prop="created_at" label="注册时间" width="180"></el-table-column>
        <el-table-column prop="status" :formatter="statusFormat" label="状态" width="80"></el-table-column>
        <el-table-column
          prop="memo"
          label="备注"
          width="180"
        ></el-table-column>

        <el-table-column  label="操作" width="210">
          <template slot-scope="scope">
            <el-button class="btn_2" type="text" v-if="scope.row.status == 0" @click.stop="memoSet(scope.row,scope.$index)">备注</el-button>
            <el-button class="btn_2" type="text" @click.stop="check(scope.$index, scope.row)">详情</el-button>
            <el-button
              class="btn_2"
              type="text"
              v-if="scope.row.status == 1"
              @click.stop="pass(scope.$index, scope.row)"
            >审核通过</el-button>
            <el-button
              class="btn_2"
              type="text"
              v-if="scope.row.job"
              @click.stop="job_desc(scope.$index, scope.row)"
            >招聘需求</el-button>
            <el-button
              class="btn_2"
              type="text"
              @click.stop="check_record(scope.$index, scope.row)"
            >操作日志</el-button>
          </template>
        </el-table-column>

        <!-- <el-table-column fixed="right" width="80" label>
          <template slot-scope="scope">
            <el-button
              class="btn_2"
              type="text"
              @click.stop="check_record(scope.$index, scope.row)"
            >操作日志</el-button>
          </template>
        </el-table-column> -->
      </el-table>

      <!-- <div class="pagination_div">
        <el-pagination layout="prev, pager, next" :page-count="count" @current-change="handleCurrentChange" style=" position: absolute; right: 20px;" class="ct"></el-pagination>
      </div>-->
      <page
        :count="count"
        :currentPage="check_info.page"
        v-if="this.count > 0"
        @activePage="activePage"
      ></page>
    </div>

    <!-- <el-dialog title="操作日志（Operation record）" :visible.sync="dialogTableVisible">
      <el-table :data="gridData" height="400px">
        <el-table-column property="admin_name" label="操作人" width="150"></el-table-column>
        <el-table-column property="created_at" label="操作时间" width="200"></el-table-column>
        <el-table-column property="operation" label="动作"></el-table-column>
      </el-table>
    </el-dialog> -->
    <el-dialog :visible.sync="dialogTimeLine" width="30%">
      <div class="block" style="height: 400px; overflow-y: scroll">
        <el-timeline>
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :color="timelineColor"
          >
            {{ activity.info }}
            <div class="creat_time">{{ activity.created_at }}</div>
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-dialog>
  </div>
</template>

<script src="./companychecklist.js"></script>
<style src="./companychecklist.css" scoped></style>
