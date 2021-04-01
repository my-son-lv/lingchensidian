const status_list = [
  "全部",
  "已约面",
  "待面试",
  "面试中",
  "待签约",
  "已录用",
  "未通过",
  "已结束",
  "已取消",
  "已过期"
];
import { Loading } from "element-ui";
export default {
  data() {
    return {
      user_info: {},
      info: {},
      dialogVisible: false,
      job_list: null,
      invite_data: {
        mid: null,
        time: null,
        jid: null
      },
      status_list: status_list,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      mediaList: ["Wechat", "Skype", "Whatsapp"],
      visaList: ["Z", "M", "F", "X", "others"],
      schoolTypeList: [
        {
          value: "Training Center",
          id: 1
        },
        {
          value: "International Kindergarten",
          id: 2
        },
        {
          value: "International School",
          id: 3
        },
        {
          value: "Public School",
          id: 4
        },
        {
          value: "Online Class",
          id: 5
        },
        {
          value: "Others",
          id: 6
        }
      ],
      schoolList: [],
      jobTypeList: ["Offline", "Online", "Any"],
      studentAgeList: [
        {
          value: "0-3",
          id: 1
        },
        {
          value: "3-6",
          id: 2
        },
        {
          value: "7-12",
          id: 3
        },
        {
          value: "13-18",
          id: 4
        },
        {
          value: "18+",
          id: 5
        }
      ],
      ageList: [],
      jobWorkTypeList: ["Any", "Full Time", "Part Time"],
      education: [],
      certList: []
    };
  },
  computed: {},
  watch: {
    $route(to, from) {
      this.getInfoMessage();
    }
  },
  methods: {
    async dialog_submit() {
      this.dialogVisible = false;
      let res = await this.$post("inerview/invite", this.invite_data);
      if (res.code == 200) {
        this.$message.success("预约面试成功");
      } else {
        this.$message.error(res.msg);
      }
    },
    async spare_click() {
      let res = await this.$post("collect", {
        type: 1,
        class: this.info.collect_flg + 1,
        mid: this.info.mid
      });

      if (res.code == 200) {
        this.info.collect_flg = !this.info.collect_flg;
        this.$message.success(
          this.info.collect_flg ? "加入收藏成功." : "取消收藏成功"
        );
      } else {
        this.$message.error(res.msg);
      }
    },
    interview_click() {
      if(!this.user_info.vip){
        this.$message.error('邀请失败，您还不是会员')
        return;
      }
      if (this.user_info.status == 3) {
        this.$confirm("请重新提交驻资料进行预约面试哦", "提示", {})
          .then(() => {
            this.$router.push({
              path: "/home/form",
              query: {
                form: true
              }
            });
          })
          .catch(() => {});
        return;
      } else if (this.user_info.status != 2) {
        // this.$message.error('请等待审核后预约面试哦')

        this.$confirm("请等待审核后预约面试哦", "提示", {})
          .then(() => {})
          .catch(() => {});
        return;
      }

      if (this.job_list.length > 0) {
        this.dialogVisible = true;
      } else {
        // this.$alert('您暂未设置招聘需求，请您设置招聘需求后进行预约面试', '提示', {
        //   confirmButtonText: '确定',
        // });
        this.$confirm(
          "欢迎加入寰球阿帕斯之旅，请前往设置您的招聘需求，让我们更精准的为您服务",
          "提示",
          {
            confirmButtonText: "确定",
            type: "warning",
            showCancelButton: false
          }
        )
          .then(() => {
            this.$router.push("/main/jobadd");
          })
          .catch(() => {});
      }
    },
    get_pay() {
      let pay = this.info.pay_type;
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
    get_degree() {
      let university = this.info.university;
      var str = "";
      switch (university) {
        case 1:
          str = "High School Diploma";
          break;
        case 2:
          str = "Associate's Degree";
          break;
        case 3:
          str = "Bachelor's Degree";
          break;
        case 4:
          str = "Master's Degree";
          break;
        case 5:
          str = "MBA";
          break;
        case 6:
          str = "PHD";
          break;
        default:
      }
      return str;
    },
    download() {
      window.open(this.info.notes_path[0].path, "_blank");
    },
    get_cities() {
      var str = "";

      if (
        this.info.working_city_datas &&
        this.info.working_city_datas.length > 0
      ) {
        this.info.working_city_datas.forEach(element => {
          str += element.province_data.short_name + "-";
          str += element.city_data.short_name + " ";
        });
      }

      return str;
    },
    // 下载简历
    async handleClickDown() {
      let res = await this.$post("/teach/downNotes", {
        id: this.info.mid
      });
      if (res.code == 200) {
        let loadingInstance = Loading.service({
          lock: true,
          text: "正在下载",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        setTimeout(() => {
          loadingInstance.close();
          this.$message({
            message: "下载成功",
            type: "success"
          });
          this.info = {};
          this.ageList = [];
          this.schoolList = [];
          this.getInfoMessage();
        }, 2000);
      } else if (res.code == 2000212 || res.code == 2000213) {
        this.$confirm("您下载简历的额度已用完，充值会员下载更多", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            window.open("https://www.apex.link/vip", "_bank");
          })
          .catch(() => {});
      } else {
        this.$message.error(res.msg);
      }
    },
    getInfoMessage() {
      this.schoolList = [];
      this.ageList = [];
      this.$post("teachDesc", {
        id: this.$route.query.id
      }).then(res => {
        if (res.code == 200) {
          this.info = res.data;
          if (this.info.school_type != null) {
            let schoolListArr = res.data.school_type.split(",").map(Number);
            this.schoolTypeList.forEach(ele => {
              let menuId = schoolListArr.find(item => item == ele.id);
              if (menuId) {
                this.schoolList.push(ele.value);
              }
            });
          }
          if (this.info.student_age != null) {
            let ageListArr = res.data.student_age.split(",").map(Number);
            this.studentAgeList.forEach(ele => {
              let menuId = ageListArr.find(item => item == ele.id);
              if (menuId) {
                this.ageList.push(ele.value);
              }
            });
          }
          this.invite_data.mid = res.data.mid;
        }
      });
    }
  },
  mounted: async function() {
    let token = await this.$post("getInfoByToken");
    this.$userManager().data = token.data;
    this.user_info = this.$userManager().data;

    let id = this.$route.query.id;
    let type = this.$route.query.type;

    let res = await this.$post(
      type == 1 ? "/inerview/interviewDesc" : "teachDesc",
      {
        id: id
      }
    );
    if (res.code == 200) {
      this.info = res.data;
      this.education = res.data.education;
      if (this.info.school_type != null) {
        let schoolListArr = res.data.school_type.split(",").map(Number);
        this.schoolTypeList.forEach(ele => {
          let menuId = schoolListArr.find(item => item == ele.id);
          if (menuId) {
            this.schoolList.push(ele.value);
          }
        });
      }
      if (this.info.student_age != null) {
        let ageListArr = res.data.student_age.split(",").map(Number);
        this.studentAgeList.forEach(ele => {
          let menuId = ageListArr.find(item => item == ele.id);
          if (menuId) {
            this.ageList.push(ele.value);
          }
        });
      }
      this.invite_data.mid = res.data.mid;
      if (res.data.edu_cert_flg == 1) {
        this.certList.push("TEFL");
      }
      if (res.data.edu_auth_flg == 1) {
        this.certList.push("TESOL");
      }
      if (res.data.celta_flg == 2) {
        this.certList.push("CELTA");
      }
      if (res.data.cert_other_flg == 2) {
        this.certList.push("Others");
      }
    }

    // 拉取职位列表
    let search = {
      page: 1, // 页数 默认1
      pageSize: 50 // 每页条数 非必传默认20
    };

    let job = await this.$post("/job/list", search);
    if (job.code == 200) {
      this.job_list = job.data.list;
    }
  },
  activated: async function() {}
};
