export default {
  data() {
    return {
      active: 0,
      user_info: {},
      old_pwd: '',
      update_phone: {
        phone: '',
        code: ''
      },
      phone_exist_flg: false,
      time: 60,
      sendTitle: '获取验证码',
    }
  },
  methods: {
    async next_step_1() {
      let res = await this.$post('checkPassword', { password: this.old_pwd })
      if (res.code == 200) {
        if (res.data.check_password == true) {
          this.active = 1
        } else {
          this.$message.error('密码错误')
        }
      }
    },
    async phone_exist() {
      let regPhone = /^1[0-9][0-9]{9}$/;
      if (!regPhone.test(this.update_phone.phone)) {
        this.$message.error('请输入正确手机号')
      }

      let res = await this.$post('isPhoneExist', { phone: this.update_phone.phone })
      if (res.code == 200) {
        if (res.data.flg) {
          this.$message.error('您输入的手机号已被注册, 请重新输入')
          this.phone_exist_flg = false
        } else {
          this.phone_exist_flg = true
          this.send_check_sms()
        }
      }
    },
    async send_check_sms() {
      let res = await this.$post('sendCheckSms', { phone: this.update_phone.phone })
      if (res.code == 200) {
        this.$message.success('短信验证码已发送')
        let that = this
        this.timeInterval = setInterval(function () {
          that.myTimer()
        }, 1000)
      }
    },
    async next_step_2() {
      // 13004674906
      let res = await this.$post('updatePhoneByCode', this.update_phone)
      if (res.code == 200) {
        this.active = 2
      } else {
        this.$message.error('验证码失效或过期')
      }
    },
    myTimer() {
      this.sendTitle = this.time
      this.time--
      if (this.time === 0) {
        this.time = 60
        this.sendTitle = '重新获取'
        clearInterval(this.timeInterval)
      }
    },
    re_login() {
      this.$post('logoutCompany').then((response) => {
        if (response.code === 200) {
          localStorage.setItem('token', '')
          this.$router.replace('/login')
          this.$message.success('退出登录成功')
          this.$store.dispatch('logout')
        } else {
          this.message.error('Parameter error.')
        }
      })
    }
  },
  mounted: async function () {
    let res = await this.$post('getInfoByToken')
    this.user_info = res.data
  }
}
