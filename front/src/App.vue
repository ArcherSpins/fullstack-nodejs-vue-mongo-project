<template>
  <div>
      <div v-if="Boolean(store.state.user)">
        <Header :init="init" :user="store.state.user" :logout="logout" />
      </div>
      <router-view />
  </div>
</template>

<script>
  import { useStore } from 'vuex';
  import Header from './components/Header/Header.vue'
  import router from './router'

  export default {
    setup() {
      const store = useStore();
      const { location } = router.options.history;

      if (!store.state.user && location !== '/') {
        router.push('/');
      } else if (store.state.user && location === '/') {
        router.push('/main');
      }

      return { store }
    },
    name: 'App',
    components: {
      Header
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        const userJson = localStorage.getItem('user');
        if (userJson) {
          if (!this.store.state.user) {
            this.store.commit('setUser', JSON.parse(userJson));
          }
          if (router.currentRoute.value.name === 'Auth' || router.currentRoute.value.fullPath === '/') {
            router.push('/main')
          }
        }
      },
      logout() {
        this.store.commit('setUser', null);
        localStorage.removeItem('user');
        router.push('/')
      }
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
</style>
