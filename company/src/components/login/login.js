export default {
  data() {
    return {
      officeUrl: 'https://apex.link/',
      captcha: {},
      drawer_register: false,
      drawer_type: 0,
      checked: false,
      register_loading: false,
      time: 60,
      submit_loading: false,
      sendTitle: '发送短信验证码',
      timeInterval: Object,
      ruleForm_login: {
        phone: '',
        password: ''
      },
      rules_login: {
        phone: [{
            required: true,
            message: '请输入手机号码',
            trigger: 'change'
          },
          {
            validator: function (rule, value, callback) {
              if (/^1[123456789]\d{9}$/.test(value) == false) {
                callback(new Error("请输入正确的手机号"));
              } else {
                callback();
              }
            },
            trigger: 'change'
          }
        ],
        password: [{
            required: true,
            min: 6,
            message: '密码至少大于6位',
            trigger: 'change'
          },
          {
            required: true,
            max: 20,
            message: '密码至少小于20位',
            trigger: 'change'
          }
        ]
      },
      ruleForm_register: {
        phone: '',
      },
      rules_register: {
        phone: [{
            required: true,
            message: '请输入手机号码',
            trigger: 'change'
          },
          {
            validator: function (rule, value, callback) {
              if (/^1[123456789]\d{9}$/.test(value) == false) {
                callback(new Error("请输入正确的手机号"));
              } else {
                callback();
              }
            },
            trigger: 'change'
          }
        ],
      },
      ruleForm_register2: {
        code: '',
        smscode: '',
        pwd: '',
        rpwd: '',
        invite_code: ''
      },
      rules_register2: {
        code: [{
          required: true,
          min: 4,
          message: '请输入4位图片验证码',
          trigger: 'change'
        }],
        smscode: [{
          required: true,
          min: 6,
          message: '请输入6位短信验证码',
          trigger: 'change'
        }],
        pwd: [{
            required: true,
            min: 6,
            message: '密码至少大于6位',
            trigger: 'change'
          },
          {
            required: true,
            max: 20,
            message: '密码至少小于20位',
            trigger: 'change'
          }
        ],
        rpwd: [{
            required: true,
            min: 6,
            message: '密码至少大于6位',
            trigger: 'change'
          },
          {
            required: true,
            max: 20,
            message: '密码至少小于20位',
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    handleClickOffice() {
      window.location.href = this.officeUrl;
    },
    async drawerClick(type) {
      this.drawer_register = true
      this.drawer_type = type
      this.checked = type
      this.get_captcha()
    },
    terms_of_use() {
      window.open(this.$baseURL() + '/pdf/User_Agreement.pdf', '_blank')
    },
    register_cancel() {

      this.drawer_register = false
      this.$refs['ruleForm_register'].resetFields()
      this.$refs['ruleForm_register2'].resetFields()
    },
    async get_captcha() {
      // 获取验证码图片
      let res = await this.$fetch('captcha')
      this.captcha = res.data[0]
      document.getElementById('code_img').src = res.data[0].img
    },
    send_code() {
      this.$refs['ruleForm_register'].validate((valid) => {
        if (valid) {
          this.sendSms()
        } else {
          this.$message.error('请填写正确的手机号码')
          return false
        }
      })
    },
    async sendSms() {

      if (this.drawer_type === 0) {
        // 注册需验证用户名是否存在
        let res = await this.$post('isPhoneExist', {
          phone: this.ruleForm_register.phone
        })
        if (res.code === 200 && res.data.flg === true) {
          this.$message.error('当前手机号码已注册')
          return
        }
      }

      if (this.ruleForm_register2.code.length < 4) {
        this.$message.error('请填写4位图片验证码')
        return
      }

      let that = this

      let data = {
        phone: this.ruleForm_register.phone,
        key: this.captcha.key,
        code: this.ruleForm_register2.code
      }
      let res = await this.$post('sendSms', data)
      if (res.code === 200) {
        this.$message.success('短信验证码已发送')
        this.register_loading = true
        this.timeInterval = setInterval(function () {
          that.myTimer()
        }, 1000)
      } else {
        this.$message.error('图片验证码错误')
        this.get_captcha()
      }
    },
    register_submit() {
      this.$refs['ruleForm_register2'].validate((valid) => {
        if (valid) {
          if (this.ruleForm_register2.pwd === this.ruleForm_register2.rpwd) {
            this.post_register()
          } else {
            this.$message.error('两次密码输入不一致')
          }
        } else {
          this.$message.error('请填写完整信息')
          return false
        }
      })
    },
    async post_register() {
      let data = {
        phone: this.ruleForm_register.phone,
        code: this.ruleForm_register2.smscode,
        password: this.ruleForm_register2.pwd,
        invite_code: this.ruleForm_register2.invite_code
      }

      let res
      if (this.drawer_type == 0) {
        let share_code = localStorage.getItem('share_code')
        if (share_code) {
          data.invite_code = share_code
        }
        res = await this.$post('companyRegister', data)
      } else {
        res = await this.$post('companyRestPassword', data)
      }

      if (res.code === 200) {
        // 注册成功
        this.ruleForm_login.phone = this.ruleForm_register.phone
        this.ruleForm_login.password = this.ruleForm_register2.pwd
        this.drawer_register = false
        this.ruleForm_register.phone = ''
        this.ruleForm_register2.code = ''
        this.ruleForm_register2.pwd = ''
        this.ruleForm_register2.rpwd = ''
        this.ruleForm_register2.smscode = ''
        this.$refs['ruleForm_register'].resetFields()
        this.$refs['ruleForm_register2'].resetFields()
        this.$message.success(this.drawer_type == 0 ? '注册成功' : '重置密码成功')
      } else if (res.code === 100003) {
        // 账号已存在
        this.$message.error('账号已存在')
      } else {
        // 验证码失效
        this.$message.error('验证码失效')
      }
    },
    myTimer() {
      this.sendTitle = this.time
      this.time--
      if (this.time === 0) {
        this.time = 60
        this.sendTitle = '发送短信验证码'
        clearInterval(this.timeInterval)
        this.register_loading = false
      }
    },
    login_click() {

      this.$refs['ruleForm_login'].validate((valid) => {
        if (valid) {
          // 登录
          this.login_loading = true
          let data = {
            phone: this.ruleForm_login.phone,
            password: this.ruleForm_login.password
          }

          this.$post('companyLogin', data)
            .then((response) => {
              this.login_loading = false


              // 登录成功
              if (response.code === 200) {

                if (response.data.token) {
                  localStorage.setItem('token', response.data.token)
                }

                this.$userManager().data = response.data


                sessionStorage.setItem('companyUserSig', response.data.im_user_sig)
                sessionStorage.setItem('companyUserId', response.data.im_user_id)

                this.$router.push({
                  name: 'home',
                  params: response.data
                })
              } else {
                this.$message.error(response.msg)
              }

            }).catch(err => {
              this.login_loading = false
            })
        }
      })
    },
  },
  mounted: async function () {
    // this.get_captcha()
    // this.drawer_register = true

    let code = this.$route.query.code
    if (code) {
      localStorage.setItem('share_code', code)
    }

    let token = localStorage.getItem('token')
    if (token) {
      this.$post('getInfoByToken').then((response) => {

        if (response.code === 200) {
          this.$userManager().data = response.data

          this.$router.push({
            name: 'home',
            params: response.data
          })
          this.$message.success('login successs')
        }
      })
    }
  }
}
