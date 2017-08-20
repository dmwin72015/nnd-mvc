(function (root, tmpl) {

    var article = {

        add: {
            template:'',
            methods:{
                subinfo:function(){


                }
            }
        },
        detail: {
            template: '<div class="view-wrap article-detail-box">\
                    <div class="wrap-close" >\
                        <router-link to="/">\
                        <i class="fa fa-close fa-2x"></i>\
                        </router-link>\
                    </div>\
                    <div class="main-content">\
                        <p v-html>{{ title }}</p>\
                        <p v-html="htmlContent"></p>\
                    </div>\
                </div>',
            props: ['title', 'htmlContent'],
        },

        '404':{
            template: '<p>暂时无内容</p>'
        }

    }

    tmpl.article = article
})(window, window.Tmpl = window.Tmpl || {})