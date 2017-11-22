"use strict";

import axios from 'axios';

/**
 * http service is an adapter layer so whether we use jQuery.ajax, axios, or fetch it ends up the same for us
 * @returns  {object}            Consistent interface for KONA developers
 * @property {function} abort    Aborts the XHR of this request
 * @property {object}  request   XHR request object
 * @property {object}  config    Request params sent
 * @property {object}  response  Response object w/ String status, String statusText, Object headers, and Mixed data properties
 * @property {mixed}   data      The response body from the server; could be any type; acts as shortcut to response.data
 */
export default class Http {
    get(url, config = {}) {
        config.url = url;
        config.method = 'get';
        if (config.data) {
            let params = jsonToUrl(config.data);
            config.url += `?${params}`;
        }
        return request(config);
    }
    post(url, config = {}) {
        config.url = url;
        config.method = 'post';
        return request(config);
    }
    delete(url, config = {}) {
        config.url = url;
        config.method = 'delete';
        return request(config);
    }
    put(url, config = {}) {
        config.url = url;
        config.method = 'put';
        return request(config);
    }
    patch(url, config = {}) {
        config.url = url;
        config.method = 'patch';
        return request(config);
    }

    request(config) {
        return request(config);
    }
}

function request(config) {
    var source = axios.CancelToken.source();
    config.cancelToken = source.token;

    return axios(config).then(response => {
        return {
            abort: (msg = 'Request canceled by user') => source.cancel(msg),
            request: response.request,
            config: response.config,
            response: {
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
                data: response.data
            },
            data: response.data
        };
    });
}

function jsonToUrl(data) {
    // e.g. {"foo":true, "bar":0} ===> foo=true&bar=0
    let json = JSON.parse(JSON.stringify(data)); // force json
    return Object.keys(json).map(i => `${i}=${json[i]}`).join('&');
}
