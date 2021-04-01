import pdf from "vue-pdf";
import axios from "../../apis/http";
export default {
  components: {
    pdf
  },
  data() {
    return {
      drawer_register: false,
      drawer_type: 0,
      checked: false,
      login_loading: false,
      register_loading: false,
      submit_loading: false,
      time: 60,
      sendTitle: "Send",
      timeInterval: Object,
      ruleForm_login: {
        id: "",
        pwd: ""
      },
      rules_login: {
        id: [
          {
            required: true,
            type: "email",
            message: "Please enter a valid email address",
            trigger: ["blur", "change"]
          }
        ],
        pwd: [
          {
            required: true,
            min: 6,
            message: "Password cannot be less than 6 characters",
            trigger: "change"
          },
          {
            required: true,
            max: 20,
            message: "Password limited to 20 characters.",
            trigger: "change"
          }
        ]
      },
      ruleForm_register: {
        name: "",
        email: ""
      },
      rules_register: {
        name: [
          {
            required: true,
            min: 2,
            message: "Name cannot be less than 2 characters",
            trigger: "change"
          },
          {
            required: true,
            max: 50,
            message: "Password limited to 50 characters.",
            trigger: "change"
          }
        ],
        email: [
          {
            required: true,
            type: "email",
            message: "Please enter a valid email address",
            trigger: ["blur", "change"]
          }
        ]
      },
      ruleForm_register2: {
        code: "",
        pwd: "",
        rpwd: ""
      },
      rules_register2: {
        code: [
          {
            required: true,
            min: 6,
            message: "Verification code must be 6 characters",
            trigger: "change"
          }
        ],
        pwd: [
          {
            required: true,
            min: 6,
            message: "Password cannot be less than 6 characters",
            trigger: "change"
          },
          {
            required: true,
            max: 20,
            message: "Password limited to 20 characters.",
            trigger: "change"
          }
        ],
        rpwd: [
          {
            required: true,
            min: 6,
            message: "Password cannot be less than 6 characters",
            trigger: "change"
          },
          {
            required: true,
            max: 20,
            message: "Password limited to 20 characters.",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    handleClickOffice() {
      this.$router.replace({
        path: "/"
      });
    },
    drawerClick(type) {
      this.drawer_register = true;
      this.drawer_type = type;
      this.rules_register.name.forEach(v => {
        v.required = this.drawer_type === 0 ? true : false;
      });
      this.checked = type;
    },
    register_cancel() {
      this.drawer_register = false;
      this.$refs["ruleForm_register"].resetFields();
      this.$refs["ruleForm_register2"].resetFields();
    },
    async send(formName) {
      if (this.drawer_type === 0) {
        // 注册需验证用户名是否存在
        let res = await axios.post("/api/index/isMemberExist", {
          email: this.ruleForm_register.email
        });

        if (res.code === 200 && res.data.flg === true) {
          this.$message.error("This email address is already in use.");
          return;
        }
      }

      let that = this;

      this.$refs[formName].validate(valid => {
        if (valid) {
          // 发送请求
          let data = {
            email: this.ruleForm_register.email
          };

          this.register_loading = true;
          this.timeInterval = setInterval(function() {
            that.myTimer();
          }, 1000);

          axios.post("/api/index/sendCode", data).then(response => {
            if (response.data.code === 200) {
              this.$message.success("send successfully");
            } else {
              this.message.error("Parameter error.");
            }
          });
        } else {
          // this.$message.error('error submit!!')
          return false;
        }
      });
    },
    register_submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.validate_send();
        } else {
          // this.$message.error('error submit!!')
          return false;
        }
      });
    },
    validate_send() {
      this.$refs["ruleForm_register2"].validate(valid => {
        if (valid) {
          if (this.ruleForm_register2.pwd === this.ruleForm_register2.rpwd) {
            this.submit_loading = true;
            if (this.drawer_type === 0) {
              // 注册
              let data = {
                email: this.ruleForm_register.email,
                nick_name: this.ruleForm_register.name,
                code: this.ruleForm_register2.code,
                password: this.ruleForm_register2.pwd
              };

              let share_code = localStorage.getItem("share_code");
              if (share_code) {
                data.invite_code = share_code;
              }

              axios.post("/api/index/register", data).then(response => {
                this.submit_loading = false;

                // 注册成功
                if (response.data.code === 200) {
                  this.ruleForm_login.id = this.ruleForm_register.email;
                  this.ruleForm_login.pwd = this.ruleForm_register2.pwd;
                  this.drawer_register = false;

                  this.ruleForm_register.name = "";
                  this.ruleForm_register.email = "";
                  this.ruleForm_register2.code = "";
                  this.ruleForm_register2.pwd = "";
                  this.ruleForm_register2.rpwd = "";
                  this.$refs["ruleForm_register"].resetFields();
                  this.$refs["ruleForm_register2"].resetFields();
                  this.$message.success("Signed up successfully");
                } else if (response.data.code === 100003) {
                  // 账号已存在
                  this.$message.error("Account already exists.");
                } else {
                  // 验证码失效
                  this.$message.error("Verification Code Expire.");
                }
              });
            } else {
              // 忘记密码
              let data = {
                email: this.ruleForm_register.email,
                code: this.ruleForm_register2.code,
                password: this.ruleForm_register2.pwd
              };

              axios.post("/api/index/forgetPassword", data).then(response => {
                this.submit_loading = false;

                // 忘记密码成功
                if (response.data.code === 200) {
                  this.ruleForm_login.id = this.ruleForm_register.email;
                  this.ruleForm_login.pwd = this.ruleForm_register2.pwd;
                  this.drawer_register = false;

                  this.ruleForm_register.name = "";
                  this.ruleForm_register.email = "";
                  this.ruleForm_register2.code = "";
                  this.ruleForm_register2.pwd = "";
                  this.ruleForm_register2.rpwd = "";
                  this.checked = false;
                  this.$refs["ruleForm_register"].resetFields();
                  this.$refs["ruleForm_register2"].resetFields();
                  this.$message.success("Password reset successfully");
                } else if (response.data.code === 100003) {
                  // 账号已存在
                  this.$message.error("Account already exists.");
                } else {
                  // 验证码失效
                  this.$message.error("Verification Code Expire.");
                }
              });
            }
          } else {
            this.$message.error("Passswords do not match, please re-enter.");
          }
        } else {
          this.$message.error("Error");
          return false;
        }
      });
    },
    login_click() {
      this.$refs["ruleForm_login"].validate(valid => {
        if (valid) {
          // 登录
          this.login_loading = true;
          let data = {
            email: this.ruleForm_login.id,
            password: this.ruleForm_login.pwd
          };

          axios
            .post("/api/index/login", data)
            .then(response => {
              this.login_loading = false;
              // 登录成功
              if (response.data.code == 200) {
                localStorage.setItem("token", response.data.data.token);
                switch (response.data.data.status) {
                  case 1:
                    this.$router.push("/toExaminePage");
                    break;
                  case 2:
                    this.$router.push("/myResume");
                    break;
                  case 3:
                    this.$router.push("/toExaminePage");
                    break;
                  default:
                    this.$router.push("/welcome");
                }
              } else {
                // 验证码失效
                this.$message.error("Email or password error, login failed.");
              }
            })
            .catch(err => {
              this.login_loading = false;
            });
        } else {
          this.$message.error("Error");
          return false;
        }
      });
    },
    myTimer() {
      this.sendTitle = this.time;
      this.time--;
      if (this.time === 0) {
        this.time = 60;
        this.sendTitle = "Send";
        clearInterval(this.timeInterval);
        this.register_loading = false;
      }
    },
    terms_of_use() {
      window.open("https://api.apex.link/pdf/User_Agreement.pdf", "_blank");
    },
    Privacy_Policy() {
      window.open("https://api.apex.link/pdf/Privacy.pdf", "_blank");
    }
  },
  mounted: async function() {
    let code = this.$route.query.code;

    if (code) {
      localStorage.setItem("share_code", code);
      this.drawer_register = true;
    }

    let token = localStorage.getItem("token");
    if (token) {
      axios
        .post("/api/index/getStatusByToken", {
          token: token
        })
        .then(response => {
          if (response.data.code === 200) {
            switch (response.data.data.status) {
              case 1:
                this.$router.push("/toExaminePage");
                break;
              case 2:
                this.$router.push("/myResume");
                break;
              case 3:
                this.$router.push("/toExaminePage");
                break;
              default:
                this.$router.push("/welcome");
            }
          }
        });
    }
  }
};
