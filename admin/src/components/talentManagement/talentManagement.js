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

export default {
  name: "talentManagement",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      check_info: '',
      options: [],
      titleList: [{
        id: 0,
        name: '全部'
      }, {
        id: 1,
        name: '已约面'
      }, {
        id: 2,
        name: '待面试'
      }, {
        id: 4,
        name: '待签约'
      }, {
        id: 5,
        name: '已录用'
      }, {
        id: 6,
        name: '未通过'
      }, {
        id: 7,
        name: '已结束'
      }, {
        id: 100,
        name: '备选外教'
      }],
      type: 0,
      tableData: [],
      page: 1,
      pageSize: 5,
      count: 0,
      companyId: 0,
      companyStatus: 0,
      activeClass: 0,
      working_seniority_list: working_seniority_list
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    async getAllCompanyList() {
      let res = await this.$post('/public/getCompaanyList');
      if (res.code == 200) {
        this.options = res.data.map(ele => {
          return {
            value: ele.id,
            label: ele.company_name
          }
        })
      }
    },
    async gettablentList() {
      let res = await this.$post('/company/talentList', {
        type: this.type,
        id: this.companyId,
        status: this.companyStatus,
        page: this.page,
        pageSize: this.pageSize
      })
      if (res.code == 200) {
        this.tableData = res.data.list;
        this.count = res.data.count
      }
    },
    // 添加class样式
    addClassState(i) {
      switch (i) {
        // 待面试
        case 0:
          return "already_begun";
      }
    },
    handleCurrentChange(val) {
      this.page = val;
      this.gettablentList();
    },
    valueChange(val) {
      this.companyId = val;
      this.gettablentList();
    },
    getItem(index, id) {
      this.activeClass = index;
      if (id !== 100) {
        this.type = 0;
        this.companyStatus = id;
        this.gettablentList();
      } else {
        this.type = 1;
        this.companyStatus = 0;
        this.gettablentList();
      }
    },
    working_seniority_Format(row) {
      return row.working_seniority ? this.working_seniority_list[row.working_seniority - 1].code : ''
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getAllCompanyList();
    this.companyId = this.$route.query.id;
    this.$nextTick(() => {
      this.gettablentList();
    })
  },
  activated() {

  }
};
