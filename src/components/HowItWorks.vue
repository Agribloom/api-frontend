<template>
    <div>
        <div @click="openModal" class="hiw">
            <span class="hiw_toggler">
                <i class="la la-play"></i> How it works
            </span>
        </div>
        <modal-component ref="modal">
            <iframe
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                    frameborder="0"
                    height="500"
                    src="video-url"
                    width="770"
            ></iframe>
        </modal-component>
    </div>
</template>

<script>
export default {
    name: 'howItWorks',
    data () {
        return {
            'video-url': 'https://www.youtube.com/embed/oJAbATJCugs'
        }
    },
    methods: {
        openModal () {
            this.$refs.modal.modalOpen()
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../lib/style/_variable';

    .hiw_toggler {
        cursor: pointer;
        }

    .hiw {
        border: 2px solid $white;
        -moz-border-radius: 2px;
        -webkit-border-radius: 2px;
        border-radius: 4px;
        -moz-box-shadow: 0px 5px 5px -4px #000000;
        -webkit-box-shadow: 0px 5px 5px -4px #000000;
        box-shadow: 0px 5px 5px -4px #000000;
        display: flex;
        margin-top: 30px;
        padding: 12px;
        width: 250px;
        background: $primary;
        cursor: pointer;
        span {
            align-items: center;
            color: $white;
            display: flex;

            i {
                align-items: center;
                background: $white;
                color: $primary;
                display: inline-flex;
                height: 15px;
                justify-content: center;
                line-height: 1;
                margin-right: 20px;
                padding: 15px;
                vertical-align: middle;
                width: 25px;
                }
            }
        }
</style>
