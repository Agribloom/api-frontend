<template>
  <div class="top-nav">
    <!-- mobile menu start -->
    <div class="mobile-menu d-mobile ">
      <nav class="mobile-header primary-menu d-xl-none">
        <div class="header-logo">
          <app-logo />
        </div>
        <div class="header-bar" ref="header-bar">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
      <nav class="menu" ref="mobile-menu">
        <div class="mobile-menu-area d-xl-none">
          <div class="mobile-menu-area-inner" id="scrollbar">
            <ul class="m-menu">
              <li v-if="!isAuth" @click="closeMobileMenu">
                <router-link :to="{name: 'home'}">Home</router-link>
              </li>
              <li v-else>
                <router-link :to="{name: 'dashboard'}" class="cursor-pointer text-bold">
                  <i class="la la-dashboard"></i> Dashboard
                </router-link>
              </li>
              <li @click="closeMobileMenu">
                <router-link :to="{name: 'farms'}">Our Farms</router-link>
              </li>
              <li @click="closeMobileMenu">
                <router-link :to="{name: 'career'}">Careers</router-link>
              </li>
              <li @click="closeMobileMenu">
                <router-link :to="{name: 'about'}">About</router-link>
                <ul>
                  <li>
                    <router-link :to="{name: 'faq'}">FAQ</router-link>
                  </li>
                </ul>
              </li>
              <li @click="closeMobileMenu">
                <router-link :to="{name: 'contact'}">Contact</router-link>
              </li>
              <li v-if="!isAuth" @click="closeMobileMenu">
                <router-link :to="{name: 'sign-in'}">Sign in</router-link>
              </li>
              <li v-if="!isAuth" @click="closeMobileMenu">
                <auth-button :special="true" :links="authData"></auth-button>
              </li>
            </ul>
            <ul class="social-link-list d-flex flex-wrap">
              <li>
                <a href="http://www.twitter.com/agribloom">
                  <i class="fab fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="http://www.facebook.com/agribloom">
                  <i class="fab fa-facebook-f"></i>
                </a>
              </li>
              <li>
                <a href="http://www.linkedin.com/company/agribloom">
                  <i class="fab fa-linkedin-in"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    <!-- mobile menu ending -->
    <!-- header section start -->
    <header class="header-section d-xl-block d-none">
      <div class="header-area">
        <div class="logo">
          <app-logo />
        </div>
        <div class="main-menu d-none d-xl-block">
          <div class="top">
            <ul class="left">
              <li>
                <span class="icon">
                  <i class="la la-phone"></i>
                </span> +(234) (0) 8157782822
              </li>
              <li>
                <span class="icon">
                  <i class="la la-map-marker"></i>
                </span>Akwa Ibom
              </li>
            </ul>
            <ul class="right">
              <li>
                <a href="http://www.twitter.com/agribloom">
                  <i class="fab fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="http://www.facebook.com/agribloom">
                  <i class="fab fa-facebook-f"></i>
                </a>
              </li>
              <li>
                <a href="http://www.linkedin.com/company/agribloom">
                  <i class="fab fa-linkedin-in"></i>
                </a>
              </li>
            </ul>
          </div>

          <ul class="menu">
            <li v-if="!isAuth">
              <router-link :to="{name: 'home'}">Home</router-link>
            </li>
            <li v-else>
              <router-link :to="{name: 'dashboard'}" class="cursor-pointer text-bold">Dashboard</router-link>
            </li>
            <li>
              <router-link :to="{name: 'farms'}">Our Farms</router-link>
            </li>
            <li>
              <router-link :to="{name: 'career'}">Careers</router-link>
            </li>
            <li>
              <router-link :to="{name: 'about'}">About</router-link>
              <ul>
                <li>
                  <router-link :to="{name: 'faq'}">FAQ</router-link>
                </li>
              </ul>
            </li>

            <li>
              <router-link :to="{name: 'contact'}">Contact</router-link>
            </li>
            <li v-if="!isAuth">
              <router-link :to="{name: 'sign-in'}">Sign in</router-link>
            </li>

            <li>
              <auth-button v-if="!isAuth" :links="authData"></auth-button>
            </li>
          </ul>
        </div>
      </div>
    </header>
    <!-- header section ending -->
  </div>
</template>

<script>
import mixin from "@/mixin";

export default {
  name: "PageTopNavigationBar",
  mixins: [mixin],
  data: function() {
    return {};
  },
  computed: {
    isAuth() {
      return localStorage.getItem("token");
    },
    authData() {
      return [
        {
          to: "/sign-up",
          name: "sign-up",
          text: "Sign up"
        }
      ];
    }
  },
  methods: {
    closeMobileMenu() {
      this.$refs["mobile-menu"].classList.remove("open");
      this.$refs["header-bar"].classList.remove("close");
    },
    toggleSearch() {
      this.$emit("toggleSearch");
    }
  }
};
</script>
<style>
  .top-nav{
  }
</style>
