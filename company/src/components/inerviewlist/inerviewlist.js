import Bus from '../../tools/bus.js'
import Filter from '../../filter/filter.js'


const status_list = ['全部', '已约面', '待面试', '面试中', '待签约', '已录用', '未通过', '已结束', '已取消', '已过期']

export default {
  data() {
    return {
      search: {
        page: 1, // 页数 默认1
        pageSize: 10, // 每页条数 非必传默认20
        status: 0
      },
      list: [],
      count: 1, // 总页数
      loading: false,
      status_list: status_list,
      dialogVisible: false,
      interview_speed_list: [],
      job_update_dialogVisible: false,
      current_item: {},
      time: ''
    }
  },
  computed: {
    noMore() {
      return this.count <= this.search.page
    },
    disabled() {
      return this.loading || this.noMore
    },
    classObject() {
      return function (item) {
        var c = 'row_status'

        if (item.status == 1) {
          c = 'row_status_y'
        } else if (item.status == 2) {
          c = 'row_status_b'
        }

        return c
      }
    }
  },
  methods: {
    header_btn_click(status) {
      this.search.status = status
      this.search.page = 1
      this.list = []
      this.search_inerview_list()
    },
    add_job() {
      this.$router.push({
        path: '/main/jobadd'
      }).catch(data => { })
    },
    load() {
      if (this.count >= this.search.page) {
        this.loading = true
        this.search.page++
        this.search_inerview_list()
      }
    },
    async search_inerview_list() {

      let res = await this.$post('inerview/list', this.search)
      // res.data.count = 10

      this.loading = false
      if (res.code == 200) {

        if (this.search.page == 1) {
          this.list = res.data.list
        } else {
          this.list = this.list.concat(res.data.list)
        }
        this.search.page = res.data.page
        this.count = res.data.count

        // for (let index = 0; index < 20; index++) {
        //     this.list.push(this.list[0])
        // }
      }
    },
    get_row_detail(item) {

      var str = ''
      var myDate = new Date();
      let degree = ["副学士", "学士", "硕士", "MBA", "博士"]
      let pays = ["面试", "10-15K", "15-20K", "20K+"]
      str += item.nationality_val + ' | '
      str += Filter.filterWorkingYear(item.working_seniority) + ' | '
      str += item.sex ? '女' : '男'
      str +=  ' | '
      if (item.brithday) {
        str += myDate.getFullYear() - item.brithday.substring(0, 4) + '岁 | '
      }
      str += degree[item.university - 1] + ' | '
      str += pays[item.pay_type - 1]

      return str
    },
    async cell_click(item, tag) {
      // 0 查看
      // 1 编辑
      // 2 取消
      // 3 查看进度
      event.stopPropagation();


      switch (tag) {
        case 0:
          this.$router.push({
            path: 'inerviewlist/teachdesc',
            query: {
              id: item.id,
              type: 1
            }
          }).catch(data => { })
          break;
        case 1:
          this.job_update_dialogVisible = true
          this.current_item = item
          this.time = item.inte_time
          break;
        case 2:
          let res = await this.$post('inerview/cancelInvite', {
            id: item.id
          })
          if (res.code == 200) {
            this.$message.success('取消面试成功')
          } else {
            this.$message.error(res.msg)
          }
          break;
        case 3:
          let res_d = await this.$post('inerview/interviewSpeed', {
            id: item.id
          })
          if (res_d.code == 200) {
            this.dialogVisible = true
            this.interview_speed_list = res_d.data
          } else {
            this.$message.error(res.msg)
          }
          break;
        default:
      }
    },
    async job_update_click() {
      this.job_update_dialogVisible = false
      let res = await this.$post('inerview/update', {
        id: this.current_item.id,
        time: this.time
      })
      if (res.code == 200) {
        this.$message.success('修改面试时间成功')
        this.current_item.inte_time = this.time
      } else {
        this.$message.error(res.msg)
      }
    }
  },
  mounted: async function () {
    this.search.page = 1
    this.search_inerview_list()

    Bus.$on('joblist_need_refresh', (data) => {
      this.search.page = 1
      this.search_inerview_list()
    })
  }
}
