<template>
  <div class="filter-capsule">
    <div class="filter-capsule-item">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "FilterCapsules"
};
</script>

<style lang="scss">
@import "../lib/style/_variable";
.filter-capsule {
  margin: 1px;
  -webkit-border-radius: $bdrs;
  -moz-border-radius: $bdrs;
  border-radius: $bdrs;
  position: relative;
  cursor: pointer;
  color: $light-typo;
  padding: 7px 14px;
    border: 1px solid #ececec;
    background: hsla(0, 0%, 100%, 0.568);
  &.selected {
    box-shadow: none;
    color: $primary-light;
  }
  .filter-capsule-item {
    position: relative;
    display: block;
    -webkit-border-radius: $bdrs;
    -moz-border-radius: $bdrs;
    border-radius: $bdrs;
  }
}
</style>
