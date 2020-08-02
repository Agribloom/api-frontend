<template>
    <div>
        <div class="bg-white p-3">
            <div v-if="loading">
                <nomsg-spinner/>
            </div>

            <!--If user data has been retrieved-->
            <div v-else >
				<div class="contact-initial">
					{{initial}}
				</div>
                <div class="content">
                    <span class="name">{{user.username}}</span>
                    <div class="meta">
                        <div class="meta-item">
                            <div class="email">
                                <i class="la la-envelope"></i>
                                {{user.email}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
			<router-link :to="{name:'profile'}"
						 :class="{cbtn: true, 'danger': !completeProfile}">
				<template v-if="completeProfile">
					<i class="la la-edit"></i>
					Edit profile
				</template>
				<template v-else>Complete profile</template>
			</router-link>

		</div>
    </div>
</template>

<script>
    import mixin from '@/mixin'
    import {mapGetters} from 'vuex'

    export default {
        name: 'User-Card',
        mixins: [mixin],
        computed: {
            ...mapGetters('user', {
                user: 'data',
                loading: 'loading'

            }),
            initial() {
                try {
                    return this.user !== undefined ? [this.user.first_name, this.user.last_name]
                        .map(elem => elem[0]).join(' ') : ''
                } catch (e) {
                    console.log(e)
                }
            },
            completeProfile() {
                return this.user.first_name && this.user.last_name
            },
            isLoading() {
                return this.$store.getters.isDataLoading
            }
        }
    }
</script>

<style scoped lang="scss">
	@import "../../lib/style/__variable.scss";

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
	.contact-initial {
		font-weight: 600;
		font-size: 71px;
		color: $gray-300;
		line-height: 1;
		padding: 7px 0;
	}
	.content {
		width: 100%;
		padding: 7px 0;

		.name {
			margin-bottom: 14px;
			font-size: 20px;
			line-height: 1;
		}

		.meta {
			margin-bottom: 15px;

			.meta-item {
				margin: 0 0 2px;
				line-height: 1.25;
				color: $light-typo;
				font-size: .85em;
				display: block;

				span {
					align-items: baseline;
					display: flex;

					i {
						margin-right: 4px;
					}
				}
			}
		}

	}

</style>
