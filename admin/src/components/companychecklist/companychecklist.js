import page from "../../public/pagination/pagination";

export default {
  data() {
    return {
      count: 0,
      options: [
        {
          value: 0,
          label: "全部"
        },
        {
          value: 1,
          label: "未提交"
        },
        {
          value: 2,
          label: "待审核"
        },
        {
          value: 3,
          label: "审核通过"
        },
        {
          value: 4,
          label: "审核驳回"
        }
      ],
      check_info: {
        page: 1,
        pageSize: 20,
        company_name: "",
        status: 2
      },
      list: [],
      gridData: [],
      dialogTableVisible: false,
      dialogTimeLine: false,
      activities:[],
      timelineColor: "#078ca9",
    };
  },
  components: {
    page
  },
  methods: {
    async memoSet(row,index) {
      this.$prompt('请输入备注', '备注', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue:row.memo,
      }).then(({ value }) => {
        this.$post("/company/updateMemo", {
          id: row.id,
          memo: value
        }).then(res => {
          if (res.code == 200) {
            this.search();
            this.$message({
              message: "修改成功",
              type: "success"
            });
          } else {
            this.$message.error(res.msg);
          }
        });
      }).catch(() => {
        
      });
    },
    typeFormat(row, column) {
      if (row.type === 1) {
        return "培训机构";
      } else if (row.type === 2) {
        return "公立学校";
      } else if (row.type === 3) {
        return "私立学校";
      } else if (row.type === 4) {
        return "中介机构";
      } else if (row.type === 5) {
        return "幼儿园";
      } else if (row.type === 6) {
        return "其他";
      }
    },
    activePage(page) {
      this.check_info.page = page;
      this.$router.push({
        url: window.location.href,
        query: {
          page: this.check_info.page
        }
      });
      this.search();
    },
    talentFormat(row, column) {
      return row.talent == 0 ? "不具备" : "具备";
    },
    statusFormat(row, column) {
      if (row.status == 0) {
        return "未提交";
      } else if (row.status == 1) {
        return "待审核";
      } else if (row.status == 2) {
        return "审核通过";
      } else if (row.status == 3) {
        return "审核驳回";
      }
    },
    async search() {
      let res = await this.$post("companyCheck/list", this.check_info);
      if (res.code === 200) {
        this.list = res.data.list;
        this.check_info.page = res.data.page;
        this.count = res.data.count;
      }
    },
    reset() {
      this.check_info.company_name = "";
      this.check_info.status = 2;
      this.check_info.page = 1;
    },
    check(index, row) {
      this.$router
        .push({
          path: "/home/companycheckinfo",
          query: {
            id: row.id
          }
        })
        .catch(data => {});
    },
    checkElTable(row) {
      this.$router.push({
        path: "/home/companycheckinfo",
        query: {
          id: row.id
        }
      });
    },
    pass(index, row) {
      this.$confirm("是否确定审核通过", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.post_pass(index, row);
        })
        .catch(() => {});
    },
    async post_pass(index, row) {
      let res = await this.$post("companyCheck/check", {
        id: row.id,
        type: 0
      });
      if (res.code === 200) {
        this.list.splice(index, 1);
        this.$message.success("审核通过");
      }
    },
    async job_desc(index, row) {
      this.$router.push({
        path: "/home/jobdesc",
        query: {
          id: row.job
        }
      });
    },
    reject(index, row) {
      this.$prompt("请输入审核驳回原因", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "驳回原因" + value
          });
          this.post_reject(index, row, value);
        })
        .catch(() => {});
    },
    async post_reject(index, row, value) {
      let res = await this.$post("companyCheck/check", {
        id: row.id,
        info: value,
        type: 1
      });
      if (res.code === 200) {
        this.list.splice(index, 1);
        this.$message.success("审核驳回");
      }
    },
    async check_record(index, row) {
      // let res = await this.$post("companyCheck/checkLog", {
      //   id: row.id
      // });

      // if (res.code === 200) {
      //   res.data.forEach(element => {
      //     element.operation =
      //       element.check == 1
      //         ? "审核通过"
      //         : "审核驳回 驳回理由：" + element.info;
      //   });

      //   this.gridData = res.data;

      //   this.dialogTableVisible = true;
      // }
      this.dialogTimeLine = true;
      let res = await this.$post("/public/getTerraceLog", {
        type: 2,
        id: row.id
      });
      if (res.code == 200) {
        this.activities = res.data;
      } else {
        this.$message.error(res.msg);
      }
    },
    async handleCurrentChange(val) {
      this.check_info.page = val;
      let res = await this.$post("companyCheck/list", this.check_info);

      if (res.code === 200) {
        this.list = res.data.list;
        if (this.list > 0) {
          this.check_info.page = res.data.page;
          this.count = res.data.count;
        }
      }
    }
  },
  created() {
    if (this.$route.query.page) {
      this.check_info.page = this.$route.query.page;
    }
  },
  mounted: async function() {
    if (!this.$userManager().data) {
      let res = await this.$post("getInfoByToken");
      this.$userManager().data = res.data;
    }

    let res = await this.$post("companyCheck/list", this.check_info);

    if (res.code === 200) {
      this.list = res.data.list;
      this.check_info.page = res.data.page;
      this.count = res.data.count;
    }
  }
};
