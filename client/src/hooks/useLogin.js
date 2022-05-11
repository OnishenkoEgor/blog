import store from "@/store";

export function useLogin() {
    function login(token) {
        try {
            store.commit('setToken', token)
            localStorage.setItem('token', token)
            return true
        } catch (e) {
            return false
        }
    }
    function logout() {
        try {
            store.commit('setToken', '')
            localStorage.removeItem('token')
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