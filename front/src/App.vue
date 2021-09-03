<template>
  <div>
      <div v-if="Boolean(store.state.user)">
        <Header :init="init" :user="store.state.user" :logout="logout" />
      </div>
      <div :class="{'pt-5': checkAuth}">
        <div :class="{'pt-3': checkAuth}">
          <router-view v-if="!loading" />
        </div>
      </div>
      <div v-if="loading">Loading...</div>
  </div>
</template>

<script>
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router'
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
    computed: {
      checkAuth() {
        const userJson = localStorage.getItem('user');

        return Boolean(this.store.state.user || userJson)
      }
    },
    methods: {
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
            this.store.commit('getUser', (status) => status === 'jwt' ? this.logout() : void 0);
          }
          
          this.checkRedirect()
        } catch(e) {
          console.log(e.response);
          this.loading = false;
          this.checkRedirect()
          if (e.response?.data?.status === 'jwt') {
            this.logout()
          }
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
