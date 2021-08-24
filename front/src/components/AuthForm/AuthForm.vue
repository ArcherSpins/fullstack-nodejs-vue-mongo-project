<template>
    <div class="auth-form">
        <div class="auth-form--image" />
        <div class="auth-form--block">
            <form @submit="submit">
                <h1 class="auth-form--block_title">Login Form</h1>
                <div class="mb-3">
                    <label for="email" class="form-label">Email address</label>
                    <input
                        type="email"
                        v-model="email"
                        class="form-control"
                        :class="{'is-invalid': errors.email.message}"
                        id="email"
                        required
                    >
                    <div v-if="errors.email.message" class="invalid-feedback">
                        {{ errors.email.message }}
                    </div>
                </div>
                <div v-if="isRegister" class="mb-3">
                    <label for="username" class="form-label">Username</label>
                    <input
                        type="username"
                        v-model="username"
                        class="form-control"
                        :class="{'is-invalid': errors.username.message}"
                        id="username"
                        required
                    >
                    <div v-if="errors.username.message" class="invalid-feedback">
                        {{ errors.username.message }}
                    </div>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input
                        type="password"
                        v-model="password"
                        class="form-control"
                        :class="{'is-invalid': errors.password.message}"
                        id="password"
                        required
                    >
                    <div v-if="errors.password.message" class="invalid-feedback">
                        {{ errors.password.message }}
                    </div>
                </div>
                <button :disabled="loading" type="submit" class="btn btn-primary">
                    {{ loginButtonLabel }}
                </button>
                <button :disabled="loading" @click="toggleAuth" type="button" class="btn btn-light register-button">
                    {{ registerButtonLabel }}
                </button>
            </form>
            <div class="position-fixed top-0 end-0 p-3" style="z-index: 11">
                <div
                    class="toast bg-success"
                    :class="{ hide: !successRequestMessage, show: Boolean(successRequestMessage) }"
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                >
                    <div class="toast-header">
                        <strong class="me-auto">Good request result!!!</strong>
                        <small>{{ dateCreateRequest }}</small>
                        <button @click="clearSuccessRequestMessage" type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Закрыть"></button>
                    </div>
                    <div class="toast-body text-white">
                        {{ successRequestMessage }}
                    </div>
                </div>
            </div>
            <div class="position-fixed top-0 end-0 p-3" style="z-index: 11">
                <div
                    class="toast bg-danger"
                    :class="{ hide: !errorRequestMessage, show: Boolean(errorRequestMessage) }"
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                >
                    <div class="toast-header">
                        <strong class="me-auto">Oops, something error!!!</strong>
                        <small>{{ dateCreateErrorRequest }}</small>
                        <button @click="clearErrorRequestMessage" type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Закрыть"></button>
                    </div>
                    <div class="toast-body text-white">
                        {{ errorRequestMessage }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';
    import { checkEmail, checkPassword } from '../../heplers'
    import './AuthForm.sass';

    export default {
        props: {
            onSubmit: Function,
        },
        data() {
            return {
                email: '',
                password: '',
                username: '',
                loading: false,
                errorRequestMessage: null,
                successRequestMessage: null,
                isRegister: false,
                errors: {
                    email: {
                        message: null
                    },
                    password: {
                        message: null
                    },
                    username: {
                        message: null
                    }
                },
            }
        },
        computed: {
            loginButtonLabel() {
                return this.isRegister ? 'Register' : 'Submit'
            },
            registerButtonLabel() {
                return this.isRegister ? 'Have you account?' : 'I dont have account!'
            },
            dateCreateRequest() {
                const date = new Date();
                return this.errorRequestMessage || this.successRequestMessage ? moment(date).format('DD.MM.YYYY') : '';
            }
        },
        methods: {
            clearErrorRequestMessage() {
                this.errorRequestMessage = null;
            },
            clearSuccessRequestMessage() {
                this.successRequestMessage = null;
            },
            toggleAuth() {
                this.isRegister = !this.isRegister;
            },
            submit(e) {
                e.preventDefault();
                this.loading = true;
                this.clearErrorRequestMessage();
                this.clearSuccessRequestMessage();

                if (!this.errors.email.message && !this.errors.password.message && !this.errors.username.message) {
                    this.$props.onSubmit({
                        email: this.email,
                        password: this.password,
                        username: this.username,
                        isRegister: this.isRegister,
                    })
                    .then((data) => {
                        this.errorRequestMessage = null;
                        if (this.isRegister) {
                            this.successRequestMessage = data.message;
                            this.isRegister = false;
                        }
                    })
                    .catch((err) => this.errorRequestMessage = err.response.data.message)
                    .finally(() => this.loading = false);
                }
            },
            validator(validator, key, errorMessage) {
                if (!validator(this[key])) {
                    this.errors[key].message = errorMessage
                    return;
                }

                this.errors[key].message = null;
            }
        },
        watch: {
            email() {
                this.validator(checkEmail, 'email', 'Invalid email');
            },
            password() {
                this.validator(checkPassword, 'password', 'Invalid password');
            },

            username() {
                this.validator((val) => Boolean(val), 'username', 'Username required');
            }
        }
    }
</script>
