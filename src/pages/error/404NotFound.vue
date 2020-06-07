<template>
  <div class="page-error">
    <div class>
      <section class="inner-content">
        <div class="page-logo">
          <app-logo />
        </div>
        <div>
          <h1 class="heading">404</h1>
          <p class="subheading">Looks like the page you were looking for is no longer here.</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "Page-Not-Found",
  created() {
    console.log(this.$route);
  }
};
</script>

<style lang="scss" scoped>
@import "../../lib/style/__variable.scss";
.page-error {
  &:before {
    background-image: url(/assets/images/404/error-cone.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center top;
    filter: grayscale(20%);
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
}
.inner-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background: rgba(250, 250, 250, 0.25);
  box-shadow: inset 0 -150px 240px 200px rgb(255, 255, 255);
  align-items: center;
  justify-content: center;
  padding: 60px 15px;
}
.heading {
  line-height: 0.9;
  letter-spacing: -0.061em;
  font-style: normal;
  font-size: 10rem;
  font-weight: 900;
  text-align: center;
  color: $black;
  margin: 15px;
  padding: 0;
}
.subheading {
  letter-spacing: 0.039em;
  text-align: center;
  line-height: 32px;
  font-size: 16px;
  padding: 12px 14px;
  background: #fff;
}
.page-logo {
  position: absolute;
  bottom: 14px;
  display: flex;
  justify-content: center;
  margin: 0 auto;
}
</style>
