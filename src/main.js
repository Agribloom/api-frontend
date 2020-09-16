import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import VueWow from "vue-wow";
import VueAnalytics from "vue-analytics";
import VueAwesomeSwiper from "vue-awesome-swiper";


// External components
import VueToastr from "vue-toastr";

Vue.config.productionTip = false;

/* Vue.use(PopsicleSwiper); */
Vue.use( VueWow );
Vue.use( VueAwesomeSwiper );
Vue.use( VueToastr, {
	defaultPosition: "toast-bottom-right",
	defaultTimeout: 5000,
} );

/* Google analytics setup */
const isProd = process.env.NODE_ENV === "production";
Vue.use( VueAnalytics, {
	id: "UA-100691929-2",
	router,
	disabled: false,
	checkDuplicatedScript: true,
	debug: {
		enabled: !isProd,
		sendHitTask: isProd,
	},
} );

require( "./bootstrapper" );

Vue.component(
	"tracker-popup",
	require( "./components/TrackerPopup.vue" ).default
);
Vue.component(
	"collapsible-text",
	require( "./components/CollapsibleText.vue" ).default
);
Vue.component(
	"partners-carousel",
	require( "./components/PartnersCarousel.vue" ).default
);
Vue.component(
	"testimonial-carousel",
	require( "./components/TestimonialCarousel.vue" ).default
);
Vue.component(
	"investment-calculator",
	require( "./components/InvestmentCalculator.vue" ).default
);
Vue.component( "app-logo", require( "./components/AppLogo.vue" ).default );
Vue.component( "auth-button", require( "./components/AuthButton.vue" ).default );
Vue.component( "nav-link", require( "./components/NavigationLink.vue" ).default );
Vue.component( "bread-crumbs", require( "./components/Breadcrumb.vue" ).default );
Vue.component( "page-heading", require( "./components/PageHeading.vue" ).default );
Vue.component( "search-modal", require( "./components/SearchModal.vue" ).default );
Vue.component( "team-listing", require( "./components/TeamListing.vue" ).default );
Vue.component( "farm-listing", require( "./components/FarmListing.vue" ).default );
Vue.component( "farm-card", require( "./components/FarmCard.vue" ).default );
Vue.component( "home-banner", require( "./components/HomeBanner.vue" ).default );
Vue.component( "scroll-top", require( "./components/ScrollToTop.vue" ).default );
Vue.component( "page-header", require( "./components/PageHeader.vue" ).default );
Vue.component( "page-header", require( "./components/PageHeader.vue" ).default );
Vue.component( "page-footer", require( "./components/PageFooter.vue" ).default );
Vue.component( "image-item", require( "./components/ImageItem.vue" ).default );
Vue.component(
	"module-spinner",
	require( "./components/ModuleSpinner.vue" ).default
);
Vue.component(
	"nomsg-spinner",
	require( "./components/MessageLessSpinner.vue" ).default
);
Vue.component(
	"modal-component",
	require( "./components/ModalComponent.vue" ).default
);
Vue.component( "how-it-works", require( "./components/HowItWorks.vue" ).default );
Vue.component( "process-item", require( "./components/ProcessItem.vue" ).default );
Vue.component(
	"process-counter",
	require( "./components/ProcessCounter.vue" ).default
);
Vue.component(
	"copyright-item",
	require( "./components/CopyrightItem.vue" ).default
);
Vue.component(
	"pagination-item",
	require( "./components/PaginationItem.vue" ).default
);
Vue.component(
	"farm-summary-card",
	require( "./components/FarmSummaryCard.vue" ).default
);
Vue.component( "data-table", require( "./components/DataTable.vue" ).default );
Vue.component( "contact-form", require( "./components/ContactForm.vue" ).default );
Vue.component( "alert-item", require( "./components/AlertItem.vue" ).default );
Vue.component(
	"dropdown-menu",
	require( "./components/DropdownMenu.vue" ).default
);
Vue.component( "farm-filters", require( "./components/FarmFilters.vue" ).default );
Vue.component(
	"filter-capsule",
	require( "./components/FilterCapsule.vue" ).default
);
Vue.component(
	"farm-update-listing",
	require( "./components/FarmUpdateListing.vue" ).default
);
Vue.component(
	"farm-manager-listing",
	require( "./components/FarmManagerListing.vue" ).default
);
Vue.component(
	"farm-video-listing",
	require( "./components/FarmVideoListing.vue" ).default
);
Vue.component(
	"farm-gallery-grid",
	require( "./components/FarmGalleryGrid.vue" ).default
);
Vue.component(
	"farm-description",
	require( "./components/FarmDescription.vue" ).default
);
Vue.component(
	"achievements-listing",
	require( "./components/AchievementListing.vue" ).default
);

// Auth components
Vue.component(
	"account-header",
	require( "./components/account/AccountHeader.vue" ).default
);
Vue.component(
	"account-sidebar",
	require( "./components/account/AccountSidebar.vue" ).default
);
Vue.component(
	"investment-listing",
	require( "./components/account/InvestmentListing.vue" ).default
);

Vue.component(
	"investment-summary",
	require( "./components/account/InvestmentSummary.vue" ).default
);
Vue.component(
	"transaction-summary",
	require( "./components/account/TransactionSummary.vue" ).default
);
Vue.component(
	"user-card",
	require( "./components/account/UserCard.vue" ).default
);
/*Admin*/
/*Vue.component(
	"admin-dashboard",
	require( "./components/admin/Sidebar.vue" ).default
);*/
Vue.component(
	"investment-withdrawal",
	require( "./components/admin/InvestmentReturnCard.vue" ).default
);

Vue.component(
	"farm-investor-listing",
	require( "./components/admin/FarmInvestorListing.vue" ).default
);

new Vue( {
	router,
	store,
	render: (h) => h( App ),
} ).$mount( "#app" );
