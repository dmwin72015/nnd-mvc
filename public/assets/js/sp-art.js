(function (Vue) {
    if (!Vue) return;
    var tmpl = this.Tmpl || {};

    //所有模板
    var articleTmpl = tmpl.article;

    var detail = articleTmpl.detail;

    var add = articleTmpl.add;

    var NotFound = articleTmpl['404'];

    var modes = ['list', 'del', 'add'];

    //静态路由
    let routes = [
        {path: '/detail', component: detail},
        {path: '/404', component: NotFound}
    ];

    //路由方法
    let methods = {
        'detail': showDetail,
        'list': showList,
        'add': addArticle,
        'del': toDelete
    };
    
    //动态路由
    let router = new VueRouter({
        routes: [
            {path: '/page/1', name: 'home', alias: '/'},
            {path: '/page/:page?', name: 'list'},
            {path: '/detail/:id', component: detail, name: "detail"},
            {path: '/add', name: 'add'},
            {path: '/del', name: 'del'},
            {path: '/404', name: '404', component: NotFound}
        ]
    });

    this.app = new Vue({
        router,
        data: {
            title: '',
            html: '',
            mode: 'list',
            loading:true
        },
        created() {
            // 组件创建完后获取数据，
            // 此时 data 已经被 observed 了
            this.mainRoute()
        },
        watch: {
            '$route': 'mainRoute'
        },
        computed: {
            status: function () {
                return this.mode === 'del';
            }
        },
        methods: {
            save_article(){
                alert('保存')
            },
            mainRoute() {
                var current_route = this.$route;
                var name = current_route.name;
                var method = methods[name];
                method && (typeof method == 'function') && method.call(this, current_route.params);
                this.loading = false;
            }
        }
    }).$mount('.main-container');


    //detail
    function showDetail(params) {
        this.mode = 'detail';
        var that = this;
        var myHeaders = new Headers();
        var myInit = {
            method: 'POST',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default'
        };
        var id = params.id;
        if (!id) {
            return;
        }
        fetch('/admin/article/detail/' + id, myInit).then((response) => {
            return response.json();
        }).then((body) => {
            if (body.status != '1') {
                that.$data.title = '未知错误';
                that.$data.html = '';
            } else {
                that.$data.title = body.data.title;
                that.$data.html = body.data.htmlContent;
            }
            this.loading = false;
        }).catch((err) => {

        });
    }

    //list
    function showList(params) {
        this.mode = 'list';
        var page = params.page || 1;
        console.log(page);
    }

    //add
    function addArticle() {
        this.mode = 'add';
    }

    //del
    function toDelete() {
        console.log('----');
        this.mode = 'del';
    }
}.call(this, window.Vue));