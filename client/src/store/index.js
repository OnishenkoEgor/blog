import { createStore } from 'vuex'

export default createStore({
  state: () => ({
    user: null,
    token: '',
    userEmail: '',
    checker: false
  }),
  getters: {
    logged(state) {
      return state.token ? true : false
    },
    checked(state) {
      return state.checker
    },
    currentUserId(state) {
      return state.userId
    },
    getUser(state) {
      return state.user
    },
    token(state) {
      return state.token ?? false
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setUser(state, user) {
      state.user = user
    },
    changeChecker(state) {
      state.checker = !state.checker
    }
  },
  actions: {
  },
})
