import { createStore } from 'vuex'

export default createStore({
  state: () => ({
    user: null,
  }),
  getters: {
    logged(state) {
      return state.user ? true : false
    },
    currentUserId(state) {
      return state.user?.id
    },
    getUser(state) {
      return state.user
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    }
  },
  actions: {
  },
})
