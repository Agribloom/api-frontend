<template>
    <div class="container">
        <div class="content-header-left col-md-8 col-12 breadcrumb-new">
            <div class="row">
              <h3 class="content-header-title">Notification</h3>
                <div class="breadcrumb-wrapper col-12">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <router-link :to="{name: 'dashboard'}">Dashboard</router-link>
                        </li>
                        <li class="breadcrumb-item active">Notification
                        </li>
                    </ol>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="account-card">
                    <div class="card-body">
                        <div v-if="!hasEntry">
                            <alert-item :messages="'Hurray! No Notification'" :title="''"
                                        fontIcon="la la-comment-slash">
                                <!--<div @click="refreshData" class="cbtn" >
                                    <i class="la la-refresh"></i> Refresh
                                </div>-->
                            </alert-item>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Account-Notification',
    computed: {
        hasEntry () {
            return 0
        }
    },
    methods: {
        fetchNotification () {},
        refreshData () {

        }
    }
}
</script>

<style scoped>

</style>
