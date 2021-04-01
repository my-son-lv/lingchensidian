import Bus from '../../tools/bus.js'

const status_list = ['全部', '已约面', '待面试', '面试中', '待签约', '已录用', '未通过', '已结束', '已取消', '已过期']
const degree = [{ id: 1, code: "High School Diploma" }, { id: 2, code: "Associate's Degree" }, { id: 3, code: "Bachelor's Degree" }, { id: 4, code: "Master's Degree" }, { id: 5, code: "MBA" }, { id: 6, code: "PHD" }]
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
  { id: 11, code: "More than 10years" }]
const pay_type_list = [{ id: 1, code: "10k-13k" }, { id: 2, code: "13k-16k" }, { id: 3, code: "16k-20k" }, { id: 4, code: "20k-25k" }, { id: 5, code: ">25k" }]

export default {
  data() {
    return {
      type: 1,
      name: null,
      search: {
        date: null, // 2020-06 不填默认当月
        company_name: '',
        name: '',
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
      pay_type_list: pay_type_list,
      working_seniority_list: working_seniority_list,
      status_list: status_list,
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
    rili_click() {
      this.$router.go(-1)
    },
    async search_daylist() {
      let res = await this.$post('interview/daylist', this.search)


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
      let res = await this.$post('interview/logList', this.loglist)
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
      this.dialogFormVisible = false

      this.$router.push({
        name: 'teachdesc',
        query: {
          id: item.id,
          type: 1
        }
      }).catch(data => { })
    },
    async room_click(item) {
      event.stopPropagation();

      let user_id

      let get_token = await this.$post('getInfoByToken')
      if (get_token.code === 200) {
        user_id = '1_' + get_token.data.name
      }

      let res = await this.$post(this.$baseURL() + '/api/intoRoom', {
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
          name: 'realTimeCall',
          params: {
            sdkId,
            userSig,
            roomId,
            user_id,
            type
          }
        })
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
      let res = await this.$post('interview/daylist', this.search)
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
    get_company_advier(company_advier) {


      if (company_advier.length > 0) {
        var str = ''
        company_advier.forEach(element => {
          str += element.name
        });
        return str
      } else {
        return '无'
      }
    },
    reset() {
      this.search.company_name = ''
      this.search.name = ''
      this.value1 = null
    }
  },
  mounted: async function () {

    this.search.date = this.get_time(new Date())

    this.search_daylist()
    this.search_loglist()
  },
  destroyed() {
  }
}
