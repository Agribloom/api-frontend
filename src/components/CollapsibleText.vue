<template>
    <div class="collapsible" @click="toggleCollapse">
        <p :class="[{'collapsible-text':collapse}]" :style="[{'height': frameHeight}]" ref="paragraph">
            <slot></slot>
        </p>
        <div class="more" v-if="action">
            <i :class="hintClass"></i> {{hint}}
        </div>
    </div>
</template>

<script>
export default {
    name: 'CollapsibleTextComponent',
    props: {
        action: {
            type: Boolean,
            default: true
        },
        height: { type: [Number, String], default: 0 }
    },
    data () {
        return {
            collapse: true,
            text: null
        }
    },

    computed: {
        frameHeight () {
            if (!this.collapse) {
                return 'auto'
            } else {
                return `${this.height}px`
            }
        },
        hintClass () {
            return {
                la: true,
                'la-plus': this.collapse,
                'la-minus': !this.collapse
            }
        },
        hint () {
            return this.collapse ? 'Read more' : 'Collapse'
        }
    },
    methods: {
        toggleCollapse () {
            this.collapse = !this.collapse
        }
    }
}
</script>

<style scoped lang="scss">

    $height: 50 !default;
    $line-height: 1.5;
    $top: $height - $line-height;
    .collapsible {
        line-height: $line-height;
        position: relative;
        overflow: hidden;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;

        .collapsible-text {
            overflow: hidden;
            position: relative;
            background: white;
            background: linear-gradient(to top, white, transparent);

            &:before {
                position: absolute;
                display: block;
                content: '';
                top: 0;
                right: 0;
                height: 100%;
                background: inherit;
                width: 100%;
            }
        }

        .more {
            background: transparent;
            border: none;
            color: #c4c4c4;
            padding: 4px;
            font-size: 17px;
            font-weight: bold;
            cursor: pointer;
            display: inline-block;
            margin: 0;
            &:hover,
            &:focus, &:active {
                text-decoration: underline;
                outline: none;
            }
        }
    }
</style>
