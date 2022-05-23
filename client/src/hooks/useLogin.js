import store from "@/store";

export function useLogin() {
    function login(token, user) {
        try {
            store.commit('setToken', token)
            store.commit('setUser', user)
            localStorage.setItem('id', user.id)
            localStorage.setItem('token', token)
            return true
        } catch (e) {
            return false
        }
    }
    function logout() {
        try {
            store.commit('setToken', '')
            store.commit('setUser', null)
            localStorage.setItem('id', '')
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