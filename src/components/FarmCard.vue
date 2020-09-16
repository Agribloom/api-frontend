<template>
    <div class="farm-card">
        <router-link :to="{name:'farm', params:{id: farm.id, slug: farm.slug}}">
            <div class="farm-card-inner">
                <div class="farm-card-thumb">
                    <farm-summary-card :summary="farmSummary"/>
                    <div :class="['farm-state d-flex align-items-baseline justify-content-between', statusClass]">
                        <div>
                            <small class="p-2" style="text-transform:uppercase; font-weight: 600">
                                {{farmStatus}}
                            </small>
                        </div>
                    </div>
                    <div class="farm-thumb-container">
                        <image-item :alt="farm.name" :source="farm.image"/>
                    </div>
                    <div class="insured" v-if="farm.insured">
                        <div class="__text">
                            <img src="/assets/images/insured.png" alt/>
                            Insured
                        </div>
                    </div>

                </div>

                <div class="farm-card-content">
                    <h4 class="header">{{farm.name | capitalize}}</h4>
                    <ul class="meta">
                        <li class="meta-item">
                            <i class="fa fa-map-marker-alt icon"></i>
                            {{farm.location}}
                        </li>
                        <li class="meta-item">
                            <i class="la la-bar-chart-o icon"></i>
                            {{farm.roi}}%
                        </li>
                        <li class="meta-item">
                            <i class="fa fa-coins icon"></i>
                            {{farm.price_per_unit | numerate}}
                        </li>

                        <li class="meta-item">
                            <i class="fa fa-cubes icon"></i>
                            {{farm.unit_in_stock}}/{{farm.units}} units
                        </li>
                        <li class="meta-item">
                            <i class="fa fa-calendar-alt icon"></i>
                            <!-- {{farm.start_date | formatDate}} - {{farm.end_date | formatDate}} -->
                            {{farm.duration}} month{{farm.duration > 1 ? 's' : ''}}
                        </li>
                    </ul>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
    import mixin from "@/mixin";

    export default {
        mixins: [mixin],
        props: {
            data: {
                required: true,
                default: {},
            },
        },
        name: "FarmCard",
        data: function () {
            return {
                farm: this.data,
                available: false,
            };
        },
        computed: {
            statusClass() {
                return this.farm.status;
            },
            farmStatus() {
                /* open
                closed
                sold out */
                if (this.farm.status === "open") return "active";
                if (this.farm.status === "close") return "inactive";
                if (this.farm.status === "sold-out") return "sold";
            },
            farmSummary() {
                return {
                    raised: this.farm.raised,
                    target: this.farm.target,
                    roi: this.farm.roi,
                    status: this.farm.status,
                };
            },
        },
    };
</script>

<style lang="scss" scoped>
    @import "@/lib/style/__variable.scss";

    $default: hsl(150, 15%, 92%);
    $hover: #d6d6d6;

    .farm-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: transparent;
        position: relative;

        a {
            &:hover {
                text-decoration: none;
            }
        }

        .farm-card-inner {
            -webkit-border-radius: $bdrs;
            -moz-border-radius: $bdrs;
            border-radius: 4px;
            position: relative;
            overflow: hidden;
            max-width: 300px;
            margin: 0 auto;
            -webkit-transition: all 0.15s ease-in;
            -moz-transition: all 0.15s ease-in;
            -ms-transition: all 0.15s ease-in;
            -o-transition: all 0.15s ease-in;
            transition: all 0.15s ease-in;

            /* &:hover {
              -webkit-box-shadow: 0vmin 7px 7px -7px #e8e8e8;
              -moz-box-shadow: 0vmin 7px 7px -7px #e8e8e8;
              box-shadow: 0vmin 5px 7px 1px #e8e8e8;
            } */
            .farm-state {
                z-index: 2;
                position: relative;
                background: $secondary;
                overflow: hidden;

                &.open {
                    background: $success;
                }

                &.close {
                    background: $danger;
                }

                &.sold-out {
                    background: $danger;
                    color: $gray-500;
                }
            }

            .farm-card-thumb {
                height: 200px;
                /*background: $light;*/
                position: relative;
                overflow: hidden;
                color: #ddd;
                z-index: 1;

                &:after {
                    background: $secondary;
                    background: transparentize($black, 0.75%);
                    content: "";
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                    position: absolute;
                }

                .skill-item {
                    overflow: hidden;
                    -webkit-border-radius: 0;
                    -moz-border-radius: 0;
                    border-radius: 0;
                    position: relative;
                    top: 0;
                    left: 0;
                    z-index: 10;
                    width: 100%;

                    .roi {
                        border: 1px solid $primary-dark;
                    }
                }

                .farm-thumb-container {
                    position: relative;
                    display: block;
                    width: 100%;
                    height: 100%;

                    .farm-status {
                        position: absolute;
                        z-index: 10;
                        top: 7px;
                        left: 0;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        margin-left: 7px;
                    }
                }

                figure {
                    min-height: 100px;
                    position: relative;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    left: 0;
                    overflow: hidden;
                }
            }

            .farm-card-content {
                position: relative;
                padding: 14px 0;
                // border: 4px solid $default;
                .header {
                    font-size: 18px;
                    font-family: $font-family-head;
                    -ms-text-overflow: ellipsis;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    letter-spacing: 0;
                    font-weight: 700;
                }

                .meta {
                    display: flex;
                    font-size: 12px;
                    margin-left: 0;
                    line-height: calc(12px * 1.618);
                    width: 100%;
                    flex-wrap: wrap;
                    .meta-item {
                        display: inline-flex;
                        margin-bottom: 8px;
                        margin-right: 12px;
                        align-items: center;
                        color: rgb(118, 138, 118);
                    }
                }
            }

            .insured {
                position: absolute;
                z-index: 5;
                display: flex;
                flex: 1;

                justify-content: flex-end;
                font-weight: 400;
                margin: 0;
                bottom: 7px;
                right: 7px;
                .__text {
                    color: #8a8a8a;
                    background: rgb(255, 255, 255);
                    display: inline-block;

                    padding: 1px 10px;
                    z-index: 1;
                    font-size: 0.7em;
                }

                img {
                    width: 18px;
                    height: 20px;
                    margin-right: 2px;
                    z-index: 2;
                }
            }
        }

        width: auto;
        flex: auto;
        margin: 30px auto;
        min-width: 200px;
        padding: 7px;
    }
</style>
