<template>
    <div class="p-0 m-auto">
        <!--Loader-->
        <div class="row justify-content-center d-flex" v-if="loading">
            <nomsg-spinner/>
        </div>
        <div v-else-if="hasError">
            <alert-item :messages="errors" :title="'Oop!'">
                <div @click="fetchAll" class="cbtn">
                    <i class="la la-refresh"></i> Refresh
                </div>
            </alert-item>
        </div>
        <template v-else>
            <!--Data-->

            <div class="search-panel py-3" v-if="action">
                <div class="container p-0">
                    <!--Filter card-->
                    <div v-show="filter">
                        <farm-filters ref="farm-filter" @onFilter="filterFarms"/>
                    </div>
                    <!--End-->
                </div>
            </div>
            <div class="py-4">
                <template v-if="hasEntry">
                    <div class="m-auto">
                        <!--Paginated farm listing-->
                        <pagination-item :contents="parseFarm" :name="id" v-if="paginate">
                            <template v-slot:default="PaginatedFarms">
                                <div class="row m-auto">
                                    <div
                                            class="col-md-6 col-lg-3 col-sm-12"
                                            :key="farm.id"
                                            v-for="farm in PaginatedFarms.contents"
                                    >
                                        <farm-card :data="farm"/>
                                    </div>
                                </div>
                            </template>
                        </pagination-item>
                        <!--Farm listing in Carousels-->
                        <div class="px-2" v-else-if="carousel">
                            <div v-swiper="swiperOption" class="swiper">
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide"
                                         :key="farm.id"
                                         v-for="farm in parseFarm">
                                        <farm-card :data="farm"/>
                                    </div>
                                </div>
                                <!-- If we need navigation buttons -->
                                <div class="swiper-btn-prev">
                                    <div class="icon rounded">
                                        <i class="fa fa-chevron-left"></i>
                                    </div>
                                </div>
                                <div class="swiper-btn-next">
                                    <div class="icon rounded">
                                        <i class="fa fa-chevron-right"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Farm Grid listing -->
                        <div v-else class>
                            <div class :key="farm.id" v-for="farm in parseFarm">
                                <farm-card :data="farm"/>
                            </div>
                        </div>
                    </div>
                </template>
                <div v-else>
                    <alert-item :messages="'Nothing found yet!'" :title="'Unfortunately!'"></alert-item>
                </div>
            </div>
            <!--End-->
            <!--No data or Error-->

            <!--End-->
        </template>
    </div>
</template>

