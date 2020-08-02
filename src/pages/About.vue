<template>
  <div id="about">
    <page-heading :detail="headingDetails"></page-heading>
    <div>
      <div class="hero-board">
        <div class="container">
          <div class="board-text">
            At AgriBloom, we aim to be Africa’s most preferred supplier of
            fruits and vegetables to retail outlet and agro-processing
            companies.
          </div>
        </div>
      </div>

      <div class="about">
        <div class="board">
          <section class>
            <div class="process-wrapper style-two section-wrapper">
              <div class="section-header py-4">
                <h2>
                  Our
                  <span class="diff">Support</span>
                </h2>
                <h2>
                  <span>How we achieve our goal</span>
                </h2>
              </div>
              <div class="container">
                <div class="d-flex w-full flex-wrap">
                  <process-item
                    :content="feature"
                    :key="'investorImpact'+index"
                    v-for="(feature, index) in how"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
        <div class="special-section">
          <section class="container">
            <div class style="z-index: 100;">
              <div class="section-header py-4">
                <h2>
                  Our
                  <span class="diff">Team</span>
                </h2>
                <h2>
                  <span>Meet our hardworking team</span>
                </h2>
              </div>
            </div>
            <div class="pb-5 block" >
              <team-listing title="Founders" :team="team.founders" />
              <team-listing title="Sales/Marketing/Branding" :team="team.marketing" />
              <team-listing title="Investment" :team="team.investment" />
              <team-listing title="Administration" :team="team.admin" />
              <team-listing title="Client relation" :team="team.relation" />
              <team-listing title="Tech" :team="team.tech" />
            </div>

          </section>

        </div>

      </div>
    </div>

    <!-- partners section start here -->
    <partners-carousel />
    <!-- partners section end here -->
  </div>
</template>

