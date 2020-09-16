<template>
    <div>
        <div class="alert-card">
            <div class="alert-card-content">
                <h5>
                    <strong class="new">New!</strong>
                    Make a withdrawals
                </h5>
                <p class="hint">You can now pay your investors at once with just a click on a button</p>
            </div>
            <div class="alert-card-button">
                <button class="cursor-pointer cbtn  m-0 primary">
                    Pay Investors
                </button>
            </div>
        </div>
		<div class="p-2">
			<router-link :to="{name:'admin-users-manage'}">Manage your Investors</router-link>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'InvestmentWithdrawal'
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
				.new{
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
</style>
