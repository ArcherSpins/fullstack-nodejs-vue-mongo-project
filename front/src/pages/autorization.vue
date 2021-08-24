<template>
    <div>
        <auth-form :onSubmit="submit" />
    </div>
</template>

<script>
    import { useRouter } from 'vue-router'
    import { useStore } from 'vuex'
    import { useRequest } from '../api/useRequest';
    import AuthForm from '../components/AuthForm/AuthForm.vue';

    export default {
        setup() {
            const router = useRouter();
            const store = useStore();

            const login = async (params) => {
                const result = await useRequest('/auth/login', 'post', params);
                const { data } = result;
                localStorage.setItem('user', JSON.stringify(data.user));
                localStorage.setItem('token', data.token);
                store.commit('setUser', data.user);
                router.push('/main');
                return data;
            }

            const submit = async (params) => {
                if (!params.isRegister) {
                    return login(params);
                }

                const result = await useRequest('/auth/register', 'post', params);
                const { data } = result;

                return data;
            }

            return { router, store, submit };
        },
        components: {
            AuthForm,
        },
    }
</script>
