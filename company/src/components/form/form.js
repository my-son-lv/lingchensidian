import Bus from '../../tools/bus.js'

const ageOptions = ['0-3years old', '3-6years old', '7-12years old', '13-18years old', '18+years old'];

export default {
  data() {
    return {
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
        type: '',
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
        logo: '',
        business_flg: 1,
        business_name: '',
        school_img_1: '',
        school_img_2: ''
      },
      cascaderData: [],
      business_img_path: '',
      logo_path: '',
      talent_img_path: '',
      school_img_1_path: '',
      school_img_2_path: '',
      info: {},
      job_list: []
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
          this.user_info[key] = response.data.id

          let k = key + '_path'
          this[k] = response.data.path
        }
      })
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


      this.user_info.student_age.sort();
      let student_age_string = this.user_info.student_age.toString()

      let data = this.user_info
      data.student_age = student_age_string

      let res = await this.$post('submitCompany', data)
      this.user_info.student_age = []

      if (res.code === 200) {
        this.active = 1
      }
    },
    async cancelCheck() {
      let res = await this.$post('cancelCheck')
      if (res.code === 200) {
        this.active = 0
      }
    },
    async to_home() {
      this.$router.replace({
        path: '/main'
      }).catch(data => {})
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
      this.active = 0
      //   let res = await this.$post('checkRead')
      //   if (res.code === 200) {

      //   }
    },
    write_needs() {
      this.$router.push({
        name: 'jobadd',
        params: {
          back: true
        }
      })
    },
    check_needs() {
      this.$router.push({
        name: 'jobdesc',
        query: {
          id: this.job_list[0].id
        }
      })
    },
    async getToken() {
      let res = await this.$post('getInfoByToken');
      if (res.code == 200) {
        this.info = res.data;
        if (this.info.status == 1) {
          this.active = 1
        } else if (this.info.status == 2) {
          this.active = 2
        } else if (this.info.status == 3) {
          this.active = 3
        };
      }
    }
  },
  created() {
    this.getToken();
  },
  mounted: async function () {

    let res = await this.$post('getCity')
    this.cascaderData = res.data
    if (!this.$userManager().data) {
      let res = await this.$post('getInfoByToken')
      this.$userManager().data = res.data
    }
    let info = this.$userManager().data
    this.info = info
    if (info.status == 1) {
      this.active = 1
    } else if (info.status == 2) {
      this.active = 2
    } else if (info.status == 3) {
      this.active = 3
    };

    // 获取企业职位列表
    let job_list = await this.$post('job/list')
    this.job_list = job_list.data.list
    console.log(JSON.stringify(job_list))
  }
}
