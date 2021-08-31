<template>
    <div class="d-flex justify-content-between container pt-4 posts">
        <div class="posts-left--column pt-0 pb-0">
            <div class="mb-3">
                <div class="search-bar">
                    <input @input="handleChangeSearch" :value="searchValue" placeholder="Enter text for search..." class="form-control">
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
            <div>
                <div class="mb-3">
                    <post-card />
                </div>
                <div class="mb-3">
                    <post-card />
                </div>
                <div>
                    <post-card />
                </div>
            </div>
        </div>
        <div class="card posts-right--column">2</div>
    </div>
</template>

<script>
    import _ from 'lodash';
    import PostCard from '../components/Post/Post';
    import './style.sass';

    export default {
        data() {
            return {
                searchValue: '',
                loadingSearchResult: false
            }
        },
        components: {
            PostCard
        },
        computed: {
            checkShowSearchMenu() {
                return Boolean(this.searchValue);
            }
        },
        methods: {
            handleRequestSearch: _.debounce(function () {
                this.loadingSearchResult = true;
                setTimeout(() => this.loadingSearchResult = false, 2000);
            }, 500),
            handleChangeSearch(e) {
                this.searchValue = e.target.value;
                this.handleRequestSearch(e.target.value);
            }
        }
    }
</script>