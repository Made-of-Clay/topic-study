<template>
    <div class="selected-topic">
        <div v-for="item in items"
            :id="`topic-${item.id}`"
            class="selected-item">
            <div v-html="item.content" class="selected-item__content"></div>
            <div v-html="item.source" class="selected-item__source"></div>
        </div>
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
    margin: 2em 1em 0;
}
.selected-item {
    background-color: rgba(0,0,0,0.1);
    border-bottom: 1px solid rgba(0,0,0,0.25);
    border-top: 1px solid #fafafa;
    margin: 0 auto;
    max-width: 900px;
    padding: 0.75em;
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
    top: 5%;
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
</style>
