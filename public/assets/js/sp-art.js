(function (Vue) {
    if (!Vue) return;

    Vue.filter('formatDate', function (value) {
        var dbNum = function (num) {
            return num > 9 ? num : '0' + num;
        };

        var od = new Date(value),
            year = od.getFullYear(),
            month = dbNum(od.getMonth() + 1),
            day = dbNum(od.getDate()),
            hour = dbNum(od.getHours()),
            minute = dbNum(od.getMinutes()),
            second = dbNum(od.getSeconds());

        return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    });

    let tmpl = this.Tmpl || {};

    //所有模板
    let articleTmpl = tmpl.article;

    let detail = articleTmpl.detail;

    let add = articleTmpl.add;

    let NotFound = articleTmpl['404'];

    let modes = ['list', 'del', 'add'];

    //静态路由
    let routes = [
        {path: '/detail', component: detail},
        {path: '/404', component: NotFound}
    ];

    //路由方法
    let methods = {
        'detail': showDetail,
        'list': showList,
        'add': toAdd,
        'del': toDelete,
        'home': showList
    };

    //动态路由
    let router = new VueRouter({
        routes: [
            {path: '/page/1', name: 'home', alias: '/'},
            {path: '/page/:page?', name: 'list'},
            {path: '/detail/:id', component: detail, name: 'detail'},
            {path: '/add', component: add, name: 'add'},
            {path: '/del', name: 'del'},
            {path: '/404', name: '404', component: NotFound}
        ]
    });

    this.app = new Vue({
        router,
        data: {
            data: {},
            mode: 'list',
            loading: true
        },
        created () {
            // 组件创建完后获取数据，
            // 此时 data 已经被 observed 了

        },
        mounted(){
            this.mainRoute()
        },
        watch: {
            '$route': 'mainRoute'
        },
        computed: {
            status: function () {
                return this.mode === 'del'
            },
            isList: function () {
                return this.mode == 'list' || this.status;
            }
        },
        filters: {
            formatDate: function (value) {
                var dbNum = function (num) {
                    return num > 9 ? num : '0' + num;
                };

                var od = new Date(value),
                    year = od.getFullYear(),
                    month = dbNum(od.getMonth() + 1),
                    day = dbNum(od.getDate()),
                    hour = dbNum(od.getHours()),
                    minute = dbNum(od.getMinutes()),
                    second = dbNum(od.getSeconds());

                return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
            }
        },
        methods: {
            save_article () {
                alert('保存');
                let title = '';
                console.log(this);
                console.log(this.$route);

            },
            mainRoute () {
                let current_route = this.$route;
                let name = current_route.name;
                let method = methods[name];
                method && (typeof method === 'function') && method.call(this, current_route.params);
                this.loading = false;
            }
        }
    }).$mount('.main-container');

    //detail
    function showDetail(params) {
        this.mode = 'detail';
        let that = this;
        let myHeaders = new Headers();
        let myInit = {
            method: 'POST',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default'
        };
        let id = params.id;
        if (!id) {
            return
        }
        fetch('/admin/article/detail/' + id, myInit).then((response) => {
            return response.json()
        }).then((body) => {
            if (body.status !== '1') {
                that.$data.data = {
                    title: '未知错误',
                    htmlContent: ''
                }
            } else {
                that.$data.data = {
                    title: body.data.title,
                    htmlContent: body.data.htmlContent,
                    author: body.data.author,
                    publishDate: body.data.publishDate,
                    createdDate: body.data.createdDate,
                    source: body.data.source,
                    lastEdit: body.data.createdDate
                };
            }
            this.loading = false
        }).catch((err) => {

        })
    }

    //list
    function showList(params) {
        this.mode = 'list';
        let page = params.page || 1;
        $('.article.list').show();
    }

    //add
    function toAdd() {
        this.mode = 'add';
        $('.article.list').hide();
        let toolbarOptions = [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],

            [{'header': 1}, {'header': 2}],               // custom button values
            [{'list': 'ordered'}, {'list': 'bullet'}],
            [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
            [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
            [{'direction': 'rtl'}],                         // text direction

            [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
            [{'header': [1, 2, 3, 4, 5, 6, false]}],

            [{'color': []}, {'background': []}],          // dropdown with defaults from theme
            [{'font': []}],
            [{'align': []}],

            ['clean', 'image', 'formula', 'video']            // remove formatting button
        ];

        let options = {
            debug: 'info',
            placeholder: '内容输入区域...',
            readOnly: false,
            modules: {
                'toolbar': toolbarOptions
            },
            theme: 'snow'
        };
        let quill = null;
        this.$nextTick(function () {
            quill = new Quill('#editor', options);
        });
    }

    //del
    function toDelete() {
        this.mode = 'del';
    }
}.call(this, window.Vue));