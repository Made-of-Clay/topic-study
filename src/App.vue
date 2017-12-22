<template>
    <div id="app-wrapper">
        <md-toolbar class="app-header">
            <md-button class="md-icon-button app-header__toggle"
                :class="{'is-disabled':stickyDrawer}"
                @click="toggleDrawer">
                <md-icon>menu</md-icon>
            </md-button>

            <h1 v-html="pageTitle" class="md-title app-header__title"></h1>
        </md-toolbar>

        <div class="content-wrapper l-body" :class="{'l-sticky-drawer':stickyDrawer}">
            <topic-list class="l-drawer" :class="dynamicDrawerClasses"></topic-list>
            <selected-topic></selected-topic>
        </div>

        <transition name="fadeIn">
                <!-- :class="{'is-showing':overlayShowing}" -->
            <div v-show="overlayShowing"
                class="l-overlay"
                @click="hideOverlay"></div>
        </transition>
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
            stickyDrawer: true,
            drawerShowing: false,
        };
    },
    computed: {
        pageTitle() {
            return this.$store.getters.pageTitle;
        },
        dynamicDrawerClasses() {
            return {
                'l-drawer--floating': !this.stickyDrawer,
                'is-showing': this.drawerShowing,
            };
        },
        overlayShowing() {
            return !this.stickyDrawer && this.drawerShowing;
        },
    },
    watch: {
        pageTitle: title => document.title = title,
    },

    created() {
        window.addEventListener('resize', () => this.checkStickyDrawer());
    },
    mounted() {
        this.checkStickyDrawer();
    },

    methods: {
        toggleDrawer() {
            this.drawerShowing = !this.drawerShowing;   
        },
        checkStickyDrawer() {
            this.stickyDrawer = window.innerWidth > 800;
        },
        hideOverlay() {
            this.drawerShowing = false;
        },
    },
}
</script>

<style>
body {
    background-color: #f0f0f0;
    display: flex;
}
#app-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
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

.l-overlay {
    background-color: rgba(0,0,0,0.5);
    height: 100%;
    left: 0;
    /*opacity: 0;*/
    position: fixed;
    transition: opacity 0.3s;
    top: 0;
    width: 100%;
}
/*.l-overlay.is-showing {
    opacity: 1;
}*/

.app-header {
    background-color: #67009c;
    color: white;
}
.app-header__toggle {
    color: white;
}
.app-header__toggle.is-disabled {
    cursor: not-allowed;
    opacity: 0.5;
}

.l-body {
    flex: 1;
    padding-top: 2em;
    position: relative;
}
.l-body.l-sticky-drawer {
    display: flex;
}
.l-drawer {
    flex: 0 0 300px;
    transition: transform 0.3s;
    width: 300px;
}
.l-drawer--floating {
    left: -300px;
    position: absolute;
    top: 0;
}
.l-drawer--floating.is-showing {
    transform: translateX(300px);
}

.fadeIn-enter-active, .fadeIn-leave-active {
    transition: opacity 0.3s;
}
.fadeIn-enter, .fadeIn-leave-to {
    opacity: 0;
}
.fadeIn-enter {
    transform: translateX(100%);
}
.fadeIn-leave-to {
    transform: translateY(-100%);
}
</style>
