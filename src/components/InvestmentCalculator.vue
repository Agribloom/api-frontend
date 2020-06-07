<template>
    <div>
        <div class="custom-invest">
            <div class="pane ">
                <h3 class="header">Investment Calculator</h3>
            </div>
            <div class="pane">
                <div class="left-section">
                    <div class="label">
                        Currency
                    </div>
                </div>
                <div class="right-section">
                    <div class="">
                        <label for="amt_currency" class="screen-reader-text">Currency</label>
                        <select id="amt_currency" name="amount_currency" @change="setCurrency">
                            <option value>Currency</option>
                            <option
                                    :key="currency.abr + currency.rate"
                                    :value="currency.abbr"
                                    :selected="currency.default"
                                    v-for="currency in currencies"
                            >{{currency.name}}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="pane">
                <div class="left-section">
                    <div class="label">
                        Unit(s) allowed
                    </div>
                </div>
                <div class="right-section">
                    <div class="hint">
                        Maximum units allowed
                        <i class="fa fa-question-circle"></i>
                    </div>
                    <div class="value"><strong>{{allowedUnits }}</strong></div>
                </div>
            </div>
            <div class="pane">
                <div class="left-section">
                    <div class="label">
                        Unit(s)
                    </div>
                </div>
                <div class="right-section">
                    <div class="hint">
                        Unit(s) to purchase
                        <i class="fa fa-question-circle"></i>

                    </div>
                    <div class="">
                        <div class="incrementor">
                            <div @click="decreaseValue" class=" trigger">-</div>
                            <div class="display">
                                <label class="sr-only" for="unit">
                                    Enter the number of units you wish to
                                    buy</label>
                                <input
                                        id="unit"
                                        name="unit"
                                        placeholder="Enter the number of units you wish to buy"
                                        type="text"
                                        v-model="unit_value"
                                />
                            </div>
                            <div @click="increaseValue" class=" trigger">+</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pane">
                <div class="left-section">
                    <div class="label">
                        Cost
                    </div>
                </div>
                <div class="right-section">
                    <div class="value"><span class="unicode naira">{{computedPrice | numerate}}</span></div>
                </div>
            </div>
            <div class="pane">
                <div class="left-section">
                    <div class="label">
                        ROI
                    </div>
                </div>
                <div class="right-section">
                    <div class="hint">Return on investment
                        <i class="fa fa-question-circle"></i>
                    </div>
                    <div class="value"><span class="unicode naira">{{calcRoi | numerate}}</span></div>
                </div>
            </div>
            <div class="pane">
                <div class="d-block" style="width: 100%">
                    <div v-if="isAuth" class="w-full">
                        <paystack
                                class="cbtn d-flex justify-content-center primary lg w-full"
                                :amount="computedPrice * 100"
                                :email="user.email || ''"
                                :paystackkey="payment.paystack.key"
                                :callback="paystackCallback"
                                :close="closePaymentModal"
                                :reference="''"
                                :embed="payment.paystack.embed"
                        >Invest
                        </paystack>
                    </div>
                    <div class="w-full" v-else>
                        <router-link
                                :to="{name: 'sign-in', params: {nextUrl: fullPath}}"
                                class="cbtn d-flex justify-content-center primary lg"
                        >
                            <i class="la la-sign-in"></i>Invest
                        </router-link>
                    </div>
                    <div class="m-2 d-block" style="text-align: center">
                        <p style="font-size: 12px; line-height:1">
                            By investing, you agree to the
                            <router-link :to="{name: 'terms-of-sponsorship'}">Terms of sponsorship</router-link>
                        </p>
                    </div>
                </div>
            </div>


            <!-- <div class="slip">
                 <div class="label">
                     Price
                     <label class="sr-only" for="amt_currency">Currency</label>
                     <select id="amt_currency" name="amount_currency" @change="setCurrency">
                         <option value>Currency</option>
                         <option
                                 :key="currency.abr + currency.rate"
                                 :value="currency.abbr"
                                 :selected="currency.default"
                                 v-for="currency in currencies"
                         >{{currency.name}}
                         </option>
                     </select>
                 </div>
                 <small style="margin-left: 15px; color: #aaa">{{showCurrency}}</small>
                 <div class="value">{{computedPrice | numerate}}</div>
             </div>
             <div class="slip">
                 <div class="label">Units</div>
                 <div class="units">
                     <div>
                         <span @click="decreaseValue" class="unicode minus"></span>
                     </div>
                     <div class="unit">
                         <label class="sr-only" for="unit">Enter the number of units you wish to buy</label>
                         <input
                                 id="unit"
                                 name="unit"
                                 placeholder="Enter the number of units you wish to buy"
                                 type="text"
                                 v-model="unit_value"
                         />
                     </div>
                     <div>
                         <span @click="increaseValue" class="unicode plus"></span>
                     </div>
                 </div>
                 <small class="p-1">
                     Maximum units allowed:
                     <strong>{{allowedUnits }}</strong>
                 </small>
             </div>
             <div class="card">
                 <div class="card-content p-3">
                     <small>
                         Return on investment (
                         <strong>{{data.roi * 100}}%</strong>
                         ) in {{data.duration}} months
                     </small>
                     <div class="value">
                         <span class="unicode naira">{{calcRoi | numerate}}</span>
                     </div>
                 </div>
             </div>

             <div class="custom-btn-group">
                 <div v-if="isAuth" class="w-full">
                     <paystack
                             class="cbtn d-flex justify-content-center primary lg w-full"
                             :amount="computedPrice * 100"
                             :email="user.email || ''"
                             :paystackkey="payment.paystack.key"
                             :callback="paystackCallback"
                             :close="closePaymentModal"
                             :reference="''"
                             :embed="payment.paystack.embed"
                     >Invest
                     </paystack>
                 </div>

                 <div class="w-full" v-else>
                     <router-link
                             :to="{name: 'sign-in', params: {nextUrl: fullPath}}"
                             class="cbtn d-flex justify-content-center primary lg"
                     >
                         <i class="la la-sign-in"></i>Invest
                     </router-link>
                 </div>
             </div>
             <div class="mx-2 d-block" style="text-align: center">
                 <p style="font-size: 12px; line-height:.1">
                     By investing, you agree to the
                     <router-link :to="{name: 'terms-of-sponsorship'}">Terms of sponsorship</router-link>
                 </p>
             </div>-->
        </div>
    </div>
