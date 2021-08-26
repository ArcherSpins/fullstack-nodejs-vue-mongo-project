import { createStore } from 'vuex'
import { useRequest } from '../api/useRequest'

export const store = createStore({
  state: {
    user: null,
    loading: false
  },
  mutations: {
    setUser (state, user) {
      state.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    async getUser(state) {
      if (localStorage.getItem('token')) {
        state.loading = true;

        const { data: { user } } = await useRequest('/profile');

        if (JSON.stringify(user) !== localStorage.getItem('user')) {
          localStorage.setItem('user', JSON.stringify(user))
          if (!state.user) {
            state.user = user;
          }
        }

        state.loading = false
      }
    }
  }
})