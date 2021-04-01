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
      count: 0,
      check_info: {
        page: 1,
        pageSize: 20,
        name: "",
        email: "",
        phone: "",
        status: 1
      },
      list: [],
      gridData: [],
      dialogTableVisible: false,
      options: [
        {
          value: 1,
          label: "待审核"
        },
        {
          value: 0,
          label: "未提交"
        },
        {
          value: 3,
          label: "未通过"
        }
      ],
      invite_dialog: false,
      invite_data: {},
      working_seniority_list: working_seniority_list,
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

    async search() {
      let res = await this.$post("check/list", this.check_info);
      if (res.code === 200) {
        this.list = res.data.list;
        this.check_info.page = res.data.page;
        this.count = res.data.count;
        console.log(this.list);
      }
    },
    reset() {
      this.check_info.name = "";
      this.check_info.email = "";
      this.check_info.phone = "";
      this.check_info.page = 1;
      this.check_info.status = 1;
    },
    check(index, row) {
      this.$router
        .push({
          path: "/home/checkinfo",
          query: {
            id: row.mid
          }
        })
        .catch(data => {});
    },
    jumpEditTeacher(index, row) {
      this.$router.push({
        path: "/home/checkMessage",
        query: {
          id: row.id,
          mid: row.mid
        }
      });
    },
    checkElTable(row) {
      this.$router.push({
        path: "/home/checkinfo",
        query: {
          id: row.mid
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
      let res = await this.$post("check/checkOk", {
        id: row.id
      });
      if (res.code === 200) {
        this.list.splice(index, 1);
        this.$message.success("审核通过");
      }
    },
    reject(index, row) {
      this.$prompt("请输入审核驳回原因", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          if (!value) {
            this.$message.error("必须填写驳回原因");
            return;
          }

          this.$message({
            type: "success",
            message: "驳回原因" + value
          });
          this.post_reject(index, row, value);
        })
        .catch(() => {});
    },
    async post_reject(index, row, value) {
      let res = await this.$post("check/reject", {
        id: row.id,
        info: value
      });
      if (res.code === 200) {
        this.list.splice(index, 1);
        this.$message.success("审核驳回");
      }
    },
    async check_record(index, row) {
      let res = await this.$post("check/checkLog", {
        id: row.mid
      });

      if (res.code === 200) {
        res.data.forEach(element => {
          element.operation =
            element.status == 1
              ? "审核通过"
              : "审核驳回 驳回理由：" + element.info;
        });
        this.gridData = res.data;
        this.dialogTableVisible = true;
      }
    },
    async check_invite(index, row) {
      this.invite_dialog = true;
      this.invite_data = row.invite;
    },
    async handleCurrentChange(val) {
      this.check_info.page = val;
      let res = await this.$post("check/list", this.check_info);
      if (res.code === 200) {
        this.list = res.data.list;
        if (this.list > 0) {
          this.check_info.page = res.data.page;
          this.count = res.data.count;
        }
      }
    },
    working_seniority_Format(row) {
      row.working_seniority
        ? this.working_seniority_list[row.working_seniority - 1].code
        : "";
    }
  },
  created() {
    if (this.$route.query.page) {
      this.check_info.page = this.$route.query.page;
    }
  },
  activated: async function () {
    if (!this.$userManager().data) {
      let res = await this.$post("getInfoByToken");
      this.$userManager().data = res.data;
    }

    let res = await this.$post("check/list", this.check_info);
    if (res.code === 200) {
      this.list = res.data.list;
      this.check_info.page = res.data.page;
      this.count = res.data.count;
    }
  },
  mounted: async function() {
    
  }
};
