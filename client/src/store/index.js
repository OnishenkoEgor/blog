import { createStore } from 'vuex'

export default createStore({
  state: () => ({
    users: [],
    token: '',
    userId: '',
    userEmail: '',
    test: 'test',
    checker: false
  }),
  getters: {
    logged(state) {
      return state.userId ? true : false
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
    setUserId(state, userId) {
      state.userId = userId
    },
    changeChecker(state) {
      state.checker = !state.checker
    }
  },
  actions: {
  },
})
