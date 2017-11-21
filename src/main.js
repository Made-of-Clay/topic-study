import Vue from 'vue';
import VueMaterial from 'vue-material';
import App from './App.vue';
import axios from 'axios';

Vue.use(VueMaterial);

new Vue({
    el: '#app',
    render: h => h(App)
});
