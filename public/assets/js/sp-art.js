(function(Vue) {
    if(!Vue) return;
    var tmpl = this.Tmpl || {};
    var articleTmpl = tmpl.article;

    var detail = articleTmpl.detail;

    var add = articleTmpl.add;

    var NotFound = articleTmpl['404'];

    //静态路由
    let routes = [
        { path: '/detail', component: detail },
        { path: '/404', component: NotFound }
    ];
    
    //动态路由
    let router = new VueRouter({
        routes: [
            { path: '/detail/:id', component: detail },
            { path: '/' },
            { path: '/add' }
        ]
    });

    this.app = new Vue({
        router,
        data: {
            title: '',
            html: '',
            isList:'',
            isAdd:'',
            isDel:'',
            status:false
        },
        created() {
            // 组件创建完后获取数据，
            // 此时 data 已经被 observed 了
            this.fetchData()
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            fetchData() {
                if(this.$route.path == '/del'){
                    this.$data.status = true;
                    return;
                }
                this.$data.status = false;
                var that = this;
                var myHeaders = new Headers();
                var myInit = {
                    method: 'POST',
                    headers: myHeaders,
                    mode: 'cors',
                    cache: 'default'
                };
                var id = this.$route.params.id;
                if (!id){
                    return;
                }
                fetch('/admin/article/detail/' + id, myInit).then((response) => {
                    return response.json();
                }).then((body) => {
                    if(body.status != '1'){
                        that.$data.title = '未知错误';
                        that.$data.html = '';
                    }else{
                        that.$data.title = body.data.title;
                        that.$data.html = body.data.htmlContent;
                    }
                }).catch((err) => {

                })
            }
        }
    }).$mount('.page-box');

}.call(this, window.Vue));