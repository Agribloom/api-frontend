<template>
  <div class="container">
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
      <nomsg-spinner />
    </div>
    <div v-else>
      <div class>
        <h3 class="intro right">
          Welcome,
          <strong>{{user.username}}</strong>
        </h3>
      </div>
      <div class="d-flex justify-content-end">
        <div>
          <router-link :to="{name: 'farms'}" class="cbtn">See Farms</router-link>

          <router-link :to="{name:'investment'}" class="cbtn">Go to Investments</router-link>
        </div>
      </div>
      <!--Critical alert-->
      <template>
        <div class="alert alert-critical"></div>
      </template>

      <div class="row">
        <div class="col-md-4 p-0">
          <div class="account-card">
            <div class="card-body">
              <user-card />
            </div>
          </div>
        </div>
        <div class="col-md-8 px-lg-1 p-0">
          <div class="row">
            <div class="col px-lg-1 p-0">
              <div class="account-card">
                <div class="card-header">Farm investment</div>
                <div class="card-body">
                  <investment-summary title />
                </div>
              </div>
            </div>
            <!-- <div class="col-md-12 col-lg-6">
							 <section class="account-card pull-up">
								 <div class="card-content">
									 <div class="card-body">
										 <transaction-summary/>
									 </div>
									 <div class="card-footer">
										 <router-link :to="{name:'transaction'}" class="cbtn">Go to
											 transactions
										 </router-link>
									 </div>
								 </div>
							 </section>
            </div>-->
          </div>
        </div>
      </div>
      <div>
        <investment-listing />
      </div>
    </div>
  </div>
</template>

<script>
import mixin from '@/mixin'
import { mapGetters } from 'vuex'

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
