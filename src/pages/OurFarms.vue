<template>
    <div class="container-fluid p-0 ">
        <!-- BreadCamp start here-->
        <page-heading :detail="headingDetails"></page-heading>

        <!-- BreadCamp ending-->

        <!-- campaign section start -->
        <div class=" h-screen">
            <section class="">
                <farm-listing :action="true" name="our-farms" :paginate="true" :filter="true"/>
            </section>
        </div>

        <!-- campaign section ending here -->
    </div>
</template>

<script>
export default {
    name: 'FarmsPage',
    data () {
        return {
            breadcrumbs: [
                { id: 0, name: 'Home', classes: '', location: '/' },
                { id: 1, name: 'Farms', classes: 'active', location: '' }
            ]
        }
    },
    computed:{
        headingDetails: function () {
            return {
                title: 'Our Farms',
                breadcrumbs: this.breadcrumbs,
                banner: '/assets/images/farms/farms-banner.jpg'
            }
        }
    }
}
</script>

<style scoped>
</style>
