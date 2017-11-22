<template>
    <div id="app-wrapper">
        <md-toolbar class="app-header">
            <md-button class="md-icon-button app-header__toggle"
                @click="toggleDrawer">
                <md-icon>menu</md-icon>
            </md-button>

            <h1 v-html="pageTitle" class="md-title app-header__title"></h1>
        </md-toolbar>

        <div class="content-wrapper">
            <topic-list></topic-list>
            <selected-topic></selected-topic>
            <!-- <app-drawer></app-drawer>
            <app-content></app-content> -->
        </div>
    </div>
</template>

<script>
import TopicList from './components/topic-list';
import SelectedTopic from './components/selected-topic';

const siteTitle = 'Topic Study';

export default {
    name: 'app',

    components: { TopicList, SelectedTopic },

    data() {
        return {
        };
    },
    computed: {
        pageTitle() {
            let curTopicName = this.$store.state.currentTopicName;
            return curTopicName ? `${siteTitle}: ${curTopicName}` : siteTitle;
        }
    },

    created() {
    },

    methods: {
        toggleDrawer() {
            console.log('toggle');
        },
    },
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

h1, h2 {
    font-weight: normal;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}

.app-header {
    background-color: purple;
    color: white;
}
.app-header__toggle {
    color: white;
}
</style>
