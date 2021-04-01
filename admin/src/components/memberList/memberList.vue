<template>
  <div>
    <div class="search_div mt_20 clearfix">
      <el-row :gutter="40">
        <el-col :span="8">
          <div class="t1">机构名称</div>
          <el-input class="i1" v-model="companyName"></el-input>
        </el-col>

        <el-col :span="8">
          <div class="t1">会员类型</div>
          <el-select v-model="memberType" placeholder="请选择" class="i1">
            <el-option
              v-for="item in typeOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-col>

        <el-col :span="8">
          <div class="t1">状态</div>
          <el-select v-model="type" placeholder="请选择" class="i1">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>

      <div style="margin-top:20px" class="fl">
        <el-button class="b1" @click="handleClickSearch">查询</el-button>
        <el-button class="b2" @click="handleClickReset">重置</el-button>
      </div>

      <el-button class="b1 fr" style="margin-top:20px" @click="addMember"
        >添加</el-button
      >
    </div>
    <div class="content">
      <div
        style="width: 100%; margin-top: 20px; background:rgba(255,255,255,1);border-radius: 4px; padding: 4px"
      >
        <el-table :data="list" style="padding: 0 20px">
          <el-table-column fixed="left" label="序号"  width="60">
            <template slot-scope="scope">
              {{ scope.$index + (page - 1) * pageSize + 1 }}
            </template>
          </el-table-column>
          <el-table-column fixed="left" label="机构名称">
            <template slot-scope="scope" v-if="scope.row.company != null">
              {{ scope.row.company.company_name }}
            </template>
          </el-table-column>
          <el-table-column label="会员类型">
            <template slot-scope="scope">
              {{ scope.row.vip.name }}
            </template>
          </el-table-column>
          <el-table-column prop="operator" label="经办人"></el-table-column>
          <el-table-column
            prop="operator_tel"
            label="联系方式"
          ></el-table-column>
          
          <el-table-column label="会员有效期" width="200">
            <template slot-scope="scope" v-if="scope.row.start_time != null">
              {{ scope.row.start_time.slice(0, 10) }} -
              {{ scope.row.end_time.slice(0, 10) }}
            </template>
          </el-table-column>
          <el-table-column label="操作人"  width="160">
            <template slot-scope="scope" v-if="scope.row.user != null">
              {{ scope.row.user.name }}
            </template>
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              {{ scope.row.status | memberStatus }}
            </template>
          </el-table-column>
          <el-table-column label="创建时间" width="180">
            <template slot-scope="scope">
              {{ scope.row.vip.created_at }}
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button
                class="btn_2"
                type="text"
                @click="handleClickDetails(scope.row.id)"
                >详情</el-button
              >
              <div style="display: inline-block;" v-if="scope.row.status != 4">
                <el-button
                  class="btn_2"
                  type="text"
                  v-if="scope.row.status == 2"
                  @click="handleClickClose(scope.row.id)"
                  >关闭</el-button
                >
                <el-button
                  class="btn_2"
                  type="text"
                  v-else
                  @click="handleClickOpen(scope.row.id, scope.row.status)"
                  >打开</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination_div">
        <page
          :count="count"
          :currentPage="page"
          v-if="this.count > 0"
          @activePage="activePage"
        ></page>
      </div>
    </div>
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
            <div style="border-right:0;">剩余数量</div>
          </div>
          <div class="record_wrapper_con">
            <div>发布职位</div>
            <div>无限</div>
            <div>{{ memberInfo.yy_job_num }}</div>
            <div style="border-right:0;">
              无限
            </div>
          </div>
          <div class="record_wrapper_con">
            <div>置顶职位</div>
            <div>{{ memberInfo.vip.top }}</div>
            <div>{{ memberInfo.yy_top }}</div>
            <div style="border-right:0;">
              {{ memberInfo.vip.top - memberInfo.yy_top }}
            </div>
          </div>
          <div class="record_wrapper_con">
            <div>下载简历</div>
            <div>{{ memberInfo.vip.down }}</div>
            <div>{{ memberInfo.yy_down }}</div>
            <div style="border-right:0;">
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
<script>
import page from "../../public/pagination/pagination";
export default {
  name: "memberList",
  inject: ["reload"],
  components: {
    page
  },
  data() {
    return {
      count: 0,
      companyName: "",
      memberType: "",
      type: "",
      list: [],
      navList: ["基本信息", "会员记录"],
      activeClass: 0,
      showDetailsMask: false,
      page: 1,
      pageSize: 20,
      typeOptions: [],
      options: [
        {
          value: "未生效",
          id: 1
        },
        {
          value: "正常",
          id: 2
        },
        {
          value: "已关闭",
          id: 3
        },
        {
          value: "已过期",
          id: 4
        }
      ],
      itemId: "",
      memberName: "",
      memberType: "",
      pay: "",
      memberIncome: "",
      otherParty: "",
      otherPartyPhone: "",
      payMode: "",
      payee: "",
      payDate: "",
      memo: "",
      created_at: "",
      start_time: "",
      end_time: "",
      userName: "",
      memberInfo: {}
    };
  },
  created() {
    if (this.$route.query.page) {
      this.page = this.$route.query.page;
    }
    this.getMemberList();
    this.getMemberType();
  },
  computed: {},
  methods: {
    // 获取会员详情
    async getMember() {
      let res = await this.$fetch("/vip_action/" + this.itemId);
      this.memberInfo = res;
      this.memberName = res.company.company_name;
      this.memberType = res.vip.name;
      this.pay = res.vip.money;
      this.memberIncome = res.pay;
      this.otherParty = res.operator;
      this.otherPartyPhone = res.operator_tel;
      this.payMode = res.type;
      this.payee = res.payee;
      this.payDate = res.pay_date;
      this.created_at = res.created_at;
      this.start_time = res.start_time;
      this.end_time = res.end_time;
      if (res.user != null) {
        this.userName = res.user.name;
      }
      if (res.memo != null) {
        this.memo = res.memo;
      }
    },
    // 接收分页
    activePage(page) {
      this.page = page;
      this.$router.push({
        url: window.location.href,
        query: {
          page: this.page
        }
      });
      this.getMemberList();
    },
    // 获取会员类型
    async getMemberType() {
      let res = await this.$fetch("/public/getVipList");
      if (res.data.length > 0) {
        this.typeOptions = res.data;
      }
    },
    // 获取会员列表
    async getMemberList() {
      let res = await this.$fetch("/vip_action", {
        vip_type: this.memberType,
        company_name: this.companyName,
        status: this.type,
        page: this.page,
        pageSize: this.pageSize
      });
      this.list = res.data;
      this.count = res.last_page;
    },
    getItem(index) {
      this.activeClass = index;
    },
    // 添加
    addMember() {
      this.$router.push("/home/addMember");
    },
    // 打开
    handleClickOpen(id, status) {
      if (status == 3) {
        this.$router.push({
          path: "/home/addMember",
          query: {
            id: id
          }
        });
      } else {
        this.$confirm("是否打开该会员", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$patch("/vip_action/" + id, {
              status: 2
            }).then(res => {
              this.getMemberList();
              this.$message.success("开启成功");
            });
          })
          .catch(() => {});
      }
    },
    // 关闭
    async handleClickClose(id) {
      this.$confirm("是否关闭该会员", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$patch("/vip_action/" + id, {
            status: 3
          }).then(res => {
            this.getMemberList();
            this.$message.success("关闭成功");
          });
        })
        .catch(() => {});
    },
    // 查询
    handleClickSearch() {
      this.getMemberList();
    },
    //重置
    handleClickReset() {
      this.companyName = ""
      this.memberType = ""
      this.type = ""
      this.list = []
      this.page = 1
      this.getMemberList();
    },
    // 详情
    handleClickDetails(id) {
      this.itemId = id;
      this.showDetailsMask = true;
      this.getMember();
    }
  }
};
</script>
<style scoped>
.clearfix:after {
  content: "";
  display: block;
  clear: both;
}

