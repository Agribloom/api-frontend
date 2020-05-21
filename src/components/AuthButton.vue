<template>
  <div :class="['auth', {special: special}]">
    <router-link :to="link.to" :key="index" v-for="(link, index) in links">{{link.text}}</router-link>
  </div>
</template>

<script>
export default {
  name: "Auth-Button",
  props: {
    special: { default: false, required: false },
    links: {
      required: true
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../lib/style/__variable.scss";

.auth {
  display: flex;
  flex-wrap: no-wrap;
  align-items: center;
  margin: 7px auto;

  a {
    display: block;
    -moz-border-radius: $bdrs;
    -webkit-border-radius: $bdrs;
    border-radius: $bdrs;
    -moz-box-shadow: 0 7px 7px -7px $shadow;
    -webkit-box-shadow: 0 7px 7px -7px $shadow;
    box-shadow: 0 7px 15px -6px $shadow;
    cursor: pointer;
    font-size: 0.95em;
    flex: 1;
    white-space: nowrap;
    text-align: center;
    letter-spacing: 0;
    overflow: hidden;
    padding: 7px 15px;
    position: relative;
    -moz-transition: all 0.35s linear;
    -ms-transition: all 0.35s linear;
    -o-transition: all 0.35s linear;
    -webkit-transition: all 0.35s linear;
    transition: all 0.35s linear;
    color: $primary !important;
    background: #fff;
    border: 1px solid $primary !important;
    font-weight: bold !important;
    &:hover {
      background: $primary;
      color: #fff !important;
      border-color: transparent;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
      text-decoration: none;
    }
  }
  &.special {
    display: block;
    text-align: center;
    padding: 0 14px;

    a {
      display: block;
      text-align: center !important;
      background: #eee;
      margin: 0 auto;
      background: $primary;
      color: $white !important;
    }
  }
}
</style>
