<template>
    <div class="table-style">
        <div v-if="!hasError">
            <nomsg-spinner v-if="loading"/>
            <div v-else-if="hasData">
                <!--            Table controls-->
                <div class="table-controls" v-if="controls">
                    <div class="v-control m-2 table-search">
                        <label class="sr-only" for="table-search">Search by keyword</label>
                        <input
                                class="table-search"
                                id="table-search"
                                placeholder="Search by keyword..."
                                type="search"
                                v-model="search"
                        />
                    </div>
                    <div class=" m-2" style="width: 70px ; margin-left: 0;">
                        <label class="sr-only" for="table_item_per_page">Items per page</label>
                        <div class="form-element">
                            <select
                                    @change="resetPagination"
                                    id="table_item_per_page"
                                    class=""
                                    v-model="paginate.limit"
                            >
                                <option
                                        :key="`perPage-${i}`"
                                        :selected="paginate.limit === i * 5"
                                        :value="i * 5"
                                        v-for="i in 5"
                                >{{ i * 5 }}
                                </option>
                            </select>
                            <div class="form-element-icon">
                                <i class="fa fa-chevron-down"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <!--            End-->
                <!--            Table pagination - top-->
                <nav class="pagination" v-if="paginate.show">
                  <span class="page-stats hint">
                    <strong>{{ paginate.from }}</strong> - <strong>{{ paginate.to }}</strong> of
                    <strong>{{ paginate.length }}</strong> result(s) found
                  </span>

                    <div class="pagination-btn">
                        <button
                                :class="{ disabled: !paginate.prev }"
                                :disabled="!paginate.prev"
                                @click="previous"
                                class="cbtn pagination-prev"
                                title="Previous"
                        >
                            <i class="la la-chevron-left"></i>
                        </button>

                        <button
                                :class="{ disabled: !paginate.next }"
                                :disabled="!paginate.next"
                                @click="next"
                                class="cbtn pagination-next"
                                title="Next"
                        >
                            <i class="la la-chevron-right"></i>
                        </button>
                    </div>
                </nav>
                <!--End-->
                <!-- Main table -->
                <div class="shade data-table">
                    <table class="table table-bordered table-responsive-sm table-hover table-striped">
                        <!-- Table head -->
                        <colgroup>
                            <col :key="`column-${column.name}${index}`"
                                 v-for="(column, index) in columns"
                                 :class="[{'linkable': column.route}]">
                        </colgroup>
                        <thead>
                        <tr>
                            <th
                                    :class="{
                                  'sortable': column.sortable,
                                  'active': column.name === sort.key
                                }"
                                    :key="column.name"
                                    @click="sortBy(column.name)"
                                    v-for="column in columns"
                                    v-text="column.label"
                            ></th>
                            <!-- Editable Options -->
                            <template v-if="editable">
                                <th>Actions</th>
                            </template>
                        </tr>
                        </thead>
                        <!-- End -->
                        <!-- Table body -->
                        <tbody v-if="hasData">
                        <tr :key="row.id" v-for="row in PaginatedData">
                            <template v-for="content in columns">
                                <td :key="content.id" :class="{'linkable': content.route}">
                                <span
                                        :class="content.classes"
                                        v-html="
                                    formatEntry(
                                      row[content.name],
                                      content.type,
                                      content.name
                                    )
                                  "
                                ></span>
                                </td>
                            </template>
                            <!--                                Data table actions-->
                            <template v-if="editable">
                                <td>
                                    <a
                                            aria-expanded="false"
                                            class="dropdown-toggle"
                                            data-toggle="dropdown"
                                            href="#"
                                    >Action</a>
                                    <div class="dropdown-menu">
                                        <a
                                                :key="('action-' + action.label) | lowercase"
                                                @click.prevent="handleAction(action.label, row.id)"
                                                class="dropdown-item"
                                                href="#"
                                                v-for="action in actions"
                                        >
                                            <i :class="action.icon"></i>
                                            {{ action.label }}
                                        </a>
                                    </div>
                                </td>
                            </template>
                        </tr>
                        </tbody>
                        <!-- End -->
                    </table>

                    <div v-if="!hasData" class="account-card shade">
                        <div class="row justify-content-center p-2">
              <span class="hint">
                <i class="la la-exclamation-triangle"></i> No data available yet
              </span>
                        </div>
                    </div>
                </div>
                <!-- End Main table -->
                <nav class="pagination" v-if="paginate.show">
                  <span class="page-stats hint">
                   <strong>{{ paginate.from }}</strong> - <strong>{{ paginate.to }}</strong> of
                    <strong>{{ paginate.length }}</strong> result(s) found
                  </span>

                    <div class="pagination-btn">
                        <button
                                :class="{ disabled: !paginate.prev }"
                                :disabled="!paginate.prev"
                                @click="previous"
                                class="cbtn pagination-prev"
                                title="Previous"
                        >
                            <i class="la la-chevron-left"></i>
                        </button>

                        <button
                                :class="{ disabled: !paginate.next }"
                                :disabled="!paginate.next"
                                @click="next"
                                class="cbtn pagination-next"
                                title="Next"
                        >
                            <i class="la la-chevron-right"></i>
                        </button>
                    </div>
                </nav>
            </div>
            <div v-else>
                <alert-item :fontIcon="emptyError.icon"
                            :messages="emptyError.message"
                            :title="emptyError.title"
                >
                </alert-item>
            </div>
        </div>
        <div v-else>
            Error
        </div>
    </div>
