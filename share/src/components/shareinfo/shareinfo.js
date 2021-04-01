export default {
  components: {},
  data() {
    return {
      info: {
        url: '',
        img: '',
        phone: '', // 18511514465
      },
      nav_select: 0,
      list_1: [],
      list_2: [],
      list_3: [],
      msg_zh: '',
      msg_en: '',
    }
  },
  methods: {
    saveCode() {
      this.$router.push('/shareImg');
    },
    call() {
      console.log(this.info.phone)
      window.location.href = 'tel://17201213999'
    },
    save() {
      var w = window.open('about:blank', 'image from canvas');
      w.document.write("<img src='" + this.info.img + "' alt='from canvas'/>");
    },
    onCopy(e) { // 复制成功
      this.$message({
        message: '复制成功！',
        type: 'success'
      })
    },
    onError(e) { // 复制失败
      this.$message({
        message: '复制失败！',
        type: 'error'
      })
    },
    nav_click(e) {
      console.log(e)
      this.nav_select = e
      this.invite_count()
    },
    async invite_count() {


      let res = await this.$post('inviteCount', {
        phone: this.info.phone,
        type: this.nav_select
      })

      if (res.code == 200) {
        this.list_1 = res.data.list

        if (this.nav_select == 0) {
          if (res.data.list.length > 0) {
            if (res.data.money2 > 0) {
              // 有成功入驻
              // this.msg_zh = '您的推荐共有' + res.data.count + '人注册，现有' + res.data.count + '人将信息已提交每个人员被审核通过后您会获得' + res.data.money1 + '元现金红包您将最高可领取' + res.data.money2 + '元现金红包'
              this.msg_en = 'Registration Status Check your friends registration status <Sign up succeeded>,contact 17001213999, get your reward!'
            } else {
              // this.msg_zh = '您的推荐共有' + res.data.count + '人将信息提交至平台，暂没有人入驻成功，每个人员成功入驻后您会获得50元现金红包 '
              this.msg_en = 'Registration Status Check your friends registration status <Sign up succeeded>,contact 17001213999, get your reward!'
            }
          } else {
            // this.msg_zh = '您推荐的朋友暂没有人入驻成功，快联系您的朋友去平台提交信息吧。每个人员被审核通过后您会获得' + res.data.money1 + '元现金红包'
            this.msg_en = 'Registration Status Check your friends registration status <Sign up succeeded>,contact 17001213999, get your reward!'
          }
        } else if (this.nav_select == 1) {
          if (res.data.list.length > 0) {
            if (res.data.count1 > 0) {
              // 有签约成功
              // this.msg_zh = '您的推荐共有' + res.data.count + '人将信息已提交，现有' + res.data.count1 + '人入驻成功，您已获得' + res.data.money1 + '元现金红包，每个人员被签约后您可获得' + res.data.money2 + '元现金红包，您将最高可领取' + res.data.money3 + '元现金红包'
              this.msg_en = 'Registration Status Check your friends registration status <Sign up succeeded>,contact 17001213999, get your reward!'
            } else {
              // this.msg_zh = '您的推荐共有' + res.data.count + '人入驻成功，暂未有人签约成功，每个人员被企业成功签约后您可获得' + res.data.money2 + '元现金红包'
              this.msg_en = 'Registration Status Check your friends registration status <Sign up succeeded>,contact 17001213999, get your reward!'
            }
          } else {
            // this.msg_zh = '您推荐的朋友暂没有人入驻成功，快联系您的朋友去平台提交信息吧。每个人员被审核通过后您会获得' + res.data.money1 + '元现金红包'
            this.msg_en = 'Registration Status Check your friends registration status <Sign up succeeded>,contact 17001213999, get your reward!'
          }
        } else {
          if (res.data.list.length > 0) {
            if (res.data.count1 > 0) {
              // 有签约成功
              // this.msg_zh = '您的推荐共有' + res.data.count + '人入驻成功，现有' + res.data.count1 + '人签约成功，您已获得' + res.data.money1 + '元现金红包'
              this.msg_en = 'Registration Status Check your friends registration status <Sign up succeeded>,contact 17001213999, get your reward!'
            } else {
              // this.msg_zh = '您的推荐共有' + res.data.count + '人入驻成功，暂未有人签约成功，每个人员被企业成功签约后您可获得' + res.data.money1 + '元现金红包'
              this.msg_en = 'Registration Status Check your friends registration status <Sign up succeeded>,contact 17001213999, get your reward!'
            }
          } else {
            // this.msg_zh = '您推荐的朋友暂没有人签约成功，快联系您的朋友去平台提交信息吧，每个人员被审核成功后您会获得' + res.data.money1 + '元现金红包，签约成功后您可获得' + res.data.money2 + '元现金红包'
            this.msg_en = 'Registration Status Check your friends registration status <Sign up succeeded>,contact 17001213999, get your reward!'
          }
        }
      }
    },
    get_info_1(item) {
      // 0 注册  1提交  2成功 3失败
      // item.status = 3
      let str
      switch (item.status) {
        case 1:
          str = "已提交信息"
          break;
        case 2:
          str = "您已获得" + item.money + "元现金红包"
          break;
        case 3:
          str = "请通知您的朋友重新提交"
          break;
        default:
      }

      if (this.nav_select == 1) {
        if (item.sign_status) {
          // 已签约
          str = "您已获得" + item.money + "元现金红包"

        } else {
          // 未签约
          str = "已提交信息"
        }
      }

      if (this.nav_select == 2) {
        str = "您已获得" + item.money + "元现金红包"
      }

      return str
    },
    get_info_2(item) {
      // 0 注册  1提交  2成功 3失败

      // item.status = 3
      let str
      switch (item.status) {
        case 1:
          str = "Submitted information"
          break;
        case 2:
          str = "You have got " + item.money + " RMB"
          break;
        case 3:
          str = "Please notify your friend to resubmit"
          break;
        default:
      }

      if (this.nav_select == 1) {
        if (item.sign_status) {
          // 已签约
          str = "You have got " + item.money + " RMB"

        } else {
          // 未签约
          str = "Submitted information"
        }
      }

      if (this.nav_select == 2) {
        str = "You have got " + item.money + " RMB"
      }

      return str
    },
    get_info_3(item) {
      let str
      switch (item.status) {
        case 1:
          str = "等待审核"
          break;
        case 2:
          str = "入驻成功"
          break;
        case 3:
          str = "等待审核"
          break;
        default:
      }

      if (this.nav_select == 1) {
        if (item.sign_status) {
          // 已签约
          str = "签约成功"

        } else {
          // 未签约
          str = "等待签约"
        }
      }

      if (this.nav_select == 2) {
        str = '签约成功'
      }

      return str
    },
    get_info_4(item) {
      let str
      switch (item.status) {
        case 1:
          str = "Waiting for audit"
          break;
        case 2:
          str = "In a successful"
          break;
        case 3:
          str = "Waiting for audit"
          break;
        default:
      }

      if (this.nav_select == 1) {
        if (item.sign_status) {
          // 已签约
          str = "Sign up success"
        } else {
          // 未签约
          str = "Waiting for the contract"
        }
      }

      if (this.nav_select == 2) {
        str = 'Sign up success'
      }

      return str
    },
  },
  mounted: async function () {
    this.info = this.$route.params
    console.log(this.info)
    if (this.info.img) {
      localStorage.setItem('img', this.info.img)
      localStorage.setItem('url', this.info.url)
      localStorage.setItem('phone', this.info.phone)
    } else {
      this.info.img = localStorage.getItem('img')
      this.info.url = localStorage.getItem('url')
      this.info.phone = localStorage.getItem('phone')
    }

    // this.info.phone = '17001213999'

    this.invite_count()
  }
}
