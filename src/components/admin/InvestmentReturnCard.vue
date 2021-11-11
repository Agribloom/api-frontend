<template>
    <div>
        <div class="alert-card">
            <div class="alert-card-content">
                <h5>
                    Pay Investors
                </h5>
                <strong class="new">New!</strong>
                <p class="hint">
                    You can now pay your investors at once with just the click of a button</p>
            </div>
            <div class="alert-card-button">
                <button @click.stop="confirmPayment" class="cursor-pointer cbtn  m-0 secondary">
                    Pay Investors
                </button>
            </div>
        </div>
        <div class="list">
            <router-link :to="{name:'admin-users-manage'}">Manage your Investors</router-link>
        </div>

        <modal-component ref="confirmPaymentModal">
            <farm-investor-listing @done="closeModal"></farm-investor-listing>
        </modal-component>
    </div>
</template>

<script>
	export default {
		name: 'InvestorPayment',
		methods: {
			confirmPayment() {
				let modal = this.$refs['confirmPaymentModal']
				modal.modalOpen();
			},
			closeModal() {
				let modal = this.$refs['confirmPaymentModal']
				modal.modalClose();
			}
		}
	}
</script>

<style scoped lang="scss">
    .alert-card {
        margin-bottom: 15px;
        background: hsla(117, 52%, 44%, 1);
        display: flex;
        padding: 7px 10px;
        -webkit-box-shadow: 0 7px 12px #000;
        -moz-box-shadow: 0 7px 12px #000;
        box-shadow: 0 9px 9px -7px mix(hsl(117, 52%, 44%), white, 45);
        border: 2px solid hsl(117, 52%, 44%);
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        flex-wrap: wrap;

        .alert-card-content {
            color: hsl(117, 52%, 100%);

            h5 {
                font-size: 32px;
                display: flex;

                .new {
                    font-size: 18px;
                    align-items: center;
                    margin-right: 8px;
                }
            }

            flex: 1 1 70%;
            box-sizing: border-box;

            .hint {
                font-size: 1em !important;
                color: #f1f1f1;
            }

            padding: 7px;

        }

        .alert-card-button {
            padding: 7px;
            display: flex;
            justify-content: flex-end;
            flex: auto;
            margin: 0 auto auto;
        }
    }

    .list {
        background: #d1f8a1;
        padding: 8px 16px;

        a {
            text-decoration: underline;
        }
    }
</style>
