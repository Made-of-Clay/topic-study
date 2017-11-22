<template>
    <div class="selected-topic">
        <md-card v-for="item in items"
            v-if="items.length"
            :key="`item-${item.id}`"
            @click="highlightCard(item)">
            <!-- md-with-hover -->
            <!-- :class="{'is-selected':(item.id===selected)}" -->

            <!-- <md-ripple> -->
                <md-card-content v-html="item.content"></md-card-content>
            <!-- </md-ripple> -->
        </md-card>
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
            this.topicService.getTopicsItems(id)
                .then(rawItems => this.formatItems(rawItems))
                .then(items => this.items = items)
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
.md-card.is-selected {
    outline: 1px solid red;
}
</style>
