<template>
    <div class="dm-chat-wrapper dm-popup-box add-user" style="left: 340px;" draggable="true">
        <section class="dm-wrapper-title">{{title}}</section>
        <section class="dm-wrapper-content">
            <div class="form-group">
                <input type="text" class="form-ipt" placeholder="请输入用户名" v-model="username" @focus="focusIpt">
                <div class="dm-btn-group">
                    <span class="dm-btn primary addon" v-on:click="searchUser">搜索</span>
                </div>
            </div>
            <div class="search-result">
                <ul class="user-list" v-if="users.length">
                    <li class="user-item" v-for="item in users">
                        <a href="javascript:;" class="avatar">
                            <img src="/images/logo3.png" alt="">
                        </a>
                        <div class="user-info">
                            <p class="user-name">{{item.uname}}</p>
                            <p class="user-desc">{{item.desc}}</p>
                        </div>
                        <a v-if="item.status == 1" href="javascript:;" class="dm-btn primary" v-on:click="add(item._id)">添加</a>
                        <span v-else="item.status == -1">已经是好友</span>
                    </li>
                </ul>
                <p v-else v-html="tip_msg" class="tips"></p>
            </div>
        </section>
    </div>
</template>
<script>
import { searchUser , add_frined } from '../model/user.js';
export default {
    name: 'add-friend',
    data() {
        return {
            title: '查询',
            username: '',
            users: [],
            tip_msg: ''
        }
    },
    methods: {
        focusIpt: function() {
            this.tip_msg = "";
        },
        add: function(id) {
            // this.$emit('addfriend', id);
            add_frined(id);

        },
        searchUser: function() {
            var that = this;
            if (this.username) {
                searchUser(this.username).then((data) => {
                    if (data.length == 0) {
                        that.tip_msg = "未查询到相关用户";
                    }else{
                        console.log(data.slice(0));
                        that.users = data.slice(0);
                    }
                }).catch((err) => {
                    console.log(err);
                })
                // this.$emit('searchfrined', this.username);
            } else {
                this.tip_msg = "请输入用户名";
            }
        }
    }
}
</script>
<style type="text/css">
.dm-wrapper-title {
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-size: 14px;
}

.tips {
    font-size: 14px;
    padding-left: 5px;
}
</style>