import store from "@/store";
import { useRequest } from "./useRequest";

const { get, post, remove, put } = useRequest();

export function useUsers() {

    async function getUser(id) {
        return get(`/api/users/${id}`)
            .then(res => {
                return res.status == 200 ? res.body : null;
            }).catch(e => {
                console.error(e)
                return false
            })
    }

    async function getAllUsers() {
        return get('/api/users')
            .then(res => {
                return res.status === 200 ? res.body : [];
            })
            .catch(e => {
                console.error(e)
                return false
            })

    }

    async function updateUser(id, userData) {
        return put(`/api/users/edit/${id}`, userData).then(res => {
            return true
        }).catch(e => {
            console.error(e)
            return false
        })
    }

    async function deleteUser(id) {
        return remove(`/api/users/delete/${id}`).then(res => {
            return true
        }).catch(e => {
            console.error(e)
            return false
        })
    }

    function getUserId(user) {

    }

    return {
        getUser,
        getAllUsers,
        deleteUser,
        updateUser
    }
}