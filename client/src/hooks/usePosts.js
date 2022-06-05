import { useRequest } from "./useRequest.js";

export function usePosts() {
    async function getPosts() {
        const { get } = useRequest();
        return await get("/api/posts").then((res) => res.response);
    }

    async function getPostsById(id) {
        const { get } = useRequest();
        return await get(`/api/posts?authorID=${id}`).then(res => res.response)
    }

    return {
        getPosts,
        getPostsById
    }
}