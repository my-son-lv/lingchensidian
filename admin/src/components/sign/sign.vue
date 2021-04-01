<template>
  <div>
    <el-button class="sign_btn" @click="sign_click">发起签约</el-button>

    <div class="status_div">
      <div
        v-for="(item, index) in status_list"
        :key="index"
        class="status_list"
        @click="status_click(index, item.status)"
        :style="{ marginLeft: index == 0 ? 20 + 'px' : 40 + 'px' }"
      >
        <div
          :class="[
            status_select == index ? 'status_name_select' : 'status_name'
          ]"
        >
          {{ item.name }}
        </div>
        <div class="status_line" v-show="status_select == index"></div>
      </div>
    </div>

    <div class="search_div mt_20">
      <el-row :gutter="40">
        <el-col :span="8">
          <div class="t1">签约标题：</div>
          <el-input class="i1" v-model="check_info.name"></el-input>
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

      <div
        style="width: 100%; margin-top: 20px; background:rgba(255,255,255,1);  border-radius: 4px; padding: 4px"
      >
        <el-table :data="list" style="padding: 0 20px">
          <el-table-column
            fixed="left"
            prop="name"
            label="签约标题"
          ></el-table-column>
          <el-table-column label="签约类型">
            <template slot-scope="scope">
              {{ typeList[scope.row.contract_id - 1] }}
            </template>
          </el-table-column>
          <el-table-column prop="company_name" label="企业"></el-table-column>
          <el-table-column prop="a_name" label="发起人"></el-table-column>
          <el-table-column prop="b_name" label="签署方">
            <template slot-scope="scope">
              <div>{{ scope.row.b_name }} | {{ scope.row.b_company_name }}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            :formatter="get_status"
          ></el-table-column>
          <el-table-column prop="created_at" label="时间">
            <template slot-scope="scope">
              <div>发起时间：{{ scope.row.start_date }}</div>
              <div>截止时间：{{ scope.row.end_time }}</div>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.status == 1"
                class="btn_2"
                type="text"
                @click="check(scope.$index, scope.row)"
                >查看</el-button
              >
              <el-button
                v-if="scope.row.status != 1"
                class="btn_2"
                type="text"
                @click="detail(scope.$index, scope.row)"
                >详情</el-button
              >
              <el-button
                v-if="scope.row.status != 1"
                class="btn_2"
                type="text"
                @click="preview(scope.$index, scope.row)"
                >预览</el-button
              >
              <el-button
                v-if="scope.row.status == 2"
                class="btn_2"
                type="text"
                @click="urge(scope.$index, scope.row)"
                >催办</el-button
              >
              <el-button
                v-if="scope.row.status == 2"
                class="btn_2"
                type="text"
                @click="revoke(scope.$index, scope.row)"
                >撤销</el-button
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
    </div>

    <el-dialog title="确认发送合同" :visible.sync="dialogVisible" width="400px">
      <div>
        <el-checkbox v-model="notice_1" class="check">
          <span style="margin-left: 20px">手机提醒</span>

          <el-input
            style="margin-left: 40px; width: 180px"
            size="mini"
            disabled
            v-model="current_obj.b_phone"
          ></el-input>
        </el-checkbox>
      </div>

      <div class="mt_20">
        <el-checkbox v-model="notice_2" class="check">
          <span style="margin-left: 20px">平台提醒</span>
          <el-input
            style="margin-left: 40px; width: 180px"
            size="mini"
            disabled
            v-model="current_obj.b_company_name"
          ></el-input>
        </el-checkbox>
      </div>
      <div class="mt_40 ct">
        <el-button
          class="l_btn"
          type="primary"
          @click="send"
          :disabled="!(notice_1 || notice_2)"
          >确定发送</el-button
        >
        <el-button class="r_btn" @click="dialogVisible = false"
          >再看看</el-button
        >
      </div>
    </el-dialog>

    <el-dialog
      :title="'合同详情：' + current_detail.b_company_name + '合作'"
      :visible.sync="detail_dialogVisible"
      width="640px"
    >
      <div class="detail_t1">
        {{
          current_detail.contract_id == 1 ? "工作许可及服务" : "招聘服务协议"
        }}
      </div>
      <div style="margin-top: 25px">
        <span class="detail_t2" style="margin-left: 20px">合同状态:</span>
        <span class="detail_t3">{{ get_status(current_detail) }}</span>

        <span class="detail_t2" style="margin-left: 40px">机构名称:</span>
        <el-input
          disabled
          size="mini"
          class="detail_input"
          v-model="current_detail.b_name"
        ></el-input>
      </div>
      <div class="detail_t1 mt_40">合同信息</div>
      <div class="mt_20">
        <span class="detail_t2" style="margin-left: 20px">企业名称:</span>
        <el-input
          disabled
          size="mini"
          class="detail_input"
          v-model="current_detail.b_company_name"
        ></el-input>

        <span class="detail_t2" style="margin-left: 40px">合同类型:</span>
        <el-input
          disabled
          size="mini"
          class="detail_input"
          value="通用合同"
        ></el-input>
      </div>

      <div class="mt_20">
        <span class="detail_t2" style="margin-left: 20px">发起方:</span>
        <el-input
          disabled
          size="mini"
          class="detail_input"
          v-model="current_detail.a_name"
        ></el-input>

        <span class="detail_t2" style="margin-left: 40px">签署方:</span>
        <el-input
          disabled
          size="mini"
          class="detail_input"
          v-model="current_detail.b_name"
        ></el-input>
      </div>

      <div class="mt_20" style="margin-bottom: 40px">
        <span class="detail_t2" style="margin-left: 20px">发起时间:</span>
        <el-input
          disabled
          size="mini"
          class="detail_input"
          v-model="current_detail.start_date"
        ></el-input>

        <span class="detail_t2" style="margin-left: 40px">截止时间:</span>
        <el-input
          disabled
          size="mini"
          class="detail_input"
          v-model="current_detail.end_time"
        ></el-input>
        <span class="detail_t2" style="margin-left: 20px;margin-top:20px"
          >认证方式:</span
        >
        <span class="mode_type">{{
          current_detail.auth_type == 2 ? "个人认证" : "企业认证"
        }}</span>
      </div>
    </el-dialog>
  </div>
</template>

<script src="./sign.js"></script>
<style src="./sign.css" scoped></style>
