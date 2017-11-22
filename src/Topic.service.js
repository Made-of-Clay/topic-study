"use strict";
/* globals console */

import Http from './Http.service.js';

const http = new Http();

export default class TopicService {
    constructor() {
        this.topicUrl = 'http://adamleis.com/topic-study/api/wp-json/wp/v2';
        this.lastRequest = null;
    }

    getTopics() {
        const request = http.get(`${this.topicUrl}/tags`)
            .then(result => this.handleSuccess(result))
            .catch(handleError);

        return request;
    }

    getTopicsItems(id) {
        if (this.lastRequest) {
            const cancelMsg = 'The previous request was not finished; cancelling previous request';
            this.lastRequest.cancel(cancelMsg);
        }

        let url = `${this.topicUrl}/topic?tags=${id}`;
        const request = http.get(url)
            .then(result => this.handleSuccess(result))
            .catch(handleError);

        return request;
    }

    handleSuccess(result) {
        this.lastRequest = null;
        return result.data;
    }
}

function handleError(thrown) {
    console.error('%cTopic Service >> ', 'font-weight:bold;', thrown);
}
