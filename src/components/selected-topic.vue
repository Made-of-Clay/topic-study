<template>
    <div id="selected-topic-container" class="selected-topic">
        <div id="progress-spacer">
        <transition name="fade">
            <md-progress-bar v-show="loading" md-mode="query"></md-progress-bar>
        </transition>
        </div>

        <transition-group name="fadeDown">
        <div v-for="item in items"
            :key="item.id"
            :id="`topic-${item.id}`"
            class="selected-item">
            <div v-html="item.content" class="selected-item__content"></div>
            <div v-html="item.source" class="selected-item__source"></div>
        </div>
        </transition-group>
    </div>
</template>

<script>
export default {
    name: 'selected-topic',

    data() {
        return {
            loading: false,
            items: [],
            selected: -1,
        };
    },
    computed: {
        currentTopicID() {
            return this.$store.state.currentTopicID;
        },
    },

    watch: {
        currentTopicID(id) {
            this.loading = true;
            this.topicService.getTopicItems(id)
                .then(rawItems => this.formatItems(rawItems))
                .then(items => this.items = items)
                .then(() => this.loading = false)
            ;
        },
    },

    methods: {
        formatItems(rawItems) {
            return rawItems.map(item => ({
                id: item.id,
                content: item.content.rendered,
                source: item.title.rendered,
            }));
        },
        highlightCard({id}) {
            console.log("id", id);
            this.selected = id;
        },
    },
};
</script>

<style>
.selected-topic {
    flex: 1;
    margin: 0 1em;
}

.selected-item {
    background-color: white;
    border-bottom: 1px solid rgba(0,0,0,0.25);
    border-radius: 3px;
    margin: 0 auto;
    max-width: 900px;
    padding: 0.75em;
}
.selected-item:first-child {
    border-radius: 4px 4px 0 0;
}
.selected-item:last-child {
    border-radius: 0 0 4px 4px;
}
.selected-item:first-child:last-child {
    border-radius: 4px;
}
.selected-item__content {
    display: block;
    position: relative;
}
.selected-item__content::before,
.selected-item__content::after {
    color: rgba(0, 0, 0, 0.1);
    font-size: 11em;
    line-height: 0.5;
    position: absolute;
}
.selected-item__content::before {
    content: '\201c';
    left: 0;
    top: 0.1em;
}
.selected-item__content::after {
    content: '\201d';
    right: 0;
    top: 100%;
}
.selected-item__source {
    font-size: 1.25em;
    text-align: right;
}
.selected-item__source::before {
    content: '-';
    display: inline-block;
    margin-right: 0.5em;
}

#progress-spacer {
    height: 10px;
}
.md-progress-bar.md-query .md-progress-bar-track,
.md-progress-bar.md-query .md-progress-bar-fill,
.md-progress-bar.md-query .md-progress-bar-buffer {
    background-color: hsla(280, 100%, 31%, 0.5);
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}
.fadeDown-enter-active, .fadeDown-leave-active {
    transition: opacity 0.3s, transform 0.3s;
}
.fadeDown-enter, .fadeDown-leave-to {
    opacity: 0;
}
.fadeDown-enter {
    transform: translateY(100px);
}
.fadeDown-leave-to {
    transform: translateY(-100px);
}
</style>
