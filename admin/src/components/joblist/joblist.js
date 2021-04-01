export default {
  data() {
    return {
      id: this.$route.params.id,
      list: [],
      page: 1,
      count: 1,
      company_list: [],
      edu_type: ['本科及以上', '研究生及以上', '博士及以上', '不限'],
    }
  },
  methods: {
    async handleCurrentChange(val) {
      this.page = val
      let res = await this.$post('company/jobList', {
        id: this.id,
        page: this.page
      })

      if (res.code === 200) {
        this.list = res.data.list
        if (this.list > 0) {
          this.page = res.data.page
          this.count = res.data.count
        }
      }
    },
    statusFormat(row, column) {
      return row.status == 1 ? '打开' : '关闭'
    },
    timeFormat(row, column) {
      if (row.start_time != null && row.end_time != null) {
        return row.start_time.replace('-', '.') + '-' + row.end_time.replace('-', '.')
      };
    },
    createdFormat(row, column) {
      return row.created_at.replace('-', '.').replace('-', '.').substr(0, 10) + '发布'
    },
    async select_change(e) {

      let res = await this.$post('company/jobList', {
        id: e
      })


      if (res.code === 200) {
        this.id = e
        this.list = res.data.list
        this.page = res.data.page
        this.count = res.data.count
      }
    },
    check(row, column, event) {

      this.$router.push({
        path: '/home/jobdesc',
        query: {
          id: row.id
        }
      }).catch(data => {})


    },
    // 关闭
    handleClickClose(row) {
      this.$confirm('是否关闭该职位', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$post('/company/jobClose', {
          id: row.id,
          type: row.status == 1 ? 2 : 1
        }).then(res => {
          if (res.code == 200) {
            this.getList();
            this.$message({
              type: 'success',
              message: '关闭成功!'
            });
          } else {
            this.$message.error(res.msg);
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消关闭'
        });
      });
    },
    // 打开
    handleClickOpen(row) {
      this.$post('/company/jobClose', {
        id: row.id,
        type: row.status == 1 ? 2 : 1
      }).then(res => {
        if (res.code == 200) {
          this.getList();
          this.$message({
            type: 'success',
            message: '开启成功!'
          });
        } else {
          this.$message.error(res.msg);
        }
      })
    },
    // 编辑
    handleClickEdit(row) {
      this.$router.push({
        path: '/home/companyPositionDesc',
        query: {
          id: row.id
        }
      })
    },
    // 删除
    handleClickDel(row) {
      this.$confirm('是否删除该职位', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$post('/company/jobDelete', {
          id: row.id
        }).then(res => {
          if (res.code == 200) {
            this.getList();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          } else {
            this.$message.error(res.msg);
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 获取所有企业列表
    async getList() {
      let res = await this.$post('company/jobList', {
        id: this.id
      })
      if (res.code === 200) {
        this.list = res.data.list
        this.page = res.data.page
        this.count = res.data.count
      }
    },
    // 添加
    handleClickAdd() {
      sessionStorage.setItem('JOBID', this.id);
      this.$router.push('/home/companyPositionDesc');
    },
  },
  mounted: async function () {
    this.id = parseInt( this.$route.query.id);
    let res = await this.$post('company/jobList', {
      id: this.id
    })
    if (res.code === 200) {
      this.list = res.data.list
      this.page = res.data.page
      this.count = res.data.count
    }
    let compaanyList = await this.$post('public/getCompaanyList')
    if (compaanyList.code === 200) {
      this.company_list = compaanyList.data
    }
  },
  activated: async function () {
    

  }
}
