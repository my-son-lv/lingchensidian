const status_list = [
  {
    name: "全部",
    status: 0
  },
  {
    name: "待他人处理",
    status: 2
  },
  {
    name: "已完成",
    status: 3
  },
  {
    name: "未完成",
    status: 4
  },
  {
    name: "草稿",
    status: 1
  }
];
import page from "../../public/pagination/pagination";
export default {
  components: { page },
  data() {
    return {
      status_list: status_list,
      status_select: 0,
      date: null,
      check_info: {
        page: 1,
        pageSize: 20,
        name: "",
        start_time: null,
        end_time: null,
        status: 0
      },
      list: [],
      count: 0,
      dialogVisible: false,
      notice_1: false,
      notice_2: false,
      current_obj: {},
      detail_dialogVisible: false,
      current_detail: {},
      fullscreenLoading: false,
      typeList: [
        "外籍人才证件办理服务协议",
        "外籍人才招聘服务协议（单次服务版）",
        "月度会员",
        "季度会员",
        "年度会员",
        "外籍人才招聘服务协议（长期合作版）"
      ]
    };
  },
  methods: {
    status_click(index, status) {
      this.status_select = index;
      this.check_info.status = status;

      this.check_info.page = 1;
      this.search();
    },
    async search() {
      if (this.date) {
        this.check_info.start_time = this.date[0];
        this.check_info.end_time = this.date[1];
      } else {
        this.check_info.start_time = null;
        this.check_info.end_time = null;
      }

      let res = await this.$fetch("sing_contracts/list", this.check_info);
      if (res.code === 200) {
        this.list = res.data.list;
        this.check_info.page = res.data.page;
        this.count = res.data.count;
      }
    },
    // 接收分页
    async activePage(page) {
      this.check_info.page = page;
      this.$router.push({
        url: window.location.href,
        query: {
          page: this.check_info.page
        }
      });
      let res = await this.$fetch("sing_contracts/list", this.check_info);
      if (res.code === 200) {
        this.list = res.data.list;
        if (this.list.length > 0) {
          this.check_info.page = res.data.page;
          this.count = res.data.count;
        }
      }
    },
    reset() {
      this.check_info.page = 1;
      this.check_info.name = "";
      this.check_info.start_time = null;
      this.check_info.end_time = null;
      this.date = null;
    },
    sign_click() {
      this.$router.push({
        path: "/home/signstart"
      });
    },
    // 查看
    async check(index, row) {
      this.$router.push({
        path: "/home/signstart",
        query: {
          id: row.id
        }
      });
    },
    // 详情
    async detail(index, row) {
      this.current_detail = row;
      this.detail_dialogVisible = true;
    },
    // 预览
    async preview(index, row) {
      let res = await this.$fetch("sing_contracts/signView", {
        id: row.id
      });

      if (res.code == 200) {
        window.open(res.data.url, "_blank");
      }
    },
    // 催办
    async urge(index, row) {
      this.current_obj = row;
      this.dialogVisible = true;

      // sing_contracts/signUrge
    },
    async send() {
      this.dialogVisible = false;

      var notice = "";
      if (this.notice_1) {
        notice = "1";
      }

      if (this.notice_2) {
        notice = "2";
      }

      if (this.notice_1 && this.notice_2) {
        notice = "1,2";
      }

      let res = await this.$post("sing_contracts/signUrge", {
        id: this.current_obj.id,
        notice: notice
      });
      if (res.code === 200) {
        this.$message.success("催办操作成功");
      }
    },
    // 撤销
    async revoke(index, row) {
      this.$confirm("撤销操作, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.do_revoke(row);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    async do_revoke(row) {
      let res = await this.$post("sing_contracts/signCancel", {
        id: row.id
      });
      if (res.code === 200) {
        this.$message.success("撤销操作成功");
        row.status = 6;
      }
    },
    get_status(row) {
      var str;
      switch (row.status) {
        case 1:
          str = "草稿"; // 查看
          break;
        case 2:
          str = "待签署"; // 详情 预览 催办 撤销
          break;
        case 3:
          str = "已完成"; // 详情 预览
          break;
        case 4:
          str = "已拒绝"; // 详情 预览
          break;
        case 5:
          str = "已逾期"; // 详情 预览
          break;
        case 6:
          str = "已撤回"; // 详情 预览
          break;
        default:
          break;
      }

      return str;
    }
  },
  created() {
    if (this.$route.query.page) {
      this.check_info.page = this.$route.query.page;
    }
  },
  mounted: async function() {
    this.search();
  },
  activated: async function() {}
};
