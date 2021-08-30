<template>
    <div class="field-form align-items-end d-flex">
        <div class="field-form--field">
            <label :for="name" class="form-label">{{ label }}</label>
            <input :disabled="!editable" :id="name" class="form-control" v-model="currentValue" />
        </div>
        <button v-if="checkForSave" @click="handleSave" class="btn ml-1 btn-success">
            <font-awesome-icon v-if="!loading" icon="save" color="white" />
            <div v-if="loading" class="spinner-border text-light spinner-border-sm" role="status">
                <span class="visually-hidden">Загрузка...</span>
            </div>
        </button>
        <button @click="toggleEditable(true)" v-if="!editable" class="btn ml-1 btn-primary btn-primary--default">
            <font-awesome-icon icon="pencil-alt" color="white" />
        </button>
        <button @click="toggleEditable(false)" v-if="editable" class="btn ml-1 btn-danger">
            <font-awesome-icon icon="times" color="white" />
        </button>
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
                    <button @click="clearErrorRequestMessage" type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Закрыть"></button>
                </div>
                <div class="toast-body text-white">
                    {{ errorRequestMessage }}
                </div>
            </div>
            <div
                class="toast bg-success"
                :class="{ hide: !successMessage, show: Boolean(successMessage) }"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
            >
                <div class="toast-header">
                    <strong class="me-auto">Excellent result!!!</strong>
                    <button @click="clearSuccessRequestMessage" type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Закрыть"></button>
                </div>
                <div class="toast-body text-white">
                    {{ successMessage }}
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import './FieldForm.sass'

    export default {
        props: {
            label: String,
            name: String,
            defaultValue: String,
            onSave: Function,
            required: Boolean
        },
        computed: {
            checkForSave() {
                return String(this.currentValue) !== String(this.$props.defaultValue) && this.editable;
            }
        },
        data() {
            return {
                editable: false,
                currentValue: this.$props.defaultValue || '',
                loading: false,
                successMessage: '',
                errorRequestMessage: '',
            }
        },
        watch: {
            defaultValue() {
                if (this.$props.defaultValue && !this.currentValue) {
                    this.currentValue = this.$props.defaultValue;
                }
            }
        },
        methods: {
            clearErrorRequestMessage() {
                this.errorRequestMessage = '';
            },
            clearSuccessRequestMessage() {
                this.successMessage = '';
            },
            toggleEditable(status = false) {
                this.editable = status;
                if (!status) {
                    this.currentValue = this.$props.defaultValue || '';
                }
            },

            async handleSave() {
                if (this.$props.onSave && !this.$props.required) {
                    try {
                        this.loading = true;
                        await this.$props.onSave({ name: this.$props.name, value: this.currentValue });
                        this.loading = false;
                        this.successMessage = 'The data was saved successfully'
                        this.editable = false;

                        setTimeout(() => {
                            this.clearSuccessRequestMessage();
                        }, 3000)
                    } catch (e) {
                        this.errorRequestMessage = 'The user could not be saved, the server is unavailable'
                        setTimeout(this.clearErrorRequestMessage, 3000)
                    }
                }
            }
        }
    }
</script>
