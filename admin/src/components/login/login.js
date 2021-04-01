export default {
    data() {
        return {
            userinfo: {
                account: '',
                password: ''
            }
        }
    },
    methods: {
        async login_in() {
            let res = await this.$post('login', this.userinfo)
            if (res.code === 200) {
                this.$message.success('登录成功')

                if (res.data.token) {
                    localStorage.setItem('token', res.data.token)
                }
                this.$router.push({ name: 'home'})
            } else {
                this.$message.error(res.msg)
            }
        }
    },
    mounted: async function () {
        let input_1 = document.getElementById('i1')
        let input_2 = document.getElementById('i2')

        input_1.style.backgroundColor = 'rgba(0,0,0,0.2)';
        input_2.style.backgroundColor = 'rgba(0,0,0,0.2)';
        input_1.style.color = 'rgba(255,255,255,0.8)';
        input_2.style.color = 'rgba(255,255,255,0.8)';
        input_1.style.marginTop = '15px'
        input_2.style.marginTop = '15px'
        input_1.style.height = '55px'
        input_2.style.height = '55px'
        input_1.style.borderRadius = '10px'
        input_2.style.borderRadius = '10px'

        let token = localStorage.getItem('token')
        if (token) {
            // this.$post('getStatusByToken').then((response) => {
            //     console.log(response)
            //     if (response.code === 200) {
            //         this.$userManager().data = response.data
            //         this.$router.push({ name: 'home'})
            //         this.$message.success('login successs')
            //     }
            // })
        }
    }
}
