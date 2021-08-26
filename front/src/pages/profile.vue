<template>
    <div class="container page">
        <div class="row card-profile">
            <div class="col-4 mt-4 card-profile--left card">
                <div class="card-profile--image" :style="{backgroundImage: `url('${getImgUrl()}')`}">
                    <div @click="handleToggleSettingsImage(true)" class="card-profile--image-settings">
                        <font-awesome-icon icon="camera" color="white" />
                    </div>
                </div>
                <modal-image-settings :loading="loading" :onLoadFile="handleLoadFile" :imageSrc="getImgUrl()" :visible="visibleSettingsImage" :onClose="handleToggleSettingsImage" />
            </div>
            <div class="col-7 card-profile--right mt-4 ml-2 card">2</div>
        </div>
    </div>
</template>


<script>
    import { useStore } from 'vuex'
    import { useRouter } from 'vue-router'
    import ModalImageSettings from '../modals/modalImageSettings.vue'
    import { useRequest } from '../api/useRequest.js';
    import './style.sass';


    export default {
        setup() {
            const store = useStore();
            const router = useRouter();

            return { store, router }
        },
        data() {
            return {
                visibleSettingsImage: false,
                loading: false
            }
        },
        methods: {
            getImgUrl() {
                return this.store.state?.user?.image;
            },
            handleToggleSettingsImage(status = false) {
                this.visibleSettingsImage = status
            },
            async handleLoadFile(data) {
                try {
                    this.loading = true
                    const result = await useRequest('/profile/update', 'put', data)
                    const { data: { user } } = result;
                    this.store.commit('setUser', user);
                    this.visibleSettingsImage = false;
                    this.loading = false;
                } catch (e) {
                    this.loading = false
                    this.visibleSettingsImage = false;
                }
            },
            logout() {
                this.store.commit('setUser', null);
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                this.router.push('/')
            }
        },
        components: {
            ModalImageSettings
        },
    }
</script>