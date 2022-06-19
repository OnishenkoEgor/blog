import store from "@/store";


function setAuthInHeaders(headers) {
    headers = headers ?? {}
    headers['Content-Type'] = headers['Content-Type'] ? headers['Content-Type'] : 'application/json';
    return localStorage.getItem("token") ? { authentication: localStorage.getItem("token"), ...headers } : headers
}

export function useRequest() {

    async function get(url, headers) {
        headers = setAuthInHeaders(headers);
        return fetch(url, headers).then(async res => ({
            body: await res.json(),
            status: res.status
        })).catch(e => {
            console.error(e);
            return false;
        })
    }

    async function post(url, body, headers) {
        headers = setAuthInHeaders(headers);
        return fetch(url, {
            method: 'POST',
            headers,
            body: JSON.stringify(body)
        }).then(async res => ({
            body: await res.json(),
            status: res.status
        })).catch(e => {
            console.error(e);
            return false;
        })
    }

    async function put(url, body, headers) {
        headers = setAuthInHeaders(headers);

        return fetch(url, {
            method: 'PUT',
            headers,
            body: JSON.stringify(body)
        }).then(async res => ({
            body: await res.json(),
            status: res.status
        })).catch(e => {
            console.error(e);
            return false;
        })

    }
    async function remove(url, headers) {
        headers = setAuthInHeaders(headers);

        return fetch(url, {
            method: 'DELETE',
            headers,
        }).then(async res => ({
            body: await res.json(),
            status: res.status
        })).catch(e => {
            console.error(e);
            return false;
        })
    }

    return {
        get, post, put, remove
    }
}