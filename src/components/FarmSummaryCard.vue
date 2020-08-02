<template>
  <div class="skill-item">
    <ul class="skill-progress">
      <li>
        Raised
        <span
          class="unicode naira uppercase"
          :title="summary.raised | numerate"
        >{{summary.raised | numerate}}</span>
      </li>
      <li>
        Target
        <span
          class="unicode naira uppercase"
          :title="summary.target | numerate"
        >{{summary.target | numerate}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import mixin from "@/mixin";

export default {
  name: "FarmSummaryCard",
  mixins: [mixin],
  props: {
    summary: {
      default() {
        return {
          percent: "",
          roi: "",
          raised: "",
          target: "",
          status: "",
        };
      },
    },
  },
  computed: {
    status() {
      return this.summary.status;
    },
  },
};
</script>

<style lang="scss">
@import "../lib/style/_variable";

.skill-item {
  border: 1px solid #ececec;
  margin: 0;
  overflow: hidden;
  position: relative;

  ul.skill-progress {
    color: $dark-typo;
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    font-size: 12px;
    justify-content: flex-start;
    width: 100%;

    li {
      background: #fefefe;
      border-right: 1px solid $light-bd;
      flex-basis: 50%;
      font-family: $font-family-body;
      font-weight: 300;
      line-height: 1.25;
      margin: 0;
      padding: 8px 25px;
      overflow: hidden;
      position: relative;

      &:nth-child(even) {
        border-right: none;
      }

      > span {
        color: $primary;
        display: block;
        font-size: 18px;
        font-weight: bold;
        overflow: hidden;
        -ms-text-overflow: ellipsis;
        text-overflow: ellipsis;
        position: relative;
        white-space: nowrap;
        width: 100%;
      }
    }
  }

  .skillbar {
    border: 1px solid $after-bg;

    height: 0.5em;
    position: relative;

    &:hover {
      .skill-bar-percent {
        opacity: 1;
      }
    }

    .skillbar-bar {
      background: $primary-gradient;
      height: 0.5em;
      left: 0;
      top: 0;
    }

    .skill-bar-percent {
      background: $primary-light;
      -moz-border-radius: $bdrs;
      -webkit-border-radius: $bdrs;
      border-radius: $bdrs;
      bottom: calc(0%);
      color: $white;
      font-weight: 700;
      left: 50%;
      line-height: 24px;
      opacity: 0;
      text-align: center;
      -ms-transform: translate(-50%, -50%);
      -webkit-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      transition: opacity 0.35s ease-in-out;
      width: 40px;

      &:after {
        background: $primary-light;
        height: 6px;
        right: 50%;
        top: 100%;
        -ms-transform: translate(-50%, -50%) rotate(45deg);
        -webkit-transform: translate(-50%, -50%) rotate(45deg);
        transform: translate(-50%, -50%) rotate(45deg);
        width: 6px;
      }
    }
  }

  .roi {
    border-top: 1px solid $light-bd;
    color: $white;
    display: flex;
    font-size: 24px;
    height: auto;
    justify-content: flex-end;
    line-height: 1.5;
    overflow: hidden;
    padding: 8px 15px;
    position: relative;
    right: 0;
    top: 100%;
    width: auto;

    > .icon {
      left: 0;
      transition: all 0.35s ease-in-out;
      width: auto;
    }

    .value {
      display: inline-block;
      font-weight: 600;
      transition: transform 0.35s ease-in-out;

      span {
        font-size: 16px;
      }
    }
  }
}
.uppercase {
  text-transform: uppercase;
}
</style>
