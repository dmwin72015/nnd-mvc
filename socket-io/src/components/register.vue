<template>
    <div class="login-wraper" @click="focusIpt" @focusout="blurIpt" @focusin="focusIpt">
        <form action="javascript:;">
            <div class="form-group">
                <input type="text" class="form-ipt" v-model="username">
                <span class="ipt-label" v-bind:class="{sup:namefocus}">账号</span>
            </div>
            <div class="form-group">
                <input type="text" class="form-ipt" v-model="password">
                <span class="ipt-label" v-bind:class="{sup:passfocus}">密码</span>
            </div>
            <div class="form-group">
                <input type="text" class="form-ipt" v-model="password_repeat">
                <span class="ipt-label" v-bind:class="{sup:pass2focus}">确认密码</span>
            </div>
            <div class="form-group captcha">
                <input type="text" class="form-ipt" placeholder="" v-model="captcha_val">
                <span class="ipt-label" v-bind:class="{sup:captfocus}">图片验证码</span>
                <span class="capt-img">
                    <img v-bind:src="captcha_url" alt="" v-on:click="refresh_capt">
                </span>
            </div>
            <div class="form-group">
                <input type="button" class="dm-btn primary" value="注册" v-on:click="regUser">
                <a href="javascript:;" class="reg-btn" @click="change">去登录</a>
            </div>
        </form>
    </div>
</template>
<script>
let capt_url = '/img/capt.gif';
let isContains = function(parent, son) {
    if (!son || son === document) return false;
    return son === parent ? true : parent.contains(son);
}
export default {
    name: 'register',
    data() {
        return {
            username: '',
            password: '',
            password_repeat: '',
            captcha_val: '',
            captcha_url: capt_url,
            namefocus: false,
            passfocus: false,
            pass2focus: false,
            captfocus: false,
        }
    },
    methods: {
        refresh_capt() {
            // refresh_capt
            this.captcha_url = capt_url + '?t=' + Date.now();
        },

        regUser() {
            var that = this;
            var tip_data = null;
            if (!that.username) {
                tip_data = {
                    status: 101,
                    err_msg: '请输入账号名'
                }
            } else if (!that.password) {
                tip_data = {
                    status: 102,
                    err_msg: '请输入密码'
                }
            } else if (!that.password_repeat) {
                tip_data = {
                    status: 103,
                    err_msg: '请重复确认密码'
                }
            } else if (that.password_repeat !== that.password) {
                tip_data = {
                    status: 104,
                    err_msg: '两次密码不一致'
                }
            } else if (!that.captcha_val) {
                tip_data = {
                    status: 105,
                    err_msg: '请输入图片码中数字的计算的值'
                }
            }
            if (tip_data) {
                that.$emit('register', tip_data);
                return;
            }
            let loginData = {
                name: that.username,
                pass: that.password,
                captcha: that.captcha_val
            };
            let options = {
                'method': 'post',
                'headers': {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                },
                'credentials': "include",
                'body': JSON.stringify(loginData)
            };
            fetch('/user', options)
                .then(function(response) {
                    return response.json();
                })
                .then(function(data) {
                    that.$emit('register', data);
                });
        },
        change() {
            this.$emit('switch', 1);
        },
        focusIpt(ev) {
            var target = ev.target;
            if (target.tagName == 'INPUT') {
                target.nextElementSibling.classList.add('sup');
            } else if (target.classList.contains('ipt-label')) {
                target.classList.add('sup');
                target.previousElementSibling.focus();
            }
        },
        blurIpt(ev) {
            var target = ev.target;
            if (target.tagName == 'INPUT') {
                !target.value && target.nextElementSibling.classList.remove('sup');
            }
        }
    },
    created: function() {
        this.refresh_capt();
    }
}
</script>