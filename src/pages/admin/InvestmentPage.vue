<template>
    <div class="container px-0">
        <div class="content-header-left col-md-8 col-12 breadcrumb-new">
            <div class="row">
                <h3 class="content-header-title">Investments</h3>
                <div class="breadcrumb-wrapper col-12">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item active">Farm Investment management</li>
                    </ol>
                </div>
            </div>
        </div>
        <nomsg-spinner v-if="loading"/>
        <div v-else>

            <div class="intro p-3">
                <strong>Active </strong>
                <span>(0)</span>
            </div>
            <div class="account-card">
                <div class="card-body">

                    <farm-listing name="investments"
                                  :filters="{status: 'open', count: 6}"
                                  :carousel="true"
                                  :paginate="false"
                    />
                </div>
            </div>

            <div class="intro p-3">
                <strong>Inactive </strong>
                <span>(0)</span>
            </div>
            <div class="account-card">
                <div class="card-body">
                    <farm-listing name="investments"
                                  :filters="{status: 'close', count: 6}"
                                  :carousel="true"
                                  :paginate="false"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	export default {
		name: "InvestmentPage",
      data(){
			return {
				loading: false
            }
      }
	}
</script>

<style scoped>

</style>
