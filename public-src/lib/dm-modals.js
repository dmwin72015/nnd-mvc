var _ = require('lodash');
var $ = require('../lib/jQuery-3.1.1.min.js');
var _locals = {
    'zh_cn': {
        B_Title: '标题'

    },
    'en': {
        B_Title: 'title'
    }
};


define('modals', function() {

    function Modals(options) {
        this.options = {
            opacity: 0.4,
            strict: true,
            close: '.model_old-close',
            wraper: 'body',
            status: 'empty'
        };

        return this.init(_.assign({}, this.options, options));
    }
    /*
        title --  string
        class  ---   jira
        opacity ---   0.4
        head --- 头部
        body  -- HTML 主要内容区域
        foot --- 
        style ---- {color:red}
        yes ---- 确定按钮  默认功能：隐藏弹框
        no  ---- 取消按钮  默认功能：隐藏弹框
        strict  ------ 严格 1 宽松 0 默认：1
    
        <div class="model_old-box box jira">
            <a href="javascript:;" class="model_old-close"></a>
            <div class="box-head">
                <h3 class="title">登录JIRA</h3>
            </div>  
            <div class="box-body">
                <p class="input-wraper">
                    <input type="text"  name="jiraLoginName" id="jira_name" class="form-control" placeholder="JIRA账号">
                </p>
                <p class="input-wraper">
                    <input type="text" name="jiraPassword" id="jira_pwd" class="form-control" placeholder="JIRA密码">
                </p>
                <p class="input-wraper">
                    <img src="http://tlc.xin.com/captcha?ts=" alt="" class="jira-imgCode">
                </p>
                <p class="input-wraper">
                    <input type="button" class="btn" value="登录" id="loginJira">
                </p>
            </div>
            <div class="box-foot"></div>    
        </div>
    */

    Modals.prototype = {
        constructor: Modals,

        init: function(options) {
            this.options = options;
            var that = this;
            var head = options.head || {};
            var body = options.body || {};

            var _data = {
                css: '',
                body: {
                    html: '',
                    class: ''
                },
                head: {
                    html: '',
                    class: ''
                },
                foot: {
                    html: '',
                    class: ''
                }
            };

            _data.title = options.title || head.title || '';
            _data.css = options.css || '';
            if (options.head) {
                _data.head = _.assign(_data.head, options.head);
            }

            if (options.body) {
                _data.body = _.assign(_data.body, options.body);
            }
            if (options.foot) {
                _data.foot = _.assign(_data.foot, options.foot);
            }

            this.dom = $(this.render(options, _data));
            this.wrapDom = $(this.options.wraper);
            this.dom.on('click', this.options.close, function() {
                that.hide();
            });
            if (options.btns) {
                for (var btn in options.btns) {
                    (function(btn) {
                        that.dom.on('click', btn, function(ev) {
                            options.btns[btn].apply(this, ev);
                        });
                    })(btn)
                }
            }
            return this;
        },

        show: function() {
            if (this.options.status == 'empty') {
                this.wrapDom.append(this.dom);
                if(typeof this.options.aftershow == 'function'){
                    this.options.aftershow.call(this);
                }
            }
            this.wrapDom.show();
            this.options.status = 'show';
        },

        hide: function() {
            this.wrapDom.hide();
            this.status = 'hide';
        },

        afterShow: function() {

        },

        render: function(options, data) {
            var _html = '<div class="model_old-box box <%=css%>"><a href="javascript:;" class="model_old-close"></a>';

            if (data.title) {
                _html += '<div class="box-head <%=head.class%>"><h3 class="title"><%=title%></h3></div>';
            }
            _html += '<div class="box-body">' + (options.strict === false ? '<%= body.html %>' : '<%- body.html %>') + '</div>';

            if (options.foot && options.foot.html) {
                _html += '<div class="box-foot<%=foot.class%>"><%- foot.html %></div>';
            }
            _html += '</div>';
            var comp = _.template(_html);

            this._tmpl = _html;
            return comp(data).trim();
        },

        animate: function() {

        },
        destory: function() {
            var that = this,
                options = that.options;
            this.dom.off('click', this.options.close);
            if (options.btns) {
                for (var btn in options.btns) {
                    (function(btn) {
                        that.dom.off('click', btn);
                    })(btn);
                }
            }
            this.dom.remove();
        }
    };
    return Modals;
});
