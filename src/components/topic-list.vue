<template>
    <aside class="topic-list">
        <md-field class="topic-list__filter">
            <label>Filter Topics</label>
            <md-input v-model="searchTerm"></md-input>
        </md-field>

        <!-- <transition-group name="slideInLeft"> -->
        <md-list key="foo">
            <md-list-item v-for="(topic, i) in topics"
                v-if="topics.length"
                :key="`item-${topic.id}`"
                :class="{'is-selected':itemSelected(topic)}"
                class="topic-item"
                @click="updateCurrentTopic(topic)">
                {{topic.name}} ({{topic.count}})
            </md-list-item>
        </md-list>
        <!-- </transition-group> -->
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
    background-color: #f0f0f1;
    height: 100%;
    z-index: 10;
}
.topic-list__filter {
    border-bottom: 1px solid rgba(0,0,0,0.15);
    margin-left: 2em;
    transition: border-color 0.3s;
    width: auto;
}
.topic-list__filter.md-focused {
    border-color: #67009c;
}
.topic-item {
    border-radius: 3px;
    transition: background-color 0.3s;
}
.topic-item.is-selected {
    background-color: #fdfd4a;
}
.topic-item:hover {
    background-color: rgba(0,0,0,0.1);
}

/*.slideInLeft-enter-active, .slideInLeft-leave-active {
    transition: opacity 0.3s, transform 0.3s;
}
.slideInLeft-enter, .slideInLeft-leave-to {
    opacity: 0;
}
.slideInLeft-enter {
    transform: translateX(100%);
}
.slideInLeft-leave-to {
    transform: translateY(-100%);
}*/
</style>
