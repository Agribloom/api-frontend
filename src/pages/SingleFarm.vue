<template>
    <div class="farm-wrapper container-fluid p-0 bg-200">
        <div class="row d-flex flex-column align-content-center text-center"
             style="margin: 85px auto;"
             v-if="loading">
            <nomsg-spinner/>
        </div>
        <div v-else>
            <!--If Error-->
            <div
                    class="row d-flex flex-column align-content-center text-center"
                    style="margin: 70px auto;"
                    v-if="hasError"
            >
                <alert-item :messages="'Network Error'" :title="'Unable to retrieve data'">
                    <div class="my-4">
                        <small class="d-block">Try refreshing the page</small>
                        <!--<div @click="loadFarm()" class="cbtn">
                                        <i class="la la-refresh"></i> Refresh page
                        </div>-->
                    </div>
                </alert-item>
            </div>
            <!--No Error-->
            <div v-else-if="hasData">
                <!-- page header section start here -->
                <page-heading :detail="headingDetails"></page-heading>
                <!-- page header section ending here -->

                <!--Farm summary-->

                <div class="p-0">
                    <div class="summary-slip">
                        <ul class="slip-container">
                            <li class="slip-item">
                                <span class="label"><i class="fa fa-map-marker-alt icon mr-1"></i>Location:</span>
                                <span>{{LOCATION}}</span>
                            </li>
                            <li class="slip-item">
                                <span class="label"> <i class="fa fa-coins icon mr-1"></i>Units left:</span>
                                <span>{{STOCK}}</span>
                            </li>
                            <li class="slip-item">
                                <span class="label"> <i class="fa fa-calendar-alt icon mr-1"></i>Duration:</span>
                                <span>{{DURATION}} months</span>
                            </li>
                            <li class="slip-item">
                                <span class="label"><i class="la la-bar-chart-o icon mr-1"></i>ROI</span>
                                <span>{{ROI}}%</span>
                            </li>
                        </ul>
                    </div>
                    <!--End-->

                    <!-- Campaign Section start -->
                    <section class="farm-single">
                        <div class>
                            <div class="section-wrapper">
                                <div class="row mx-auto ">
                                    <div class="col-lg-8 col-12 p-0" style="border-bottom: 1px solid #ececec">
                                        <div class="bg-white p-2 ">
                                            <div class="post-thumb style-2">
                                                <div class="post-thumb-content">
                                                    <FarmSummaryCard :summary="farmSummary"/>
                                                </div>
                                            </div>

                                            <div class="mb-3 h-screen">
                                                <tabs :options="{ useUrlFragment: false }"
                                                      cache-lifetime="10">
                                                    <tab name="Description">
                                                        <farm-description :description="DESCRIPTION"/>
                                                    </tab>
                                                    <tab name="Video">
                                                        <farm-video-listing/>
                                                    </tab>
                                                    <tab name="Gallery">
                                                        <farm-gallery-grid/>
                                                    </tab>
                                                    <tab name="Updates">
                                                        <farm-update-listing :id="NAME" :updates="farm.updates"/>
                                                    </tab>
                                                    <tab name="Contact">
                                                        <farm-manager-listing :managers="farm.managers"/>
                                                    </tab>
                                                </tabs>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-sm-8 p-0">
                                        <section class="sticky"
                                                 v-if="isOpen">
                                            <investment-calculator
                                                    @paid="updateFarm"
                                                    :data="calculatorParams"
                                            />
                                        </section>
                                        <section v-else>
                                            <div>
                                                <alert-item :title="'Farm Closed'">
                                                    <p>
                                                        Unfortunately, this farm is closed.
                                                        <br>You can check for other active farms
                                                        <router-link :to="{name:'farms'}">here</router-link>
                                                    </p>
                                                </alert-item>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <!-- Campaign Section ending -->
                </div>
            </div>
            <div v-else>
                <alert-item :messages="'Nothing found'" :title="'Data retrieval error'"></alert-item>
            </div>
        </div>
    </div>
</template>

