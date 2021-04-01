<template>
  <div>
    <div class="content">
      <div class="clearfix">
        <el-select
          v-model="companyId"
          placeholder="请选择"
          filterable
          class="fl"
          @change="select_change"
        >
          <el-option
            v-for="item in company_list"
            :key="item.id"
            :label="item.company_name"
            :value="item.id"
          ></el-option>
        </el-select>
        <div class="btn_wrapper fr" @click="handleClickAdd">添加</div>
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
        <el-table :data="list" style="padding: 0 20px" @row-click="check">
          <el-table-column label="序号" width="50" fixed="left">
            <template slot-scope="scope">{{ scope.$index + (page - 1) * pageSize + 1 }}</template>
          </el-table-column>
          <el-table-column prop="name" label="岗位名称" width="260"></el-table-column>
          <el-table-column prop="company_name" label="机构名称" width="220"></el-table-column>
          <el-table-column prop="user_name" label="顾问" width="220"></el-table-column>
          <el-table-column prop="job_city_data.merger_name" label="工作城市" width="160"></el-table-column>
          <el-table-column label="薪资" width="120">
            <template slot-scope="scope">{{ scope.row.pay.split(",").join("-") }}</template>
          </el-table-column>
          <el-table-column label="投递数" prop="job_city_data.job_app" width="80">
            <template slot-scope="scope">
              <div
                @click.stop="handleClickList(1,scope.row.id)"
                class="job_list_btn"
              >{{scope.row.job_app}}</div>
            </template>
          </el-table-column>
          <el-table-column label="学历要求" width="100">
            <template slot-scope="scope">{{ edu_type[scope.row.edu_type - 1] }}</template>
          </el-table-column>
          <el-table-column prop label="时间" width="100">
            <template slot-scope="scope">{{ scope.row.updated_at.slice(0, 10) }}</template>
          </el-table-column>
          <el-table-column prop="memo" label="备注" width="120"></el-table-column>
          <el-table-column  prop="click_count" label="浏览量" width="100"></el-table-column>
          <el-table-column label="状态" width="60">
            <template slot-scope="scope">{{ scope.row.status == 1 ? "打开" : "关闭" }}</template>
          </el-table-column>
          <el-table-column label="操作" width="300" fixed="right">
            <template slot-scope="scope">
              <el-popover placement="bottom" width="300" :ref="scope.row.id">
                <div class="share_wrapper">{{ shareUrl }}</div>
                <div
                  class="share_btn"
                  v-clipboard:copy="shareUrl"
                  v-clipboard:success="copy"
                  v-clipboard:error="onError"
                  @click="closeShare(scope.row.id)"
                >复制</div>
                <el-button
                  class="btn_2"
                  slot="reference"
                  type="text"
                  @click.stop="handleClickShare(scope.row)"
                  v-if="scope.row.status == 1"
                >分享</el-button>
                <el-button
                  class="btn_2"
                  slot="reference"
                  type="text"
                  @click.stop="handleClickShareHaibao(scope.row)"
                  v-if="scope.row.status == 1"
                >海报</el-button>
              </el-popover>
              <el-button
                class="btn_2"
                type="text"
                @click.stop="handleClickClose(scope.row)"
                v-if="scope.row.status == 1"
              >关闭</el-button>
              <el-button
                class="btn_2"
                type="text"
                @click.stop="handleClickOpen(scope.row)"
                v-else
              >打开</el-button>
              <el-popover placement="bottom" width="300" :ref="scope.row.id">
                <div class="wrapper">
                  <el-input
                    v-model="inputSort"
                    placeholder="请输入"
                    oninput="value=value.replace(/[^\d]/g,'')"
                  ></el-input>
                  <div class="sure_btn" @click="handleClickRowSort">确定</div>
                </div>
                <el-button
                  class="btn_2"
                  type="text"
                  slot="reference"
                  @click.stop="handleClickSort(scope.row)"
                  style="
                      background: none;
                      border: none;
                      padding: 0;
                      margin: 0 10px;
                      color: rgba(7, 140, 169, 1);
                    "
                >排序</el-button>
              </el-popover>
              <el-button class="btn_2" type="text" @click.stop="handleClickEdit(scope.row)">编辑</el-button>
              <el-button class="btn_2" type="text" @click.stop="handleClickDel(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination_div">
          <page :count="count" :currentPage="page" v-if="this.count > 0" @activePage="activePage"></page>
        </div>

        <el-dialog title="投递列表" :visible.sync="dialogVisible" :before-close="handleToudiListClose">
          <el-table :data="toudiList" fit>
            <el-table-column prop="member_info.name" width="160" label="First Name"></el-table-column>
            <el-table-column prop="member_info.last_name" width="160" label="Last Name"></el-table-column>
            <el-table-column prop="member_info.nationality_val.name" width="120" label="国籍"></el-table-column>
            <el-table-column label="性别" width="50">
              <template slot-scope="scope">{{ scope.row.member_info.sex == 0 ? '男' : '女' }}</template>
            </el-table-column>
            <el-table-column label="学历">
              <template slot-scope="scope">{{ degree[scope.row.member_info.university - 1].code}}</template>
            </el-table-column>
            <el-table-column prop="created_at" label="投递时间"></el-table-column>
          </el-table>
          <div class="pagination_div">
            <page :count="toudiCount" :currentPage="toudiPage" v-if="toudiCount > 0" @activePage="handleClickList"></page>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import page from "../../public/pagination/pagination";
