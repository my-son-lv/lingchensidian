import Bus from '../../tools/bus.js'

export default {
  data() {
    return {
      search: {
        page: 1, // 页数 默认1
        pageSize: 10, // 每页条数 非必传默认20
      },
      list: [],
      count: 1, // 总页数
      loading: false,
      vip: 0,
      allListNum: 0,
      vipUrl: 'https://www.apex.link/vip',
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
    //急聘
    async jiping_click(item) {
      event.stopPropagation();
      this.$confirm('您将发起急聘服务，是否确认使用该功能?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$post('/job/jiping', { id: item.id }).then(res => {
          if (res.code == 200) {
            this.$message('您已成功发起急聘服务');
          } else if (res.code == 2500003) {
            this.$alert('升级会员享有更多会员专属权益！', {
              confirmButtonText: '确定',
              callback: action => {
                window.open(this.vipUrl, '_blank');
              }
            });
          } else if (res.code == 2500002) {
            this.$alert('您套餐内的急聘服务已用尽，请联系顾问升级套餐！', {
              confirmButtonText: '确定',
              callback: action => {
                window.open(this.vipUrl, '_blank');
              }
            });
          } else {
            this.$message.error(res.msg);
          }
        }).catch(err => { })
      }).catch(() => { });
    },
    //推送
    async tuisong_click(item) {
      event.stopPropagation();
      this.$confirm('您将发起精准推送服务，是否确认使用该功能?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$post('/job/jingzhuntuisong', { id: item.id }).then(res => {
          if (res.code == 200) {
            this.$message('您已成功发起精准推送服务');
          } else if (res.code == 2500003) {
            this.$alert('升级会员享有更多会员专属权益！', {
              confirmButtonText: '确定',
              callback: action => {
                window.open(this.vipUrl, '_blank');
              }
            });
          } else if (res.code == 2500002) {
            this.$alert('您套餐内的精准推送服务已用尽，请联系顾问升级套餐！', {
              confirmButtonText: '确定',
              callback: action => {
                window.open(this.vipUrl, '_blank');
              }
            });
          } else {
            this.$message.error(res.msg);
          }
        }).catch(err => { })
      }).catch(() => { });

    },
    toudishu(id) {
      this.$router.push({
        path: '/main/resumelist',
        query: {
          id: id
        }
      }).catch(data => { })
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
        this.search_job_list()
      }
    },
    async search_job_list() {

      let res = await this.$post('/job/list', this.search)
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
    get_sex(sex) {
      let str
      switch (sex) {
        case 0:
          str = '不限'
          break;
        case 1:
          str = '男'
          break;
        case 2:
          str = '女'
          break;
        default:
      }
      return str
    },
    get_edu_type(edu_type) {
      // 学历 1 Bachelor and above 2 Master and above 3 PHD and above 4 不限
      let str
      switch (edu_type) {
        case 1:
          str = 'Bachelor and above'
          break;
        case 2:
          str = 'Master and above'
          break;
        case 3:
          str = 'PHD and above'
          break;
        case 4:
          str = 'Any'
          break;
        default:
      }
      return str
    },
    async cell_click(item, tag) {
      // 0 查看
      // 1 编辑
      // 2 关闭
      // 3 删除
      event.stopPropagation();


      switch (tag) {
        case 0:
          this.$router.push({
            path: '/main/joblist/jobdesc',
            query: {
              id: item.id
            }
          }).catch(data => { })
          break;
        case 1:
          this.$router.push({
            path: '/main/jobedit',
            query: {
              id: item.id
            }
          }).catch(data => { })
          break;
        case 2:
          this.$confirm('是否关闭该职位', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$post('/job/close', {
              id: item.id,
              type: item.status == 1 ? 2 : 1
            }).then(res => {
              if (res.code == 200) {
                this.search_job_list()
                this.$message({
                  type: 'success',
                  message: '关闭成功'
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
          break;
        case 3:
          this.$confirm('是否删除该职位', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$post('/job/del', {
              id: item.id,
            }).then(res => {
              if (res.code == 200) {
                this.search_job_list()
                this.$message({
                  type: 'success',
                  message: '删除成功'
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
          break;
        // let res_d = await this.$post('/job/del', {
        //   id: item.id
        // })
        // if (res_d.code == 200) {
        //   this.$message.success('删除职位成功')

        //   for (var i = this.list.length - 1; i >= 0; i--) {
        //     if (this.list[i].id === item.id) {
        //       this.list.splice(i, 1);
        //       break
        //     }
        //   }
        // } else {
        //   this.$message.error(error_msg)
        // }
        // break;
        default:
      }
    },
    // 置顶
    handleClickTop(id) {
      this.$post('/job/top', {
        id: id,
        type: 1,
      }).then(res => {
        if (res.code == 200) {
          this.$confirm('是否将职位置顶到外教平台招聘首页，置顶时间为7天?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.search_job_list();
          }).catch(() => { });
        } else if (res.code == 2000215) {
          this.$confirm('您当前已用完置顶特权，续费会员可享有更多置顶特权，外教平台优先展示', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            window.open('https://www.apex.link/vip', '_bank');
          }).catch(() => { });
        } else if (res.code == 2000216) {
          this.$confirm('您当前不可置顶职位，充值会员可享有置顶特权，外教平台优先展示', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            window.open('https://www.apex.link/vip', '_bank');
          }).catch(() => { });
        } else {
          this.$message.error(res.msg);
        }
      })
    },
    // 取消置顶
    handleClickCancelTop(id) {
      this.$confirm('取消置顶？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$post('/job/top', {
          id: id,
          type: 2,
        }).then(res => {
          if (res.code == 200) {
            this.$message({
              message: '取消成功',
              type: 'success'
            });
            this.search_job_list();
          } else {
            this.$message.error(res.msg);
          };
        })
      }).catch(() => { });
    },
    handleClickExperience() {
      window.open('https://www.apex.link/vip', '_bank');
    },
    async getInfoByToken() {
      let res = await this.$post('getInfoByToken');
      if (res.code == 200) {
        this.vip = res.data.vip;
        this.allListNum = res.data.job_num;
      } else {
        this.$message.error(res.msg);
      }
    }
  },
  created() {
    this.getInfoByToken();
  },
  mounted: async function () {
    this.search.page = 1
    this.search_job_list()

    Bus.$on('joblist_need_refresh', (data) => {
      this.search.page = 1
      this.search_job_list()
    })
  }
}
