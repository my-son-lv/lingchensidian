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
const working_seniority_list = [
  {
    id: 1,
    code: "Less than 1 year"
  },
  {
    id: 2,
    code: "1 year experience"
  },
  {
    id: 3,
    code: "2 years experience"
  },
  {
    id: 4,
    code: "3 years experience"
  },
  {
    id: 5,
    code: "4 years experience"
  },
  {
    id: 6,
    code: "5 years experience"
  },
  {
    id: 7,
    code: "6 years experience"
  },
  {
    id: 8,
    code: "7 years experience"
  },
  {
    id: 9,
    code: "8 years experience"
  },
  {
    id: 10,
    code: "9 years experience"
  },
  {
    id: 11,
    code: "More than 10years"
  }
];
const pay_type_list = [
  {
    id: 1,
    code: "10k-13k"
  },
  {
    id: 2,
    code: "13k-16k"
  },
  {
    id: 3,
    code: "16k-20k"
  },
  {
    id: 4,
    code: "20k-25k"
  },
  {
    id: 5,
    code: ">25k"
  }
];
const visa_type_list = [
  {
    id: 1,
    code: "Z"
  },
  {
    id: 2,
    code: "M"
  },
  {
    id: 3,
    code: "F"
  },
  {
    id: 4,
    code: "X"
  },
  {
    id: 5,
    code: "others"
  }
];

