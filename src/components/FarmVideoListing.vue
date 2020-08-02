<template>
    <div v-if="!hasVideo">
        <alert-item messages="No video found"
                    title="Videos"
                    fontIcon="las la-play-circle"/>
    </div>
    <div v-else>
        <farm-video-item />
    </div>
</template>

<script>
import FarmVideoItem from './FarmVideoItem'
export default {
    name: 'FarmVideoListing',
    components: { FarmVideoItem },
    data () {
        return {
            videos: []
        }
    },
    computed: {
        hasVideo () {
            return this.videos.length
        }
    }
}
</script>

<style scoped>

</style>
