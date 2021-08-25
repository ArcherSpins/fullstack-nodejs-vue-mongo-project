<template>
    <div class="container page">
        <div class="row card-profile">
            <div class="col-4 mt-4 card-profile--left card">
                <div class="card-profile--image" :style="{backgroundImage: `url(${getImgUrl()})`}">
                    <div class="card-profile--image-settings">
                        <font-awesome-icon icon="camera" color="white" />
                    </div>
                </div>
                <modal-image-settings />
            </div>
            <div class="col-7 card-profile--right mt-4 ml-2 card">2</div>
        </div>
    </div>
</template>


<script>
    import ModalImageSettings from '../modals/modalImageSettings.vue'
    import userImage from '../assets/user.jpg'
    import './style.sass';

    export default {
        methods: {
            getImgUrl() {
                return userImage
            }
        },
        components: {
            ModalImageSettings
        }
    }
</script>