<template>
  <div class="row d-flex">
    <div class="col-lg-3 col-md-6" :key="`${team}-${index}`" v-for="(item, index) in team">
      <div class="team">
        <ul class="meta">
          <li class="meta-icon">
            <image-item :alt="item.img" :source="item.img" />
          </li>
          <li class="meta-name">{{item.meta.name}}</li>
          <li class="meta-role">{{item.meta.role}}</li>
          <li class="meta-contact">
            <ul class="social-link-list">
              <li class="social-link" v-if="item.meta.social.facebook">
                <a :href="item.meta.social.facebook" target="_blank">
                  <i class="la la-facebook"></i>
                </a>
              </li>
              <li class="social-link" v-if="item.meta.social.twitter">
                <a :href="item.meta.social.twitter" target="_blank">
                  <i class="la la-twitter"></i>
                </a>
              </li>
              <li class="social-link" v-if="item.meta.social.linkedin">
                <a :href="item.meta.social.linkedin" target="_blank">
                  <i class="la la-linkedin"></i>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'TeamListingItem',
    props: {
        team: {
            required: true
        }
    }
}
</script>

<style scoped lang="scss">
@import "../lib/style/_variable";

.team {
  display: block;
  -moz-border-radius: $bdrs;
  -webkit-border-radius: $bdrs;
  border-radius: $bdrs;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  -webkit-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;

  .meta {
    color: #c4c4c4;
    display: block;
    font-size: 0.75em;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .meta-name {
      font-weight: 600;
      font-size: 18px;
      line-height: 1;
    }

    .meta-role {
      color: #a4a4a4;
      line-height: 1.25;
    }

    .meta-icon {
      background: $light;
      -moz-border-radius: 100px;
      -webkit-border-radius: 100px;
      border-radius: 100px;
      height: 150px;
      margin-bottom: 15px;
      overflow: hidden;
      position: relative;
      width: 150px;
      figure {
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
        margin: 0 auto;
        object-fit: contain;
        object-position: center;
      }
    }

    .meta-contact {
      .social-link-list {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        .social-link {
          color: $dark;

          a {
            color: currentColor;
          }
        }
      }
    }
  }
}
</style>
