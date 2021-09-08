<template>
    <div class="card post-card px-3 py-3">
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
                <button type="button" class="btn btn-link dropdown-toggle outline-none border-none px-0 py-0" id="edit-post-1" data-bs-toggle="dropdown" aria-expanded="false">
                    <font-awesome-icon icon="ellipsis-h" color="gray" />
                </button>
                <ul class="dropdown-menu" aria-labelledby="edit-post-1">
                    <li><a class="dropdown-item" href="#">Edit</a></li>
                    <li><a class="dropdown-item" href="#">Delete</a></li>
                </ul>
            </div>
        </div>
        <div class="mt-4">
            <b class="mb-2 text-secondary">{{ $props.post?.title }}</b>
            <img v-if="$props.post?.image" :src="$props.post?.image" />
            <p>{{ $props.post?.content }}</p>
        </div>
        <div class="d-flex">
            <button @click="handleAddLike" type="button" class="btn btn-light text-secondary">
                <font-awesome-icon icon="heart" :color="activeLike() ? 'red' : 'gray'" /> <span>{{ this.$props.post?.likes.length }}</span>
            </button>
            <button type="button" class="btn btn-light ml-1 text-secondary">
                <font-awesome-icon icon="comment" color="gray" /> <span>7</span>
            </button>
        </div>
    </div>
</template>

<script>
    import { useStore } from 'vuex'
    import moment from 'moment'
    import { useRequest } from '../../api/useRequest'
    import userImage from '../../assets/user.jpg'
    import './Post.sass'

    export default {
        setup() {
            const store = useStore();

            return { store }
        },
        props: {
            post: Object,
            user: Object,
            onUpdatePost: Function,
            getPosts: Function
        },
        methods: {
            activeLike() {
                const { post } = this.$props;
                const user = this.store.state.user
                return Boolean(Array.from(post?.likes).find(like => like === user?.id));
            },
            getImgUrl() {
                return this.$props.user?.image || userImage;
            },
            getUserName() {
                if (!this.$props.user) {
                    return 'User ' + Date.now();
                }
                const { username, name, lastname, emal } = this.$props.user;
                return (name && lastname ? `${name} ${lastname}` : username || emal);
            },
            getFormatDate() {
                return moment(new Date()).format('hh:mm DD.MM.YYYY')
            },
            async handleAddLike() {
                const { post } = this.$props
                const user = this.store.state.user

                if (!this.$props.user) {
                    return;
                }

                const previosPost = { ...post };
                const currentPost = { ...post };

                try {
                    const isDelete = this.activeLike()
                    let likes = Array.from(currentPost.likes)

                    if (isDelete) {
                        likes = likes.filter(like => like !== user?.id)
                    } else {
                        likes.push(user?.id)
                    }

                    currentPost.likes = likes

                    this.$props.onUpdatePost(currentPost._id, currentPost);

                    await useRequest(
                        '/posts/update',
                        'put',
                        {
                            postId: post?._id,
                            userId: user?.id,
                            deleteLike: isDelete
                        },
                    )
                } catch (err) {
                    this.$props.onUpdatePost(previosPost._id, previosPost);
                }
            }
        }
    }
</script>
