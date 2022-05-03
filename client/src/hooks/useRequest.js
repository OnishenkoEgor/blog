export function useRequest() {

    async function get(url, responseType = 'json') {
        return fetch(url).then(res => responseType == 'json' ? res.json() : res.body)
    }

    async function post(url, body, headers = {
        "Content-Type": "application/json",
    }) {
        return fetch(url, {
            method: 'POST',
            headers,
            body: JSON.stringify(body)
        }).then(async res => {
            let body = await res.json();
            return {
                body,
                status: res.status
            }
        })
    }

    return {
        get, post
    }
}