<script>
    import {Tab, Tabs} from "vue-tabs-component";
    import FarmSummaryCard from "../components/FarmSummaryCard";
    import mixin from "@/mixin";
    import {mapGetters} from "vuex";

    export default {
        components: {
            FarmSummaryCard,
            Tabs,
            Tab
        },
        mixins: [mixin],
        name: "SingleFarm",
        data: function () {
            return {
                farmID: this.$route.params.id,
                url: "farms/" + this.$route.params.id,
                farm: null
            };
        },
        mounted: function () {
            this.fetchFarm();
        },
        methods: {
            /* loadFarm: function () {
                        this.errors = []
                        this.$store.dispatch('fetchFarmById', this.$route.params.id)
                        this.$store.dispatch('fetchUser')
                    }, */

            fetchFarm() {
                this.$store.commit("farm/SET_LOADING", true);
                this.farm = this.$store.getters["farm/singularById"](this.farmID);
                if (!this.farm.length) {
                    window.axios
                        .get(`farms/${this.farmID}`)
                        .then(
                            response => {
                                this.farm = response.data;
                            },
                            error => {
                                this.$store.commit("farm/SET_ERROR", error);
                            }
                        )
                        .finally(() => {
                            this.$store.commit("farm/SET_LOADING", false);
                        });
                }
            },
            updateFarm(payload) {
                this.farm.unit_in_stock = this.farm.unit_in_stock - payload.unit_bought;
                if (!this.farm.unit_in_stock) {
                    this.farm.status = "sold out";
                }
                this.farm.raised = Number(this.farm.raised) + payload.amount_paid;
                let message = "Payment has been completed successfully";
                this.toastrAdd("Success", message, "success");
            }
        },
        computed: {
            ...mapGetters({
                loading: "farm/loading",
                errors: "farm/pluralError",
                hasError: "farm/hasError"
            }),
            breadcrumb() {
                return [
                    {id: 0, name: "Home", classes: "", location: "/"},
                    {id: 1, name: "Farms", classes: "", location: "/farms"},
                    {
                        id: 1,
                        name: this.farm ? this.farm.name : "",
                        classes: "active",
                        location: ""
                    }
                ];
            },
            hasData() {
                return this.farm;
            },
            /* isLoading () {
                         let result = []
                         try {
                             // Filter farm by id
                             result = this.farms
                             //Filter by the ID
                             result = result.filter(
                                 farm => farm.id === Number(this.$route.params.id)
                             )[0]
                         } catch (e) {
                             result = []
                         }
                         this.setFarm(result)
                         return this.$store.getters.isDataLoading
                     }, */
            isOpen() {
                return this.farm ? this.farm.status === "open" : null;
            },
            /**
             * @return String
             */
            NAME() {
                return this.farm ? this.farm.name : "";
            },
            /**
             * @return {string}
             */ LOCATION() {
                return this.farm ? this.farm.location : "";
            },
            /**
             * @return {string}
             */
            STOCK() {
                return this.farm ? `${this.farm.unit_in_stock} / ${this.farm.units}` : "";
            },
            ROI() {
                return this.farm ? this.farm.roi : 0;
            },
            /**
             * @return {number}
             */
            DURATION() {
                return this.farm ? this.farm.duration : 0;
            },
            /**
             * @return {string}
             */
            DESCRIPTION() {
                return this.farm ? this.farm.description : "";
            },
            headingDetails: function () {
                return {
                    title: this.farm ? this.farm.name : "",
                    breadcrumbs: this.breadcrumb,
                    banner: this.farm ? this.farm.image : ""
                };
            },
            calculatorParams() {
                return {
                    farm: this.farm.id,
                    unit_price: this.farm ? this.farm.price_per_unit : 0,
                    roi: (this.farm ? this.farm.roi : 0) / 100,
                    allowedUnits: this.farm.unit_in_stock,
                    duration: this.farm ? this.farm.duration : ""
                };
            },
            farmSummary() {
                return {
                    raised: this.farm ? this.farm.raised : 0,
                    target: this.farm ? this.farm.target : 0,
                    status: this.farm ? this.farm.status : 0,
                    roi: this.farm ? this.farm.roi : 0
                };
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "../lib/style/_variable";

    .farm-single {
        .section-wrapper {
            border: 1px solid #e1e1e1;
            justify-content: center;
            background: #fff;

            .post-thumb.style-2 {

                img {
                    width: 100%;
                }

                .post-thumb-content {
                    position: relative;

                    ul li {
                        font-weight: 700;
                    }

                    .skill-item .skillbar {
                        -moz-border-radius: 3px;
                        -webkit-border-radius: 3px;
                        border-radius: 3px;

                        .skillbar-bar {
                            -moz-border-radius: 2px;
                            -webkit-border-radius: 2px;
                            border-radius: 2px;
                            left: 1px;
                        }
                    }
                }
            }

            .donate-amount {
                background: $white;
                margin-bottom: 15px;
                padding: 25px 30px;

                h3 {
                    font-weight: 700;
                    line-height: 30px;
                    margin-bottom: 25px;
                }

                ul {
                    margin-bottom: 25px !important;

                    li {
                        border: 1px solid #f6f6f6;
                        -moz-border-radius: 19px;
                        -webkit-border-radius: 19px;
                        border-radius: 19px;
                        font-weight: 400;
                        margin: 5px;
                        padding: 2px 15px 2px 25px;
                        -moz-transition: all 0.3s ease;
                        -webkit-transition: all 0.3s ease;
                        transition: all 0.3s ease;

                        &:first-child {
                            margin-left: 0;
                        }

                        &:last-child {
                            margin-right: 0;
                        }

                        &:after,
                        &:before {
                            -moz-border-radius: 50%;
                            -webkit-border-radius: 50%;
                            border-radius: 50%;
                            left: 15px;
                            top: 50%;
                            -ms-transform: translate(-50%, -50%);
                            -webkit-transform: translate(-50%, -50%);
                            transform: translate(-50%, -50%);
                            -moz-transition: all 0.3s ease;
                            -webkit-transition: all 0.3s ease;
                            transition: all 0.3s ease;
                        }

                        &:after {
                            height: 6px;
                            width: 6px;
                        }

                        &:before {
                            border: 1px solid $light;
                            height: 12px;
                            width: 12px;
                        }

                        &:hover {
                            border-color: #16e18a;
                            color: #16e18a;

                            &:after {
                                background: #16e18a;
                            }

                            &:before {
                                border-color: #16e18a;
                            }
                        }

                        &.active {
                            background: #16e18a;
                            border-color: #16e18a;
                            color: $white;
                            font-weight: 600;

                            &:after {
                                background: $white;
                            }

                            &:before {
                                border-color: $white;
                            }
                        }
                    }
                }

                .custom-donate {
                    span {
                        background: $light;
                        -moz-border-radius: 23px 0 0 23px;
                        -webkit-border-radius: 23px 0 0 23px;
                        border-radius: 23px 0 0 23px;
                        color: $dark-typo;
                        display: inline-block;
                        font-size: 20px;
                        height: 46px;
                        left: 0;
                        line-height: 46px;
                        text-align: center;
                        top: 0;
                        width: 60px;

                        span {
                            display: inline-block;
                            height: 25px;
                            line-height: 25px;
                            text-align: center;
                            vertical-align: middle;
                        }
                    }

                    input {
                        border-color: #f6f6f6;
                        -moz-border-radius: 23px;
                        -webkit-border-radius: 23px;
                        border-radius: 23px;
                        height: 46px;
                        margin: 0;
                        margin-right: 30px;
                        width: 200px;

                        &:focus,
                        &::placeholder {
                            color: #84e18a;
                            font-weight: 700;
                            text-align: center;
                        }
                    }
                }
            }
        }
    }

    .summary-slip {
        position: relative;
        display: block;
        align-items: center;
        justify-content: center;
        color: $white;
        font-weight: 600;
        margin-top: -40px;
        @media (max-width: 786px) {
            padding: 0;
        }
        background: $primary;

        .slip-container {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            text-align: center;
        }

        .slip-item {
            display: block;
            border: 1px solid rgba(200, 200, 200, 0.2);
            flex: 1;
            padding: 15px;
            font-size: 14px;
            justify-content: center;
            line-height: 1.5;
            margin: 0 auto;
            width: 100%;
            align-items: baseline;

            .label {
                display: block;
                line-height: 1.5;
                font-size: 1em;
                position: relative;
                color: mix($primary, white, 40%);
                white-space: nowrap;
                margin-bottom: 7px;
                word-spacing: 2px;
                letter-spacing: 2px;
            }

            @media (max-width: 786px) {
                align-items: center;
                flex-direction: column;
                justify-content: flex-start;
                text-align: center;
                width: 100%;
                padding: 25px 15px;

                span {
                    margin-top: 12px;
                }
            }

            i {
                align-items: center;
                display: inline-flex;
                line-height: 1;
                margin-right: 5px;
            }
        }
    }
</style>
