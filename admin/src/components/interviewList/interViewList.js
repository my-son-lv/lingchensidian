import page from "../../public/pagination/pagination";
export default {
  name: "interviewList",
  //import引入的组件需要注入到对象中才能使用
  components: { page },
  data() {
    //这里存放数据
    return {
      titleList: [
        {
          id: 1,
          name: "待确认"
        },
        {
          id: 2,
          name: "待面试"
        },
        {
          id: 3,
          name: "面试中"
        },
        {
          id: 4,
          name: "已完成"
        },
        {
          id: 5,
          name: "已结束"
        },
        {
          id: 0,
          name: "全部"
        }
      ],
      activeClass: 5,
      tableData: [],
      queryList: {
        status: 0,
        teach_name: "",
        company_name: "",
        page: 1,
        pageSize: 20
      },
      joinInterview: {
        id: "",
        type: "",
        time: ""
      },
      count: 0,
      companyName: "",
      lastName: "",
      inteTime: "",
      interViewMask: false,
      progressCheckMask: false,
      reverse: false,
      activities: [],
      changeOfTime: false,
      dateTimeValue: "",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    rili_click() {
      this.$router.push({
        path: "/home/interview"
      });
    },
    getItem(index, id) {
      this.activeClass = index;
      this.queryList.status = id;
      this.getInterViewList();
    },
    async getInterViewList() {
      let res = await this.$post("/interview/list", this.queryList);
      if (res.code == 200) {
        this.tableData = res.data.list;
        this.count = res.data.count;
      }
    },

    companyOnclick() {},
    teachOnclick() {},
    // 添加class样式
    addClassState(i) {
      switch (i) {
        // 面试中
        case 3:
          return "already_begun";
      }
    },
    handleClickQuery() {
      this.queryList.page = 1;
      this.getInterViewList();
    },
    handleClickReset() {
      this.queryList.teach_name = "";
      this.queryList.company_name = "";
      this.getInterViewList();
    },
    async handleClickJoin(id) {
      this.joinInterview.id = id;
      this.joinInterview.type = 1;
      let res = await this.$post(
        "/interview/joinInterview",
        this.joinInterview
      );
      if (res.code == 200) {
        this.getInterViewList();
      }
    },
    sign(row) {
      console.log(row);
      this.$router.push({
        path: "/home/signstart",
        query: {
          interview_id: row.id
        }
      });
    },
    handleClickNoParticipation(id, index) {
      this.interViewMask = true;
      this.joinInterview.id = id;
      this.joinInterview.type = 2;
      this.companyName = this.tableData[index].company_name;
      this.lastName = this.tableData[index].last_name;
      this.inteTime = this.tableData[index].inte_time;
    },
    async submitBtn() {
      let res = await this.$post(
        "/interview/joinInterview",
        this.joinInterview
      );
      if (res.code == 200) {
        this.getInterViewList();
        this.interViewMask = false;
        this.joinInterview.time = "";
        this.joinInterview.id = "";
        this.joinInterview.type = "";
      }
    },
    handleClickChange(id, index) {
      this.changeOfTime = true;
      this.joinInterview.id = id;
      this.joinInterview.type = 3;
      this.companyName = this.tableData[index].company_name;
      this.lastName = this.tableData[index].last_name;
      this.inteTime = this.tableData[index].inte_time;
    },
    async handleClickLook(id) {
      this.progressCheckMask = true;
      let res = await this.$post("/interview/interviewSpeed", {
        id: id
      });
      if (res.code == 200) {
        this.activities = res.data;
        if (this.activities.length > 0) {
          this.activities[0].color = "#078CA9";
        }
      }
    },
    handleCurrentChange(val) {
      this.queryList.page = val;
      this.getInterViewList();
    },
    // 接收分页
    activePage(page) {
      this.queryList.page = page;
      this.$router.push({
        url: window.location.href,
        query: {
          page: this.queryList.page
        }
      });
      this.getInterViewList();
    },
    async progressCheckBtn() {
      let res = await this.$post(
        "/interview/joinInterview",
        this.joinInterview
      );
      if (res.code == 200) {
        this.getInterViewList();
        this.progressCheckMask = false;
        this.joinInterview.time = "";
        this.joinInterview.id = "";
        this.joinInterview.type = "";
      }
    },
    dateChange(value) {
      this.joinInterview.time = value;
    },

    async changeOfTimeBtn() {
      let res = await this.$post(
        "/interview/joinInterview",
        this.joinInterview
      );
      if (res.code == 200) {
        this.getInterViewList();
        this.changeOfTime = false;
        this.joinInterview.time = "";
        this.joinInterview.id = "";
        this.joinInterview.type = "";
      }
    },
    async room_click(item) {
      event.stopPropagation();

      let user_id;

      let get_token = await this.$post("getInfoByToken");
      if (get_token.code === 200) {
        user_id = "1_" + get_token.data.name;
      }

      let res = await this.$post(this.$baseURL() + "/api/intoRoom", {
        inter_id: item.id,
        type: 1,
        account: user_id
      });
      if (res.code == 200) {
        let sdkId = res.data.SDK_APP_ID;
        let userSig = res.data.USER_SIGN;
        let roomId = res.data.room_id;
        let type = 1;
        this.$router.push({
          name: "realTimeCall",
          params: {
            sdkId,
            userSig,
            roomId,
            user_id,
            type
          }
        });
      } else {
        this.$message.error(res.msg);
      }
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    if (this.$route.query.page) {
      this.queryList.page = this.$route.query.page;
    }
    this.getInterViewList();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {}
};
