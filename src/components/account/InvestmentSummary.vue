<template>
	<div class="metric-card">
		<div class="metric">
			<div class="metric-text">
				<small class="unicode naira" title="total"></small>{{investments.total | numerate}}
				<div class="small">
					Total Investments
				</div>
			</div>
			<div class="facts">
				<div class="fact-item">
                    <span>
                        <small class="unicode naira" title="highest"></small>
                        {{investments.highest | numerate}}
                    </span>Highest
				</div>
				<div class="fact-item">
                        <span>
                            <small class="unicode naira" title="lowest"></small>
                            {{investments.lowest | numerate}}
                        </span>Least
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import mixin from '@/mixin'

export default {
    name: 'InvestmentSummary',
    data () {
        return {
            title: 'Investments'
        }
    },
    mixins: [mixin],
    computed: {
        ...mapGetters('user', {
            investments: 'investments'

        })
    },
    methods: {}
}
</script>

<style scoped>

</style>
