import Bus from '../../tools/bus.js'
const degree = [{ id: 1, code: "High School Diploma" }, { id: 2, code: "Associate's Degree" }, { id: 3, code: "Bachelor's Degree" }, { id: 4, code: "Master's Degree" }, { id: 5, code: "MBA" }, { id: 6, code: "PHD" }]

export default {
  data() {
    return {
      search: {
        language_flg: 0, // 搜索条件 非必传 0全部 1母语 2非母语
        nationality: null, // 搜索条件 非必传 国籍id
        page: 1, // 页数 默认1
        pageSize: 10, // 每页条数 非必传默认20
        type: 1, // 1收藏 2候选人
        pay_type: 0,
      },
      options1: [{
        value: 0,
        label: '全部'
      }, {
        value: 1,
        label: '母语国家'
      }, {
        value: 2,
        label: '非母语国家'
      }],
      options2: [],
      count: 1, // 总页数
      loading: false,
      list: [],
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
      ]
    }
  },
  computed: {
    noMore() {
      return this.count <= this.search.page
    },
    disabled() {
      return this.loading || this.noMore
    }
  },
  methods: {
    async select1_change() {
      if (this.search.language_flg == 0) {
        this.search.nationality = null
      }
      let res_province = await this.$post('getNationList', {
        type: this.search.language_flg
      }, this.$baseURL() + '/api/admin/public/')
      this.options2 = res_province.data

      this.search.page = 1
      this.list = []
      this.search_teach()
    },
    select2_change() {
      this.search.page = 1
      this.list = []
      this.search_teach()
    },
    load() {

      if (this.count >= this.search.page) {
        this.loading = true
        this.search.page++
        this.search_teach()
      }

      // setTimeout(() => {
      //     this.count += 10
      //     this.loading = false
      // }, 1000)
    },
    header_btn_click(type) {
      this.search.type = type
      this.search.page = 1
      this.list = []
      this.search_teach()
    },
    pay_type_change() {
      this.search.page = 1
      this.list = []
      this.search_teach()
    },
    detail_click(item) {
      this.$router.push({
        path: '/main/collectlist/teachdesc',
        query: {
          id: item.id
        }
      }).catch(data => { })
    },
    get_pay(pay) {
      var str = ''
      switch (pay) {
        case 1:
          str = '10k-13k'
          break;
        case 2:
          str = '13k-16k'
          break;
        case 3:
          str = '16k-20k'
          break;
        case 4:
          str = '20k-25k'
          break;
        case 5:
          str = '>25k'
          break;
        default:
      }
      return str
    },
    async search_teach() {
      let res = await this.$post('collect/list', this.search)

      // res.data.count = 10

      this.loading = false
      if (res.code == 200) {
        this.list = this.list.concat(res.data.list)
        this.search.page = res.data.page
        this.count = res.data.count

        // for (let index = 0; index < 20; index++) {
        //     this.list.push(this.list[0])
        // }
      }
    }
  },
  mounted: async function () {
    this.search.page = 1
    this.search_teach()
  }
}
