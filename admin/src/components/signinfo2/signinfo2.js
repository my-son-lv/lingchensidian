import {
  Loading
} from 'element-ui';

export default {
  data() {
    return {
      id: this.$route.params.id,
      sign: {
        b_company_name: '',
        money: '',    
        day:'',
      },
      notice: 1,
      notice_1: false,
      notice_2: false,
      dialogVisible: false,
    }
  },
  methods: {

    async next_click() {

      if (this.money == '') {
        this.$message.error('未填写合同金额')
        return
      }
      if (this.day == '') {
        this.$message.error('未填写限制日期')
        return
      }
      this.dialogVisible = true
    },
    async send() {
      this.dialogVisible = false
      if (this.notice_1) {
        this.notice = '1'
      }

      if (this.notice_2) {
        this.notice = '2'
      }

      if (this.notice_1 && this.notice_2) {
        this.notice = '1,2'
      }

      let loadingInstance = Loading.service({
        fullscreen: true
      });

      let res = await this.$post('sing_contracts/sign', {
        contract_data:JSON.stringify(this.sign),
        id: this.id,
        type: 2,
        notice:this.notice,
      })

      loadingInstance.close();

      if (res.code === 200) {
        this.$message.success('发送合同成功')
        this.$router.replace("/home/sign");
      }
    },
    async save_click() {

      if (this.money = '') {
        this.$message.error('未填写合同金额')
        return
      }

      
      
      let res = await this.$post('sing_contracts/sign', {
        contract_data:JSON.stringify(this.sign),
        id: this.id,
        type: 1,
        notice:this.notice,
      })
      if (res.code === 200) {
        this.$message.success('保存草稿成功')
      }
    },


  },
  mounted: async function () {
    this.id = this.$route.query.id

    let res_1 = await this.$fetch('sing_contracts/getSignDraft', {
      id: this.id
    })

    console.log(res_1)

    if (res_1.code === 200) {
      this.sign = res_1.data
      this.sign.contract_data = JSON.parse(this.sign.contract_data)
    }
  },
  activated: async function () {

  }
}
