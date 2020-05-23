<template>
	<div>
		<div class>
			<div v-if="loading">
				<nomsg-spinner/>
			</div>

			<!--If user data has been retrieved-->
			<div v-else class="contact-card">
				<div class="thumb">
					<div class="contact-initial">
						{{initial}}
					</div>
				</div>
				<div class="content">
					<span class="name">{{user.username}}</span>
					<div class="meta">
						<div class="meta-item">
              <span class="email">
                <i class="la la-envelope"></i>
                {{user.email}}
              </span>
						</div>
					</div>
				</div>
			</div>

		</div>
		<div class="d-flex justify-content-end">
			<div>
				<router-link :to="{name:'profile'}" :class="{cbtn: true, 'danger': !completeProfile}">
					<template v-if="completeProfile">
						<i class="la la-edit"></i>
						Edit profile
					</template>
					<template v-else>Complete profile</template>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import mixin from '@/mixin'
import { mapGetters } from 'vuex'

export default {
    name: 'User-Card',
    mixins: [mixin],
    computed: {
        ...mapGetters('user', {
            user: 'data',
            loading: 'loading'

        }),
        initial () {
            try {
                return this.user !== undefined ? [this.user.first_name, this.user.last_name]
                    .map(elem => elem[0]).join(' ') : ''
            } catch (e) {
                console.log(e)
            }
        },
        completeProfile () {
            return this.user.first_name && this.user.last_name
        },
        isLoading () {
            return this.$store.getters.isDataLoading
        }
    }
}
</script>

<style scoped lang="scss">
	.contact-card {
		overflow: hidden;
		position: relative;
		display: block;
		background: #000;

		.meta-item {
			word-break: normal;
			white-space: nowrap;
			text-overflow: ellipsis;
			width: 100%;
			padding: 0 15px;
		}
	}
</style>
