<!--  -->
<template>
  <div class="wrapper">
    <div class="top_div">
      <div class="clearfix">
        <img
          src="../../assets/image/rili.png"
          class="calendar_img fl"
          v-on:click="rili_click()"
        />

        <ul class="list_title clearfix fl">
          <li
            v-for="(list, index) in titleList"
            :key="index"
            :class="activeClass == index ? 'actived' : ''"
            @click="getItem(index, list.id)"
          >
            {{ list.name }}
          </li>
        </ul>
      </div>

      <div style="margin-top: 20px">
        <el-input
          v-model="queryList.company_name"
          placeholder="机构名称"
        ></el-input>
        <el-input
          v-model="queryList.teach_name"
          placeholder="外教姓名"
          style="margin-left: 20px"
        ></el-input>
      </div>

      <div style="margin-top: 20px">
        <el-button class="search_btn" @click="handleClickQuery">查询</el-button>
        <el-button class="reset_btn" @click="handleClickReset">重置</el-button>
      </div>
    </div>

    <div
      style="
        width: 100%;
        margin-top: 20px;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        padding: 4px;
      "
    >
      <el-table :data="tableData" style="padding: 0 20px">
        <el-table-column fixed="left" label="序号" width="80">
          <template slot-scope="scope">
            {{ scope.$index + (queryList.page - 1) * queryList.pageSize + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          fixed="left"
          prop="company_name"
          label="机构名称"
          width="150"
          @click="companyOnclick"
        ></el-table-column>

        <el-table-column label="外教姓名" width="150"
          ><template slot-scope="scope" @click="teachOnclick">
            {{ scope.row.name + " " + scope.row.last_name }}
          </template></el-table-column
        >
        <el-table-column
          prop="nationality_val"
          label="外教国籍"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="inte_time"
          label="预约时间"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="created_at"
          label="申请时间"
          width="200"
        ></el-table-column>
        <el-table-column label="状态" width="120">
          <template slot-scope="scope" width="120">
            <i
              :class="addClassState(scope.row.status)"
              v-if="scope.row.up_flg == 1"
              >已变更</i
            >
            <i :class="addClassState(scope.row.status)" v-else>{{
              scope.row.status | interViewState
            }}</i>
          </template>
        </el-table-column>
        <el-table-column
          prop="company_advier[0].name"
          label="顾问"
          width="120"
        ></el-table-column>
        <el-table-column fixed="right" prop="zip" label="直播间" width="120">
          <template slot-scope="scope">
            <el-button
              v-show="scope.row.status == 1 || scope.row.status == 2"
              @click.native.prevent="room_click(scope.row)"
              type="text"
              size="small"
              >进入房间</el-button
            >
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="220">
          <template slot-scope="scope">
            <!-- <el-button
              v-show="scope.row.status == 0"
              @click.native.prevent="handleClickJoin(scope.row.id)"
              type="text"
              size="small"
              >参加</el-button
            >
            <el-button
              v-show="scope.row.status == 0"
              @click.native.prevent="
                handleClickNoParticipation(scope.row.id, scope.$index)
              "
              type="text"
              size="small"
              >不参加</el-button
            >
            <el-button
              @click.native.prevent="
                handleClickChange(scope.row.id, scope.$index)
              "
              type="text"
              size="small"
              >变更</el-button
            > -->
            <el-button
              v-show="scope.row.status == 3"
              @click.native.prevent="sign(scope.row)"
              type="text"
              size="small"
              >立即签约</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="进度记录" width="120">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="handleClickLook(scope.row.id)"
              type="text"
              size="small"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination_div">
        <page
          :count="count"
          :currentPage="queryList.page"
          v-if="this.count > 0"
          @activePage="activePage"
        ></page>
      </div>
    </div>

    <transition name="fade">
      <div class="interView_mask" v-show="this.interViewMask">
        <div class="content_center">
          <h5>您确定拒绝此面试？</h5>
          <div class="details">
            <p class="with_who">
              {{ this.companyName }}与外教{{ this.lastName }}面试
            </p>
            <p class="date_time">面试时间：{{ this.inteTime }}</p>
          </div>
          <div class="btn">
            <div class="submit_btn" @click="submitBtn">确定</div>
            <div class="cancel_btn" @click="interViewMask = false">取消</div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div class="interView_mask" v-show="this.progressCheckMask">
        <div
          class="content_center"
          style="
            padding: 40px;
            width: 400px;
            height: 374px;
            position: relative;
            overflow-y: scroll;
          "
        >
          <i
            class="el-icon-close close_btn"
            @click="progressCheckMask = false"
          ></i>
          <el-timeline :reverse="reverse">
            <el-timeline-item
              style="height: 110px; position: relative"
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
    <transition name="fade">
      <div class="interView_mask" v-show="this.changeOfTime">
        <div class="content_center">
          <h5>{{ this.companyName }}与外教{{ this.lastName }}面试</h5>
          <div class="details">
            <p class="date_time">面试时间：{{ this.inteTime }}</p>
            <div class="block clearfix" style="margin-top: 44px">
              <p class="date_time fl">变更时间：</p>
              <el-date-picker
                :picker-options="pickerOptions"
                v-model="dateTimeValue"
                type="datetime"
                placeholder="选择日期时间"
                class="fl"
                value-format="yyyy-MM-dd HH:mm:ss"
                @change="dateChange"
              ></el-date-picker>
            </div>
          </div>
          <div class="btn">
            <div class="submit_btn" @click="changeOfTimeBtn">确定</div>
            <div class="cancel_btn" @click="changeOfTime = false">取消</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script src="./interviewList.js"></script>
<style src="./interViewList.css" scoped></style>
