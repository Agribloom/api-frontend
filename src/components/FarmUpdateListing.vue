<template>
    <div>
        <div v-if="!hasUpdate">
            <alert-item :messages="'No update found'"
                        title="Updates"
                        fontIcon="las la-exclamation"/>
        </div>
        <div v-else class="update-listing">
            <farm-update-item @showUpdate="showUpdateInModal" v-for="(update, index) in updates" :update="update"
                              :key="`${id}-updates-${index}`"/>
        </div>
        <modal-component ref="update-modal">
            <farm-update-view :data="modal.update.data"/>
        </modal-component>
    </div>
</template>

<script>
import FarmUpdateItem from './FarmUpdateItem'
import FarmUpdateView from './FarmUpdateView'

export default {
    name: 'FarmUpdateListing',
    components: { FarmUpdateView, FarmUpdateItem },
    props: {
        id: {
            required: true
        },
        updates: {
            default () {
                /* Returns [
                    {
                        id: 1,
                            activity: 'Lorem ipsum  dolor sit amet, consectetur adipisicing elit. Ad aut culpa cum quisquam reprehenderit.',
                        description: "Lorem  Lorem ipsum dolor Lorem  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aut culpa cum quisquam re Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aut culpa cum quisquam reipsum dolor sit amet, consectetur adipisicing elit. Ad aut culpa cum quisquam reprehenderit. A adipisci aliquid dolorem enim, esse harum itaque maiores mollitia neque officiis omnis, quis, rem sit?",
                        report: '',
                        slug: '',
                        images: [{id: '', image: '', position: ''}],
                        date: Date()
                    }
                    ] */
                return []
            },
            required: true,
            type: Array
        }
    },
    data () {
        return {
            modal: {
                update: {
                    data: {}
                }
            }
        }
    },
    computed: {
        hasUpdate () {
            return this.updates.length
        }
    },
    methods: {
        showUpdateInModal (id) {
            let update = this.updates.filter(e => e.id === id)[0]
            this.modal.update.data = update
            this.$refs['update-modal'].modalOpen()
        }
    }
}
</script>

<style scoped lang="scss">
    .update-listing {
        counter-reset: updateCard;
    }
</style>
