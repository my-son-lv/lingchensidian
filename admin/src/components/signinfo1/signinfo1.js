import { sign } from 'core-js/fn/number';
import {
  Loading
} from 'element-ui';

export default {
  data() {
    return {
      id: this.$route.params.id,
      sign: {
        b_company_name: '',
        money1: '',
        money2: '',     
        per: '',
        num: '',
        bus1: '',
        bus2: '',
        bus3: '',
        bus4: '',
      },
      notice: 1,
      
      notice_1: false,
      notice_2: false,
      dialogVisible: false,
      options: [{
        value: '是',
        label: '是'
      }, {
        value: '否',
        label: '否'
      }, {
        value: '',
        label: ''
      }],
      member1: '',
      member2: '',
      member3: '',
      member4: '',
    }
  },
  methods: {
    //校验并处理数据
    check() {
      if (this.sign.money1 == '' || this.sign.money2 == '') {
        this.$message.error('未填写合同金额')
        return
      }
      if (this.sign.bus1 == '' && this.sign.bus2 == '' && this.sign.bus3 == '' && this.sign.bus4 == '') {
        this.$message.error('未填写是否派遣')
        return
      }
      if (this.member1 == '' && this.member2 == '' && this.member3 == '' && this.member4 == '') {
        this.$message.error('未填写委托人次')
        return
      }

      var arr2 = [];

      arr2.push(this.member1)

      arr2.push(this.member2)

      arr2.push(this.member3)

      arr2.push(this.member4)

      this.sign.num = arr2.join(",")
    },

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
      
      this.check()
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
      } else {
        this.$message.error(res.msg);
      }
    },
    async save_click() {
      this.sign.type = 1
      this.check()
      let res = await this.$post('sing_contracts/sign', {
        contract_data:JSON.stringify(this.sign),
        id: this.id,
        type: 1,
        notice:this.notice,
      })
      if (res.code === 200) {
        this.$message.success('保存草稿成功')
      } else {
        this.$message.error(res.msg);
      }
    },


  },
  mounted: async function () {
    this.id = this.$route.query.id

    let res_1 = await this.$fetch('sing_contracts/getSignDraft', {
      id: this.id
    })

    if (res_1.code === 200) {
      this.sign = res_1.data
      this.sign.contract_data = JSON.parse(this.sign.contract_data)
    
    }
  },
  activated: async function () {

  }
}
