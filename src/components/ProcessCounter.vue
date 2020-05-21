<template>
  <div class="process-counter-inner">
    <div class="process-content">
      <ICountUp
        class="iCountUp text-white"
        :delay="delay"
        :endVal="Number(content.value)"
        :options="options"
      />
      <p class="mt-3" style="color: white">
        <span v-html="content.name"></span>
      </p>
    </div>
  </div>
</template>

<script>
import ICountUp from "vue-countup-v2";

export default {
  name: "ProcessItem",
  components: {
    ICountUp
  },
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      delay: 1000,
      options: {
        useEasing: true,
        useGrouping: true,
        separator: ",",
        decimal: ".",
        prefix: "",
        suffix: "",
        smartEasingThreshold: 1000,
        duration: 3,
        startVal: 0
      }
    };
  },
  methods: {
    onReady(instance, CountUp) {
      const that = this;
      instance.update(that.endVal + 100);
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/lib/style/__variable.scss";
.process-counter-inner {
  padding: 60px 30px 30px;
  width: 100%;
  color: #fff;
  .process-content {
    text-align: center;
    color: white;
  }
}
.iCountUp {
  font-size: 7em;
  margin: 0;
  color: white;
  font-family: $font-family-head;
  letter-spacing: -0.013em;
  font-weight: 600;
}
</style>
