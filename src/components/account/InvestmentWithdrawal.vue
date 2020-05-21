<template>
	<div>
		<div class="alert-card">
			<div class="alert-card-content">
				<h5><strong class="new">New!</strong>Make a withdrawals</h5>
				<p class="hint">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita,</p>
			</div>
			<div class="alert-card-button">
				<button class="cursor-pointer cbtn m-0 secondary">
					Make withdrawal
				</button>
			</div>
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
		background:mix(hsl(117, 52%, 44%), white, 15) ;
		display: flex;
		padding: 7px 10px;
		-webkit-box-shadow: 0 7px 12px #000;
		-moz-box-shadow: 0 7px 12px #000;
		box-shadow: 0 9px 9px -7px mix(hsl(117, 52%, 44%), white, 45);
		border: 1px solid mix(hsl(117, 52%, 44%), white, 30);
		-webkit-border-radius: 4px;
		-moz-border-radius: 4px;
		border-radius: 4px;
		flex-wrap: wrap;
		.alert-card-content {
			flex: 1 1 70%;
			box-sizing: border-box;
			.hint{
				font-size: .75em !important
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