<script>
export default {
    name: 'About',
    data: function () {
        return {
            how: {
                education: {
                    image: {
                        src: 'assets/images/feature/hiw/account.png',
                        alt: 'AgriBloom_account_thumb'
                    },
                    title: 'Education',
                    description: 'Equipping them with business and agro-based education.'
                },
                account: {
                    image: {
                        src: 'assets/images/feature/hiw/account.png',
                        alt: 'AgriBloom_account_thumb'
                    },
                    title: 'Access',
                    description:
            'Access to finance, agricultural resources, market support\n' +
            '                        and post-harvest technology they need to feed their\n' +
            '                        community and the world.'
                }
            },
            breadcrumbs: [
                { id: 0, name: 'Home', classes: '', location: '/' },
                { id: 1, name: 'About Us', classes: 'active', location: '' }
            ],
            title: 'About',
            team: {
                founders: [
                    {
                        img: '/assets/images/team/founder/sakwe.jpeg',
                        meta: {
                            name: 'Sakwe S. Njioh',
                            role: 'Co-Founder & CEO',
                            social: {
                                facebook: 'https://web.facebook.com/sakwenjioh'
                            }
                        }
                    },
                    {
                        img: '/assets/images/team/founder/udoka.jpeg',
                        meta: {
                            name: 'Udoka Inwang',
                            role: 'Co-Founder & COO',
                            social: {
                                facebook: 'https://web.facebook.com/udoka.inwang',
                                linkedin: 'https://www.linkedin.com/in/udoka-inwang-293487100'
                            }
                        }
                    },
                    {
                        img: '/assets/images/team/farm_operation/penn_emeline_matuh.jpeg',
                        meta: {
                            name: 'Penn Emeline Matuh',
                            role: 'Co-Founder/Director of Farm Operations',
                            social: {
                                facebook: '',
                                linkedin: ''
                            }
                        }
                    }
                ],
                marketing: [
                    {
                        img: '/assets/images/team/tech/david_orok.jpeg',
                        meta: {
                            name: 'David Orok',
                            role: 'Branding officer',
                            social: {
                                facebook: 'https://web.facebook.com/orokdavid',
                                linkedin: 'https://www.linkedin.com/in/david-orok-742246159'
                            }
                        }
                    }
                ],
                admin: [
                    {
                        img: '/assets/images/team/admin/comfort.jpg',
                        meta: {
                            name: 'Comfort',
                            role: 'Administrative Assistant',
                            social: {}
                        }
                    }
                ],
                investment: [
                    {
                        img:
              '/assets/images/team/investment/Edward Liwhu_Investment_officer.jpg',
                        meta: {
                            name: 'Edward Liwhu',
                            role: 'Investment Officer',
                            social: {}
                        }
                    }
                ],
                relation: [
                    {
                        img: '/assets/images/team/client_relation/sixtus.jpg',
                        meta: {
                            name: 'Sixtus T. Ulakah',
                            role: 'Client Relationsip Officer',
                            social: {
                                linkedin: 'https://www.linkedin.com/in/sixtus-ulakah-2579b482',
                                facebook: 'https://facebook.com/sixtus.ulakah'
                            }
                        }
                    }
                ],
                tech: [
                    {
                        img: '/assets/images/team/tech/ochui_princewill.jpeg',
                        meta: {
                            name: 'Ochui, Princewill',
                            role: 'Technology Officer',
                            social: {
                                linkedin: 'https://ng.linkedin.com/in/ochui-princewill-patrick',
                                facebook: 'https://facebook.com/ochui.princewill'
                            }
                        }
                    },
                    {
                        img: '/assets/images/team/tech/okposong.png',
                        meta: {
                            name: 'Ebong, Okposong',
                            role: 'Technology Officer',
                            social: {
                                facebook: 'https://facebook.com/oebong',
                                linkedin:
                  'https://ng.linkedin.com/in/armstrong-ebong-619571148?trk=profile-badge'
                            }
                        }
                    }
                ]
            }
        }
    },
    computed: {
        headingDetails: function () {
            return {
                title: 'About us',
                breadcrumbs: this.breadcrumbs,
                banner: '/assets/images/about/vegetables.jpg'
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../lib/style/_variable";
.special-holder {
  position: relative;
  &:before {
    background-color: $white;
    display: block;
    z-index: 0;
    //   padding: 14px 14px 30px;
    position: absolute;
    background-image: url(/assets/images/bg/bg-1.png);
    background-repeat: no-repeat;
    content: "";
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
}
.board {
  background: $white;
  margin: 0;
  z-index: 2;
  & + .board {
    background: rgba(0, 0, 0, 0.39);
  }
}
.hero-board {
  background:$primary;
  .board-text {
    color: #ffffff;
    padding: 100px 15px;
    text-align: center;
    font-size: 24px;
    font-weight: 300;
    position: relative;
    line-height: 1.5;
  }
}
.about {
  /*background: $primary;*/
  padding: 60px 0;
  position: relative;

  .pronounced {
    letter-spacing: 1px;
    font-weight: 600;
  }

  border-bottom: 1px solid $light-bd;

  .about-pad {
    border-radius: 4px;
    display: -ms-flex;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    flex-wrap: wrap;
    background: $white;
    -webkit-box-shadow: 0 0 10px 0 rgba(136, 136, 136, 0.1);
    box-shadow: 0 0 10px 0 rgba(136, 136, 136, 0.1);
    position: relative;
    border-top: 2px solid $primary;
    border-bottom: 2px solid $primary;
    @media (max-width: 782px) {
      margin: 40px 15px;
    }

    .ap {
      /*border-bottom: 4px solid $light-bd;
									 border-top: 4px solid $light-bd;*/
      flex: 50%;
      margin: 30px auto;
      padding: 30px 40px;
      width: 100%;

      @media (max-width: 782px) {
        padding: 15px 30px;
        margin: 15px auto;
        flex: 100%;
      }

      .ap-header {
        color: $primary;
        border: 2px solid $primary;
        padding: 4px 15px;
        font-size: 35px;
        line-height: 1.5;
        font-weight: 300;
        display: block;
        background: $light;
        text-align: center;
      }

      .ap-body {
        margin: 30px 0 30px;
        color: $dark-typo;
        font-size: 1.15em;
        letter-spacing: 0.009rem;
        border: 1px solid $light;
        padding: 30px;

        ol {
          color: currentColor;

          li {
            font-weight: 600;
            list-style-type: decimal;
            margin-left: 15px;
            padding-left: 10px;
          }
        }

        p {
          border-radius: 4px;
          font-size: inherit;
          font-weight: 300;
          line-height: 1.75;
          color: currentColor;
        }
      }
    }
  }
}

.about-section-wrapper {
  border: 1px solid $light;
  display: flex;
  flex-direction: column;
  align-items: center;

  .section-head {
    color: $dark-typo;
    display: flex;
    align-items: baseline;
    font-weight: 400;
    margin: -31px auto 15px;
    font-size: 1.5em;
    flex-wrap: nowrap;

    .heading {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      background: #fff;
      margin: 15px auto;
      line-height: 1.2;
      width: 100%;
      border: 1px solid $light-bd;
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
    }
  }
}
</style>
