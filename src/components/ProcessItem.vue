<template>
  <div class="process-item">
    <vue-aos animation-class="fadeUp animated">
      <div class="process-inner">
        <div class="process-thumb">
          <img
            class="process-thumb-image"
            classes="process-thumb-figure"
            :alt="content.image.alt"
            :src="content.image.src"
          />
        </div>
        <div class="process-content">
          <h4 class="title" v-html="content.title"></h4>
          <p class="description" v-html="content.description"></p>
        </div>
      </div>
    </vue-aos>
  </div>
</template>

<script>
import VueAos from "vue-aos";

export default {
  name: "ProcessItem",
  components: {
    VueAos
  },
  props: {
    content: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss">
@import "@/lib/style/__variable.scss";

.process-item {
  position: relative;
  flex: 0 0 1;
  max-width: 40%;
  // min-width: percentage(1/2);
  margin: 0 auto;
  text-align: center;
  @media (max-width: 781px) {
    max-width: 100%;
  }

  padding: 15px;

  .process-inner {
    position: relative;
    border-radius: 7px;
    padding: 60px 30px;
    overflow: hidden;
    position: relative;
    height: 100%;
    -moz-transition: all 0.3s ease;
    -webkit-transition: all 0.3s cubic-bezier(0.4, 0, 1, 1);
    transition: all 0.3s ease;

    @media (max-width: 992px) {
      padding: 15px 4px;
    }

    .process-thumb {
      margin: 7px auto 30px;
      width: 100px;
      height: 100px;
      object-fit: contain;
      object-position: center;
      position: relative;
      overflow: hidden;
      background: #fefefe;
      box-shadow: 0 7px 15px -7px rgb(195, 195, 195);
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
      border-radius: 50%;
    }

    .process-content {
      h4 {
        color: rgb(109, 109, 109);
        font-weight: 400;
        text-transform: capitalize;
        letter-spacing: 0px;
      }

      p {
        letter-spacing: 1px;

        font: {
          size: 0.9em;
          line-height: 1.5;
          weight: 300;
        }
      }

      .process-counter {
        align-items: center;
        background: $light;
        border: 1px solid $light;
        border-radius: $bdrs;
        color: $dark;
        display: -webkit-flex;
        display: -ms-flex;
        display: flex;
        font-weight: 600;
        height: 50px;
        justify-content: center;
        left: 0;
        position: absolute;
        top: 0;
        width: 50px;
      }
    }
  }
}
.process-thumb-figure {
  position: relative;
  display: block;
}
.process-thumb-image {
  object-fit: contain;
  object-position: center;
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
