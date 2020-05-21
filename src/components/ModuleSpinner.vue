<template>
    <div :class="isLoading" class="preloader module-preloader">
        <div class="loader">
            <pulse-loader :color="color" :loading="loading"/>
        </div>
        <span>{{message}}</span>
    </div>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
    components: {
        PulseLoader
    },
    props: {
        message: {
            default: 'Loading'
        },
        loading: {
            default: true
        }
    },
    computed: {
        color () {
            return '#349b22'
        },
        isLoading () {
            return {
                load: this.loading
            }
        }
    },
    name: 'ModuleSpinner'
}
</script>

<style lang="scss" scoped>
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s;
        }

    .fade-enter,
    .fade-leave-to {
        opacity: 0;
        }

    .preloader {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 300px;
        background: white;
        z-index: 100;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: opacity 0.5s;
        transform: scale(1);
        text-align: center;
        opacity: 0;

        .loader {
            display: flex;
            align-self: center;
            position: absolute;
            }

        &.load {
            opacity: 1;
            }

        span {
            width: 100%;
            // height: 42px;
            position: relative;
            flex: 1;
            display: block;
            margin-top: 100px;
            color: rgb(170, 169, 169);
            text-transform: capitalize;
            z-index: 10;
            font-size: .75em
            }
        }
</style>
