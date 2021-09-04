<template>
    <div class="position-fixed top-0 end-0 p-3" style="z-index: 11">
        <div
            class="toast"
            :class="[{ hide: !$props.visible, show: $props.visible }, type]"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
        >
            <div class="toast-header">
                <strong class="me-auto">{{ $props.title || 'Good request result!!!' }}</strong>
                <small v-if="dateMessage">{{ dateMessage }}</small>
                <button @click="onClick" type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Закрыть"></button>
            </div>
            <div class="toast-body text-white">
                {{ content }}
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        props: {
            visible: Boolean,
            dateMessage: String,
            title: String,
            content: String,
            onClick: Function,
            type: String,
        }
    }
</script>