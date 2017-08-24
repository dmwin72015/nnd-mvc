(function (root, tmpl) {

    let article = {

        add: {
            template:'<div class="row article edit">\n' +
            '    <div class="article-editor-wrap">\n' +
            '        <p class="title-wrap">\n' +
            '            <!--<input type="text" id="art_title" placeholder="标题">-->\n' +
            '            <textarea  rows="1" id="art_title"  placeholder="标题"></textarea>\n' +
            '        </p>\n' +
            '        <div id="editor" class="content-wrap">\n' +
            '            <!--<textarea name="editor" id="" cols="30" rows="10"  ></textarea>-->\n' +
            '        </div>\n' +
            '    </div>\n' +
            '    <aside class="art-side" style="">\n' +
            '        <section class="option-wrap">\n' +
            '            <div class="form-group">\n' +
            '                <label for="cate">类别</label>\n' +
            '                <input type="text" class="form-control" id="cate">\n' +
            '            </div>\n' +
            '            <div class="form-group">\n' +
            '                <label for="author">作者</label>\n' +
            '                <input type="text" class="form-control" id="author">\n' +
            '            </div>\n' +
            '            <div class="form-group">\n' +
            '                <label for="source">来源</label>\n' +
            '                <input type="text" class="form-control" id="source">\n' +
            '            </div>\n' +
            '            <div class="form-group">\n' +
            '                <label for="pub_date">发布时间</label>\n' +
            '                <input type="text" class="form-control" id="pub_date">\n' +
            '            </div>\n' +
            '            <div class="form-group">\n' +
            '                <label for="labels">标签</label>\n' +
            '                <textarea name="beizhu" class="form-control" id="labels"></textarea>\n' +
            '                <div>\n' +
            '\n' +
            '                </div>\n' +
            '            </div>\n' +
            '            <div class="form-group">\n' +
            '                <label for="remarks">备注</label>\n' +
            '                <textarea name="beizhu" class="form-control" id="remarks"></textarea>\n' +
            '            </div>\n' +
            '        </section>\n' +
            '    </aside>\n' +
            '</div>',
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

            methods:{
                test :function(){
                    alert('a')
                }
            }
        },

        '404':{
            template: '<p>暂时无内容</p>'
        }

    };

    tmpl.article = article
})(window, window.Tmpl = window.Tmpl || {});