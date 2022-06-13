import store from "@/store";

export function useRequest() {

    async function get(url) {
        try {
            return fetch(url, {
                authentication: store.getters.token
            }).then(res => res.json())
                .catch(e => { throw e })
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    async function post(url, body, headers) {
        try {
            return fetch(url, {
                method: 'POST',
                headers: {
                    authentication: store.getters.token,
                    ...headers
                },
                body: JSON.stringify(body)
            }).then(res => ({ body: res.json(), status: res.status }))
                .catch(e => {
                    throw e
                })
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    async function put(url, body, headers) {
        try {
            return fetch(url, {
                method: 'PUT',
                headers: {
                    authentication: store.getters.token,
                    ...headers
                },
                body: JSON.stringify(body)
            }).then(res => ({ body: res.json(), status: res.status }))
        }
        catch (e) {
            console.error(e);
            return false;
        }
    }
    async function remove(url, body, headers) {
        try {
            return fetch(url, {
                method: 'DELETE',
                headers: {
                    authentication: store.getters.token,
                    ...headers
                },
                body: JSON.stringify(body)
            }).then(res => ({ body: res.json(), status: res.status }))
                .catch(e => {
                    throw e
                })
        }
        catch (e) {
            console.error(e);
            return false;
        }
    }

    return {
        get, post, put, remove
    }
}