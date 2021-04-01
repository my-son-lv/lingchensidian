const status_list = ['全部', '待他人处理', '已完成', '未完成', '草稿']

export default {
    data() {
        return {
            status_list: status_list,
            status_select: 0,
            title: '',
            date: null,
        }
    },
    methods: {
        status_click(index) {
            console.log(index)
            this.status_select = index
        },
        search() {
            console.log(this.title)
            console.log(this.date[0])
            console.log(this.date[1])
        },
        reset() {

        },
        download() {
            console.log('下载')
        }
    },
    mounted: async function () {

    },
    activated: async function () {

    }
}
