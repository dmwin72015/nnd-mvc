;
(function (global, $) {
    if (!$ && global.jQuery !== $) return;
    // oPicCode.onclick = function (ev) {
    //     this.src = '/captcha/new.gif?t=' + Date.now();
    // };
    var errData = {
        'msg_1': '请输入用户名',
        'msg_2': '请输入正确的手机或邮箱',
        'msg_3': '请输入密码',
        'msg_4': '密码格式(长度)不正确',
        'msg_5': '两次输入密码不一致',
        'msg_6': '请输入验证码',
        'msg_7': '用户名长度有误,请检查'
    };
    var placeholder = {
        name: '用户名(必须是邮箱),长度为50个字符',
        pwd: '密码(6-18位,必须包含字母、数字)',
        pwd2: '确认密码',
        pcode: '图片码',
    };
    var emailReg = /^([\w-\.]+)@[\w\.\-]+\.[\w]{2,5}$/;
    var pwdReg = //;

        Vue.component('mask-view', {
            template: '<div class="mask"></div>'
        });
    Vue.component('err-tip', {
        template: '<label v-if="status" >{{msg}}</label>',
        props: ['msg', 'status']
    });
    var regView = Vue.component('reg-view', {
        template: '<div v-bind:class="classObj">\
            <h3 class="box-head">\
                <span class="title">{{title}}</span>\
                <a href="javascript:;" class="close-regBox" v-on:click="hide">关闭按钮</a>\
            </h3>\
            <div class="box-body">\
                <div class="reg-view" @focus.capture="clearValidTip">\
                    <p> <span class="field-name">账号</span> <input type="text" name="reg_name" v-bind:class="{err:nameErr}" v-bind:placeholder="tip_name" v-model="uname">\
                        <err-tip v-bind:status="nameErr" v-bind:class="errClass" v-bind:msg="errMsg"></err-tip>\
                    </p>\
                    <p> <span class="field-name">密码</span><input type="password" name="reg_pwd1" v-bind:class="{err:pwdErr1}" v-bind:placeholder="tip_pwd" v-model="upwd1">\
                        <err-tip v-bind:status="pwdErr1" v-bind:class="errClass" v-bind:msg="errMsg"> </err-tip>\
                    </p>\
                    <p><span class="field-name">重复密码</span><input type="password" name="reg_pwd2" v-bind:class="{err:pwdErr2}" v-bind:placeholder="tip_pwd2" v-model="upwd2">\
                        <err-tip v-bind:status="pwdErr2" v-bind:class="errClass" v-bind:msg="errMsg"> </err-tip>\
                    </p>\
                    <p style="margin-bottom: 15px;">\
                        <span class="field-name">性别</span><label for=""><input type="radio" name="sex" value="1" v-model="sex"> 男</label>\
                        <label for=""><input type="radio" name="sex" value="0" v-model="sex"> 女</label>\
                    </p>\
                     <p>\
                        <span class="field-name">年龄</span><input type="text" name="age" v-model="age" placeholder="年龄">\
                     </p>   \
                    <p><span class="field-name">图片码</span><input type="text" name="reg_picode" v-bind:class="{err:capErr}" v-bind:placeholder="tip_pcode" v-model="ucaptcha"/>\
                        <span class="pic-code" v-on:click="flashCode"><img :src="tcha_url" :alt="tip_pcode"></span>\
                        <err-tip v-bind:status="capErr" v-bind:class="errClass" v-bind:msg="errMsg"> </err-tip>\
                    </p>\
                    <p><span class="field-name"></span><input type="button" id="reg_sub" value="确定" v-on:click="reg"></p>\
                </div>\
            </div>\
        </div>',
        props: [],
        data: function () {
            return {
                title: '注册',
                tip_name: placeholder.name,
                tip_pwd: placeholder.pwd,
                tip_pwd2: placeholder.pwd2,
                tip_pcode: placeholder.pcode,
                tcha_url: '/captcha/new.gif',
                classObj: {
                    'box': true,
                    'reg-box': true
                },
                uname: '',
                upwd1: '',
                upwd2: '',
                ucaptcha: '',
                sex:'',
                age:'',
                nameErr: false,
                pwdErr1: false,
                pwdErr2: false,
                capErr: false,
                errClass: {
                    'error': true,
                    'show': false
                },
                errMsg: ''
            }
        },
        methods: {
            hide: function () {
                mask.$data.reg = false;
            },
            reg: function () {
                var that = this;
                console.log(that.$data);
                if (this.valid()) {
                    $.post({
                        url: '/user/reg',
                        type: 'post',
                        data: {
                            uid: that.uname,
                            pwd: that.upwd2,
                            sex: that.sex,
                            captcha: that.ucaptcha
                        }
                    }).done(function (data, text, xhr) {
                        if (data && data.status == '1') {
                            that.hide();
                            return;
                        }
                        if(data.status == '-108'){
                            that.errMsg = data.msg;
                            that.nameErr = true;
                        }
                    });
                }
                // var _data = this.$data;
                // _data.uname = '张三'
            },
            clearValidTip: function (ev) {
                var target = ev.target.name;
                this.errMsg = '';
                switch (target) {
                    case 'reg_name':
                        this.nameErr = false;
                        break;
                    case 'reg_pwd1':
                        this.pwdErr1 = false;
                        break;
                    case 'reg_pwd2':
                        this.pwdErr2 = false;
                        break;
                    case 'reg_picode':
                        this.capErr = false;
                        break;
                }
            },
            validName: function () {
                var uname = this.uname;
                if (uname.length < 1) {
                    this.errMsg = errData.msg_1;
                    this.nameErr = true;
                    return false;
                }
                if(uname.length>50){
                    this.errMsg = errData.msg_7;
                    this.nameErr = true;
                    return false;
                }

                if (!emailReg.test(uname)) {
                    this.errMsg = errData.msg_2;
                    this.nameErr = true;
                    return false;
                }
                return true;
            },
            validPwd1: function () {
                if (this.upwd1.length <= 0) {
                    this.errMsg = errData.msg_3;
                    this.pwdErr1 = true;
                    return false
                }
                if (this.upwd1.length < 6 || this.upwd1.length > 18 || !/^[\w]{6,18}$/.test(this.pwd1)) {
                    this.errMsg = errData.msg_4;
                    this.pwdErr1 = true;
                    return false
                }
                //TODO：密码内容验证
                return true;
            },
            validPwd2: function () {
                if (this.upwd2.length <= 0) {
                    this.errMsg = errData.msg_3;
                    this.pwdErr2 = true;
                    return false
                }
                if (this.upwd2 !== this.upwd1) {
                    this.errMsg = errData.msg_5;
                    this.pwdErr2 = true;
                    return false
                }
                return true;
            },
            validCapt: function () {
                if (this.ucaptcha.length <= 0) {
                    this.errMsg = errData.msg_6;
                    this.capErr = true;
                    return false;
                }
                return true;
            },
            valid: function () {
                if (this.validName() && this.validPwd1() && this.validPwd2() && this.validCapt()) {
                    return true;
                }
                return false;
            },
            flashCode: function () {
                this.tcha_url = '/captcha/new.gif' + '?_=' + Date.now();
            }
        },
        mounted: function (argument) {
            var dom = this.$el;
            var h = dom.offsetHeight;
            var H = window.innerHeight;
            if (h > window.innerHeight) {
                dom.style.marginTop = 0;
            } else {
                dom.style.marginTop = (H - h) / 2 + 'px';
            }
        }
    });

    var login = new Vue({
        el: '#myform',
        data: {
            uname: '',
            upwd: '',
            nameErr: {
                'status': false,
                'msg_1': '请输入用户名',
                'msg_2': '用户名是你的邮箱或手机号'
            },
            pwdErr: {
                'status': false,
                'msg_1': '请输入密码',
                'msg_2': '密码长度6-18'
            },
            errClass: {
                'error': true,
                'show': false
            },
            errMsg: ''
        },
        components: {
            'err-tip': {
                template: '<label>{{msg}}</label>',
                data: function () {
                    return {
                        //TODO:父级变量传递
                        msg: this.$parent.errMsg || ''
                    }
                }
            }
        },
        methods: {
            login: function (ev) {
                var _this = this;
                if (this.valid()) {
                    $.ajax({
                        url: '/user/login',
                        type: 'post',
                        data: {
                            uname: _this.uname,
                            upwd: _this.upwd
                        }
                    }).done(function (data, text, xhr) {
                        if (data && data.code == '1') {
                            window.location.replace('/admin/spider');
                        }
                    })
                }
            },
            reg: function (ev) {
                if (!mask.$el) {
                    mask.$mount('#mask');
                }
                mask.$data.isShow = true;
                mask.$data.reg = true;
            },
            rmTip: function (type) {
                this.errMsg = '';
                if (type == 'name') {
                    this.nameErr.status = false;
                } else if (type == 'pwd') {
                    this.pwdErr.status = false;
                }
            },
            valid: function () {
                var uname = this.uname;
                var upwd = this.upwd;
                if (uname.length < 1) {
                    this.errMsg = this.nameErr.msg_1;
                    this.nameErr.status = true;
                    return false;
                }
                if (upwd.length < 1) {
                    this.errMsg = this.pwdErr.msg_1;
                    this.pwdErr.status = true;
                    return false;
                }
                if (upwd.length > 18 && upwd.length < 6) {
                    this.errMsg = this.pwdErr.msg_1;
                    this.pwdErr.status = true;
                    return false;
                }
                return true;
            }
        }
    });

    var mask = new Vue({
        data: {
            reg: false,
            isShow: false,
            isHide: true
        },
        'mounted': function () {
            // console.log(this.$el.classList);
        },
        methods: {
            // TODO:淡入淡出效果,目前是自己写的
            leave: function () {
                // this.isShow = false;
            },
            afterLeave: function () {
                // this.$el.classList.add('hide');
                this.isShow = false;
            }
        }
    });
    global.login = login;
})(window, jQuery);

;
(function (global, tool) {
    tool.charMode = function (f) {
        var e = f.charCodeAt(0);
        var b = " 　`｀~～!！@·#＃$￥%％^…&＆()（）-－_—=＝+＋[]［］|·:：;；\"“\\、'‘,，<>〈〉?？/／*＊.。{}｛｝";
        if (e >= 48 && e <= 57) {
            return 1
        } else {
            if (e >= 65 && e <= 90) {
                return 2
            } else {
                if (e >= 97 && e <= 122) {
                    return 4
                } else {
                    if (-1 < b.indexOf(f)) {
                        return 8
                    }
                }
            }
        }
        return 0
    }
})(window, (window.tool = window.tool || {}));