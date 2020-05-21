<template>
    <div>

        <!-- header section start -->
        <!-- page header section start here -->
        <page-heading :detail="headingDetails"></page-heading>

        <!-- page header section ending here -->

        <!-- contact us section start here -->
        <section class="contact-us padding-tb">
            <div class="container">
                <div class="row no-gutters section-wrapper">
                    <div class="col-lg-6">
                        <contact-form class="contact-area"/>
                    </div>
                    <div class="col-lg-6">
                        <div class="row no-gutters">
                            <div class="col-12">
                                <div class="main-address p-0">
                                    <div class="contact-title">
                                        <h4>Main Office Address</h4>
                                    </div>
                                    <div class="contact-body">
                                        <ul>
                                            <li>
                                                <h6>Location :</h6>
                                                <p>110 Nkemba Street, Off Abak Road, Uyo. Akwa Ibom State</p>
                                            </li>
                                            <li>
                                                <h6>Phone Number :</h6>
                                                <p>+234 8157782822</p>
                                                <p>+234 9059997867</p>
                                            </li>
                                            <li>
                                                <h6>Email Address :</h6>
                                                <a href="#">agribloom@gmail.com</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="contact-title">
                                        <h4>Locate us</h4>
                                    </div>
                                    <div class="position-relative">
                                        <iframe width="100%"
                                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127182.62469030604!2d7.863375796953702!3d5.029380311425333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x105d57c1f8da6a51%3A0xe71e33ab2276d451!2sUyo!5e0!3m2!1sen!2sng!4v1577132927104!5m2!1sen!2sng"
                                                frameborder="0" style="border:0;" allowfullscreen=""></iframe>
                                    </div>
                                </div>

                            </div>
                            <!--<div class="col-sm-6">
                                <div class="rounch-addres">
                                    <div class="contact-title">
                                        <h4>Our Branch Offices</h4>
                                    </div>
                                    <div class="contact-body">
                                        <ul>
                                            <li>
                                                <h5>Nigeria</h5>
                                            </li>
                                            <li>
                                                <h6>Location :</h6>
                                                <p>Level 12 Alfa City Center 120 Broklyn New York</p>
                                            </li>
                                            <li>
                                                <h6>Phone Number :</h6>
                                                <p>+258 666 888 000, 02- 698147</p>
                                            </li>
                                            <li>
                                                <h6>Email Address :</h6>
                                                <a href="#">Support@adminenvishare.com</a>
                                            </li>
                                        </ul>
                                        <ul>
                                            <li>
                                                <h5>Cameroon</h5>
                                            </li>
                                            <li>
                                                <h6>Location :</h6>
                                                <p>Level 12 Alfa City Center 120 Broklyn New York</p>
                                            </li>
                                            <li>
                                                <h6>Phone Number :</h6>
                                                <p>+258 666 888 000, 02- 698147</p>
                                            </li>
                                            <li>
                                                <h6>Email Address :</h6>
                                                <a href="#">Support@adminenvishare.com</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>-->
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- contact us section ending here -->

    </div>
</template>

<script>
export default {
    name: 'Contact-Us',
    data: function () {
        return {
            breadcrumbs: [
                { id: 0, name: 'Home', classes: '', location: '/' },
                { id: 1, name: 'Contact Us', classes: 'active', location: '' }
            ]
        }
    },
    computed: {
        sendCrumbs: function () {
            return this.breadcrumbs
        },
        headingDetails: function () {
            return {
                title: 'Contact us',
                breadcrumbs: this.breadcrumbs,
                banner: 'assets/images/contact-us/contact-us.jpg'
            }
        }
    }
}
</script>

<style scoped>
</style>
