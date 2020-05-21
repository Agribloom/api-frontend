<template>
    <div class="pagination-wrapper">

        <slot :contents="displayedContent"></slot>

        <nav aria-label="Page navigation" class="">
            <ul class="pagination">
                <li class="pagination-item">
                    <a @click="previous" v-if="showPrev">
                        <i class="la la-chevron-left"></i>
                    </a>
                </li>
                <li class="pagination-item">
                    <a :class="{active: number === page}" :key="name + index"
                       @click="goToPage(number)" v-for="(number, index) in pageNumbers"
                       v-text="number"></a>
                </li>
                <li class="pagination-item">
                    <a @click="next" v-if="showNext">
                        <i class="la la-chevron-right"></i>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>

export default {
    name: 'PaginationItem',
    props: {
        name: {
            required: true
        },
        contents: {
            default () {
                return []
            },
            required: true
        },
        perPage: {
            default: 10,
            type: Number
        },
        start: {
            default: 1,
            type: Number,
            required: false
        }
    },
    data () {
        return {
            id: this.name + '-pagination-item',
            pages: [],
            paginated: [],
            page: this.start
        }
    },
    created () {
        // get and set the contents and pages respectively
        this.getContent()
    },
    watch: {
        // when the set content changes, set the pages
        paginated () {
            this.setPages()
        }
    },
    methods: {
        goToPage (number) {
            this.page = number
        },
        getContent () {
            this.paginated = this.contents
            this.setPages()
        },
        setPages () {
            let numberOfPages = Math.ceil(this.contents.length / this.perPage)
            this.pages = []
            for (let index = 1; index <= numberOfPages; index++) {
                this.pages.push(index)
            }
        },
        paginate (contents) {
            let from = (this.page * this.perPage) - this.perPage
            let to = (this.page * this.perPage)
            return contents.slice(from, to)
        },
        previous () {
            this.page--
        },
        next () {
            this.page++
        }
    },
    computed: {
        pageNumbers () {
            return this.pages.slice((this.page - 1), (this.page.length))
        },
        displayedContent () {
            return this.paginated = this.paginate(this.contents)
        },
        showPrev () {
            return this.page > 1
        },
        showNext () {
            return this.page < this.pages.length
        }
    },

    filters: {
        trimWords (value) {
            return value.split(' ').splice(0, 20).join(' ') + '...'
        },
        isPage (number) {
            return this.page === number
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "../lib/style/_variable";

    .pagination {
        justify-content: space-around;
        padding: 2px;
        margin: 60px auto;
        display: flex;

        .pagination-item {
            display: inline-flex;
            justify-content: center;
            width: auto;
            flex: 1;

            a {
                cursor: pointer;
                display: block;
                background: $bg-input;
                border: 5px solid $white;
                border-radius: 100%;
                box-shadow: 0 0 3px 0 rgba(136, 136, 136, 0.6);
                color: $primary;
                font-weight: 700;
                height: 50px;
                line-height: 40px;
                text-align: center;
                -moz-transition: all 0.3s ease;
                -webkit-transition: all 0.3s ease;
                transition: all 0.3s ease;
                width: 50px;
                margin: auto 5px;

                &.dot {
                    line-height: 35px;
                }

                &.active,
                &:hover {
                    background: $primary-gradient;
                    color: $white;
                }
            }
        }
    }
</style>