</template>

<script>
    import mixin from "@/mixin";

    export default {
        name: "DataTable",
        mixins: [mixin],
        created() {
            /* this.loadData(); */
            // this.$on('refreshData', this.extractData())
            this.setSortOrder;
        },
        props: {
            emptyErrorResponse: {
                required: false
            },
            api: {
                type: String,
                default: ""
            },
            data: {
                type: [Array, Object],
                default() {
                    return [];
                }
            },
            fields: {
                required: true,
                default() {
                    return [];
                }
            },
            pagination: {
                default: true
            },
            controls: {
                default: true
            },
            editable: {
                default: true
            },
            sort_key: {
                default: "id"
            }
        },
        data() {
            return {
                loading: false,
                tryAgain: false,
                paginate: {
                    show: this.pagination,
                    from: 1,
                    to: 10,
                    page: 1,
                    prev: false,
                    next: false,
                    limit: 5,
                    length: 0
                },
                search: "",
                sort: {
                    key: this.sort_key,
                    order: {}
                },
                total: 15,
                errors: [],
                actions: {
                    delete: {
                        api: "",
                        label: "Delete",
                        icon: "la la-trash"
                    },
                    edit: {
                        api: "",
                        label: "Edit",
                        icon: "la la-edit"
                    }
                }
            };
        },
        computed: {
            emptyError() {
                return Object.assign({
                    icon: '',
                    message: "No Data Found!",
                    title: 'Empty Record'
                }, this.emptyErrorResponse)
            },
            dataLoading: {
                set(value) {
                    this.loading = value;
                    this.$emit('loading', this.loading)
                },
                get() {
                    return this.loading
                }
            },
            rows() {
                this.dataLoading = true;
                let data = [];
                try {
                    if (this.data.length) data = [...this.data];
                    else if (this.api) {
                        this.dataLoading = true
                        data = window.axios.get(this.api).then(resp => resp).finally(() => {
                            this.dataLoading = false
                        });
                    } else {
                        this.$emit("onError", {message: "No data provided"});
                    }
                    return data;
                } catch (e) {
                    console.error(e)
                } finally {
                    this.dataLoading = false
                }
            },
            columns() {
                if (this.fields.length > 0) {
                    // Ensure that the column data is not empty
                    return this.fields;
                } else {
                    this.$emit("onError", {message: "No field provided"});
                    // throw new Error("No field provided");
                }
            },
            assertFieldData() {
                /* Ensures that the expected row data matches that of the column */
                if (this.rows && this.columns) {
                    let columns = Object.keys(this.columns)
                    let rows = Object.keys(this.rows)
                    let assertion = {}
                    rows.forEach(row => {
                        columns.includes(row) ? assertion[row] = columns[row] : null
                    })
                    if (!assertion.length) {
                        this.addError("Data mismatch! \nContact the system admin");
                        this.rows = [];
                    } else {
                        this.rows = assertion;
                    }

                }
            },
            setSortOrder() {
                if (this.rows.length > 0 && this.columns) {
                    this.resetPagination();
                    this.columns.forEach(column => {
                        if (this.sort.key === column.name) {
                            this.sort.order[column.name] = 1;
                        } else {
                            this.sort.order[column.name] = -1;
                        }
                    });
                }
            },
            hasData() {
                return this.rows.length > 0;
            },
            hasError() {
                return this.errors.length > 0;
            },
            PaginatedData() {
                return this.filteredData.slice(this.paginate.from - 1, this.paginate.to);
            },
            filteredData() {
                let filter = this.rows;
                // If user searches
                if (this.search) {
                    this.resetPagination();

                    function hasSearchString(obj, keyword) {
                        let keys = Object.keys(obj);

                        return keys.find(
                            key =>
                                String(obj[key])
                                    .toLowerCase()
                                    .indexOf(keyword.toLowerCase()) != -1
                        );
                    }

                    filter = this.rows.filter(obj => {
                        let has = hasSearchString(obj, this.search);
                        return has ? obj : null;
                    });
                }
                // If the sort key exist
                if (this.sort.key) {
                    // Sort based on the selected field
                    let index = this.getIndex(this.columns, "name", this.sort.key);
                    let order = this.sort.order[this.sort.key] || 1;

                    filter = filter.slice().sort((a, b) => {
                        /* If the index can be found  and the column type exist */
                        if (index > -1 && this.columns[index].type) {
                            /* Condiional actions for the type of sortable column */
                            switch (this.columns[index].type.toLowerCase()) {
                                case "date":
                                    a = new Date(a[this.sort.key]).getTime();
                                    b = new Date(b[this.sort.key]).getTime();
                                    break;
                                case "number":
                                    a = Number(a[this.sort.key]);
                                    b = Number(b[this.sort.key]);
                                    break;
                                default:
                                    a = String(a[this.sort.key]).toLowerCase();
                                    b = String(b[this.sort.key]).toLowerCase();
                            }
                            return (a === b ? 0 : a > b ? 1 : -1) * order;
                        }
                    });
                }

                // Set your range
                this.setFrom();
                this.setTo(filter);
                return filter;
            },
        },
        methods: {
            formatEntry: function (value, format, fieldName) {
                let field = this.columns.filter(item => item.name === fieldName);
                let content = value;
                let aBefore = '<a href="';
                let aAfter = "</a>";

                switch (format.toLowerCase()) {
                    case "date":
                        content = this.$options.filters.formatDataDate(value);
                        break;
                    case "number":
                        content = this.$options.filters.numerate(value);
                        break;
                    case "object":
                        content = value[field[0].content];
                        break;
                    default:
                        content = value;
                }

                if (field[0].route) {
                    let pattern = "";
                    let route = "";
                    /* Get route pattern */
                    try {
                        if (field[0].routePattern) {
                            pattern = field[0].routePattern;
                        } else {
                            throw new Error("Must use a route pattern for routes");
                        }
                        if (pattern) {
                            pattern.forEach(p => {
                                /* concatenate each pattern mapped to the field input
                                                                                                                                                        Replace all spaces with - and set to lowercase */
                                route +=
                                    "/" +
                                    (typeof value[p] === "string"
                                        ? value[p].replace(" ", "-").toLowerCase()
                                        : value[p]);
                            });
                            /* Route is in the format: name/pattern */
                            route = "/" + field[0].name.toLowerCase() + route;
                        }
                    } catch (e) {
                        console.log(e.message);
                    }
                    content = aBefore + route + '">' + content + aAfter;
                }
                return content;
            },
            /* Handles actions such as delete, edit etc */
            handleAction(keyword, id) {
                let action = Object.keys(this.actions).find(key => {
                    return key === keyword.toLowerCase();
                });

                if (action) {
                    switch (keyword.toLowerCase()) {
                        case "delete":
                            console.log("Triggers delete");
                            break;
                        case "edit":
                            console.log("Triggers edit");
                            break;
                        default:
                            console.log("Cannot understand your command");
                    }
                }
            },
            /* Adds Errors for Component */
            addError(message) {
                this.errors.push(message);
            },
            /* Get column index */
            getIndex(list, key, value) {
                return list.findIndex(item => item[key] === value);
            },

            /* Sets the next pagination link */
            setTo(filter) {
                this.paginate.length = filter.length;

                if (this.paginate.show) {
                    let next = this.paginate.page * this.paginate.limit;
                    if (next >= this.paginate.length) {
                        this.paginate.to = this.paginate.length;
                        this.paginate.next = false;
                    } else {
                        this.paginate.to = next;
                        this.paginate.next = true;
                    }
                } else {
                    this.paginate.to = this.paginate.length;
                }
            },
            /* Set the previous pagination link */
            setFrom() {
                this.paginate.from =
                    this.paginate.page * this.paginate.limit + 1 - this.paginate.limit;
                this.paginate.prev = this.paginate.from > this.paginate.limit;
            },
            /* Resets the pagination page */
            resetPagination() {
                this.paginate.page = 1;
            },
            /* Sets the sort key */
            sortBy(key) {
                let index = this.columns.findIndex(column => column.name === key);
                if (this.columns[index].sortable) {
                    this.sort.key = key;
                    this.setSortOrder;
                }
            },
            previous() {
                if (this.paginate.from > this.paginate.limit) {
                    --this.paginate.page;
                }
            },
            next() {
                if (this.paginate.to < this.total) {
                    this.paginate.page++;
                }
            }
        }
    };
