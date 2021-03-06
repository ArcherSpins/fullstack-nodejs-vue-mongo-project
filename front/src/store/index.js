import { createStore } from 'vuex'

export const store = createStore({
  state: {
    user: null
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    }
  }
})