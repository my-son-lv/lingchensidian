const ageOptions = ['0-3岁', '3-6岁', '7-12岁', '13-18岁', '18岁以上'];

const job_year = ['1年以内', '1-3年', '3-5年', '5-10年', '10年以上'];

const edu_type = ['本科及以上', '研究生及以上', '博士及以上', '不限'];

export default {
  data() {
    return {
      ages: ageOptions,
      job_years: job_year,
      edu_types: edu_type,
      id: this.$route.params.id,
      info: {},
      dialogFormVisible: false,
      dialog_title: '',
      //  dialog使用
      student_ages: [],
      type: '',
      needs_num: '',
      talent: '',
      pay: '',
      city: '',
      cascaderData: {},
      job_list: [],
      typeList: [
        {
          id: 1,
          txt: "培训机构",
        },
        {
          id: 2,
          txt: "幼儿园",
        },
        {
          id: 3,
          txt: "小学",
        },
        {
          id: 4,
          txt: "初中",
        },
        {
          id: 5,
          txt: "高中",
        },
        {
          id: 6,
          txt: "大学",
        },
      ],
    }
  },
  methods: {
    // 编辑
    editCompany() {
      this.$router.push({
        path: '/home/companyMessage',
        query: {
          id: this.id
        }
      })
    },
    back() {
      this.$router.go(-1)
    },
    get_student_age() {

      var str = ''
      if (!this.info.student_age) {
        return str
      }
      var ages = this.info.student_age.split(",");
      ages.forEach(element => {
        switch (element) {
          case "1":
            str += '3岁以下 '
            break;
          case "2":
            str += '3-6岁 '
            break;
          case "3":
            str += '7-12岁 '
            break;
          case "4":
            str += '13-18岁 '
            break;
          case "5":
            str += '18岁以上 '
            break;
          default:
        }
      });

      return str
    },
    get_type() {
      var str = ''
      if (this.info.type) {
        let type_arr = this.info.type.split(',')
        type_arr.forEach(item => {
          switch (parseInt(item)) {
            case 1:
              str += '培训机构,'
              break;
            case 2:
              str += '幼儿园,'
              break;
            case 3:
              str += '小学,'
              break;
            case 4:
              str += '初中,'
              break;
            case 5:
              str += '高中,'
              break;
            case 6:
              str += '大学,'
              break;
            default:
          }
        })
        str = str ? str.substr(0,str.length-1) : str;
      }

      return str
    },
    get_needs_num() {
      var str = ''
      switch (this.info.needs_num) {
        case 1:
          str = '1-10人'
          break;
        case 2:
          str = '10-20人'
          break;
        case 3:
          str = '21-50人'
          break;
        case 4:
          str = '51人以上'
          break;
        default:
      }
      return str
    },
    get_pay() {
      var str = ''
      switch (this.info.pay) {
        case 1:
          str = '15000元以下'
          break;
        case 2:
          str = '15000-20000元'
          break;
        case 3:
          str = '20000元以上'
          break;
        default:
      }
      return str
    },
    handleChange(val) {
      this.city = val[2]
    },
    async cascader_load(node, resolve) {
      if (node && node.data && node.data.id) {
        let res = await this.$post('public/getCitys', {
          id: node.data.id
        })
        res.data.forEach(element => {
          element.leaf = element.level == 3
        });
        resolve(res.data)
      } else {
        resolve()
      }
    },
    back() {
      this.$router.go(-1)
    },
    edit(e) {
      return false;
      this.$prompt('', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: this.info[e],
      }).then(({
        value
      }) => {
        this.edit_post(e, value)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
    async edit_post(e, value) {
      return false;
      var obj = {
        id: this.id
      }
      obj[e] = value
      let res = await this.$post('company/updateCompany', obj)
      if (res.code === 200) {
        this.info[e] = value
        this.$message.success('修改成功')

        if (this.dialog_title === 'city') {
          let res = await this.$post('companyCheck/desc', {
            id: this.id
          })
          this.info = res.data
        }
      }
    },
    edit_dialog(e) {
      return false;
      this.dialog_title = e
      this.dialogFormVisible = true
      this[e] = this.info[e]
    },
    dialog_submit() {
      return false;
      this.dialogFormVisible = false
      this.info[this.dialog_title] = this[this.dialog_title]

      if (this.dialog_title == "student_age") {
        this.student_ages.sort();
        this.edit_post(this.dialog_title, this.student_ages.toString())
        return
      }

      this.edit_post(this.dialog_title, this.info[this.dialog_title])
    },
    job_card_click(item) {
      this.$router.push({
        path: '/home/jobdesc',
        query: {
          id: item.id
        }
      })
    }
  },
  mounted: async function () {
    this.id = this.$route.query.id

    if (!this.$userManager().data) {
      let res = await this.$post('getInfoByToken')
      this.$userManager().data = res.data
    }

    let res = await this.$post('companyCheck/desc', {
      id: this.id
    })
    this.info = res.data



    let city = await this.$post('public/getCitys')

    this.cascaderData = city.data


    let jobList_res = await this.$post('company/jobList', {
      id: this.id
    })

    this.job_list = jobList_res.data.list

    // this.job_list = this.job_list.concat(this.job_list)
  },
  activated: async function () {

  }
}
