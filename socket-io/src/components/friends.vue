<template>
    <div>
        <nav class="tab-nav clearfix">
            <a href="javascript:;" class="tab-nav-item user active"><img src="/images/user.png" alt=""> </a>
            <a href="javascript:;" class="tab-nav-item users"> <img src="/images/users.png" alt=""> </a>
            <a href="javascript:;" class="tab-nav-item talking"> <img src="/images/bubble.png" alt=""> </a>
        </nav>
        <ul class="tab-body-wraper">
            <li class="tab-body">
                <section class="user-wraper">
                    <div class="empty-tip" v-if="!friendslist">无好友，请添加</div>
                    <ul class="user-list" v-on:click="">
                        <li class="user-item" v-for="(item, index) in friendslist" :key="index" :id="index" @click="toTalk(index)">
                            <a href="javascript:;" class="avatar"><img :src="item.avatar || 'http://skt.me/images/logo3.png'" alt=""></a>
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
    </div>
</template>
<script>
export default {
    name: 'friendslist',
    props: ['friends'],
    data() {
        return {
            friendslist: this.friends
        }
    },
    methods: {
        toTalk: function(id) {

        }
    }

}
</script>