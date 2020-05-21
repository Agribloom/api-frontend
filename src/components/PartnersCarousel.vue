<template>
  <div>
    <div class="partner" v-if="hasEntry">
      <div class="container">
        <div class="section-header">
          <h2>
            Our
            <span class="diff">Partners</span>
          </h2>
          <h2>
            <span>These Organizations believe in us</span>
          </h2>
        </div>
        <div class="partner-slider">
          <!--  <carousel
                            :autoplay="autoplay"
                            :autoplayHoverPause="autoplayHoverPause"
                            :perPageCustom="perPage">

                        <slide v-for="(partner, index) in partners" :key="index" >
                            <image-item :alt="partner.image.alt" :source="partner.image.src" class="partner-thumb"/>
                        </slide>
          </carousel>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* import { Carousel, Slide } from 'vue-carousel' */

let partners = [
  {
    name: "Leadway Assurance",
    image: {
      src: "assets/images/partner/leadway_logo.png",
      alt: "Leadway assurance logo"
    }
  },
  {
    name: "Zenith Bank",
    image: {
      src: "assets/images/partner/zenith_bank_logo.png",
      alt: "zenith bank logo"
    }
  }
];
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import VueAos from "vue-aos";
export default {
  name: "PartnersCarousel",
  directives: {
    swiper: directive
  },
  data: function() {
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
        breakpoints: {
          // when window width is >= 320px
          320: {
            slidesPerView: 1,
            slidesPerGroup: 2,
            spaceBetween: 15
          },
          // when window width is >= 600px
          600: {
            slidesPerView: 2,
            slidesPerGroup: 2,
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
      partners: []
    };
  },
  computed: {
    fetchPartners() {
      return this.partners;
    },
    hasEntry() {
      return this.partners.length;
    }
  },
  methods: {
    getDataFromApi() {
      // TODO: retrieve data from API
      window.axios
        .get("partners")
        .then(response => {
          this.partners = response.data.results;
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.getDataFromApi();
  },
  components: {
    Swiper,
    SwiperSlide,
    VueAos
  }
};
</script>

<style lang="scss" scoped>
.partner {
  padding: 60px 30px;
  display: flex;
  justify-content: center;
  background: #fff;

  .partner-slider {
    width: auto;
    display: block;
    @media screen and (max-width: 400px) {
      display: flex;
      justify-content: center;
      align-items: center;
      .VueCarousel-slide {
        justify-content: center;
        display: flex;
        .partner-thumb {
          width: 100px;
          height: 100px;
        }
      }
    }

    .partner-thumb {
      display: flex;
      margin: 0;
      padding: 0;
      justify-content: center;
      width: 150px;
      height: 150px;
      position: relative;
      overflow: hidden;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
