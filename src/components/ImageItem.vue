<template>
  <figure :class="classes" ref="figure" v-lazyload>
    <img :class="[imgClass, {'loading': !this.loaded}]" :data-url="source" alt="alt" />
    <nomsg-spinner :classes="loaderClass" :loading="loading" v-if="loading" />
  </figure>
</template>

<script>
import LazyLoadDirective from "@/directives/LazyLoadImages";

export default {
  name: "ImageItem",
  props: {
    source: {
      type: String,
      required: true
    },
    alt: {
      default: "Agribloom Image",
      type: String
    },
    classes: {
      required: false
    },
    imgClass: {
      required: false,
      default() {
        return {
          "img-item": true,
        };
      }
    }
  },
  data() {
    return {
      loaded: false
    };
  },
  mounted() {
    this.observer = new MutationObserver(mutations => {
      for (const m of mutations) {
        const newValue = m.target.getAttribute(m.attributeName);
        this.$nextTick(() => {
          this.onClassChange(newValue, m.oldValue);
        });
      }
    });

    this.observer.observe(this.$refs.figure, {
      attributes: true,
      attributeOldValue: true,
      attributeFilter: ["class"]
    });
  },
  beforeDestroy() {
    this.observer.disconnect();
  },
  computed: {
    loading() {
      return !this.loaded;
    },
    loaderClass() {
      return {
        "img-spinner": true,
        loading: !this.loaded
      };
    }
  },
  methods: {
    spinner() {
      return this.$refs.imageSpinner;
    },
    onClassChange(classAttrValue) {
      const classList = classAttrValue.split(" ");
      if (classList.includes("loaded")) {
        this.loaded = true;
      }
    }
  },

  directives: {
    lazyload: LazyLoadDirective
  }
};
</script>
<style scoped lang="scss">
@import "@/lib/style/__variable.scss";

figure {
  display: block;
  position: relative;
  overflow: hidden;
  padding: 0;
  margin: 0;
  object-fit: cover;
  object-position: center;
  height: 100%;

  .img-item {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    color: $light-bd;
    object-fit: cover;
    object-position: center;

    &.loading {
      filter: grayscale(50%);
    }

    -webkit-transition: all 0.5s ease-in;
    -moz-transition: all 0.5s ease-in;
    -ms-transition: all 0.5s ease-in;
    -o-transition: all 0.5s ease-in;
    transition: all 0.35s ease-in;
  }

  .img-spinner {
    -webkit-transition: all 0.5s ease-in;
    -moz-transition: all 0.5s ease-in;
    -ms-transition: all 0.5s ease-in;
    -o-transition: all 0.5s ease-in;
    transition: all 0.5s ease-in;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:hover {
    .img-item {
      transform: scale(1.1) rotate(2deg);
    }
  }
}
</style>