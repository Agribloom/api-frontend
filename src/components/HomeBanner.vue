<template>
    <!-- banner start here -->
    <section class="banner">
        <div class="banner-area">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="banner-content">
                            <header class="banner-heading">
                                <h1>
                                    <vue-aos animation-class="fadeIn animated">
                                        <div>Empowering Farmers</div>
                                    </vue-aos>
                                    <small>Feeding Africa Profitably</small>
                                </h1>
                                <div class="d-block">
                                    <div class="custom-btn-group my-4">
                                        <div>
                                            <router-link :to="{ name: 'sign-up' }" class="btn secondary">Sign Up
                                            </router-link>
                                        </div>
                                        <div>
                                            <router-link :to="{ name: 'farms' }" class=" btn primary">Invest Now
                                            </router-link>
                                        </div>
                                    </div>
                                </div>

                                <!--<how-it-works />-->
                            </header>
                        </div>
                    </div>
                </div>
            </div>
            <div class="banner-behind">
                <div v-swiper="swiperOption">
                    <div class="swiper-wrapper">
                        <div
                                class="swiper-slide"
                                v-for="(banner, index) in banners"
                                :key="`banner-slider-img-${index}`"
                        >
                            <img :src="banner"
                                        :alt="`bannerImage${index}`"
                                        class="banner-img"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- banner ending here -->
</template>

<script>
    import mixin from "@/mixin";
    import VueAos from "vue-aos";
    import {Swiper, SwiperSlide, directive} from "vue-awesome-swiper";
    import "swiper/css/swiper.css";

    export default {
        name: "HomeBanner",
        components: {
            Swiper,
            SwiperSlide,
            VueAos
        },
        directives: {
            swiper: directive
        },
        mixins: [mixin],
        data: function () {
            return {
                swiperOption: {
                    spaceBetween: 0,
                    freeMode: false,
                    autoplay: {
                        delay: 3500,
                        disableOnInteraction: false
                    },
                    speed: 3000,
                    autoHeight: true,
                    watchOverflow: true,
                    loop: true,
                    centeredSlides: true
                },
                banners: [
                    "assets/images/banner/bg-image1.jpg",
                    "assets/images/banner/bg-image2.jpg",
                    "assets/images/banner/bg-image3.jpg",
                    "assets/images/banner/bg-image4.jpg"
                ]
            };
        },
        computed: {
            banner: function () {
                return {
                    "background-image": "url(" + this.base + this.img + ")",
                    "background-size": "cover",
                    "background-repeat": "no-repeat",
                    width: "100%",
                    height: "100%"
                };
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "@/lib/style/__variable.scss";

    .banner-behind {
        position: absolute;
        top: 0;
        z-index: -1;
        width: 100%;
        border: 1px solid transparent;
        overflow: hidden;
        display: block;
        content: '';

        .banner-img {
            width: 100%;
            position: relative;
            object-fit: cover !important;
            object-position: center;
            height: 100% !important;
        }

        @media (max-width: 700px) {
            top: 50%;
        }
    }

    @media (min-width: 1200px) {
        .banner {
            background-position: center right;
        }
    }

    @media (min-width: 992px) {
        .banner {
            .banner-shape_1,
            .banner-shape_2,
            .banner-shape_3,
            .banner-shape_4,
            .banner-shape_5,
            .banner-shape_6,
            .banner-shape_7 {
                display: inherit;
            }
        }
    }

    @media (max-width: 1399px) and (min-width: 992px) {
        .banner .banner-shape_1 {
            right: -50%;
        }
    }

    @media (max-width: 1399px) and (min-width: 1200px) {
        .banner .banner-shape_1 {
            right: -200px;
        }
    }

    @media (max-width: 1199px) and (min-width: 992px) {
        .banner .banner-shape_2 {
            right: 10%;
        }
    }

    @media (max-width: 1199px) and (min-width: 992px) {
        .banner .banner-shape_3 {
            right: -5%;
        }
    }

    @media (min-width: 992px) {
        .banner .banner-area .banner-content .banner-heading h2 {
            font-size: 65px;
            line-height: 72px;
        }
    }

    @media (min-width: 992px) {
        .banner.style-2 .banner-area .banner-content .banner-heading h2 {
            font-size: 60px;
        }
    }

    @media (min-width: 1200px) {
        .banner.style-2 .banner-area .banner-content p {
            margin: auto;
            margin-bottom: 40px;
            max-width: 70%;
        }
    }

    .banner-area {
        bottom: 0;
        padding: 25px 0;
        position: relative;
        top: 0;
        @media (max-width: 992px) {
            margin-top: 10%;
        }

        &:before {
            background: linear-gradient(to bottom, white 50%, rgba(30, 30, 0, 0));
            content: " ";
            height: 100%;
            left: 0;
            position: absolute;
            top: 0;
            width: 100%;
        }

        .banner-content {
            margin-top: 75px;
            margin-left: 75px;

            @media (max-width: 992px) {
                margin-top: 1em;
            }
            @media (max-width: 954px) {
                margin-left: 20px;
            }
            @media (max-width: 500px) {
                margin-top: 0;
            }

            .banner-heading {
                display: inline-block;

                h1 {
                    color: dark;
                    font-weight: 600;
                    line-height: 1.3;
                    margin: 0;
                    font-size: 3.688rem;
                    letter-spacing: 0.036em;

                    @media (max-width: 768px) {
                        font-size: 36px;
                    }
                    @media (max-width: 470) {
                        font-size: 25px;
                    }

                    span,
                    small {
                        display: block;
                        font-weight: 300;
                        font-size: 2.125rem;
                        font-family: $font-family-body;
                        line-height: 1.4em;
                        letter-spacing: 0.128em;
                        @media screen and (max-width: 768px) {
                            font-size: 1.4rem;
                        }
                        @media (max-width: 470) {
                            font-size: 1.2rem;
                        }
                    }

                    &:last-child {
                        margin-bottom: 20px;
                    }
                }
            }

            p {
                margin-bottom: 40px;
            }
        }
    }
</style>
