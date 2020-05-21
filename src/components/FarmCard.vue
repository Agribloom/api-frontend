<template>
  <div class="farm-card">
    <router-link :to="{name:'farm', params:{id: farm.id, slug: farm.slug}}">
      <div class="farm-card-inner">
        <div class="farm-card-thumb">
          <farm-summary-card :summary="farmSummary" />
          <div class="farm-thumb-container">
            <image-item :alt="farm.name" :source="farm.image" />
            <div class="farm-status">
              <span :class="statusClass">{{farm.status }}</span>
            </div>
          </div>
        </div>

        <div class="farm-card-content">
          <h4 class="header">{{farm.name | capitalize}}</h4>
          <ul class="meta">
            <li class="meta-item">
              <i class="fa fa-map-marker-alt icon"></i>
              {{farm.location}}
            </li>
            <li class="meta-item">
              <i class="la la-bar-chart-o icon"></i>
              {{farm.roi}}%
            </li>
            <li class="meta-item">
              <i class="fa fa-coins icon"></i>
              {{farm.price_per_unit | numerate}}
            </li>

            <li class="meta-item">
              <i class="fa fa-cubes icon"></i>
              {{farm.unit_in_stock}}/{{farm.units}} units
            </li>
            <li class="meta-item">
              <i class="fa fa-calendar-alt icon"></i>
              {{farm.start_date | formatDate}} - {{farm.end_date | formatDate}}
            </li>
          </ul>
          <div class="insured" v-if="farm.insured">
            <div class="__text">
              <img src="/assets/images/insured.png" alt />
              Insured
            </div>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import mixin from "@/mixin";

export default {
  mixins: [mixin],
  props: {
    data: {
      required: true,
      default: {}
    }
  },
  name: "FarmCard",
  data: function() {
    return {
      farm: this.data,
      available: false
    };
  },
  computed: {
    statusClass() {
      return ["status-badge", this.farm.status];
    },
    farmSummary() {
      return {
        raised: this.farm.raised,
        target: this.farm.target,
        roi: this.farm.roi,
        status: this.farm.status
      };
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/lib/style/__variable.scss";

$default: hsl(150, 15%, 92%);
$hover: #d6d6d6;

.farm-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: transparent;
  position: relative;

  a {
    &:hover {
      text-decoration: none;
    }
  }

  .farm-card-inner {
    -webkit-border-radius: $bdrs;
    -moz-border-radius: $bdrs;
    border-radius: 12px;
    box-shadow: 0vmin 0px 4px 1px #f5f5f5;

    position: relative;
    overflow: hidden;
    max-width: 300px;
    margin: 0 auto;
    background: white;
    -webkit-transition: all 0.15s ease-in;
    -moz-transition: all 0.15s ease-in;
    -ms-transition: all 0.15s ease-in;
    -o-transition: all 0.15s ease-in;
    transition: all 0.15s ease-in;

    &:hover {
      -webkit-box-shadow: 0vmin 7px 7px -7px #e8e8e8;
      -moz-box-shadow: 0vmin 7px 7px -7px #e8e8e8;
      box-shadow: 0vmin 5px 7px 1px #e8e8e8;
    }

    .farm-card-thumb {
      height: 200px;
      /*background: $light;*/
      position: relative;
      overflow: hidden;
      color: #ddd;

      &:after {
        background: $secondary;
        background: transparentize($black, 0.75%);
        content: "";
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        position: absolute;
      }

      .skill-item {
        border: none;
        overflow: hidden;
        -webkit-border-radius: 0;
        -moz-border-radius: 0;
        border-radius: 0;
        position: relative;
        top: 0;
        left: 0;
        z-index: 10;
        width: 100%;

        .roi {
          border: 1px solid $primary-dark;
        }
      }

      .farm-thumb-container {
        position: relative;
        display: block;
        width: 100%;
        height: 100%;

        .farm-status {
          position: absolute;
          z-index: 10;
          bottom: 60px;
          right: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 7px 10px;
        }
      }

      figure {
        min-height: 100px;
        position: relative;
        top: 0;
        width: 100%;
        height: 100%;
        left: 0;
        overflow: hidden;
      }
    }

    .farm-card-content {
      position: relative;
      padding: 20px;
      // border: 4px solid $default;
      .header {
        font-size: 16px;
        font-family: $font-family-body;
        -ms-text-overflow: ellipsis;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        letter-spacing: 0;

        a {
          font-weight: 400;
        }
      }

      .meta {
        display: flex;
        font-size: 12px;
        margin-left: 0;
        min-height: 70px;
        line-height: 0.5;
        width: 100%;

        .meta-item {
          display: flex;
          align-items: center;
        }
      }
      .insured {
        position: relative;
        display: flex;
        width: 100%;
        margin-top: 7px;
        justify-content: flex-end;
        font-weight: 400;
        .__text {
          color: #8a8a8a;
          background: rgba(200, 200, 200, 0.29);
          display: inline-block;
          -webkit-border-radius: 20px;
          -moz-border-radius: 20px;
          border-radius: 20px;
          padding: 1px 10px;
          z-index: 1;
          font-size: 0.7em;
        }
        img {
          width: 18px;
          height: 20px;
          margin-right: 2px;
          z-index: 2;
        }
      }
    }
  }

  width: auto;
  flex: auto;
  margin: 30px auto;
  min-width: 200px;
  padding: 7px;
}
</style>
