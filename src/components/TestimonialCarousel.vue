<template>
  <div>
    <div class="testimonial-section padding-tb" v-if="hasEntry">
      <div class="container">
        <div class="section-header style-2">
          <h2>
            Our
            <span class="diff">Testimonials</span>
          </h2>
          <h2>
            <span>What others are saying about us</span>
          </h2>
        </div>
        <div class="testimonial-slider">
          <div class="banner-behind">
            <div v-swiper="swiperOption">
              <div class="swiper-wrapper">
                <div
                  class="swiper-slide"
                  v-for="(testimonial, index) in fetchTestimonials"
                  :key="index"
                >
                  <div class="testimonial-item">
                    <div class="testimonial-inner">
                      <div class="testimonial-header">
                        <div class="testimonial-thumb">
                          <div class="round-shape"></div>
                          <img :alt="testimonial.name" :src="testimonial.avatar" />
                        </div>
                        <div class="testimonial-author">
                          <span class="name">{{testimonial.title}}&nbsp;{{testimonial.name}}</span>
                          <span class="role">{{testimonial.role || '' }}</span>
                        </div>
                      </div>
                      <div class="testimonial-body">
                        <p class="comment">
                          {{testimonial.commet}}
                        </p>
                      </div>
                      <div class="testimonial-meta">{{testimonial.created | formatDate}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from "@/mixin";
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import VueAos from "vue-aos";
import { mapGetters } from "vuex";
export default {
  name: "TestimonialCarousel",
  mixins: [mixin],
  directives: {
    swiper: directive
  },
  data: function() {
    return {
      swiperOption: {
        spaceBetween: 0,
        freeMode: false,
        autoplay: {
          delay: 5000,
          disableOnInteraction: true
        },
        speed: 3000,
        autoHeight: true,
        watchOverflow: true,
        loop: true,
        centeredSlides: true,
        breakpoints: {
          // when window width is >= 320px
          320: {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 15
          },
          // when window width is >= 600px
          600: {
            slidesPerView: 2,
            slidesPerGroup: 1,
            spaceBetween: 10
          },
          // when window width is >= 640px
          1024: {
            slidesPerView: 3,
            slidesPerGroup: 1,
            spaceBetween: 20
          }
        }
      },
      testimonials: []
    };
  },
  computed: {
    fetchTestimonials() {
      return this.testimonials;
    },
    hasEntry() {
      return this.testimonials.length;
    }
  },
  methods: {
    getDataFromApi() {
      window.axios
        .get("testimonials")
        .then(response => {
          this.testimonials = response.data.results;
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  created() {
    this.getDataFromApi();
  },
  components: {
    /*  Carousel,
        Slide */
  }
};
</script>

<style lang="scss" scoped>
@import "@/lib/style/__variable.scss";


.testimonial-section .testimonial-slider .post-item .post-inner {
  .post-header,
  .post-body ul {
    display: flex;
    flex-wrap: wrap;
  }
}

.testimonial-section {
  padding: 60px 7px;
  display: flex;
  justify-content: space-evenly;
  background: #fff;
  background: rgba(9, 9, 9, 0.35);
  margin: 0;

  .testimonial-slider {
    width: auto;

    .testimonial-item {
      -webkit-box-shadow: 0 0 10px 0 rgba(136, 136, 136, 0.1);
      box-shadow: 0 0 10px 0 rgba(136, 136, 136, 0.1);
      padding: 7px;

      .testimonial-inner {
        background: #fff;
        padding: 30px 0 12px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        -webkit-border-radius: $bdrs;
        -moz-border-radius: $bdrs;
        border-radius: $bdrs;
        display: block;
        &:hover .round-shape {
          animation: round 4s linear infinite forwards;
        }
        .testimonial-header {
          align-items: center;
          border-bottom: 1px solid $after-bg;
          width: 100%;
          flex: 1 0 100%;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;

          .testimonial-thumb {
            border-radius: 100%;
            box-shadow: 0 7px 7px -7px $shadow;
            height: 70px;
            width: 70px;
            position: relative;
            overflow: hidden;
            margin: 7px;
            img {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
            }
          }

          .testimonial-author {
            margin: 7px auto;
            color: rgb(109, 109, 109);

            .name {
              color: inherit;
              font: {
                size: 1em;
                weight: 600;
                family: $font-family-head;
              }
            }
            .role {
              color: inherit;
            }
          }
        }

        .testimonial-body {
          padding: 15px 30px ;
          width: 100%;
          flex: 1 0 100%;
          text-align: center;
          font: {
            size: 12px;
            weight: 200;
          }
          ul li {
            padding: 0 1px 0 0;

            i {
              color: #ffcf34;
            }
          }

          &:after {
            background: url(/assets/images/blockquote1.png) no-repeat;
            background-size: contain;
            bottom: 20px;
            height: 40px;
            right: 30px;
            width: 60px;
            left: 30px;
          }
          .comment {
            margin: 0;
            font-size: 1em;
          }
        }
        .testimonial-meta {
          position: relative;
          display: flex;
          width: 100%;
          padding: 2px 14px;
          width: 100%;
          background: #eee;
          justify-content: flex-end;
          color: #888;
          font-size: 0.75em;
          font-style: italic;
        }
      }
    }
  }
}

/*
          .testimonial-section
        .testimonial-slider
        .post-item
        .post-inner
        .post-body:after {
            left: 30px;
            right: auto;
            }
        .testimonial-section {
            background-position: center;
            background-repeat: no-repeat;

            .testimonial-slider {
                margin: -15px;

                .post-item {
                    padding: 15px;

                    .post-inner {
                        background: $white;

                        .post-header,
                        .post-body {
                            padding: 30px 10px;
                        }

                        .post-header {
                            align-items: center;
                            border-bottom: 1px solid $after-bg;
                            justify-content: space-between;

                            p,
                            h5 {
                                margin: 0;
                            }

                            .post-thumb img {
                                border-radius: 100%;
                                box-shadow: 0 10px 10px 0 rgba(164, 234, 88, 0.4);
                                height: 60px;
                                width: 60px;
                            }
                        }

                        .post-body {
                            ul li {
                                padding: 0 1px 0 0;

                                i {
                                    color: #ffcf34;
                                }
                            }

                            &:after {
                                !* background: url(../images/testimonial/quote.png) no-repeat; *!
                                background-size: contain;
                                bottom: 20px;
                                height: 40px;
                                right: 30px;
                                width: 60px;
                            }
                        }

                        &:hover .round-shape {
                            animation: round 4s linear infinite forwards;
                        }
                    }
                }

                .testimonial-pagination {
                    margin-top: 30px;
                }
            }
        }

        @media (min-width: 1200px) {
            .testimonial-section {
                background-position: center right;
            }
        }

        @media (min-width: 992px) {
            .testimonial-section .testimonial-slider .post-item .post-inner {
                .post-header,
                .post-body {
                    padding: 30px;
                }
            }
        }

        @media screen and (max-width: 400px) {
            .testimonial-section .testimonial-slider .post-item .post-inner .post-header {
                padding: 30px;
            }
        }

        @media screen and (max-width: 400px) {
            .testimonial-section .testimonial-slider .post-item .post-inner .post-header {
                display: none;
            }
        }
    */
</style>
