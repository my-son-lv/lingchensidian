import Bus from '../../tools/bus.js'

// const certOptions = ['Required', 'Not required'];
const ageOptions = ['0-3years old', '3-6years old', '7-12years old', '13-18years old', '18+years old'];

export default {
  components: {},
  data() {
    return {
      benefits_tag: [
        {
          flg: false,
          id: 1,
          value: 'Annual Bonus',
        },
        {
          flg: false,
          id: 2,
          value: 'Insurance',
        },
        {
          flg: false,
          id: 3,
          value: 'Apartment',
        },
        {
          flg: false,
          id: 4,
          value: 'House Allowance',
        },
        {
          flg: false,
          id: 5,
          value: 'Flight Allowance',
        },
        {
          flg: false,
          id: 6,
          value: 'Paid Leave',
        },
      ],
      ages: ageOptions,
      allPayUnit: [
        {
          value: "Per Hour",
          id: 1,
        },
        {
          value: "Per Day",
          id: 2,
        },
        {
          value: "Per Week",
          id: 3,
        },
        {
          value: "Per Month",
          id: 4,
        },
        {
          value: "Per Year",
          id: 5,
        },
      ],
      teaching_time2: '',
      teaching_time1: '',
      info: {
        benefits_tag: '',
        teaching_time: '',
        pay_unit: 4,
        name: '', // 职位名称
        sex: 0, // 0不限 1男 2女 
        type: 3, // 1线下 2线上
        first_language: 0, // 0不限 1母语 2非母语
        job_city: '', // 工作地id
        language: 1, // 1英语 默认1
        job_type: 1, // 职能 1学前语言 2中小学教育 3成人教育 4出国培训 5其他 默认1
        // job_week_day: null, // 一周工作几天 英文逗号分隔 例:5,6
        job_day_time: null, // 一天工作几个小时 1 6小时以下； 2 6-8小时；3 8-10小时；4 10小时以上
        // pay_type: 1, // 1月薪 2时薪 3待定 默认1 薪资类型
        pay: '', // 薪资 区间 例：15,20 英文逗号分隔 单位K
        money_type: 1, // 1人民币 2美元 默认1
        edu_type: 1, // 学历 1 Bachelor and above 2 Master and above 3 PHD and above 4 不限
        cert: '', // 证书 多个英文逗号分隔 1 TEFL 2 TESOL 3 TESL 4 CELTA
        job_year: 2, // 工作年限 1 Less than 1 year； 2 1-3years；3 3-5years；4 5-10years；5 More than 10 years
        num: null, // 招聘人数
        start_time: '', // 招聘开始时间 2020-12
        // end_time: '', // 招聘结束时间 2030-12
        benefits: '', // 福利待遇
        job_info: '', // 工作介绍
        memo: '', // 备注 非必填
        colour: 0, // 肤色 0不限 1白色
        work_type: 1, // 工作性质
        student_age: [], // 学生年龄
        visa_ask: 1,

      },
      startDuration: '',
      endDuration: '',
      sex_list: [{
        value: 0,
        label: 'Any'
      }, {
        value: 1,
        label: 'Male'
      }, {
        value: 2,
        label: 'Female'
      }],
      type_list: [{
        value: 1,
        label: 'Offline'
      }, {
        value: 2,
        label: 'Online'
      }, {
        value: 3,
        label: 'Any'
      }],
      language_list: [{
        value: 0,
        label: 'Any'
      }, {
        value: 1,
        label: 'Native English Countries'
      }, {
        value: 2,
        label: 'Non-native English Countries'
      }],
      colour_list: [{
        value: 0,
        label: 'Any'
      }, {
        value: 1,
        label: 'White'
      }],
      cascaderData: [],
      // pay_type_list: [{
      //   value: 1,
      //   label: '月薪'
      // }, {
      //   value: 2,
      //   label: '时薪'
      // }, {
      //   value: 3,
      //   label: '待定'
      // }],
      // money_type_list: [{
      //   value: 1,
      //   label: '人民币 '
      // }, {
      //   value: 2,
      //   label: '美元'
      // }],
      cert_list: [{
        id: 1,
        value: 'Required',
      },
      {
        id: 2,
        value: 'Not required',

      }
      ],
      cert: [],
      // job_week_day_list: [{
      //   value: 1,
      //   label: '1天'
      // }, {
      //   value: 2,
      //   label: '2天'
      // }, {
      //   value: 3,
      //   label: '3天'
      // }, {
      //   value: 4,
      //   label: '4天'
      // }, {
      //   value: 5,
      //   label: '5天'
      // }, {
      //   value: 6,
      //   label: '5天以上'
      // }],
      job_day_time_list: [],
      job_year_list: [{
        value: 1,
        label: 'Less than 1 year'
      }, {
        value: 2,
        label: '1-3years'
      }, {
        value: 3,
        label: '3-5years'
      }, {
        value: 4,
        label: '5-10years'
      }, {
        value: 5,
        label: 'More than 10 years'
      }],
      pay_min_list: [],
      pay_max_list: [],
      pay_min: null,
      pay_max: null,
      pay_list: [],
      pay_unit_list: [],
      back: false,
      job_day_time_min_list: null,
      job_day_time_max_list: null,
      job_day_time_min: null,
      job_day_time_max: null,
      work_type_list: [{
        value: 1,
        label: 'Any'
      }, {
        value: 2,
        label: 'Full-time'
      }, {
        value: 3,
        label: 'Part-time'
      }],
      visa_ask_list: [{
        value: 1,
        label: 'Z visa'
      }, {
        value: 2,
        label: 'Any'
      }],
    }
  },
  methods: {
    fuli_tag_clik(index) {
      this.benefits_tag[index].flg = !this.benefits_tag[index].flg
      let that = this
      that.info.benefits_tag = "";
      this.benefits_tag.forEach(function (v, k) {
        if (v.flg === 1) {
          that.info.benefits_tag += v.id + ",";
        }
      });
      that.info.benefits_tag = that.info.benefits_tag
        ? that.info.benefits_tag.substring(0, that.info.benefits_tag.length - 1)
        : "";
    },
    handleChange(val) {
      this.info.job_city = val[2]
    },
    async cascader_load(node, resolve) {

      if (node && node.data && node.data.id) {
        let res = await this.$post('getCity', {
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
    pay_min_change(e) {
      let i = 0
      for (let index = 0; index < this.pay_min_list.length; index++) {
        const element = this.pay_min_list[index];
        if (element.value === e) {
          i = index
          break
        }
      }
      this.pay_max_list = this.pay_list.slice(i + 1, i + 6)
      this.pay_max = this.pay_max_list[0].value
    },
    job_day_min_change(e) {
      this.job_day_time_max_list = this.job_day_time_list.slice(e - 1, this.job_day_time_list.length)
      this.job_day_time_max = this.job_day_time_max_list[0].value
    },
    async submit() {
      let error_msg
      if (!this.info.name) {
        error_msg = '请填写职位名称'
      } else if (this.info.job_city == '') {
        error_msg = '请填写工作地址'
      } else if (this.teaching_time1 == '') {
        error_msg = '请填写教学时长'
      } else if (this.teaching_time2 == '') {
        error_msg = '请填写教学时长'
      } else if (!this.pay_min) {
        error_msg = '请填写薪资'
      } else if (!this.info.num) {
        error_msg = '请填写招聘人数'
      } else if (!this.info.start_time) {
        error_msg = '请填写计划上岗时间'
      } else if (!this.info.job_info) {
        error_msg = '请填写工作介绍'
      }

      if (error_msg) {
        this.$message.error(error_msg)
        return
      }
      if (parseInt(this.endDuration) < parseInt(this.startDuration)) {
        let tmp = this.startDuration;
        this.startDuration = this.endDuration;
        this.endDuration = tmp;
      }
      if (parseInt(this.teaching_time2) < parseInt(this.teaching_time1)) {
        let tmp = this.teaching_time1;
        this.teaching_time1 = this.teaching_time2;
        this.teaching_time2 = tmp;
      }
      if (parseInt(this.pay_max) < parseInt(this.pay_min)) {
        let tmp = this.pay_min;
        this.pay_min = this.pay_max;
        this.pay_max = tmp;
      }
      // 处理数据
      this.info.type = this.info.type
      this.info.work_type = this.info.work_type
      this.info.pay = this.pay_min + ',' + this.pay_max
      this.info.teaching_time = this.teaching_time1 + ',' + this.teaching_time2
      this.info.job_day_time = this.startDuration + ',' + this.endDuration
      let temp_age = this.info.student_age
      this.info.student_age.sort();
      this.info.student_age = this.info.student_age.toString()
      let res = await this.$post('job/add', this.info)
      this.info.student_age = temp_age
      if (res.code == 200) {
        this.$message.success('创建职位成功')
        Bus.$emit('joblist_need_refresh')
        this.$router.go(-1)
      } else if (res.code == 2000219) {
        this.$confirm('您的发布职位额度已上限，续费会员可发布更多招聘需求', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          window.open('https://www.apex.link/vip', '_bank');
        }).catch(() => { });
      } else {
        this.$message.error(res.msg)
      }
    },
    go_back() {
      this.$router.go(-1)
    },
  },
  mounted: async function () {
    let res = await this.$post('getCity')
    this.cascaderData = res.data

    let desc = await this.$post('getComapnyDesc')
    console.log(desc.data.student_age)

    let student_age = desc.data.student_age
    let a = student_age.split(',')
    this.info.student_age = a.map(Number)
    console.log(this.info.student_age);
  },
  created: function () {


    var str = window.location.href;
    if (str.indexOf("home/jobadd") != -1) {
      this.back = true
    } else {
      this.back = false
    }

    // alert(window.location.href)

    // 下拉：1k;2k;3k;...;30k;35k;40k;...100k;110k;120k;130k;...;200k;
    //       根据已填写的框，不超过5个跨度；
    //       如最低1k，最高2k；3k；4k；5k；6k；
    //       如最低30k，则最高35k；40k；45k；50k；55k；
    //       初始填写栏只有最低薪资栏，选择后出现最高薪资栏和月数；如图所示：

    for (let index = 1; index <= 250; index++) {
      if (index < 30) {
        this.pay_min_list.push({
          value: index,
          label: index + 'K'
        })
        this.pay_list.push({
          value: index,
          label: index + 'K'
        })
      } else if (index >= 30 && index <= 100) {
        if (index % 5 == 0) {
          this.pay_min_list.push({
            value: index,
            label: index + 'K'
          })
          this.pay_list.push({
            value: index,
            label: index + 'K'
          })
        }
      } else if (index >= 100 && index <= 200) {
        if (index % 10 == 0) {
          this.pay_min_list.push({
            value: index,
            label: index + 'K'
          })
          this.pay_list.push({
            value: index,
            label: index + 'K'
          })
        }
      } else {
        if (index % 10 == 0) {
          this.pay_list.push({
            value: index,
            label: index + 'K'
          })
        }
      }
    }

    // 薪资月份
    for (let index = 12; index <= 24; index++) {
      this.pay_unit_list.push({
        value: index,
        label: index + '个月'
      })
    }

    // 每周工作时长
    for (let index = 1; index <= 40; index++) {
      this.job_day_time_list.push({
        value: index,
        label: index + '小时'
      })
    }
  }
}