<script>
    import mixin from "@/mixin";
    import {Swiper, SwiperSlide, directive} from "vue-awesome-swiper";
    import "swiper/css/swiper.css";
    import {mapGetters, mapActions} from "vuex";

    export default {
        name: "FarmListing",
        mixins: [mixin],
        props: {
            name: {
                required: true,
                type: String
            },
            carousel: {
                type: Boolean,
                default: false
            },
            paginate: {
                default: false,
                type: Boolean
            },
            pageSize: {
                default: 10
            },
            filter: {
                default: false
            },
            filters: {
                default() {
                    return {
                        count: 0,
                        status: null,
                        insured: null,
                        category: null,
                        search: null
                    };
                }
            },
            action: {
                default: true,
                type: Boolean
            }
        },
        components: {
            Swiper,
            SwiperSlide
        },
        directives: {
            swiper: directive
        },
        data: function () {
            return {
                swiperOption: {
                    mousewheel: true,
                    direction: 'horizontal',
                    navigation: {
                        nextEl: '.swiper-btn-next',
                        prevEl: '.swiper-btn-prev'
                    },
                    freeMode: true,
                    breakpoints: {
                        // when window width is >= 320px
                        320: {
                            slidesPerView: 1,
                            slidesPerGroup: 2,
                            spaceBetween: 15
                        },
                        // when window width is >= 600px
                        600: {
                            slidesPerView: 2,
                            slidesPerGroup: 2,
                            spaceBetween: 10
                        },
                        // when window width is >= 640px
                        1024: {
                            slidesPerView: 3,
                            slidesPerGroup: 1,
                            spaceBetween: 20
                        }
                    }
                },
                id: this.name + "-farm-listing",
                farms: [],
                tryAgain: false,
                url: "farms",
                filterOption: {
                    count: this.filters.count,
                    status: this.filters.status,
                    insured: this.filters.insured,
                    category: this.filters.category,
                    search: this.filters.search
                }
            };
        },
        computed: {
            hasEntry() {
                return this.parseFarm.length;
            },
            isLoading() {
                return this.$store.getters.isDataLoading;
            },
            hasErrors() {
                return this.errors.length || this.$store.getters.getErrors.length;
            },
            getErrors() {
                return [].concat(this.$store.getters.getErrors, this.errors);
            },
            ...mapGetters({
                all: "farm/plural",
                open: "farm/pluralOpen",
                close: "farm/pluralClosed",
                sold: "farm/pluralSold",
                insured: "farm/pluralInsured",
                errors: "farm/pluralError",
                hasError: "farm/hasError",
                loading: "farm/loading"
            }),
            parseFarm: function () {
                let result = [];
                let allClosed = this.all.filter(farm => farm.status=='close')
                let allOpen = this.all.filter(farm => farm.status=='open')
                let theRest = this.all.filter(farm => !(farm.status=='open' || farm.status == 'close'))
                let allFarms = [...allOpen, ...allClosed, ...theRest]
                /* If there is a search query */
                if (this.filterOption.search && this.filterOption.search.length) {
                    result = allFarms.filter(row => {
                        return Object.keys(row).some(
                            key =>
                                String(row[key])
                                    .toLowerCase()
                                    .indexOf(this.filterOption.search.toLowerCase()) > -1
                        );
                    });
                } else {
                    /* Send all farms without keyword filter */
                    result = allFarms;
                }

                if (this.filterOption.status != null) {
                    switch (this.filterOption.status) {
                        case "open":
                            result = this.open;
                            break;
                        case "close":
                            result = this.close;
                            break;
                        case "sold_out":
                            result = this.sold;
                            break;
                    }
                }

                /*Filter for insured*/
                if (this.filterOption.insured != null) {
                    result = result.filter(
                        farm => farm.insured === this.filterOption.insured
                    );
                }

                if (this.filterOption.category != null) {
                    result = result.filter(
                        farm => farm.category === this.filterOption.category
                    );
                }
                if (this.filterOption.count) {
                    result = result.splice(0, this.filterOption.count);
                }
                return result;
            }
        },
        created() {
            this.fetchAll();
        },
        mounted: function () {
            this.$nextTick(() => {
            });
        },
        methods: {
            ...mapActions({
                fetchAll: "farm/fetchPlural"
            }),
            addError(message) {
                this.errors.push(message);
            },
            filterFarms(data) {
                this.$store.commit("farm/SET_LOADING", true);
                Object.assign(this.filterOption, data);
                this.$store.commit("farm/SET_LOADING", false);
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "../lib/style/_variable";

    .category-listing {
        background: white;
        display: block;
        margin: 0;
        left: 0;
        top: 0;
        width: 100%;
        position: absolute;
        @media all and (max-width: 768px) {
            position: relative;
            .category-header {
                display: none;
            }
            .category-list {
                display: flex;
                justify-content: space-evenly;
            }
        }

        .category-header {
            font-size: 18px;
            font-weight: bold;
            padding: 7px 14px;
            border-bottom: 1px solid $light-bd;
        }

        .category-list {
            padding: 7px 7px 7px 20px;
            margin-top: 7px;

            &:hover > .category-list-item {
                -webkit-transition: all 0.35s ease-in-out;
                -moz-transition: all 0.35s ease-in-out;
                -ms-transition: all 0.35s ease-in-out;
                -o-transition: all 0.35s ease-in-out;
                transition: all 0.35s ease-in-out;
                transform: translateX(14px);
            }
        }
    }

    .slide-from-left-enter-active,
    .slide-from-left-leave-active {
        -webkit-transition: transform 0.5s;
        -moz-transition: transform 0.5s;
        -ms-transition: transform 0.5s;
        -o-transition: transform 0.5s;
        transition: transform 0.5s;
    }

    .slide-from-left-enter,
    .slide-from-left-leave-to {
        transform: scaleX(-100%);
    }

    .search-panel {
        background: #f6f6f6;
        border-bottom: 1px solid #ececec;
    }

    .swiper {
        position: relative;

        .swiper-btn-next,
        .swiper-btn-prev {
            z-index: 10;

            .icon {
                background: white;
                height: 45px;
                width: 45px;
                margin-top: 30px;
                line-height: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                -webkit-border-radius: 45px;
                -moz-border-radius: 45px;
                border-radius: 45px;
                -webkit-box-shadow: 4px 4px 7px -7px #000;
                -moz-box-shadow: 4px 4px 7px -7px #000;
                box-shadow: 4px 4px 7px -7px #000;
            }
        }

        .swiper-btn-next {
            position: absolute;
            top: 0;
            right: 0;
            height: 100%;
            bottom: 0;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .swiper-btn-prev {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            bottom: 0;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
</style>
