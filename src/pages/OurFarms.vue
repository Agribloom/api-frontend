<template>
    <div class="container-fluid p-0 ">
        <!-- BreadCamp start here-->
        <div class="divider shift-mobile-down">
            <div class="container">
                <bread-crumbs :breadcrumbs="breadcrumbs"/>
            </div>
        </div>
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
    }
}
</script>

<style scoped>
</style>
