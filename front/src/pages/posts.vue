<template>
    <div class="d-flex justify-content-between container pt-4 posts align-items-start">
        <div class="posts-left--column pt-0 pb-0">
            <div class="mb-3">
                <div class="search-bar">
                    <input @focus="handleChangeFocus" @blur="handleBlur" @input="handleChangeSearch" :value="filters.search" placeholder="Enter text for search..." class="form-control">
                    <span class="search-bar--icon">
                        <font-awesome-icon icon="search" color="black" />
                    </span>
                    <ul v-if="checkShowSearchMenu" class="search-bar--menu">
                        <li class="d-flex justify-content-center align-items-center py-2" v-if="loadingSearchResult">
                            <div class="spinner-grow text-primary spinner-grow-sm mr-2" role="status">
                                <span class="visually-hidden">Загрузка...</span>
                            </div>
                            <div class="spinner-grow text-secondary spinner-grow-sm mr-2" role="status">
                                <span class="visually-hidden">Загрузка...</span>
                            </div>
                            <div class="spinner-grow text-success spinner-grow-sm mr-2" role="status">
                                <span class="visually-hidden">Загрузка...</span>
                            </div>
                            <div class="spinner-grow text-danger spinner-grow-sm mr-2" role="status">
                                <span class="visually-hidden">Загрузка...</span>
                            </div>
                            <div class="spinner-grow text-warning spinner-grow-sm mr-2" role="status">
                                <span class="visually-hidden">Загрузка...</span>
                            </div>
                            <div class="spinner-grow text-info spinner-grow-sm" role="status">
                                <span class="visually-hidden">Загрузка...</span>
                            </div>
                        </li>
                        <div v-if="!loadingSearchResult">
                            <li><a class="dropdown-item" href="#">Действие</a></li>
                            <li><a class="dropdown-item" href="#">Другое действие</a></li>
                            <li><a class="dropdown-item" href="#">Что-то еще здесь</a></li>
                        </div>
                    </ul>
                </div>
            </div>
            <div v-if="loadingPosts" class="d-flex justify-content-center">
                <div class="spinner-border text-success mx-auto" role="status">
                    <span class="visually-hidden">Загрузка...</span>
                </div>
            </div>
            <div v-if="!loadingPosts && !posts.length" class="d-flex justify-content-center">
                <div class="text-dark" role="status">
                    <span>Not found posts...</span>
                </div>
            </div>
            <div v-if="!loadingPosts && posts.length" class="posts-list">
                <div v-for="item in posts" :key="item.id" class="mb-3">
                    <post-card :user="item.user" :post="item.post" />
                </div>
                <div v-if="errorMessage" class="text-danger">
                    {{ errorMessage }}
                </div>
            </div>
        </div>
        <div class="card posts-right--column">
            <router-link class="w-100" to="/posts/create">
                <button class="btn btn-primary btn-sm w-100" type="button">Create post</button>
            </router-link>
            
            <div class="mt-3">
                <span class="badge bg-primary mx-1">All: 30</span>
                <span class="badge bg-success mx-1">My: 14</span>
                <span class="badge bg-dark mx-1">Admin: 2</span>
                <span class="badge bg-warning text-dark mx-1">Important: 8</span>
                <span class="badge bg-info mx-1">Active: 5</span>
                <span class="badge bg-danger mx-1">Canceled: 3</span>
            </div>
            <b class="mt-4 mb-1 text-success">Filters: </b>
            <div class="d-flex justify-content-center">
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="post_by_type" id="post_by_type_all" checked>
                    <label class="form-check-label" for="post_by_type_all">
                        All posts
                    </label>
                </div>
                <div class="form-check ml-2">
                    <input class="form-check-input" type="radio" name="post_by_type" id="post_by_type_self">
                    <label class="form-check-label" for="post_by_type_self">
                        My posts
                    </label>
                </div>
                <div class="form-check ml-2">
                    <input class="form-check-input" type="radio" name="post_by_type" id="post_by_type_any">
                    <label class="form-check-label" for="post_by_type_any">
                        Admin posts
                    </label>
                </div>
            </div>
            
            <div class="mb-2 mt-3">
                <p class="mb-0 text-success">Start date: </p>
                <Datepicker
                    v-model="startDate"
                    :clearable="true"
                />
            </div>

            <div>
                <p class="mb-0 text-success">End date: </p>
                <Datepicker
                    v-model="endDate"
                    :clearable="true"
                />
            </div>

            <div class="form-check form-check-inline mt-3">
                <input :checked="filters.typePost.important" @input.stop="handleChangeTypePost" class="form-check-input" type="checkbox" id="post_type_important" value="important">
                <label class="form-check-label" for="post_type_important">Important posts</label>
            </div>
            <div class="form-check form-check-inline">
                <input :checked="filters.typePost.canceled" @input.stop="handleChangeTypePost" class="form-check-input" type="checkbox" id="post_type_canceled" value="canceled">
                <label class="form-check-label" for="post_type_canceled">Canceled posts</label>
            </div>
            <div class="form-check form-check-inline">
                <input :checked="filters.typePost.active" @input.stop="handleChangeTypePost" class="form-check-input" type="checkbox" id="post_type_active" value="active">
                <label class="form-check-label" for="post_type_active">Active posts</label>
            </div>
        </div>
    </div>
