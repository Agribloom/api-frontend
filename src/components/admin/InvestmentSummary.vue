<template>
    <div class="metric-card" v-if="investments">
        <div class="metric">
            <div class="metric-text">
                <div class="summary">
                    <div class="chart"></div>
                    <div>
                        <div class="value">
                            <small class="unicode naira" title="total"></small>
                            {{total | numerate}}
                        </div>
                        <div class="text">Total Investments</div>
                    </div>
                </div>
            </div>
            <div class="facts">
                <div class="fact-item"  v-if="highest!= undefined">
                    <span>
                        <small class="unicode naira" title="highest"></small>
                        {{highest.amount | numerate}}
                    </span>
                    Highest
                </div>
                <div class="fact-item"  v-if="lowest != undefined">
                  <span>
                    <small class="unicode naira" title="lowest"></small>
                    {{lowest.amount | numerate}}
                  </span>Least
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import mixin from "@/mixin";

    export default {
        name: "InvestmentSummary",
        data() {
            return {
                title: "Investments"
            };
        },
        mixins: [mixin],
        computed: {
            ...mapGetters("user", {
                investments: "allInvestments",
                total: "totalInvestment",
                highest: "highestInvestment",
                lowest: "lowestInvestment"
            })
        },
        methods: {}
    };
</script>

<style scoped>
</style>
