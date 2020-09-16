<template>
    <div :class="[classes, 'nomsg-spinner']">
        <pulse-loader :color="color" :loading="loading"/>
    </div>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
    components: {
        PulseLoader
    },
    props: {
        loading: {
            default: true
        },
        classes: {
            required: false
        }
    },
    computed: {
        color () {
            return '#349b22'
        }
    },
    name: 'MessageLessSpinner'
}
</script>

<style scoped lang="scss">
    .nomsg-spinner{
        margin: 8px 16px;
    }
</style>
