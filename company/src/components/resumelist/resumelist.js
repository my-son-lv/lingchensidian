
export default {
    data() {
        return {
            search: {
                page: 1, // 页数 默认1
                pageSize: 100, // 每页条数 非必传默认20              
                type: ''//不同的岗位类别,
            },
            select_type: 1, // 投递或者下载类型
            count: 1, // 总页数
            loading: false,
            resume_list: [],
            job_list: [],
            degree: [{ id: 1, code: "High School Diploma" }, { id: 2, code: "Associate's Degree" }, { id: 3, code: "Bachelor's Degree" }, { id: 4, code: "Master's Degree" }, { id: 5, code: "MBA" }, { id: 6, code: "PHD" }]

        }
    },
    computed: {
        noMore() {
            return this.count <= this.search.page
        },
        disabled() {
            return this.loading || this.noMore
        }
    },
    methods: {
        keyiliao() {
            console.log('111')
            this.$confirm("聊天次数已用尽，充值会员", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    window.open("https://www.apex.link/vip", "_bank");
                })
                .catch(() => { });
        },
        async buheshi(id,index) {
            let res = await this.$post('job/jobResult',{id:id,result:3})
            console.log(this.job_list)
            if (res.code == 200) {
                this.resume_list[index].result = 3
            }
        },
        async getJoblist() {
            let res = await this.$fetch('job/getJobList')
            if (res.code == 200) {
                this.job_list = res.data
            }
        },

        async getResumelist() {

            this.search.page = 1
            this.resume_list = []
            let res
            if (this.select_type == 1) {
                //投递简历
                res = await this.$post('job/application', this.search)

            } else {
                //下载简历 teach/downList
                res = await this.$fetch('teach/downList')
            }
            if (res.code == 200) {
                this.resume_list = res.data.list
                this.loading = false
            }

        },

        load() {
            if (this.count >= this.search.page) {
                this.loading = true
                this.search.page++
                this.getResumelist()
            }
        },
        header_btn_click(type) {
            this.select_type = type
            if (this.select_type == 2) {
                this.search.type = ''
            }
            this.getResumelist()
        },
        type_change() {

            this.getResumelist()
        },
        detail_click(item) {
            this.$router.push({
                path: '/main/collectlist/teachdesc',
                query: {
                    id: item.id
                }
            }).catch(data => { })
        },
        get_pay(pay) {
            var str = ''
            switch (pay) {
                case 1:
                    str = '10k-13k'
                    break;
                case 2:
                    str = '13k-16k'
                    break;
                case 3:
                    str = '16k-20k'
                    break;
                case 4:
                    str = '20k-25k'
                    break;
                case 5:
                    str = '>25k'
                    break;
                default:
            }
            return str
        },

    },
    mounted: async function () {
        this.search.page = 1
        this.getJoblist()
        //获取路由id
        if (this.$route.query && this.$route.query.id) {
            this.search.type = this.$route.query.id
        }
        this.getResumelist()
    }
}
