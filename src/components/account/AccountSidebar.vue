<template>
    <nav>
        <!--Fixed Bottom Horizontal sidebar-->
        <aside class="account-tab-horizontal">
            <ul class="account-navbar-link">
                <li :class="{active: link.name===active}"
                    :title="link.name | capitalize"
                    class="account-navbar-link-item"
                    v-for="(link,index) in links"
                    :key="`${userGroup}-${link}-${index}`"
                >
                    <router-link :to="{name: link.name}">
                      <span>
                        <i :class="link.icon" class="icon"></i>
                      </span>
                    </router-link>
                </li>
            </ul>
        </aside>
        <!--End-->

        <!--Left Vertical sidebar-->
        <aside class="account-tab-vertical anim">
            <div class="account-navbar">
                <div class>
                    <div class="account-navbar-brand">
                        <div class="account-navbar-logo">
                            <app-logo/>
                        </div>
                    </div>
                </div>
                <div class="account-tab">
                    <ul class="account-navbar-link">
                        <li :key="`link-${link.name}`"
                            :class="['account-navbar-link-item', {active: link.name===active}]"
                            v-for="link in links">
                            <router-link :to="{name: link.name}">
                              <span>
                                <i :class="link.icon" class="icon"></i>
                              </span>
                                {{link.title | capitalize}}
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </aside>
        <!--End-->
    </nav>
</template>

<script>
	import mixin from '@/mixin'

	export default {
		name: 'AccountSidebar',
		props: {
			links: {
				type: Array,
				required: true
			},
			userGroup: {
				default: 'account',
				type: String,
				required: true
			}
		},
		mixins: [ mixin ],
		data() {
			return {}
		},
		components: {},
		computed: {
			active() {
				return this.$route.name
			}
		}
	}
</script>

<style scoped>
</style>
