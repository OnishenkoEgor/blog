import store from "@/store";
import { useRequest } from "./useRequest";

const { get, post } = useRequest();

export function useUsers() {

    async function getUser(id) {
        try {
            return await get(`/api/users/${id}`)
                .then(res => {
                    return res
                }).catch(e => { throw e })
        } catch (e) {
            console.error(e)
            return false;
        }
    }

    async function getAllUsers() {
        try {
            return await get('/api/users')
                .then(res => {
                    console.log(res)
                    return res
                })
                .catch(e => {
                    throw e
                })
        } catch (e) {
            console.error(e)
            return false
        }
    }

    function updateUser() {

    }

    function deleteUser(id) {

    }

    function getUserId(user) {

    }

    return {
        getUser,
        getAllUsers,
    }
}