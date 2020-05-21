<template>
    <div v-if="!hasImage">
        <alert-item messages="No image found yet!" fontIcon="las la-image"/>
    </div>
    <div class="gallery" v-else>
        <farm-gallery-item :images="images"/>
    </div>
</template>

<script>
export default {
    name: 'FarmGalleryItem',
    data () {
        return {
            images: []
        }
    },
    computed: {
        hasImage () {
            return this.images.length
        }
    }
}
</script>
<style scoped>

</style>
