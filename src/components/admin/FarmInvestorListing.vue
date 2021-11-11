<template>
    <div class="listing-container">
        <div >
            <div class="card my-2">
                <div class="card-header">
                    <h5>
                        <i class="la la-check-circle text-primary "></i>
                        Confirm payment</h5>
                </div>
                <div class="card-body">
                    <p>Please confirm that you agree to pay the following investors listed below</p>
                    <div class="custom-control custom-checkbox my-3">
                        <input class="custom-control-input"
                               id="acknowledgement-checkbox"
                               ref="accept-terms"
                               type="checkbox"
                               v-model="accepted"/>
                        <label class="custom-control-label hint text-sm"
                               for="acknowledgement-checkbox">

                            I agree</label>
                    </div>
                </div>
            </div>

            <div v-if="!loading && accepted" class="d-flex justify-content-end">
                <button class="btn primary" @click.stop="confirmPayment">Confirm Payment</button>
            </div>
            <nomsg-spinner v-if="loading"/>

            <div class="card my-2" v-else>
                <div class="card-header">
                    <h5>Investors</h5>
                </div>
                <div class="card-body p-1">
                    <ul class="investors">
                        <li class="investor-card" v-for="n in 20">
                            <div class="mr-auto meta-author">
                                <figure class="meta-avatar">
                                    <!--                                <img class="user-icon media-icon" src="" alt="">-->
                                    <i class="la la-user media-icon"></i>
                                </figure>
                                <div class="meta">
                                    <span class="d-block text-primary">{Name}</span>
                                    <small class="d-block hint">Invested in {Date}</small>
                                </div>
                            </div>
                            <div class="investment">
                                <div class="invested">
                                    <small class="d-block">Invested</small>
                                    <strong class="text-primary text-lg">2000</strong>
                                </div>
                                <div class="invested">
                                    <small class="d-block">Return</small>
                                    <strong>{{50000}}</strong>
                                </div>
                            </div>
                            <div class="action">
                                <i class="la la-close"></i>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div v-if="!loading && accepted" class="d-flex justify-content-end">
                <button class="btn primary" @click.stop="confirmPayment">Confirm Payment</button>
            </div>
        </div>
    </div>
</template>

<script>
	import mixin from '@/mixin';

	export default {
		name: "ConfirmInvestor",
		data() {
			return {
				completed: true,
				accepted: false,
				loading: false
			}
		},
		mixins: [ mixin ],
		methods: {
			confirmPayment() {
				this.loading = true;
				setTimeout( () => {
					let message = `Payment made successfully`;
					this.toastrAdd( 'Success', message, 'success' );
									message = `Payment could not complete.`;
									this.toastrAdd( 'Encountered Error', message, 'error' );
					this.$emit( 'done' );
					this.loading = false
				}, 5000 )
			}
		}
	}
</script>

<style scoped lang="scss">
    @import "../../lib/style/auth-form";

    .listing-container {
        background: #f6f6f6;
        position: relative;
        display: block;
        overflow-x: hidden;
        padding: 30px 16px;

        .investors {
            display: block;
            position: relative;

            .investor-card {
                background: #fff;
                display: flex;
                width: 100%;
                justify-content: space-between;
                position: relative;

                &:not(:first-child) {
                    border-top: 1px solid #f2f2f2;
                }

                overflow: hidden;

                &:hover {
                    background: transparentize($primary, .98);
                }

                .meta-author {
                    padding: 8px 8px;
                    display: flex;
                    overflow: hidden;


                    .meta-avatar {
                        width: 45px;
                        height: 45px;
                        background: #f2f2f2;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        -webkit-border-radius: 50%;
                        -moz-border-radius: 50%;
                        border-radius: 50%;
                        margin-right: 16px;
                        border: 1px solid #e6e6e6;
                        padding: 2px;
                        flex: 1 0 auto;

                        .media-icon {
                            width: 35px;
                            height: 35px;
                            display: block;
                            margin: 0 auto;
                            font-size: 35px;
                            object-position: center;
                            object-fit: cover;
                        }
                    }

                    .meta {
                        small {
                            margin-bottom: 0;
                            line-height: 1.25;
                            -ms-text-overflow: ellipsis;
                            text-overflow: ellipsis;
                            white-space: wrap;
                        }
                    }
                }

                .investment {
                    padding: 8px 16px;
                    display: flex;

                    .invested {
                        margin-right: 16px;

                        small {
                            color: #acacac;
                        }

                        strong {
                            color: $primary;
                            font-size: 18px;
                            font-weight: 600;
                        }
                    }
                }

                .action {
                    position: absolute;
                    top: 0;
                    right: 4px;
                    padding: 4px;
                    cursor: pointer;

                    &:hover {
                        background: #f2f2f2;
                    }
                }
            }
        }
    }
</style>
