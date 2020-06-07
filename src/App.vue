<template>
    <div id="app">
        <router-view/>
        <scroll-top/>
        <div class="track-popup">
            <cookie-law @accept="enableTracking" theme="agribloom">
                <div slot-scope="props">

                    <p>We may collect information from you automatically through
                        cookies or similar technology. Accept our
                        <router-link :to="{name: 'privacy'}">Privacy Policy</router-link>
                    </p>

                    <button class="cbtn primary" @click="props.accept"><span>I accept</span></button>
                    <button class="cbtn danger" @click="props.close"><span>Ignore me</span></button>
                </div>
            </cookie-law>
        </div>
    </div>
</template>

<script>
import CookieLaw from 'vue-cookie-law'
import mixin from '@/mixin'

export default {
    name: 'App',
    mixins: [mixin],
    components: { CookieLaw },
    mounted () {
        if ($('body').hasClass('preloading')) {
            setTimeout(() => {
                $('body').removeClass('preloading').addClass('not-preloading')
            }, 1000)
        }
    }
}
</script>

<style lang="scss">
    @import url("https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css");
    .track-popup {
        position: fixed;
        left: 10%;
        right: 10%;
        background: #fff;
        bottom: 0;
        z-index: 100000;
    }

    .Cookie--agribloom {
        display: flex;
        background: #fff;
        align-items: center;
        padding: 15px;
        -webkit-box-shadow: 0 -7px 7px -7px #ddd;
        -moz-box-shadow: 0 -7px 7px -7px #ddd;
        box-shadow: 0 -7px 7px -7px #ddd;
    }


</style>
