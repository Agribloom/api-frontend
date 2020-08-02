<template>
  <section class="team-section-wrapper">
    <div class="section-head">
      <div class="heading">
        <div class="title">
          {{title}}
          <!--<i class="badge ">{{team.length}}</i>-->
        </div>
        <div class="__icon">
          <i :class="collapseIconClass" @click="collapseList"></i>
        </div>
      </div>
    </div>
    <div ref="teamList" :class="collapseItemClass">
      <team-listing-item :team="team" />
    </div>
  </section>
</template>

<script>
import TeamListingItem from './TeamListingItem'

export default {
    name: 'TeamListing',
    components: { TeamListingItem },
    props: {
        title: {
            required: false,
            default: '' || 'Team Mate'
        },
        team: {
            type: Array,
            default () {
                return [
                    {
                        img: '' || '/assets/images/placeholder.png',
                        meta: {
                            name: 'Name',
                            role: '' || 'Role',
                            social: {
                                facebook: '',
                                twitter: ''
                            }
                        }
                    }
                ]
            }
        }
    },
    data () {
        return {
            collapsed: false
        }
    },
    computed: {
        collapseIconClass () {
            return {
                la: true,
                'la-angle-down': this.collapsed,
                'la-angle-up': !this.collapsed,
                'cursor-pointer': true
            }
        },
        collapseItemClass () {
            return {
                collapsible: true,
                collapse: this.collapsed,
                'team-item': true
            }
        }
    },
    methods: {
        collapseList () {
            this.collapsed = !this.collapsed
        }
    }
}
</script>

<style scoped lang="scss">
@import "../lib/style/_variable";

.team-section-wrapper {
    background: #fff;
  z-index: 10;
  position: relative;
  -webkit-box-shadow: 0vmin 7px 7px -7px #ddd;
  -moz-box-shadow: 0vmin 7px 7px -7px #ddd;
  box-shadow: 0vmin 7px 15px 1px #efefef;
  overflow: hidden;
  border-bottom: 1px solid #f1f1f1;
  &:first-of-type {
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  }

  &:last-of-type {
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
  }
  .section-head {
    align-items: baseline;
    color: $dark-typo;
    display: flex;
    flex-wrap: nowrap;
    margin: 0;
    border-bottom: 1px solid #f1f1f1;
    .heading {
      width: 100%;
      display: block;
      background: transparent;
      text-align: left;
      padding-left: 14px;
      position: relative;
      padding: 14px;
      .title {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        display: block;
        font-size: 1.24em;
      }
    }
    .__icon {
      display: block;
      position: absolute;
      top: 25%;
      right: 14px;
      bottom: 25%;
      padding: 0 7px;
      background: #ececec;
      -webkit-border-radius: $bdrs;
      -moz-border-radius: $bdrs;
      border-radius: $bdrs;
    }
  }
  .team-item {
    display: block;
    @media all and (max-width: 576px) {
      display: flex;
      justify-content: center;
    }
    padding: 15px;
  }
  .collapsible {
    position: relative;
    overflow: hidden;
    padding: 4px;
    margin: auto 15px;

    &.collapse {
      height: 0;
      padding: 0;
      margin: 0;
    }
  }
}
</style>
