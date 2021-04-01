import page from "../../public/pagination/pagination";


const working_seniority_list = [
  { id: 1, code: "Less than 1 year" },
  { id: 2, code: "1 year experience" },
  { id: 3, code: "2 years experience" },
  { id: 4, code: "3 years experience" },
  { id: 5, code: "4 years experience" },
  { id: 6, code: "5 years experience" },
  { id: 7, code: "6 years experience" },
  { id: 8, code: "7 years experience" },
  { id: 9, code: "8 years experience" },
  { id: 10, code: "9 years experience" },
  { id: 11, code: "More than 10years" }
];

export default {
  data() {
    return {
      invite_dialog: false,
      invite_data: {},
      count: 0,
      check_info: {
        page: 1,
        pageSize: 20,
        name: "",
        email: "",
        phone: "",
        nationality: null,
        working_seniority: null,
        work_visa_flg: null,
        working_city: null,
        work_flg: null,
        language_flg: null,
        advert: null,
        in_domestic: '',
      },
      list: [],
      countryList: [],
      provinceList: [],
      y_max: null,
      y_min: null,
      InChinaList: [
        {
          id: 1,
          name: 'No',
        },
        {
          id: 2,
          name: 'Yes',
        }
      ],
      options1: [
        {
          value: 1,
          label: "母语国家"
        },
        {
          value: 2,
          label: "非母语国家"
        }
      ],
      options2: [],
      work_visa_list: [
        {
          value: 1,
          label: "NO"
        },
        {
          value: 2,
          label: "YES"
        }
      ],
      work_list: [
        {
          value: 1,
          label: "离职"
        },
        {
          value: 2,
          label: "在职"
        }
      ],
      working_seniority_list: working_seniority_list,
      adviserList: [],
      dialogFormVisible: false,
      haibaoVisible: false,
      teacher_id: "",
      user_id: "",
      teacher_name: "",
      activities: [],
      dialogTimeLine: false,
      timelineColor: "#078ca9",
      gwList: [],
      dialogDelivery: false,
      delivery: [],
      deliveryOptions: [],
      throwList: [],
      throwId: "",
      inputComment: "",
      commentsId: "",
      commentVisible: false,
      haibaoType: 1,
      haibao_select_id: 0,
      reommJobVisible: false,
      jobList: [],
      jobCheckList: [],
      jobRecommTeachId: '',
    };
  },

  components: {
    page
  },

  methods: {
    makeHiabaoPng() {
      let url = this.$baseURL() + "/api/teach/makeRecommPlaybill?type=" + this.haibaoType + "&id=" + this.haibao_select_id
      window.open(url, '_blank')
      this.haibaoVisible = false
    },
    haibaoSelectBtn(type) {
      this.haibaoType = type
    },
    makeHaibao(id) {
      this.haibaoVisible = true
      this.haibao_select_id = id
    },
    // 点击点评
    handleClickComment(row) {
      this.commentsId = row.id;
    },
    //备注
    async memoSet(row) {
      console.log(row)
      this.$prompt('请输入备注', '备注', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue:row.memo,
      }).then(({ value }) => {
        this.$post("/teach/updateMemo", {
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
    // 点评确认按钮
    async handleClickRowComment() {
      if (this.inputComment == "") {
        this.$message.error("请输入评价内容");
      } else {
        let res = await this.$post("/teach/comments", {
          comments: this.inputComment,
          id: this.commentsId
        });
        if (res.code == 200) {
          this.$message.success("评价成功");
          this.inputComment = "";
        } else {
          this.$message.error(res.msg);
        }
      }
    },
    // 接收分页
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
    async getJobOnline() {
      let res = await this.$fetch("/public/jobOnList");
      this.deliveryOptions = res.map(ele => {
        return {
          id: ele.id,
          name: `${ele.name}(${ele.company_name})`
        };
      });
    },
    async sureThrow() {
      let res = await this.$post("/teach/jobApplication", {
        mid: this.throwId,
        jid: this.delivery.toString()
      });
      if (res.code == 200) {
        this.dialogDelivery = false;
        this.$message.success("投递成功");
        this.throwList = [];
        this.delivery = [];
      } else {
        this.$message.error(res.msg);
      }
    },
    deliveryChange() {
      this.throwList = [];
      this.deliveryOptions.forEach(item => {
        let list = this.delivery.find(ele => item.id == ele);
        if (list) {
          return this.throwList.push(item);
        }
      });
    },
    handerCopyEmail (row){
      
    },
    deleteThrow(id) {
      this.delivery = this.delivery.filter(ele => ele != id);
      this.throwList = this.throwList.filter(ele => ele.id != id);
    },
    async vip(row) {
      let active = "";
      if (row.category == 1) {
        active = 2;
      } else {
        active = 1;
      }
      let res = await this.$post("/teach/updateCategory", {
        category: active,
        id: row.mid
      });

      this.$confirm("确定更改该用户状态？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$post("teach/updateCategory", {
            id: row.mid,
            category: active
          }).then(res => {
            if (res.code == 200) {
              this.$message({
                message: "更改成功",
                type: "success"
              });
              this.search();
            } else {
              this.$message.error(res.msg);
            }
          });
        })
        .catch(() => { });
    },
    async reommJob (row){
      this.jobRecommTeachId = row.mid
      let _this = this;
      //获取所有开启的职位列表
      this.$fetch("/public/getOpenJobList").then(res=>{
        if(res.code == 200 ){
          this.jobList = res.data
        }else{
          this.$message.error(res.msg)
        }
      });
      //打开model框架
      this.reommJobVisible = true
    },
    async clickReommJobOk () {
      console.log(this.jobRecommTeachId)
      if(this.jobCheckList.length == 0 ){
        this.$message.error('请选择职位')
        return
      }
      this.$post('/teach/tuijianJob',{teach_id: this.jobRecommTeachId,job_ids:this.jobCheckList.toString()}).then(res=>{
        if(res.code == 200 ){
          this.clickReommJobClose()
          this.$message.success('推荐职位成功')
        }else{
          this.$message.error(res.msg)
        }
      })
    },
    clickReommJobClose(){
      this.reommJobVisible = false
      this.jobCheckList = []
      this.jobRecommTeachId = ''
    },
    async activeType(row) {
      let active = "";
      if (row.sign_flg == 1) {
        active = 2;
      } else {
        active = 1;
      }
      let res = await this.$post("/teach/updateSignFlg", {
        type: active,
        id: row.mid
      });
      if (res.code == 200) {
        this.search();
        this.$message({
          message: "状态更改成功",
          type: "success"
        });
      } else {
        this.$message.error(res.msg);
      }
    },
    async lookTimeline(row) {
      this.dialogTimeLine = true;
      let res = await this.$post("/public/getTerraceLog", {
        type: 1,
        id: row.mid
      });
      if (res.code == 200) {
        this.activities = res.data;
      } else {
        this.$message.error(res.msg);
      }
    },
    async search() {
      let res = await this.$post("teach/list", this.check_info);
      if (res.code === 200) {
        this.list = res.data.list;
        this.check_info.page = res.data.page;
        this.count = res.data.count;
      }
    },
    reset() {
      this.check_info.name = "";
      this.check_info.email = "";
      this.check_info.phone = "";
      this.check_info.nationality = null;
      this.check_info.work_visa_flg = null;
      this.check_info.working_city = null;
      this.check_info.working_seniority = null;
      this.y_max = null;
      this.y_min = null;
      this.check_info.work_flg = null;
      this.options2 = null;
      this.check_info.language_flg = null;
      this.check_info.page = 1;
      this.check_info.in_domestic = ''
      this.check_info.advert = ''
      this.search()
    },
    check(index, row) {
      this.$router
        .push({
          path: "/home/teachinfo",
          query: {
            id: row.id
          }
        })
        .catch(data => { });
    },
    checkElTable(row) {
      this.$router.push({
        path: "/home/teachinfo",
        query: {
          id: row.id,
          mid: row.mid
        }
      });
    },
    async select1_change() {
      let res_province = await this.$post(
        "getNationList",
        {
          type: this.check_info.language_flg
        },
        2
      );
      this.options2 = res_province.data;
    },
    async handleCurrentChange(val) {
      this.check_info.page = val;
      let res = await this.$post("teach/list", this.check_info);

      if (res.code === 200) {
        this.list = res.data.list;
        if (this.list > 0) {
          this.check_info.page = res.data.page;
          this.count = res.data.count;
        }
      }
    },
    async check_invite(index, row) {
      this.invite_dialog = true;
      this.invite_data = row.invite;
    },
    working_seniority_Format(row) {
      return row.working_seniority  ? this.working_seniority_list[row.working_seniority - 1].code : "";
    },
    addTeacher() {
      this.$router.push("/home/teacherMessage");
    },
    delTeacher(row) {
      this.$confirm("确定删除该用户？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$post("teach/delete", {
            id: row.mid
          }).then(res => {
            if (res.code == 200) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.search();
            } else {
              this.$message.error(res.msg);
            }
          });
        })
        .catch(() => { });
    },
    async getAdviserList() {
      let res = await this.$post("company/adviserList");
      if (res.code == 200) {
        this.adviserList = res.data;
      }
    },
    gw_set(row) {
      this.dialogFormVisible = true;
      this.teacher_id = row.mid;
      this.teacher_name = row.name;
    },
    async clickSure() {
      let res = await this.$post("teach/updateAdviser", {
        id: this.teacher_id,
        user_id: this.user_id
      });
      if (res.code == 200) {
        this.dialogFormVisible = false;
        this.$message({
          message: "顾问配置成功",
          type: "success"
        });
        this.user_id = "";
      } else {
        this.$message.error(res.msg);
      }
    },
    deliveryTeacher(id) {
      this.dialogDelivery = true;
      this.throwId = id;
    }
  },
  created() {
    // stores.dispatch('saveListPagePars',{path:this.$route.path,pars:{'aaa':11}});
    // console.log(stores.state.listPagePars.get(this.$route.path));
    this.getAdviserList();
    this.getJobOnline();
    if (this.$route.query.page) {
      this.check_info.page = this.$route.query.page;
    }
  },
  activated: async function () {
  // mounted: async function () {
    window.scrollTo(0,0);
    // 获取国籍列表
    let res = await this.$fetch("getCountryList", {}, 1);
    this.countryList = res.data;

    // 获取城市列表
    let res_province = await this.$post("getProvince", {}, 1);

    this.provinceList = res_province.data;

    this.search();
  }
};
