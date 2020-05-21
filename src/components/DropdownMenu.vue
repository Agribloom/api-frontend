<template>
    <div class="dropdown">
        <div class="dropdown-toggle" :title="`${menu.title} dropdown menu`" :id="`${id}-Dropdown`" data-toggle="dropdown"
             aria-haspopup="true" aria-expanded="false">
            {{menu.title}}
            <span v-show="keyword && !checkClear">
                <i class="keyword primary" :title="`${keyword}`">{{keyword}}</i>
                <i @click.stop="onClear" title="Clear option" class="clear">&times;</i>
            </span>
        </div>
        <div class="dropdown-menu" :aria-labelledby="this.$attrs.key">
            <dropdown-menu-item :item="item" v-for="item in menu.items" :key="`${id}-DropdownMenu-${item.value}`"
                                @selected="setSelected"/>
        </div>
    </div>
</template>

<script>
import DropdownMenuItem from './DropdownMenuItem'

export default {
    name: 'DropdownMenu',
    components: { DropdownMenuItem },
    props: {
        cleared: {
            required: false,
            default: false
        },
        id: {
            required: true
        },
        items: {
            required: true,
            type: Object,
            default () {
                return {
                    value: 0,
                    text: ''
                }
            }
        },
        title: {
            default: null,
            required: false
        }
    },
    computed: {
        checkClear () {
            if (this.cleared) { this.onClear() }
            return this.cleared
        }
    },
    data () {
        return {
            keyword: '',
            menu: {
                title: this.title || 'Default title',
                items: this.items
            }
        }
    },
    methods: {
        setSelected (value) {
            //    Find the value
            let result = {
                id: this.id
            }
            let selected = Object.keys(this.menu.items).filter(key => {
                let test = this.menu.items[key].value === value
                if (test) {
                    /* Set selected keyword */
                    // Set the keyword on the dropdown menu
                    this.keyword = key.replace(/[_-]/gi, ' ')
                    // Temporary placeholder
                    // let temp = {}
                    // temp[this.id] = key
                    result.filter = value
                }
                return test
            })
            // Set the title to value
            if (selected) { this.$emit('onSelect', result) }
        },
        onClear () {
            this.keyword = ''
            this.$emit('onSelect', { id: this.id, filter: null })
        }
    }
}
</script>
<style lang="scss">
    @import '../lib/style/_variable';
    .dropdown {
        .dropdown-toggle {
            display: flex;
            align-items: center;
            span {
                display: flex;
                padding-right: 7px;
                background: #eee;
                -webkit-border-radius: $bdrs;
                -moz-border-radius: $bdrs;
                border-radius: $bdrs;
                margin: auto 7px;
                border: 1px solid $light;

                .clear{
                    margin-left: 2px;
                }
            }
        }
    }
</style>
