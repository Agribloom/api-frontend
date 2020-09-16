<template>
    <div class="container px-0">
        <div class="content-header-left col-md-8 col-12 breadcrumb-new">
            <div class="row">
                <h3 class="content-header-title">Transactions</h3>
                <div class="breadcrumb-wrapper col-12">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item active">Manage Investment Transactions</li>
                    </ol>
                </div>
            </div>
        </div>
        <nomsg-spinner v-if="!loading"/>
        <div v-else></div>
    </div>
</template>

<script>
	export default {
		name: "DashboardPage"
	}
</script>

<style scoped>

</style>
