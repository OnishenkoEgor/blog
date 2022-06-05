import store from "@/store";

export function useRequest() {

    async function get(url, responseType = 'json') {
        return fetch(url, {
            authentication: store.getters.token
        }).then(res => responseType == 'json' ? res.json() : res.body)
    }

    async function post(url, body, headers = {
        "Content-Type": "application/json",
    }) {
        return fetch(url, {
            method: 'POST',
            headers: {
                authentication: store.getters.token,
                ...headers
            },
            body: JSON.stringify(body)
        }).then(async res => {
            let body = await res.json();
            return {
                body,
                status: res.status
            }
        })
    }

    async function put(url, body, headers = {
        "Content-Type": "application/json",
    }) {
        return fetch(url, {
            headers
        })
    }
    async function remove(url, body, headers = {
        "Content-Type": "application/json",
    }) {
        return fetch(url, {
            headers
        })
    }

    return {
        get, post, put, remove
    }
}