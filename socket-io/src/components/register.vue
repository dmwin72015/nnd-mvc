<template>
    <div class="login-wraper">
        <form action="javascript:;">
            <div class="form-group">
                <input type="text" class="form-ipt" v-model="username">
                <span class="ipt-label">账号</span>
            </div>
            <div class="form-group">
                <input type="text" class="form-ipt" v-model="password">
                <span class="ipt-label">密码</span>
            </div>
            <div class="form-group">
                <input type="text" class="form-ipt" v-model="password_repeat">
                <span class="ipt-label">确认密码</span>
            </div>
            <div class="form-group captcha">
                <input type="text" class="form-ipt" placeholder="" v-model="captcha_val">
                <span class="ipt-label">图片验证码</span>
                <span class="capt-img">
                    <img v-bind:src="captcha_url" alt="" v-on:click="refresh_capt">
                </span>
            </div>
            <div class="form-group">
                <input type="button" class="dm-btn primary" value="注册" v-on:click="saveUser">
                <a href="javascript:;" class="reg-btn">去登录</a>
            </div>
        </form>
    </div>
</template>
<script>
export default {
    name:'register',
    data() {
        return{
            username:'',
            password:'',
            password_repeat:'',
            captcha_val:'',
            captcha_url:''
        }
    },
    methods:{
        refresh_capt(){
            // refresh_capt
            this.captcha_url = this.captcha_url.replace('')
        },

        saveUser(){
            alert('注册');
        }
    }
}
</script>