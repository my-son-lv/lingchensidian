export default {
    data() {
        return {
            allPayUnitValue: '',
            allPayUnit: [
                {
                    id: 1, value: "Per Hour"
                },
                {
                    id: 2,
                    value: "Per Day"
                },
                {
                    id: 3, value: "Per Week"
                },
                {
                    id: 4, value: "Per Month"
                },
                {
                    id: 5, value: "Per Year"
                },
            ],
            benefits_tag: [
                {
                    flg: false,
                    id: 1,
                    value: 'Annual Bonus',
                },
                {
                    flg: false,
                    id: 2,
                    value: 'Insurance',
                },
                {
                    flg: false,
                    id: 3,
                    value: 'Apartment',
                },
                {
                    flg: false,
                    id: 4,
                    value: 'House Allowance',
                },
                {
                    flg: false,
                    id: 5,
                    value: 'Flight Allowance',
                },
                {
                    flg: false,
                    id: 6,
                    value: 'Paid Leave',
                },
            ],
            teaching_time2: '',
            teaching_time1: '',
            info: {
                id: 0,
                name: '', // 职位名称
                sex: 0, // 0不限 1男 2女 
                type: 1, // 1线下 2线上
                first_language: 0, // 0不限 1母语 2非母语
                job_city: '', // 工作地id
                language: 1, // 1英语 默认1
                job_type: 1, // 职能 1学前语言 2中小学教育 3成人教育 4出国培训 5其他 默认1
                job_week_day: null, // 一周工作几天 英文逗号分隔 例:5,6
                job_day_time: null, // 一天工作几个小时 1 6小时以下； 2 6-8小时；3 8-10小时；4 10小时以上
                pay_type: 1, // 1月薪 2时薪 3待定 默认1 薪资类型
                pay: '', // 薪资 区间 例：15,20 英文逗号分隔 单位K
                pay_unit: 12, // 月数
                money_type: 1, // 1人民币 2美元 默认1
                edu_type: 1, // 学历 1 Bachelor and above 2 Master and above 3 PHD and above 4 不限
                cert: '', // 证书 多个英文逗号分隔 1 TEFL 2 TESOL 3 TESL 4 CELTA
                job_year: 2, // 工作年限 1 Less than 1 year； 2 1-3years；3 3-5years；4 5-10years；5 More than 10 years
                num: null, // 招聘人数
                start_time: '', // 招聘开始时间 2020-12
                // end_time: '', // 招聘结束时间 2030-12
                benefits: '', // 福利待遇
                job_info: '', // 工作介绍
                memo: '', // 备注 非必填
                colour: 0, // 肤色 0不限 1白色
                pay_unit: 12, // 薪资月数
            },
            cascader: '',
            back: false
        }
    },
    methods: {
        get_sex() {
            let str
            switch (this.info.sex) {
                case 0:
                    str = "Any"
                    break;
                case 1:
                    str = "Male"
                    break;
                case 2:
                    str = "Female"
                    break;
                default:
            }
            return str
        },
        get_first_language() {
            let str
            switch (this.info.first_language) {
                case 0:
                    str = "Any"
                    break;
                case 1:
                    str = "Native English Countries"
                    break;
                case 2:
                    str = "Non-native English Countries"
                    break;
                default:
            }
            return str
        },
        get_colour() {
            let str
            switch (this.info.colour) {
                case 0:
                    str = "Any"
                    break;
                case 1:
                    str = "White"
                    break;
                default:
            }
            return str
        },
        get_type() {
            let str
            switch (parseInt(this.info.type)) {
                case 1:
                    str = "Offline"
                    break;
                case 2:
                    str = "Online"
                    break;
                case 3:
                    str = "Any"
                    break;
                default:
            }
            return str
        },
        get_work_type() {
            let str
            switch (parseInt(this.info.work_type)) {
                case 1:
                    str = "Any"
                    break;
                case 2:
                    str = "Full-Time"
                    break;
                case 3:
                    str = "Part-Time"
                    break;
                default:
            }
            return str
        },
        get_visa_ask() {
            let str
            switch (this.info.visa_ask) {
                case 1:
                    str = "Z visa"
                    break;
                case 2:
                    str = "Any"
                    break;
                default:
            }
            return str
        },
        get_job_type() {
            let str
            switch (this.info.job_type) {
                case 1:
                    str = "学前教育"
                    break;
                case 2:
                    str = "中小学教育"
                    break;
                case 3:
                    str = "成人教育"
                    break;
                case 4:
                    str = "出国培训"
                    break;
                case 5:
                    str = "其他"
                    break;
                default:
            }
            return str
        },
        get_job_week_day() {
            let str
            switch (this.info.job_week_day) {
                case 1:
                    str = "1天"
                    break;
                case 2:
                    str = "2天"
                    break;
                case 3:
                    str = "3天"
                    break;
                case 4:
                    str = "4天"
                    break;
                case 5:
                    str = "5天"
                    break;
                case 6:
                    str = "5天以上"
                    break;
                default:
            }
            return str
        },
        get_job_day_time() {
            // let str
            // switch (this.info.job_day_time) {
            //     case 1:
            //         str = "6小时以下"
            //         break;
            //     case 2:
            //         str = "8小时"
            //         break;
            //     case 3:
            //         str = "8-10小时"
            //         break;
            //     case 4:
            //         str = "10小时以上"
            //         break;
            //     default:
            // }
            // return str
            return this.info.job_day_time ? this.info.job_day_time.replace(',', '-') + 'H' : ''
        },
        get_job_teaching_time() {
            return this.info.teaching_time ? this.info.teaching_time.replace(',', '-') + 'H' : ''
        },
        get_pay_type() {
            let str
            switch (this.info.pay_type) {
                case 1:
                    str = "月薪"
                    break;
                case 2:
                    str = "时薪"
                    break;
                case 3:
                    str = "待定"
                    break;
                default:
            }
            return str
        },
        get_money_type() {
            let str
            switch (this.info.money_type) {
                case 1:
                    str = "人民币"
                    break;
                case 2:
                    str = "美元"
                    break;
                default:
            }
            return str
        },
        get_edu_type() {
            let str
            switch (this.info.money_type) {
                case 1:
                    str = "Bachelor and above"
                    break;
                case 2:
                    str = "Master and above"
                    break;
                case 3:
                    str = "PHD and above"
                    break;
                case 4:
                    str = "Any"
                    break;
                default:
            }
            return str
        },
        get_cert() {
            return this.info.cert ? (this.info.cert == 1 ? 'Required' : 'Not required') : ''
        },
        get_student_age() {
            let str = ''
            if (this.info.student_age) {
                let arr = this.info.student_age.split(',');
                arr.sort();
                arr.forEach(function (v) {
                    switch (parseInt(v)) {
                        case 1:
                            str += '0-3years old，';
                            break;
                        case 2:
                            str += '3-6years old，';
                            break;
                        case 3:
                            str += '7-12years old，';
                            break;
                        case 4:
                            str += '13-18years old，';
                            break;
                        case 5:
                            str += '18+years old，';
                            break;
                    }

                })
                return str.substr(0, str.length - 1);
            }else{
                return '';
            }

        },
        get_job_year() {
            let str
            switch (this.info.job_year) {
                case 1:
                    str = "Less than 1 year"
                    break;
                case 2:
                    str = "1-3years"
                    break;
                case 3:
                    str = "3-5years"
                    break;
                case 4:
                    str = "5-10years"
                    break;
                case 5:
                    str = "More than 10 years"
                    break;
                default:
            }
            return str
        },
        async init_page() {
            this.info.id = this.$route.query.id
            let res_1 = await this.$post('job/desc', { id: this.info.id })
            if (res_1.code == 200) {
                this.info = res_1.data
                // 城市
                if (res_1.data.job_area_data.merger_name) {
                    this.cascader = this.cascader = res_1.data.job_province_data.pinyin + '/' + res_1.data.job_city_data.pinyin + '/' + res_1.data.job_area_data.pinyin;
                    //res_1.data.job_area_data.merger_name.replace(/,/g, "/").replace('中国/', '')
                }
                if (res_1.data.benefits_tag) {
                    let tags = res_1.data.benefits_tag.split(',')
                    let that = this;
                    tags.forEach(function (v, k) {
                        that.benefits_tag[parseInt(v) - 1].flg = true
                    })
                }
                this.allPayUnitValue = this.allPayUnit[parseInt(res_1.data.pay_unit) - 1].value
            }
        },
        go_back() {
            this.$router.go(-1)
        }
    },
    mounted: async function () {
        if (this.back) {
            this.init_page()
        }
        this.init_page()
    },
    activated: async function () {
    },
    created: function () {
        var str = window.location.href;
        if (str.indexOf("home/jobdesc") != -1) {
            this.back = true
        } else {
            this.back = false
        }
    }
}