</script>

<style lang="scss">
    @import "../lib/style/__variable.scss";
    @import "../lib/style/__boot.scss";

    .data-table {
        overflow: hidden;
        overflow-x: auto;
    }

    .table-style {
        display: block;
        overflow: hidden;
        overflow-x: auto;
        width: 100%;
        position: relative;

        table {
            border: 1px $light-bd solid;
            background: $white;
            -webkit-box-shadow: 0px 7px 7px -5px $light;
            -moz-box-shadow: 0px 7px 7px -5px $light;
            box-shadow: 0px 7px 14px -7px $light;

            th {
                padding: 7px;
                font-weight: 600;
                background: transparentize($primary, 0.95%);
                color: $dark;
                border-bottom: 1px $light-bd solid;

                &.active {
                    color: $primary;
                }
            }

            td {
                border-color: $light;
                padding: 4px 7px;
                white-space: nowrap;
                color: $dark-typo;

                span.status-badge {
                    background: $orange;
                    padding: 4px 12px;
                    color: $white;
                    border-radius: $bdrs;
                    line-height: 0.75;
                }
            }
        }
    }

    .table-controls {
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
        align-items: baseline;
        flex-wrap: wrap;

        .table-search {
            outline: none;
            -webkit-flex: auto;
            -ms-flex: auto;
            flex: auto;
            margin-right: 0;
        }
    }

    .pagination {
        margin: 15px auto;
        display: flex;
        -ms-align-items: baseline;
        align-items: baseline;
        justify-content: space-between;

        .page-stats {
            font-weight: 300;
            -webkit-flex: 1;
            -ms-flex: 1;
            flex: 1;
            margin-right: auto;
        }

        .pagination-btn {
            margin-left: auto;
            display: -webkit-flex;
            display: -ms-flex;
            display: flex;
        }
    }

    .sortable {
        cursor: pointer;

        &:after {
            position: relative;
            margin-left: 7px;
            content: "\021C5";
        }
    }

    .linkable {
        a {
            color: $primary;
        }
    }

    .form-element {
        display: block;
        background: #fff;
        position: relative;
        border: 1px solid #ececec;
        -webkit-border-radius: 2px;
        -moz-border-radius: 2px;
        border-radius: 2px;
        margin: 2px;
        overflow: hidden;
        min-height: 40px;
        min-width: 70px;
        height: 100%;

        select {
            appearance: none;
            background: transparent !important;
            border: none;
            display: flex;
            width: 100%;
            height: 100%;
            align-items: center;
            margin: 0;
            z-index: 2;
            position: absolute;
            text-overflow: ellipsis;
            white-space: nowrap;
            padding: 2px 7px 2px 7px;
            right: 14px;
            left: 0;
        }

        .form-element-icon {
            position: absolute;
            right: 7px;
            top: 0;
            color: #cecece;
            z-index: 1;
            height: 100%;
            display: flex;
            align-items: center;
        }
    }
</style>
