<template>
    <div id="app">
        <div class="panel-box" id="main-panel">
            <header class="panel-header">
                <h3 class="">{{title}}</h3>
            </header>
            <div class="panel-body">
                <slot name="body" v-if="!hasLogin">
                    <p class="notice">{{waiting}}</p>
                </slot>
                <template v-if="status == 1">
                    <nav class="tab-nav clearfix">
                        <a href="javascript:;" class="tab-nav-item user active"><img src="/images/user.png" alt=""> </a>
                        <a href="javascript:;" class="tab-nav-item users"> <img src="/images/users.png" alt=""> </a>
                        <a href="javascript:;" class="tab-nav-item talking"> <img src="/images/bubble.png" alt=""> </a>
                    </nav>
                    <ul class="tab-body-wraper">
                        <li class="tab-body">
                            <section class="user-wraper">
                                <ul class="user-list" v-on:click="">
                                    <li class="user-item" v-for="(item, index) in friendslist" :key="index" :id="index" @click="toTalk(index)">
                                        <a href="javascript:;" class="avatar">
                                            <img :src="item.avatar || 'http://skt.me/images/logo3.png'" alt="">
                                        </a>
                                        <div class="user-info">
                                            <p class="user-name">{{item.alias || item.name}}</p>
                                            <p class="user-desc">{{item.desc || defaultDesc}}</p>
                                        </div>
                                    </li>
                                </ul>
                            </section>
                        </li>
                        <li class="tab-body hide">
                            <section class="group-wraper">
                                第二个tab
                            </section>
                        </li>
                        <li class="tab-body hide">
                            <section class="">
                                第三个tab
                            </section>
                        </li>
                    </ul>
                </template>
                <template v-else-if="status == -1">
                    <login v-on:login="login_succ"></login>
                </template>
                <template v-else-if="status == -2">
                    <register v-on:register="register_succ"></register>
                </template>
            </div>
            <footer class="panel-footer">
                <div class="footer-inner">
                    <template v-if="!hasLogin">
                        <div class="err-tip" v-html="err_tip"></div>
                    </template>
                    <template v-else>
                        <div class="user-tools">
                            <a href="javascript:;">
                            添加好友
                        </a>
                            <a href="javascript:;">
                            创建群
                        </a>
                        </div>
                    </template>
                </div>
            </footer>
        </div>
        <chat-popup v-bind:chat="chatlist" v-bind:chatIndex="chatIndex" v-on:removeChat="remove" v-on:changeChat="change" v-if="chatlist.length"></chat-popup>
    </div>
</template>
<script>
//  0 -> loading；【-1】 -> not login,在登录页面 ;  【-2】 -> not login ,在注册页面 ； 1 -> login 
import chatPopup from './chat_popup.vue';
import login from './login.vue';
import register from './register.vue';

export default {
    data() {
        return {
            title: '',
            waiting: '加载中....',
            status: '0',
            captcha_url: '/img/capt.gif',
            err_tip: '',
            defaultDesc: '暂时无任何描述',
            userinfo: null,
            chatlist:[],
            chatIndex:-1,
            chatIds :[],
            friendslist: {},
        }
    },
    computed: {
        hasLogin: function() {
            return this.status == 1;
        }
    },
    components: {
        chatPopup: chatPopup,
        login: login,
        register: register
    },
    methods: {
        toTalk: function(index) {
            var ids = this.chatIds;
            var list = this.chatlist;
            if(ids.indexOf(index) === -1){
                ids.push(index);
                list.push(Object.assign({},this.friendslist[index],{id:index}));
                this.chatIndex = ids.length-1;
            }else{
                this.change(index);
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
            }

            fetch('/user/getStatus', options)
                .then(function(response) {
                    return response.json();
                })
                .then(function(data) {
                    if (data.status == 200) {
                        that.status = 1;
                        that.userinfo = data.data;
                        that.title = data.data.uname;
                        that.friendslist = data.data.friends
                    } else {
                        that.status = -1;
                        that.title = '登录'
                    }
                    that.waiting = '';
                })
        },

        login_succ(data) {
            if (data.status != 200) {
                this.err_tip = data.err_msg;
            } else {
                this.status = 1;
                this.friendslist = data.data.friends;
            }
        },
        register_succ(data) {
            alert(data)
        },
        remove(id){
            var ids = this.chatIds;
            var list = this.chatlist;
            var index = ids.indexOf(id);

            ids.splice(index,1);
            list.splice(index,1);

            if(ids.length){
                this.chatIndex = 0;
            }else{
                this.chatIndex = -1;
            }
        },
        change(id){
            this.chatIndex = this.chatIds.indexOf(id);
        }
    },
    mounted: function() {
        this.getStatus();
    }
}
</script>