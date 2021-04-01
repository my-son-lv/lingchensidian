export default {
    data() {
        return {
            id: this.$route.params.id,
            interview_id: this.$route.query.interview_id,
            date: null,
            radio: '1',
            sign: {
                type: 1,
                contract_id: '',
                name: '',
                a_name: '',
                a_phone: '',
                b_name: '', // 经办人
                b_phone: '',
                b_company_name: '', // 公司名称
                end_time: null,
                memo: '',
                id: 0,
                interview_id: null, // 面试记录id
                auth_type: 1
            },
            options: [{
                label: '会员服务合同',
                options: [{
                    value: 3,
                    label: '月度会员服务合同'
                }, {
                    value: 4,
                    label: '季度会员服务合同'
                }, {
                    value: 5,
                    label: '年度会员服务合同'
                }]
            }, {
                label: '外籍人才推荐服务协议',
                options: [{
                    value: 2,
                    label: '外籍人才推荐服务协议（单次服务版）'
                }, {
                    value: 6,
                    label: '外籍人才推荐服务协议（长期合作版）'
                }]
            }, {
                label: '外籍人才证件办理服务协议',
                options: [{
                    value: 1,
                    label: '外籍人才证件办理服务协议'
                }]
            }],
        }
    },
    methods: {
        async next_click() {
            console.log(this.sign)
            if (/^1[123456789]\d{9}$/.test(this.sign.b_phone) == false) {
                this.$message.error('手机格式不正确')
                return
            }

            var flag = false

            if (this.sign.name && this.sign.a_name && this.sign.a_phone && this.sign.a_name && this.sign.b_name && this.sign.b_phone && this.sign.b_company_name && this.sign.end_time) {
                flag = true
            }


            if (flag) {

                if (this.interview_id) {
                    this.sign.interview_id = this.interview_id
                }

                let res = await this.$post('sing_contracts/sign', this.sign)
                if (res.code === 200) {
                    this.sign.id = res.data.model.id
                    this.id = res.data.model.id

                    if (this.sign.contract_id == 1) {
                        this.$router.push({
                            path: '/home/signinfo1',
                            query: {
                                id: this.sign.id
                            }
                        })
                    }

                    if (this.sign.contract_id == 2) {
                        this.$router.push({
                            path: '/home/signinfo2',
                            query: {
                                id: this.sign.id
                            }
                        })
                    }

                    if (this.sign.contract_id == 3) {
                        this.$router.push({
                            path: '/home/signinfo3',
                            query: {
                                id: this.sign.id
                            }
                        })
                    }

                    if (this.sign.contract_id == 4) {
                        this.$router.push({
                            path: '/home/signinfo4',
                            query: {
                                id: this.sign.id
                            }
                        })
                    }

                    if (this.sign.contract_id == 5) {
                        this.$router.push({
                            path: '/home/signinfo5',
                            query: {
                                id: this.sign.id
                            }
                        })
                    }
                }

                if (this.sign.contract_id == 6) {
                    this.$router.push({
                        path: '/home/signinfo6',
                        query: {
                            id: this.sign.id
                        }
                    })
                }
            } else {
                this.$message.error('信息不全')
            }

        },
        async save() {
            console.log(JSON.stringify(this.sign))

            if (this.interview_id) {
                this.sign.interview_id = this.interview_id
            }

            let res = await this.$post('sing_contracts/sign', this.sign)
            if (res.code === 200) {
                this.$message.success('保存草稿成功')
                this.sign.id = res.data.model.id
            }
        }
    },
    mounted: async function () {

        this.id = this.$route.query.id
        this.interview_id = this.$route.query.interview_id

        let res = await this.$post('getInfoByToken')
        if (res.code === 200) {
            this.sign.a_name = res.data.name
            this.sign.a_phone = res.data.phone
        }

        if (this.interview_id) {
            let res = await this.$fetch('public/getInterContract', {
                id: this.interview_id
            })
            if (res.code === 200) {
                this.sign.b_name = res.data.b_name
                this.sign.b_phone = res.data.b_phone
                this.sign.b_company_name = res.data.b_company_name
                this.sign.company_name = res.data.company_name
            }
        }

        let res_1 = await this.$fetch('sing_contracts/getSignDraft', {
            id: this.id
        })
        if (res_1.code === 200) {
            this.sign = res_1.data
        }
    },
    activated: async function () {

    }
}
