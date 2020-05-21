<template>
  <div>
    <section
      class="support-section padding-tb"
      v-if="hasEntry"
      style="background-image: url(assets/images/support/bg-image-2.jpg); background-size: cover;"
    >
      <div class="container">
        <div class="section-header style-2">
          <h2>
            Where we are
            <span class="diff">now</span>
          </h2>
          <h2>
            <span>Our achievements so far</span>
          </h2>
        </div>
        <div class="sectioner">
          <div class="row d-flex flex-fill">
            <div class="col-lg-12">
              <div class="row justify-content-center">
                <div
                  class="col-md-4 col-sm-12 col-lg-3"
                  :key="'achieve-' + index"
                  v-for="(achievement, index) in fetchAchievements"
                >
                  <div class="process-counter-item">
                    <process-counter :content="achievement" :key="'achievement'+index" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <testimonial-carousel />
    </section>
  </div>
</template>

<script>
export default {
  name: "AchievementListing",
  data: function() {
    return {
      achievements: []
    };
  },
  methods: {
    getDataFromApi() {
      window.axios
        .get("achievements")
        .then(response => {
          this.achievements = response.data.results;
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.getDataFromApi();
  },
  computed: {
    fetchAchievements() {
      return this.achievements;
    },
    hasEntry() {
      return this.achievements.length;
    }
  }
};
</script>

<style scoped lang="scss">
.sectioner {
  margin: 60px 15px;
}

.process-counter-item {
  padding: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 7px auto;
  width: 100%;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
}
</style>
