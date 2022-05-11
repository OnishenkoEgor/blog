import { createStore } from 'vuex'

export default createStore({
  state: () => ({
    users: [],
    token: '',
    userEmail: '',
    test: 'test',
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
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    changeChecker(state) {
      state.checker = !state.checker
    }
  },
  actions: {
  },
})
