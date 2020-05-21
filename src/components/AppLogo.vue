<template>
    <router-link :to="{name: 'home'}" class="logo">
        <img :src="logo" :alt="'logo'" />
    </router-link>
</template>

<script>
import mixin from '@/mixin'

export default {
    name: 'Logo',
    mixins: [mixin],
    data () {
        return {}
    },
    props: {
        type: {
            default: 'black',
            required: false
        }
    },
    computed: {
        logo: function () {
            // eslint-disable-next-line no-mixed-spaces-and-tabs,no-tabs
            if (this.type == 'white') {
                return this.base + 'assets/images/logo/logo_white.png'
            }
            return this.base + 'assets/images/logo/logo_black.png'
        }
    }
}
</script>

<style scoped lang="scss">
.logo{
    width: 70%;
    padding: relative;
    overflow: hidden;
}
</style>
