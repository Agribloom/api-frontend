<template>
  <div id="apprentice">
    <page-heading :detail="headingDetails"></page-heading>

    <div class="apprentice bg-200">
      <!--            <section>-->
      <!--                <p>We have dedicated and responsible apprentices who are currently trained</p>-->
      <!--            </section>-->
      <div class="d-flex justify-content-center align-items-sm-center flex-sm-fill mb-5">
        <alert-item messages="Application has ended. Check back later" :title="'Sorry!'"></alert-item>
      </div>
      <!--  <section>
                 <div class="container">
                    <team-listing title="Farmers" />
                    <team-listing title="Technical" />
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLSdSwSzO_yanDx3hnMnzt17DF2GEvo8DZiQUs4Xen6M6INRW_w/viewform" class="custom-btn">
                </div>
      </section>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "Apprentice",
  data: function() {
    return {
      breadcrumbs: [
        { id: 0, name: "Home", classes: "", location: "/" },
        { id: 1, name: "Apprentices", classes: "active", location: "" }
      ],
      title: "Apprentices"
    };
  },
  computed: {
    headingDetails: function() {
      return {
        title: "Our Careers",
        breadcrumbs: this.breadcrumbs,
        banner: "/assets/images/career/banner.jpg"
      };
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../lib/style/_variable";

.apprentice {
  /*background: $primary;*/
  padding: 60px 0;
}
</style>
