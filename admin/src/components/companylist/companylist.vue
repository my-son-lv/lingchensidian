<template>
  <div class="content_c">
    <div class="top_div">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="t1">公司名称</div>
          <el-input class="i1" v-model="check_info.company_name"></el-input>
        </el-col>

        <el-col :span="6">
          <div class="t1">手机号</div>
          <el-input class="i1" v-model="check_info.phone"></el-input>
        </el-col>

        <el-col :span="6">
          <div class="t1">顾问状态</div>
          <el-select
            v-model="check_info.gw_flg"
            placeholder="请选择"
            class="i1"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>

        <el-col :span="6">
          <div class="t1">办公地址</div>
          <el-cascader
            style="margin-left:10px"
            placeholder="全部"
            :options="cascaderData"
            @change="handleChange"
            ref='bangong_city'
            :props="{
              value: 'id',
              label: 'name',
              lazy: true,
              lazyLoad: cascader_load
            }"
          ></el-cascader>
        </el-col>
      </el-row>

      <div style="margin-top: 20px" class="clearfix">
        <el-button class="b1" @click="search">查询</el-button>
        <el-button class="b2" @click="reset">重置</el-button>
        <el-button class="b1 add_btn" @click="addCompany">添加</el-button>
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
      <el-table
        :data="list"
        @row-click="check"
        style="padding: 0 20px"
        :row-class-name="tableRowClassName"
      >
        <el-table-column fixed="left" label="序号" width="50">
          <template slot-scope="scope">
            {{ scope.$index + (check_info.page - 1) * check_info.pageSize + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          fixed="left"
          label="机构名称"
          width="180"
          prop="company_name"
        >
          <template slot-scope="scope">
            <p>
              {{ scope.row.company_name }}
            </p>
            <el-tag
              type="danger"
              v-if="scope.row.vip_actions_id > 0"
              size="mini"
              >VIP</el-tag
            >
            <!-- <el-tag type="success" v-if="scope.row.category == 1" size="mini">普通外教</el-tag> -->
          </template>
        </el-table-column>
        <el-table-column
          prop="phone"
          label="联系电话"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="city_name.merger_name"
          label="办公地址"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="talent"
          :formatter="talentFormat"
          label="办学资质"
          width="90"
        ></el-table-column>
        <!-- <el-table-column
          prop="type"
          :formatter="typeFormat"
          label="机构类型"
          width="100"
        ></el-table-column> -->
        <el-table-column
          prop="apply_time"
          label="申请时间"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="gw_flg"
          :formatter="gw_flgFormat"
          label="顾问"
          width="140"
        ></el-table-column>
        <el-table-column
          prop="memo"
          label="备注"
          width="180"
        ></el-table-column>

        <el-table-column fixed="right" label="操作" width="470">
          <template slot-scope="scope">
            <el-button
              class="btn_2"
              type="text"
              @click.stop="memoSet(scope.row)"
              >备注</el-button
            >
            <el-button
              class="btn_2"
              type="text"
              @click.stop="job_list(scope.$index, scope.row.id)"
              >招聘需求</el-button
            >
            <el-button
              class="btn_2"
              type="text"
              @click.stop="gw_set(scope.$index, scope.row)"
              >顾问配置</el-button
            >
            <el-button
              class="btn_2"
              type="text"
              @click.stop="rc_set(scope.$index, scope.row.id)"
              >人才管理</el-button
            >
            <el-button
              class="btn_2"
              type="text"
              @click.stop="delCompany(scope.row)"
              >删除</el-button
            >
            <el-button
              class="btn_2"
              type="text"
              v-if="scope.row.vip_actions_id > 0"
              @click.stop="vipDetails(scope.row)"
              >会员详情</el-button
            >

            <el-button
              class="btn_2"
              type="text"
              @click.stop="lookCompany(scope.row)"
              >平台记录</el-button
            >
          </template>
        </el-table-column>
        <!-- <el-table-column fixed="right" label="">
          <template slot-scope="scope">
            
          </template>
        </el-table-column> -->
      </el-table>

      <!-- <div class="pagination_div">
        <el-pagination layout="prev, pager, next" :page-count="count" @current-change="handleCurrentChange" style="position: absolute; right: 20px" class="ct"></el-pagination>
      </div> -->
      <page
        :count="count"
        :currentPage="check_info.page"
        v-if="this.count > 0"
        @activePage="activePage"
      ></page>
    </div>

    <el-dialog
      title="顾问配置"
      :visible.sync="dialogTableVisible"
      :before-close="dialog_cancel"
    >
      <div>公司名称： {{ dialogdata.company_name }}</div>
      <div style="margin-top: 40px">
        <span>选择顾问</span>
        <el-select v-model="uid" placeholder="请选择" style="margin-left: 20px">
          <el-option
            v-for="item in gwlist"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <div class="buttons">
        <el-button class="btn_l btn1" v-on:click="dialog_finish"
          >确定</el-button
        >
        <el-button class="btn_r btn2" v-on:click="dialog_cancel"
          >取消</el-button
        >
      </div>
    </el-dialog>

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

    <div
      class="details_wrapper"
      v-if="showDetailsMask"
      @click="showDetailsMask = false"
    >
      <div class="details_wrapper_content">
        <div class="top_nav">
          <div
            class="item_nav"
            v-for="(item, index) in navList"
            :key="index"
            :class="activeClass == index ? 'actived' : ''"
            @click.stop="getItem(index)"
          >
            {{ item }}
          </div>
        </div>
        <div class="information_wrapper" v-if="activeClass == 0">
          <div class="con_item">
            <p class="item_name">机构名称：</p>
            <p class="item_content">{{ memberName }}</p>
          </div>
          <div class="con_item">
            <p class="item_name">会员类型：</p>
            <p class="item_content">{{ memberType }}</p>
          </div>
          <div class="con_item">
            <p class="item_name">实收款项：</p>
            <p class="item_content">{{ memberIncome }}</p>
          </div>
          <div class="con_item">
            <p class="item_name">对方经办人：</p>
            <p class="item_content">{{ otherParty }}</p>
          </div>
          <div class="con_item">
            <p class="item_name">电话：</p>
            <p class="item_content">{{ otherPartyPhone }}</p>
          </div>
          <div class="con_item">
            <p class="item_name">收款方式：</p>
            <p class="item_content">{{ payMode }}</p>
          </div>
          <div class="con_item">
            <p class="item_name">收款人：</p>
            <p class="item_content">{{ payee }}</p>
          </div>
          <div class="con_item">
            <p class="item_name">收款日期：</p>
            <p class="item_content">{{ payDate }}</p>
          </div>
          <div class="con_item">
            <p class="item_name">新增时间：</p>
            <p class="item_content">{{ created_at }}</p>
          </div>
          <div class="con_item">
            <p class="item_name">会员有效期：</p>
            <p class="item_content">
              {{ start_time.slice(0, 10) }} - {{ end_time.slice(0, 10) }}
            </p>
          </div>
          <div class="con_item">
            <p class="item_name">操作人：</p>
            <p class="item_content">{{ userName }}</p>
          </div>
          <div class="con_item">
            <p class="item_name">备注：</p>
            <p class="item_content">{{ memo }}</p>
          </div>
        </div>
        <div class="record_wrapper" v-else>
          <div class="record_wrapper_con">
            <div></div>
            <div>可用数量</div>
            <div>已用数量</div>
            <div style="border-right: 0">剩余数量</div>
          </div>
          <div class="record_wrapper_con">
            <div>发布职位</div>
            <div>无限</div>
            <div>{{ memberInfo.yy_job_num }}</div>
            <div style="border-right: 0">
              无限
            </div>
          </div>
          <div class="record_wrapper_con">
            <div>置顶职位</div>
            <div>{{ memberInfo.vip.top }}</div>
            <div>{{ memberInfo.yy_top }}</div>
            <div style="border-right: 0">
              {{ memberInfo.vip.top - memberInfo.yy_top }}
            </div>
          </div>
          <div class="record_wrapper_con">
            <div>下载简历</div>
            <div>{{ memberInfo.vip.down }}</div>
            <div>{{ memberInfo.yy_down }}</div>
            <div style="border-right: 0">
              {{ memberInfo.vip.down - memberInfo.yy_down }}
            </div>
          </div>
          <div class="record_wrapper_con">
            <div>急聘服务</div>
            <div>{{ memberInfo.vip.jiping }}</div>
            <div>{{ memberInfo.yy_jiping }}</div>
            <div style="border-right: 0">
              {{ memberInfo.vip.jiping - memberInfo.yy_jiping }}
            </div>
          </div>
          <div class="record_wrapper_con">
            <div>应聘邀请</div>
            <div>{{ memberInfo.vip.yaoqing }}</div>
            <div>{{ memberInfo.yy_yaoqing }}</div>
            <div style="border-right: 0">
              {{ memberInfo.vip.yaoqing - memberInfo.yy_yaoqing }}
            </div>
          </div>
          <div class="record_wrapper_con" style="border-bottom: 0">
            <div>精准推送</div>
            <div>{{ memberInfo.vip.tuisong }}</div>
            <div>{{ memberInfo.yy_tuisong}}</div>
            <div style="border-right: 0">
              {{ memberInfo.vip.tuisong - memberInfo.yy_tuisong }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./companylist.js"></script>
<style src="./companylist.css" scoped></style>
