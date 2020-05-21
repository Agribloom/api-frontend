<template>
    <div class="update-card" @click="showUpdateDetail">
        <div class="stage-indicator">
            <span></span>
        </div>
        <div class="meta">
            <i class="la la-calendar"></i> <span>{{update.created | formatDataDate}}</span>
        </div>
        <div class="body">
            <div class="content">
                <div class="title">
                    {{update.activity | capitalize}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import mixin from '@/mixin'

export default {
    name: 'FarmUpdateItem',
    mixins: [mixin],
    props: {
        update: {
            required: true
        }
    },
    computed: {
        /* imageSrc() {
                return this.update.image.src || '/assets/images/placeholder.png'
            } */
    },
    methods: {
        showUpdateDetail () {
            this.$emit('showUpdate', this.update.id)
        }
    }
}
</script>

<style scoped lang="scss">
    @import "../lib/style/_variable";

    .update-card {
        counter-reset: farmUpdate;

        .stage-indicator {
            position: absolute;
            top: 0;
            font-size: 24px;
            background: #f6f6f6;
            color: #e6e6e6;
            -webkit-border-bottom-right-radius: 50%;
            -moz-border-bottom-right-radius: 50%;
            border-bottom-right-radius: 20%;
            min-width: 40px;
            min-height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            left: 0;

            &::before {
                padding: 2px 7px;
                counter-increment: farmUpdate;
                content: counter(farmUpdate)
            }

        }
        margin: 14px 0;
        padding: 12px 4px;
        -webkit-box-shadow: 0vmin 7px 7px -7px #ddd;
        -moz-box-shadow: 0vmin 7px 7px -7px #ddd;
        box-shadow: 0vmin 7px 15px 1px #efefef;
        -webkit-border-radius: 12px;
        -moz-border-radius: 12px;
        border-radius: 12px;
        cursor: pointer;
        transition: box-shadow .35s ease-in-out;
        position: relative;
        overflow: hidden;
        &:hover {
            box-shadow: 0vmin 0px 15px 1px #efefef;
        }

        .meta {
            font-size: 12px;
            color: $light-typo;
            padding-right: 7px;
            padding-left: 7px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-end;
        }

        .body {
            display: flex;
            padding: 7px 14px;
            @media (max-width: 577px) {
                flex-direction: column;
            }

            .content {
                flex: 1;
                font-size: 1.1em;
                margin: 7px;

                .title {
                    font-size: 1em;
                    font-weight: 300;
                    margin-bottom: 7px;
                    text-transform: capitalize;
                    letter-spacing: 1px;
                    line-height: 1.5;
                    color: #a4a4a4;
                }

                .description {
                    margin: 2px 7px;
                    font-weight: 300;
                    color: $light-typo;
                }

            }

            .image {
                width: 100px;
                height: 100px;
                border: 1px solid $light-bd;
                margin: 7px;
            }
        }
    }
</style>
