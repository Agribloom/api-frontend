<template>
    <div id="home">
        <u-animate-container>
            <u-animate
                    name="fadeIn"
                    delay="0s"
                    duration="1s"
                    :iteration="1"
                    :offset="0"
                    animateClass="animated"
                    :begin="false"
            >
                <home-banner/>
            </u-animate>
        </u-animate-container>
        <!-- feature section start here -->
        <section class="feature-section">
            <div class="container">
                <div class="process-wrapper style-two section-wrapper">
                    <div class="section-header py-4">
                        <h2>
                            Get
                            <span class="diff">Started</span>
                        </h2>
                        <h2>
                            <span>Become an investor</span>
                        </h2>
                    </div>
                    <process-item
                            :content="feature"
                            :key="'hiw'+index"
                            v-for="(feature, index) in features.hiw"
                    />
                </div>
            </div>
        </section>
        <!-- feature section ending here -->

        <!-- campaign section start -->
        <section class="special-section padding-tb" v-if="openFarms.length">
            <div class="container padding-tb px-0">
                <div class="section-header">
                    <h2>
                        Our
                        <span class="diff">Farms</span>
                    </h2>
                    <h2>
                        <span>Ongoing Farm Campaigns</span>
                    </h2>
                </div>

                <farm-listing name="home"
                              :filters="{status: 'open', count: 6}"
                              :carousel="true"
                              :paginate="false"
                />
                <div>
                    <div class="d-flex justify-content-end">
                        <div class="d-flex justify-content-center">
                            <router-link :to="{name:'farms'}" class="cbtn">View all</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- campaign section ending here -->
        <!-- support section start here -->
        <achievement-listing/>
        <!-- clean and save section ending -->

        <!-- feature section start here -->
        <section class="feature-section">
            <div class="container">
                <div class="process-wrapper section-wrapper">
                    <div class="section-header py-4">
                        <h2>
                            Impact &amp;
                            <span class="diff">benefits</span>
                            <span>What you stand to gain and the impact you'll make</span>
                        </h2>
                    </div>
                    <process-item
                            :content="feature"
                            :key="'investorImpact'+index"
                            v-for="(feature, index) in features.investorImpact"
                    />
                </div>
            </div>
        </section>
        <!-- feature section ending here -->
        <!-- partners section start here -->
        <partners-carousel/>
        <!-- partners section end here -->
    </div>
</template>

<script>
    // @ is an alias to /src
    import mixin from "@/mixin";
    import AchievementListing from "../components/AchievementListing";
    import {mapGetters, mapActions} from "vuex";

    export default {
        name: "Home",
        components: {AchievementListing},
        mixins: [mixin],
        computed: {
            openFarms() {
                return this.$store.getters["farm/pluralOpen"];
            }
        },
        data() {
            return {
                features: {
                    hiw: {
                        account: {
                            image: {
                                src: "/assets/images/feature/hiw/account.png",
                                alt: "AgriBloom_account_thumb"
                            },
                            title: "Create an account",
                            description:
                                "Join our farmvestor community in empowering farmers and feeding Africa profitably. " +
                                "Register today starting with your email"
                        },
                        farm: {
                            image: {
                                src: "assets/images/feature/hiw/farm.png",
                                alt: "AgriBloom_account_thumb"
                            },
                            title: "Choose a farm",
                            description:
                                "Here is where you can become an impact-driven investor and start blooming the lives of farmers. Choose from the available farms, select the number of units you will fund and proceed to payment."
                        },
                        updates: {
                            image: {
                                src: "assets/images/feature/hiw/updates.png",
                                alt: "AgriBloom_account_thumb"
                            },
                            title: "Get updates",
                            description:
                                "On your dashboard, you will get real-time updates of the farm progress in all the phases. You also have the opportunity to visit the farm at designated time intervals."
                        },
                        returns: {
                            image: {
                                src: "assets/images/feature/hiw/returns.png",
                                alt: "AgriBloom_account_thumb"
                            },
                            title: "Get returns",
                            description:
                                "Upon harvest, your invested capital plus interest earned is paid to all investors based on the units purchased and tenure."
                        }
                    },
                    investorImpact: {
                        feedTheNation: {
                            image: {
                                src: "assets/images/feature/investorImpact/feed.png",
                                alt: "AgriBloom investor impact feed the nation profitably png"
                            },
                            title: "Feeding Africa profitably",
                            description:
                                "Investing in our fruit and vegetable farm, earns you an ROI between 10%-50% annually\n" +
                                " and ensures that Africa is fed profitably."
                        },
                        QualityEducation: {
                            image: {
                                src: "assets/images/feature/investorImpact/education.png",
                                alt:
                                    "AgriBloom investor impact Quality education and healthcare png"
                            },
                            title: "Quality education & healthcare",
                            description:
                                "Your investment ensures that the families of smallholder farmers have access to\n" +
                                " quality education and healthcare."
                        },
                        JobCreation: {
                            image: {
                                src: "assets/images/feature/investorImpact/jobs.png",
                                alt: "AgriBloom account thumb creation of sustainable jobs png"
                            },
                            title: "Sustainable jobs creation",
                            description:
                                "For each investment you make in our farm, a minimum of 100 temporary and 20 permanent\n" +
                                " jobs are created for both the youths (mostly women) and the elderly."
                        },
                        FoodSecurity: {
                            image: {
                                src: "assets/images/feature/investorImpact/security.png",
                                alt: "AgriBloom account thumb food security png"
                            },
                            title: "Food security",
                            description:
                                "Your investment contributes to domestic food production and food security in Nigeria,\n" +
                                " Africa and the world."
                        }
                    },
                    achievements: []
                }
            };
        },
        mounted() {
            this.getAchievements();
            this.fetchFarms();
        },
        methods: {
            ...mapActions({
                fetchFarms: "farm/fetchPlural"
            }),
            /* Fetches achievements
             * @return Promise
             * */
            getAchievements() {
                window.axios
                    .get("achievements")
                    .then(response => {
                        this.features.achievements = response.data.results;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        }
    };
</script>
