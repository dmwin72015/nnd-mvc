import Vue from 'vue'
import App from './components/main.vue'

require('./css/common.css');
require('./css/style.css');
require('./css/talk.less');


new Vue({
    el: '#app',
    render: h => h(App)
});
