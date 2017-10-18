<template>
    <div class="login-wraper" @click="focusIpt" @focusout="blurIpt" @focusin="focusIpt">
        <form action="javascript:;">
            <div class="form-group">
                <input type="text" class="form-ipt" v-model="username" >
                <span class="ipt-label">账号</span>
            </div>
            <div class="form-group">
                <input type="text" class="form-ipt" v-model="password" >
                <span class="ipt-label">密码</span>
            </div>
            <div class="form-group">
                <input type="button" class="dm-btn primary" value="登录" @click="loginUser">
                <a href="javascript:;" class="reg-btn" @click="change">去注册</a>
            </div>
        </form>
    </div>
</template>
<script>
import { queryString } from '../utils/index'
export default {
    name: 'login',
    data() {
        return {
            username: '',
            password: '',
            uri: '/user/login'
        }
    },
    computed: {
        subclassObj() {
            return namefocus ? 'sub' : '';
        }
    },
    methods: {
        loginUser() {
            if (!this.username) {
                that.$emit('login', {
                    status: -1,
                    err_msg: '请输入账号'
                });
                return;
            }
            if (!this.password) {
                that.$emit('login', {
                    status: -2,
                    err_msg: '请输入密码'
                });
                return;
            }
            let loginData = {
                name: this.username,
                pass: this.password
            };
            let options = {
                'method': 'post',
                'headers': {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded'
                },
                // 'body': queryString({
                //     name: this.username,
                //     pass: this.password
                // })
                'credentials': "include",
                'body': JSON.stringify(loginData)
            };
            let that = this;
            fetch(this.uri, options)
                .then(function(response) {
                    return response.json();
                })
                .then(function(data) {
                    that.$emit('login', data);
                })
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
        },
        change() {
            this.$emit('switch', 2);
        },
    }
}
</script>