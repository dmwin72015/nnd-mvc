import Vue from 'vue'
import App from './components/main.vue'

import VueRouter from 'vue-router'
import addfriend from './components/addfriend_popup.vue';
import chatPopup from './components/chat_popup.vue';

const routes = [
    { path: '/addfriend', component: addfriend },
    { path: '/chat', component: chatPopup }
];

const router = new VueRouter({
    routes // （缩写）相当于 routes: routes
})

require('./css/common.css');
require('./css/style.css');
require('./css/talk.less');
require('./css/lib.less');

// 比较重要，不然的话组件里会报错 。<router-link> - did you register the component correctly
Vue.use(VueRouter);

new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});