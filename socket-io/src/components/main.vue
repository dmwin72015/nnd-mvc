<template>
    <div id="app">
        <div class="panel-box" id="main-panel">
            <header class="panel-header">
                <h3 class="">{{title}}</h3>
            </header>
            <div class="panel-body">
                <!-- <p class="notice" v-if="!hasLogin">{{waiting}}</p> -->
                <component v-bind:is="currentView" v-on:login="login_succ" v-on:register="register_succ" v-on:switch="switchStatus"></component>
            </div>
            <footer class="panel-footer">
                <div class="footer-inner">
                    <template v-if="!hasLogin">
                        <div class="err-tip" v-html="err_tip"></div>
                    </template>
                    <template v-else>
                        <div class="user-tools">
                            <a href="javascript:;" @click="addPopup(1)">添加好友</a>
                            <a href="javascript:;" @click="addPopup(2)">创建群</a>
                            <a href="javascript:;" @click="loginout">退出</a>
                        </div>
                    </template>
                </div>
            </footer>
        </div>
        <chat-popup v-bind:chat="chatlist" v-bind:chatIndex="chatIndex" v-on:removeChat="remove" v-on:changeChat="changeChatUser" v-if="chatlist.length"></chat-popup>
        <keep-alive>
        <confirm-popup v-if="confirm"  title="提示信息" content="是否确认退出？" v-on:closeConfim="closeConfim"></confirm-popup>
        </keep-alive>
    </div>
</template>
<script>
//  0 -> loading；【1】 -> not login,在登录页面 ;  【2】 -> not login ,在注册页面 ；3->登陆之后（friendsList）
import chatPopup from './chat_popup.vue';
import login from './login.vue';
import register from './register.vue';
import friends from './friends.vue';
import confirm from './confirm.vue';

export default {
    data() {
        return {
            title: '加载中....',
            waiting: '加载中....',
            status: '0',
            captcha_url: '/img/capt.gif',
            err_tip: '',
            defaultDesc: '暂时无任何描述',
            userinfo: null,
            chatlist: [],
            chatIndex: -1,
            chatIds: [],
            friendslist: null,
            confirm:false
        }
    },
    computed: {
        hasLogin: function() {
            return this.status == 3;
        },
        currentView: function() {
            switch (''+this.status) {
                case '1':
                    return 'login'
                    break;
                case '2':
                    return 'register'
                    break;
                case '3':
                    return 'friendsList'
                    break;
                default:
                    return '';
            }
        }
    },
    components: {
        chatPopup: chatPopup,
        login: login,
        register: register,
        friendsList: friends,
        confirmPopup:confirm
    },
    methods: {
        toTalk: function(index) {
            var ids = this.chatIds;
            var list = this.chatlist;
            if (ids.indexOf(index) === -1) {
                ids.push(index);
                list.push(Object.assign({}, this.friendslist[index], { id: index }));
                this.chatIndex = ids.length - 1;
            } else {
                this.changeChatUser(index);
                console.log('已经存在')
            }
        },

        getStatus() {
            let that = this;
            let options = {
                'method': 'get',
                // 'Content-Type': 'application/json',
                // 'body':'',
                credentials: "include"
            };

            fetch('/user/getStatus', options)
                .then(function(response) {
                    return response.json();
                })
                .then(function(data) {
                    if (data.status == 200) {
                        that.status = '3';
                        that.userinfo = data.data;
                        that.title = data.data.uname;
                        that.friendslist = data.data.friends
                    } else {
                        that.status = 1;
                        that.title = '登录'
                    }
                    that.waiting = '';
                })
        },

        login_succ(data) {
            if (data.status != 200) {
                this.err_tip = data.err_msg;
            } else {
                this.status = 3;
                this.title = data.data.uname;
                this.friendslist = data.data.friends;
            }
        },
        register_succ(data) {
            var that = this;
            if (data.status != 200) {
                this.err_tip = data.err_msg;
            } else {
                that.err_msg = '注册成功！三秒之后跳转登录界面。';
                setTimeout(function() {
                    that.status = -1;
                    that.err_msg = '';
                }, 3000);
            }
        },
        loginout(){
            this.confirm = true;
        },
        remove(id) {
            var ids = this.chatIds;
            var list = this.chatlist;
            var index = ids.indexOf(id);

            ids.splice(index, 1);
            list.splice(index, 1);

            if (ids.length) {
                this.chatIndex = 0;
            } else {
                this.chatIndex = -1;
            }
        },
        changeChatUser(id) {
            this.chatIndex = this.chatIds.indexOf(id);
        },
        switchStatus(status) {
            // this.status = status;
            this.status = status;
        },
        addPopup(type){

        },
        closeConfim:function(){
            this.confirm = false;
        }
    },
    mounted: function() {
        this.getStatus();
    }
}
</script>