export default {
  data() {
    return {
      id: this.$route.params.id,
      nationality_obj: {},
      country_obj: {},
      info: {},
      userinfo: {},
      degree: degree,
      pay_type_list: pay_type_list,
      working_seniority_list: working_seniority_list,
      visa_type_list: visa_type_list,
      dialogFormVisible: false,
      dialog_title: "",
      sex: 0, // dialog临时存放数据
      university: 0, // dialog临时存放数据
      brithday: null, // dialog临时存放数据
      nationality: null, // dialog临时存放数据
      textarea_disabled: true, // 自我介绍编辑框
      textarea_content: "", // 自我介绍临时存放数据
      working_seniority: "",
      working_city: null,
      visa_type: "",
      work_flg: "",
      country: "",
      visa_exp_date: null,
      china_address: null,
      in_domestic: 0,
      countryList: [],
      provinceList: [],
      provinceSelect_working: null,
      cityList_working: [],
      citySelect_working: null,
      pay_type: 0,
      work_visa_flg: 0,
      working_city_obj: {
        show_obj_01: false,
        show_obj_02: false,
        provinceSelect_0: null,
        provinceSelect_1: null,
        provinceSelect_2: null,
        cityList_0: [],
        cityList_1: [],
        cityList_2: [],
        citySelect_0: null,
        citySelect_1: null,
        citySelect_2: null,
        mid: ""
      },
      notesId: [],
      education: []
    };
  },
  watch: {
    $route(to, from) {
      this.$post("teach/view", {
        id: this.$route.query.id
      }).then(res => {
        if (res.code == 200) {
          this.info = res.data;
          if (this.info.notes != null) {
            this.notesId = this.info.notes.split(",").map(Number);
          }
        } else {
          this.$message.error(res.msg);
        }
      });
    }
  },
  methods: {
    // 上传简历
    resume_upload(file) {
      if (this.notesId.length >= 5) {
        this.$message.error("最多上传5个");
      } else {
        var that = this;
        const isLt5M = file.size / 1024 / 1024 < 8;
        if (!isLt5M) {
          that.$message.error("less than 8M!");
        } else {
          let fd = new FormData();
          fd.append("file", file.raw);
          fd.append("type", 2);
          that.$post("upload", fd, 1).then(response => {
            if (response.code === 200) {
              that.notesId.push(response.data.id);
              this.getUpdateNotes(that.notesId);
            }
          });
        }
      }
    },
    async getUpdateNotes(notes) {
      let res = await this.$post("/teach/updateNotes", {
        id: this.mid,
        notes: notes.toString()
      });
      if (res.code == 200) {
        this.$message({
          message: "上传成功",
          type: "success"
        });
        this.getTeacherView();
      } else {
        this.$message.error(res.msg);
      }
    },
    async getTeacherView() {
      let res = await this.$post("teach/view", {
        id: this.id
      });
      if (res.code == 200) {
        this.info = res.data;
        if (this.info.notes != null) {
          this.notesId = this.info.notes.split(",").map(Number);
        }
      } else {
        this.$message.error(res.msg);
      }
    },
    delNotes(index, id) {
      this.$confirm("是否删除该简历？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.notesId.splice(index, 1);
          this.$post("/teach/updateNotes", {
            id: id,
            notes: this.notesId.toString()
          }).then(res => {
            if (res.code == 200) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.$post("teach/view", {
                id: this.id
              }).then(res => {
                if (res.code == 200) {
                  this.info = res.data;
                  if (this.info.notes != null) {
                    this.notesId = this.info.notes.split(",").map(Number);
                  }
                } else {
                  this.$message.error(res.msg);
                }
              });
            } else {
              this.$message.error(res.msg);
            }
          });
        })
        .catch(() => {});
    },
    back() {
      this.$router.push({'path':'/home/teachlist'});
      // this.$router.go(-1);
    },
    edit(e) {
      this.$prompt("", "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: this.info[e]
      })
        .then(({ value }) => {
          this.edit_post(e, value);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    async edit_post(e, value) {
      var obj = {
        id: this.id
      };
      obj[e] = value;

      let res = await this.$post("teach/edit", obj);
      if (res.code === 200) {
        this.info[e] = value;
        this.$message.success("修改成功");
        this.reset_countryList();

        if (
          this.dialog_title === "working_city" ||
          this.dialog_title === "china_address"
        ) {
          let res = await this.$post("teach/view", {
            id: this.id
          });
          this.info = res.data;
        }
      }
    },
    edit_dialog(e) {
      this.dialog_title = e;
      this.dialogFormVisible = true;
      this[e] = this.info[e];
    },
    dialog_submit() {
      if (this.dialog_title === "working_city") {
        this.dialogFormVisible = false;

        var working_city = this.working_city_obj.citySelect_0;
        if (
          this.working_city_obj.show_obj_01 &&
          this.working_city_obj.citySelect_1
        ) {
          working_city += "," + this.working_city_obj.citySelect_1;
        }
        if (
          this.working_city_obj.show_obj_02 &&
          this.working_city_obj.citySelect_2
        ) {
          working_city += "," + this.working_city_obj.citySelect_2;
        }

        this.working_city = working_city;

        this.edit_post(this.dialog_title, this.working_city);
        return;
      }

      if (this.dialog_title === "china_address") {
        this.dialogFormVisible = false;
        this.edit_post(this.dialog_title, this.citySelect_working);
        return;
      }

      this.dialogFormVisible = false;
      this.info[this.dialog_title] = this[this.dialog_title];

      this.edit_post(this.dialog_title, this.info[this.dialog_title]);
    },
    textarea_edit() {
      this.textarea_disabled = false;
      this.textarea_content = this.info.desc;
    },
    textarea_done(flag) {
      this.textarea_disabled = true;
      if (flag) {
        this.edit_post("desc", this.info.desc);
      } else {
        this.info.desc = this.textarea_content;
      }
    },
    reset_countryList() {
      this.nationality_obj = this.countryList.find(
        element => element.id === this.info.nationality
      );
      this.country_obj = this.countryList.find(
        element => element.id === this.info.country
      );
    },
    provinceChange_working(e) {
      this.$post(
        "getCity",
        {
          id: e
        },
        1
      ).then(response => {
        if (response.code === 200) {
          this.cityList_working = response.data;
          this.citySelect_working = response.data[0].id;
        }
      });
    },
    async provinceChange_working_1(e, obj) {
      let response = await this.$post(
        "getCity",
        {
          id: e
        },
        1
      );
      if (response.code === 200) {
        this.working_city_obj["cityList_" + obj] = response.data;
        this.working_city_obj["citySelect_" + obj] = response.data[0].id;
      }
    },
    download(index) {
      window.open(this.info.notes_path[index].path, "_blank");
    },
    get_cities() {
      var str = "";
      if (
        this.info.working_city_datas &&
        this.info.working_city_datas != null &&
        this.info.working_city_datas.length > 0
      ) {
        this.info.working_city_datas.forEach(element => {
          str += element.province_data.pinyin + "-";
          str += element.city_data.pinyin + " ";
        });
      }
      return str || "blank";
    },
    show_working_city() {
      this.working_city_obj.show_obj_01 = true;
      this.working_city_obj.show_obj_02 = true;
    },
    hidden_working_city(key) {
      this.working_city_obj[key] = false;
    },
    jumpEditTeacher() {
      this.$router.push({
        path: "/home/teacherMessage",
        query: {
          id: this.id,
          mid: this.mid
        }
      });
    }
  },
  mounted: async function() {
    this.id = this.$route.query.id;
    this.mid = this.$route.query.mid;
    if (!this.$userManager().data) {
      let res = await this.$post("getInfoByToken");
      this.$userManager().data = res.data;
    }

    let res = await this.$post("teach/view", {
      id: this.id
    });
    this.info = res.data;
    if (this.info.education != null) {
      let reg=new RegExp('-','g')//g代表全部
      this.info.education.forEach(function(v,k){
        if(v.edu_start_time){
          v.edu_start_time = v.edu_start_time.replace(reg,'/')
        }
        if(v.edu_end_time){
          v.edu_end_time = v.edu_end_time.replace(reg,'/')
        }
      })
      this.education = this.info.education;
    }
    if (this.info.work) {
      let reg=new RegExp('-','g')//g代表全部
      this.info.work.forEach(function(v,k){
        if(v.start_time){
          v.start_time = v.start_time.replace(reg,'/')
        }
        if(v.end_time){
          v.end_time = v.end_time.replace(reg,'/')
        }else{
          if(v.now == 2){
            v.end_time = 'Present';
          }
        }
      })
      this.education = this.info.education;
    }
    if (this.info.notes != null) {
      this.notesId = this.info.notes.split(",").map(Number);
    }
    // 获取国籍列表
    let countryList_res = await this.$fetch("getCountryList", {}, 1);
    this.countryList = countryList_res.data;

    this.reset_countryList();

    let province_res = await this.$post("getProvince", {}, 1);
    this.provinceList = province_res.data;

    if (
      res.data.china_address_city_data &&
      res.data.china_address_city_data.province_data
    ) {
      this.provinceSelect_working =
        res.data.china_address_city_data.province_data.id;

      let response = await this.$post(
        "getCity",
        {
          id: res.data.china_address_city_data.province_data.id
        },
        1
      );
      if (response.code === 200) {
        this.cityList_working = response.data;
      }
      this.citySelect_working = res.data.china_address_city_data.city_data.id;
    }

    if (
      res.data.working_city_datas != null &&
      res.data.working_city_datas.length > 2
    ) {
      this.working_city_obj.show_obj_02 = true;
    }
    if (
      res.data.working_city_datas != null &&
      res.data.working_city_datas!= null
    ) {
      this.working_city_obj.show_obj_01 = true;
    }
    if (res.data.working_city_datas != null) {
      for (let index = 0; index < res.data.working_city_datas.length; index++) {
        this.working_city_obj["provinceSelect_" + index] =
          res.data.working_city_datas[index].province_data.id;
        let response = await this.$post(
          "getCity",
          {
            id: res.data.working_city_datas[index].province_data.id
          },
          1
        );
        if (response.code === 200) {
          this.working_city_obj["cityList_" + index] = response.data;
        }
        this.working_city_obj["citySelect_" + index] =
          res.data.working_city_datas[index].city_data.id;
      }
    }
  },
  activated: async function() {}
};
