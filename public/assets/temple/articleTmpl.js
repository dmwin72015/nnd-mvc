(function (root, tmpl) {

    let article = {

        add: {
            template:'<div class="row article edit">\n' +
            '    <div class="article-editor-wrap">\n' +
            '        <p class="title-wrap">\n' +
            '            <!--<input type="text" id="art_title" placeholder="标题">-->\n' +
            '            <textarea  rows="1" id="art_title"  placeholder="标题" v-model.trim="title"></textarea>\n' +
            '        </p>\n' +
            '        <div id="editor" class="content-wrap">\n' +
            '            <!--<textarea name="editor" id="" cols="30" rows="10"  ></textarea>-->\n' +
            '        </div>\n' +
            '    </div>\n' +
            '    <aside class="art-side" style="">\n' +
            '        <section class="option-wrap">\n' +
            '            <div class="form-group">\n' +
            '                <label for="cate">类别</label>\n' +
            '                <input type="text" class="form-control" id="cate" v-model.trim="cate.name">\n' +
            '            </div>\n' +
            '            <div class="form-group">\n' +
            '                <label for="author">作者</label>\n' +
            '                <input type="text" class="form-control" id="author" v-model.trim="author.name">\n' +
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
            '            </div>\n' +
            '            <div class="form-group">\n' +
            '                <label for="remarks">备注</label>\n' +
            '                <textarea name="beizhu" class="form-control" id="remarks"></textarea>\n' +
            '            </div>\n' +
            '        </section>\n' +
            '    </aside>\n' +
            '</div>',
            data:function () {
                return {
                    title:'',
                    cate:{
                        id:'',
                        name:'22'
                    },
                    author:{
                        id:'',
                        name:''
                    }
                }
            },
            methods:{
                subinfo:function(){


                }
            }
        },
        detail: {
            template: '<div class="row article detail ">\
                    <article class="art-content">\
                        <h1>{{data.title}}</h1>\
                        <div v-html="data.htmlContent">\
                        </div>\
                    </article>\
                    <aside class="art-side">\
                        <p class="title">{{data.title}}</p>\
                        <p class="info-group">\
                            <span class="info-name">作者</span> <span class="info-val">{{data.author}}</span>\
                        </p>\
                        <p class="info-group">\
                            <span class="info-name">来源</span> <span class="info-val">{{data.source}}</span>\
                        </p>\
                        <p class="info-group">\
                            <span class="info-name">创建时间</span> <span class="info-val">{{data.createdDate | formatDate  }}</span>\
                        </p>\
                        <p class="info-group">\
                            <span class="info-name">发布时间</span> <span class="info-val">{{data.publishDate | formatDate }}</span>\
                        </p>\
                        <p class="info-group">\
                            <span class="info-name">最后一次编辑</span> <span class="info-val">{{data.lastEdit | formatDate }}</span>\
                        </p>\
                    </aside>\
                </div>',
            props: ['data'],

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