// 项目接口基础地址
const baseUrl = 'http://47.106.244.1:8099/';
// 图片服务器访问基础地址
const uploadUrl = 'http://134.175.100.63:8686/group1/';
new Vue({
    el: '#app',
    data() {
        return {
            msg: '123',
            token: localStorage.getItem('token'),
            title: '看点咨询精选',
            login_form: {},
            username: '',
            activeName: 'first',
            articles: [],
            params: {
                page: 0,
                pageSize: 10,
                beginTime: '',
                endTime: ''
            },
            picture_visible: false,
            imgUrl: '',
            article_form: {},
            formLabelWidth: '120px',
            article_visible: false,
            dialogImageUrl: '',
            dialogVisible: false,
            categories: [],
            dateValue: [],
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            }
        }
    },
    // 监听：可以实现分页搜索功能
    watch: {
        params: {
            handler: function () {
                console.log(this.params)
                this.loadArticle();
            },
            deep: true
        },
        dateValue(){
            this.params.beginTime = this.dateValue[0]
            this.params.endTime = this.dateValue[1]
        }
    },
    methods: {
        // 12.删除文章
        articleDelete(index, row) {
            // console.log(index,row);
            $.get(baseUrl + 'manager/article/deleteArticleById', {
                id: row.id
            }, res => {
                const h = this.$createElement;
                if (res.status == 500) {
                    this.$notify({
                        title: '警告',
                        message: h('i', {
                            style: 'color: teal'
                        }, res.message)
                    });
                } else {
                    this.$notify({
                        title: '成功',
                        message: h('i', {
                            style: 'color: teal'
                        }, res.message)
                    });
                    // 刷新数据
                    this.loadArticle();
                }
            })
        },
        // 11.加载所有栏目
        loadCategory() {
            $.ajax({
                url: baseUrl + 'manager/category/findAllCategory',
                method: 'get',
                data: {},
                success: (res) => {
                    this.categories = res.data;
                }
            })
        },
        // 10.发布文章
        addArticle() {
            this.$refs['upload'].clearFiles();
            $.post(baseUrl + 'manager/article/saveOrUpdateArticle', this.article_form, res => {
                const h = this.$createElement;
                if (res.status == 500) {
                    this.$notify({
                        title: '警告',
                        message: h('i', {
                            style: 'color: teal'
                        }, res.message)
                    });
                } else {
                    this.$notify({
                        title: '成功',
                        message: h('i', {
                            style: 'color: teal'
                        }, res.message)
                    });
                }
                this.article_visible = false;
                this.article_form = {};
                // 刷新数据
                this.loadArticle();
            })
        },
        // 9.显示预览图片
        handlePictureCardPreview(file) {
            // console.log(file)
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        // 8.图片上传
        successHandler(res) {
            // console.log(res)
            this.article_form.source = uploadUrl + res.data.id
            // console.log(this.article_form);
        },
        // 7.发布文章
        showArticleVisible() {
            this.article_visible = true;
        },
        // 6.审核文章
        checkArticle(item) {
            // console.log(item.id);
            // 根据文章状态封装参数
            if (item.status) {
                var obj = {
                    id: item.id,
                    status: '审核通过'
                }
            } else {
                var obj = {
                    id: item.id,
                    status: '审核不通过'
                }
            }
            $.get(baseUrl + 'manager/article/checkArticle', obj, res => {
                const h = this.$createElement;
                if (res.status == 500) {
                    this.$notify({
                        title: '警告',
                        message: h('i', {
                            style: 'color: teal'
                        }, res.message)
                    });
                } else {
                    this.$notify({
                        title: '成功',
                        message: h('i', {
                            style: 'color: teal'
                        }, res.message)
                    });
                }
                // 刷新数据
                this.loadArticle();
            })
        },
        // 5.分页
        changePage(page) {
            // 当前页
            // console.log(page);
            this.params.page = page - 1;
        },
        // 4.查看大图
        showBigPicture(row, column, cell, event) {
            // console.log(row, column, cell, event);
            // console.log(column.label);//单元格的标题
            if (column.label == '文章封面') {
                // 显示模态框
                this.picture_visible = true;
                // 将当前点击的图片地址放到模态框中
                this.imgUrl = row.source;
            }
        },
        // 3.时间处理
        dateFormat(row, column, cellValue, index) {
            // console.log(row,column,cellValue,index);
            // console.log(row[column.property]);
            return moment(row[column.property]).format('YYYY-MM-DD hh:mm:ss');
        },
        // 2.查询文章
        loadArticle() {
            $.get(baseUrl + 'manager/article/findArticle', this.params, res => {
                this.articles = res.data;
                // 为了使用开关组件，需要将文章数据进行改变
                res.data.list.forEach(item => {
                    if (item.status == '审核通过') {
                        item.status = 1;
                    } else {
                        item.status = 0;
                    }
                })
            })
        },
        // 1.登录
        loginHandler() {
            $.ajax({
                url: baseUrl + 'manager/user/login',
                method: 'post',
                data: JSON.stringify(this.login_form),
                contentType: 'application/json',
                success: (res) => {
                    // 将token设置到浏览器
                    localStorage.setItem('token', res.data.token)
                    // 将token赋值给data中的token
                    this.token = res.data.token

                    // 调用根据token获取用户信息的方法
                    this.findMsg(res.data.token);
                    // 查询文章
                    this.loadArticle();
                    // 查询所有栏目
                    this.loadCategory();
                }
            })
        },
        // 根据token查询用户信息
        findMsg(token) {
            $.ajax({
                url: baseUrl + 'manager/user/info',
                method: 'get',
                data: {
                    token
                },
                success: (res) => {
                    this.username = res.data.username
                }
            })
        },
        // 退出登录
        logout() {
            $.ajax({
                url: baseUrl + 'manager/user/logout',
                method: 'post',
                data: {},
                success: (res) => {
                    // 清空浏览器的token
                    localStorage.clear();

                    // 刷新浏览器
                    location.reload();
                }
            })
        }
    },
    // 页面加载的时候
    created() {
        let token = localStorage.getItem('token');
        if (token) {
            // 查询用户信息
            this.findMsg(token);
            // 查询所有文章
            this.loadArticle();
            // 查询所有栏目
            this.loadCategory();
        }
    }
})