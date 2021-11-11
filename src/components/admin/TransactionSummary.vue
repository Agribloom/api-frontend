<template>
    <div class="">
        <h5 class="mb-4">{{title}}</h5>
        <div class="metric">
            <div class="metric-text">
                {{total}}
            </div>
            <div class="facts">
                <span><span>{{complete}}</span>Completed</span>
                <span><span>{{incomplete}}</span>Incomplete</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Transaction-Summary',
    data () {
        return {
            title: 'Transaction History'
        }
    },
    computed: {
        transactions () {
            let result = []
            try {
                result = this.$store.getters.getUserTransactions
            } catch (e) {
                result = []
            }
            return result
        },
        total () {
            return this.transactions.count
        },
        complete () {
            return 0
        },
        incomplete () {
            return 0
        }
    }
}
</script>

<style scoped>

</style>
