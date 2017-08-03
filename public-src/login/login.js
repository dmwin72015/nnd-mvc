define('login', ['particles.js', './config.js', '../lib/jQuery-3.1.1.min.js'], function(particles, conf, $) {
    var particlesJS = window.particlesJS;
    particlesJS('bg', conf);
    $(function() {
        var $name = $('#name'),
            $password = $('#password');
            loginUrl = '/admin/login/'
        $('#btn_login').click(function() {
            var name = $name.val();
            var password = $password.val();
            if(!validata()) return;
            $.post(loginUrl, {
                'name': name,
                'password': password,
                'type': 'post'
            }, function(data) {
                data = typeof data == 'string' ?  $.parseJSON(data) :data;
                if (data.status == 0) {
                    window.location = '/';
                } else {
                    showError($name.next('.error'),data.message);
                }
            });
            return false;
        });
        $('#btn_reg').click(function() {
            return false;
        });
        $('#name,#password').focus(function() {
            hideError($(this).next());
        });
        $('#password').keydown(function(ev) {
            if (ev.keyCode == 13) {
                $('#btn_login').trigger('click');
            }
        }).on('input',function(){
            hideError($(this).next());
        })

        function validata(){
            if($name.val() == ''){
                showError($name.next('.error'),'请输入登录名');
                return !!0;
            }
            if($password.val() == ''){
                showError($password.next('.error'),'请输入密码');
                return !!0;
            }
            return !0;
        }
        //显示错误提示信息
        function showError(dom,msg) {
            dom.addClass('show').text(msg || '网络错误,稍后重试');
        }

        function hideError(dom) {
            dom.removeClass('show').text('');
        }
    });
});
