<template>
    <div class="container px-0">
        <div class="content-header-left col-md-8 col-12 breadcrumb-new">
            <div class="row">
                <h3 class="content-header-title">Dashboard</h3>
                <div class="breadcrumb-wrapper col-12">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item active">Dashboard</li>
                    </ol>
                </div>
            </div>
        </div>
        <div v-if="loading">
            <nomsg-spinner/>
        </div>
        <div v-else>
            <div class>
                <h3 class="intro right">
                    Welcome,
                    <strong>{{user.username}}</strong>
                </h3>
            </div>

            <!--Critical alert-->
            <template>
                <div class="alert alert-critical"></div>
            </template>

            <div class="row">
                <div class="col-md-3 p-0">
                    <user-card/>
                </div>
                <div class="col-md-9 p-0 px-lg-3">
                  <investment-summary title/>
                </div>
            </div>
            <div class="d-flex pb-2 justify-content-end">
                <router-link :to="{name: 'farms'}" class="btn primary">See Farms</router-link>

                <router-link :to="{name:'investment'}" class="btn">Go to Investments</router-link>
            </div>
            <div>
                <div class="intro p-3">
                    <strong>Farm Investments</strong>
                </div>
                <div class="account-card ">
                    <div class="card-body">
                        <investment-listing/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import mixin from '@/mixin'
    import {mapGetters} from 'vuex'

    export default {
        name: 'Account-Dashboard',
        mixins: [mixin],
        computed: {
            ...mapGetters('user', {
                user: 'data',
                loading: 'loading'
            })
        }
    }
</script>
