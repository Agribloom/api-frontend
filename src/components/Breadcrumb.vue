<template>
    <div class="breadcrumb">
        <ul class="crumbs">
            <li v-for="(crumb, index) in crumbs" :key="index">
                <router-link :to="{'path':crumb.location}" :class="crumb.classes">
                    <i class="fas fa-home" v-if="!index"></i>
                    {{crumb.name}}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Breadcrumb',
    props: {
        breadcrumbs: {
            type: Array,
            default: function () {
                return [{ id: 0, name: 'Home' }]
            }
        }
    },
    data: function () {
        return {}
    },
    computed: {
        crumbs: function () {
            return this.breadcrumbs
        }
    }
}
</script>

<style lang="scss">
    @import '../lib/style/__variable.scss';

    .crumbs {
        display: -webkit-flex;
        display: -ms-flex;
        display: flex;
        justify-content: center;
        align-items: center;
        width: auto;
        border-radius: 2px;
        flex-wrap: wrap;
        background: #fff;
        padding: 4px 8px;

        @media (min-width: 1200px) {
            justify-content: left;
        }

        li {
            border: none;
            font-family: inherit;
            font-size: .75em;
            font-weight: 300;
            padding: 0;
            line-height: 0;

            &:not(:last-of-type):after {
                color: $light-typo;
                content: "\2022";
                display: inline-block;
                font-size: 18px;
                margin: 0;
                position: relative;
                line-height: 1;
                vertical-align: baseline
            }

            a {
                color: $light-typo;
                cursor: pointer;
                line-height: 1.5;
                margin: 0;
                padding: 4px 8px;

                &:hover {
                    color: $dark;
                }

                &.active {
                    color: $light-typo;
                    cursor: default;
                    font-weight: bold;

                }

                i {
                    line-height: 1;
                    color: $light-typo;
                }
            }
        }
    }
</style>
