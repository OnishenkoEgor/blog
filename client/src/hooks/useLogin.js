import { useRequest } from "./useRequest";
const { get, post } = useRequest();
import store from "@/store";


function updateLocalData(token, user) {
    store.commit('setToken', token ?? '')
    store.commit('setUser', user ?? null)
    user?.id ? localStorage.setItem('id', user.id) : localStorage.removeItem('id', '');
    token ? localStorage.setItem('token', token) : localStorage.removeItem('token')
}

export function useLogin() {
    async function login(email, password) {
        return post(`/api/auth/login`, {
            email: email,
            password: password,
        }).then(res => {
            if (res.status === 200) {
                let { token, user } = res.body;
                updateLocalData(token, user)
                return true
            } else {
                return { message: res.body.message }
            }
        }).catch(e => {
            console.log(e)
            return false
        })
    }
    function logout() {
        try {
            updateLocalData('', null)
            return true
        } catch (e) {
            console.log(e)
            return false
        }
    }

    async function register(user) {
        post("/api/auth/register", {
            ...user
        }).then(res => {
            console.log(res)
            return true
        }).catch(e => {
            console.error(e);
            return false
        })
    }

    async function validateToken(token) {
        return post('/api/auth/validate', {
            token
        }).then(res => {
            return res.status === 200 ? true : false
        }).catch(e => {
            console.error(e)
            return false
        })
    }

    return {
        login,
        logout,
        register,
        validateToken
    }
}