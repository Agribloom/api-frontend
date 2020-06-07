import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../pages/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    // Authenticated user routes
    path: "/account",
    component: () =>
      import(/* webpackPrefetch: true */ "../pages/account/Account.vue"),

    children: [
      {
        path: "",
        name: "dashboard",
        component: () =>
          import(
            /* webpackChunkName: "account", webpackPrefetch: true */ "../pages/account/DashboardPage.vue"
          ),
        meta: { requiresAuth: true },
      },
      {
        path: "profile",
        name: "profile",
        component: () =>
          import(
            /* webpackChunkName: "account", webpackPrefetch: true */ "../pages/account/ProfilePage.vue"
          ),
        meta: { requiresAuth: true },
      },
      {
        path: "transaction",
        name: "transaction",
        component: () =>
          import(
            /* webpackChunkName: "account",webpackPrefetch: true */ "../pages/account/TransactionPage.vue"
          ),
        meta: { requiresAuth: true },
      },
      {
        path: "investment",
        name: "investment",
        component: () =>
          import(
            /* webpackChunkName: "account",webpackPrefetch: true */ "../pages/account/InvestmentPage.vue"
          ),
        meta: { requiresAuth: true },
      },
      {
        path: "notification",
        name: "notification",
        component: () =>
          import(
            /* webpackChunkName: "account",webpackPrefetch: true */ "../pages/account/NotificationPage.vue"
          ),
        meta: { requiresAuth: true },
      },
    ],
    meta: {
      requiresAuth: true,
      title: "Agribloom - Dashboard",
      tags: [
        {
          name: "description",
          content: "User account dashboard",
        },
        {
          property: "og:description",
          content: "User account dashboard.",
        },
      ],
    },
  },
  {
    path: "/",
    component: () => import(/* webpackPrefetch: true */"../pages/Welcome.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: Home,
        meta: {
          guest: true,
          title: `${process.env.VUE_APP_TITLE} - Home - Africa’s most preferred supplier of fruits and vegetables to
                  retail outlet and
                  agro-processing companies.`,
          tags: [
            {
              name: 'fragment',
              content: '!'
            },
            {
              name: 'robot',
              content: 'nofollow'
            },
            {
              name: "description",
              content:
                "Africa’s most preferred supplier of fruits and vegetables to retail outlet and agro-processing companies.",
            },
            {
              property: "og:description",
              content: "Africa’s most preferred supplier of fruits and vegetables to\n" +
                  "                  retail outlet and\n" +
                  "                  agro-processing companies.",
            },
            /* Twitter tags */
            { name: "twitter:card", content: "summary" },
            {
              name: "twitter:site",
              content: `https://agribloom.farm/about`,
            },
            {
              name: "twitter:title",
              content: `${process.env.VUE_APP_TITLE} - Home - Africa’s most preferred supplier of fruits and vegetables to
                  retail outlet and
                  agro-processing companies.`,
            },
            {
              name: "twitter:description",
              content:
                "Transforming smallholder farmers into sustainable agribusiness enterprises thru educn, access to farm resources, funding, market support & postharvest tech.",
            },
            { name: "twitter:creator", content: "@agribloom" },
            {
              name: "twitter:image:src",
              content:
                "https://pbs.twimg.com/profile_images/1195440549853044736/4TUVAXjN_400x400.jpg",
            },
          ],
        },
      },
      {
        path: "/faq",
        name: "faq",
        component: () => import(/* webpackPrefetch: true */ "../pages/FAQ.vue"),
        meta: {
          title:  `${process.env.VUE_APP_TITLE} - FAQ - Frequently asked questions`,
          tags: [
            {
              name: "description",
              content: "Do you want to invest in agriculture? See a list of our frequently asked questions",
            },
            {
              property: "og:description",
              content: "Do you want to invest in agriculture? See a list of our frequently asked questions",
            },
          ],
        },
      },
      {
        path: "farms",
        name: "farms",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackPrefetch: true */ "../pages/OurFarms.vue"),
        meta: {
          title: "Agribloom | Farms",
          tags: [
            {
              name: "description",
              content: "Farms",
            },
            {
              property: "og:description",
              content: "Farms",
            },
            {
              link: [
                {
                  rel: "canonical",
                  href: "https://www.agribloom.farm/farms",
                },
              ],
            },
          ],
        },
      },
      {
        path: "farm/:slug/:id",
        name: "farm",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackPrefetch: true */ "../pages/SingleFarm.vue"),
        meta: {
          title: "Agribloom | Farm",
          tags: [
            {
              name: "description",
              content: "Farm",
            },
            {
              property: "og:description",
              content: "Farm",
            },
            {
              link: [
                {
                  rel: "canonical",
                  href: "https://www.agribloom.farm/farm",
                },
              ],
            },
          ],
        },
      },
      {
        path: "sign-in",
        name: "sign-in",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackPrefetch: true */ "../pages/SignIn.vue"),
        meta: {
          guest: true,
          title: "Agribloom - Sign In",
          tags: [
            {
              name: "description",
              content: "Sign In",
            },
            {
              property: "og:description",
              content: "Sign In",
            },
          ],
        },
      },
      {
        path: "sign-up",
        name: "sign-up",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackPrefetch: true */ "../pages/SignUp.vue"),
        meta: {
          guest: true,
          title: "Agribloom | Sign Up",
          tags: [
            {
              name: "description",
              content: "Sign Up",
            },
            {
              property: "og:description",
              content: "Sign Up",
            },
          ],
        },
      },
      {
        path: "reset-password",
        name: "reset-password",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackPrefetch: true */ "../pages/ResetPassword.vue"),
        meta: {
          title: "Agribloom | Reset Password",
          tags: [
            {
              name: "description",
              content: "Reset Password",
            },
            {
              property: "og:description",
              content: "Reset Password",
            },
          ],
        },
      },
      {
        path: "about",
        name: "about",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackPrefetch: true */ "../pages/About.vue"),
        meta: {
          title: "Agribloom | About Us",
          tags: [
            {
              name: "description",
              content: "About Us",
            },
            {
              property: "og:description",
              content: "About Us",
            },
          ],
        },
      },
      {
        path: "career",
        name: "career",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackPrefetch: true */ "../pages/Career.vue"),
        meta: {
          title: "Agribloom | Career",
          tags: [
            {
              name: "description",
              content: "Join Us",
            },
            {
              property: "og:description",
              content: "Interested in joining us? Apply today",
            },
          ],
        },
      },
      {
        path:
          "https://docs.google.com/forms/d/e/1FAIpQLSdSwSzO_yanDx3hnMnzt17DF2GEvo8DZiQUs4Xen6M6INRW_w/viewform",
        name: "become-apprentice",
      },
      {
        path: "contact",
        name: "contact",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackPrefetch: true */ "../pages/ContactUs.vue"),
        meta: {
          title: "Agribloom | Contact Us",
          tags: [
            {
              name: "description",
              content: "Contact Us",
            },
            {
              property: "og:description",
              content: "Contact Us",
            },
          ],
        },
      },
      {
        path: "/terms-of-sponsorship",
        name: "terms-of-sponsorship",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackPrefetch: true */ "../pages/TermsOfSponsorship.vue"),
        meta: {
          title: "Agribloom | Terms of Sponsorship",
          tags: [
            {
              name: "description",
              content: "Terms of Sponsorship",
            },
            {
              property: "og:description",
              content: "Our terms of Sponsorship",
            },
          ],
        },
      },
      {
        path: "/terms-of-service",
        name: "terms-of-service",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackPrefetch: true */ "../pages/TermsOfService.vue"),
        meta: {
          title: "Agribloom | Terms of Service",
          tags: [
            {
              name: "description",
              content: "Terms of Service",
            },
            {
              property: "og:description",
              content: "Terms of Service",
            },
          ],
        },
      },
      {
        path: "/privacy-policy",
        name: "privacy",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackPrefetch: true */ "../pages/PrivacyPolicyPage"),
        meta: {
          title: "Agribloom | Privacy Policy",
          tags: [
            {
              name: "description",
              content: "Privacy Policy",
            },
            {
              property: "og:description",
              content: "Privacy Policy",
            },
          ],
        },
      },
    ],
  },
  {
    path: '/sitemap',
    redirect: '/sitemap.xml'
  },
  {
    path: "/404NotFound",
    name: "404NotFound",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackPrefetch: true */ "../pages/error/404NotFound.vue"),
  },
  // otherwise redirect to home
  { path: "*", redirect: "/404NotFound" },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});

/* function to run before each route is fulfilled */
router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.tags);

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(
    document.querySelectorAll("[data-vue-router-controlled]")
  ).map((el) => el.parentNode.removeChild(el));

  // Skip rendering meta tags if there are none.
  if (!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.tags
    .map((tagDef) => {
      const tag = document.createElement("meta");

      Object.keys(tagDef).forEach((key) => {
        tag.setAttribute(key, tagDef[key]);
      });

      // We use this to track which meta tags we create, so we don't interfere with other ones.
      tag.setAttribute("data-vue-router-controlled", "");

      return tag;
    })
    // Add the meta tags to the document head.
    .forEach((tag) => document.head.appendChild(tag));

  /* Authentication routes handlers */
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // Handles authenticated user routes
    if (localStorage.getItem("token") == null) {
      next({
        name: "sign-in",
        params: { nextUrl: to.fullPath },
      });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    // Handle guest routes

    if (localStorage.getItem("token") == null) {
      /* If user is not authenticated */
      next();
    } else {
      // Authenticated users
      next({ name: "dashboard" });
    }
  } else {
    next();
  }
});

export default router;
