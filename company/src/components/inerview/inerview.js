import Bus from '../../tools/bus.js'

const status_list = ['全部', '已约面', '待面试', '面试中', '待签约', '已录用', '未通过', '已结束', '已取消', '已过期']
const degree = [{
  id: 1,
  code: "High School Diploma"
}, {
  id: 2,
  code: "Associate's Degree"
}, {
  id: 3,
  code: "Bachelor's Degree"
}, {
  id: 4,
  code: "Master's Degree"
}, {
  id: 5,
  code: "MBA"
}, {
  id: 6,
  code: "PHD"
}]

export default {
  data() {
    return {
      type: 1,
      name: null,
      search: {
        date: null, // 2020-06 不填默认当月
      },
      loglist: {
        start_time: null, // 开始时间 2020-10-12
        end_time: null, // 结束时间 2020-10-13
        page: 1, // 页数 默认1
        pageSize: 6 // 每页条数 默认6
      },
      dialog_list: [],
      dialogFormVisible: false,
      value1: null,
      count: 1, // 总页数
      value: new Date(),
      list: [],
      loading: false,
      teach_info_list: [],
      log_list: [],
      degree: degree,
      pay_type_list: [{
          id: 0,
          code: "全部"
        },
        {
          id: 1,
          code: "面议"
        },
        {
          id: 2,
          code: "10-15K"
        },
        {
          id: 3,
          code: "15-20K"
        },
        {
          id: 4,
          code: "20K+"
        }
      ],
      pay_type_list1: [{
        id: 0,
        code: "全部"
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
        id: 4,
        code: ">25K"
      }
    ],
      status_list: status_list,
      companyName: '',
      btnList: [{
        id: 1,
        value: '通过'
      }, {
        id: 2,
        value: '未通过'
      }, {
        id: 3,
        value: '候选'
      }],
      activeClass: -1,
      interViewEndMask: false,
      contentMask: true,
      scoreMask: false,
      wholeValue: 0,
      temperamentValue: 0,
      skillValue: 0,
      expressionValue: 0,
      companyEvaluate: '',
      typeId: 0,
      interViewTeacherList: null,
      textsList: ['很差', '较差', '一般', '满意', '非常满意'],
      colorsList: ['#C4DF16', '#C4DF16', '#C4DF16']
    }
  },
  computed: {
    noMore() {
      return this.count <= this.loglist.page
    },
    disabled() {
      return this.loading || this.noMore
    }
  },
  watch: {
    value(newName, oldName) {

      if (this.get_time(newName) == this.get_time(oldName)) {


        let y = newName.getFullYear()
        let m = newName.getMonth() + 1
        let d = newName.getDate()

        if (m.toString().length == 1) {
          m = "0" + m;
        }

        if (d.toString().length == 1) {
          d = "0" + d;
        }

        let time = y + '-' + m + '-' + d

        this.teach_info_list = []

        this.list.forEach(element => {
          if (element.time == time) {
            this.teach_info_list = element.list
          }
        })

        // for (let index = 0; index < 20; index++) {
        //     this.teach_info_list.push(this.teach_info_list[0])
        // }


      } else {
        // this.$message.success('月份不一致')
        this.search.date = this.get_time(newName)
        this.search_daylist()
      }
    }
  },
  methods: {
    async getUserInfoByToken() {
      let res = await this.$post('getInfoByToken');
      if (res.code == 200) {
        this.companyName = res.data.company_name;
      }
    },
    async search_daylist() {
      let res = await this.$post('inerview/daylist', this.search)
      if (res.code == 200) {
        this.list = res.data.list
        let y = this.value.getFullYear()
        let m = this.value.getMonth() + 1
        let d = this.value.getDate()
        if (m.toString().length == 1) {
          m = "0" + m;
        }

        if (d.toString().length == 1) {
          d = "0" + d;
        }

        let time = y + '-' + m + '-' + d

        this.teach_info_list = []

        this.list.forEach(element => {
          if (element.time == time) {
            this.teach_info_list = element.list
          }
        })
      }
    },
    get_time(date) {
      let y = date.getFullYear()
      let m = date.getMonth() + 1

      if (m.toString().length == 1) {
        m = "0" + m;
      }
      return y + '-' + m
    },
    header_btn_click(type) {
      this.type = type
    },
    async search_loglist() {
      let res = await this.$post('inerview/logList', this.loglist)
      // res.data.count = 10

      this.loading = false

      if (res.code == 200) {
        this.log_list = this.log_list.concat(res.data.list)
        this.count = res.data.count
        this.loglist.page = res.data.page

        // for (let index = 0; index < 20; index++) {
        //     this.log_list.push(this.log_list[0])
        // }

      }
    },
    load() {
      if (this.count >= this.loglist.page) {
        this.loading = true
        this.loglist.page++
        this.search_loglist()
      }
    },
    detail_click(item) {
      console.log(item)
      this.dialogFormVisible = false

      this.$router.push({
        path: 'inerview/teachdesc',
        query: {
          id: item.info_mid,
          // type: 1
        }
      }).catch(data => {})
    },
    async room_click(item) {
      // event.stopPropagation();
      let user_id = "2_" + this.companyName;
      let teacherId = item.id;
      sessionStorage.setItem('teacherId', teacherId);
      let res = await this.$post(this.$baseURL() + '/api/intoRoom', {
        inter_id: item.id,
        type: 2,
        account: user_id
      });
      if (res.code == 200) {
        sessionStorage.setItem('teacherItem', JSON.stringify(item));
        let sdkId = res.data.SDK_APP_ID;
        let userSig = res.data.USER_SIGN;
        let roomId = res.data.room_id;
        let type = 2;
        let companyMessage = res.data.user;
        this.$router.push({
          name: 'realTimeCall',
          params: {
            sdkId,
            userSig,
            roomId,
            user_id,
            type,
            companyMessage
          }
        })
      } else {
        this.$message.error(res.msg)
      }

    },
    loglist_click() {
      if (this.value1 && this.value1.length > 0) {
        this.loglist.start_time = this.value1[0]
        this.loglist.end_time = this.value1[1]
      } else {
        this.loglist.start_time = null
        this.loglist.end_time = null
      }
      this.log_list = []
      this.search_loglist()
    },
    async search_name() {

      let res = await this.$post('inerview/daylist', {
        name: this.name
      })
      if (res.code == 200 && res.data.list.length > 0) {
        this.dialogFormVisible = true
        this.dialog_list = []
        res.data.list.forEach(element => {
          element.list.forEach(e => {
            this.dialog_list.push(e)
          });
        })
      }
    },
    getItem(id, index) {
      this.activeClass = index;
      this.contentMask = false;
      this.scoreMask = true;
      this.typeId = id;
    },
    async submitBtn() {
      if (this.wholeValue == 0 || this.temperamentValue == 0 || this.skillValue == 0 || this.expressionValue == 0) {
        return;
      } else {
        let res = await this.$post('/inerview/resultInter', {
          type: this.typeId,
          inter_id: sessionStorage.getItem('teacherId'),
          all: this.wholeValue,
          qualities: this.temperamentValue,
          skill: this.skillValue,
          info: this.expressionValue,
          memo: this.companyEvaluate
        });
        if (res.code == 200) {
          this.interViewEndMask = false;
          this.search_daylist()
        } else {
          this.$message.error(res.msg);
        }
      }
    }
  },
  created() {
    this.search_daylist()
    if(localStorage.getItem('endMask')){
      this.interViewEndMask =true;
      localStorage.removeItem('endMask')
    }
  },
  mounted: async function () {
    this.search.date = this.get_time(new Date())

    this.search_loglist()
    this.getUserInfoByToken()
    Bus.$on('go_room', obj => {
      this.room_click(obj);
    });
    Bus.$on('endMask', obj => {
      this.interViewEndMask = obj;
      let localTeacherItem = JSON.parse(sessionStorage.getItem('teacherItem'));
      this.interViewTeacherList = localTeacherItem;
    })
  }
}
