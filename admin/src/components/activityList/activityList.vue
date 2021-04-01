<template>
  <div>
    <div class="top_div">
      <el-button class="add_btn" @click="jumpAddActivity">添加</el-button>
    </div>
    <div class="content_wrapper">
      <div
        style="width: 100%; margin-top: 20px; background:rgba(255,255,255,1);  border-radius: 4px; padding: 4px"
      >
        <el-table :data="list" style="padding: 0 20px" @row-click="jumpEdit">
          <el-table-column fixed="left" label="序号">
            <template slot-scope="scope">
              {{ scope.$index + (page - 1) * pageSize + 1 }}
            </template>
          </el-table-column>
          <el-table-column
            fixed="left"
            prop="title"
            label="标题"
          ></el-table-column>
          <el-table-column
            prop="type"
            width="300"
            label="投放类型"
          ></el-table-column>
          <el-table-column
            prop="start_time"
            width="160"
            label="起始时间"
          ></el-table-column>
          <el-table-column
            prop="end_time"
            width="160"
            label="结束时间"
          ></el-table-column>
          <el-table-column fixed="right" width="50" label="状态">
            <template slot-scope="scope">
              {{ scope.row.status == 1 ? "正常" : "关闭" }}
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button
                class="btn_2"
                type="text"
                v-if="scope.row.status == 1"
                @click.stop="closeActivity(scope.row)"
                >关闭</el-button
              >
              <el-button
                class="btn_2"
                type="text"
                v-else
                @click.stop="openActivity(scope.row)"
                >上线</el-button
              >
              <el-button
                class="btn_2"
                type="text"
                @click.stop="deleActivity(scope.row)"
                >删除</el-button
              >
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
  </div>
</template>
<script>
import page from "../../public/pagination/pagination";
export default {
  name: "activityList",
  components: {
    page
  },
  data() {
    return {
      list: [],
      page: 1,
      pageSize: 20,
      count: 0
    };
  },
  created() {
    if (this.$route.query.page) {
      this.page = this.$route.query.page;
    }
    this.getActivityList();
  },
  computed: {},
  methods: {
    jumpAddActivity() {
      this.$router.push("/home/addActivity");
    },
    // 获取列表
    async getActivityList() {
      //
      let res = await this.$fetch(
        "/advert/list",
        {
          page: this.page,
          pageSize: this.pageSize
        },
        0
      );
      if (res.code == 200) {
        this.list = res.data.data;
        this.count = res.data.total;
      } else {
        this.$message.error(res.msg);
      }
    },
    // 关闭
    async closeActivity(row) {
      let res = await this.$post("/advert/updateStatus", {
        id: row.id,
        status: 2
      });
      if (res.code == 200) {
        this.$message({
          message: "关闭成功",
          type: "success"
        });
        this.getActivityList();
      } else {
        this.$message.error(res.msg);
      }
    },
    // 开启
    async openActivity(row) {
      let res = await this.$post("/advert/updateStatus", {
        id: row.id,
        status: 1
      });
      if (res.code == 200) {
        this.$message({
          message: "开启成功",
          type: "success"
        });
        this.getActivityList();
      } else {
        this.$message.error(res.msg);
      }
    },
    // 删除
    async deleActivity(row) {
      let res = await this.$post("/advert/delete", {
        id: row.id
      });
      if (res.code == 200) {
        this.$confirm("确定删除该活动吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.getActivityList();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      } else {
        this.$message.error(res.msg);
      }
    },
    // 编辑
    jumpEdit(row) {
      this.$router.push({
        path: "/home/addActivity",
        query: {
          id: row.id
        }
      });
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
      this.getActivityList();
    }
  }
};
</script>
<style scoped>
.top_div {
  margin-top: 17px;
  margin-bottom: 20px;
  background-color: rgba(255, 255, 255, 1);
  padding: 20px;
  border-radius: 4px;
}
.add_btn {
  background: rgba(7, 140, 169, 1);
  font-size: 14px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
.content_wrapper {
  padding: 0 20px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 4px;
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
