<template>
    <div>
        <farm-manager-item v-for="manager in managers" :manager="manager" :key="`farm-manager-${manager.meta.email}`"/>
    </div>
</template>

<script>
import FarmManagerItem from './FarmManagerItem'

export default {
    name: 'FarmManagerListing',
    components: { FarmManagerItem },
    props: {
        managers: {
            default () {
                return []
            },
            type: [Object, Array],
            required: true
        }
    }
}
</script>

<style scoped>

</style>
