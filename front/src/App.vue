<template>
  <div>
      <div v-if="Boolean(store.state.user)">
        <Header :init="init" :user="store.state.user" :logout="logout" />
      </div>
      <router-view v-if="!loading" />
      <div v-if="loading">Loading...</div>
  </div>
</template>

<script>
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router'
  import { useRequest } from './api/useRequest';
  import Header from './components/Header/Header.vue'

  export default {
    setup() {
      const store = useStore();
      const router = useRouter()
      const { location } = router;

      return { store, location, router }
    },
    name: 'App',
    data() {
      return {
        loading: false
      }
    },
    components: {
      Header
    },
    mounted() {
      this.init()
    },
    methods: {
      async getUser() {
        this.loading = true;

        const { data: { user } } = await useRequest('/profile');

        if (JSON.stringify(user) !== localStorage.getItem('user')) {
          localStorage.setItem('user', JSON.stringify(user))
          if (!this.store.state.user) {
            this.store.commit('setUser', user);
          }
        }
      },
      checkRedirect() {
        const userJson = localStorage.getItem('user');
        if (!this.store.state.user && !userJson) {
          this.loading = false;
          this.router.push('/')
        } else {
          this.store.commit('setUser', JSON.parse(userJson))
          this.loading = false;
          if (this.router.currentRoute.path === '/') {
            this.router.push('/main')
          }
        }
      },
      async init() {
        try {
          if (localStorage.getItem('token')) {
            await this.getUser().catch(err => err.response.data.status === 'jwt' ? this.logout() : void 0);
          }
          
          this.checkRedirect()
        } catch(e) {
          this.loading = false;
          this.checkRedirect()
        }
      },
      logout() {
        this.store.commit('setUser', null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.router.push('/')
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
