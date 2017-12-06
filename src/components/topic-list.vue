<template>
    <aside class="topic-list l-drawer">
        <md-field class="topic-list__filter">
            <label>Filter Topics</label>
            <md-input v-model="searchTerm"></md-input>
        </md-field>

        <md-list>
            <md-list-item v-for="(topic, i) in topics"
                v-if="topics.length"
                :key="`item-${topic.id}`"
                :class="{'is-selected':itemSelected(topic)}"
                class="topic-item"
                @click="updateCurrentTopic(topic)">
                {{topic.name}} ({{topic.count}})
            </md-list-item>
        </md-list>
    </aside>
</template>

<script>
export default {
    name: 'topic-list',

    data() {
        return {
            searchTerm: '',
            srcTopics: [],
        };
    },
    computed: {
        topics() {
            return this.srcTopics.filter(topic => (
                inArray(this.searchTerm, topic.name) ||
                inArray(this.searchTerm, topic.slug)
            ));
        },
        currentTopicID() {
            return this.$store.state.currentTopicID;
        },
    },

    created() {
        this.topicService.getTopics()
            .then(rawTopics => this.formatTopics(rawTopics))
            .then(filteredTopics => this.srcTopics = filteredTopics)
        ;
    },

    methods: {
        updateCurrentTopic({id, name}) {
            this.$store.dispatch('setCurrentTopic', { id, name });
        },
        formatTopics(rawTopics) {
            return rawTopics.map(topic => {
                const keysToKeep = ['id', 'count', 'name', 'slug'];
                let filtered = {};
                for (let key in topic) {
                    if (!inArray(key, keysToKeep)) continue;
                    filtered[key] = topic[key];
                }
                return filtered;
            });
        },
        itemSelected({id}) {
            return id === this.currentTopicID;
        },
    },
};

function inArray(needle, haystack) {
    return haystack.indexOf(needle) > -1;
}
</script>

<style>
.topic-list {

}
.topic-list__filter {
    margin-left: 2em;
    width: auto;
}
.topic-item.is-selected {
    background-color: #fdfd4a;
}
.topic-item:hover {
    background-color: rgba(0,0,0,0.1);
}
</style>
