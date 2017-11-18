<template>
    <div class="dm-shade">
        <div class="dm-conform-wraper dm-popup-box dm-anim dm-topIn" draggable="true" :style="position">
            <section class="dm-wrapper-title">{{title}}</section>
            <section class="dm-wrapper-content">
                <div class="confirm-text">
                    {{content}}
                </div>
                <div class="dm-chat-sendBtns">
                    <a href="javascript:;" class="dm-btn primary" v-on:click="yes">确认</a>
                    <a href="javascript:;" class="dm-btn default" v-on:click="no">返回</a>
                </div>
            </section>
        </div>
    </div>
</template>
<script>
import {logout} from '../model/user.js';
export default {
    name: 'confirm-popup',
    props: ['title', 'content'],
    data() {
        return {
            tipTitle: 'title提示信息',
            left: 0,
            top: 0
        }
    },
    methods: {
        yes: function() {
            logout().then(() => {
                alert('登出成功');
                this.$emit('loginSucc', 1);
            }).catch(() => {
                alert('登出失败')
            });
        },
        no: function() {
            this.$emit('closeConfim');
        }
    },
    computed: {
        position: function() {
            return {
                left: `${this.left}px`,
                top: `${this.top}px`
            }
        }
    },
    mounted: function() {
        var that = this;
        var viewWidth = window.innerWidth;
        var viewHeight = window.innerHeight;

        var elWidth = this.$el.children[0].offsetWidth;
        var elHeight = this.$el.children[0].offsetHeight;

        this.left = viewWidth > elWidth ?  (viewWidth - elWidth) / 2 : 0;
        this.top = viewHeight > elHeight ? (viewHeight - elHeight) / 2 : 0;
        window.onresize = function() {
            viewWidth = window.innerWidth;
            viewHeight = window.innerHeight;
            that.left = viewWidth > elWidth ?  (viewWidth - elWidth) / 2 : 0;
            that.top = viewHeight > elHeight ? (viewHeight - elHeight) / 2 : 0;
        }
        console.log('mounted.....');
    },
    destroyed: function() {
        window.onresize = null;
        console.log('destroyed....');
    }
}
</script>