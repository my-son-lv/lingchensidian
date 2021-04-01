export default {
    data() {
        return {
            id: this.$route.params.id,
            info: {},
            select_all: false,
            select_options: [
                { selected: false, desc: '学校名称' },
                { selected: false, desc: '学生年龄' },
                { selected: false, desc: '机构类型' },
                { selected: false, desc: '外籍员工人数' },
                { selected: false, desc: '办公地址' },
                { selected: false, desc: '年度外教需求量' },
                { selected: false, desc: '办学许可资质' },
                { selected: false, desc: '月均基本薪资范围' },
                { selected: false, desc: '办学资质证书' },
                { selected: false, desc: '营业执照' },
                { selected: false, desc: '联系人' },
                { selected: false, desc: '联系电话' },
                { selected: false, desc: '工作邮箱' },
                { selected: false, desc: '校区图片一' },
                { selected: false, desc: '校区图片二' }
            ]
        }
    },
    methods: {
        get_student_age() {
            var str = ''
            if(!this.info.student_age) {
                return str
            }
            var ages = this.info.student_age.split(",");
            ages.forEach(element => {
                switch (element) {
                    case "1":
                        str += '3岁以下 '
                        break;
                    case "2":
                        str += '3-6岁 '
                        break;
                    case "3":
                        str += '7-12岁 '
                        break;
                    case "4":
                        str += '13-18岁 '
                        break;
                    case "5":
                        str += '18岁以上 '
                        break;
                    default:
                }
            });
            return str
        },
        type() {
            var str = ''
            switch (this.info.type) {
                case 1:
                    str = '培训机构'
                    break;
                case 2:
                    str = '公立学校'
                    break;
                case 3:
                    str = '私立学校'
                    break;
                case 4:
                    str = '中介机构'
                    break;
                case 5:
                    str = '幼儿园'
                    break;
                case 6:
                    str = '其他'
                    break;
                default:
            }
            return str
        },
        needs_num() {
            var str = ''
            switch (this.info.needs_num) {
                case 1:
                    str = '1-10人'
                    break;
                case 2:
                    str = '11-20人'
                    break;
                case 3:
                    str = '21-50人'
                    break;
                case 4:
                    str = '51人以上'
                    break;
                default:
            }
            return str
        },
        pay() {
            var str = ''
            switch (this.info.pay) {
                case 1:
                    str = '15000元以下'
                    break;
                case 2:
                    str = '15000-20000元'
                    break;
                case 3:
                    str = '20000元以上'
                    break;
                default:
            }
            return str
        },
        handleCheckAllChange(val) {
            this.select_options.forEach(element => {
                element.selected = val
            });
        },
        back() {
            this.$router.go(-1)
        },
        finish() {
            var msg = ''
            let index = 1

            for (let i = 0; i < this.select_options.length; i++) {
                if (this.select_options[i].selected) {
                    msg = msg + index + '.' + this.select_options[i].desc + '未通过 '
                    index++
                    if (index >= 4) {
                        break
                    }
                }
            }

            // this.select_options.forEach(element => {
            //     if (element.selected) {
            //         index++
            //         msg = index + '.' + msg + element.desc + '未通过 '
            //     }
            // });

            if (msg == '') {
                // 通过
                this.$confirm('是否确定审核通过', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.post_pass()
                }).catch(() => { });
            } else {
                // 驳回
                this.$prompt('' + msg, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    this.$message({
                        type: 'success',
                        message: '驳回原因' + value
                    });
                    this.post_reject(msg + (value ? value : ''))
                }).catch(() => {
                });
            }
        },
        async post_pass() {
            let res = await this.$post('companyCheck/check', { id: this.id, type: 0 })
            if (res.code === 200) {
                this.$message.success('审核通过')
                this.back()
            }
        },
        async post_reject(value) {
            let res = await this.$post('companyCheck/check', { id: this.id, info: value, type: 1 })
            if (res.code === 200) {
                this.$message.success('审核驳回')
                this.back()
            }
        }
    },
    mounted: async function () {
        this.id = this.$route.query.id

        if (!this.$userManager().data) {
            let res = await this.$post('getInfoByToken')
            this.$userManager().data = res.data
        }

        let res = await this.$post('companyCheck/desc', { id: this.id })
        this.info = res.data
    },
    activated: async function () {

    }
}
