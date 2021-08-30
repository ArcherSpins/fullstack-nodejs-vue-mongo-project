<template>
    <div class="container page">
        <div class="row card-profile">
            <div class="col-6 mt-4 card-profile--left card">
                <div class="card-profile--image" :style="{backgroundImage: `url('${getImgUrl()}')`}">
                    <div @click="handleToggleSettingsImage(true)" class="card-profile--image-settings">
                        <font-awesome-icon icon="camera" color="white" />
                    </div>
                </div>
                <div class="mt-1">
                    <ul class="navbar-nav profile-navbar me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <router-link class="nav-link" to="/profile">Profile</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/profile">My friends</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/profile">
                                <div class="d-flex justify-content-between align-items-center">
                                    <span>Messages</span> <span class="badge bg-warning">4</span>
                                </div>
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/profile">Groups</router-link>
                        </li>
                    </ul>
                </div>
                <modal-image-settings :loading="loading" :onLoadFile="handleSave" :imageSrc="getImgUrl()" :visible="visibleSettingsImage" :onClose="handleToggleSettingsImage" />
            </div>
            <div class="col-7 px-3 py-3 card-profile--right mt-4 ml-2 card">
                <div class="d-flex flex-wrap">
                    <div v-for="field in Object.keys(fields)" :key="field.id" class="col-5 mr-5 mb-3">
                        <field-form
                            :label="getLabel(field)"
                            :name="field"
                            :onSave="handleSaveFields"
                            :defaultValue="fields[field].defaultValue"
                            :required="fields[field].required"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import { useStore } from 'vuex'
    import { useRouter } from 'vue-router'
    import FieldForm from '../components/FieldForm/FieldForm'
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
                loading: false,
                loadFields: false,
                fields: {
                    name: {
                        id: 1,
                        key: 'name',
                        type: 'string',
                        required: true,
                        defaultValue: '',
                    },
                    lastname: {
                        id: 2,
                        key: 'lastname',
                        type: 'string',
                        required: true,
                        defaultValue: '',
                    },
                    patronymic: {
                        id: 3,
                        key: 'patronymic',
                        type: 'string',
                        required: false,
                        defaultValue: '',
                    },
                    phone: {
                        id: 4,
                        key: 'phone',
                        required: false,
                        type: 'number',
                        mask: '+7 (000) 000 00 00',
                        defaultValue: '',
                    },
                    username: {
                        id: 5,
                        key: 'username',
                        type: 'string',
                        required: true,
                        defaultValue: '',
                    },
                    email: {
                        id: 6,
                        key: 'email',
                        required: true,
                        type: 'email',
                        defaultValue: '',
                    },
                    birthday: {
                        id: 6,
                        key: 'birthday',
                        type: 'date',
                        required: true,
                        defaultValue: '',
                    },
                },
            }
        },
        mounted() {
            const user = this.store._state.data.user;
            Object.keys(user).forEach(key => {
                if (this.fields[key]) {
                    this.fields[key].defaultValue = user[key];
                }
            });
        },
        methods: {
            getLabel(field) {
                return field.split('').map((c, i) => i === 0 ? c.toUpperCase() : c).join('')
            },
            async handleSaveFields(data) {
                return await this.handleSave({ [data.name]: data.value })
            },
            getImgUrl() {
                return this.store.state?.user?.image;
            },
            handleToggleSettingsImage(status = false) {
                this.visibleSettingsImage = status
            },
            async handleSave(data) {
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
                    throw e;
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
            ModalImageSettings,
            FieldForm
        },
    }
</script>