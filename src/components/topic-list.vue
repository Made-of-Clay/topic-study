<template>
    <div class="topic-list">
        <md-field>
            <label>Filter Topics</label>
            <md-input v-model="searchTerm"></md-input>
        </md-field>

        <md-list>
            <md-list-item v-for="(topic, i) in topics"
                v-if="topics.length"
                :key="`item-${topic.id}`"
                @click="updateCurrentTopic(topic)">
                {{topic.name}} ({{topic.count}})
            </md-list-item>
        </md-list>
    </div>
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
    },
};

function inArray(needle, haystack) {
    return haystack.indexOf(needle) > -1;
}
</script>
