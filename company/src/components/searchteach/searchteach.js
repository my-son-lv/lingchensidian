import Bus from "../../tools/bus.js";
const degree = [
  {
    id: 1,
    code: "High School Diploma"
  },
  {
    id: 2,
    code: "Associate's Degree"
  },
  {
    id: 3,
    code: "Bachelor's Degree"
  },
  {
    id: 4,
    code: "Master's Degree"
  },
  {
    id: 5,
    code: "MBA"
  },
  {
    id: 6,
    code: "PHD"
  }
];

export default {
  data() {
    return {
      user_info: {},
      dialogVisible: false,
      search: {
        language_flg: 0, // 搜索条件 非必传 0全部 1母语 2非母语
        nationality: null, // 搜索条件 非必传 国籍id
        page: 1, // 页数 默认1
        pageSize: 12, // 每页条数 非必传默认20
        type: 1, // 非必传 1推荐 2热度 3最新 默认1
        pay_type: 0,
        degree: 0,
        seniority: 0,
      },
      options1: [
        {
          value: 0,
          label: "Any"
        },
        {
          value: 1,
          label: "Native English Countries"
        },
        {
          value: 2,
          label: "Non-native English Countries"
        }
      ],
      options2: [],
      count: 0, // 总页数
      list: [],
      degree: degree,
      studyList:[
        {id:0,code:'Any'},
        {id:1,code:'Bachelor and above'},
        {id:2,code:'Master and above'},
        {id:3,code:'PHD and above'},
      ],
      seniorityList:[
        {id:0,code:'Any'},
        {id:1,code:'Less than 1 year'},
        {id:2,code:'1-3years'},
        {id:3,code:'3-5years'},
        {id:4,code:'5-10years'},
        {id:5,code:'More than 10 years'},
      ],
      pay_type_list: [
        {
          id: 0,
          code: "Any"
        },
        {
          id: 1,
          code: "10K-13K"
        },
        {
          id: 2,
          code: "13K-16K"
        },
        {
          id: 3,
          code: "16K-20K"
        },
        {
          id: 4,
          code: "20K-25K"
        },
        {
          id: 5,
          code: ">25K"
        }
      ],
      activityList: []
    };
  },
  computed: {},
  methods: {
    chongzhi () {
      this.search.language_flg = 0
      this.search.nationality = null
      this.search.page = 1
      this.search.pageSize = 12
      this.search.type = 1
      this.search.pay_type = 0
      this.search.degree = 0
      this.search.seniority = 0
      this.search_teach()
    },
    jumpDetails() {
      if (this.activityList.length > 0 && this.activityList[0].url4 != null) {
        let routeData = this.activityList[0].url4;
        window.open(routeData);
      }
    },
    async getActivity() {
      let res = await this.$fetch("advert", {
        type: 4
      });
      if (res.code == 200) {
        this.activityList = res.data;
      }
    },
    async select1_change() {
      if (this.search.language_flg == 0) {
        this.search.nationality = null;
      }
      let res_province = await this.$post(
        "getNationList",
        {
          type: this.search.language_flg
        },
        this.$baseURL() + "/api/admin/public/"
      );
      this.options2 = res_province.data;

      this.search.page = 1;
      this.list = [];
      this.search_teach();
    },
    select2_change() {
      this.search.page = 1;
      this.list = [];
      this.search_teach();
    },
    header_btn_click(type) {
      console.log(type);
      this.search.type = type;
      this.search.page = 1;
      this.list = [];
      this.search_teach();
    },
    pay_type_change() {
      this.search.page = 1;
      this.list = [];
      this.search_teach();
    },
    degree_type_change() {
      this.search.page = 1;
      this.list = [];
      this.search_teach();
    },
    async detail_click(item) {
      console.log(JSON.stringify(item));
      if (
        item.view_num > 10 &&
        item.view_flg != 1 &&
        this.user_info.status != 2
      ) {
        let job_list = await this.$post("job/list");

        if (job_list.data.list.length > 0) {
          this.$message.success("审核成功后可免费查看全部，请等待审核哦");
        } else {
          this.dialogVisible = true;
        }
      } else {
        this.$router
          .push({
            path: "searchteach/teachdesc",
            query: {
              id: item.id
            }
          })
          .catch(data => {});
      }
    },
    write_needs() {
      this.$router
        .push({
          path: "/main/jobadd"
        })
        .catch(data => {});
    },
    get_pay(pay) {
      var str = "";
      switch (pay) {
        case 1:
          str = "10k-13k";
          break;
        case 2:
          str = "13k-16k";
          break;
        case 3:
          str = "16k-20k";
          break;
        case 4:
          str = "20k-25k";
          break;
        case 5:
          str = ">25k";
          break;
        default:
      }
      return str;
    },
    handleCurrentChange(val) {
      this.search.page = val;
      this.search_teach();
    },
    async search_teach() {
      let res = await this.$post("searchTeach", this.search);
      if (res.code == 200) {
        this.list = res.data.list;
        this.count = res.data.count;
      }
    }
  },
  created() {
    this.getActivity();
    let sessionStoragePAGE = sessionStorage.getItem("PAGE");
    if (sessionStoragePAGE && sessionStoragePAGE != undefined) {
      this.search.page = Number(sessionStoragePAGE);
    }
    this.search_teach();
  },
  mounted: async function() {
    let res = await this.$post("getInfoByToken");

    if (res.code === 200) {
      this.user_info = res.data;
    }
  },
  destroyed() {
    sessionStorage.setItem("PAGE", this.search.page);
  }
};