</template>

<script>
    import Datepicker from 'vue3-datepicker';
    import _ from 'lodash';
    import PostCard from '../components/Post/Post';
    import { useRequest } from '../api/useRequest.js';
    import './style.sass';

    export default {
        data() {
            return {
                loadingSearchResult: false,
                startDate: new Date(),
                endDate: new Date(),
                posts: [],
                loadingPosts: false,
                isFocusedSearchBar: false,
                errorMessage: null,
                filters: {
                    search: '',
                    typePost: {},
                    typeUser: null
                }
            }
        },
        components: {
            PostCard,
            Datepicker
        },
        computed: {
            checkShowSearchMenu() {
                return false;
            }
        },
        watch: {
            filters() {
                this.getPostWithFilters()
            }
        },
        mounted() {
            const filters = localStorage.getItem('filters')

            if (filters) {
                this.filters = JSON.parse(filters)
            } else {
                this.getPosts()
            }
        },
        methods: {
            getPostWithFilters() {
                const { typePost, search } = this.filters;
                let queryParams = '?'
                let hasQuery = false;

                localStorage.setItem('filters', JSON.stringify(this.filters))

                const typePosts = Object.values(typePost).filter(Boolean);

                if (typePosts.length) {
                    hasQuery = true;
                    queryParams += `typePost=`
                    Object.keys(typePost).forEach((typePost, idx) => queryParams += ((idx > 0 ? ',' : '') + typePost));
                }

                if (search) {
                    if (hasQuery) {
                        queryParams += `&search=${search}`
                    } else {
                        hasQuery = true;
                        queryParams += `search=${search}`
                    }
                }

                if (hasQuery) {
                    this.getPosts(queryParams);
                }
            },
            handleChangeTypePost({ target }) {
                this.filters = {
                    ...this.filters,
                    typePost: {
                        ...this.filters.typePost,
                        [target.value]: target.checked
                    }
                };
            },
            handleChangeFocus() {
                this.isFocusedSearchBar = true;
            },
            handleBlur() {
                this.isFocusedSearchBar = false;
            },
            handleRequestSearch: _.debounce(function () {
                this.loadingSearchResult = true;
                this.getPostWithFilters()

                setTimeout(() => {
                    this.loadingSearchResult = false;
                }, 2000);
            }, 500),
            handleChangeSearch(e) {
                this.filters.search = e.target.value;
                this.handleRequestSearch(e.target.value);
            },
            async getPosts(queryParams) {
                try {
                    this.loadingPosts = true;
                    const { data } = await useRequest(`/posts${queryParams ? `${queryParams}` : ''}`);
                    this.posts = data;
                    this.loadingPosts = false;
                    this.errorMessage = null;
                } catch (err) {
                    this.loadingPosts = false;
                    this.errorMessage = err.message || JSON.stringify(err);
                }
            },
        }
    }
</script>