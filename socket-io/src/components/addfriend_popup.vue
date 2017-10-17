<template>
    <div class="dm-chat-wrapper dm-popup-box add-user" style="left: 340px;" draggable="true">
        <section class="dm-wrapper-title"></section>
        <section class="dm-wrapper-content">
            <div class="form-group">
                <input type="text" class="form-ipt" placeholder="请输入用户名" v-model="username">
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
                        <a v-if="item.status == 1" href="javascript:;" class="dm-btn primary" v-on:click="addFriend(item._id)">添加</a>
                        <span v-else="item.status == -1">已经是好友</span>
                    </li>
                </ul>
                <p v-else v-html="tip_msg" class="tips"></p>
            </div>
        </section>
    </div>
</template>

<script>
    export default{
        data(){
            return {}
        }
    }
</script>