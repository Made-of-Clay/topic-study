"use strict";

export default {
    state: {
        currentTopicID: '',
        currentTopicName: '',
    },
    actions: {
        setCurrentTopic({commit}, currentTopic) {
            commit('UPDATE_CURRENT_TOPIC_ID', currentTopic.id);
            commit('UPDATE_CURRENT_TOPIC_NAME', currentTopic.name);
        },
    },
    mutations: {
        UPDATE_CURRENT_TOPIC_ID(state, id) {
            state.currentTopicID = id;
        },
        UPDATE_CURRENT_TOPIC_NAME(state, name) {
            state.currentTopicName = name;
        },
    },
};
