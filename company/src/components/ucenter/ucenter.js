const ageOptions = ['0-3years old', '3-6years old', '7-12years old', '13-18years old', '18+years old'];
const status_list = [{
  name: '全部',
  status: 0
}, {
  name: '待签署',
  status: 2
}, {
  name: '已完成',
  status: 3
}, {
  name: '已拒绝',
  status: 4
}, {
  name: '已逾期',
  status: 5
}]

export default {
  name: "ucenter",
  data() {
    return {
      status_list: status_list,
      ages: ageOptions,
      active: 0,
      isloading: false,
      typeList: [
        {
          id:1,
          txt:'培训机构',
        },
        {
          id:2,
          txt:'幼儿园',
        },
        {
          id:3,
          txt:'小学',
        },
        {
          id:4,
          txt:'初中',
        },
        {
          id:5,
          txt:'高中',
        },
        {
          id:6,
          txt:'大学',
        },
      ],
      type:[],
      user_info: {
        school_en_info:'',
        company_name: '',
        business_img: '',
        tyep:[],
        city: '',
        address: '',
        talent: 1,
        talent_img: '',
        student_age: [],
        // abroad_staff: null,
        needs_num: 1,
        // pay: 1,
        contact: '',
        contact_phone: '',
        work_email: '',
        business_flg: 1,
        business_name: '',
        school_img_1: '',
        school_img_2: '',
        submit_type: 2
      },
      cascaderData: [],
      business_img_path: '',
      logo_path: '',
      logo_path_2: '',
      talent_img_path: '',
      school_img_1_path: '',
      school_img_2_path: '',
      info: {},
      merger_name: '',
      phone: '',
      logo: '',
      page_type: 1,
      check_info: {
        page: 1,
        pageSize: 5,
        status: 0,
      },
      list: [],
      count: 0,
      platInfo: {}
    }
  },
  methods: {
    onchangeUploadVideo(file) {},
    handleChange(val) {
      this.user_info.city = val[2]
    },
    async cascader_load(node, resolve) {

      if (node && node.data && node.data.id) {
        let res = await this.$post('getCity', {
          id: node.data.id
        })
        res.data.forEach(element => {
          element.leaf = element.level == 3
        });
        resolve(res.data)
      } else {
        resolve()
      }
    },
    onchangeUpload_business(file) {
      this.upload_image(file, 'business_img')
    },
    onchangeUpload_talent(file) {
      this.upload_image(file, 'talent_img')
    },
    onchangeUpload_logo(file) {
      this.upload_image(file, 'logo')
    },
    onchangeUpload_school_1(file) {
      this.upload_image(file, 'school_img_1')
    },
    onchangeUpload_school_2(file) {
      this.upload_image(file, 'school_img_2')
    },
    upload_image(file, key) {
      var that = this
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isLt5M) {
        this.$message.error('上传图片应小于5M')
        return false
      }

      let fd = new FormData()
      fd.append('file', file.raw)
      fd.append('type', 0)

      that.$post('upload', fd, this.$baseURL() + '/api/index/').then((response) => {

        if (response.code === 200) {
          if (key == 'logo') {
            this.logo = response.data.id
          } else {
            this.user_info[key] = response.data.id
          }
          let k = key + '_path'
          this[k] = response.data.path
        }
      })
    },
    async save_logo() {

      if (!this.logo) {
        this.$message.error('请先上传头像')
      }

      let res = await this.$post('updateLogo', {
        logo: this.logo
      })
      if (res.code == 200) {
        this.$message.success('保存头像成功')
        this.logo_path_2 = res.data.logo_path
        this.logo_path = ''
        this.logo = ''
        this.$bus.$emit("changeLogo", res.data.logo_path.path);
      }
    },
    async submit_and_next() {
      this.user_info.type = JSON.parse(JSON.stringify(this.type)).toString();
      let regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      let regPhone = /^1[0-9][0-9]{9}$/;
      var error_msg

      if (this.user_info.company_name == '') {
        error_msg = '请填写学校名称'
      } else if (this.user_info.city == '') {
        error_msg = '请选择学校地址'
      } else if (this.user_info.address == '') {
        error_msg = '请填写详细地址'
      } else if (this.user_info.student_age.length == 0) {
        error_msg = '请填写学生年龄'
      } else if (this.user_info.contact == '') {
        error_msg = '联系人姓名'
      } else if (this.user_info.contact_phone == '') {
        error_msg = '请填写联系电话'
      } else if (this.user_info.contact_phone != '' && !regPhone.test(this.user_info.contact_phone)) {
        error_msg = '手机号格式不正确'
      }
      //  else if (this.user_info.work_email == '') {
      //   error_msg = '请填写工作邮箱'
      // } else if (this.user_info.work_email != '' && !regEmail.test(this.user_info.work_email)) {
      //   error_msg = '邮箱格式不正确'
      // }

      if (error_msg) {
        this.$message.error(error_msg)
        return
      }

      var student_age_s = this.user_info.student_age
      this.user_info.student_age.sort();
      let student_age_string = this.user_info.student_age.toString()
      let data = this.user_info
      data.student_age = student_age_string
      data.submit_type = 2
      let res = await this.$post('submitCompany', data)
      if (res.code === 200) {
        this.$message.success('保存成功')
      }
      data.student_age = student_age_s
    },
    async cancelCheck() {
      let res = await this.$post('cancelCheck')
      if (res.code === 200) {
        this.active = 0
      }
    },
    async read_success() {
      let res = await this.$post('checkRead')
      if (res.code === 200) {
        this.$message.success('审核通过已读')
        this.$router.replace({
          path: '/main'
        }).catch(data => {})
      }
    },
    async read_failed() {
      let res = await this.$post('checkRead')
      if (res.code === 200) {
        this.active = 0
      }
    },
    header_btn_click(page_type) {
      this.page_type = page_type

      if (page_type == 2) {
        this.search()
      }
    },
    handleClickData() {
      this.page_type = 3;
    },
    async search() {
      let res = await this.$fetch('contract/list', this.check_info)
      if (res.code == 200) {
        console.log(res.data.data)
        this.list = res.data.data
        if (this.list.length > 0) {
          this.check_info.page = res.data.current_page
          this.count = res.data.last_page
        }
      }
    },
    change_account_click() {
      this.$router.push({
        path: 'ucenter/changeAccount'
      })
    },
    get_status(row) {
      var str
      switch (row.status) {
        case 1:
          str = '草稿' // 查看
          break;
        case 2:
          str = '待签署' // 详情 预览 催办 撤销
          break;
        case 3:
          str = '已完成' // 详情 预览
          break;
        case 4:
          str = '已拒绝' // 详情 预览
          break;
        case 5:
          str = '已逾期' // 详情 预览
          break;
        case 6:
          str = '已撤回' // 详情 预览
          break;
        default:
          break;
      }
      return str
    },
    async handleCurrentChange(val) {
      this.check_info.page = val
      let res = await this.$fetch('contract/list', this.check_info)
      if (res.code === 200) {
        this.list = res.data.data
        if (this.list.length > 0) {
          this.check_info.page = res.data.current_page
          this.count = res.data.last_page
        }
      }
    },
    async check(index, row) {
      let res = await this.$fetch('contract/signView', {
        id: row.id
      })
      if (res.code == 200) {
        window.open(res.data.url, '_blank')
      }
    },
    select_change() {
      this.check_info.page = 1
      this.search()
    },
    go_form() {
      this.$router.push({
        path: '/home/form',
        query: {
          form: true
        }
      }).catch(data => {})
    },
    handleClickLook() {
      window.open('https://www.apex.link/vip', '_bank');
    },
    async getPlatData() {
      let res = await this.$fetch('/vip/getPlatData');
      if (res.code == 200) {
        this.platInfo = res.data;
      }
    }
  },
  created() {
    this.getPlatData();
  },
  mounted: async function () {
    let res = await this.$post('getCity')
    this.cascaderData = res.data

    let token = await this.$post('getInfoByToken')
    this.$userManager().data = token.data
    if (token.data.status == 2) {
      this.active = 0
    } else {
      this.active = 5
    }

    let desc = await this.$post('getComapnyDesc')
    if (desc.data.business_img_path.length > 0) {
      this.business_img_path = desc.data.business_img_path[0].path
    }

    if (desc.data.school_img_1_path) {
      this.school_img_1_path = desc.data.school_img_1_path.path
    }
    if (desc.data.school_img_2_path) {
      this.school_img_2_path = desc.data.school_img_2_path.path
    }

    this.merger_name = desc.data.city_name.merger_name.replace(/,/g, ' / ').replace('中国 /', '');
    this.phone = desc.data.phone
    this.logo_path_2 = desc.data.logo_path

    let u_info = this.user_info
    for (var key in u_info) {
      // console.log(key)
      u_info[key] = desc.data[key]
    }
    u_info.student_age = u_info.student_age.split(',')
    u_info.student_age = u_info.student_age.map(Number)
    let type = desc.data['type'].split(',');
    type.forEach(item => {
       this.type.push(parseInt(item))
    });
    // this.user_info = desc.data
  }
}
