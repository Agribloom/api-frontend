<template>
    <div class="bg-white">

        <div>
            <!--<carousel
                    :autoplay="true"
                    :autoplayHoverPause="true"
                    :perPageCustom="1 ">
                <slide >
                    <image-item :alt="data.image.alt" :source="data.image.src" />
                </slide>
            </carousel>-->
            <div class="update-panel-thumb">
                <div class="update-panel-instruction">
                    <div class="update-hint">
                        <i class="la la-exclamation-circle icon"></i>
                        <p>Simply click on the text below to toggle</p>
                    </div>
                </div>
                <swiper :navigation="false">
                    <swiper-slide v-for="update in data.images" :key="`update-image-${update.id}`">
                        <img :src="update.image" :alt="`update-image-${update.id}`">
                    </swiper-slide>
                </swiper>
            </div>
        </div>
        <div class="container-fluid p-0">
            <div class="update-panel">

                <div class="headline strong">{{data.activity }}</div>

                <div class="content">
                    <farm-description :description="data.description"/>
                </div>

            </div>

        </div>
    </div>
</template>

<script>

export default {
    name: 'FarmUpdateView',
    props: {
        data: {
            required: true,
            default () {
                return {}
            }
        }
    }
}
</script>

<style scoped lang="scss">
    .update-panel-instruction {
        position: absolute;
        z-index: 2;
        padding: 7px 0;

        .update-hint {
            background: #efffef;
            display: inline-flex;
            align-items: center;
            -webkit-border-radius: 4px;
            -moz-border-radius: 4px;
            color: #a4a4a4;
            line-height: 1.5;
            border-radius: 4px;
            padding: 7px;

            .icon {
                font-size: 20px;
            }

            p {
                font-size: 16px;
                display: inline-block;
                padding: 0 4px;
                margin: 0;
                color: currentColor;
            }
        }
    }
    .update-panel-thumb {
        margin-right: auto;
        margin-left: auto;
        width: 100%;
        min-height: 200px;
        max-height: 400px;
        object-position: center;
        object-fit: contain;
        display: flex;
        justify-content: center;
        position: relative;
        overflow: hidden;

    }

    .update-panel {
        background: #fff;
        position: relative;
        padding: 10px 30px;
        line-height: 1.5;
        overflow: hidden;
        overflow-y: auto;
        height: auto;
        margin: 30px auto;
        @media (min-width: 768px) {
            width: 70vw;
        }

        .headline {
            font-size: 24px;
            margin: 15px auto;
            text-transform: capitalize;
            font-weight: 600;
        }

        @media (max-width: 500px) {
            padding: 30px;
        }
    }
</style>