import { baseURL } from "../../request/http.js";

export default {
  name: "companyPositionList",
  inject: ["reload"],
  components: { page },
  data() {
    return {
      company_list: [],
      companyId: "",
      list: [],
      page: 1,
      pageSize: 20,
      company_name: "",
      JobId: 0,
      edu_type: ["本科及以上", "研究生及以上", "博士及以上", "不限"],
      count: 0,
      inputSort: "",
      sortId: "",
      visible: false,
      visibleShare: false,
      shareUrl: "",
      toudiList: null,
      dialogVisible: false,
      toudiCount: 0,
      toudiPage: 1,
      toudiPageSize: 10,
      toudiId: 0,
      degree: [
        { id: 1, code: "High School Diploma" },
        { id: 2, code: "Associate's Degree" },
        { id: 3, code: "Bachelor's Degree" },
        { id: 4, code: "Master's Degree" },
        { id: 5, code: "MBA" },
        { id: 6, code: "PHD" },
      ],
    };
  },
  created() {
    this.getCompanyList();
    if (this.$route.query.page) {
      this.page = this.$route.query.page;
    }
    this.getList();
  },
  computed: {},
  methods: {
    handleToudiListClose() {
      this.toudiList = null;
      this.dialogVisible = false;
      this.toudiPage = 1;
      this.toudiCount = 0;
    },
    //投递列表
    async handleClickList(page,id = this.toudiId) {
      this.toudiId = id;
      this.toudiPage = page;
      let res = await this.$post("/company/jobAppList", {
        page: this.toudiPage,
        pageSize: this.toudiPageSize,
        id: id,
        token: localStorage.getItem("token"),
      });
      if (res) {
        this.toudiList = null;
        this.toudiList = res.data;
        this.toudiPage = res.current_page;
        this.toudiCount = res.last_page
        this.dialogVisible = true;
      } else {
        this.$message.error(res.msg);
      }
    },
    //分享海报
    handleClickShareHaibao(row) {
      let url = baseURL() + "/api/job/makeRecommPlaybill?id=" + row.id;
      window.open(url, "_blank");
    },
    // 添加
    handleClickAdd() {
      this.$router.push("/home/companyPositionDesc");
    },
    // 获取所有企业
    async getCompanyList() {
      let res = await this.$post("/public/getCompaanyList");
      if (res.code == 200) {
        this.company_list = res.data;
      } else {
        this.$message.error(res.msg);
      }
    },
    // 筛选企业
    select_change(id) {
      this.JobId = id;
      this.getList();
    },
    // 获取所有企业列表
    async getList() {
      let res = await this.$post("/company/jobIndex", {
        page: this.page,
        pageSize: this.pageSize,
        company_name: this.company_name,
        id: this.JobId,
      });
      if (res.code == 200) {
        this.list = res.data.list;
        this.count = res.data.count;
      } else {
        this.$message.error(res.msg);
      }
    },
    // 关闭
    handleClickClose(row) {
      this.$confirm("是否关闭该职位", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$post("/company/jobClose", {
            id: row.id,
            type: row.status == 1 ? 2 : 1,
          }).then((res) => {
            if (res.code == 200) {
              this.reload();
              this.$message({
                type: "success",
                message: "关闭成功!",
              });
            } else {
              this.$message.error(res.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消关闭",
          });
        });
    },
    // 打开
    handleClickOpen(row) {
      this.$post("/company/jobClose", {
        id: row.id,
        type: row.status == 1 ? 2 : 1,
      }).then((res) => {
        if (res.code == 200) {
          this.reload();
          this.$message({
            type: "success",
            message: "开启成功!",
          });
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 排序
    handleClickSort(row) {
      this.sortId = row.id;
    },
    // 排序确认按钮
    async handleClickRowSort() {
      let res = await this.$post("/company/jobSort", {
        id: this.sortId,
        sort: this.inputSort,
      });
      if (res.code == 200) {
        this.inputSort = "";
        this.getList();
        this.visible = false;
        this.$message.success("修改成功");
      } else {
        this.$message.error(res.msg);
      }
    },
    // 编辑
    handleClickEdit(row) {
      this.$router.push({
        path: "/home/companyPositionDesc",
        query: {
          id: row.id,
        },
      });
    },
    // 删除
    handleClickDel(row) {
      this.$confirm("是否删除该职位", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$post("/company/jobDelete", {
            id: row.id,
          }).then((res) => {
            if (res.code == 200) {
              this.getList();
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            } else {
              this.$message.error(res.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 分享
    handleClickShare(row) {
      this.shareUrl = "https://teach.apex.link/#/jobsDetails?id=" + row.id;
    },
    // 复制
    copy(e) {
      this.$message.success("复制成功");
    },
    onError() {
      this.$message.error("复制失败");
    },
    closeShare(id) {
      console.log(id);
      this.$refs[id].doClose();
    },
    // 接收分页
    activePage(page) {
      this.page = page;
      this.$router.push({
        url: window.location.href,
        query: {
          page: this.page,
        },
      });
      this.getList();
    },
    // 点击列表某一项
    check(row) {
      this.$router.push({
        path: "/home/jobdesc",
        query: {
          id: row.id,
        },
      });
    },
  },
};
</script>
<style scoped>
.content {
  margin-top: 20px;
  padding: 20px 0 0 20px;
  width: 100%;
  background: #ffffff;
}
.btn_wrapper {
  margin-right: 20px;
  width: 150px;
  height: 40px;
  background: #078ca9;
  border-radius: 4px;
  font-size: 18px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
}
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
.wrapper {
  display: flex;
}
.sure_btn {
  margin-left: 10px;
  width: 80px;
  height: 40px;
  background: #078ca9;
  color: #fff;
  border-radius: 5px;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
}
.share_wrapper {
  padding: 10px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: #078ca9;
  color: #fff;
  border-radius: 5px;
}
.share_btn {
  margin: 0 auto;
  width: 80px;
  height: 30px;
  background: #078ca9;
  border-radius: 4px;
  color: #ffffff;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
}
.btn_2 {
  color: rgba(7, 140, 169, 1);
  height: 36px;
}
.job_list_btn {
  text-decoration: underline;
  color: #757dda;
  cursor: pointer;
  text-align: center;
}
</style>
