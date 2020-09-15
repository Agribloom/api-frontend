<template>
  <div>Admin</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Account",
  data() {
    return {
      sidebar: false,
      sidebarAlt: false,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    ...mapActions("user", ["unsetToken", "fetchData"]),
    signOut() {
      window.axios
        .post("auth/logout/")
        .then(() => {
          this.unsetToken();
          this.$router.push("/sign-in");
        })
        .catch((e) => {
          console.log(e.message);
        });
    },
    toggleSidebar() {
      this.sidebar = !this.sidebar;
    },
    toggleSidebarAlt() {
      this.sidebarAlt = !this.sidebarAlt;
    },
  },
  computed: {
    ...mapGetters("user", {
      user: "data",
      auth: "auth",
    }),
    ...mapGetters({
      state: "getState",
    }),
    globalErrors() {
      return this.$store.getters.getErrors;
    },
    hasGlobalErrors() {
      return this.$store.getters.getErrors.length;
    },
    classes() {
      return {
        fullscreen: this.sidebar,
        "fullscreen-alt": this.sidebarAlt,
      };
    },
  },
};
</script>

<style lang="scss">
@import "../../lib/style/account/app.scss";

.label {
  display: block;
  letter-spacing: 0.5pt;
  margin-bottom: 0;
  color: rgb(119, 119, 119);
}
</style>