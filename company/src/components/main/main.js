import Bus from '../../tools/bus.js'
import Index from '../../tim/src/index'

export default {
  components: {
    Index
  },
  data() {
    return {
      alert_flg: false,
      alert_text: '',
      alert_btn: '',
      list: [{
          name: '探索外教',
          img_s: require('../../assets/image/aside_s_0.png'),
          img_u: require('../../assets/image/aside_u_0.png'),
          path: '/main/searchteach'
        },
        {
          name: '备选外教',
          img_s: require('../../assets/image/aside_s_1.png'),
          img_u: require('../../assets/image/aside_u_1.png'),
          path: '/main/collectlist'
        },
        {
          name: '发布职位',
          img_s: require('../../assets/image/aside_s_2.png'),
          img_u: require('../../assets/image/aside_u_2.png'),
          path: '/main/joblist'
        },
        {
          name: '外教简历',
          img_s: require('../../assets/image/aside_s_2.png'),
          img_u: require('../../assets/image/aside_u_2.png'),
          path: '/main/resumelist'
        },
        {
          name: '人才管理',
          img_s: require('../../assets/image/aside_s_3.png'),
          img_u: require('../../assets/image/aside_u_3.png'),
          path: '/main/inerviewlist'
        },
        {
          name: '面试管理',
          img_s: require('../../assets/image/aside_s_4.png'),
          img_u: require('../../assets/image/aside_u_4.png'),
          path: '/main/inerview'
        },
        {
          name: '账户管理',
          img_s: require('../../assets/image/aside_s_5.png'),
          img_u: require('../../assets/image/aside_u_5.png'),
          path: '/main/ucenter'
        }
      ],
      aside_index: 0,
      breadList: [], // 路由集合
      user_info: {},
      officeUrl: 'https://apex.link/',
      dialogVisible: false,
      im_user_id: ''
    }
  },
  methods: {
    logout() {
      this.$post('logoutCompany').then((response) => {

        if (response.code === 200) {
          localStorage.setItem('token', '')
          this.$router.push('/login')
          this.$message.success('退出登录成功')
          this.$store.dispatch('logout')
        } else {
          this.message.error('Parameter error.')
        }
      })
    },
    // logo跳转
    handleClickOffice() {
      window.location.href = this.officeUrl;
    },
    aside_click(index) {
      this.aside_index = index
      this.$router.push({
        path: this.list[index].path
      }).catch(data => {})
    },
    getUrl() {
      let currentUrl = window.location.href;
      let currentMenu = currentUrl.split('#')[1].split('/')[2];
      console.log(currentUrl)
      console.log(currentMenu)

      var index
      switch (currentMenu) {
        case 'searchteach':
          index = 0
          break;
        case 'collectlist':
          index = 1
          break;
        case 'joblist':
          index = 2
          break;
        case 'inerviewlist':
          index = 3
          break;
        case 'inerview':
          index = 4
          break;
        case 'ucenter':
          index = 5
          break;
        case 'changeAccount':
          index = 5
          break;
        default:
      }

      this.aside_index = index
    },
    isHome(route) {
      return route.name === "main";
    },
    alert_btn_click() {
      if (this.user_info.status == 1) {
        // 入驻待审核 您当前享有免费查看10位外教福利，入驻审核成功后可查看全, 点击查看
        this.$router.push({
          path: '/home/form',
          query: {
            form: true
          }
        }).catch(data => {})
      } else if (this.user_info.status == 3) {
        // 未通过 您提交的资料暂未通过，通过后可查看全部外教，点击查看
        this.$router.push({
          path: '/home/form',
          query: {
            form: true
          }
        }).catch(data => {})
      } else if (this.user_info.interview) {
        if (this.user_info.interview.status == 1) {
          if (this.getNowFormatDate() != this.user_info.interview.inte_time.substring(0, 10)) {
            // 当天 .今日直接显示时间“*  外教JAM与您的面试12:00开始，请做好准备呦
          } else {
            // 其他日期显示日期+时间“*  外教JAM与您的面试7月20日12:00开始，请做好准备呦”
          }

        } else {
          // JAM与您的您的面试正在进行，点击进入直播间
          // this.room_click()
          this.aside_index = 4
          // this.$router.push({ path: '/main/inerview', query: { id: this.user_info.interview.id } })
          this.$router.push({
            path: '/main/inerview'
          })

          setTimeout(() => {
            Bus.$emit('go_room', {
              id: this.user_info.interview.id
            })
          }, 300);
        }

      } else if (this.user_info.status == 2) {
        if (this.user_info.job_flg) {
          // 已填写招聘需求提示:您享有免费面试外教特权，点击在线顾问可与你的专属顾问沟通

        } else {
          // 未填写招聘需求:恭喜您认证成功，填写招聘需求，让更多外教关注您！立即填写
          this.$router.push({
            path: '/main/jobadd'
          }).catch(data => {})
        }
      }
    },
    async room_click() {
      // this.user_info.interview
      let user_id = "2_" + this.user_info.company_name;
      let teacherId = this.user_info.interview.mid;
      sessionStorage.setItem('teacherId', teacherId);
      let res = await this.$post(this.$baseURL() + '/api/intoRoom', {
        inter_id: this.user_info.interview.id,
        type: 2,
        account: user_id
      });
      if (res.code == 200) {
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
    getBreadcrumb() {
      let matched = this.$route.matched;

      //如果不是首页
      if (!this.isHome(matched[0])) {
        matched = [{
          path: "/mian",
          meta: {
            title: "首页"
          }
        }].concat(matched);
      }
      this.breadList = matched;
    },
    // 在线顾问
    async adviser_click() {
      this.dialogVisible = true
    },
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    }
  },
  created() {},
  watch: {
    $route(to, from) {
      this.getBreadcrumb();
    }
  },
  mounted: async function () {

    this.getUrl();
    this.getBreadcrumb();

    let res = await this.$post('getInfoByToken')

    if (res.code === 200) {
      this.user_info = res.data

      sessionStorage.setItem('companyUserSig', this.user_info.im_user_sig)
      sessionStorage.setItem('companyUserId', this.user_info.im_user_id)
    }

    let r = await this.$post('getImAdviser')
    if (r.code === 200) {
      this.im_user_id = r.data.im_user_id
      sessionStorage.setItem('timUserId', this.im_user_id)
      sessionStorage.setItem('tim_name', r.data.name)

    }

    // 代办条
    if (res.data.status == 1) {
      // 入驻待审核 您当前享有免费查看10位外教福利，入驻审核成功后可查看全, 点击查看
      this.alert_text = '入驻待审核 您当前享有免费查看10位外教福利，入驻审核成功后可查看全部'
      this.alert_btn = '点击查看'
      this.alert_flg = true
    } else if (res.data.status == 3) {
      // 未通过:您提交的资料暂未通过，通过后可查看全部外教，点击查看
      this.alert_text = '您提交的资料暂未通过，通过后可查看全部外教'
      this.alert_btn = '点击查看'
      this.alert_flg = true
    } else if (res.data.interview) {

      if (res.data.interview.status == 1) {
        console.log(this.getNowFormatDate())
        console.log(res.data.interview.inte_time.substring(0, 10))
        if (this.getNowFormatDate() == res.data.interview.inte_time.substring(0, 10)) {
          // 当天 .今日直接显示时间“*  外教JAM与您的面试12:00开始，请做好准备呦
          this.alert_text = '外教' + res.data.interview.first_name + '与您的面试' + res.data.interview.inte_time.substring(11, 16) + '开始，请做好准备呦'
        } else {
          // 其他日期显示日期+时间“*  外教JAM与您的面试7月20日12:00开始，请做好准备呦”
          this.alert_text = '外教' + res.data.interview.first_name + '与您的面试' + res.data.interview.inte_time.substring(5, 10).replace('-', '月') + '日 ' + res.data.interview.inte_time.substring(11, 16) + '开始，请做好准备呦'
        }

        this.alert_btn = ''
      } else {
        // JAM与您的面试正在进行，点击进入直播间
        this.alert_text = res.data.interview.first_name + '与您的面试正在进行，点击进入直播间'
        this.alert_btn = '进入房间'
      }

      this.alert_flg = true

    } else if (res.data.status == 2) {
      if (res.data.job_flg) {
        // 已填写招聘需求提示:您享有免费面试外教特权，点击在线顾问可与你的专属顾问沟通
        this.alert_text = '您享有免费面试外教特权，点击在线顾问可与你的专属顾问沟通'
        this.alert_btn = ''

      } else {
        // 未填写招聘需求:恭喜您认证成功，填写招聘需求，让更多外教关注您！立即填写
        this.alert_text = '未填写招聘需求:恭喜您认证成功，填写招聘需求，让更多外教关注您！'
        this.alert_btn = '立即填写'
      }
      this.alert_flg = true
    }

    this.$bus.$on('closeMask', (obj) => {
      this.dialogVisible = obj
      if (obj == false) {
        this.$store.dispatch('logout')
      }
    })

    this.$bus.$on('changeLogo', (obj) => {
      if (this.user_info.logo_path && this.user_info.logo_path.length > 0) {
        this.user_info.logo_path[0].path = obj
      }
    })
  }
}
