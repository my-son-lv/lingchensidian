import Bus from '../../tools/bus.js'

export default {
  data() {
    return {
      user_info: {},
      officeUrl: 'https://apex.link/',
    }
  },
  methods: {
    sign_out() {
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
    },
    handleClickOffice() {
      window.location.href = this.officeUrl;
    },
  },
  mounted: async function () {
    let res = await this.$post('getInfoByToken')
    this.$userManager().data = res.data
    this.user_info = this.$userManager().data

    // res.data.submit_flg = 0

    let form = this.$route.query.form;

    if (res.data.submit_flg && !form) {
      this.$router.replace({
        path: '/main/searchteach'
      }).catch(data => {})
    } else {
      this.$router.push({
        path: '/home/form'
      }).catch(data => {})
    }

    // if (res.data.status == 2 && res.data.is_read == 2) {
    //   this.$router.replace({
    //     path: '/main/searchteach'
    //   }).catch(data => { })
    // } else {
    //   this.$router.push({
    //     path: '/home/form'
    //   }).catch(data => { })
    // }
  }
}
