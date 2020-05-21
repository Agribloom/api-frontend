<template>
    <div class="post-item">
        <div class="post-thumb">
            <img alt="gallery"
                 src="/assets/images/campaign/single/gallery/03.jpg"/>
            <a
                    class="expand-icon"
                    data-rel="lightcase:myCollection"
                    href="/assets/images/campaign/single/gallery/03.jpg"
            >
                <i class="la la-arrows-alt"></i>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FarmGalleryItem',
    props: {
        images: {
            required: true
        }
    }
}
</script>

<style scoped>

</style>
