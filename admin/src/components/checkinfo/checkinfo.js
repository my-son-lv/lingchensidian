const degree = [{ id: 1, code: "High School Diploma" }, { id: 2, code: "Associate's Degree" }, { id: 3, code: "Bachelor's Degree" }, { id: 4, code: "Master's Degree" }, { id: 5, code: "MBA" }, { id: 6, code: "PHD" }]
const working_seniority_list = [
    { id: 1, code: "Less than 1 year" },
        { id: 2, code: "1 year experience" },
        { id: 3, code: "2 years experience" },
        { id: 4, code: "3 years experience" },
        { id: 5, code: "4 years experience" },
        { id: 6, code: "5 years experience" },
        { id: 7, code: "6 years experience" },
        { id: 8, code: "7 years experience" },
        { id: 9, code: "8 years experience" },
        { id: 10, code: "9 years experience" },
        { id: 11, code: "More than 10years" }
]
const pay_type_list = [{ id: 1, code: "10k-13k" }, { id: 2, code: "13k-16k" }, { id: 3, code: "16k-20k" }, { id: 4, code: "20k-25k" }, { id: 5, code: ">25k" }]
const visa_type_list = [{ id: 1, code: "Z" }, { id: 2, code: "M" }, { id: 3, code: "F" }, { id: 4, code: "X" }, { id: 5, code: "others" }]

export default {
    data() {
        return {
            id: this.$route.params.id,
            nationality_obj: {},
            country_obj: {},
            info: {},
            userinfo: {},
            degree: degree,
            pay_type_list: pay_type_list,
            working_seniority_list: working_seniority_list,
            visa_type_list: visa_type_list,
            select_options: [
                { selected: false, desc: 'Name' },
                { selected: false, desc: 'Gender' },
                { selected: false, desc: 'Date of Birth' },
                { selected: false, desc: 'Nationality' },
                { selected: false, desc: 'Address' },
                { selected: false, desc: 'Name of University' },
                { selected: false, desc: 'Major' },
                { selected: false, desc: 'Working years' },
                { selected: false, desc: 'Phone Number' },
                { selected: false, desc: 'Wechat' },
                { selected: false, desc: 'Highest Academic Degree' }, // 10
                { selected: false, desc: 'Expected Salary' },
                { selected: false, desc: 'In China' },
                { selected: false, desc: 'Address' },
                { selected: false, desc: 'About me (text)' },
                { selected: false, desc: 'Self introduction (Video)' },
                { selected: false, desc: 'Self introduction (Photo)' },
                { selected: false, desc: 'TEFL' },
                { selected: false, desc: 'TESOL' }, // 18
                { selected: false, desc: 'Still in role' },
                { selected: false, desc: 'Visa Type' },
                { selected: false, desc: 'Date of Expiry' }, // 21
                { selected: false, desc: 'City' },
                { selected: false, desc: 'Preferred cities' },
            ]
        }
    },
    methods: {
        back() {
            this.$router.go(-1)
        },
        reject() {

            var msg = ''
            let index = 1

            for (let i = 0; i < this.select_options.length; i++) {
                if (this.select_options[i].selected) {
                    msg = msg + index + '.' + this.select_options[i].desc + ' '
                    index++
                    if (index >= 4) {
                        break
                    }
                }
            }

            if (msg == '') {
                // 无驳回原因
                this.$message.error('请选择驳回原因')

            } else {
                // 驳回
                this.post_reject(msg)
            }

            // this.$prompt('请输入审核驳回原因', '提示', {
            //     confirmButtonText: '确定',
            //     cancelButtonText: '取消',
            // }).then(({ value }) => {
            //     this.$message({
            //         type: 'success',
            //         message: '驳回原因' + value
            //     });
            //     this.post_reject(value)
            // }).catch(() => {
            // });
        },
        pass() {
            this.$confirm('是否确定审核通过', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.post_pass()
            }).catch(() => {
            });
        },
        async post_pass() {
            let res = await this.$post('check/checkOk', { id: this.info.id })
            if (res.code === 200) {
                this.$message.success('审核通过')
                this.$router.go(-1)
            }
        },
        async post_reject(value) {
            let res = await this.$post('check/reject', { id: this.info.id, info: value })
            if (res.code === 200) {
                this.$message.success('审核驳回')
                this.$router.go(-1)
            }
        },
        get_cities() {
            var str = ''
            if (this.info.working_city_datas && this.info.working_city_datas.length > 0) {
                this.info.working_city_datas.forEach(element => {
                    str += element.province_data.pinyin + '-'
                    str += element.city_data.pinyin + ' '
                })
            }
            return str
        },
        download() {
            window.open(this.info.notes_path[0].path, '_blank')
        }
    },
    mounted: async function () {
        this.id = this.$route.query.id

        if (!this.$userManager().data) {
            let res = await this.$post('getInfoByToken')
            this.$userManager().data = res.data
        }

        let res = await this.$post('check/desc', { id: this.id })
        this.info = res.data

        // 获取国籍列表
        let countryList = await this.$fetch('getCountryList', {}, 1)
        this.nationality_obj = countryList.data.find((element) => (element.id === this.info.nationality))
        this.country_obj = countryList.data.find((element) => (element.id === this.info.country))
    },
    activated: async function () {

    }
}
