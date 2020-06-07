<template>
  <div :class="classes" id="account">
    <account-header
      @refreshData="fetchData"
      @signOut="signOut"
      @toggleSidebar="toggleSidebar"
      @toggleSidebarAlt="toggleSidebarAlt"
    />
    <account-sidebar />
    <main>
      <div class="account-body-wrapper offset anim">
        <div class="container" v-if="hasGlobalErrors">
          <alert-item :messages="globalErrors">
            <div @click="fetchData" class="cbtn">
              <i class="la la-refresh icon"></i>&nbsp;
              <span>Try again</span>
            </div>
          </alert-item>
        </div>
        <div v-else class="padding-bt">
          <router-view v-if="auth"></router-view>
        </div>
        <copyright-item />
      </div>

      <div class="faq-bubble">
        <router-link :to="{name:'faq'}">
          <i class="la la-question-circle ic"></i> FAQ
        </router-link>
      </div>
    </main>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'Account',
    data () {
        return {
            sidebar: false,
            sidebarAlt: false
        }
    },
    mounted () {
        this.fetchData()
    },
    methods: {
        ...mapActions('user', ['unsetToken', 'fetchData']),
        signOut () {
            window.axios
                .post('auth/logout/')
                .then(() => {
                    this.unsetToken()
                    this.$router.push('/sign-in')
                })
                .catch(e => {
                    console.log(e.message)
                })
        },
        toggleSidebar () {
            this.sidebar = !this.sidebar
        },
        toggleSidebarAlt () {
            this.sidebarAlt = !this.sidebarAlt
        }
    },
    computed: {
        ...mapGetters('user', {
            user: 'data',
            auth: 'auth'
        }),
      ...mapGetters({
        state: 'getState'
      }),
        globalErrors () {
            return this.$store.getters.getErrors
        },
        hasGlobalErrors () {
            return this.$store.getters.getErrors.length
        },
        classes () {
            return {
                fullscreen: this.sidebar,
                'fullscreen-alt': this.sidebarAlt
            }
        }
    }
}
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