.clearfix {
  zoom: 1;
}

.fl {
  float: left;
}

.fr {
  float: right;
}
.content {
  margin-top: 20px;
  padding: 20px 0 20px 20px;
  width: 100%;
  background: #ffffff;
}
.search_div {
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  padding: 20px;
}
.t1 {
  margin-right: 10px;
  font-size: 16px;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  float: left;
  line-height: 40px;
}
.i1 {
  border-radius: 2px;
  width: 60%;
  float: left;
  margin-left: 10px;
}
.b1 {
  background: rgba(7, 140, 169, 1);
  font-size: 14px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}

.b2 {
  margin-left: 10px;
  background: rgba(250, 250, 250, 1);
  border: 1px solid rgba(221, 221, 221, 1);
  font-size: 14px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.details_wrapper {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 99;
}
.details_wrapper_content {
  width: 500px;
  background: #fff;
  border-radius: 4px;
}
.top_nav {
  display: flex;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #c3c3c3;
  line-height: 60px;
}
.top_nav .item_nav {
  flex: 1;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
}
.top_nav .item_nav:nth-child(1) {
  border-right: 1px solid #c3c3c3;
}
.actived {
  color: #078ca9 !important;
}
.information_wrapper {
  margin-top: 20px;
  padding: 0 20px;
}
.information_wrapper .con_item {
  display: flex;
  margin-bottom: 20px;
}
.con_item .item_name {
  min-width: 120px;
  color: #333333;
}
.con_item .item_content {
  color: #666666;
}
.record_wrapper {
  margin: 20px;
  border: 1px solid #c5c5c5;
}
.record_wrapper_con {
  display: flex;
  border-bottom: 1px solid #c5c5c5;
}
.record_wrapper_con div {
  flex: 1;
  height: 40px;
  text-align: center;
  line-height: 40px;
  border-right: 1px solid #c5c5c5;
}
.pagination_div {
  margin-top: 20px;
  position: relative;
  width: 100%;
  background: white;
  height: 52px;
  text-align: right;
}

/deep/ .pagination_div .el-pagination .btn-prev {
  background-color: white;
  border-radius: 6px;
  border: 1px solid rgba(221, 221, 221, 1);
  width: 32px;
  height: 32px;
  border-radius: 6px;
  margin-left: 8px;
}

/deep/ .pagination_div .el-pagination .btn-next {
  background-color: white;
  border-radius: 6px;
  border: 1px solid rgba(221, 221, 221, 1);
  width: 32px;
  height: 32px;
  border-radius: 6px;
  margin-left: 8px;
}

/deep/ .pagination_div .el-pagination .el-icon {
  font-size: 14px;
  color: rgba(102, 102, 102, 1);
  padding: 0;
  text-align: center;
}

/deep/ .pagination_div .el-pagination .more {
  background-color: white;
  border-radius: 6px;
  border: 1px solid rgba(221, 221, 221, 1);
  width: 32px;
  height: 32px;
  border-radius: 6px;
  margin-left: 8px;
}

/deep/ .pagination_div .el-pagination .el-pager .number {
  background-color: white;
  border-radius: 6px;
  border: 1px solid rgba(221, 221, 221, 1);
  width: 32px;
  height: 32px;
  border-radius: 6px;
  margin-left: 8px;
}

/deep/ .pagination_div .el-pagination .el-pager .number:not(.disabled).active {
  background-color: rgba(7, 140, 169, 1);
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  margin-left: 8px;
  font-size: 14px;
  line-height: 32px;
}
</style>
