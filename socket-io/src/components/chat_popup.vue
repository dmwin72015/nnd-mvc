<template>
    <div class="dm-chat-wrapper dm-popup-box dm-anim dm-bottomIn" v-bind:style="{ width:(600+multiStyle.width)+'px'}">
        <section class="dm-wrapper-title"></section>
        <section class="dm-wrapper-content">
            <ul class="dm-chat-userlist dm-user-list" v-if="chat.length>1" v-bind:style="{width:multiStyle.width+'px',height:'100%'}">
                <li v-for="(item, id) in chat" :key="item.id" :data-index="id" v-bind:class="{ active: currIndex == id }" @click="chatto(item.id)">
                    <img :src="item.avatar || defaultLogo" alt="" class="dm-avatar">
                    <span>{{item.name}}</span>
                </li>
            </ul>
            <div class="dm-chat-box" v-bind:style="{marginLeft:multiStyle.width+'px'}">
                <div class="dm-chat-inner">
                    <div class="dm-chat-title">
                        <div class="dm-chat-info">
                            <img src="//tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg" alt="" class="dm-avatar">
                            <a class="dm-chat-name no-break" :title="chatUser.name">{{chatUser.name}}
                                <br/>
                                <span class="dm-chat-userStatus online">({{chatUser.status || '在先'}})</span>
                            </a>
                        </div>
                        <div class="dm-wrapper-tool">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <div class="dm-chat-main">
                        <transition name="fade">
                            <ul id="messages_list" v-if="messages.length>0">
                                <li v-for="item in messages" v-bind:class="{ mine : item.name === chatUser.name }">
                                    <div class="chat-user">
                                        <img src="/images/logo3.png" class="dm-avatar" alt="">
                                        <span class="user-name no-break"> 
                                            <template v-if="chatUser.name !== item.name" v-html="">
                                                {{item.name}}
                                            </template>
                                            <i class="time">{{item.time}}</i>
                                        </span>
                                    </div>
                                    <div class="chat-text" v-html="item.words">
                                    </div>
                                </li>
                            </ul>
                        </transition>
                    </div>
                    <div class="dm-chat-foot">
                        <div class="dm-chat-tool">
                            <span class="dm-icon emoji-icon"></span>
                            <span class="dm-icon file-icon"></span>
                            <span class="dm-icon audio-icon"></span>
                            <span class="dm-icon video-icon"></span>
                            <span class="dm-icon setting-icon"></span>
                            <span class="dm-icon history-icon pull-right">
                                <em>聊天记录</em>
                            </span>
                        </div>
                        <div class="dm-chat-sendText">
                            <textarea id="sendText" autofocus="true" v-model="msg" v-on:keydown.prevent.13="send"></textarea>
                        </div>
                        <div class="dm-chat-sendBtns">
                            <a href="javascript:;" class="dm-btn danger" v-on:click="close">关闭</a>
                            <a href="javascript:;" class="dm-btn-group">
                                <span class="dm-btn send" @click="send">发送</span>
                                <span class="dm-btn send dropdown" id="sendOpt"><i class="caret"></i></span>
                                <ul class="dropdown-menu" data-toggle="sendOpt">
                                    <li>
                                        <i>√</i>i按Enter键发送消息
                                    </li>
                                    <li>
                                        <i></i>按Ctrl+Enter键发送消息
                                    </li>
                                </ul>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
export default {
    name: 'chat-popup',
    props: ['chat', 'chatIndex'],
    data: function() {
        return {
            defaultLogo: 'images/logo3.png',
            messages: [],
            msg: '',
            socket: null
        }
    },
    computed: {
        chatUser: function() {
            return this.chat[this.chatIndex];
        },
        currIndex: function() {
            return parseInt(this.chatIndex);
        },
        multiStyle: function() {
            return {
                width: this.chat.length > 1 ? 160 : 0
            }
        }
    },
    methods: {
        close: function(id) {
            this.$emit('removeChat', this.chatUser.id);
        },
        send: function() {
            if (this.msg) {
                let chatList = this.$el.querySelector('#messages_list');
                this.socket.emit('client-msg', {
                    user: this.chatUser,
                    words: this.msg
                });
                this.msg = '';

            }
        },
        history: function() {
            alert('历史记录')
        },
        chatto: function(id) {
            this.$emit('changeChat', id);
        },
        scroll: function() {
            this.$nextTick(function() {
                let chatList = this.$el.querySelector('#messages_list').parentNode;
                chatList && (chatList.scrollTop = chatList.scrollHeight);
            });
        }

    },
    created: function() {
        let that = this;
        let socket = this.socket = io('/');

        socket.on('connected', function(data) {
            console.log(data);
        });

        socket.on('all-broadcast-msg', function(data) {
            console.log(data);

            that.messages.push({
                name: data.username,
                time: data.time,
                words: data.words
            });
            that.scroll();
        });
    }

}
</script>