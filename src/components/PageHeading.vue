<template>
  <section class="page-header">
    <div class="page-header-img">
      <image-item :alt="source" :source="source" classes="banner" />
    </div>
    <div class="page-header-area">
      <div class="container">
        <div class="page-header-content">
          <div class="page-header-title">
            <vue-aos animation-class="fadeInDownBig animated" :threshold="0.2">
              <div class="section-header mb-1">
                <h2>{{heading}}</h2>
              </div>
            </vue-aos>

            <div class="breadcrumbs">
              <bread-crumbs :breadcrumbs="detail.breadcrumbs" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import VueAos from "vue-aos";
export default {
  name: "Page-Head",
  components: { VueAos },
  props: {
    detail: {
      type: Object,
      default() {
        return { title: "", breadcrumbs: {}, banner: "" };
      }
    }
  },
  computed: {
    heading() {
      if (this.detail.title !== undefined) {
        return this.detail.title.split(" ").join(" ");
      }
      return "";
    },
    source: function() {
      return this.detail.banner || "/assets/images/placeholder.png";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../lib/style/_variable";

.page-header {
  background-position: center;

  background-repeat: no-repeat;
  background-size: cover;
  content: "";
  height: 270px;
  @media screen and (min-width: 993px) {
    height: 200px;
  }
  @media (min-width: 641px) and (max-width: 993px) {
    height: 300px;
  }
  object-fit: cover;
  object-position: center;
  overflow: hidden;
  position: relative;
  padding: 40px 0;

  .page-header-img {
    background: #ffffff;
    display: block;
    height: 100%;
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;

    &:after {
      background-color: rgba($secondary, 0.58984);
      content: " ";
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;
      z-index: 0;
      object-fit: contain;
      object-position: center;
      filter: blur(50%);
    }

    figure.banner {
      display: block;
      text-align: center;
      object-fit: cover;
      object-position: center;
      background: #eee;
      position: absolute;
      top: 0;
      width: 100%;
    }
  }

  .page-header-area .page-header-content {
    /*margin-top: 100px;*/
    @media screen and (max-width: 1199px) {
      margin-top: 100px;
    }
    position: relative;
    text-align: center;

    .page-header-title {
      color: $white;
      z-index: 5;
      font-weight: 700;
      h2 {
        line-height: 1.5;
        margin: 0;
        letter-spacing: 0;
        text-shadow: 0 7px 14px $shadow-dark;
      }
    }

    .breadcrumbs {
      display: flex;
      justify-content: center;
      margin-top: 15px;
      flex-wrap: wrap;
    }
  }

  @media (max-width: 576px) {
    min-height: 250px;
    padding-top: 10px;
  }
}

.page-header {
  .page-header-area {
    content: "";
    position: absolute;

    .page-header-content {
      .diff {
        margin-bottom: 15px;

        + .diff:before {
          background: transparent;
        }
      }

      .page-header-title {
        .section-header {
          h2{
            color: white;
          }
        }
      }

      .page-header-title:after,
      .crumbs li a:after {
        content: "";
        position: absolute;
      }
    }
  }
}
</style>
