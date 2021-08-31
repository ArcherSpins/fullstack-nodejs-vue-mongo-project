<template>
    <div class="card post-card px-2 py-2">
        <div class="post-card--header d-flex justify-content-between align-items-start">
            <div class="d-flex align-items-center">
                <div class="post-card--avatar" :style="{backgroundImage: `url('${getImgUrl()}')`}" />
                <div class="ml-2">
                    <div class="post-card--username">
                        {{ getUserName() }}
                    </div>
                    <div class="post-card--date">
                        {{ getFormatDate() }}
                    </div>
                </div>
            </div>
            <div class="d-flex align-items-start">
                <button type="button" class="btn btn-link outline-none border-none px-0 py-0">
                    <font-awesome-icon icon="ellipsis-h" color="gray" />
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import { useStore } from 'vuex'
    import moment from 'moment'
    import './Post.sass'

    export default {
        setup() {
            const store = useStore();

            return { store }
        },
        methods: {
            getImgUrl() {
                return this.store._state.data.user.image;
            },
            getUserName() {
                const { username, name, lastname, emal } = this.store._state.data.user;
                return (name && lastname ? `${name} ${lastname}` : username || emal);
            },
            getFormatDate() {
                return moment(new Date()).format('hh:mm DD.MM.YYYY')
            }
        }
    }
</script>
