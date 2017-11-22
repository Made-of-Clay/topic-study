"use strict";

import Vue from 'vue';
import Vuex from 'vuex';
import VueMaterial from 'vue-material';
import App from './App.vue';
import InitStore from './store.js';
import TopicService from './Topic.service.js';

Vue.use(VueMaterial);
Vue.use(Vuex);
Vue.use({
    install(Vue) {
        Vue.prototype.topicService = new TopicService();
    }
});

new Vue({
    el: '#app',
    render: h => h(App),
    store: new Vuex.Store(InitStore),
});
