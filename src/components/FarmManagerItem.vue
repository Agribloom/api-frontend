<template>
    <div class="manager-card">
        <div class="left">
            <div class="thumb">
                <img :src="IMAGE" alt="">
            </div>
        </div>
        <div class="right">
            <h5 class="name">{{NAME}}</h5>
            <div class="small meta">
                <div class="meta-item">
                    <span class="email">
                        <i class="la la-envelope mr-2"></i>{{EMAIL}}
                    </span>
                </div>
                <div class="meta-item">
                    <span class="position"><i class="la la-user mr-2"></i>{{ROLE}}</span>
                </div>
                <div class="meta-item">
                    <span class="position"><i class="la la-phone mr-2"></i>{{PHONE}}</span>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'FarmManagerItem',
    props: {
        manager: {
            default () {
                return {}
            },
            type: Object,
            required: true
        }
    },
    computed: {
        /**
             * @return {string}
             */
        NAME () {
            return `${this.manager.meta.last_name}, ${this.manager.meta.first_name}`
        },
        ROLE () {
            return this.manager.role
        },
        EMAIL () {
            return this.manager.meta.email
        },
        IMAGE () {
            return this.manager.meta.image || '/assets/images/avatar_placeholder.png'
        },
        PHONE () {
            return this.manager.meta.phone_number
        }
    }
}
</script>

<style scoped lang="scss">
    @import "../lib/style/_variable";

    .manager-card {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        border-bottom: none;
        background: #fff;
        -webkit-box-shadow: 0 7px 15px 1px #efefef;
        -moz-box-shadow: 0 7px 15px 1px #efefef;
        box-shadow: 0 7px 15px 1px #efefef;
        -webkit-border-radius: 12px;
        -moz-border-radius: 12px;
        border-radius: 12px;
        margin: 14px 0;
        position: relative;
        overflow: hidden;
        transition: box-shadow .5s ease-in;

        &:hover {
            -webkit-box-shadow: 0 0 15px -7px #efefef;
            -moz-box-shadow: 0 0 15px -7px #efefef;
            box-shadow: 0 0 15px 1px #efefef;
        }
        .left {
            padding: 15px;
            display: inline-flex;
            justify-content: center;
            @media handheld, (max-width: 530px) {
                flex: 1 0 auto;
            }
            .thumb {
                width: 120px;
                height: 120px;
                -webkit-border-radius: 50%;
                -moz-border-radius: 50%;
                border-radius: 50%;
                position: relative;
                overflow: hidden;
                margin: 2px 7px;
            }
        }

        .right {
            padding: 15px 15px 30px;
            flex: auto;
            @media handheld, (max-width: 530px) {
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
            }
            .name {
                color: $primary;
                letter-spacing: 1px;
                font-weight: 600;
                line-height: 1.5;
            }

            .meta {
                .meta-item {
                    color: #a4a4a4;
                    letter-spacing: 1px;
                }
            }
        }
    }
</style>
