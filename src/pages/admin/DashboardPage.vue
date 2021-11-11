<template>
    <div class="container px-0">
        <div class="content-header-left col-md-8 col-12 breadcrumb-new">
            <div class="row">
                <h3 class="content-header-title">Dashboard</h3>
                <div class="breadcrumb-wrapper col-12">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item active">Recent activities and log</li>
                    </ol>
                </div>
            </div>
        </div>
        <nomsg-spinner v-if="loading"/>
        <div v-else>
            <div class>
                <h3 class="intro right">
                    Welcome,
                    <strong>{user.username}</strong>
                </h3>
            </div>
            <div class="account-card">
                <div class="card-body">
                    <div class>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	export default {
		name: "DashboardPage",
		data() {
			return {
				loading: false
			}
		}
	}
</script>

<style scoped>

</style>
