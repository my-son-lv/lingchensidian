<template>
  <div>
    <div class="search_div mt_20">
      <el-row :gutter="40">
        <el-col :span="8">
          <div class="t1">机构名称</div>
          <el-input class="i1" v-model="check_info.company_name"></el-input>
        </el-col>

        <el-col :span="8">
          <div class="t1">外教姓名</div>
          <el-input class="i1" v-model="check_info.name"></el-input>
        </el-col>
      </el-row>

      <div style="margin-top:20px">
        <el-button class="b1" @click="search">查询</el-button>
        <el-button class="b2" @click="reset">重置</el-button>
      </div>
    </div>

    <div
      style="width: 100%; margin-top: 20px; background:rgba(255,255,255,1);  border-radius: 4px; padding: 4px"
    >
      <el-table :data="list" style="padding: 0 20px">
        <el-table-column fixed="left" label="序号" width="80">
          <template slot-scope="scope">
            {{ scope.$index + (check_info.page - 1) * check_info.pageSize + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="company_name" label="机构名称"></el-table-column>
        <el-table-column
          label="外教姓名"
          width="150"
          :formatter="teach_name_format"
        ></el-table-column>
        <el-table-column
          prop="nationality_val"
          label="外教国籍"
        ></el-table-column>
        <el-table-column
          prop="company_advier"
          label="顾问"
          :formatter="gw_flgFormat"
        ></el-table-column>
        <el-table-column fixed="right" prop="a_name" label="操作">
          <template slot-scope="scope">
            <el-button class="btn_2" type="text" @click="sign_click(scope.row)"
              >立即签约</el-button
            >
          </template>
        </el-table-column>
        <el-table-column fixed="right" prop="a_name" label="进度记录">
          <template slot-scope="scope">
            <el-button
              class="btn_2"
              type="text"
              @click.native.prevent="handleClickLook(scope.row.id)"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination_div">
        <page
          :count="count"
          :currentPage="check_info.page"
          v-if="this.count > 0"
          @activePage="activePage"
        ></page>
      </div>
    </div>

    <transition name="fade">
      <div class="interView_mask" v-show="this.progressCheckMask">
        <div
          class="content_center"
          style="padding:40px; width:400px;height:374px;position: relative;overflow-y: scroll;"
        >
          <i
            class="el-icon-close close_btn"
            @click="progressCheckMask = false"
          ></i>
          <el-timeline :reverse="reverse">
            <el-timeline-item
              style="height:110px;position: relative;"
              v-for="(activity, index) in activities"
              :key="index"
              :timestamp="activity.time"
              :color="activity.color"
            >
              {{ activity.info }}
              <div class="operation_time">{{ activity.created_at }}</div>
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
    </transition>
  </div>
</template>

<script src="./signawait.js"></script>
<style src="./signawait.css" scoped></style>
