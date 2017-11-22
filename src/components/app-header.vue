<template>
    <md-toolbar class="app-header">
        <md-button class="md-icon-button app-header__toggle"
            @click="toggle">
            <md-icon>menu</md-icon>
        </md-button>

        <h1 v-html="pageTitle" class="md-title app-header__title"></h1>
    </md-toolbar>
</template>

<script>
export default {
    name: 'app-header',

    data: () => ({
        topicData: {}
    }),
    computed: {
        pageTitle() {
            let title = 'Topic Study';
            let curTopicName = this.$store.state.currentTopicName;
            if (curTopicName) {
                title += `: ${curTopicName}`;
            }
            return title;
        }
    },

    methods: {
        toggle() {
            console.log('toggle');
        }
    }
};
</script>

<style>
.app-header {
    background-color: purple;
    color: white;
}
.app-header__toggle {
    color: white;
}
</style>
