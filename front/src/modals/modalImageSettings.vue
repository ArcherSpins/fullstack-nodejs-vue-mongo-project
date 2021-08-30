<template>
    <div v-if="visible" class="modal modal-image-settings fade show bg" style="display: block;" aria-hidden="true" tabindex="-1" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Edit user avatar</h5>
                    <button @click="handleClose" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="modal-image-settings--selected-image" v-if="Boolean(imageSrc)" :style="{backgroundImage: `url('${getImgUrl()}')`}"></div>
                    <div class="mt-3">
                        <input type="file" accept=".jpg, .jpeg, .png" @change="handleChangeInputFile" />
                    </div>
                </div>
                <div class="modal-footer">
                    <button :disabled="loading" @click="handleClose" type="button" class="btn" :class="{ 'btn-default': loading, 'btn-danger': !loading }" data-bs-dismiss="modal">Close</button>
                    <button :disabled="loading" v-if="Boolean(file)" @click="handleConfirm" type="button" class="btn" :class="{ 'btn-default': loading, 'btn-primary': !loading }">Save changes</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import './style.sass'
    
    const readURL = file => {
        return new Promise((res, rej) => {
            const reader = new FileReader();
            reader.onload = e => res(e.target.result);
            reader.onerror = e => rej(e);
            reader.readAsDataURL(file);
        });
    };

    export default {
        props: {
            visible: Boolean,
            onClose: Function,
            imageSrc: String,
            onLoadFile: Function,
            loading: Boolean
        },
        data() {
            return {
                url: null,
                file: null
            }
        },
        methods: {
            handleClose() {
                if (!this.$props.onClose) {
                    return null;
                }
                this.$props.onClose(false)
            },
            getImgUrl() {
                if (!this.$props.imageSrc && !this.url) {
                    return null
                }
                return this.url || this.$props.imageSrc;
            },
            async handleChangeInputFile(event) {
                const files = event.target.files
                const url = await readURL(files[0]);
                this.url = url
                this.file = files[0];
            },
            handleCancel() {
                this.url = null;
                this.file = null;
            },
            handleConfirm() {
                if (!this.file) {
                    return;
                }

                if (this.$props.onLoadFile) {
                    this.$props.onLoadFile({ file: this.file });
                }
            }
        }
    }
</script>
