define('spider', ['../lib/jQuery-3.1.1.min.js', '../lib/dm-modals.js'], function($, modals) {
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
});
