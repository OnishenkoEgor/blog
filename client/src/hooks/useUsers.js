import store from "@/store";
import { useRequest } from "./useRequest";

const { get, post } = useRequest();

export function useUser() {

    async function getUser(id) {
        try {
            return await get(`/api/users/${id}`).then(({ response }) => {
                return response
            }).catch(e => { throw e })
        } catch (e) {
            console.error(e)
            return false;
        }
    }

    async function getAllUsers() {

    }

    function updateUser() {

    }

    function deleteUser(id) {

    }

    function getUserId(user) {

    }

    return {
        getUser,
        deleteUser
    }
}