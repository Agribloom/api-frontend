<template>
    <div>
        <page-heading :detail="headingDetails"></page-heading>

        <section id="faq" class="bg-200">
            <div class="container">
                <div class="row">
                    <div class="col-md-8 p-0 px-lg-3">
                        <VueFaqAccordion activeColor="hsl(117, 52%, 44%)"
                                         :items="faqItems"
                                         borderColor="#dee2e6"
                        />
                    </div>
                    <div class="col-md-4 sticky-0 p-0">
                        <div class="card ">
                            <div class="card-body ">
                                <contact-form/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import VueFaqAccordion from 'vue-faq-accordion'

    export default {
        name: 'FAQ',
        components: {
            VueFaqAccordion
        },
        data: function () {
            return {
                breadcrumbs: [
                    {id: 0, name: 'Home', classes: '', location: '/'},
                    {id: 1, name: 'FAQ', classes: 'active', location: ''}
                ],
                faqItems: [
                    {
                        title: 'How Do I Follow-up on my Investments?',
                        value: 'When you sponsor a farm through Agribloom, you get periodic updates in the form of written reports, google map view, farm visit, images and videos showing the progress being made at different stages of the project'
                        // category: 'Tab-1'
                    }, {
                        title: 'Is it possible to terminate my investment earlier than the agreed timeframe?',
                        value: 'Each of our farms have a fixed cycle which is communicated in the farm description page before you sponsor. Since projects have commenced, you will be unable to terminate your sponsorship before the agreed timeframe. However, when you receive your payback at the end of the farm cycle, you can choose to sponsor another farm, subject to availability.'
                        // category: 'Tab-1'
                    }
                ]
            }
        },
        computed: {
            headingDetails: function () {
                return {
                    title: 'Frequently asked questions',
                    breadcrumbs: this.breadcrumbs,
                    banner: 'assets/images/contact-us/contact-us.jpg'
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../lib/style/_variable";

    #faq {
        /*background: $primary;*/
        padding: 60px 0;

        .accordion__title:hover .accordion__toggle-button::before,
        .accordion__title:hover .accordion__toggle-button::after {
            background: $primary !important;
        }

        .faq {
            padding: 0;
            background: $white;
        }


    }
</style>
