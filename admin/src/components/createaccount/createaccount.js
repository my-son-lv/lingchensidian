export default {
    data() {
        return {
            radio: 1,
            info_t: {
                nick_name: '',
                email: '',
                password: '',
                password_r: '',
            },
            rules_t: {
                nick_name: [
                    { required: true, min: 2, message: 'Name cannot be less than 2 characters', trigger: 'change' },
                    { required: true, max: 50, message: 'Password limited to 50 characters.', trigger: 'change' }
                ],
                email: [
                    { required: true, type: 'email', message: 'Please enter a valid email address', trigger: ['blur', 'change'] }
                ],
                password: [
                    { required: true, min: 6, message: 'Password cannot be less than 6 characters', trigger: 'change' },
                    { required: true, max: 20, message: 'Password limited to 20 characters.', trigger: 'change' }],
                password_r: [
                    { required: true, min: 6, message: 'Password cannot be less than 6 characters', trigger: 'change' },
                    { required: true, max: 20, message: 'Password limited to 20 characters.', trigger: 'change' }]
            },
            info_c: {
                phone: '',
                password: ''
            },
            rules_c: {
                phone:
                    [{ required: true, message: '请输入手机号码', trigger: 'change' },
                    {
                        validator: function (rule, value, callback) {
                            if (/^1[345678]\d{9}$/.test(value) == false) {
                                callback(new Error("请输入正确的手机号"));
                            } else {
                                callback();
                            }
                        }, trigger: 'change'
                    }],
                password: [
                    { required: true, min: 6, message: '密码至少大于6位', trigger: 'change' },
                    { required: true, max: 20, message: '密码至少小于20位', trigger: 'change' }
                ],
                password_r: [
                    { required: true, min: 6, message: '密码至少大于6位', trigger: 'change' },
                    { required: true, max: 20, message: '密码至少小于20位', trigger: 'change' }
                ]
            }
        }
    },
    methods: {
        creat_account() {

            if (this.radio == 1) {
                // 新增外教
                this.$refs['info_t'].validate((valid) => {
                    if (valid) {
                        if (this.info_t.password == this.info_t.password_r) {
                            this.post_add_t()
                        } else {
                            this.$message.error('两次密码不一致')
                        }
                    }
                })
            } else {
                // 新增企业
                this.$refs['info_c'].validate((valid) => {
                    if (valid) {
                        if (this.info_c.password == this.info_c.password_r) {
                            this.post_add_c()
                        } else {
                            this.$message.error('两次密码不一致')
                        }
                    }
                })
            }
        },
        async post_add_t() {
            let res = await this.$post('teach/addMember', this.info_t)
            if (res.code == 200) {
                this.$message.success('新建用户成功')
            } else {
                this.$message.error(res.msg)
            }
        },
        async post_add_c() {
            let res = await this.$post('company/addCompany', this.info_c)
            if (res.code == 200) {
                this.$message.success('新建用户成功')
            } else {
                this.$message.error(res.msg)
            }
        }
    },
    mounted: async function () {

    }
}
