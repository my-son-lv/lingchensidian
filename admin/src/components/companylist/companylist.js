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
          label: "无顾问"
        },
        {
          value: 2,
          label: "有顾问"
        }
      ],
      check_info: {
        page: 1,
        pageSize: 20,
        company_name: "",
        gw_flg: 0,
        city: "",
        phone: '',
      },
      cascaderData: [],
      list: [],
      dialogTableVisible: false,
      dialogdata: {},
      gwlist: [],
      uid: null,
      dialogTimeLine: false,
      activities: [],
      timelineColor: "#078ca9",
      showDetailsMask: false,
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
      memberInfo: {},
      activeClass: 0,
      navList: ["基本信息", "会员记录"]
    };
  },
  components: {
    page
  },
  inject: ["reload"],
  methods: {
    tableRowClassName({ row, rowIndex }) {
      // if (rowIndex === 1) {
      //   return 'warning-row';
      // } else if (rowIndex === 3) {
      //   return 'success-row';
      // }
      // return '';
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
    talentFormat(row, column) {
      return row.talent == 0 ? "不具备" : "具备";
    },
    gw_flgFormat(row, column) {
      if (row.gw_flg == 1) {
        return "无顾问";
      } else if (row.status == 2 && row.adviser.length != 0) {
        return row.adviser[0].name;
      }
    },
    vipDetails(row) {
      this.itemId = row.vip_actions_id;
      this.showDetailsMask = true;
      this.getMember();
    },
    getItem(index) {
      this.activeClass = index;
    },
    async search() {
      let res = await this.$post("company/list", this.check_info);
      if (res.code === 200) {
        this.list = res.data.list;
        this.check_info.page = res.data.page;
        this.count = res.data.count;
      }
    },
    reset() {
      this.check_info.company_name = "";
      this.check_info.gw_flg = 0;
      this.check_info.page = 1;
      this.check_info.city = "";
      this.getAllProvince();
      this.search();
    },
    check(row, column, event) {
      this.$router
        .push({
          path: "/home/companyinfo",
          query: {
            id: row.id
          }
        })
        .catch(data => { });
    },
    async gw_set(index, row) {
      event.stopPropagation();
      let res = await this.$post("company/adviserList");
      this.gwlist = res.data;
      this.dialogdata = row;
      this.dialogTableVisible = true;
    },
    async dialog_finish() {
      let res = await this.$post("company/adviser", {
        id: this.dialogdata.id,
        uid: this.uid
      });

      if (res.code == 200) {
        this.$message.success("设置顾问成功");
        this.search();
      }

      this.uid = null;
      this.dialogTableVisible = false;
    },
    dialog_cancel() {
      this.uid = null;
      this.dialogTableVisible = false;
    },
    async handleCurrentChange(val) {
      this.check_info.page = val;
      let res = await this.$post("company/list", this.check_info);
      if (res.code === 200) {
        this.list = res.data.list;
        if (this.list > 0) {
          this.check_info.page = res.data.page;
          this.count = res.data.count;
        }
      }
    },
    rc_set(index, id) {
      event.stopPropagation();
      this.$router.push({
        path: "/home/TalentManagement",
        query: {
          id: id
        }
      });
    },
    job_list(index, id) {
      event.stopPropagation();
      this.$router.push({
        path: "/home/joblist",
        query: {
          id: id
        }
      });
    },
    addCompany() {
      this.$router.push("/home/companyMessage");
    },
    async memoSet(row) {
      console.log(row)
      this.$prompt('请输入备注', '备注', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue:row.memo,
      }).then(({ value }) => {
        this.$post("/company/edit", {
          id: row.id,
          memo: value
        }).then(res => {
          if (res.code == 200) {
            this.getCompanyList();
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
    async delCompany(row) {
      this.$confirm("确定删除该用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$post("/company/delete", {
            id: row.id
          }).then(res => {
            if (res.code == 200) {
              this.getCompanyList();
              this.$message({
                message: "删除成功",
                type: "success"
              });
            } else {
              this.$message.error(res.msg);
            }
          });
        })
        .catch(() => { });
    },
    async getCompanyList() {
      let res = await this.$post("company/list", this.check_info);
      if (res.code === 200) {
        this.list = res.data.list;
        this.check_info.page = res.data.page;
        this.count = res.data.count;
      }
    },
    async lookCompany(row) {
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
    // 省市区
    handleChange(val) {
      this.check_info.city = val[1];
    },
    // 获取省份
    async getAllProvince() {
      let res = await this.$post("getProvince", {}, 1);
      if (res.code == 200) {
        this.cascaderData = res.data;
      }
    },
    async cascader_load(node, resolve) {
      if (node && node.data && node.data.id) {
        let res = await this.$post(
          "getCity",
          {
            id: node.data.id
          },
          1
        );
        res.data.forEach(element => {
          element.leaf = element.level == 2;
        });
        resolve(res.data);
      } else {
        resolve();
      }
    }
  },

  created() {
    this.getCompanyList();
    this.getAllProvince();
    if (this.$route.query.page) {
      this.check_info.page = this.$route.query.page;
    }
  },
  mounted: async function () {
    if (!this.$userManager().data) {
      let res = await this.$post("getInfoByToken");
      this.$userManager().data = res.data;
    }
  }
};
