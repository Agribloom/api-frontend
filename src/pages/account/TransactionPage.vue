<template>
    <div class="container">
        <div class="content-header-left col-md-8 col-12 breadcrumb-new">
            <div class="row">
                <h3 class="content-header-title">Transactions</h3>
                <div class="breadcrumb-wrapper col-12">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <router-link :to="{ name: 'dashboard' }">Dashboard</router-link>
                        </li>
                        <li class="breadcrumb-item active">Transactions</li>
                    </ol>
                </div>
            </div>
        </div>
        <div>
            <div>
                <h3 class="intro right">
                    Welcome,
                    <strong>{{user.username}}</strong>
                </h3>
            </div>

            <div class="row" >
                <div class="col-md-12">
                    <data-table
                            :editable="editable"
                            :controls="controls"
                            :data="transactions"
                            :fields="fields"
                            :pagination="pagination"
                            ref="data-table"
                    ></data-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "Account-Transactions",
        data() {
            return {
                fields: [
                    {
                        name: "farm",
                        label: "Farm",
                        sortable: false,
                        type: "object",
                        route: true,
                        routePattern: ["slug", "id"],
                        content: "name"
                    },
                    {
                        name: "amount",
                        label: "Amount",
                        sortable: true,
                        type: "number"
                    },
                    {
                        name: "transaction_type",
                        label: "Type",
                        sortable: true,
                        type: "string"
                    },
                    {
                        name: "status",
                        label: "Status",
                        format: "",
                        sortable: true,
                        type: "string",
                        classes: "status-badge"
                    },
                    {
                        name: "created",
                        label: "Date",
                        format: "",
                        sortable: true,
                        type: "date"
                    }
                ],
                api: "auth/transactions",
                pagination: true,
                controls: true,
                errors: [],
                editable: false,
            };
        },
        computed: {
            ...mapGetters("user", {
                transactions: "transactions",
                user: "data"
            })
        }
    };
</script>
