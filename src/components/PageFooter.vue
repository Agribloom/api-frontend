<template>
  <div>
    <!-- footer section start here -->
    <footer class="footer-section">
      <div class="footer-top">
        <div class="container">
          <div class="bottom row justify-content-start">
            <div class="col-xl-4 col-lg-6 col-12">
              <div class="bottom-item">
                <div class="footer-logo">
                  <app-logo type="white" />
                </div>
                <p style="color: #ccc" class="mt-4">
                  Africa’s most preferred supplier of fruits and vegetables to
                  retail outlet and
                  agro-processing companies.
                </p>
              </div>
            </div>

            <div class="col-xl-4 col-lg-6 col-12">
              <div class="bottom-item">
                <h4>Navigation</h4>
                <ul class="nav-list-group">
                  <li class="nav-list-group-item">
                    <router-link to="about">About</router-link>
                  </li>
                  <li class="nav-list-group-item" v-if="isAuth">
                    <router-link :to="{name: 'dashboard'}">Dashboard</router-link>
                  </li>
                  <li class="nav-list-group-item">
                    <router-link :to="{name: 'career'}">Career</router-link>
                  </li>
                  <li class="nav-list-group-item">
                    <router-link :to="{name: 'terms-of-service'}">Terms of use</router-link>
                  </li>
                  <li class="nav-list-group-item">
                    <router-link :to="{name: 'privacy'}">Privacy policy</router-link>
                  </li>
                  <li class="nav-list-group-item">
                    <router-link :to="{name: 'terms-of-sponsorship'}">Terms of Sponsorship</router-link>
                  </li>
                   <li class="nav-list-group-item">
                    <a href="/sitemap.xml">Site map</a>
                  </li>
                </ul>
              </div>
            </div>

            <div class="col-xl-4 col-lg-6 col-12">
              <div class="bottom-item">
                <h4>Follow Us</h4>
                <div class="d-flex">
                  <ul class="right mt-4">
                    <li>
                      <a class="facebook" href="http://www.facebook.com/agribloom">
                        <i class="fab fa-facebook-f"></i>
                      </a>
                    </li>
                    <li>
                      <a class="twitter" href="http://www.twitter.com/agribloom">
                        <i class="fab fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a class="linkedin" href="http://www.linkedin.com/company/agribloom">
                        <i class="fab fa-linkedin-in"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <copyright-item />
      </div>
    </footer>
    <!-- footer section end here -->
  </div>
</template>

<script>
import mixin from '@/mixin'

export default {
    name: 'Footer',
    mixins: [mixin],
    data: function () {
        return {}
    },
    computed: {
        isAuth () {
            return localStorage.getItem('token')
        },
        authData () {
            return [
                {
                    to: '/sign-in',
                    name: 'sign-in',
                    text: 'Sign in'
                },
                {
                    to: '/sign-up',
                    name: 'sign-up',
                    classes: 'shout',
                    text: 'Sign up'
                }
            ]
        }
    }
}
</script>
<style lang="scss">
.nav-list-group {
  display: block;
  position: relative;
  padding: 15px 0;
  .nav-list-group-item {
    display: block;
    padding: 4px 7px;
    margin: 0;
    width: 100%;
    position: relative;
    color: #fff;
    overflow: hidden;

    &:hover {
      &:after {
        border-color: white;
      }
    }

    a {
      color: currentColor;
    }
  }
}
</style>
