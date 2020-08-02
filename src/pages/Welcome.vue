<template>
  <div id="welcome">
    <search-modal ref="searchModal" />
    <page-header @toggleSearch="onToggleSearch" v-if="hasHeader" />
    <router-view></router-view>
    <page-footer v-if="hasFooter" />
  </div>
</template>
<script>

require('../lib/script/libraries');
require('../lib/style/app.scss');
const HeaderFooterComponents = [
    'home',
    'farms',
    'farm',
    'about',
    'contact',
    'career',
    'faq',
    'terms-of-service',
    'terms-of-sponsorship',
    'privacy'
];
$(function () {
  window.$('[data-toggle="tooltip"]').tooltip()
})
export default {
    name: 'Welcome',
    data () {
        return {
            includeHeader: HeaderFooterComponents,
            includeFooter: HeaderFooterComponents,
            route: this.$route.name
        }
    },
    computed: {
        hasHeader () {
            return this.includeHeader.indexOf(this.$route.name) >= 0
        },
        hasFooter () {
            return this.includeFooter.indexOf(this.$route.name) >= 0
        }
    },
    methods: {
        onToggleSearch () {
            this.$refs.searchModal.toggleShow()
        }
    }
}
</script>

<style scoped lang="scss">
</style>
