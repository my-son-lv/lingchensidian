<template>
  <div>
    <div class="content">
      <div class="add_btn" @click="addMember">添加</div>
      <div
        style="width: 100%; margin-top: 20px; background:rgba(255,255,255,1);border-radius: 4px; padding: 4px"
      >
        <el-table :data="list" style="padding: 0 20px">
          <el-table-column fixed="left" label="序号" width="60">
            <template slot-scope="scope">{{ scope.$index + (page - 1) * pageSize + 1 }}</template>
          </el-table-column>
          <el-table-column prop="name" label="会员类型"></el-table-column>
          <el-table-column prop="money" label="金额"></el-table-column>
          <el-table-column prop="month" label="期限"></el-table-column>
          <el-table-column prop="job_num" label="发布职位"></el-table-column>
          <el-table-column prop="top" label="置顶职位"></el-table-column>
          <el-table-column prop="down" label="精英简历"></el-table-column>
          <el-table-column prop="yaoqing" label="应聘邀请"></el-table-column>
          <el-table-column prop="tuisong" label="精准推送"></el-table-column>
          <el-table-column fixed="right" label="状态">
            <template slot-scope="scope">{{ scope.row.status == 1 ? "生效" : "关闭" }}</template>
          </el-table-column>
          <el-table-column fixed="right" label="状态">
            <template slot-scope="scope">{{ scope.row.show == 1 ? "显示" : "隐藏" }}</template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-button
                class="btn_2"
                type="text"
                v-if="scope.row.status == 1"
                @click="handleClickShow(scope.row)"
              >{{scope.row.show ==1 ? '隐藏' : '展示'}}</el-button>
              <el-button
                class="btn_2"
                type="text"
                v-if="scope.row.status == 2"
                @click="handleClickOpen(scope.row.id)"
              >打开</el-button>
              <el-button class="btn_2" type="text" v-else @click="handleClickClose(scope.row.id)">关闭</el-button>
              <el-button class="btn_2" type="text" @click="handleClickEdit(scope.row.id)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination_div">
        <page :count="count" :currentPage="page" v-if="this.count > 0" @activePage="activePage"></page>
      </div>
    </div>
  </div>
</template>
<script>
import page from "../../public/pagination/pagination";
export default {
  name: "memberTypeList",
  components: { page },
  data() {
    return {
      list: [],
      count: 0,
      page: 1,
      pageSize: 20,
    };
  },
  created() {
    if (this.$route.query.page) {
      this.check_info.page = this.$route.query.page;
    }
    this.getVipList();
  },
  computed: {},
  methods: {
    // 接收分页
    activePage(page) {
      this.page = page;
      this.$router.push({
        url: window.location.href,
        query: {
          page: this.page,
        },
      });
      this.getVipList();
    },
    //   添加
    addMember() {
      this.$router.push("/home/addMemberType");
    },
    handleClickShow(row) {
      let title =
        row.show == 1 ? "您确定隐藏该条记录？" : "您确定显示该条记录？";
      this.$confirm("您确定隐藏该条记录？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$patch("/vip/" + row.id, {
            show: row.show == 1 ? 2 : 1,
          }).then((res) => {
            this.getVipList();
            this.$message.success("修改成功");
          });
        })
        .catch((err) => {
          console.log(err)
        });
    },
    // 打开
    handleClickOpen(id) {
      this.$confirm("是否打开该会员类型", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$patch("/vip/" + id, {
            status: 1,
          }).then((res) => {
            this.getVipList();
            this.$message.success("开启成功");
          });
        })
        .catch(() => {});
    },
    // 关闭
    handleClickClose(id) {
      this.$confirm("是否关闭该会员类型", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$patch("/vip/" + id, {
            status: 2,
          }).then((res) => {
            if (res.code == 1000007) {
              this.$message.error(res.msg);
            } else {
              this.getVipList();
              this.$message.success("关闭成功");
            }
          });
        })
        .catch(() => {});
    },
    // 编辑
    handleClickEdit(id) {
      this.$router.push({
        path: "/home/addMemberType",
        query: {
          id: id,
        },
      });
    },
    // 获取列表
    async getVipList() {
      let res = await this.$fetch("/vip", {
        page: this.page,
        pageSize: this.pageSize,
      });
      this.count = res.last_page;
      if (res.data.length > 0) {
        this.list = res.data;
      }
    },
  },
};
</script>
<style scoped>
.content {
  padding: 20px;
  margin-top: 20px;
  width: 100%;
  background: #ffffff;
}
.add_btn {
  width: 100px;
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
