<template>
  <div class="page-error">
    <span class="error-code">404</span>
    <span>Page not Found!</span>
  </div>
</template>

<script>
export default {
  name: "Page-Not-Found",
  created(){
      console.log(this.$route)
  }
};
</script>

<style lang="scss" scoped>
@import "../../lib/style/__variable.scss";

.page-error {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  color: $primary;
  font-size: 2.5em;
  height: 100vh;
  overflow: hidden;
  position: relative;
  text-align: center;
  .error-code {
    font-size: 5em;
    display: block;
    line-height: 1em;
  }
}
</style>
