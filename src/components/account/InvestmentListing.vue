<template>
  <div class="account-card shade">
    <div class="card-header">
      <div>{{ title }}</div>
    </div>

    <div class="card-body">
      <template>
        <alert-item
          fontIcon="las la-piggy-bank"
          v-if="!hasInvestment"
          :messages="'You have not made any Investments yet'"
          :title="'Nothing Found!'"
        ></alert-item>
        <data-table
          v-else
          :editable="editable"
          :controls="controls"
          :data="investments.results"
          :fields="fields"
          :pagination="pagination"
          sort_key="transaction_id"
          ref="data-table"
        ></data-table>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import mixin from "@/mixin";

export default {
  name: "FarmInvestments",
  data() {
    return {
      title: "Farm Investments",
      fields: [
        {
          name: "transaction_id",
          label: "ID",
          sortable: true,
          type: "string"
        },
        {
          name: "units",
          label: "Units",
          sortable: true,
          type: "string"
        },
        {
          name: "amount",
          label: "Amount",
          sortable: true,
          type: "number"
        },
        {
          name: "created",
          label: "Date",
          sortable: true,
          type: "date"
        }
      ],
      pagination: true,
      controls: true,
      editable: false
    };
  },
  mixins: [mixin],
  computed: {
    ...mapGetters("user", {
      investments: "allInvestments"
    }),
    hasInvestment() {
      return this.investments !== undefined;
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped></style>
