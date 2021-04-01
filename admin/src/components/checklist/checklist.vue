<template>
  <div class="content_c">
    <div class="top_div">
      <el-row :gutter="20">
        <el-col :span="5">
          <div class="t1">姓名</div>
          <el-input class="i1" v-model="check_info.name" placeholder="请输入"></el-input>
        </el-col>

        <el-col :span="6">
          <div class="t1">登录邮箱</div>
          <el-input class="i1" v-model="check_info.email" placeholder="请输入"></el-input>
        </el-col>

        <el-col :span="6">
          <span class="t1">手机号码</span>
          <el-input class="i1" v-model="check_info.phone" placeholder="请输入"></el-input>
        </el-col>

        <el-col :span="6">
          <div class="t1">用户状态</div>
          <el-select v-model="check_info.status" placeholder="请选择" class="i1">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
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
      style="
        width: 100%;
        margin-top: 20px;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        padding: 4px;
      "
    >
      <el-table :data="list" style="padding: 0 20px">
        <el-table-column fixed="left" prop="name" label="姓名" width="150"></el-table-column>
        <el-table-column prop="id" label="用户ID" width="75"></el-table-column>
        <el-table-column prop="email" label="登录邮箱" width="250"></el-table-column>
        <el-table-column prop="nationality_val" label="国籍" width="180"></el-table-column>
        <el-table-column
          prop="working_seniority"
          label="工作年限"
          width="220"
          :formatter="working_seniority_Format"
        ></el-table-column>
        <el-table-column prop="created_at" label="注册时间" width="190"></el-table-column>
        <el-table-column label="状态" width="190">
          <template
            slot-scope="scope"
          >{{scope.row.status == 0 ? '未提交' : (scope.row.status == 1 ? '待审核' : (scope.row.status == 2 ? '审核通过' : '未通过')) }}</template>
        </el-table-column>
        <el-table-column fixed="right" width="180" label="操作">
          <template slot-scope="scope">
            <el-button class="btn_2" type="text" @click.stop="reommJob(scope.row)">推职位</el-button>
            <el-button class="btn_2" type="text" @click.stop="check(scope.$index, scope.row)">详情</el-button>
            <el-button
              class="btn_2"
              type="text"
              @click.stop="jumpEditTeacher(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              class="btn_2"
              type="text"
              v-if="scope.row.status == 1"
              @click.stop="pass(scope.$index, scope.row)"
            >通过</el-button>
            <el-button
              class="btn_2"
              type="text"
              v-if="scope.row.status == 1"
              @click.stop="reject(scope.$index, scope.row)"
            >驳回</el-button>
          </template>
        </el-table-column>

        <el-table-column fixed="right" width="130" label="操作日志">
          <template slot-scope="scope">
            <el-button
              class="btn_2"
              type="text"
              @click.stop="check_record(scope.$index, scope.row)"
            >查看</el-button>
            <el-button
              v-if="
                scope.row.invite && Object.keys(scope.row.invite).length > 0
              "
              class="btn_2"
              type="text"
              @click.stop="check_invite(scope.$index, scope.row)"
            >推荐人</el-button>
          </template>
        </el-table-column>
      </el-table>

      <page
        :count="count"
        :currentPage="check_info.page"
        v-if="this.count > 0"
        @activePage="activePage"
      ></page>
    </div>

    <el-dialog title="操作日志（Operation record）" :visible.sync="dialogTableVisible">
      <el-table :data="gridData" height="400px">
        <el-table-column property="admin_name" label="操作人" width="150"></el-table-column>
        <el-table-column property="created_at" label="操作时间" width="200"></el-table-column>
        <el-table-column property="operation" label="动作"></el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog title="推荐人信息" :visible.sync="invite_dialog">
      <div>姓名： {{ invite_data.name }}</div>
      <div>手机号： {{ invite_data.phone }}</div>
      <div>邮箱： {{ invite_data.email }}</div>
    </el-dialog>
    <el-dialog
      title="推荐职位"
      :visible.sync="reommJobVisible"
      width="30%"
      :before-close="clickReommJobClose"
    >
      <div>
        <label>请选择职位:</label>
        <el-select
          v-model="jobCheckList"
          multiple
          :multiple-limit="2"
          filterable
          placeholder="请选择职位"
          style="margin-left:20px;width:400px;"
        >
          <el-option v-for="item in jobList" :key="item.name" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </div>
      <div class="buttons">
        <el-button class="btn_l btn1" @click.stop="clickReommJobOk">确定</el-button>
        <el-button class="btn_r btn2" @click.stop="clickReommJobClose">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script src="./checklist.js"></script>
<style src="./checklist.css" scoped></style>
