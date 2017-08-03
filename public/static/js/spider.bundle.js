webpackJsonp([2],{

/***/ 10:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 12:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;var _ = __webpack_require__(1);
var $ = __webpack_require__(0);
var _locals = {
    'zh_cn': {
        B_Title: '标题'

    },
    'en': {
        B_Title: 'title'
    }
};


!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {

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
}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(10);
module.exports = __webpack_require__(8);


/***/ }),

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0), __webpack_require__(12)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, modals) {
    $(function() {
        var $getBtn = $('#getJira');
        var $jiraNo = $('#jiraNo');
        $getBtn.on('click', function(ev) {
            var jNo = $jiraNo.val();
            if (!jNo) return;
            getDataJira(jNo);
        });

        $('.spider-box').on('click', function(ev) {
            var $target = $(ev.target);
            var sClassName = ev.target.className;
            if (sClassName.indexOf('j-toOut') != -1) {
                // loginJira(ev);
            } else if (sClassName.indexOf('j-toLogin') != -1) {
                // quitJira(ev);
            }
        });
        var loginModal = new modals({
            title: '登录JIRA',
            wraper: '.j-loginJira',
            css: 'jira',
            body: {
                html: '<p class="input-wraper"><input type="text"  name="jiraLoginName" id="jira_name" class="form-control txt-input" placeholder="JIRA账号"></p><p class="input-wraper"><input type="text" name="jiraPassword" id="jira_pwd" class="form-control txt-input" placeholder="JIRA密码"></p><p class="input-wraper"><input type="button" class="btn" value="登录" id="loginJiraBtn"></p>'
            },
            btns: {
                '#loginJiraBtn': function(argument) {
                    loginJira();
                }
            },
            aftershow: function() {
                $('#jira_name,#jira_pwd').focus(function() {
                    $(this).removeClass('error');
                    $('#loginJiraBtn').next().remove();
                });
                $('#jira_name').val('');
                $('#jira_pwd').val('');
            },
            strict: false
        });
        var captcha = '<p class="input-wraper captcha"><img src="http://tlc.xin.com/captcha?ts=' + Date.now() + '" alt="" class="jira-imgCode"></p>';

        $('.j-toLogin').click(function() {
            loginModal.show();
        });

        var status = 'end';

        function loginJira() {
            if (status == 'run') return;
            var $name = $('#jira_name');
            var $pwd = $('#jira_pwd');
            var result = validate($name, $pwd);
            if (result.status) {
                status = 'run';
                $('#loginJiraBtn').val('登录中...');
                jiraAction({
                    'type': 'login',
                    'jiraName': $name.val(),
                    'jiraPwd': $pwd.val(),
                    'captcha': ''
                }, function(err, data) {
                    if (err || data.status != 1) {
                        errorTip(data);
                        return;
                    }else if (data.status == '1') {
                        var time = data.data.time;
                        var user = data.data.user;
                        var sHtml = '<span class="jira-user">' + user + '(' + time + ')</span><a href="javascript:;" class="j-toOut">退出jira</a>';
                        $('.jira-status').html(sHtml);
                        loginModal.hide();
                    }
                });
                status = 'end';
                $('#loginJiraBtn').val('登录');
            }
        }

        function quitJira() {
            jiraAction({ 'type': 'quit' }, function(err, data) {

            });
        }

        function getDataJira(id) {
            jiraAction({ 'type': 'jira', id: id }, function(err, data) {
                console.log(data);
            });
        }

        function jiraAction(opt, callback) {
            $.ajax({
                url: '/admin/spider/jira',
                type: 'post',
                data: Object.assign({}, opt),
                success: function(data, status, xhr) {
                    callback(null, data);
                },
                error: function(xhr, status, err) {
                    callback(xhr);
                }
            });
        }

        function validate($name, $pwd) {
            if ($name.val() == '') {
                var errMsg = {
                    status: false,
                    id: '#jira_name',
                    msg: '账号不能为空'
                }
                errorTip(errMsg)
                return errMsg;

            }
            if ($pwd.val() == '') {
                var errMsg = {
                    status: false,
                    id: '#jira_pwd',
                    msg: '密码不能为空'
                }
                errorTip(errMsg)
                return errMsg;
            }
            return {
                status: true,
                msg: 'success'
            };
        }

        function errorTip(info) {
            $('#loginJiraBtn').next().remove();
            $(info.id).addClass('error');
            $('#loginJiraBtn').after('<span style="color:red;margin-left:10px;">' + info.msg + '</span>');
        }
    });
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ })

},[19]);
//# sourceMappingURL=../maps/js/spider.bundle.js.map