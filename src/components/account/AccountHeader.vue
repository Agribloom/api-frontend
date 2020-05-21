<template>
  <nav>
    <div class="mobile-logo">
      <div class="account-navbar-logo">
        <app-logo />
      </div>
    </div>
    <div class="fixed-account-navbar anim">
      <div class="account-navbar-horizontal anim">
        <div class="account-navbar">
          <div class="offset">
            <div class="account-navbar-brand display-alt anim">
              <div class="account-navbar-logo">
                <app-logo />
              </div>
            </div>
          </div>
          <div class="account-navbar-left">
            <ul class="account-navbar-link">
              <li @click="toggleSidebar" class="account-navbar-link-item" id="toggle-sidebar">
                <a class="anim">
                  <i
                    :class="['la', 'la-lg', $parent.sidebar
					? 'la-compress-arrows-alt'
					 : 'la-expand-arrows-alt' ]"
                  ></i>
                </a>
              </li>
              <li
                @click="toggleSidebarAlt"
                class="account-navbar-link-item"
                id="toggle-sidebar-alt"
              >
                <a class="anim">
                  <i
                    :class="['la', 'la-lg', $parent.sidebarAlt ?  'la-expand-arrows-alt': 'la-compress-arrows-alt' ]"
                  ></i>
                </a>
              </li>
            </ul>
          </div>
          <div class="account-navbar-right">
            <ul class="account-navbar-link">
              <li class="account-navbar-link-item">
                <router-link :to="{name: 'notification'}">
                  <i class="la la-bell-o"></i>
                  <span v-show="notificationCount" class="badge badge-primary">{{notificationCount}}</span>
                </router-link>
              </li>
              <li class="account-navbar-link-item">
                <a
                  @click.stop="$emit('refreshData')"
                  class="cursor-pointer"
                  title="refresh content"
                >
                  <i class="la la-refresh"></i>&nbsp;
                </a>
              </li>
              <li class="account-navbar-link-item">
                <div @click.stop="signOut" class="cursor-pointer cbtn m-0 danger">Signout</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
    name: 'AccountHeader',
    methods: {
        signOut () {
            this.$emit('signOut')
        },
        toggleSidebar () {
            this.$emit('toggleSidebar')
        },
        toggleSidebarAlt () {
            this.$emit('toggleSidebarAlt')
        }
    },
    computed: {
        notificationCount () {
            return 0
        }
    }
}
</script>
