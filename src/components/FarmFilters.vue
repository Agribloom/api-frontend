<template>
    <div class>
        <form @submit="onFilter">
            <div class="search-area">
                <label for="filter-search" class="sr-only"></label>
                <input
                        type="search"
                        id="filter-search"
                        v-model="filters.keyword"
                        @keyup="setSearchKeyword"
                        placeholder="Search keyword..."
                        required="required"
                />
            </div>
            <div class>
                <section class="option-menu" v-show="enableFilters">
                    <div class="menu-item">
                        <filter-capsule>
                            <dropdown-menu
                                    @cleared="resetClear"
                                    :cleared="cleared"
                                    @onSelect="setValue"
                                    :items="filters.dropDown.insured.items"
                                    :id="filters.dropDown.insured.id"
                                    :title="filters.dropDown.insured.title"
                            />
                        </filter-capsule>
                    </div>
                    <div class="menu-item">
                        <filter-capsule>
                            <dropdown-menu
                                    @cleared="resetClear"
                                    :cleared="cleared"
                                    @onSelect="setValue"
                                    :items="filters.dropDown.status.items"
                                    :id="filters.dropDown.status.id"
                                    :title="filters.dropDown.status.title"
                            />
                        </filter-capsule>
                    </div>
                    <div class="menu-item">
                        <filter-capsule>
                            <dropdown-menu
                                    @cleared="resetClear"
                                    :cleared="cleared"
                                    @onSelect="setValue"
                                    :items="filters.dropDown.category.items"
                                    :id="filters.dropDown.category.id"
                                    :title="filters.dropDown.category.title"
                            />
                        </filter-capsule>
                    </div>
                    <div class="menu-item" v-if="hasFilter">
                        <filter-capsule>
                            <span @click="onClear" title="clear all">Clear all &times;</span>
                        </filter-capsule>
                    </div>
                </section>
            </div>
            <section class="option-menu">
                <div class="menu-item">
                    <button class="cbtn" @click.stop="toggleFilters">
                        <i class="la la-filter"></i>
                        &nbsp;
                        <span>Filter by</span>
                    </button>
                </div>
                <div class="menu-item">
                    <button type="submit" class="cbtn primary">
                        <i class="la la-search"></i>
                        &nbsp;
                        <span>Search</span>
                    </button>
                </div>
            </section>
        </form>
    </div>
</template>

<script>
    import mixin from "@/mixin";
    import FilterCapsules from "./FilterCapsule";

    export default {
        name: "FarmFilters",
        components: {FilterCapsules},
        mixins: [mixin],
        data() {
            return {
                enableFilters: false,
                count: 0,
                filters: {
                    keyword: null,
                    dropDown: {
                        insured: {
                            title: this.$options.filters.capitalize("Insured"),
                            id: "insured",
                            items: {
                                true: {
                                    text: "True",
                                    value: true
                                },
                                false: {
                                    text: "False",
                                    value: false
                                }
                            }
                        },
                        status: {
                            title: this.$options.filters.capitalize("Status"),
                            id: "status",
                            items: {
                                open: {
                                    text: "Open",
                                    value: "open"
                                },
                                close: {
                                    text: "Close",
                                    value: "close"
                                },
                                sold_out: {
                                    text: "Sold Out",
                                    value: "sold_out"
                                }
                            }
                        },
                        category: {
                            title: this.$options.filters.capitalize("Category"),
                            id: "category",
                            items: (function () {
                                let r = {};
                                window.axios
                                    .get("categories")
                                    .then(response => {
                                        let data = response.data.results;

                                        if (data) {
                                            data.forEach(o => {
                                                let str = o.name;
                                                r[str.toLowerCase()] = {
                                                    text: str,
                                                    value: o.id
                                                };
                                            });
                                        }
                                    })
                                    .catch(() => []);
                                return r;
                            })()
                        }
                    }
                },
                filterQuery: new Map(),
                cleared: false
            };
        },
        methods: {
            setSearchKeyword() {
                this.setValue({id: "search", filter: this.filters.keyword});
            },
            toggleFilters() {
                this.enableFilters = !this.enableFilters;
            },
            setValue(value) {
                this.filterQuery.set(value.id, value.filter);
                if (value.filter !== null) this.count++;
                else this.count--;
            },
            onClear() {
                this.filterQuery.clear();
                this.cleared = true;
                this.filter();
                setTimeout(this.resetClear, 1000);
            },
            resetClear() {
                this.cleared = false;
            },
            onFilter(e) {
                e.preventDefault();
                let params = Array.from(this.filterQuery).reduce(
                    (obj, [key, value]) => Object.assign(obj, {[key]: value}),
                    {}
                );
                this.$emit("onFilter", params);
            }
        },
        computed: {
            hasFilter() {
                return this.count;
            }
        }
    };
</script>

<style lang="scss">
    @import "../lib/style/_variable";

    /* .search-area {
      flex: auto;
      padding: 7px;

      #filter-search {
        padding: 14px;
        border: 1px solid #eeeeee;
        width: 100%;
        -webkit-border-radius: 7px;
        -moz-border-radius: 7px;
        border-radius: 12px;
      }
    } */

    .search-area {
        margin: 7px 14px;
        border: 1px solid hsl(0, 0%, 93%);
        position: relative;
        overflow: hidden;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;

        #filter-search {
            width: 100%;
            appearance: none;
            border: none;
            box-shadow: none;
            border-radius: 4px;
            border: 1px solid #f1f1f1;
            padding-left: 14px;

            &::placeholder {
                color: #ccc;
            }

            &:focus {
                border-color: $primary;
            }
        }

        .search-btn {
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            width: fit-content;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            border-radius: 4px;
            line-height: 1;
            padding: {
                left: 14px;
                right: 14px;
            }

            margin: 2px 2px;

            &:hover {
                border-color: #000;
            }
        }
    }

    .option-menu {
        background: transparent;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin: 7px 14px;
        flex-wrap: wrap;

        .menu-item {
            color: rgb(167, 170, 167);
            margin: 1px;
            cursor: pointer;
        }
    }

    .filter-button-group {
        display: flex;
        padding: 0 7px;
        width: auto;
        flex-wrap: nowrap;
        align-items: center;

        .filter-btn {
            white-space: nowrap;

            span {
                margin-left: 4px;
                @media (max-width: 360px) {
                    display: none;
                }
            }
        }
    }

    .filters {
        display: flex;
        align-items: baseline;
        justify-content: flex-start;
        border: 1px solid $gray-200;
        -webkit-border-radius: $bdrs;
        -moz-border-radius: $bdrs;
        border-radius: $bdrs;
        padding: 15px;
        background: $gray-100;
        position: relative;
        flex-wrap: wrap;

        .filter-btn {
            padding: 2px 7px;
            margin: auto 7px;
            -webkit-border-radius: $bdrs;
            -moz-border-radius: $bdrs;
            border-radius: $bdrs;
            border: 1px solid currentColor;
            cursor: pointer;
            background: $white;
            -moz-box-shadow: 0 7px 7px -7px $shadow;
            -webkit-box-shadow: 0 7px 7px -7px $shadow;
            box-shadow: 0 7px 15px -6px $shadow;
            font-weight: bold;

            &:hover,
            &:active {
                /*-webkit-box-shadow:  0px 7px 7px -7px $shadow;-moz-box-shadow:  0px 7px 7px -7px $shadow;box-shadow:  0px 7px 7px -7px $shadow;*/
                box-shadow: inset 0 0 0 1px $gray-100, 0 0 0 2px $gray-400;
                border: none;
            }
        }
    }
</style>
