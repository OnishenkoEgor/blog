import store from "@/store";

export function useLogin() {
    function login(token, userId) {
        try {
            store.commit('setToken', token)
            store.commit('setUserId', userId)
            localStorage.setItem('token', token)
            localStorage.setItem('userId', userId)
            return true
        } catch (e) {
            return false
        }
    }
    function logout() {
        try {
            store.commit('setToken', '')
            store.commit('setUserId', '')
            localStorage.removeItem('token')
            localStorage.removeItem('userId')
            return true
        } catch (e) {
            return false
        }
    }

    return {
        login,
        logout
    }
}