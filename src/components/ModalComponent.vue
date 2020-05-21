<template>
    <transition name="fade">
        <div @keyup.esc="escapeKeyListener" class="modal" v-if="state">
            <div @click="modalClose" class="close">&times;</div>
            <div class="content-layout">
                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    created () {
        document.addEventListener('keyup',
            this.escapeKeyListener)
    },
    destroyed () {
        document.removeEventListener('keyup',
            this.escapeKeyListener)
    },
    data () {
        return {
            open: false
        }
    },
    computed: {
        state () {
            return this.open
        }
    },
    methods: {
        toggleState () {
            !this.open ? this.modalOpen() : this.modalClose()
        },
        modalOpen () {
            this.open = true
            $('body').addClass('fixed')
        },
        modalClose () {
            this.open = false
            $('body').removeClass('fixed')
        },
        escapeKeyListener (evt) {
            if (evt.keyCode === 27) {
                if (this.open) {
                    this.modalClose()
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../lib/style/_variable';

    $bg: rgba(0, 0, 0, 0.95);

    .modal {
        background-color: $bg;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        position: fixed;
        justify-content: center;
        border: 2px solid $primary;
        display: flex;
        z-index: 5000;

        .close {
            position: absolute;
            top: 30px;
            font-size: 2em;
            right: 30px;
            cursor: pointer;
            z-index: 5002;
            padding: 7px 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 50px;
            width: 50px;
            background: $white;
            -moz-transition: all .5s ease-in-out;
            -ms-transition: all .5s ease-in-out;
            -o-transition: all .5s ease-in-out;
            -webkit-transition: all .5s ease-in-out;
            transition: all .5s ease-in-out;
            border: 1px solid $light;
            -moz-border-radius: $bdrs;
            -webkit-border-radius: $bdrs;
            border-radius: $bdrs;
            -moz-box-shadow: 0 7px 7px -7px $shadow;
            -webkit-box-shadow: 0 7px 7px -7px $shadow;
            box-shadow: 0 7px 15px -6px $shadow;
            &:hover {
                box-shadow: inset 0 0 0 1px $gray-100, 0 0 0 2px $gray-200;
                border:none;
                color: $primary-light;
            }
        }

        .content-layout {
            background: white;
            padding: 0;
            display: block;
            position: relative;
            object-fit: fill;
            object-position: center;
            height: 100vh;
            overflow: auto;
            top: 0;
            @media(max-width: 768px) {
                padding: 0;
            }
        }
    }
</style>
