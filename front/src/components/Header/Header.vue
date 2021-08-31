<template>
    <nav class="header">
        <div class="d-flex align-items-center header-content">
            <div class="header-logo">
                <img alt="logo" src="../../assets/logo.png" />
            </div>
            <div class="header-nav">
                <span v-for="nav in navs" :key="nav.id">
                    <router-link class="header-nav--link" :to="nav.path">{{ nav.label }}</router-link>
                </span>
            </div>
        </div>
        <div class="header-search">
            <form class="d-flex">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-secondary search-button" type="submit">
                    <img alt="search" src="../../assets/search.png" />
                </button>
            </form>
        </div>
        <div class="header-user">
            <div class="collapse show navbar-collapse" id="navbarNavDarkDropdown">
                <ul class="navbar-nav">
                    <li class="nav-item dropdown profile-dropdown">
                        <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <div class="header-user--avatar" :style="{ backgroundImage: `url('${getImgUrl()}')`}" />
                            <span>{{ user?.username || user?.email }}</span>
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDarkDropdownMenuLink">
                            <li><router-link class="dropdown-item" to="/profile">Profile edit</router-link></li>
                            <li><a class="dropdown-item" href="#">Settings</a></li>
                            <li><a @click.prevent="onLogout" class="dropdown-item" href="#">Exit</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    import { useStore } from 'vuex'
    import './Header.sass'

    export default {
        setup() {
            const store = useStore();

            return { store };
        },
        props: {
            user: Object,
            logout: Function,
            init: Function,
        },
        data() {
            return {
                navs: [
                    {
                        id: 1,
                        label: 'Main',
                        path: '/main'
                    },
                    {
                        id: 2,
                        label: 'Posts',
                        path: '/posts'
                    },
                    {
                        id: 3,
                        label: 'Videos',
                        path: '/videos'
                    },
                    {
                        id: 4,
                        label: 'Friends',
                        path: '/friends'
                    }
                ],
            }
        },
        methods: {
            onLogout() {
                if (this.$props.logout) {
                    this.$props.logout();
                }
            },
            getImgUrl() {
                return this.store._state.data.user.image;
            }
        }
    }
</script>