</template>

<script>
    import mixin from "@/mixin";
    import Paystack from "vue-paystack/src/paystack";
    import {mapGetters, mapActions} from "vuex";

    export default {
        name: "Investment-Calculator",
        components: {Paystack},
        props: ["data"],
        mixins: [mixin],
        data() {
            return {
                unit_value: 1,
                unit_allowed: this.data.allowedUnits,
                currency: "",
                currencies: [
                    {
                        name: "Naira",
                        rate: 1,
                        abr: "NGN",
                        default: true
                    }
                ],
                payment: {
                    paystack: {
                        embed: false,
                        key: process.env.VUE_APP_PAYSTACK_KEY
                    }
                }
            };
        },
        watch: {
            unit_value(newVal) {
                if (newVal > this.data.allowedUnits) {
                    this.unit_value = this.data.allowedUnits;
                }
            }
        },
        computed: {
            ...mapGetters({
                isAuth: "user/auth",
                user: "user/data"
            }),
            showCurrency() {
                return this.currency
                    ? this.currency
                    : this.currencies.filter(t => t.default)[0].abr;
            },
            fullPath() {
                return this.$router.currentRoute.fullPath;
            },
            allowedUnits() {
                return this.data.allowedUnits || "Unlimited";
            },
            computedPrice() {
                return this.data.unit_price * this.unit_value;
            },
            calcRoi() {
                let result = 0;
                try {
                    result = this.computedPrice * this.data.roi + this.computedPrice;
                } catch (e) {
                    this.$toastr.Add("Error", e.message, "error");
                }
                return result;
            }
        },
        methods: {
            setCurrency(e) {
                this.currency = e.target.value;
            },
            closePaymentModal() {
            },
            update() {
                this.$emit("update:unit", this.unit_value);
                this.$emit("update:amount", this.computedPrice());
            },
            paystackCallback(payment) {
                /* @ returns Object
                                            * {
                                                  "reference": "MneEuOPFJ3",
                                                  "trans": "338753418",
                                                  "status": "success",
                                                  "message": "Approved",
                                                  "transaction": "338753418",
                                                  "trxref": "MneEuOPFJ3"
                                                } */
                let data = {
                    amount: this.computedPrice,
                    reference: payment.reference,
                    transaction_id: payment.transaction,
                    farm: this.data.farm,
                    units: this.unit_value
                };

                if (payment.status === "success") {
                    window.axios
                        .post("auth/investments", data)
                        .then(response => {
                            let payload = {
                                unit_bought: this.unit_value,
                                amount_paid: this.computedPrice
                            };
                            this.$emit("paid", payload);
                        })
                        .catch(e => {
                            console.log(e.response);
                        });
                }
            },
            increaseValue() {
                if (this.unit_allowed) {
                    if (this.unit_value < this.unit_allowed) {
                        this.unit_value++;
                    }
                } else {
                    this.unit_value++;
                }
            },
            decreaseValue() {
                if (this.unit_value > 1) {
                    this.unit_value--;
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "../lib/style/__variable.scss";

    select#amt_currency {
        line-height: 1;
        background: lighten($light, 5%) !important;
        border: 1px solid $light-bd;

        option {
            outline: 1px solid $primary !important;
            border: 1px solid $primary !important;
        }
    }

    .custom-invest {
        display: -webkit-flex;
        display: -ms-flex;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        overflow: hidden;
        position: relative;
        height: 100vh;
        background: #fafafa;
        background: #fafafa;
        border-left: 1px solid #e1e1e1;
        border-right: 1px solid #e1e1e1;


        .pane {
            display: flex;
            width: 100%;
            align-items: flex-end;
            padding: 7px 14px;

            &:not(:first-of-type) {
                border-top: 1px solid #e1e1e1;
            }

            .header {
                color: $primary;
                margin: 7px;
                font-weight: 700;
            }

            .left-section {
                padding: 7px;
                flex: auto;
            }

            .hint {
                color: #888;
                font-weight: 300;
                font-size: 12px
            }

            .label {
                font-weight: 400;
                line-height: 1.5;
                color: #b1b1b1;
                margin-bottom: 0;

                &:first-letter {
                    text-transform: uppercase;
                }
            }

            .value {
                font-size: 24px;
                color: $primary;
                font-weight: 600;
                line-height: 1.5;
                margin-bottom: 0;
            }

            .incrementor {
                display: flex;
                align-items: center;
                margin-left: auto;
                border: 1px solid #e1e1e1;
                overflow: hidden;
                justify-content: space-between;
                width: fit-content;
                background: #fff;

                .display {
                    height: 100%;
                    width: 70px;

                    input {
                        appearance: none;
                        border: none;
                        padding: 7px;
                        height: 100%;
                        text-align: center;
                    }
                }

                .trigger {
                    background: #fff;
                    color: $primary;
                    font-size: 20px;
                    font-weight: 600;
                    height: 100%;
                    display: block;
                    text-align: center;
                    padding: 7px;
                    cursor: pointer;
                    width: 45px;

                    &:hover {
                        background: transparentize($primary, .85);
                    }
                }
            }

            .right-section {
                padding: 7px;
                flex: auto;
                text-align: right;
            }
        }

    }
</style>
