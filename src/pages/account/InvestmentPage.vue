<template>
  <div class="container">
    <div class="content-header-left col-md-8 col-12 breadcrumb-new">
      <div class="row">
        <h3 class="content-header-title">Investment</h3>
        <div class="breadcrumb-wrapper col-12">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link :to="{name: 'dashboard'}">Dashboard</router-link>
            </li>
            <li class="breadcrumb-item active">Investment</li>
          </ol>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <template v-if="loading">
          <div class="account-card">
            <div class="card-body">
              <div class>
                <nomsg-spinner />
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class>
            <h3 class="intro right">
              Welcome,
              <strong>{{user.username}}</strong>
            </h3>
          </div>
          <!-- <investment-withdrawal/> -->
          <investment-summary />
          <investment-listing />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Account-Investment",
  data() {
    return {
      investments: []
    };
  },
  computed: {
    ...mapGetters("user", {
      user: "data",
      loading: "loading"
    })
  }
};
</script>

<style scoped>
</style>
