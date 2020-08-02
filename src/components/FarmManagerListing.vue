<template>
    <div>
        <div v-if="managers.length">
            <farm-manager-item v-for="manager in managers"
                               :manager="manager" :key="`farm-manager-${manager.meta.email}`"/>
        </div>
        <alert-item messages="No contacts found"
                    v-else
                    title="Contact"
                    fontIcon="las la-user"/>
    </div>
</template>

<script>
    import FarmManagerItem from './FarmManagerItem'

    export default {
        name: 'FarmManagerListing',
        components: {FarmManagerItem},
        props: {
            managers: {
                default() {
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
